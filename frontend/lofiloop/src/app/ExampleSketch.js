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
        var fft;

        p.preload = () => {
            song = p.loadSound("Lukrembo_Biscuit.mp3");
        };

        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.angleMode(p.DEGREES);
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
        }


        // P5.js draw loop
        p.draw = () => {
            // p.ellipse(p.mouseX, p.mouseY, 20, 20);
            // p.fill(255, 0, 0);

            const lavender = p.color(172, 143, 227);
            p.background(lavender);
            p.stroke(255);
            p.noFill();

            var waveform = fft.waveform();

            p.translate(p.width / 2, p.height / 2);

            p.beginShape();
            for (var i = 0; i <= 180; i++) {
                var index = p.floor(p.map(i, 0, p.width, 0, waveform.length - 1));

                var r = p.map(waveform[index], -1, 1, 0, 360);

                var x = r * p.sin(i);
                var y = r * p.cos(i)
                // var y = waveform[index] * 300 + p.height / 2;
                p.vertex(x, y);
            }
            p.endShape();
            p.beginShape();
            for (var i = 0; i <= 180; i++) {
                var index = p.floor(p.map(i, 0, p.width, 0, waveform.length - 1));

                var r = p.map(waveform[index], -1, 1, 0, 360);

                var x = r * -p.sin(i);
                var y = r * p.cos(i)
                // var y = waveform[index] * 300 + p.height / 2;
                p.vertex(x, y);
            }
            p.endShape();
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