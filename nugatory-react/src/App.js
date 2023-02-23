// Repository:  nugatory-react
// Author:      Jeff Grissom
// Version:     1.xx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Word from './components/Word';
import Counter from './components/Counter';
import './App.css';
import NewWord from './components/NewWord';

const App = () => {

  const [words, setWords] = useState([]);
  const apiEndpoint = "https://localhost:5001/api/word";
  
  // Example of http delete 
  const handleDelete = async (wordId) => {
    const originalWords = words;
    setWords(words.filter(w => w.id !== wordId));
    try {
      await axios.delete(`${apiEndpoint}/${wordId}`);
    } catch(ex) {
      if (ex.response && ex.response.status === 404) {
        // word already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else { 
        alert('An error occurred while deleting a word');
        setWords(originalWords);
      }
    }
  }

  // example of http post
  const handleAdd = async (word, color) => {
    const { data: post } = await axios.post(apiEndpoint, { word: word, color: color });
    setWords(words.concat(post));
  }

  // example of http get
  useEffect(() => {

    // define the function here 
    async function fetchData() {
      const { data: fetchedWords } = await axios.get(apiEndpoint);
      setWords(fetchedWords);
    }

    // then here is where we call the function to execute.
    fetchData();
  }, []);

    return ( 
      <div className="App">
        <header className="App-header">
          nugatory
        </header>
        { words.map(word =>  
          <Word 
            key={ word.id } 
            word={ word } 
            onDelete={ handleDelete } />
            )}
            <Counter totalWords={ words.length } />
            <NewWord onAdd={ handleAdd } />
      </div>
     );
}
 
export default App;
