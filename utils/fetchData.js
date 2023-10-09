const baseUrl = process.env.BASE_URL;


export const getRecommendations = async (productId) => {
  try {
    // Make a request to your recommendation API or service
    const response = await fetch(`/api/recommendations/${productId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    // Parse the JSON response
    const data = await response.json();

    return data; // Return the recommended products
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error; // You can handle the error as needed
  }
};
export const getData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};
export const postData = async (url, post, token) => {
  console.log(baseUrl);
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};
export const putData = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};
export const patchData = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};
export const deleteData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};
