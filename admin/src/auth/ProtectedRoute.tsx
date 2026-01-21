import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Props = {
  redirectTo?: string;
};

const ProtectedRoute = ({ redirectTo = "/login" }: Props) => {
  const { status } = useAuth();

  // App đang boot refresh -> chưa biết có login hay không
  if (status === "loading") {
    return (
      <div style={{ padding: 24 }}>
        <h5>Checking session...</h5>
      </div>
    );
  }


  if (status === "unauthenticated") {
    return <Navigate to={redirectTo} replace />;
  }


  //chỗ nhét nội dung của route con
  return <Outlet />;
};

export default ProtectedRoute;
