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

const { height, width } = Dimensions.get('window');

export default class SboxCart extends Component {
  constructor(props) {
    super(props);
    this.state = SboxCartStore.getState();
    this._renderItem = this._renderItem.bind(this);
    this._onChange = this._onChange.bind(this);
    this._addQuantity = this._addQuantity.bind(this);
    this._subQuantity = this._subQuantity.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }
  componentDidMount(){
      SboxCartStore.addChangeListener(this._onChange);
      SboxCartAction.checkStock();
  }
  componentWillUnmount() {
    SboxCartStore.removeChangeListener(this._onChange);
    SboxCartStore.initState();
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

  _renderButton(item) {
      if(item.sku_quantity <= item.sku_amount){
        return (
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={this._subQuantity.bind(null,item)}
              style={{justifyContent: 'center'}}>
              <Text style={{borderWidth: 0.8,
                            width: 20,
                            textAlign: 'center'}}>-</Text>
            </TouchableOpacity>
            <View style={{justifyContent: 'center', marginLeft: -1}}>
              <Text style={{borderWidth: 0.8,
                            width: 50,
                            textAlign: 'center',
                            color: '#ff7685'}}>
                {item.sku_quantity}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={this._addQuantity.bind(null,item)}
              style={{justifyContent: 'center', marginLeft: -1}}>
              <Text style={{borderWidth: 0.8,
                            width: 20,
                            textAlign: 'center'}}>+</Text>
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
        <View style={styles.itemImage}>
          <Image style={styles.image} source={{uri:sku_image_url}}/>
        </View>

        <View style={{flex:1,flexDirection:'row',}}>
          <View style={{flex:0.8,paddingRight:10,}}>
            <Text style={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}>{spu_name}  {sku_name}</Text>
            {this._renderButton(item)}
          </View>
          <View style={{flex:0.2, justifyContent: 'space-between', flexDirection: 'column'}}>
            <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',textAlign: 'right'}}>${sku_price}</Text>
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
  render() {
    return (
      <FlatList
          data={this.state.cartList}
          renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: height * (295 / 2208),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    alignItems: 'center',
    padding:10,
    // marginHorizontal: width * (38 / 1242),
  },
  itemImage: {
    marginLeft: width * (54 / 1242),
    marginRight: width * (118 / 1242),
  },
  image: {
    height: height * (400 / 2208),
    width: width * (165 / 1242),
    resizeMode: 'contain',
  },
  itemPrice: {
    fontSize: (38 / 0.75) / 2208 * height,
  },
});
