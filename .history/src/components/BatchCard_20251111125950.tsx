import educatorImg1 from '../assets/educator-1.png';
import educatorImg2 from '../assets/educator-2.png';
import calendarIcon from '../assets/icon-calendar.svg';
import clockIcon from '../assets/icon-clock.svg';
import userIcon from '../assets/icon-user.svg';

export interface BatchCardProps {

  language?: string;
  topic: string;

  title: string;

  startDate: string;

  timing: string;

  educators: string;

  href?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Array of educator image URLs (defaults to sample images) */
  educatorImages?: string[];
}

export default function BatchCard({
  language = "En",
  topic,
  title,
  startDate,
  timing,
  educators,
  href,
  onClick,
  educatorImages = [educatorImg1, educatorImg2],
}: BatchCardProps) {
  const CardWrapper = href ? 'a' : 'div';
  const wrapperProps = href 
    ? { 
        href, 
        className: "block no-underline focus-ring rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98]",
        tabIndex: 0,
        'aria-label': `View batch: ${title}`
      } 
    : { 
        className: "block",
        ...(onClick && {
          role: "button" as const,
          tabIndex: 0,
          onClick,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          },
          'aria-label': `View batch: ${title}`,
          className: "block cursor-pointer focus-ring rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        })
      };

  return (
    <CardWrapper {...wrapperProps}>
      <article 
        className="flex flex-col gap-3 p-3 bg-Bg-0 rounded-lg border border-border-primary shadow-sm w-[296px]"
        aria-label="Batch information card"
      >
        {/* Thumbnail Section */}
        <div className="flex flex-col gap-[3px] items-center">
          {/* Loading skeleton bars */}
          <div className="bg-divider h-[2px] rounded-[20px] w-[168px]" aria-hidden="true" />
          <div className="bg-divider h-[2px] rounded-[20px] w-[208px]" aria-hidden="true" />
          
          {/* Educator Images */}
          <div 
            className="bg-primary/5 flex gap-2 p-2 rounded-lg w-full h-[156px]"
            role="img"
            aria-label={`Educators for ${title}`}
          >
            {educatorImages.slice(0, 2).map((img, idx) => (
              <div 
                key={idx}
                className="bg-primary h-[140px] w-[124px] rounded-[3.676px] overflow-hidden relative flex-shrink-0"
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

        {/* Content Section */}
        <div className="flex flex-col gap-2 w-full">
          {/* Language + Topic Tag */}
          <div className="flex gap-2 items-center">
            <span 
              className="bg-neutral-100 border border-border-primary text-text-primary text-small-12 leading-4 px-1.5 py-0.5 rounded inline-flex items-center justify-center h-[18px] min-w-[26px]"
              aria-label={`Language: ${language}`}
            >
              {language}
            </span>
            <span 
              className="text-primary text-small-12 leading-4 font-normal flex-1 min-w-0"
              aria-label={`Topic: ${topic}`}
            >
              {topic}
            </span>
          </div>

          {/* Meta Information */}
          <div className="flex flex-col gap-2">
            {/* Title */}
            <h3 className="text-text-primary text-body-16 leading-6 font-normal tracking-[-0.011em] m-0">
              {title}
            </h3>

            {/* Start Date */}
            <div className="flex gap-2 items-center">
              <div className="image-placeholder w-5 h-5 shrink-0" aria-hidden="true">
                <img src={calendarIcon} alt="" className="w-full h-full" />
              </div>
              <p className="text-text-secondary text-body-14 leading-6 font-normal tracking-[-0.006em] flex-1 min-w-0 m-0">
                {startDate}
              </p>
            </div>

            {/* Timing */}
            <div className="flex gap-2 items-center">
              <div className="image-placeholder w-5 h-5 shrink-0" aria-hidden="true">
                <img src={clockIcon} alt="" className="w-full h-full" />
              </div>
              <p className="text-text-secondary text-body-14 leading-6 font-normal tracking-[-0.006em] flex-1 min-w-0 m-0">
                {timing}
              </p>
            </div>

            {/* Educators */}
            <div className="flex gap-2 items-start">
              <div className="image-placeholder w-5 h-5 flex-shrink-0" aria-hidden="true">
                <img src={userIcon} alt="" className="w-full h-full" />
              </div>
              <p className="text-text-secondary text-body-14 leading-6 font-normal tracking-[-0.006em] flex-1 min-w-0 m-0">
                {educators}
              </p>
            </div>
          </div>
        </div>
      </article>
    </CardWrapper>
  );
}

