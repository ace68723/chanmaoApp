import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Separator from "./separator";
import Checkbox from "./checkbox";
import SboxHeader from '../../../App/Components/General/SboxHeader';
import Label from '../../../App/Constants/AppLabel';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      textInput: ''
    }
  }


	render() {
    const { locationOptions } = this.props;
    const viewHeight = Dimensions.get('window').height;
    const viewWidth = Dimensions.get('window').width;
    const navigationHeight = viewHeight * (212/2208) - 17;
    // const searchBarHeight = viewHeight * (105/2208);
    const searchBarWidth = viewWidth * (950 / 1242);
    const backPaddingLeft = viewHeight * (60/2208);

		return (
			<View style={styles.container}>

        <SboxHeader title={Label.getSboxLabel('ADDRESS_SEARCH')}
                goBack={this.props.goBack}
                leftButtonText={'x'}/>

          <View style={[styles.searchBar, {paddingTop:15,paddingBottom:15}]}>
            <Image style={[styles.searchIcon],
                          {height: backPaddingLeft,
                           width: backPaddingLeft,
                           marginHorizontal: viewWidth * (40 / 1242),}}/>
                 <TextInput
                   selectionColor={'#ff7685'}
                   allowFontScaling={false}
                   returnKeyType={'search'}
                   autoCorrect={false}
                   autoCapitalize={'none'}
                   autoFocus={true}
                   fontSize={18}
                   style={{flex: 0.95}}
                   placeholder={Label.getSboxLabel('ADDRESS_SEARCH')}
                   onChangeText={(text) => this.props.onChangeTextInput(text)}
                   onSubmitEditing={this.props.onSubmitText}
                   underlineColorAndroid={"rgba(0,0,0,0)"}
                   />
          </View>
        <Separator/>

			</View>
			);
	}
}
const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		backgroundColor: "white",
	},
	navigation: {
    flexDirection:'row'
  },
  back: {
    flex: 1,
    justifyContent:'center',
  },
  title: {
    flex:1,
    backgroundColor: 'white',
    justifyContent:'center'
  },
	filter: {
    flex:1,
    backgroundColor: "#f4f4f4",
    flexDirection:'row'
	},
	changeCity: {
    flex:1,
    justifyContent:'center',
    alignItems: "center"
	},
	search: {
    flex:1,
    justifyContent:'center'
	},
	announcement: {
    justifyContent:'center',
    flexDirection:'row',
    alignItems: 'center'
	},
  searchBar: {
    flexDirection: 'column',
    borderColor: '#DCDCDC',
    // borderRadius: 50,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    resizeMode: 'contain'
  }
})

export default Header;
