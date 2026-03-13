import { Routes, Route } from 'react-router-dom';
import Register from './pages/registration/Register';
import Login from './pages/Login/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminRoutes from './components/AdminRoutes';
import Bookings from './pages/bookings/Bookings';
import PersistLogin from './components/PersistLogin';
import Dashboard from './pages/admin/Dashboard';
import Homepage from './pages/HomePage/HomePage';
import EventDetailsPage from './pages/event-details/EventDetails'





function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/homepage' element={<Homepage />} />
      <Route path='/event' element={<EventDetailsPage/>} />

      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoutes />}>
          <Route path='/bookings' element={<Bookings />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
