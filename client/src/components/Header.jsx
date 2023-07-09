import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Stack from "react-bootstrap/Stack";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { destroyCredentials } from "../slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [login] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await login().unwrap();
      dispatch(destroyCredentials());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

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
              <SearchBox />
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <Stack className="px-2">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="rounded mb-2">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      className="rounded"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </Stack>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Log In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-menu">
                  <Stack className="px-2">
                    <LinkContainer to="/admin/products-list">
                      <NavDropdown.Item className="rounded mb-2">
                        Products
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users-list">
                      <NavDropdown.Item className="rounded mb-2">
                        User
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders-list">
                      <NavDropdown.Item className="rounded">
                        Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                  </Stack>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
