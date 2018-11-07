/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  FlatList,
  TouchableOpacity
} from 'react-native';
const {height, width} = Dimensions.get('window');
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HomeAction from '../../Actions/HomeAction';
import HomeStore from '../../Stores/HomeStore';
import CheckoutAction from '../../Actions/CheckoutAction';
import CheckoutStore from '../../Stores/CheckoutStore';
import Cart from '../Cart/Cart'

type Props = {};
export default class Home extends Component<Props> {
  constructor() {
    super();
    this.state = HomeStore.getState();
    this._renderProduct = this._renderProduct.bind(this);
    this._onChange = this._onChange.bind(this);
    this._addItem = this._addItem.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this._goToCheckout=this._goToCheckout.bind(this);
  }
  componentDidMount() {
    HomeStore.addChangeListener(this._onChange);
    // setTimeout(() => {
    //   this.props.navigator.showModal({
    //      screen: "CmWashingHomeAlert",
    //      passProps: {
    //        message:"1111111"
    //      },
    //      animated: false,
    //      navigatorStyle: {navBarHidden: true},
    //     });
    // }, 6000);
    HomeAction.getProductList();

  }
  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onChange);
  }
  _goToCheckout(){
    this.Cart.dismiss();
    this.props.navigator.push({
      screen: 'checkout',
      title: '结算'
    });
  }
  _onChange() {
    const state = Object.assign({}, HomeStore.getState());
    this.setState(state);
  }

  _addItem(sku_id) {
    HomeStore.updateCartItem(sku_id, 1);
    const state = Object.assign({}, HomeStore.getState());
    this.setState(state);
  }
  _removeItem(sku_id) {
    HomeStore.updateCartItem(sku_id, -1);
    const state = Object.assign({}, HomeStore.getState());
    this.setState(state);
  }
  updateQuantity(sku_id, delta){
    HomeStore.updateCartItem(sku_id, delta);
    const state = Object.assign({}, HomeStore.getState());
    this.setState(state);
  }
  _renderProduct({item}) {
    const _display_price = () => {
      if (item.display_price != item.original_price) {
        return (
          <Text style={{ marginLeft: 2, marginTop: 3, fontSize: 10, color: '#999999', textDecorationLine: 'line-through' }}>
            ${parseFloat(item.original_price).toFixed(0) == parseFloat(item.original_price) ? parseFloat(item.original_price).toFixed(0) : item.original_price}
          </Text>
        )
      }
    }
    const _display_remove = () => {
      if (HomeStore.getItemAmount(item.sku_id) != 0)
        return (<TouchableOpacity onPress={() => { this._removeItem(item.sku_id) }} style={{ flex: 1 }}>
          <View style={{ flex: 1, marginBottom: 5, backgroundColor: '#2ad3be', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 5, fontSize: 15, color: 'white' }}>
              -
            </Text>
          </View>
        </TouchableOpacity>
      );
      return (
        <TouchableOpacity onPress={() => { this._removeItem(item.sku_id) }} style={{ flex: 1 }}>
          <View style={{ flex: 1, marginBottom: 5, backgroundColor: '#b3b3b3', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 5, fontSize: 15, color: 'white' }}>
              -
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.card}>
        <View style={{ width: 0.45 * width, height: 0.23 * height, backgroundColor: 'white', borderRadius: 10, overflow: 'hidden', }}>
          <View style={{ flex: 2}}>
            <Image source={{ uri: item.image }} style={{ flex: 1 }}/>
          </View>
          <View style={{ flex: 1, marginTop: 4}}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ marginLeft: 8, fontSize: 12, fontWeight: '800'}}>
                {item.name_zh}
              </Text>
            </View>
          <View style={{ flex: 1, flexDirection: 'row', marginRight: 8}}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ marginLeft: 8, fontSize: 14, color: '#2ad3be', fontWeight: '700'}}>
                ${parseFloat(item.display_price).toFixed(0) == parseFloat(item.display_price) ? parseFloat(item.display_price).toFixed(0) : item.display_price}
              </Text>
              {_display_price()}
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {_display_remove()}
              <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#404041', fontSize: 14, marginBottom: 5, fontWeight: '700'}}>
                  {HomeStore.getItemAmount(item.sku_id)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => { this._addItem(item.sku_id) }} style={{ flex: 1 }}>
                <View style={{ flex: 1, marginBottom: 5, backgroundColor: '#2ad3be', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ marginBottom: 5, fontSize: 15, color: 'white' }}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>)
  }
  renderCartButton(){
    let itemCount = 0;
    for (i of this.state.cartProducts){
      itemCount += i.amount;
    }
    return(
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.Cart.show()}>
            <Image source={require('./image/Cart.png')} style={{ width: 30, height: 30}}/>
          </TouchableOpacity>
          <View style={{position: 'absolute', left: 20, bottom: 20, backgroundColor: '#f24c58', paddingLeft: 4, paddingRight: 4, paddingTop: 1, paddingBottom: 1, textAlign: 'center', borderRadius: 100,}}>
            <Text style={{fontSize: 9,  color: 'white', fontWeight: '600'}}>
              {itemCount}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    )
  }
  renderNavigationBar(){
    return (
      <View style={{ width: width, height: 48, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
          <Image source={require('./image/Cart.png')} style={{ width: 30, height: 30 }}/>
        </View>
        <Text style={{ flex: 2, textAlign: 'center', fontWeight: '800', fontSize: 16, }}>
          馋猫干洗
        </Text>
        {this.renderCartButton()}
      </View>
    )
  }
  renderCategoryTabs(){
    const categories = [
      {"name": '全部', 'cid': null},
      {"name": '衣服', 'cid': 1},
      {"name": '鞋子', 'cid': 2},
      {"name": '居家', 'cid': 3},
    ]
    let content = [];
    for (i of categories){
      content.push(
        <Animated.View tabLabel={i.name} style={{flex: 1}}>
          <FlatList
            scrollEventThrottle={1}
            ref={(comp) => this._scrollVew = comp}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.3}
            data={i.cid ? this.state.productList.filter(product=>product.cid==i.cid) : this.state.productList}
            renderItem={this._renderProduct}
            getItemLayout={(data, index) => ({ length: 250, offset: 250 * index, index})}
            numColumns={2}
            columnWrapperStyle={{ marginTop: 10 }}
          />
        </Animated.View>
      )
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#f4f4f4'}}>
        <ScrollableTabView
          style={{height: 40}}
          tabBarBackgroundColor={'#f4f4f4'}
          tabBarActiveTextColor={'#2ad3be'}
          tabBarUnderlineStyle={{backgroundColor: '#2ad3be', height: 2, width: 40, marginLeft: 25}}
          tabBarTextStyle={{ fontSize: 14, top: 5, fontWeight: '700'}}
          tabBarInactiveTextColor={'#666666'}
          initialPage={0}
          prerenderingSiblingsNumber={3}
          tabBarPosition={'top'}
          ref={(scrollView) => {this.scrollView = scrollView}}
          contentProps={{ keyboardDismissMode: "on-drag", keyboardShouldPersistTaps: 'always'}}>
          {content}
        </ScrollableTabView>
      </View>
    )
  }
  render() {
    return (<View style={styles.container}>
      {this.renderNavigationBar()}
      {this.renderCategoryTabs()}
      <Cart ref={ref => this.Cart = ref} goToCheckout={this._goToCheckout} currentCart={this.state.cartProducts} onPressedQuantity={this.updateQuantity}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 6,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
});
