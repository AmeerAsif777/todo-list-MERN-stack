import React,{useState, useEffect} from 'react'
import './form.scss'
import {Navigate} from "react-router-dom" 
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
const CreateForm = () => {
    const [user,setUser]=useState({
        name:"",
        email:"",
        photo:"",
        formData: new FormData(),
        error:"",
        open:false,
    })
    const [loader, setLoader] = useState(false);
    useEffect(() =>
    {
        const ownerID = JSON.parse(localStorage.getItem('profile')).result._id;
        const email = JSON.parse(localStorage.getItem('profile')).result.email;
        formData.set('ownerId', ownerID);
        formData.set('email', email);
      }, []);
    const{name,email,photo,formData,error,open}=user

    const handleChange=event=>{
        const{name}=event.target;
        const value=name==="photo"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setUser({...user,[name]:value,error:""})
    }

    const submit=async()=>{
        try {
            console.log('CALLING');
            setLoader(true);
            const ownerID = JSON.parse(localStorage.getItem('profile')).result._id;
            const res=await fetch(`http://localhost:8000/create`,{
                method:"post",
                body: formData,
                
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
                setUser({...user,error:data.error})
            }
            else{
                setUser({ name: "", email: "", photo: "", open: true })
                console.log('DONE');

            }
        }
        catch(err){
            /// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', err)
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
            {/*
            <div className='form-group'>
                <label className='text-muted'>email</label>
                <input 
                type="text"
                value={email}
                name="email"
                onChange={handleChange}
                />
            </div>
    */}
            <button className='btn btn-raised btn-primary mt-2' onClick={()=>submit()}>submit</button>
        </form>
    }
    if(open){
       return  <Navigate to="/home" />
    }
  return (
      <div className='container'>

          <h2 className='mt-5 mb-5'>Create Form</h2>
          {loader ? <Lottie options={defaultOptions}
              height={400}
              width={400} />:<>
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

              </>}
    </div>
  )
}

export default CreateForm