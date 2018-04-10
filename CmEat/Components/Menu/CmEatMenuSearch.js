'use strict';
import React, {
	Component,
} from 'react';
import {
	Alert,
	Animated,
	Dimensions,
	Image,
	KeyboardAvoidingView,
	ListView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
  	View,
	FlatList,
	Platform
} from 'react-native';
import {
    filter,
} from 'lodash';

import Header from '../General/Header';
import MenuCard from './MenuCard';

import MenuStore from '../../Stores/MenuStore';
import CMLabel from '../../Constants/AppLabel';
const {width,height} = Dimensions.get('window');
const searchViewMarginHorizontal = 30;
const iconSearchInputSize = 35;
export default class CmEatMenuSearch extends Component {

  constructor(props){
    super(props);
		this.ds = [];
		this.state = {
			dataSource: this.ds,
			restaurant:props.restaurant,
			cartTotals:'',
			searchText:'',
		}
		this._setSearchText = this._setSearchText.bind(this);
		this._onChange = this._onChange.bind(this);
		this._goBack = this._goBack.bind(this);
		this._goToCheckout = this._goToCheckout.bind(this);
		this._cleanInput = this._cleanInput.bind(this);
		this._filterNotes = this._filterNotes.bind(this);
		this.setState = this.setState.bind(this);
  }
	componentDidMount(){
		const menuState = MenuStore.menuState();
		const cartTotals = MenuStore.menuState().cartTotals;
		this.setState({
			menu:menuState.menu,
			cartTotals:cartTotals,
		})
		MenuStore.addChangeListener(this._onChange);
	}
	componentWillUnmount() {
		MenuStore.removeChangeListener(this._onChange);
	}
	_onChange(){
			const cartTotals = MenuStore.menuState().cartTotals;
			const filteredMenu = MenuStore.getFilteredMenu(this.state.filteredMenu);
			this.setState({
				cartTotals:cartTotals,
				dataSource:filteredMenu,
			})
	}
	_goBack(){
		this.props.navigator.pop({animated: false,});
	}
	_goToCheckout(){
		if(Number(this.state.cartTotals.total)>0){
			if(Number(this.state.cartTotals.total)>=Number(this.state.restaurant.start_amount)){
        this.props.navigator.push({
          screen: 'CmEatCheckout',
          animated: true,
          navigatorStyle: {navBarHidden: true},
          passProps: {
            restaurant:this.state.restaurant,
          },
        });
			}else{
				Alert.alert(
					'馋猫订餐提醒您',
					'不足'+this.state.restaurant.start_amount+'只能自取哦～',
					[
						{text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
						{text: '好哒', onPress: () => {
								this.props.navigator.showModal({
									screen: 'CmEatCheckout',
									animated: true,
									navigatorStyle: {navBarHidden: true},
									passProps: {
									restaurant:this.state.restaurant,
									},
								});
							}
						},
					],
				);
			}

		}
	}
	_setSearchText(searchText){
		if(searchText){
			let filteredData = this._filterNotes(searchText, this.state.menu);

			const filteredMenu = MenuStore.getFilteredMenu(filteredData);

			this.setState({
				 filteredMenu:filteredData,
				 dataSource: filteredData,
				 searchText: searchText
			 });
		}else{
			this.setState({
				 filteredMenu:[],
				 dataSource: [],
				 searchText:'',
			 });
		}

	}
	_filterNotes(searchText, notes) {

			let text = searchText.toLowerCase();
			return filter(notes, (dish) => {
				if(dish.ds_name){
					let note = dish.ds_name.toLowerCase();
					return note.search(text) !== -1;
				}
			});

	}
	_renderMenuList ({item,index})  {
		if(!!item.ds_name){
			const dish = item;
			return(
				<MenuCard key={index}
									ds_name = {dish.ds_name}
									dish = {dish}
									qty = {dish.qty}/>
			)
		}
	}
	_cleanInput(){
		this.setState({
			filteredMenu:[],
			dataSource: [],
			searchText:''
		},()=>this.refs.searchInput.clear());
	}
	_renderSearchInput(){
		return(
			<View style={styles.header}>
				<View style={styles.searchView}>
						<Image
							source={require('./Image/icon_search_input.png')}
							style={{
								height:iconSearchInputSize*0.5,
								width:iconSearchInputSize*0.45,
								marginLeft:10,
							}}
						/>
						<TextInput
							ref={'searchInput'}
							style={styles.searchInput}
							selectionColor={'#ea7b21'}
							keyboardType = {'default'}
							autoCorrect= { false}
							autoFocus={true}
							returnKeyType={'next'}
							onChangeText={this._setSearchText}
							underlineColorAndroid={"rgba(0,0,0,0)"}
						/>
						<TouchableOpacity onPress={()=>this._cleanInput()}>
							<Image
								source={require('./Image/cancel.png')}
								style={{
									height:15,
									width:15,
									marginRight:10}}
							/>
						</TouchableOpacity>
				</View>
				<TouchableOpacity
						style={{flex:0.1}}
						onPress={()=>this._goBack()}>
					<Text style={{fontSize:40}}
								allowFontScaling={false}>×</Text>
				</TouchableOpacity>
			</View>
		)
	}
	_keyExtractor = (item, index) => `${item.id}${index}`;
	// <Text style={{color:"#ffffff",fontSize:16,margin:3}}>${this.state.cartTotals.total}</Text>
	_renderResultList(){

		if(this.state.dataSource && this.state.dataSource.length > 0){
			return(
				<FlatList
					scrollEventThrottle={1}
					keyboardDismissMode={"on-drag"}
					keyboardShouldPersistTaps={'always'}
					data={this.state.dataSource}
					renderItem={this._renderMenuList}
					keyExtractor={this._keyExtractor}
					extraData={this.state}
					getItemLayout={(data, index) => (
							{length: 100, offset: 100 * index, index}
					)}

				/>
			);
		}else if(this.state.searchText != ''){
			return(
				<View style={{justifyContent:'center',
							alignContent:'center',
							alignSelf:'center',
							marginTop:100
							}}>
					<Text style={{fontSize:16,
												margin:3,
												fontFamily:'FZZongYi-M05S'}}
								allowFontScaling={false}>
								找不到关于 "{this.state.searchText}" 的东西哦
					</Text>
				</View>
			)
		}

	}
	render(){
		return(
			<KeyboardAvoidingView
						style={{flex:1,backgroundColor:"#ffffff"}}
						behavior={Platform.OS === 'ios'?"padding":null}
						>
				{this._renderSearchInput()}
				<TouchableOpacity onPress={this._goToCheckout}
						style={{backgroundColor:"rgba(234,123,33,0.9)",
							width:width,
							height:50,
							flexDirection:"row",
							alignItems:"center",
												justifyContent:"center",
						}}>
					<Text style={{color:"#ffffff",
												fontSize:16,
												margin:3,
												fontFamily:'FZZongYi-M05S',}}
								allowFontScaling={false}>
								${this.state.cartTotals.total}
					</Text>
					<View style={{margin:3,
								borderRadius:15,
								borderWidth:1,
								paddingLeft:10,
								paddingRight:10,
								paddingTop:2,
								paddingBottom:2,
								borderColor:"#ffffff"}}>
						<Text style={{color:"#ffffff",
													fontSize:13,
													fontFamily:'FZZongYi-M05S',}}
									allowFontScaling={false}>
									{CMLabel.getCNLabel('GO_CHECKOUT')}
						</Text>
					</View>

				</TouchableOpacity>
				{this._renderResultList()}

			</KeyboardAvoidingView>


		)
	}
}


const styles = StyleSheet.create({
	input:{
		fontSize: 18,
		borderRadius: 8,
		color: '#ea7b21',
		height:40,
		width:width,
		marginTop:5,
	},
	header:{
		width:width,
		height:60,
		flexDirection:'row',
		alignItems:'center',
		marginTop:Platform.OS === 'ios'? 20 : 0,
	},
	searchView:{
		borderRadius:30,
		borderWidth:1,
		borderColor:'#e2e2e2',
		marginTop:10,
		marginHorizontal:10,
		flex:0.9,
		backgroundColor:'#f4f4f4',
		flexDirection:'row',
		alignItems:'center',
		width: width-searchViewMarginHorizontal*2,
	},
	searchInput:{
		fontSize: 18,
		height:40,
		marginHorizontal:5,
		width:width-searchViewMarginHorizontal*2-20-15-iconSearchInputSize*0.45-10,

	},

});
