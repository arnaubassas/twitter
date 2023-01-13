import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Error from "./error"
import SingleAnswer from "./singleAnswer"
import SingleTweet from "./singletweet"
import Tweets from "./Tweets"

const Post = () => {
    const [tweet, setTweet] = useState()
    const [answer, setAnswer] = useState([])
    const { id } = useParams()



    const fetchTweets = () => {
        fetch(`http://localhost:5000/tweets/${id}`)
            .then((respnse) => respnse.json())
            .then(data => {
                setTweet(data)
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
                fetchAnswer()
            })
    }
    const deleteAnswer = (id) => {
        fetch(`http://localhost:5000/Answers/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchAnswer()
            })
    }

    const updateTweet = (id, answer) => {
        fetch(`http://localhost:5000/Answers/${id}`, { method: 'PUT' })
    }

    const createTweet = (answer) => {
        fetch(`http://localhost:5000/Answers`, { method: 'POST' })
    }
    if (!tweet) {
        return null
    }
    if (tweet.id == undefined) {
        return (  
            <div>
                <Error/>
            </div>
        )
    } else {
        return (
            <div>
                <SingleTweet author={tweet.author} day={tweet.day} id={tweet.id} message={tweet.message} deleteTweet={deleteTweet} />
                {answer.map((t) => (
                    <SingleAnswer PID={id} author={t.author} day={t.day} id={t.id} originalID={t.originalID} message={t.message} deleteAnswer={deleteAnswer} />
                ))}
            </div>
        )
    }
}

export default Post