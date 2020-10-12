import React,{useEffect,createContext,useReducer, useContext} from 'react';
import Navbar from './component/screens/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './component/screens/Home'
import Login from './component/screens/Login'
import Signup from './component/screens/Signup'
import Profile from './component/screens/Profile'
import CreatePost from './component/screens/CreatePost'
import UserProfile from './component/screens/UserProfile'
import FollowingsPosts from './component/screens/FollowingsPosts'
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
            <Route path='/profile/:userid'>
              <UserProfile/>
            </Route>
            <Route path='/followingposts'>
              <FollowingsPosts/>
            </Route>
        </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
