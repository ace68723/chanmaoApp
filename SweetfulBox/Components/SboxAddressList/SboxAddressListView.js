/* @flow */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  FlatList,

} from 'react-native';

import Header from './header';
import Row from './row';
import Separator from './separator';


import UserInfo from '../SboxAddAddressInfo/UserInfo';

import GoBack from '../../../App/Components/General/GoBack';

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    content: {
      flex: 0.8088
    }
});

export default class SboxAddressListView extends Component {
  constructor(props) {
      super(props);
      this._renderItems=this._renderItems.bind(this);
      this._goBack = this._goBack.bind(this);
  }
  _goBack() {
    console.log(this.props)
    this.props.navigator.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }
  _renderUserInfo(){
    if(!this.props.userInfo) return
    return(
      <UserInfo addressObject={this.state.userInfo.addressObject}
                name={this.state.userInfo.name}
                phoneNumber={this.state.userInfo.phoneNumber}
                unitNumber={this.state.userInfo.unitNumber}
      />
    )
  }

  _renderEmpty() {
    return (
      <Text style={{padding: 12, textAlign:'center', fontSize: 16}}>Condo not found</Text>
    );
  }

  _renderItems(condo)
  {

    return (
        <Row
          key={condo.item.cbid}
          onselected={(lv_selected) => this.props.handleToggleSelected(condo.item.cbid, lv_selected)}
          {...{selected: condo.item.selected, addr: condo.item.addr}}
        />
      )
  }


  render() {
      console.log(this.props.condoList)
      return (
        <View style={styles.container}>
            <Header
              onSubmitText={this.props.onSubmitText}
              onChangeTextInput={(text) => this.props.onChangeTextInput(text)}
              onFilter={this.props.handleFilter}
              />
            <FlatList
              data={this.props.condoList}
              ListEmptyComponent={this._renderEmpty}
              onEndReached={this.props.reachEnd}
              onEndReachedThreshold={0.3}
              renderItem={this._renderItems}
            />


            {this._renderUserInfo()}
            <GoBack goBack={this._goBack}/>
        </View>
      );
  }
}
