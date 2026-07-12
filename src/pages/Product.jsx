import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callProduct } from "../redux/callApi";
import { ArrowBigLeft, Eye, Star, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import ImageSlider from "../components/ui/ImageSlider";
import SideBar from "../components/ui/SideBar";

const Product = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate()

    const selectProducts = useSelector((state) => state.products);

    useEffect(() => {
        if (selectProducts.loading) {
            dispatch(callProduct());
        }
    }, [dispatch, selectProducts]);

    const currentProduct = selectProducts.products.products?.find(
        (item) => item._id === id
    );

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (currentProduct?.images?.length) {
            setSelectedImage(currentProduct.images[0].url);
        }
    }, [currentProduct]);

    return (
        <div className="flex">
            <div className="mt-10 flex-1">
                {/* Header */}
                <div className="rounded-xl bg-gray-950  p-4 md:p-8">
                    <button
                        onClick={() => navigate("/products")}
                        className="flex cursor-pointer items-center gap-2 rounded bg-gray-200/10 px-3 py-2 text-sm text-gray-300 transition hover:text-white"
                    >
                        <ArrowBigLeft size={16} />
                        Back
                    </button>

                    <h1 className="mt-5 flex items-center gap-2 text-xl font-bold text-white md:text-2xl">
                        <Eye size={22} />
                        {currentProduct?.name}
                    </h1>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Left Side */}
                    <div>
                        {/* Main Image */}
                        <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow">
                            <img
                                src={selectedImage}
                                alt={currentProduct?.name}
                                className="h-60 sm:h-70 md:h-75 lg:h-80 xl:h-100 w-full object-cover"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 md:gap-3">
                            {currentProduct?.images?.map((image, index) => (
                                <button
                                    key={image.url}
                                    onClick={() => setSelectedImage(image.url)}
                                    className={`overflow-hidden cursor-pointer rounded-lg border-2 transition ${selectedImage === image.url
                                            ? "border-cyan-500"
                                            : "border-white dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
                                        }`}
                                >
                                    <img
                                        src={image.url}
                                        alt={`${currentProduct?.name} ${index + 1}`}
                                        className="h-16 w-full object-cover sm:h-20"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Slider */}
                        <div className="mt-5 overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow">
                            <ImageSlider
                                images={currentProduct?.images}
                                name={currentProduct?.name}
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div>
                        {/* Product Info */}
                        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 shadow md:p-5">
                            <h2 className="mb-2 text-xl font-bold md:text-2xl text-gray-900 dark:text-white">
                                {currentProduct?.name}
                            </h2>

                            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 md:text-base">
                                {currentProduct?.description}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 shadow">
                                <h2 className="mb-1 text-xs uppercase text-gray-500 dark:text-gray-400">
                                    Price
                                </h2>

                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    ${currentProduct?.price}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 shadow">
                                <h2 className="mb-1 text-xs uppercase text-gray-500 dark:text-gray-400">
                                    Discount
                                </h2>

                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    ${currentProduct?.discountPrice}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 shadow">
                                <h2 className="mb-1 text-xs uppercase text-gray-500 dark:text-gray-400">
                                    Stock
                                </h2>

                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {currentProduct?.stock}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 shadow">
                                <h2 className="mb-1 text-xs uppercase text-gray-500 dark:text-gray-400">
                                    SKU
                                </h2>

                                <p className="break-all text-lg font-semibold text-gray-900 dark:text-white">
                                    {currentProduct?.sku}
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mt-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 shadow md:p-5">
                            <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                                <Tag size={16} />
                                Tags
                            </h2>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {currentProduct?.tags?.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs text-gray-600 dark:text-gray-300 shadow sm:text-sm"
                                    >
                                        #{tag}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div className="mt-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 shadow md:p-5">
                            <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                                <BiCategory size={18} />
                                Category Info
                            </h2>

                            <p className="mt-3 break-words text-sm leading-6 text-gray-600 dark:text-gray-400">
                                {currentProduct?.category} • {currentProduct?.brand} •{" "}
                                {currentProduct?.subcategory}
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="mt-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 shadow md:p-5">
                            <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                                <Star size={16} />
                                Highlights
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400 md:text-base">
                                {currentProduct?.shortDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;