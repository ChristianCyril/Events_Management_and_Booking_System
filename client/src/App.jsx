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
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import ViewEvent from './pages/admin/ViewEvent';





function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/event-details/:id' element={<EventDetailsPage />} />
      


      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoutes />}>
          <Route path='/bookings/:id' element={<Bookings />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/edit-event/:id' element={<EditEvent />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/view-event/:id' element={<ViewEvent />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
