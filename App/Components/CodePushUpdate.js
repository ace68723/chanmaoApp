import {
    View,
    Text,
    Dimensions
} from 'react-native';
import CodePush from "react-native-code-push";
import React, { Component } from 'react';
const { width } = Dimensions.get('window');
export default class CodePushUpdate extends Component {
    constructor(props){
        super(props)
        this.state = {
          isUpdating:false,
          updateIndicator:0,
        }
      }
    componentWillMount() {
		CodePush.disallowRestart();//页面加载的禁止重启，在加载完了可以允许重启
	}
    componentDidMount(){
        CodePush.notifyAppReady();
        CodePush.allowRestart();//允许重启，否则热更新不会生效
        CodePush.sync({ 
            checkFrequency: CodePush.CheckFrequency.ON_APP_START,
            installMode: CodePush.InstallMode.IMMEDIATE
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
                    })
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    console.log("Installing update.");
                    break;
                case CodePush.SyncStatus.UP_TO_DATE:
                    this.setState({
                      isUpdating:false,
                      updatePercentage:100
                    },()=>{
                        console.log("Up-to-date.")
                        this.props.navigator.resetTo({
                            screen: {
                              // screen: 'cmHome', CmEat CmLogin// unique ID registered with Navigation.registerScreen
                              screen: 'cmHome',
                              navigatorStyle: {navBarHidden: true},
                              navigatorButtons: {},
                          
                            },
                            animated: true,
                            animationType: 'fade',
                          })
                    })
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                    console.log("Update installed.");
                    this.setState({
                      isUpdating:false,
                      updatePercentage:100
                    })
                    break;
            }
    
            },(progress)=>{
              console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
              this.setState({updatePercentage: parseInt(progress.receivedBytes/progress.totalBytes*100)})
            }
          );
    }
 
    render(){
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'orange',
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                <Text style={{fontSize:25}}>{this.state.updatePercentage==100 ? '让您久等啦！！' :'稍等一下，快乐即将到达...'}</Text>
                <Text style={{fontSize:30}}>%{this.state.updatePercentage}</Text>
                <View style={{position:'absolute',bottom:0, left:0, height:5,width:width*this.state.updatePercentage/100,backgroundColor:'black' }}></View>
            </View>
        )
          
          
        
        
      }
}
