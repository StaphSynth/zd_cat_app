import Ajax from '../modules/AjaxWrapper';
import React from 'react';
import Spinner from './Spinner';

export default class Cat extends React.Component {
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
