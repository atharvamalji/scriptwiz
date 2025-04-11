// components/layouts/AppLayout.tsx
import Sidebar from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="flex-1 flex flex-col bg-white">
            <header className="flex items-center justify-between sticky top-0 h-10 bg-white border-b">
                <div className="px-4">
                    <p className="font-bold">
                        Script
                        <span className="text-blue-600 font-black">Wiz</span>
                    </p>
                </div>
            </header>
            <div className="flex-1 flex">
                <Sidebar />
                <main className="w-full">{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;
