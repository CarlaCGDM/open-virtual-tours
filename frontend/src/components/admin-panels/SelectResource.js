import { useState } from "react";
import ModelsSourceList from "../dnd-context/ModelsSourceList.js";
import './SelectResource.css';

export default function SelectResource(props) {
    // Keeping track of which tab is currently selected
    const [currentTab, setCurrentTab] = useState("3D Models");

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
                    onClick={() => setCurrentTab("3D Models")}
                >
                    3D Models
                </button>
                <button
                    className={`tab-button ${currentTab === "Panels" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Panels")}
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

            {currentTab === "3D Models" && <ModelsSourceList />}
            {currentTab === "Environments" && <div>Sorry, coming soon!</div>}
            {currentTab === "Panels" && <div>Sorry, coming soon!</div>}
            {currentTab === "Config" && <div>Sorry, coming soon!</div>}
            {currentTab === "Users" && <div>Sorry, coming soon!</div>}
            {currentTab === "Lighting" && <div>Sorry, coming soon!</div>}
        </div>
    );
}
