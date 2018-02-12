'use strict';
import React, {
	Component,
} from 'react';
import {
	Alert,
  Dimensions,
  Keyboard,
  Image,
	ListView,
  StyleSheet,
  Text,
  TextInput,
	TouchableOpacity,
  View,
	ScrollView,
} from 'react-native';

const {width,height} = Dimensions.get('window');
let marginTop,buttonHeight;;
if(height == 812){
  marginTop = 34;
  buttonHeight = 80;
}else{
  marginTop = 20;
  buttonHeight = 40;
}


import Header from '../General/Header';
import PredictionCard from './PredictionCard';
// import AddInfo from './AddInfo';

import AddressAction from '../../Actions/AddressAction';
import HomeAction from '../../Actions/HomeAction';
import CheckoutAction from '../../Actions/CheckoutAction';
import AddressStore from '../../Stores/AddressStore';


export default class CmEatAddress extends Component {

  constructor() {
      super();

      this.state = AddressStore.getState();

      this._onChange = this._onChange.bind(this);
      this._goBack = this._goBack.bind(this);
      this._handleSearchChange = this._handleSearchChange.bind(this);
      this._chooseAddress = this._chooseAddress.bind(this);
      this._deleteAddress = this._deleteAddress.bind(this);
      this._selectAddress = this._selectAddress.bind(this);

      this._goToAddAddressInfo = this._goToAddAddressInfo.bind(this);
  }
	componentDidMount() {
    AddressStore.addChangeListener(this._onChange);
	}
  componentWillUnmount() {
      AddressStore.removeChangeListener(this._onChange);
  }
  _onChange() {
      const state = AddressStore.getState();
      this.setState(state);
      this._handleStatus(state);
  }
  _handleStatus(state) {
    console.log(state)
    switch(state.addressStatus){
      case "AddAddressInfo":
        this._goToAddAddressInfo();
      break;
      case "backToAddressList":
        this._goBackToAddressList();
      break;
    }
  }
  _goBack() {
    console.log(this.props)
    this.props.navigator.dismissModal();
    if(this.props.tag === "fromHome") {
      this.props.handleBackToHome("fromChanmao");
    }else{
      this.props.updateUaid(AddressStore.getSeletedAddress());
    }

  }
  _goToAddAddressInfo() {
    this.props.navigator.push({
      screen: 'CmEatAddInfo',
      animated: true,
      navigatorStyle: {navBarHidden: true},
      passProps:{
        formattedAddress:this.state.formattedAddress
      }
    })
  }
  _goBackToAddressList() {
    this.props.navigator.pop();
  }

	_chooseAddress(placeId) {
    Keyboard.dismiss();
    AddressAction.formatAddress(placeId);
	}
	_deleteAddress(address){
		Alert.alert(
			'删除地址',
			"addressDescription",
			[
				{text: '取消', onPress: () => {}, style: 'cancel'},
				{text: '确认', onPress: password => AddressAction.deleteAddress(address)},
			]
		)
	}
	_selectAddress(address){
		AddressAction.selectAddress(address)
	}
  _handleSearchChange(text){
    this.setState({
        searchAddress: text
    });
    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/" +
    "json?input="+ text +
    "&language=en" +
    "&components=country:ca"+
    "&types=address" +
    "&key=AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8"
    let options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    fetch(url,options)
      .then((res) => res.json())
      .then((res)=>{
        this.setState({
           predictionsData: res.predictions
        });
      })
      .catch((error) => {throw error})
	}
  _formatPhoneNumber(tel){
			if(!tel) return
      const city ="("+tel.slice(0, 3)+")";
      const area = tel.slice(3,6)+"-";
      const number = tel.slice(6,10);
      const formatTel =city+area+number
      return formatTel;
  }

