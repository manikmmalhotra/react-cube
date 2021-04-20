import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useState, useEffect, useRef } from "react";

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = (ev) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}

function Box(props) {
  const { x, y } = useMousePosition();
  //console.log(x);
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = (x / window.innerWidth - window.innerWidth) * 3;
    mesh.current.rotation.x =
      (y / window.innerHeight + window.innerHeight + 0.2) * 3;
  });

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial
        metalness={0.1}
        attach="material"
        color={"lightgreen"}
      />
    </mesh>
  );
}

function App() {
  //const hasMovedCursor = typeof x === "number" && typeof y === "number";

  return (
    <div>
      <div className="text">
        <span className="home">Home</span>
        <div className="poss">
          <span className="about">about</span>
          <span className="general">general</span>
        </div>
      </div>

      <div className="main">
        <Canvas camera={[-10, 0, 0]}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} />
          <Box position={[0, 0, 0]} />
        </Canvas>
        <span className="boom">social</span>
      </div>
    </div>
  );
}

export default App;
