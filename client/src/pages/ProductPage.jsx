import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { FaArrowLeft } from "react-icons/fa";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );

    navigate("/cart");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <>
      <LinkContainer to="/">
        <Button variant="secondary" className="mb-4">
          <Stack direction="horizontal" gap={2}>
            <FaArrowLeft /> Go Back
          </Stack>
        </Button>
      </LinkContainer>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row className="align-items-center">
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((opt) => (
                          <option key={opt + 1} value={opt + 1}>
                            {opt + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem>
                <Button
                  type="button"
                  className="w-100"
                  disabled={product.countInStock === 0}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
