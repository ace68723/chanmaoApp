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
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import Settings from '../../Config/Setting';

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
      showLoading:false,
      canBuy:true,
    }
    this._goBack = this._goBack.bind(this);
    this._handleOutOfStock = this._handleOutOfStock.bind(this);
    this.onChangeTextInput = this.onChangeTextInput.bind(this);
    this._renderImage = this._renderImage.bind(this);
    this._renderAddCartBtn = this._renderAddCartBtn.bind(this);
    this.startBuy = this.startBuy.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }
  componentWillMount() {
  }
  componentDidMount(){
      // console.log(this.props);
      if(this.state.status === 1) {
          this.props.navigator.pop({
            animated: true,
            animationType: 'slide-horizontal',
        })
      }
      const placeholder = '可购买$' + this.state.selectedProduct.min_price + '-' + this.state.selectedProduct.max_price+ '之间金额'
      this.setState({
        placeholder:placeholder
      })
  }
  componentWillUnmount() {

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


  //route
  _goBack() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
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
  async startBuy() {
    try{
      this.setState({
        showLoading:true
      })
      const data = await OrderModule.checkUaid();
      const last4 = await CheckoutModule.getOrderBefore();
      this.setState({
        showLoading:false
      })
      if(data.length === 0) {
        this.props.navigator.push({
          screen: "EwalletAddAddress",
          passProps: {
              selectedProduct:this.state.selectedProduct,
              value:this.state.value,
              goToPage:this.goToPage
          },
          navigatorStyle: {navBarHidden:true},
        });
      } else if(data.length !==0){
        this.props.navigator.push({
          screen: "EwalletCheckout",
          passProps: {
            selectedProduct:this.state.selectedProduct,
            value:this.state.value,
            addr:data[0].addr,
            name:data[0].name,
            tel:data[0].tel,
            unitNum:data[0].unit,
            last4:last4.last4,
            goToPage:this.goToPage
          },
          navigatorStyle: {navBarHidden:true},
        });
      }
    }catch(e) {
      this.setState({
        showLoading:false
      })
      console.log(e)
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
          <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}
                allowFontScaling={false}>
            ×
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderAddCartBtn() {
    let backgroundColor = this.state.canBuy ? 'grey' : '#ff768b' ;
    if(this.state.showLoading){
      return(
        <View style={{
          width:width*0.4251,
          height:width*0.4251*0.25,
          marginTop:20,
          backgroundColor:backgroundColor,
          alignSelf:'center',
          justifyContent:'center',
          alignItems:'center',
        }}>
              <Image source={require('./Img/Loading_dots_white.gif')}  style={{width:45,height:15}}/>
        </View>
      )
    }else{
      return(
        <TouchableWithoutFeedback disabled = {this.state.canBuy} onPress= {this.startBuy}>
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
                      }}
                      allowFontScaling={false}>
                    购买
                </Text>
          </View>
        </TouchableWithoutFeedback>
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
  onChangeTextInput(text) {
    console.log(text)
    console.log(this.state.selectedProduct.min_price)
    console.log(parseFloat(text) <= parseFloat(this.state.selectedProduct.max_price))

    this.setState({
      value: text
    })
    if(parseFloat(text)>= parseFloat(this.state.selectedProduct.min_price) && parseFloat(text) <= parseFloat(this.state.selectedProduct.max_price)) {
     this.setState({
       canBuy:false
     })
    } else if(
      parseFloat(text)< parseFloat(this.state.selectedProduct.min_price)
      || parseFloat(text) > parseFloat(this.state.selectedProduct.max_price)
    ) {this.setState({
      canBuy:true
    })}

  }
  goToPage() {
    this.props.goToPage();
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
            免责声明
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: '#A8A8A8',
            borderBottomWidth: 0.4,
            marginBottom:Settings.getX(10)
          }}
        />
        <View style = {{justifyContent:'center'}}>
          <Text style={{
            color:'#848689',
            fontWeight:'300',
            fontSize:13,
          }}
          allowFontScaling={false}>
            {this.state.selectedProduct.sku_info}
          </Text>
        </View>
      </View>
    )
  }
  _renderPrice() {
    return(
      <View style = {{flexDirection:'row',
      marginTop:18, alignContent:'center', paddingHorizontal:Settings.getX(20),
    }}>
        <View style = {{justifyContent:'center'}}>
          <Text style={{
            color:'#848689',
            fontWeight:'500',
            fontSize:15,
          }}
          allowFontScaling={false}>
          购买金额
          </Text>
        </View>

        <TouchableOpacity >

            <View
            style={{
                  backgroundColor:"#ffffff",
                  marginLeft:18,
                  borderColor: '#ff768b',
                  borderWidth: 1,
                  padding:10,
                  paddingTop:5,
                  paddingBottom:5,
                  width:width * 2 /3
                }}>

                  <TextInput
                   selectionColor={'#ff7685'}
                   allowFontScaling={false}
                   returnKeyType={'search'}
                   autoCorrect={false}
                   autoCapitalize={'none'}
                   fontSize={18}
                   style={{flex: 0.5}}
                   placeholder={this.state.placeholder}
                   onChangeText={(text) => this.onChangeTextInput(text)}
                   underlineColorAndroid={"rgba(0,0,0,0)"}
                   />
            </View>
         </TouchableOpacity>
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

                {/* <SboxProductDetialScrollView
                  spu_image={this.props.selectedProduct.image_url}
                  page={this.state.selectedProduct.image_url}
                  /> */}


                <SboxProductDetialDesc  selectedProduct={this.state.selectedProduct}
                                        productName={this.state.selectedProduct.name} />
                {/* <SboxProductDetialAttr  sku_list={this.state.sku_list}

                                        selectedProduct={this.state.selectedProduct}
                                        />  */}
                {this._renderPrice()}
                {this._renderAddCartBtn()}
                {this._renderCondition()}
            </ScrollView>
            {/* {this._renderHeaderImage()} */}
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
    },
    submitButton: {
      height:60,
      alignItems:'center',
      justifyContent:'center',
    }
});
