<template>
  <div class="cart">
    <div class="e_head">
    <div class="lf"><input type="radio" id="radio" ><label for="radio" :class="{'check':checkAll}" @click="selectAll()">全选</label></div>
    </div>
    <div class="obox">
   <ul class="buy-list" v-if="mydata.length!=0">
    <li v-for="(item,key) in mydata">
      <div class="list-item">
      <div class="p">
        <input type="radio" id="radio">
        <label for="radio" :class="{check:item.ischecked}" @click="selectOne(item)"></label>
        <a href=""><img :src="item.productImage"></a>
      </div>
      <div class="d">
        <a href="">
          <h3>{{item.productName}}</h3>
          <p class="summy">{{item.discrib}}</p>
       </a>
        <p class="d-price">
           <span class="price-num">{{item.productPrice|formatmoney}}</span>
           <span class="count">
             <input class="minus" type="button" value="-" @click="change(item,-1)">
             <input class="num" type="text" v-model="item.productQuentity">
             <input class="add" type="button" value="+" @click="change(item,1)">
           </span>
       </p>
      </div>
      </div>
      <div class="item-include">
          <dl>
            <dt>赠送:</dt> 
            <dd v-for="v in item.parts">
                <span>{{v.partsName}}</span>
            </dd>
          </dl>
        </div>
    </li>
    
   </ul>
  </div>
  <div class="settlement">
    <div class="settlement_left">
     <span class="total_txt">总计：</span>
     <span class="total_num">{{totalPrice|formatmoney}}</span>
    </div>
    <div class="settlement_right">
        <span class="oconfirm" @click='pay()'>去结账</span> 

    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      mydata:[],
      checkAll:false
    }
  },
  filters:{
    formatmoney(value){
      return '￥'+value.toFixed(2)+'元';
    }
  },
  computed:{
    totalPrice(){
      var total=0;
      this.mydata.forEach((item,ind)=>{
        if(item.ischecked){
          total+=item.productPrice*item.productQuentity;
        }
      })
      return total;
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      this.getCartList()
    })
  },
  methods:{
    getCartList(){
        this.$http.get('static/resource/cartData.json').then(function(res){
           this.mydata=res.data.result.list;
      })
     },
     setAttr(type){
      this.mydata.forEach((item,ind)=>{
          if(typeof item.ischecked=='undefined'){
            this.$set(item,'ischecked',type)
          }else{
            item.ischecked=type;
          }
        })
     },
    selectOne(item){ 
      if(typeof item.ischecked=='undefined'){
            this.$set(item,'ischecked',true)
      }else{
        item.ischecked=!item.ischecked;
      } 
      let flag=true;
      this.mydata.forEach((value,ind)=>{
        if(!value.ischecked){
          flag=false;
        }
      })
      if(!flag){
        this.checkAll=false;
      }else{
        this.checkAll=true;
      }  
      
    },
    selectAll(){
      this.checkAll=!this.checkAll;
      if(this.checkAll){
        this.setAttr(true);
      }else{
        this.setAttr(false);
      }
    },
    pay(){
      let checkArr=[];
      this.mydata.forEach((item,ind)=>{
        if(item.ischecked){
          checkArr.push(item)
          this.$router.push({name:'pay',params:{cartchk:checkArr}})
        }
      })
     
    },
    change(item,way){
      if(way>0){
        item.productQuentity++;
      }else{
        item.productQuentity--;
        if(item.productQuentity<1)
          item.productQuentity=1;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

