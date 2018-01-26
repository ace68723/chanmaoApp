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
      this.state = {
        prod_list:props.prod_list,
        // categoryTitles: ['新品速递', '好货热卖', '超值特价'],
        // categoryChecked:'new',
        // format_data: [],
        // data_list:[
        //   {
        //     name: 'OKF芒果果汁',
        //     price:'1.19',
        //     image: require('./Image/box.png'),
        //     header:false,
        //   },
        //   {
        //     name: 'OKF芒果果汁',
        //     price:'1.19',
        //     image: require('./Image/box.png'),
        //     header:false,
        //   },
        //   {
        //     name: 'OKF芒果果汁',
        //     price:'1.19',
        //     image: require('./Image/box.png'),
        //     header:false,
        //   },
        //   {
        //     contentType: 'header-left',
        //   },
        //   {
        //     contentType: 'header-title',
        //     title: "新品速递"
        //   },
        //   {
        //     contentType: 'header-right',
        //   },
        //   {
        //     name: 'OKF芒果果汁',
        //     price:'1.19',
        //     image: require('./Image/box.png'),
        //     header:false,
        //   },
        //   {
        //     name: 'OKF芒果果汁',
        //     price:'1.19',
        //     image: require('./Image/box.png'),
        //     header:false,
        //   },
        //   {
        //     name: 'OKF芒果果汁',
        //     price:'1.19',
        //     image: require('./Image/box.png'),
        //     header:false,
        //   }
        // ],
        // data : [
        //   {
        //     'title' : '新品速递',
        //     'items' : [
        //       {
        //         name: 'OKF芒果果汁',
        //         price: '1.19',
        //         image: require('./Image/box.png'),
        //       }, {
        //         name: 'OKF芒果果汁',
        //         price: '1.19',
        //         image: require('./Image/box.png'),
        //       }, {
        //         name: 'OKF芒果果汁',
        //         price: '1.19',
        //         image: require('./Image/box.png'),
        //       }
        //     ]
        //   },
        //   {
        //     'title' : '好货热卖',
        //     'items' : [
        //       {
        //         name: 'OKF芒果果汁',
        //         price: '1.19',
        //         image: require('./Image/box.png'),
        //       }, {
        //         name: 'OKF芒果果汁',
        //         price: '1.19',
        //         image: require('./Image/box.png'),
        //       }
        //     ]
        //   },
        // ]
      }
      this._renderProduct = this._renderProduct.bind(this);
      this._renderHeader = this._renderHeader.bind(this);
      this._getSpecialContentCell = this._getSpecialContentCell.bind(this);
  }

  componentDidMount(){
    const index = this.props.index;
		const scrollView = this._scrollVew;
		const scrollViewContent = this._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref);

	}

  _getSpecialContentCell(contentType, title){
    if (contentType == 'header-title'){
      return (
        <Text style={{
            marginTop: Settings.getY(72),
            height: Settings.getY(120),
            fontWeight: 'bold',
          }}>{title}</Text>
      );
    }
    if (contentType == 'header-left'){
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
    if (contentType == 'header-right'){
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
    if (contentType == 'empty'){
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
      if (product.item.type === "spu" || product.item.type === "sku"){
        return (
          <SboxProductView
            goToSboxProductDetial={this.props.goToSboxProductDetial}
            product={product.item}
          />
        );

      }else if(product.item.type === "section"){
        return (
          <View style={{
             flex:1,
             alignItems:'center',
             justifyContent:'center',
           }}>
           <Text style={{
               fontWeight: 'bold',
             }}>{product.item.section_name}
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
  _renderHeader() {
    // height * 0.4106 + 80
    return(
      <View style={{ marginTop:  width*0.4831*1.3699 + 20, height: 0 }}
            ref={(comp) => this._scrollViewContent = comp }/>
    )
    // return(
    //   <View style={styles.headerContainer}
    //         ref={(comp) => this._scrollViewContent = comp }>
    //
    //         <TouchableOpacity style={{flex:0.3, alignItems:'center',justifyContent:'center'}}
    //                           onPress={()=>this._selectCategory('new')}>
    //             <Text style={{color:this.state.categoryChecked == 'new' ? 'black' : '#a5a5a5'}}>{this.state.categoryTitles[0]}</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={{flex:0.3, alignItems:'center',justifyContent:'center'}}
    //                           onPress={()=>this._selectCategory('hot')}>
    //             <Text style={{color:this.state.categoryChecked == 'hot' ? 'black' : '#a5a5a5'}}>{this.state.categoryTitles[1]}</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={{flex:0.3, alignItems:'center',justifyContent:'center'}}
    //                           onPress={()=>this._selectCategory('cheap')}>
    //             <Text style={{color:this.state.categoryChecked == 'cheap' ? 'black' : '#a5a5a5'}}>{this.state.categoryTitles[2]}</Text>
    //         </TouchableOpacity>
    //   </View>
    //
    // )
  }
  _keyExtractor = (product, index) => product.section_id+'index'+index;

  render() {
    return (
        <FlatList
            scrollEventThrottle={1}
            ref={(comp) => this._scrollVew = comp}
            ListHeaderComponent={this._renderHeader}
            onEndReached={this.props.reachEnd}
            onEndReachedThreshold={0.3}
            onScroll={this.props.scrollEventBind()}
            data={this.state.prod_list}
            renderItem={this._renderProduct}
            keyExtractor={this._keyExtractor}
            getItemLayout={(data, index) => (
                 {length: 250, offset: 250 * index, index}
               )}
           stickyHeaderIndices={this.state.stickyHeaderIndices}
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
