import { useState } from "react"
// import ListModels from "./ListModels"
// import ListUsers from "./ListUsers"
// import ListEnvironments from "./ListEnvironments.js"
// import ListInfoPanels from "./ListInfoPanels"

export default function SelectResource(props) {

    // Keeping track of which tab is currently selected

    const [currentTab, setCurrentTab] = useState("Environments")

    return <div className="settings-panel">
        <div>
            <button onClick={() => setCurrentTab("Environments")}>Environments</button>
            <button onClick={() => setCurrentTab("3D Models")}>3D Models</button>
            <button onClick={() => setCurrentTab("Info Panels")}>Info Panels</button>
            <button onClick={() => setCurrentTab("Lighting Presets")}>Lighting Presets</button>
            <button onClick={() => setCurrentTab("Users")}>Users</button>
        </div>


        
        {/* {currentTab === "Environments" && < ListEnvironments environmentId={props.environmentId} setEnvironmentId={(Id) => {props.setEnvironmentId(Id)}} />}
        {currentTab === "3D Models" && <ListModels />}
        {currentTab === "Info Panels" && <ListInfoPanels />}
        {currentTab === "Users" && <ListUsers />}
        {currentTab === "Lighting Presets" && <ListConfig />} */}
    </div>
}