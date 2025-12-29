# ResizablePanel Examples

The `ResizablePanel` component is a generic, reusable component that can be used to create resizable panels anywhere in your application.

## Features

- ✅ **Drag to resize** - Click and drag the resize handle
- ✅ **Double-click to reset** - Double-click the handle to return to default size
- ✅ **Keyboard resize** - Use Arrow Left/Right (10px) or Shift+Arrow (50px)
- ✅ **Persistence** - Automatically save size to localStorage
- ✅ **CSS Variables** - Update CSS custom properties dynamically
- ✅ **Fully customizable** - Configure min/max sizes, default size, and more
- ✅ **Mobile-friendly** - Optionally disable resizing on mobile

## Basic Examples

### 1. Simple Left Sidebar

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";

function MyApp() {
  return (
    <div className="flex h-screen">
      <ResizablePanel
        defaultSize={300}
        minSize={200}
        maxSize={500}
        persistenceKey="my-sidebar"
        className="bg-gray-100 border-r"
      >
        <div className="p-4">
          <h2>Sidebar Content</h2>
          <nav>
            {/* Your navigation items */}
          </nav>
        </div>
      </ResizablePanel>

      <main className="flex-1 p-8">
        <h1>Main Content</h1>
      </main>
    </div>
  );
}
```

### 2. Right-Side Panel

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-8">
        <h1>Dashboard</h1>
      </main>

      <ResizablePanel
        side="left" // Handle on the left side for right panel
        defaultSize={350}
        minSize={250}
        maxSize={600}
        persistenceKey="dashboard-right-panel"
        className="bg-white border-l shadow-lg"
      >
        <div className="p-4">
          <h2>Properties Panel</h2>
          <div>{/* Your properties/settings */}</div>
        </div>
      </ResizablePanel>
    </div>
  );
}
```

### 3. Multiple Resizable Panels

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";

function CodeEditor() {
  return (
    <div className="flex h-screen">
      {/* Left sidebar - File tree */}
      <ResizablePanel
        defaultSize={250}
        minSize={180}
        maxSize={400}
        persistenceKey="file-tree"
        className="bg-gray-50 border-r"
      >
        <div className="p-2">
          <h3 className="font-bold mb-2">Files</h3>
          {/* File tree component */}
        </div>
      </ResizablePanel>

      {/* Main editor area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4">
          {/* Code editor */}
        </div>
      </div>

      {/* Right sidebar - Inspector */}
      <ResizablePanel
        side="left"
        defaultSize={300}
        minSize={200}
        maxSize={500}
        persistenceKey="inspector"
        className="bg-gray-50 border-l"
      >
        <div className="p-2">
          <h3 className="font-bold mb-2">Inspector</h3>
          {/* Inspector component */}
        </div>
      </ResizablePanel>
    </div>
  );
}
```

### 4. With CSS Variables

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";

function App() {
  return (
    <div className="flex h-screen">
      <ResizablePanel
        defaultSize={280}
        minSize={220}
        maxSize={450}
        variableName="--sidebar-width"
        persistenceKey="sidebar-width"
        className="bg-sidebar"
      >
        <div className="p-4">Sidebar</div>
      </ResizablePanel>

      {/* Use the CSS variable in your styles */}
      <main
        className="flex-1"
        style={{ marginLeft: 'var(--sidebar-width, 280px)' }}
      >
        Main Content
      </main>
    </div>
  );
}
```

### 5. Non-Resizable Panel (Fixed Width)

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";

function FixedSidebar() {
  return (
    <ResizablePanel
      resizable={false}
      defaultSize={250}
      className="bg-gray-100"
    >
      <div className="p-4">
        This sidebar has a fixed width of 250px
      </div>
    </ResizablePanel>
  );
}
```

### 6. With Size Change Callback

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";
import { useState } from "react";

function MonitoredPanel() {
  const [panelSize, setPanelSize] = useState(300);

  return (
    <div className="flex h-screen">
      <ResizablePanel
        defaultSize={300}
        minSize={200}
        maxSize={600}
        onSizeChange={setPanelSize}
        persistenceKey="monitored-panel"
        className="bg-white border-r"
      >
        <div className="p-4">
          <p className="text-sm text-gray-500">
            Current width: {panelSize}px
          </p>
          <div className="mt-4">
            {/* Panel content */}
          </div>
        </div>
      </ResizablePanel>

      <main className="flex-1 p-8">
        <h1>Main Content</h1>
        <p>Panel is currently {panelSize}px wide</p>
      </main>
    </div>
  );
}
```

### 7. Mobile-Responsive Panel

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";
import { useIsMobile } from "@/hooks/use-mobile";

