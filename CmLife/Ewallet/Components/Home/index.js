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

import ProductListModule from '../../Modules/ProductListModule/ProductListModule'
export default class Home extends Component {
  constructor(props)
  {

    super(props);
    this.state = {
      prod_list:[]
    }
    this._goToProductDetail = this._goToProductDetail.bind(this);
    this._renderProduct = this._renderProduct.bind(this);
  }
  async componentDidMount()
  {
    this._getProductList()
  }
  async _getProductList()
  {
    try {
      const data=await ProductListModule.getProductList();
      this.setState({
        prod_list:data,
      })
    } catch (e) {
      console.log(e);
    }

  }
  _goToProductDetail(item) {
    this.props.navigator.push({
      screen: 'EwalletProductDetail',
      navigatorStyle: {navBarHidden: true},
      passProps:{
        selectedProduct:item,
        goToPage:this.props.goToPage
      },
    })

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
        商城
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
            data={this.state.prod_list}
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
