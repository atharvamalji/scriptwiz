import React from "react";

const EmbeddedVisualization = ({ htmlPath }: { htmlPath: string }) => {
    return (
        <div className="w-full h-full border p-2" style={{ width: "100%", height: "100%", position: "relative" }}>
            <iframe
                src={htmlPath} // Path to the HTML file
                width="100%" // Make iframe width 100% of its container
                height="100%" // Make iframe height 100% of its container
                title="Embedded Visualization"
                frameBorder="0" // Remove border around the iframe
                style={{ border: "none" }} // Optional: additional style to remove any borders
            />
        </div>
    );
};

export default EmbeddedVisualization;