function ResponsivePanel() {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen">
      <ResizablePanel
        defaultSize={300}
        minSize={250}
        maxSize={500}
        resizable={!isMobile} // Disable resizing on mobile
        persistenceKey="responsive-panel"
        className="bg-white border-r"
      >
        <div className="p-4">
          {isMobile ? "Fixed width on mobile" : "Resizable on desktop"}
        </div>
      </ResizablePanel>

      <main className="flex-1 p-8">Content</main>
    </div>
  );
}
```

### 8. Chat Application with Sidebar

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";

function ChatApp() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Channels/Conversations list */}
      <ResizablePanel
        defaultSize={280}
        minSize={220}
        maxSize={400}
        persistenceKey="chat-sidebar"
        className="bg-white border-r flex flex-col"
      >
        <div className="p-4 border-b">
          <h2 className="font-bold">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Conversation list */}
        </div>
      </ResizablePanel>

      {/* Chat messages area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {/* Messages */}
        </div>
        <div className="p-4 border-t">
          {/* Message input */}
        </div>
      </div>

      {/* User info / Settings panel */}
      <ResizablePanel
        side="left"
        defaultSize={300}
        minSize={250}
        maxSize={450}
        persistenceKey="chat-user-info"
        className="bg-white border-l"
      >
        <div className="p-4">
          <h3 className="font-bold mb-4">User Info</h3>
          {/* User profile and settings */}
        </div>
      </ResizablePanel>
    </div>
  );
}
```

## Advanced Examples

### 9. Dashboard with Collapsible Panels

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";
import { useState } from "react";

function CollapsibleDashboard() {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {!leftCollapsed && (
        <ResizablePanel
          defaultSize={280}
          minSize={200}
          maxSize={400}
          persistenceKey="left-panel"
          className="bg-gray-50 border-r"
        >
          <div className="p-4">
            <button
              onClick={() => setLeftCollapsed(true)}
              className="mb-4"
            >
              Collapse →
            </button>
            <div>Left Panel Content</div>
          </div>
        </ResizablePanel>
      )}

      {leftCollapsed && (
        <button
          onClick={() => setLeftCollapsed(false)}
          className="w-10 border-r"
        >
          ←
        </button>
      )}

      <main className="flex-1 p-8">
        <h1>Dashboard</h1>
      </main>

      {!rightCollapsed && (
        <ResizablePanel
          side="left"
          defaultSize={320}
          minSize={250}
          maxSize={500}
          persistenceKey="right-panel"
          className="bg-gray-50 border-l"
        >
          <div className="p-4">
            <button
              onClick={() => setRightCollapsed(true)}
              className="mb-4"
            >
              ← Collapse
            </button>
            <div>Right Panel Content</div>
          </div>
        </ResizablePanel>
      )}

      {rightCollapsed && (
        <button
          onClick={() => setRightCollapsed(false)}
          className="w-10 border-l"
        >
          →
        </button>
      )}
    </div>
  );
}
```

### 10. Custom Styled Panel

```tsx
import { ResizablePanel } from "@/components/ui/resizable-panel";

function CustomStyledPanel() {
  return (
    <ResizablePanel
      defaultSize={320}
      minSize={280}
      maxSize={500}
      persistenceKey="custom-panel"
      className="bg-gradient-to-b from-purple-50 to-pink-50 rounded-lg shadow-2xl"
      handleClassName="bg-purple-500"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          Custom Styled Panel
        </h2>
        <p className="text-purple-700">
          This panel has custom gradient background and styled resize handle
        </p>
      </div>
    </ResizablePanel>
  );
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultSize` | `number` | `256` | Default width in pixels |
| `minSize` | `number` | `192` | Minimum width in pixels |
| `maxSize` | `number` | `400` | Maximum width in pixels |
| `onSizeChange` | `(size: number) => void` | `undefined` | Callback when size changes |
| `variableName` | `string` | `undefined` | CSS custom property to update (e.g., "--panel-width") |
| `persistenceKey` | `string` | `undefined` | localStorage key to save size |
| `side` | `"left" \| "right"` | `"right"` | Which side the resize handle is on |
| `resizable` | `boolean` | `true` | Whether the panel can be resized |
| `handleClassName` | `string` | `undefined` | Custom class for the resize handle |
| `className` | `string` | `undefined` | Custom class for the panel |
| `children` | `ReactNode` | `undefined` | Panel content |

## Tips

1. **Always use unique `persistenceKey`** - This ensures each panel's size is saved independently
2. **Set appropriate min/max sizes** - Prevents panels from becoming too small or too large
3. **Use CSS variables for layouts** - Makes it easier to sync panel sizes with other elements
4. **Disable on mobile** - Use `resizable={!isMobile}` for better mobile UX
5. **Combine with state management** - Track panel sizes in your app state for advanced layouts
6. **Custom styling** - Use `className` and `handleClassName` to match your design system

## Integration with Existing Sidebar

The existing `Sidebar` component now uses `ResizablePanel` internally, so you get all these features for free! But you can also use `ResizablePanel` directly for any other resizable UI elements in your app.
