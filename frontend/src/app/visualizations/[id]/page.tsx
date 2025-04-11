"use client";

import EmbeddedVisualization from "@/app/create-visualization/components/EmbeddedVisualization";
import AppLayout from "@/layouts/app";
import { useParams, useSearchParams } from "next/navigation";

const ProductPage = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const path = `/visualizations/${id}.${type}`;

    return (
        <AppLayout>
            <div className="h-full w-full p-4">
                {type === "png" && (
                    <div className="w-full h-full flex items-center justify-center">
                        <img
                            className="h-[50rem]"
                            src={path}
                            alt="visualisation"
                        />
                    </div>
                )}
                {type === "html" && <EmbeddedVisualization htmlPath={path} />}
            </div>
        </AppLayout>
    );
};

export default ProductPage;
