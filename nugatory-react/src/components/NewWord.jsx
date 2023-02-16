import React, { useState, useEffect } from 'react';

const NewWord = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [word, setWord] = useState('');
  const [color, setColor] = useState('#000000');

  // toggleForm = () => {
  //   const { showForm } = this.state;
  //   this.setState({ showForm : !showForm });
  //   if (showForm) {
  //     this.setState({ word: '', color: '#000000' });
  //   }
  // }

  // handleChange = (e) => this.setState({ [e.target.name]: e.target.value});

  const saveWord = () => {
    props.onAdd(word, color);
    setShowForm(false);
  }

  useEffect(() => {
    // this "hook" is called whenever showForm value changes
    setWord('');
    setColor('#000000');
  }, [showForm]);

  return (
    <div className='New-word'>
      {
        (showForm) ?
          <form>
            <input
              type="text"
              id="word"
              name="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Word"
              autoFocus
              autoComplete="off" />
            <input
              type="color"
              id="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color"
              autoComplete="off" />
            <button
              disabled={word.trim().length === 0}
              onClick={saveWord}
              type="button">
              Save
            </button>
            <button onClick={() => setShowForm(false)} type="button">Cancel</button>
          </form>
          :
          <span onClick={() => setShowForm(true)} className='Toggle-form'>New Word</span>
      }
    </div>
  );
}

export default NewWord;