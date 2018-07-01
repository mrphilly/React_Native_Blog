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
import firebase from 'react-native-firebase'
import { createStackNavigator } from 'react-navigation';
import Logo from '../components/Logo';
//import Form from '../components/Form';

export default class SignUp extends Component<Props> {
  state = { email: '', password: '', username:'', errorMessage: null, errorEmail: null, duplicateUsername: null, rrorUsername: null, errorPassword: null }
  getUsername(){
    let user = firebase.database().ref('users')
    if(user!==null){
    user.on('value', (snap)=>{
      snap.forEach((child)=>{
          if(this.state.username===child.val().username){
            this.setState({duplicateUsername: 'Ce username existe déjà'})
          }
      })
    })
  }
  }
    handleSignUp = () => {
    //const { email, password } = this.state
    this.getUsername()

    if(this.state.username==''){
        this.setState({errorUsername: 'username required'})
    }else if(this.state.email==''){
      this.setState({errorEmail: 'email required'})
    }else if(this.state.password==''){
      this.setState({errorPassword: 'password required'})
    }else{

      firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {

        let currentUser = firebase.auth().currentUser
        let uid = currentUser.uid
        firebase.database().ref('users/' +uid ).set({
          username: this.state.username,
          email: this.state.email,
          url: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'
        });

        this.props.navigation.navigate('LoadingInscription')


      })
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

          {this.state.duplicateUsername &&
          <Text style={{ color: 'red' }}>
          {this.state.duplicateUsername}
          </Text>}

                {this.state.errorUsername &&
                <Text style={{ color: 'red' }}>
                {this.state.errorUsername}
                </Text>}
                <TextInput style={styles.inputBox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='Username'
                placeholderTextColor='#FFFFFF'
                onChangeText={username =>
                  this.setState({ username })}
                value={this.state.username}
                />

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
          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
             <Text style={styles.buttonText}>Inscription</Text>
          </TouchableOpacity>
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}> Vous êtes déjà inscrit?</Text>
            <Text style={styles.signupButton} onPress={() => this.props.navigation.navigate("Connexion")}>Connexion</Text>
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
    button: {
      width: 300,
      backgroundColor: '#B71C1C',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
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
    button: {
      width: 300,
      backgroundColor: '#004D40',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
    },

    signupButton: {
       color: '#FFFFFF',
       fontSize:18,
       fontWeight: '900',
    },
});
