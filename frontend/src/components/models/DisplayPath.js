import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef, useMemo, useEffect } from 'react'
import { useScroll, PerspectiveCamera, ScrollControls, PointerLockControls, OrbitControls } from '@react-three/drei'
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

export default function DisplayPath(props) {

    console.log("Rendering tour path")

    // Process the path object to convert it to a 
    //Convert points to THREE.Vector3
    // const curve = new THREE.CatmullRomCurve3( path.points.map((point) => {return new THREE.Vector3(point.x,point.y,point.z)}) );

    const path = {points:[{}],closed:false}
    const pathPoints = []

    props.tourModel.scene.traverse( function( object ) {

        console.log("Looking for path object.")
        if ( object.name === "Path" && object.isMesh ) {
     
          console.log("Found path object.")
          let vertices = object.geometry.attributes.position.array
          for (let i = 0; i < vertices.length; i=i+3) {
            //a vertex' position is (vertices[i],vertices[i+1],vertices[i+2])
            pathPoints.push({
              x:vertices[i],
              y:vertices[i+1],
              z:vertices[i+2]
            })
          }

          path.points = pathPoints
          object.visible = false // Hide path mesh
     
        }
     
     } );

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            path.points.map((point) => {return new THREE.Vector3(point.x,point.y,point.z)})
        );
    }, []);

    const LINE_NB_POINTS = curve.points.length * 100;
    props.setScrollPages(curve.points.length / 3)

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
      }, [curve]);

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.05);
        shape.lineTo(0, 0.05);
    
        return shape;
    }, [curve]);

    // Control camera with scroll

    // // Event listener for mouse movement
    // const handleMouseMove = () => {
    //     console.log("Moving mouse!")
    //     if (scrollMode) {
    //         setScrollMode(false); // Switch to mouse control mode
    //     }
    // };

    // // Event listener for scrolling
    // const handleScroll = () => {
    //     console.log("Scrolling!")
    //     if (!scrollMode) {
    //         setScrollMode(true); // Switch to scrolling mode
    //     }
    // };

    // window.addEventListener('mousemove', handleMouseMove);
    // window.addEventListener('wheel', handleScroll);

    const cameraGroup = useRef();
    const scroll = useScroll();
    const direction = new THREE.Vector3();

    useFrame((_state, delta) => {
        
            // Code for scrolling mode
            // Use the code for scrolling mode from the previous solution

            const modalOpacity = Math.max(1 - (scroll.offset * 4),0)

            props.setModalOpacity(modalOpacity)

            const t = scroll.offset * (linePoints.length - 1);
            const curPointIndex = Math.max(Math.floor(t),0);
            console.log(curPointIndex)
            const nextPointIndex = Math.min(curPointIndex + 1, linePoints.length - 1);
            
            const curPoint = linePoints[curPointIndex];
            const nextPoint = linePoints[nextPointIndex];
            
            // Calculate the interpolation factor
            const lerpFactor = t - curPointIndex;
        
            // Interpolate between the current point and the next point
            const targetPosition = curPoint.clone().lerp(nextPoint, lerpFactor);
        
            // Smoothly interpolate the camera position
            cameraGroup.current.position.lerp(targetPosition, delta * 6);
            
            // Calculate the direction vector
            direction.subVectors(nextPoint, curPoint).normalize();
        
            // Make the camera look in the direction of movement
            cameraGroup.current.lookAt(cameraGroup.current.position.clone().add(direction));
            cameraGroup.current.rotateY(Math.PI);

        
    });
    
    // Render models

    // Render panels

    return <>

            {/* Camera */}

            {/* <OrbitControls enableZoom={false} /> */}

            <group ref={cameraGroup}>
                <PerspectiveCamera position={[0,1.2,0]} fov={70} makeDefault />
            </group>

            {/* Path object */}

            <mesh position={[0,1,0]}>
                <extrudeGeometry args={[
                    shape,
                    {
                        steps: LINE_NB_POINTS,
                        bevelEnabled: false,
                        extrudePath: curve
                    }
                ]} />
                <meshStandardMaterial color={"black"} opacity={0.3} transparent />
        
            </mesh>

    </>
}