import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Signup from "./signup"
import login from "./login"
import Member from "./members/index"
import NotFound from "./notfound"



const Routes = () => {
   return (
      <Switch>
			<Route exact path="/" component={login}/>
			<Route exact path="/signup" component={Signup}/>


			<Route exact path="/members/:page"  render={props => (<Member {...props} />) } /> 

			<Redirect from="/logout"  to="/" exact />
			<Redirect from="/auth" exact to={{ pathname: "/", state: { authNotice: "You must login first in order to access member area!" }}}  />
			<Route  component={NotFound} />
			</Switch>
   )


}


export default Routes