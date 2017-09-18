import React from 'react';
import Cat from './Cat';
require('../css/main.css');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};
  }

  ticketSaveHandler() {
    debugger;
    console.log('Ticket Save Event Fired!');
  }

  componentDidMount() {
    console.log('componentDidMount called');
    let client = ZAFClient.init();
    client.invoke('resize', {width: '100%', height: '400px'});

    client.on('ticket.save', this.ticketSaveHandler);
  }

  render() {
    // const { product, account, ticketId } = this.props.context
    return (
      <div>
        <Cat />
        <br />
        <strong>Count: </strong><span>{ this.state.count }</span>
      </div>
    );
  }
}
