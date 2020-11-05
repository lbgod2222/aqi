<template>
    <div>
        <h1>This shall be a map</h1>
        <!-- 用户地域选择完毕后再初始化地图 -->
        <div class="map_container mt-md">
            <div id="l-map"></div>
            <!-- <el-button type="info" @click="this.switch" >取消</el-button> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'aoiMap',
    props: {
        containId: {
            type: String,
            default: ''
        },
        provinceName: {
            type: String,
            default: ''
        },
        cityName: {
            type: String,
            default: ''
        },
        districtName: {
            type: String,
            default: ''
        },
        pos: {
            type: Object,
            default: () => ({
                lngBaidu: 0,
                latBaidu: 0
            })
        }
        // hint: {
        //     type: Object,
        //     default: {}
        // }
    },
    data() {
        return {
            hint: {
                province: '北京省',
                city: '北京市',
                district: '白云区'
            }
        }
    },
    mounted () {
        this.initSearch()
        setTimeout(() => {
            this.hint.province = '北京'
        }, 10000)
    },
    methods: {
        initSearch () {
            // 百度地图API功能
            function G(id) {
                return document.getElementById(id);
            }

            this.hint.province = this.provinceName || '北京市'
            this.hint.city = this.cityName
            this.hint.district = this.districtName

            var map = new window.BMap.Map("l-map", {enableMapClick: false});
            let initPoi = new window.BMap.Marker({
                lng: this.pos.lngBaidu,
                lat: this.pos.latBaidu
            })
            map.addOverlay(initPoi)
            map.centerAndZoom(this.hint.province,15);                   // 初始化地图,设置城市和地图级别。

            var opts = {    
                width : 250,     // 信息窗口宽度    
                height: 100,     // 信息窗口高度    
                title : "本地AQI"  // 信息窗口标题   
            }    
            // var infoWindow = new BMap.InfoWindow("59", opts);  // 创建信息窗口对象    

            map.addEventListener("click", function(args){    
                // alert("您点击了地图。");
                let poi = args.point
                console.log(arguments);
                getAqi(poi)
                // map.openInfoWindow(infoWindow, poi);
            })

            let inputComp = G(this.containId)
            // console.log('G result', inputComp)
            inputComp.addEventListener("input", function(e) {
                console.log('LISTENER:', e)
            })

            var myValue;

            function getCenterPoi () {
                return map.getBounds().getCenter()
            }

            function setPlace(){
                map.clearOverlays();    //清除地图上所有覆盖物
                function myFun(){
                    var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                    let point = new window.BMap.Marker(pp)
                    console.log(point)
                    map.centerAndZoom(pp, 18);
                    map.addOverlay(point);    //添加标注
                    point.enableDragging();  
                }
                var local = new window.BMap.LocalSearch(map, { //智能搜索
                    onSearchComplete: myFun
                });
                local.search(myValue);
            }

            function getAqi(poi) {
                let result = new Promise((resolve, reject) => {
                    let num = Math.random()*100
                    setTimeout(() => {
                        resolve({
                            aqi: String(parseInt(num))
                        })
                    }, 300);
                })

                result.then(result => {
                    console.log(result);
                    var infoWindow = new BMap.InfoWindow(result.aqi, opts); 
                    map.openInfoWindow(infoWindow, poi);
                })
            }
        }
    },
    watch: {
        hint () {
            this.initSearch()
        }
    },
}
</script>

<style>
    .map_container #l-map {
        width: 100%;
        height: 600px;
    }   
</style>