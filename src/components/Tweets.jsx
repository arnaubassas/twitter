import { useEffect, useState } from "react"
import OutsideClickHandler from 'react-outside-click-handler';
import SingleTweet from "./singletweet";
import { click } from "@testing-library/user-event/dist/click";
import Axios from "axios";

const Tweets = () => {
    const [tweets, setTweets] = useState([])
    const [answer, setAnswer] = useState([])
    const [values, setValues] = useState({ id: "", author: "", message: "", day: "" });

    const handleChange = event => {
        const { name, value } = event.target;
        values.id = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        values.day = new Date();
        values.day = (values.day).toLocaleDateString();
        setValues({ ...values, [name]: value });

    };

    const handleClick = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/tweets', {
            author: values.author,
            id: values.id,
            message: values.message,
            day: values.day,
        })
        e.target.reset()
        fetchTweets()
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
            })
        let filterAnswer = answer.filter(answer => answer.originalID === id);
        let length = filterAnswer.length;
        for (let i = 0; i < length; i++) {
            fetch(`http://localhost:5000/answers/${filterAnswer[i].id}`, { method: 'DELETE' })
        }


    }

    const updateTweet = (id, tweet) => {
        fetch(`http://localhost:5000/tweets/${id}`, { method: 'PUT' })
    }




    return (
        <div>
            <div className="post" >
                <form onSubmit={(e) => handleClick(e)} id="form">
                    <div className="postParts">
                        <input className="name" type="text" name="author" placeholder="Name" values={values.message} onChange={handleChange}></input>
                    </div>
                    <div className="postParts">
                        <textarea className="message" placeholder="What's happening?" name="message" maxLength="280" values={values.message} onChange={handleChange}></textarea>
                    </div>
                    <div className="buttonPost"><button className="send" type='submit'>Tweet</button></div>
                </form>
            </div>
            <div className="twts">
                {tweets.map((t) => (
                    <SingleTweet author={t.author} day={t.day} key={t.id} id={t.id} message={t.message} deleteTweet={deleteTweet} />
                ))}
            </div>
        </div >
    )
}

export default Tweets


