import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('window');
import CheckoutDelivery from './Subview/CheckoutDelivery.js'
import CheckoutUserInfo from './Subview/CheckoutUserInfo.js'
import CheckoutPayment from './Subview/CheckoutPayment.js'
import CheckoutOrderInfo from './Subview/CheckoutOrderInfo.js'

import CheckoutAction from '../../Actions/CheckoutAction';
import CheckoutStore from '../../Stores/CheckoutStore';

import DateTimePicker from '../Common/Picker/Picker'

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = CheckoutStore.getState();
    this.renderItemCells = this.renderItemCells.bind(this);
    this._onChange = this._onChange.bind(this);

    this.onPressedPickupTime = this.onPressedPickupTime.bind(this);
    this.onPressedDeliveryTime = this.onPressedDeliveryTime.bind(this);
    this.onConfirmPickupTime = this.onConfirmPickupTime.bind(this);
    this.onConfirmDeliveryTime = this.onConfirmDeliveryTime.bind(this);
    this._placeOrder=this._placeOrder.bind(this);
    this.onChangeComment=this.onChangeComment.bind(this);
    this._goToAddress=this._goToAddress.bind(this);
    this._goToCard=this._goToCard.bind(this);
    this.renderPlaceOrderButton=this.renderPlaceOrderButton.bind(this);
  }
  componentDidMount() {
    CheckoutStore.addChangeListener(this._onChange);
    CheckoutAction.getCard()
  }
  _onChange() {
    const state = Object.assign({}, CheckoutStore.getState());
    this.setState(state);
    // 同步delivery picker的data source
    this.PickerDelivery.forceReloadDataSource();
    if (this.state.placeOrderStatus==0) {
      // alert('下单成功');
      this.props.navigator.resetTo({
          screen: 'CmLifeMainTab',
          animated: true,
          animationType: 'fade',
          navigatorStyle: {navBarHidden: true},
          passProps:{
            fromPage:1,
          }
        });
    }
  }
  componentWillUnmount() {
    CheckoutStore.removeChangeListener(this._onChange);
  }
  onPressedPickupTime(){
    this.Picker.show();
  }
  onPressedDeliveryTime(){
    this.PickerDelivery.show();
  }
  onConfirmPickupTime(pickedData){
    // CheckoutAction.resetDeliveryTime();
    CheckoutAction.getDeliveryTime(
      pickedData.selectedPrimaryOptions,
      pickedData.selectedSecondaryOptions,
      this.state.ev_wash_time
    );
  }
  onConfirmDeliveryTime(deliveryData){
    CheckoutAction.selectDeliveryTime(deliveryData.selectedPrimaryOptions,deliveryData.selectedSecondaryOptions);
  }
  _placeOrder()
  {
    let productsList=[];
    for (i of this.state.ea_products)
    {
      let product={
        'sku_id':i.sku_id,
        'amount':i.amount,
      }
      productsList.push(product);
    }
    let data={
      'location_id':this.state.ea_store_info[0].location_id,
      'pickup_date':this.state.selectedPickUpDate,
      'pickup_time':this.state.selectedPickUpTime,
      'delivery_date':this.state.selectedDeliveryDate,
      'delivery_time':this.state.selectedDeliveryTime,
      'comment':this.state.comment,
      'products':productsList,
    };
    CheckoutAction.placeOrder(data);
  }
  renderPlaceOrderButton()
  {
    if (this.state.selectedPickUpDate && this.state.selectedDeliveryDate && this.state.eo_user_info && this.state.eo_last4) {
      return (
        <TouchableOpacity style={{position:'absolute', bottom:0, backgroundColor:'#2ad3be'}} onPress={this._placeOrder}>
          <View style={{width:width,height: 56,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize: 16, color:'white', fontWeight: '800'}}>
              下单
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
        <View style={{position:'absolute', bottom:0, backgroundColor:'grey', width:width, height: 56, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 16, color:'white', fontWeight: '900'}}>
            下单
          </Text>
        </View>
    )
  }
  onChangeComment(comment){
    this.setState({comment:comment})
  }
  renderItemCells(item) {
    switch (item) {
      case "delivery":
        return (
          <CheckoutDelivery
          cardStyle={styles.card}
          onPressedPickupTime={this.onPressedPickupTime}
          onPressedDeliverTime={this.onPressedDeliveryTime}
          selectedPickUpDate={this.state.selectedPickUpDate}
          selectedPickUpTime={this.state.selectedPickUpTime}
          selectedDeliveryDate={this.state.selectedDeliveryDate}
          selectedDeliveryTime={this.state.selectedDeliveryTime}
          />
        )
        break;
      case "userInfo":
        return (<CheckoutUserInfo userInfo={this.state.eo_user_info} gotoAddress={this._goToAddress} cardStyle={styles.card}/>)
        break;
      case "payment":
        return (<CheckoutPayment gotoCard={this._goToCard} cardInfo={this.state.eo_last4} cardStyle={styles.card}/>)
        break;
      case "orderInfo":
        return (
          <CheckoutOrderInfo
            productList={this.state.ea_products}
            delifee={this.state.ev_delifee}
            tax={this.state.ev_tax_w_deli}
            total={this.state.ev_total_w_deli}
            cardStyle={styles.card}
            onChangeComment={this.onChangeComment}
          />
        )
        break;
      default:
    }
  }
  _goToAddress()
  {
    this.props.navigator.showModal({
      screen: 'CmWashAddAddress',
      navigatorStyle: {navBarHidden: true},
    })
  }
  _goToCard()
  {
    this.props.navigator.showModal({
      screen: 'CmWashChooseCardType',
      navigatorStyle: {navBarHidden: true},
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height:0.8*height,width:width,}}>
          <FlatList
            data={['delivery', 'userInfo', 'payment', 'orderInfo']}
            renderItem={({item}) => (this.renderItemCells(item))}
          />
        </View>

        {this.renderPlaceOrderButton()}

        {
          this.state.ea_pickup_time.length != 0 &&
          <DateTimePicker
            ref={ref => this.Picker = ref}
            items={this.state.ea_pickup_time}
            linked={true}
            primaryKey={"date"}
            secondaryKey={"available_time"}
            onPickerConfirm={this.onConfirmPickupTime}
          /> }

        { this.state.delivery_time.length != 0 &&
          <DateTimePicker
            ref={ref => this.PickerDelivery = ref}
            items={this.state.delivery_time}
            linked={true}
            primaryKey={"date"}
            secondaryKey={"available_time"}
            onPickerConfirm={this.onConfirmDeliveryTime}
          /> }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
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