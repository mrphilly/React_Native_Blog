// Loading.js
import React from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import firebase from 'react-native-firebase'
export default class Loading extends React.Component {
componentDidMount() {
firebase.auth().onAuthStateChanged(user => {
this.props.navigation.navigate(user ? 'Home' : 'Connexion')

})
}
render () {
return (
<View style = {styles.container}>
<Text style={{color: "#FFFFFF", fontSize: 20, fontWeight: 'bold'}}> Chargement </ Text>
<ActivityIndicator size = "large" color="#FFFFFF" />
</ View>
)
}
}
const styles = StyleSheet.create ({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#00BFA5'
}
})
