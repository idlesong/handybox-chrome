import React from 'react';
import Reflux from 'reflux';
import * as _  from 'lodash';

import AppNavBar from './appNavBar.jsx';

var NoteHeader = React.createClass({
  // listenables: [CalculatorActions],
  handleValueChange: function(evt) {
    var text = evt.target.value;
    //We pressed enter, calculate the result
    if (evt.which === 13 && text) {
      // CalculatorActions.calculateResult(text);
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

var DictionaryApp = React.createClass({

  render: function() {
    let title = "DictionaryApp";
    return (
      <div>
        <NoteHeader />
        <h1>Hello {title}</h1>
      </div>
    );
  }
});

export default DictionaryApp ;
