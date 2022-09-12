<template>
  <div class="container">
    <div style="display: flex">
      <!-- Button trigger modal -->

      <div class="col-sm-10 total">
        <h1>合計:{{ total }}</h1>
        <div v-if="store.currentOrder.value != null">
          訂單編號({{ store.currentOrder.value.orderId }})
          {{
            store.currentOrder.value.status == 0
              ? "未付款"
              : store.currentOrder.value.status == 1
              ? "已付款"
              : "餐點已完成"
          }}
        </div>
      </div>
      <div style="col-sm-2" v-if="status == 1">
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#orderStatus"
        >
          餐點詳情
        </button>
      </div>
      <!-- <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        查看明細
      </button> -->

      <!-- Modal -->
      <div v-if="store.currentOrder.value">
        <div
          class="modal fade"
          id="orderStatus"
          tabindex="-1"
          aria-labelledby="orderStatusModelLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="orderStatusModelLabel">
                  餐點詳情 訂單編號({{ store.currentOrder.value.orderId }})
                  {{
                    store.currentOrder.value.status == 0
                      ? "未付款"
                      : store.currentOrder.value.status == 1
                      ? "已付款"
                      : "餐點已完成"
                  }}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <template v-for="dish in store.currentOrder.value.data">
                  <div>
                    <div class="col-sm-4">{{ dish.name }} x {{ dish.num }}</div>
                    <!-- <div class="col-sm-8" style="left: 70%:">
                      餐點狀況:
                      <span class="{ dish.status == 0 ? notyet : done}">
                        {{ dish.status == 0 ? "未出餐" : "已出餐" }}
                      </span>
                    </div> -->
                  </div>
                </template>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="cancel"
                >
                  取消
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="submitPayment"
                  v-if="store.currentOrder.value.status == 0"
                >
                  付款
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="col-sm-2" v-if="status == 0">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          查看明細
        </button>
      </div>
      <!-- <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        查看明細
      </button> -->

      <!-- Modal -->
      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="orderModelLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="orderModelLabel">餐點明細</h5>
                <button
                  id="btn-close"
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <template v-for="dish in order.dish">
                  <div>
                    {{ dish.name }} x {{ dish.num }} = {{ dish.price * dish.num }}
                  </div>
                </template>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  取消
                </button>
                <button type="button" class="btn btn-primary" @click="submitOrder">
                  送出訂單
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <template v-for="data in list">
      <TheDish
        :image="data['image']"
        :name="data['name']"
        :desc="data['desc']"
        :price="data['price']"
        @order-dish="(num, name, dish) => orderDish(num, name, dish)"
      ></TheDish>
    </template>
  </div>
</template>

<script setup>
import { api } from "../apiRequset.js";
import TheDish from "../components/TheDish.vue";
import { ref, onMounted, reactive } from "vue";
import { store } from "../store";
import { websocket } from "../websocket";
import axios from "axios";
const list = ref(null);
const total = ref(0);
const status = ref(0);
const order = reactive({
  dish: [],
});
api.getMenu().then((response) => {
  list.value = response.data.data;
});
function orderDish(num, name, price) {
  order.dish = order.dish.filter((t) => t.name !== name);
  if (num > 0) {
    order.dish.push({ name: name, price: price, num: num });
  }
  total.value = 0;
  order.dish.forEach(function (d) {
    total.value = total.value + d.price * d.num;
  });
}

function submitOrder() {
  let tmp = JSON.stringify(order.dish);
  websocket.methods.websocketsend(tmp);
  document.getElementById("btn-close").click();
  status.value = 1;
}
function submitPayment() {
  api.submitPayment(store.currentOrder.value.orderId).then((response) => {
    let tmpwin = window.open(response.data.url);
  });
}
function cancel() {
  status.value = 0;
}
</script>

<style scoped>
.total {
  font-size: 0.1rem;
  font-family: "微軟正黑體";
  font-weight: bold;
}

.done {
  color: greenyellow;
}
.notyet {
  color: palevioletred;
}
</style>
