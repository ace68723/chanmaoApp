'use strict'
import React, {
	Component,
} from 'react';
import {
	Dimensions,
	Text,
	TextInput,
	TouchableOpacity,
    View,
	FlatList,
    ImageBackground,
} from 'react-native';
import CMLabel from '../../../Constants/AppLabel';
const {width,height} = Dimensions.get('window');
export default class SearchByArea extends Component{
    constructor(props){
        super(props);
        this.state={
            zones: props.areas,
        }
    }
    _renderHeader(label) {
    
        return(
            <View style={{padding:10,paddingTop:20,paddingBottom:0}}>
                <Text style={{fontSize:18,
                                            fontFamily:"FZZhunYuan-M02S"}}
                            allowFontScaling={false}>
                    {CMLabel.getCNLabel('CITY_AREA')}
                </Text>
            </View>
        )
		// }else{
		// 	return(
		// 		<View style={{padding:10,paddingTop:20,paddingBottom:0}}>
		// 			<Text style={{fontSize:18,
		// 										fontFamily:"FZZhunYuan-M02S"}}
		// 						allowFontScaling={false}>
		// 				{CMLabel.getCNLabel('RES_TAG')}
		// 			</Text>
		// 		</View>
		// 	)
		// }

    }
    _renderArea({item ,index}) {
		let area = item;
		if(area){
			return(
				<TouchableOpacity onPress={()=>{
  					this.props.setSearchText(area.name);
					}}>
					<ImageBackground
                        source={{uri:area.image}}
                        style={{
                            marginTop:10,
                            marginLeft:10,
  						    width:(width-30)/2,
                            height:(width-30)/2,  
  						    alignItems:'center',
  						    justifyContent:'center',
  						}}
                        imageStyle={{ borderRadius: 5}}>
  						<Text style={{backgroundColor:"rgba(0,0,0,0)",
					    							color:"#ffffff",
					                  fontSize:18,
					                  fontFamily:'FZZongYi-M05S'}}
									allowFontScaling={false}>
                            {area.name}
                        </Text>
					</ImageBackground>
				</TouchableOpacity>
			)
		}

	}
    _areaKeyExtractor = (area, index) => index + area.area +area.name;
    _renderAreas() {
		return(
			<FlatList
				numColumns={2}
				key={'area'}
                showsVerticalScrollIndicator={false}
				data={this.state.zones}
				keyboardDismissMode={"on-drag"}
				keyboardShouldPersistTaps={"always"}
                ListHeaderComponent={this._renderHeader()}
				renderItem={(area)=>this._renderArea(area)}
				keyExtractor={this._areaKeyExtractor}
				removeClippedSubviews={true}
                initialNumToRender={1}
                scrollEnabled={false}
				extraData={this.state.zones}
			/>
		)
    }
    render(){
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                {this._renderAreas()}
            </View>
        )
    }
}