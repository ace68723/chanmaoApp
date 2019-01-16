/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import EwalletProductView from './EwalletProductView';
const { width, height } = Dimensions.get('window');
import Settings from '../../Config/Setting';
import BagModule from '../../Modules/BagModule/BagModule'
export default class Home extends Component {
  constructor(props)
  {

    super(props);
    this.state = {
      card_list:[]
    }
    this._goToProductDetail = this._goToProductDetail.bind(this);
    this._renderProduct = this._renderProduct.bind(this);
  }
  async componentDidMount()
  {
    this._getCardList()
  }
  async _getCardList()
  {
    try {
      const data=await BagModule.getCardList();
      console.log(data);
      this.setState({
        card_list:data.cardLists,
      })
    } catch (e) {
      console.log(e);
    }

  }
  async _goToProductDetail(item) {
    try{
      const data = await BagModule.getCardBalance(item.account_id);
      console.log(data);
      this.props.navigator.push({
        screen: 'EwalletCardDetail',
        navigatorStyle: {navBarHidden: true},
        passProps:{
          selectedProduct:item,
          balance: data.card_balance
        },
      })
    }catch(e) {
      console.log(e);
    }


  }
  _renderProduct({item}) {
      return (
        <TouchableOpacity
        onPress={() => this._goToProductDetail(item)}>
        <EwalletProductView
              product={item}
            />
         </TouchableOpacity>
      );
  }
  _keyExtractor = (product, index) => product.sku_id+'index'+index;

  _renderHeader() {
    // height * 0.4106 + 80
    return(
      <View style={{
          height: 55,
          flex: 1,
          backgroundColor:'#242730',
          alignContent:'center'
        }}>
         <StatusBar
              barStyle="light-content"
         />
         <Text style={{
            fontSize:20,
            color:'white',
            paddingTop: Settings.getY(30),
            marginLeft:0.44*width}}>
        卡包
      </Text>
      </View>
    )
  }

  render() {
    return (
       <FlatList
            scrollEventThrottle={1}
            style={this.props.style}
            ref={(comp) => this._scrollVew = comp}
            ListHeaderComponent={this._renderHeader}
            onEndReachedThreshold={0.3}
            // onScroll={this.props.scrollEventBind()}
            data={this.state.card_list}
            renderItem={this._renderProduct}
            keyExtractor={this._keyExtractor}
            getItemLayout={(data, index) => (
                 {length: 250, offset: 250 * index, index}
               )}
           stickyHeaderIndices={[0]}
           numColumns={2}
           columnWrapperStyle={{ marginTop: 10,alignSelf:'center' }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
