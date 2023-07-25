import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_NODE_API_URL;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


  export const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${productId}`);
    } catch (error) {
      throw new Error('Error deleting product:', error);
    }
  };

  export const addProduct = async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };


  export const EditProduct = async (productId, productData) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('quantity', productData.quantity);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('image', productData.image); // Add the image to the form data
  
      const response = await axios.put(`${API_BASE_URL}/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  export const searchProducts = async (searchTerm) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        params: {
          searchTerm: searchTerm,
        },
      });
      return response.data.data.products;
    } catch (error) {
      throw error;
    }
  };
