'use strict'
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class LanguageSettingsCell extends Component {
  constructor(props) {
    super(props);
    this.onSelected = this.onSelected.bind(this);
  }

  onSelected() {
    this.props.onSelected(this.props.id)
  }

  render() {
    if (this.props.id == this.props.selected) {
      return (<TouchableOpacity onPress={this.onSelected} style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image style={{
            height: 15,
            width: 15,
            marginRight: 10
          }} source={require('./Image/selected-icon.png')}/>
        <Text style={{
            color: 'grey',
            fontSize: 21,
            fontWeight: '400'
          }}>{this.props.language}</Text>
      </TouchableOpacity>);
    } else {
      return (<TouchableOpacity onPress={this.onSelected} style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image style={{
            height: 15,
            width: 15,
            marginRight: 10
          }} source={require('./Image/unselected-icon.png')}/>
        <Text style={{
            color: 'grey',
            fontSize: 21,
            fontWeight: '200'
          }}>{this.props.language}</Text>
      </TouchableOpacity>);
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff'
  }
});
