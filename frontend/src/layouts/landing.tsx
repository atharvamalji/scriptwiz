// components/layouts/LandingLayout.tsx
import React, { ReactNode } from "react";

interface LandingLayoutProps {
    children: ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div className="h-full">
            <header className="flex items-center sticky top-0 h-12 bg-white border-b">
                <div className="flex justify-between items-center w-6xl mx-auto px-6">
                    <p className="font-bold">
                        Script
                        <span className="text-blue-600 font-black">Wiz</span>
                    </p>
                    <div>
                        <nav className="text-sm flex space-x-4">
                            <a
                                href="#features"
                                className="text-gray-600 hover:text-blue-600"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-gray-600 hover:text-blue-600"
                            >
                                How It Works
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-600 hover:text-blue-600"
                            >
                                Contact Us
                            </a>
                        </nav>
                    </div>
                    <div></div>
                </div>
            </header>
            <main>{children}</main>
            {/* Footer */}
            <footer className="flex flex-col item-center justify-center bg-black text-white py-8 text-center h-[20rem]">
                <p>
                    &copy; 2025 Interactive Data Visualizations. All Rights
                    Reserved.
                </p>
                <p>
                    <a
                        href="#privacy-policy"
                        className="text-blue-600 hover:underline mx-2"
                    >
                        Privacy Policy
                    </a>{" "}
                    |{" "}
                    <a
                        href="#terms-of-service"
                        className="text-blue-600 hover:underline mx-2"
                    >
                        Terms of Service
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default LandingLayout;
