import React from 'react';
import { Link } from "react-router-dom";

export const Header = () => 
{
    return (
        <header id='top_header'>
            <Link to={"/"}><img src="/logo.png" alt="" /></Link>
            <nav>
                <ul>
                    <li>
                        <a href='https://github.com/DiegoVitorGomesDias' target="_blank">GitHub</a>
                    </li>
                    <li>
                        <Link to={"/post"} className="linkFeatured">New Post</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
