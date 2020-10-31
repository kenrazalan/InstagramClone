import React,{useEffect,createContext,useReducer, useContext} from 'react';
import Container from './component/screens/Container'
import Navbar from './component/screens/Navbar/Navbar'

import Nav from './component/screens/Nav'

import './App.css'
import {BrowserRouter as Router,Route,Switch,useHistory} from 'react-router-dom'
import Home from './component/screens/Home/Home'
import Login from './component/screens/Login/Login'
import Signup from './component/screens/Signup/Signup'
import Profile from './component/screens/Profile/Profile'
import CreatePost from './component/screens/CreatePost/CreatePost'
import {FeedProvider} from './component/context/FeedContext'
import NewPost from './component/screens/NewPost/NewPost'
import ProfileHeader from './component/screens/ProfileHeader'
import ProfileOthers from './component/screens/ProfileOthers'
import UserProfile from './component/screens/UserProfile/UserProfile'
import Reset from './component/screens/Reset/Reset'
import FollowingsPosts from './component/screens/FollowingsPosts/FollowingsPosts'
import Newpassword from './component/screens/Newpassword/Newpassword'
import EditProfile from './component/screens/EditProfile'
import {initialState, reducer} from './reducers/userReducer'
export const UserContext = createContext()


const Routing= () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    
    }else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push('/signin')
    }
  },[])  
  return(
    <Container>
    <Switch>
        <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/signin'>
              <Login/>
            </Route>
            <Route path='/signup'>
              <Signup/>
            </Route>
            {/* <Route exact path='/profile'>
              <Profile/>
            </Route> */}
            <Route path='/create'>
              <CreatePost/>
            </Route>

            <Route path='/profile/:userid'  render={(props) => {
                    return ( <ProfileOthers {...props } key={window.location.pathname}/> )
                }} >
         
            </Route>


            <Route path='/newpost'>
              <NewPost/>
            </Route>
            <Route path='/ProfileHeader' component={ProfileHeader}>
            
            </Route>  
            
            <Route path='/accounts/edit'>
              <EditProfile/>
            </Route>



            {/* <Route path='/profile/:userid'>
              <UserProfile/>
            </Route> */}
            <Route path='/followingposts'>
              <FollowingsPosts/>
            </Route>
            <Route exact path='/reset'>
              <Reset/>
            </Route>
            <Route path='/reset/:token'>
              <Newpassword/>
            </Route>
        </Switch>
        </Container>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
   
 
    <Router>
    <Nav/>
    <Routing/>
    </Router>
   

    </UserContext.Provider>
  );
}

export default App;
