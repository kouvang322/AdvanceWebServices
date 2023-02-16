// Repository:  nugatory-react
// Author:      Jeff Grissom
// Version:     1.xx
import React, { useState, useEffect } from 'react';
import Word from './components/Word';
import Counter from './components/Counter';
import './App.css';
import NewWord from './components/NewWord';

const App = () => {

  const [words, setWords] = useState([]);
  // state = {
  //   words: [
  //     { id: 1, word: 'banana', color: 'yellow' },
  //     { id: 2, word: 'apple', color: 'red' },
  //     { id: 3, word: 'lime', color: 'green' },
  //   ]
  // }
  const handleDelete = (wordId) => {
    const mutableWords = words.filter(w => w.id !== wordId);
    setWords(mutableWords);
  }

  const handleAdd = (word, color) => {
    const id = words.length === 0 ? 1 : Math.max(...words.map(word => word.id)) + 1;
    const mutableWords = words.concat({ id: id, word: word, color: color });
    setWords(mutableWords);
  }

  // componentDidMount() {
  //   console.log("App mounted");
  // }
  // this is the functional equivalent to componentDidMount
  useEffect(() => {
    let mutableWords = [
      { id: 1, word: 'banana', color: 'yellow' },
      { id: 2, word: 'apple', color: 'red' },
      { id: 3, word: 'lime', color: 'green' },
      { id: 4, word: 'orange', color: 'orange' },
    ]
    setWords(mutableWords);
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
