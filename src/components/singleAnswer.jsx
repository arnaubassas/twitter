import { useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use";

const SingleAnswer = ({ PID, author, day, id, originalID, message, oID, deleteAnswer }) => {
    const [down, setDown] = useState(false)
    const toggleDropdown = () => { console.log('toggleDropdown'); setDown(!down) };
    const ref = useRef(null);
    useClickAway(ref, () => {
        setDown(false)
    })
    console.log(PID);
    if (originalID == PID || PID == true) {
        return (
            <div className="answer">
                <div className="Tweetlane"></div>
                <div className="answ">
                    <div className="Tweetrow1">
                        <div className="Username">{author}<div className="day">·{day}</div></div>
                        <div className="dropdown">
                            <button onClick={toggleDropdown} className="buttonoptions"><img src="https://cdn-icons-png.flaticon.com/512/57/57013.png" height='10' width='13'></img></button>
                            {down &&
                                <div className="dropdown-content" ref={ref}>
                                    <button onClick={() => deleteAnswer(id)} className="Delete">Delete</button>
                                    {/* <button className="Edit">Edit</button> */}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="Tweetrow2">
                        <div>{message}</div>
                    </div>
                    <div className="Tweetrow3">
                        <button onClick={() => alert(id)} className="buttonsTweet"><img src='https://icons-for-free.com/iconfiles/png/512/like-131964752974590423.png' width="20" height="20"></img></button>
                        <button className="buttonsTweet"><img src='https://icons-for-free.com/iconfiles/png/512/comment-1320568680107078514.png' width="15" height="15"></img></button>
                        <button className="buttonsTweet"><img src='https://icons-for-free.com/iconfiles/png/512/retweet-1324760546604918531.png' width="20" height="20"></img></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleAnswer;