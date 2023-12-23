/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export function ChristmasScene(props) {
  const scroll = useScroll();
  const ref = useRef();
  const { nodes, materials } = useGLTF("/models/christmas-tree.gltf");
  useFrame(() => {
    ref.current.position.x = -scroll.offset * 12;
    ref.current.position.z = scroll.offset * 12;
  });
  return (
    <group {...props} ref={ref} dispose={null}>
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
          material={materials.emission}
          position={[-0.01, 2.51, -1.23]}
          scale={0.57}
        />
        <mesh
          geometry={nodes.star.geometry}
          material={materials.Palette}
          position={[0, 17.03, -0.02]}
        />
      </mesh>
      <mesh
        geometry={nodes.Gift.geometry}
        material={materials.Palette}
        position={[-3.16, 0.5, 0]}
        scale={0.49}
      >
        <mesh
          geometry={nodes.NurbsPath.geometry}
          material={materials.Palette}
        />
        <mesh
          geometry={nodes.NurbsPath001.geometry}
          material={materials.Palette}
          rotation={[-Math.PI, 1.39, -Math.PI]}
        />
        <mesh geometry={nodes.ribbons.geometry} material={materials.Palette} />
        <mesh
          geometry={nodes.topribbons.geometry}
          material={materials.Palette}
          position={[0, 1, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/christmas-tree.gltf");
