setPosition(){

  if(_scrollY != this.state.scrollY._value ){

     if(this.state.scrollY._value<=200){

         _scrollY = this.state.scrollY._value;

         _forEach(this.scrollViewRefs,(ref,index)=>{
           if(ref.index != this.state.currentTab){
             this.scrollViewRefs[ref.index].scrollView.scrollTo({y: this.state.scrollY._value,animated:false});
           }
         })

     }else {
       _forEach(this.scrollViewRefs,(ref,index)=>{
         if(ref.index != this.state.currentTab){
           this.scrollViewRefs[ref.index].scrollViewContent.measure((ox, oy, width, height, px, py) => {
             if(py>40 ){
               this.scrollViewRefs[ref.index].scrollView.scrollTo({y: 200,animated:false});
             }
            });
         }
       })
     }
  }
}
