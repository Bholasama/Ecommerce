import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import Recommendations from '../../components/Recommendations';
import { useRouter } from "next/router";


const DetailProduct = (props) => {
    
  const router = useRouter();
  const id = router.query.id;
    const [product] = useState(props.product);
    const [tab, setTab] = useState(0);
    const [recommendedProducts, setRecommendedProducts] = useState([]); // State to store recommended products

    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;

    const isActive = (index) => {
        if (tab === index) return "active";
        return ""
    }

    useEffect(() => {
        // Fetch recommended products based on the current product's ID
        async function fetchRecommendedProducts() {
            try {
                // Use `product.id` instead of `productId` in the URL
                const response = await fetch(`/api/recommendations/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRecommendedProducts(data);
                }
            } catch (error) {
                console.error('Error fetching recommended products:', error);
            }
        }
    
        fetchRecommendedProducts();
    }, [id]);
    

    return (
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="col-md-6">
                <img
                    src={product.images[tab].url}
                    alt={product.images[tab].url}
                    className="d-block img-thumbnail rounded mt-4 w-100"
                    style={{ height: '350px' }}
                />

                <div className="row mx-0" style={{ cursor: 'pointer' }}>
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img.url}
                            alt={img.url}
                            className={`img-thumbnail rounded ${isActive(index)}`}
                            style={{ height: '80px', width: '20%' }}
                            onClick={() => setTab(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>
                <h5 className="text-danger">Rs.{product.price}</h5>

                <div className="row mx-0 d-flex justify-content-between">
                    {product.inStock > 0 ? (
                        <h6 className="text-danger">In Stock: {product.inStock}</h6>
                    ) : (
                        <h6 className="text-danger">Out Stock</h6>
                    )}

                    <h6 className="text-danger">Sold: {product.sold}</h6>
                </div>

                <div className="my-2">{product.description}</div>
                <div className="my-2">{product.content}</div>

                <button
                    type="button"
                    className="btn btn-warning d-block my-3 px-5"
                    onClick={() => dispatch(addToCart(product, cart))}
                >
                    Buy
                </button>
            </div>

            <div className="col-md-12 mt-4">
                <Recommendations recommendedProducts={recommendedProducts} />
            </div>
        </div>
    );
};

export async function getServerSideProps({ params: { id } }) {
    const res = await getData(`product/${id}`);
    return {
        props: { product: res.product },
    };
}

export default DetailProduct;
