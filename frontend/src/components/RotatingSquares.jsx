import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function RotatingSquare({ position, rotationSpeed }) {
    const meshRef = useRef();

    useFrame(() => {
        meshRef.current.rotation.x += rotationSpeed;
        meshRef.current.rotation.y += rotationSpeed;
    });

    return (
        <Box
            ref={meshRef}
            position={position}
            args={[1, 1, 1]}
        >
            <meshStandardMaterial
                color="#ffffff"
                metalness={0.5}
                roughness={0.2}
                transparent
                opacity={0.7}
            />
        </Box>
    );
}

export default function RotatingSquares() {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingSquare position={[-2, 0, 0]} rotationSpeed={0.01} />
            <RotatingSquare position={[0, 0, 0]} rotationSpeed={0.015} />
            <RotatingSquare position={[2, 0, 0]} rotationSpeed={0.02} />
        </group>
    );
} 