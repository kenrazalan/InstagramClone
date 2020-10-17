import React,{useEffect,createContext,useReducer, useContext} from 'react';
import Navbar from './component/screens/Navbar/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './component/screens/Home/Home'
import Login from './component/screens/Login/Login'
import Signup from './component/screens/Signup/Signup'
import Profile from './component/screens/Profile/Profile'
import CreatePost from './component/screens/CreatePost/CreatePost'
import {FeedProvider} from './component/context/FeedContext'
import NewPost from './component/screens/NewPost/NewPost'

import UserProfile from './component/screens/UserProfile/UserProfile'
import Reset from './component/screens/Reset/Reset'
import FollowingsPosts from './component/screens/FollowingsPosts/FollowingsPosts'
import Newpassword from './component/screens/Newpassword/Newpassword'
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
            <Route exact path='/profile'>
              <Profile/>
            </Route>
            <Route path='/create'>
              <CreatePost/>
            </Route>


            <Route path='/newpost'>
              <NewPost/>
            </Route>



            <Route path='/profile/:userid'>
              <UserProfile/>
            </Route>
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
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <FeedProvider>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </FeedProvider>
    </UserContext.Provider>
  );
}

export default App;
