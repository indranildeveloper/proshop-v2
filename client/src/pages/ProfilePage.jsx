import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaTimes } from "react-icons/fa";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useProfileMutation();
  const {
    data: orders,
    isLoading: orderLoading,
    error: orderError,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const response = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(response));
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  if (orderLoading) {
    return <Loading />;
  }

  if (orderError) {
    return (
      <Message variant="danger">
        {orderError?.data?.message || orderError?.error}
      </Message>
    );
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-2 btn-block w-100"
          >
            Update
          </Button>
          {updateProfileLoading && <Loading />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={uuidv4()} className="text-center">
                <td className="align-middle">{order._id}</td>
                <td className="align-middle">
                  {dayjs(order.createdAt).format("DD/MM/YY HH:mm")}
                </td>
                <td className="align-middle">${order.totalPrice}</td>
                <td className="align-middle">
                  {order.isPaid ? (
                    dayjs(order.paidAt).format("DD/MM/YY HH:mm")
                  ) : (
                    <FaTimes className="text-danger" />
                  )}
                </td>
                <td className="align-middle">
                  {order.isDelivered ? (
                    dayjs(order.deliveredAt).format("DD/MM/YY HH:mm")
                  ) : (
                    <FaTimes className="text-danger" />
                  )}
                </td>
                <td className="align-middle">
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button type="button" variant="primary">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProfilePage;
