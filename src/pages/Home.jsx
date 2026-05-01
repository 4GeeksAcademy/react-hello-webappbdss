import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { StarWarsCard } from "../components/StarWarsCard";

export const Home = () => {
  const { store, actions } = useGlobalReducer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (store.people.length || store.planets.length || store.vehicles.length) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [peopleRes, planetsRes, vehiclesRes] = await Promise.all([
          fetch("https://www.swapi.tech/api/people"),
          fetch("https://www.swapi.tech/api/planets"),
          fetch("https://www.swapi.tech/api/vehicles"),
        ]);

        const [peopleData, planetsData, vehiclesData] = await Promise.all([
          peopleRes.json(),
          planetsRes.json(),
          vehiclesRes.json(),
        ]);

        actions.setPeople(peopleData.results || []);
        actions.setPlanets(planetsData.results || []);
        actions.setVehicles(vehiclesData.results || []);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema cargando los datos de Star Wars.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [actions, store.people.length, store.planets.length, store.vehicles.length]);

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-5">Star Wars Mini DB</h1>
          <p className="text-muted">Navega personas, planetas y vehículos. Guarda favoritos desde cualquier tarjeta.</p>
        </div>
      </div>

      {error && (
        <div className="row mb-3">
          <div className="col-12">
            <div className="alert alert-danger">{error}</div>
          </div>
        </div>
      )}

      {loading && (
        <div className="row mb-3">
          <div className="col-12 text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12 mb-3">
          <h2>People</h2>
        </div>
        {(store.people || []).map((item) => (
          <div className="col-md-4" key={`people-${item.uid}`}>
            <StarWarsCard item={item} type="people" />
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-12 mb-3">
          <h2>Planets</h2>
        </div>
        {(store.planets || []).map((item) => (
          <div className="col-md-4" key={`planets-${item.uid}`}>
            <StarWarsCard item={item} type="planets" />
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-12 mb-3">
          <h2>Vehicles</h2>
        </div>
        {(store.vehicles || []).map((item) => (
          <div className="col-md-4" key={`vehicles-${item.uid}`}>
            <StarWarsCard item={item} type="vehicles" />
          </div>
        ))}
      </div>
    </div>
  );
}; 