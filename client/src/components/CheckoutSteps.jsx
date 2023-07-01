import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <NavItem>
        {step1 ? (
          <LinkContainer to="/login">
            <NavLink className="text-success">Log In</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Log In</NavLink>
        )}
      </NavItem>
      <NavItem>
        {step2 ? (
          <LinkContainer to="/shipping">
            <NavLink className="text-success">Shipping</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Shipping</NavLink>
        )}
      </NavItem>
      <NavItem>
        {step3 ? (
          <LinkContainer to="/payment">
            <NavLink className="text-success">Payment</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Payment</NavLink>
        )}
      </NavItem>
      <NavItem>
        {step4 ? (
          <LinkContainer to="/place-order">
            <NavLink className="text-success">Place Order</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Place Order</NavLink>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckoutSteps;
