import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import App from './App'
import { Home } from './pages/home';
import { ViewPost } from './pages/viewPost';
import { NewPost } from './pages/newPost';
import { Update } from './pages/update';
import { Error404 } from './pages/error404';

import './index.css'

const router = createBrowserRouter
([
  {
    element: <App />,
    children: 
    [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post",
        element: <NewPost />
      },
      {
        path: "/:id",
        element: <ViewPost />
      },
      {
        path: "/:id/edit",
        element: <Update />
      },
    ],
    errorElement: <Error404 />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
