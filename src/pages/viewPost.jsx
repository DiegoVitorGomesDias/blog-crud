import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { postsAPI } from "../routes/posts"

export const ViewPost = () => 
{    
    const [ post, setPost ] = useState({});
    const [ comments, setComments ] = useState([]);

    const getPost = async (postID) => 
    { 
        setPost
        ( 
            await postsAPI.get(`/posts/${postID}`)
            .then( (res) => res.data )
            .catch( (err) => post )
        );

        setComments
        ( 
            await postsAPI.get(`/posts/${postID}/comments`)
            .then( (res) => res.data )
            .catch( (err) => comments )
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
            <br /><br />
            <Link to={`/${post.id}/edit`} style={{paddingLeft: "0"}}>Edit Post</Link>
            <br /><br />
        </main>
        <aside>
        <h3 style={{ textAlign: "left" }}>Comments</h3>
        <div style={{ display: "flex", flexDirection: "column" , gap: "3vh" }}>
            {
                comments.map( comment => (
                    <div className='postCard text'>
                        <h4>{comment?.name}</h4>
                        <p>{comment?.body}</p>
                    </div>
                ))
            }
        </div>
        </aside>
    </div>
    )
}