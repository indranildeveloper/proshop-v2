import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "primary",
};

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
};

export default Message;
