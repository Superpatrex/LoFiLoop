"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";

if (typeof window !== "undefined") {
  window.p5 = p5;
  require("p5/lib/addons/p5.sound");
}

const P5Wrapper = ({ sketch }) => {
  const p5Container = useRef(null);

  useEffect(() => {
    const p5Instance = new p5(sketch, p5Container.current);
    return () => p5Instance.remove();
  }, [sketch]);

  return <div ref={p5Container} />;
};

export default P5Wrapper;
