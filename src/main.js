import {createApp} from 'vue';
import App from './App.vue';
import './assets/css/index.css';
import router from './router/index.js';
import {createPinia} from 'pinia';
import {createAuth0} from '@auth0/auth0-vue';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {watch} from 'vue';
library.add(faArrowLeft, faArrowRight);

const auth0Config = {
  domain: 'dev-vwdmne90.au.auth0.com',
  client_id: 'y6Fs8XHfSp2JPTtd8HqPRowCoBPB7TA5',
  redirect_uri: window.location.origin,
};
const pinia = createPinia();

if (localStorage.getItem('state')) {
  pinia.state.value = JSON.parse(localStorage.getItem('state'));
}
watch(
  pinia.state,
  (state) => {
    localStorage.setItem('state', JSON.stringify(state));
  },
  {deep: true}
);
const app = createApp(App).use(router).use(pinia).use(createAuth0(auth0Config));

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
