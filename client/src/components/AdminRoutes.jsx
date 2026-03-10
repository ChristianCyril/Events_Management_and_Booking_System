import { Navigate,Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AdminRoutes(){
  const {auth} = useAuth();
  if(!auth?.accessToken || auth?.role !== 'admin'){
    return <Navigate to='/home' replace/>
  }
  return <Outlet/>
}
export default AdminRoutes;