import * as React from 'react';
import Reflux from 'reflux';
import { Router, Route, Link } from 'react-router';
import * as _  from 'lodash';


var AppNavBar = React.createClass({

  render: function() {
    return(
      <div>
          <Link to={'/note'}><i className="fa fa-sticky-note-o fa-lg"></i> note</Link>
          <Link to={'/calculator'}><i className="fa fa-calculator fa-lg"></i> calc</Link>
          <Link to={'/chat'}><i className="fa fa-wikipedia-w fa-lg"></i> chat</Link>
          <Link to={'/dictionary'}><i className="fa fa-camera-retro fa-lg"></i>dict</Link>
          <Link to={'/wikipedia'}><i className="fa fa-wikipedia-w fa-lg"></i>wiki</Link>
          <Link to={'/capture'}><i className="fa fa-camera-retro fa-lg"></i> capture</Link>
          <Link to={'/tips'}><i className="fa fa-camera-retro fa-lg"></i>tips</Link>
      </div>
    );
  }
});

export default AppNavBar ;
