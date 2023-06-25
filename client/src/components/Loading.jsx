import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

const Loading = () => {
  return (
    <Stack
      direction="horizontal"
      className="justify-content-center align-items-center"
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
        }}
      />
    </Stack>
  );
};

export default Loading;
