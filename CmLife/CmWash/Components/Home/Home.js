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
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
const {height, width} = Dimensions.get('window');
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HomeAction from '../../Actions/HomeAction';
import HomeStore from '../../Stores/HomeStore';
import CheckoutAction from '../../Actions/CheckoutAction';
import CheckoutStore from '../../Stores/CheckoutStore';
import Cart from '../Cart/Cart'
import BaseComponent from '../Common/BaseComponent'
import PopupView from '../Common/Popup/PopupView'

type Props = {};
export default class Home extends BaseComponent<Props> {
  constructor() {
    super();
    this.state = HomeStore.getState();
    this._renderProduct = this._renderProduct.bind(this);
    this._onChange = this._onChange.bind(this);
    this._addItem = this._addItem.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this._goToCheckout=this._goToCheckout.bind(this);
    this.renderNavigationBar=this.renderNavigationBar.bind(this);
    this._goBack=this._goBack.bind(this);

    this.popupView = PopupView.getInstance();
  }
  componentDidMount() {
    HomeStore.addChangeListener(this._onChange);
    setTimeout(() => {
      this.props.navigator.showModal({
         screen: "CmWashingHomeAlert",
         passProps: {
           message:"馋猫干洗配送范围，\n具体地址可在填写订单时确认"
         },
         animated: false,
         navigatorStyle: {navBarHidden: true},
        });
    }, 1000);
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

    if (this.state.cartProducts.length == 0){
      this.Cart.dismiss()
    }
  }
  _showProductDescription(itemName, description){
    this.popupView.showAlertWithTitle(this, itemName, "1231312312312312312312\ndsadasda\ndsadasdasda\nsdadasdsasa");
  }
  _renderProduct({item}) {
    const _display_price = () => {
      if (item.display_price != item.original_price) {
        return (
          <Text allowFontScaling={false}
                style={{fontFamily:'NotoSans-Regular',
                        marginLeft: 2,
                        marginTop: 3,
                        fontSize: 10,
                        color: '#999999',
                        textDecorationLine: 'line-through'}}>
            ${parseFloat(item.original_price).toFixed(0) == parseFloat(item.original_price) ? parseFloat(item.original_price).toFixed(0) : item.original_price}
          </Text>
        )
      }
    }
    const _display_remove = () => {
      if (HomeStore.getItemAmount(item.sku_id) != 0)
        return (
        <TouchableOpacity onPress={() => { this._removeItem(item.sku_id) }} style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('./image/minus.png')} style={{ width: 20, height: 20}}/>
        </TouchableOpacity>
      );
      return (
        <TouchableOpacity onPress={() => { this._removeItem(item.sku_id) }} style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('./image/minus-disabled.png')} style={{ width: 20, height: 20}}/>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.card}>
        <View style={{ width: 0.47 * width, height: 160, backgroundColor: 'white', borderRadius: 6, overflow: 'hidden', }}>
          <View style={{ flex: 2}}>
            <Image source={{ uri: item.image }} style={{ flex: 1 }}/>

            {
              item.display_price != item.original_price &&
              <Image
                source={require('./image/offer.png')}
                style={{ position: 'absolute', width: 28 * 1.3, height: 28, marginTop: 8, marginLeft: 8}}
              />
            }

            {
              item.display_price != item.original_price &&
              <TouchableOpacity
                onPress={() => {this._showProductDescription(item.name_zh, item.description_zh)}}
                style={{ position: 'absolute', alignSelf: 'flex-end', right: 12, marginTop: 8}}>
                <Image
                  source={require('./image/info.png')}
                  style={{ width: 16, height: 16, }}
                />
              </TouchableOpacity>
            }



