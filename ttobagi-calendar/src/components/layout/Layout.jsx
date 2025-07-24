import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Layout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Layout; 