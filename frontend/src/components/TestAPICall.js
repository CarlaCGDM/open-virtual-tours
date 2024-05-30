import { useEffect, useState } from "react";
import { ModelAPI } from "../apis/ModelAPI.js";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


function TestAPICall() {
  const [modelList, setModelList] = useState([]);

  const Model = () => {
    const gltf = useLoader(GLTFLoader, modelList[0]?.modelURL);
    return (
      <>
        <primitive object={gltf.scene} scale={0.4} />
      </>
    );
  };
  

  useEffect(() => {
    ModelAPI.getAll()
      .then((data) => {
        console.log(data)
        setModelList(data);
      })
  }, []);

  return (
    <>
        <div>Hello</div>
        {modelList.length > 0 && <div>{modelList[0]?.name}</div>}
        <Canvas>
          <Model />
          <OrbitControls />
      </Canvas>
    </>
  );
}

export default TestAPICall;