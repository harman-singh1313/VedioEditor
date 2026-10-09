import { Link } from "react-router-dom";

const Hero = ({
  tag,
  title = [],
  accentWord,
  description,
  image,
  primaryBtn,
  secondaryBtn,
}) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title.join(" ")}
          className="h-full w-full object-cover object-[65%_center] sm:object-[70%_center] lg:object-right"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070014]/95 via-[#070014]/80 to-[#070014] md:bg-gradient-to-r md:from-[#070014] md:via-[#070014]/90 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-24 sm:px-8 md:px-10 lg:px-12">

        <div className="w-full max-w-2xl">

          {/* Tag */}
          <p className="mono-font mb-4 text-[10px] uppercase tracking-[3px] text-purple-400 sm:mb-6 sm:text-xs sm:tracking-[4px]">
            {tag}
          </p>

          {/* Title */}
          <h1 className="leading-[0.9]">
            {title.map((line, index) => (
              <span
                key={index}
                className={`main-font block text-5xl font-bold sm:text-6xl md:text-8xl ${
                  line === accentWord
                    ? "text-purple-400"
                    : "text-white"
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-sm leading-7 text-gray-300 sm:mt-8 sm:text-base sm:leading-8 md:text-lg">
            {description}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">

            {primaryBtn && (
              <Link
                to={primaryBtn.link}
                className="w-full rounded-md bg-purple-500 px-7 py-3.5 text-center text-xs font-medium tracking-[3px] text-white transition hover:bg-purple-600 sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
              >
                {primaryBtn.text}
              </Link>
            )}

            {secondaryBtn && (
              <Link
                to={secondaryBtn.link}
                className="w-full px-4 py-3.5 text-center text-xs tracking-[3px] text-gray-300 transition hover:text-white sm:w-auto sm:py-4 sm:text-sm"
              >
                {secondaryBtn.text} →
              </Link>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;