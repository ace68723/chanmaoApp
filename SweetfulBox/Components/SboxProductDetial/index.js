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
  ActivityIndicator
} from 'react-native';

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

import ScrollableTabView from 'react-native-scrollable-tab-view'
import SboxProductDetialScrollView from './SboxProductDetialScrollView';
import SboxProductDetialDesc from './SboxProductDetialDesc';
import SboxProductDetialAttr from './SboxProductDetialAttr';
import SboxProductService from './SboxProductService';
import SboxProductFacts from './SboxProductFacts';
import AddAmountBtn from './AddAmountBtn';

import SboxBox from '../SboxBox/SboxBox';

import SboxProductAction from '../../Actions/SboxProductAction';
import SboxProductStore from '../../Stores/SboxProductStore';
import SboxCartAction from '../../Actions/SboxCartAction';





export default class SweetProductDetial extends Component {
	constructor(props) {
    super(props);
    this.state = SboxProductStore.getState();
    this._onPageChange = this._onPageChange.bind(this);
    this._addToCart = this._addToCart.bind(this);
    this._goToSboxCart = this._goToSboxCart.bind(this);
    this._goBack = this._goBack.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleOnPressIn = this._handleOnPressIn.bind(this);
    this._handleOutOfStock = this._handleOutOfStock.bind(this);
  }
  componentDidMount(){
      console.log(this.props);
      if(this.state.spu_status === 1) {
          this.props.navigator.pop({
            animated: true,
            animationType: 'slide-horizontal',
        })
      }
      SboxProductStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    SboxProductStore.removeChangeListener(this._onChange);
    SboxProductStore.initState();
  }
  _onChange() {
    const productData = SboxProductStore.getState();

    if(productData.spu_status === 1) {
      this.props.navigator.pop({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }else{
      this.setState(Object.assign({},productData));
    }
    if(productData.outOfStock){
      this._handleOutOfStock();
    }

  }
  _handleOnPressIn() {
    // SboxCartAction.checkStock();
  }
  _handleOutOfStock() {
    this.props.navigator.showLightBox({
       screen: "SboxCartAlert",
       passProps: {
         message:`库存不足`},
       style: {
         flex: 1,
         tapBackgroundToDismiss: true,
       },
       adjustSoftInput: "resize",
      });
  }



  _onPageChange(page){
    SboxProductAction.changeProductImage(page);
  }
  _addToCart() {
    const {selectedProduct} = this.state;
    selectedProduct.spu_name = this.state.spu_name;
    const {showLightBox,dismissLightBox} = this.props.navigator;
    SboxProductAction.addToCart(selectedProduct, showLightBox,dismissLightBox);
  }

  //route
  _goBack() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }
  _goToSboxCart() {
    setTimeout( () => {
      this.props.navigator.push({
        screen: 'SboxCart',
        passProps: {backButton: 'x'},
        navigatorStyle: {
          navBarHidden: true,
        },
      })
    }, 150);

  }

  //render
  _renderServiceImage() {
    if(this.state.serviceImg){
      return(
        <SboxProductService serviceImg={this.state.serviceImg} />
      )
    }
  }
  _renderProductFacts() {
      const selectIndex = findIndex(this.state.sku_fact,{image_id: this.state.selectedProduct.sku_fact_image_id});
      if (selectIndex !== -1) {
        return(
          <SboxProductFacts productFactsImg={this.state.sku_fact[selectIndex].image_url} />
        )
      } else {
        return
      }

  }
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
          <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
            ×
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderAddCartBtn() {
    if(this.state.selectedProduct.sku_amount > 0 && this.state.selectedProduct.status !== 1 ) {
      let backgroundColor = this.state.selectedProduct ? '#ff768b' : '#efefef' ;
      return(
        <TouchableOpacity
              onPress={this._addToCart}
              activeOpacity={0.6}
              >
          <View style={{
                  width:width*0.4251,
                  height:width*0.4251*0.25,
                  marginTop:20,
                  backgroundColor:backgroundColor,
                  alignSelf:'center',
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                <Text style={{
                        color:'white',
                        fontSize:17,
                        fontFamily:'FZZhunYuan-M02S',
                      }}>
                    加入购物箱
                </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      let backgroundColor = '#efefef' ;
      return(
        <TouchableOpacity
              disabled = {true}
              onPress={this._addToCart}
              activeOpacity={0.6}
              >
          <View style={{
                  width:width*0.4251,
                  height:width*0.4251*0.25,
                  marginTop:20,
                  backgroundColor:backgroundColor,
                  alignSelf:'center',
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                <Text style={{
                        color:'white',
                        fontSize:17,
                        fontFamily:'FZZhunYuan-M02S',
                      }}>
                    加入购物箱
                </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
  _renderHeaderImage() {
    return(
      <Image source={require('./Images/header.png')}
             style={{
                      width:width,
                      height:width*0.216,
                      position:'absolute',
                      top:0,left:0,
                   }}
      />
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
        console.log(this.props)
        return (
          <View style={{flex:1}}>



            <ScrollView style={styles.container} >



                <SboxProductDetialScrollView
                  spu_image={this.props.spu_image}
                  page={this.state.sku_image}
                  selectedPage={this.state.selectedPage}
                  onPageChange={this._onPageChange}
                  attr={this.state.sku_list}/>

                <SboxProductDetialDesc  selectedProduct={this.state.selectedProduct}
                                        productName={this.state.spu_name}/>
                <SboxProductDetialAttr  sku_list={this.state.sku_list}
                                        
                                        selectedProduct={this.state.selectedProduct}
                                        />
                <AddAmountBtn  selectedProduct = {this.state.selectedProduct}/>
                {this._renderAddCartBtn()}
                <ScrollableTabView
                          ref = 'fact'
                          initialPage = {0}
                          prerenderingSiblingsNumber = {2}
                          tabBarUnderlineStyle={{backgroundColor:'#ff768b',
                                                 width:80,
                                                 marginLeft:55,
                                                 height:3,

                                               }}
                          style={{marginTop:20}}
                          tabBarActiveTextColor={"#ff768b"}
                          tabBarTextStyle={{ fontSize: 15} }
                  >
                  <View tabLabel="服务明细">
                    {this._renderServiceImage()}
                  </View>
                  <View tabLabel="产品详情">
                    {this._renderProductFacts()}
                  </View>
               </ScrollableTabView>
            </ScrollView>
            {this._renderHeaderImage()}
            {this._renderGoBackBtn()}
            <SboxBox
                 handleOnPressIn = {this._handleOnPressIn}
                 goToSboxCart={this._goToSboxCart}/>
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
});
