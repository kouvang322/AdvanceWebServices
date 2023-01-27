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
          name= {country.name}
          goldMedalCount={ country.goldMedalCount}
        />) }
      </div>
    );
  }
}

export default App;
