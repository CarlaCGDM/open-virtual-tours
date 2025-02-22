import React, { useDeferredValue } from 'react';
import { useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Clone } from '@react-three/drei';
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing'

const MemoizedCanvas = React.memo(({ modelURL, setLoaded, displayModels, overlay }) => {

  function LazyLoadModel({ url, onLoaded }) {

    const deferred = useDeferredValue(url)
    const { scene } = useGLTF(deferred);

    useEffect(() => {
      onLoaded(); // Tell parent that model is loaded
    }, []);

    return <Clone object={scene} />;
  }


  return (
    <Canvas className="tour-experience">
      {/* Staging */}
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* Navigation */}
      <OrbitControls />

      {/* Environment */}
      <Suspense fallback={null}>
        <LazyLoadModel url={modelURL} onLoaded={() => setLoaded(true)} />
      </Suspense>

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
