import React, { useState, useEffect } from 'react';
import { EnvironmentAPI } from '../apis/EnvironmentAPI.js';
import { ConfigAPI } from '../apis/ConfigAPI.js';

const useEnvironmentsData = (tourConfig) => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedInUse, setSelectedInUse] = useState(false); // State to track if environment is in use
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('oldest');
  const limit = 14; // Number of items per page

  // Fetch cards function
  const fetchCards = async () => {
    console.log("Fetching environment cards...");
    try {
      const response = await EnvironmentAPI.getAllPaginated(currentPage, limit, searchTerm, sortType);
      setCards(response.environments);
      setTotalPages(response.totalPages);
      if (!selectedCard) {
        setSelectedCard(response.environments[0]);
      }
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  // Check if the selected environment is in use
  const checkIfEnvironmentIsUsed = async () => {
    if (selectedCard) {
      try {
        const result = await ConfigAPI.getAll();
        const isUsed = result.tourEnvironment === selectedCard._id; // Check if the selected environment is being used in the current tour configuration
        setSelectedInUse(isUsed);
      } catch (error) {
        console.error('Failed to check if environment is in use:', error);
      }
    }
  };

  useEffect(() => {
    fetchCards(); // Initial fetch when the component mounts
  }, [currentPage, searchTerm, sortType]);

  useEffect(() => {
    checkIfEnvironmentIsUsed(); // Check if the selected environment is in use whenever the selectedCard changes
  }, [selectedCard]);

  // Destroy card function for deleting an environment
  const destroyCard = async (id) => {
    try {
      await EnvironmentAPI.deleteOne(id); // Call API to delete environment by ID
      console.log("Environment deleted successfully.");
    } catch (error) {
      console.error("Failed to delete environment:", error);
    }
  };

  return {
    cards,
    selectedCard,
    selectedInUse,
    currentPage,
    totalPages,
    searchTerm,
    sortType,
    setSelectedCard,
    setSearchTerm,
    setSortType,
    fetchCards,
    destroyCard,
  };
};

export default useEnvironmentsData;
