import { ResizablePanel } from "@/components/ui/resizable-panel";
import { useState } from "react";

/**
 * Example demonstrating how to use ResizablePanel in your own components.
 * This shows multiple resizable panels in a single layout.
 */
export function ResizablePanelDemo() {
  const [leftSize, setLeftSize] = useState(280);
  const [rightSize, setRightSize] = useState(320);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - File Explorer */}
      <ResizablePanel
        defaultSize={280}
        minSize={200}
        maxSize={500}
        onSizeChange={setLeftSize}
        persistenceKey="demo-left-panel"
        className="bg-white border-r flex flex-col"
      >
        <div className="p-4 border-b bg-gray-100">
          <h2 className="font-bold text-lg">Files</h2>
          <p className="text-xs text-gray-500">Width: {leftSize}px</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
              📁 src
            </div>
            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer ml-4">
              📄 App.tsx
            </div>
            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer ml-4">
              📄 main.tsx
            </div>
            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
              📁 components
            </div>
            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer ml-4">
              📄 Header.tsx
            </div>
          </div>
        </div>
      </ResizablePanel>

      {/* Center - Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h1 className="text-2xl font-bold">ResizablePanel Demo</h1>
          <p className="text-gray-600 mt-1">
            Try resizing the panels by dragging the handles!
          </p>
        </div>
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="space-y-2">
                <li>✅ Drag to resize panels</li>
                <li>✅ Double-click handle to reset to default size</li>
                <li>✅ Use Arrow Left/Right to resize (10px)</li>
                <li>✅ Shift + Arrow for larger steps (50px)</li>
                <li>✅ Sizes persist to localStorage</li>
                <li>✅ Fully customizable min/max bounds</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Current Panel Sizes
              </h3>
              <div className="space-y-1 text-sm text-blue-700">
                <p>Left Panel: {leftSize}px</p>
                <p>Right Panel: {rightSize}px</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2">
                Easy to Use
              </h3>
              <pre className="text-xs bg-white p-4 rounded overflow-x-auto">
{`<ResizablePanel
  defaultSize={280}
  minSize={200}
  maxSize={500}
  persistenceKey="my-panel"
>
  <YourContent />
</ResizablePanel>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Properties */}
      <ResizablePanel
        side="left"
        defaultSize={320}
        minSize={250}
        maxSize={600}
        onSizeChange={setRightSize}
        persistenceKey="demo-right-panel"
        className="bg-white border-l flex flex-col"
      >
        <div className="p-4 border-b bg-gray-100">
          <h2 className="font-bold text-lg">Properties</h2>
          <p className="text-xs text-gray-500">Width: {rightSize}px</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Panel Name
              </label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                placeholder="My Panel"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Background Color
              </label>
              <input
                type="color"
                className="w-full mt-1 h-10 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Width Range
              </label>
              <div className="mt-1 space-y-1 text-sm text-gray-600">
                <p>Min: 250px</p>
                <p>Current: {rightSize}px</p>
                <p>Max: 600px</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </div>
  );
}
