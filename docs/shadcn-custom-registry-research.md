# shadcn Custom Registry System - Research Document

> Research date: 2026-02-15
> Purpose: Understanding how to make custom components installable via `npx shadcn add`

## Table of Contents

1. [Overview](#overview)
2. [How the Registry System Works](#how-the-registry-system-works)
3. [The registry.json Schema](#the-registryjson-schema)
4. [The registry-item.json Schema](#the-registry-itemjson-schema)
5. [File Types and Target Directory Mapping](#file-types-and-target-directory-mapping)
6. [Creating a Custom Registry Step-by-Step](#creating-a-custom-registry-step-by-step)
7. [The Build Process](#the-build-process)
8. [How npx shadcn add URL Works](#how-npx-shadcn-add-url-works)
9. [Namespace System](#namespace-system)
10. [Authentication for Private Registries](#authentication-for-private-registries)
11. [How MagicUI and Others Distribute Components](#how-magicui-and-others-distribute-components)
12. [Adding to the Official Registry Directory](#adding-to-the-official-registry-directory)
13. [Gotchas and Caveats](#gotchas-and-caveats)

---

## Overview

The shadcn registry is a **distribution system for code** -- not a traditional npm package registry. It allows you to distribute components, hooks, utilities, pages, config files, and more as JSON payloads that the `shadcn` CLI can fetch and install into any project.

Key properties:
- Framework-agnostic: works with Next.js, Vite, Vue, Svelte, or any framework that can serve JSON over HTTP
- Components are copied into the user's project (not installed as dependencies)
- Supports authentication for private registries
- Supports namespace-based multi-registry setups
- The CLI handles dependency installation, file placement, and import path transformation

Sources:
- [shadcn Registry Introduction](https://ui.shadcn.com/docs/registry)
- [Getting Started Guide](https://ui.shadcn.com/docs/registry/getting-started)

---

## How the Registry System Works

### High-Level Flow

```
1. You create components in a registry/ directory
2. You define them in registry.json (the manifest)
3. You run `shadcn build` to generate static JSON files in public/r/
4. Each component becomes a single JSON file with embedded source code
5. You deploy to any public URL
6. Users run `npx shadcn add https://your-site.com/r/component.json`
7. The CLI fetches the JSON, resolves dependencies, and writes files to the user's project
```

### The Build Pipeline

```
registry.json          -->  shadcn build  -->  public/r/[name].json
(manifest with          (reads files,      (static JSON files with
 file paths)             embeds content)    embedded source code)
```

The build process:
1. Reads `registry.json` to find all component definitions
2. For each component, reads all associated source files from disk
3. Embeds the file contents as strings into the JSON
4. Writes output to `public/r/` (customizable via `--output` flag)
5. These files are then served as static assets

---

## The registry.json Schema

This is the **manifest file** -- the entry point for your registry. It lives at the root of your project.

### Schema Reference

```
https://ui.shadcn.com/schema/registry.json
```

### Full Structure

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "your-registry-name",
  "homepage": "https://your-registry.com",
  "items": [
    {
      "name": "component-name",
      "type": "registry:block",
      "title": "Human Readable Title",
      "description": "Description of what this component does.",
      "dependencies": ["zod", "motion"],
      "registryDependencies": ["button", "card"],
      "files": [
        {
          "path": "registry/new-york/blocks/component-name/component.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `$schema` | string | No | Schema URL for validation |
| `name` | string | Yes | Registry identifier, used in data attributes |
| `homepage` | string | Yes | Registry web address |
| `items` | array | Yes | Array of registry item definitions (min 1, unique) |

### Item Properties (within items array)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Unique identifier for this item |
| `type` | string | Yes | Item type (see types table below) |
| `title` | string | No | Human-readable display name |
| `description` | string | No | What the component does |
| `dependencies` | string[] | No | NPM packages (e.g., `["zod", "motion@latest"]`) |
| `devDependencies` | string[] | No | NPM dev dependencies |
| `registryDependencies` | string[] | No | Other registry items this depends on |
| `files` | object[] | No | File definitions with path and type |
| `categories` | string[] | No | Organization tags |
| `author` | string | No | Creator attribution |
| `docs` | string | No | Custom installation instructions (markdown) |
| `meta` | object | No | Arbitrary key-value metadata |
| `envVars` | object | No | Environment variables (dev only) |

### registryDependencies Formats

Registry dependencies support three formats:
```json
{
  "registryDependencies": [
    "button",                                      // By name (from shadcn/ui)
    "@acme/input-form",                            // Namespaced
    "https://example.com/r/custom-component.json"  // Full URL
  ]
}
```

---

## The registry-item.json Schema

This is the schema for the **built output files** (the JSON files in `public/r/`). These are what the CLI actually fetches and processes.

### Schema Reference

```
https://ui.shadcn.com/schema/registry-item.json
```

### All Supported Types (12 total)

| Type | Purpose | Default Target Directory |
|------|---------|-------------------------|
| `registry:ui` | UI primitives and single-file components | `components/ui/` |
| `registry:component` | Simple components | `components/` |
| `registry:block` | Complex multi-file components | `components/` |
| `registry:hook` | React custom hooks | `hooks/` |
| `registry:lib` | Utility and library files | `lib/` |
| `registry:page` | Page or file-based routes | **Requires explicit `target`** |
| `registry:file` | Miscellaneous files | **Requires explicit `target`** |
| `registry:style` | Registry styles (e.g., "new-york") | System-determined |
| `registry:theme` | Theme definitions | System-determined |
| `registry:base` | Base configuration | System-determined |
| `registry:font` | Font definitions | System-determined |
| `registry:item` | Universal/framework-agnostic items | Flexible |

### Built Output Example

When `shadcn build` runs, a component's JSON output looks like this:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hello-world",
  "type": "registry:component",
  "title": "Hello World",
  "description": "A simple hello world component.",
  "registryDependencies": ["button"],
  "files": [
    {
      "path": "registry/new-york/blocks/hello-world/hello-world.tsx",
      "content": "import { Button } from \"@/components/ui/button\"\n\nexport function HelloWorld() {\n  return <Button>Hello World</Button>\n}\n",
      "type": "registry:component"
    }
  ]
}
```

Key difference from `registry.json`: the built output **includes the `content` property** with the full source code embedded as a string.

### CSS and Styling Properties

```json
{
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif",
      "--animate-wiggle": "wiggle 1s ease-in-out infinite"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  },
  "css": {
    "@keyframes wiggle": {
      "0%, 100%": { "transform": "rotate(-3deg)" },
      "50%": { "transform": "rotate(3deg)" }
    },
    "@layer base": {
      "h1": { "font-size": "var(--text-2xl)" }
    },
    "@layer components": {
      "card": { "background-color": "var(--color-white)" }
    },
    "@utility content-auto": {
      "content-visibility": "auto"
    },
    "@plugin \"@tailwindcss/typography\"": {}
  }
}
```

---

## File Types and Target Directory Mapping

The CLI uses the item's `type` field combined with the user's `components.json` configuration to determine where files are placed.

| File Type | Resolves To (from components.json) |
|-----------|-------------------------------------|
| `registry:ui` | `aliases.ui` (typically `@/components/ui`) |
| `registry:component` | `aliases.components` (typically `@/components`) |
| `registry:hook` | `aliases.hooks` (typically `@/hooks`) |
| `registry:lib` | `aliases.lib` (typically `@/lib`) |
| `registry:page` | Uses explicit `target` property (e.g., `app/login/page.tsx`) |
| `registry:file` | Uses explicit `target` property (e.g., `~/config.ts`) |

The `~` prefix in target paths refers to the project root.

---

## Creating a Custom Registry Step-by-Step

### Step 1: Set Up Project Structure

Use the official template or create your own:

```
your-registry/
  registry/
    new-york/
      blocks/
        your-component/
          your-component.tsx
          components/       # sub-components
          hooks/            # related hooks
          lib/              # utilities
  public/
    r/                      # build output (generated)
  registry.json             # manifest
  package.json
  components.json           # shadcn config
```

The official template: https://github.com/shadcn-ui/registry-template

### Step 2: Write Your Component

```tsx
// registry/new-york/blocks/my-component/my-component.tsx
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return <Button>Click me</Button>
}
```

Important: Use `@/registry` path for imports between registry files, NOT relative paths.

### Step 3: Create registry.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "my-registry",
  "homepage": "https://my-registry.com",
  "items": [
    {
      "name": "my-component",
      "type": "registry:component",
      "title": "My Component",
      "description": "Does something cool.",
      "registryDependencies": ["button"],
      "files": [
        {
          "path": "registry/new-york/blocks/my-component/my-component.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

### Step 4: Install and Build

```bash
pnpm add shadcn@latest
```

Add build script to `package.json`:
```json
{
  "scripts": {
    "registry:build": "shadcn build"
  }
}
```

Build:
```bash
pnpm registry:build
```

Output goes to `public/r/my-component.json` by default. Customize with `--output`:
```bash
pnpm dlx shadcn@latest build --output ./public/registry
```

### Step 5: Serve and Deploy

Locally:
```bash
pnpm dev
# Available at http://localhost:3000/r/my-component.json
```

Deploy to any public URL (Vercel, Netlify, Cloudflare, any static host).

### Step 6: Users Install

```bash
npx shadcn@latest add https://your-site.com/r/my-component.json
```

---

## The Build Process

### What `shadcn build` Does

1. Reads `registry.json` from the project root
2. For each item in `items[]`:
   - Reads each file referenced in `files[]`
   - Embeds the file content as a string in the `content` property
   - Preserves all metadata (type, dependencies, registryDependencies, etc.)
3. Outputs individual JSON files to `public/r/[name].json`

### Build Command Options

```bash
pnpm dlx shadcn@latest build
  -o, --output <path>   # Output directory (default: "./public/r")
  -c, --cwd <cwd>       # Working directory
```

### Import Path Transformation

During build, the CLI transforms import paths:
- `@/registry/...` paths are resolved using the project's `tsconfig.json`
- The CLI uses `tsconfig-paths` library internally for resolution
- Import aliases from `components.json` are used to map paths correctly

---

## How npx shadcn add URL Works

The `add` command accepts three argument formats:

```bash
# By name (from official shadcn/ui registry)
npx shadcn@latest add button

# By URL (any remote registry)
npx shadcn@latest add https://example.com/r/my-component.json

# By local path (local development)
npx shadcn@latest add ./registry/items/my-component.json

# Mix and match
npx shadcn add ./avatar.json button https://example.com/r/hero.json
```

### What Happens When You Add a URL

1. CLI fetches the JSON from the URL
2. Validates it against the `registry-item.json` schema
3. Resolves `registryDependencies` (fetching additional items if needed)
4. Installs npm `dependencies` and `devDependencies`
5. Writes files to appropriate directories based on `type` and user's `components.json`
6. Transforms import paths to match user's project aliases
7. Injects CSS variables and styles if `cssVars` / `css` are defined

### CLI Flags for `add`

```bash
npx shadcn@latest add [component]
  -y, --yes              # Skip confirmation prompts
  -o, --overwrite        # Replace existing files
  -a, --all              # Install all available components
  -p, --path <path>      # Custom installation directory
```

---

## Namespace System

Namespaces allow configuring multiple registries in a single project, using the `@` prefix.

### Configuration in components.json

```json
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@v0": "https://v0.dev/chat/b/{name}",
    "@internal": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

### URL Placeholders

- `{name}` (required): Replaced with the resource name
- `{style}` (optional): Replaced with the current style from config

### Usage

```bash
npx shadcn@latest add @acme/button
# Resolves to: https://registry.acme.com/button.json

npx shadcn@latest add @v0/dashboard
# Resolves to: https://v0.dev/chat/b/dashboard
```

### Cross-Registry Dependencies

Items can depend on components from other registries:
```json
{
  "name": "dashboard",
  "registryDependencies": [
    "@shadcn/card",
    "@v0/chart",
    "@acme/data-table"
  ]
}
```

The CLI automatically resolves and installs dependencies from their respective registries.

---

## Authentication for Private Registries

### Bearer Token

```json
{
  "registries": {
    "@private": {
      "url": "https://registry.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

`.env.local`:
```
REGISTRY_TOKEN=your_secret_token_here
```

### API Key

```json
{
  "registries": {
    "@company": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "X-API-Key": "${API_KEY}"
      }
    }
  }
}
```

### Query Parameters

```json
{
  "registries": {
    "@internal": {
      "url": "https://registry.company.com/{name}.json",
      "params": {
        "token": "${ACCESS_TOKEN}"
      }
    }
  }
}
```

Resolves to: `https://registry.company.com/button.json?token=your_token`

---

## How MagicUI and Others Distribute Components

### MagicUI's Approach

MagicUI uses the standard shadcn registry format. Their `registry.json`:

```json
{
  "name": "magic-ui",
  "homepage": "https://magicui.design",
  "items": [
    {
      "name": "magic-card",
      "type": "registry:ui",
      "title": "Magic Card",
      "description": "A spotlight effect that follows your mouse cursor...",
      "dependencies": ["motion"],
      "files": [
        {
          "path": "registry/magicui/magic-card.tsx",
          "type": "registry:ui",
          "target": "components/magicui/magic-card.tsx"
        }
      ]
    },
    {
      "name": "animated-shiny-text",
      "type": "registry:ui",
      "title": "Animated Shiny Text",
      "description": "A light glare effect which pans across text...",
      "files": [
        {
          "path": "registry/magicui/animated-shiny-text.tsx",
          "type": "registry:ui",
          "target": "components/magicui/animated-shiny-text.tsx"
        }
      ],
      "cssVars": {
        "theme": {
          "animate-shiny-text": "shiny-text 8s infinite"
        }
      },
      "css": {
        "@keyframes shiny-text": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shiny-width)) 0"
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shiny-width)) 0"
          }
        }
      }
    }
  ]
}
```

Key patterns from MagicUI:
- Uses `registry:ui` type (installs to `components/ui/` or uses `target` for custom paths like `components/magicui/`)
- Specifies `target` to install into a `magicui/` subdirectory
- Embeds CSS animations via `cssVars` and `css` properties
- Lists npm dependencies like `motion`

### Aceternity UI

Aceternity uses a similar approach with their own CLI wrapper that ultimately relies on the same shadcn registry format.

### Common Pattern

All major component libraries in the shadcn ecosystem:
1. Define a `registry.json` at their project root
2. Place components in a `registry/` directory
3. Run `shadcn build` to generate JSON files
4. Deploy to a public URL
5. Users install via URL or namespace

---

## Adding to the Official Registry Directory

If you want your registry to appear in [shadcn's Registry Directory](https://ui.shadcn.com/docs/directory):

1. Add your registry to `apps/v4/registry/directory.json` in the [shadcn-ui/ui](https://github.com/shadcn-ui/ui) repo
2. Run `pnpm registry:build` to generate `registries.json`
3. Open a PR

### Requirements

- Registry must be **open source and publicly accessible**
- Must be a **valid JSON** conforming to the registry schema
- Must use a **flat structure**: `/registry.json` and `/component-name.json` at the root
- The `files` array must **NOT include a `content` property** (content is for built output only)

The full registry index is available at: https://ui.shadcn.com/r/registries.json

---

## Gotchas and Caveats

### Import Path Issues
- Always use `@/registry` paths in your registry source files, never relative paths
- The CLI uses `tsconfig-paths` for resolution -- make sure your `tsconfig.json` has proper path aliases
- There are known issues with multi-character aliases not resolving correctly (GitHub issue #4691)
- After installation, the CLI transforms `@/registry/...` imports to match the user's project aliases

### content vs. no content
- In `registry.json` (your manifest): files do **NOT** have a `content` property -- just `path` and `type`
- In built output (`public/r/[name].json`): files **DO** have the `content` property with embedded source
- If submitting to the official directory, the `files` array must NOT include `content`

### File Type Determines Install Location
- `registry:ui` -> `components/ui/`
- `registry:component` -> `components/`
- `registry:hook` -> `hooks/`
- `registry:lib` -> `lib/`
- `registry:page` and `registry:file` REQUIRE an explicit `target` property

### target Property
- Only required for `registry:page` and `registry:file` types
- Use `~` prefix for project root (e.g., `~/next.config.ts`)
- For pages: specify the exact route path (e.g., `app/login/page.tsx`)

### Tailwind v4
- The `tailwind` property in registry items is **deprecated**
- Use `cssVars.theme` for Tailwind v4 configuration instead
- CSS variables use the new `cssVars` and `css` properties

### Static Hosting
- The registry does not require Next.js -- any static file host works
- You just need to serve JSON files over HTTP(S)
- Can be hosted on GitHub Pages, Vercel, Netlify, Cloudflare Pages, or any CDN

### Versioning
- There is no built-in versioning system for registry items
- You can use URL parameters or different registry endpoints for versions
- Some teams use stability-based namespaces: `@stable/button` vs `@latest/button`

---

## Complete Example: Minimal Custom Registry

### File Structure

```
my-registry/
  registry/
    new-york/
      blocks/
        cool-card/
          cool-card.tsx
  public/
    r/                    # generated by shadcn build
      cool-card.json
  registry.json
  package.json
```

### registry.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "my-registry",
  "homepage": "https://my-registry.com",
  "items": [
    {
      "name": "cool-card",
      "type": "registry:component",
      "title": "Cool Card",
      "description": "An animated card component.",
      "dependencies": ["motion"],
      "registryDependencies": ["card", "button"],
      "files": [
        {
          "path": "registry/new-york/blocks/cool-card/cool-card.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

### Built Output (public/r/cool-card.json)

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "cool-card",
  "type": "registry:component",
  "title": "Cool Card",
  "description": "An animated card component.",
  "dependencies": ["motion"],
  "registryDependencies": ["card", "button"],
  "files": [
    {
      "path": "registry/new-york/blocks/cool-card/cool-card.tsx",
      "content": "import { Card } from \"@/components/ui/card\"\nimport { Button } from \"@/components/ui/button\"\nimport { motion } from \"motion\"\n\nexport function CoolCard() {\n  return (\n    <motion.div whileHover={{ scale: 1.05 }}>\n      <Card>\n        <Button>Click me</Button>\n      </Card>\n    </motion.div>\n  )\n}\n",
      "type": "registry:component"
    }
  ]
}
```

### User Installation

```bash
npx shadcn@latest add https://my-registry.com/r/cool-card.json
```

---

## Sources

- [shadcn Registry Introduction](https://ui.shadcn.com/docs/registry)
- [Getting Started Guide](https://ui.shadcn.com/docs/registry/getting-started)
- [registry.json Schema](https://ui.shadcn.com/docs/registry/registry-json)
- [registry-item.json Schema](https://ui.shadcn.com/docs/registry/registry-item-json)
- [Registry Examples](https://ui.shadcn.com/docs/registry/examples)
- [Namespace Documentation](https://ui.shadcn.com/docs/registry/namespace)
- [Authentication Documentation](https://ui.shadcn.com/docs/registry/authentication)
- [CLI Documentation](https://ui.shadcn.com/docs/cli)
- [Official Registry Template](https://github.com/shadcn-ui/registry-template)
- [Registry Directory](https://ui.shadcn.com/docs/directory)
- [Add a Registry to the Directory](https://ui.shadcn.com/docs/registry/registry-index)
- [MagicUI Registry](https://github.com/magicuidesign/magicui/blob/main/registry.json)
- [Aceternity UI CLI](https://ui.aceternity.com/docs/cli)
- [Registry Build Process Deep Dive](https://deepwiki.com/shadcn-ui/registry-template-v4/2.2-registry-build-process)
- [Vercel Academy: Creating a Registry File](https://vercel.com/academy/shadcn-ui/creating-a-shadcn-registry-file)
- [Raw Schema: registry.json](https://ui.shadcn.com/schema/registry.json)
- [Raw Schema: registry-item.json](https://ui.shadcn.com/schema/registry-item.json)
