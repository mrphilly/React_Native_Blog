import React, { Component } from "react";
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
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
},
  { headerMode: 'none' }
);
export default routes;
