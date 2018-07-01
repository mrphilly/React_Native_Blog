import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';



export default class Form extends Component<Props>{
  state = { email: '', password: '', errorMessage: null }
  render(){
    return(
      <View style={styles.container}>

        <StatusBar
        backgroundColor="#B71C1C"
        barStyle="light-content"
        />

      {this.state.errorMessage &&
      <Text style={{ color: 'red' }}>
      {this.state.errorMessage}
      </Text>}
      <TextInput style={styles.inputBox}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder='Email...'
      placeholderTextColor='#FFFFFF'
      onChangeText={email => this.setState({ email })}
      value={this.state.email}
      />

      <TextInput style={styles.inputBox}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder='Password...'
      secureTextEntry={true}
      placeholderTextColor='#FFFFFF'
      onChangeText={password => this.setState({ password })}
      value={this.state.password}
      />


      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flexGrow:1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    inputBox: {
      width: 300,
      backgroundColor: '#EF5350',
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
})
