/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import SboxProductView from './SboxProductView';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default class SboxProductTab extends Component {
  constructor(props) {
      super(props);
      this._renderProduct = this._renderProduct.bind(this);
      this._renderHeader = this._renderHeader.bind(this);
  }
  componentDidMount(){
    const index = this.props.index;
		const scrollView = this._scrollVew;
		const scrollViewContent = this._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref);

	}
  // _keyExtractor = (item, index) => this.props.index + index;
  _keyExtractor = (product, index) =>product.pmid + index;
  _renderProduct(product) {
      return (
        <SboxProductView goToSboxProductDetial={this.props.goToSboxProductDetial}
          product={product.item}
        />
      );
  }
  _renderHeader() {
    // height * 0.4106 + 80
    return(
      <View style={{ marginTop:  width*0.4831*1.3699 + 20, height: 0 }}
            ref={(comp) => this._scrollViewContent = comp }/>
    )
  }
  _keyExtractor = (product, index) => product.pmid+'index'+index;
  render() {
      return (
          <FlatList
              scrollEventThrottle={1}
              ref={(comp) => this._scrollVew = comp}
              ListHeaderComponent={this._renderHeader}
              onEndReached={this.props.reachEnd}
              onEndReachedThreshold={0.3}
              onScroll={this.props.scrollEventBind()}
              data={this.props.prod_list}
              renderItem={this._renderProduct}
              keyExtractor={this._keyExtractor}
              getItemLayout={(data, index) => (
                   {length: 250, offset: 250 * index, index}
                 )}
          />

      );
  }
}
