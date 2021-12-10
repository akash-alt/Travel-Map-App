import React,{useState,useRef} from 'react'
import { Cancel, Room} from "@material-ui/icons"
import "./register.css"
import axios from 'axios';

function Register({setShowRegister}) {
    const [success,setSuccess] = useState(true);
    const [error,setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handelSubmit = async(e)=>{
        e.preventDefault();// this will prevent refresh the page
        const newUser = {
            username : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
        }

        try{
            await axios.post("/users/register",newUser)
            setError(false)
            setSuccess(true)
        }catch(err){
            setError(true)
        }
    }

    return (
        <div className="container">
            <div className="logo">
                <Room/>
                e-Combrade
            </div>
            <form onSubmit={handelSubmit} className="register-form">
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="registerbtn">Register</button>
                {success && 
                    <span className="success">Successfull. You can login now</span>
                }{
                    error && 
                    <span className="failure">Something went wrong!</span>
                }            
            </form>
            <Cancel className="cancelbtn" onClick={()=>setShowRegister(false)}/>
        </div>
    )
}

export default Register
