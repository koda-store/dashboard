import { ArrowBigLeft, Eye, Image, ImagePlus, SquareKanban, Trash2, X } from "lucide-react"
import SideBar from "../components/ui/SideBar"
import { useNavigate, useParams } from "react-router-dom"
import { callProduct } from "../redux/callApi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Edite = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    discountPrice: "",
    description: "",
    shortDescription: "",
    category: "",
    subcategory: "",
    featured: 0,
    isActive: 0,
    sku: "",
    stock: "",
  });

  const tagRef = useRef(null)
  const [tags, setTags] = useState([])
  const [images, setImage] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const allImage = [...images, ...oldImage]

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
      file,
      url: URL.createObjectURL(file),
    }));
    setImage((prev) => {
      return [...prev, ...selectedImages];
    });
  };

  const navigate = useNavigate();

  const { id } = useParams()
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
      setOldImage(currentProduct.images)
      setProduct({
        name: currentProduct.name,
        brand: currentProduct.brand,
        price: currentProduct.price,
        discountPrice: currentProduct.discountPrice,
        description: currentProduct.description,
        shortDescription: currentProduct.shortDescription,
        category: currentProduct.category,
        subcategory: currentProduct.subcategory,
        featured: currentProduct.featured,
        isActive: currentProduct.isActive,
        stock: currentProduct.stock,
        sku: currentProduct.sku,
      })
    }
  }, [currentProduct, id]);

  const updateProduct = async (id) => {
    // ============= check Inputs isEmpty?? ============
    const isValid = Object.values(product).every((value) => {
      if (typeof value === "string") return value.trim() !== "";
      return value !== null && value !== undefined;
    });

    if (!isValid) {
      return toast.error("All fields are required");
    }
    // ================================================
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // new Image
      images.forEach((img) => {
        formData.append("images", img.file);
      });

      // delete from old image
      formData.append("deletedImages", JSON.stringify(deletedImages));

      if (tags) {
        tags.forEach((tag) => {
          formData.append("tags", tag);
        });
      }
const token = localStorage.getItem("dashboard-token");
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzcxODA3NSwiZXhwIjoxNzg0MTUwMDc1fQ.UbrE_BGBdqspwbUWWpn1fkdmxphUS2ahcXo6af2z7oo'
      const req = await axios.patch(`https://e-commerce-api-3wara.vercel.app/products/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(callProduct())
      navigate('/products')
      return toast.success("Product Updated Successfully");
    } catch (error) {
      console.log(error.response.data)
      return toast.error("Failed to update product");
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex">
      <div className="min-h-screen mt-10 flex-1  ">
        <div className="rounded-xl bg-gray-950 p-4 md:p-8">
          <button
            onClick={() => navigate("/products")}
            className="flex cursor-pointer items-center gap-2 rounded bg-gray-200/10 px-3 py-2 text-sm text-gray-300 transition hover:text-white"
          >
            <ArrowBigLeft size={16} />
            Back
          </button>

          <h1 className="mt-5 flex items-start gap-2 text-lg font-bold text-white md:text-2xl">
            <SquareKanban size={22} className="mt-1 shrink-0" />
            Update and refine the product entry
          </h1>

          <div className="mt-3 flex items-start justify-start gap-10 max-lg:flex-col">
            <div>
              <p className="text-white/70">
                Review the current product product, add new images, remove existing
                ones, and save your updates safely.
              </p>
            </div>

            <div className="max-lg:w-full rounded-lg border border-white/15 bg-white/10 p-5 text-white">
              <h2 className="mb-2 text-cyan-300">Live</h2>
              <p className="text-sm text-white/70">
                Connected to the real product update API.
              </p>
            </div>
          </div>
        </div>


        <div className="grid grid-col-1 lg:grid-cols-2 mt-5 gap-5">
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
                {allImage.map((item, index) => (
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
                      onClick={(e) => {
                        // if new image
                        if (item.file) {
                          setImage(prev =>
                            prev.filter((_, i) => i !== index)
                          );
                        } else {
                          // old Image
                          setDeletedImages(prev => [...prev, item.public_id]);
                          setOldImage(prev =>
                            prev.filter(img => img.public_id !== item.public_id)
                          );
                        }
                      }}
                      className="cursor-pointer absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="flex h-35 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/30">
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
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none  focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Short Description
                  </label>

                  <input
                    onChange={handleChange}
                    name="shortDescription"
                    type="text"
                    value={product.shortDescription ?? ""}
                    placeholder="Short description..."
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>

                  <textarea
                    onChange={handleChange}
                    name="description"
                    value={product.description ?? ""}
                    rows={6}
                    placeholder="Product description..."
                    className="w-full resize-none rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-800"
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
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:bg-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Discount Price
                    </label>

                    <input
                      onChange={handleChange}
                      value={product.discountPrice ?? ""}
                      name="discountPrice"
                      type="number"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:bg-gray-800"
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
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:bg-gray-800"
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
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:bg-gray-800"
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
                      value={product.subcategory ?? ""}
                      onChange={handleChange}
                      type="text"
                      name="subcategory"
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
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:focus:bg-gray-800"
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
                        className="rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 px-2 py-1 text-sm flex items-center justify-between gap-2"
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
                      name="isActive"
                      checked={product.isActive ?? false}
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
                    className="rounded-xl border border-red-300 dark:border-red-700 px-6 py-2 font-medium text-red-500 dark:text-red-400 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => updateProduct(id)}
                    type="submit"
                    disabled={loading}
                    className={`rounded-xl px-6 py-2 font-medium text-white transition
                       ${loading
                        ? "bg-cyan-300 cursor-not-allowed"
                        : "bg-cyan-500 hover:bg-cyan-400 cursor-pointer"
                      }`}
                  >
                    {loading ? "Saving..." : "Save"}
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

export default Edite