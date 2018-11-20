/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Header from './header';
import Content from './content';
import SboxHeader from '../../../../App/Components/General/SboxHeader';

import UserAction from '../../Actions/UserAction';
import UserStore from '../../Stores/UserStore';

// import Label from '../../../App/Constants/AppLabel';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#ffffff",
    },
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.addrInfo.addr,
            name: '',
            phoneNumDisplay: '',
            unitNum: '',
            addressInfo: [],
        };
        this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._goBack = this._goBack.bind(this);
        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
      UserStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
      UserStore.removeChangeListener(this._onChange);
    }
    _onChange() {
      // const addressObject = this.props.addressObject;
      // const name  = this.state.name;
      // const phoneNumber = this.state.phoneNum;
      // const unitNumber = this.state.unitNum;
      // const userInfo = {addressObject,name,phoneNumber,unitNumber}
      // this.props.setUserInfo(userInfo);

        this.props.navigator.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
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
        const phoneNum = newValue.replace(/[()-]/g, '');

        this.setState({ phoneNumDisplay: newValue,phoneNum:phoneNum });
    }

    handleSubmit() {
        if ( !this.state.name || !this.state.phoneNum ) {
            Alert.alert('错误', '信息不完整', { text: 'OK' });
            return;
        }
        if ( this.state.phoneNum.length != 10) {
            Alert.alert('错误','电话号码不合法', { text: 'OK' });
            return;
        }
        const addressObject = this.props.addrInfo;
        const name  = this.state.name;
        const phoneNumber = this.state.phoneNum;
        const unitNumber = this.state.unitNum;
        const userInfo = {addressObject,name,phoneNumber,unitNumber}
        UserAction.putUserAddr(userInfo);

          this.props.navigator.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
          });
    }
    _goBack(){
      this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <SboxHeader title='添加地址'
                        goBack={this._goBack}
                        leftButtonText={'<'}/>
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
