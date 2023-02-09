// import logo from './logo.svg';
import { Badge } from '@mui/material';
import { Component } from 'react';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
      { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
      { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
    ],
    totalMedalsCount: 0,
  }

  componentDidMount() {
    this.calcAllCountriesMedals();
  }

  handleAdd = (countryId, medalType) => {

    const countriesArrCopy = this.state.countries;

    let countryIndex = this.state.countries.findIndex(country => country.id === countryId);

    switch (medalType) {
      case "Gold":
        countriesArrCopy[countryIndex].gold++;
        break;
      case "Silver":
        countriesArrCopy[countryIndex].silver++;
        break;
      case "Bronze":
        countriesArrCopy[countryIndex].bronze++;
        break;
      default:
        console.log("Medals didn't change");
    }

    this.setState({ countries: countriesArrCopy });
    this.calcAllCountriesMedals();

  }

  handleMinus = (countryId, medalType) => {
    const countriesArrCopy = this.state.countries;

    let countryIndex = this.state.countries.findIndex(country => country.id === countryId);

    switch (medalType) {
      case "Gold":
        countriesArrCopy[countryIndex].gold--;
        break;
      case "Silver":
        countriesArrCopy[countryIndex].silver--;
        break;
      case "Bronze":
        countriesArrCopy[countryIndex].bronze--;
        break;
      default:
        console.log("Medals didn't change");
    }

    this.setState({ countries: countriesArrCopy });
    this.calcAllCountriesMedals();

  }


  calcAllCountriesMedals = () => {
    let allCountriesMedals = 0;
    this.state.countries.forEach(country => {
      allCountriesMedals += (country.gold + country.silver + country.bronze);
    })
    this.setState({ totalMedalsCount: allCountriesMedals });
  }

  stripAllMedals = (countryId) => {
    const countriesArrCopy = [...this.state.countries];

    let countryLocated = countriesArrCopy.findIndex(country => country.id === countryId);

    countriesArrCopy[countryLocated].gold = 0;
    countriesArrCopy[countryLocated].silver = 0;
    countriesArrCopy[countryLocated].bronze = 0;

   this.setState({countries: countriesArrCopy});
   this.calcAllCountriesMedals();
    
  }

  handleAddCountry = (newCountryName) => {
    const countriesArrCopy = this.state.countries;
    const foundExistingCountry = countriesArrCopy.find(country => country.name.toUpperCase() === newCountryName.toUpperCase());

    if(foundExistingCountry == null){
      const id = countriesArrCopy.length === 0 ? 1 : Math.max(...countriesArrCopy.map(countriesArrCopy => countriesArrCopy.id)) + 1;
      const mutableCountriesArr = countriesArrCopy.concat({id: id, name: newCountryName, gold: 0, silver: 0, bronze: 0});
      this.setState({countries: mutableCountriesArr});
    }
    else{
        alert("Country already exists. Enter a new country.");
    }
  }

  handleDeleteCountry = (countryId) => {
    const countries = this.state.countries.filter(country => country.id !== countryId);
    this.setState({countries: countries});
  }

  render() {
    // console.log(this.props)
    return (
      <div className="App" style={{
        display: 'block',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <div className='AppHeader'>
          <h2>
            <Badge badgeContent={this.state.totalMedalsCount}
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

          {this.state.countries.map(country =>
            <Country
              key={country.id}
              id={country.id}
              name={country.name}
              gold={country.gold}
              silver={country.silver}
              bronze={country.bronze}
              onAdd={this.handleAdd}
              onMinus={this.handleMinus}
              onStripMedals={this.stripAllMedals}
              onDeleteCountry={this.handleDeleteCountry}
            />)}
        </div>
          <NewCountry onAddCountry = {this.handleAddCountry}/>
      </div>
    );
  }
}

export default App;
