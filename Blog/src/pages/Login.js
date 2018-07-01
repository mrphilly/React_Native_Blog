import React, { Component } from 'react';
import {
Platform,
StyleSheet,
Text,
View,
StatusBar,
TouchableOpacity,
TextInput
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import Logo from '../components/Logo.js';
//import Form from '../components/Form';
import firebase from 'react-native-firebase';


export default class Login extends Component<Props> {
constructor(props){
super(props);
this.state = { email: '', password: '', errorMessage: null , errorEmail: null, errorPassword: null, ImageSource: null};
}

handleLogin = () => {
  if(this.state.email==''){
    this.setState({errorEmail: 'email required'})
  }else if(this.state.password==''){
    this.setState({errorPassword: 'password required'})
  }else{
firebase
.auth()
.signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
.then(() => this.props.navigation.navigate('Home'))
.catch(error => this.setState({ errorMessage: error.message }))
}
}


render(){
return(
<View style={styles.container}>
<StatusBar
backgroundColor="#004D40"
barStyle="light-content"
/>

<Logo/>

{this.state.errorMessage &&
<Text style={{ color: 'red' }}>
{this.state.errorMessage}
</Text>}
{this.state.errorEmail &&
<Text style={{ color: 'red' }}>
{this.state.errorEmail}
</Text>}
<TextInput style={styles.inputBox}
underlineColorAndroid='rgba(0,0,0,0)'
placeholder='Email...'
placeholderTextColor='#FFFFFF'
onChangeText={email => this.setState({ email })}
value={this.state.email}
/>

{this.state.errorPassword &&
<Text style={{ color: 'red' }}>
{this.state.errorPassword}
</Text>}
<TextInput style={styles.inputBox}
underlineColorAndroid='rgba(0,0,0,0)'
placeholder='Password...'
secureTextEntry={true}
placeholderTextColor='#FFFFFF'
onChangeText={password => this.setState({ password })}
value={this.state.password}
/>
<TouchableOpacity style={styles.button} onPress={this.handleLogin}>
<Text style={styles.buttonText}>Connexion</Text>
</TouchableOpacity>
<View style={styles.signupTextCont}>
<Text style={styles.signupText}> Vous êtes nouveau ?</Text>
<Text style={styles.signupButton} onPress={()=> this.props.navigation.navigate('Inscription')}>Inscription</Text>
</View>
</View>

);
}
}



const styles = StyleSheet.create({
container: {
flexGrow: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#00BFA5',
},
inputBox: {
width: 300,
backgroundColor: '#1DE9B6',
borderRadius: 25,
paddingHorizontal: 16,
marginVertical: 10,
fontSize: 16,
color: '#FFFFFF'
},



buttonText: {
fontSize: 16,
fontWeight: '500',
color: '#FFFFFF',
textAlign: 'center',
},
signupTextCont: {
flex: 1,
alignItems: 'center',
justifyContent: 'flex-end',
paddingVertical: 16,
flexDirection: 'row'
},

signupText: {
color: '#FFFFFF',
fontSize: 15,
},

signupButton: {
color: '#FFFFFF',
fontSize:18,
fontWeight: '900',
},
inputBox: {
width: 300,
backgroundColor: '#1DE9B6',
borderRadius: 25,
paddingHorizontal: 16,
marginVertical: 10,
fontSize: 16,
color: '#FFFFFF'
},
button: {
width: 300,
backgroundColor: '#004D40',
borderRadius: 25,
marginVertical: 10,
paddingVertical: 12,
},



buttonText: {
fontSize: 16,
fontWeight: '500',
color: '#FFFFFF',
textAlign: 'center',
},
});
