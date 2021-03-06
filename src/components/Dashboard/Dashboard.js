import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import history from '../../history.js';

import useAuth from '../useAuth.js';

import Profile from '../Profile/Profile.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import ArtistPage from '../ArtistPage/ArtistPage.js';
import AlbumPage from '../AlbumPage/AlbumPage.js';
import PlaylistPage from '../PlaylistPage/PlaylistPage.js';
import Home from '../Home/Home.js';

import getSearchResults from '../../actions/getSearchResults.js';
import getUserData from '../../actions/getUserData.js';

import './Dashboard.scss';

const Dashboard = ({ getSearchResults, searchResults, getUserData, getAccessToken }) => {
  const [ avatar, setAvatar ] = useState();
  const [ userData, setUserData ] = useState({});
  const loginCode = useSelector( state => state.getLoginCode );
  const accessToken = useAuth( loginCode );

  useEffect(function() {

    if (!accessToken) return;
    getUserData(accessToken);
    getAccessToken(accessToken);
    fetchUserData();

  }, [ accessToken ]);

  const fetchUserData = async () => {
    await axios('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      setUserData(res.data);
      setAvatar(res.data.images[0].url);
      sessionStorage.setItem('currentUser', JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const fetchSearchResults = (query) => {
    getSearchResults(query, accessToken);
    history.push(`/search/${query}`);
  }

  return (
    <section id='dashboard-container'>
      <div id='dashboard-sidebar' className='dashboard-card'>
        <div id='dashboard-profile'>
          <img src={avatar} alt='avatar'></img>
          <h1>{userData.display_name}</h1>
        </div>
        <SearchBar onSubmit={fetchSearchResults}/>
        <div id='dashboard-controls'>
          <Link to='/' className='dashboard-link'>
            <span className="material-icons">
              home
            </span>
            Home
          </Link>
          <Link to='/profile' className='dashboard-link'>
            <span className="material-icons">
              person
            </span>
            My Profile
          </Link>
        </div>
      </div>
      <div id='dashboard-panel' className='dashboard-card'>
        <Route path='/' exact>
          <Home userData={userData} token={accessToken}/>
        </Route>
        <Route path='/profile' exact>
          <Profile token={accessToken}/>
        </Route>
        {/* <Route path='/profile' exact component={Profile} /> */}
        <Route path='/search/:query' exact>
          <SearchResults results={searchResults} />
        </Route>
        <Route path='/album/:id' exact component={AlbumPage} />
        <Route path='/artists/:id' exact component={ArtistPage} />
        <Route path='/playlist/:id' exact component={PlaylistPage} />
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.getSearchResults,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchResults: (query, token) => dispatch(getSearchResults(query, token)),
  getAccessToken: (token) => dispatch({ type: 'GET_ACCESS_TOKEN', payload: token }),
  getUserData: (token) => dispatch(getUserData(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
