/* @flow */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';

import Header from './header';
import Row from './row';
import Separator from './separator';

import SboxAddressStore from '../../Stores/SboxAddressStore';
import SboxAddressAction from '../../Actions/SboxAddressAction';
import UserInfo from '../SboxAddAddressInfo/UserInfo';

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
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = Object.assign({},
            {dataSource: ds.cloneWithRows([])},
            SboxAddressStore.getState()
          )
      this.handleFilter = this.handleFilter.bind(this);
      this.handleToggleSelected = this.handleToggleSelected.bind(this);
      this.setSource = this.setSource.bind(this);
      this._setUserInfo = this._setUserInfo.bind(this);
      this._onChange = this._onChange.bind(this);
  }
  componentWillMount() {
    SboxAddressAction.getCondoList();
    this.setSource(this.state.condoList, this.state.condoList);
  }
  componentDidMount() {
      SboxAddressStore.addChangeListener(this._onChange);
  }
  _onChange() {
    const newState = SboxAddressStore.getState();
    this.setSource(newState.condoList, newState.condoList);
  }
  /**
  * 保存states和dataSource
  * @param {Array} items array of items in the state
  * @param {Array} itemsDatasource array of items in the dataSource
  * @param {Object} otherState
  */
  setSource(condoList, condoListDatasource, otherState) {

    this.setState({
      condoList,
      dataSource: this.state.dataSource.cloneWithRows(condoListDatasource),
      ...otherState
    })
  }
  /**
  * 当用户选中某一condo，修改selected的值并保存到dataSource
  * @param {String} key the condo id of the selected condo address
  * @param {Boolean} selected the flag whether the condo address is selected or not
  */
  handleToggleSelected(cbid, selected) {
    let newItems;
    if(selected == false){
      // this.state.condoList[key].selected = false;
    }else{
      // this.state.condoList[key].selected = true;
       newItems = this.state.condoList.map((addressObject) => {
        if (addressObject.cbid !== cbid){
          if(addressObject.selected){
            addressObject = Object.assign({},addressObject,{selected:false})
          }
          return addressObject
        }else{
          SboxAddressAction.updateSelectedAddress(addressObject);
          this.props.navigator.showModal({
            screen: "SboxAddAddressInfo",
            passProps: {addressObject:addressObject,setUserInfo:this.props.setUserInfo},
            navigatorStyle: {navBarHidden:true},
            animationType: 'slide-up'
          });
          return Object.assign({},addressObject,{selected:true})
        }
      })
    }
     this.setSource(newItems, filterItems(this.state.filter, newItems));



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
    //
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
    
    this.setState({
      userInfo:userInfo
    })
  }
  _renderUserInfo(){
    if(!this.state.userInfo) return
    return(
      <UserInfo addressObject={this.state.userInfo.addressObject}
                name={this.state.userInfo.name}
                phoneNumber={this.state.userInfo.phoneNumber}
                unitNumber={this.state.userInfo.unitNumber}
      />
    )
  }
  render() {
      return (
        <View style={styles.container}>
            <Header
              onFilter={this.handleFilter}
              {...this.state}
              />

                <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={({ cbid, selected, addr}) => {
                  return (
                    <Row
                    key={cbid}
                    onselected={(lv_selected) => this.handleToggleSelected(cbid, lv_selected)}
                    {...{selected, addr}}
                    />
                  )
                }}
                renderSeparator={(sectionId, rowId) => {
                  return <Separator/>
                }}
                />

            {this._renderUserInfo()}
        </View>
      );
  }
}
