import { LinkContainer } from "react-router-bootstrap";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrdersListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error?.error}</Message>
    );
  }

  return (
    <>
      <h2>Orders</h2>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={uuidv4()}>
              <td className="align-middle">{order._id}</td>
              <td className="align-middle">{order.user && order.user.name}</td>
              <td className="align-middle">
                {dayjs(order.createdAt).format("DD/MM/YY HH:mm")}
              </td>
              <td className="align-middle">{order.totalPrice}</td>
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
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button type="button" variant="primary">
                    <FaArrowRight />
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrdersListPage;
