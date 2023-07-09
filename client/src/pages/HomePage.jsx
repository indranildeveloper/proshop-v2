import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomePage = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

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
      {keyword ? (
        <>
          <LinkContainer to="/">
            <Button variant="secondary" className="mb-4">
              <Stack direction="horizontal" gap={2}>
                <FaArrowLeft /> Go Back
              </Stack>
            </Button>
          </LinkContainer>
          <h1>
            Search Results for <span className="text-primary"> {keyword}</span>
          </h1>
        </>
      ) : (
        <>
          <h1>Latest Products</h1>
          <ProductCarousel />
        </>
      )}

      <Row>
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={data.pages} page={data.page} keyword={keyword} />
    </>
  );
};

export default HomePage;
