import { store } from "./store";
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import Stomp from "webstomp-client";
// const websocketUrl = `wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self`;
const websocketUrl = `ws://system-to-order.herokuapp.com/`
export const websocket = {
    data(){
        return{
            ws: null,
        }
    },
    created(){
       //頁面剛進入時開啟長連線
       this.methods.initWebsocket()
   },
   destroyed: function() {
   //頁面銷燬時關閉長連線
      this.websocketclose();
    },
    methods:{
        //初始websocket
        initWebsocket(){
            this.socket = new SockJS("https://system-to-order.herokuapp.com/ws");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(// headers头部信息。可添加客户端的认证信息。也可以不添加信息，headers 直接就设置为 {}
                header => {},
                frame => {
                  // 连接成功： 订阅服务器的地址。为了浏览器可以接收到消息，必须先订阅服务器的地址
                //   this.stompClient.subscribe('/topic/updateService', function (data) {
                //     console.log(data);
                // });
                this.stompClient.subscribe('/user/client/bind', function (data) {
                    store.currentOrder.value = JSON.parse(data.body)
                });
                this.stompClient.subscribe('/user/client/statusChange', function (data) {
                    let result =  JSON.parse(JSON.stringify(store.currentOrder.value))
                    let d = JSON.parse(data.body)
                    result.status = d.status
                    store.currentOrder.value = result
                });
                this.stompClient.subscribe('/topic/submitOrder', function (data) {
                    store.currentOrder = JSON.parse(data)
                });
                // this.stompClient.send("/app/testMsg", {}, JSON.stringify({'clientId': "jjj"}));
                //   this.connectSucceed()
                }, err => {
                    this.initWebsocket
                  // 连接失败的回调
                  console.log('err')
                //   this.reconnect(this.socketUrl, this.connectSucceed)
                });
                // this.stompClient.send("/client/bind", {}, JSON.stringify({'clientId': "jjj"}));
                // this.stompClient.subscribe('/client/bind/fff', function (greeting) {
                //     console.log(greeting)
                //     // showGreeting(JSON.parse(greeting.body).content);
                // });
            // this.ws = new WebSocket(socket); //建立連線
            // this.ws.onopen = this.websocketonopen;
            // this.ws.error = this.websocketonerror;
            // this.ws.onmessage = this.websocketonmessage;
            // this.ws.onclose = this.websocketclose;
        },
        websocketonopen(){
            console.log('ws 連線成功~~');
        },
        websocketonerror(e){
            console.error('ws 連線失敗',e);
        },
        websocketonmessage(e){
            console.log('websocketonmessage')
          console.log(e.data)
          store.currentOrder.push(e.data)
            // 後端通知前端，前端取得資料
            // let _data = e.data;
            // //當有後端資料送到前端，利用vuex存到共用的state
            // this.setWsNotify({
            //     id:uuid.v4(), 
            //     data: JSON.parse(_data)
            // });
            return e
          
        },
        websocketsend(data,topic = "/submitOrder"){
            this.stompClient.send("/app"+topic,data);
            //前端丟資料
            console.log('send data',data);
        },
        websocketclose(){
            console.log('ws 關閉連線')
        }
    }
}