import React, { Component } from "react";
import {
	Animated,
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	FlatList
} from "react-native";

import Header from "../General/Header";
import Cell from "./cell.js";
import Options from "./data.js";

import { GetUserInfo } from "../../Modules/Database";
import Intercom from "react-native-intercom";
import moment from "moment";

const { height, width } = Dimensions.get("window");

class CustomerService extends Component {
	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
		this.onPressedCell = this.onPressedCell.bind(this);
		this.pushScreen = this.pushScreen.bind(this);
		this.showMessager = this.showMessager.bind(this);
		this.openUrl = this.openUrl.bind(this);

		this.initPageData();
	}
	initPageData() {
		if (this.props.fromSettings) {
			this.state = {
				cells: Options.cmEat.settingsOptions
			};
			return;
		}
		const finishedStatus = [40, 5, 90];
		const orderStatus = this.props.order.order_status;
		// console.log(this.props.order);
		// order_created rr_url order_oid
		let options;
		if (finishedStatus.includes(orderStatus)) {
			options = Options.cmEat.finishedOptions;
		} else {
			options = Options.cmEat.unfinishedOptions;
		}
		this.state = {
			cells: options,
			headerImage: this.props.order.rr_url
		};
	}
	goBack() {
		this.props.navigator.pop();
		if (this.props.unmount) {
			setTimeout(() => {
				this.props.unmount();
			}, 500);
		}
	}
	onPressedCell(key) {
		let selected;
		for (let i of this.state.cells) {
			if (i.key == key) {
				selected = i;
				break;
			}
		}

		// Custom logic
		if (selected.key == "rushOrder") {
			this.rushOrder();
			return;
		} else if (selected.key == "chatHistory") {
			Intercom.displayConversationsList();
			return;
		}

		// Default types
		switch (selected.type) {
			case "message":
				this.showMessager(selected.message);
				break;
			case "options":
				this.pushScreen(selected.options);
				break;
			case "url":
				this.openUrl(selected.url);
				break;
			case "alert":
				alert(selected.alert);
				break;
			default:
		}
	}
	pushScreen(passingOptions) {
		this.props.navigator.push({
			screen: "CustomerServiceListView",
			animated: true,
			navigatorStyle: { navBarHidden: true },
			passProps: {
				options: passingOptions,
				order: this.props.order,
				fromSettings: this.props.fromSettings
			}
		});
	}
	showMessager(message) {
		const { uid, version } = GetUserInfo();
		if (this.props.fromSettings) {
			Intercom.registerIdentifiedUser({ userId: uid });
			Intercom.updateUser({
				user_id: `uid: ${uid}`,
				custom_attributes: {
					版本号: version,
					cm_id: uid
				}
			});
		} else {
			const orderStatusMapping = {
				0: "等待商家确认",
				10: "商家已确认，准备中",
				20: "商家已确认，准备中",
				30: "送餐员已开始送餐",
				40: "已送到",
				55: "新用户订单确认中",
				60: "需要改运费",
				5: "售完打回",
				90: "订单已取消"
			};
			const statusId = parseInt(this.props.order.order_status);
			const orderStatus =
				statusId in orderStatusMapping
					? orderStatusMapping[statusId]
					: statusId;
			const oid = this.props.order.order_oid;

			Intercom.registerIdentifiedUser({ userId: uid });
			Intercom.updateUser({
				user_id: `oid: ${oid} uid: ${uid}`,
				custom_attributes: {
					版本号: version,
					订单ID: oid,
					联系人: this.props.order.user_name,
					电话号码: this.props.order.user_tel,
					下单地址: this.props.order.user_address,
					订单状态: orderStatus,
					餐馆名: this.props.order.rr_name,
					cm_id: uid
				}
			});
		}
		Intercom.displayMessageComposerWithInitialMessage(message);
	}
	openUrl(url) {
		this.props.navigator.showModal({
			screen: "AdView",
			animated: true,
			navigatorStyle: { navBarHidden: true },
			passProps: { url: url }
		});
	}
	rushOrder() {
		const orderPlacedTime = moment(this.props.order.order_created).unix();
		// console.log(orderPlacedTime);
		const diffMinutes =
			(Math.round(new Date().getTime() / 1000) - orderPlacedTime) / 60;

		if (diffMinutes <= 40) {
			alert("您的订单正在准备中，请耐心等待");
		} else if (diffMinutes >= 40 && diffMinutes <= 60) {
			alert("您的订单正在配送中，请耐心等待");
		} else if (diffMinutes >= 60) {
			this.showMessager("你好，我想催单");
		}
	}

	renderCells(item) {
		return (
			<Cell
				cellStyle={styles.cellStyle}
				title={item.title}
				cellKey={item.key}
				icon={item.icon}
				onPressedCell={this.onPressedCell}
			/>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<Header goBack={this.goBack} />
				{this.state.headerImage && (
					<View style={{ width: width, height: width * 0.35 }}>
						<Image
							style={{ flex: 1 }}
							source={{ uri: this.state.headerImage }}
						/>
					</View>
				)}
				<View
					style={{
						marginTop: 18,
						marginBottom: 18,
						backgroundColor: "#f3f3f3"
					}}
				>
					<Text
						style={{
							color: "grey",
							textAlign: "center",
							fontWeight: "600",
							fontSize: 12
						}}
						allowFontScaling={false}
					>
						- 选择问题 -
          </Text>
				</View>

				<FlatList
					style={{
						marginTop: 6,
						backgroundColor: "#f3f3f3",
						borderTopWidth: 0.7,
						borderColor: "#CCCCD3"
					}}
					data={this.state.cells}
					renderItem={({ item }) => this.renderCells(item)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f3f3f3"
	},
	cellStyle: {
		height: 48
	}
});

module.exports = CustomerService;
