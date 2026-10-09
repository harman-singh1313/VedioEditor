const HeroVedios = ({
  title,
  description,
  video,
}) => {
  return (
    <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-black text-white">

      {/* VIDEO */}
      <video
        className="absolute inset-0 h-full w-full scale-[1.25] object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={video}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/25" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-8 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">

        <h1 className="font-serif text-5xl font-medium leading-none text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            {description}
          </p>
        )}

      </div>
    </section>
  );
};

export default HeroVedios;