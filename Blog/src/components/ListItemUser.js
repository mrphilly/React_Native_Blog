import React, {Component} from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
const { View, TouchableHighlight, Text, StyleSheet, Image, ScrollView } = ReactNative;
import firebase from 'react-native-firebase'
import {Toast} from 'native-base'
export default class ListItemUser extends Component {
  constructor(props){
  super(props);
  this.state = { currentUser: null , image_uri: null, uid: null, key: null};
}


  render() {
    return (
  <TouchableHighlight onPress={this.props.onPress}>
<View>
<ScrollView>
<View style={{borderBottomColor: '#eee', borderWidth: 1, borderColor: 'transparent',}}>
    <View style={styles.li}>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.liText}>{this.props.item.body}</Text>
          <Text style={styles.date}>{this.props.item.date}</Text>
   </View>
    <View style={styles.Icon}>

       <Icon size={20} name="heart" onPress={()=>{
    var vote = firebase.database().ref('user-posts/'+this.props.item.uid+'/'+this.props.item._key)
    var _vote_update = firebase.database().ref('posts/'+this.props.item._key)
    vote.update({votesPositifs: this.props.item.voteP + 1})
    _vote_update.update({votesPositifs: this.props.item.voteP + 1})
    Toast.show({
              text: 'Vous avez aimé ce status!',
              buttonText: 'Okay',
              duration: 3000
            })}}/>



       <Text style={{fontSize: 16}}>{this.props.item.voteP}</Text>
       <Icon size={20} name="thumbs-down" style={{paddingHorizontal: 15, color: '#004D40'}} onPress={()=>{
    var vote = firebase.database().ref('user-posts/'+this.props.item.uid+'/'+this.props.item._key)
    var _vote_update = firebase.database().ref('posts/'+this.props.item._key)
    vote.update({votesNegatifs: this.props.item.voteN + 1})
    _vote_update.update({votesNegatifs: this.props.item.voteN + 1})
    Toast.show({
              text: "Vous n'avez pas aimé ce status",
              buttonText: 'Okay',
              duration: 3000
            })
  }}/>
       <Text style={{fontSize: 16, color: 'red'}}>{this.props.item.voteN}</Text>
       <Icon size={20} name="trash-2" style={{paddingHorizontal: 15, color: '#004D40'}} onPress={()=>{
       var del = firebase.database().ref('user-posts/'+this.props.item.uid+'/'+this.props.item._key)
    var  _del = firebase.database().ref('posts/'+this.props.item._key)

        del.remove()
        _del.remove()
        Toast.show({
              text: 'Status supprimé avec succès !',
              buttonText: 'Okay',
              duration: 3000
            })

       }}/>
    </View>
    </View>
</ScrollView>
</View>
  </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    //borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  email: {
    color: '#24CE84',
    fontSize: 16,
    fontWeight: 'bold'
  },

  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  liTextName: {
    color: '#24CE84',
    fontSize: 16,
  },
  date: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  Icon: {
    flexDirection: 'row',
    justifyContent: 'center',
      paddingBottom: 16,
  },

});
