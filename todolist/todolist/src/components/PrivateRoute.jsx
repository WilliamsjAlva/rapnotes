import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ currentUser, allowedRoles }) {
  const hasAccess =
    currentUser &&
    (!allowedRoles || allowedRoles.includes(currentUser.role));

  return hasAccess ? <Outlet /> : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

PrivateRoute.defaultProps = {
  allowedRoles: null,
};

export default PrivateRoute;
