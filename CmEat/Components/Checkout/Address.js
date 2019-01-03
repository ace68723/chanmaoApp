'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MapView from 'react-native-maps';

import Label from '../../../App/Constants/AppLabel';

const {width,height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class Address extends Component {

  constructor(props){
    super(props);
		this.state = {
      mapViewStyle:{
        height:height*2,
        width:width*2,
        left:-width*0.5,
        top:-height*0.5,
      },
      address:props.selectedAddress,
      region:{
        latitude: Number(props.selectedAddress.loc_la),
        longitude: Number(props.selectedAddress.loc_lo),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      marker:{
        latlng:{
          latitude: Number(props.selectedAddress.loc_la),
          longitude: Number(props.selectedAddress.loc_lo),
        },
        title:"Home",
        description:"",
        image:require("./Image/icon_customer.png"),
      },
		}

  }
	componentDidMount(){
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			address:nextProps.selectedAddress,
			region:{
				latitude: Number(nextProps.selectedAddress.loc_la),
				longitude: Number(nextProps.selectedAddress.loc_lo),
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			},
			marker:{
				latlng:{
					latitude: Number(nextProps.selectedAddress.loc_la),
					longitude: Number(nextProps.selectedAddress.loc_lo),
				},
				title:"Home",
				description:"",
				image:require("./Image/icon_customer.png"),
			},
		})
	}


  render(){
    return(
			<View>
				<Text style={{color:'#666666',
											marginLeft: 30,
											marginTop: 20,
											fontSize:15,
											fontFamily: 'NotoSans-Black'}}
							allowFontScaling={false}>
					{Label.getCMLabel('DELIVER_ADDRESS')}
				</Text>
				<View style={{flexDirection:"row",
											marginTop: 20,
											marginLeft: 20}}>
	        <MapView
	            region={this.state.region}
	            style={{width:120,
	                    height:120,
	                    marginRight: 10,
	                    borderRadius:15,
	                    borderColor:"#e2e2e4",
	                    borderWidth: StyleSheet.hairlineWidth}}
	          >
	          <MapView.Marker
	            coordinate={this.state.marker.latlng}
	            title={this.state.marker.title}
	            description={this.state.marker.description}
	            image={this.state.marker.image}
	          />
	        </MapView>

					<TouchableWithoutFeedback onPress={this.props.goToAddressList}>
						<View style={{flex:1,margin:10, justifyContent: 'space-around'}}>
							<Text style={{fontFamily:'NotoSans-Regular'}}
										allowFontScaling={false}>
									{this.state.address.name}
							</Text>
							<Text style={{fontFamily:'NotoSans-Regular'}}
										allowFontScaling={false}>
									{this.state.address.tel}
							</Text>
							<Text numberOfLines={2} style={{fontFamily:'NotoSans-Regular'}}
										allowFontScaling={false}>
									{this.state.address.addr}
							</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
    )
  }
}
const styles = StyleSheet.create({
});
