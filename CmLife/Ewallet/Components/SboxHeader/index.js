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
// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
// import icoMoonConfig from '../../../fontConfig.json';

// const Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
import Settings from '../../Config/Setting';

let viewMarginTop;
if(height == 812){
  viewMarginTop = 0;
  navigationHeight = 55;
}else{
  viewMarginTop = 0;
  navigationHeight = 55;
}
// const navigationHeight = viewHeight * (210/2208) - viewMarginTop;


export default class MyComponent extends Component {
  constructor() {
    super();
  }



  render() {
    return (
      <View style={styles.navigation}>
              <Text style={{marginLeft:0.4*width,
                            fontSize:20,
                            paddingTop: Settings.getY(30),
                          color:'white'}}
                     numberOfLines={1}
                     allowFontScaling={false}>
                            {this.props.title}
              </Text>
      </View>
      )
    }
}
const styles = StyleSheet.create({
  navigation: {
    flexDirection:'row',
    backgroundColor: '#242730',
    borderBottomWidth: 1,
    borderColor: "#D5D5D5",
    height:navigationHeight,
  },
  container:{
    top:0,
    left:0,
    right:0,
    height:navigationHeight,
    backgroundColor:'#242730',
  },
  back: {
    flex: 0.2,
    backgroundColor: 'white',
    flexDirection: 'column-reverse',
    marginBottom: 10,
  },

  right: {
    flex: 0.2,
    flexDirection: 'column-reverse',
    backgroundColor: 'white',
    marginBottom: 10,
  },
})
