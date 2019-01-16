/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import Header from "./header";
import Row from "./row";
import Separator from "./separator";

import { GOOGLE_API_KEY } from '../../Config/API';
import AddressStore from '../../Stores/AddressStore';
import AddressAction from '../../Actions/AddressAction';
import Util from '../../Modules/Util';

export default class MyComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        predictionsData: [],
        items: [],
        showAlert: 0,
        selectedAddress: '',
      }
      this._goBack = this._goBack.bind(this);
      this.handleAddressSelected = this.handleAddressSelected.bind(this);
      this.onChangeTextInput = this.onChangeTextInput.bind(this);
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }


  _goBack() {
    this.props.navigator.pop({
        animationType: 'slide-down'
      });
  }

  handleAddressSelected(addressObject, selected) {
    console.log(addressObject)
    const url = "https://maps.googleapis.com/maps/api/place/details/" +
        "json?placeid=" + addressObject.place_id +
        "&key=" + GOOGLE_API_KEY
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
            if(res.status == "OK"){
              const placeDetails = res.result;
              console.log(placeDetails)
              let addrInfo = {};
              addrInfo.lat  = placeDetails.geometry.location.lat;
              addrInfo.lat  = placeDetails.geometry.location.lat;
              addrInfo.lng  = placeDetails.geometry.location.lng;
              addrInfo.addr = placeDetails.formatted_address;
              addrInfo.province = placeDetails.formatted_address.split(',')[2].replace(' ', '').substring(0, 2);
              addrInfo.postal = placeDetails.formatted_address.split(',')[2].replace(' ', '').substring(3, 10);
              addrInfo.city = placeDetails.formatted_address.split(',')[1]
              this.setState({addrInfo});
              this.props.navigator.push({
                screen: "EwalletAddAddressInfo",
                passProps: {
                  addrInfo:this.state.addrInfo,
                  selectedProduct:this.props.selectedProduct,
                  goToPage:this.props.goToPage,
                  value:this.props.value},
                navigatorStyle: {navBarHidden:true},
              });
              // AddressAction.checkCanDeliver(addrInfo);
            }else{
              throw 'error'
            }
          })
          .catch((error) => {throw error})



    return Object.assign({},addressObject,{selected:true})
  }

  onChangeTextInput(text) {
    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/" +
    "json?input="+ text +
    "&language=en" +
    "&components=country:ca"+
    "&types=address" +
    "&key=" + GOOGLE_API_KEY
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
        var address_list = [];
        for (let address of res.predictions) {
            address_list.push({'place_id': address.place_id, 'addr': address.description});
        }
        this.setState({
           items: address_list
        });
      })
      .catch((error) => {throw error});
  }

  _renderRow(item) {
      return (
        <Row
        key={item.cbid}
        onselected={(lv_selected) => this.handleAddressSelected(item, lv_selected)}
        {...item}
        />
      )
  }
  _keyExtractor = (item, index) => item.place_id+'index'+index;

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Header
              onFilter={this.handleFilter}
              goBack={this._goBack}
              onSubmitText={this.onSubmitText}
              onChangeTextInput={(text) => this.onChangeTextInput(text)}
              {...this.state}
          />
            <FlatList
                data={this.state.items}
                keyboardShouldPersistTaps={'always'}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => this._renderRow(item)}
                ItemSeparatorComponent={(sectionId, rowId) => {
                  return <Separator/>
                }}
                />
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
  },
});
