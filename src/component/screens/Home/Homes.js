import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import Loader from "../Loader";
import { FeedContext } from "../../context/FeedContext";


const Wrapper = styled.div`
  @media screen and (max-width: 1040px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Home = () => {
  const {state,dispatch} = useContext(UserContext)
  const { feed, setFeed } = useContext(FeedContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/allpost',{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
       setFeed(result.posts)
        setLoading(false)
    })
},[])


  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
          <div className="home">
            {feed.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
       
    </Wrapper>
  );
};

export default Home;
