import SpotlightCard from './SpotlightCard';
import ColorBends from './ColorBends';

const About: React.FC = () => {
    return (
        <div className="relative z-20 min-h-screen w-full py-20 px-6">
            <div className="absolute inset-0 z-0">
                <ColorBends
                    colors={["#DE443B", "#006BB4", "#4B0082"]}
                    rotation={0}
                    speed={0.2}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={1}
                    parallax={0.5}
                    noise={0.1}
                    transparent={false}
                    autoRotate={0}
                />
            </div>

            <div className="relative z-10">
                <h2
                    className="text-6xl md:text-7xl font-black text-white text-center mb-20 tracking-wider"
                    style={{
                        textShadow: '0 0 10px rgba(0, 229, 255, 0.5), 0 0 5px rgba(0, 229, 255, 0.3), 0 0 10px rgba(0, 229, 255, 0.2)'
                    }}
                >
                    TOOLS
                </h2>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <SpotlightCard className="p-8 rounded-2xl bg-gray-900 border border-[#DE443B]" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <h3 className="text-2xl font-bold text-white mb-4">Requirement Analysis</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard className="p-8 rounded-2xl bg-gray-900 border border-[#DE443B]" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <h3 className="text-2xl font-bold text-white mb-4">Architecture Generation</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard className="p-8 rounded-2xl bg-gray-900 border border-[#DE443B]" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <h3 className="text-2xl font-bold text-white mb-4">Effort Estimation</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard className="p-8 rounded-2xl bg-gray-900 border border-[#DE443B]" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <h3 className="text-2xl font-bold text-white mb-4">Decision Management</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard className="p-8 rounded-2xl bg-gray-900 border border-[#DE443B]" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <h3 className="text-2xl font-bold text-white mb-4">Code Generation</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard className="p-8 rounded-2xl bg-gray-900 border border-[#DE443B]" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <h3 className="text-2xl font-bold text-white mb-4">Audit Trail</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                    </SpotlightCard>
                </div>
                <div className="flex justify-center mt-10 animate-bounce">
                    <a href="#future-scope" className="text-white opacity-70 hover:opacity-100 transition-opacity">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
