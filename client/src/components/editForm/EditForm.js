import React,{useEffect, useState} from 'react'
import './form.scss'
import { Navigate, useLocation } from "react-router-dom";
import loader from '../../images/loader1.json';
import Lottie from 'react-lottie';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const EditForm = () => {
    const location = useLocation()
    const [loader, setLoader] = useState(false);
    const [user,setUser]=useState({
        name:"",
        email:"",
        photo:"",
       
        error:"",
        open:false,
    })
    const[form,setForm]=useState({
        formData: new FormData(),
    })
    const {formData} = form;
    const{_id,name,email,photo,error,open}=user

    useEffect(()=>{
       setUser({...location.state})
    },[])
    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="photo"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setUser({...user,[name]:value,error:""})
    }

    const submit=async()=>{
        try {
            setLoader(true);
            const res=await fetch(`http://localhost:8000/edit/${_id}`,{
                method:"PUT",
                body:formData
            })
            const data = await res.json()
            if(data.error){
                setUser({...user,error:data.error})
            }
            else{
                setUser({name:"",email:"",photo:"",open:true})
                setLoader(false);
            }
        }
        catch(err){
            console.log(err)
        }
    }
   

    //form
    const fillForm=()=>{
        return   <form onSubmit={e=>e.preventDefault()} style={{width: '70%'}}>
        <div className='form-group'>
                <label className='text-muted'>photo</label>
                <input 
                type="file"
                onChange={handleChange}
                name="photo"
                />
            </div>
        <div className='form-group'>
                <label className='text-muted'>name</label>
                <input 
                type="text"
                value={name}
                name="name"
                onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>email</label>
                <input 
                type="text"
                value={email}
                name="email"
                onChange={handleChange}
                />
            </div>
            <button className='btn btn-raised btn-primary mt-2' onClick={()=>submit()}>Update</button>
        </form>
    }
    if(open){
       return  <Navigate to="/home" />
    }
  return (
    <div className='container'>
          <h2 className='mt-5 mb-5'>Edit Form</h2>
          {loader ? <Lottie options={defaultOptions}
              height={400}
              width={400} /> : <>
              <div className='alert alert-danger'
                  style={{ display: error ? "" : "none" }}
              >
                  {error}
              </div>
              <div className='alert alert-info'
                  style={{ display: open ? "" : "none" }}
              >
                  post successfully sumitted
              </div>
              {fillForm()}
      
          </>
          }
    </div>
  )
}

export default EditForm