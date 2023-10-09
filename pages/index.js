import { getData } from '../utils/fetchData';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import Head from 'next/head';
import ProductItem from '../components/product/ProductItem';
import filterSearch from '../utils/filterSearch';
import { useRouter } from 'next/router';
import Filter from '../components/Filter';

const Home = (props) => {
  const [products, setProducts] = useState(props.productProps);
  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { state } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    const fetchProducts = async () => {
      const Page = router.query.page || 1;
      const category = router.query.category || 'all';
      const sort = router.query.sort || '';
      const search = router.query.search || 'all';

      const res = await getData(
        `product?limit=${Page * 6}&category=${category}&sort=${sort}&title=${search}`
      );
      setProducts(res.products);
    };

    fetchProducts();
  }, [router.query]);

  const handleCheck = (id) => {
    const newProducts = products.map(product => {
      if (product._id === id) {
        return { ...product, checked: !product.checked }; // Toggle checked state
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleCheckAll = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }
  const handleDeleteAll = () => {
    let deleteArr = [];
    product.forEach(product => {
      if(product.checked){
        deleteArr.push({
          data: '',
          id: product._id,
          title: 'Delete all selected product?',
          type: 'DELETE_PRODUCT'
        })
      
      }
    })
    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }
  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }
  
  return(
    <div className="home-page">
      <Head>
        <title>Home Page</title>
      </Head>
      <Filter state={state}/>
      
      <div className="products">
        {
          products.length === 0
          ? <h2>No Products</h2>
          : products.map(product => (
            <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
          ))
        }
      </div>
      {/* ... More rendering logic ... */}
    </div>
  );
}

export async function getServerSideProps({query}) {
  const Page = query.page || 1;
  const category = query.category || 'all';
  const sort = query.sort || '';
  const search = query.search || 'all';

  const res = await getData(
    `product?limit=${Page * 6}&category=${category}&sort=${sort}&title=${search}`
  );
  
  return {
    props: {  
      productProps: res.products,
      result: res.result
    },
  };
}

export default Home;