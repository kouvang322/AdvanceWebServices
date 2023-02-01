// import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Country from './components/Country';

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3},
      { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0},
      { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2},
    ],
    countries2: [
      { id: 4, name: 'Japan', 
      medals: [
        {gold: 0, metalType: "gold"}, 
        {silver: 2, metalType: "silver"}, 
        {bronze: 2, metalType: "bronze"}
      ]},
      { id: 5, name: 'Korea', 
      medals: [
        {gold: 1, metalType: "gold"}, 
        {silver: 4, metalType: "silver"}, 
        {bronze: 6, metalType: "bronze"}
      ]},
      { id: 6, name: 'Thailand', 
      medals: [
        {gold: 5, metalType: "gold"}, 
        {silver: 3, metalType: "silver"}, 
        {bronze: 2, metalType: "bronze"}
      ]},
    ]
  }

  handleAdd = (countryId) => {
    // checking if function is connected to button
    // console.log(`Add to: ${countryId}`);

    let foundIndex = this.state.countries.findIndex(country => country.id === countryId);

    // checking the index associated with the countryId 
    // console.log(foundIndex);

    // creating a dummy copy to later assign to the current array
    let newArr = this.state.countries;

    newArr[foundIndex].gold++;

    // checking how the newArr looks
    // console.log(newArr);

    // set the old countries array to newArr
    this.setState({ countries: newArr });

    // checking to see how the modified state looks like
    // console.log(this.state.countries);
  }

  handleMinus = (countryId) => {
    // checking if function is connected to button
    // console.log(`minus from: ${countryId}`);

    let foundIndex = this.state.countries.findIndex(country => country.id === countryId);

    // checking the index associated with the countryId   
    // console.log(foundIndex);

    // creating a dummy copy to later assign to the current array
    let newArr = this.state.countries;

    newArr[foundIndex].gold--;

    // set the old countries array to newArr
    this.setState({ countries: newArr });

  }

  // in class to not have so many methods
  // increaseMedalCount = (countryId, medalName) => {
  //   // which country should I increase & which type of medal

  // }

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
            <strong>
              Olympic Medals
            </strong>
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
              key = {country.id}
              id= { country.id }
              name = {country.name}
              gold = { country.gold}
              silver = { country.silver}
              bronze = { country.bronze}
              onAdd={this.handleAdd}
              onMinus={this.handleMinus}
              // country={country}
              // onIncrease = {this.increaseMedalCount}
            />)}
        </div>

      </div>
    );
  }
}

export default App;
