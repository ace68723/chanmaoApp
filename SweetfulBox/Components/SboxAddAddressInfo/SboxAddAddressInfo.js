/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Header from './header';
import Content from './content';
import SboxHeader from '../../../App/Components/General/SboxHeader';

import SboxUserAction from '../../Actions/SboxUserAction';
import SboxUserStore from '../../Stores/SboxUserStore';

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
      SboxUserStore.addChangeListener(this._onChange);
//       this.props.navigator.showLightBox({
//          screen: "SboxHomeAlert", // unique ID registered with Navigation.registerScreen
//          passProps: {
//            message:`注：1. 请以英文形式拼写您的姓名，所留姓名和电话请务必与您所在的Condo前台登记的信息一致，否则包裹会被前台拒收。
//
// 2. 甜满箱包裹会配送到您的Condo前台。如果您所在的Condo没有前台，我们的配送员会在到达后电话联系您取包裹。请您保持电话畅通，谢谢。`}, // simple serializable object that will pass as props to the lightbox (optional)
//          style: {
//           //  backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
//           //  backgroundColor: "#ff000080" // tint color for the background, you can specify alpha here (optional)
//          },
//          adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
//         });
    }
    componentWillUnmount() {
      SboxUserStore.removeChangeListener(this._onChange);
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
            Alert.alert('错误', '请填写所有信息', { text: 'OK' });
            return;
        }
        if ( this.state.phoneNum.length != 10) {
            Alert.alert('错误', '手机号码格式错误', { text: 'OK' });
            return;
        }
        const addressObject = this.props.addrInfo;
        const name  = this.state.name;
        const phoneNumber = this.state.phoneNum;
        const unitNumber = this.state.unitNum;
        const userInfo = {addressObject,name,phoneNumber,unitNumber}
        SboxUserAction.putUserAddr(userInfo);
    }
    _goBack(){
      this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <SboxHeader title={"添加地址"}
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
