import Vue from 'vue'
import ProgressBar from './components/ProgressBar'
// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()

export default bar