import { ArrowBigLeft, Eye, Image, ImagePlus, SquareKanban, Trash2, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { callProduct } from "../../redux/callApi";
import { BiCloset } from "react-icons/bi";

const QuickUpdate = ({ id, onClose }) => {
    const [product, setProduct] = useState({
        name: "",
        brand: "",
        price: "",
        discount: "",
        discription: "",
        shortDiscription: "",
        category: "",
        subcategory: "",
        featured: 0,
        active: 0,
        sku: "",
        stoct: "",
    });

    const tagRef = useRef(null)
    const [tags, setTags] = useState([])
    const [image, setImage] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleTags = (e) => {
        if (e.tag.trim() !== '' && e.order !== '') {
            if (e.order === 'add') {
                setTags((prev) => {
                    const tag = e.tag.trim();
                    return prev.some(
                        (item) => item.toLowerCase() === tag.toLowerCase()
                    )
                        ? prev
                        : [...prev, tag];
                });
            } else {
                setTags((prev) => prev.filter((tag) => tag !== e.tag));
            }
            tagRef.current.value = ''
        }
    }

    const handleImage = (e) => {
        const files = Array.from(e.target.files);

        const selectedImages = files.map((file) => ({
            public_id: URL.createObjectURL(file),
            url: URL.createObjectURL(file),
        }));
        setImage((prev) => {
            return [...prev, ...selectedImages];
        });
    };

    const navigate = useNavigate();

    const selectProducts = useSelector((state) => state.products);
    const dispatch = useDispatch();


    useEffect(() => {
        if (selectProducts.loading) {
            dispatch(callProduct());
        }
    }, [dispatch, selectProducts]);

    const currentProduct = selectProducts.products.products?.find(
        (item) => item._id === id
    );

    useEffect(() => {
        if (currentProduct) {
            setTags(currentProduct.tags);
            setImage(currentProduct.images)
            setProduct({
                name: currentProduct.name,
                brand: currentProduct.brand,
                price: currentProduct.price,
                discount: currentProduct.discountPrice,
                discription: currentProduct.description,
                shortDiscription: currentProduct.shortDescription,
                category: currentProduct.category,
                subcategory: currentProduct.subcategory,
                featured: currentProduct.featured,
                active: currentProduct.isActive,
                stock: currentProduct.stock,
                sku: currentProduct.sku,
            })
        }
    }, [currentProduct, id]);

    const updateProduct = async (id) => {
        try {
            const data = { ...product, image, tags }
            const token = '';
            const req = await axios.patch(`https://e-commerce-api-3wara.vercel.app/products/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Product Updated Successfully");
            onClose()
        } catch (error) {
            toast.error("Failed to update product");
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center py-6 bg-black/40 backdrop-blur-sm">
            <div className="w-[95%] relative max-w-7xl max-h-[95vh] overflow-y-auto rounded-xl bg-white dark:bg-gray-900">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 shadow-sm transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 hover:text-red-500 active:scale-95 cursor-pointer"
                >
                    <X size={18} />
                </button>

                <div className="grid grid-col-1 lg:grid-cols-2 mt-20 gap-5 px-5">

                    <div className="bg-white dark:bg-gray-900 shadow border border-gray-200 dark:border-gray-700 p-4 md:p-8 rounded-xl">
                        <div className="flex items-start justify-start gap-5">
                            <Image size={35} className="text-cyan-500" />

                            <div>
                                <h2 className="font-semibold mb-1 text-xl text-gray-900 dark:text-white">
                                    Product Gallery
                                </h2>

                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Keep existing images, add new ones, or remove selected assets before
                                    saving.
                                </p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
                                {image.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                                    >
                                        <img
                                            src={item.url}
                                            alt={`preview-${index}`}
                                            className="w-full h-40 object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setImage((prev) => prev.filter((_, i) => i !== index))
                                            }
                                            className="cursor-pointer absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="flex h-35 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/30">
                                <ImagePlus size={40} className="text-gray-400 dark:text-gray-500" />

                                <p className="mt-3 font-medium text-gray-700 dark:text-white">
                                    Click to upload image
                                </p>

                                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                                    PNG, JPG, JPEG up to 5MB
                                </p>

                                <input
                                    onChange={handleImage}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    multiple
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-700 p-6">
                            <div className="space-y-5">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Product Name
                                    </label>

                                    <input
                                        onChange={handleChange}
                                        name="name"
                                        type="text"
                                        value={product.name ?? ""}
                                        placeholder="MacBook Pro 14-inch"
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Short Description
                                    </label>

                                    <input
                                        onChange={handleChange}
                                        name="shortDiscription"
                                        type="text"
                                        value={product.shortDiscription ?? ""}
                                        placeholder="Short description..."
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        onChange={handleChange}
                                        name="discription"
                                        value={product.discription ?? ""}
                                        rows={6}
                                        placeholder="Product description..."
                                        className="w-full resize-none rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-800"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Price
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            value={product.price ?? ""}
                                            name="price"
                                            type="number"
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:border-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Discount Price
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            value={product.discount ?? ""}
                                            name="discount"
                                            type="number"
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:border-cyan-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Stock
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            value={product.stock ?? ""}
                                            name="stock"
                                            type="number"
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:border-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            SKU
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            value={product.sku ?? ""}
                                            type="text"
                                            name="sku"
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none focus:border-cyan-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Category
                                        </label>

                                        <select
                                            name="category"
                                            value={product.category ?? ""}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:border-cyan-500"
                                        >
                                            <option>Electronics</option>
                                            <option>Fashion</option>
                                            <option>Sports</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Subcategory
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="subcategory"
                                            value={product.subcategory ?? ""}
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:bg-gray-800"
                                        />
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Brand
                                    </label>

                                    <input
                                        onChange={handleChange}
                                        name="brand"
                                        value={product.brand ?? ""}
                                        type="text"
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 dark:focus:bg-gray-800"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tags
                                    </label>

                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="Type a tag..."
                                            ref={tagRef}
                                            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:bg-gray-800"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleTags({ tag: tagRef.current.value, order: "add" })
                                            }
                                            className="rounded-xl bg-cyan-500 px-5 text-white hover:bg-cyan-400 cursor-pointer transition"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-2 py-1 text-sm flex items-center justify-between gap-2"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() =>
                                                        handleTags({ tag: tag, order: "remove" })
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <X size={15} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            onChange={handleChange}
                                            checked={product.featured ?? false}
                                            name="featured"
                                            type="checkbox"
                                            className="w-4 h-4 accent-cyan-600"
                                        />

                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                            Featured
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            onChange={handleChange}
                                            name="active"
                                            checked={product.active ?? false}
                                            type="checkbox"
                                            className="w-4 h-4 accent-cyan-600"
                                        />

                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                            Active
                                        </span>
                                    </label>
                                </div>


                                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="rounded-xl border border-red-300 dark:border-red-700 px-6 py-2 font-medium text-red-500 dark:text-red-400 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={() => updateProduct(id)}
                                        type="submit"
                                        className="rounded-xl bg-cyan-500 px-6 py-2 font-medium text-white hover:bg-cyan-400 transition cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default QuickUpdate