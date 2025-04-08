"use client";
// Example usage in a Next.js page:
// pages/p5-example.js

import dynamic from "next/dynamic";
import p5 from "p5";

// Dynamically import P5Wrapper with no SSR
const P5Wrapper = dynamic(() => import("../app/Visualizer"), {
    ssr: false,
});

const ExampleSketch = () => {
    const sketch = (p) => {
        let song;
        let fft;
        let canvas;
        let particles = [];

        p.preload = () => {
            song = p.loadSound("/Lukrembo_Biscuit.mp3");
        };

        p.setup = () => {
            canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            p.angleMode(p.DEGREES);
            p.rectMode(p.CENTER);
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

            p.translate(p.width / 2, p.height / 2);

            // for particles speed
            fft.analyze(); // output between 0 and 255
            let amp = fft.getEnergy(20, 200);

            let alpha = p.map(amp, 0, 255, 100, 50);
            p.fill(0, alpha);
            p.noStroke();
            p.rect(0, 0, p.width, p.height);


            // Draw waveform
            p.stroke(255);  // Restore stroke for waveform
            p.strokeWeight(3);
            p.noFill();

            var waveform = fft.waveform();

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

            let particle = new Particle();
            particles.push(particle);

            for (var i = particles.length - 1; i >= 0; i--) {
                if (!particles[i].edges()) {
                    particles[i].update(amp > 200);
                    particles[i].show();
                } else {
                    particles.splice(i, 1);
                }
            };
        };

        class Particle {
            constructor() {
                this.pos = p5.Vector.random2D().mult(300);
                this.vel = p.createVector(0, 0);
                this.acc = this.pos.copy().mult(p.random(0.0001, 0.0001));

                this.w = p.random(3,5);
            }
            update(cond) {
                this.vel.add(this.acc);
                this.pos.add(this.vel);
                if (cond) {
                    this.pos.add(this.vel);
                    this.pos.add(this.vel);
                    this.pos.add(this.vel);
                }
            }
            edges() {
                if (this.pos.x < -p.width / 2 || this.pos.x > p.width / 2 || this.pos.y < -p.height / 2 || this.pos.y > p.height / 2) {
                    return true;
                } else {
                    return false;
                }
            }
            show() {
                p.noStroke();
                p.fill(255);
                p.ellipse(this.pos.x, this.pos.y, this.w);
            }
        }
    };

    return (
        <div>
            <h1>P5.js Example</h1>
            <P5Wrapper sketch={sketch} />
        </div>
    );
};

export default ExampleSketch;