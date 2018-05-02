## 获取餐馆列表 API 



|    Tables    |                        说明                        | 默认值 |
| :----------: | :------------------------------------------------: | :----: |
|     URL      |         /api/cmapp/v2/get_restaurant_list          |        |
| HTTP请求方式 |                        GET                         |        |
| 是否需要登录 |                         否                         |        |
| 授权访问限制 |                        暂无                        |        |
|  授权范围()  |                        暂无                        |        |
|   支持格式   |                        JSON                        |        |
|   测试接口   | http://norgta.com/api/cmapp/v2/get_restaurant_list |        |


表头参数:

| Tables      | 类型及其范围 | 说明                  | 默认值        |
| ----------- | ------------ | --------------------- | ------------- |
| Authortoken | string       | token验证信息         |               |
| userloc     | string       | 经纬度                | 000000,000000 |
| cid         | Number       | categor id (Optional) |               |

返回:

| Tables             | 类型及其范围 | 说明         | 默认值           |
| ------------------ | ------------ | ------------ | ---------------- |
| ev_error           | number       | 请求是否成功 | 0为成功, 1为错误 |
| ev_message         | string       | 报错信息     | 空               |
| ea_restaurant_list | array        | 商家列表     |                  |

| restaurantList | 类型及其范围 | 说明              | 默认值 |
| -------------- | ------------ | ----------------- | ------ |
| area           | string       | area id           |        |
| desc           | string       | 餐馆描述          |        |
| distance       | number       | 距离(米)          |        |
| end_time       | string       | 关门时间          |        |
| mob_banner     | string       | banner图片        |        |
| name           | string       | 餐馆名字          |        |
| open           | number       | 是否开启(1为开启) |        |
| rank           | number       | 排序              |        |
| rid            | string       | 餐馆id            |        |
| start_amount   | string       | 起送价格          |        |
| start_time     | string       | 开启时间          |        |
| tp             | string       | 餐馆描述          |        |
| watermark      | number       | 餐馆描述          |        |

Data Sample
```
{
    ev_error	
    ev_message	
    ea_zone
    countAd
    countRR
    countClose
    ea_restaurant_list
}
```
```
ea_zone:
[
	{
	    "zone": 3,
	    "name": "Richmond Hill",
	    "lat": 43.841084,
	    "lng": -79.399788,
	    "image": "https://www.chanmao.ca/img/app/zone/004_20180329.png",
	    "distance": 2180.953692155
	},
]
```
```
ea_restaurant_list:
[
	{
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
	    	"open": 1,
		"rank": 1,
		"zone": 3
	    }]
	}
]
```
