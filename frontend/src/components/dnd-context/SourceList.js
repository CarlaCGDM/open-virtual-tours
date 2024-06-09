import React, { useState, useEffect } from 'react'
import Card from './Card.js'
import { ModelAPI } from '../../apis/ModelAPI.js';
import './SourceList.css'
import InfoCard from '../modals/InfoCard.js';

const SourceList = () => {
  // State variables
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('name_asc'); // Default sorting type
  const limit = 20; // Number of items per page

  useEffect(() => {
    fetchCards();
  }, [currentPage, searchTerm, sortType]);

  // Fetch cards function
  const fetchCards = async () => {
    try {
      const response = await ModelAPI.getAllPaginated(currentPage, limit, searchTerm, sortType);
      setCards(response.models)
      setTotalPages(response.totalPages)
      setSelectedCard(response.models[0])
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
              placeholder="Search by name"
            />
            <button type="submit">Search</button>
          </form>

          <select value={sortType} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
          </select>

        </div>

        <div className="query-results">
          {cards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              text={card.name}
              imgURL={card.imgURL}
              isSelected={selectedCard === card}
              onSelect={() => setSelectedCard(card)}
            />
          ))}
        </div>
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {selectedCard && <InfoCard
        isModel={true}
        content={selectedCard}
      />}

    </div>
  )
}

export default SourceList
