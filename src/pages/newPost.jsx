import React from 'react'
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useFormik } from 'formik';
import { postsAPI } from "../routes/posts"

export const NewPost = () => 
{

  const validateSchemaPost = yup.object().shape
  ({
    title: yup.string().required("Required.").min(2, "Min 2 characteres."),
    content: yup.string().required()
  })


  const { values, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, isValid } = useFormik
  ({
      initialValues:
      {
        title: "",
        content: ""
      },
      validationSchema: validateSchemaPost,
      onSubmit: async (values) =>
      {
        return await postsAPI.post("/posts", { body: values })
        .then( (res) => { alert("Post Completed!"); values.title = "", values.content = "";  return res.data } )
        .catch( (err) => err )
      },
  })


  return (
    <div id="newPost">
      <header style={{display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "1vh" }}>
        <Link to={"/"} title="home" style={{paddingLeft: "0"}}>
          <FaArrowLeft fontSize={"1.2em"}/>
        </Link>
        <h1>New Post</h1>
      </header>
      <form autoComplete='false' onSubmit={handleSubmit}>
        <label htmlFor="title">Insert Title:</label>
        { touched.title && <small>{errors.title}</small>}
        <input type="text" name="title" id="title" 
          placeholder='Enter Post Title' 
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus={true}
        />

        <label htmlFor="content">Content Post:</label>
        <textarea name="content" id="content" 
          cols="30" rows="10" 
          placeholder='Enter Post Content'
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>

        <button type="submit" className="linkFeatured" disabled={isSubmitting || !isValid}>
          { isSubmitting ?  "Loading..." : "Post" }
        </button>

      </form>      
    </div>
  )
}