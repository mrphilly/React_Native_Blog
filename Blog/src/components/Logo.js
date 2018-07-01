import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class Logo extends Component<Props>{
  render(){
    return(
      <View style={styles.container}>
         <Image source={require('../images/icon.png')}
         style={{width: 70, height: 70}} />
         <Text style={styles.logoText}>Vivez l'actualité</Text>   
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flexGrow:1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 24,
      color: '#FFFFFF',
    }
})
