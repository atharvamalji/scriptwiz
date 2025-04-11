import Head from "next/head";
import LandingLayout from "@/layouts/landing";

export default function Home() {
    return (
        <LandingLayout>
            <div className="font-sans antialiased">
                <Head>
                    <title>Interactive Data Visualizations</title>
                    <meta
                        name="description"
                        content="Transform your data into stunning visualizations with ScriptWiz. Create, explore, and share interactive plots and dashboards with ease."
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                {/* Hero Section */}
                <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <div className="w-full flex justify-center">
                            <img
                                src="https://em-content.zobj.net/source/microsoft-teams/337/genie_1f9de.png"
                                alt="ScriptWiz Logo"
                                className="h-[10rem]"
                            />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                            Transform Your Data into Stunning Visualizations
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                            Create, explore, and share interactive plots and
                            dashboards with ease using ScriptWiz.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <a
                                href="/create-visualization"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                            >
                                Get Started
                            </a>
                            <a
                                href="#learn-more"
                                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-sm hover:bg-blue-50"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20 bg-white" id="features">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Features
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Gain deeper insights with real-time, interactive
                            charts and graphs. Zoom, rotate, and pan data
                            easily.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
                            <div className="border p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-blue-600">
                                    Interactive Visualizations
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Gain deeper insights with real-time,
                                    interactive charts and graphs. Zoom, rotate,
                                    and pan data easily.
                                </p>
                            </div>
                            <div className="border p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-blue-600">
                                    Real-Time Updates
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Instant updates to your visualizations as
                                    you modify your data or interact with it.
                                </p>
                            </div>
                            <div className="border p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-blue-600">
                                    Simple Interface
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Creating stunning visualizations is easy,
                                    with no coding required. Drag-and-drop
                                    functionality for ease of use.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50" id="how-it-works">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            How It Works
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            ScriptWiz simplifies the process of turning your
                            data into stunning visualizations in 3 easy steps.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
                            <div className="p-6 border flex space-x-2 bg-white">
                                <div className="text-blue-600 font-extrabold text-4xl">
                                    1.
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Write Your Code
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        Simply upload your dataset in CSV,
                                        Excel, or other formats. Our platform
                                        processes your data automatically, so
                                        you're ready to visualize.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 border flex space-x-2 bg-white">
                                <div className="text-blue-600 font-extrabold text-4xl">
                                    2.
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Select Language & Library
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        Choose the programming language in which
                                        your visualization code is written,
                                        either <strong>Python</strong> or{" "}
                                        <strong>R</strong>. Select the library
                                        you used (e.g., Matplotlib, Plotly,
                                        ggplot, etc.) to ensure compatibility
                                        with your code.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 border flex space-x-2 bg-white">
                                <div className="text-blue-600 font-extrabold text-4xl">
                                    3.
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Run in a Secure Virtual Environment
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        Your code runs securely in an isolated
                                        virtual environment to ensure safety.
                                        Once executed, the platform generates
                                        the visualization based on your code,
                                        and you'll receive the interactive
                                        result in real time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </LandingLayout>
    );
}
