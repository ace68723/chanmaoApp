
## 1. SweetfulBox data sample

<div id="1.1"> <div/>

### 1.1 single product spu data sample 


```
{
  spu_id:5,
  spu_name:"与美懒人大厨四川冒菜",
  spu_status:0, //status = 1, 页面跳回
  spu_service_img: "https://chanmao.us/storage/image/sb_app/service.png"
  sku_image:[
    {
      image_id:762,
      image_url:"https://chanmao.us/storage/image/sb_app/image/1_20170828.png"
    },
    {
      image_id:835,
      image_url:"https://chanmao.us/storage/image/sb_app/image/12_20170828.png"
    },
    {
      image_id:275,
      image_url:"https://chanmao.us/storage/image/sb_app/image/23_20170828.png"
    }
  ],
  sku_fact:[
    {
      image_id:852,
      image_url:"https://chanmao.us/storage/image/sb_app/facts/2_20170828.png"
    },
    {
      image_id:523,
      image_url:"https://chanmao.us/storage/image/sb_app/facts/3_20170828.png"
    },
    {
      image_id:632,
      image_url:"https://chanmao.us/storage/image/sb_app/facts/5_20170828.png"
    }
  ],
  sku_list:[
    {
      spu_id:5,
      sku_id:52,
      sku_name:"豚骨菌菇(大包装)",
      sku_status:0,
      sku_amount:329,
      sku_image_id:762,
      sku_fact_image_id:852,
      sku_original_price:10.86,
      sku_price:10.86,
      
    },
    {
      spu_id:5,
      sku_id:22,
      sku_name:"豚骨菌菇(小包装)",
      sku_status:0,
      sku_amount:182,
      sku_image_id:762,
      sku_fact_image_id:523,
      sku_original_price:7.53,
      sku_price:5.22
    },
    {
      spu_id:5,
      sku_id:48,
      sku_name:"浓香麻辣",
      sku_status:1,
      sku_amount:0, //check amount || status
      sku_image_id:835,
      sku_fact_image_id:632,
      sku_original_price:5.23,
      sku_price:2.33
    },
    {
      spu_id:5,
      sku_id:48,
      sku_name:"黑糖海盐",
      sku_status:0,
      sku_amount:235,
      sku_image_id:275,
      sku_fact_image_id:523,
      sku_original_price:8.23,
      sku_price:6.59
    }
  ]
}
```


<div id="1.2"> <div/>

### 1.2 home data sample


```
{
    "ev_error": 0,
    "ev_message": "",
    "ea_banner": [
        {
            "id": 3,
            "image": "https://chanmao.us/storage/image/sb_app/home_banner/3_20170828.png",
            "type": 3,
            "param": "param3"
        },
        {
            "id": 2,
            "image": "https://chanmao.us/storage/image/sb_app/home_banner/2_20170828.png",
            "type": 2,
            "param": "param2"
        },
        {
            "id": 1,
            "image": "https://chanmao.us/storage/image/sb_app/home_banner/1_20170828.png",
            "type": 1,
            "param": "param"
        }
    ],
    "ea_theme": [
        {
            "tmid": 1,
            "name": "零食零食",
            "active_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/1_active_20170828.png",
            "inactive_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/1_inactive_20170828.png",
            "section_list": [
                {
                    "section_id": 1,
                    "section_name": "新品速递",
                    "section_icon": "https://chanmao.us/storage/image/sb_app/2.0/tmp/new.png",
                    "prod_start_idx": 0
                },
                {
                    "section_id": 2,
                    "section_name": "好货热卖",
                    "section_icon": "https://chanmao.us/storage/image/sb_app/2.0/tmp/hot.png",
                    "prod_start_idx": 6
                },
                {
                    "section_id": 3,
                    "section_name": "超值特价",
                    "section_icon": "https://chanmao.us/storage/image/sb_app/2.0/tmp/sale.png",
                    "prod_start_idx": 12
                }
            ],
            "prod_list": [
                {
                    "type": "section_left",
                    "section_id": 1
                },
                {
                    "type": "section",
                    "section_id": 1,
                    "section_name": "新品速递"
                },
                {
                    "type": "section_right",
                    "section_id": 1
                },
                {
                    "sku_id": 1,
                    "name": "张君雅海苔味10G",
                    "sku_original_price": "10.99",
                    "sku_price": "10.99",
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/1_20170828.png",
                    "section_id": 1,
                    "type": "sku"
                },
                {
                    "sku_id": 2,
                    "name": "张君雅原味味10G",
                    "sku_original_price": "10.99",
                    "sku_price": "10.99",
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/2_20170828.png",
                    "section_id": 1,
                    "type": "sku"
                },
                {
                    "type": "empty"
                },
                {
                    "type": "section_left",
                    "section_id": 2
                },
                {
                    "type": "section",
                    "section_id": 2,
                    "section_name": "好货热卖"
                },
                {
                    "type": "section_right",
                    "section_id": 2
                },
                {
                    "sku_id": 3,
                    "name": "浪味仙田园蔬菜10G",
                    "sku_original_price": "16.99",
                    "sku_price": "12.99",
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/3_20170828.png",
                    "section_id": 2,
                    "type": "sku"
                },
                {
                    "sku_id": 4,
                    "name": "浪味仙烧烤味10G",
                    "sku_original_price": "16.99",
                    "sku_price": "12.99",
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/4_20170828.png",
                    "section_id": 2,
                    "type": "sku"
                },
                {
                    "type": "empty"
                },
                {
                    "type": "section_left",
                    "section_id": 3
                },
                {
                    "type": "section",
                    "section_id": 3,
                    "section_name": "超值特价"
                },
                {
                    "type": "section_right",
                    "section_id": 3
                },
                {
                    "spu_id": 1,
                    "name": "浪味仙",
                    "spu_price": "10.99",
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/zjy_big.png",
                    "section_id": 3,
                    "type": "spu"
                },
                {
                    "spu_id": 2,
                    "name": "张君雅",
                    "spu_price": "12.99",
                    "image": "https://chanmao.us/storage/image/sb_app/2.0/tmp/lwx_big.png",
                    "section_id": 3,
                    "type": "spu"
                },
                {
                    "type": "empty"
                }
            ]
        },
        {
            "tmid": 2,
            "name": "生活用品",
            "active_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/2_active_20170828.png",
            "inactive_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/2_inactive_20170828.png",
            "section_list": [],
            "prod_list": []
        },
        {
            "tmid": 3,
            "name": "Gift Card",
            "active_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/3_active_20170828.png",
            "inactive_icon": "https://chanmao.us/storage/image/sb_app/theme_icon/3_inactive_20170828.png",
            "section_list": [],
            "prod_list": []
        }
    ]
}
```

