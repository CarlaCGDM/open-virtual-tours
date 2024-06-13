import React, { useState, useEffect } from 'react'
import Card from './Card.js'
import { ModelAPI } from '../../apis/ModelAPI.js'
import './SourceList.css'
import DevInfoCard from '../modals/DevInfoCard.js'
import CreateModelResourceForm from '../forms/CreateModelResourceForm.js'

const ModelsSourceList = (props) => {
  // State variables
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('oldest') // Default sorting type
  const limit = 14; // Number of items per page

  const [isModalOpen, setIsModalOpen] = useState(false); // State

  useEffect(() => {
    fetchCards();
  }, [currentPage, searchTerm, sortType]);


  // Fetch cards function
  const fetchCards = async () => {
    console.log("Re-fetching the list of cards!")
    try {
      await ModelAPI.getAllPaginated(currentPage, limit, searchTerm, sortType)
        .then((response) => {
          setCards(response.models)
          setTotalPages(response.totalPages)
          if (!selectedCard) {
            setSelectedCard(response.models[0])
          } else {
            setSelectedCard(selectedCard)
          }
        }
        );
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  // Check if card is in use

  const modelIsUsed = () => {
    if (props.tourEnvironment) {
      return (props.tourEnvironment.modelSlots.includes(selectedCard._id))
    }
    return false
  }

  // Destroy card function

  const destroyCard = async (id) => {
    try {
      const response = await ModelAPI.deleteOne(id);
      fetchCards()
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  // Handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(1)
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handler for card creation
  const handleCardCreated = () => {
    handleCloseModal(); // Close the modal after card creation
    fetchCards(); // Re-fetch the list of cards
  };


  return (
    <div className="source-list-wrapper">

      <div className="source-list">
        <div className="search-area">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Search by name"
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>

          <select value={sortType} onChange={handleSortChange} className="search-select">
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
              isSelected={selectedCard._id === card._id}
              onSelect={() => setSelectedCard(card)}
              delay={index * 0.05}
            />
          ))}
        </div>

        <div className="pagination-controls-left">
          <button
            className="pagination-button-left"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}>
            Previous
          </button>
          <span className="pagination-info">Page {currentPage} of {totalPages}</span>
          <button
            className="pagination-button-left"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <div className="create-new-button" onClick={handleOpenModal}>
          Upload new +
        </div>
      </div>

      {selectedCard && <DevInfoCard
        isModel={true}
        content={selectedCard}
      />}

      {isModalOpen && <div className="popup-create-model">
        <CreateModelResourceForm
          onClose={handleCloseModal}
          onCardCreated={handleCardCreated}
        /></div>}

      <div className="action-buttons-wrapper">
        <button disabled className="delete-button">Edit selected</button>
        <button
          disabled={modelIsUsed(selectedCard._id)}
          title={modelIsUsed(selectedCard._id) ? "Models currently in use cannot be deleted." : "Delete selected model."}
          onClick={() => { destroyCard(selectedCard._id) }}
          className="delete-button">
          Delete selected
        </button>
      </div>

    </div>
  )
}

export default ModelsSourceList
