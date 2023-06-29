import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const handleRemoveFromCart = async (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="primary">
            Your cart is empty <Link to="/">Continue Shopping.</Link>
          </Message>
        ) : (
          <ListGroup variant="flush" className="mb-4">
            {cartItems.map((item) => (
              <ListGroupItem key={item._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    {/* TODO: Create separate component */}
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        handleAddToCart(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((opt) => (
                        <option key={opt + 1} value={opt + 1}>
                          {opt + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <h1 className="mb-4">Quantity and Price</h1>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Card.Title>
                Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </Card.Title>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block w-100"
                variant="primary"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed to checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
