import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
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
	render() {
    const { locationOptions } = this.props;
    const viewHeight = Dimensions.get('window').height;
    const viewWidth = Dimensions.get('window').width;
    const navigationHeight = viewHeight * 0.096 - 17;
    const backPaddingLeft = viewHeight * 0.03;

		return (
			<View style={styles.container}>

				<View style={[styles.navigation, {height: navigationHeight}]}>
			    	<View style={styles.back}>
			      		<TouchableOpacity onClick={this.props.onClearComplete}>
                    <Text style={{fontSize:20,marginLeft:10}}>{String.fromCharCode(10005)}</Text>
                </TouchableOpacity>
			    	</View>
			    	<View style={styles.title}>
			       		<Text style={ {textAlign:'center', fontSize:20, fontWeight: '700'} }>地址</Text>
			    	</View>
			    	<View style={{flex:1}}>
            </View>
			  </View>

        <Separator/>



        <Separator/>

        <View style={styles.announcement}>
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
		flex:0.1912,
	},
	navigation: {
    flexDirection:'row'
  },
  back: {
    flex:1,
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
		flex:1,
    justifyContent:'center',
    flexDirection:'row',
    alignItems: 'center'
	}
})

export default Header;
