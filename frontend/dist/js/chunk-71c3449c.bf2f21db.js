(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71c3449c"],{"9d98":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-container",[n("b-row",[n("b-col",{staticClass:"mb-5",attrs:{md:"6","offset-md":"3"}},[n("b-alert",{staticClass:"mt-5",attrs:{show:"",variant:"success"}},[n("h4",[n("strong",[e._v("Din unike hytte-id er "+e._s(e.selectedCabin.id))])]),n("p",[e._v(' Denne koden brukes ved å trykke på "Få tilgang til en hytte", og fylle inn koden. De vil ikke kunne se andre detaljer enn navnet på hytta frem til du godkjenner dem på denne siden. ')])]),e.selectedCabin.not_approved_users.length?n("h3",{staticClass:"text-center"},[e._v(" Brukere som venter på tilgang ")]):e._e(),n("b-list-group",e._l(e.selectedCabin.not_approved_users,(function(t){return n("b-list-group-item",{key:t.id},[n("span",{staticClass:"pt-3"},[e._v(e._s(t.name))]),n("md-button",{staticClass:"md-primary mt-0 mb-0 float-right md-sm md-round",on:{click:function(n){return e.submitDeleteUser(t)}}},[e._v("Slett")]),n("md-button",{staticClass:"md-success mt-0 mb-0 float-right md-sm md-round",on:{click:function(n){return e.submitApproveAccess(t)}}},[e._v("Gi tilgang")])],1)})),1),e.selectedCabin.users.length?n("h3",{staticClass:"text-center"},[e._v(" Brukere med tilgang ")]):e._e(),n("b-list-group",e._l(e.selectedCabin.users,(function(t){return n("b-list-group-item",{key:t.id},[n("span",{staticClass:"pt-3"},[e._v(e._s(t.name))]),e.userInfo.id!=e.selectedCabin.owner.id?n("md-button",{staticClass:"md-primary mt-0 mb-0 float-right md-sm md-round",on:{click:function(n){return e.submitRemoveAccess(t)}}},[e._v("Fjern tilgang")]):e._e(),e.userInfo.id==t.id?n("span",[e._v(" (Deg)")]):e._e()],1)})),1)],1)],1)],1)},i=[],r=(n("c740"),n("a434"),n("5530")),a=n("2f62"),c={methods:Object(r["a"])(Object(r["a"])({},Object(a["b"])(["approveUser"])),{},{submitApproveAccess:function(e){this.selectedCabin.users.push(e),this.selectedCabin.not_approved_users.splice(this.selectedCabin.not_approved_users.findIndex((function(t){return t.id==e.id})),1),this.approveUser()},submitRemoveAccess:function(e){this.selectedCabin.not_approved_users.push(e),this.selectedCabin.users.splice(this.selectedCabin.users.findIndex((function(t){return t.id==e.id})),1),this.approveUser()},submitDeleteUser:function(e){this.selectedCabin.not_approved_users.splice(this.selectedCabin.not_approved_users.findIndex((function(t){return t.id==e.id})),1),this.approveUser()}}),computed:Object(r["a"])({},Object(a["c"])(["selectedCabin","userInfo"]))},d=c,o=n("2877"),u=Object(o["a"])(d,s,i,!1,null,null,null);t["default"]=u.exports},a434:function(e,t,n){"use strict";var s=n("23e7"),i=n("23cb"),r=n("a691"),a=n("50c4"),c=n("7b0b"),d=n("65f0"),o=n("8418"),u=n("1dde"),l=Math.max,p=Math.min,b=9007199254740991,m="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!u("splice")},{splice:function(e,t){var n,s,u,f,h,v,_=c(this),g=a(_.length),C=i(e,g),k=arguments.length;if(0===k?n=s=0:1===k?(n=0,s=g-C):(n=k-2,s=p(l(r(t),0),g-C)),g+n-s>b)throw TypeError(m);for(u=d(_,s),f=0;f<s;f++)h=C+f,h in _&&o(u,f,_[h]);if(u.length=s,n<s){for(f=C;f<g-s;f++)h=f+s,v=f+n,h in _?_[v]=_[h]:delete _[v];for(f=g;f>g-s+n;f--)delete _[f-1]}else if(n>s)for(f=g-s;f>C;f--)h=f+s-1,v=f+n-1,h in _?_[v]=_[h]:delete _[v];for(f=0;f<n;f++)_[f+C]=arguments[f+2];return _.length=g-s+n,u}})},c740:function(e,t,n){"use strict";var s=n("23e7"),i=n("b727").findIndex,r=n("44d2"),a="findIndex",c=!0;a in[]&&Array(1)[a]((function(){c=!1})),s({target:"Array",proto:!0,forced:c},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r(a)}}]);
//# sourceMappingURL=chunk-71c3449c.bf2f21db.js.map