import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ListView, Platform, Dimensions, FlatList} from "react-native";
import SboxHistorySeparator from "./SboxHistorySeparator";
import SboxHistoryImgListview from "./SboxHistoryImgListview";
import SboxHistoryBoxStatus from "./SboxHistoryBoxStatus";
import SboxHistoryItemListview from "./SboxHistoryItemListview";
import SboxHistoryPriceInfo from "./SboxHistoryPriceInfo";

class Row extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
      items_ls: [],
      dataSource: ds.cloneWithRows([]),
      refMapping: {}
    }
    this.handleItemSelected = this.handleItemSelected.bind(this);
    this.setSource = this.setSource.bind(this);
    this.mapRef = this.mapRef.bind(this);
  }


  shouldComponentUpdate(nextProps, nextState){
		if(nextState.items_ls != this.state.items_ls){
			return true;
		}
    else{
			return false;
		}
	}



  setSource(items_ls, itemsDatasource, otherState) {
		this.setState({
			items_ls,
			dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
			refMapping: otherState
		})
	}

  handleItemSelected(itemIndex, key) {
    //
    let distance = itemIndex * (Dimensions.get('window').width * 0.24 + 12) -
      Dimensions.get('window').width * 0.28 - 6;
    this.state.refMapping.scrollTo({x: distance, y: 0, animated: true});

    var focus = true;
    const newItems = this.state.items_ls.map((item) => {
			if (item.sku_id !== key) return item;
			return {
				...item,
				focus
			}
		})
    var focus = false;
		const newItems_2 = newItems.map((item) => {
			if (item.sku_id == key) return item;
			return {
				...item,
				focus
			}
		})
    this.setSource(newItems_2, newItems_2);
    // setTimeout(() => {
    //
  }


  mapRef(lv) {
    //
    //
    if (lv) {
      //
      this.setSource(this.state.items_ls, this.state.items_ls, lv);
    }
    //
    // setTimeout(() => {
  }

  componentDidMount() {
    //
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var items_ls = [];
    var itemIndex = -1;
    var focus = false;
		for(let index = 0; index < this.props.prod.length; index++) {
			// for(let proIndex = 0; proIndex < this.props.prod[index].prod.length; proIndex++) {
      //   itemIndex++;
			// 	items_ls = [...items_ls, {...this.props.prod[index].prod[proIndex], itemIndex, focus}];
			// }
      items_ls = [...items_ls, {...this.props.prod[index], index, focus}];
		}
    this.setState({
      items_ls: items_ls,
			dataSource: this.state.dataSource.cloneWithRows(items_ls)
		})
    //
	}


	render() {
    //
    //

    const boxes_ls = [];
    // var boxes_ls = [...this.props.boxes];
    // var status = "订单处理中";
    // for(let index = 0; index < this.props.boxes.length; index++) {
    //   if (this.props.boxes[index].trace.completed > 0) {
    //     status = "订单已完成";
    //   }
    //   else if (this.props.boxes[index].trace.delivered > 0) {
    //     status = "已到达";
    //   }
    //   else if (this.props.boxes[index].trace.distributed > 0) {
    //     status = "在路上";
    //   }
    //   else if (this.props.boxes[index].trace.packed > 0) {
    //     status = "已发货";
    //   }
    //   else  if (this.props.boxes[index].trace.accepted > 0) {
    //     status = "待发货";
    //   }
    //   boxes_ls[index] = {...boxes_ls[index], status};
    // }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let tempDataSource = ds.cloneWithRows(boxes_ls);



		return (
				<View style={[styles.container, (Platform.OS === 'ios') && styles.shadowIOS,
      (Platform.OS === 'android') && styles.shadowAndroid]}>
          <SboxHistoryImgListview
            onSelected={(itemIndex, pbid) => this.handleItemSelected(itemIndex, pbid)}
            onMapped = {(lv) => this.mapRef(lv)}
            {...{items_ls: this.state.items_ls, obid: this.props.obid}}
          />

          <SboxHistoryBoxStatus
              {...{boxes_ls: this.props.prod, created: this.props.created, obid: this.props.obid, trace: this.props.trace}}
            />


          <SboxHistorySeparator/>


            <SboxHistoryItemListview
              onSelected={(itemIndex, pbid) => this.handleItemSelected(itemIndex, pbid)}
              {...{items_ls: this.state.items_ls}}
            />

            <SboxHistorySeparator/>


            <SboxHistoryPriceInfo
              {...{delifee:this.props.delifee,
                   total:this.props.total,
                   item:this.props.item,
                   goToSboxHistoryOrderDetail:this.props.goToSboxHistoryOrderDetail}}
            />




				</View>
		);
	}
}

const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;

const buttonHeight = viewHeight * 0.06;
const priceHeight = viewHeight * 0.07;

const styles = StyleSheet.create({
	container: {
    backgroundColor: "white",
    margin: 10,
    marginBottom: 7,
    marginTop: 5,
	},
  shadowIOS: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.32
  },
  shadowAndroid: {
    elevation: 3
  }
})

export default Row;