  _renderAddress(address){
			let apt_no;
			if(!address.uaid) return null;
      if(address.apt_no){
        apt_no = "Unit:"+address.apt_no + " - "
      }
			let icon = ()=>{
				if(address.type == "H"){
					return (
						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
							<TouchableOpacity onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:30,height:29.2}}
												source={require('./Image/icon_address_home.png')}/>
							</TouchableOpacity>
							<Text style={{fontSize:20,marginLeft:15,fontFamily:'FZZongYi-M05S',}}>
								Home
							</Text>
						</View>
					)
				}else if(address.type == "W"){
					return(
						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
							<TouchableOpacity onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:30,height:27.1}}
												source={require('./Image/icon_address_work.png')}/>
							</TouchableOpacity>
							<Text style={{fontSize:20,marginLeft:15,fontFamily:'FZZongYi-M05S',}}>
								Work
							</Text>
						</View>
					)
				}else if (address.type == "O"){
					return(

						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
							<TouchableOpacity onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:22,height:30}}
												source={require('./Image/icon_address_other.png')}/>
							</TouchableOpacity>
							<Text style={{fontSize:20,marginLeft:15,fontFamily:'FZZongYi-M05S',}}>
								Other
							</Text>
						</View>

					)
				}
			}
			let selectedIcon = () =>{
				if(address.selected){
					return (
						<Image style ={{width:20,height:20,position:"absolute",bottom:10,right:10}}
									 source={require('./Image/icon_check.png')}/>
					)
				}
			}
			return(
				<TouchableOpacity key={address.uaid}
                                  onPress={this._selectAddress.bind(null,address)}>
  				<View
  							style={{backgroundColor:"#ffffff",
  											marginTop:10,
  											height:120,
  											padding:15,
  											paddingLeft:30,
  											paddingRight:30,
  											shadowColor: "#000000",
  											shadowOpacity: 0.1,
  											shadowOffset: {
  												 height: 0.5,
  												 width: 0.5,
  											},
  										}}>
  					<View style={{borderColor:"#e2e2e4",
  												borderBottomWidth: StyleSheet.hairlineWidth,
  												flexDirection:"row",
  												paddingBottom:5,
  											}}>
  											{icon()}
  						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end",justifyContent:"flex-end"}}>
  							<TouchableOpacity onPress={this._deleteAddress.bind(null,address)}>
  									<Image style={{width:25,height:26.6,marginLeft:15,}}
  												 source={require('./Image/icon_address_delete.png')}/>
  							</TouchableOpacity>
  						</View>
  					</View>
  					<Text style={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}>
  						{address.name} {this._formatPhoneNumber(address.tel)}
  					</Text>
  					<Text style={{fontFamily:'FZZhunYuan-M02S',}}>
  						{apt_no}{address.addr}
  					</Text>
  					{selectedIcon()}
  				</View>
				</TouchableOpacity>
      )


  }
  _renderSearchInput(){
    return(
      <View style={{  padding:15,
                      paddingLeft:30,
                      paddingRight:30,
                      backgroundColor:"#ffffff",
                      flexDirection:"row",
                    }}>
        <Image style={{width:22.68,height:30}}
              source={require('./Image/icon_address.png')}/>
        <TextInput
            style={[styles.input]}
            placeholder={"输入地址"}
            placeholderTextColor={'#999999'}
            selectionColor={'#ea7b21'}
            keyboardType = { 'default'}
            autoCorrect= {false}
            returnKeyType={'next'}
            onChangeText={this._handleSearchChange}
        />
      </View>
    )
  }
  _renderPredictionList() {
    let predictionList = this.state.predictionsData.map((prediction,index) => {
      return <PredictionCard  key = { index }
                              description = { prediction.description }
                              placeId = {prediction.place_id}
                              chooseAddress = {this._chooseAddress}/>
    })
    return(
      <ScrollView style={{padding:10,}}
                  keyboardShouldPersistTaps={'always'}>
        {predictionList}
      </ScrollView>
    )
  }
  _renderAddressList() {
    let addressList = this.state.addressList.map((address,index) => {
      return this._renderAddress(address)
    })
    return(
      <ScrollView style={{padding:10,}}
                  keyboardShouldPersistTaps={'always'}>
        {addressList}
      </ScrollView>
    )

  }
	_renderList(){
		if(this.state.searchAddress){
			return this._renderPredictionList();
		}else{
			return this._renderAddressList();
		}
	}
  render(){
    return(
      <View style={{flex:1,backgroundColor:"#f2f2f2"}}>
        <Header title={"地址"}
                goBack={this._goBack}
                leftButtonText={'×'}/>
					{this._renderSearchInput()}
					{this._renderList()}
        <TouchableOpacity style={styles.button}
                          activeOpacity={0.4}
                          onPress={this._goBack}>
              <Text style={styles.buttonText}>
                 确认
              </Text>
        </TouchableOpacity>
      </View>
    )



    // else{
		// 	return(
		// 		<AddInfo formattedAddress={this.state.formattedAddress}
		// 						 addressType={this.state.addressType}/>
		// 	)
		// }
  }
}

const styles = StyleSheet.create({
  input:{
    flex:1,
    marginLeft:20,
    fontSize: 18,
    borderRadius: 8,
    color: '#ea7b21',
    marginTop:5,
		fontFamily:'FZZhunYuan-M02S',
  },
  button:{
    width:width,
    height:buttonHeight,
    backgroundColor:'#ea7b21',
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    fontSize:20,
    fontFamily:'FZZongYi-M05S',
  },
});
