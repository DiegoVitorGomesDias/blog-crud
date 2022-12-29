import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { postsAPI } from "../routes/posts"

export const ViewPost = () => 
{    
    const [ post, setPost ] = useState({});

    const getPost = async (postID) => 
    { setPost
        ( 
            await postsAPI.get(`/posts/${postID}`)
            .then( (res) => res.data )
            .catch( (err) => post )
        );
    }

    useEffect( () => { getPost(window.location.pathname.split("/")[1]) }, [] )

    return (
        <div id="viewPost">
            <header style={{display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "1vh" }}>
                <Link to={"/"} title="home" style={{paddingLeft: "0"}}>
                <FaArrowLeft fontSize={"1.2em"}/>
                </Link>
                <h1 style={{ textAlign: "left" }}>{post.title}</h1>
            </header>
            <main>
                {post.body}.
            </main>
            <aside>
                <Link to={`/${post.id}/edit`} style={{paddingLeft: "0"}}>Edit Post</Link>
            </aside>
        </div>
    )
}