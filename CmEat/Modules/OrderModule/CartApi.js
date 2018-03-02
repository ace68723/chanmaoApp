
const CartApi = {
    la_menu: [],
    la_cartItems: [],
    initMenu(){
      this.la_menu = [];
      this.la_cartItems = [];
    },
    saveMenu(menu){
      this.la_menu = menu
    },
    removeItem(item) {
        this.la_cartItems.splice(this.la_cartItems.findIndex(i => i === item), 1);
    },

    findItem(item) {
        return this.la_cartItems.find(cartItem => cartItem.id === item.id);
    },

    addItem (item){
      if(!item.tpgs){ //not have toping group
        const cartItem = this.findItem(item);
        if (!cartItem) { // create new item in la_cartItems
            this.la_cartItems = [...this.la_cartItems, Object.assign({ qty: 1, cid: this.la_cartItems.length + 1 }, item)];
        } else {
            this.increaseItem(cartItem)
        }
      } else { //have toping group, item must have qty
        let _cartItems = this.la_cartItems;
        if (item.cid) {
          _cartItems = this.la_cartItems.filter(function(_item) {
            return _item.cid != item.cid;
          });
        }
        this.la_cartItems = [..._cartItems, Object.assign({ cid: this.la_cartItems.length + 1 }, item)];
      }

    },

    // increaseItem(cartItem) { cartItem.qty++ },
    increaseItem(cartItem) {
      if ('qty' in cartItem) {
        cartItem.qty++;
      }else{
        cartItem.qty=1;
      }
    },
    decreaseItem(item) {
        if ('qty' in item) {
            const cartItem = this.findItem(item);
            let qty = cartItem.qty--;
            Object.assign({ qty: qty }, cartItem)

        }
    },

    cartTotals(qty = 0,total = 0) {
      try {
        this.la_cartItems.forEach(cartItem => {
            qty += cartItem.qty;
            total += cartItem.qty * cartItem.price;
        })
        total = total.toFixed(2);
        return { qty, total};
      } catch (e) {
        console.error(e)
      }

    },

    getMenu() {
        this.la_cartItems.map(cartItem => {

          if (cartItem.qty === 0) {
              this.removeItem(cartItem)
              delete this.la_menu.find(menuItem => menuItem.id === cartItem.id).qty;
          } else {
            this.la_menu.find(menuItem => menuItem.id === cartItem.id).qty = cartItem.qty;
          }
        });
        return this.la_menu;

        //old version for getMenu
        // return this.la_menu.map(item => {
        //     delete item.qty;
        //     return Object.assign({}, item, this.la_cartItems.find(cItem => cItem.id === item.id))
        // })
    },
    getFilteredMenu(filteredMenu) {
  
        // this.la_cartItems.map(cartItem => {
        //   if (cartItem.qty === 0) {
        //       this.removeItem(cartItem)
        //       delete this.la_menu.find(menuItem => menuItem.id === cartItem.id).qty;
        //   } else {
        //     this.la_menu.find(menuItem => menuItem.id === cartItem.id).qty = cartItem.qty;
        //   }
        // });
        // return this.la_menu;
        
      return filteredMenu;
        
        //old version for getMenu
        // return filteredMenu.map(item => {
        //     delete item.qty;
        //     return Object.assign({}, item, this.la_cartItems.find(cItem => cItem.id === item.id))
        // })
    },
}
export default CartApi;
