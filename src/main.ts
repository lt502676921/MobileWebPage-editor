import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import store from "./store";

const app = createApp(App);

app.use(router);
app.use(Antd);
app.use(store);

app.mount("#app");