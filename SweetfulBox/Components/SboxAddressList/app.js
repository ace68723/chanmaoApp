import React, { Component } from "react";
import { View, Text, StyleSheet, ListView} from "react-native";
import Header from "./header";
import Row from "./row";
import Separator from "./separator";

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter == "ALL") return true;
    if (item.addr.split(",")[1] == filter) return true
  })
}

class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      filter: "ALL",
      items: [
        {"cbid": 123,
        "zmid": 647,
        "addr": "5508 Yonge St,North York,M2N 7G5,Canada",
        "province": "Ontario",
        "lat": 42,
        "lng": 30,
        "notes":"ok",
        "selected": false
      },

      {"cbid": 124,
      "zmid": 647,
      "addr": "20 Olive St,North York,M2N 7G5,Canada",
      "province": "Ontario",
      "lat": 42,
      "lng": 30,
      "notes":"ok",
      "selected": false
    },
    {"cbid": 125,
    "zmid": 647,
    "addr": "111 Granton Dr,Richmond Hill,M2N 7G5,Canada",
    "province": "Ontario",
    "lat": 42,
    "lng": 30,
    "notes":"ok",
    "selected": false
  }],
  dataSource: ds.cloneWithRows([]),
  locationOptions: ['ALL', 'North York', 'Markham', 'Scarborough',
  'Richmond Hill', 'York']
}
this.handleFilter = this.handleFilter.bind(this);
this.handleToggleSelected = this.handleToggleSelected.bind(this);
this.setSource = this.setSource.bind(this);
}


/**
* function that runs before rendering the components
*/
componentWillMount() {
  // AsyncStorage.getItem("items").then((json) => {
  // 	try {
  // 		const items = JSON.parse(json);
  // 		this.setSource(items, items);
  // 	} catch(e) {
  // 		console.log("GG");
  // 	}
  // })
  // console.log(this.state);
  this.setSource(this.state.items, this.state.items);
  console.log(this.state.items);
}


/**
* 保存states和dataSource
* @param {Array} items array of items in the state
* @param {Array} itemsDatasource array of items in the dataSource
* @param {Object} otherState
*/
setSource(items, itemsDatasource, otherState) {
  this.setState({
    items,
    dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
    ...otherState
  })
  // AsyncStorage.setItem("items", JSON.stringify(items));
}


/**
* 根据所选城市对condo进行过滤
* @param {Numer} idx the index of the the selected option
* @param {String} filter name of the city from the selected option
*/
handleFilter(idx, filter) {
  this.setSource(this.state.items, filterItems(filter, this.state.items), { filter });
}


/**
* 当用户选中某一condo，修改selected的值并保存到dataSource
* @param {String} key the condo id of the selected condo address
* @param {Boolean} selected the flag whether the condo address is selected or not
*/
handleToggleSelected(key, selected) {
  var selected = !selected;
  const newItems = this.state.items.map((item) => {
    if (item.cbid !== key) return item;
    return {
      ...item,
      selected
    }
  })

  const newItems_2 = newItems.map((item) => {
    if (item.cbid == key) return item;
    var selected = false;
    return {
      ...item,
      selected
    }
  })
  this.setSource(newItems_2, filterItems(this.state.filter, newItems_2));
  // setTimeout( () => {
  // 	console.log(this.state.items);
  // }, 100);
}


render() {
  return (
    <View style={styles.container}>
    <Header
    onFilter={this.handleFilter}
    {...this.state}
    />

    <View style={styles.content}>
    <ListView
    enableEmptySections
    dataSource={this.state.dataSource}
    renderRow={({ cbid, selected, addr}) => {
      return (
        <Row
        key={cbid}
        onselected={(lv_selected) => this.handleToggleSelected(cbid, lv_selected)}
        {...{selected, addr}}
        />
      )
    }}
    renderSeparator={(sectionId, rowId) => {
      return <Separator/>
    }}
    />
    </View>
    </View >
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 0.8088
  }
});

export default App;
