import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { Html } from '@react-three/drei'

function FrameTimeMonitor() {
    const [frameTime, setFrameTime] = useState(0);

    useFrame((state) => {
        const deltaTime = state.clock.getDelta() * 1000; // Convert seconds to milliseconds
        setFrameTime(deltaTime);
    });

    return <Html style={{ backgroundColor: "black", width:'100px', height: '50px', color: 'white' }}>Frame Time: {frameTime.toFixed(2)} ms</Html>;
}

export default FrameTimeMonitor;