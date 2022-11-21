import React from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      { children }
    </div>
  );
}

export default Layout;
