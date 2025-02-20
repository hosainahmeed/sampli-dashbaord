import React from 'react'
import {
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare2,
  FiVolume2,
} from 'react-icons/fi'
import { CiHeart, CiMaximize1, CiSettings } from 'react-icons/ci'
import { RiPauseCircleLine } from 'react-icons/ri'

const ReviewsVideo = () => {
  return (
    <div className=" mx-auto bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Uploaded reviews</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Upload New review
        </button>
      </div>

      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${Math.random()}/400/300`}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Micheal Scott</span>
                <span className="text-gray-500 text-sm">@Mike67</span>
                <span className="text-gray-400 text-sm">• 23mins ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  <span>★</span>
                  <span>★</span>
                  <span className="text-gray-300">★★★</span>
                </div>
                <span className="text-gray-600 text-sm">5.0</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm font-medium">
                  Natural Glow Serum
                </span>
                <span className="text-green-500 text-sm">$25.00</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">Electronics</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400">
            <FiMoreHorizontal size={16} />
          </button>
        </div>

        <p className="my-3 text-gray-700">
          I&apos;ve been using this serum for a month and the results are
          amazing! My skin looks more radiant and the texture has improved
          significantly. Totally worth the price!
        </p>

        <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-3">
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <img
              src={`https://picsum.photos/seed/${Math.random()}/400/300`}
              alt="Product review video thumbnail showing AirPods Pro"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent h-12">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <button>
                    <RiPauseCircleLine
                      size={25}
                      className="text-gray-300 bg-black p-1 rounded-full"
                    />
                  </button>
                  <div className="w-32 h-1 bg-gray-300 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-white text-xs">1:23 / 4:78</div>
                <div className="flex items-center gap-3">
                  <button className="text-white">
                    <FiVolume2
                      size={25}
                      className="text-gray-300 bg-black p-1 rounded-full"
                    />
                  </button>
                  <button className="text-white">
                    <CiSettings
                      size={25}
                      className="text-gray-300 bg-black p-1 rounded-full"
                    />
                  </button>
                  <button className="text-white">
                    <CiMaximize1
                      size={25}
                      className="text-gray-300 bg-black p-1 rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button className="flex items-center gap-1 text-gray-500">
            <CiHeart size={16} />
            <span>23</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500">
            <FiMessageCircle size={16} />
            <span>8 comments</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500">
            <FiShare2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-medium mb-1">Review insights</h3>
        <p className="text-xs text-gray-500 mb-4">Only you can see this</p>

        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">504</span>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-1" style={{ filter: 'grayscale(100%)' }}>
                👁️
              </span>
              <span>Total Views</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">23</span>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-1">🛒</span>
              <span>Referral sales</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">$30.00</span>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-1" style={{ filter: 'grayscale(100%)' }}>
                💰
              </span>
              <span>Sales Commissions</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">$5</span>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-1 " style={{ filter: 'grayscale(100%)' }}>
                🎁
              </span>
              <span>Rewards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewsVideo
