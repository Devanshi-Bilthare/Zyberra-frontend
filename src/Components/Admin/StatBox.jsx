import React from 'react'
import { useNavigate } from 'react-router-dom';


const StatBox = ({link, title, count, color }) => {
    const navigate = useNavigate()
    return (
  <div onClick={() => navigate(`/admin/${link}`)} className={`p-6 rounded-lg shadow-md ${color} text-gray-800`}>
    <h2 className="text-lg font-medium">{title}</h2>
    <p className="text-3xl font-bold mt-2">{count}</p>
  </div>
)};
export default StatBox