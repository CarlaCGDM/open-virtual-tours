import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef, useMemo, useEffect } from 'react'
import { useScroll, PerspectiveCamera, ScrollControls, OrbitControls } from '@react-three/drei'

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
     
        }
     
     } );

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            path.points.map((point) => {return new THREE.Vector3(point.x,point.y,point.z)})
        );
    }, []);

    const points = curve.getPoints( curve.points.length );

    const LINE_NB_POINTS = curve.points.length * 100;

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

    const [scrollMode, setScrollMode] = useState(true); // Initially in scrolling mode

    const cameraGroup = useRef();
    const scroll = useScroll();
    const direction = new THREE.Vector3();
    
    useFrame((_state, delta) => {
        // Calculate the exact point position based on scroll offset
        const t = scroll.offset * (linePoints.length - 1);
        const curPointIndex = Math.floor(t);
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
            <ScrollControls pages={LINE_NB_POINTS} damping={0.3}>
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
            </ScrollControls>

    </>
}