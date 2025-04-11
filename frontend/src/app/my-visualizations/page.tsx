"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";

import AppLayout from "@/layouts/app";
import axios from "axios";
import VisualizationTable from "./components/visualization-table";

export default function MyVisualizations() {
    return (
        <AppLayout>
            <div className="h-full">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel minSize={25}>
                        <div className="h-full flex flex-col p-4 space-y-4 col-span-4 bg-stone-100">
                            <div className="flex justify-between items-center space-x-4">
                                <div>
                                    <h1 className="text-xl font-extrabold">
                                        My Visualizations
                                    </h1>
                                    <p className="text-xs">
                                        View all your visualizations in one
                                        place
                                    </p>
                                </div>
                            </div>
                            <div>
                                <VisualizationTable />
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel minSize={25}>
                        {/* <div className="h-full flex flex-col p-4 space-y-4 col-span-4 bg-white">
                            {!processing && !visualisation && (
                                <div className="flex-1 w-full flex flex-col items-center justify-center space-y-4">
                                    <img
                                        className="h-[20rem]"
                                        src="/visualization.png"
                                        alt=""
                                    />
                                    <p className="text-xl text-center text-stone-600">
                                        Your visualisation will be rendered here
                                    </p>
                                </div>
                            )}

                            {processing && (
                                <div className="flex-1 w-full flex flex-col items-center justify-center space-y-4">
                                    <img
                                        className="h-[3rem]"
                                        src="/loading.svg"
                                        alt=""
                                    />
                                    <p className="text-center text-stone-600">
                                        Your visualisation is being processed...
                                    </p>
                                </div>
                            )}

                            {!processing && visualisation && (
                                <div className="flex-1 w-full">
                                    {visualisationType === "img" && (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <img
                                                src={visualisation}
                                                alt="visualisation"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div> */}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </AppLayout>
    );
}

const NoticeMatplotlib = () => {
    return (
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <h1 className="text-sm font-bold">Keep in mind</h1>
            <p className="text-xs">
                Please make sure that you are importing{" "}
                <span className="bg-white font-semibold border">
                    matplotlib
                </span>{" "}
                as <span className="bg-white font-semibold border">plt</span> ,
                there is no need to add the{" "}
                <span className="bg-white font-semibold border">
                    plot.show()
                </span>{" "}
                line in the code for generating visualization!
            </p>
        </div>
    );
};

const NoticePlotly = () => {
    return (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h1 className="text-sm font-bold">Keep in mind</h1>
            <p className="text-xs">
                Please make sure that you are importing{" "}
                <span className="bg-white font-semibold border">plotly</span> as{" "}
                <span className="bg-white font-semibold border">fig</span> ,
                there is no need to add the{" "}
                <span className="bg-white font-semibold border">
                    fig.show()
                </span>{" "}
                line in the code for generating visualization!
            </p>
        </div>
    );
};
