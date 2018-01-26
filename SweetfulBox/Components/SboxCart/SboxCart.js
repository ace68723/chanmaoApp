/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';


import Separator from "./separator";

const Realm = require('realm');
const realm = new Realm({path: "cm_2.4.0.realm"});


const {height, width} = Dimensions.get('window');
export default class SboxCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // _allBoxes: realm.objects('sbox_box'),
      _allBoxes: [{
        spu_id:5,
        sku_id:22,
        spu_name:"与美懒人大厨四川冒菜",
        sku_name:"豚骨菌菇(小包装)",
        sku_status:0,
        sku_amount:182,
        sku_original_price:"7.53",
        sku_price:"5.22",
        sku_quantity:1,
        sku_image_url:"https://chanmao.us/storage/image/sb_app/image/1_20170828.png"
      },
      {

      }]
    }
  }

  _renderBoxes(){
    let _boxes = [];
    for (var i = 0; i < this.state._allBoxes.length; i++) {
      const box = this.state._allBoxes[i];
      const productList = box.product;
      const key = 'cart'+i;
      _boxes.push(
        <View key={key} style={{}}>
          <View style={{backgroundColor:'#aa623f',
                        width:width,
                        height:30,
                        marginTop:20,
                        justifyContent:'center'
                      }}>
            <Text style={{color:'white',
                          marginLeft:10,
                          fontFamily:'FZZhunYuan-M02S',
                          }}>
              购物箱 NO.{box.boxId}
            </Text>
          </View>
          {this._renderBoxItem(productList)}
        </View>
      )
    }
    return _boxes;
  }
  _renderBoxItem(productList){
    let _productList = []
    for (var i = 0; i < productList.length; i++) {
      const product = productList[i]
      const key = 'cartItem'+i;
      _productList.push(
        <View key={key}
              style={{height:80}}
              >
          <Text>
            {product.fullname}
          </Text>
          <Text>
            ${product.price}
          </Text>
        </View>
      )
    }
    return _productList;
  }

  _renderRow(item) {
    return (
      <Text>
        123
      </Text>
    );
  }

  render() {
    const viewHeight = Dimensions.get('window').height;
    const viewWidth = Dimensions.get('window').width;
    const navigationHeight = viewHeight * (212/2208) - 17;
    return (
      <View style={styles.container}>
        <View style={[styles.navigation, {height: navigationHeight}]}>
			    	<View style={styles.back}>
			    	</View>
			    	<View style={styles.title}>
			       		<Text style={ {textAlign:'center', fontSize:20, fontWeight: '700'} }>购物箱</Text>
			    	</View>
			    	<View style={{flex:1}}>
            </View>
			  </View>
        <Separator/>
        <View style={styles.content}>
            <FlatList
                style={{}}
                data={this.state._allBoxes}
                renderItem={({item}) => this._renderRow(item)}
                ItemSeparatorComponent={() => {
                  return <Separator/>
                }}
            >
            </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
		backgroundColor: "white",
		marginTop: 17,
  },
  back: {
    flex: 1,
    justifyContent:'center',
  },
  navigation: {
    flexDirection:'row'
  },
  title: {
    flex:1,
    backgroundColor: 'white',
    justifyContent:'center',
    // backgroundColor: "blue",
  },
  content: {
    flex: 1,
    backgroundColor: '#a5a5a5',
  },
});
