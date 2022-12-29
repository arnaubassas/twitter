import { useEffect, useState } from "react"
import SingleAnswer from "./singleAnswer"
import Tweets from "./Tweets"

const Post =({id}) => {
    const [tweet, setTweet] = useState([])
    const [answer, setAnswer] = useState ([])
    
    

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
    return (
        <div>
                {/* <SingleTweet author={Tweets.author} day={Tweets.day} id={Tweets.id} message={Tweets.message}  deleteTweet={deleteTweet}/> */}
            {answer.map((t) => (
                <SingleAnswer author={t.author} day={t.day} id={t.id} OriginalID={t.originalID} message={t.message}  deleteAnswer={deleteAnswer}/>
            ))}
        </div>
    )
}

export default Post