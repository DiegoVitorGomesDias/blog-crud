import React from 'react'
import { Link } from "react-router-dom";

export const PostCard = ({ post }) => 
{
    const { userId, id, title, body } = post;
    return (
        <div className='postCard'>
            <Link to={`/${id}`}><h3>{ title }</h3></Link>
            <p>{body}</p>
        </div>
    )
}
