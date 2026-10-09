import {
  Pencil,
  Palette,
  Volume2,
  Clapperboard,
  Film,
  Music,
  Plane,
  Camera as CameraIcone,
  Lightbulb,
} from "lucide-react";

const tools=[
    {
    icon: Pencil,
    title: "EDITING",
    text: "Rhythm, pacing and narrative structure.",
  },
  {
    icon: Palette,
    title: "COLOR",
    text: "Building a visual language that supports the story.",
  },
  {
    icon: Volume2,
    title: "SOUND",
    text: "Creating atmosphere through sound and music.",
  },
  {
    icon: Clapperboard,
    title: "STORY",
    text: "Finding the emotion inside the footage.",
  },
];

const stats = [
  ["07+", "YEARS EXPERIENCE"],
  ["40+", "PROJECTS COMPLETED"],
  ["12+", "BRANDS WORKED WITH"],
  ["05+", "AWARDS & RECOGNITIONS"],
];

const categories = [
  [Film, "FILM"],
  [Music, "MUSIC"],
  [Plane, "TRAVEL"],
  [CameraIcone, "PHOTOGRAPHY"],
  [Lightbulb, "IDEAS"],
];


const ToolKitSection = ({   image,
  eyebrow = "BEYOND THE TIMELINE",
  title = "More Than Just Editing",
  description,
 }) => {
  return (
<section className=" px-6 py-10 text-white md:px-10">
      
      {/* TOP */}
      <div className="mx-auto grid max-w-7xl border-y border-white/10 md:grid-cols-[180px_1fr_130px]">

        {/* Title */}
        <div className="border-b border-white/10 py-6 md:border-b-0 md:border-r">
          <p className="text-sm tracking-[0.25em] text-purple-400">
            WHAT I BRING
          </p>

          <h2 className="mt-1 font-serif text-4xl leading-none">
            My
            <br />
            Toolkit
          </h2>
        </div>

        {/* Tools */}
        <div className="grid grid-cols-2 gap-8 py-7 md:grid-cols-4 md:px-8 ">
          {tools.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-purple-500/60 text-purple-400">
                <Icon size={18} strokeWidth={2} />
              </div>

              <div>
                <h3 className="text-md tracking-[0.18em]">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5 border-t border-white/10 py-4 md:grid-cols-1 md:border-l md:border-t-0 md:pl-6">
          {stats.map(([number, label]) => (
            <div key={label} className="flex gap-3 justify-evenly">
              <h3 className="text-xl">{number}</h3>
              <p className="mt-1 text-xs tracking-widest text-gray-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-auto grid max-w-7xl md:grid-cols-[180px_1fr_130px]">

        {/* Image */}
        <div className="relative hidden md:block">
          {/* <p className="absolute left-[-2px] top-6 z-10 max-w-[80px] -rotate-6 font-serif text-sm italic text-purple-400">
            Some projects,
            <br />
            just different
            <br />
            kinds of shots.
          </p> */}

          <img
            src={image}
            alt="Creative workspace"
            className="h-[190px] w-full object-cover opacity-80"
          />
        </div>

        {/* Text */}
        <div className="py-8 md:px-8">
          <p className="text-sm tracking-[0.25em] text-purple-400">
            {eyebrow}
          </p>

          <h2 className="mt-1 font-serif text-3xl leading-none md:text-3xl">
            {title}
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-[1.8] text-gray-500">
            {description}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 md:border-l md:border-t-0 md:pl-6">
          {categories.map(([Icon, label]) => (
            <div
              key={label}
              className="flex items-center gap-3 text-gray-400"
            >
              <Icon size={22} strokeWidth={1.5} />

              <span className="text-xs tracking-[0.18em]">
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>  )
}

export default ToolKitSection