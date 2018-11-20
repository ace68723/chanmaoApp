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

import { GOOGLE_API_KEY } from '../../../Config/API';
import AddressStore from '../../Stores/AddressStore';
import AddressAction from '../../Actions/AddressAction';
import Util from '../../Modules/Util';

export default class MyComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        predictionsData: [],
        items: [],
        // showAlert: 0,
        selectedAddress: '',
      }
      this._goBack = this._goBack.bind(this);
      this.handleAddressSelected = this.handleAddressSelected.bind(this);
      this.onChangeTextInput = this.onChangeTextInput.bind(this);
      this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
      AddressStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
      AddressStore.removeChangeListener(this._onChange)
  }

  _onChange() {
    const newState = AddressStore.getState();
    this.setState(Object.assign({}, this.state, {showAlert: newState.showAlert}));
    this.setState(Object.assign({}, this.state, {selectedAddress: newState.selectedAddress}));
    console.log('goto address');
    if (this.state.showAlert == 0) {
      this.props.navigator.showLightBox({
         screen: "CmWashAddressAlert",
         passProps: {
           message:`对不起, 您输入的地址暂时无法配送`},
         style: {
           flex: 1,
           tapBackgroundToDismiss: true,
         },
         adjustSoftInput: "resize",
        });
      setTimeout(() => {
         this.props.navigator.dismissLightBox();
       }, 5000);
      }
      else {
        this.props.navigator.push({
          screen: "CmWashAddAddressInfo",
          passProps: {addrInfo:this.state.addrInfo},
          navigatorStyle: {navBarHidden:true},
        });
      }
  }

  _goBack() {
    this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
  }

  handleAddressSelected(addressObject, selected) {
    if (Util.getWaitingStatus() === true){
      return;
    }
    Util.toggleWaitingStatus();

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
              let addrInfo = {};
              addrInfo.lat  = placeDetails.geometry.location.lat;
              addrInfo.lng  = placeDetails.geometry.location.lng;
              addrInfo.addr = placeDetails.formatted_address;
              addrInfo.province = placeDetails.formatted_address.split(',')[2].replace(' ', '').substring(0, 2);
              this.setState({addrInfo});
              AddressAction.checkCanDeliver(addrInfo);
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
                keyExtractor={(item, index) => index}
                renderItem={({item}) => this._renderRow(item)}
                ItemSeparatorComponent={(sectionId, rowId) => {
                  return <Separator/>
                }}
                />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
  },
});
