export default  {
  getDefaultData(){
    const url = 'https://www.chanmao.ca';

    // let options = {
    //     method: 'GET',
    //     mode:'cors',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // }
    //
    // options.headers = Object.assign(options.headers,{
    //     // authortoken: io_data.authortoken,
    // })
    //
    // options.body = JSON.stringify({
    //   // iv_lastid: io_data.iv_lastid,
    // })


  //   return fetch(url,options)
  //           .then((res) => res.json())
  //           .catch((error) => {throw error})
    items = [
      {"obid": 125,
        "created": 1497451917,
        "delifee": 5,
        "total": 120.99,
        "status": "待发货",
        "boxes": [{"bbid": 12346,
                   "prod_list": [{"pbid": 4, "fullname": "浪味仙-田园蔬菜口味(42g)", "amount": 10, "price": 7.59, "imgSource": "4.png"},
                                {"pbid": 3, "fullname": "张君雅", "amount": 20, "price": 4.9, "imgSource": "3.png"}],
                   "trace": {"accepted": 1497451917, "packed": 1497451200, "distributed": 0, "delivered": 0, "completed": 0}}]},
      {"obid": 126,
        "created": 1482385473,
        "delifee": 5,
        "total": 120.99,
        "status": "待发货",
        "boxes": [{"bbid": 12347, "prod_list": [{"pbid": 4, "fullname": "浪味仙-田园蔬菜口味(42g)", "amount": 10, "price": 7.59, "imgSource": "4.png"},
          {"pbid": 5, "fullname": "SAMYANG 辣鸡面(140g*5*)", "amount": 20, "price": 4.99, "imgSource": "5.png"}],
          "trace": {"accepted": 1497385473, "packed": 0, "distributed": 0, "delivered": 0, "completed": 0}},

          {"bbid": 12348, "prod_list": [{"pbid": 1, "fullname": "卡迪那", "amount": 10, "price": 7.59, "imgSource": "1.png"},
            {"pbid": 3, "fullname": "张君雅", "amount": 20, "price": 4.99, "imgSource": "3.png"}],
            "trace": {"accepted": 1497451917, "packed": 1497451200, "distributed": 0, "delivered": 0, "completed": 0}}]},
      {"obid": 127,
        "created": 1477385473,
        "delifee": 5,
        "total": 120.99,
        "status": "待发货",
        "boxes": [{"bbid": 12349, "prod_list": [{"pbid": 4, "fullname": "浪味仙-田园蔬菜口味(42g)", "amount": 10, "price": 7.59, "imgSource": "4.png"},
          {"pbid": 5, "fullname": "SAMYANG 辣鸡面(140g*5*)", "amount": 20, "price": 4.99, "imgSource": "5.png"}],
          "trace": {"accepted": 1497385473, "packed": 0, "distributed": 0, "delivered": 0, "completed": 0}},

          {"bbid": 12350, "prod_list": [{"pbid": 1, "fullname": "卡迪那", "amount": 10, "price": 7.59, "imgSource": "1.png"},
            {"pbid": 3, "fullname": "张君雅", "amount": 20, "price": 4.99, "imgSource": "3.png"}],
            "trace": {"accepted": 1497451917, "packed": 1497451200, "distributed": 0, "delivered": 0, "completed": 0}},

          {"bbid": 12351, "prod_list": [{"pbid": 2, "fullname": "大白兔", "amount": 10, "price": 4.59, "imgSource": "2.png"}],
            "trace": {"accepted": 1497451917, "packed": 1497451200, "distributed": 0, "delivered": 0, "completed": 0}}]}
      ];
      return items;
  },
}
