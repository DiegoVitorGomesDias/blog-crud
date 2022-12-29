import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { postsAPI } from "../routes/posts"

export const Update = () => 
{
  const postID = window.location.pathname.split("/")[1];
  const navigate = useNavigate();
  const [ newTitle, setNewTitle ] = useState("");
  const [ newContent, setNewContent ] = useState("");
  const [ errors, setErrors ] = useState("")
  const [ validateUpdate, setValidateUpdate ] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ post, setPost ] = useState({});

  const getPost = async () => 
  { setPost
    ( 
      await postsAPI.get(`/posts/${postID}`)
      .then( (res) => res.data )
      .catch( (err) => post )
    )
  }

  useEffect( () => { getPost() }, [] )
  useEffect( () => { setNewTitle(post.title); setNewContent(post.body) }, [ post ] )

  useEffect( () => 
  { 
    newTitle === post.title && newContent === post.body || ( String(newTitle).length === 0 || String(newContent).length === 0 )
    ? setValidateUpdate(false) 
    : setValidateUpdate(true)
  }, [ newTitle, newContent ] )

  const handleChange = (e) =>
  {
    e.target.name === "title"
    ? setNewTitle(e.target.value)
    : setNewContent(e.target.value)
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setIsSubmitting(true)
    if ( !validateUpdate ) return;

    await postsAPI.put(`/posts/${postID}`, { body: { title: newTitle, body: newContent, userId: "1" } })
    .then( (res) => { alert("Post Updated!"); navigate(`/${postID}`) }  )
    .catch( (err) => { alert("Error"); setIsSubmitting(false) } )
  }

  const deletePost = async (e) =>
  {
    confirm("This action is irreversible, you really want to delete the post?\nEssa ação é irreversível, deseja mesmo deletar o post?")
    ? (
      await postsAPI.delete(`/posts/${postID}`)
      .then( (res) => { alert("Post Deleted!"); navigate(`/`) }      )
      .catch( (err) => { alert("Error"); setIsSubmitting(false) } )
    )
    : alert("Post Delete Canceled")
  }

  return (
    <div id="newPost">
      <header style={{display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "1vh" }}>
        <Link to={`/${postID}`} title="home" style={{paddingLeft: "0"}}>
          <FaArrowLeft fontSize={"1.2em"}/>
        </Link>
        <h1>Post Update</h1>
      </header>
      <form autoComplete='false' onSubmit={ handleSubmit }>

        <label htmlFor="title">Update Title:</label>
        <small>{errors?.title}</small>
        <input type="text" name="title" id="title" 
          placeholder='Enter Post Title' 
          value={ newTitle || "" }
          onChange={ handleChange }
          onBlur={ handleChange }          
        />

        <label htmlFor="content">Update Content Post:</label>
        <textarea name="content" id="content" 
          cols="30" rows="10" 
          placeholder='Enter Post Content'
          value={ newContent || ""}
          onChange={ handleChange }
          onBlur={ handleChange }
        ></textarea>


        <button type="submit" className="linkFeatured" disabled={ isSubmitting || !validateUpdate }>
          { isSubmitting ?  "Loading..." : validateUpdate ? "Update" : <Link to={`/${postID}`}>Close</Link> }
        </button>

        <button type='reset' onClick={deletePost} className='deleteButton'>Delete Post</button>
 
      </form>
    </div>
  )
}