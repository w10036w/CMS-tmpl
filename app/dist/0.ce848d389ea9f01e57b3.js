webpackJsonp([0],{43:function(t,e,a){function r(t){a(73)}var i=a(1)(a(60),a(82),r,"data-v-b819842c",null);t.exports=i.exports},47:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["e","detail","tag","category"]}},48:function(t,e,a){e=t.exports=a(38)(void 0),e.push([t.i,".article-item{padding-bottom:20px;border-bottom:1px solid rgba(0,0,0,.2)}.article-item .meta b{color:#20a0ff}@media (min-width:769px){.article-item .meta{float:right;line-height:40px}}@media (max-width:768px){.article-item .meta{display:none}}",""])},49:function(t,e,a){var r=a(48);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(39)("03850013",r,!0)},50:function(t,e,a){function r(t){a(49)}var i=a(1)(a(47),a(51),r,null,null);t.exports=i.exports},51:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"article-item"},[a("div",{staticClass:"meta"},[t.category?[t._v("Under "),a("router-link",{attrs:{to:"/category/"+t.e.category.path}},[t._v(t._s(t.e.category.name))]),t._v(", on ")]:t._e(),t._v(t._s(t._f("fmtDateyymd")(t.e.createAt)))],2),a("h1",{staticClass:"title"},[a("router-link",{attrs:{to:"/article/"+t.e.path}},[t._v(t._s(t.e.title))])],1),t.tag?a("div",{staticClass:"tags"},t._l(t.article.tags,function(e){return a("router-link",{key:e._id,staticClass:"tag",attrs:{to:"/tag/"+e.path}},[t._v(t._s(e.name))])})):t._e(),t.detail?a("article",{staticClass:"md-body",domProps:{innerHTML:t._s(t.vhtml)}}):[a("div",{staticClass:"summary md-body",domProps:{innerHTML:t._s(t.e.summary)}}),a("router-link",{attrs:{to:"/article/"+t.e.path}},[t._v("Read More ...")])]],2)},staticRenderFns:[]}},52:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"foot-pager",props:["ctx","direct"]}},53:function(t,e,a){e=t.exports=a(38)(void 0),e.push([t.i,".foot-pager[data-v-0a3228ba]{position:relative;border-top:1px dashed rgba(0,0,0,.2);padding-left:20px;padding-right:20px;height:60px;line-height:60px}.foot-pager .direct[data-v-0a3228ba]{position:absolute;width:100px;text-align:center;height:60px;left:50%;margin-left:-50px}.foot-pager span[data-v-0a3228ba]{margin:7.5px 0;padding:4px;max-width:45%;font-size:.9em}",""])},54:function(t,e,a){var r=a(53);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(39)("58ff3c40",r,!0)},55:function(t,e,a){function r(t){a(54)}var i=a(1)(a(52),a(56),r,"data-v-0a3228ba",null);t.exports=i.exports},56:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"foot-pager pagination t-center"},[t.ctx[0]&&t.ctx[0].path?a("router-link",{staticClass:"prev left",attrs:{to:"/article/"+t.ctx[0].path}},[t._v("« "+t._s(t.ctx[0].title))]):t._e(),t.direct?a("router-link",{staticClass:"direct",attrs:{to:"/"}},[t._v("Home")]):t._e(),t.ctx[1]&&t.ctx[1].path?a("router-link",{staticClass:"next right",attrs:{to:"/article/"+t.ctx[1].path}},[t._v(t._s(t.ctx[1].title)+" »")]):t._e()],1)},staticRenderFns:[]}},60:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t){var e=t.store,a=t.route;d.default.start();var r=Math.floor(a.query.page)||1;e.dispatch("set_page",r);var i=Math.floor(a.query.limit)||20,s=(r-1)*i||0,o="/articles";return a.name.includes("Tag")?o+="/tag/"+a.params.path:a.name.includes("Category")&&(o+="/category/"+a.params.path),e.dispatch("fetch_articles",{pref:o,sort:"-createAt",skip:s,limit:i}).then(function(t){return d.default.finish()})}Object.defineProperty(e,"__esModule",{value:!0});var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},o=a(6),n=a(55),c=r(n),l=a(50),p=r(l),u=a(2),d=r(u);e.default={name:"view-articles",components:{ArticleItem:p.default,FootPager:c.default},asyncData:i,meta:function(){return{title:this.name+" | Arknodejs",description:"Sorted articles"}},computed:s({},(0,o.mapGetters)(["articles"]),{name:function(){return this.$route.name.substr(4)},type:function(){return"home"===this.name?"home":this.name.includes("Category")?"category":this.name.includes("Tag")?"tag":void 0},ctx:function(){var t=void 0,e=void 0,a=Math.floor(this.$route.query.page)||1;return 1!==a&&(t={title:"Page "+(a-1),path:"/?page="+(a-1)}),20===this.articles.length&&(e={title:"Page "+(a+1),path:"/?page="+(a+1)}),[t,e]}}),watch:{$route:function(){return i({store:this.$store,route:this.$route})}},mounted:function(){},methods:{}}},68:function(t,e,a){e=t.exports=a(38)(void 0),e.push([t.i,".view-articles .article-list[data-v-b819842c],.view-articles .block[data-v-b819842c]{padding-top:.1px}.view-articles .block[data-v-b819842c]{background-color:#f7f7f7;line-height:50px;height:50px;font-size:1.3em}.view-articles .block .primary[data-v-b819842c]{color:#20a0ff}.view-articles .block .success[data-v-b819842c]{color:#13ce66}",""])},73:function(t,e,a){var r=a(68);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(39)("090440da",r,!0)},82:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"view view-articles"},["tag"===t.type?a("div",{staticClass:"block t-center"},[t._v("Articles tagged with "),a("strong",{staticClass:"primary"},[t._v(t._s(t.$route.params.path))])]):"category"===t.type?a("div",{staticClass:"block t-center"},[t._v("Articles under category "),a("strong",{staticClass:"success"},[t._v(t._s(t.$route.params.path))])]):t._e(),a("div",{staticClass:"article-list pre-pager"},t._l(t.articles,function(e){return a("ArticleItem",{key:e._id,attrs:{category:"home"===t.type,e:e}})})),t.ctx[0]||t.ctx[1]?a("FootPager",{attrs:{ctx:"ctx"}}):t._e()],1)},staticRenderFns:[]}}});