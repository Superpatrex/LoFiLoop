"use client";
import React, { useRef, useEffect } from "react";

import dynamic from "next/dynamic";
import p5 from "p5";

// Dynamically import P5Wrapper with no SSR
const P5Wrapper = dynamic(() => import("./Visualizer"), {
    ssr: false,
});

const Waveform = ({ className }) => {
    const containerRef = useRef(null); // Ref to access the parent container

    const sketch = (p) => {
        let song;
        let fft;

        p.preload = () => {
            song = p.loadSound("/Lukrembo_Biscuit.mp3");
        };

        p.setup = () => {
            const parent = containerRef.current; // Use the ref to access the parent container
            const width = parent.offsetWidth;
            const height = parent.offsetHeight;

            p.createCanvas(width, height); // Dynamically set canvas size to match parent
            p.angleMode(p.DEGREES);
            p.rectMode(p.CENTER);
            fft = new p5.FFT();
        };

        p.mouseClicked = () => {
            if (song.isPlaying()) {
                song.pause();
                p.noLoop();
            } else {
                song.play();
                p.loop();
            }
        };

        p.windowResized = () => {
            const parent = containerRef.current; // Use the ref to access the parent container
            const width = parent.offsetWidth;
            const height = parent.offsetHeight;

            p.resizeCanvas(width, height); // Resize canvas on window resize
        };

        p.draw = () => {
            const transparent = p.color(17, 24, 39);
            p.background(transparent);

            p.translate(p.width / 2, p.height / 2);

            // output between 0 and 255  // for particles speed
            fft.analyze(); // output between 0 and 255

            p.fill(0);
            p.noStroke();
            p.rect(transparent, p.width, p.height);

            // Draw waveform
            p.stroke(255);
            p.strokeWeight(3);
            p.noFill();

            const waveform = fft.waveform();

            p.beginShape();
            for (let i = 0; i <= 360; i += 5) {
                const index = p.floor(p.map(i, 0, 360, 0, waveform.length - 1));
                const r = p.map(waveform[index], -1, 1, p.width * 0.30, p.width * 0.5);

                const innerRadius = p.width * 0.25; // Adjust dynamically based on canvas size
                const x1 = innerRadius * p.cos(i);
                const y1 = innerRadius * p.sin(i);
                const x2 = r * p.cos(i);
                const y2 = r * p.sin(i);

                // Draw line from inner to outer point
                p.line(x1, y1, x2, y2);
            }
            p.endShape();
        };
    };

    return (
        <div ref={containerRef} className={className}>
            <P5Wrapper sketch={sketch} />
        </div>
    );
};

export default Waveform;