import { useEffect, useState } from "react"
import { ModelAPI } from "../apis/ModelAPI.js"
import { Canvas } from '@react-three/fiber'
import { useGLTF,OrbitControls } from '@react-three/drei'



function TestAPICall() {
  const [modelList, setModelList] = useState([]);
  
  function Model({ url }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} />
  }

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
          <directionalLight position={[1,2,3]} intensity={4.5}/>
          <ambientLight intensity={1.5} />
          <OrbitControls/>
          <Model 
            url={modelList[0]?.modelURL || "https://res.cloudinary.com/dahr27egc/image/upload/v1709658481/model_psdrba.glb"}
          />
      </Canvas>
      <img src="/images/ImagePreset01.png" alt="Example image 1 for testing purposes"/>
      {/* <Canvas>
          <directionalLight position={[1,2,3]} intensity={4.5}/>
          <ambientLight intensity={1.5} />
          <OrbitControls/>
          <Model 
            url="/uploads/models/CubePreset01.glb"
          />
      </Canvas> */}
    </>
  );
}

export default TestAPICall;