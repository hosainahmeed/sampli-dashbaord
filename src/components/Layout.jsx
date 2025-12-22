import React from "react";

import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default Layout;