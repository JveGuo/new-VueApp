<template>
	<div id="app">
		<vheader></vheader>
		<div class="tab">
			<div class="item-tab">
				<router-link to="/foods">商品</router-link>
			</div>
			<div class="item-tab">
				<router-link to="/ratings">评论</router-link>
			</div>
			<div class="item-tab">
				<router-link to="/seller">商家</router-link>
			</div>
		</div>
		<router-view></router-view>
		<!-- <div class="content">
			content
		</div> -->
	</div>
</template>

<script>
//	import header from 'components/header/header';
import header from '@/components/header/header';
export default {
	components: {
		'vheader': header
	}
};
</script>

<style lang="less">
@tab-height: 40px; //tab 高度
#app {
	width: 100%;
	.tab {
		display: flex;
		width: 100%;
		height: @tab-height;
		line-height: @tab-height;
		.item-tab {
			flex: 1;
			text-align: center;
		}
	}
}
</style>
