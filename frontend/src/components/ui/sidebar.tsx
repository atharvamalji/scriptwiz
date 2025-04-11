"use client";

import {
    PresentationChartBarIcon,
    CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-14 bg-stone-50 border-r flex flex-col">
            <div className="grid grid-cols-1 gap-2 p-2">
                <Link
                    href={"/create-visualization"}
                    className={`h-full flex items-center justify-center hover:bg-stone-200 rounded-lg p-2 aspect-square ${
                        pathname === "/create-visualization"
                            ? "bg-blue-500 text-white"
                            : ""
                    }`}
                >
                    <PresentationChartBarIcon className="text-xl" />
                </Link>
                <Link
                    href={"/my-visualizations"}
                    className={`h-full flex items-center justify-center hover:bg-stone-200 rounded-lg p-2 aspect-square ${
                        pathname === "/my-visualizations"
                            ? "bg-blue-500 text-white"
                            : ""
                    }`}
                >
                    <CubeTransparentIcon className="text-xl" />
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
