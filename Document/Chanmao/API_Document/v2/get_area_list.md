
## 获取区域餐馆



|  Tables  |           说明            | 默认值  |
| :------: | :---------------------: | :--: |
|   URL    | MobOrder10/RrAreaNew |      |
| HTTP请求方式 |          GET           |      |
|  是否需要登录  |            否            |      |
|  授权访问限制  |           暂无            |      |
|  授权范围()  |           暂无            |      |
|   支持格式   |          JSON           |       ||


表头参数:

| Tables      | 类型及其范围 | 说明        | 默认值  |
| ----------- | ------ | --------- | ---- |
| authortoken | string | token验证信息 |      |
| userloc | string | 经纬度 |   000000,000000   |


请求参数:

无


返回字段说明:

| Tables     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| result  | number | 请求是否成功 | 0为成功, 1为错误 |
| area | array | 区域信息   |           ||

| area     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| area     | number | area id |    |
| name   | string | 地区名称 |      |
| restaurantList   | array | 餐馆列表 |      ||


| restaurantList     | 类型及其范围 | 说明     | 默认值        |
| ---------- | ------ | ------ | ---------- |
| area     | string | area id |    |
| desc   | string | 餐馆描述 |      |
| distance   | number | 距离(米) |      |
| end_time   | string | 关门时间 |      |
| mob_banner   | string | banner图片 |      |
| name   | string | 餐馆名字 |      |
| open   | number | 是否开启(1为开启) |      |
| rank   | number | 排序 |      |
| rid   | string | 餐馆id |      |
| start_amount   | string | 起送价格 |      |
| start_time   | string | 开启时间 |      |
| tp   | string | 餐馆描述 |      |
| watermark   | number | 餐馆描述 |      |



Data Sample
```
[{
	"area": 0,
	"name": "All",
	"restaurantList": [{
		"rid": "76",
		"name": "麻布小馆(North York)",
		"desc": "央街最火爆的台湾小吃",
		"tp": "0",
		"area": "2",
		"start_amount": "0.00",
		"mob_banner": "https://www.chanmao.ca/img/mob_banner/076_20170118.png",
		"watermark": 0,
		"rank": 6,
		"distance": 13342,
		"start_time": "12:00",
		"end_time": "02:00",
		"open": 1
	}]
}]
```
