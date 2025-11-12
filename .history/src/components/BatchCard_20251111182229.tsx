import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import placeholderIcon from "@/assets/placeholder.svg";

const batchCardVariants = cva(
  "block rounded-lg transition-transform",
  {
    variants: {
      size: {
        default: "w-[296px]",
        compact: "w-[240px]",
        wide: "w-[360px]",
      },
      interactive: {
        true: "hover:trans focus-visible:ring-[3px] focus-visible:ring-primary/50 focus-visible:outline-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      interactive: false,
    },
  }
);

export interface BatchCardProps extends React.ComponentProps<"div"> {
  language?: string;
  topic: string;
  title: string;
  startDate: string;
  timing: string;
  educators: string;
  educatorImages?: string[];
  href?: string;
  onClick?: () => void;
  size?: VariantProps<typeof batchCardVariants>["size"];
  imgAlt?: [];
}

export function BatchCard({
  language = "En",
  topic,
  title,
  startDate,
  timing,
  educators,
  educatorImages = [],
  href,
  onClick,
  size = "default",
  className,
}: BatchCardProps) {
  const Wrapper = href ? "a" : "div";
  const isInteractive = !!(href || onClick);
  const isButton = !!onClick && !href;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isButton && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  const wrapperProps = {
    href,
    onClick: onClick as never,
    onKeyDown: isButton ? (handleKeyDown as never) : undefined,
    tabIndex: isInteractive ? 0 : undefined,
    role: isButton ? "button" : undefined,
    "aria-label": isInteractive ? `View batch: ${title}` : undefined,
    className: cn(batchCardVariants({ size, interactive: isInteractive }), className),
  };

  return (
    <Wrapper {...wrapperProps}>
      <article
        className="flex flex-col gap-3 p-3 bg-Bg-0 rounded-lg border border-border-primary shadow-sm"
        data-slot="batch-card"
      >
        <div className="flex flex-col gap-0.5 items-center">
          <div className="bg-divider h-0.5 rounded-[20px] w-[168px]" aria-hidden="true" />
          <div className="bg-divider h-0.5 rounded-[20px] w-[208px]" aria-hidden="true" />

          <div
            className="bg-primary/5 flex gap-2 p-2 rounded-lg w-full h-[156px]"
            role="img"
            aria-label={`Educators for ${title}`}
          >
            {educatorImages.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                className="bg-primary h-[140px] w-[124px] rounded overflow-hidden relative shrink-0"
              >
                <img
                  src={img}
                  alt={`Educator ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            {language && (
              <span
                className="bg-neutral-100 border border-border-primary text-default text-small-12 px-1.5 py-0.5 rounded inline-flex items-center justify-center min-w-[26px]"
                aria-label={`Language: ${language}`}
              >
                {language}
              </span>
            )}
            <span
              className="text-primary text-small-12 flex-1 min-w-0"
              aria-label={`Topic: ${topic}`}
            >
              {topic}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-default m-0">{title}</h3>

            <div className="flex gap-2 items-center">
              <div className="image-placeholder w-5 h-5 shrink-0" aria-hidden="true">
                <img src={placeholderIcon} alt="" className="w-full h-full" />
              </div>
              <p className="text-secondary flex-1 min-w-0 m-0">{startDate}</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="image-placeholder w-5 h-5 shrink-0" aria-hidden="true">
                <img src={placeholderIcon} alt="" className="w-full h-full" />
              </div>
              <p className="text-secondary flex-1 min-w-0 m-0">{timing}</p>
            </div>

            <div className="flex gap-2 items-start">
              <div className="image-placeholder w-5 h-5 shrink-0" aria-hidden="true">
                <img src={placeholderIcon} alt="" className="w-full h-full" />
              </div>
              <p className="text-secondary flex-1 min-w-0 m-0">{educators}</p>
            </div>
          </div>
        </div>
      </article>
    </Wrapper>
  );
}

