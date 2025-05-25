import React, { useState } from 'react'

const OrderTable = ({orders,dashboard}) => {
 const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
    let paginatedOrders;
  if (dashboard) {
  paginatedOrders = orders?.slice(-5); // Last 5 orders
} else {
  paginatedOrders = orders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
}

  const totalPages = Math.ceil(orders?.length / itemsPerPage);
  return (
     <div className="neumorphic-light p-4 rounded-xl overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="pb-2 px-4 text-left">#</th>
                <th className="pb-2 px-4 text-left">Name</th>
                <th className="pb-2 px-4 text-left">Email</th>
                <th className="pb-2 px-4 text-left">Products</th>
                <th className="pb-2 px-4 text-left">Amount</th>
                <th className="pb-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders?.map((order, i) => (
                <tr key={order._id} className="border-t border-gray-300">
                  <td className="py-4 px-4">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td className="py-4 px-4">{order.user.name}</td>
                  <td className="py-4 px-4">{order.user.email}</td>
                  <td className="py-4 px-4">{order.products?.length || 'NA'}</td>
                  <td className="py-4 px-4">{order.amount}</td>
                  <td className="py-4 px-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {!dashboard && totalPages > 1 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === idx + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white shadow'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
  )
}

export default OrderTable