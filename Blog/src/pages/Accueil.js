import React, { Component } from 'react';
import {
Platform,
StyleSheet,
Text,
View,
StatusBar,
TouchableOpacity,
ListView,
} from 'react-native';
import {Toast} from 'native-base'
import MyHeader from '../components/MyHeader';
import { createStackNavigator } from 'react-navigation';
import Logo from '../components/Logo.js';
import ListItem from '../components/ListItem';
//import Form from '../components/Form';
import firebase from 'react-native-firebase'

export default class Accueil extends Component<Props> {
  constructor(props) {
   super(props);
   this.state = {
     navigate: this.props.navigation.navigate,
     showToast: false,
     dataSource: new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2,
     })
   };
   let currentUser = firebase.auth().currentUser
   var uid = currentUser.uid
   this.itemsRef = this.getRef().child('posts').orderByKey()
   this.itemsReference = this.getRef().child('Post');
 }
 getRef() {
    return firebase.database().ref();

}

show = () =>{
  this.setState({ showToast: !this.state.showToast });

}
  _renderItem(item) {
      const onPress = () => {
        Toast.show({
            text: 'Ceci est un commentaire',
            buttonText: 'Okay'
          })
    }

      return (
         <ListItem item={item} onPress={onPress} />
      );
    }
listenForItems(itemsRef) {

  itemsRef.on('value', (snap) => {



    var itemsListView = [];
      snap.forEach((data) => {

        itemsListView.push({
          author: data.val().author,
          title: data.val().title,
          body: data.val().body,
          date: data.val().date,
          uid: data.val().uid,
          _key: data.key ,
          voteP: data.val().votesPositifs,
          voteN: data.val().votesNegatifs
        });

    firebase.database().ref('users/'+data.val().uid).on('value', (result)=>{


        itemsListView.push({_url: result.val().url});
    })

    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(itemsListView)
    });
  });
}
componentDidMount() {
   this.listenForItems(this.itemsRef);
 }
/*handleLogin = () => {
const { email, password } = this.state
firebase
.auth()
.signInAndRetrieveDataWithEmailAndPassword(email, password)
.then(() => this.props.navigation.navigate('Index'))
.catch(error => this.setState({ errorMessage: error.message }))
}*/


render(){
return(
<View style={styles.container}>
<ListView
           dataSource={this.state.dataSource}
           renderRow={this._renderItem.bind(this)}
           enableEmptySections={true}

           />

</View>

);
}
}



const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#FFFFFF'
},
});
