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
// import ModalDropdown from 'react-native-modal-dropdown';
// <ModalDropdown
//   textStyle={{fontSize: 14}}
//   dropdownStyle={{width: viewWidth/2, height: 200}}
//   dropdownTextStyle={{paddingLeft: 10, fontSize: 18, color: 'black'}}
//   dropdownTextHighlightStyle={{fontWeight: '800'}}
//   options={locationOptions}
//   defaultValue="Select City"
//   onSelect={(idx, filter) => this.props.onFilter(idx, filter)}
//   />
//
//
//
//
//
//
//  切换城市以及搜索地址
//
//           <View style={styles.filter}>
          // <View style={styles.changeCity}>
        //
        //
        //   </View>
        //
        //
        //
        //   <View style={{width: 1, borderWidth: 0.4,
        //     borderColor: "#D5D5D5"}}/>
        //
        //
        //   <View style={styles.search}>
        //     <TouchableOpacity>
        //       <Text style={{textAlign:'center', fontSize: 14}}>搜索地址</Text>
        //     </TouchableOpacity>
        //   </View>
        // </View>

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
    const searchBarHeight = viewHeight * (105/2208);
    const searchBarWidth = viewWidth * (950 / 1242);
    const backPaddingLeft = viewHeight * (60/2208);

		return (
			<View style={styles.container}>

				<View style={[styles.navigation, {height: navigationHeight}]}>
			    	<View style={styles.back}>
			    	</View>
			    	<View style={styles.title}>
			       		<Text style={ {textAlign:'center', fontSize:20, fontWeight: '700'} }>地址</Text>
			    	</View>
			    	<View style={{flex:1}}>
            </View>
			  </View>

        <Separator/>
        <View style={{height: searchBarHeight, width: viewWidth}}>
          <View style={[styles.searchBar, {margin: 2,
                                           height: searchBarHeight - 4,
                                           width: viewWidth - 6}]}>
            <Image style={[styles.searchIcon],
                          {height: backPaddingLeft,
                           width: backPaddingLeft,
                           marginHorizontal: viewWidth * (40 / 1242),}}
                   source={require('./search-01.png')}/>
                 <TextInput
                   style={{flex: 0.95}}
                   placeholder={"搜索地址"}
                   onChangeText={(text) => this.props.onChangeTextInput(text)}
                   onSubmitEditing={this.props.onSubmitText}
                   underlineColorAndroid={"rgba(0,0,0,0)"}
                   />
          </View>
        </View>



        <Separator/>

        <View style={[styles.announcement, {height: searchBarHeight}]}>
          <Text style={{textAlign:'center'}}>我们只配送以下范围， 请选择您收货的Condo地址</Text>
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
		marginTop:17,
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
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    resizeMode: 'contain'
  }
})

export default Header;
