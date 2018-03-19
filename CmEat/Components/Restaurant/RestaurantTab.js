'use strict';
import React, {
	Component,
} from 'react';
import  {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  FlatList
} from 'react-native';
import RestaurantCard from './RestaurantCard';
const {width,height} = Dimensions.get('window');
let marginTop;
let flatListMarginTop;
if(Platform.OS==='ios'){
  if(height == 812){
    //min 34
    //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
    marginTop = 88+200+30-40;
    flatListMarginTop = 0;
  }else{
    marginTop = 54+200+30-20;
    flatListMarginTop = -20;
  }
}else{
    marginTop = 54+200+32;
    flatListMarginTop = 0;
}

export default class RestaurantTab extends Component {
  constructor(props){
		super(props)
    this.state = {
      length:10,
      restaurantList: props.restaurantList.slice(0, 3)
    }
		this._renderRestaurant = this._renderRestaurant.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);
	}
	componentDidMount(){
		const index = this.props.index;
		const scrollView = this._scrollVew;
		const scrollViewContent = this._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref)
		this._scrollVew.scrollToOffset({y: this.props.scrollY,animated:false});
	}
  _renderRestaurant({item}) {
    const restaurant = item;
			if(restaurant){
				return <RestaurantCard restaurant={restaurant}
															 openMenu={this.props.openMenu}
															 navigator={this.props.navigator}/>
			}
  }
	_renderHeader(){
		return	<View style={{marginTop:marginTop,height:0}}
						 ref={(comp) => this._scrollViewContent = comp}/>
	}
  _keyExtractor = (item, index) => index;
  render() {
    return(
      <FlatList
          style={styles.scrollView}
          key={this.props.index}
          ref={(comp) => this._scrollVew = comp}
          scrollEventThrottle={1}
          onScroll={this.props.scrollEventBind()}
          ListHeaderComponent={this._renderHeader.bind(this)}
          data={this.state.restaurantList}
          renderItem={this._renderRestaurant}
          keyExtractor={this._keyExtractor}
          removeClippedSubviews={true}
          initialNumToRender={1}
          onEndReachedThreshold={0.5}
          extraData={this.state.restaurantList}
          onEndReached = {({distanceFromEnd})=>{
               this.setState({
                 length: this.state.length + 10,
                 restaurantList:this.props.restaurantList.slice(0, this.state.length)
               })
             }}

      />
    )
  }
};
// getItemLayout={(data, index) => (
//      {length: 250, offset: 250 * index, index}
//    )}
const styles = StyleSheet.create({
  scrollView:{
    flex: 1,
    marginTop:flatListMarginTop
    // backgroundColor:'blue'
  },
});
