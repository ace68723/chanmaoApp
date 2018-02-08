/* @flow */

import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import ImagePreview from './ImagePreview';
import BoxStatus from './BoxStatus';
import SboxHistoryListItems from './SboxHistoryListItems';

export default class BoxView extends Component {
  constructor(props) {
      super(props);
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state={
          selectedPbid:'',
          dataSource:ds.cloneWithRows(this.props.prod),
      }

      // this.dataSource = ds.cloneWithRows(this.props.prod);
      this._renderRow = this._renderRow.bind(this);
      this._onSelected = this._onSelected.bind(this);
  }
  _onSelected(pbid) {
      // let newProd = this.props.prod;
      //
      // newProd.map((prod) => {
      //   if(prod.pbid !== pbid){
      //     prod.focus = false;
      //   } else {
      //     prod.focus = true;
      //   }
      // })
      //
      this.setState({
          selectedPbid: pbid,
      })
      this.props.onSelected(pbid, this.props.boxIndex, this.BoxViewRef);
      // this.dataSource = ds.cloneWithRows(this.props.prod);
  }
  _renderRow() {

      this.Row = [];
      this.items = [];
      for (var i = 0; i < this.props.prod.length; i++) {
        const pbid = this.props.prod[i].pbid;
        const image = this.props.prod[i].image;
        const amount = this.props.prod[i].amount;
        const fullname = this.props.prod[i].fullname;
        const price = this.props.prod[i].price;
        let lv_focus;
        if (this.state.selectedPbid !== this.props.prod[i].pbid){
            lv_focus = false;
        } else {
            lv_focus = true;
        }
        this.Row.push(
          <ImagePreview  key={i} onSelected={this._onSelected}
              {...{ pbid, lv_focus, image}}/>
        )
        this.items.push(
          <SboxHistoryListItems key={'i' + i} onSelected={this._onSelected}
              {...{ pbid, lv_focus, amount, fullname, price }}
          />
        )
      }
  }
  // _renderItems() {
  //   let items = [];
  //
  //   return(
  //     <SboxHistoryListItems onSelected={this._onSelected}
  //         {...{ items: this.props.prod,
  //               boxIndex: this.props.boxIndex,}}
  //     />
  //   )
  // }
  _renderSeparator() {
      const separator = {
          height: 1,
          borderWidth: 1,
          borderColor: '#D5D5D5',
          marginLeft: 10,
          marginRight: 10,
      };
      return (
        <View style={separator}/>
      );
  }
  // <ListView
  //     key={this.state.selectedPbid}
  //     dataSource={this.state.dataSource}
  //     enableEmptySections
  //     horizontal
  //     ref={(ref) => { this.BoxViewRef = ref; }}
  //     renderRow={this._renderRow}
  //     showsHorizontalScrollIndicator={false}
  // />
  render() {
      this._renderRow();
      return (
        <View style={{flex:1}}>
          <ScrollView
              horizontal
              ref={(ref) => { this.BoxViewRef = ref; }}
              showsHorizontalScrollIndicator={false}
          >
            {this.Row}
          </ScrollView>
          <BoxStatus
              {...{ trace: this.props.trace,
                    bbid: this.props.bbid
               }}
          />
          {this._renderSeparator()}
          <View style={{ padding: 10, paddingBottom: 0 }}>
            {this.items}
          </View>

        </View>

      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
