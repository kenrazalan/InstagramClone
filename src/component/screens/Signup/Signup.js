import React,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup = () =>{

const history = useHistory()

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
        if(url){
            uploadFields()
        }
        
    },[url])

    const uploadImage =() =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","dtwrzv0of")
        fetch("https://api.cloudinary.com/v1_1/dtwrzv0of/image/upload",{
            method:"post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.url)
    
            setUrl(data.url)
        }).catch(error=>{
            console.log(error)
        })
    }

        const uploadFields =()=> {
            const emailValidation = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`

            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                M.toast({html:"Invalid Email", classes:"#e53935 red darken-1"}) 
                return
            }
            fetch("/signup",{
                method: "post",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    password,
                    username,
                    email,
                    pic: url
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

    const PostData =() =>{
        if(image){
             uploadImage()
        }else{
            uploadFields()
        }

       
    }
    
    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input
                 type="text"
                 placeholder="name"
                 value={name}
                 onChange={(e)=>{
                     setName(e.target.value)
                 }}
                 />
                  <input
                 type="text"
                 placeholder="email"
                 value={email}
                 onChange={(e)=>{
                     setEmail(e.target.value)
                 }}/>
                     <input
                 type="text"
                 placeholder="username"
                 value={username}
                 onChange={(e)=>{
                     setUsername(e.target.value)
                 }}/>
                 <input
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(e)=>{
                     setPassword(e.target.value)
                 }}/>
                  <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Picture</span>
                    <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                        </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                 <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                 onClick={()=>PostData()}>
                     Signup
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup