import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function EditProductModal({ show, onHide, onEditProduct, product }) {



    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [validated, setValidated] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (product) {
            setID(product._id || '');
            setName(product.name || '');
            setQuantity(product.quantity || '');
            setPrice(product.price || '');
            setDescription(product.description || '');
            setImagePreview(
                product.image ? `${process.env.REACT_APP_UPLOAD_API_URL}/${product.image}` : null
            );
        }
    }, [product]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            const editedProduct = {
                id: product._id,
                name,
                quantity,
                price,
                description,
                image: image,
            };

            onEditProduct(editedProduct);
            onHide();
        }
        setValidated(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal
            show={show} onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Product {id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter product name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                required
                                placeholder="Enter quantity..."
                                type='number'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Price</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                                <Form.Control
                                    required
                                    type='number'
                                    placeholder="Enter price..."
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                placeholder="Enter Description..."
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            {imagePreview && ( // Display the selected image preview if an image is selected
                                <div>
                                    <h6>Selected Image Preview:</h6>
                                    <img
                                        src={imagePreview}
                                        alt="Selected Preview"
                                        style={{ width: '200px', height: 'auto' }}
                                    />
                                </div>
                            )}

                        </Form.Group>

                    </Row>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                    <div className="col-md-12 bg-light text-right">
                        <Button variant="success" type="submit">Update Product</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default EditProductModal;