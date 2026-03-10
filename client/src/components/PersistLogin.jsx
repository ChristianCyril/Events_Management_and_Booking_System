import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { api } from '../api/axios'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from './loadingSpinner/LoadingSpinner'

function PersistLogin() {
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(!auth?.accessToken)  //if auth is udefined or or access token does not exist, the negation sets the value to true, else false 

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await api.get('/refresh');
        setAuth(response.data);
      } catch (error) {
        console.log(error);   // Refresh token invalid or expired -- leave auth empty
        // ProtectedRoute will redirect to login
      } finally {
        setIsLoading(false);
      }
    }
    refreshAccessToken();
  }, []);


  return isLoading ? <LoadingSpinner /> : <Outlet />;
}

export default PersistLogin;