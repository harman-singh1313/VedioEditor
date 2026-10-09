import { Link } from "react-router-dom";
import Hover_button from "../Ui/Hover_button";

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-white/10 bg-black px-6 py-16 md:px-12">

            {/* CTA */}
            <div className="mx-auto max-w-7xl border-b border-white/10 pb-16">

                <p className="mono-font mb-5 text-sm uppercase tracking-[4px] text-purple-400">
                    Have a project in mind?
                </p>

                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                    <h2 className="main-font max-w-3xl text-5xl font-bold leading-none text-white md:text-7xl">
                        LET'S  <span className="text-purple-400">CREATE</span>
                        <br />
                        SOMETHING <span >GREAT.</span>
                    </h2>

                    <Hover_button
                        text="HIRE ME"
                        path="/contact"
                        gradient="bg-gradient-to-r from-purple-500 to-fuchsia-500"
                        hoverGradient="hover:from-purple-600 hover:to-fuchsia-600"
                    />

                </div>
            </div>

            {/* Footer links */}
            <div className="mx-auto grid max-w-7xl gap-12 py-12 md:grid-cols-3">

                {/* Brand */}
                <div>
                    <h3 className="main-font text-3xl font-bold text-white">
                        Marcus Velde
                    </h3>

                    <p className="mono-font mt-4 max-w-xs text-sm leading-6 text-white/50">
                        Video editor & visual storyteller creating cinematic
                        experiences through editing, color and sound.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h4 className="mono-font mb-5 text-xs uppercase tracking-[3px] text-purple-400">
                        Navigation
                    </h4>

                    <div className="mono-font flex flex-col gap-3 text-sm text-white/60">
                        <Link className="transition hover:text-white" to="/">
                            WORK
                        </Link>

                        <Link className="transition hover:text-white" to="/About">
                            ABOUT
                        </Link>

                        <Link className="transition hover:text-white" to="/Services">
                            SERVICES
                        </Link>

                        <Link className="transition hover:text-white" to="/Contact">
                            CONTACT
                        </Link>
                    </div>
                </div>

                {/* Social */}
                <div>
                    <h4 className="mono-font mb-5 text-xs uppercase tracking-[3px] text-purple-400">
                        Connect
                    </h4>

                    <div className="mono-font flex flex-col gap-3 text-sm text-white/60">

                        <a
                            href="https://www.instagram.com/yadv1rk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-white"
                        >
                            INSTAGRAM
                        </a>

                        <a
                            href="https://wa.me/9992096055"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-white"
                        >
                            WHATSAPP
                        </a>

                        

                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">

                <p className="mono-font">
                    © 2026 MARCUS VELDE
                </p>

                <p className="mono-font">
                    AVAILABLE FOR FREELANCE PROJECTS
                </p>

            </div>

        </footer>
    );
};

export default Footer;