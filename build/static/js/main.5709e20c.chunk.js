(this["webpackJsonpmy-react-app"]=this["webpackJsonpmy-react-app"]||[]).push([[0],{23:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n.n(a),c=n(17),s=n.n(c),i=(n(23),n(0)),o=n.n(i),l=n(1),u=n(5),p=n(8),b=n(9),d=n(11),f=n(10),h=n(13),v=n.p+"static/media/logo.6ce24c58.svg",j=(n(26),n(2)),g=function(e){Object(b.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(u.a)(this,n),(e=t.call(this)).state={data:[]},e}return Object(p.a)(n,[{key:"checkNativeNotificationsAvailability",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("checkNativeNotificationsAvailability"),e.prev=1,e.next=4,f.a.isPluginAvailable("LocalNotifications");case 4:if(t=e.sent,console.log("isPluginAvailable",t),!t){e.next=24;break}return e.next=9,h.a.checkPermissions();case 9:if("granted"!==e.sent.display){e.next=14;break}return e.abrupt("return",!0);case 14:return e.next=16,h.a.requestPermissions();case 16:if("granted"!==e.sent.display){e.next=21;break}return e.abrupt("return",!0);case 21:case 24:return e.abrupt("return",!1);case 22:e.next=25;break;case 25:e.next=31;break;case 27:return e.prev=27,e.t0=e.catch(1),alert(e.t0),e.abrupt("return",!1);case 31:case"end":return e.stop()}}),e,null,[[1,27]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.checkNativeNotificationsAvailability();case 2:if(t=e.sent,console.log("isNotificationsAvailable",t),!t){e.next=9;break}return e.next=7,h.a.schedule({notifications:[{title:"On sale",body:"Widgets are 10% off. Act fast!",id:2,schedule:{at:new Date(Date.now()+5e3)},sound:null,attachments:null,actionTypeId:"",extra:null}]});case 7:n=e.sent,console.log("Success",n);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("header",{className:"App-header",children:[Object(j.jsx)("img",{src:v,className:"App-logo",alt:"logo"}),Object(j.jsxs)("p",{children:["Edit ",Object(j.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(j.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React!"})]})})}}]),n}(a.Component),x=g,k=function(e){e&&e instanceof Function&&n.e(4).then(n.bind(null,29)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(x,{})}),document.getElementById("root")),k()}},[[28,1,2]]]);
//# sourceMappingURL=main.5709e20c.chunk.js.map