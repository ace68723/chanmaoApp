'use strict';
import React, {
	Component,
} from 'react';
import  {
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
export default class RestaurantTab extends Component {
  constructor(props){
		super(props)
    this.state = {
      length:10,
      restaurantList: props.restaurantList.slice(0, 3)
    }
		this._renderRestaurant = this._renderRestaurant.bind(this);
		this._renderHeader = this._renderHeader.bind(this);
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
		return	<View style={{marginTop:width*0.45+80,height:0}}
						 ref={(comp) => this._scrollViewContent = comp}/>
	}
   _keyExtractor = (item, index) => item.area + item.rid;
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
          getItemLayout={(data, index) => (
               {length: 250, offset: 250 * index, index}
             )}
      />
    )
  }
};
const styles = StyleSheet.create({
  scrollView:{
    flex: 1,
  },
});
