import React, { useDeferredValue } from 'react';
import { useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Clone } from '@react-three/drei';
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing'
import FrameTimeMonitor from '../utils/TimeFrameMonitor.js';

const MemoizedCanvas = React.memo(({ modelURL, setLoaded, displayModels, overlay, devMode }) => {

  function LazyLoadLowresModel({ url, onLoaded }) {

    const deferred = useDeferredValue(url)
    const { scene } = useGLTF(deferred + "/LOD_03.glb")

    useEffect(() => {
      onLoaded(); // Tell parent that model is loaded
    }, []);

    // Ensure models are loaded
    if (!scene) {
      console.warn("Lowest resolution model failed to load:", { scene });
      return null;  // Prevent rendering until models are available
    }

    return (
      <Clone object={scene} position={[0, 0.3, 0]} />

    );
  }

  function LazyLoadModel({ url }) {

    const deferred = useDeferredValue(url)
    const { scene } = useGLTF(deferred + "/LOD_01.glb");

    return <Clone object={scene} />;
  }


  return (
    <Canvas className="tour-experience">

      <FrameTimeMonitor />

      {/* Staging */}
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* Navigation */}
      <OrbitControls />

      {/* Environment */}
      {!devMode && <Suspense fallback={<LazyLoadLowresModel url={modelURL} onLoaded={() => setLoaded(true)} />}>
        <LazyLoadModel url={modelURL} />
      </Suspense>}

      {devMode && <Suspense fallback={null}>
        <LazyLoadLowresModel url={modelURL} onLoaded={() => setLoaded(true)} />
      </Suspense>}

      {/* Content */}
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor="white" edgeStrength={100} width={1000} />
        </EffectComposer>
        {displayModels}
      </Selection>


      <Clone object={overlay} />


    </Canvas>
  );
});

export default MemoizedCanvas;
