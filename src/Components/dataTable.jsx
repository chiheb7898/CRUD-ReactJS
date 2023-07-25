// DataTable.jsx
import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct, addProduct, EditProduct, searchProducts } from '../Services/ProductAPIService';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import SearchBar from './SearchBar';
import './DataTable.css';

const DataTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const productsData = await getAllProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    };

    const toggleEditModal = (product) => {
        setEditedProduct(product);
        setIsEditModalOpen((prevIsEditModalOpen) => !prevIsEditModalOpen);
    };

    const handleAddProduct = async (newProduct) => {
        try {
            const addedProduct = await addProduct(newProduct);
            setProducts((prevProducts) => [...prevProducts, addedProduct]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (editedProduct) => {
        try {
            const response = await EditProduct(editedProduct.id, editedProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === editedProduct.id ? { ...product, ...response } : product
                )
            );
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleSearch = async (searchTerm) => {
        try {
            setSearchTerm(searchTerm);
            if (searchTerm.trim() !== '') {
                const matchedProducts = await searchProducts(searchTerm);
                setProducts(matchedProducts);
            }
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <AddProductModal show={isModalOpen} onHide={() => setIsModalOpen(false)} onAddProduct={handleAddProduct} />
                <EditProductModal
                    show={isEditModalOpen}
                    onHide={() => setIsEditModalOpen(false)}
                    onEditProduct={handleEditProduct}
                    product={editedProduct}
                />
                <div className="col-md-12">
                    <h3 className="title-5 m-b-35">Products DataTable</h3>
                    <div className="table-data__tool">
                        <div className="table-data__tool-left">
                        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
                        </div>
                        <div className="table-data__tool-right">
                            <button className="au-btn au-btn-icon au-btn--green au-btn--small" onClick={toggleModal}>
                                <i className="zmdi zmdi-plus" />
                                add item
                            </button>
                        </div>
                    </div>
                    <div className="table-responsive table-responsive-data2">
                        <table className="table table-data2">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr className="tr-shadow" key={product._id}>
                                        <td>
                                            <img
                                                src={`${process.env.REACT_APP_UPLOAD_API_URL}/${product.image}`}
                                                alt="Product thumbnail"
                                                style={{ width: '70%', height: 'auto', borderRadius: '5px' }}
                                            />
                                        </td>
                                        <td>
                                            <span className="block-email">{product._id}</span>
                                        </td>
                                        <td className="desc">{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <span className="status--process">{product.quantity}</span>
                                        </td>
                                        <td>${Number(product.price).toFixed(2)}</td>
                                        <td>
                                            <div className="table-data-feature">
                                                <button
                                                    className="item"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Edit"
                                                    onClick={() => toggleEditModal(product)}
                                                >
                                                    <i className="zmdi zmdi-edit" />
                                                </button>
                                                <button
                                                    className="item"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Delete"
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    <i className="zmdi zmdi-delete" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
