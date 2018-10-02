/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Label from '../../../App/Constants/AppLabel';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    content: {
        flex: 1 - (212 / 2208),
    },
    image: {
        paddingHorizontal: width * (60 / 1242),
    },
    input: {
        flex: 1,
    },
    info: {
        height: height * (180 / 2209),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DCDCDC',
        alignItems: 'center',
    },
    tips: {
        fontWeight: 'bold',
    },
    horizontalSpace: {
        height: height * (150 / 2209),
    },
    verticalSpace: {
        flex: 1,
    },
    submit: {
        flexDirection: 'row',
    },
    submitButton: {
        flex: 1,
        height: height * (150 / 2209),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff768b',
    },
    submitText: {
        fontSize: 16,
        color: 'white',
    },
});

export default class Content extends Component {
    constructor() {
      super();
      this._onSubmitEditing = this._onSubmitEditing.bind(this);
    }
    _onSubmitEditing(e){
        this.telRef.focus();
    }

    // onKeyPress={this._handleKeyDown}
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.info}>
                    <View style={styles.image}><Image source={require('./img/address.png')}/></View>
                    <Text style={styles.input}
                          allowFontScaling={false}>
                      {this.props.address}
                    </Text>
                </View>
                <View style={styles.info}>
                    <View style={styles.image}><Image source={require('./img/name.png')}/></View>
                    <Text style={styles.tips}
                          allowFontScaling={false}>{Label.getSboxLabel('ADD_NAME')}</Text>
                    <TextInput
                        underlineColorAndroid={"rgba(0,0,0,0)"}
                        value={this.props.name}
                        onChangeText={this.props.onNameChange}
                        placeholder={Label.getSboxLabel('FILL_NAME_IN_ENGLISH')}
                        selectionColor={'#ff7685'}
                        returnKeyType="next"
                        autoCorrect={false}
                        autoFocus={true}
                        style={styles.input}
                        onSubmitEditing={this._onSubmitEditing}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.image}><Image source={require('./img/phoneNum.png')}/></View>
                    <Text style={styles.tips}
                          allowFontScaling={false}>{Label.getSboxLabel('ADD_PHONE')}</Text>
                    <TextInput
                        underlineColorAndroid={"rgba(0,0,0,0)"}
                        ref={(ref)=>{ this.telRef = ref}}
                        value={this.props.phoneNumDisplay}
                        onChangeText={this.props.onPhoneNumChange}
                        maxLength = {13}
                        keyboardType={'phone-pad'}
                        selectionColor={'#ff7685'}
                        placeholder="Phone Number"
                        style={styles.input}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.image}><Image source={require('./img/unitNum.png')}/></View>
                    <Text style={styles.tips}
                          allowFontScaling={false}>{Label.getSboxLabel('ADD_UNIT')}</Text>
                    <TextInput
                        underlineColorAndroid={"rgba(0,0,0,0)"}
                        value={this.props.unitNum}
                        onChangeText={this.props.onUnitNumChange}
                        placeholder="Optional（选填）"
                        selectionColor={'#ff7685'}
                        returnKeyType="send"
                        style={styles.input}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.horizontalSpace} />
                <View style={styles.submit}>
                    <View style={styles.verticalSpace}/>
                    <TouchableOpacity style={styles.submitButton} onPress={this.props.onSubmit}>
                        <Text style={styles.submitText}
                              allowFontScaling={false}>{Label.getSboxLabel('ADD_ADDRESS')}</Text>
                    </TouchableOpacity>
                    <View style={styles.verticalSpace}/>
                </View>
                <Text style={{padding:20,paddingBottom:0}}
                      allowFontScaling={false}>
                  {Label.getSboxLabel('INFO_NOTE1')}
                </Text>
                <Text style={{padding:20}}
                      allowFontScaling={false}>
                    {Label.getSboxLabel('INFO_NOTE2')}
                </Text>
            </View>
        );
    }
}
