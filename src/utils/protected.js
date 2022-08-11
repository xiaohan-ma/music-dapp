import { Navigate } from "react-router-dom";
const Protected = ({ children, redirectTo, walletAddress, status }) => {
  if (!status) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default Protected;
