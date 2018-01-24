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
        backgroundColor: '#ff5050',
    },
    submitText: {
        fontSize: 16,
        color: 'white',
    },
});

export default class Content extends Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.info}>
                    <View style={styles.image}><Image source={require('./img/address.png')}/></View>
                    <TextInput
                        value={this.props.address}
                        onChangeText={this.props.onAddressChange}
                        placeholder="Address"
                        returnKeyType="done"
                        style={styles.input}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.image}><Image source={require('./img/name.png')}/></View>
                    <Text style={styles.tips}>联系人: </Text>
                    <TextInput
                        value={this.props.name}
                        onChangeText={this.props.onNameChange}
                        placeholder="Name"
                        returnKeyType="done"
                        style={styles.input}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.image}><Image source={require('./img/phoneNum.png')}/></View>
                    <Text style={styles.tips}>电话: +1 </Text>
                    <TextInput
                        value={this.props.phoneNumDisplay}
                        onChangeText={this.props.onPhoneNumChange}
                        maxLength = {13}
                        keyboardType={'phone-pad'}
                        placeholder="Phone Number"
                        returnKeyType="done"
                        style={styles.input}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.image}><Image source={require('./img/unitNum.png')}/></View>
                    <Text style={styles.tips}>Unit No.: </Text>
                    <TextInput
                        value={this.props.unitNum}
                        onChangeText={this.props.onUnitNumChange}
                        placeholder="Optional（选填）"
                        returnKeyType="done"
                        style={styles.input}
                    />
                </View>
                <View style={styles.horizontalSpace} />
                <View style={styles.submit}>
                    <View style={styles.verticalSpace}/>
                    <TouchableOpacity style={styles.submitButton} onPress={this.props.onSubmit}>
                        <Text style={styles.submitText}>添加地址</Text>
                    </TouchableOpacity>
                    <View style={styles.verticalSpace}/>
                </View>
            </View>
        );
    }
}
