import React, { useEffect } from 'react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getStats } from '../../features/order/OrderSlice';
import StatBox from '../../Components/Admin/StatBox';
import AllOrders from './AllOrders';
import OrderTable from '../../Components/Admin/OrderTable';

const DashBoard = () => {
  const dispatch = useDispatch();

    const allorder = useSelector(state => state.order.order);

  const { stats, loading, error } = useSelector((state) => state.order); // adjust this path if needed

  useEffect(() => {
    dispatch(getStats());
    dispatch(getAllOrders())
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatBox link="all-users"  title="Total Users" count={stats?.totalUsers} color="bg-blue-100" />
            <StatBox link="all-orders" title="Total Orders" count={stats?.totalOrders} color="bg-green-100" />
            <StatBox link="product-list" title="Total Products" count={stats?.totalProducts} color="bg-yellow-100" />
            <StatBox link="dashboard" title="Total Sales" count={stats?.totalSales} color="bg-pink-100" />
          </div>
        )}
      </div>
        <h1 className="text-xl font-semibold my-4 ms-4 ">Recent Orders</h1>
      <OrderTable orders={allorder} dashboard={true}/>
    </AdminLayout>
  );
};



export default DashBoard;
