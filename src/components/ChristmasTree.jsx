import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";

import * as THREE from "three";

const lightsMaterial = new THREE.MeshStandardMaterial();
lightsMaterial.color = new THREE.Color(4, 4, 4);
lightsMaterial.toneMapped = false;
lightsMaterial.emissiveIntensity = 4;
lightsMaterial.emissive = lightsMaterial.color;

const LIGHT_MAX = 5;
const LIGHT_SPEED = 2.5;

const audioUrls = [
  "audios/Jingle Bell Rock.mp3",
  "audios/All I Want For Christmas Is You.mp3",
  "audios/ES_Here Comes Lofi Claus - Guustavv.mp3",
  "audios/vance joy - riptide.mp3",
];

export function ChristmasTree(props) {
  const scroll = useScroll();
  const ref = useRef();
  const { nodes, materials } = useGLTF("models/christmas-tree.gltf");
  const [initialPosition] = useState(props.position);
  const [hoveredStar, setHoveredStar] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [christmasSound, setChristmasSound] = useState(
    () => new Audio(audioUrls[currentMusicIndex])
  );
  christmasSound.loop = true;
  useFrame((state, delta) => {
    if (
      lightsMaterial.color.r > LIGHT_MAX ||
      lightsMaterial.color.g > LIGHT_MAX ||
      lightsMaterial.color.b > LIGHT_MAX
    ) {
      lightsMaterial.color.r = Math.random();
      lightsMaterial.color.g = Math.random();
      lightsMaterial.color.b = Math.random();
    }
    if (
      lightsMaterial.color.r >= lightsMaterial.color.g &&
      lightsMaterial.color.r >= lightsMaterial.color.b
    ) {
      lightsMaterial.color.r += delta * LIGHT_SPEED;
    }
    if (
      lightsMaterial.color.g >= lightsMaterial.color.r &&
      lightsMaterial.color.g >= lightsMaterial.color.b
    ) {
      lightsMaterial.color.g += delta * LIGHT_SPEED;
    }
    if (
      lightsMaterial.color.b >= lightsMaterial.color.r &&
      lightsMaterial.color.b >= lightsMaterial.color.g
    ) {
      lightsMaterial.color.b += delta * LIGHT_SPEED;
    }

    ref.current.position.y = -12 - initialPosition[1] * scroll.offset * 3;
    ref.current.rotation.y = Math.PI * scroll.offset;
  });

  function handlePlayMusic() {
    if (christmasSound.paused) {
      christmasSound.play();
    } else {
      christmasSound.pause();

      const newIndex = (currentMusicIndex + 1) % audioUrls.length;
      setCurrentMusicIndex(newIndex);
      setChristmasSound(new Audio(audioUrls[newIndex]));
    }
  }

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        geometry={nodes.ChristmasTree.geometry}
        material={materials.Palette}
      >
        <mesh
          geometry={nodes.guirlande.geometry}
          material={materials.Palette}
          position={[0, 2.34, 0]}
        />
        <mesh
          geometry={nodes.lights.geometry}
          position={[-0.01, 2.51, -1.23]}
          scale={0.57}
          material={lightsMaterial}
        />
        <mesh
          geometry={nodes.star.geometry}
          material={materials.Palette}
          position={[0, 17.03, -0.02]}
          onPointerOver={(e) => setHoveredStar(true)}
          onPointerOut={(e) => setHoveredStar(false)}
          onClick={() => handlePlayMusic()}
        >
          <meshStandardMaterial
            {...materials.Palette}
            emissive={"orange"}
            toneMapped={false}
            emissiveIntensity={hoveredStar ? 6 : christmasSound.paused ? 0 : 2}
          />
        </mesh>
      </mesh>
    </group>
  );
}

useGLTF.preload("models/christmas-tree.gltf");
