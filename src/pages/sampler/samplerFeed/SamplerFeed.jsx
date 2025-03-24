import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Input,
  Tabs,
  Rate,
  Modal,
  Dropdown,
  Tooltip,
} from 'antd'
import {
  ShareAltOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  MoreOutlined,
  SendOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import followingInactiveLogo from '../../../assets/feedLogo/following.svg'
import followingActiveLogo from '../../../assets/feedLogo/followingActive.svg'
import newLogo from '../../../assets/feedLogo/new.svg'
import newActiveLogo from '../../../assets/feedLogo/newActive.svg'
import popularActiveLogo from '../../../assets/feedLogo/popularActive.svg'
import popularInActiveLogo from '../../../assets/feedLogo/popularInactive.svg'

const { TabPane } = Tabs

const SamplerFeed = () => {
  const [activeTab, setActiveTab] = useState('popular')
  const [activeCategory, setActiveCategory] = useState('all')
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Gustavo',
        handle: '@GustavoLubin',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(
          Math.random() * 70
        )}`,
      },
      rating: 5.0,
      productName: 'Natural Glow Serum',
      price: '$25.00',
      category: 'Electronics',
      timeAgo: '24mins ago',
      content:
        "I've been using this serum for a month and the results are amazing! My skin looks more radiant and the texture has improved significantly. Totally worth the price!",
      likes: 23,
      liked: false,
      comments: [
        {
          id: 1,
          author: {
            name: 'Bassey',
            handle: '@Bator',
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(
              Math.random() * 70
            )}`,
          },
          content: 'AirPods offer efficient sound quality and connectivity.',
          timeAgo: '23m',
          likes: 21,
          liked: false,
          replies: [],
        },
      ],
    },
    {
      id: 2,
      author: {
        name: 'Chance',
        handle: '@ChanceWestervelt',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(
          Math.random() * 70
        )}`,
      },
      rating: 5.0,
      productName: 'WH-Portable Be...',
      price: '$70.00',
      category: 'Electronics',
      timeAgo: '23mins ago',
      content:
        "These headphones are absolutely incredible! The noise-canceling is top-notch and battery life is amazing. Been using them for a week now and I'm impressed with the sound quality. Great for both music and calls.",
      likes: 23,
      liked: false,
      hasVideo: true,
      comments: [],
    },
  ])

  const [commentText, setCommentText] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [following, setFollowing] = useState({})

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          }
        }
        return post
      })
    )
  }

  const handleCommentLike = (postId, commentId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                liked: !comment.liked,
              }
            }
            return comment
          })
          return { ...post, comments: updatedComments }
        }
        return post
      })
    )
  }

  const handleComment = (postId) => {
    if (!commentText.trim()) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                author: {
                  name: 'Current User',
                  handle: '@currentuser',
                  avatar: '/api/placeholder/32/32',
                },
                content: commentText,
                timeAgo: 'Just now',
                likes: 0,
                liked: false,
                replies: [],
              },
            ],
          }
        }
        return post
      })
    )
    setCommentText('')
    setReplyingTo(null)
  }

  const handleFollow = (authorHandle) => {
    setFollowing((prev) => ({
      ...prev,
      [authorHandle]: !prev[authorHandle],
    }))
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const users = [
    {
      id: 1,
      src: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Chance Westervelt',
      username: '@Chance23',
      reviews: 23,
    },
    {
      id: 2,
      src: 'https://randomuser.me/api/portraits/women/2.jpg',
      name: 'Lola Patel',
      username: '@LolaP',
      reviews: 42,
    },
    {
      id: 3,
      src: 'https://randomuser.me/api/portraits/men/3.jpg',
      name: 'Elianore Quintero',
      username: '@ElianoreQ',
      reviews: 87,
    },
    {
      id: 4,
      src: 'https://randomuser.me/api/portraits/women/4.jpg',
      name: 'Luna Chen',
      username: '@LunaC',
      reviews: 13,
    },
    {
      id: 5,
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
      name: 'Caelum Ortega',
      username: '@CaelumO',
      reviews: 25,
    },
    {
      id: 6,
      src: 'https://randomuser.me/api/portraits/men/6.jpg',
      name: 'Kaito Santos',
      username: '@KaitoS',
      reviews: 67,
    },
    {
      id: 7,
      src: 'https://randomuser.me/api/portraits/women/7.jpg',
      name: 'Astrid Hall',
      username: '@AstridH',
      reviews: 91,
    },
    {
      id: 8,
      src: 'https://randomuser.me/api/portraits/men/8.jpg',
      name: 'Sage Patel',
      username: '@SageP',
      reviews: 56,
    },
    {
      id: 9,
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
      name: 'Lylah Martin',
      username: '@LylahM',
      reviews: 32,
    },
    {
      id: 10,
      src: 'https://randomuser.me/api/portraits/men/10.jpg',
      name: 'Caspian Lee',
      username: '@CaspianL',
      reviews: 19,
    },
  ]

  const moreOptions = [
    { key: 'save', label: 'Save Post' },
    { key: 'report', label: 'Report Post' },
    { key: 'mute', label: 'Mute User' },
  ]

  const [showPicker, setShowPicker] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState('')

  const [isModalOpenLike, setIsModalOpenLike] = useState(false)
  const showModalLike = () => {
    setIsModalOpenLike(true)
  }
  const handleOkLike = () => {
    setIsModalOpenLike(false)
  }
  const handleCancelLike = () => {
    setIsModalOpenLike(false)
  }

  const [followStatus, setFollowStatus] = useState(
    users.reduce((acc, user) => ({ ...acc, [user.id]: false }), {})
  )

  const toggleFollow = (userId) => {
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !prevStatus[userId],
    }))
  }

  return (
    <div className="responsive-width !mt-2 !mb-20">
      <div className=" bg-white flex justify-between items-start gap-10">
        {/* left side */}
        <div className="p-4 w-1/3 sticky top-10 ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 ">
              <Avatar
                size={64}
                src={`https://i.pravatar.cc/150?img=${Math.floor(
                  Math.random() * 70
                )}`}
              />
              <div className="mt-3">
                <h2 className="text-lg font-semibold">Micheal Scott</h2>
                <p className="text-gray-500 text-sm">@BestBossAliveDunder</p>
              </div>
            </div>
            <Link to={'/sampler/my-profile'} className="mb-5">
              <Button type="default">My Profile</Button>
            </Link>
          </div>

          <div className="flex justify-between text-center">
            <div>
              <div className="font-semibold ">142</div>
              <div className="text-gray-500 ">Reviews</div>
            </div>
            <div>
              <div className="font-semibold  ">12.4k</div>
              <div className="text-gray-500 ">Followers</div>
            </div>
            <div>
              <div className="font-semibold  ">12.4k</div>
              <div className="text-gray-500 ">Referrals</div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-2/3">
          {/* Feed Tabs */}
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="!mt-5">
            <TabPane
              tab=<div className="flex gap-2 ">
                <img src={followingInactiveLogo} alt="following" />
                <span>Following</span>
              </div>
              key="following"
            />
            <TabPane
              tab=<div className="flex gap-2 ">
                <img src={newLogo} alt="new" />
                <span>New</span>
              </div>
              key="new"
            />
            <TabPane
              tab=<div className="flex gap-2 ">
                <img src={popularInActiveLogo} alt="new" />
                <span>popular</span>
              </div>
              key="popular"
            />
          </Tabs>

          {/* Category Pills */}
          <div className="flex gap-2 py-4 overflow-x-auto mb-3 ">
            {['all', 'electronics', 'beauty', 'home', 'fashion', 'gaming'].map(
              (category) => (
                <Button
                  key={category}
                  type={activeCategory === category ? 'primary' : 'default'}
                  className="!rounded-full !py-5"
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              )
            )}
          </div>

          {/* Feed Posts */}

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className=" border border-gray-200 p-5">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar src={post.author.avatar} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.author.name}</span>
                        <span className="text-gray-500 text-sm">
                          {post.author.handle}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {post.timeAgo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Rate
                          disabled
                          defaultValue={post.rating}
                          className="!text-[16px] !text-[#FD8240]"
                        />
                        <span className="text-gray-500">{post.rating}</span>
                        <span className=" underline underline-offset-4 cursor-pointer">
                          {post.productName}
                        </span>
                        <span className="text-green-500">{post.price}</span>
                        <span className=" underline underline-offset-4 cursor-pointer">
                          /{post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type={
                        following[post.author.handle] ? 'default' : 'primary'
                      }
                      ghost
                      onClick={() => handleFollow(post.author.handle)}
                    >
                      {following[post.author.handle] ? 'Following' : 'Follow'}
                    </Button>
                    <Dropdown menu={{ items: moreOptions }} trigger={['click']}>
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  </div>
                </div>

                <p className="!my-5 text-gray-700 ">{post.content}</p>

                {post.hasVideo && (
                  <div
                    className="relative rounded-lg overflow-hidden bg-gray-100 mb-4"
                    style={{ paddingTop: '56.25%' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <video
                        src="https://cdn.pixabay.com/video/2022/04/02/112651-695204705_large.mp4"
                        controls
                      ></video>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4 text-gray-500">
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-gray-500"
                      onClick={() => handleLike(post.id)}
                    >
                      {post.liked ? (
                        <HeartFilled className="text-red-500" />
                      ) : (
                        <HeartOutlined />
                      )}
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1 text-gray-500">
                      <MessageOutlined />
                      {post.comments.length}
                    </button>
                    <button
                      className="flex items-center gap-1 text-gray-500"
                      onClick={() => handleShare(post)}
                    >
                      <ShareAltOutlined />
                      Share
                    </button>
                  </div>
                  <Button type="primary">Add to cart</Button>
                </div>

                <div
                  className="flex items-center space-x-2 mb-2 cursor-pointer"
                  onClick={showModalLike}
                >
                  {users.slice(0, 8).map((user, index) => (
                    <Tooltip key={index} title={user.name} placement="top">
                      <div className="relative">
                        <Avatar
                          src={user.src}
                          size={30}
                          className="border-2 border-white"
                        />
                        <HeartFilled className="absolute bottom-0 right-0 !text-red-500 bg-white rounded-full text-[7px] p-1" />
                      </div>
                    </Tooltip>
                  ))}
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 font-semibold">
                    +{users.length - 8}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="pl-8 space-y-2">
                      <div className="flex items-start gap-2">
                        <Avatar size="small" src={comment.author.avatar} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {comment.author.name}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {comment.author.handle}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {comment.timeAgo}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {comment.content}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <button
                              className="!text-xs !text-gray-500"
                              onClick={() =>
                                handleCommentLike(post.id, comment.id)
                              }
                            >
                              {comment.liked ? (
                                <HeartFilled className="!text-red-500 !text-sm" />
                              ) : (
                                <HeartOutlined />
                              )}
                              {comment.likes}
                            </button>
                            <button
                              className="!text-xs !text-gray-500 "
                              onClick={() => setReplyingTo(comment.id)}
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                        <Dropdown
                          menu={{ items: moreOptions }}
                          trigger={['click']}
                        >
                          <Button
                            type="text"
                            size="small"
                            icon={<EllipsisOutlined />}
                          />
                        </Dropdown>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="my-4 flex items-center gap-2">
                  <Avatar size="small" src="/api/placeholder/32/32" />
                  <Input
                    placeholder={
                      replyingTo ? 'Write a reply...' : 'Write a comment...'
                    }
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    suffix={
                      <div className="flex items-center gap-2">
                        {/* <EmojiPicker /> */}
                        {/* <SmileOutlined className="text-gray-400 cursor-pointer" /> */}
                        <SendOutlined
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleComment(post.id)}
                        />
                      </div>
                    }
                    onPressEnter={() => handleComment(post.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Modal */}
        <Modal
          title="Share Post"
          open={showShareModal}
          onCancel={() => setShowShareModal(false)}
          footer={null}
          centered
        >
          <div className="!space-y-4">
            <Button block icon={<ShareAltOutlined />}>
              Share to Feed
            </Button>
            <Button block>Copy Link</Button>
            <Button block>Share via Message</Button>
          </div>
        </Modal>

        {/* like modal */}

        <Modal
          title={`Liked (${users.length})`}
          open={isModalOpenLike}
          onOk={handleOkLike}
          onCancel={handleCancelLike}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          centered
        >
          <div className="flex flex-col space-y-4 text-gray-500 scroll-y-auto overflow-auto h-[50vh] ">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center space-x-4"
              >
                <div className="flex items-center !space-x-3">
                  <Avatar
                    src={user.src}
                    size={50}
                    className="border-2 border-white"
                  />
                  <div>
                    <div className="text-sm font-medium flex-grow">
                      {user.name}
                    </div>
                    <div className="flex gap-3 justify-center items-center">
                      <div className="text-sm font-medium flex-grow">
                        {user.username}
                      </div>
                      <div className="text-sm font-medium flex-grow">
                        {user.reviews} reviews
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type={followStatus[user.id] ? 'default' : 'primary'}
                  onClick={() => toggleFollow(user.id)}
                >
                  {followStatus[user.id] ? 'Following' : 'Follow'}
                </Button>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default SamplerFeed
