import React from 'react';
import { ImageIcon, PackageSearch, Package2, IndianRupee, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../features/product/ProductSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  return (
    <div className="relative rounded-2xl p-4 shadow-neumorphic bg-[#e0e5ec] transition hover:shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]">
      <div className="absolute top-2 right-2 flex gap-2">
        <Link to={`/admin/product-detail/${product._id}`}
          className="p-1 rounded-full bg-blue-100 transition"
        >
          <Pencil size={18} className="" />
        </Link>
        <button
          onClick={() => dispatch(deleteProduct(product._id))}
          className="p-1 rounded-full bg-red-100 transition cursor-pointer"
        >
          <Trash2 size={18} className="" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        {product.images && product.images[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-44 h-36 object-cover rounded-xl"
          />
        ) : (
          <div className="w-44 h-36 flex items-center justify-center bg-gray-200 rounded-xl">
            <ImageIcon size={40} className="text-gray-500" />
          </div>
        )}

        <h3 className="font-semibold text-lg flex items-center gap-2">
          <PackageSearch size={18} /> {product.name}
        </h3>

         {product.category?.name && (
          <span className="text-sm font-medium text-gray-700">
            {product.category.name}
          </span>
        )}


        <div className="flex justify-between w-full text-sm text-gray-700 mt-2">
          <div className="flex items-center gap-1">
            <Package2 size={14} /> Qty: {product.quantity}
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee size={14} /> {product.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
