import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function StoreFooter() {
  return (
    <div className="border-t-[1px] border-[#eee]">
      <div className="mx-auto max-w-screen-xl pt-12 flex justify-between items-center">
        <ul className="flex justify-center gap-4">
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-of-use">Terms of Use</Link>
          </li>
          <li>
            <Link to="/affiliate-program">Affiliate program</Link>
          </li>
        </ul>
        <p>© {new Date().getFullYear()} Sampli. All Rights Reserved.</p>
      </div>
      <div className="flex items-center justify-center pb-12 text-[#BBC9C8] gap-2 text-2xl">
        <FaFacebook />
        <FaInstagram />
        <FaLinkedin />
        <FaTiktok />
        <FaTwitter />
      </div>
    </div>
  );
}

export default StoreFooter;
