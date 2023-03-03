import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const onLougout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="font-[Montserrat] flex justify-between items-center border-b-2 border-[#ccc] p-3 shadow-md ">
      <div className="font-semibold">
        <Link to="/">Support Desk</Link>
      </div>
      <ul className="flex gap-4">
        {user ? (
          <button className="btn btn-primary " onClick={onLougout}>
            <FaSignOutAlt className="pr-2 inline text-2xl align-text-middle"/>
            Logout
          </button>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt className="pr-2 inline text-2xl align-text-middle" />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser className="pr-2 inline text-2xl align-text-middle" />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
