import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'

import M from 'materialize-css'

const Reset = () =>{


    const history = useHistory()
 
    const [email,setEmail] = useState("")

    const PostData =() =>{
        const emailValidation = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email", classes:"#e53935 red darken-1"}) 
            return
        }
        fetch("/resetpassword",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
          
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
                 type="text"
                 placeholder="email"
                 value={email}
                 onChange={(e)=>{
                     setEmail(e.target.value)
                 }}/>
              
                 <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                 onClick={()=>PostData()}>
                     Reset Password
                </button>
                <h5>
                    <Link to="/signup">Dont have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Reset