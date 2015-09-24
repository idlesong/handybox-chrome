var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
// var math = require('mathjs');

var CalculatorActions = Reflux.createActions([
  "calculateResult",
  "clearInput",
  "viewHistory"
]);

var CalculatorStore = Reflux.createStore({
  listenables: [CalculatorActions],

  onCalculateResult: function(label){
    let result = eval(label);
    console.log("calculate result:");
  },
});

var NoteHeader = React.createClass({
  listenables: [CalculatorActions],
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

        <div>
            <i className="fa fa-sticky-note-o fa-lg"></i> |
            <i className="fa fa-calculator fa-lg"></i> |
            <i className="fa fa-wikipedia-w fa-lg"></i> |
            <i className="fa fa-camera-retro fa-lg"></i>
        </div>

        <h4> Notes </h4>

      </header>
    );
  }
});


var CalculatorBoard = React.createClass({
  render: function() {
    return (
      <div className="alert alert-success" >
          <table className="table">
            <tr>
            <td><button href="#" className="btn btn-block" data-constant="SIN" data-key="115">sin</button></td>
            <td><button href="#" className="btn btn-block" data-constant="COS" data-key="99">cos</button> </td>
            <td><button href="#" className="btn btn-block" data-constant="MOD" data-key="109">md</button> </td>
            <td colSpan="2"><button href="#" className="btn btn-block btn-danger" data-method="reset" data-key="8">C</button></td>
            </tr>
            <tr>
              <td> <button href="#" className="btn btn-block" data-key="55">7</button></td>
              <td> <button href="#" className="btn btn-block" data-key="56">8</button></td>
              <td> <button href="#" className="btn btn-block" data-key="57">9</button></td>
              <td> <button href="#" className="btn btn-block" data-constant="BRO" data-key="40">(</button></td>
              <td> <button href="#" className="btn btn-block" data-constant="BRC" data-key="41">)</button></td>
            </tr>
            <tr>
              <td> <button href="#" className="btn btn-block" data-key="52">4</button> </td>
              <td> <button href="#" className="btn btn-block" data-key="53">5</button> </td>
              <td> <button href="#" className="btn btn-block" data-key="54">6</button> </td>
              <td> <button href="#" className="btn btn-block" data-constant="MIN" data-key="45">-</button> </td>
              <td> <button href="#" className="btn btn-block" data-constant="SUM" data-key="43">+</button> </td>
            </tr>
            <tr>
              <td> <button href="#" className="btn btn-block" data-key="49">1</button></td>
              <td> <button href="#" className="btn btn-block" data-key="50">2</button></td>
              <td> <button href="#" className="btn btn-block" data-key="51">3</button></td>
              <td> <button href="#" className="btn btn-block" data-constant="DIV" data-key="47">/</button></td>
              <td> <button href="#" className="btn btn-block" data-constant="MULT" data-key="42">*</button></td>
            </tr>
            <tr>
              <td><button href="#" className="btn btn-block" data-key="46">.</button></td>
              <td><button href="#" className="btn btn-block" data-key="48">0</button></td>
              <td><button href="#" className="btn btn-block" data-constant="PROC" data-key="37">%</button></td>
              <td colSpan="2"><button href="#" className="btn btn-block btn-primary" data-method="calculate" data-key="61">=</button></td>
            </tr>
          </table>

      </div>
    );
  }
});

var CalculatorHistory = React.createClass({
  render: function() {
    return(
      <div class="well">
        <legend>History</legend>
        <div id="calc-panel">
          <div id="calc-history">
            <ol id="calc-history-list"></ol>
          </div>
        </div>
      </div>

    );
  }
});

var CalculatorApp = React.createClass({
  // this will cause setState({list:updatedlist}) whenever the store does trigger(updatelist)
  // mixins: [Reflux.connect(NoteListStore, "list")],

  render: function() {
    return(
      <div>
        <NoteHeader />
        <CalculatorBoard />
        <CalculatorHistory />
      </div>
    );
    // return <h1>Hello react {this.props.name}</h1>;
  }
});

React.render(
  <CalculatorApp name="React calculator" />,
  document.getElementById('app')
);
