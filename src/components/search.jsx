import { useEffect, useState } from "react"
import SingleAnswer from "./singleAnswer"
import SingleTweet from "./singletweet"
import { useParams } from "react-router-dom"

const Search = ({ search }) => {
    const [tweets, setTweets] = useState([])
    const [answer, setAnswer] = useState([])


    const fetchTweets = () => {
        fetch(`http://localhost:5000/tweets?q=${search}`)
            .then((respnse) => respnse.json())
            .then(data => {
                setTweets(data)
            })
    }

    const fetchAnswer = () => {
        fetch(`http://localhost:5000/answers?q=${search}`)
            .then((respnse) => respnse.json())
            .then(data => {
                setAnswer(data)
            })
    }

    const deleteTweet = (id) => {
        fetch(`http://localhost:5000/tweets/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchTweets()
            })
        let filterAnswer = answer.filter(answer => answer.originalID === id);
        let length = filterAnswer.length;
        for (let i = 0; i < length; i++) {
            fetch(`http://localhost:5000/answers/${filterAnswer[i].id}`, { method: 'DELETE' })
        }
    }
    const deleteAnswer = (id) => {
        fetch(`http://localhost:5000/Answers/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchAnswer()
            })
    }


    useEffect(() => {
        fetchTweets()
        fetchAnswer()
    }, [search])


    return (
        <div>
            <div className="twts">
                {tweets.map((t) => (
                    <SingleTweet author={t.author} day={t.day} key={t.id} id={t.id} message={t.message} deleteTweet={deleteTweet} />
                ))}
            </div>
            <div>
                {answer.map((a) => (
                    <SingleAnswer PID={true} author={a.author} day={a.day} key={a.id} id={a.id} originalID={a.originalID} message={a.message} deleteAnswer={deleteAnswer} />
                ))}
            </div>


        </div>
    )

}
export default Search;