import React, { Component } from 'react';

class Word extends Component {
  state = {
    word: 'banana',
    color: 'yellow',
  }
  // helper method
  renderColor(color) {
    return (color === undefined || color === null ? 'black' : color);
  }
  handleClick = () => {
    // convert the function to an arrow function
    // arrow functions inherit 'this' keyword
    console.log(this.state.color);
    // the setState method is inherited from the base Component class
    // when a component's state is altered, it is re-rendered asynchronously by react
    this.setState({ color: 'black' })
  }
  render() { 
    return (
    <div onClick={ this.handleClick } className='Word' style={{ color:this.renderColor(this.state.color) }}>
        { this.state.word }
      </div>
    );
  }
}

export default Word
