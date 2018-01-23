## Select condo page

### Import
```javascript
import React, { Component } from "react";
import { View, Text, StyleSheet, ListView} from "react-native";
import Header from "./header";
import Row from "./row"; 每一个condo地址为一行
import Separator from "./separator"; 每一个section的分割线
```

### filterItems

辅助function： 根据给的`filter`(城市名字)去过滤`items`
根据`,`把`items.addr`分割开来，如果地址里面的第二项（index为1）不等同于filter，则该项不属于同一个`city`，过滤该项
```js
const filterItems = (filter, items) => {
	return items.filter((item) => {
		if (filter == "ALL") return true;
		if (item.addr.split(",")[1] == filter) return true
 	})
}
```



### App

`App`component初始化的设定
`ds` 建立dataSource为ListView准备
`filter` 初始值为ALL， 不过滤任何condo
`items` Array of condo的初始值
`dataSource` ListView的dataSource初始值为空的
`locationOptions` 存储`filter`所有option的列表

```javascript
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
this.state = {
  filter: "ALL",
  items: [...],
  dataSource: ds.cloneWithRows([]),
  locationOptions: ['ALL', ...]
}
```



### componentWillMount

调用method`setSource`, 从state里面提取`items`的初始值，保存到`dataSource`

```javascript
componentWillMount() {
  this.setSource(this.state.items, this.state.items);
}
```



### 保存dataSource

接收3个变量，修改`state`里面的值
`items` 全部condo地址列表
`itemsDatasource` 想要显示的condo地址列表
`otherState` 其他额外变量， 如`filter`, `locationOptions`

```javascript
  setSource(items, itemsDatasource, otherState) {
  this.setState({
    items,
    dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
    ...otherState
  })
}
```



### 过滤选项

根据所选城市对`items`进行过滤，并保存到`dataSource`

```javascript
  handleFilter(idx, filter) {
		this.setSource(this.state.items, filterItems(filter, this.state.items), { filter });
	}
```





### 选中condo地址

当用户选中某一condo，修改其`selected`的值为`true`，其他的为`false`并保存到`dataSource`
```javascript
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
	}
```



### 渲染

Main body分为两部分，`header`跟`content`

```javascript
    <View style={styles.container}>
      <Header
      .../>
      <View style={styles.content}>
		...
      </View>
	</View >
```



### 渲染Header

把state传递到header进行渲染

当用户选择某一城市时，过滤content的显示内容

```javascript
<Header
  onFilter={this.handleFilter}
  {...this.state}
/>
```



### 渲染ListView

把condo的`cbid`, `selected`, `addr`传递到每个row进行渲染
当用户选中某一选项，会调用`handleToggleSelected`method进行对应操作

```javascript
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
```



```javascript
<View style={styles.container}>
  <Header
    value={this.state.value}
    onAddItem={this.handleAddItem}
    onChange={(value) => this.setState({ value })}
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
```
