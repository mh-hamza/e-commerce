import React, { useState, useEffect } from 'react';
import { Upload, Plus, X, Tag, DollarSign, Box, Star, CheckCircle } from 'lucide-react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductForm = ({ initialData, onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchProducts } = useProducts();
  const productToEdit = location.state?.product || initialData;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setDescription(productToEdit.description || '');
      setPrice(productToEdit.price || 0);
      setCategory(productToEdit.category || '');
      setImagePreview(productToEdit.image || '');

      const existingGallery = productToEdit.images?.length
        ? productToEdit.images.map(url => ({ file: null, preview: url }))
        : [];
      setImages(existingGallery);

      setStock(productToEdit.stock || 0);
      setRating(productToEdit.rating || 0);
      setIsBestSeller(productToEdit.isBestSeller || false);
      setIsNew(productToEdit.isNew || false);
    }
  }, [productToEdit]);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = { file, preview: URL.createObjectURL(file) };
      setImages(updatedImages);
    }
  };

  const addImageField = () => {
    setImages((prev) => [...prev, { file: null, preview: '' }]);
  };

  const removeImageField = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', Number(price));
      formData.append('category', category);
      formData.append('stock', Number(stock));
      formData.append('rating', Number(rating));
      formData.append('isBestSeller', isBestSeller);
      formData.append('isNewProduct', isNew);

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imagePreview) {
        formData.append('image', imagePreview);
      }

      images.forEach((img) => {
        if (img.file) {
          formData.append('images', img.file);
        } else if (img.preview && img.preview.trim() !== '') {
          formData.append('images', img.preview);
        }
      });

      if (productToEdit) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/product/update/${productToEdit._id || productToEdit.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        alert("Product updated successfully!");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/product/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        alert("Product created successfully!");
        console.log(response.data);
      }

      await fetchProducts();
      navigate('/admin/products');

    } catch (err) {
      console.error("Error saving product:", err);

      alert(
        err.response?.data?.message ||
        " Failed to save product"
      );

      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="p-8 bg-white/50 backdrop-blur-xl rounded-2xl border border-gray-100 w-full max-w-5xl mx-auto space-y-8 text-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-5 gap-4">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              {productToEdit ? 'Edit Product' : 'Create New Product'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the product details below</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 hover:bg-gray-800 disabled:opacity-75 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <>
                <CheckCircle size={18} />
                Save Product
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Tag size={16} className="text-gray-400" />
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Velvet Cloud Sofa"
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:outline-none transition-all placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Experience the ultimate comfort..."
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:outline-none transition-all placeholder:text-gray-400 resize-none"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign size={16} className="text-gray-400" />
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:outline-none transition-all"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Chair">Chair</option>
                  <option value="Sofa">Sofa</option>
                  <option value="Table">Table</option>
                  <option value="Bed">Bed</option>
                  <option value="Wardrobe">Wardrobe</option>
                  <option value="Officefurniture">Officefurniture</option>
                  <option value="Kidsfurniture">Kidsfurniture</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Box size={16} className="text-gray-400" />
                  Stock Level
                </label>
                <input
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Star size={16} className="text-gray-400" />
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-8 pt-4 pb-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="w-5 h-5 border-2 border-gray-300 rounded text-gray-900 focus:ring-gray-900/20 focus:ring-offset-0 transition-colors cursor-pointer group-hover:border-gray-400"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Best Seller</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="w-5 h-5 border-2 border-gray-300 rounded text-gray-900 focus:ring-gray-900/20 focus:ring-offset-0 transition-colors cursor-pointer group-hover:border-gray-400"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">New Arrival</span>
              </label>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Upload size={16} className="text-gray-400" />
                Main Display Image
              </label>
              <div className="group relative h-56 w-full rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Main" className="object-cover h-full w-full" onError={(e) => e.target.style.display = 'none'} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-white text-sm font-medium px-4 py-2 border border-white/40 rounded-lg">Upload new image below</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
                      <Upload className="text-gray-400" size={20} />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Select an image file</p>
                    <p className="text-xs text-gray-400 mt-1">High quality image recommended</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleMainImageChange}
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:outline-none transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                required={!imagePreview}
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Gallery Images</label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-xs text-gray-600 hover:text-gray-900 bg-gray-100/80 hover:bg-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Plus size={14} /> Add Another
                </button>
              </div>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                {images.map((img, idx) => (
                  <div key={idx} className="flex gap-2 items-center group/input">
                    <div className="w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 flex-shrink-0 overflow-hidden relative shadow-sm">
                      {img.preview ? (
                        <img src={img.preview} alt="" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Upload size={14} />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGalleryImageChange(idx, e)}
                      className="flex-1 px-4 py-2 border border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:outline-none transition-all text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 text-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageField(idx)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover/input:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/30">
                    <p className="text-sm text-gray-500">No additional images in gallery</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;