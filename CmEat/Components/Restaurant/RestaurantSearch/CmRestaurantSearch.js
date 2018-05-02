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
import RestaurantCard from '../RestaurantCard';
import WordProcessor from '../../WordProcess/WordProcessor';
import CMLabel from '../../../Constants/AppLabel'
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
        const state = {
				searchText:'',
				filteredRestaurant:[],
				restaurantList: [],
				allRestaurants: [],
				zones: [],
				length:5,
				isRendering:'area',
				isTagClicked: false,
				clickedAreaTag:'',
				tags:[],
				categoryList:[],
			}
		this.state = Object.assign({},state,HomeStore.getHomeState());
		this.setState = this.setState.bind(this);
		this._setSearchText = this._setSearchText.bind(this);
		this._onChange = this._onChange.bind(this);
		this._renderRestaurant = this._renderRestaurant.bind(this);
		this._keyExtractor = this._keyExtractor.bind(this);
  }
	componentDidMount() {
		// HomeAction.getHomeData();
		HomeStore.addChangeListener(this._onChange);
	}
	componentWillUnmount() {
		HomeStore.removeChangeListener(this._onChange);
	}
	_onChange() {
		const newState = Object.assign({},HomeStore.getHomeState());
		let zones = newState.zones;
		let allRestaurants = newState.restaurantList;
		this.setState(Object.assign(newState,{restaurantList: [], allRestaurants: allRestaurants, zones: zones}));

	}
    // _goBack(){
    //     this.props.navigator.pop({animated: false,});
	// }
	_filterNotes(searchText, restaurants) {

		let text = searchText.toLowerCase();
		let filterArray = [];
		
		if(this.state.isTagClicked){
			filterArray = filter(restaurants, (rest) => {
				if(rest.name){
					let lowerCaseName = rest.name.toLowerCase();
					return lowerCaseName.search(this.state.clickedAreaTag.toLowerCase()) !== -1;
				}
			})	
		}else{
			filterArray = restaurants;
		}
		console.log(text)
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
			if(text != "All"){
					filteredData = this._filterNotes(processedText, this.state.allRestaurants);
			}else{
					filteredData = this.state.allRestaurants;
			}
			filteredData = orderBy(filteredData, ['open', 'rank', 'distance'], ['desc', 'desc', 'asc']);
		
			this.setState({
				searchText: text,
				filteredRestaurant:filteredData,
				isRendering:'restaurant',
				restaurantList: filteredData.slice(0, 5)
			});
			
			
			//this.refs.searchInput.value = text;
	  	}else {
			if(this.state.isTagClicked){
				this.setState({
					searchText:'',
				})
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
			isRendering:'area'
		},()=>this.refs.searchInput.clear())
	  }else{
		this.setState({
			searchText:'',
			restaurantList:[],
			isRendering:'area'
		},()=>this.refs.searchInput.clear());
	  }
  		
	}
	
	_clickTag(tag){
	
		let	filteredData = this._filterNotes(tag, this.state.allRestaurants);
		filteredData = orderBy(filteredData, ['open', 'rank', 'distance'], ['desc', 'desc', 'asc']);
		
		this.setState({
			isTagClicked:true,
			clickedAreaTag:tag,
			filteredRestaurant:filteredData,
			isRendering:'restaurant',
			restaurantList: filteredData.slice(0, 5)
		})
	}
	_delArea(){
		this.setState({
			isTagClicked:false,
			clickedAreaTag:'',
			restaurantList:[]
		})
	}
	_renderAreaTag(){
		if(this.state.isTagClicked){
			return(
				<View style={[styles.tagView,{width:this.state.clickedAreaTag.length * (1 + 16)^(-2) }]}>
					<Text style={styles.tagFont}>{this.state.clickedAreaTag}</Text>
					<TouchableOpacity style={{marginLeft:5,justifyContent:'center',backgroundColor:'rgba(0,0,0,0)'}} onPress={()=>this._delArea()}>
						<Text style={{fontSize:20, color:'white'}}>×</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
	_renderSearchInput() {
		return (
			<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: headerHeight}}>
					<View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: marginTop}}>
							<Image
								source={require('../Image/icon_search_input.png')}
								style={{width: 22, height: 24.5
								}}
							/>
							{this._renderAreaTag()}
							<TextInput
								ref={'searchInput'}
								style={{flex: 1, marginLeft: 10, fontFamily:"FZZhunYuan-M02S", fontSize: 16,}}
								selectionColor={'#ea7b21'}
								keyboardType = {'default'}
								autoCorrect= { false}
								autoFocus={false}
								returnKeyType={'next'}
								onChangeText={this._setSearchText}
								underlineColorAndroid={"rgba(0,0,0,0)"}
								placeholder={"搜索你想要的餐馆"}
								value={this.state.searchText}
							/>
					</View>
					{this.state.searchText != '' &&
						<TouchableOpacity
						style={{marginRight: 20, marginTop: marginTop}}
						onPress={()=>this._cleanInput()}>
						<Text style={{fontSize: 16,
													backgroundColor: 'white'}}
								allowFontScaling={false}>取消</Text>
					</TouchableOpacity>
					}
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
  _renderHeader(label) {
		if(label == "area"){
			return(
				<View style={{padding:10,paddingTop:20,paddingBottom:0}}>
					<Text style={{fontSize:18,
												fontFamily:"FZZhunYuan-M02S"}}
								allowFontScaling={false}>
						{CMLabel.getCNLabel('CITY_AREA')}
					</Text>
				</View>
			)
		}else{
			return(
				<View style={{padding:10,paddingTop:20,paddingBottom:0}}>
					<Text style={{fontSize:18,
												fontFamily:"FZZhunYuan-M02S"}}
								allowFontScaling={false}>
						{CMLabel.getCNLabel('RES_TAG')}
					</Text>
				</View>
			)
		}

  }
	
	_renderResult() {
		if(this.state.restaurantList.length>0){
			return(
				<View style={{flex:1,marginTop:5}}>
					{this._renderRestaurants()}
				</View>
			)
		}else{
			return(
				<ScrollView style={{flex:1}}>
					<SearchByTag onPressTag={(tag)=>this._clickTag(tag)}/>
					<SearchByArea 
						onPressArea={(area)=>this._clickTag(area)}
						areas={this.state.zones} />
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
          <View style={{borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: '#bdc8d9',}}/>
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
	fontFamily:'FZZongYi-M05S',
	},
	tagView: {
		height:24, 
		backgroundColor:'#d0d0d0', 
		flexDirection:'row',
		borderRadius:12,
		borderColor:'#d0d0d0',
		borderWidth:1,
		marginLeft:5,
		marginTop:3,
		alignItems:'center',
		paddingHorizontal:5
	},
	tagFont:{
		color:'white',
		fontWeight:'bold'
	}
});
