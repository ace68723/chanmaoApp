// @flow
// SboxProductDetial


import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';
import Settings from '../../Config/Setting';
import Barcode from 'react-native-barcode-builder';

import {
    findIndex,
} from 'lodash';

const {width,height} = Dimensions.get('window');
let marginTop;
if(height == 812){
  marginTop = 34;
}else{
  marginTop = 20;
}
import CheckoutModule from '../../Modules/CheckoutModule/CheckoutModule';

import OrderModule from '../../Modules/OrderModule/OrderModule'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import SboxProductDetialScrollView from './SboxProductDetialScrollView';
import SboxProductDetialDesc from './SboxProductDetialDesc';
import SboxProductDetialAttr from './SboxProductDetialAttr';
import SboxProductService from './SboxProductService';
import SboxProductFacts from './SboxProductFacts';

// import SboxBox from '../SboxBox/SboxBox';

// import SboxProductAction from '../../Actions/SboxProductAction';
// import SboxProductStore from '../../Stores/SboxProductStore';
// import SboxCartAction from '../../Actions/SboxCartAction';





export default class EwalletProductDetail extends Component {
	constructor(props) {
    super(props);
    this.state = {
      selectedProduct: props.selectedProduct,
      value: 0,
      placeholder:'',
      balance:props.balance
    }
    this._goBack = this._goBack.bind(this);
    this._renderImage = this._renderImage.bind(this);
    this._renderCondition = this._renderCondition.bind(this);
  }
  componentWillMount() {
  }
  componentDidMount(){
      // console.log(this.props);

  }
  componentWillUnmount() {

  }




  //route
  _goBack() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }


  //render

  _renderGoBackBtn() {
    return(
      <TouchableOpacity style={{paddingTop:0,
                                paddingLeft:8,
                                paddingRight:20,
                                paddingBottom:20,
                                position:'absolute',
                                top:marginTop,
                                left:0,}}
                        onPress={this._goBack}>
        <View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
          <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}
                allowFontScaling={false}>
            ×
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderImage() {
    return(
    <View style = {styles.card}>
      <Image source={{uri:this.state.selectedProduct.image_url}}
             style={{
                      width:width,
                      height:width/1.5,
                   }}
      />
    </View>
    )
  }
  _renderCondition() {
    return(
      <View style = {{
      marginTop:18, alignContent:'center', paddingHorizontal:Settings.getX(20),
    }}>
        <View style = {{justifyContent:'center', marginBottom:Settings.getX(10)}}>
          <Text style={{
            color:'#848689',
            fontWeight:'500',
            fontSize:15,
          }}
          allowFontScaling={false}>
            使用方法
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: '#A8A8A8',
            borderBottomWidth: 0.4,
            marginBottom:Settings.getX(10)
          }}
        />
        <View style = {{justifyContent:'center', marginBottom:Settings.getX(10)}}>
          <Text style={{
            color:'#848689',
            fontWeight:'300',
            fontSize:13,
          }}
          allowFontScaling={false}>
            1. 网上购物:{this.state.selectedProduct.sku_online}
          </Text>
        </View>
        <View style = {{justifyContent:'center',marginBottom:Settings.getX(10)}}>
          <Text style={{
            color:'#848689',
            fontWeight:'300',
            fontSize:13,
          }}
          allowFontScaling={false}>
            2. 实体店购物:{this.state.selectedProduct.sku_instore}
          </Text>
        </View>
        <View style = {{justifyContent:'center',marginBottom:Settings.getX(10)}}>
          <Text style={{
            color:'#848689',
            fontWeight:'300',
            fontSize:13,
          }}
          allowFontScaling={false}>
            3. Sales使用方法:{this.state.selectedProduct.sku_sales}
          </Text>
        </View>
      </View>
    )
  }
  render() {
      // if(this.state.loading) {
      //   return(
      //     <View style={{flex: 1,
      //       justifyContent: 'center'}}>
      //          <ActivityIndicator size="large" color="red" />
      //     </View>
      //   )
      // } else {
      //
        // console.log(this.props)
        return (
          <View style={{flex:1}}>



            <ScrollView style={styles.container} >


                {this._renderImage()}

                <SboxProductDetialDesc  selectedProduct={this.state.selectedProduct}
                                        productName={this.state.selectedProduct.name}
                                        balance ={this.state.balance} />

            <View style = {{alignSelf:'center',marginTop:Settings.getY(35),}}>
            <Barcode  value = {this.state.selectedProduct.account_id} format="CODE128" width = {1} />
            <Text style= {{textAlign:'center', fontSize: 16, fontWeight:'500'}}>{this.state.selectedProduct.account_id}</Text>
          </View>
          {this._renderCondition()}

            </ScrollView>

            {this._renderGoBackBtn()}

          </View>


        );
      // }
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    card: {
      height: height*0.3840,
      width:width,
      marginBottom:Settings.getX(10),
      alignSelf:'center',
      justifyContent: 'center',
      alignItems: 'center',
    }
});
