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
<<<<<<< HEAD
=======
        selectedAddress: '',
>>>>>>> 881b821d7cbff6fe6814f4372ebc7f49698ca416
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
<<<<<<< HEAD
    SboxAddressStore.addChangeListener(this._onChange);
=======
      SboxAddressStore.addChangeListener(this._onChange);
>>>>>>> 881b821d7cbff6fe6814f4372ebc7f49698ca416
  }
  componentWillUnmount() {
      SboxAddressStore.removeChangeListener(this._onChange)
  }

  _onChange() {
    console.log("onChange");
    const newState = SboxAddressStore.getState();
    console.log(newState);
    this.setState(Object.assign({}, this.state, {showAlert: newState.showAlert}));
    this.setState(Object.assign({}, this.state, {selectedAddress: newState.selectedAddress}));
    // Object.assign({},this.state,SboxAddressStore.getState());
    console.log(this.state);
    if (this.state.showAlert == 0) {
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
        // SboxAddressAction.updateSelectedAddress(this.state.addressObject);
        this.props.navigator.showModal({
          screen: "SboxAddAddressInfo",
          passProps: {addressObject:this.state.selectedAddress,setUserInfo:this.props.setUserInfo},
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
              addrInfo.lat  = placeDetails.geometry.location.lat;
              addrInfo.lng  = placeDetails.geometry.location.lng;
              addrInfo.addr = placeDetails.formatted_address;
              addrInfo.province = placeDetails.formatted_address.split(',')[2].replace(' ', '').substring(0, 2);
              console.log(addrInfo);
              // Check if in the area
              // SboxAddressAction.updateSelectedAddress(addrInfo);
              SboxAddressAction.checkCanDeliver(addrInfo);
              // this.setState({
              //    selectedAddress: addrInfo
              // });
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
