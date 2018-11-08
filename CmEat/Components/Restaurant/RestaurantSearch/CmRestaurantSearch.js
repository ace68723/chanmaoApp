'use strict';
import React, {
	Component,
} from 'react';
import {
	Alert,
	Animated,
	Dimensions,
	Image,
  ImageBackground,
	Keyboard,
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
import HomeStore from '../../../Stores/HomeStore';
import HomeAction from '../../../Actions/HomeAction';
import RestaurantAction from '../../../Actions/RestaurantAction';
import RestaurantCard from '../RestaurantCard';
import WordProcessor from '../../WordProcess/WordProcessor';
import Label from '../../../../App/Constants/AppLabel'
import { orderBy } from 'lodash';
import SearchByArea from './SearchByArea';
import SearchByTag from './SearchByTag';
const {width,height} = Dimensions.get('window');
let marginTop,headerHeight;
if(height == 812){
  headerHeight = 88;
	marginTop = 30;
}else{
  headerHeight = 64;
	marginTop = 10;
}
const searchViewMarginHorizontal = 10;
const iconSearchInputSize = 35;

export default class CmRestaurantSearch extends Component {

  constructor(props) {
        super(props);
        this.state = {
				searchText:'',
				filteredRestaurant:[],
				restaurantList: [],
				allRestaurants: [],
				zones: [],
				length:5,
				isTagClicked: false,
				clickedAreaTag:{},
				clickedFlavorTag:{},
				tags:[],
				categoryList:[],
			}
		this._setSearchText = this._setSearchText.bind(this);
		this._onChange = this._onChange.bind(this);
		this._renderRestaurant = this._renderRestaurant.bind(this);
		this._keyExtractor = this._keyExtractor.bind(this);
		this._scrollToTop = this._scrollToTop.bind(this);
		this._clearAll = this._clearAll.bind(this);
	}

	componentDidMount() {
		HomeStore.addChangeListener(this._onChange);
	}
	componentWillUnmount() {
		HomeStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		const newState = Object.assign({},HomeStore.getHomeState());
		let zones = newState.zones;
		let tags = newState.tags;
		let allRestaurants = newState.restaurantList;
		let restaurants = HomeStore.getRestaurantListByTag();
		if(this.state.isTagClicked){
			this.setState({filteredRestaurant:restaurants,restaurantList:restaurants});

		}else{
			this.setState(Object.assign(newState,{filteredRestaurant:[],
				restaurantList:[], allRestaurants: allRestaurants, zones: zones}));

		}

	}

	_filterNotes(searchText, restaurants) {

		let text = searchText.toLowerCase();
		let filterArray = [];

		if(this.state.isTagClicked){
			filterArray = this.state.filteredRestaurant;
		}else{
			filterArray = restaurants;
		}
		if(text){
			filterArray = filter(filterArray, (rest) => {
				if(rest.name){
					let lowerCaseName = rest.name.toLowerCase();
					return lowerCaseName.search(text) !== -1;
				}
			});
		}
		return filterArray;

	}
  _setSearchText(text) {

		if(text){
			let processedText = WordProcessor.tranStr(text);
			let filteredData;

			if(this.state.isTagClicked){
				filteredData = this._filterNotes(processedText, this.state.filteredRestaurant);
			}else{
				filteredData = this._filterNotes(processedText, this.state.allRestaurants);
			}

			filteredData = orderBy(filteredData, ['open', 'rank', 'distance'], ['desc', 'desc', 'asc']);

			this.setState({
				searchText: text,
				restaurantList: filteredData//filteredData.slice(0, 5)
			});

	  	}else {
			if(this.state.isTagClicked){
				this.setState({
					searchText:'',
					restaurantList: this.state.filteredRestaurant
				});
			}else{
				this.setState({
					searchText:'',
					filteredRestaurant:[],
					restaurantList:[],
				 });
			}

	  }


  }
  _cleanInput() {
	  if(this.state.isTagClicked){
			this.setState({
				searchText:'',
				restaurantList: this.state.filteredRestaurant,
			});
			this.refs.searchInput.clear();
	  }else{
			this.setState({
				searchText:'',
				restaurantList:[],
				filteredRestaurant:[],
			});
			this.refs.searchInput.clear();
	  }

	}
	_clickTag(tag){
		try{
			RestaurantAction.getRestaurantByTag(tag.cid);
			Keyboard.dismiss();
			this.setState({
				isTagClicked:true,
				clickedFlavorTag:tag,

			})
		}catch(e){
			console.log(e)
		}
	}
	_clickArea(tag){

		let	filteredData = this._filterNotes(tag.name, this.state.allRestaurants);
		filteredData = orderBy(filteredData, ['open', 'rank', 'distance'], ['desc', 'desc', 'asc']);
		Keyboard.dismiss();
		this.setState({
			isTagClicked:true,
			clickedAreaTag:tag,
			filteredRestaurant:filteredData,
			restaurantList: filteredData//filteredData.slice(0, 5)
		})
	}
	_clearAll(){
		this.setState({
			isTagClicked:false,
			clickedAreaTag:{},
			clickedFlavorTag:{},
			restaurantList:[],
			searchText:'',
		});
		this.refs.searchInput.clear();
	}
	_delArea(){
		this.setState({
			isTagClicked:false,
			clickedAreaTag:{},
			clickedFlavorTag:{},
			restaurantList:[]
		},()=>{
			if(this.state.searchText != ''){
				//this._filterNotes(this.state.searchText, this.state.allRestaurants);
				this._setSearchText(this.state.searchText)
			}
		})
	}
	_scrollToTop() {
		this.refs.searchPage.scrollTo({x: 0, y: 0, animated: true});
		// Added this timeout to fix blank section b/c animation
		// setTimeout(() => {
		// 	this.refs.searchPage.scrollTo({x: 0, y: 0, animated: true});
		// }, 500);
	}
	_renderTag(){
		if(this.state.isTagClicked){
			let clickedTag;

			if(this.state.clickedAreaTag.name){
				clickedTag = this.state.clickedAreaTag;
			}else{
				clickedTag = this.state.clickedFlavorTag;
			}

			return(
				<TouchableOpacity
						activeOpacity={0.4}
						style={[styles.tagView,{width: clickedTag.name.length * (1 + 16)^(-2) }]}
						onPress={()=>this._delArea()}>
					<Text style={styles.tagFont}
								allowFontScaling={false}>
								{clickedTag.name} ×
					</Text>
				</TouchableOpacity>
			);
		}
	}
	_renderReturnButton(){
		let isSearching = this.state.isTagClicked || this.state.searchText.length > 0;
		return(
			<TouchableOpacity
					activeOpacity={0.4}
					style={{flex:0.1,justifyContent:'center',height:headerHeight}}
					onPress={()=>this._clearAll()}
					disabled={!isSearching} >
				<Image
								source={isSearching ? require('../Image/icon-back.png'): require('../Image/icon_search_input.png')}
								style={[isSearching ? {width: 20, height: 20} : {width: 22, height: 24.5},{marginLeft:10,marginTop: marginTop}]}
							/>
			</TouchableOpacity>

		)
	}
	_renderSearchInput() {
		return (
			<View style={{flexDirection: 'row',
										justifyContent: 'flex-start',
										alignItems: 'center',
										height: headerHeight,
										borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: '#bdc8d9'}}>
					<View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-start'}}>
							{this._renderReturnButton()}
							<View style={{flex:0.9,flexDirection:'row', alignItems:'center'}}>
								{this._renderTag()}
								<TextInput
									ref={'searchInput'}
									style={{flex: 1,
													marginLeft: 10,
													marginRight: 10,
													fontFamily:"NotoSansCJKsc-Regular",
													paddingTop: 10,
													paddingBottom: 10,
													marginTop: marginTop}}
									selectionColor={'#ea7b21'}
									keyboardType = {'default'}
									autoCorrect= {false}
									autoFocus={false}
									returnKeyType={'next'}
									onChangeText={this._setSearchText}
									underlineColorAndroid={"rgba(0,0,0,0)"}
									placeholder={Label.getCMLabel('SEARCH_RESTAURANTS_PLACEHOLDER')}
								/>
							</View>
					</View>
					{this._renderCleanSearchText()}
			</View>
		)
	}

	_renderCleanSearchText() {
		if (this.state.searchText != '') {
			return (
				<TouchableOpacity
					activeOpacity={0.4}
					style={{flex:0.2,height: headerHeight, justifyContent:'center'}}
					onPress={()=>this._cleanInput()}>
					<Text style={{fontSize: 16, marginTop:marginTop, textAlign: 'center'}}
								allowFontScaling={false}>{Label.getCMLabel('CANCEL')}</Text>
				</TouchableOpacity>
			)
		}
	}
	_renderRestaurant({item}) {
		const restaurant = item;
				if(restaurant){
					return <RestaurantCard restaurant={restaurant}
										navigator={this.props.navigator}/>
				}
	  }
	//   onEndReached = {({distanceFromEnd})=>{

	// 	this.setState({
	// 	length: this.state.length + 5,
	// 	restaurantList:this.state.filteredRestaurant.slice(0, this.state.length)
	// 	})
	// }}
	_keyExtractor = (item, index) => index.toString();
	_renderRestaurants() {
			return(
				<FlatList
					style={styles.scrollView}
					key={this.props.index}
					data={this.state.restaurantList}
					keyboardDismissMode={"on-drag"}
					keyboardShouldPersistTaps={'always'}
					renderItem={(res) => this._renderRestaurant(res)}
					keyExtractor={this._keyExtractor}
					initialNumToRender={1}
					onEndReachedThreshold={0.5}
					extraData={this.state.restaurantList}
				/>
			)
	  }
  _renderHeader(label) {
		if(label == "area"){
			return(
				<View style={{padding:10,paddingTop:20,paddingBottom:0}}>
					<Text style={{fontSize:18,
												fontFamily:"NotoSansCJKsc-Regular"}}
								allowFontScaling={false}>
						{Label.getCMLabel('CITY_AREA')}
					</Text>
				</View>
			)
		}else{
			return(
				<View style={{padding:10,paddingTop:20,paddingBottom:0}}>
					<Text style={{fontSize:18,
												fontFamily:"NotoSansCJKsc-Regular"}}
								allowFontScaling={false}>
						{Label.getCMLabel('RES_TAG')}
					</Text>
				</View>
			)
		}

  }

	_renderResult() {
		if(this.state.restaurantList.length>0){
			return(
				this._renderRestaurants()
			)
		}else if(this.state.searchText.length > 0){
			return(
				<View style={{justifyContent:'center',
							alignContent:'center',
							alignSelf:'center',
							marginTop:100
							}}>
					<Text style={{fontSize:16,
												margin:3,
												fontFamily:'NotoSansCJKsc-Black'}}
								allowFontScaling={false}>
								{Label.getCMLabel('CANNOT_FIND_ABOUT')} "{this.state.searchText}" {Label.getCMLabel('ABOUT_XX_ITEMS')}
					</Text>
				</View>
			)
		}else{
			return(
				<ScrollView
					keyboardDismissMode={"on-drag"}
					keyboardShouldPersistTaps={'always'}
					style={{flex:1}}
					ref={'searchPage'}>
					<SearchByTag
						onPressTag={(tag)=>this._clickTag(tag)}
						scrollToTop={this._scrollToTop}
						tags={this.state.tags}/>
					<SearchByArea
						onPressArea={(area)=>this._clickArea(area)}
						areas={this.state.zones} />
					<View style={{height: 10}}>
					</View>
				</ScrollView>
			)
		}
	}
	render() {
		if (this.state.allRestaurants.length == 0) {
			return <Image  style={{height: height, width: width}} source={require('../Image/no_restaurants_area.png')}/>
		}
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
	opacityView:{
		flex:1,
		opacity: 0.3,
		backgroundColor:'#000000'
	},
	imageTextContainer:{
		position:'absolute',
		left:0,
		top:0,
		right:0,
		bottom:0,
		backgroundColor:'rgba(0,0,0,0)',
		//flex:1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageText: {
	fontSize: 20,
	color:'white',
	alignSelf:'center',
	fontFamily:'NotoSansCJKsc-Black',
	},
	tagView: {
		height:24,
		backgroundColor:'#d0d0d0',
		flexDirection:'row',
		borderRadius:12,
		borderColor:'#d0d0d0',
		borderWidth:1,
		marginLeft:10,
		alignItems:'center',
		justifyContent: 'center',
		paddingHorizontal:5,
		marginTop: marginTop
	},
	tagFont:{
		color:'white',
		fontWeight:'bold'
	}
});
