import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import BaseDialog from '../Common/BaseDialog';
import CartItemList from './CartItemList'
import Common from '../../Constants/Common'

import HomeAction from '../../Actions/HomeAction';
import CheckoutAction from '../../Actions/CheckoutAction';
import HomeStore from '../../Stores/HomeStore';
import CheckoutStore from '../../Stores/CheckoutStore';

export default class Cart extends BaseDialog {

  static defaultProps = {
    removeSubviews: false,
  }

  constructor(props) {
    super(props);
    this._goToCheckout=this._goToCheckout.bind(this);
    this.clearCart=this.clearCart.bind(this);
  }

  _getContentPosition() {
    return {justifyContent: 'flex-start', alignItems: 'center'}
  }

  clearCart(){
    let removing = [];
    for (i of this.props.currentCart){
      removing.push({id: i.sku_id, amount: i.amount})
    }
    for (i of removing){
      this.props.onPressedQuantity(i.id, -i.amount);
    }
    this.dismiss();
  }
  shouldAllowedCheckout(){
    return this.getCartTotal() >= 30;
  }
  shouldAllowedDiscount(){
    return this.getCartTotal() >= 60;
  }
  getCartTotal(){
    let total = 0;
    for (i of this.props.currentCart){
      total += i.display_price * i.amount;
    }
    return total.toFixed(2);
  }

  getCartTax(){
    return (this.getCartTotal() * 0.13).toFixed(2);
  }

  renderCart() {
    return (
      <View style={{margin: 12}}>
        {this.renderCartHeader()}
        {this.renderCartItems()}
        <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.8, }} />
        {this.renderCartFooter()}
      </View>
    )
  }
  renderCartHeader(){
    return (
      <View style={styles.header}>
        <View style={[styles.clearButton, {flex: 1}]}>
          <TouchableOpacity onPress={this.clearCart}>
            <Text allowFontScaling={false} style={styles.clearButtonText}>全部清空</Text>
          </TouchableOpacity>
        </View>
        <Text allowFontScaling={false} style={[styles.headerTitle, {flex: 3,fontFamily: 'NotoSans-Black'}]}>购物车</Text>
        <View style={{flex: 1}}></View>
      </View>
    )
  }
  renderCartItems(){
    const cellHeight = 32;
    return (
      <View style={{height: cellHeight * this.props.currentCart.length, marginTop: 12, marginBottom: 4,}}>
        <CartItemList items={this.props.currentCart}
                      onPressedQuantity={this.props.onPressedQuantity}/>
      </View>
    )
  }
  renderDiscount(){
    const discountText = "满$60免运费";
    return (
      <View style={{flexDirection: 'row'}}>
        {
          this.shouldAllowedDiscount() &&
          <Image style={styles.shippingIcon} source={require('./Image/yes.png')}/>
        }
        {
          !this.shouldAllowedDiscount() &&
          <Image style={styles.shippingIcon} source={require('./Image/no.png')}/>
        }
        <Text allowFontScaling={false} style={styles.shippingText}>{discountText}</Text>
      </View>
    )
  }
  renderCartFooter(){
    return (
      <View style={{height: 22, marginTop: 20, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          { this.state.allowedShipping &&
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.shippingIcon} source={require('./Image/yes.png')}/>
              <Text allowFontScaling={false} style={styles.shippingText}>可配送</Text>
            </View>
          }
          { !this.state.allowedShipping &&
            <View style={{flexDirection: 'row'}}>
            {(!this.shouldAllowedCheckout()) && <Image style={styles.shippingIcon} source={require('./Image/no.png')}/>}

            {(this.shouldAllowedCheckout()) && <Image style={styles.shippingIcon} source={require('./Image/yes.png')}/>}
            <Text allowFontScaling={false} style={styles.shippingText}>满$30起送</Text>
            </View>
          }
          { this.renderDiscount() }
        </View>
        <View style={{flex: 1, marginTop: -4}}>
          <Text allowFontScaling={false} style={styles.taxText}> </Text>
          <Text allowFontScaling={false} style={styles.totalText}>总计: ${this.getCartTotal()}</Text>
        </View>
      </View>
    )
  }
  _goToCheckout()
  {
    if (!this.shouldAllowedCheckout()){
      return;
    }

    let iv_products=[];
    let products=HomeStore.getItem();
    for (i=0;i<products.length;i++)
    {
      let currentProd={
        sku_id:products[i].sku_id,
        amount:products[i].amount,
      }
      iv_products.push(currentProd);
    }
    let lo_data={
      token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDA3ODU5NDUsImV4cCI6MTU3MjMyMTk0NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVpZCI6IjEifQ.RIk_KgD_Oq31NkB6FSL0_PsRhmRWA3DwOLz2Fj4bjhI',
      products:iv_products,
    }
    CheckoutAction.beforeOrder(lo_data);
    this.props.goToCheckout();
  }

  renderCheckoutButton() {
    return (
      <TouchableOpacity
        onPress={this._goToCheckout}
        style={[styles.checkoutButton, !this.shouldAllowedCheckout() ? {backgroundColor: '#999999'}: {backgroundColor: Common.MAIN_COLOR,}]}>
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center', }} >
          <Text allowFontScaling={false} style={{color: 'white', fontSize: 15, fontWeight: '700',}}>结算</Text>
        </View>
      </TouchableOpacity>
    )
  }
  renderContent() {
    return <View style={[styles.container, {width: this.mScreenWidth - (12 * 2),}]}>
      { this.renderCart() }
      {this.renderCheckoutButton()}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginTop: 48,
    borderRadius: 6,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 15,
  },
  clearButton: {

  },
  clearButtonText: {
    textAlign: 'center',
    color: "grey",
    fontWeight: '700',
    fontSize: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  shippingIcon: {
    height: 13,
    width: 13,
    marginRight: 6,
  },
  shippingText: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily:'NotoSans-Regular',
  },
  taxText: {
    textAlign: 'right',
    fontSize: 11,
    color: 'grey',
    fontWeight: '600',
    marginBottom: 4,
    fontFamily:'NotoSans-Regular',
  },
  totalText: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '600',
    fontFamily:'NotoSans-Regular',
  },
  checkoutButton: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 42,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 22,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  }
});
