'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useCanvasTransform } from '@/hooks/use-canvas-transform';
import { useGridAnimatorStore } from '../_store/grid-animator-store';
import { type ResizeCorner } from '../_types/grid-animator-types';
import { screenToCanvas, hitTestInstances } from '../_utils/canvas-hit-test';
import { InstanceRenderer } from './instance-renderer';
import { SelectionOverlay } from './selection-overlay';
import { SnapGuideLines } from './snap-guide-lines';
import { MarqueeOverlay } from './marquee-overlay';

/** Dummy content dimensions for bounds detection */
const BOUNDS_CONTENT_SIZE = 2000;

/** Pannable and zoomable canvas container for multi-instance grid animation. */
export default function ToolCanvas() {
  const {
    transform,
    isPanning,
    spacePressed,
    isContentOutOfBounds,
    containerRef,
    handlers: canvasHandlers,
    resetTransform,
  } = useCanvasTransform({
    minScale: 0.25,
    maxScale: 3,
    contentWidth: BOUNDS_CONTENT_SIZE,
    contentHeight: BOUNDS_CONTENT_SIZE,
  });

  const toastIdRef = useRef<string | number | null>(null);

  const instanceOrder = useGridAnimatorStore((state) => state.instanceOrder);
  const instances = useGridAnimatorStore((state) => state.instances);
  const dragState = useGridAnimatorStore((state) => state.dragState);
  const resizeState = useGridAnimatorStore((state) => state.resizeState);
  const marqueeState = useGridAnimatorStore((state) => state.marqueeState);
  const selectedIds = useGridAnimatorStore((state) => state.selectedIds);
  const selectInstance = useGridAnimatorStore((state) => state.selectInstance);
  const startDrag = useGridAnimatorStore((state) => state.startDrag);
  const updateDrag = useGridAnimatorStore((state) => state.updateDrag);
  const endDrag = useGridAnimatorStore((state) => state.endDrag);
  const startResize = useGridAnimatorStore((state) => state.startResize);
  const updateResize = useGridAnimatorStore((state) => state.updateResize);
  const endResize = useGridAnimatorStore((state) => state.endResize);
  const startMarquee = useGridAnimatorStore((state) => state.startMarquee);
  const updateMarquee = useGridAnimatorStore((state) => state.updateMarquee);
  const endMarquee = useGridAnimatorStore((state) => state.endMarquee);
  const addInstance = useGridAnimatorStore((state) => state.addInstance);
  const copySelection = useGridAnimatorStore((state) => state.copySelection);
  const pasteSelection = useGridAnimatorStore((state) => state.pasteSelection);

  // Keyboard shortcuts: Cmd+C / Cmd+V
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.metaKey && e.key === 'c') {
        e.preventDefault();
        copySelection();
      }
      if (e.metaKey && e.key === 'v') {
        e.preventDefault();
        pasteSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [copySelection, pasteSelection]);

  useEffect(() => {
    if (isContentOutOfBounds && !toastIdRef.current) {
      toastIdRef.current = toast('Canvas out of view', {
        duration: Infinity,
        position: 'top-center',
        unstyled: true,
        classNames: {
          toast: 'flex items-center gap-3 rounded-lg bg-neutral-800/80 px-3 py-2 backdrop-blur-sm',
          title: 'text-xs text-neutral-400',
          actionButton: 'rounded-md bg-neutral-700/80 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-600/80 transition-colors',
        },
        action: {
          label: 'Pan to content',
          onClick: resetTransform,
        },
      });
    } else if (!isContentOutOfBounds && toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, [isContentOutOfBounds, resetTransform]);

  const getCanvasPoint = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return null;
      return screenToCanvas(clientX, clientY, transform, container.getBoundingClientRect());
    },
    [transform, containerRef]
  );

  const handleResizeStart = useCallback(
    (corner: ResizeCorner, screenX: number, screenY: number) => {
      if (selectedIds.length === 0) return;
      const point = getCanvasPoint(screenX, screenY);
      if (point) {
        startResize(corner, point.x, point.y);
      }
    },
    [selectedIds, getCanvasPoint, startResize]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (spacePressed) {
        canvasHandlers.onMouseDown(e);
        return;
      }

      const point = getCanvasPoint(e.clientX, e.clientY);
      if (!point) return;

      const hitId = hitTestInstances(point, instances, instanceOrder);
      const isShift = e.shiftKey;

      if (hitId) {
        if (isShift) {
          // Shift+click: toggle in multi-selection, no drag
          selectInstance(hitId, true);
        } else {
          // If clicking an already-selected instance, keep multi-selection and start multi-drag
          // If clicking an unselected instance, select only that one and start drag
          if (!selectedIds.includes(hitId)) {
            selectInstance(hitId);
          }
          startDrag(hitId, point.x, point.y, transform.scale);
        }
      } else {
        // Empty canvas: begin marquee
        startMarquee(point.x, point.y);
      }
    },
    [spacePressed, canvasHandlers, getCanvasPoint, instances, instanceOrder, selectedIds, selectInstance, startDrag, startMarquee, transform.scale]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        canvasHandlers.onMouseMove(e);
        return;
      }

      if (resizeState) {
        const point = getCanvasPoint(e.clientX, e.clientY);
        if (point) updateResize(point.x, point.y);
        return;
      }

      if (dragState) {
        const point = getCanvasPoint(e.clientX, e.clientY);
        if (point) updateDrag(point.x, point.y, transform.scale);
        return;
      }

      if (marqueeState) {
        const point = getCanvasPoint(e.clientX, e.clientY);
        if (point) updateMarquee(point.x, point.y);
      }
    },
    [isPanning, canvasHandlers, resizeState, dragState, marqueeState, getCanvasPoint, updateResize, updateDrag, updateMarquee, transform.scale]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) canvasHandlers.onMouseUp();
      if (resizeState) endResize();
      if (dragState) endDrag();
      if (marqueeState) endMarquee();
    },
    [isPanning, canvasHandlers, resizeState, endResize, dragState, endDrag, marqueeState, endMarquee]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      canvasHandlers.onMouseLeave();
      if (resizeState) endResize();
      if (dragState) endDrag();
      if (marqueeState) endMarquee();
    },
    [canvasHandlers, resizeState, endResize, dragState, endDrag, marqueeState, endMarquee]
  );

  const handleAddInstance = useCallback(() => {
    addInstance({ x: 0, y: 0 });
  }, [addInstance]);

  const getCursorClass = () => {
    if (isPanning) return 'cursor-grabbing';
    if (spacePressed) return 'cursor-grab';
    if (resizeState) return 'cursor-nwse-resize';
    if (dragState) return 'cursor-grabbing';
    if (marqueeState) return 'cursor-crosshair';
    return 'cursor-default';
  };

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full touch-none overflow-hidden ${getCursorClass()}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Transform layer */}
      <div
        className="absolute will-change-transform"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
          transformOrigin: '0 0',
        }}
      >
        {instanceOrder.map((id) => (
          <InstanceRenderer key={id} instanceId={id} />
        ))}
        <SelectionOverlay zoomScale={transform.scale} onResizeStart={handleResizeStart} />
        <SnapGuideLines />
        <MarqueeOverlay />
      </div>



      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-800/80 px-3 py-2 text-xs text-neutral-400 backdrop-blur-sm">
        <span className="text-neutral-300">Scroll</span> to pan · <span className="text-neutral-300">Pinch</span> to zoom · <span className="text-neutral-300">⌘+/−</span> zoom · <span className="text-neutral-300">Shift+click</span> multi-select
      </div>
    </div>
  );
}
