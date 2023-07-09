import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const [searchKeyword, setSearchKeyword] = useState(keyword || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      navigate(`/search/${searchKeyword}`);
      setSearchKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex gap-2 me-2">
      <Form.Control
        type="text"
        name="q"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search Products"
      />
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
