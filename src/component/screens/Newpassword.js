import React,{useState} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'

const Login = () =>{
  

    const history = useHistory()
    const [password,setPassword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData =() =>{
    
        fetch("/newpassword",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                token,
                
                
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#e53935 red darken-1"})
            }else{
               
                M.toast({html: data.message,classes:"#66bb6a green lighten-1"})
                history.push('/signin')
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
                 type="password"
                 placeholder=" Enter a new password"
                 value={password}
                 onChange={(e)=>{
                     setPassword(e.target.value)
                 }}/>
                 <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                 onClick={()=>PostData()}>
                     Change Password
                </button>
              
            </div>
        </div>
    )
}

export default Login