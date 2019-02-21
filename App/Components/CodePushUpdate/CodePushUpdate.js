import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
import CodePush from "react-native-code-push";
import React, { Component } from 'react';
const { height ,width } = Dimensions.get('window');
const sizeScale = width / 375;
export default class CodePushUpdate extends Component {
    constructor(props){
        super(props)
        this.state = {
          isUpdating:false,
          updatePercentage:0,
          needUpdate: false
        }
      }
    componentWillMount() {
		CodePush.disallowRestart();//页面加载的禁止重启，在加载完了可以允许重启
	}
    componentDidMount(){
        // CodePush.notifyAppReady();
        CodePush.allowRestart() //允许重启，否则热更新不会生效
        CodePush.sync({
            checkFrequency: CodePush.CheckFrequency.ON_APP_START,
            installMode: CodePush.InstallMode.ON_NEXT_RESTART
          },
            (status)=>{
              switch(status) {
                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                    console.log("Checking for updates.");
                    break;
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    console.log("Downloading package.");
                    this.setState({
                      isUpdating:true,
                      needUpdate:true,
                    })
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    console.log("Installing update.");
                    break;
                case CodePush.SyncStatus.UP_TO_DATE:
                    console.log("Up-to-date.")
                    // this.props.codePushUpdateCheck(false)
                    this.props.navigator.popToRoot({ animationType: 'fade'});
                    this.setState({
                      isUpdating:false,
                      updatePercentage:100,
                      needUpdate: false
                    })//true 为需要更新， false 为不需要更新
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                    console.log("Update installed.");
                    this.props.navigator.popToRoot({ animationType: 'fade'});
                    this.setState({
                      isUpdating:false,
                      updatePercentage:100
                    }) //true 为需要更新， false 为不需要更新
                    break;
            }

            },(progress)=>{
              console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
              this.setState({updatePercentage: parseInt(progress.receivedBytes/progress.totalBytes*100)})
            }
          );

    }

    render(){
        const loadingBarLength = parseInt(height - 320 * sizeScale);
        const rocketHeight = parseInt(100 * sizeScale);
        if(this.state.needUpdate){
            return (
                <View style={[styles.container,{backgroundColor:'white'}]}>
                    <View style={{height:loadingBarLength, width:10,backgroundColor:'#e6e6e6' , justifyContent:'center' ,alignItems:'center', borderRadius:5}}>
                        <View style={{position:'absolute',bottom:0, height:loadingBarLength*this.state.updatePercentage/100, width:10,backgroundColor:'#F8552F',borderRadius:5 }}>
                        </View>
                    </View>
                    <Image source={require('./image/rocket.png')} style={{width:rocketHeight*0.6, height:rocketHeight, position:'absolute',bottom:loadingBarLength*this.state.updatePercentage/100 + parseInt(140 * sizeScale)}} />
                    <View style={{marginTop:50 * sizeScale, justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.loadingFont}>Loading</Text>
                        <Text style={styles.loadingFont}>{this.state.updatePercentage}%</Text>
                    </View>

                </View>
            )
        }else{
            return(
                <View style={[styles.container,{backgroundColor:'transparent'}]}>
                </View>
            )
        }


      }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        paddingTop:150* sizeScale,
        paddingBottom:50* sizeScale,
    },
    loadingFont:{
        fontSize:15,
        color:'#F8552F',
        fontFamily:'NotoSans-Black'
    }
});