          </View>
          <View style={{ flex: 1, marginTop: 8}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start',  }}>
              <Text allowFontScaling={false} style={{ fontFamily:'NotoSans-Regular',marginLeft: 8, fontSize: 13, fontWeight: '800'}}>
                {item.name_zh}
              </Text>
            </View>
          <View style={{ flex: 1, flexDirection: 'row', marginRight: 8, marginBottom: 8}}>
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <Text allowFontScaling={false} style={{ fontFamily:'NotoSans-Regular',marginLeft: 8, fontSize: 14, color: '#2ad3be', fontWeight: '700'}}>
                ${parseFloat(item.display_price).toFixed(0) == parseFloat(item.display_price) ? parseFloat(item.display_price).toFixed(0) : item.display_price}
              </Text>
              {_display_price()}
              <Text allowFontScaling={false} style={{fontFamily:'NotoSans-Regular',fontSize:14,marginLeft:2}}>
                {item.unit}
              </Text>
            </View>

            <View style={{ flex: 2, flexDirection: 'row' }}>
              {_display_remove()}
              <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text allowFontScaling={false} style={{ fontFamily:'NotoSans-Regular',color: '#404041', fontSize: 14, fontWeight: '700'}}>
                  {HomeStore.getItemAmount(item.sku_id)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => { this._addItem(item.sku_id) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('./image/add.png')} style={{ width: 20, height: 20}}/>
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
      <View style={{flexDirection: 'row', flex: 1, marginRight: -8}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.Cart.show()}>
            <Image source={require('./image/Cart.png')} style={{ width: 30, height: 30}}/>
          </TouchableOpacity>
          <View style={{position: 'absolute',
                        left: 20,
                        bottom: 20,
                        backgroundColor: '#f24c58',
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingTop: 1,
                        paddingBottom: 1,
                        borderRadius: 100,}}>
            <Text allowFontScaling={false} style={{fontFamily:'NotoSans-Regular',fontSize: 9,  color: 'white', fontWeight: '600'}}>
              {itemCount}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    )
  }
  _goBack()
  {
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
    });
  }
  renderNavigationBar(){
    return (
      <View style={{ width: width, height: 48 + this.mSafeZoneHeight, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <TouchableWithoutFeedback onPress={this._goBack}>
          <View style={{ flex: 1, justifyContent: 'flex-start', }}>
            <Image source={require('./image/icon_back_green.png')} style={{ marginLeft: 12, width: 26, height: 26 }}/>
          </View>
        </TouchableWithoutFeedback>
        <Text allowFontScaling={false} style={{ fontFamily: 'NotoSans-Black',flex: 2, textAlign: 'center', fontWeight: '800', fontSize: 16, }}>
          馋猫干洗
        </Text>
        {this.renderCartButton()}
      </View>
    )
  }
  renderCategoryTabs(){
    const categories = [
      {"name": '全部', 'cid': 0},
      {"name": '衣服', 'cid': 1},
      {"name": '鞋子&包', 'cid': 2},
      {"name": '居家', 'cid': 3},
    ]
    let content = [];
    for (i of categories){
      content.push(
        <Animated.View key={i.cid}
                       tabLabel={i.name}
                       style={{flex: 1}}>
          <FlatList
            scrollEventThrottle={1}
            ref={(comp) => this._scrollVew = comp}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.3}
            data={i.cid ? this.state.productList.filter(product=>product.cid==i.cid) : this.state.productList}
            renderItem={this._renderProduct}
            getItemLayout={(data, index) => ({ length: 250, offset: 250 * index, index})}
            numColumns={2}
            keyExtractor={(item, index) => item.sku_id}
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
    return (
      <View style={styles.container}>
        {this.state.showPopup && this.popupView.show()}s
        {this.renderNavigationBar()}
        {this.renderCategoryTabs()}
        <Cart ref={ref => this.Cart = ref} goToCheckout={this._goToCheckout} currentCart={this.state.cartProducts} onPressedQuantity={this.updateQuantity}/>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    backgroundColor: 'white'
  },
  card: {
    width: 0.47 * width,
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
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
