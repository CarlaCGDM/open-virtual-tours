import React from 'react';
import Card from './Card.js';
import DevInfoCard from '../modals/DevInfoCard.js';
import CreateEnvironmentResourceForm from '../forms/CreateEnvironmentResourceForm.js';
import { ConfigAPI } from '../../apis/ConfigAPI.js';
import useEnvironmentsData from '../../hooks/useEnvironmentsData.js';

const EnvironmentsSourceList = ({ tourConfig, onSelectEnvironment }) => {
  const [isCreateNewOpen, setIsCreateNewOpen] = React.useState(false); // State for "Create New" modal

  const {
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
    destroyCard,
    handleNextPage,
    handlePreviousPage,
    fetchCards, // Fetch cards function from custom hook
  } = useEnvironmentsData(tourConfig);

  // Handle when a new environment is created (callback for CreateEnvironmentResourceForm)
  const handleCardCreated = () => {
    fetchCards(); // Re-fetch the list of cards after a new environment is created
    setIsCreateNewOpen(false); // Close the modal
  };

  // Handler for deleting the selected environment
  const handleDeleteEnvironment = async () => {
    if (selectedCard) {
      await destroyCard(selectedCard._id); // Delete the selected card
      fetchCards(); // Re-fetch the list after deletion
    }
  };

  const handleUseEnvironment = async () => {
    const formData = new FormData();
    formData.append("tourEnvironment", selectedCard._id);

    try {
      const newEnvironmentData = await ConfigAPI.editOne(formData, tourConfig._id);
      if (newEnvironmentData) {
        onSelectEnvironment(selectedCard); // Pass the whole of the selected environment back up to Admin
      }
      console.log("Selected environment URL is: " + selectedCard.modelURL)
    } catch (error) {
      console.error('Failed to use environment:', error);
    }
  };


  return (
    <div className="source-list-wrapper">
      <div className="source-list">
        <div className="search-area">
          <form className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Search by name"
              className="search-input"
            />
            <button type="submit" className="search-button" onClick={(e) => e.preventDefault()}>
              Search
            </button>
          </form>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="search-select"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
          </select>
        </div>

        <div className="query-results">
          {cards.map((card, index) => (
            <Card
              key={card._id}
              id={card._id}
              text={card.name}
              imgURL={card.imgURL}
              isSelected={selectedCard?._id === card._id}
              onSelect={() => setSelectedCard(card)}
              delay={index * 0.05}
            />
          ))}
        </div>

        <div className="pagination-controls-left">
          <button
            className="pagination-button-left"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-button-left"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <div className="create-new-button" onClick={() => setIsCreateNewOpen(true)}>
          Upload new +
        </div>
      </div>

      {selectedCard && (
        <DevInfoCard isModel={true} content={selectedCard} />
      )}

      {isCreateNewOpen && (
        <div className="popup-create-model">
          <CreateEnvironmentResourceForm
            onClose={() => setIsCreateNewOpen(false)} // Close the modal
            onCardCreated={handleCardCreated} // Pass the correct callback function
          />
        </div>
      )}

      <div className="action-buttons-wrapper">
        <button className="delete-button" onClick={handleUseEnvironment}>
          Use selected
        </button>

        {/* Delete Button */}
        <button
          className="delete-button"
          onClick={handleDeleteEnvironment} // Assuming handleDeleteEnvironment is defined
          disabled={selectedInUse} // Disable the delete button if environment is in use
          title={
            selectedInUse
              ? "Environment is currently in use and cannot be deleted."
              : "Delete selected environment."
          }
        >
          Delete selected
        </button>
      </div>




    </div>

  );
};

export default EnvironmentsSourceList;
