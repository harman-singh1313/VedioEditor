import { useEffect, useRef, useState } from "react";

const PortfolioCard = ({
  image,
  title,
  subtitle,
  tags = [],
  duration,
  cardClass = "w-full h-[550px]",
  enableZoom = true,
  enableGrayscale = false,
  colorOnHover = true,
  overlay = "dark",
}) => {
  const cardRef = useRef(null);
  const [mobileActive, setMobileActive] = useState(false);

  const overlayStyles = {
    dark: "bg-gradient-to-t from-black via-black/50 to-transparent",
    light: "bg-gradient-to-t from-black/70 via-transparent to-transparent",
    purple:
      "bg-gradient-to-t from-[#3b0764] via-[#1e1b4b]/40 to-transparent",
    none: "",
  };

  useEffect(() => {
    // Only run automatic effect on mobile
    if (window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMobileActive(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group relative overflow-hidden rounded-2xl cursor-pointer
        ${cardClass}
      `}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className={`
          h-full w-full object-cover object-center
          transition-all duration-700 ease-out

          ${
            enableZoom
              ? mobileActive
                ? "scale-110"
                : "scale-100"
              : ""
          }

          ${
            enableGrayscale
              ? colorOnHover
                ? mobileActive
                  ? "grayscale-0"
                  : "grayscale"
                : "grayscale"
              : ""
          }

          md:group-hover:scale-110
          md:group-hover:grayscale-0
        `}
      />

      {/* Overlay */}
      <div
        className={`
          absolute inset-0
          transition-all duration-700
          ${overlayStyles[overlay]}
        `}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-10">
        {subtitle && (
          <p className="mb-3 text-[10px] uppercase tracking-[3px] text-purple-400 sm:text-xs">
            {subtitle}
          </p>
        )}

        <h2
          className={`
            main-font text-xl text-white sm:text-2xl md:text-4xl
            transition-all duration-500

            md:translate-y-4 md:opacity-80
            md:group-hover:translate-y-0
            md:group-hover:opacity-100

            ${mobileActive ? "translate-y-0 opacity-100" : ""}
          `}
        >
          {title}
        </h2>

        {tags.length > 0 && (
          <div
            className={`
              mt-3 flex flex-wrap gap-2
              transition-all duration-500

              md:translate-y-3 md:opacity-0
              md:group-hover:translate-y-0
              md:group-hover:opacity-100

              ${mobileActive ? "translate-y-0 opacity-100" : ""}
            `}
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                className="
                  border border-white/20
                  bg-black/30
                  px-2.5 py-1
                  text-[10px] uppercase tracking-wider
                  text-white backdrop-blur-sm
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Duration */}
      {duration && (
        <div
          className={`
            absolute bottom-5 right-5 text-xs
            transition-all duration-500
            md:bottom-8 md:right-8 md:text-sm
            md:group-hover:text-white
            ${mobileActive ? "text-white" : "text-white/70"}
          `}
        >
          {duration}
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;