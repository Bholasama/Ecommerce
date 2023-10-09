// Description: This function is used to filter the search results
// and sort them by category, price, and name. It also allows the user
// to load more products by clicking the load more button.
//
// This function is used in the pages\index.js file.
// This function is used in the pages\api\product\index.js file.
const filterSearch = ({router, page, category, sort, search}) => {
    const path = router.pathname;
    const query = router.query;

    if (category) query.category = category;
    if (page) query.page = page;
    if (search) query.search = search;
    if (sort) query.sort = sort;

    router.push({
        pathname: path,
        query: query
    })
}

export default filterSearch