// import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Country from './components/Country';

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', goldMedalCount: 2 },
      { id: 2, name: 'China', goldMedalCount: 3 },
      { id: 3, name: 'Germany', goldMedalCount: 0 },
    ]
  }

  handleAdd = (countryId) => {
    // checking if function is connected to button
    // console.log(`Add to: ${countryId}`);

    let foundIndex = this.state.countries.findIndex(obj => obj.id === countryId);

    // checking the index associated with the countryId 
    // console.log(foundIndex);
 
    // creating a dummy copy to later assign to the current array
    let newArr = this.state.countries;

    newArr[foundIndex].goldMedalCount++;

    // checking how the newArr looks
    // console.log(newArr);

    // set the old countries array to newArr
    this.setState({countries: newArr});

    // checking to see how the modified state looks like
    // console.log(this.state.countries);
}

handleMinus = (countryId) =>{
    // checking if function is connected to button
    // console.log(`minus from: ${countryId}`);

    let foundIndex = this.state.countries.findIndex(obj => obj.id === countryId);
    
    // checking the index associated with the countryId   
    // console.log(foundIndex);
 
    // creating a dummy copy to later assign to the current array
    let newArr = this.state.countries;

    newArr[foundIndex].goldMedalCount--;

    // set the old countries array to newArr
    this.setState({countries: newArr});

}



  render(){
    console.log(this.props)
    return (
      <div className="App" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        { this.state.countries.map(country => 
        <Country
          key={ country.id}
          // id= { country.id }
          country= {country}
          onAdd={ this.handleAdd }
          onMinus={ this.handleMinus }
          // name= {country.name}
          // goldMedalCount={ country.goldMedalCount}
        />) }
      </div>
    );
  }
}

export default App;
