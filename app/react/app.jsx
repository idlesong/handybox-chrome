import * as React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link} from 'react-router';
import * as _  from 'lodash';

import NoteApp from './appNote.jsx';
import CalculatorApp from './appCalculator.jsx';
import ChatApp from './appChat.jsx';
import DictionaryApp from './appDictionary.jsx';
import WikipediaApp from './appWikipedia.jsx';
import CaptureApp from './appCapture.jsx';
import TipsApp from './appTips.jsx';


React.render((
  <Router>
    <Route path='/' component = {NoteApp}> </Route>
    <Route path='/note' component = {NoteApp}> </Route>
    <Route path='/calculator' component = {CalculatorApp}> </Route>
    <Route path='/chat' component = {ChatApp}> </Route>
    <Route path='/dictionary' component = {DictionaryApp}> </Route>
    <Route path='/wikipedia' component = {WikipediaApp}> </Route>
    <Route path='/capture' component = {CaptureApp}> </Route>
    <Route path='/tips' component = {TipsApp}> </Route>
  </Router>
),  document.body);
