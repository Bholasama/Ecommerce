import productModel from '../../../models/productModel';

export default async function handler(req, res) {
  const { productId } = req.query;

  try {
    // Find the current product by productId
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Extract the current product's category
    const currentProductCategory = product.category;

    // Define keywords to match in the title
    const keywords = ['shirt', 'jacket','sock','shoe','t-shirt','pant'];

    // Find related products with the same title containing the keywords
    const relatedProducts = await productModel.find({
      title: { $regex: new RegExp(keywords.join('|'), 'i') }, // Case-insensitive search
      _id: { $ne: productId }, // Exclude the current product
      category: currentProductCategory, // Match the current product's category
    });

    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({ error: 'Failed to fetch related products' });
  }
}
