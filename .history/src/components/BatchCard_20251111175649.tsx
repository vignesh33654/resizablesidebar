import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import placeholderIcon from "@/assets/placeholder.svg";
import educatorImg1 from "@/assets/educator-1.png";
import educatorImg2 from "@/assets/educator-2.png";

const batchCardVariants = cva(
  "flex flex-col gap-3 p-3 bg-Bg-0 rounded-lg border border-border-primary shadow-sm",
  {
    variants: {
      size: {
        default: "w-[296px]",
        compact: "w-[240px]",
        wide: "w-[360px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const batchCardWrapperVariants = cva(
  "block rounded-lg transition-transform",
  {
    variants: {
      interactive: {
        true: "hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[3px] focus-visible:ring-primary/50 focus-visible:outline-none",
        false: "",
      },
      asLink: {
        true: "no-underline",
        false: "",
      },
      asButton: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
      asLink: false,
      asButton: false,
    },
  }
);

export interface BatchCardProps extends React.ComponentProps<"article"> {
  asChild?: boolean;
  size?: VariantProps<typeof batchCardVariants>["size"];
}

export interface BatchCardWrapperProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  href?: string;
  interactive?: boolean;
}

export interface BatchCardImageProps extends React.ComponentProps<"div"> {
  images?: string[];
  alt?: string;
}

export type BatchCardContentProps = React.ComponentProps<"div">;

export interface BatchCardHeaderProps extends React.ComponentProps<"div"> {
  language?: string;
  topic?: string;
}

export interface BatchCardTitleProps extends React.ComponentProps<"h3"> {
  asChild?: boolean;
}

export type BatchCardMetaProps = React.ComponentProps<"div">;

export interface BatchCardMetaItemProps extends React.ComponentProps<"div"> {
  icon?: string;
}

const BatchCard = React.forwardRef<HTMLElement, BatchCardProps>(
  ({ className, asChild = false, size, ...props }, ref) => {
    const Comp = asChild ? Slot : "article";
    return (
      <Comp
        ref={ref}
        data-slot="batch-card"
        aria-label="Batch information card"
        className={cn(batchCardVariants({ size }), className)}
        {...props}
      />
    );
  }
);
BatchCard.displayName = "BatchCard";

const BatchCardWrapper = React.forwardRef<
  HTMLElement,
  BatchCardWrapperProps
>(({ className, asChild = false, href, interactive = false, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : href ? "a" : "div";
  const isLink = !!href;
  const isButton = !!onClick && !href;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isButton && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      (onClick as React.MouseEventHandler<HTMLElement>)(e as unknown as React.MouseEvent<HTMLElement>);
    }
  };

  const wrapperProps = {
    ref: ref as React.Ref<HTMLElement>,
    "data-slot": "batch-card-wrapper",
    href,
    onClick: onClick as React.MouseEventHandler<HTMLElement>,
    onKeyDown: handleKeyDown as React.KeyboardEventHandler<HTMLElement>,
    tabIndex: interactive || isButton || isLink ? 0 : undefined,
    role: isButton ? ("button" as const) : undefined,
    className: cn(
      batchCardWrapperVariants({
        interactive: interactive || isButton || isLink,
        asLink: isLink,
        asButton: isButton,
      }),
      className
    ),
    ...props,
  };

  return <Comp {...wrapperProps} />;
});
BatchCardWrapper.displayName = "BatchCardWrapper";

const BatchCardImage = React.forwardRef<HTMLDivElement, BatchCardImageProps>(
  ({ className, images = [educatorImg1, educatorImg2], alt = "Educators", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="batch-card-image"
        className={cn("flex flex-col gap-0.5 items-center", className)}
        {...props}
      >
        <div className="bg-divider h-0.5 rounded-[20px] w-[168px]" aria-hidden="true" />
        <div className="bg-divider h-0.5 rounded-[20px] w-[208px]" aria-hidden="true" />

        <div
          className="bg-primary/5 flex gap-2 p-2 rounded-lg w-full h-[156px]"
          role="img"
          aria-label={alt}
        >
          {images.slice(0, 2).map((img, idx) => (
            <div
              key={idx}
              className="bg-primary h-[140px] w-[124px] rounded overflow-hidden relative shrink-0"
            >
              <img
                src={img}
                alt={`${alt} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);
BatchCardImage.displayName = "BatchCardImage";

const BatchCardContent = React.forwardRef<HTMLDivElement, BatchCardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="batch-card-content"
        className={cn("flex flex-col gap-2 w-full", className)}
        {...props}
      />
    );
  }
);
BatchCardContent.displayName = "BatchCardContent";

const BatchCardHeader = React.forwardRef<HTMLDivElement, BatchCardHeaderProps>(
  ({ className, language = "En", topic, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="batch-card-header"
        className={cn("flex gap-2 items-center", className)}
        {...props}
      >
        {language && (
          <span
            className="bg-neutral-100 border border-border-primary text-default text-small-12 px-1.5 py-0.5 rounded inline-flex items-center justify-center min-w-[26px]"
            aria-label={`Language: ${language}`}
          >
            {language}
          </span>
        )}
        {topic && (
          <span
            className="text-primary text-small-12 flex-1 min-w-0"
            aria-label={`Topic: ${topic}`}
          >
            {topic}
          </span>
        )}
      </div>
    );
  }
);
BatchCardHeader.displayName = "BatchCardHeader";

const BatchCardTitle = React.forwardRef<HTMLHeadingElement, BatchCardTitleProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";
    return (
      <Comp
        ref={ref}
        data-slot="batch-card-title"
        className={cn("text-default m-0", className)}
        {...props}
      />
    );
  }
);
BatchCardTitle.displayName = "BatchCardTitle";

const BatchCardMeta = React.forwardRef<HTMLDivElement, BatchCardMetaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="batch-card-meta"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    );
  }
);
BatchCardMeta.displayName = "BatchCardMeta";

const BatchCardMetaItem = React.forwardRef<HTMLDivElement, BatchCardMetaItemProps>(
  ({ className, icon = placeholderIcon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="batch-card-meta-item"
        className={cn("flex gap-2 items-center", className)}
        {...props}
      >
        <div className="image-placeholder w-5 h-5 shrink-0" aria-hidden="true">
          <img src={icon} alt="" className="w-full h-full" />
        </div>
        <p className="text-secondary flex-1 min-w-0 m-0">{children}</p>
      </div>
    );
  }
);
BatchCardMetaItem.displayName = "BatchCardMetaItem";

export {
  BatchCard,
  BatchCardWrapper,
  BatchCardImage,
  BatchCardContent,
  BatchCardHeader,
  BatchCardTitle,
  BatchCardMeta,
  BatchCardMetaItem,
};
