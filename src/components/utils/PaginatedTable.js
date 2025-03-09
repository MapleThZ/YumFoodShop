// components/PaginatedTable.js
import React, { useState } from 'react';
import Table from './Table'

const PaginatedTable = ({ header, data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <container style={{ width: '90%' }}>
            <Table header={header} data={currentData} />
            <div className='paging-button'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button className='button'
                        key={i + 1}
                        onClick={() => handleClick(i + 1)}
                        disabled={currentPage === i + 1}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </container>
    );
};

export default PaginatedTable;
