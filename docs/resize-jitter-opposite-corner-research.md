# Resize Jitter at Opposite Corner: Research & Architectural Solutions

## The Problem

When implementing corner-handle resizing on a canvas/SVG element:

1. User drags a corner resize handle (e.g., bottom-right)
2. The opposite corner (top-left) should remain perfectly fixed/anchored
3. Instead, the opposite corner **jitters/jumps** by 1-2 pixels during drag

### Root Cause: The Rounding Feedback Loop

The jitter emerges from a specific computational chain:

```
mousePosition -> scaleFactor -> apply to internal values (cellSize, width, height)
-> round to integers -> recompute bounds from rounded values
-> position element at (fixedCorner - newBounds)
```

Because rounding is **lossy**, the recomputed bounds oscillate between discrete values. For example, if the true width should be 203.4px, it alternates between 203 and 204 as the mouse moves sub-pixel amounts. This 1px oscillation in width causes the position (derived from `fixedCorner - width`) to jitter by 1px in the opposite direction.

**Key insight**: The jitter is not a rendering bug. It is a **mathematical certainty** when you round intermediate values and then derive position from those rounded values. The fixed corner position = `anchorCorner.x - roundedWidth`, so any +/-1 in `roundedWidth` causes +/-1 in position.

---

## How Professional Canvas Editors Solve This

### Architecture 1: The "Scale During Drag, Commit on Release" Pattern (Recommended)

This is the dominant pattern used by Konva.js, Fabric.js, and similar canvas libraries.

**During drag (every mousemove):**
- Compute the raw floating-point scale factor from the mouse delta
- Apply `scaleX` / `scaleY` transforms to the element (CSS `transform: scale()` or canvas equivalent)
- Do NOT update width/height/cellSize or any integer-quantized values
- The element visually scales smoothly because scale is a continuous floating-point operation
- The anchor corner stays perfectly fixed because you are scaling around it (transform-origin)

**On release (mouseup):**
- Read the final scale factors
- Compute new integer width/height: `newWidth = Math.round(originalWidth * finalScaleX)`
- Reset scale to 1
- Update the element's actual dimensions and position with the committed integer values
- One single snap to the pixel grid, which the user perceives as "settling" rather than jittering

**Why this works**: CSS/canvas `transform: scale()` operates on the *rendered output* as a continuous floating-point multiplication. It never rounds intermediate values. The anchor corner is the `transform-origin`, so it stays mathematically fixed. Rounding only happens once at commit time.

**Konva.js implementation** (from their Transformer source):
```javascript
// During transform: Konva sets scaleX/scaleY on the node, NOT width/height
// The Transformer modifies scale continuously via matrix decomposition

// On transformEnd (in user code):
node.scaleX(1);
node.scaleY(1);
onChange({
  x: node.x(),
  y: node.y(),
  width: Math.max(5, node.width() * scaleX),
  height: Math.max(5, node.height() * scaleY),
});
```

**React pattern from Konva docs:**
```jsx
<Rect
  onTransformEnd={(e) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale, commit to width/height
    node.scaleX(1);
    node.scaleY(1);

    onChange({
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
    });
  }}
/>
```

### Architecture 2: Float-Precision Positioning with Late Rounding (Figma-style)

Figma uses a custom WebGL/WebGPU renderer that bypasses the browser's HTML rendering pipeline entirely. This gives them full control over pixel placement.

**Their approach:**
- Internally, all coordinates and dimensions are **floating-point** throughout the entire pipeline
- The element's `relativeTransform` is a proper 2D affine matrix with float precision
- Pixel snapping ("Snap to pixel grid") is a **separate, optional pass** that snaps coordinates to the pixel grid only for the final rendered output
- During interactive operations (drag, resize), the snapping may be relaxed or computed differently than at rest
- Rounding to integers for the "data model" (what you see in the properties panel) happens as a separate concern from rendering

**Key architectural insight from Figma**: The `relativeTransform` always has unit axes (no scale baked in). To resize a node, you call `resize()` or `resizeWithoutConstraints()` rather than manipulating the transform matrix. This means width/height are the authoritative size, and the transform purely handles position/rotation. This separation prevents the scale-accumulation problem.

### Architecture 3: Dual-Layer Position (Game Engine Pattern)

From Godot engine's approach to pixel-art rendering (relevant to grid-based canvas editors):

- Maintain a **logical position** as floating-point (the "truth")
- Maintain a **visual position** that is the logical position rounded to the nearest pixel
- The logical position updates smoothly during drag
- The visual position is computed from the logical position only at render time
- This means the rendered element snaps to pixels but the underlying position never jitters

**From the Godot Camera2D jitter fix discussion**: "It might be better to do it on creation of the view matrix, not by setting the origin" -- meaning snap at the visual/render layer, not at the data layer.

---

## The Anti-Pattern: Why "Round Everything Immediately" Fails

The broken pattern that causes jitter:

```javascript
// ANTI-PATTERN: causes opposite-corner jitter
function onMouseMove(e) {
  const newWidth = Math.round(startWidth * scaleFactor);   // rounded
  const newHeight = Math.round(startHeight * scaleFactor);  // rounded
  const newCellSize = Math.round(startCellSize * scaleFactor); // rounded

  // Position derived from rounded dimensions -- JITTERS
  element.x = fixedCorner.x;                    // this is fine
  element.width = newWidth;                      // jumps in steps of 1
  // But if internal layout depends on cellSize:
  // actualRenderedWidth = newCellSize * numCols  // this jumps too!
  // and it may not equal newWidth, causing DOUBLE jitter
}
```

