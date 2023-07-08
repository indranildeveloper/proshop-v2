import { LinkContainer } from "react-router-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";

const ProductsListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(productId);
        refetch();
        toast.success("Product Deleted!");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  const handleCreateProduct = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  if (isLoading || createProductLoading || deleteProductLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error?.error}</Message>
    );
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            className="m-2"
            onClick={handleCreateProduct}
          >
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={uuidv4()}>
              <td className="align-middle">{product._id}</td>
              <td className="align-middle">{product.name}</td>
              <td className="align-middle">{product.price}</td>
              <td className="align-middle">{product.category}</td>
              <td className="align-middle">{product.brand}</td>
              <td className="align-middle">
                <Stack direction="horizontal" gap={2}>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button type="button" variant="primary">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDeleteProduct(product._id)}
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

export default ProductsListPage;
