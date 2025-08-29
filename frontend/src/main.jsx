import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route, RouterProvider, createRoutesFromElements,} from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store.js'
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/user/Profile.jsx';

const route = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App/>}>

    <Route path='' element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile/>}/> 
   </Route>

  <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>

</Route>)
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={route}/>
    
  </Provider>
)
