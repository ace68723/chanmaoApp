'use strict'

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  TextInput
} from 'react-native';

import Label from '../../../App/Constants/AppLabel';

const {height, width} = Dimensions.get('window');

const propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,

  title: PropTypes.string.isRequired,
  titleTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

  subTitle: PropTypes.string,

  detailText: PropTypes.string,
  detailTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

  confirmText: PropTypes.string,
  confirmTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  confirmButtonStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

  cancelText: PropTypes.string,
  cancelTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  cancelButtonStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

  backgroundColor: PropTypes.string,

  containerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

  springFromBottom: PropTypes.bool,
  springFromTop: PropTypes.bool,

  type: PropTypes.string,

  textInputStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

  zIndex: PropTypes.number, // try and avoid this.  only needed if you used zIndex elsewhere

};

export default class Popup extends Component {
  static defaultProps = {
    type: "alert" //alert | prompt
  };

  constructor(props) {
    super(props);
    this.dismiss = this.dismiss.bind(this);

    this.state = {
      promptValue: "",
      isShow: true,
      backgroundOpacity: new Animated.Value(0),
      xOffset: new Animated.Value(0),
      yOffset: new Animated.Value(0),
    };
  };

  componentWillMount() {
    let xOffset = new Animated.Value(0);
    let yOffset = new Animated.Value(0);

    if (this.props.springFromBottom) {
      yOffset.setValue(1)
    }
    if (this.props.springFromTop) {
      yOffset.setValue(-1)
    }

    this.setState({xOffset: xOffset, yOffset: yOffset, })
  };

  componentDidMount() {
    Animated.parallel([
      Animated.spring(this.state.yOffset, {toValue: 0}),
      Animated.spring(this.state.backgroundOpacity, {toValue: 1})
    ]).start()
  };

  dismiss(cb) {
    let toValue = 0;
    const {promptValue} = this.state;
    if (this.props.springFromBottom) {
      toValue = 1;
    }
    if (this.props.springFromTop) {
      toValue = -1;
    }
    // Animated.timing(this.state.yOffset, {
    //   toValue: toValue,
    //   duration: 200,
    //   easing: Easing.linear
    // }).start(() => cb(promptValue));

    Animated.parallel([
      Animated.timing(this.state.yOffset, {
        toValue: toValue,
        duration: 200,
        easing: Easing.linear
      }),
      Animated.timing(this.state.backgroundOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }),
    ]).start(() => cb(promptValue));

