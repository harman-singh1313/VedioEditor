const approaches=[
   {
    number: "01",
    title: "STORY FIRST",
    description: "Every cut should serve the story.",
  },
  {
    number: "02",
    title: "DETAILS MATTER",
    description: "Color, sound, rhythm and timing work together.",
  },
  {
    number: "03",
    title: "FEELING OVER FORMULA",
    description: "I don't edit by a template. Every project gets its own language.",
  },
]


const ApproachSection = ({image}) => {
  return (
    <section className="px-6 py-16 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-3">

        {/* LEFT CONTENT */}
        <div className="p-4">
          <p className="text-sm tracking-[0.2em] text-purple-700">
            MY APPROACH
          </p>

          <h2 className="main-font py-3 text-4xl font-bold">
            How I Work
          </h2>

          <p className="pt-4 leading-7 text-gray-600">
            It's not just about cutting clips. It's about understanding
            the story, the emotion and the bigger picture. Here's what
            guides me.
          </p>
        </div>

        {/* MIDDLE - APPROACHES */}
        <div className="p-4">
          {approaches.map((item, index) => (
            <div
              key={item.number}
              className={`flex gap-6 py-6 ${
                index !== approaches.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              {/* Number */}
              <span className="main-font text-4xl font-bold">
                {item.number}
              </span>

              {/* Text */}
              <div>
                <h3 className="mono-font text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT IMAGE */}
        <div className="overflow-hidden p-4">
          <img
            src={image}
            alt="Creative workspace"
            className="h-[380px] w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

      </div>
    </section>
  )
}

export default ApproachSection