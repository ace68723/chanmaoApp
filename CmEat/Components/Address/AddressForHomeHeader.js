/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AddressStore from '../../Stores/AddressStore';
import { Navigation } from 'react-native-navigation';
export default class AddressForHomeHeader extends Component {
  constructor() {
    super();

    let selectedAddress = AddressStore.getSeletedAddress();

    if(selectedAddress){
      selectedAddress = selectedAddress.addr.split(",", 1)[0];
    }
    this.state = {
      selectedAddress:selectedAddress,
      wait:false,
    }

    this._onChange = this._onChange.bind(this);
  }
  componentDidMount() {
    AddressStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    AddressStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    let selectedAddress = AddressStore.getSeletedAddress();
    if(selectedAddress){
      selectedAddress = selectedAddress.addr.split(",", 1)[0];
    }
    this.setState({
      selectedAddress:selectedAddress,
    })
  }
  _renderAddress() {
    if(this.state.selectedAddress) {
      return(
        <Text style={{color:"#000000",
                      fontSize:15,
                      fontWeight:'bold',
                      fontFamily:'FZZongYi-M05S',
                      marginBottom:10,}}
                      numberOfLines={1}>
            配送至   {this.state.selectedAddress}
        </Text>
      )
    }else{
      return(
        <Text style={{color:"#000000",
                      fontSize:15,
                      fontWeight:'bold',
                      fontFamily:'FZZongYi-M05S',
                      marginBottom:10,}}
                      numberOfLines={1}>
            请选择地址
        </Text>
      )
    }

  }
  render() {
    return (
      <TouchableOpacity style={styles.container}
                        disabled={this.state.wait}
                        onPress={()=>{
          this.setState({
            wait:true
          })
          Navigation.showModal({
            screen: 'CmEatAddress',
            animated: true,
            navigatorStyle: {navBarHidden: true},
            passProps:{
              tag:"fromHome",
              handleBackToHome:this.props.handleBackToHome,
            }
          });
          setTimeout( () => {
            this.setState({
              wait:false
            })
          }, 500);

        }}>
        {this._renderAddress()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column-reverse"
  },
});
