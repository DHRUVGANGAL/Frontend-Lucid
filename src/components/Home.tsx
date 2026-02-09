import { Link } from 'react-router-dom';
import Balatro from './Balatro';
import About from './About';
import FutureScope from './FutureScope';
import TargetCursor from './TargetCursor';

const Home: React.FC = () => {
    return (
        <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
            <TargetCursor targetSelector=".cursor-target" />
            <section id="home" className="relative min-h-screen w-full overflow-hidden snap-start">
                {/* Balatro Background */}
                <div className="absolute inset-0 z-0">
                    <Balatro
                        color1="#DE443B"
                        color2="#006BB4"
                        color3="#162325"
                        spinSpeed={3.0}
                        contrast={2.5}
                        lighting={0.3}
                        spinAmount={0.2}
                        isRotate={true}
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                        Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-yellow-300">Lucid</span>
                    </h1>

                    <p className="text-2xl text-white max-w-2xl mb-12 font-medium" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                        AI Agent for requirement analysis, architecture generation, effort estimation, and auditable decision management.
                    </p>

                    <div className="flex gap-6">
                        <Link
                            to="/agent"
                            className="cursor-target px-10 py-4 bg-white text-black text-lg font-bold rounded-xl hover:scale-105 transition-all duration-300"
                            style={{
                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            Get Started
                        </Link>
                        <a
                            href="#about"
                            className="cursor-target px-10 py-4 border-2 border-white text-white text-lg font-bold rounded-xl hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                            style={{
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                            }}
                        >
                            Learn More
                        </a>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <a href="#about" className="text-white opacity-70 hover:opacity-100 transition-opacity">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="snap-start">
                <About />
            </section>

            {/* Future Scope Section */}
            <section id="future-scope" className="snap-start">
                <FutureScope />
            </section>
        </div>
    );
};

export default Home;
