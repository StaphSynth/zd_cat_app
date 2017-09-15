import React from 'react'
import Ajax from '../lib/AjaxWrapper';

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
    let size = {maxWidth: '250px', maxHeight: '250px'};

    return (
      <div>
        <div>
          { cat ? <img src={ this.getSrc(cat) } style={ size } /> : <Spinner /> }
        </div>
        <button onClick={ this.getCat }>New cat!</button>
      </div>
    );
  }
}

class Spinner extends React.Component {
  render() {
    let style = {
      margin: '0.5em',
      border: '3px solid grey',
      borderTop: '3px solid dodgerblue',
      borderRadius: '50%',
      animation: 'spin 1s infinite linear',
      height: '30px',
      width: '30px'
    };
    
    return <div style={ style } />
  }
}

export default App
