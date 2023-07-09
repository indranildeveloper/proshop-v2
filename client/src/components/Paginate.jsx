import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { LinkContainer } from "react-router-bootstrap";
import Pagination from "react-bootstrap/Pagination";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={uuidv4()}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${p + 1}`
                  : `/page/${p + 1}`
                : `/admin/products-list/page/${p + 1}`
            }
          >
            <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

Paginate.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
  isAdmin: PropTypes.bool,
  keyword: PropTypes.string,
};

export default Paginate;
