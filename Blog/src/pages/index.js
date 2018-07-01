import React, { Component } from "react";
import Login from './Login';
import Profile from './Profile';
import Home from './Home';
import NewPost from './NewPost';
import {createStackNavigator} from 'react-navigation';
const routes = createStackNavigator({
Login:{
screen: Login,
},
Profile: {
screen: Profile
},
Home: {
screen: Home
},
NewPost: {
screen: NewPost
},
},
{ headerMode: 'none' }
);
export default routes;
