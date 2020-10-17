import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../../App' 
import M from 'materialize-css'
import NewPost from "../NewPost/NewPost";
const Navbar = () =>{
  const searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()

  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])  
  const renderList =()=>{
    if(state){
        return[  
          <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
          <li key="2"><Link to="/profileheader">Profile</Link></li>,
          // <li key="3"><Link to="/create">Create Post</Link></li>,
          <li>
          <NewPost />
        </li>,
          <li key="4"><Link to="/followingposts">My following Posts</Link></li>,
         <li key="5">
         <h5  style={{color:'black',padding:"8px 15px 0 15px",fontSize:"15px",}}
                 onClick={()=>{
                   localStorage.clear()
                   dispatch({type:"CLEAR"})
                   history.push('/signin')
                 }}>Logout</h5>
                     
               
       </li>
        ]
    }else{
      return[
        <li  key="6"><Link to="/signin">Signin</Link></li>,
        <li  key="7"><Link to="/signup">Signup</Link></li>

      ]
    }
  }

  const fetchUsers = (query) =>{
    setSearch(query)
    fetch('/searchusers',{
      method:"post",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result)
      setUserDetails(result.user)
    })
  }
    return (
      <nav>
        <div className="nav-wrapper white z-depth-0" >
          <Link to={state?"/":"/signin"} className="brand-logo left">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right">
           {renderList()}
          </ul>
        </div>
        <div id="modal1" class="modal" ref={searchModal} style={{color: "black"}} >
          <div className="modal-content" >
          <input
                 type="text"
                 placeholder="Search"
                 value={search}
                 onChange={(e)=>{
                     fetchUsers(e.target.value)
                 }}/>
                        
            <ul className="collection">
              {userDetails.map(item=>{
                return  <Link to={item._id !== state._id ? `/profile/${item._id}`: "/profile"  } onClick={()=>{
                  M.Modal.getInstance(searchModal.current).close() 
                  setSearch("")
                  setUserDetails([])
                }}><li className="collection-item">{item.email}</li></Link> 
              })}
            
            
            </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch("")}>Close</button>
          </div>
        </div>
      </nav>
    );
}

export default Navbar