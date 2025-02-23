import { useState } from "react";
import useTourData from "../hooks/useTourData.js";
import ModelsSourceList from "../components/dnd-context/ModelsSourceList.js";
import TargetBucket from "../components/dnd-context/ModelTargetBucket.js";
import DndContext from "../components/dnd-context/DndContext.js";
import TourExperience from "../components/canvases/TourExperience.js";
import Footer from "../components/navigation/Footer.js";
import HeaderContainer from "../components/navigation/HeaderContainer.js";
import SelectResource from "../components/admin-panels/SelectResource.js";
import ModelsBucketsList from "../components/dnd-context/ModelsBucketList.js";
import PanelsBucketsList from "../components/dnd-context/PanelsBucketList.js";
import "./Admin.css";

export default function Admin() {
  const { tourConfig, tourEnvironment, placedModels, refreshTourData } = useTourData(); // Initial data 
  const [showPanelBuckets, setShowPanelBuckets] = useState(false);

  const [tourEnvironmentKey, setTourEnvironmentKey] = useState(0) // So the tour component will fully reload and show the loading screen again after changes

  const handleUseEnvironment = (environment, placedModels) => {
    refreshTourData();
    setTourEnvironmentKey(tourEnvironmentKey + 1)
  };


  return (
    <div className="admin-page">
      <HeaderContainer />

      <div className="admin-content">
        <DndContext>
          <div className="resource-area">
            <SelectResource
              tourEnvironment={tourEnvironment}
              tourConfig={tourConfig}
              setShowPanelBuckets={setShowPanelBuckets}
              setSelectedEnvironment={handleUseEnvironment} // set the selected environment scene and placedModels in child
            />
          </div>

          <div className="preview-area">
            <div className="virtual-tour-dev">
              <TourExperience
                key={tourEnvironmentKey}
                tourEnvironment={tourEnvironment}
                placedModels={placedModels}
                devMode={true} // get the new data when this changes
              />
            </div>

            {!showPanelBuckets ? (
              <ModelsBucketsList
                key={tourEnvironmentKey}
                targetBuckets={tourEnvironment?.modelSlots?.map((_, i) => i) || []} // Send the list of PlacedModels
                tourEnvironment={tourEnvironment}
                handleUpdate={refreshTourData}
              />
            ) : (
              <PanelsBucketsList
                targetBuckets={tourEnvironment?.panelSlots?.map((_, i) => i) || []}
                tourEnvironment={tourEnvironment}
                handleUpdate={refreshTourData}
              />
            )}

            <div className="error-console">
              <div className="error-console-text">
                <p>error message: &#123; &#125;</p>
              </div>
            </div>
          </div>
        </DndContext>
      </div>

      <Footer contactEmail={tourConfig?.contactEmail} />
    </div>
  );
}

