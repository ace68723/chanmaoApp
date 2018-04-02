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

const {width,height} = Dimensions.get('window');

let headerHeight;
if(height == 812){
  //min 34
  headerHeight = 88;
}else{
  headerHeight = 54 + 30;
}

export default class AddressPromptView extends Component {
  constructor(){
    super()
    const state = {
      fadeInOpacity: new Animated.Value(0),
      animatedHeaderHeight: new Animated.Value(headerHeight + 12),
    }

    this.state = Object.assign({}, state);
    this._onPress = this._onPress.bind(this);
    this._onChange = this._onChange.bind(this);

  }

  componentDidMount() {
    const animationDuration = 500;
    Animated.timing(this.state.fadeInOpacity, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.linear
    }).start();
    Animated.timing(this.state.animatedHeaderHeight, {
        toValue: headerHeight + 4,
        duration: animationDuration,
        easing: Easing.linear
    }).start();

    AddressStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    AddressStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this._onPress();
  }

  _onPress(){
    const animationDuration = 500;
    Animated.timing(this.state.fadeInOpacity, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.linear
    }).start();
    Animated.timing(this.state.animatedHeaderHeight, {
        toValue: headerHeight + 8,
        duration: animationDuration,
        easing: Easing.linear
    }).start();
    setTimeout(() => {
        this.props.onPress();
    }, animationDuration * 2);
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={this._onPress}>
          <Animated.View style={{
                    position: 'absolute',
                    height: 36,
                    left: (width / 2) - (width * 0.9) / 2,
                    width: (width * 0.9),
                    paddingLeft: 16,
                    justifyContent:'center',
                    backgroundColor: '#ea7b21',
                    marginTop: this.state.animatedHeaderHeight,
                    opacity: this.state.fadeInOpacity,
                  }}>
            <View style={styles.TriangleShapeCSS} />
            <Text style={{color:"white",
                        fontSize:12,
                        top: -4,
                        fontWeight:'bold',
                        textAlignVertical: "center",
                        fontFamily:"FZZhunYuan-M02S",
                        backgroundColor: '#ea7b21',}}
                        numberOfLines={1}>
                        这是正确的地址吗？距离您的位置似乎有点远。
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
    left: 70,
    top: -15,
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
