import React, { useEffect, useState } from 'react';

import { postsAPI } from "../routes/posts.js";
import { PostCard } from '../components/postCard';

export const Home = () => 
{
  const [ posts, setPosts ] = useState([]);
    
  const getPosts = async () => 
  { setPosts
    ( 
      await postsAPI.get("/posts")
      .then( (res) => res.data )
      .catch( (err) => [...posts] )
    );
  }

  useEffect( () => { getPosts() }, [] )

  return (
    <div id='home'>
      <h1>Posts Recentes</h1>
      <main id='posts'>
        { 
          posts.map( post => <PostCard post={post} key={post.id} />  )
        }
      </main>
    </div>
  )
}