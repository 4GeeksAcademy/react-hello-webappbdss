import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Detail = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://www.swapi.tech/api/${type}/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response.result?.properties || null);
      })
      .catch((err) => {
        setError("No se pudo cargar la información.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [type, id]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            ← Back to Star Wars DB
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <img
              src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`}
              alt={data?.name || "Star Wars"}
              className="card-img-top"
              onError={(event) => {
                event.currentTarget.src = "https://via.placeholder.com/640x480?text=No+image";
              }}
            />
          </div>
        </div>
        <div className="col-lg-8 col-md-6">
          <div className="card p-4">
            {loading && <p>Cargando detalle...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && data && (
              <>
                <h1>{data.name}</h1>
                <p className="lead text-muted">Tipo: {type}</p>
                <div className="row">
                  {Object.entries(data).map(([key, value]) => (
                    <div className="col-12 col-md-6 mb-2" key={key}>
                      <strong>{key.replace(/_/g, " ")}:</strong>
                      <p>{String(value)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
