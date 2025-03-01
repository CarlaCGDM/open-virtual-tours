import { useEffect, useState } from "react";
import { ConfigAPI } from "../apis/ConfigAPI.js";
import { EnvironmentAPI } from "../apis/EnvironmentAPI.js";
import { PlacedModelAPI } from "../apis/PlacedModelAPI.js";

export default function useTourData() {
  const [tourConfig, setTourConfig] = useState(null);
  const [tourEnvironment, setTourEnvironment] = useState(null);
  const [placedModels, setPlacedModels] = useState([]);

  // Fetch Tour Configuration
  useEffect(() => {
    const fetchTourConfig = async () => {
      console.log("Fetching tour config...");
      const data = await ConfigAPI.getAll();
      setTourConfig(data);
    };
    fetchTourConfig();
  }, []);

  // Fetch Environment when tourConfig updates
  useEffect(() => {
    if (tourConfig?.tourEnvironment) {
      const fetchEnvironment = async () => {
        console.log("Fetching environment...");
        const data = await EnvironmentAPI.getOne(tourConfig.tourEnvironment);
        setTourEnvironment(data);
      };
      fetchEnvironment();
    }
  }, [tourConfig]);

  // Fetch Placed Models when tourEnvironment updates
  useEffect(() => {
    if (tourEnvironment?.modelSlots?.length) {
      const fetchPlacedModels = async () => {
        console.log("Fetching placed models...");
        const data = await PlacedModelAPI.getMultipleByIds(tourEnvironment.modelSlots);
        setPlacedModels(data);
      };
      fetchPlacedModels();
    } else {
      setPlacedModels([])
    }
  }, [tourEnvironment]);

  return {
    tourConfig,
    tourEnvironment,
    placedModels,
    refreshTourData: () => {
      // Manually trigger data refresh
      console.log("Manually refreshing tour data...");
      ConfigAPI.getAll().then(setTourConfig);
    },
  };
}
