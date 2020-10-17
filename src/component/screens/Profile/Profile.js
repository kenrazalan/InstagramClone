import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../../App'
import {useStyles} from './style'

const Profile = () =>{
    const [mypics,setMypic] =useState([])
    const {state,dispatch}= useContext(UserContext)
    const [image,setImage] = useState("")
    console.log(state)

    useEffect(()=>{
        fetch('/myPost',{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result)=>{
            console.log(result)
            setMypic(result.myPost) 
        })
    },[])

    useEffect(()=>{
        if(image){
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

            // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            // dispatch({type:"UPDATEPIC",payload:data.url})
            fetch("/updatepic",{
                method:"put",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic: data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                 console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
                //window.location.reload()
            })
            // window.location.reload()
        }).catch(error=>{
            console.log(error)
        })
    }
    },[image])

    const updatePhoto =(file)=>{
        setImage(file)
       
    }

    const classes = useStyles()
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
            }}>
                <div>
                    <img src={state?state.pic:"loading"} style={{width: "160px",height: "160px", borderRadius:"80px"}}/>
             
                </div>
                <div>
                    <h4> {state?state.name:"loading"}</h4>
                    {/* <h4>{state?state.email:"loading"}</h4> */}
                    <div className={classes.profileInfo}>
                         <h6><span className={classes.numFollowers}>{mypics.length}</span> posts</h6>
                        <h6>{state?<span className={classes.numFollowers}>{state.followers.length}</span>
                        :"0"} followers</h6>
                        <h6>{state ? <span className={classes.numFollowers}>{state.following.length}</span>
                        :"0"} following</h6>
                    </div>
                </div>
            </div>
                <div className="file-field input-field" style={{
                    margin:"10px"
                }}>
                     <div className={`btn ${classes.ggg}`}>
                    <span>Change Picture</span>
                    <input type="file" onChange={(e)=>{updatePhoto(e.target.files[0])}}/>
                        </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(

                        
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                                        )
                    })
                }
            </div>
        </div>

    )
}

export default Profile