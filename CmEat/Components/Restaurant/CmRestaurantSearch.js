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
import HomeStore from '../../Stores/HomeStore';
import HomeAction from '../../Actions/HomeAction';
import RestaurantCard from './RestaurantCard';
import WordProcessor from '../WordProcess/WordProcessor';
import CMLabel from '../../Constants/AppLabel'
import { orderBy } from 'lodash';
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
				zones: [],
				length:5,
				isRendering:'area',

			}
		this.state = Object.assign({},state,HomeStore.getHomeState());
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
		return filter(restaurants, (rest) => {
			if(rest.name){
				let lowerCaseName = rest.name.toLowerCase();
				return lowerCaseName.search(text) !== -1;
			}
		});

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
  		} else {
  			this.setState({
  				 searchText:'',
  				 filteredRestaurant:[],
  				 restaurantList:[],
  			 });
  		}
  }
  _cleanInput() {
  		this.setState({
  			searchText:'',
  			restaurantList:[],
  			isRendering:'area'
  		},()=>this.refs.searchInput.clear());
	}
	_renderSearchInput() {
		return (
			<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: headerHeight}}>
					<View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: marginTop}}>
							<Image
								source={require('./Image/icon_search_input.png')}
								style={{width: 22, height: 24.5
								}}
							/>
							<TextInput
								ref={'searchInput'}
								style={{flex: 1, marginLeft: 10, fontFamily:"FZZhunYuan-M02S", fontSize: 20,}}
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
						<Text style={{
								fontSize: 16,
								backgroundColor: 'white'}}>取消</Text>
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
  _renderAreasHeader() {
    return(
      <View style={{padding:10,paddingTop:20,paddingBottom:0}}>
        <Text style={{fontSize:18,fontFamily:"FZZhunYuan-M02S"}}>
          {CMLabel.getCNLabel('CITY_AREA')}
        </Text>
      </View>
    )
  }
	_renderArea({item ,index}) {
		let area = item;
		if(area){
			return(
				<TouchableOpacity onPress={()=>{
  					this._setSearchText(area.name);
  					this.refs.searchInput.value = area.name;
					}}>
					<ImageBackground
            source={{uri:area.image}}
            style={{
              marginTop:10,
              marginLeft:10,
  						width:(width-30)/2,
              height:(width-30)/2,
  						alignItems:'center',
  						justifyContent:'center',
  						}}>
  						<Text style={{
                  backgroundColor:"rgba(0,0,0,0)",
    							color:"#ffffff",
                  fontSize:18,
                  fontFamily:'FZZongYi-M05S',
    						}}>
                {area.name}
              </Text>
					</ImageBackground>
				</TouchableOpacity>
			)
		}

	}
	_areaKeyExtractor = (area, index) => index + area.area +area.name;
	_renderAreas() {
		return(
			<FlatList
				numColumns={2}
				key={'area'}
        showsVerticalScrollIndicator={false}
				data={this.state.zones}
				keyboardDismissMode={"on-drag"}
				keyboardShouldPersistTaps={"always"}
        ListHeaderComponent={this._renderAreasHeader}
				renderItem={(area)=>this._renderArea(area)}
				keyExtractor={this._areaKeyExtractor}
				removeClippedSubviews={true}
				initialNumToRender={1}
				extraData={this.state.zones}
			/>
		)
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
				<View style={{flex:1}}>
					{this._renderAreas()}
				</View>
			)
		}
	}
	render() {

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
});
