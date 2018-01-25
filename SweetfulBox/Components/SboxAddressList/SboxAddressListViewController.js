/* @flow */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  FlatList,
} from 'react-native';
import SboxAddressListView from './SboxAddressListView';
import Header from './header';
import Row from './row';
import Separator from './separator';

import SboxAddressStore from '../../Stores/SboxAddressStore';
import SboxAddressAction from '../../Actions/SboxAddressAction';

const filterItems = (filter, items) => {
    return items.filter((item) => {
        if (filter == 'ALL') return true;
        if (item.addr.split(',')[1] === filter) return true;
    });
};
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    content: {
      flex: 0.8088
    }
});

export default class SboxAddressList extends Component {
  constructor(props) {
      super(props);

      this.state = Object.assign({},SboxAddressStore.getState(),{
         textInput: '',
      })
      this.handleFilter = this.handleFilter.bind(this);
      this.handleToggleSelected = this.handleToggleSelected.bind(this);

      this._setUserInfo = this._setUserInfo.bind(this);
      this._onChange = this._onChange.bind(this);
      this._reachEnd = this._reachEnd.bind(this);
      this._submitText = this._submitText.bind(this);
  }
  componentDidMount() {
      SboxAddressStore.addChangeListener(this._onChange);
      SboxAddressAction.getCondoList();
  }
  componentWillUnmount(){
    SboxAddressStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    // const newState = SboxAddressStore.getState();
    // this.setState(Object.assign({},{condoList: newState}))
    const state = Object.assign({},SboxAddressStore.getState());
    console.log(state)
    this.setState(state);
  }

  /**
  * 当用户选中某一condo，修改selected的值并保存到dataSource
  * @param {String} key the condo id of the selected condo address
  * @param {Boolean} selected the flag whether the condo address is selected or not
  */
  handleToggleSelected(cbid, selected) {
    if(selected == true){
      // this.state.condoList[key].selected = false;
    }else{
      // this.state.condoList[key].selected = true;
      let newItems;
      newItems = this.state.condoList.map((addressObject) => {
      if (addressObject.cbid !== cbid){
        if(addressObject.selected){
          addressObject = Object.assign({},addressObject,{selected:false})
        }
        return addressObject;
      }else{
        SboxAddressAction.updateSelectedAddress(addressObject);
        console.log(addressObject);
        this.props.navigator.showModal({
          screen: "SboxAddAddressInfo",
          passProps: {addressObject:addressObject,setUserInfo:this.props.setUserInfo},
          navigatorStyle: {navBarHidden:true},
          animationType: 'slide-up'
        });
        return Object.assign({},addressObject,{selected:true})
      }
    });
    this.setState({condoList: newItems});
  }

    // var selected = !selected;
    // const newItems = this.state.condoList.map((addressObject) => {
    //   if (addressObject.cbid !== key) return addressObject;
    //   // return {
    //   //   ...addressObject,
    //   //   selected
    //   // }
    //   SboxAddressAction.updateSelectedAddress(addressObject);
    //   return Object.assign({},addressObject,{selected:true})
    // })
    //
    // const newItems_2 = newItems.map((item) => {
    //   if (item.cbid == key) return item;
    //   var selected = false;
    //   return {
    //     ...item,
    //     selected
    //   }
    // })
    // console.log(newItems_2)
    // this.setSource(newItems_2, filterItems(this.state.filter, newItems_2));
  }


  /**
  * 根据所选城市对condo进行过滤
  * @param {Numer} idx the index of the the selected option
  * @param {String} filter name of the city from the selected option
  */
  handleFilter(idx, filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), { filter });
  }

  _setUserInfo(userInfo){
    console.log(userInfo)
    this.setState({
      userInfo:userInfo
    })
  }

  _reachEndStart:false

  _reachEnd() {
    console.log("In reach end, textinput is: ", this.state.textInput);
    if(this.state.textInput.length !== 0) return;
    if(this._reachEndStart) return;
    this._reachEndStart = true;
    setTimeout(() => {
      this._reachEndStart = false;
    }, 500);
    console.log(this.state.condoList.length);
    if (this.state.condoList.length===0 )return;
    SboxAddressAction.getCondoList(this.state.condoList.length);
  }

  _saveTextInput(text) {
    this.setState({textInput: text.toUpperCase()});
    // SboxAddressAction.updatedTextInput(text.toUpperCase());
    SboxAddressAction.getCondoFuzzy(text.toUpperCase());
  }

  _submitText() {
    // alert(text);
    // SboxAddressAction.getCondoFuzzy(text.toUpperCase());
  }


  // <ListView
  // enableEmptySections
  // dataSource={this.state.dataSource}
  // renderRow={({ cbid, selected, addr}) => {
  //   return (
  //     <Row
  //     key={cbid}
  //     onselected={(lv_selected) => this.handleToggleSelected(cbid, lv_selected)}
  //     {...{selected, addr}}
  //     />
  //   )
  // }}
  // renderSeparator={(sectionId, rowId) => {
  //   return <Separator/>
  // }}
  // />

  render() {
      return (
        <SboxAddressListView
          navigator={this.props.navigator}
          reachEnd={this._reachEnd}
          condoList={this.state.condoList}
          handleFilter={this.handleFilter}
          userInfo={this.state.userInfo}
          handleToggleSelected={this.handleToggleSelected}
          onSubmitText={this._submitText}
          onChangeTextInput={(text) => this._saveTextInput(text)}/>
      );
  }
}
