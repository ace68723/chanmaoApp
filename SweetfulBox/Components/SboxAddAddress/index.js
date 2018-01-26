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
import SboxAddressStore from '../../Stores/SboxAddressStore';
import SboxAddressAction from '../../Actions/SboxAddressAction';

export default class MyComponent extends Component {
    constructor(props) {
      super(props);
      // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        predictionsData: [],
        items: [],
        showAlert: 0,
      // dataSource: ds.cloneWithRows([])
      }
      // this.setSource = this.setSource.bind(this);
      this.handleAddressSelected = this.handleAddressSelected.bind(this);
      this.onChangeTextInput = this.onChangeTextInput.bind(this);
      this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    console.log(this.state.items);
  }

  componentDidMount() {
    SboxAddressStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    SboxAddressStore.removeChangeListener(this._onChange)
  }

  _onChange() {
    console.log("onChange");
    const showAlert = SboxAddressStore.getAlertState();
    this.setState(Object.assign({}, this.state, {showAlert: newState}))
    // Object.assign({},this.state,SboxAddressStore.getState());

    if (showAlert == 1) {
      this.props.navigator.showLightBox({
         screen: "SboxAddressAlert", // unique ID registered with Navigation.registerScreen
         passProps: {
           message:`对不起, 您输入的地址暂时无法配送`}, // simple serializable object that will pass as props to the lightbox (optional)
         style: {
           flex: 1,
           backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          //  backgroundColor: "#ff000080" // tint color for the background, you can specify alpha here (optional)
         },
         adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
        });
    }
    else {
        SboxAddressAction.updateSelectedAddress(addressObject);
        this.props.navigator.showModal({
          screen: "SboxAddAddressInfo",
          passProps: {addressObject:addressObject,setUserInfo:this.props.setUserInfo},
          navigatorStyle: {navBarHidden:true},
          animationType: 'slide-up'
        });
    }
  }

  /**
  * 当用户选中某一condo，修改selected的值并保存到dataSource
  * @param {String} key the condo id of the selected condo address
  * @param {Boolean} selected the flag whether the condo address is selected or not
  */
  handleAddressSelected(addressObject, selected) {
    console.log(addressObject.place_id);

    const url = "https://maps.googleapis.com/maps/api/place/details/" +
        "json?placeid=" + addressObject.place_id +
        // "&key="+AppConstants.GOOGLE_API_KEY
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
            console.log("123");
            if(res.status == "OK"){
              console.log(res.result);
              const placeDetails = res.result;

              let addrInfo = {};
              addrInfo.iv_lag  = placeDetails.geometry.location.lat;
              addrInfo.iv_lng  = placeDetails.geometry.location.lng;
              addrInfo.iv_addr = placeDetails.formatted_address;
              addrInfo.iv_province = placeDetails.formatted_address.split(',')[2].replace(' ', '').substring(0, 2);
              console.log(addrInfo);
              // Check if in the area
              SboxAddressAction.checkCanDeliver(addrInfo.iv_lag, addrInfo.iv_lng);
              if (0 == 0) {
                  // SboxAddressAction.showAddressAlert("对不起");
                  // this.props.navigator.showLightBox({
                  //    screen: "SboxAddressAlert", // unique ID registered with Navigation.registerScreen
                  //    passProps: {
                  //      message:`对不起, 您输入的地址暂时无法配送`}, // simple serializable object that will pass as props to the lightbox (optional)
                  //    style: {
                  //      flex: 1,
                  //      backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                  //     //  backgroundColor: "#ff000080" // tint color for the background, you can specify alpha here (optional)
                  //    },
                  //    adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
                  //   });
              }
              else {
                  // SboxAddressAction.updateSelectedAddress(addressObject);
                  // this.props.navigator.showModal({
                  //   screen: "SboxAddAddressInfo",
                  //   passProps: {addressObject:addressObject,setUserInfo:this.props.setUserInfo},
                  //   navigatorStyle: {navBarHidden:true},
                  //   animationType: 'slide-up'
                  // });
              }
              // dispatch({
              //     actionType: AppConstants.FORMAT_ADDRESS, addrInfo
              // })
            }else{
              throw 'error'
            }
          })
          .catch((error) => {throw error})



    return Object.assign({},addressObject,{selected:true})
  }

  onChangeTextInput(text) {
    console.log(text);
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
        console.log(res.predictions);
        console.log(this.state.items)
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
      onSubmitText={this.onSubmitText}
      onChangeTextInput={(text) => this.onChangeTextInput(text)}
      {...this.state}
      />

      <View style={styles.content}>
      <FlatList
      data={this.state.items}
      renderItem={({item}) => this._renderRow(item)}
      ItemSeparatorComponent={(sectionId, rowId) => {
        return <Separator/>
      }}
      />
      </View>
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1
  },
});
