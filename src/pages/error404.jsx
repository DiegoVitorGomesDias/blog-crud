import React from 'react'
import { Link } from "react-router-dom";

export const Error404 = () => 
{
  return (
    <div id='screen_error'>
        <h1>Error 404</h1>
        <p>Page Not Found</p>
        <p>Return <Link to={"/"}>Home</Link></p>
    </div>
  )
}
