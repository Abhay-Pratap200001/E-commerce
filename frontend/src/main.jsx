import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";import { createBrowserRouter } from 'react-router-dom'

const route = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App/>} />)
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={route}/>
)