    setTimeout( () => {
       this.setState({isShow: false});
       this.props.onDismiss();
    }, 200);

  };

  _renderIcon() {
    if (this.props.icon) {
      return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
            backgroundColor: 'white'}}>
          <Image source={this.props.icon} style={{
              width: 43,
              height: 27
          }}/>
        </View>
      )
    }
  };

  _renderCancelButton() {
    if (this.props.cancelText) {
      return (
        <View style={{
              flex: 1
            }}>
            <TouchableOpacity onPress={() => this.dismiss(this.props.onCancel)}>
              <View style={[
                  {
                    height: 42.5,
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    // marginLeft: 0,
                    // marginBottom: 0,
                    // borderRightWidth: 0,
                    // borderColor: '#E8E8EA',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: this.props.confirmText ? 0 : 8,
                  },
                  this.props.cancelButtonStyle
                ]}>
                <Text style={[
                    {
                      color: '#666',
                      fontSize: 14,
                      fontWeight: '900',
                      lineHeight: 16,
                      fontFamily: 'NotoSansCJKsc-Regular',
                    },
                    this.props.cancelTextStyle
                  ]}
                      allowFontScaling={false}>
                  {
                    (this.props.cancelText)
                      ? this.props.cancelText
                      : 'Cancel'
                  }
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      )
    }
  };

  _renderConfirmButton() {
    if (this.props.confirmText) {
      return (
        <View style={{
              flex: 1,
            }}>
            <TouchableOpacity onPress={() => this.dismiss(this.props.onConfirm)}>
              <View style={[
                  {
                    height: 42.5,
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    // marginRight: 0,
                    // marginBottom: 0,
                    // borderColor: '#E8E8EA',
                    borderBottomRightRadius: 8,
                    borderBottomLeftRadius: this.props.cancelText ? 0 : 8,
                  },
                  this.props.confirmButtonStyle
                ]}>
                <Text style={[
                    {
                      color: '#666',
                      fontSize: 14,
                      fontWeight: '900',
                      lineHeight: 16,
                      fontFamily: 'NotoSansCJKsc-Regular',
                    },
                    this.props.confirmTextStyle
                  ]}
                      allowFontScaling={false}>
                  {
                    (this.props.confirmText)
                      ? this.props.confirmText
                      : 'Ok'
                  }
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      )
    }
  };

  renderText() {
    if (this.props.detailText) {
      return (
        <View style={{backgroundColor: 'white'}}>
          <Text style={[
                  {
                    lineHeight: 16,
                    textAlign: 'center',
                    color: '#757575',
                    fontWeight: '700',
                    fontSize: 14,
                    marginHorizontal: 30,
                    marginBottom: 20,
                    fontFamily: 'NotoSansCJKsc-Regular',
                  },
                  this.props.detailTextStyle
                  ]}
                allowFontScaling={false}>
            {this.props.detailText}
          </Text>
        </View>
      )
    }
  };

  _renderTextInput() {
    if (this.props.type === "prompt") {
      retrun (
        <View style={{backgroundColor: 'white'}}>
          <TextInput style={[{alignSelf: 'stretch',
                              fontFamily: 'NotoSansCJKsc-Regular',
                              lineHeight: 16,},
                             this.props.textInputStyle]}
                     value={this.state.promptValue}
                     onChangeText={promptValue => this.setState({promptValue})}
                     onSubmitEditing={() => this.dismiss(this.props.onConfirm)}
                     autoFocus="autoFocus"/>
        </View>
      )
    }
  }

  renderSubTitle() {
    if (this.props.subTitle) {
      return (
        <View style={{backgroundColor: 'white'}}>
          <Text style={[{
                  fontSize: 14,
                  lineHeight: 16,
                  marginHorizontal: 20,
                  paddingBottom: 10,
                  fontWeight: '700',
                  textAlign: 'center',
                  color: '#F58330',
                  fontFamily: 'NotoSansCJKsc-Regular',
                }
              ]}
              allowFontScaling={false}>
            {this.props.subTitle}
          </Text>
        </View>
      )
    }
  };
  
  // _renderPriceDetail() {
  //   if (this.props.fees) {
  //     const _discount = () => {
  //       const _discount = [];
  //       if (this.props.fees.total_off > 0) {
  //         _discount.push(
  //           <View key={"discount_wrapper"}
  //                 style={styles.priceWrapper}>
  //             <Text key={"discount_title"}
  //                   style={{fontSize: 15,
  //                           color: "#40a2e7",
  //                           fontFamily: 'NotoSansCJKsc-Regular'}}
  //                   allowFontScaling={false}>
  //               折扣:
  //             </Text>
  //             <Text key={"discount"}
  //                   style={{fontSize: 15,
  //                           color: "#40a2e7",
  //                           fontFamily: 'NotoSansCJKsc-Regular'}}
  //                   allowFontScaling={false}>
  //               -${this.props.fees.total_off}
  //             </Text>
  //           </View>
  //         )
  //       }
  //       return _discount;
  //     };
  //     const _chargeTotal = () => {
  //       const _chargeTotal = [];
  //       _chargeTotal.push(
  //         <Text key={"charge_total"}
  //               style={{fontSize: 19,
  //                       color: "#666666",
  //                       fontWeight: "800",
  //                       fontFamily: 'NotoSansCJKsc-Regular'}}
  //               allowFontScaling={false}>
  //           ${this.props.fees.charge_total}
  //         </Text>
  //       );
  //       if (this.props.fees.total_off > 0) {
  //         _chargeTotal.push(
  //           <Text key={"ori_charge_total"}
  //                 style={{fontSize: 19,
  //                         color: "#666666",
  //                         fontWeight: "800",
  //                         fontFamily: 'NotoSansCJKsc-Regular',
  //                         textDecorationLine: 'line-through',
  // 												marginLeft: 6}}
  //                 allowFontScaling={false}>
  //             ${this.props.fees.total}
  //           </Text>
  //         );
  //       }
  //       return _chargeTotal;
  //     }
  //     return (
  //       <View style={{backgroundColor: "white"}}>
  //         <View style={styles.priceWrapper}>
  //           <Text key={"pretax_title"}
  //                 style={{fontSize: 15,
  //                         color: "#9b9b9b",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             税前价格:
  //           </Text>
  //           <Text key={"pretax"}
  //                 style={{fontSize: 15,
  //                         color: "#9b9b9b",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             ${this.props.fees.ori_pretax}
  //           </Text>
  //         </View>
  //         <View style={styles.priceWrapper}>
  //           <Text key={"dlexp_title"}
  //                 style={{fontSize: 15,
  //                         color: "#9b9b9b",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             运费:
  //           </Text>
  //           <Text key={"dlexp"}
  //                 style={{fontSize: 15,
  //                         color: "#9b9b9b",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             ${this.props.fees.dlexp}
  //           </Text>
  //         </View>
  //         <View style={styles.priceWrapper}>
  //           <Text key={"tax_title"}
  //                 style={{fontSize: 15,
  //                         color: "#9b9b9b",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             税:
  //           </Text>
  //           <Text key={"tax"}
  //                 style={{fontSize: 15,
  //                         color: "#9b9b9b",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             ${this.props.fees.ori_tax}
  //           </Text>
  //         </View>
  //         <View style={styles.priceWrapper}>
  //           <Text key={"service_fee_title"}
  //                 style={{fontSize: 15,
  //                         color: "#9b9b9b",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             服务费:
  //           </Text>
  //           <Text key={"service_fee"}
  //                 style={{fontSize: 15,
  //                         color: "#9b9b9b",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             ${this.props.fees.ori_service_fee}
  //           </Text>
  //         </View>
  //         {_discount()}
  //         <View style={styles.seperateLine}>
  //         </View>
  //         <View style={[styles.priceWrapper,
  //                       {marginTop: 15,
  //                        marginBottom: 15}]}>
  //           <Text style={{fontSize: 19,
  //                         color: "#666666",
  //                         fontWeight: "800",
  //                         fontFamily: 'NotoSansCJKsc-Regular'}}
  //                 allowFontScaling={false}>
  //             总计:
  //           </Text>
  //           <View style={{flexDirection: 'row'}}>
  //             {_chargeTotal()}
  //           </View>
  //         </View>
  //       </View>
  //     )
  //   }
  // }

  render() {
    if (!this.state.isShow){
      return <View></View>
    }
    return (
      <Animated.View style={{
        zIndex: this.props.zIndex || 999,
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: width,
        backgroundColor: this.props.backgroundColor || 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: this.state.backgroundOpacity
      }}>
      <Animated.View style={[
          {
            // backgroundColor: 'white',
            borderRadius: 8,
            width: width * 0.8,
            // height: width * 0.7,
            flexDirection: 'column',
            // paddingTop: 20,
            // overflow: 'hidden',
            justifyContent: 'space-between',
          },
          this.props.containerStyle, {
            transform: [
              {
                translateY: this.state.yOffset.interpolate({
                  inputRange: [
                    -1, 0, 1
                  ],
                  outputRange: [-500, 0, 500]
                })
              }
            ]
          }
        ]}>
        <View style={{backgroundColor: 'white',
                      height: 25,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8}}>
        </View>
        {this._renderIcon()}
        <View style={{backgroundColor: 'white'}}>
          <Text style={[
              {
                fontSize: 18,
                fontWeight: '900',
                textAlign: 'center',
                color: 'black',
                marginBottom: 10,
                lineHeight: 23,
                height: 25,
                fontFamily: 'NotoSansCJKsc-Regular',
              },
              this.props.titleTextStyle
            ]}
                allowFontScaling={false}>
            {this.props.title ? this.props.title : Label.getCMLabel('REMINDING')}
          </Text>
        </View>

        {this.renderSubTitle()}

        {this.renderText()}
        {this._renderTextInput()}

        <View style={{flexDirection: 'row',
                      backgroundColor: 'white',
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8}}>
          {this._renderCancelButton()}
          {this._renderConfirmButton()}
        </View>

      </Animated.View>
    </Animated.View>)
  };

};

const styles = StyleSheet.create({
  priceWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 50
  },
  seperateLine: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		borderColor:"#ccd3db",
		borderBottomWidth: StyleSheet.hairlineWidth
	}
});

Popup.propTypes = propTypes;
