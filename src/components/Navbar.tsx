import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-full px-6 py-4 bg-transparent backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center">

                <a
                    href="#home"
                    className="font-mono text-3xl font-bold text-white drop-shadow-lg"
                >
                    Lucid
                </a>


                <div className="hidden md:flex items-center space-x-6">
                    <a
                        href="#home"
                        className="font-mono text-sm text-white transition-colors"
                    >
                        Home
                    </a>

                    <a
                        href="#about"
                        className="font-mono text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        About
                    </a>

                    <a
                        href="https://github.com/DHRUVGANGAL/backend-lucid"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://github.com/DHRUVGANGAL/backend-lucid/blob/main/README.md"
                        target="_blank"
                        className="font-mono text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Resource
                    </a>
                </div>


                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>


            {isMenuOpen && (
                <div className="absolute left-0 right-0 bg-black bg-opacity-90 z-50 md:hidden mt-2">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <a
                            href="#home"
                            onClick={() => setIsMenuOpen(false)}
                            className="font-mono text-white hover:text-white transition-colors"
                        >
                            Home
                        </a>

                        <a
                            href="#about"
                            className="font-mono text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </a>

                        <a
                            href="https://github.com/DHRUVGANGAL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            GitHub
                        </a>

                        <a
                            href="#ideas"
                            className="font-mono text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Resource
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
