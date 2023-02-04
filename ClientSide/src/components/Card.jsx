import { Link } from "react-router-dom";

function Card(props) {
  return (
    <>
      <div className="product-card">
        <Link to={`/product/${props._id}`}>
          <img className="productImg" src={props.image} alt="Item" />
        </Link>
        <div className="product-details">
          <h4>
            <Link to={`/product/${props._id}`}>{props.name}</Link>
          </h4>
          <p>{props.description}</p>
          <div className="row">
            <div className="col">
              {" "}
              <span className="product-price line2">{props.price}₪</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
