const ProcessCard = ({
  number,
  image,
  title,
  description,
}) => {
  return (
    <div className="w-full max-w-[320px] group">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex items-start gap-3">
        <span className="text-[9px] text-purple-400">
          {number}
        </span>

        <div>
          <h3 className="text-[11px] tracking-[0.15em] text-white">
            {title}
          </h3>

          <p className="mt-1 text-[7px] tracking-[0.18em] text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;