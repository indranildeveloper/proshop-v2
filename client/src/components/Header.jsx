import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Stack from "react-bootstrap/Stack";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>PROSHOP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="align-items-center"
                  >
                    <FaShoppingCart /> Cart
                    {cartItems.length > 0 && (
                      <Badge bg="light" as="span">
                        {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                      </Badge>
                    )}
                  </Stack>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Log In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
