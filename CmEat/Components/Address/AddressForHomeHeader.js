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

import LocationModule from '../../Modules/System/LocationModule'

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
      currentLocation: selectedAddress,
    }

    this._onChange = this._onChange.bind(this);
    this._getCurrentGeolocation = this._getCurrentGeolocation.bind(this);
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

    this._getCurrentGeolocation();
  }

  _getCurrentGeolocation(){
		navigator.geolocation.getCurrentPosition (
      (position) => {
				const url = "https://maps.googleapis.com/maps/api/distancematrix/json?" +
         "origins= " + position.coords.latitude + ',' + position.coords.longitude +
         "&destinations=" + this.state.selectedAddress + "&key=AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8"
		    let options = {
		        method: 'GET',
		        mode:'cors',
		        headers: {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        }
		    }
		    fetch(url,options)
		      .then((res) => res.json())
		      .then((res)=>{
						const distance = res.rows[0].elements[0].distance.value;
            const promoptDistance = 500;
            if (distance && distance >= promoptDistance){
              this.props.toggleAddressPrompt();
            }
            else{
              console.log('not show');
            }
		      })
		      .catch((error) => {throw error});
			},
      (error)    => {
				console.log(error)
			},
      {
        enableHighAccuracy: true,
        timeout:            20000,
        maximumAge:         10000
      }
    )
	}
  _renderAddress() {
    if(this.state.selectedAddress) {
      return(
        <View>
          <Text style={{color:"#000000",
                        fontSize:15,
                        fontWeight:'bold',
                        fontFamily:'FZZongYi-M05S',
                        marginBottom:10,}}
                        numberOfLines={1}>
              配送至   {this.state.selectedAddress}
          </Text>

        </View>

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
