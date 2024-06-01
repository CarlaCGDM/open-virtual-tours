import { useEffect, useState } from "react"
import { ModelAPI } from "../apis/ModelAPI.js"
import { Canvas } from '@react-three/fiber'
import { useGLTF,OrbitControls } from '@react-three/drei'



function TestAPICall() {
  const [modelList, setModelList] = useState([])
  const [newModel, setNewModel] = useState({})
  
  function Model({ url }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} />
  }

  useEffect(() => {
    ModelAPI.getAll()
      .then((data) => {
        console.log(data)
        setModelList(data);
        // Newest model uploaded
        setNewModel(data[data.length - 1])
      })
  }, []);

  return (
    <>
    {/* <div>
      <div>3D Model from API</div>
      <div>{newModel?.name || "Model name"}</div>
      <div>{newModel?.description || "Model description"}</div>
      <div>{newModel?.author || "Model author"}</div>
      <div>{newModel?.license || "Model license"}</div>
      <div>{newModel?.createdAt || "Model license"}</div>
      <img src={newModel?.imgURL} alt="Model thumbnail"/>
      <Canvas>
        <directionalLight position={[1,2,3]} intensity={4.5}/>
        <ambientLight intensity={1.5} />
        <OrbitControls/>
        <Model 
          url={newModel?.modelURL || "https://res.cloudinary.com/dahr27egc/image/upload/v1709658481/model_psdrba.glb"}
        />
      </Canvas>
    </div> */}
    <form
      action="/upload/model"
      method="POST"
      id="uploadForm"
      enctype="multipart/form-data"
    >
      <label for="File">File: </label>
      <input type="file" name="avatar" />
      <br />
      <input type="submit" value="Upload File" />
    </form>

    {/* {modelList.length > 0 && <div>{modelList[0]?.name}</div>} */}
      {/* <Canvas>
          <directionalLight position={[1,2,3]} intensity={4.5}/>
          <ambientLight intensity={1.5} />
          <OrbitControls/>
          <Model 
            url="/static/uploads/models/CubePreset01.glb"
          />
      </Canvas>
      <img src="/static/uploads/images/ImagePreset01.png" alt="Example image 1"/> */}
    </>
  );
}

export default TestAPICall;