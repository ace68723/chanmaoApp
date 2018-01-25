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
        filter: "ALL",
        predictionsData: [],
        items: [
          {"cbid": 123,
          "zmid": 647,
          "addr": "5508 Yonge St,North York,M2N 7G5,Canada",
          "province": "Ontario",
          "lat": 42,
          "lng": 30,
          "notes":"ok",
          "selected": false
          },
          {"cbid": 124,
          "zmid": 647,
          "addr": "20 Olive St,North York,M2N 7G5,Canada",
          "province": "Ontario",
          "lat": 42,
          "lng": 30,
          "notes":"ok",
          "selected": false
          },
          {"cbid": 125,
          "zmid": 647,
          "addr": "111 Granton Dr,Richmond Hill,M2N 7G5,Canada",
          "province": "Ontario",
          "lat": 42,
          "lng": 30,
          "notes":"ok",
          "selected": false
          }
      ],
      // dataSource: ds.cloneWithRows([])
      }
      // this.setSource = this.setSource.bind(this);
      this.handleAddressSelected = this.handleAddressSelected.bind(this);
      this.onChangeTextInput = this.onChangeTextInput.bind(this);
  }

  componentWillMount() {
    // AsyncStorage.getItem("items").then((json) => {
    // 	try {
    // 		const items = JSON.parse(json);
    // 		this.setSource(items, items);
    // 	} catch(e) {
    // 		console.log("GG");
    // 	}
    // })
    // console.log(this.state);
    // this.setSource(this.state.items, this.state.items);
    console.log(this.state.items);
  }

  /**
  * 当用户选中某一condo，修改selected的值并保存到dataSource
  * @param {String} key the condo id of the selected condo address
  * @param {Boolean} selected the flag whether the condo address is selected or not
  */
  handleAddressSelected(addressObject, selected) {
    // var selected = !selected;
    // const newItems = this.state.items.map((item) => {
    //   if (item.cbid !== key) return item;
    //   return {
    //     ...item,
    //     selected
    //   }
    // })
    console.log(addressObject.place_id);
    // const url = "https://maps.googleapis.com/maps/api/place/details/" +
    // "json?placeid="+ addressObject.cbid +
    // // "&language=en" +
    // // "&components=country:ca"+
    // // "&types=address" +
    // "&key=AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8"
    // let options = {
    //     method: 'GET',
    //     mode:'cors',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // }

    // fetch(url,options)
    //   .then((res) => res.json())
    //   .then((res)=>{
    //     console.log("ggg");
    //     console.log(res);
    //   })
    //   .catch((error) => {throw error});

    const url = "https://maps.googleapis.com/maps/api/place/details/" +
        "json?placeid=" + addressObject.cbid +
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
            if(res.status == "OK"){
              console.log(res.result);
              const placeDetails = res.result;

              let addrInfo = {};
              addrInfo.latitude  = placeDetails.geometry.location.lat;
              addrInfo.longitude  = placeDetails.geometry.location.lng;
              _forEach(placeDetails.address_components, function(component, key) {
                  _forEach(component.types, function(type, key) {
                    switch(type) {
                      case "postal_code":
                        addrInfo.postalCode = component.long_name;
                        break;
                      case "locality":
                        addrInfo.city = component.long_name;
                        break;
                      case "sublocality":
                        addrInfo.city = component.long_name;
                        break;
                      case "neighborhood":
                        addrInfo.city = component.long_name;
                      break;
                    }
                  });
              });
              // if(!addrInfo.city){
              //   addrInfo.city = 'GTA';
              // }
              addrInfo.address = placeDetails.formatted_address;
              console.log(addrInfo);
              // dispatch({
              //     actionType: AppConstants.FORMAT_ADDRESS, addrInfo
              // })
            }else{
              throw 'error'
            }
          })
          .catch((error) => {throw error})


    console.log("address Clicked!!!", addressObject);
    // Check if in the area
    if (1 > 0) {
        SboxAddressAction.showAddressAlert("对不起");
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
