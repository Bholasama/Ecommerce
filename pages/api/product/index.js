import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProduct(req, res)
            break;
    } 
}
//filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString }; // Clone the query object
        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(el => delete queryObj[el]);

        // Handle the 'all' and undefined cases for category and title.
        if (queryObj.category && queryObj.category !== 'all') {
            this.query = this.query.find({ category: queryObj.category });
        }
        if (queryObj.title && queryObj.title !== 'all') {
            this.query = this.query.find({ title: { $regex: queryObj.title, $options: 'i' } });
        }

        return this;
    }

   
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }

}

const getProducts = async (req, res) => {
    try {
        // Construct a new APIfeatures object with your query and request query parameters.
        const features = new APIfeatures(Products.find(), req.query)
            .filtering() // Apply filtering
            .sorting()   // Apply sorting
            .paginating(); // Apply pagination
        
        // Execute the query with the features applied and get the products.
        const products = await features.query;
        
        // Send the response with the status, result count, and products.
        res.json({
            status: 'success',
            result: products.length,
            products: products
        });
        
    } catch (err) {
        // Handle errors by sending a 500 status code and the error message.
        return res.status(500).json({err: err.message});
    }
};

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

        const { title, price, inStock, description, content, category, images} = req.body

        if( !title || !price || !inStock || !description || !content || images.length === 0)
        return res.status(400).json({err: 'Please add all the fields.'})


        const newProduct = new Products({
         title: title.toLowerCase(), price, inStock, description, content, category, images
        })

        await newProduct.save()

        res.json({msg: 'Success! Created a new product.'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}