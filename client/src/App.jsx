import { Routes, Route } from 'react-router-dom';
import Register from './pages/registration/Register';
import Login from './pages/Login/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminRoutes from './components/AdminRoutes';
import MyBookings from './pages/bookings/MyBookings';
import PersistLogin from './components/PersistLogin';
import Dashboard from './pages/admin/Dashboard';
import Homepage from './pages/HomePage/HomePage';
import EventDetailsPage from './pages/event-details/EventDetails'
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import ViewEvent from './pages/admin/ViewEvent';
import ViewAttendees from './pages/admin/ViewAttendees';
import EventsHistory from './pages/admin/EventsHistory';




function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/event-details/:id' element={<EventDetailsPage />} />
      


      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoutes />}>
          <Route path='/bookings' element={<MyBookings/>} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/edit-event/:id' element={<EditEvent />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/view-event/:id' element={<ViewEvent />} />
          <Route path='/view-attendees/:eventId' element={<ViewAttendees />} />
          <Route path='/history' element={<EventsHistory/>} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
