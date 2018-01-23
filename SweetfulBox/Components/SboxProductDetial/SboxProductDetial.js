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
} from 'react-native';

import {
    findIndex,
} from 'lodash';

import ScrollableTabView from 'react-native-scrollable-tab-view'
import SboxProductDetialScrollView from './SboxProductDetialScrollView';
import SboxProductDetialDesc from './SboxProductDetialDesc';
import SboxProductDetialAttr from './SboxProductDetialAttr';
import SboxProductService from './SboxProductService';
import SboxProductFacts from './SboxProductFacts';

import SboxBox from '../SboxBox/SboxBox';

import SboxProductAction from '../../Actions/SboxProductAction';
import SboxProductStore from '../../Stores/SboxProductStore';

const {height, width} = Dimensions.get('window');

export default class SweetProductDetial extends Component {
	constructor(props) {
    super(props);
    this.state = {
        attr: [],
        selectAttr: [
            {
                value_id: 'attr1',
                sku_id: 'a',
                selected: '',
            },
            {
                value_id: 'attr2',
                sku_id: 'b',
                selected: '',
            },
        ],
        disable_attr: [],
        selectedProduct:{},
        selectedAmount:1,
    };

    this._onPageChange = this._onPageChange.bind(this);
    this._changeSelectAttr = this._changeSelectAttr.bind(this);
    this._findProduct = this._findProduct.bind(this);
    this._addAmount = this._addAmount.bind(this);
    this._subAmount = this._subAmount.bind(this);
    this._addToCart = this._addToCart.bind(this);
    this._goToSboxCart = this._goToSboxCart.bind(this);
    this._goBack = this._goBack.bind(this);
    this._onChange = this._onChange.bind(this);
	}
  componentDidMount(){
      SboxProductStore.addChangeListener(this._onChange);
      const reqData = {
        pmid: this.props.pmid
      }
      SboxProductAction.getSingleProduct(reqData);
      // this._goToSboxCart();
  }
  componentWillUnmount() {
    SboxProductStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    const productData = SboxProductStore.getSboxProductDetialState();
    const newState = Object.assign({},
                                   productData.prod_master,
                                   { prod_base:productData.prod_base });
    this.setState(Object.assign({}, newState));
    this._findProduct();
  }
  _changeSelectAttr({attrIndex,attrValueIndex,disable_attr}) {
      let newSelectAttr = this.state.selectAttr;
      newSelectAttr[attrIndex].selected = attrValueIndex;
      this.setState({ selectAttr: newSelectAttr,disable_attr});
      this._findProduct();
  }
  _onPageChange(page){
      let newSelectAttr = this.state.selectAttr;
      newSelectAttr[0].selected = page;
      this.setState({ selectAttr: newSelectAttr });
      this._findProduct();
  }

  _findProduct() {
    let sku = this.state.pmid;
    for (var i = 0; i < this.state.selectAttr.length; i++) {
        sku += this.state.selectAttr[i].sku_id + Number(this.state.selectAttr[i].selected+1);
    }
    const productIndex = findIndex(this.state.prod_base, { unikey: sku });
    if(productIndex !== -1){

      //更新selectedAmount
      //当切换口味时检查库存，如果当前selectedAmount数量超过库存数量，更新
      //selectedAmount 为最大库存
      let selectedAmount = this.state.selectedAmount;
      if(this.state.prod_base[productIndex].amount < selectedAmount) {
        selectedAmount = this.state.prod_base[productIndex].amount;
      }
      //更新selectedAmount end

      this.setState({
        selectedProduct: this.state.prod_base[productIndex],
        selectedAmount: selectedAmount
      })
    }else{
      this.setState({
        selectedProduct: '',
      })
    }
  }
  _addAmount(){
    if(this.state.selectedAmount<this.state.selectedProduct.amount){
      this.setState({
        selectedAmount: this.state.selectedAmount+1
      })
    }
  }
  _subAmount(){
    if(this.state.selectedAmount > 1){
      this.setState({
        selectedAmount: this.state.selectedAmount-1
      })
    }
  }
  _addToCart() {
    const selectedProduct = this.state.selectedProduct;
    const selectedAmount = this.state.selectedAmount;
    SboxProductAction.addToCart({selectedProduct,selectedAmount});
  }

