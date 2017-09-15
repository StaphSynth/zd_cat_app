import React from 'react'
import Ajax from '../modules/AjaxWrapper';
require('../css/main.css');

class App extends React.Component {
  componentDidMount() {
    let client = ZAFClient.init();
    client.invoke('resize', { width: '300px', height: '400px' });
  }

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
  }

  componentDidMount() {
    this.getCat();
  }

  getCat() {
    this.setState({cat: null}, () => {
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
    });
  }

  //strips the src of the img from the returned html
  getSrc(html) {
    return html.match(/src="(.+)"/)[1];
  }

  render() {
    let cat = this.state.cat;

    return (
      <div>
        <div className="cat-container">
          { cat ? <img className="cat" src={ this.getSrc(cat) } /> : <Spinner /> }
        </div>
        <button onClick={ this.getCat }>New cat!</button>
      </div>
    );
  }
}

class Spinner extends React.Component {
  render() {
    return <div className="spinner"/>
  }
}

export default App
