import { useState, useEffect } from 'react';
import {
  ChevronDown,
  Box,
  Users,
  ClipboardList,
  Menu as MenuIcon,
  X as CloseIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className="md:hidden p-4 bg-[#e0e5ec] text-gray-900 shadow-md fixed top-0 left-0 right-0 z-50 flex justify-start">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
          {sidebarOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-[#e0e5ec] p-4 shadow-neumorphic text-gray-800 transform transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          overflow-y-auto pt-16 md:pt-4`}
      >
         <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                  <Link to="/">ZYBERRA</Link>
          </h1>

        <Link
          to="/admin/dashboard"
          className="mb-4 neumorphic-icon px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Users size={18} />
          DashBoard
        </Link>


        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer neumorphic-light px-4 py-2 rounded-md mb-1"
            onClick={() => toggleMenu('product')}
          >
            <span className="flex items-center gap-2">
              <Box size={18} />
              Products
            </span>
            <ChevronDown
              size={18}
              className={`${openMenu === 'product' ? 'rotate-180' : ''} transition-transform`}
            />
          </div>
          {openMenu === 'product' && (
            <div className="ml-6 flex flex-col gap-2">
              <Link to="/admin/add-product" className="neumorphic-icon px-4 py-2 rounded-md">
                Add Product
              </Link>
              <Link to="/admin/product-list" className="neumorphic-icon px-4 py-2 rounded-md">
                Product List
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/admin/all-categories"
          className="mb-4 neumorphic-icon px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Users size={18} />
          All Categories
        </Link>

        <Link
          to="/admin/all-users"
          className="mb-4 neumorphic-icon px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Users size={18} />
          All Users
        </Link>

        <Link
          to="/admin/all-orders"
          className="mb-4 neumorphic-icon px-4 py-2 rounded-md flex items-center gap-2"
        >
          <ClipboardList size={18} />
          All Orders
        </Link>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
