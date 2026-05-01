import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Favorites = () => {
  const { store, actions } = useGlobalReducer();

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h1>Favoritos</h1>
            <p className="text-muted">Tus personajes, planetas y vehiculos guardados.</p>
          </div>
          <Link to="/" className="btn btn-secondary">
            ← Volver al listado
          </Link>
        </div>
      </div>
      <div className="row">
        {store.favorites.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No hay elementos guardados aún.</div>
          </div>
        ) : (
          store.favorites.map((item) => (
            <div className="col-md-4 mb-3" key={`${item.type}-${item.uid}`}>
              <div className="card">
                <img
                  src={`https://starwars-visualguide.com/assets/img/${item.type}/${item.uid}.jpg`}
                  alt={item.name}
                  className="card-img-top"
                  onError={(event) => {
                    event.currentTarget.src = "https://via.placeholder.com/288x180?text=No+image";
                  }}
                />
                <div className="card-body">
                  <h5>{item.name}</h5>
                  <p className="text-muted">{item.type}</p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/detail/${item.type}/${item.uid}`} className="btn btn-primary btn-sm">
                      Ver detalle
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => actions.removeFavorite({ uid: item.uid, type: item.type })}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
