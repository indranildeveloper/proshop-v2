import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { FaArrowLeft } from "react-icons/fa";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading: productLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: productUpdateLoading }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: uploadLoading }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const response = await updateProduct(updatedProduct);
    if (response.error) {
      toast.error(response?.error);
    } else {
      toast.success("Product Updated!");
      navigate("/admin/products-list");
    }
  };

  const handleUploadFile = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const response = await uploadProductImage(formData).unwrap();

      toast.success(response.message);

      setImage(response.image);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  if (productLoading || productUpdateLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error?.error}</Message>
    );
  }

  return (
    <>
      <LinkContainer to="/admin/products-list">
        <Button variant="secondary" className="mb-4">
          <Stack direction="horizontal" gap={2}>
            <FaArrowLeft /> Go Back
          </Stack>
        </Button>
      </LinkContainer>
      <FormContainer>
        <h1>Edit Product</h1>

        <Form onSubmit={handleUpdateProduct}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          {uploadLoading && <Loading />}
          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              className="mb-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control type="file" onChange={handleUploadFile} />
          </Form.Group>

          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Update Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
