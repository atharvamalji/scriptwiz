"use client";

import { useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import EmbeddedVisualization from "./components/EmbeddedVisualization";
import AppLayout from "@/layouts/app";

export default function EditorPage() {
    const [language, setLanguage] = useState("python");
    const [library, setLibrary] = useState("matplotlib");
    const [visualisation, setVisualisation] = useState("");
    const [visualisationType, setVisualisationType] = useState("img");
    const [processing, setprocessing] = useState<boolean | null>(null);
    const [executionError, setExecutionError] = useState<string | null>(null);

    const editorRef = useRef<any>(null);

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        if (newLanguage === "python") {
            setLibrary("matplotlib");
        }
        if (newLanguage === "r") {
            setLibrary("plotly");
        }
        setVisualisation("");
    };

    const handleLibraryChange = (newLibrary: string) => {
        setLibrary(newLibrary);
    };

    const generateVisualization = async () => {
        setprocessing(true);

        let endpoint = "";

        if (language === "python") {
            if (library === "matplotlib") {
                endpoint = "generate_matplotlib_plot";
            }

            if (library === "plotly") {
                endpoint = "generate_plotly_plot";
            }
        }
        if (language === "r") {
            if (library === "ggplot2") {
                endpoint = "generate_r_ggplot";
            }

            if (library === "plotly") {
                endpoint = "generate_r_plot";
            }
        }

        if (editorRef.current) {
            const currentCode = editorRef.current.getValue();
            const payload = { code: currentCode, user: "atharva", language: language, library: library };

            const res = axios
                .post(`http://10.0.0.28:5000/${endpoint}`, payload)
                .then((response) => {
                    console.log(response.data);
                    setVisualisation(response.data.path);
                    setVisualisationType(response.data.type);
                    setprocessing(false);
                });
        }
    };

    return (
        <AppLayout>
            <div className="h-full">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel minSize={25}>
                        <div className="h-full flex flex-col p-4 space-y-4 col-span-4 bg-stone-100">
                            <div className="flex justify-between items-center space-x-4">
                                <div>
                                    <h1 className="text-xl font-extrabold">
                                        Code Editor
                                    </h1>
                                    <p className="text-xs">
                                        write your code to generate
                                        visualizations
                                    </p>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    {/* ShadCN Buttons */}
                                    <Button
                                        className="w-[12rem] px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                                        onClick={generateVisualization}
                                        disabled={processing ? true : false}
                                    >
                                        {!processing &&
                                            "Generate Visualization"}
                                        {processing && (
                                            <img
                                                className="h-[1rem]"
                                                src="/loading.svg"
                                                alt=""
                                            />
                                        )}
                                    </Button>

                                    {/* Dropdown */}

                                    <Select
                                        value={language}
                                        onValueChange={handleLanguageChange}
                                        disabled={processing ? true : false}
                                    >
                                        <SelectTrigger className="border border-gray-300 rounded px-3 py-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="python">
                                                Python
                                            </SelectItem>
                                            <SelectItem value="r">R</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        value={library}
                                        onValueChange={handleLibraryChange}
                                        disabled={processing ? true : false}
                                    >
                                        <SelectTrigger className="border border-gray-300 rounded px-3 py-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {language === "python" && (
                                                <>
                                                    <SelectItem value="matplotlib">
                                                        Matplotlib
                                                    </SelectItem>
                                                    <SelectItem value="plotly">
                                                        Plotly
                                                    </SelectItem>
                                                </>
                                            )}
                                            {language === "r" && (
                                                <>
                                                    <SelectItem value="plotly">
                                                        Plotly
                                                    </SelectItem>
                                                    <SelectItem value="ggplot2">
                                                        Ggplot2
                                                    </SelectItem>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                {library === "matplotlib" && (
                                    <NoticeMatplotlib />
                                )}
                                {library === "plotly" && <NoticePlotly />}
                            </div>
                            {executionError && (
                                <div>
                                    <div className="bg-red-50 border-l-2 border-red-500 p-4">
                                        <p></p>
                                    </div>
                                </div>
                            )}
                            <div className="flex-1 bg-gray-100 rounded-lg shadow-md">
                                <Editor
                                    height="100%" // Adjust for header and dropdown
                                    language={language}
                                    theme="vs-dark"
                                    defaultValue={`# Start coding in ${language}`}
                                    onMount={(editor, monaco) => {
                                        editorRef.current = editor; // Set editorRef to editor instance
                                    }}
                                />
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel minSize={25}>
                        <div className="h-full flex flex-col p-4 space-y-4 col-span-4 bg-white">
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
                                    {visualisationType === "html" && (
                                        <EmbeddedVisualization
                                            htmlPath={visualisation}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
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
