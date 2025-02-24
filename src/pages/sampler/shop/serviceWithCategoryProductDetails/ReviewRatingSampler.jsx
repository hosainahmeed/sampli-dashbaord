import React, { useState, useEffect } from 'react'

const ReviewRatingSampler = () => {
  const [reviews, setReviews] = useState({
    totalReviews: 138,
    ratingDistribution: { 5: 100, 4: 30, 3: 5, 2: 2, 1: 1 },
    averageRating: 4.5,
  })

  useEffect(() => {
    // In a real app, fetch review data from an API
    // Example of API call to fetch reviews
    // fetch('/api/reviews')
    //   .then((response) => response.json())
    //   .then((data) => setReviews(data));
  }, [])

  const getProgressWidth = (rating) => {
    return (reviews.ratingDistribution[rating] / reviews.totalReviews) * 100
  }

  return (
    <div>
      <div>
        <span className="text-4xl">{reviews.averageRating}</span>
        <span>⭐</span>
        <span>({reviews.totalReviews} Reviews)</span>
      </div>
      <div>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} style={{ marginBottom: '10px' }}>
            <span>{rating} stars</span>
            <div
              style={{
                height: '8px',
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                overflow: 'hidden',
                marginTop: '5px',
              }}
            >
              <div
                style={{
                  width: `${getProgressWidth(rating)}%`,
                  height: '100%',
                  backgroundColor: '#f57c00',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewRatingSampler
