"use client";
// Example usage in a Next.js page:
// pages/p5-example.js

import dynamic from "next/dynamic";

// Dynamically import P5Wrapper with no SSR
const P5Wrapper = dynamic(() => import("./Visualizer"), {
    ssr: false,
});

const ExampleSketch = () => {
    const sketch = (p) => {
        // P5.js sketch setup
        p.setup = () => {
            p.createCanvas(400, 400);
            p.background(220);
        };

        // P5.js draw loop
        p.draw = () => {
            p.fill(255, 0, 0);
            p.ellipse(p.mouseX, p.mouseY, 20, 20);
        };
    };

    return (
        <div>
        <h1>P5.js Example</h1>
        <P5Wrapper sketch={sketch} />
        </div>
    );
};

export default ExampleSketch;