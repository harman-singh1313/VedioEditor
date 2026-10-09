
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Play,
} from "lucide-react";

import {
  servicesHeroData,
  services,
  features,
  workflow,
  servicesPageContent,
} from "../Components/js/servicesData";

const Services = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const content = servicesPageContent;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#080711] text-white">


      {/* HERO */}
      <section
        id="home"
        className="relative isolate flex min-h-[650px] items-center"
      >
        <div className="absolute inset-0 -z-20">
          <img
            src={servicesHeroData.image}
            alt="Creative video editing workspace"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080711] via-[#080711]/90 to-[#080711]/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#080711] via-transparent to-[#080711]/30" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-violet-400" />
              <span className="text-xs font-bold tracking-[0.3em] text-violet-300">
                {servicesHeroData.eyebrow}
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              {servicesHeroData.title}
              <span className="mt-2 block text-violet-400">
                {servicesHeroData.highlight}
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              {servicesHeroData.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("services")}
                className="inline-flex items-center gap-3 rounded-full bg-violet-500 px-6 py-4 font-semibold transition hover:bg-violet-400"
              >
                {servicesHeroData.primaryButton}
                <ArrowRight size={18} />
              </button>

              {/* <button
                onClick={() => scrollToSection("services")}
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 font-semibold transition hover:border-violet-400 hover:bg-white/5"
              >
                <Play size={16} />
                {servicesHeroData.secondaryButton}
              </button> */}
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6">
              <div>
                <p className="text-2xl font-bold">Creative</p>
                <p className="mt-1 text-xs text-white/50">
                  Story-driven editing
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">Modern</p>
                <p className="mt-1 text-xs text-white/50">
                  Cinematic visuals
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">Flexible</p>
                <p className="mt-1 text-xs text-white/50">
                  Made for your platform
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative ml-auto max-w-md rounded-3xl border border-white/15 bg-white/[0.06] p-3 shadow-2xl shadow-violet-950/30 backdrop-blur-sm">
              <img
                src={servicesHeroData.image}
                alt="Video editing creative preview"
                className="h-[410px] w-full rounded-2xl object-cover"
              />

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-[#100d1d]/90 p-5 backdrop-blur-md">
                <p className="text-xs font-semibold tracking-[0.2em] text-violet-300">
                  YOUR VISION, OUR CREATIVITY
                </p>
                <p className="mt-2 text-xl font-bold">
                  Every Frame Tells a Story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold tracking-[0.3em] text-violet-300">
                OUR SERVICES
              </p>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                {content.servicesHeading}
                <span className="text-violet-400">
                  {" "}{content.servicesHighlight}
                </span>
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-white/60">
              {content.servicesDescription}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#100e1b] transition duration-300 hover:-translate-y-2 hover:border-violet-400/50"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e1b] via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-bold backdrop-blur">
                    {service.number}
                  </span>

                  <ArrowUpRight
                    className="absolute bottom-4 right-5 text-white transition group-hover:text-violet-300"
                    size={24}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold transition group-hover:text-violet-300">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        id="why-us"
        className="scroll-mt-20 border-y border-white/10 bg-[#100d1c] px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold tracking-[0.3em] text-violet-300">
              WHY CHOOSE US
            </p>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              {content.whyHeading}
              <span className="mt-2 block text-violet-400">
                {content.whyHighlight}
              </span>
            </h2>

            <p className="mt-5 leading-7 text-white/60">
              {content.whyDescription}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-violet-400/40 hover:bg-white/[0.05]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <FeatureIcon size={27} />
                  </div>

                  <p className="mb-3 text-sm font-bold text-violet-300">
                    0{index + 1}
                  </p>

                  <h3 className="text-lg font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section
        id="process"
        className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-bold tracking-[0.3em] text-violet-300">
              HOW WE WORK
            </p>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              {content.workflowHeading}
              <span className="text-violet-400">
                {" "}{content.workflowHighlight}
              </span>
            </h2>

            <p className="mt-5 leading-7 text-white/60">
              {content.workflowDescription}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step) => {
              const StepIcon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative border-t border-white/15 pt-7"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <span className="text-sm font-bold text-violet-300">
                      STEP {step.number}
                    </span>

                    <StepIcon
                      size={25}
                      className="text-violet-300"
                    />
                  </div>

                  <h3 className="text-2xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {step.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section
        id="contact"
        className="scroll-mt-20 px-5 pb-24 sm:px-8 lg:px-12"
      >
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-violet-300/20 bg-gradient-to-br from-[#241541] via-[#17102c] to-[#100d1c] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative">
            <p className="mb-5 text-xs font-bold tracking-[0.3em] text-violet-300">
              {content.ctaEyebrow}
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-6xl">
              {content.ctaHeading}{" "}
              <span className="text-violet-400">
                {content.ctaHighlight}
              </span>
              <br />
              {content.ctaEnding}
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/65">
              {content.ctaDescription}
            </p>

<button
  onClick={() => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=yyadvirk22@gmail.com&su=Video%20Editing%20Project",
      "_blank"
    );
  }}
  className="mt-8 inline-flex items-center gap-3 rounded-full bg-violet-500 px-7 py-4 font-semibold transition hover:bg-violet-400"
>
  {content.ctaButton}
  <ArrowUpRight size={18} />
</button>

            <p className="mt-4 text-xs text-white/40">
             yyadvirk22@gmail.com
            </p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Services;