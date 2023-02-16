import React, { useLayoutEffect, useRef } from 'react';

const Word = (props) => {
  const wordEl = useRef();
  
  const {onDelete, word} = props;
  // helper method
  const renderColor = (color) => (color === undefined || color === null ? 'black' : color);

  // // return random number between min & max
  // getRandomNumber = (min, max) => Math.random() * (max - min) + min;
  // // return random number between 0 and window height
  // getRandomTop = (height) => parseInt(this.getRandomNumber(0, window.innerHeight - height));
  // // return random number between 0 and window width
  // getRandomLeft = (width) => parseInt(this.getRandomNumber(0, window.innerWidth - width));
  const getRandomInt = (min, max) => parseInt(Math.random() * (max - min) + min);

  // componentDidMount() {
  //   const el = this.wordEl.current;
  //   el.style.top = this.getRandomTop(el.clientHeight) + 'px';
  //   el.style.left = this.getRandomLeft(el.clientWidth) + 'px';
  // }
  useLayoutEffect(() => {
    const el = wordEl.current;
    el.style.top = getRandomInt(0, window.innerHeight - el.clientHeight) + 'px';
    el.style.left = getRandomInt(0, window.innerWidth - el.clientWidth) + 'px';
    console.log(`hello, ${word.word}`);
    // this is equivalent to componentWillUnmount
    return () => {
      console.log(`goodbye, ${word.word}`);
    }
  }, [wordEl, word.word])

  return (
    <div ref={wordEl} id={ word.id } onClick={ () => onDelete(word.id) } className='Word' style={{ color: renderColor(word.color) }}>
      { word.word }
    </div>
  );
}

export default Word
