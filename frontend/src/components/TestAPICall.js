import { useEffect, useState } from "react";
import { ModelAPI } from "../apis/ModelAPI.js";

function TestAPICall() {
  const [modelList, setModelList] = useState([]);

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
    </>
  );
}

export default TestAPICall;