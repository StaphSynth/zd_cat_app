import React from 'react'
import Ajax from '../lib/AjaxWrapper';

class App extends React.Component {
  render() {
    const { product, account, ticketId } = this.props.context
    return (
      <Cat />
    );
  }
}

class Cat extends React.Component {
  constructor(props) {
    super(props);

    this.getCat = this.getCat.bind(this);
    this.state = {cat: null};
    this.getCat();
  }

  getCat() {
    Ajax.get({
      url: 'https://thecatapi.com/api/images/get',
      data: {
        size: 'small',
        format: 'html',
        type: 'jpg,gif,png',
      },
      return: 'html',
      success: (response) => { this.setState({cat: response}); },
      failure: (response) => { console.log('Cat API failure', response); }
    });
  }

  render() {
    let cat = this.state.cat;

    return (
      <div>
        <div dangerouslySetInnerHTML={ cat ? {__html: cat} : {__html: '<p>Waiting for your cat...</p>'} }></div>
        <button onClick={ this.getCat }>New cat!</button>
      </div>
    );
  }
}

export default App
