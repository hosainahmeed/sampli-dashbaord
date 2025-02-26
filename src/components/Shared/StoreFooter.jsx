import React from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function StoreFooter() {
  return (
    <div className="border-t-[1px] border-[#eee] text-gray-700 ">
      <div className="mx-auto px-10 pt-5 flex justify-between items-center">
        <ul className="flex justify-center gap-4">
          <li>
            <Link to="/privacy-policy" className='hover:text-black transition-all'>Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-and-conditions" className='hover:text-black transition-all'>Terms of Use</Link>
          </li>
          <li>
            <Link to="/affiliate-program" className='hover:text-black transition-all'>Affiliate program</Link>
          </li>
          <li>
            <Link to="/contact-us" className='hover:text-black transition-all'>Contact Us</Link>
          </li>
        </ul>

        <p>© {new Date().getFullYear()} Sampli. All Rights Reserved.</p>
      </div>

      <div className="flex items-center justify-center pb-5 text-[#BBC9C8] gap-7  text-2xl transition-all ">
        <FaFacebook className="hover:text-blue-600 cursor-pointer transition-all" />
        <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all" />
        <FaLinkedin className="hover:text-blue-700 cursor-pointer transition-all" />
        <FaTiktok className="hover:text-black cursor-pointer transition-all" />
        <FaTwitter className="hover:text-blue-400 cursor-pointer transition-all" />
      </div>
    </div>
  )
}

export default StoreFooter
