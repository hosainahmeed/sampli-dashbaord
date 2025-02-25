import React from 'react'
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ProfileReviewsVideo from './ProfileReviewsVideo'

const MyProfileSampler = () => {
  return (
    <div className="responsive-width">
      <div className="mx-auto bg-white shadow-lg rounded-2xl p-6 text-gray-900">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 ">
            <div>
              <img
                src={`https://picsum.photos/seed/${Math.random()}/200`}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            </div>
            <div>
              <p className="text-xl font-semibold">Micheal Scott</p>
              <p className="text-gray-500">@Micheal46</p>
              <p className="text-sm text-gray-500">0 followers • 0 following</p>
            </div>
          </div>
          <Link
            to={'/sampler/settings/basic-details-settings-sampler'}
            className="bg-gray-200 hover:bg-gray-300 cursor-pointer   px-4 py-2 rounded-lg "
          >
            Edit Profile
          </Link>
        </div>
        <p className="mt-4 text-gray-700 text-sm">
          Michael Gary Scott is a fictional character in the NBC sitcom{' '}
          <span className="font-semibold">The Office</span>, portrayed by Steve
          Carell. Michael is the regional manager of the Scranton, Pennsylvania
          branch of Dunder Mifflin, a paper company, for the majority of the
          series.
        </p>
        <div className="flex items-center gap-2 text-2xl">
          <FaInstagram
            onClick={() => {}}
            className="hover:text-pink-500 cursor-pointer"
          />
          <FaTwitter
            onClick={() => {}}
            className="hover:text-blue-500 cursor-pointer"
          />
          <FaYoutube
            onClick={() => {}}
            className="hover:text-red-500 cursor-pointer"
          />
          <FaTiktok
            onClick={() => {}}
            className="hover:text-black cursor-pointer"
          />
        </div>
        <ProfileReviewsVideo />
      </div>
    </div>
  )
}

export default MyProfileSampler
