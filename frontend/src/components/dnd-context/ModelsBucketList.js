import React, { useState } from 'react';
import TargetBucket from './TargetBucket.js';
import './BucketsList.css';

const ModelsBucketsList = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate total pages
    const totalPages = Math.ceil(props.targetBuckets.length / itemsPerPage);

    // Get the items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = props.targetBuckets.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="buckets-list-container">
            <div className="buckets-title">
            <h3>3D Models</h3>
            <p>Assign new 3D models through drag and drop.</p>
            </div>
            <div className="buckets">
                {currentItems.map((id) => (
                    <TargetBucket
                        key={id}
                        id={id}
                        tourId={props.tourEnvironment._id}
                        modelSlots={props.tourEnvironment.modelSlots}
                        onUpdate={() => { props.handleUpdate() }}
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
    );
};

export default ModelsBucketsList;
