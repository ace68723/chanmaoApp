import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
  PixelRatio
} from 'react-native';

import BaseDialog from '../BaseDialog';

import PickerView from './PickerView';

export default class Picker extends BaseDialog {

  static defaultProps = {
    removeSubviews: false,
    confirmText: '确定',
    confirmTextSize: 14,
    confirmTextColor: '#333333',
    cancelText: '取消',
    cancelTextSize: 14,
    cancelTextColor: '#333333',
    itemTextColor: 0x333333ff,
    itemSelectedColor: 0x1097D5ff,
    itemHeight: 40,
    onPickerCancel: null,
    onPickerConfirm: null,
  }

  constructor(props) {
    super(props);
    // init picker selected
    if (!this.props.linked){
      this.state = {
        selectedValue: this.props.items[0],
        linked: false,
      }
    }
    else{
      // This this linked datasource
      let primaryOptions = [];
      let secondaryOptions = this.props.items[0][this.props.secondaryKey];
      for (i of this.props.items){
        primaryOptions.push(i[this.props.primaryKey])
      }
      this.state = {
        displayedPrimaryOptions: primaryOptions,
        displayedSecondaryOptions: secondaryOptions,
        selectedPrimaryOptions: primaryOptions[0],
        selectedSecondaryOptions: secondaryOptions[0],
        linked: true,
      }
    }

  }

  _getContentPosition() {
    return {justifyContent: 'flex-end', alignItems: 'center'}
  }

  forceReloadDataSource() {
    if (!this.props.linked){
      this.setState({
        selectedValue: this.props.items[0],
        linked: false,
      })
    }
    else{
      // This this linked datasource
      let primaryOptions = [];
      let secondaryOptions = this.props.items[0][this.props.secondaryKey];
      for (i of this.props.items){
        primaryOptions.push(i[this.props.primaryKey])
      }
      this.setState({
        displayedPrimaryOptions: primaryOptions,
        displayedSecondaryOptions: secondaryOptions,
        selectedPrimaryOptions: primaryOptions[0],
        selectedSecondaryOptions: secondaryOptions[0],
        linked: true,
      })
    }
  }

  updateSecondaryOptions(newValue){
    for (i of this.props.items){
      if (i[this.props.primaryKey] == newValue){
        this.setState({
          displayedSecondaryOptions: i[this.props.secondaryKey],
          selectedPrimaryOptions: newValue,
        })
        return;
      }
    }
  }

  renderLinkedPicker() {
      return <View style={{ width: this.mScreenWidth, flexDirection: 'row' }}>
          <PickerView
              list={this.state.displayedPrimaryOptions}
              onPickerSelected={(toValue) => {
                  this.updateSecondaryOptions(toValue);
              }}
              selectedIndex={0}
              fontSize={this.getSize(14)}
              itemWidth={this.mScreenWidth / 2}
              itemHeight={this.getSize(40)} />
          <PickerView
              list={this.state.displayedSecondaryOptions}
              onPickerSelected={(toValue) => {
                  this.setState({
                    selectedSecondaryOptions: toValue,
                  })
              }}
              selectedIndex={0}
              fontSize={this.getSize(14)}
              itemWidth={this.mScreenWidth / 2}
              itemHeight={this.getSize(40)} />
      </View>
  }

  renderPicker(items) {
    if (this.props.linked = true){
      return this.renderLinkedPicker();
    }
    return (
      <PickerView
        list={items}
        onPickerSelected={(toValue) => {
          this.setState({selectedValue: toValue});
        }}
        fontSize={this.getSize(14)}
        itemWidth={this.mScreenWidth}
        itemHeight={this.getSize(40)}
      />
    )
  }

  renderContent() {
    return <View style={{
        height: this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44),
        width: this.mScreenWidth,
        backgroundColor: '#ffffff'
      }}>
      <View style={{
          width: this.mScreenWidth,
          height: this.props.itemHeight * 5 + this.getSize(15),
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0
        }}>
        {this.renderPicker(this.props.items)}
      </View>
      <View style={{
          width: this.mScreenWidth,
          height: this.getSize(44),
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0
        }}>
        <TouchableOpacity onPress={() => {
            this.dismiss(() => {
              this.props.onPickerCancel && this.props.onPickerCancel();
            });
          }} style={{
            width: this.getSize(60),
            height: this.getSize(44),
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{
              fontSize: this.props.cancelTextSize,
              fontWeight: '400',
              color: this.props.cancelTextColor
            }}>{this.props.cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            this.dismiss(() => {
              this.props.onPickerConfirm && this.props.onPickerConfirm(this.state);
            });
          }} style={{
            width: this.getSize(60),
            height: this.getSize(44),
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{
              fontSize: this.props.confirmTextSize,
              fontWeight: '400',
              color: this.props.confirmTextColor
            }}>{this.props.confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>

  }
}
