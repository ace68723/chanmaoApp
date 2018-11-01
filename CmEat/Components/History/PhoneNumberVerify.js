import React, {
	Component,
} from 'react';
import {
	Dimensions,
  Image,
	Keyboard,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import HistoryAction from '../../Actions/HistoryAction';
import Label from '../../../App/Constants/AppLabel';

const {height, width} = Dimensions.get('window');

class PhoneNumberVerify extends Component{
      constructor(props) {
          super(props);
          this.state={
            getVerifyCode:false
          }
					this._keyboardWillShow = this._keyboardWillShow.bind(this);
      }
			componentDidMount(){
				this._keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
			}
			componentWillUnmount() {
	      // Event(Keybaord): remove keybaord event
	      this._keyboardWillShowSubscription.remove();
			}


			_keyboardWillShow(e) {
					// keyboard(e.endCoordinates.height): get keyboard height
					const keyboardHeight = e.endCoordinates.height;

					if(this.codeInput){
						const currentPosition = this.props.getCurrentPosition();
						this.codeInput.measure((ox, oy, width, objectHeight, px, py) =>{
							if(py < height-keyboardHeight){
								const position  = {x: 0, y:currentPosition-(height-keyboardHeight-py)+100, animated: true}
								this.props.scrollRef.scrollTo(position)
							}else {
								const position  = {x: 0, y:currentPosition+(py-(height-keyboardHeight))+100, animated: true}
								this.props.scrollRef.scrollTo(position)
							}

						})
					}
			}

      getVerifyCode(){
        this.setState({
          getVerifyCode:true
        })
        HistoryAction.getVerifyCode(this.props.orderId)
      }
      verifyPhone(){
				Keyboard.dismiss();
        HistoryAction.verifyPhone(this.state.code,this.props.orderId)
      }

      render(){
        let _VerifyPhone = () => {
          if(!this.state.getVerifyCode){
            return(

                <TouchableOpacity
										activeOpacity={0.6}
                    style={styles.button}
                    onPress={() => {this.getVerifyCode()}}>
                       <Text allowFontScaling={false}
											 			style={ styles.buttonText }>{Label.getCMLabel('VERTIFICATION_CODE')}: {this.props.phoneNumber}  </Text>
                </TouchableOpacity>

            )
          }else{
            return(
              <View style={{margin:10,height: 100,}}
										ref={(ref)=>this.codeInput = ref}>
                <TextInput
                    style={{height: 40,
														borderColor: '#d9d9d9',
														fontFamily:'NotoSansCJKsc-Regular',
														fontSize:13,
														borderWidth: 1,
														paddingLeft:10,
														marginLeft:15,
														marginRight:15,}}
                    onChangeText={(code) => this.setState({code})}
                    value={this.state.text}
                    placeholderTextColor={'#ff8b00'}
                    placeholder={Label.getCMLabel('ENTER_VERTIFICATION_CODE')}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                  />
                <TouchableOpacity
										activeOpacity={0.6}
                    style={[styles.button,{marginTop:10}]}
                    onPress={() => {this.verifyPhone()}}>
                       <Text allowFontScaling={false}
											 			style={ styles.buttonText }>{Label.getCMLabel('CONFIRM')} </Text>
                </TouchableOpacity>
              </View>
            )
          }
        }
          return (
            <View style={styles.mainContainer}>
							{_VerifyPhone()}
            </View>
          )
        }


}
// <View style={styles.messageBox}>
// 		<Text allowFontScaling={false}
// 					style={styles.message}>请验证手机号: {this.props.phoneNumber}</Text>
// </View>

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    firstButtonBox:{
      //
      // flexDirection: 'row',
      // margin:10,
			// marginLeft:40,
			// marginRight:40,

    },
    buttonText: {
			padding:8,
      fontSize: 17,
      color: '#fff',
			fontFamily:'NotoSansCJKsc-Regular',
    },
    button: {
      // flex:1,
      backgroundColor: '#ff8b00',
      borderColor: '#ff8b00',
      borderWidth: 1,
			marginBottom:20,
			marginLeft:15,
			marginRight:15,
      alignItems:'center',
      justifyContent:'center',
    },
    messageBox:{
      flexDirection: 'row',
      justifyContent:'center',
    },
    message:{
      textAlign:"center",
      fontSize:17,
      color:'#000000',
			fontFamily:'NotoSansCJKsc-Regular',
    },

});
module.exports = PhoneNumberVerify;
