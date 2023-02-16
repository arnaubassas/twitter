import { useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use";
import { Link } from "react-router-dom";

const SingleTweet = ({ author, day, id, message, deleteTweet }) => {
    const [down, setDown] = useState(false)
    const [up, setUp] = useState(false)
    const toggleDropdown = (e) => { e.preventDefault(); setDown(!down); setUp(true); };
    const ref = useRef(null);
    useClickAway(ref, () => {
        setDown(false)
    })
    const deleteWithoutPropagation = (e) => {
        console.log(id)
        e.preventDefault(); deleteTweet(id);
    };
    const outpropagation = (e) => {
        if (up === true) {
            if (down === false) { e.preventDefault(); setUp(false) }
        }
    }

    return (
        <Link onClick={(e) => outpropagation(e)} to={`/${id}`}>
            <div className="Tweet">
                <div className="Tweetlane"></div>
                <div className="Tweetrow1">
                    <div className="Username">{author}<div className="day">·{day}</div></div>
                    <div className="dropdown">
                        <button onClick={(e) => toggleDropdown(e)} className="buttonoptions"><img src="https://cdn-icons-png.flaticon.com/512/57/57013.png" height='10' width='13'></img></button>
                        {down &&
                            <div className="dropdown-content" ref={ref}>
                                <button onClick={(e) => deleteWithoutPropagation(e)} className="Delete">Delete</button>
                                {/* <button className="Edit">Edit</button> */}
                            </div>
                        }
                    </div>
                </div>
                <div className="Tweetrow2">
                    <div>{message}</div>
                </div>
                <div className="Tweetrow3">
                    <button onClick={() => alert("not work")} className="buttonsTweet"><img src='https://icons-for-free.com/iconfiles/png/512/like-131964752974590423.png' width="20" height="20"></img></button>
                    <button onClick={() => alert("not work")} className="buttonsTweet"><img src='https://icons-for-free.com/iconfiles/png/512/comment-1320568680107078514.png' width="15" height="15"></img></button>
                    <button onClick={() => alert("not work")} className="buttonsTweet"><img src='https://icons-for-free.com/iconfiles/png/512/retweet-1324760546604918531.png' width="20" height="20"></img></button>
                </div>
            </div>
        </Link>
    )
}

export default SingleTweet;