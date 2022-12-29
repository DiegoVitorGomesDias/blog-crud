import React, { useEffect, useState, use } from 'react'
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useFormik } from 'formik';
import { postsAPI } from "../routes/posts"

export const Update = () => 
{
  const postID = window.location.pathname.split("/")[2];
  // const [ newTitle, setNewTitle ] = useState("");
  // const [ newContent, setNewContent ] = useState("");
  const [ validateUpdate, setValidateUpdate ] = useState(false);
  // const [ post, setPost ] = useState({});
  
  let post;
    
  const getPost = async () => 
  { 
    const res = await postsAPI.get(`/posts/${postID}`)
    .then( (res) => res.data )
    .catch( (err) => post );
    post = res;
  }

  useEffect( () => { getPost() }, [] )
  
  const validateSchemaPost = yup.object().shape
  ({
    title: yup.string().required("Required.").min(2, "Min 2 characteres."),
    content: yup.string().optional()
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, isValid } = useFormik
  ({
    initialValues:
    {
      title: post.title,
      content: post.body
    },
    validationSchema: validateSchemaPost,
    onSubmit: async (values) =>
    {
      return await postsAPI.put(`/posts/${postID}`, {data: values})
      .then( (res) => { alert("Post Updated!"); return res.data } )
      .catch( (err) => err )
    },
  })

  useEffect( () => 
  { 
    values.title === post.title && values.content == post.body 
    ? setValidateUpdate(false) 
    : setValidateUpdate(true)
  }, [ values.title, values.content ] )

  return (
    <div id="newPost">
      <header style={{display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "1vh" }}>
        <Link to={"/"} title="home" style={{paddingLeft: "0"}}>
          <FaArrowLeft fontSize={"1.2em"}/>
        </Link>
        <h1>Post Update</h1>
      </header>
      <form autoComplete='false' onSubmit={handleSubmit}>
        <label htmlFor="title">Update Title:</label>
        { touched.title && <small>{errors.title}</small>}
        <input type="text" name="title" id="title" 
          placeholder='Enter Post Title' 
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}          
        />

        <label htmlFor="content">Update Content Post:</label>
        <textarea name="content" id="content" 
          cols="30" rows="10" 
          placeholder='Enter Post Content'
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>


        <button type="submit" className="linkFeatured" disabled={isSubmitting || !isValid}>
          { isSubmitting ?  "Loading..." : validateUpdate ? "Update" : "Close" }
        </button>

      </form>      
    </div>
  )
}