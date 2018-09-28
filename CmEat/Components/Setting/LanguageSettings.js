'use strict'
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import CMLabel from '../../Constants/AppLabel';

import Header from '../General/Header';
import LanguageSettingsCell from './LanguageSettingsCell'

const {height, width} = Dimensions.get('window');

const languages = [
  {
    'id': 0,
    'language': '中文简体'
  }, {
    'id': 1,
    'language': 'English'
  }, {
    'id': 2,
    'language': 'Français'
  }
];

export default class LanguageSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: languages[0].id
    }

    this._goBack = this._goBack.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.confirmLanguage = this.confirmLanguage.bind(this);
    this.renderLanguageCells = this.renderLanguageCells.bind(this);
  }

  _goBack() {
    this.props.navigator.pop();
  }

  confirmLanguage() {
    const selectedLanguage = this.state.selected;
  }

  onSelected(id) {
    this.setState({selected: id});
  }

  renderLanguageCells() {
    let cells = [];
    for (let i of languages) {
      cells.push(<LanguageSettingsCell selected={this.state.selected} onSelected={this.onSelected} id={i.id} language={i.language}/>)
    }
    return cells;
  }

  render() {
    return (<View style={styles.container}>
      <Header title={CMLabel.getLabel('LANGUAGE_SETTING')} goBack={this._goBack}/>
      <View style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20
        }}>
        <Image style={{
            marginTop: 64,
            height: width * 0.6 * 0.715,
            width: width * 0.6,
            alignItems: 'center',
            alignSelf: 'center'
          }} source={require('./Image/language-logo.png')}></Image>
        <View style={{
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 64,
            marginBottom: 64,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
          {this.renderLanguageCells()}
          <TouchableOpacity onPress={this.confirmLanguage} style={{
              flex: 1,
              marginTop: 64
            }}>
            <Image style={{
                width: width * 0.65,
                height: width * 0.65 * 0.197
              }} source={require('./Image/confirm-button.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff'
  }
});
