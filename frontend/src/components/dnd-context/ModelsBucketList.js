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
        <div className="bucket-list-container">
            <div className="buckets-title">
                <h2>3D Models in environment</h2>
                <p>(Assign new 3D models through drag and drop.)</p>
            </div>
            <div className="buckets">
            <button
                    className="pagination-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}>
                    &lt;
                </button>
                {currentItems.map((id) => (
                    <TargetBucket
                        key={id}
                        id={id}
                        tourId={props.tourEnvironment._id}
                        modelSlots={props.tourEnvironment.modelSlots}
                        onUpdate={() => { props.handleUpdate() }}
                    />
                ))}
            <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}>
                    &#62;
                </button>
            </div>
            <div className="pagination-controls">
                <span className="pagination-info">Page {currentPage} of {totalPages}</span>
            </div>
        </div>
    );
};

export default ModelsBucketsList;
