'use strict';
import React, {
	Component,
} from 'react';
import {
	Alert,
  Dimensions,
  Keyboard,
  Image,
  Platform,
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
import Util from '../../Modules/Util';
import CMLabel from '../../Constants/AppLabel';
export default class CmEatAddress extends Component {

  constructor(props) {
      super(props);

      this.state = AddressStore.getState();

      this._onChange = this._onChange.bind(this);
      this._goBack = this._goBack.bind(this);
      this._handleSearchChange = this._handleSearchChange.bind(this);
      this._chooseAddress = this._chooseAddress.bind(this);
      this._deleteAddress = this._deleteAddress.bind(this);
			this._editAddress = this._editAddress.bind(this);
      this._selectAddress = this._selectAddress.bind(this);
			this._getCurrentGeolocation = this._getCurrentGeolocation.bind(this);
			this._handleConfirm = this._handleConfirm.bind(this);
			this._updateAddressStatus = this._updateAddressStatus.bind(this);
      this._goToAddAddressInfo = this._goToAddAddressInfo.bind(this);
  }
	componentDidMount() {
    AddressStore.addChangeListener(this._onChange);
		navigator.geolocation.getCurrentPosition (
      (position) => {
				const url = "https://maps.googleapis.com/maps/api/geocode/" +
		    "json?latlng="+ position.coords.latitude + ',' + position.coords.longitude +
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
						let _addr = res.results[0].formatted_address.split(',');
						AddressAction.updateCurrentLocation(_addr[0] + ', ' + _addr[1]);
		      })
		      .catch((error) => {throw error});
			},
      (error)    => {
				console.log(error)
			},
      {
        enableHighAccuracy: true,
        timeout:            20000,
        maximumAge:         10000
      }
    )
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
    this.props.navigator.dismissModal();

    // if(this.props.tag === "fromHome") {
    //   // this.props.handleBackToHome("fromChanmao");
    //   this.props.navigator.resetTo({
  	// 			screen: 'cmHome',
  	// 			animated: true,
  	// 			animationType: 'fade',
  	// 			navigatorStyle: {navBarHidden: true},
  	// 			passProps:{goToCmEat: true}
  	// 		});
    // }else{
    //   this.props.navigator.dismissModal();
    //   this.props.updateUaid(AddressStore.getSeletedAddress());
    // }

  }
  _goToAddAddressInfo() {
		if (Util.getWaitingStatus() === true){
		  return;
		}
		Util.toggleWaitingStatus();

    this.props.navigator.push({
      screen: 'CmEatAddInfo',
      animated: true,
      navigatorStyle: {navBarHidden: true},
      passProps:{
        formattedAddress:this.state.formattedAddress,
				updateAddressStatus: this._updateAddressStatus
      }
    })
  }
  _goBackToAddressList() {
    this.props.navigator.pop();
  }

	_updateAddressStatus(status) {
		AddressAction.updateAddressStatus(status);
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
				{text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
				{text: CMLabel.getCNLabel('CONFIRM'), onPress: password => AddressAction.deleteAddress(address)},
			]
		)
	}
	_editAddress(address){
		console.log('123', JSON.stringify(address));
		// temp fix
		this._handleSearchChange(address.addr.split(',')[0]);
		AddressStore.getState().edittingAddress = address;
	}

	_selectAddress(address){
    Keyboard.dismiss();
		AddressAction.updateSelectedUaid(address.uaid);
	}
	_getCurrentGeolocation(){
		navigator.geolocation.getCurrentPosition (
      (position) => {
				const url = "https://maps.googleapis.com/maps/api/geocode/" +
		    "json?latlng="+ position.coords.latitude + ',' + position.coords.longitude +
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
						let _addr = res.results[0].formatted_address.split(',');
						this._handleSearchChange(_addr[0] + ', ' + _addr[1]);
		      })
		      .catch((error) => {throw error});
			},
      (error)    => {
				console.log(error)
			},
      {
        enableHighAccuracy: true,
        timeout:            20000,
        maximumAge:         10000
      }
    )
	}

	_clearAddressInput() {
		AddressAction.clearAddressInput();
	}


	_handleConfirm() {
		this.state.addressList.map((address,index) => {
      if (address.uaid === this.state.selectedUaid) {
				if (address.selected === true) {

				}
				else {
					AddressAction.selectAddress(address);
				}
			}
    });
		if (this.props.handleAddressAdded) {
			this.props.handleAddressAdded();
		}
		if(this.props.tag === "fromHome") {
      // this.props.handleBackToHome("fromChanmao");
      this.props.navigator.resetTo({
  				screen: 'cmHome',
  				animated: true,
  				animationType: 'fade',
  				navigatorStyle: {navBarHidden: true},
  				passProps:{goToCmEat: true}
  			});
    }else{
      this.props.navigator.dismissModal();
      this.props.updateUaid(AddressStore.getSeletedAddress());
    }
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
							<TouchableOpacity
									activeOpacity={0.4}
									onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:30,height:29.2}}
												source={require('./Image/icon_address_home.png')}/>
							</TouchableOpacity>
							<Text style={{fontSize:20,
														marginLeft:15,
														fontFamily:'FZZongYi-M05S',}}
										allowFontScaling={false}>
								Home
							</Text>
						</View>
					)
				}else if(address.type == "W"){
					return(
						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
							<TouchableOpacity
								activeOpacity={0.4}
								onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:30,height:27.1}}
												source={require('./Image/icon_address_work.png')}/>
							</TouchableOpacity>
							<Text style={{fontSize:20,
														marginLeft:15,
														fontFamily:'FZZongYi-M05S',}}
										allowFontScaling={false}>
								Work
							</Text>
						</View>
					)
				}else if (address.type == "O"){
					return(

						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
							<TouchableOpacity
								activeOpacity={0.4}
								onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:22,height:30}}
												source={require('./Image/icon_address_other.png')}/>
							</TouchableOpacity>
							<Text style={{fontSize:20,
														marginLeft:15,
														fontFamily:'FZZongYi-M05S',}}
										allowFontScaling={false}>
								Other
							</Text>
						</View>

					)
				}
			}
			let selectedIcon = () =>{
				if(address.uaid === this.state.selectedUaid){
					return (
						<Image style ={{width:20,height:20,position:"absolute",bottom:10,right:10}}
									 source={require('./Image/icon_check.png')}/>
					)
				}
			}
			return(
				<TouchableOpacity key={address.uaid}
													activeOpacity={0.4}
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
								<TouchableOpacity
										activeOpacity={0.4}
										onPress={this._editAddress.bind(null,address)}>
  									<Image style={{width:25,height:26.6,marginLeft:15,}}
  												 source={require('./Image/button_address_edit.png')}/>
  							</TouchableOpacity>

								<TouchableOpacity
										activeOpacity={0.4}
										onPress={this._deleteAddress.bind(null,address)}>
  									<Image style={{width:25,height:26.6,marginLeft:15,}}
  												 source={require('./Image/icon_address_delete.png')}/>
  							</TouchableOpacity>

  						</View>
  					</View>
  					<Text style={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}
									allowFontScaling={false}>
  						{address.name} {this._formatPhoneNumber(address.tel)}
  					</Text>
  					<Text style={{fontFamily:'FZZhunYuan-M02S',}}
									allowFontScaling={false}>
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
											alignItems: 'center',
                      borderTopColor:"#bdc8d9",
                      borderTopWidth:StyleSheet.hairlineWidth,
                      borderBottomColor:"#bdc8d9",
                      borderBottomWidth:StyleSheet.hairlineWidth,
                    }}>
				<TouchableOpacity
						activeOpacity={0.4}
						onPress={this._getCurrentGeolocation.bind(null)}>
					<Image style={{width:22.68,height:30}}
	              source={require('./Image/icon_address.png')}/>
				</TouchableOpacity>
        <TextInput
            style={[styles.input]}
						value={this.state.searchAddress}
						autoFocus={true}
            onFocus={()=>{this.setState({showConfirmBtn:false})}}
            onBlur={()=>{this.setState({showConfirmBtn:true})}}
            placeholder={CMLabel.getCNLabel('ENTER_ADDRESS')}
            placeholderTextColor={'#999999'}
            selectionColor={'#ea7b21'}
            keyboardType = { 'default'}
            autoCorrect= {false}
            returnKeyType={'next'}
            onChangeText={this._handleSearchChange}
            underlineColorAndroid={"rgba(0,0,0,0)"}
        />
			 {this.state.searchAddress ?
         <TouchableOpacity
				 	activeOpacity={0.4}
				 	onPress={()=>this._clearAddressInput()}>
					<Image
						source={require('./Image/cancel.png')}
						style={{
							height:21,
							width:21,}}
					/>
				</TouchableOpacity>
      :<View/>}
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
      <ScrollView keyboardShouldPersistTaps={'always'}
									keyboardDismissMode={'on-drag'}>
				<Text style={{marginLeft: 10,
                      marginTop:15,
											marginBottom: 5,
											fontSize: 16,
											fontFamily:'FZZhunYuan-M02S',
											color: '#A5A5A5',}}
							allowFontScaling={false}>{CMLabel.getCNLabel('CHOOSE')}: </Text>

        {predictionList}
      </ScrollView>
    )
  }
  _renderAddressList() {
    let addressList = this.state.addressList.map((address,index) => {
      return this._renderAddress(address)
    })
		const currentLocationButton = () => {
			return(
				<TouchableOpacity
							style={{backgroundColor:"#ffffff",
											marginTop:10,
											height:90,
											padding:15,
											paddingLeft:30,
											paddingRight:30,
											shadowColor: "#000000",
											shadowOpacity: 0.1,
											shadowOffset: {
												 height: 0.5,
												 width: 0.5,
											},
										}}
							activeOpacity={0.4}
							onPress={this._getCurrentGeolocation.bind(null)}>
						<View style={{borderColor:"#e2e2e4",
													borderBottomWidth: StyleSheet.hairlineWidth,
													flexDirection:"row",
													paddingBottom:5,
												}}>
								<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
										<Image style={{width:22.5,height:30, marginLeft: 3.75, marginRight: 3.75}}
													source={require('./Image/icon_address.png')}/>
										<Text style={{fontSize:20,marginLeft:15,fontFamily:'FZZongYi-M05S',}}
													allowFontScaling={false}>
											Current Location
										</Text>
								</View>
								<View style={{flex:0.1,flexDirection:"row",alignItems:"flex-end",justifyContent:"flex-end"}}>
								</View>
						</View>
						<Text style={{fontFamily:'FZZhunYuan-M02S',marginLeft: 3.75,}}
									allowFontScaling={false}>
							{this.state.currentLocation}
						</Text>
				</TouchableOpacity>
			)
		}
    return(
      <ScrollView style={{padding:10,}}
                  keyboardShouldPersistTaps={'always'}
									keyboardDismissMode={'on-drag'}>
				{currentLocationButton()}
        {addressList}
        {this._renderAndroidConfirmBtn()}
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
  _renderIosConfirmBtn(){
    if(Platform.OS!='ios' || this.state.selectedAddress == '' || this.state.searchAddress != '') return;
    return(
      <TouchableOpacity style={styles.button}
                        activeOpacity={0.4}
                        onPress={this._handleConfirm}>
            <Text style={styles.buttonText}
									allowFontScaling={false}>
               {CMLabel.getCNLabel('CONFIRM')}
            </Text>
      </TouchableOpacity>
    )
  }
  _renderAndroidConfirmBtn(){
    if(Platform.OS!='android' || this.state.selectedAddress == '' || this.state.searchAddress != '') return;
    return(
      <TouchableOpacity style={{  height:buttonHeight,
                                  backgroundColor:'#ea7b21',
                                  justifyContent:'center',
                                  alignItems:'center',
                                  marginTop:40,
                                }}
                        activeOpacity={0.4}
                        onPress={this._handleConfirm}>
            <Text style={styles.buttonText}
									allowFontScaling={false}>
							{CMLabel.getCNLabel('CONFIRM')}
            </Text>
      </TouchableOpacity>
    )
  }
  render(){
    return(
      <View style={{  flex:1,
                      backgroundColor:"#ffffff"}}>
        <Header title={CMLabel.getCNLabel('ADDRESS')}
                goBack={this._goBack}
                leftButtonText={'×'}/>
					{this._renderSearchInput()}
					{this._renderList()}
          {this._renderIosConfirmBtn()}
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
