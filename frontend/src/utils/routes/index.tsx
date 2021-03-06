import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../../views/home";
import Login from "../../views/login";

function Routes() {
	return (
		<div>
			<Switch>
				<Route path="/" component={Login} />
				<Route path="/home" component={Home} />
			</Switch>
		</div>
	);
}

export default Routes;
