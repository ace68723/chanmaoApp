/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SboxProductView from './SboxProductView';
import Settings from '../../Config/Setting';
const { width, height } = Dimensions.get('window');

export default class MyComponent extends Component {
  constructor(props) {
      super(props);
      console.log(props)
      this.state = {
        categoryTitles: ['新品速递', '好货热卖', '超值特价'],
        categoryChecked:'new',
        format_data: props.prod_list,
        categoryHot:0,
        categorySale: 0,
      }
      this._renderProduct = this._renderProduct.bind(this);
      this._renderHeader = this._renderHeader.bind(this);
      this._getSpecialContentCell = this._getSpecialContentCell.bind(this);
      this.scrollToIndex = this.scrollToIndex.bind(this);
  }
  componentWillMount() {
   let arr = [];
   
 }
 scrollToIndex(index) {
  console.log(index);
  this._scrollVew.scrollToIndex({animated: true, index: index});
}
  componentDidMount(){
    const index = this.props.index;
		const scrollView = this._scrollVew;
		const scrollViewContent = this._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
    this.props.getScrollViewRefs(ref);
    
    this.state.format_data.forEach((item,index) => {
      if(item.section_id === 2 && item.type == 'section_left') {
        hot = parseInt(index/3 , 10);
        this.setState({
          categoryHot:hot
        }
      )
      }
      if(item.section_id === 3 && item.type == 'section_left') {
       sale = parseInt(index/3 , 10)-1;
       console.log(index);
       this.setState({
         categorySale:sale
       }
      )

      }
    });

	}
  _keyExtractor = (product, index) =>product.pmid + index;
  
  _getSpecialContentCell(item, title){
    if (item.type == "section"){
      return (
        <Text style={{
            marginTop: Settings.getY(72),
            height: Settings.getY(120),
            fontWeight: 'bold',
          }}>{item.section_name}</Text>
      );
    }
    if (item.type == "section_left"){
      return (
        <View
          style={{
            borderBottomColor: '#a5a5a5',
            borderBottomWidth: 0.4,
            alignItems:'center',
            justifyContent:'center',
            width: Settings.getX(258),
            marginRight: Settings.getX(148),
            height: Settings.getY(100),
          }}
        />
      )
    }
    if (item.type == "section_right"){
      return (
        <View
          style={{
            alignItems:'center',
            justifyContent:'center',
            borderBottomColor: '#a5a5a5',
            borderBottomWidth: 0.4,
            width: Settings.getX(258),
            marginLeft: Settings.getX(148),
            height: Settings.getY(100),
          }}
        />
      )
    }
    if (!item.type){
      return (
        // empty cell
        <View
          style={{
            alignItems:'center',
            justifyContent:'center',
            width: Settings.getX(258),
            marginLeft: Settings.getX(148),
            height: Settings.getY(100),
          }}
        />
      )
    }
  }

  _renderProduct(product) {
      if (product.item.type !== 'spu' &&  product.item.type !== 'sku' ){
        return this._getSpecialContentCell(product.item, product.item.section_name);
      }
      else{
        return (
          <SboxProductView goToSboxProductDetial={this.props.goToSboxProductDetial}
            product={product.item}
          />
        );
      }
  }
  _selectCategory(category){
    this.setState({
      categoryChecked: category,
    })
  }
  _renderHeader() {
    // height * 0.4106 + 80
    return(
      <View style={styles.headerContainer}
            ref={(comp) => this._scrollViewContent = comp }>
            <TouchableOpacity style={{flex:0.3, alignItems:'center',justifyContent:'center'}}
                              onPress={()=>{
                                this._selectCategory('new');
                                this.scrollToIndex(0)}}>
                <Text style={{color:this.state.categoryChecked == 'new' ? 'black' : '#a5a5a5'}}>{this.state.categoryTitles[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:0.3, alignItems:'center',justifyContent:'center'}}
                              onPress={()=>{
                                this._selectCategory('hot');
                                this.scrollToIndex(this.state.categoryHot)}}>
                <Text style={{color:this.state.categoryChecked == 'hot' ? 'black' : '#a5a5a5'}}>{this.state.categoryTitles[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:0.3, alignItems:'center',justifyContent:'center'}}
                              onPress={()=>{
                                this._selectCategory('cheap');
                                this.scrollToIndex(this.state.categorySale)}}>
                <Text style={{color:this.state.categoryChecked == 'cheap' ? 'black' : '#a5a5a5'}}>{this.state.categoryTitles[2]}</Text>
            </TouchableOpacity>
      </View>

    )
  }
  _keyExtractor = (product, index) => product.pmid+'index'+index;
  render() {
    return (
      <View style={styles.container}>

        <FlatList
            scrollEventThrottle={1}
            ref={(comp) => this._scrollVew = comp}
            ListHeaderComponent={this._renderHeader}
            onEndReached={this.props.reachEnd}
            onEndReachedThreshold={0.3}
            onScroll={this.props.scrollEventBind()}
            data={this.state.format_data}
            renderItem={this._renderProduct}
            keyExtractor={this._keyExtractor}
            getItemLayout={(data, index) => (
                 {length: 250, offset: 250 * index, index}
               )}
           stickyHeaderIndices={[0]}
           numColumns={3}
           columnWrapperStyle={{ marginTop: 10,alignSelf:'center' }}
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer:{
    flexDirection:'row',
    height: 50,
    width:width,
  },
  headerContainer: {
    marginTop:  width*0.4831*1.3699 + 20,
    height: Settings.getY(174),
    flexDirection:'row',
    justifyContent:'center'
  }

});
