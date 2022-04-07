import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export const Navbar = () => {

  const { name } = useSelector(state => state.auth)
  const userName = name.charAt(0).toUpperCase() + name.slice(1)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{userName}</span>
      <button 
        className="btn btn-outline-danger"
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt" />
        <span> Salir</span>
      </button>
    </div>
  );
};
