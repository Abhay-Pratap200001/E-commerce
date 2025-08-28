import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route, RouterProvider, createRoutesFromElements,} from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store.js'


const route = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App/>} />)
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={route}/>
  </Provider>
)
