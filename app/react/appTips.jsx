import React from 'react';
import Reflux from 'reflux';
import * as _  from 'lodash';
import { Router, Route, Link } from 'react-router';
// import * as marked from 'marked';
var marked = require( "marked" );

import AppNavBar from './appNavBar.jsx';

var TipsActions = Reflux.createActions([
  "calculateResult",
  "clearInput",
  "viewHistory"
]);

var CalculatorStore = Reflux.createStore({
  listenables: [TipsActions],

  onCalculateResult: function(label){
    let result = eval(label);
    console.log("calculate result:");
  },
});

var NoteHeader = React.createClass({
  listenables: [TipsActions],
  handleValueChange: function(evt) {
    var text = evt.target.value;
    //We pressed enter, calculate the result
    if (evt.which === 13 && text) {
      // TipsActions.calculateResult(text);
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

var TipsBody = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },


  render: function(){
      return(
        <div>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
  }
});


var TipsApp = React.createClass({
  // this will cause setState({list:updatedlist}) whenever the store does trigger(updatelist)
  // mixins: [Reflux.connect(NoteListStore, "list")],

  render: function() {
    return(
      <div>
        <NoteHeader />
        <TipsBody>
          # Cheatsheets
          ## git
          ## rails
          ## yeoman
          ## react
          ## markdown
        </TipsBody>
      </div>
    );
    // return <h1>Hello react {this.props.name}</h1>;
  }
});

export default TipsApp;
