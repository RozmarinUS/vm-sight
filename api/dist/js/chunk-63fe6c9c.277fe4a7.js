(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63fe6c9c"],{"0fd9":function(t,e,r){"use strict";r("4b85");var n=r("2b0e"),a=r("d9f7"),i=r("80d2");const s=["sm","md","lg","xl"],o=["start","end","center"];function l(t,e){return s.reduce((r,n)=>(r[t+Object(i["E"])(n)]=e(),r),{})}const c=t=>[...o,"baseline","stretch"].includes(t),d=l("align",()=>({type:String,default:null,validator:c})),u=t=>[...o,"space-between","space-around"].includes(t),h=l("justify",()=>({type:String,default:null,validator:u})),f=t=>[...o,"space-between","space-around","stretch"].includes(t),p=l("alignContent",()=>({type:String,default:null,validator:f})),g={align:Object.keys(d),justify:Object.keys(h),alignContent:Object.keys(p)},v={align:"align",justify:"justify",alignContent:"align-content"};function m(t,e,r){let n=v[t];if(null!=r){if(e){const r=e.replace(t,"");n+="-"+r}return n+="-"+r,n.toLowerCase()}}const b=new Map;e["a"]=n["default"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...h,alignContent:{type:String,default:null,validator:f},...p},render(t,{props:e,data:r,children:n}){let i="";for(const a in e)i+=String(e[a]);let s=b.get(i);if(!s){let t;for(t in s=[],g)g[t].forEach(r=>{const n=e[r],a=m(t,r,n);a&&s.push(a)});s.push({"no-gutters":e.noGutters,"row--dense":e.dense,["align-"+e.align]:e.align,["justify-"+e.justify]:e.justify,["align-content-"+e.alignContent]:e.alignContent}),b.set(i,s)}return t(e.tag,Object(a["a"])(r,{staticClass:"row",class:s}),n)}})},1148:function(t,e,r){"use strict";var n=r("a691"),a=r("1d80");t.exports="".repeat||function(t){var e=String(a(this)),r="",i=n(t);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(r+=e);return r}},"1a10":function(t,e,r){},"1f4f":function(t,e,r){"use strict";r("8b37");var n=r("80d2"),a=r("7560"),i=r("58df");e["a"]=Object(i["a"])(a["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes(){return{"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom,...this.themeClasses}}},methods:{genWrapper(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(n["g"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},"1fb8":function(t,e,r){"use strict";r("1a10")},"25f0":function(t,e,r){"use strict";var n=r("6eeb"),a=r("825a"),i=r("d039"),s=r("ad6d"),o="toString",l=RegExp.prototype,c=l[o],d=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),u=c.name!=o;(d||u)&&n(RegExp.prototype,o,(function(){var t=a(this),e=String(t.source),r=t.flags,n=String(void 0===r&&t instanceof RegExp&&!("flags"in l)?s.call(t):r);return"/"+e+"/"+n}),{unsafe:!0})},"297c":function(t,e,r){"use strict";var n=r("2b0e"),a=r("37c6");e["a"]=n["default"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:this.$slots.progress||this.$createElement(a["a"],{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},"37c6":function(t,e,r){"use strict";var n=r("8e36");e["a"]=n["a"]},"408a":function(t,e,r){var n=r("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("1d80"),a=r("5899"),i="["+a+"]",s=RegExp("^"+i+i+"*"),o=RegExp(i+i+"*$"),l=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(s,"")),2&t&&(r=r.replace(o,"")),r}};t.exports={start:l(1),end:l(2),trim:l(3)}},"615b":function(t,e,r){},"62ad":function(t,e,r){"use strict";r("4b85");var n=r("2b0e"),a=r("d9f7"),i=r("80d2");const s=["sm","md","lg","xl"],o=(()=>s.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),l=(()=>s.reduce((t,e)=>(t["offset"+Object(i["E"])(e)]={type:[String,Number],default:null},t),{}))(),c=(()=>s.reduce((t,e)=>(t["order"+Object(i["E"])(e)]={type:[String,Number],default:null},t),{}))(),d={col:Object.keys(o),offset:Object.keys(l),order:Object.keys(c)};function u(t,e,r){let n=t;if(null!=r&&!1!==r){if(e){const r=e.replace(t,"");n+="-"+r}return"col"!==t||""!==r&&!0!==r?(n+="-"+r,n.toLowerCase()):n.toLowerCase()}}const h=new Map;e["a"]=n["default"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...o,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:r,children:n,parent:i}){let s="";for(const a in e)s+=String(e[a]);let o=h.get(s);if(!o){let t;for(t in o=[],d)d[t].forEach(r=>{const n=e[r],a=u(t,r,n);a&&o.push(a)});const r=o.some(t=>t.startsWith("col-"));o.push({col:!r||!e.cols,["col-"+e.cols]:e.cols,["offset-"+e.offset]:e.offset,["order-"+e.order]:e.order,["align-self-"+e.alignSelf]:e.alignSelf}),h.set(s,o)}return t(e.tag,Object(a["a"])(r,{class:o}),n)}})},"6ece":function(t,e,r){},7156:function(t,e,r){var n=r("861d"),a=r("d2bb");t.exports=function(t,e,r){var i,s;return a&&"function"==typeof(i=e.constructor)&&i!==r&&n(s=i.prototype)&&s!==r.prototype&&a(t,s),t}},"72e2":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",[t.endpoint&&t.endpoint.Snapshot.Swarm?r("v-col",{attrs:{cols:12}},[r("v-card",[r("v-card-subtitle",{staticClass:"font-weight-medium",staticStyle:{color:"#333",background:"#f6f6f6"}},[t._v(" "+t._s(t.__("information"))+" ")]),r("v-divider"),r("v-card-text",[t._v(" VM-SIGHT is connected to a node that is part of a Swarm cluster. Some resources located on other nodes in the cluster might not be available for management. ")])],1)],1):t._e(),r("v-col",{attrs:{cols:12}},[r("v-card",[r("v-card-subtitle",{staticStyle:{background:"#f6f6f6"}},[r("i",{staticClass:"fa fa-tachometer-alt"}),r("span",{staticClass:"font-weight-medium pl-1",staticStyle:{color:"#333"}},[t._v("Info")])]),r("v-divider"),r("v-card-text",{staticStyle:{padding:"0"}},[t.endpoint?r("v-simple-table",{staticClass:"font-weight-medium",attrs:{dense:""}},[r("tbody",[r("tr",[r("td",{staticStyle:{width:"30%"}},[t._v("Endpoint")]),r("td",[t._v(" "+t._s(t.endpoint.Name)+" "),r("i",{staticClass:"fa fa-microchip space-left"}),t._v(" "+t._s(t.endpoint.Snapshot.TotalCPU)+" "),r("i",{staticClass:"fa fa-memory space-left"}),t._v(" "+t._s(t.convert(t.endpoint.Snapshot.TotalMemory))+" - "+t._s(t.endpoint.Snapshot.Swarm?"Swarm":"Standalone")+" "+t._s(t.endpoint.Snapshot.DockerVersion)+" ")])]),r("tr",[r("td",{staticStyle:{width:"30%"}},[t._v("URL")]),r("td",[t._v(t._s(t.endpoint.URL))])])])]):t._e()],1)],1)],1),t.endpoint?r("v-col",{attrs:{cols:12,md:6,xs:12}},[r("Widget",{attrs:{icon:"fa fa-th-list",count:t.endpoint.Snapshot.StackCount,name:"Stacks",href:"/"+t.id+"/docker/stacks"}})],1):t._e(),t.endpoint&&t.endpoint.Snapshot.Swarm?r("v-col",{attrs:{cols:12,md:6,xs:12}},[t.endpoint.Snapshot.Swarm?r("Widget",{attrs:{icon:"fa fa-list-alt",count:t.endpoint.Snapshot.ServiceCount?t.endpoint.Snapshot.ServiceCount:0,name:"Services",href:"/"+t.id+"/docker/services"}}):t._e()],1):t._e(),t.endpoint?r("v-col",{attrs:{cols:12,md:6,xs:12}},[r("Widget",{attrs:{icon:"fa fa-cubes",count:t.endpoint.Snapshot.Containers,name:"Containers",href:"/"+t.id+"/docker/containers"}})],1):t._e(),t.endpoint?r("v-col",{attrs:{cols:12,md:6,xs:12}},[r("Widget",{attrs:{icon:"fa fa-clone",count:t.endpoint.Snapshot.ImageCount,name:"Images",href:"/"+t.id+"/docker/images"}})],1):t._e(),t.endpoint?r("v-col",{attrs:{cols:12,md:6,xs:12}},[r("Widget",{attrs:{icon:"fa fa-hdd",count:t.endpoint.Snapshot.VolumeCount,name:"Volumes",href:"/"+t.id+"/docker/volumes"}})],1):t._e()],1)},a=[],i=r("edc0"),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("router-link",{staticStyle:{color:"#337ab7","text-decoration":"none"},attrs:{to:t.href}},[r("div",{staticClass:"widget"},[r("div",{staticClass:"widget-body"},[r("div",{staticClass:"loading"},[r("div",{staticClass:"double-bounce1"}),r("div",{staticClass:"double-bounce2"})]),r("div",{staticClass:"widget-icon blue pull-left ng-scope"},[r("i",{class:t.icon})]),r("div",{staticClass:"title ng-binding ng-scope"},[t._v(t._s(t.count))]),r("div",{staticClass:"comment ng-binding ng-scope"},[t._v(t._s(t.name))])])])])},o=[],l=(r("a9e3"),{props:{href:{type:String,required:!0},count:{type:[String,Number],required:!0},icon:{type:String,required:!0},name:{type:String,required:!0}}}),c=l,d=(r("92a9"),r("2877")),u=Object(d["a"])(c,s,o,!1,null,null,null),h=u.exports,f={components:{Widget:h},props:{id:{type:String}},data:function(){return{endpoint:!1}},methods:{convert:function(t){return Object(i["a"])(t)}},created:function(){var t=this;this.$store.dispatch("app/getEndpoint",this.id).then((function(e){t.endpoint=e})).catch((function(){t.$router.push("/")}))}},p=f,g=(r("1fb8"),r("6544")),v=r.n(g),m=r("b0af"),b=r("99d9"),_=r("62ad"),y=r("ce7e"),S=r("0fd9"),C=r("1f4f"),w=Object(d["a"])(p,n,a,!1,null,null,null);e["default"]=w.exports;v()(w,{VCard:m["a"],VCardSubtitle:b["b"],VCardText:b["c"],VCol:_["a"],VDivider:y["a"],VRow:S["a"],VSimpleTable:C["a"]})},"8b37":function(t,e,r){},"8ce9":function(t,e,r){},"8e36":function(t,e,r){"use strict";r("6ece");var n=r("0789"),a=r("a9ad"),i=r("fe6c"),s=r("a452"),o=r("7560"),l=r("80d2"),c=r("58df");const d=Object(c["a"])(a["a"],Object(i["b"])(["absolute","fixed","top","bottom"]),s["a"],o["a"]);e["a"]=d.extend({name:"v-progress-linear",props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(l["g"])(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(l["g"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const t=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:t,[this.isReversed?"right":"left"]:Object(l["g"])(this.normalizedValue,"%"),width:Object(l["g"])(this.normalizedBuffer-this.normalizedValue,"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,...this.themeClasses}},computedTransition(){return this.indeterminate?n["d"]:n["e"]},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(l["g"])(this.normalizedBuffer,"%")),t}},methods:{genContent(){const t=Object(l["r"])(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners(){const t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[t]:!0}}))},onClick(t){if(!this.reactive)return;const{width:e}=this.$el.getBoundingClientRect();this.internalValue=t.offsetX/e*100},normalize(t){return t<0?0:t>100?100:parseFloat(t)}},render(t){const e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,style:{bottom:this.bottom?0:void 0,height:this.active?Object(l["g"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}})},"92a9":function(t,e,r){"use strict";r("ec48")},"99d9":function(t,e,r){"use strict";r.d(e,"a",(function(){return i})),r.d(e,"b",(function(){return s})),r.d(e,"c",(function(){return o})),r.d(e,"d",(function(){return l}));var n=r("b0af"),a=r("80d2");const i=Object(a["h"])("v-card__actions"),s=Object(a["h"])("v-card__subtitle"),o=Object(a["h"])("v-card__text"),l=Object(a["h"])("v-card__title");n["a"]},a9e3:function(t,e,r){"use strict";var n=r("83ab"),a=r("da84"),i=r("94ca"),s=r("6eeb"),o=r("5135"),l=r("c6b6"),c=r("7156"),d=r("c04e"),u=r("d039"),h=r("7c73"),f=r("241c").f,p=r("06cf").f,g=r("9bf2").f,v=r("58a8").trim,m="Number",b=a[m],_=b.prototype,y=l(h(_))==m,S=function(t){var e,r,n,a,i,s,o,l,c=d(t,!1);if("string"==typeof c&&c.length>2)if(c=v(c),e=c.charCodeAt(0),43===e||45===e){if(r=c.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+c}for(i=c.slice(2),s=i.length,o=0;o<s;o++)if(l=i.charCodeAt(o),l<48||l>a)return NaN;return parseInt(i,n)}return+c};if(i(m,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var C,w=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof w&&(y?u((function(){_.valueOf.call(r)})):l(r)!=m)?c(new b(S(e)),r,w):S(e)},x=n?f(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),k=0;x.length>k;k++)o(b,C=x[k])&&!o(w,C)&&g(w,C,p(b,C));w.prototype=_,_.constructor=w,s(a,m,w)}},b0af:function(t,e,r){"use strict";r("615b");var n=r("10d2"),a=r("297c"),i=r("1c87"),s=r("58df");e["a"]=Object(s["a"])(a["a"],i["a"],n["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...i["a"].options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...n["a"].options.computed.classes.call(this)}},styles(){const t={...n["a"].options.computed.styles.call(this)};return this.img&&(t.background=`url("${this.img}") center center / cover no-repeat`),t}},methods:{genProgress(){const t=a["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render(t){const{tag:e,data:r}=this.generateRouteLink();return r.style=this.styles,this.isClickable&&(r.attrs=r.attrs||{},r.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,r),[this.genProgress(),this.$slots.default])}})},b680:function(t,e,r){"use strict";var n=r("23e7"),a=r("a691"),i=r("408a"),s=r("1148"),o=r("d039"),l=1..toFixed,c=Math.floor,d=function(t,e,r){return 0===e?r:e%2===1?d(t,e-1,r*t):d(t*t,e/2,r)},u=function(t){var e=0,r=t;while(r>=4096)e+=12,r/=4096;while(r>=2)e+=1,r/=2;return e},h=function(t,e,r){var n=-1,a=r;while(++n<6)a+=e*t[n],t[n]=a%1e7,a=c(a/1e7)},f=function(t,e){var r=6,n=0;while(--r>=0)n+=t[r],t[r]=c(n/e),n=n%e*1e7},p=function(t){var e=6,r="";while(--e>=0)if(""!==r||0===e||0!==t[e]){var n=String(t[e]);r=""===r?n:r+s.call("0",7-n.length)+n}return r},g=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){l.call({})}));n({target:"Number",proto:!0,forced:g},{toFixed:function(t){var e,r,n,o,l=i(this),c=a(t),g=[0,0,0,0,0,0],v="",m="0";if(c<0||c>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(v="-",l=-l),l>1e-21)if(e=u(l*d(2,69,1))-69,r=e<0?l*d(2,-e,1):l/d(2,e,1),r*=4503599627370496,e=52-e,e>0){h(g,0,r),n=c;while(n>=7)h(g,1e7,0),n-=7;h(g,d(10,n,1),0),n=e-1;while(n>=23)f(g,1<<23),n-=23;f(g,1<<n),h(g,1,1),f(g,2),m=p(g)}else h(g,0,r),h(g,1<<-e,0),m=p(g)+s.call("0",c);return c>0?(o=m.length,m=v+(o<=c?"0."+s.call("0",c-o)+m:m.slice(0,o-c)+"."+m.slice(o-c))):m=v+m,m}})},ce7e:function(t,e,r){"use strict";r("8ce9");var n=r("7560");e["a"]=n["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render(t){let e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:{"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical,...this.themeClasses},attrs:{role:"separator","aria-orientation":e,...this.$attrs},on:this.$listeners})}})},ec48:function(t,e,r){},edc0:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("d3b7"),r("25f0"),r("99af"),r("b680");function n(t){if(t){var e=["Bytes","KB","MB","GB","TB"],r=Math.min(parseInt(Math.floor(Math.log(t)/Math.log(1024)).toString(),10),e.length-1);return"".concat((t/Math.pow(1024,r)).toFixed(r?1:0)," ").concat(e[r])}return"n/a"}}}]);
//# sourceMappingURL=chunk-63fe6c9c.277fe4a7.js.map