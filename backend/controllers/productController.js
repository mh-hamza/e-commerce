import Product from "../models/product.model.js";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      images,
      stock,
      rating,
      isBestSeller,
      isNewProduct,
    } = req.body;

    if (!name || !description || !price || !category || !image) {
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
      image,
      images,
      stock,
      rating,
      isBestSeller,
      isNewProduct,
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

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });


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
