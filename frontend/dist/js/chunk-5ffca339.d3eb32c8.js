(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ffca339"],{"113c":function(t,e,a){t.exports=a.p+"img/mountain-cabin.dc1f1b4c.jpg"},"64d3":function(t,e,a){"use strict";a("f8d4")},"933e":function(t,e,a){t.exports=a.p+"img/cabin.e76bc292.jpeg"},c66d:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("parallax",{staticClass:"section page-header header-filter",style:t.headerStyle}),n("div",{staticClass:"main main-raised"},[n("div",{staticClass:"section profile-content"},[n("div",{staticClass:"container"},[n("div",{staticClass:"md-layout"},[n("div",{staticClass:"md-layout-item md-size-50 mx-auto"},[t.userInfo?n("div",{staticClass:"profile"},[n("div",{staticClass:"avatar"},[t.userInfo.image?n("img",{staticClass:"img-raised rounded-circle profile-image img-fluid",attrs:{src:t.userInfo.image.url,alt:"Bilde av deg"}}):n("img",{staticClass:"img-raised rounded-circle profile-image img-fluid",attrs:{src:a("933e"),alt:"Standardbilde"}})]),n("div",{staticClass:"name"},[n("h3",{staticClass:"title"},[t._v(" "+t._s(t.userInfo.name?t.userInfo.name:"Ola Nordmann")+" "),n("span",{on:{click:function(e){t.changeName=!0}}},[t._v("✏️")])]),n("form",{on:{submit:function(e){return e.preventDefault(),t.saveUserInfo(e)}}},[t.changeName?n("md-field",[n("label",[t._v("Endre navn")]),n("md-input",{attrs:{type:"text"},model:{value:t.userInfo.name,callback:function(e){t.$set(t.userInfo,"name",e)},expression:"userInfo.name"}}),n("md-button",{staticClass:"md-primary md-round md-sm",attrs:{type:"submit"}},[t._v("lagre")])],1):t._e()],1),t.userInfo.name?t._e():n("b-alert",{attrs:{variant:"danger",show:""}},[t.userInfo.name?t._e():n("h5",[n("strong",[t._v("Legg til navn for å komme i gang.")])]),t.selectedCabin?t._e():n("span",[t._v(' Om du ikke er hytteier kan du legge inn koden du har fått fra en hytteeier etter å ha trykket på "legg til hytte"')])]),t.userInfo.name?n("md-button",{staticClass:"md-primary mb-5",on:{click:function(e){t.addCabin=!t.addCabin}}},[t._v("Opprette en ny hytte")]):t._e(),t.userInfo.name?n("md-button",{staticClass:"md-primary mb-5",on:{click:function(e){t.joinCabinForm=!t.joinCabinForm}}},[t._v("Få tilgang til en hytte")]):t._e(),t.addCabin?n("form",{on:{submit:function(e){return e.preventDefault(),t.submitCreateCabin(e)}}},[n("md-field",[n("label",{attrs:{for:"name"}},[t._v("Navn på hytta")]),n("md-input",{attrs:{type:"text"},model:{value:t.cabinName,callback:function(e){t.cabinName=e},expression:"cabinName"}})],1),n("md-field",[n("label",{attrs:{for:"aboutCabin"}},[t._v("Om hytta")]),n("md-textarea",{attrs:{"md-autogrow":""},model:{value:t.cabinDescription,callback:function(e){t.cabinDescription=e},expression:"cabinDescription"}})],1),n("md-button",{staticClass:"md-success md-round",attrs:{type:"submit"}},[t._v("Lagre hytte")])],1):t._e(),t.joinCabinForm?n("form",{on:{submit:function(e){return e.preventDefault(),t.submitJoinCabin(e)}}},[n("md-field",{class:t.joinCabinError?"md-invalid":""},[n("label",{attrs:{for:""}},[t._v("Hytte-id")]),n("md-input",{attrs:{type:"number",required:""},model:{value:t.joinCabinId,callback:function(e){t.joinCabinId=e},expression:"joinCabinId"}}),n("span",{staticClass:"md-error"},[t._v(t._s(t.joinCabinError))])],1),n("md-button",{staticClass:"md-primary md-round mt-4 mb-5",attrs:{type:"submit"}},[t._v("Koble til hytte")])],1):t._e(),t.cabinJoined?n("b-alert",{attrs:{show:"",variant:"success"}},[t._v(" Din forespørsel er sendt til godkjenning! Du vil få tilgang på alle funksjoner når forespørselen er godkjent. ")]):t._e()],1)]):t._e()])]),t.cabinsAwaitingApproval&&t.cabinsAwaitingApproval.length?n("b-row",[n("b-col",{staticClass:"mb-5",attrs:{md:"6","offset-md":"3"}},[n("h3",{staticClass:"text-center"},[t._v(" Hytter som venter godkjenning fra eier ")]),n("b-list-group",t._l(t.cabinsAwaitingApproval,(function(e){return n("b-list-group-item",{key:e.id},[t._v(" Hytte-id: "+t._s(e.id)+" · "+t._s(e.name)+" ")])})),1)],1)],1):t._e(),t.selectedCabin&&t.selectedCabin.name?n("b-row",{staticClass:"mt-5"},[n("b-col",{attrs:{md:"","offset-md":""}},[n("md-tabs",{staticClass:"md-primary",attrs:{"md-sync-route":"","md-alignment":"centered"}},[n("md-tab",{attrs:{to:"/profil/hytter","md-label":t.selectedCabin.name,"md-icon":"expand_more"}}),n("md-tab",{attrs:{to:"/profil/om-hytta","md-label":"Om hytta","md-icon":"home"}}),n("md-tab",{attrs:{to:"/profil/kalender","md-label":"Kalender","md-icon":"calendar_today"}}),n("md-tab",{attrs:{to:"/profil/handleliste","md-label":"Handleliste","md-icon":"shopping_cart"}}),n("md-tab",{attrs:{to:"/profil/faste-rutiner","md-label":"Faste rutiner","md-icon":"list"}}),t.userInfo.id==t.selectedCabin.owner.id?n("md-tab",{attrs:{to:"/profil/tilgang","md-label":"Tilgang","md-icon":"lock"}}):t._e()],1)],1),n("router-view")],1):t._e(),t.saved?n("modal",[n("template",{slot:"header"},[n("h4",{staticClass:"modal-title"},[t._v("Alt gikk etter planen")]),n("md-button",{staticClass:"md-simple md-just-icon md-round modal-default-button",on:{click:t.closeModal}},[n("md-icon",[t._v("clear")])],1)],1),n("template",{slot:"body"},[n("p",[t._v("Lagret!. Denne meldingen blir fjernet automatisk.")])]),n("template",{slot:"footer"},[n("md-button",{staticClass:"md-danger md-simple",on:{click:t.closeModal}},[t._v("Close")])],1)],2):t._e()],1)])])],1)},i=[],s=(a("b0c0"),a("5530")),r=a("2af9"),o=a("2f62"),d={components:{Modal:r["c"]},bodyClass:"profile-page",data:function(){return{changeName:!1,addCabin:!1,joinCabinForm:!1,joinCabinId:null,selectCabin:"",cabinName:"",cabinDescription:""}},props:{header:{type:String,default:a("113c")}},created:function(){var t=this;this.fetchUserInfo(),this.fetchCabinInfo(),setInterval((function(){t.fetchCabinInfo(t.selectedCabin.name)}),3e4)},methods:Object(s["a"])(Object(s["a"])({},Object(o["b"])(["fetchUserInfo","fetchCabinInfo","saveUserInfo","createCabin","joinCabin"])),{},{closeModal:function(){this.$store.commit("saved",!1)},isActive:function(t){return this.$route.path==t?"md-primary":"md-accent"},submitCreateCabin:function(){this.createCabin({name:this.cabinName,desc:this.cabinDescription})},submitJoinCabin:function(){this.joinCabin(this.joinCabinId)}}),computed:Object(s["a"])(Object(s["a"])({},Object(o["c"])(["cabins","cabinsAwaitingApproval","selectedCabin","userInfo","saved","joinCabinError","cabinJoined"])),{},{headerStyle:function(){return{backgroundImage:"url(".concat(this.header,")")}}}),watch:{saved:function(){this.changeName=!1,this.addCabin=!1,this.joinCabinId=!1},selectedCabin:function(){},cabinJoined:function(){this.joinCabinForm=!1}}},l=d,c=(a("64d3"),a("2877")),m=Object(c["a"])(l,n,i,!1,null,"bcdf5d2e",null);e["default"]=m.exports},f8d4:function(t,e,a){}}]);
//# sourceMappingURL=chunk-5ffca339.d3eb32c8.js.map