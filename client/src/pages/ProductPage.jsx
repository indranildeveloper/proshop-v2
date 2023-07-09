import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { toast } from "react-toastify";
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
import Meta from "../components/Meta";
import {
  useGetProductDetailsQuery,
  useCreateProductReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createProductReview, { isLoading: createProductReviewLoading }] =
    useCreateProductReviewMutation();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );

    navigate("/cart");
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();

    try {
      await createProductReview({
        productId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review Submitted!");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
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
      <Meta title={product.name} />
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

        <Col md={3} className="mt-4 mt-md-0">
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

      <Row className="mt-4">
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && (
            <Message variant="primary">This Product has no Reviews!</Message>
          )}

          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroupItem key={uuidv4()}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{dayjs(review.createdAt).format("DD/MM/YY HH:mm")}</p>
                <p>{review.comment}</p>
              </ListGroupItem>
            ))}
            <ListGroupItem>
              <h2>Write a Customer Review</h2>
              {createProductReviewLoading && <Loading />}
              {userInfo ? (
                <Form onSubmit={handleCreateReview}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="comment" className="my-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={createProductReviewLoading}
                    variant="primary"
                    className="my-2"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message variant="primary">
                  Please <Link to="/login">Log In</Link> to write a review!
                </Message>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
