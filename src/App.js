import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<Navigate to="/signup"/>}/>
      </Routes> 
    </div>
  );
}

export default App;
