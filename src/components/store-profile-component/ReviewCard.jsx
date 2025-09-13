// import { Button } from 'antd';
import { Skeleton } from 'antd';
import React from 'react';
// import { RxCross2 } from 'react-icons/rx';
// import { useSpring, animated } from 'react-spring';

const ReviewCard = ({ r, reviewLoading }) => {
  console.log(reviewLoading)
  // const [isReplying, setIsReplying] = useState(false);
  // const [reply, setReply] = useState('');

  // const replyBoxAnimation = useSpring({
  //   height: isReplying ? 'auto' : '0px',
  //   opacity: isReplying ? 1 : 0,
  //   overflow: 'hidden',
  //   display: isReplying ? 'block' : 'none',
  //   paddingTop: isReplying ? '10px' : '0px',
  //   paddingBottom: isReplying ? '10px' : '0px',
  //   config: { tension: 200, friction: 20 },
  // });
  if (reviewLoading) {
    return <Skeleton loading />
  }

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

  // const handleReplyChange = (e) => {
  //   setReply(e.target.value);
  // };

  // const toggleReply = () => {
  //   setIsReplying(!isReplying);
  // };

  // const handleReplySubmit = () => {
  //   if (reply.trim()) {
  //     console.log('Reply submitted:', reply);
  //     setReply('');
  //     setIsReplying(false);
  //   }
  // };

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
          src={r?.reviewer?.profile_image}
          alt={r?.reviewer?.name}
          className="rounded-full mr-3 w-12 h-12 object-cover"
        />
        <div className="flex justify-between items-center w-full">
          <div>
            <span style={{ fontWeight: 'bold' }}>{r?.reviewer?.name}</span>
            <div>{renderStars(r?.rating)}</div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div style={{ marginLeft: 'auto', color: '#888' }}>
            {new Date(r?.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <p style={{ margin: '10px 0', color: '#555' }}>{r?.description}</p>
      {r?.product?.image && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={r?.product?.image}
            alt={r?.product?.name}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '5px',
              objectFit: 'cover',
              marginRight: '10px',
            }}
          />
          <span>{r?.product?.name}</span>
        </div>
      )}
      {/* <div style={{ marginTop: '10px' }}>
        {isReplying ? (
          <Button
            size="small"
            shape="circle"
            onClick={toggleReply}
            style={{
              background: isReplying ? 'red' : '#FFB400',
              color: '#fff',
            }}
          >
            <RxCross2 />
          </Button>
        ) : (
          <Button onClick={toggleReply}
            className='!border-none !text-sm hover:!underline'
          >Reply</Button>
        )}
      </div> */}
      {/* Animated reply input field */}
      {/* <animated.div style={replyBoxAnimation}>
        <div className="flex items-end gap-2">
          <textarea
            value={reply}
            onChange={handleReplyChange}
            placeholder="Reply to this review..."
            className="w-full p-2 border border-gray-300 rounded-md min-h-[150px] text-sm"
          ></textarea>
          <button
            onClick={handleReplySubmit}
            className="bg-[#2863fa89] !text-white px-3 py-2 rounded mt-2"
          >
            Reply
          </button>
        </div>
      </animated.div> */}
    </div>
  );
};

export default ReviewCard;
