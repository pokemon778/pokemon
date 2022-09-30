<template>
    <div class="home">
    <!--创建地图容器-->
      <div id="container" class="allmap"></div>
    </div>
  </template>
   
<script>
import { BMPGL } from "@/bmpgl.js"
export default {
    name: "home",
    data() {
        return {
            ak: "CEgGGRf3w3vaZYALybsrZ9kieSFO5W17", // 百度的地图密钥
            myMap: null
        };
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {
            // 传入密钥获取地图回调。
            BMPGL(this.ak).then((BMapGL) => {
                // 创建地图实例
                let map = new BMapGL.Map("container");
                // 创建点坐标 axios => res 获取的初始化定位坐标
                let point = new BMapGL.Point(114.031761, 22.542826)
                // 初始化地图，设置中心点坐标和地图级别
                map.centerAndZoom(point, 19)
                //开启鼠标滚轮缩放
                map.enableScrollWheelZoom(true)
                map.setHeading(64.5)
                map.setTilt(73)
                // 保存数据
                // this.myMap = map
                var marker = new BMapGL.Marker(point);  // 创建标注
                map.addOverlay(marker);
                var opts = {
                    width: 200,     // 信息窗口宽度
                    height: 100,     // 信息窗口高度
                    title: "故宫博物院", // 信息窗口标题
                    message: "这里是故宫"
                }
                var infoWindow = new BMapGL.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象 
                marker.addEventListener("click", function () {
                    map.openInfoWindow(infoWindow, point); //开启信息窗口
                });
            })
                .catch((err) => {
                    console.log(err)
                })
        },
    }
};
</script>
<style lang="scss" scoped>
.allmap {
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 1;
}
</style>
   