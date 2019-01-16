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
                          allowFontScaling={false}>联系人: </Text>
                    <TextInput
                        underlineColorAndroid={"rgba(0,0,0,0)"}
                        value={this.props.name}
                        onChangeText={this.props.onNameChange}
                        placeholder="请以英文拼写您的姓名"
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
                          allowFontScaling={false}>电话: +1 </Text>
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
                          allowFontScaling={false}>Unit No.: </Text>
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
                              allowFontScaling={false}>添加地址</Text>
                    </TouchableOpacity>
                    <View style={styles.verticalSpace}/>
                </View>
                <Text style={{padding:20,paddingBottom:0}}
                      allowFontScaling={false}>
                  注：1. 请以英文形式拼写您的姓名，所留姓名和电话请务必与您所在的Condo
                  前台登记的信息一致，否则包裹会被前台拒收。
                </Text>
                <Text style={{padding:20}}
                      allowFontScaling={false}>
                    2. 甜满箱包裹会配送到您的Condo前台。如果您所在的Condo没有前台，
                    我们的配送员会在到达后电话联系您取包裹。请您保持电话畅通，谢谢。
                </Text>
            </View>
        );
    }
}
