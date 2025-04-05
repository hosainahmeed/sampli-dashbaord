/* eslint-disable react/no-unescaped-entities */
import React, { useState, useMemo, useCallback } from 'react';
import SelectField from './SelectField';
import FeedCard from '../ui/FeedCard';
import { Card, Pagination } from 'antd';

function AllFeedCard() {
  const options = [
    { label: 'Newest', value: 'Newest' },
    { label: 'Oldest', value: 'Oldest' },
    { label: 'Highest Rated', value: 'Highest Rated' },
    { label: 'Lowest Rated', value: 'Lowest Rated' },
  ];

  const [selectedValue, setSelectedValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  // Simulate data (replace this with actual data fetching logic)
  const totalCards = 6;
  const cards = Array.from({ length: totalCards }, (_, index) => ({
    id: index + 1,
    content: `Feed Card ${index + 1}`,
  }));

  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const currentCards = useMemo(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return cards.slice(indexOfFirstCard, indexOfLastCard);
  }, [currentPage, cardsPerPage, cards]);

  const handleSelectChange = useCallback((value) => {
    setSelectedValue(value);
    console.log('Selected value:', value);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // const handleNextPage = useCallback(() => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // }, [currentPage, totalPages]);

  // const handlePreviousPage = useCallback(() => {
  //   if (currentPage > 1) {
  //     setCurrentPage((prev) => prev - 1);
  //   }
  // }, [currentPage]);

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">Reviews</h1>
        <SelectField
          className="w-full md:w-40"
          name="feed"
          rules={[{ required: true }]}
          options={options}
          placeholder="Sort by"
          onChange={handleSelectChange}
        />
      </div>

      {/* Feed Cards Grid */}
      <div>
        {currentCards.length === 0 ? (
          <Card>
            <div className="!w-full col-span-2 flex flex-col items-center justify-center py-20 text-center">
              <p className="text-2xl font-semibold mb-2">No reviews yet</p>
              <p className="text-base text-[#6D7486]">
                Looks like you don't have any reviews on this product yet.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1  2xl:grid-cols-2 gap-4">
            {currentCards.map((card) => (
              <div key={card.id}>
                <FeedCard content={card.content} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalCards > cardsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            total={totalCards}
            pageSize={cardsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
            itemRender={(current, type, originalElement) => {
              if (type === 'prev' && current > 1) {
                return (
                  <button className="!border-none ">
                    <span className="text-[#2E78E9]">Previous</span>
                  </button>
                );
              }
              if (type === 'next') {
                return (
                  <button className="!border-none ">
                    <span className="text-[#2E78E9]">Next Page</span>
                  </button>
                );
              }
              if (type === 'page') {
                return current;
              }
              return originalElement;
            }}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(AllFeedCard);
