<template>
	<div class="addres">
		<ul class="addres-list">
		<li v-for="(item,index) in filterAddress" :class="{'active':item.isDefault}">
			<dl>
				<dt>
					<span class="name" v-text="item.userName"></span>
					<span class="tel">{{item.tel}}</span>
				</dt>
				<dd>{{item.streetName}}</dd>
				
			</dl>
			<div class="addr-opration addr-set-default" v-if="!item.isDefault">
                <span class="addr-set-default-btn" @click="setDefault(item)"><i>设为默认</i></span>
            </div>
            <div class="addr-opration addr-default" v-if="item.isDefault">默认地址</div>
		</li>
		<li class="more" @click="more" v-if="moreFlag">查看更多>></li>
		<li class="add-addres"><button class="btn btn-danger">添加新地址</button></li>
	</ul>
	</div>
</template>
<script>
	export default{
		name:'addres',
		data(){
			return{
				limtNum:3,
				addresList:[],
				moreFlag:true
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getAddres();
			})
		},
		methods:{
			getAddres(){
				this.$http.get('static/resource/addres.json').then((res)=>{
					this.addresList=res.data.result;
				})
			},
			setDefault(value){
				this.addresList.forEach((item,ind)=>{
					if(item.addressId==value.addressId){
						item.isDefault=true;
					}else{
						item.isDefault=false;
					}
				})
				setTimeout(()=>{
					this.$router.push({name:'pay',params:{addrlist:value}})
				},500)
			},
			more(){
				 this.moreFlag=false;
				 this.limtNum=this.addresList.length;
			}
		},
		computed:{
			filterAddress(){
				return this.addresList.slice(0,this.limtNum);
			}
		}
	}
</script>