import { LinkContainer } from "react-router-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";

const UsersListPage = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: userDeleteLoading }] =
    useDeleteUserMutation();

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(userId);
        refetch();
        toast.success("User successfully deleted!");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  if (isLoading || userDeleteLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error?.error}</Message>
    );
  }

  return (
    <>
      <h2>Users</h2>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={uuidv4()}>
              <td className="align-middle">{user._id}</td>
              <td className="align-middle">{user.name}</td>
              <td className="align-middle">
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td className="align-middle">
                {user.isAdmin ? (
                  <FaCheck className="text-success" />
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </td>
              <td className="align-middle">
                <Stack direction="horizontal" gap={2}>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button type="button" variant="primary">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UsersListPage;
