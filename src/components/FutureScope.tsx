import { useState, useEffect, useRef } from 'react';
import ColorBends from './ColorBends';
import SpotlightCard from './SpotlightCard';
import TargetCursor from './TargetCursor';

const FutureScope: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="relative z-20 min-h-screen w-full py-20 px-6 flex flex-col items-center justify-center">
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

            {isInView && <TargetCursor targetSelector=".cursor-target" />}
            <div className="relative z-10">
                <h2
                    className="text-6xl md:text-7xl font-black text-white text-center mb-20 tracking-wider"
                    style={{
                        textShadow: '0 0 10px rgba(222, 68, 59, 0.5), 0 0 20px rgba(222, 68, 59, 0.3), 0 0 30px rgba(222, 68, 59, 0.2)'
                    }}
                >
                    FUTURE SCOPE
                </h2>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <SpotlightCard
                        className="cursor-target p-8 rounded-2xl bg-gray-900/80 border border-[#DE443B]"
                        spotlightColor="rgba(222, 68, 59, 0.3)"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Knowledge Transfer</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Transform technical documentation into interactive AI guides, helping new developers understand the "why" behind complex architectural choices instantly.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard
                        className="cursor-target p-8 rounded-2xl bg-gray-900/80 border border-[#DE443B]"
                        spotlightColor="rgba(222, 68, 59, 0.3)"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Feedback loop from delivered outcomes to refine risk/confidence models and estimation bias corrections.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard
                        className="cursor-target p-8 rounded-2xl bg-gray-900/80 border border-[#DE443B]"
                        spotlightColor="rgba(222, 68, 59, 0.3)"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Implementation Verification</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Continuous verification that code delivered and features match approved requirements, architecture decisions, and business goals, ensuring full coverage and quality.   </p>
                    </SpotlightCard>  </div>
            </div></div>
    );
};

export default FutureScope;
