<template>
	<div class="pay">
		<div class="addres">
        <div class="add-addres" v-if="addFlag">
        	<router-link to='/addres'>添加地址<i class="icon arrow"></i></router-link>
        </div>
    	<div v-if="!addFlag">
        	<p>{{addresShow.streetName}}</p>
        	<p>{{addresShow.userName}}<span class="right">{{addresShow.tel}}</span></p>
     </div>
  </div>
  <div class="order">
    <div class="order-title">详细列表</div>
    <div v-if="showlist" class="no">暂无商品<router-link to="/">返回添加</router-link></div>
    <ul class="order-list" v-if="!showlist">
      <li v-for="(item,key) in payDate">
        <span><img :src="item.productImage"></span>
        <span>{{item.productName}}</span>
        <span>×{{item.productQuentity}}</span>
        <span>{{item.productPrice|formatmoney}}</span>
      </li>      
    </ul>
  </div>
  <div class="settlement">
    <div class="settlement_left">
     <span class="total_txt">总计：</span>
     <span class="total_num">{{totalPrice|formatmoney}}</span>
    </div>
    <div class="settlement_right">
        <a href="#" class="oconfirm" @click.prevent='submit()'>提交订单</a>
    </div>
  </div>
  <!--  弹窗-->
  <transition name="fade">	
  <div class="modal" v-if="modalShow" @click="modalShow=false">
  	<div class="modal-container">
  		<p>提交成功</p>
  	</div>
  </div>
  </transition>
	</div>
</template>
<script>
	export default {
		name:'pay',
		data(){
			return{
				addFlag:true,
				showlist:true,
				modalShow:false,
				payDate:[],
				addresShow:[]
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
		      this.payDate.forEach((item,ind)=>{
		        if(item.ischecked){
		          total+=item.productPrice*item.productQuentity;
		        }
		      })
		      return total;
		    }
		 },
		mounted(){
			this.$nextTick(()=>{
				this.getPayDate()
			})
		},
		methods:{
			getPayDate(){

				if(this.$route.params.addrlist==undefined){
					var addres=JSON.parse(localStorage.getItem('addres'));
					if(addres){
						this.addresShow=addres;
						this.addFlag=false;
					}
					else{
						this.addFlag=true;
					}
				}else{
					this.addFlag=false;
					this.addresShow=this.$route.params.addrlist;
					localStorage.setItem('addres',JSON.stringify(this.addresShow))
				}
				if(this.$route.params.cartchk==undefined){
					var carlist=JSON.parse(localStorage.getItem('carlist'));
					if(carlist){
						this.payDate=carlist;
						this.showlist=false;
					}
					else{
						this.showlist=true;
					}
				}else{
					this.showlist=false;
					this.payDate=this.$route.params.cartchk;	
					localStorage.setItem('carlist',JSON.stringify(this.payDate));		
				}
				
			},
			submit(){
				this.modalShow=true;
			}
		}
	}
</script>
<style scoped>
	.modal{
		background-color: rgba(0,0,0,0.6);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.modal-container{
		width: 200px;
		height: 80px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -100px;
		margin-top:-40px;
		background-color: #fff;
		border-radius:5px;
	}
	.modal-container p{
		text-align: center;
		padding-top: 20px;
		line-height: 30px;
		font-size: 14px;
	}
	.fade-enter-active,.fade-leave-active{
		transition: opacity .5s;
	}
	.fade-enter,.fade-leave-active{
		opacity:0;
	}
</style>