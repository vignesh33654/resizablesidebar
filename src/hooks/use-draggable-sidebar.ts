"use client";

import * as React from "react";

interface UseDraggableSidebarProps {
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  onWidthChange?: (width: number) => void;
}

// Helper function to manage timeouts consistently
function useTimeoutHelper() {
  const timeoutRef = React.useRef<number | null>(null);

  const setTimeoutHelper = React.useCallback(
    (callback: () => void, delay: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(callback, delay);
    },
    []
  );

  const clearTimeoutHelper = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { setTimeoutHelper, clearTimeoutHelper };
}

// Debounce hook for the onWidthChange callback
function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T | undefined,
  delay: number
): T {
  const callbackRef = React.useRef(callback);
  const timeoutRef = React.useRef<number | null>(null);

  // Update the callback ref when callback changes
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return React.useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current?.(...args);
      }, delay);
    }) as T,
    [delay]
  );
}

export function useDraggableSidebar({
  defaultWidth = 256,
  minWidth = 192,
  maxWidth = 400,
  onWidthChange,
}: UseDraggableSidebarProps = {}) {
  const [width, setWidth] = React.useState(defaultWidth);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isKeyboardResizing, setIsKeyboardResizing] = React.useState(false);
  const [isDoubleClickResetting, setIsDoubleClickResetting] =
    React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const dragStartX = React.useRef<number>(0);
  const dragStartWidth = React.useRef<number>(0);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  // Use timeout helpers for cleaner timeout management
  const keyboardTimeout = useTimeoutHelper();
  const hoverTimeout = useTimeoutHelper();

  // Debounced onWidthChange callback (300ms delay)
  const debouncedOnWidthChange = useDebouncedCallback(onWidthChange, 300);

  const updateWidth = React.useCallback(
    (newWidth: number) => {
      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setWidth(clampedWidth);

      // Use debounced callback to prevent excessive external updates
      debouncedOnWidthChange(clampedWidth);
    },
    [minWidth, maxWidth, debouncedOnWidthChange]
  );

  // Use layoutEffect to prevent layout flicker - DOM updates happen synchronously
  React.useLayoutEffect(() => {
    // Update CSS custom property
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);

    // Update sidebar element directly
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${width}px`;
    }
  }, [width]);

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
      setShowTooltip(false);
      dragStartX.current = event.clientX;
      dragStartWidth.current = width;

      // Clear hover timeout when starting drag
      hoverTimeout.clearTimeoutHelper();

      // Capture the pointer to ensure we get all pointer events
      if (event.currentTarget instanceof Element) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [width, hoverTimeout]
  );

  const handlePointerMove = React.useCallback(
    (event: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - dragStartX.current;
      const newWidth = dragStartWidth.current + deltaX;
      updateWidth(newWidth);
    },
    [isDragging, updateWidth]
  );

  const handlePointerUp = React.useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, [isDragging]);

  const handleDoubleClick = React.useCallback(() => {
    // Clear hover state immediately to prevent flicker
    setIsHovering(false);
    setShowTooltip(false);

    // Clear any pending hover timeouts
    hoverTimeout.clearTimeoutHelper();

    // Enable smooth transition for double-click reset
    setIsDoubleClickResetting(true);
    updateWidth(defaultWidth);

    // Clear the resetting state after transition completes
    setTimeout(() => {
      setIsDoubleClickResetting(false);
    }, 300); // Match the CSS transition duration
  }, [defaultWidth, updateWidth, hoverTimeout]);

  // ...existing code...

  const handleMouseEnter = React.useCallback(() => {
    // Clear any existing hover timeout
    hoverTimeout.clearTimeoutHelper();

    // Set timeout to set hovering state after 200ms
    hoverTimeout.setTimeoutHelper(() => {
      setIsHovering(true);

      // Then set another timeout for tooltip after additional 400ms (total 600ms)
      hoverTimeout.setTimeoutHelper(() => {
        if (!isDragging) {
          setShowTooltip(true);
        }
      }, 400);
    }, 200);
  }, [isDragging, hoverTimeout]);

  // ...existing code...

  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false);
    setShowTooltip(false);

    // Clear hover timeout
    hoverTimeout.clearTimeoutHelper();
  }, [hoverTimeout]);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const step = event.shiftKey ? 50 : 10;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIsKeyboardResizing(true);
        updateWidth(width + step);

        // Use keyboard timeout helper
        keyboardTimeout.setTimeoutHelper(() => {
          setIsKeyboardResizing(false);
        }, 300);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIsKeyboardResizing(true);
        updateWidth(width - step);

        // Use keyboard timeout helper
        keyboardTimeout.setTimeoutHelper(() => {
          setIsKeyboardResizing(false);
        }, 300);
      }
    },
    [width, updateWidth, keyboardTimeout]
  );

  // Pointer event listeners - more robust than mouse events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Keyboard event listener
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    width,
    isDragging,
    isKeyboardResizing,
    isDoubleClickResetting,
    isHovering,
    showTooltip,
    sidebarRef,
    dragHandleProps: {
      onPointerDown: handlePointerDown,
      onDoubleClick: handleDoubleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
