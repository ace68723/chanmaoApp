'use strict'
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import Label from '../../../App/Constants/AppLabel';
import { cme_updateLanguage, cme_getLanguage } from '../../../App/Modules/Database';

import Header from '../General/Header';
import LanguageSettingsCell from './LanguageSettingsCell'

const {height, width} = Dimensions.get('window');

const languages = [
  {
    'id': 0,
    'language': '中文简体',
    'realm_value': 'chinese_simple'
  }, {
    'id': 1,
    'language': 'English',
    'realm_value': 'english'
  }, {
    'id': 2,
    'language': 'Français',
    'realm_value': 'french'
  }
];

export default class LanguageSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: languages[0].id,
    }

    this._goBack = this._goBack.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.confirmLanguage = this.confirmLanguage.bind(this);
    this.renderLanguageCells = this.renderLanguageCells.bind(this);
  }

  componentDidMount() {
    const selectedLanguage = cme_getLanguage();
    for (let _language of languages) {
      if (_language.realm_value == selectedLanguage) {
        this.setState({ selected: _language.id });
      }
    }
  }

  _goBack() {
    this.props.navigator.pop();
  }

  confirmLanguage() {
    cme_updateLanguage(languages[this.state.selected].realm_value);
    // alert(cme_getLanguage());
    // this.props.navigator.pop();
    this.props.navigator.resetTo({
			screen: 'cmHome',
			animated: true,
			animationType: 'fade',
			navigatorStyle: {navBarHidden: true},
			passProps:{goToCmEat: true}
		});
  }

  onSelected(id) {
    this.setState({selected: id});
  }

  renderLanguageCells() {
    let cells = [];
    for (let i of languages) {
      cells.push(
        <LanguageSettingsCell selected={this.state.selected}
                              onSelected={this.onSelected}
                              id={i.id}
                              key={i.realm_value}
                              language={i.language}/>
       )
    }
    return cells;
  }

  render() {
    let title = "选择语言";
    switch(languages[this.state.selected].id) {
      case 0:
        title = "选择语言";
        break;
      case 1:
        title = "Languages";
        break;
      case 2:
        title = "les langues";
        break;
    }
    return (<View style={styles.container}>
      <Header title={title} goBack={this._goBack}/>
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
