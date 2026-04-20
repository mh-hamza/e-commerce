import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "ecommerce_products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      rating,
      isBestSeller,
      isNewProduct,
    } = req.body;

    let imageUrl = req.body.image || "";
    if (req.files && req.files['image']) {
      imageUrl = await uploadToCloudinary(req.files['image'][0].buffer);
    }

    let uploadedImagesUrls = [];
    if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        uploadedImagesUrls = [...req.body.images].filter(Boolean);
      } else {
        uploadedImagesUrls = [req.body.images];
      }
    }

    if (req.files && req.files['images']) {
      const uploadPromises = req.files['images'].map(file => uploadToCloudinary(file.buffer));
      const newImagesUrls = await Promise.all(uploadPromises);
      uploadedImagesUrls = [...uploadedImagesUrls, ...newImagesUrls];
    }

    if (!name || !description || !price || !category || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: imageUrl,
      images: uploadedImagesUrls,
      stock,
      rating,
      isBestSeller: isBestSeller === 'true' || isBestSeller === true,
      isNewProduct: isNewProduct === 'true' || isNewProduct === true,
    });

    res.status(201).json({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.files && req.files['image']) {
      updateData.image = await uploadToCloudinary(req.files['image'][0].buffer);
    }

    let uploadedImagesUrls = [];
    if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        uploadedImagesUrls = [...req.body.images].filter(Boolean);
      } else {
        uploadedImagesUrls = [req.body.images];
      }
    }

    if (req.files && req.files['images']) {
      const uploadPromises = req.files['images'].map(file => uploadToCloudinary(file.buffer));
      const newImagesUrls = await Promise.all(uploadPromises);
      uploadedImagesUrls = [...uploadedImagesUrls, ...newImagesUrls];
    }

    updateData.images = uploadedImagesUrls;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createProduct, getAllProducts, deleteProduct, updateProduct };
