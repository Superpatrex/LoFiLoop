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
        let song;

        // p.preload = () => {
        //     song = p.loadSound("Lukrembo_Biscuit.mp3");
        // };

        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            const lavender = p.color(172, 143, 227);
            p.background(lavender);
            // song.play();
        };

        // p.mouseClicked = () => {
        //     if (song.isPlaying()) {
        //         song.pause();
        //     } else {
        //         song.play();
        //     }
        // }


        // P5.js draw loop
        p.draw = () => {
            p.ellipse(p.mouseX, p.mouseY, 20, 20);
            p.fill(255, 0, 0);
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