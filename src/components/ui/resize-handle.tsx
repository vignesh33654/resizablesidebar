"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ResizeHandleProps extends React.ComponentProps<"div"> {
    isHovering: boolean;
    isDragging: boolean;
    isKeyboardResizing: boolean;
    showTooltip: boolean;
    side?: "left" | "right";
}

export function ResizeHandle({
    isHovering,
    isDragging,
    isKeyboardResizing,
    showTooltip,
    side = "right",
    className,
    ...props
}: ResizeHandleProps) {
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = React.useCallback((event: React.MouseEvent) => {
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    }, []);

    return (
        <>
            {/* Invisible wider hover area */}
            <div
                className={cn(
                    "absolute inset-y-0 z-50 cursor-col-resize",
                    side === "left" ? "-right-2" : "-left-2", // 8px wide invisible area
                    "w-4", // 16px total hover area (8px on each side of the line)
                    className
                )}
                onMouseMove={handleMouseMove}
                {...props}
            />
            {/* Visible thin line */}
            <div
                className={cn(
                    "absolute inset-y-0 z-40 w-px pointer-events-none transition-all duration-200", // pointer-events-none so it doesn't interfere
                    side === "left" ? "-right-px" : "-left-px",
                    isHovering || isDragging || isKeyboardResizing
                        ? "bg-black w-0.5"
                        : "bg-transparent hover:bg-black hover:w-0.5",
                    (isDragging || isKeyboardResizing) && "bg-black w-0.5",
                    isKeyboardResizing && "bg-black w-0.5"
                )}
                style={{
                    transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)",
                }}
            />
            {showTooltip && !isDragging && (
                <div
                    className="fixed z-50 pointer-events-none"
                    style={{
                        left: tooltipPosition.x + 110,
                        top: tooltipPosition.y,
                        transform: "translateX(-50%)",
                        transition: "none",
                    }}
                >
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg space-y-1">
                        <div>Drag to resize</div>
                        <div>Double-click to reset</div>
                        <div>Arrow keys: 10px (Shift: 50px)</div>
                    </div>
                </div>
            )}
        </>
    );
}
