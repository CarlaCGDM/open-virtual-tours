import { useEffect, useState } from "react";
import { ExhibitAPI } from "../apis/ExhibitAPI.js";

function TestAPICall() {
  const [exhibitList, setExhibitList] = useState([]);

  useEffect(() => {
    ExhibitAPI.getAll()
      .then((data) => {
        console.log(data)
        setExhibitList(data);
      })
  }, []);

  return (
    <>
        <div>Hello</div>
        {exhibitList.length > 0 && <div>{exhibitList[0]?.name}</div>}
    </>
  );
}

export default TestAPICall;