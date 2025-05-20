import { useState, useEffect } from 'react';
import {
  ChevronDown,
  Box,
  Users,
  ClipboardList,
  Tags,
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

  return (
    <div className='fixed'>
      {/* Mobile menu toggle button */}
      <div className="md:hidden p-4 bg-[#e0e5ec] shadow-md">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-[#e0e5ec] p-4 shadow-neumorphic text-gray-800 transform transition-transform duration-300 z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-6 hidden md:block"><Link to='/admin/dashboard'>Dashboard</Link></h1>

        {/* Products */}
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
              className={`transform transition-transform ${
                openMenu === 'product' ? 'rotate-180' : ''
              }`}
            />
          </div>
          {openMenu === 'product' && (
            <div className="ml-6 flex flex-col gap-2">
              <Link to='/admin/add-product' className="neumorphic-icon px-4 py-2 rounded-md cursor-pointer">Add Product</Link>
              <Link to='/admin/product-list' className="neumorphic-icon px-4 py-2 rounded-md cursor-pointer">Product List</Link>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer neumorphic-light px-4 py-2 rounded-md mb-1"
            onClick={() => toggleMenu('category')}
          >
            <span className="flex items-center gap-2">
              <Tags size={18} />
              Categories
            </span>
            <ChevronDown
              size={18}
              className={`transform transition-transform ${
                openMenu === 'category' ? 'rotate-180' : ''
              }`}
            />
          </div>
          {openMenu === 'category' && (
            <div className="ml-6 flex flex-col gap-2">
              <Link to='/admin/add-category' className="neumorphic-icon px-4 py-2 rounded-md cursor-pointer">Add Category</Link>
              <Link to='/admin/category-list' className="neumorphic-icon px-4 py-2 rounded-md cursor-pointer">Category List</Link>
            </div>
          )}
        </div>

        {/* All Users */}
        <Link to='/admin/all-users' className="mb-4 neumorphic-icon px-4 py-2 rounded-md cursor-pointer flex items-center gap-2">
          <Users size={18} />
          All Users
        </Link>

        {/* All Orders */}
        <Link to='/admin/all-orders' className="mb-4 neumorphic-icon px-4 py-2 rounded-md cursor-pointer flex items-center gap-2">
          <ClipboardList size={18} />
          All Orders
        </Link>
      </div>

      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
