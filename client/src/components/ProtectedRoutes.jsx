import { Navigate,Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoutes(){
  const {auth }= useAuth();
  if(!auth?.accessToken){
    return <Navigate to='/login' replace/>
  }
  return <Outlet/>
}
export default ProtectedRoutes;