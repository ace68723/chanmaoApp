/* @flow */
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import AddressStore from '../../Stores/AddressStore';
import Label from '../../../App/Constants/AppLabel';
const {width,height} = Dimensions.get('window');

let headerHeight;
if(height == 812){
  //min 34
  headerHeight = 88 - 12;
}else{
  headerHeight = 54 + 30 - 12;
}

export default class AddressPromptView extends Component {
  constructor(){
    super();
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <Animated.View style={{
                    position: 'absolute',
                    height: 48,
                    left: (width / 2) - (width * 0.9) / 2,
                    width: (width * 0.9),
                    justifyContent:'center',
                    backgroundColor: 'transparent',
                    marginTop: this.props.animatedHeaderHeight,
                    opacity: this.props.fadeInOpacity,
                  }}>
            <View style={styles.TriangleShapeCSS} />
            <Text style={{color:"white",
                          fontSize:12,
                          top: 0,
                          width: (width * 0.9),
                          paddingLeft: 16,
                          paddingTop: 12,
                          paddingBottom: 12,
                          backgroundColor: '#ea7b21',
                          fontWeight:'bold',
                          textAlignVertical: "center",
                          fontFamily:"NotoSansCJKsc-Regular",
                          backgroundColor: '#ea7b21',}}
                          numberOfLines={1}
                  allowFontScaling={false}>
                          {Label.getCMLabel('COMFIRM_ADDRESS')}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>


    );
  }
}

const styles = StyleSheet.create({
  TriangleShapeCSS: {
    width: 0,
    height: 0,
    left: 120,
    top: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ea7b21'
  }
});
