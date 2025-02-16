import { useState } from "react";
import ModelsSourceList from "../dnd-context/ModelsSourceList.js";
import './SelectResource.css';
import PanelsSourceList from "../dnd-context/PanelsSourceList.js";
import EnvironmentsSourceList from "../dnd-context/EnvironmentsSourceList.js";

export default function SelectResource({setShowPanelBuckets,tourConfig}) {
    // Keeping track of which tab is currently selected
    const [currentTab, setCurrentTab] = useState("Environments");

    return (
        <div className="resource-panel">
            <div className="buttons-row">
                <button
                    className={`tab-button ${currentTab === "Environments" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Environments")}
                >
                    Environments
                </button>
                <button
                    className={`tab-button ${currentTab === "3D Models" ? "active" : ""}`}
                    onClick={() => {setCurrentTab("3D Models");setShowPanelBuckets(false)}}
                >
                    3D Models
                </button>
                <button
                    className={`tab-button ${currentTab === "Panels" ? "active" : ""}`}
                    onClick={() => {setCurrentTab("Panels"); setShowPanelBuckets(true)}}
                >
                    Panels
                </button>
                <button
                    className={`tab-button ${currentTab === "Lighting" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Lighting")}
                >
                    Lighting
                </button>
                <button
                    className={`tab-button ${currentTab === "Config" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Config")}
                >
                    Config
                </button>
                <button
                    className={`tab-button ${currentTab === "Users" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Users")}
                >
                    Users
                </button>
            </div>

            {currentTab === "3D Models" && <ModelsSourceList/>}
            {currentTab === "Environments" && <EnvironmentsSourceList tourConfig={tourConfig}/>}
            {currentTab === "Panels" && <PanelsSourceList />}
            {currentTab === "Config" && <div>Sorry, coming soon!</div>}
            {currentTab === "Users" && <div>Sorry, coming soon!</div>}
            {currentTab === "Lighting" && <div>Sorry, coming soon!</div>}
        </div>
    );
}