  //route
  _goBack() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }
  _goToSboxCart() {
    this.props.navigator.push({
      screen: 'SboxCheckout',
      navigatorStyle: {
        navBarHidden: true,
      },
    })
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
    if(this.state.selectedProduct.facts){
      return(
        <SboxProductFacts productFactsImg={this.state.selectedProduct.facts} />
      )
    }
  }
  _renderGoBackBtn() {
    return(
      <TouchableOpacity style={{paddingTop:22,
                                paddingLeft:8,
                                paddingRight:20,
                                paddingBottom:20,
                                position:'absolute',
                                top:0,
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
  _renderAddAmountBtn(){
    return(
      <View style={{flexDirection:'row',
                    alignItems:'flex-start',
                    paddingLeft:20,
                    paddingRight:20,
                  }}>
        <Text style={{
                      color:'#848689',
                      fontWeight:'500',
                      fontSize:15,
                      marginTop:25,
                    }}>
          数量
        </Text>
        <View style={{flexDirection:'row',
                      backgroundColor:"#ffffff",
                      marginLeft:18,
                      marginTop:18,
                    }}>
            <TouchableOpacity
                  onPress={this._subAmount}
                  activeOpacity={0.6}
                  >
              <View style={{
                        width:33,
                        height:33,
                        borderColor:'#efefef',
                        borderWidth:1,
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                      <Text style={{
                                fontSize: 20,
                                fontFamily:'FZZhunYuan-M02S',
                                color:'#ff768b',
                              }}>
                        -
                      </Text>
              </View>
            </TouchableOpacity>


            <View style={{
                      width:80,
                      height:33,
                      borderColor:'#efefef',
                      borderTopWidth:1,
                      borderBottomWidth:1,
                      alignItems:'center',
                      justifyContent:'center',
                    }}>
                <Text style={{
                          fontSize: 18,
                          fontFamily:'FZZhunYuan-M02S',
                          color:'#ff768b',
                        }}>
                  {this.state.selectedAmount}
                </Text>
            </View>
            <TouchableOpacity
                  onPress={this._addAmount}
                  activeOpacity={0.6}
                  >
              <View style={{
                        width:33,
                        height:33,
                        borderColor:'#efefef',
                        borderWidth:1,
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                  <Text style={{
                            fontSize: 20,
                            fontFamily:'FZZhunYuan-M02S',
                            color:'#ff768b',
                          }}>
                    +
                  </Text>
              </View>

            </TouchableOpacity>

        </View>
      </View>
    )
  }
  _renderAddCartBtn() {
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
  }
  _renderHeaderImage() {
    return(
      <Image source={require('./Images/header.png')}
             style={{
                      width:width,
                      height:width*0.216,
                      position:'absolute',
                      top:0,left:0,
                      // backgroundColor:'red'
                   }}
      />
    )
  }

  render() {

    if(this.state.attr.length>0){
      return (
        <View style={{flex:1}}>
          <ScrollView style={styles.container}>
              <SboxProductDetialScrollView
                page={this.state.attr[0].attr_value}
                selectedPage={this.state.selectAttr[0].selected}
                onPageChange={this._onPageChange}/>

              <SboxProductDetialDesc  attr={this.state.selectAttr[0]}
                                      selectedProduct={this.state.selectedProduct}
                                      productName={this.state.fullname}/>
              <SboxProductDetialAttr  attr={this.state.attr}
                                      selectAttr={this.state.selectAttr}
                                      changeSelectAttr={this._changeSelectAttr}
                                      disable_attr={this.state.disable_attr}
                                      />
              {this._renderAddAmountBtn()}
              {this._renderAddCartBtn()}
              <ScrollableTabView
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
          <SboxBox goToSboxCart={this._goToSboxCart}/>
        </View>


      );
    } else {
      return(
        <View>
          {this._renderGoBackBtn()}
        </View>
      )
    }

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
