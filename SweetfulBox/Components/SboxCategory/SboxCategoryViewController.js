'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
  View,
	StyleSheet
} from 'react-native';

import SboxCategoryAction from '../../Actions/SboxCategoryAction';
import SboxCategoryStore from '../../Stores/SboxCategoryStore';
import SboxCategoryModule from '../../Modules/SboxCategoryModule/SboxCategoryModule';

import SboxCategoryContent from './SboxCategoryContent';
import SboxCategoryHeader from './SboxCategoryHeader';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class CategoryViewController extends Component {
  constructor() {
    super();
		this.state = Object.assign({},SboxCategoryStore.getState(),{
        //init state
        categoryList: [
          {
            categoryType: 1,
            categoryParam: {
              name: '休闲食品',
              image: require('./img/休闲食品.png'),
            },
            naviType: '',
            naviParam: '',
          },
          {
            categoryType: 1,
            categoryParam: {
              name: '泡面',
              image: require('./img/泡面.png'),
            },
            naviType: '',
            naviParam: '',
          },
          {
            categoryType: 1,
            categoryParam: {
              name: '饼干',
              image: require('./img/饼干.png'),
            },
            naviType: '',
            naviParam: '',
          },
          {
            categoryType: 1,
            categoryParam: {
              name: '糖果',
              image: require('./img/糖果.png'),
            },
            naviType: '',
            naviParam: '',
          },
          {
            categoryType: 1,
            categoryParam: {
              name: '坚果',
              image: require('./img/坚果.png'),
            },
            naviType: '',
            naviParam: '',
          },
          {
            categoryType: 1,
            categoryParam: {
              name: '蛋糕',
              image: require('./img/蛋糕.png'),
            },
            naviType: '',
            naviParam: '',
          },
          {
            categoryType: 1,
            categoryParam: {
              name: '膨化食品',
              image: require('./img/膨化食品.png'),
            },
            naviType: '',
            naviParam: '',
          },
          {
            categoryType: 1,
            categoryParam: {
              name: '饮品类',
              image: require('./img/饮品类.png'),
            },
            naviType: '',
            naviParam: '',
          },
        ],
    })
    this._onChange = this._onChange.bind(this);
		this._submitSearch = this._submitSearch.bind(this);
		this._clearSearchHistory = this._clearSearchHistory.bind(this);
    this._handleSeacrchChange = this._handleSeacrchChange.bind(this);
    this._handleSearchHistoryOnpress = this._handleSearchHistoryOnpress.bind(this);
    this._handleSearchInputRef = this._handleSearchInputRef.bind(this);
	}
	componentDidMount() {
    SboxCategoryStore.addChangeListener(this._onChange);
    SboxCategoryAction.getSearchKeyword();
	}
  componentWillUnmount() {
    SboxCategoryStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    const state = Object.assign({},SboxCategoryStore.getState());
    this.setState(state);
  }
	_submitSearch(){
    const searchKeyword = this.state.searchKeyword;
    if(!searchKeyword) return;
		SboxCategoryAction.addSearchKeyword(searchKeyword);
	}
	_clearSearchHistory(){
    SboxCategoryAction.iniSearchKeyword();
	}
  _handleSearchInputRef(ref){
    this._searchInputRef = ref;
  }
  _handleSeacrchChange(searchKeyword) {
    this.setState({searchKeyword: searchKeyword});
  }
  _handleSearchHistoryOnpress(searchKeyword) {
    this._searchInputRef.focus();
    this.setState({searchKeyword: searchKeyword});
  }
  _renderCategoryView() {
    return(
			<View style={styles.container}>
				<SboxCategoryHeader

          {...{handleSeacrchChange:this._handleSeacrchChange,
               submitSearch:this._submitSearch,
               searchKeyword:this.state.searchKeyword,
               searchInputRef:this._searchInputRef,
               handleSearchInputRef:this._handleSearchInputRef,
          }}
        />
        <SboxCategoryContent
          categoryList={this.state.categoryList}
          searchRecordList={this.state.searchRecordList}
					clearSearchHistory = {this._clearSearchHistory}
          handleSearchHistoryOnpress = {this._handleSearchHistoryOnpress}
        />
      </View>
    )
  }
  render() {
    return(
      <View style={styles.container}>
        {this._renderCategoryView()}
      </View>
    )
  }
}
