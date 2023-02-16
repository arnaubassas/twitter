import { useEffect, useState } from "react"
import { TextField } from "@mui/material";
import OutsideClickHandler from 'react-outside-click-handler';
import SingleTweet from "./singletweet";
import { click } from "@testing-library/user-event/dist/click";

const Tweets = () => {
    const [tweets, setTweets] = useState([])
    const [answer, setAnswer] = useState([])

    const handleClick=()=>{

    }
    
    const fetchTweets = () => {
        fetch('http://localhost:5000/tweets')
            .then((respnse) => respnse.json())
            .then(data => {
                setTweets(data)
            })
    }
    const fetchAnswer = () => {
        fetch('http://localhost:5000/answers')
            .then((respnse) => respnse.json())
            .then(data => {
                setAnswer(data)
        })
    }
    useEffect(() => {
        fetchTweets()
        fetchAnswer()
    }, [])

    const deleteTweet = (id) => {
        fetch(`http://localhost:5000/tweets/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchTweets()
                
                let filterAnswer=answer.filter( answer => answer.originalID===id);
                console.log(id);
            })
           
       
       
       
        
        

    
    }

    const updateTweet = (id, tweet) => {
        fetch(`http://localhost:5000/tweets/${id}`, { method: 'PUT' })
    }

    const createTweet = (tweet) => {
        fetch(`http://localhost:5000/tweets`, { method: 'POST' })
    }
    return (
        <div>
        <div className="post" >
            <form onSubmit={handleClick}>
                <div className="postParts">
                <input className="name" type="text"></input>
                </div>
                <div className="postParts">
                <input className="message" placeholder="What's happening?"></input>
                
                <button className="send"></button>
                </div>
            </form>
        </div>
        <div className="twts">
            {tweets.map((t) => (
                <SingleTweet author={t.author} day={t.day} key={t.id} id={t.id} message={t.message}  deleteTweet={deleteTweet}/>
            ))}
        </div>
        </div>
    )
}

export default Tweets


