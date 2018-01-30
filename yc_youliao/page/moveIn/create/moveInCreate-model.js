import { Base } from '../../../resource/utils/base.js'
import { getLocation, getUserInfo, getImageSocket } from '../../../resource/utils/comment.js'
const app = getApp()
class Create extends Base {
	constructor() {
		super()
	}

	getSeid(callback) {
	    this.store({ type: 'GET_SEID' }, (seid) => {
	        callback(seid)
	    })
	}

	// 请求地址
    getDetailLocation(nowLocation, callback) {
	    var param = {
	        url: 'entry/wxapp/GetLaction',
	        data: nowLocation,
	        sCallback: function (res) {
		        callback && callback(res.data.data)
	        }
	    }
	    this.request(param)
    }

	/*得到首页信息*/
	getIndexData(callback) {
		this._indexGetLocation((location) => {
			let data = {}
			if (location) {
				data.lat = location.latitude
				data.lng = location.longitude
			}

		    app.util.getUserInfo((userInfo) => {
				if (userInfo.memberInfo.uid) {
				    data.uid = userInfo.memberInfo.uid
				}
				var param = {
				    url: 'entry/wxapp/GetIndex',
				    data,
				    sCallback: (res) => {
						wx.setStorage({
						  key: "index",
						  data: res
						})
						callback && callback(res.data.data)
				    }
				}
				this.request(param)
		    })
		})
	}

	// 请求地址
    getDetailLocation(nowLocation, callback) {
	    var param = {
	        url: 'entry/wxapp/GetLaction',
	        data: nowLocation,
        	sCallback: function (res) {
		        callback && callback(res.data.data)
	        }
	    }
	    this.request(param)
    }

	getShop(id,cb) {
        let data = {}
        this.store({ type: 'GET_SEID' }, (seid) => {
            data.seid = seid
            data.shop_id = id
            var param = {
                url: 'entry/wxapp/getShop',
                data,
                sCallback: (res) => {
                    cb && cb(res.data.data)
                }
            }
            this.request(param)
        })
    }

	submit(form,cb){
		let data = {}
		data.logo = form.logo[0]
		if(form.imgUrl && form.imgUrl.length){
			data['imgUrl'] = form.imgUrl.join(',')
		}
		if(form.inco && form.inco.length){
			data['inco'] = form.inco.join(',')
		}
		if(form.shop_id){
			data.shop_id = form.shop_id
			data.logo = form.logo
		}
		this.store({ type: 'GET_SEID' }, (seid) => {
            data.seid = seid
            data.shop_name = form.shop_name
            data.telphone = form.telphone
            data.lat = form.lat
            data.lng = form.lng
            data.opendtime = form.opendtime
            data.intro = form.intro
            data.address = form.address
            data.cate_id = form.cate_id
			
			var param = {
			    url: 'entry/wxapp/AddShopInfo',
			    type: 'post',
			    data,
			    sCallback: (res) => {
					cb && cb(res.data)
			    }
			}
			this.request(param)
	    })
	}

    // 请求图片socket
	getAttachurl(callback) {
		getImageSocket((data) => {
		    callback(data)
		})
	}

    // 获取用户信息
    indexGetUserInfo() {
		// getUserInfo(true, (res) => {
		  // console.log(res)
		// })
    }

	// 获取经纬度信息
	_indexGetLocation(callback) {
		getLocation(false, (res) => {
		  callback(res)
		})
	}


}



export { Create }