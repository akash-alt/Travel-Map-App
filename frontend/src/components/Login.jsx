import React,{useState,useRef} from 'react'
import { Cancel, Room} from "@material-ui/icons"
import "./login.css"
import axios from 'axios';

function Login({setShowLogin,myStorage,setCurrentUser}) {
    const [error,setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handelSubmit = async(e)=>{
        e.preventDefault();// this will prevent refresh the page
        const user = {
            username : nameRef.current.value,
            password : passwordRef.current.value,
        }

        try{
            const res = await axios.post("/users/login",user)
            myStorage.setItem("user",res.data.username) //we used setItem for the adding the values & it will show key and values
            setCurrentUser.setItem("user",res.data.username)// 
            setShowLogin(false)
            setError(false)      
        }catch(err){
            setError(true)
        }
    }

    return (
        <div className="loginContainer">
            <div className="logo">
                <Room/>
                e-Combrade
            </div>
            <form onSubmit={handelSubmit} className="login-form">
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="loginbtn">Login</button>
               {
                    error && 
                    <span className="failure">Something went wrong!</span>
                }            
            </form>
            <Cancel className="cancelbtn" onClick={()=>setShowLogin(false)}/>
        </div>
    )
}

export default Login;
