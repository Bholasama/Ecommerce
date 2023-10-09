import React from 'react';
import Link from 'next/link';

function Recommendations({ recommendedProducts }) {
    return (
        <div className="recommended-products">
            <h2>Recommended Products</h2>
            <div className="product-list">
                {recommendedProducts.map((product) => (
                    <div key={product.id} className="recommended-product">
                      <Link href={'/product/'+product._id}>
                        
              
    <img  src={product.images[0].url} alt={product.images[0].url} width="200px"/>
                        <h3>{product.title}</h3>
                        <p>Price: Rs.{product.price}</p>
                        {/* Add more product details as needed */}
                      </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommendations;