<div id="1.3"> <div/>
 
 ## 1.3 shopping cart data sample
 ```
 {
  spu_id:5,
  sku_id:22,
  spu_name:"与美懒人大厨四川冒菜",
  sku_name:"豚骨菌菇(小包装)",
  sku_status:0,
  sku_amount:182,
  sku_original_price:"7.53",
  sku_price:"5.22",
  sku_quantity:1
  sku_image_url:"https://chanmao.us/storage/image/sb_app/image/1_20170828.png"
}
 ```
 
 <div id="1.4"> <div/>
 
 ## 1.4 order history data sample 
 ```
 {
    "ev_error": 0,
    "ev_message": "",
    "ea_order": [
            {
                "obid": 325,
                "created": 1516162657,
                "delifee": "0.00",
                "total": "15.42",
                "created_date": "2018-01-16 23:17",
                "addr": {
                    "abid": 200,
                    "addr": "122228 Pemberton Ave, North York, ON M2M 4L9, Canada",
                    "name": "Jacob",
                    "tel": "6477777777",
                    "unit": "1211"
                },
                "tax": 1.77,
                "prod": [
                        {
                            "sku_id": 9,
                            "sku_fullname": "好巴食经典豆干乐享装", //spu_name + sku_name = sku_fullname
                            "sku_quantity": 2,
                            "sku_price": "1.69",
                            "sku_image": "https://chanmao.us/storage/image/sb_app/image/9_20170828.png"
                        },
                        {
                            "sku_id": 79,
                            "sku_fullname": "三足旺华派自加热米线 - 红烧牛肉",
                            "sku_quantity": 1,
                            "sku_price": "5.99",
                            "sku_image": "https://chanmao.us/storage/image/sb_app/image/79_20171129.png"
                        },
                        {
                            "sku_id": 89,
                            "sku_fullname": "北田 能量99棒 蛋黄味",
                            "sku_quantity": 1,
                            "sku_price": "2.99",
                            "sku_image": "https://chanmao.us/storage/image/sb_app/image/89_20171229.png"
                        },
                        {
                            "sku_id": 94,
                            "sku_fullname": "娃哈哈乳酸菌饮料 原味 100ml*4",
                            "sku_quantity": 1,
                            "sku_price": "1.29",
                            "sku_image": "https://chanmao.us/storage/image/sb_app/image/94_20171229.png"
                        }
                    ],
                    "trace": {
                        "status": 10,
                        "time": "2018-01-30 10:01"
                    }
              }
      ]
}
 ```
