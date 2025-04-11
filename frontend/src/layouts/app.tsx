// components/layouts/AppLayout.tsx
import Sidebar from "@/components/ui/sidebar";
import Link from "next/link";
import React, { ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="flex-1 flex flex-col bg-white">
            <header className="flex items-center justify-between sticky top-0 h-10 bg-white border-b px-4">
                <Link href={"/"}>
                    <div className="flex items-center space-x-1">
                        <img className="h-5" src="/logo.svg" alt="" />
                        <p className="font-bold">
                            Script
                            <span className="text-blue-600 font-black">
                                Wiz
                            </span>
                        </p>
                    </div>
                </Link>
            </header>
            <div className="flex-1 flex">
                <Sidebar />
                <main className="w-full">{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;
