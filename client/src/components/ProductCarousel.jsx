import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import Loading from "./Loading";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <Carousel pause="hover" className="bg-dark shadow mb-4 rounded">
      {products.map((product) => (
        <Carousel.Item key={uuidv4()} className="p-4">
          <Link to={`/product/${product._id}`}>
            <Stack direction="horizontal" className="justify-content-center">
              <Image src={product.image} alt={product.name} fluid rounded />
            </Stack>
            <Carousel.Caption className="bg-dark bg-opacity-50">
              <h2 className="text-white">
                {product.name} - ${product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
