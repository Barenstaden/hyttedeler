(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c7ec3"],{"534c":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.selectedCabin?a("b-container",{staticClass:"m-bottom"},[a("b-row",[a("b-col",{staticClass:"text-center",attrs:{md:"6","offset-md":"3"}},[e.selectedCabin.name?a("h3",[e._v(" "+e._s(e.selectedCabin.name)+" "),e.edit?a("span",[e._v("✏️")]):e._e()]):e._e(),e.selectedCabin.about?a("p",[e._v(" "+e._s(e.selectedCabin.about)+" "),e.edit?a("span",[e._v("✏️")]):e._e()]):e._e(),e.openEditForm?a("form",{on:{submit:function(t){return t.preventDefault(),e.submitUpdateCabinAbout(t)}}},[a("md-field",[a("label",{attrs:{for:"name"}},[e._v("Navn på hytta")]),a("md-input",{attrs:{name:"name",type:"text"},model:{value:e.selectedCabin.name,callback:function(t){e.$set(e.selectedCabin,"name",t)},expression:"selectedCabin.name"}})],1),a("md-field",[a("label",{attrs:{for:"about"}},[e._v("Beskrivelse av hytta")]),a("md-textarea",{attrs:{name:"about","md-autogrow":""},model:{value:e.selectedCabin.about,callback:function(t){e.$set(e.selectedCabin,"about",t)},expression:"selectedCabin.about"}})],1),a("md-button",{staticClass:"md-round md-success",attrs:{type:"submit"}},[e._v("Lagre")])],1):e._e(),e.userInfo.id==e.selectedCabin.owner.id?a("h3",[e._v("Brukere av hytta")]):e._e(),e.selectedCabin.cabin_users&&!e.selectedCabin.cabin_users.length?a("b-alert",{attrs:{show:"",variant:"success"}},[e._v(" Det finnes ingen brukere for hytta enda. Del din unike hytte-id med de du ønsker: "+e._s(e.selectedCabin.id)+". Inviterte brukere må godkjennes av deg før de får booke tid i hyttekalenderen. ")]):e._e()],1)],1)],1):e._e()},s=[],i=(a("b0c0"),a("5530")),d=a("2f62"),b={data:function(){return{edit:!1,openEditForm:!1}},created:function(){!this.selectedCabin||this.selectedCabin.name||this.selectedCabin.about||(this.openEditForm=!0)},methods:Object(i["a"])(Object(i["a"])({},Object(d["b"])(["updateCabinAbout"])),{},{submitUpdateCabinAbout:function(){this.updateCabinAbout()}}),computed:Object(i["a"])({},Object(d["c"])(["selectedCabin","userInfo"])),watch:{selectedCabin:function(){this.selectedCabin.name||this.selectedCabin.about||(this.openEditForm=!0)}}},c=b,o=a("2877"),r=Object(o["a"])(c,n,s,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0c7ec3.200889a4.js.map