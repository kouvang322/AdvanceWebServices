// import { Component } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Login from './components/Login';
import { Badge } from '@mui/material';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [connection, setConnection] = useState(null);
  const [totalMedalsCount, setTotalMedalsCount] = useState(0);


  // const apiBaseEndpoint = "https://medals-api-kvang36.azurewebsites.net/api/country"
  const apiBaseEndpoint = "https://medals-api-kvang36.azurewebsites.net/jwt/api/country"
  const hubEndpoint = "https://medals-api-kvang36.azurewebsites.net/medalsHub"
  const usersEndpoint = "https://medals-api-kvang36.azurewebsites.net/api/users/login";


  // local development
  // const apiBaseEndpoint = "https://localhost:5001/api/country";
  // const apiBaseEndpoint = "https://localhost:5001/jwt/api/country";
  // const hubEndpoint = "https://localhost:5001/medalsHub"
  // const usersEndpoint = "https://localhost:5001/api/users/login";

  const [ user, setUser ] = useState(
    {
      name: null,
      canPost: false,
      canPatch: false,
      canDelete: false
    }
  );

  const latestCountries = useRef(null);
  // latestCountries.current is a ref variable to countries
  // this is needed to access state variable in useEffect w/o dependency
  latestCountries.current = countries;

  // Hardcoded Data locally
  // useEffect(() => {
  //   let fetchedCountries = [
  //     { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
  //     { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
  //     { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
  //   ]
  //   setCountries(fetchedCountries);
  // }, []);

  // Using Swagger to pull Data from Api
  useEffect(() => {
    async function fetchData() {
      const { data: fetchedCountries } = await axios.get(apiBaseEndpoint);
      setCountries(fetchedCountries);
    }

    fetchData();

    const encodedJwt = localStorage.getItem("token");
    // check for existing token
    if (encodedJwt) {
      setUser(getUser(encodedJwt));
    }

    // signalR
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubEndpoint)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

  }, []);

  // componentDidUpdate (changes to connection)
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected!')

          connection.on('ReceiveAddMessage', country => {
            console.log(`Add: ${country.name}`);

            let mutableCountries = [...latestCountries.current];
            mutableCountries = mutableCountries.concat(country);

            setCountries(mutableCountries);
          });

          connection.on('ReceiveDeleteMessage', id => {
            console.log(`Delete id: ${id}`);

            let mutableCountries = [...latestCountries.current];
            mutableCountries = mutableCountries.filter(c => c.id !== id);

            setCountries(mutableCountries);
          });

          connection.on('ReceivePatchMessage', country => {
            console.log(`Patch: ${country.name}`);

            let mutableCountries = [...latestCountries.current];
            const idx = mutableCountries.findIndex(c => c.id === country.id);
            mutableCountries[idx] = country;

            setCountries(mutableCountries);
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
    // useEffect is dependent on changes connection
  }, [connection]);

  useEffect(() => {
    calcAllCountriesMedals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries])


  const handleAdd = (countryId, medalType) => {
    handleUpdate(countryId, medalType, 1);

  }

  const handleMinus = (countryId, medalType) => {
    handleUpdate(countryId, medalType, -1);
  }

  const handleUpdate = async (countryId, medalType, change) => {

    // let originalCountries = countries;
    let mutableCountries = [...countries];

    let countryIndex = mutableCountries.findIndex(country => country.id === countryId);

    switch (medalType) {
      case "Gold":
        mutableCountries[countryIndex].gold += (1 * change);
        break;
      case "Silver":
        mutableCountries[countryIndex].silver += (1 * change);
        break;
      case "Bronze":
        mutableCountries[countryIndex].bronze += (1 * change);
        break;
      default:
        console.log("Medals didn't change");
    }

    setCountries(mutableCountries);
    calcAllCountriesMedals();

    let medalToUpdate = medalType.toLowerCase();

    const jsonPatch = [{ op: "replace", path: medalToUpdate, value: mutableCountries[countryIndex][medalToUpdate] }];

    try {
      await axios.patch(`${apiBaseEndpoint}/${countryId}`, jsonPatch, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("The record does not exist - it may have been deleted");
      } else if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
        // in order to restore the defualt medal counts, we would need to save 
        // the page value and saved value for each medal (like in the advanced example)
        alert('You are not authorized to complete this request');
        // to simplify, I am reloading the page instead
        window.location.reload(false);
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
      }
    }
  }

  const calcAllCountriesMedals = () => {
    let allCountriesMedals = 0;
    countries.forEach(country => {
      allCountriesMedals += (country.gold + country.silver + country.bronze);
    })
    setTotalMedalsCount(allCountriesMedals);
  }

  const stripAllMedals = async (countryId) => {

    // let originalCountries = countries;
    let mutableCountries = [...countries];

    let countryLocated = mutableCountries.findIndex(country => country.id === countryId);

    mutableCountries[countryLocated].gold = 0;
    mutableCountries[countryLocated].silver = 0;
    mutableCountries[countryLocated].bronze = 0;

    setCountries(mutableCountries);
    calcAllCountriesMedals();

    // console.log(mutableCountries[countryLocated]);

    const jsonPatch = [{ op: "replace", path: 'gold', value: 0 },
    { op: "replace", path: 'silver', value: 0 },
    { op: "replace", path: 'bronze', value: 0 }];

    try {
      await axios.patch(`${apiBaseEndpoint}/${countryId}`, jsonPatch, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("The record does not exist - it may have been deleted");
      } else if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
        // in order to restore the defualt medal counts, we would need to save 
        // the page value and saved value for each medal (like in the advanced example)
        alert('You are not authorized to complete this request');
        // to simplify, I am reloading the page instead
        window.location.reload(false);
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
      }
    }

  }

  // Local code to add a country
  // const handleAddCountry = (newCountryName) => {
  //   const foundExistingCountry = countries.find(country => country.name.toUpperCase() === newCountryName.toUpperCase());

  //   if(foundExistingCountry == null){
  //     const id = countries.length === 0 ? 1 : Math.max(...countries.map(countries => countries.id)) + 1;
  //     setCountries(countries.concat({id: id, name: newCountryName, gold: 0, silver: 0, bronze: 0}));
  //   }
  //   else{
  //       alert("Country already exists. Enter a new country.");
  //   }
  // }

  // Code to add new country to Api data
  const handleAddCountry = async (newCountryName) => {
    const foundExistingCountry = countries.find(country => country.name.toUpperCase() === newCountryName.toUpperCase());

    if (foundExistingCountry == null) {
      // const { data: post } = await axios.post(apiBaseEndpoint, { name: newCountryName, gold: 0, silver: 0, bronze: 0});
      // setCountries(countries.concat(post));
      // await axios.post(apiBaseEndpoint, { name: newCountryName, gold: 0, silver: 0, bronze: 0});
      try {
        // await axios.post(apiBaseEndpoint, { name: newCountryName, gold: 0, silver: 0, bronze: 0 });
        await axios.post(apiBaseEndpoint, { name: newCountryName, gold: 0, silver: 0, bronze: 0 
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } catch (ex) {
        if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
          alert("You are not authorized to complete this request");
        } else if (ex.response) {
          console.log(ex.response);
        } else {
          console.log("Request failed");
        }
      }
    }
    else {
      alert("Country already exists. Enter a new country.");
    }
  }

  // Local code to delete
  // const handleDeleteCountry = (countryId) => {
  //   const countriesAfterDelete = countries.filter(country => country.id !== countryId);
  //   setCountries(countriesAfterDelete);
  // }

  // code to delete from Api data 
  const handleDeleteCountry = async (countryId) => {
    const originalCountries = countries;
    setCountries(countries.filter(c => c.id !== countryId));
    try {
      await axios.delete(`${apiBaseEndpoint}/${countryId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("The country does not exist - it may have already been deleted");
      } else {
        setCountries(originalCountries);
        if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
          alert("You are not authorized to complete this request");
        } else if (ex.response) {
          console.log(ex.response);
        } else {
          console.log("Request failed");
        }
      }
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const resp = await axios.post(usersEndpoint, { username: username, password: password });
      const encodedJwt = resp.data.token;
      localStorage.setItem('token', encodedJwt);
      setUser(getUser(encodedJwt));
    } catch (ex) {
      if (ex.response && (ex.response.status === 401 || ex.response.status === 400 )) {
        alert("Login failed");
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
      }
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('logout');
    localStorage.removeItem('token');
    setUser({
      name: null,
      canPost: false,
      canPatch: false,
      canDelete: false
    });
    return false;
  }

  const getUser = (encodedJwt) => {
    // return unencoded user / permissions
    const decodedJwt = jwtDecode(encodedJwt);
    return {
      name: decodedJwt['username'],
      canPost: decodedJwt['roles'].indexOf('medals-post') === -1 ? false : true,
      canPatch: decodedJwt['roles'].indexOf('medals-patch') === -1 ? false : true,
      canDelete: decodedJwt['roles'].indexOf('medals-delete') === -1 ? false : true,
    };
  }

  return (
    <Router>
      <div className="App" style={{
        display: 'block',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <div className='AppHeader'>
          <h2>
            <Badge badgeContent={totalMedalsCount}
              color="primary"
              showZero>
              <strong>
                Olympic Medals
              </strong>
            </Badge>
          </h2>
        </div>

        {user.name ? 
          <span className='logout'><a href="/" onClick={handleLogout} className='logoutLink'>Logout</a> [{user.name}]</span>
          :
          <Link to="/login" className='loginLink'>Login</Link>
        }
        <Route exact path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <div style={
          {
            display: 'flex',
            justifyContent: 'center',
          }
        }>
          {countries.map(country =>
            <Country
              key={country.id}
              id={country.id}
              name={country.name}
              gold={country.gold}
              silver={country.silver}
              bronze={country.bronze}
              onAdd={handleAdd}
              onMinus={handleMinus}
              onStripMedals={stripAllMedals}
              canPatch={ user.canPatch }
              canDelete={ user.canDelete }
              onDeleteCountry={handleDeleteCountry}
            />)}
        </div>
        { user.canPost && <NewCountry onAddCountry={handleAddCountry} /> }
      </div>
    </Router>
  );
}

export default App;
