import React from 'react';
import Reflux from 'reflux';
import * as _  from 'lodash';
import { Router, Route, Link } from 'react-router';

import AppNavBar from './appNavBar.jsx';

var noteCounter = 0, localStorageKey = "note";

function getItemByKey(list, itemKey) {
  return _.find(list, function(item){
    return item.key === itemKey;
  });
}

var NoteActions = Reflux.createActions([
  "toggleItem",
  "toggleAllItem",
  "addItem",
  "removeItem",
  "clearCompleted",
  "editItem"
]);

var NoteListStore = Reflux.createStore({
  listenables: [NoteActions],
  onAddItem: function(label) {
    this.updateList([{
      key: noteCounter++,
      created: new Date(),
      isComplete: false,
      label: label
    }].concat(this.list));
    console.log("add item!");
  },
  updateList: function(list){
    localStorage.setItem(localStorageKey, JSON.stringify(list));
    this.list = list;
    this.trigger(list);
  },
  getInitialState: function() {
    var loadedList = localStorage.getItem(localStorageKey);
    if (!loadedList) {
      this.list = [{
        key: noteCounter++,
        created: new Date(),
        isComplete: false,
        label: 'Rule the web'
      }];
    } else {
      this.list = _.map(JSON.parse(loadedList), function(item) {
        item.key = noteCounter++;
        return item;
      });
    }
    return this.list;
  }
});

var NoteItem = React.createClass({
  render: function(){
    return (
      <li className="list-group-item">
        <div className="view">
          <label onDoubleClick={this.handleEditStart}>{this.props.label}</label>
          <button className="distroy" onClick={this.handleDestroy}></button>
        </div>
      </li>
    )
  }
});

var NoteHeader = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    id: React.PropTypes.number
  },
  handleValueChange: function(evt) {
    var text = evt.target.value;
    //We pressed enter, if text isn't empty we blur the field which will cause a save
    if (evt.which === 13 && text) {
      NoteActions.addItem(text);
      evt.target.value = '';
    }
    //We pressed escape, set editing to false before blurring so we won't save
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

        <div>
          <AppNavBar />
        </div>

        <h4> Notes </h4>

      </header>
    );
  }
});

var NoteMain = React.createClass({
  propTypes: {
    list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  },
  render: function() {
    var filteredList = this.props.list;
    return (
      <section id="main" >
          <ul id="todo-list" className="list-group">
              { filteredList.map(function(item){
                  return <NoteItem label={item.label}  id={item.key} key={item.key}/>;
              })}
          </ul>

          <input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
          <label htmlFor="toggle-all">Mark all as complete</label>
      </section>
    );
  }
});


var NoteApp = React.createClass({
  // this will cause setState({list:updatedlist}) whenever the store does trigger(updatelist)
  mixins: [Reflux.connect(NoteListStore, "list")],

  render: function() {
    return(
      <div>
      <NoteHeader> </NoteHeader>
      <NoteMain list={this.state.list}> </NoteMain>
      </div>
    );
    // return <h1>Hello react {this.props.name}</h1>;
  }
});

export default NoteApp;
