import { useState } from "react";

const ContactForm = ({
  title = "Send us a Message",
  description = "Tell us about your project and we'll get back to you.",
  className = "",
}) => {
  // ===============================
  // Form data
  // ===============================
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ===============================
  // Loading state
  // ===============================
  const [loading, setLoading] = useState(false);

  // ===============================
  // Success / Error message
  // ===============================
  const [status, setStatus] = useState("");

  // ===============================
  // Input change
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Purana status hata do
    setStatus("");
  };

  // ===============================
  // Form submit
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      // Backend API ko request
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Form data backend nu JSON format vich bhej rahe haan
          body: JSON.stringify(formData),
        }
      );

      // Backend response
      const data = await response.json();

      // Je response successful nahi hai
      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      // Success message
      setStatus(
        data.message ||
          "Your message has been sent successfully!"
      );

      // Form clear
      setFormData({
        name: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      // Error message
      setStatus(
        error.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      // Loading band
      setLoading(false);
    }
  };

  // ===============================
  // Common input classes
  // ===============================
  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#100D20]/80 px-4 py-3.5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-purple-400 focus:bg-purple-500/5 focus:ring-2 focus:ring-purple-500/20 hover:border-purple-400/40";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-200";

  return (
    <section
      className={`relative isolate w-full ${className}`}
    >
      {/* =================================
          Floating Background Glow
      ================================= */}
      <div className="pointer-events-none absolute -inset-3 -z-10 overflow-hidden rounded-[2rem]">
        <div className="absolute -left-8 top-10 h-40 w-40 animate-pulse rounded-full bg-purple-600/30 blur-[70px]" />

        <div className="absolute -right-8 bottom-10 h-48 w-48 animate-pulse rounded-full bg-blue-600/25 blur-[80px]" />

        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[70px]" />
      </div>

      {/* =================================
          Gradient Border
      ================================= */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-500/60 via-white/10 to-blue-500/50 p-px shadow-[0_0_50px_rgba(139,92,246,0.12)] transition duration-500 hover:shadow-[0_0_65px_rgba(139,92,246,0.22)]">

        {/* =================================
            Main Form Container
        ================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#151126] via-[#0D0B19] to-[#101027] p-6 backdrop-blur-2xl sm:p-8 lg:p-9">

          {/* Decorative Orbs */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10">

            {/* =================================
                Heading
            ================================= */}
            <div className="mb-8">

              <div className="mb-5 flex items-center gap-2">
                <span className="h-1 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
                  Get in touch
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {title}
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
                {description}
              </p>
            </div>

            {/* =================================
                Form
            ================================= */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* =================================
                  Name + Phone
              ================================= */}
              <div className="grid gap-5 sm:grid-cols-2">

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className={labelClass}
                  >
                    Full Name{" "}
                    <span className="text-purple-400">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className={labelClass}
                  >
                    Phone{" "}
                    <span className="text-purple-400">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* =================================
                  Subject
              ================================= */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className={labelClass}
                >
                  Subject{" "}
                  <span className="text-purple-400">
                    *
                  </span>
                </label>

                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none`}
                >
                  <option
                    value=""
                    className="bg-[#100D20]"
                  >
                    Select a service
                  </option>

                  <option
                    value="Video Editing"
                    className="bg-[#100D20]"
                  >
                    Video Editing
                  </option>

                  <option
                    value="YouTube Videos"
                    className="bg-[#100D20]"
                  >
                    YouTube Videos
                  </option>

                  <option
                    value="Reels and Shorts"
                    className="bg-[#100D20]"
                  >
                    Reels / Shorts
                  </option>

                  <option
                    value="Wedding Videos"
                    className="bg-[#100D20]"
                  >
                    Wedding Videos
                  </option>

                  <option
                    value="Commercial Ads"
                    className="bg-[#100D20]"
                  >
                    Commercial Ads
                  </option>

                  <option
                    value="Other"
                    className="bg-[#100D20]"
                  >
                    Other
                  </option>
                </select>
              </div>

              {/* =================================
                  Message
              ================================= */}
              <div>
                <label
                  htmlFor="contact-message"
                  className={labelClass}
                >
                  Message{" "}
                  <span className="text-purple-400">
                    *
                  </span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* =================================
                  Submit Button
              ================================= */}
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 py-4 font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {/* Button Shine */}
                {!loading && (
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                )}

                {/* Button Text */}
                <span className="relative">
                  {loading
                    ? "Sending..."
                    : "Send Message"}
                </span>

                {/* Arrow */}
                {!loading && (
                  <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>

              {/* =================================
                  Status Message
              ================================= */}
              {status && (
                <p
                  role="status"
                  className="text-center text-sm text-purple-300"
                >
                  {status}
                </p>
              )}

              {/* Bottom Note */}
              <p className="text-center text-xs text-gray-500">
                Your project details will be handled with care.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;