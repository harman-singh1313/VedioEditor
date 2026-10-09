
import ContactForm from "../Components/Common/ContactForm";

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#080714] px-4 py-16 text-white sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-400">
            Get in touch
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Let's Create Something
            <span className="block text-purple-400">
              Amazing Together
            </span>
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-gray-400">
            Have a video project in mind? Tell us about it
            and let's work together.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
};

export default Contact;