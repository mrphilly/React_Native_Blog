import React, { Component } from 'react';
import {
Platform,
StyleSheet,
Text,
View,
StatusBar,
TouchableOpacity,
ListView
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import Logo from '../components/Logo.js';
//import Form from '../components/Form';
import firebase from 'react-native-firebase'
import MyHeader from '../components/MyHeader';
import ListItemMess from '../components/ListItemMess';
export default class News extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {

          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          })
        };
        let currentUser = firebase.auth().currentUser
        var uid = currentUser.uid
        this.itemsRef =firebase.database().ref('messages/'+uid)

      }

      _renderItem(item) {
        const onPress = () => {
          alert(
            'Complete',
            null,
            [
              {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
              {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
            ]
          );
        };

        return (
           <ListItemMess item={item} onPress={onPress} />
        );
      }
  listenForItems(itemsRef) {

    itemsRef.on('value', (snap) => {

      // get children as an array
      console.log(snap)
      var itemsListView = [];
       snap.forEach((data)=>{
          itemsListView.push({
              _key: data.key,
              title: data.val().title,
              date: data.val().date,
              user: data.val().user,
              url: data.val().url,
          })
       })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(itemsListView)
      });
    });
  }
  componentDidMount() {
     this.listenForItems(this.itemsRef);
   }


render(){
return(
<View style={styles.container}>
<View style={{alignItems: 'center'}}>
<Text style={{color: '#24CE84', fontSize: 20, fontWeight: 'bold'}}> Mentions j'aimes</Text>

</View>
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

},
});
