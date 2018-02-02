import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../fontConfig.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;

let viewMarginTop;
if(height == 812){
  viewMarginTop = 45;
}else{
  viewMarginTop = 20;
}
const navigationHeight = viewHeight * (237/2208) - viewMarginTop;


export default class MyComponent extends Component {
  constructor() {
    super();
    this._renderLeftButton = this._renderLeftButton.bind(this);
  }

  _renderLeftButton() {
    if (this.props.leftButtonText == 'x') {
      return (
        <TouchableOpacity onPress={this.props.goBack}>
            <View style={{width:30,
                          height:30,
                          marginLeft:10,
                          borderRadius:15,
                          backgroundColor:"rgba(0,0,0,0.4)"}}>
                <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
                  ×
                </Text>
            </View>
        </TouchableOpacity>
      )
    }else if(this.props.leftButtonText == '<') {
      return (
        <TouchableOpacity onPress={this.props.goBack}>
            <Image style={{marginLeft:10,
                           height:height*0.032,
                           width:height*0.032,}}
                    source={require('./Image/icon-back.png')}>

            </Image>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={[styles.navigation, {height: navigationHeight}]}>
          <View style={styles.back}>
              {this._renderLeftButton()}
          </View>
          <View style={styles.title}>
              <Text style={ {textAlign:'center', fontSize:20, fontWeight: '700'} }>{this.props.title}</Text>
          </View>
          <View style={{flex:1}}>
          </View>
      </View>
      )
    }
}
const styles = StyleSheet.create({
  navigation: {
    flexDirection:'row'
  },
  back: {
    flex: 1,
    justifyContent:'center',
  },
  title: {
    flex:1,
    backgroundColor: 'white',
    justifyContent:'center',
  }
})
