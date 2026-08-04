import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/ui/SideBar";
import { Filter, Package, PackageMinus, Plus, Search, SquareKanban, Star, Tag, TrendingUp } from "lucide-react";
import Box from "../components/ui/Box";
import { BiCategory } from "react-icons/bi";
import Card from "../components/ui/Card";
import SideBar from "../components/ui/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { callProduct } from "../redux/callApi";
import QuickUpdate from "../components/ui/QuickUpdate";
import { useNavigate } from "react-router-dom";

function Products() {
  const Navigate = useNavigate()
  // prepare product and Category to show
  const [category, setCategory] = useState([])
  const [products, setProduct] = useState([])
  const dispatch = useDispatch();
  const selectProducts = useSelector((state) => state.products);

  useEffect(() => {
    if (selectProducts.loading) {
      dispatch(callProduct());
    };
    setProduct(selectProducts?.products?.products)
  }, [dispatch, selectProducts]);

  useEffect(() => {
    if (selectProducts.products.products) {
      (selectProducts.products.products).map((item) => {
        setCategory(prev => {
          return prev.includes(item.category) ? prev : [...prev, item.category]
        })
      })
    }
  }, [selectProducts.products.products])
  // status product
  const [productStatus,] = useState([
    {
      text: 'Total',
      icon: <SquareKanban size={20} />,
      total: '9'
    }, {
      text: 'Featured',
      icon: <Star size={20} />,
      total: '20'
    }, {
      text: 'In Stock',
      icon: <TrendingUp size={20} />,
      total: '20'
    }
    , {
      text: 'Out of Stock',
      icon: <PackageMinus size={20} />,
      total: '20'
    }
  ])

  // toggle box filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search
  const nameRef = useRef();
  const categoryRef = useRef();
  const subcategoryRef = useRef();

  const SearchHandle = () => {
    if (nameRef.current.value.trim() || categoryRef.current.value.trim() || subcategoryRef.current.value.trim()) {
      let result = selectProducts.products.products;

      if (nameRef.current.value) {
        result = result.filter(item =>
          item.name.toLowerCase().includes(nameRef.current.value.toLowerCase())
        );
      }

      if (categoryRef.current.value && categoryRef.current.value !== "all") {
        result = result.filter(item =>
          item.category === categoryRef.current.value
        );
      }

      if (subcategoryRef.current.value) {
        result = result.filter(item =>
          item.subcategory.toLowerCase().includes(subcategoryRef.current.value.toLowerCase())
        );
      }

      setProduct(result);
    }
  };

  // Quick Update
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const [productId, setID] = useState(null);
  return (
    <div className="flex">
      <div className="mt-10 flex-1">
        <div className="relative overflow-hidden rounded-xl border border-cyan-200 dark:border-cyan-900 bg-gradient-to-r from-white to-cyan-200/20 dark:from-gray-900 dark:to-cyan-950/30 p-8 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-8">
          <div className="flex items-center gap-5">
            <div className="border border-cyan-500/20 dark:border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-500/20 p-2 rounded-lg">
              <SquareKanban size={30} className="text-cyan-500" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[2px] text-cyan-800 dark:text-cyan-300 pl-0.5">
                Product Dashboard
              </p>

              <h1 className="font-bold text-xl sm:text-3xl text-cyan-950 dark:text-white">
                Products
              </h1>
            </div>
          </div>

          <button
            onClick={() => Navigate("/addProduct")}
            className="bg-cyan-500/90 hover:bg-cyan-500/70 transition-colors duration-150 font-medium cursor-pointer text-white flex items-center justify-center gap-2.5 py-2.5 px-4 text-sm rounded-md max-sm:w-full"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        <div className="mt-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {productStatus.map((item, index) => (
              <div key={index}>
                <Box text={item.text} icon={item.icon} result={item.total} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 mt-5 rounded-xl p-8">
          <div className="flex max-md:flex-col gap-3 md:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />

              <input
                type="text"
                name="search"
                aria-label="search"
                ref={nameRef}
                autoComplete="off"
                placeholder="Search product..."
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-cyan-500/70"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex-1 bg-cyan-500/90 hover:bg-cyan-500/70 transition-colors duration-150 font-medium cursor-pointer text-white flex items-center justify-start gap-2 py-2.5 px-4 text-sm rounded-md"
              >
                <Filter size={17} />
                Filter
              </button>

              <button
                onClick={SearchHandle}
                className="flex-1 bg-cyan-500/90 hover:bg-cyan-500/70 transition-colors duration-150 font-medium cursor-pointer text-white flex items-center justify-start gap-2 py-2.5 px-4 text-sm rounded-md"
              >
                <Search size={17} />
                Search
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterOpen
              ? "max-h-96 opacity-100 mt-5"
              : "max-h-0 opacity-0"
              }`}
          >
            <div className="flex max-md:flex-col items-center gap-3">
              <div className="flex-1 w-full">
                <label
                  htmlFor="category"
                  className="flex gap-2 mb-2 items-center text-gray-500 dark:text-gray-300 text-sm"
                >
                  <BiCategory size={17} />
                  Category
                </label>

                <select
                  ref={categoryRef}
                  name="category"
                  id="category"
                  className="w-full cursor-pointer text-sm py-2.5 px-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none rounded-md focus:border-cyan-500/70"
                >
                  <option value="all">All Category</option>

                  {category?.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 w-full">
                <label
                  htmlFor="subCategory"
                  className="flex gap-2 mb-2 items-center text-gray-500 dark:text-gray-300 text-sm"
                >
                  <Tag size={17} />
                  Sub category
                </label>

                <input
                  type="text"
                  name="subCategory"
                  ref={subcategoryRef}
                  placeholder="e.g smartphone . laptop"
                  id="subCategory"
                  className="w-full text-sm py-2.5 px-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none rounded-md focus:border-cyan-500/70"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {selectProducts.loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-transparent animate-spin"></div>
                  <div className="absolute inset-3 rounded-full bg-cyan-500"></div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Loading...
                </h2>

                <p className="text-gray-500">
                  Please wait while we fetch the data.
                </p>
              </div>
            ) : products?.length > 0 ? (
              products.map((product) => (
                <div key={product._id}>
                  <Card
                    product={product}
                    onDelete={(id) => setProduct(prev => prev.filter(item => item._id !== id))}
                    onQuickUpdate={() => {
                      setID(product._id);
                      setIsOpen(true);
                    }}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={`QuickUpdate`}>
        {
          isOpen && (
            <QuickUpdate
              id={productId}
              onClose={() => setIsOpen(false)}
            />
          )
        }
      </div>
    </div>
  );
}

export default Products