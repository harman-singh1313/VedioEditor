import framing from "../assets/Images/framing.jpg";
import Hero from "../Components/Common/Hero";
import working from "../assets/Images/working.png";
import ProcessCard from "../Components/Common/processCard";
import photoShoot from "../assets/Images/photoShoot.jpg";
import shootDone from "../assets/Images/shootDone.jpg";
import ToolKitSection from "../Components/js/ToolKitSection";

const About = () => {
  return (
    <div>
      <Hero
        tag="About"
        title={["The Editor", "Behind the", "Cut."]}
        accentWord="Behind the"
        description="I shape raw footage into stories that feel
intentional, emotional, and cinematic."
        image={framing}
      />
      <section className="flex justify-between p-20">
        <div className="w-1/4 p-10">
          <p className="text-purple-700">MY  APPROACH</p>
          <h1 className="main-font text-4xl font-bold py-3">
            How I Work
          </h1>
          <p className="text-gray-600 pt-4">
            it's not just about cutting clips.
            it's about understanding the story,
            the emotion and the bigger picture.
            Here's what guides me.
          </p>
        </div>

        <ul className="p-10">
          <li className="border-b border-gray-700 pb-4 mb-4" >
            <ol className="flex gap-6" >
              <li className="main-font text-4xl font-bold">01</li>
              <li>
                <h1 className="mono-font font-bold text-xl">
                  STORY FIRST
                </h1>
                <p className="text-gray-700 text-md">
                  Every cut should serve the story.
                </p>
              </li>
            </ol>
          </li>


          <li className="border-b border-gray-700 pb-4 mb-4">
            <ol className="flex gap-6">
              <li className="main-font text-4xl font-bold">
                02
              </li>
              <li>
                <h1 className="mono-font font-bold text-xl">
                  DETAILS MATTER
                </h1>
                <p className="text-gray-700 text-md">
                  Color, sound, rhythm and timing
                  work together.
                </p>
              </li>
            </ol>
          </li>

          <li >
            <ol className="flex gap-6">
              <li className="main-font text-4xl font-bold">03</li>
              <li>
                <h1 className="mono-font font-bold text-xl">FEELING OVER FORMULA</h1>
                <p className="text-gray-700 text-md"> I don't edit by a template.
                  Every project gets its own language.</p>
              </li>
            </ol>
          </li>
        </ul>

        <div>
          <img src={working} alt=""
            className="w-84 object-cover"
          />
        </div>
      </section>


<div className="flex flex-col md:flex-row items-center justify-center gap-6">

        <ProcessCard
          number="01"
          image={photoShoot}
          title="RAW FOOTAGE"
          description="FOOTAGE / SOUND / CHAOS"
        />

        <span className="hidden md:block text-purple-500 text-xl">
          →
        </span>

        <ProcessCard
          number="02"
          image={framing}
          title="THE EDIT"
          description="STORY / RHYTHM / PACING"
        />

        <span className="hidden md:block text-purple-500 text-xl">
          →
        </span>

        <ProcessCard
          number="03"
          image={shootDone}
          title="FINAL FRAME"
          description="CINEMA / COLOR / POLISH"
        />

      </div>

      <ToolKitSection 
       image={shootDone}
      eyebrow="BEYOND THE TIMELINE"
      title="More Than Just Editing"
      description="When I'm not editing, I'm usually studying films, collecting visual references, exploring new music, or looking for the next story worth telling."
      />
    </div>
  )
}

export default About