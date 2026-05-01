import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const StarWarsCard = ({ item, type }) => {
  const { actions, store } = useGlobalReducer();
  const isFavorite = store.favorites.some(
    (favorite) => favorite.uid === item.uid && favorite.type === type
  );
  const imageUrl = `https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`;

  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <img
        src={imageUrl}
        alt={item.name}
        className="card-img-top"
        onError={(event) => {
          event.currentTarget.src = "https://via.placeholder.com/288x180?text=No+image";
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="d-flex justify-content-between">
          <Link to={`/detail/${type}/${item.uid}`} className="btn btn-primary btn-sm">
            Learn more
          </Link>
          <button
            className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-outline-warning"}`}
            onClick={() =>
              actions[isFavorite ? "removeFavorite" : "addFavorite"]({
                ...item,
                type,
              })
            }
          >
            {isFavorite ? "Remove" : "❤️"}
          </button>
        </div>
      </div>
    </div>
  );
};
