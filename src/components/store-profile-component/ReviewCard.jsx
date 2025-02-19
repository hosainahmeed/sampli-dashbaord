import { Button } from 'antd';
import React, { useState } from 'react';
import { BsReply } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { useSpring, animated } from 'react-spring';

const ReviewCard = ({ review }) => {
  const {
    name,
    rating,
    date,
    description,
    productImage,
    productName,
    reviewerImage,
  } = review;

  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState('');

  const replyBoxAnimation = useSpring({
    height: isReplying ? 'auto' : '0px',
    opacity: isReplying ? 1 : 0,
    overflow: 'hidden',
    display: isReplying ? 'block' : 'none',
    paddingTop: isReplying ? '10px' : '0px',
    paddingBottom: isReplying ? '10px' : '0px',
    config: { tension: 200, friction: 20 },
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#FFB400' : '#d3d3d3' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const toggleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleReplySubmit = () => {
    if (reply.trim()) {
      console.log('Reply submitted:', reply);
      setReply('');
      setIsReplying(false);
    }
  };

  return (
    <div
      style={{
        padding: '15px',
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '15px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={reviewerImage}
          alt={name}
          className="rounded-full mr-3 w-12 h-12 object-cover"
        />
        <div className="flex justify-between items-center w-full">
          <div>
            <span style={{ fontWeight: 'bold' }}>{name}</span>
            <div>{renderStars(rating)}</div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div style={{ marginLeft: 'auto', color: '#888' }}>
            {new Date(date).toLocaleDateString()}
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button
              size="small"
              shape="circle"
              onClick={toggleReply}
              style={{
                background: isReplying ? 'red' : '#FFB400',
                color: '#fff',
              }}
            >
              {isReplying ? <RxCross2 /> : <BsReply />}
            </Button>
          </div>
        </div>
      </div>
      <p style={{ margin: '10px 0', color: '#555' }}>{description}</p>
      {productImage && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={productImage}
            alt={productName}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '5px',
              objectFit: 'cover',
              marginRight: '10px',
            }}
          />
          <span>{productName}</span>
        </div>
      )}

      {/* Animated reply input field */}
      <animated.div style={replyBoxAnimation}>
        <div style={{ marginTop: '10px' }}>
          <textarea
            value={reply}
            onChange={handleReplyChange}
            placeholder="Write your reply..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              minHeight: '60px',
              fontSize: '14px',
            }}
          ></textarea>
          <button
            onClick={handleReplySubmit}
            style={{
              background: '#3475F1',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '5px',
              marginTop: '10px',
            }}
          >
            Submit Reply
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default ReviewCard;
