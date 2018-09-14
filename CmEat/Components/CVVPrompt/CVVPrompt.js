import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './Styles.js';

const CVVPrompt = ({
  defaultValue,
  onSubmit,
  submitButtonText,
  onCancel,
  cancelButtonText,
  errorText,
  isVisible,
  onBackButtonPress,
  onChangeText,
  primaryColor,
  promptBoxStyle,
  headingStyle,
  inputStyle,
  btnStyle,
  btnTextStyle,
  promptAnimation,
  ...inputProps
}) => (

  <Modal
    animationType={promptAnimation}
    hardwareAccelerated
    transparent
    visible={isVisible}
    onRequestClose={onBackButtonPress}
  >
    <View style={styles.container}>
      <View style={[styles.promptBox, promptBoxStyle]}>
        <Text style={[styles.heading, headingStyle]}
              ellipsizeMode="tail"
              numberOfLines={1}
              allowFontScaling={false}>
          请输入您的CVV
        </Text>
        <View style={{flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignSelf: 'center',
                      width: '90%',
                      marginBottom: 8,
                      marginTop: 30,}}>
          <Image source={require('./Image/union_pay_icon.png')}
                style={{alignSelf: 'center',
                        height: 40,
                        width: 64,
                        marginRight: 20,}}/>

          <Text style={[styles.subHeading, headingStyle]}
                ellipsizeMode="tail"
                numberOfLines={1}
                allowFontScaling={false}>**** **** **** 1232</Text>
        </View>

        <TextInput
          maxLength={3}
          keyboardType='number-pad'
          placeholder="CVV"
          defaultValue={defaultValue}
          underlineColorAndroid={primaryColor}
          style={[{ borderBottomColor: primaryColor }, styles.promptInput, inputStyle]}
          onChangeText={text => onChangeText(text)}
          {...inputProps}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}
                allowFontScaling={false}>{errorText}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.promptBtn, btnStyle]}
            onPress={onCancel}
          >
            <Text
              style={[{ color: primaryColor }, styles.btnTxt, btnTextStyle]}
              allowFontScaling={false}
            >
              {cancelButtonText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.promptBtn, btnStyle]}
            onPress={onSubmit}
          >
            <Text style={[{ color: primaryColor }, styles.btnTxt, btnTextStyle]}
                  allowFontScaling={false}>
              {submitButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

CVVPrompt.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  submitButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  errorText: PropTypes.string,
  onBackButtonPress: PropTypes.func,
  primaryColor: PropTypes.string,
  promptBoxStyle: PropTypes.object,
  headingStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  btnStyle: PropTypes.object,
  btnTextStyle: PropTypes.object,
  promptAnimation: PropTypes.string,
};

CVVPrompt.defaultProps = {
  submitButtonText: '确认',
  cancelButtonText: '取消',
  defaultValue: '',
  errorText: '',
  primaryColor: '#ff8b00',
  promptAnimation: 'fade',
  promptBoxStyle: {},
  headingStyle: {},
  inputStyle: {},
  btnStyle: {},
  btnTextStyle: {},
  onBackButtonPress: null,
};

export default CVVPrompt;
