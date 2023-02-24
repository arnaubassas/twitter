import { useEffect, useState } from "react"
import Tweets from './components/Tweets';
import style from './style.css';
import Post from "./components/post";
import { Container } from "@mui/material";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Search from "./components/search"

function Twitter() {
  const [tweets, setTweets] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  function onChangeSearch(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <Container>
      <div className="App">
        <section className='left'>
          <div className="button">
            <a href="http://localhost:3000/home"><button className="logo"><img src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c53e.png" width='35' height='35' ></img></button></a>
          </div>
          <div className="button">
            <button onClick={() => alert("not work")} className="Explore"><div className="insidebutton"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Hash-transbg.svg/1200px-Hash-transbg.svg.png" width='25' height='20'></img><span>&nbsp;Explore</span></div></button>
          </div>
          <div className="button">
            <button onClick={() => alert("not work")} className="Settings"><div className="insidebutton"><img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" width='20' height='20'></img> <span>&nbsp; Settings</span></div></button>
          </div>
        </section>

        <section className='middle'>
          <div className="Search">
            <form onSubmit={handleSubmit}>
              <input className="SearchIn" size="small" type="text" placeholder="Search" name='search' value={search} onChange={onChangeSearch} autoComplete='off'></input>
              <button type='submit' className="Searchbutton" variant="contained"></button>
            </form>
          </div>
          <div className="Cell">
            <Routes>
              <Route path='/home' element={<Tweets />} />
              <Route path='/:id' element={<Post />} />
              <Route path='/search/:search' element={<Search search={search} />} />
            </Routes>
          </div>
        </section>
        <section className="lane laneright"></section>
        <section className='right'>
          <div className="boxright">This part will work soon</div>
          <div className="Copyright"> © Twitter, Inc.</div>
        </section>
      </div>
    </Container>
  );
}

export default Twitter;
