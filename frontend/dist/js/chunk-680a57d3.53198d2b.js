(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-680a57d3"],{"0187":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.selectedCabin?i("b-container",{staticClass:"m-bottom-lg"},[i("b-row",[t.selectedCabin.shopping_list?t._e():i("b-col",{attrs:{md:"6","offset-md":"3"}},[i("p",[t._v("Begynn å legge til ting i handlelisten 📝")])]),t.selectedCabin.shopping_list?i("b-col",{attrs:{md:"6","offset-md":"3"}},[i("h3",[t._v("🛒 Handleliste")]),i("form",{staticClass:"m-bottom",on:{submit:function(e){return e.preventDefault(),t.submitAddItemToShoppingList(e)}}},[i("md-field",{class:t.alreadyInList},[i("label",{attrs:{for:"item"}},[t._v("Legg til vare 🍫")]),i("md-input",{attrs:{type:"text",required:""},model:{value:t.item,callback:function(e){t.item=e},expression:"item"}}),i("span",{staticClass:"md-error"},[t._v("Varen finnes allerede")]),i("md-button",{staticClass:"md-primary md-round md-sm",attrs:{type:"submit"}},[t._v("Legg til")])],1)],1),t.selectedCabin.shopping_list.length?t._e():i("p",[t._v(" Hytta skal være fylt opp med det som trengs 🍫 ")]),i("b-list-group",[i("transition-group",{attrs:{"enter-active-class":"animate__animated animate__flipInX","leave-to-class":"animate__animated animate__flipOutX animate__faster"}},t._l(t.shoppingList,(function(e){return i("b-list-group-item",{key:e.item,on:{mouseover:function(i){t.hover=e.item}}},[t._v(t._s(e.item)+" "),i("md-checkbox",{staticClass:"float-right",attrs:{value:e},on:{change:function(i){return t.itemControl(e)}},model:{value:t.purchasedItems,callback:function(e){t.purchasedItems=e},expression:"purchasedItems"}}),t.hover==e.item?i("md-button",{staticClass:"md-primary md-sm md-round float-right padding",staticStyle:{"margin-top":"-2px","margin-right":"20px"},on:{click:function(i){return t.deleteItem(e.item)}}},[t._v("Slett")]):t._e()],1)})),1)],1),i("h3",[t._v("✅ Fullført")]),i("b-list-group",[i("transition-group",{attrs:{"enter-active-class":"animate__animated animate__flipInX"}},t._l(t.purchasedItems,(function(e){return i("b-list-group-item",{key:e.item,staticStyle:{"text-decoration":"line-through"},on:{mouseover:function(i){t.hover=e.item}}},[t._v(t._s(e.item)+" "),i("md-checkbox",{staticClass:"float-right",attrs:{value:e},on:{change:function(i){return t.itemControl(e)}},model:{value:t.purchasedItems,callback:function(e){t.purchasedItems=e},expression:"purchasedItems"}}),t.hover==e.item?i("md-button",{staticClass:"md-primary md-sm md-round float-right padding",staticStyle:{"margin-top":"-2px","margin-right":"20px"},on:{click:function(i){return t.deleteItem(e.item)}}},[t._v("Slett")]):t._e()],1)})),1)],1)],1):t._e()],1)],1):t._e()},s=[],a=(i("4de4"),i("c740"),i("45fc"),i("a434"),i("5530")),r=i("2f62"),o={data:function(){return{purchased:"",hover:"test",checked:!0,item:"",alreadyInList:!1,audio:new Audio(i("646f"))}},created:function(){this.fetchCabinInfo()},methods:Object(a["a"])(Object(a["a"])({},Object(r["b"])(["fetchCabinInfo","updateShoppingList"])),{},{submitAddItemToShoppingList:function(){var t=this;this.selectedCabin.shopping_list.some((function(e){return e.item.toLowerCase()==t.item.toLowerCase()}))?this.alreadyInList="md-invalid":(this.selectedCabin.shopping_list.unshift({item:this.item,added_by:this.userInfo.id}),this.alreadyInList="",this.updateShoppingList())},deleteItem:function(t){this.selectedCabin.shopping_list.splice(this.selectedCabin.shopping_list.findIndex((function(e){return e.item==t})),1),this.updateShoppingList()},itemControl:function(t){t.purchased=!t.purchased,t.purchased&&this.audio.play();var e=this.selectedCabin.shopping_list.findIndex((function(e){return e.item==t.item}));this.selectedCabin.shopping_list.splice(e,1),this.selectedCabin.shopping_list.unshift(t),this.updateShoppingList()}}),computed:Object(a["a"])(Object(a["a"])({},Object(r["c"])(["selectedCabin","userInfo"])),{},{shoppingList:function(){return this.selectedCabin.shopping_list.filter((function(t){return!t.purchased}))},purchasedItems:{get:function(){return this.selectedCabin.shopping_list.filter((function(t){return t.purchased}))},set:function(){}}}),watch:{"selectedCabin.shopping_list":function(){var t=this;this.selectedCabin.shopping_list.some((function(e){return e.item==t.item}))&&(this.item="")}}},l=o,c=i("2877"),d=Object(c["a"])(l,n,s,!1,null,null,null);e["default"]=d.exports},"646f":function(t,e,i){t.exports=i.p+"media/complete.88b02f34.mp3"},a434:function(t,e,i){"use strict";var n=i("23e7"),s=i("23cb"),a=i("a691"),r=i("50c4"),o=i("7b0b"),l=i("65f0"),c=i("8418"),d=i("1dde"),u=Math.max,m=Math.min,p=9007199254740991,h="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d("splice")},{splice:function(t,e){var i,n,d,f,g,b,_=o(this),v=r(_.length),C=s(t,v),I=arguments.length;if(0===I?i=n=0:1===I?(i=0,n=v-C):(i=I-2,n=m(u(a(e),0),v-C)),v+i-n>p)throw TypeError(h);for(d=l(_,n),f=0;f<n;f++)g=C+f,g in _&&c(d,f,_[g]);if(d.length=n,i<n){for(f=C;f<v-n;f++)g=f+n,b=f+i,g in _?_[b]=_[g]:delete _[b];for(f=v;f>v-n+i;f--)delete _[f-1]}else if(i>n)for(f=v-n;f>C;f--)g=f+n-1,b=f+i-1,g in _?_[b]=_[g]:delete _[b];for(f=0;f<i;f++)_[f+C]=arguments[f+2];return _.length=v-n+i,d}})},c740:function(t,e,i){"use strict";var n=i("23e7"),s=i("b727").findIndex,a=i("44d2"),r="findIndex",o=!0;r in[]&&Array(1)[r]((function(){o=!1})),n({target:"Array",proto:!0,forced:o},{findIndex:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),a(r)}}]);
//# sourceMappingURL=chunk-680a57d3.53198d2b.js.map