**Why it is broken:**
1. `Math.round(x * s)` is not monotonic -- as `s` increases smoothly, the output can stay the same for several frames, then jump by 2
2. If you have BOTH a rounded cellSize and a rounded total width, they can disagree: `round(cellSize * scale) * numCols ≠ round(totalWidth * scale)`
3. The position of the fixed corner = `anchorX - actualWidth`, so any jump in `actualWidth` causes the anchor to move

---

## Recommended Solution for Grid-Based Canvas Elements

For a grid-based element (like a grid animator tool) where the internal structure has a `cellSize` that must be an integer:

### Approach: Scale Transform During Drag + Commit Rounded CellSize on Release

```
DRAG PHASE (mousemove):
├── Compute raw float scaleFactor from mouse delta
├── Apply CSS transform: scale(scaleFactor) with transform-origin at fixed corner
├── Do NOT recompute cellSize, grid dimensions, or element position
├── The visual output scales smoothly, anchor stays fixed
└── Optionally show a "preview" of what the final cellSize will be in a tooltip

COMMIT PHASE (mouseup):
├── Compute final scaleFactor
├── newCellSize = Math.round(originalCellSize * scaleFactor)
├── Clamp newCellSize to [minCellSize, maxCellSize]
├── newWidth = newCellSize * numCols  (exact, no rounding needed)
├── newHeight = newCellSize * numRows (exact, no rounding needed)
├── Reset CSS transform to scale(1)
├── Update element dimensions to newWidth x newHeight
└── Position element so the anchor corner stays at the same place
```

**Why this is clean:**
- During drag: zero rounding, zero jitter, perfectly smooth
- On commit: `newCellSize * numCols` is exact (integer * integer = integer), so no width/height rounding error
- The anchor corner only moves once (on commit), and the snap is small enough to feel like "settling into place"

### Alternative: If CSS Transform Is Not Available

If you cannot use CSS `transform: scale()` (e.g., you are drawing directly on a `<canvas>`), the equivalent is:

```javascript
// During drag: use canvas context scaling
ctx.save();
ctx.translate(anchorX, anchorY);
ctx.scale(scaleFactor, scaleFactor);
ctx.translate(-anchorX, -anchorY);
// Draw element at original dimensions
drawElement(originalX, originalY, originalWidth, originalHeight);
ctx.restore();
```

This achieves the same effect: the GPU handles sub-pixel scaling, and the anchor point stays mathematically fixed because the scale is applied around it.

---

## Summary of Key Principles

| Principle | Description |
|-----------|-------------|
| **Never round intermediate values** | Keep all computation in floating-point during interaction |
| **Scale, don't resize** | Use `transform: scale()` during drag, not width/height changes |
| **Set transform-origin to anchor** | The fixed corner should be the transform-origin of the scale |
| **Commit on release** | Round and apply integer values only on mouseUp |
| **Derive position from anchored corner** | After commit, position = `anchorCorner`, not `anchorCorner - newSize` |
| **Avoid dual rounding** | If you must round cellSize, derive totalSize as `cellSize * count` (exact), don't round totalSize independently |
| **Separate visual from logical** | If real-time snapping is needed, snap only the render output, not the data model |

---

## Sources

- [Building canvas-based editors in React (Konva patterns) -- Ali Karaki](https://www.alikaraki.me/blog/canvas-editors-konva)
- [Konva React Transformer documentation](https://konvajs.org/docs/react/Transformer.html)
- [Konva Transformer source code](https://github.com/konvajs/konva/blob/master/src/shapes/Transformer.ts)
- [What the hell did the Transformer actually do to my shape? -- Longview Coder](https://longviewcoder.com/2022/04/28/what-the-hell-did-the-transformer-actually-do-to-my-shape/)
- [Performant Drag and Zoom using Fabric.js](https://medium.com/@Fjonan/performant-drag-and-zoom-using-fabric-js-3f320492f24b)
- [Figma architecture -- Made by Evan](https://madebyevan.com/figma/)
- [Notes From Figma II: Engineering Learnings -- Andrew Chan](https://andrewkchan.dev/posts/figma2.html)
- [Figma relativeTransform API documentation](https://www.figma.com/plugin-docs/api/properties/nodes-relativetransform/)
- [Figma rendering powered by WebGPU](https://www.figma.com/blog/figma-rendering-powered-by-webgpu/)
- [Excalidraw Element Selection and Manipulation -- DeepWiki](https://deepwiki.com/excalidraw/excalidraw/3.6-element-selection-and-manipulation)
- [Fix Camera2D jitter -- Godot PR #35635](https://github.com/godotengine/godot/pull/35635)
- [Godot snap 2D transforms to pixel jitter -- Issue #71074](https://github.com/godotengine/godot/issues/71074)
- [Pixel-perfect rendering with devicePixelContentBox -- web.dev](https://web.dev/articles/device-pixel-content-box)
- [interact.js -- Drag/Resize on a scaled div](https://github.com/taye/interact.js/issues/430)
- [Konva Resize Snapping](https://konvajs.org/docs/select_and_transform/Resize_Snaps.html)
- [Konva Centered Scaling](https://konvajs.org/docs/select_and_transform/Centered_Scaling.html)
