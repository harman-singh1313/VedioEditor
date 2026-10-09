
import { useEffect, useState } from "react";

import Hero from "../Components/Common/Hero";
import ProjectCard from "../Components/Common/ProjectCard";
import HeroVedios from "../Components/Common/HeroVedios";
import ContactForm from "../Components/Common/ContactForm";

import heroImage from "../assets/Images/hero.webp";

const API_URL = "http://localhost:5000/api/projects";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Har category da apna Show More state
  const [showMore, setShowMore] = useState({
    shortFilm: false,
    colorGrading: false,
    otherEdits: false,
    longForm: false,
  });

  // =========================
  // GET PROJECTS FROM API
  // =========================

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        console.log("Projects API response:", data);

        // Expected:
        // {
        //   success: true,
        //   projects: [...]
        // }

        setProjects(data.projects || []);
      } catch (error) {
        console.error("Project fetch error:", error);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // =========================
  // CATEGORY FILTERS
  // =========================

  const shortFilms = projects.filter(
    (project) => project.category === "short-film",
  );

  const colorGrading = projects.filter(
    (project) => project.category === "color-grading",
  );

  const otherEdits = projects.filter(
    (project) => project.category === "other-edits",
  );

  const longForm = projects.filter(
    (project) => project.category === "long-form",
  );

  // =========================
  // TOGGLE SHOW MORE
  // =========================

  const toggleShowMore = (section) => {
    setShowMore((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // =========================
  // PROJECT SECTION
  // =========================

  const ProjectSection = ({
    title,
    projects,
    sectionKey,
  }) => {
    if (!projects.length) {
      return null;
    }

    const isShowingMore = showMore[sectionKey];

    const visibleProjects = isShowingMore
      ? projects
      : projects.slice(0, 4);

    return (
      <section className="mx-auto w-[92%] max-w-7xl py-6">
        {/* SECTION HEADER */}

        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="main-font mt-2 text-4xl text-white">
              {title}
            </h2>
          </div>

          {projects.length > 4 && (
            <button
              type="button"
              onClick={() => toggleShowMore(sectionKey)}
              className="shrink-0 border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[2px] text-white transition-all duration-300 hover:border-purple-400 hover:bg-white/5 sm:px-5"
            >
              {isShowingMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* PROJECT GRID */}

        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {visibleProjects.map((project) => (
            <div
              key={project._id}
              className="min-w-[82%] snap-start sm:min-w-[60%] md:min-w-0"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div>
      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero
        tag="VIDEO EDITOR & FILMMAKER"
        title={["Stories", "Through", "Motion"]}
        accentWord="Through"
        description="Cinematography, editing & visual storytelling."
        image={heroImage}
        primaryBtn={{
          text: "VIEW WORK",
          link: "/contact",
        }}
      />

      {/* LOADING */}

      {loading && (
        <div className="mx-auto w-[92%] max-w-7xl py-16">
          <p className="mono-font text-xs uppercase tracking-[2px] text-purple-400">
            Loading Projects...
          </p>
        </div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loading && error && (
        <div className="mx-auto w-[92%] max-w-7xl py-16">
          <p className="mono-font text-xs uppercase tracking-[2px] text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      {!loading && !error && (
        <>
          {/* SHORT FILMS */}

          <ProjectSection
            title="SHORT FORM CONTENT"
            projects={shortFilms}
            sectionKey="shortFilm"
          />

          {/* COLOR GRADING */}

          <ProjectSection
            title="COLOR GRADING"
            projects={colorGrading}
            sectionKey="colorGrading"
          />


          {/* OTHER EDITS */}

          <ProjectSection
            title="OTHER EDITS"
            projects={otherEdits}
            sectionKey="otherEdits"
          />
          {/* =====================================================
          SHORT FILM HERO VIDEO
      ===================================================== */}
          <div className="mx-auto w-[92%] max-w-7xl py-6">
            <h1 className="main-font mt-2 py-8 text-4xl text-white lg:text-6xl">
              SHORT FILM
            </h1>

            {(() => {
              const project = projects.find(
                (p) =>
                  p.status === "published" &&
                  p.category === "hero-video" &&
                  p.videos?.[0]?.url
              );

              const video = project?.videos?.[0];

              if (!project) return null;

              return (
                <HeroVedios
                  title={project.title}
                  description={project.description || ""}
                  type="SHORT FILM"
                  video={video.url}
                  poster={
                    video.posterUrl ||
                    project.coverImages?.[0]?.url ||
                    ""
                  }
                />
              );
            })()}
          </div>


          {/* LONG FORM */}

          <ProjectSection
            title="LONG FORM"
            projects={longForm}
            sectionKey="longForm"
          />
        </>
      )}
  
<section className="mx-auto mt-16 w-full max-w-5xl px-4">
  <div className="grid items-center gap-8 md:grid-cols-[1fr_400px]">

    {/* LEFT SIDE */}
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
        Have a project in mind?
      </p>

      <h2 className="max-w-lg text-4xl font-bold leading-tight text-white md:text-5xl">
        LET'S CREATE
        <br />
        <span className="text-purple-400">
          SOMETHING GREAT.
        </span>
      </h2>

      <p className="mt-5 max-w-md text-sm leading-6 text-gray-400">
        Tell us what you're looking for and let's turn your
        idea into something memorable.
      </p>

      <div className="mt-6 space-y-2 text-sm text-gray-400">
        <p>✓ Quick response</p>
        <p>✓ Professional editing</p>
        <p>✓ Custom solutions</p>
      </div>
    </div>

    {/* RIGHT SIDE - SMALL FORM */}
    <ContactForm
      compact
      title="Let's Work Together"
      description="Send us your details and we'll get back to you."
    />

  </div>
</section>
  </div>
  );
};

export default Home;

