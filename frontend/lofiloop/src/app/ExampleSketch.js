"use client";
// Example usage in a Next.js page:
// pages/p5-example.js

import dynamic from "next/dynamic";
import p5 from "p5";

// Dynamically import P5Wrapper with no SSR
const P5Wrapper = dynamic(() => import("./Visualizer"), {
    ssr: false,
});

const ExampleSketch = () => {
    const sketch = (p) => {
        let song;
        let fft;
        let canvas;

        p.preload = () => {
            song = p.loadSound("/Lukrembo_Biscuit.mp3");
        };

        p.setup = () => {
            canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            p.angleMode(p.DEGREES);
            fft = new p5.FFT();
            canvas.elt.style.position = 'static'; // Add this line to help with cleanup
        };

        // Add a remove function for cleanup
        // p.remove = () => {
        //     song.stop();
        //     canvas.remove();
        // };


        p.mouseClicked = () => {
            if (song.isPlaying()) {
                song.pause();
                p.noLoop();
            } else {
                song.play();
                p.loop();
            }
        }


        // P5.js draw loop
        p.draw = () => {
            // p.ellipse(p.mouseX, p.mouseY, 20, 20);
            // p.fill(255, 0, 0);

            const lavender = p.color(172, 143, 227);
            p.background(lavender);
            p.stroke(255);
            p.strokeWeight(3);
            p.noFill();

            p.translate(p.width / 2, p.height / 2);
            var waveform = fft.waveform();

            // for (var t = -1; t <= 1; t += 2) {
                p.beginShape();
                for (var i = 0; i <= 360; i += 5) {
                    // maps elements of waveform data to the width of the canvas
                    var index = p.floor(p.map(i, 0, 360, 0, waveform.length - 1)); // -1 bc 0 to 1023 since 1024 is out of bounds

                    // var r = p.map(waveform[index], -1, 1, 150, 360);

                    // var x = r * p.sin(i) * t;
                    // var y = r * p.cos(i);
                    // p.vertex(x, y);

                    var r = p.map(waveform[index], -1, 1, 175, 360);  // Maps audio to line length

                    // Calculate inner and outer points
                    var innerRadius = 150;  // Adjust this value for hollow center size
                    var x1 = innerRadius * p.cos(i);
                    var y1 = innerRadius * p.sin(i);
                    var x2 = r * p.cos(i);
                    var y2 = r * p.sin(i);

                    // Draw line from inner to outer point
                    p.line(x1, y1, x2, y2);
                }
                p.endShape();
            // }
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