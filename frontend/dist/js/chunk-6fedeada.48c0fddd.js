(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fedeada"],{a55b:function(t,s,e){"use strict";e.r(s);var o=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"wrapper",attrs:{id:"loginPageWrapper"}},[t.loginPageContent?e("div",{attrs:{id:"loginPageBackgroundVideo"}},[t.loginPageContent?e("video",{attrs:{autoplay:"",muted:"",loop:""},domProps:{muted:!0}},[e("source",{attrs:{src:t.loginPageContent.background.url,type:"video/mp4"}})]):t._e()]):t._e(),e("div",{staticClass:"section"},[e("div",{staticClass:"container"},[e("div",{staticClass:"md-layout"},[e("div",{staticClass:"md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto",staticStyle:{"margin-top":"20vh"}},[e("login-card",{attrs:{"header-color":"green"}},[e("h4",{staticClass:"card-title",attrs:{slot:"title"},slot:"title"},[t._v("Bli med inn i varmen")]),e("md-button",{staticClass:"md-just-icon md-simple md-white",attrs:{slot:"buttons",href:"/connect/facebook"},slot:"buttons"},[e("i",{staticClass:"fab fa-facebook-square"})]),e("md-button",{staticClass:"md-just-icon md-simple md-white",attrs:{slot:"buttons",href:"javascript:void(0)"},slot:"buttons"},[e("i",{staticClass:"fab fa-google"})]),e("p",{staticClass:"description",attrs:{slot:"description"},slot:"description"},[t._v("Logg inn med e-post")]),e("form",{staticClass:"md-form-group text-center",attrs:{slot:"inputs"},on:{submit:function(s){return s.preventDefault(),t.submitRegisterForm(s)}},slot:"inputs"},[e("md-field",{staticClass:"md-form-group",attrs:{slot:"inputs"},slot:"inputs"},[e("md-icon",[t._v("email")]),e("label",[t._v("E-post")]),e("md-input",{attrs:{type:"email",required:""},model:{value:t.email,callback:function(s){t.email=s},expression:"email"}})],1),e("md-field",{staticClass:"md-form-group",class:t.loginError?"md-invalid":"",attrs:{slot:"inputs"},slot:"inputs"},[e("md-icon",[t._v("lock_outline")]),e("label",[t._v("Passord")]),e("md-input",{attrs:{type:"password",required:""},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}}),e("span",{staticClass:"md-error"},[t._v(t._s(t.loginError))])],1),e("md-button",{staticClass:"md-simple md-success md-lg mt-3",attrs:{slot:"footer",type:"submit"},on:{click:function(s){t.signIn=!0}},slot:"footer"},[t._v(" Logg inn ")]),e("p",[t._v("eller")]),e("md-button",{staticClass:"md-simple md-success md-lg",attrs:{slot:"footer",type:"submit"},on:{click:function(s){t.signIn=!1}},slot:"footer"},[t._v(" Lag ny bruker ")])],1)],1)],1)])])])])},i=[],a=e("5530"),n=e("2af9"),r=e("2f62"),l={components:{LoginCard:n["b"]},bodyClass:"login-page",data:function(){return{name:null,email:"",password:"",signIn:!1}},created:function(){this.email="justsendto@me.com",this.password="hurtiglader",this.token?this.$router.push("/profil/kalender"):this.fetchLoginPageContent()},methods:Object(a["a"])(Object(a["a"])({},Object(r["b"])(["fetchLoginPageContent","register","login"])),{},{submitRegisterForm:function(){var t={email:this.email,password:this.password};this.signIn?this.login(t):this.register(t)}}),computed:Object(a["a"])(Object(a["a"])({},Object(r["c"])(["token","loginPageContent","loginError"])),{},{headerStyle:function(){return{backgroundImage:"url(".concat(this.header,")")}}}),watch:{token:function(){this.$router.push("/profil/kalender")}}},d=l,c=(e("d6db"),e("2877")),u=Object(c["a"])(d,o,i,!1,null,null,null);s["default"]=u.exports},d6db:function(t,s,e){"use strict";e("e67a")},e67a:function(t,s,e){}}]);
//# sourceMappingURL=chunk-6fedeada.48c0fddd.js.map