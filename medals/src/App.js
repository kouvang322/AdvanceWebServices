// import logo from './logo.svg';
import './App.css';
import Country from './components/Country';

function App() {
  return (
    <div className="App" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
        <Country />
    </div>
  );
}

export default App;
