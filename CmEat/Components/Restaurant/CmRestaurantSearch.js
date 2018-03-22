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
	Platform,
	ScrollView
} from 'react-native';
import {
    filter,
} from 'lodash';
import HomeStore from '../../Stores/HomeStore';
import HomeAction from '../../Actions/HomeAction';
import RestaurantCard from './RestaurantCard';
const {width,height} = Dimensions.get('window');
const searchViewMarginHorizontal = 10;
const iconSearchInputSize = 35;

export default class CmRestaurantSearch extends Component {

    constructor(props){
        super(props);
        const state = {
				searchText:'',
				filteredRestaurant:[],
				restaurantList: [],
				length:5,
				isRendering:'area',

			}
		this.state = Object.assign({},state,HomeStore.getHomeState());
		this._setSearchText = this._setSearchText.bind(this);
		this._onChange = this._onChange.bind(this);
		this._renderRestaurant = this._renderRestaurant.bind(this);
		this._keyExtractor = this._keyExtractor.bind(this);
    }
	componentDidMount(){
		HomeAction.getHomeData();
		HomeStore.addChangeListener(this._onChange);
	}
	componentWillUnmount() {
		HomeStore.removeChangeListener(this._onChange);
	}
	_onChange(){
		const newState = Object.assign({},HomeStore.getHomeState());
		let restaurants = newState.areaList[0].restaurantList;
		this.setState(Object.assign(newState,{restaurant:restaurants}));

	}
    // _goBack(){
    //     this.props.navigator.pop({animated: false,});
	// }
	_filterNotes(searchText, restaurants) {

		let text = searchText.toLowerCase();
		return filter(restaurants, (rest) => {
			if(rest.name){
				let lowerCaseName = rest.name.toLowerCase();
				return lowerCaseName.search(text) !== -1;
			}
		});

	}
    _setSearchText(text){
		if(text){
			let filteredData;
			if(text != "All"){
				filteredData = this._filterNotes(text, this.state.restaurant);
			}else{
				filteredData = this.state.restaurant;
			}

			this.setState({
				 searchText: text,
				 filteredRestaurant:filteredData,
				 isRendering:'restaurant',
				 restaurantList: filteredData.slice(0, 5)
			 });
		}else{
			this.setState({
				 searchText:'',
				 filteredRestaurant:[],
				 restaurantList:[],
			 });
		}
    }
    _cleanInput(){
		this.setState({
			searchText:'',
			restaurantList:[],
			isRendering:'area'
		},()=>this.refs.searchInput.clear());
	}
	_renderSearchInput(){
		// <TouchableOpacity
		// 				style={{flex:0.1}}
		// 				onPress={()=>this._goBack()}>
		// 			<Text style={{fontSize:40}}>×</Text>
		// 		</TouchableOpacity>
		return(
			<View style={ this.state.searchText == '' ? styles.header_full : styles.header }>
				<View style={this.state.searchText == '' ? styles.searchView_full : styles.searchView}>
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
							style={this.state.searchText == '' ? styles.searchInput_full : styles.searchInput}
							selectionColor={'#ea7b21'}
							keyboardType = {'default'}
							autoCorrect= { false}
							autoFocus={false}
							returnKeyType={'next'}
							onChangeText={this._setSearchText}
							underlineColorAndroid={"rgba(0,0,0,0)"}
							value={this.state.searchText}
						/>

					{this.state.searchText != '' &&
						<TouchableOpacity
							style={{ marginLeft: 25, padding: 10}}
							onPress={()=>this._cleanInput()}>
							<Text style={{
									fontSize: 16,
									backgroundColor: 'white'}}>取消</Text>
						</TouchableOpacity>
					}

				</View>

			</View>
		)
	}
	_renderRestaurant({item}) {
		const restaurant = item;
				if(restaurant){
					return <RestaurantCard restaurant={restaurant}
										navigator={this.props.navigator}/>
				}
	  }
	_keyExtractor = (item, index) => index;
	_renderRestaurants() {

			return(
				<FlatList
				style={styles.scrollView}
				key={this.props.index}
				data={this.state.restaurantList}
				keyboardDismissMode={"on-drag"}
				keyboardShouldPersistTaps={"always"}
				renderItem={(res) => this._renderRestaurant(res)}
				keyExtractor={this._keyExtractor}
				removeClippedSubviews={true}
				initialNumToRender={1}
				onEndReachedThreshold={0.5}
				extraData={this.state.restaurantList}
				onEndReached = {({distanceFromEnd})=>{

					this.setState({
					length: this.state.length + 5,
					restaurantList:this.state.filteredRestaurant.slice(0, this.state.length)
					})
				}}

			/>
			)
	  }
	_renderArea({item}){
		let area = item;
		if(area){
			return(
				<TouchableOpacity onPress={()=>{
					this._setSearchText(area.name);
					this.refs.searchInput.value = area.name;
					}}
					style={{padding:10}} >
					<View style={{backgroundColor:'green', width:(width/2)-40, height:(width/2)-40}}></View>
					<View style={{
						flex:1,
						margin:10,
						position:'absolute',
						width:(width/2)-40, height:(width/2)-40,
						backgroundColor:'rgba(0,0,0,0.3)',
						alignItems:'center',
						justifyContent:'center'
						}}>
						<Text style={{
							color:"#ffffff",fontSize:16,fontFamily:'FZZongYi-M05S',
						}}>{area.name}</Text>
					</View>
				</TouchableOpacity>
			)
		}

	}
	_areaKeyExtractor = (area, index) => index + area.area +area.name;
	_renderAreas(){
		return(
			<FlatList
				style={{alignSelf:'center'}}
				numColumns={2}
				key={'area'}
				data={this.state.areaList.slice(1, this.state.areaList.length)}
				keyboardDismissMode={"on-drag"}
				keyboardShouldPersistTaps={"always"}
				renderItem={(area)=>this._renderArea(area)}
				keyExtractor={this._areaKeyExtractor}
				removeClippedSubviews={true}
				initialNumToRender={1}
				extraData={this.state.areaList.slice(1, this.state.areaList.length)}
			/>
		)
	}
	_renderResult(){
		{this._renderAreas()}
		if(this.state.restaurantList.length>0){
			return(
				<View style={{flex:1}}>
					{this._renderRestaurants()}
				</View>
			)
		}else{
			return(
				<View style={{flex:1}}>
					{this._renderAreas()}
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
					{this._renderResult()}

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
		width:width - 45,
		marginTop:5,
	},
	input_full:{
		fontSize: 18,
		borderRadius: 8,
		color: '#ea7b21',
		height:40,
		width:width,
		marginTop:5,
	},
	header:{
		width:width - 45,
		height:60,
		flexDirection:'row',
		alignItems:'center',
		marginTop:Platform.OS === 'ios'? 20 : 0,
	},
	header_full:{
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
		flex:1,
		backgroundColor:'#f4f4f4',
		flexDirection:'row',
		alignItems:'center',
		alignSelf:'center',
		width: width-searchViewMarginHorizontal*2 - 45,
	},
	searchView_full:{
		borderRadius:30,
		borderWidth:1,
		borderColor:'#e2e2e2',
		marginTop:10,
		marginHorizontal:10,
		flex:1,
		backgroundColor:'#f4f4f4',
		flexDirection:'row',
		alignItems:'center',
		alignSelf:'center',
		width: width-searchViewMarginHorizontal*2,
	},
	searchInput:{
		fontSize: 18,
		height:40,
		marginHorizontal:5,
		width:width-searchViewMarginHorizontal*2-20-15-iconSearchInputSize*0.45-10 - 45,

	},
	searchInput_full:{
		fontSize: 18,
		height:40,
		marginHorizontal:5,
		width:width-searchViewMarginHorizontal*2-20-15-iconSearchInputSize*0.45-10,

	},
});
