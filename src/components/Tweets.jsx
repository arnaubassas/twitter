import { useEffect, useState } from "react"
import { TextField } from "@mui/material";
import OutsideClickHandler from 'react-outside-click-handler';
import SingleTweet from "./singletweet";

const Tweets = () => {
    const [tweets, setTweets] = useState([])
    
    const fetchTweets = () => {
        fetch('http://localhost:5000/tweets')
            .then((respnse) => respnse.json())
            .then(data => {
                setTweets(data)
            })
    }
   
    useEffect(() => {
        fetchTweets()
    }, [])

    const deleteTweet = (id) => {
        fetch(`http://localhost:5000/tweets/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchTweets()
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
            {tweets.map((t) => (
                <SingleTweet author={t.author} day={t.day} id={t.id} message={t.message}  deleteTweet={deleteTweet}/>
            ))}
        </div>
    )
}

export default Tweets


