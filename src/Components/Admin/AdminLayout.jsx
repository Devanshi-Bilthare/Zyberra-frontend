import React from 'react';
import Sidebar from './SideBar'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main
        className="ml-0 flex-1 overflow-auto bg-gray-100 p-4 pt-16 md:pt-4 text-gray-900"
        style={{ height: '100vh' }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
