/*
 * @Author: JveGuo
 * @Date: 2017-08-24 23:04:12
 * @Last Modified by: JveGuo
 * @Last Modified time: 2017-08-28 14:59:09
 */

<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="seller-info">
				<div class="title">
					<span class="icon-img"></span>
					<span class="seller-name">{{seller.name}}</span>
				</div>
				<div class="peisong">
					{{seller.description}}/{{seller.deliveryTime}}送达
				</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon-img" v-bind:class="iconImgArr[seller.supports[0].type]"></span>
					<span class="support-text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showFixWrapper">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin" @click="showFixWrapper">
			<span class="icon-img"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background-img">
			<img :src="seller.avatar" alt="" width="100%">
		</div>
		<transition name="fade">
			<div v-show="showFix" class="fix-wrapper">
				<div class="detail-wrapper clearfix">
					<div class="main-content">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star v-bind:size="48" v-bind:score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="title-text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li v-for="(item,index) in seller.supports" class="item" :key="index">
								<span class="icon" :class="iconImgArr[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="title-text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="sellerinfo">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideFixWrapper">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import star from '../star/star';

export default {

	props: {
		seller: {
			type: Object
		}
	},
	data () {
		return {
			showFix: false
		};
	},
	methods: {
		showFixWrapper () {
			this.showFix = true;
		},
		hideFixWrapper () {
			this.showFix = false;
		}
	},
	created () {
		this.iconImgArr = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	components: {
		star
	}
};
</script>

<style lang="less">
@import '../../common/less/mixin.less';
.header {
	position: relative;
	width: 100%;
	color: #fff;
	background: rgba(7, 17, 27, 0.5);
	overflow: hidden;
	.content-wrapper {
		position: relative;
		padding: 24px 12px 18px 24px;
		font-size: 0;
		.avatar {
			display: inline-block;
			vertical-align: top;
			img {
				border-radius: 2px;
			}
		}
		.seller-info {
			display: inline-block;
			margin-left: 16px;
			.title {
				.icon-img {
					display: inline-block;
					vertical-align: top;
					width: 30px;
					height: 18px;
					background-size: 30px 18px;
					background-repeat: no-repeat;
					.bg-image('brand');
				}
				.seller-name {
					margin-left: 6px;
					font-size: 16px;
					font-weight: bold;
					line-height: 18px;
				}
			}
			.peisong {
				margin: 8px 0 10px;
				font-size: 12px;
				line-height: 12px;
			}
			.supports {
				.icon-img {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 4px;
					background-size: 12px;
					&.special {
						.bg-image('special_1');
					}
					&.decrease {
						.bg-image('decrease_1');
					}
					&.discount {
						.bg-image('discount_1');
					}
					&.guarantee {
						.bg-image('guarantee_1');
					}
					&.invoice {
						.bg-image('invoice_1');
					}
				}
				.support-text {
					font-size: 10px;
					line-height: 12px;
				}
			}
		}
		.support-count {
			position: absolute;
			right: 12px;
			bottom: 14px;
			padding: 0 8px;
			height: 24px;
			line-height: 24px;
			background: rgba(0, 0, 0, 0.2);
			text-align: center;
			border-radius: 14px;
			.count {
				font-size: 10px;
				vertical-align: top;
			}
			.icon-keyboard_arrow_right {
				margin-left: 2px;
				line-height: 24px;
				font-size: 10px;
			}
		}
	}
	.bulletin {
		position: relative;
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background: rgba(7, 17, 27, 0.2);
		.icon-img {
			display: inline-block;
			vertical-align: top;
			margin-top: 8px;
			width: 22px;
			height: 12px;
			.bg-image('bulletin');
			background-size: 22px 12px;
			background-repeat: no-repeat;
		}
		.bulletin-text {
			vertical-align: top;
			margin-left: 4px;
			font-size: 10px;
		}
		.icon-keyboard_arrow_right {
			position: absolute;
			right: 12px;
			top: 8px;
			font-size: 10px;
		}
	}
	.background-img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	.fix-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background: rgba(7, 17, 27, 0.8);
		z-index: 100;
		backdrop-filter: blur(10px);
		&.fade-enter-active, &.fade-leave-active{
			transition: all 0.5s ease;
		}
		&.fade-enter, &.fade-leave-active{
			opacity: 0;
			background: rgba(7, 17, 27, 0)
		}
		.detail-wrapper {
			min-height: 100%;
			width: 100%;
			.main-content {
				margin-top: 64px;
				padding-bottom: 64px;
				.name {
					line-height: 16px;
					text-align: center;
					font-size: 16px;
					font-weight: 700;
				}
				.star-wrapper{
					margin-top: 16px;
					text-align: center;
					padding: 2px 0;
				}
				.title{
					display: flex;
					width: 80%;
					margin: 30px auto 24px;
					.line{
						flex: 1;
						position: relative;
						top: -6px;
						border-bottom: 1px solid rgba(255, 255, 255, 0.2);
					}
					.title-text{
						padding: 0 12px;
						font-size: 14px;
						font-weight: 700;
					}
				}
				.supports{
					width: 80%;
					margin: 0 auto;
					.item{
						padding: 0 12px;
						margin-bottom: 12px;
						font-size: 0;
						&:last-child{
							margin-bottom: 0;
						}
						.icon{
							display: inline-block;
							vertical-align: top;
							width: 16px;
							height: 16px;
							margin-right: 6px;
							background-size: 16px 16px;
							background-repeat: no-repeat;
							&.special {
								.bg-image('special_2');
							}
							&.decrease {
								.bg-image('decrease_2');
							}
							&.discount {
								.bg-image('discount_2');
							}
							&.guarantee {
								.bg-image('guarantee_2');
							}
							&.invoice {
								.bg-image('invoice_2');
							}
						}
						.text{
							font-size: 12px;
							line-height: 16px;
						}
					}
				}
				.sellerinfo{
					width: 80%;
					margin: 0 auto;
					.content{
						padding: 0 12px;
						font-size: 12px;
						line-height: 24px;
					}
				}
			}
		}
		.detail-close {
			position: relative;
			height: 32px;
			width: 32px;
			margin: -64px auto 0;
			clear: both;
			font-size: 32px;
		}
	}
}
</style>
