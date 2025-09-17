import React, { useState, useMemo, useCallback } from 'react';
import SelectField from './SelectField';
import FeedCard from '../ui/FeedCard';
import { Card, Pagination, Skeleton } from 'antd';
import { useGetAllReviewQuery } from '../../Redux/sampler/reviewApis';
import { useLocation } from 'react-router-dom';

function AllFeedCard() {
  const { id } = useLocation().state;
  const { data: reviewList, isLoading: reviewLoading } = useGetAllReviewQuery({
    productId: id,
  });
  const options = [
    { label: 'Newest', value: 'Newest' },
    { label: 'Oldest', value: 'Oldest' },
    { label: 'Highest Rated', value: 'Highest Rated' },
    { label: 'Lowest Rated', value: 'Lowest Rated' },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {reviewLoading ? <Skeleton.Input size="small" /> : <h1 className="text-2xl font-semibold mb-4 md:mb-0">Reviews</h1>}
        {reviewLoading ? <Skeleton.Input size="small" /> : <SelectField
          className="w-full md:w-40"
          name="feed"
          rules={[{ required: true }]}
          options={options}
          placeholder="Sort by"
        />}
      </div>

      {/* Feed Cards Grid */}
      <div>
        {reviewList?.data?.data?.result?.length === 0 ? (
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
            {reviewLoading ? Array.from({ length: 4 }, (_, index) => (
              <Card loading key={index} />
            )) : reviewList?.data?.data?.result?.map((review) => (
              <div key={review?._id}>
                <FeedCard content={review} reviewLoading={reviewLoading} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {reviewList?.data?.data?.result?.length > cardsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            total={reviewList?.data?.data?.result?.length}
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
