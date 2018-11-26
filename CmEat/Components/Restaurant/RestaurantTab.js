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

	}

  _renderRestaurant({item}) {
    const restaurant = item;
			if(restaurant){
				return <RestaurantCard restaurant={restaurant} navigator={this.props.navigator}/>
			}
  }
  _keyExtractor = (item, index) => item.area + item.rid;
  render() {
    return(
      <FlatList
          style={styles.scrollView}
          key={this.props.index}
          ref={(comp) => this._scrollVew = comp}
          data={this.state.restaurantList}
          renderItem={this._renderRestaurant}
          keyExtractor={this._keyExtractor}
          extraData={this.state.restaurantList}

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
  },
});
