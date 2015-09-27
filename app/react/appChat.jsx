import React from 'react';
import Reflux from 'reflux';
import * as _  from 'lodash';
import { Router, Route, Link } from 'react-router';

import AppNavBar from './appNavBar.jsx';

var ChatActions = Reflux.createActions([
  "calculateResult",
  "clearInput",
  "viewHistory"
]);

var CalculatorStore = Reflux.createStore({
  listenables: [ChatActions],

  onCalculateResult: function(label){
    let result = eval(label);
    console.log("calculate result:");
  },
});


var NoteHeader = React.createClass({
  // listenables: [CalculatorActions],
  handleValueChange: function(evt) {
    var text = evt.target.value;
    //We pressed enter, calculate the result
    if (evt.which === 13 && text) {
      CalculatorActions.calculateResult(text);
      evt.target.value = text + ' = ' + eval(text);
    }
    //We pressed escape, clear the input area
    else if (evt.which === 27) {
      evt.target.value = '';
    }
  },
  render: function() {
    return (
      <header id="header">
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1"><i className="fa fa-sticky-note-o"></i></span>
          <input id="new-note" className="form-control" placeholder="keyin something ..." autoFocus onKeyUp={this.handleValueChange} />
        </div>

        <AppNavBar />
      </header>
    );
  }
});

var ChatBox = React.createClass({
  render: function(){
    return(
      <div>
        <NoteHeader />
        <UsersList />
        <MessagesList />
        <MessageInput ref="MessageInput" messageHandler={this.messageHandler}></MessageInput>
      </div>
    );
  }
});

var UsersList = React.createClass({
  render: function(){
    return(<h1>Users list</h1>);
  }
})

var MessagesList = React.createClass({
  getInitialState: function(){
    return { messages: []};
  },

  addMessage: function(message){
    var messages = this.state.message;
    var container = this.refs.messageContainer.getDOMNode();
    messages.push(message);
    this.setState({ messages: messages});

    // Smart scrolling
    if(container.scrollHeight -(container.scrollTop + container.offsetHeight) >= 50){
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  },
  render: function(){
    var messages;
    // messages = this.state.messages.map(function(m)) {
    //   return(<ChatMessage message={m}></ChatMessage>);
    // };
    // if (!messages.length) {
      messages = <div className="chat-no-messages">No messages</div>
    // };
    return (<div ref="">{messages}</div>);
  }
});

var MessageItem = React.createClass({
  render: function(){
    return;
  }
});

var MessageInput = React.createClass({
  keyHandler: function(event){
    var msg = this.state.message.trim();
    if(event.keyCode === 13 && msg.length){
      this.props.messageHandler(msg);
      this.setState({ message: ''});
    }
  },
  render: function(){
    return(<p>Message input</p>);
    // return(
    //   <input type="text" className="form-control" placeholder="Enter a message"
    //     valueLink{this.linkState("message")} onKeyUp={this.keyHandler} />
    // );
  }
});


var ChatApp = React.createClass({
  // this will cause setState({list:updatedlist}) whenever the store does trigger(updatelist)
  // mixins: [Reflux.connect(NoteListStore, "list")],

  render: function() {
    return(
      <div>
        <ChatBox />
        <h1> Hi, chat app</h1>
      </div>
    );
    // return <h1>Hello react {this.props.name}</h1>;
  }
});

export default ChatApp;
