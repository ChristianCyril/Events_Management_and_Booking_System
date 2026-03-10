import {Routes,Route} from 'react-router-dom';
import Register from './pages/registration/Register';
import Login from './pages/Login/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminRoutes from './components/AdminRoutes';
import Bookings from './pages/bookings/Bookings';
function App() {
  return (
    <Routes>
      {/* Unprotected routes */}
      <Route path='/register' element={<Register/>}/> 
      <Route path='/login' element={<Login/>}/>

     
      {/* Protected routes */}
      <Route element= {<ProtectedRoutes/>}>
        <Route path='/bookings' element={<Bookings/>}/>
      </Route>
      
      {/* Admin routes */}
      <Route element = {<AdminRoutes/>}>

      </Route>
    </Routes>
  )
}

export default App
