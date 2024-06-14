import React, { useState, useEffect, Suspense, Loader } from 'react'
import Card from './Card.js'
import { EnvironmentAPI } from '../../apis/EnvironmentAPI.js'
import './SourceList.css'
import DevInfoCard from '../modals/DevInfoCard.js'
import CreateEnvironmentResourceForm from '../forms/CreateEnvironmentResourceForm.js'
import { ConfigAPI } from '../../apis/ConfigAPI.js'
//import UpdateEnvironmentResourceForm from '../forms/UpdateEnvironmentResourceForm.js'

const EnvironmentsSourceList = ({tourConfig}) => {
  // State variables
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState('')
  const [selectedInUse, setSelectedInUse] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('oldest') // Default sorting type
  const limit = 14; // Number of items per page

  const [isCreateNewOpen, setIsCreateNewOpen] = useState(false); // State
  const [isEditOpen, setIsEditOpen] = useState(false); // State

  useEffect(() => {
    fetchCards();
  }, [currentPage, searchTerm, sortType]);

  const fetchSelectedCard = async () => {
    console.log("Re-fetching the list of cards!")
    try {
      await EnvironmentAPI.getOne(selectedCard._id)
        .then((response) => {
          setSelectedCard(response)
        }
        );
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };


  // Fetch cards function
  const fetchCards = async () => {
    console.log("Re-fetching the list of cards!")
    try {
      await EnvironmentAPI.getAllPaginated(currentPage, limit, searchTerm, sortType)
        .then((response) => {
          setCards(response.environments)
          setTotalPages(response.totalPages)
          if (!selectedCard) {
            setSelectedCard(response.environments[0])
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

  const environmentIsUsed = async (id) => {
    if (selectedCard) {
      await ConfigAPI.getAll().then((result) => {
        setSelectedInUse(result.tourEnvironment === selectedCard._id)
      })
    }
  }

  useEffect(() => {
    environmentIsUsed(selectedCard._id);
  }, [selectedCard]);

  // Destroy card function

  const destroyCard = async (id) => {
    try {
      await EnvironmentAPI.deleteOne(id)
        .then((response) => {
          setSelectedCard('')
          fetchCards()
        })

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
    setIsCreateNewOpen(true);
  };

  const handleCloseCreateNewModal = () => {
    setIsCreateNewOpen(false);
  };

  const handleCloseUpdateModal = () => {
    setIsEditOpen(false);
  };

  // Handler for card creation
  const handleCardCreated = () => {
    handleCloseCreateNewModal(); // Close the modal after card creation
    fetchCards(); // Re-fetch the list of cards
  };

  // Handler for card update
  const handleCardUpdated = () => {
    handleCloseUpdateModal(); // Close the modal after card creation
    fetchCards(); // Re-fetch the list of cards
    fetchSelectedCard();
  };

  const handleUseEnvironment = async () => {
    // Create formData to send

    const formData = new FormData()
    formData.append("tourEnvironment", selectedCard._id)

    // Api call to get config
    console.log("Re-fetching the list of cards!")
    try {
      await ConfigAPI.editOne(formData,tourConfig._id)
        .then((response) => {
          console.log(response)
        }
        );
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }

  }


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

      {isCreateNewOpen && <div className="popup-create-model">

        <CreateEnvironmentResourceForm
          onClose={handleCloseCreateNewModal}
          onCardCreated={handleCardCreated}
        /></div>}

      {/* {isEditOpen && <div className="popup-create-environment">
        <UpdateEnvironmentResourceForm
          onClose={handleCloseUpdateModal}
          onCardUpdated={handleCardUpdated}
          selectedCard={selectedCard}
        /></div>} */}

      <div className="action-buttons-wrapper">
        <button
          className="delete-button"
          onClick={() => { handleUseEnvironment(selectedCard._id) }}>
          Use selected
        </button>

        <button
          className="delete-button"
          onClick={() => { setIsEditOpen(true) }}>
          Edit selected
        </button>

        <button
          disabled={selectedInUse}
          title={selectedInUse ? "Environments currently in use cannot be deleted." : "Delete selected environment."}
          onClick={() => { destroyCard(selectedCard._id) }}
          className="delete-button">
          Delete selected
        </button>
      </div>

    </div>
  )
}

export default EnvironmentsSourceList
