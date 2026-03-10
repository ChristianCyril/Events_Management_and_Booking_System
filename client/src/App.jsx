import {Routes,Route} from 'react-router-dom';
import Register from './pages/registration/Register';
import Login from './pages/Login/Login';
function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}/> 
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
