import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setSessionID }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    setSessionID(""); 
    navigate("/"); 
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
