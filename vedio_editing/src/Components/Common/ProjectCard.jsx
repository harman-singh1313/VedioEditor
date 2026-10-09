
import { useEffect, useState } from "react";

const ProjectCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  // =========================
  // ESCAPE KEY
  // =========================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);

      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore scrolling
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // =========================
  // BACKEND DATA
  // =========================

  const {
    title,
    category,
    videos = [],
    coverImages = [],
  } = project;

  // First video
  const video = videos[0];

  // First cover image
  const image = coverImages[0];

  // =========================
  // OPEN MODAL
  // =========================

  const openModal = () => {
    setIsOpen(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* =====================================================
          PROJECT CARD
      ===================================================== */}

      <article
        onClick={openModal}
        className="group w-full cursor-pointer overflow-hidden border border-white/10 bg-[#100d1d] transition-all duration-500 hover:-translate-y-1 hover:border-white/25"
      >
        {/* =================================================
            MEDIA
        ================================================= */}

        <div className="relative h-[350px] overflow-hidden sm:h-[360px] lg:h-[390px]">
          {/* VIDEO */}

          {video?.url ? (
            <video
              src={video.url}
              poster={video.posterUrl || undefined}
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.09]"
            />
          ) : image?.url ? (
            /* IMAGE */

            <img
              src={image.url}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.09]"
            />
          ) : (
            /* NO MEDIA */

            <div className="flex h-full w-full items-center justify-center bg-[#100d1d]">
              <span className="mono-font text-[10px] uppercase tracking-[2px] text-white/40">
                No Preview
              </span>
            </div>
          )}

          {/* =================================================
              HOVER OVERLAY
          ================================================= */}

          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-all duration-500 group-hover:bg-black/25 group-hover:opacity-100">
            <span className="border border-white/70 bg-black/10 px-4 py-2 text-[10px] uppercase tracking-[2px] text-white backdrop-blur-md">
              {video?.url ? "View Motion" : "View Project"}
            </span>
          </div>
        </div>

        {/* =================================================
            PROJECT INFO
        ================================================= */}

        <div className="p-4">
          <p className="mono-font mb-2 text-[10px] uppercase tracking-[2px] text-purple-400">
            {category}
          </p>

          <h2 className="main-font text-xl text-white">
            {title}
          </h2>
        </div>
      </article>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-6"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative flex w-full max-w-6xl items-center justify-center"
          >
            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              type="button"
              aria-label="Close"
              onClick={closeModal}
              className="absolute right-0 top-[-45px] z-10 flex h-9 w-9 items-center justify-center border border-white/30 text-xl leading-none text-white transition duration-300 hover:border-white hover:bg-white/10"
            >
              ×
            </button>

            {/* =================================================
                MODAL VIDEO
            ================================================= */}

            {video?.url ? (
              <video
                src={video.url}
                poster={video.posterUrl || undefined}
                controls
                autoPlay
                muted
                playsInline
                className="max-h-[85vh] max-w-full object-contain"
              />
            ) : image?.url ? (
              /* =================================================
                 MODAL IMAGE
              ================================================= */

              <img
                src={image.url}
                alt={title}
                className="max-h-[85vh] max-w-full object-contain"
              />
            ) : (
              <div className="border border-white/20 px-6 py-4">
                <p className="mono-font text-xs uppercase tracking-[2px] text-white/50">
                  No Media Available
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;

