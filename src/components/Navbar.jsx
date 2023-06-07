import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setSessionID }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Implement your logout logic here
    // Clear user session, update login status, etc.

    setSessionID(""); // Reset or remove the session ID
    navigate("/"); // Navigate to the login page
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
