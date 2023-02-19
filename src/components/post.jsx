import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Error from "./error"
import SingleAnswer from "./singleAnswer"
import SingleTweet from "./singletweet"
import Tweets from "./Tweets"
import Axios from "axios";


const Post = () => {
    const [tweet, setTweet] = useState()
    const [answer, setAnswer] = useState([])
    const { id } = useParams()
    const [values, setValues] = useState({ id: "", author: "", message: "", originalId: "", day: "" });

    const handleChange = event => {
        const { name, value } = event.target;
        values.id = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        values.day = new Date();
        values.day = (values.day).toLocaleDateString();
        values.originalId = tweet.id;
        setValues({ ...values, [name]: value });

    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log({ values });
        Axios.post('http://localhost:5000/answers', {
            author: values.author,
            id: values.id,
            message: values.message,
            originalID: values.originalId,
            day: values.day,
        })
        e.target.reset()


        fetchAnswer()
    }


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
        let filterAnswer = answer.filter(answer => answer.originalID === id);
        let length = filterAnswer.length;
        for (let i = 0; i < length; i++) {
            fetch(`http://localhost:5000/answers/${filterAnswer[i].id}`, { method: 'DELETE' })
        }
        fetchTweets()

    }
    const deleteAnswer = (id) => {
        fetch(`http://localhost:5000/Answers/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchAnswer()
            })
    }


    if (!tweet) {
        return null
    }
    if (tweet.id == undefined) {
        return (
            <div>
                <Error />
            </div>
        )
    } else {
        return (
            <div>
                <SingleTweet author={tweet.author} day={tweet.day} key={tweet.id} id={tweet.id} message={tweet.message} deleteTweet={deleteTweet} />
                <div className="post" >
                    <form onSubmit={(e) => handleClick(e)} id="form">
                        <div className="postParts">
                            <input className="name" type="text" name="author" placeholder="Name" values={values.message} onChange={handleChange}></input>
                        </div>
                        <div className="postParts">
                            <textarea className="reply" placeholder="Tweet your reply?" name="message" maxLength="280" values={values.message} onChange={handleChange}></textarea>
                        </div>
                        <div className="buttonPost"><button className="send" type='submit'>Reply</button></div>
                    </form>
                </div>


                {answer.map((t) => (
                    <SingleAnswer PID={id} author={t.author} day={t.day} key={t.id} id={t.id} originalID={t.originalID} message={t.message} deleteAnswer={deleteAnswer} />
                ))}

            </div>
        )
    }
}

export default Post