import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../../App'
import M from 'materialize-css'

const Login = () =>{
    const {state,dispatch} =useContext(UserContext)

    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const PostData =() =>{
        const emailValidation = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email", classes:"#e53935 red darken-1"}) 
            return
        }
        fetch("/signin",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#e53935 red darken-1"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Signed success",classes:"#66bb6a green lighten-1"})
                history.push('/')
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input
                 type="text"
                 placeholder="email"
                 value={email}
                 onChange={(e)=>{
                     setEmail(e.target.value)
                 }}/>
                 <input
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(e)=>{
                     setPassword(e.target.value)
                 }}/>
                 <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                 onClick={()=>PostData()}>
                     Login
                </button>
                <h5>
                    <Link to="/signup">Dont have an account?</Link>
                </h5>
                <h6>
                    <Link to="/reset">Forgot password?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login