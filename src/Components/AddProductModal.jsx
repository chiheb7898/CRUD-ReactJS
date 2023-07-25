import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function AddProductModal(props) {


    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [validated, setValidated] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            console.log("n3am");
            event.stopPropagation();
        }
        else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('description', description);
            formData.append('image', image);

            props.onAddProduct(formData);

            console.log()

            setName('');
            setPrice('');
            setQuantity('');
            setDescription('');
            setImage(null);
            setImagePreview(null);

            props.onHide();
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
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Product
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
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                        {imagePreview && (
                            <div>
                                <h6>Selected Image Preview:</h6>
                                <img
                                    src={imagePreview}
                                    alt="Selected Preview"
                                    style={{ width: '100%', height: 'auto' }} 
                                />
                            </div>
                        )}
                        </Form.Group>

                    </Row>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} required />
                    </Form.Group>
                    <div className="col-md-12 bg-light text-right">
                        <Button variant="success" type="submit">Add Product</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default AddProductModal;