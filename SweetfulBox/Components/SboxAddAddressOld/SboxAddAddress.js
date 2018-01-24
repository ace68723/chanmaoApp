
/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Header from './header';
import Content from './content';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class SboxAddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            name: '',
            phoneNumDisplay: '',
            unitNum: '',
            addressInfo: [],
        };
        this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handlePhoneNumChange(value) {
        let newValue = value.replace(/[()-]/g, '');

        if (value.indexOf('-') === -1 && this.state.phoneNumDisplay.indexOf('-') > -1 && newValue.length >= 7) {
            newValue = newValue.slice(0, 5) + newValue.slice(6, 10);
        } else if (value.indexOf('(') > -1 && value.indexOf(')') === -1 && newValue.length >= 4) {
            newValue = newValue.slice(0, 2) + newValue.slice(3, 10);
        } else if (value.indexOf('(') === -1 && value.indexOf(')') > -1 && newValue.length >= 4) {
            newValue = newValue.slice(1, 10);
        }

        if (newValue.length >= 4 && newValue.length <= 6) {
            newValue = newValue.replace(/(\d{3})(\d{1,3})/, '($1)$2');
        } else if (newValue.length >= 7 && newValue.length <= 10) {
            newValue = newValue.replace(/(\d{3})(\d{3})(\d{1,4})/, '($1)$2-$3');
        }

        this.setState({ phoneNumDisplay: newValue });
    }

    handleSubmit() {
        if (!this.state.address || !this.state.name || !this.state.phoneNum) {
            Alert.alert('错误', '请填写所有信息', { text: 'OK' });
            return;
        }
        const newAddressInfo = [
            ...this.state.addressInfo,
            {
                key: Date.now(),
                address: this.state.address,
                name: this.state.name,
                phoneNumDisplay: this.state.phoneNumDisplay,
                unitNum: this.state.unitNum,
            }
        ];
        this.setState({
            addressInfo: newAddressInfo,
            address: '',
            name: '',
            phoneNumDisplay: '',
            unitNum: '',
        })
        Alert.alert('成功', '信息已填交', { text: 'OK' });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <Content
                    address={this.state.address}
                    onAddressChange={(address) => this.setState({ address: address })}
                    name={this.state.name}
                    onNameChange={(name) => this.setState({ name: name })}
                    phoneNumDisplay={this.state.phoneNumDisplay}
                    onPhoneNumChange={this.handlePhoneNumChange}
                    unitNum={this.state.unitNum}
                    onUnitNumChange={(unitNum) => this.setState({ unitNum: unitNum })}
                    onSubmit={this.handleSubmit}
                />
            </View>
        );
    }
}
