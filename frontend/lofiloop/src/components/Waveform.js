"use client";
import React, { useRef, useEffect } from "react";
import p5 from "p5";

// Ensure p5.sound is loaded correctly on the client
if (typeof window !== "undefined") {
    window.p5 = p5;
    require("p5/lib/addons/p5.sound");
}

// Accept audioEl and isPlaying as props
export default function Waveform({ className, audioEl, isPlaying }) {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef(null); // Ref to hold the p5 instance

  useEffect(() => {
    // Only run if we have an audio element and it's supposed to be playing
    if (audioEl && isPlaying && containerRef.current) {
      // If an instance already exists, don't create a new one
      if (p5InstanceRef.current) {
        // Make sure it's looping if it was stopped
        if (!p5InstanceRef.current.isLooping()) {
          p5InstanceRef.current.loop();
        }
        return;
      }

      const sketch = (p) => {
        let fft;
        let soundSource = null; // To hold the p5 sound source

        p.setup = () => {
          const { offsetWidth: w, offsetHeight: h } = containerRef.current;
          p.createCanvas(w, h);
          p.angleMode(p.DEGREES);
          // No fill for the lines
          p.noFill();

          // Create FFT analyzer
          fft = new p5.FFT();

          // Create a p5 MediaElement from the passed audioEl
          // This allows p5.sound to analyze it
          soundSource = new p5.MediaElement(audioEl);
          fft.setInput(soundSource);

          p.loop(); // Start the draw loop
        };

        p.windowResized = () => {
          const { offsetWidth: w, offsetHeight: h } = containerRef.current;
          p.resizeCanvas(w, h);
        };

        p.draw = () => {
          // Use a transparent background or set the desired color
          const transparent = p.color(17, 24, 39); // Match example background
          p.background(transparent);

          p.translate(p.width / 2, p.height / 2);

          // Analyze the audio
          fft.analyze();
          const wave = fft.waveform(); // Get waveform data

          // Draw waveform lines radiating outwards
          p.stroke(255); // White lines
          p.strokeWeight(5); // Thicker lines like example

          const innerRadius = p.width * 0.25; // Define inner radius

          for (let i = 0; i <= 360; i += 5) { // Iterate through angles
            const index = p.floor(p.map(i, 0, 360, 0, wave.length - 1));
            // Ensure wave[index] is valid before mapping
            const amplitude = wave[index] || 0;
            // Map amplitude to outer radius, similar multiplier as example
            const r = p.map(amplitude * 1.25, -1, 1, innerRadius, p.width * 0.5);

            // Calculate start point (on inner circle)
            const x1 = innerRadius * p.cos(i);
            const y1 = innerRadius * p.sin(i);
            // Calculate end point (based on waveform)
            const x2 = r * p.cos(i);
            const y2 = r * p.sin(i);

            // Draw line from inner to outer point
            p.line(x1, y1, x2, y2);
          }
        };
      };

      // Create the p5 instance and store it in the ref
      p5InstanceRef.current = new p5(sketch, containerRef.current);

    } else if (p5InstanceRef.current) {
      // If not playing or no audio element, stop the loop
      p5InstanceRef.current.noLoop();
    }

    // Cleanup function: remove the p5 instance when the component unmounts
    // or when audioEl/isPlaying changes causing the effect to re-run differently
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
    // Rerun effect if audioEl or isPlaying changes
  }, [audioEl, isPlaying]);

  // Render the container div for p5 canvas
  return <div ref={containerRef} className={className} />;
}