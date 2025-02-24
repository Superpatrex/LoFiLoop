import { useEffect, useRef } from "react";
import p5 from "p5";
// import "p5/lib/addons/p5.sound";

const P5Wrapper = ({ sketch }) => {
    const p5Container = useRef(null);

    useEffect(() => {
        // Create new P5 instance
        const p5Instance = new p5(sketch, p5Container.current);

        // Cleanup on unmount
        return () => {
            p5Instance.remove();
        };
    }, [sketch]);

    return <div ref={p5Container} />;
};

export default P5Wrapper;
