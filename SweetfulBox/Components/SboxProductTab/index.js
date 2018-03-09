/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollableTabView,
} from 'react-native';
import SboxProductView from './SboxProductView';
import Settings from '../../Config/Setting';
import SboxProductTabSectionHeaderCell from "./SboxProductTabSectionHeaderCell"

import Util from '../../Modules/Util';

import SboxProductTabAction from '../../Actions/SboxProductTabAction';
import SboxProductAction from '../../Actions/SboxProductAction';
import SboxProductTabStore from '../../Stores/SboxProductTabStore';

const { width, height } = Dimensions.get('window');

export default class MyComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        prod_list:[],
        section_list:[],
        headerIndex:[],
      }
      this._renderProduct = this._renderProduct.bind(this);
      this._renderHeader = this._renderHeader.bind(this);
      this._pressedSectionHeader = this._pressedSectionHeader.bind(this);
      this._goToSboxProductDetial = this._goToSboxProductDetial.bind(this);
      this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    // SboxProductTabStore.addThemeData(this.props.tmid,this.props.section_list,this.props.prod_list)
    const index = this.props.index;
		const scrollView = this._scrollVew;
		const scrollViewContent = this._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref);
    SboxProductTabStore.addChangeListener(this._onChange);
	}

  componentWillUnmount(){
    SboxProductTabStore.removeChangeListener(this._onChange);
  }
  _onChange(){
    const {tmid} = this.props;
    const updatedTmid = SboxProductTabStore.getUpdatedTmid();
    if(tmid !== updatedTmid && updatedTmid !== -1) return;
    this.setState(SboxProductTabStore.getStateByTmid(tmid));
  }
  _goToSboxProductDetial(item) {
    if (item.spu_status === 1 || item.sku_status === 1) return;
    const {spu_id, image} = item;

    if (Util.getWaitingStatus() === true){
      return;
    }
    Util.toggleWaitingStatus();

    if (item.sku_id) {SboxProductAction.getSingleProduct(spu_id,item.sku_id)}
    else {SboxProductAction.getSingleProduct(spu_id,-1)}
    setTimeout( () => {
      this.props.navigator.push({
        screen: 'SboxProductDetial',
        navigatorStyle: {navBarHidden: true},
        passProps:{spu_image:image},
      })
    }, 150);

  }
  _onEndReached() {
    SboxProductTabAction.getProductList();
  }
  _renderProduct({item}) {
      if (item.type === "spu" || item.type === "sku"){
        return (
          <TouchableOpacity
             onPress={this._goToSboxProductDetial.bind(null,item)}>
              <SboxProductView
                product={item}
              />
           </TouchableOpacity>
        );

      }
      else if (item.type === "empty") {
        return (
          <View style={{
             flex:1,
             alignItems:'center',
             justifyContent:'center',
           }}>
          </View>
        )
      }
      else if(item.type === "section"){
        return (
          <View style={{
             flex:1,
             alignItems:'center',
             justifyContent:'center',
           }}>
           <Text style={{
               fontWeight: 'bold',
             }}>{item.section_name}
           </Text>
          </View>
        );
      }else{
        return(
          <View
           style={{
             flex:1,
             alignItems:'center',
             justifyContent:'center',
           }}>
           <View style={{ backgroundColor: '#a5a5a5',
                          height: 1,
                          width: Settings.getX(258)
                        }}>
           </View>
         </View>
        )
      }
  }
  _selectCategory(category){
    this.setState({
      categoryChecked: category,
    })
  }
  _pressedSectionHeader(index){
    this.setState({headerIndex:index});
    var tar_index = 1;
    for (var counter = 0; counter < this.state.prod_list.length; counter++) {
      if (this.state.prod_list[counter].section_id == index && this.state.prod_list[counter].type == "section_left") {
        tar_index = Math.floor(counter / 3) - index + 1;
      }
    }
    this._scrollVew.scrollToOffset({animated: true, offset: 270 + tar_index * 209 + (index - 1) * 30});
  }
  _renderHeaderSection(){
    if (!this.state.section_list){
      return;
    }
    let sectionList = [];
    for (var index = 0; index < this.state.section_list.length; index++) {
      const section = this.state.section_list[index];
       sectionList.push(
         <SboxProductTabSectionHeaderCell
           key = {index}
           icon={section.section_icon}
           name={section.section_name}
           currentIndex={this.state.headerIndex}
           index={section.section_id}
           onPress={this._pressedSectionHeader}
         />
        )
    }
    return (sectionList)
  }
  _renderHeader() {
    // height * 0.4106 + 80
    return(
      <View style={{
          marginTop: width*0.4831*1.3699 + 20,
          marginBottom: Settings.getY(72),
          height: 30,
          flex: 1,
          flexDirection: 'row',
        }}
        ref={(comp) => this._scrollViewContent = comp }>
          {this._renderHeaderSection()}
      </View>
    )
  }
  _keyExtractor = (product, index) => product.section_id+'index'+index;


  render() {
    return (
        <FlatList
            scrollEventThrottle={1}

            style={this.props.style}
            ref={(comp) => this._scrollVew = comp}
            ListHeaderComponent={this._renderHeader}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.3}
            onScroll={this.props.scrollEventBind()}
            data={this.state.prod_list}
            renderItem={this._renderProduct}
            keyExtractor={this._keyExtractor}
            getItemLayout={(data, index) => (
                 {length: 250, offset: 250 * index, index}
               )}
           stickyHeaderIndices={[0]}
           numColumns={3}
           columnWrapperStyle={{ marginTop: 10,alignSelf:'center' }}
        />
    );
  }
}

const styles = StyleSheet.create({

  headerContainer: {
    marginTop:  width*0.4831*1.3699 + 20,
    height: Settings.getY(174),
    flexDirection:'row',
    justifyContent:'center'
  }

});
