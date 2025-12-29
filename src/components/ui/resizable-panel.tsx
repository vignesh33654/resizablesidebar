"use client";

import * as React from "react";
import { useResizable } from "@/hooks/use-resizable";
import { ResizeHandle } from "@/components/ui/resize-handle";
import { cn } from "@/lib/utils";

export interface ResizablePanelProps extends React.ComponentProps<"div"> {
  /**
   * Default width of the panel in pixels
   * @default 256
   */
  defaultSize?: number;

  /**
   * Minimum width of the panel in pixels
   * @default 192
   */
  minSize?: number;

  /**
   * Maximum width of the panel in pixels
   * @default 400
   */
  maxSize?: number;

  /**
   * Callback when the size changes
   */
  onSizeChange?: (size: number) => void;

  /**
   * CSS custom property name to update with the size
   * Example: "--my-panel-width"
   */
  variableName?: string;

  /**
   * localStorage key to persist the panel size
   * Example: "my-panel-width"
   */
  persistenceKey?: string;

  /**
   * Which side the resize handle should be on
   * @default "right"
   */
  side?: "left" | "right";

  /**
   * Whether to show the resize handle
   * @default true
   */
  resizable?: boolean;

  /**
   * Custom class name for the resize handle
   */
  handleClassName?: string;

  /**
   * Children to render inside the panel
   */
  children?: React.ReactNode;
}

/**
 * A generic resizable panel component that can be used for sidebars, drawers,
 * or any other resizable container.
 *
 * Features:
 * - Drag to resize
 * - Double-click to reset to default size
 * - Keyboard resize with arrow keys (Left/Right: 10px, Shift+Left/Right: 50px)
 * - Optional persistence to localStorage
 * - Optional CSS custom property update
 * - Fully customizable sizes and behavior
 *
 * @example
 * ```tsx
 * // Simple sidebar
 * <ResizablePanel
 *   defaultSize={300}
 *   minSize={200}
 *   maxSize={500}
 *   persistenceKey="my-sidebar"
 * >
 *   <div>My content</div>
 * </ResizablePanel>
 *
 * // Right-side panel with CSS variable
 * <ResizablePanel
 *   side="left"
 *   variableName="--right-panel-width"
 *   defaultSize={400}
 * >
 *   <div>Right panel content</div>
 * </ResizablePanel>
 *
 * // Non-resizable panel (fixed width)
 * <ResizablePanel resizable={false} defaultSize={250}>
 *   <div>Fixed width content</div>
 * </ResizablePanel>
 * ```
 */
export function ResizablePanel({
  defaultSize = 256,
  minSize = 192,
  maxSize = 400,
  onSizeChange,
  variableName,
  persistenceKey,
  side = "right",
  resizable = true,
  handleClassName,
  className,
  children,
  ...props
}: ResizablePanelProps) {
  const {
    isDragging,
    isKeyboardResizing,
    isDoubleClickResetting,
    isHovering,
    showTooltip,
    elementRef,
    handleProps,
  } = useResizable({
    defaultSize,
    minSize,
    maxSize,
    onSizeChange,
    variableName,
    persistenceKey,
  });

  return (
    <div
      ref={elementRef}
      className={cn(
        "relative flex flex-col",
        ((!isDragging && !isKeyboardResizing) || isDoubleClickResetting) &&
          "transition-none",
        className
      )}
      {...(((!isDragging && !isKeyboardResizing) ||
        isDoubleClickResetting) && {
        style: {
          transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
          transitionDuration: "200ms",
        },
      })}
      {...props}
    >
      {children}
      {resizable && (
        <ResizeHandle
          {...handleProps}
          isHovering={isHovering}
          isDragging={isDragging}
          isKeyboardResizing={isKeyboardResizing}
          showTooltip={showTooltip}
          side={side}
          className={handleClassName}
        />
      )}
    </div>
  );
}
