import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store } = useGlobalReducer();

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Star Wars DB
				</Link>
				<div className="d-flex gap-2">
					<Link to="/" className="btn btn-outline-light btn-sm">
						Home
					</Link>
					<Link to="/favorites" className="btn btn-outline-warning btn-sm">
						Favoritos {store.favorites.length > 0 ? `(${store.favorites.length})` : ""}
					</Link>
				</div>
			</div>
		</nav>
	);
};