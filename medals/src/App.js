// import { Component } from 'react';
import React, {useState, useEffect} from 'react';
import { Badge } from '@mui/material';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [totalMedalsCount, setTotalMedalsCount] = useState(0);

  useEffect(() => {
    let fetchedCountries = [
      { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
      { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
      { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
    ]
    setCountries(fetchedCountries);
  }, []);

  useEffect(() => {
    calcAllCountriesMedals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries])


  const handleAdd = (countryId, medalType) => {
    
    let countryIndex = countries.findIndex(country => country.id === countryId);

    switch (medalType) {
      case "Gold":
        countries[countryIndex].gold++;
        break;
      case "Silver":
        countries[countryIndex].silver++;
        break;
      case "Bronze":
        countries[countryIndex].bronze++;
        break;
      default:
        console.log("Medals didn't change");
    }

    setCountries(countries);
    calcAllCountriesMedals();

  }

  const handleMinus = (countryId, medalType) => {

    let countryIndex = countries.findIndex(country => country.id === countryId);

    switch (medalType) {
      case "Gold":
        countries[countryIndex].gold--;
        break;
      case "Silver":
        countries[countryIndex].silver--;
        break;
      case "Bronze":
        countries[countryIndex].bronze--;
        break;
      default:
        console.log("Medals didn't change");
    }

    setCountries(countries);
    calcAllCountriesMedals();
  }


  const calcAllCountriesMedals = () => {
    let allCountriesMedals = 0;
    countries.forEach(country => {
      allCountriesMedals += (country.gold + country.silver + country.bronze);
    })
    setTotalMedalsCount(allCountriesMedals);
  }

  const stripAllMedals = (countryId) => {

    let countryLocated = countries.findIndex(country => country.id === countryId);

    countries[countryLocated].gold = 0;
    countries[countryLocated].silver = 0;
    countries[countryLocated].bronze = 0;

   setCountries(countries);
   calcAllCountriesMedals();
    
  }

  const handleAddCountry = (newCountryName) => {
    const foundExistingCountry = countries.find(country => country.name.toUpperCase() === newCountryName.toUpperCase());

    if(foundExistingCountry == null){
      const id = countries.length === 0 ? 1 : Math.max(...countries.map(countries => countries.id)) + 1;
      setCountries(countries.concat({id: id, name: newCountryName, gold: 0, silver: 0, bronze: 0}));
    }
    else{
        alert("Country already exists. Enter a new country.");
    }
  }

  const handleDeleteCountry = (countryId) => {
    const countriesAfterDelete = countries.filter(country => country.id !== countryId);
    setCountries(countriesAfterDelete);
  }

    return (
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
              onDeleteCountry={handleDeleteCountry}
            />)}
        </div>
          <NewCountry onAddCountry = {handleAddCountry}/>
      </div>
    );
}

export default App;
