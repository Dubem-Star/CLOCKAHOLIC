import greaterThan from "@/assets/images/img_icons/greater-than.png";
import { useParams, Link } from "react-router-dom";
function PageLocation(prop) {
  const { id } = useParams();

  return (
    <>
      <div
        className="w-100 go-back-btn"
        style={{
          margin: "125px auto 0 auto",
          paddingLeft: "clamp(70px, 11vw, 120px)",
          maxWidth: "1800px",
        }}
      >
        <p
          style={{
            color: "#72716e",
            fontWeight: "300",
          }}
        >
          <Link to="/" className=" text-reset text-decoration-none me-1">
            Home
          </Link>
          <img
            src={greaterThan}
            className="d-inline"
            style={{ width: "15px" }}
          />
          {prop.location === "cart" ? (
            <>
              <Link
                to={`/cart`}
                className=" text-black  text-decoration-none ms-1"
              >
                Cart
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/product/:${id}`}
                className=" text-black  text-decoration-none ms-1"
              >
                Product
              </Link>
            </>
          )}
        </p>
      </div>
    </>
  );
}

export default PageLocation;
