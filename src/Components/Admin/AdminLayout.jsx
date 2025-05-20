import React from 'react';
import SideBar from './SideBar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 h-full md:w-64 bg-white shadow-md z-20">
        <SideBar />
      </aside>

      {/* Main Content: margin-left to avoid sidebar */}
      <main
  className={`
    flex-1 p-4 transition-all duration-300 ml-0
    md:ml-64
  `}
>
  {children}
</main>

    </div>
  );
};

export default AdminLayout;
