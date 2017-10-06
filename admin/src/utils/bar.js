import Vue from 'vue'
import ProgressBar from '~c/ProgressBar.vue'
// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()

export default bar