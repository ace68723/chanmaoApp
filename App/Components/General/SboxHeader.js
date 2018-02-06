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
  viewMarginTop = 27;
}else{
  viewMarginTop = 17;
}
const navigationHeight = viewHeight * (210/2208) - viewMarginTop;


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
              <Text style={{textAlign:'center',
                            fontSize:20,
                            fontWeight: '700'}}
                     numberOfLines={1}>
                            {this.props.title}
              </Text>
          </View>
          <View style={styles.left}>
          </View>
      </View>
      )
    }
}
const styles = StyleSheet.create({
  navigation: {
    flexDirection:'row',
    backgroundColor: 'white',
    marginTop: viewMarginTop
  },
  back: {
    flex: 0.2,
    justifyContent:'center',
    backgroundColor: 'white',
  },
  title: {
    flex:0.6,
    backgroundColor: 'white',
    justifyContent:'center',
    backgroundColor: 'white',
  },
  left: {
    flex: 0.2,
    justifyContent:'center',
    backgroundColor: 'white',
  },
})
