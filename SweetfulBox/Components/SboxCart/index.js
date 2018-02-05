/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import SboxCartAction from '../../Actions/SboxCartAction';
import SboxCartStore from '../../Stores/SboxCartStore';

import SboxHeader from '../../../App/Components/General/SboxHeader';

const { height, width } = Dimensions.get('window');

  let viewMarginTop;
  if(height == 812){
    viewMarginTop = 45;
  }else{
    viewMarginTop = 20;
  }

export default class SboxCart extends Component {
  constructor(props) {
    super(props);
    this.state = SboxCartStore.getState();
    this._renderItem = this._renderItem.bind(this);
    this._onChange = this._onChange.bind(this);
    this._addQuantity = this._addQuantity.bind(this);
    this._subQuantity = this._subQuantity.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._goToCheckout = this._goToCheckout.bind(this);
    this._renderGoBackBtn = this._renderGoBackBtn.bind(this);
  }
  componentDidMount(){
      SboxCartStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    SboxCartStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    const cartState = SboxCartStore.getState();
    this.setState(Object.assign({},cartState));
  }


  _addQuantity(item){
    SboxCartAction.addQuantity(item);
  }
  _subQuantity(item){
    SboxCartAction.subQuantity(item);
  }
  _deleteItem(item){
    Alert.alert(
      '删除',
      item.spu_name + " " + item.sku_name,
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确认', onPress: () => {SboxCartAction.deleteItem(item);}},
      ],
      { cancelable: false }
    )

  }

  _goToCheckout(){
    const cartList = this.state.cartList;
    this.props.navigator.showModal({
      screen: "SboxCheckout",
      title: "Modal",
      navigatorStyle: {navBarHidden: true},
      animationType: 'none'
    });
  }
  _renderGoBackBtn(){
    this.props.navigator.pop()
  }
  _renderButton(item) {
      if(item.sku_quantity <= item.sku_amount){
        return (
          <View style={{flexDirection: 'row',  marginTop: 10}}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={this._subQuantity.bind(null,item)}>

              <View style={{justifyContent: 'center',
                            alignItems:'center',
                            height: 30,
                            width: 30,
                            borderWidth: 1,}}>
                <Text style={{fontSize:20}}>-</Text>
              </View>

            </TouchableOpacity>
            <View style={{justifyContent: 'center',
                          width: 50,
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          justifyContent: 'center',
                          alignItems:'center',
                        }}>
              <Text style={{ fontSize:18,
                             color: '#ff7685'}}>
                {item.sku_quantity}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={this._addQuantity.bind(null,item)}>
              <View style={{justifyContent: 'center',
                            alignItems:'center',
                            height: 30,
                            width: 30,
                            borderWidth: 1,}}>
                <Text style={{fontSize:20}}>+</Text>
              </View>
            </TouchableOpacity>

          </View>
        )
      }else{
        return(
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
            <Text style={{backgroundColor: "#ff7685",
                          width: 90,
                          textAlign: "center",
                          color: "white"}}>Sold Out</Text>
          </View>
        )
      }
  }
  _renderItem({item}) {
    const {sku_image_url,spu_name,sku_name,sku_quantity,sku_amount,sku_price} = item;
    return(
      <View style={styles.item}>

        <Image style={styles.image} source={{uri:sku_image_url}}/>

        <View style={{flex:1,flexDirection:'row',marginLeft:20}}>
          <View style={{flex:0.7,paddingRight:10,}}>
            <Text numberOfLines={2}
                  style={{fontSize:15,
                          fontFamily:'FZZhunYuan-M02S',

                        }}>
                {spu_name}
            </Text>
            <Text numberOfLines={1}
                  style={{fontSize:12,
                          fontFamily:'FZZhunYuan-M02S',
                          marginTop:10,
                          color:"#6d6e71",
                        }}>
                {sku_name}
            </Text>
            {this._renderButton(item)}
          </View>
          <View style={{flex:0.3, justifyContent: 'space-between', flexDirection: 'column'}}>
            <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',textAlign: 'right'}}>
            ${sku_price}
            </Text>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{alignItems: 'flex-end'}}
              onPress={this._deleteItem.bind(null,item)}
              >
              <Image  style={{width:18.72,height:20}}
                      source={require('./Image/icon-delete.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )



  }
  _renderConfirmBtn() {
      return(
        <View style={{
          position:'absolute',
          bottom:0,
          width:width,}}>
          <View style={{flexDirection:'row',
                        margin:10,
                        marginLeft:20,
                        marginRight:20,}}>
            <Text style={{
              flex:0.7,
              color:'#ff7685',
              fontSize:20,
              fontFamily:'FZZhunYuan-M02S',
              textAlign:'left',
            }}>
                Before Tax: ${Number(this.state.total).toFixed(2)}
            </Text>
            <Text style={{
              flex:0.3,
              color:'#ff7685',
              fontSize:20,
              fontFamily:'FZZhunYuan-M02S',
              textAlign:'right',
            }}>
                 {this.state.totalQuantity}件
            </Text>
          </View>
          <TouchableOpacity
              style={{height:60,}}
              onPress={this._goToCheckout}
              activeOpacity={0.4}>
            <View style={{
                          flex:1,
                          alignItems:'center',
                          justifyContent:'center',
                          backgroundColor:'#ff7685',
                        }}>

                <Text style={{
                  color:'#ffffff',
                  fontSize:20,
                  fontFamily:'FZZhunYuan-M02S',}}>
                     去结账
                </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
  }
  _keyExtractor = (item, index) => item.sku_id;
  render() {
    return (
      <View style={styles.container}>
        <SboxHeader title={"购物箱"}
                goBack={this._renderGoBackBtn}
                leftButtonText={'x'}/>
        <View style={styles.separator}>
        </View>
        <FlatList
            data={this.state.cartList}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
        />

        {this._renderConfirmBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: viewMarginTop,
    // backgroundColor:'red',
  },
  separator: {
    height: 1,
    borderWidth: 0.6,
    borderColor: "#D5D5D5"
  },
  item: {
    // height: height * (295 / 2208),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    alignItems: 'center',
    padding:10,
    // marginHorizontal: width * (38 / 1242),
  },
  // 620*870 0.7126
  image: {
    height: width * (240 / 1242)/0.7126,
    width: width * (240 / 1242),
  },
  itemPrice: {
    fontSize: (38 / 0.75) / 2208 * height,
  },
});
