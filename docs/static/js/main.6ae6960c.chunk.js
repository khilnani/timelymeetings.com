(this["webpackJsonpmy-react-app"]=this["webpackJsonpmy-react-app"]||[]).push([[0],{1350:function(e,t,n){},1352:function(e,t,n){"use strict";n.r(t);var o=n(6),a=n.n(o),i=n(25),r=n.n(i),s=(n(37),n(3)),c=n.n(s),l=n(5),u=n(11),p=n(14),d=n(8),f=n(15),g=n(16),h=n(7),m=n(30),b=n(31),x=n(32),v=n(19);function y(){console.log("getUserOptions");var e=void 0,t=(e=document.getElementById("meetingDuration")).options[e.selectedIndex].value;e=document.getElementById("meetingSlot");var n=-1;console.log("select.selectedIndex",e.selectedIndex),e.selectedIndex>-1&&(n=e.options[e.selectedIndex].value);var o={meetingDuration:t,meetingSlot:n,meetingSpeedy:document.getElementById("meetingSpeedy").checked};return console.log("getUserOptions.o",o),o}function j(e){console.log("saveEnabledStateToLocalStorage",e),localStorage.setItem("enabled",e)}function k(){console.log("getEnabledStateToLocalStorage");var e=localStorage.getItem("enabled");return e=!e||"string"!==typeof e||"true"===e,console.log("getEnabledStateToLocalStorage - enabled",e,typeof e),e}function w(){console.log("saveDurationToLocalStorage");var e=y();localStorage.setItem("meetingDuration",e.meetingDuration)}function N(){console.log("saveSpeedyToLocalStorage");var e=y();localStorage.setItem("meetingSpeedy",e.meetingSpeedy)}function O(){console.log("saveToLocalStorage"),w(),function(){console.log("saveSlotToLocalStorage");var e=y();localStorage.setItem("meetingSlot",e.meetingSlot)}(),N()}function S(e){console.log("updateFromLocalStorage");var t=localStorage.getItem("meetingDuration");console.log("lc.meetingDuration",t,typeof t);var n=localStorage.getItem("meetingSlot");console.log("lc.meetingSlot",n,typeof n);var o=localStorage.getItem("meetingSpeedy");console.log("lc.meetingSpeedy",o,typeof o),t&&(document.getElementById("meetingDuration").value=t,e()),function(e,t){console.log("selectHasValue");var n=document.getElementById(e);return null!==n&&n.innerHTML.indexOf('value="'+t+'"')>-1}("meetingSlot",n)&&(document.getElementById("meetingSlot").value=n),o&&(console.log("meetingSpeedy.checked","true"===o),document.getElementById("meetingSpeedy").checked="true"===o)}function C(e,t){return new Date(e.getTime()+6e4*t)}var D=n(10),T=n.p+"static/media/double-beep.9a5eea21.mp3",I=n.p+"static/media/blank.280fa771.mp3",B=n.p+"static/media/icon-128.ec70f416.png",P="./public/assets/audio/double-beep.aiff",L=!0;function M(){console.log("playEmptyAudio");var e=new Audio(I);e.crossorigin="anonymous",e.autoplay=!0,e.play()}function E(){console.log("playNotificationAudio");var e=new Audio(T);e.crossorigin="anonymous",e.autoplay=!0,e.play()}function A(){return q.apply(this,arguments)}function q(){return(q=Object(l.a)(c.a.mark((function e(){var t,n,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("checkNativeNotificationsAvailability"),M(),t="web"!==h.a.getPlatform(),console.log("checkNativeNotificationsAvailability - isNative?",t),e.next=6,h.a.isPluginAvailable("LocalNotifications");case 6:return n=e.sent,console.log("checkNativeNotificationsAvailability - isCapacitorPluginAvailable?",n),!1,o=t&&n,console.log("checkNativeNotificationsAvailability?",o),e.abrupt("return",o);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(){return H.apply(this,arguments)}function H(){return(H=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("requestNativeNotificationsPermissions"),t=!1,e.prev=2,e.next=5,D.a.checkPermissions();case 5:if("granted"!==e.sent.display){e.next=10;break}t=!0,e.next=14;break;case 10:return e.next=12,D.a.requestPermissions();case 12:"granted"===e.sent.display&&(t=!0);case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(2),console.error(e.t0);case 19:return console.log("requestNativeNotificationsPermissions - avail",t),e.abrupt("return",t);case 21:case"end":return e.stop()}}),e,null,[[2,16]])})))).apply(this,arguments)}function R(e,t){return W.apply(this,arguments)}function W(){return(W=Object(l.a)(c.a.mark((function e(t,n){var o,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("sendNativeNotification",t,n),e.next=3,A();case 3:if(o=e.sent,console.log("sendNativeNotification - isNativeNotificationsAvailable?",o),e.t0=o,!e.t0){e.next=10;break}return e.next=9,F();case 9:e.t0=e.sent;case 10:if(!e.t0){e.next=23;break}return e.prev=11,e.next=14,D.a.schedule({notifications:[{title:"Timely Meetings",body:t,id:(new Date).getTime(),schedule:{at:n},sound:P,vibrate:!0,attachments:null,actionTypeId:"",extra:null}]});case 14:return a=e.sent,console.log("Success",a),e.abrupt("return",!0);case 19:return e.prev=19,e.t1=e.catch(11),console.error(e.t1),e.abrupt("return",!1);case 23:return e.abrupt("return",!1);case 24:case"end":return e.stop()}}),e,null,[[11,19]])})))).apply(this,arguments)}function z(){return U.apply(this,arguments)}function U(){return(U=Object(l.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("clearNativeNotifications"),e.next=3,ae();case 3:if(t=e.sent,!((n=t.notifications)&&n.length>0)){e.next=9;break}return e.next=8,D.a.cancel(t);case 8:console.log("clearNativeNotifications - Notifications",n);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Y(){return J.apply(this,arguments)}function J(){return(J=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("checkBrowserNotificationsAvailability"),t="Notification"in window,console.log("checkBrowserNotificationsAvailability - supported?",t),e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(){return K.apply(this,arguments)}function K(){return(K=Object(l.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("checkBrowserNotificationsSchedulingAvailability"),e.next=3,Y();case 3:return t=e.sent,!1,n=t&&"showTrigger"in Notification.prototype,console.log("checkBrowserNotificationsSchedulingAvailability - Triggers supported?",n),e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return G.apply(this,arguments)}function G(){return(G=Object(l.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("requestBrowserNotificationsPermissions"),!Y()){e.next=8;break}if("granted"===Notification.permission){e.next=8;break}return console.log("requestBrowserNotificationsPermissions - being asked."),e.next=6,Notification.requestPermission();case 6:t=e.sent,console.log("requestBrowserNotificationsPermissions - permission",t);case 8:return n="granted"===Notification.permission,console.log("requestBrowserNotificationsPermissions?",n),e.abrupt("return",n);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(e,t){return X.apply(this,arguments)}function X(){return(X=Object(l.a)(c.a.mark((function e(t,n){var o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("sendBrowserNotification",t,n),e.t0=Y(),!e.t0){e.next=6;break}return e.next=5,_();case 5:e.t0=e.sent;case 6:if(!e.t0){e.next=14;break}console.log("sendBrowserNotification - permissions already granted, attempting to send."),(o=new Notification(t,{requireInteraction:!0,vibrate:[200,100,200],icon:B})).onshow=function(){console.log("sendBrowserNotification - Notification displayed"),E()},console.log("sendBrowserNotification - sent",o),e.next=16;break;case 14:console.log("sendBrowserNotification - permissions denied."),alert(t);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(){return $.apply(this,arguments)}function $(){return($=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("pauseNotifications - current enabled?",L),L=!1,e.next=4,re();case 4:console.log("pauseNotifications - new enabled?",L);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ee(){return te.apply(this,arguments)}function te(){return(te=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("enableNotifications - current enabled?",L),L=!0,console.log("enableNotifications - new enabled?",L);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ne(){return oe.apply(this,arguments)}function oe(){return(oe=Object(l.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("checkNotificationsAvailability"),e.next=3,A();case 3:return t=e.sent,e.next=6,Y();case 6:return n=e.sent,e.next=9,V();case 9:if(!t){e.next=14;break}return e.next=12,F();case 12:e.next=17;break;case 14:if(!n){e.next=17;break}return e.next=17,_();case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ae(){return ie.apply(this,arguments)}function ie(){return(ie=Object(l.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getPendingNotifications"),t={notifications:[]},e.next=4,A();case 4:if(!e.sent){e.next=10;break}return e.next=7,D.a.getPending();case 7:t=e.sent,n=t.notifications,console.log("getPendingNotifications - Notifications",n);case 10:return e.next=12,V();case 12:if(!e.sent){e.next=14;break}console.log("getPendingNotifications - Not implemented for Browser");case 14:return e.abrupt("return",t);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function re(){return se.apply(this,arguments)}function se(){return(se=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("clearScheduledNotifications"),e.next=3,A();case 3:if(!e.sent){e.next=6;break}return e.next=6,z();case 6:return e.next=8,V();case 8:if(!e.sent){e.next=10;break}console.log("clearScheduledNotifications - Not implemented for Browser");case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ce(e){return le.apply(this,arguments)}function le(){return(le=Object(l.a)(c.a.mark((function e(t){var n,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("sendNotification",t,"NOW","enabled",L),!L){e.next=10;break}return n=new Date(Date.now()+1e3),e.next=5,R(t,n);case 5:o=e.sent,console.log("sendNotification - Native Notifications Sent?",o),o||(console.log("sendNotification - Attempting Browser Notification."),Q(t,n)),e.next=11;break;case 10:console.log("sendNotification - Disabled");case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ue(e,t){return pe.apply(this,arguments)}function pe(){return(pe=Object(l.a)(c.a.mark((function e(t,n){var o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("scheduleNotification",t,n,"enabled",L),o=!1,!L){e.next=16;break}return e.next=5,A();case 5:if(!e.sent){e.next=9;break}return e.next=8,R(t,n);case 8:o=e.sent;case 9:return e.next=11,V();case 11:if(!e.sent){e.next=13;break}console.log("scheduleNotification - Not implemented for Browser");case 13:console.log("scheduleNotification?",o),e.next=17;break;case 16:console.log("scheduleNotification - Disabled");case 17:return e.abrupt("return",o);case 18:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(1350);var de=n.p+"static/media/logo-trans-512.70cb432f.png",fe=n(4),ge=void 0,he=!1,me=!1,be="Your meeting will end in 5 minutes",xe="Your meeting has ended",ve="mailto:support@timelymeetings.com",ye="web"!==h.a.getPlatform(),je=function(e){Object(f.a)(n,e);var t=Object(g.a)(n);function n(){var e;return Object(u.a)(this,n),(e=t.call(this)).state={enabled:!1},e.onDurationChange=e.onDurationChange.bind(Object(d.a)(e)),e.onSpeedyChange=e.onSpeedyChange.bind(Object(d.a)(e)),e.onSlotChange=e.onSlotChange.bind(Object(d.a)(e)),e.onRefreshClick=e.onRefreshClick.bind(Object(d.a)(e)),e.togglePause=e.togglePause.bind(Object(d.a)(e)),e.launchSupport=e.launchSupport.bind(Object(d.a)(e)),e}return Object(p.a)(n,[{key:"initializeClock",value:function(){var e=Object(l.a)(c.a.mark((function e(t,n){var o,a,i,r,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(){return(s=Object(l.a)(c.a.mark((function e(){var t,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=i(n),console.log("updateClock"),o=document.body.classList,!(t.total>3e5)){e.next=9;break}o.remove("bodyWarning"),o.remove("bodyComplete"),o.add("bodyDefault"),e.next=16;break;case 9:if(o.add("bodyWarning"),o.remove("bodyComplete"),o.remove("bodyDefault"),he){e.next=16;break}return he=!0,e.next=16,ce(be);case 16:if(!(t.total>0)){e.next=20;break}a(t.hours,t.minutes,t.seconds),e.next=29;break;case 20:if(clearInterval(ge),a(0,0,0),o.remove("bodyWarning"),o.add("bodyComplete"),o.remove("bodyDefault"),me){e.next=29;break}return me=!0,e.next=29,ce(xe);case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)},r=function(){return s.apply(this,arguments)},i=function(e){var t=Date.parse(e)-Date.parse(new Date),n=Math.floor(t/1e3%60),o=Math.floor(t/1e3/60%60),a=Math.floor(t/36e5%24);return{total:t,days:Math.floor(t/864e5),hours:a,minutes:o,seconds:n}},a=function(e,n,o){var a=document.getElementById(t),i=a.querySelector(".hours"),r=a.querySelector(".minutes"),s=a.querySelector(".seconds"),c=("0"+e).slice(-2),l=("0"+n).slice(-2),u=("0"+o).slice(-2);i.innerHTML=c,r.innerHTML=l,s.innerHTML=u,document&&document.title&&(document.title=c+":"+l+":"+u+" - Timely Meetings | Meeting Countdown Timer")},console.log("initializeClock"),clearInterval(ge),he=!1,me=!1,e.next=10,re();case 10:if(!((o=new Date(Date.parse(n)-3e5))>Date.now())){e.next=18;break}return e.next=14,ue(be,o);case 14:if(!e.sent){e.next=16;break}he=!0;case 16:e.next=20;break;case 18:console.log("End time is sooner than the warning time, skipping warning notification."),he=!0;case 20:if(!(n>Date.now())){e.next=27;break}return e.next=23,ue(xe,n);case 23:if(!e.sent){e.next=25;break}me=!0;case 25:e.next=29;break;case 27:console.log("End time has past, skipping end notification."),me=!0;case 29:return console.log("notificationWarningSentOrScheduled",he),console.log("notificationFinalSentOrScheduled",me),e.next=33,ae();case 33:return e.next=35,r();case 35:ge=setInterval(r,1e3);case 36:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"updateMeetingTime",value:function(e,t){console.log("updateMeetingTime");var n={hour:"numeric",minute:"2-digit"},o=e.toLocaleTimeString("en-us",n),a=t.toLocaleTimeString("en-us",n);document.getElementById("meetingTime").textContent=o+" to "+a}},{key:"updateStartTimeOptions",value:function(){console.log("updateStartTimeOptions");var e=function(){var e;return console.log("getMeetingDuration"),(e=document.getElementById("meetingDuration")).options[e.selectedIndex].value}(),t=function(e,t){console.log("getTimeslots");var n=new Date(Date.now());n.setHours(0,0,0,0);var o=new Date(Date.now());o.setHours(23,59,59,99);for(var a=[];n<o;){var i=C(n,15),r=e>=n&&e<i;if(a.push({label:n.toLocaleTimeString(),value:n.toString(),selected:r}),r){for(var s=0;s<4;s++)a.push({label:i.toLocaleTimeString(),value:i.toString(),selected:!1}),i=C(i,15);break}n=i}var c=Math.ceil(t/15)+4;return console.log("slotCount",c),a=a.slice(a.length-c),console.log("slots",a),a}(function(){console.log("getNow");var e=new Date(Date.now()),t=e.toLocaleTimeString(),n={hours:e.getHours(),mins:e.getMinutes(),label:t,date:e};return console.log(n),n}().date,e),n=document.getElementById("meetingSlot");n.options.length=0;var o=void 0;for(var a in t)n.options[n.options.length]=new Option(t[a].label,t[a].value),t[a].selected&&(o=t[a].value);n.value=o}},{key:"updateCountdown",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,n,o,a,i,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("updateCountdown"),O(),t=y(),n=t.meetingDuration,o=t.meetingSlot,a=t.meetingSpeedy,i=new Date(Date.parse(o)),console.log("meetingStartTime",i),!0!==a&&"true"!==a||(n-=5),r=new Date(Date.parse(i)+60*n*1e3),console.log("meetingEndTime",r),this.updateMeetingTime(i,r),e.next=14,this.initializeClock("clockdiv",r);case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onDurationChange",value:function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("onDurationChange"),w(),this.updateStartTimeOptions(),S(this.updateStartTimeOptions),e.next=6,this.updateCountdown();case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onSpeedyChange",value:function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("onSpeedyChange"),N(),e.next=4,this.updateCountdown();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onSlotChange",value:function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("onSlotChange"),e.next=3,this.updateCountdown();case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onRefreshClick",value:function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("onRefreshClick"),this.updateStartTimeOptions(),e.next=4,this.updateCountdown();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"togglePause",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state.enabled,console.log("togglePause - current enabled?",t),t=!t,this.setState({enabled:t}),console.log("togglePause - new enabled?",t),!t){e.next=12;break}return e.next=8,ee();case 8:return e.next=10,this.updateCountdown();case 10:e.next=14;break;case 12:return e.next=14,Z();case 14:return e.next=16,j(t);case 16:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"launchSupport",value:function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("launchSupport",ye),ye?b.a.openUrl({url:ve}):x.a.open({url:ve});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("componentDidMount"),e.next=3,ne();case 3:return this.updateStartTimeOptions(),S(this.updateStartTimeOptions),e.next=7,this.updateCountdown();case 7:if(this.setState({enabled:k()}),console.log(this.state),this.state.enabled){e.next=12;break}return e.next=12,Z();case 12:m.a.hide();case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(fe.jsxs)("div",{className:"content",children:[Object(fe.jsxs)("div",{className:"header",children:[Object(fe.jsx)("img",{src:de,className:"logo",alt:"Timely Meetings logo"}),Object(fe.jsxs)("span",{className:"headerText",children:[Object(fe.jsx)("h1",{children:"Timely Meetings"}),Object(fe.jsx)("h4",{children:"Countdown Timer"})]})]}),Object(fe.jsx)("p",{className:"meetingTime",children:Object(fe.jsx)("span",{id:"meetingTime"})}),Object(fe.jsxs)("div",{id:"clockdiv",children:[Object(fe.jsxs)("div",{children:[Object(fe.jsx)("span",{className:"hours"}),Object(fe.jsx)("div",{className:"clocktext",children:"Hours"})]}),Object(fe.jsxs)("div",{children:[Object(fe.jsx)("span",{className:"minutes"}),Object(fe.jsx)("div",{className:"clocktext",children:"Minutes"})]}),Object(fe.jsxs)("div",{children:[Object(fe.jsx)("span",{className:"seconds"}),Object(fe.jsx)("div",{className:"clocktext",children:"Seconds"})]})]}),Object(fe.jsxs)("div",{children:[Object(fe.jsxs)("p",{children:[Object(fe.jsx)("label",{className:"label",htmlFor:"meetingSlot",children:"Start time: "}),Object(fe.jsx)("select",{className:"select",name:"meetingSlot",id:"meetingSlot",onChange:this.onSlotChange,children:Object(fe.jsx)("option",{value:"-1",children:"Loading ..."})}),Object(fe.jsx)(v.RefreshCircle,{className:"iconRefresh",title:"Reset timer",width:"30px",height:"30px",onClick:this.onRefreshClick}),!1===this.state.enabled&&Object(fe.jsx)(v.NotificationsOffOutline,{className:"iconNotifications",title:"Click to enable notifications",height:"28px",width:"28px",onClick:this.togglePause}),!0===this.state.enabled&&Object(fe.jsx)(v.Notifications,{className:"iconNotifications",title:"Click to disable notifications",height:"28px",width:"28px",onClick:this.togglePause})]}),Object(fe.jsxs)("p",{children:[Object(fe.jsx)("label",{className:"label",htmlFor:"meetingDuration",children:"Duration: "}),Object(fe.jsxs)("select",{className:"select",name:"meetingDuration",id:"meetingDuration",defaultValue:"30",onChange:this.onDurationChange,children:[Object(fe.jsx)("option",{value:"15",children:"15 mins"}),Object(fe.jsx)("option",{value:"30",children:"30 mins"}),Object(fe.jsx)("option",{value:"45",children:"45 mins"}),Object(fe.jsx)("option",{value:"60",children:"1 hour"}),Object(fe.jsx)("option",{value:"90",children:"1.5 hours"}),Object(fe.jsx)("option",{value:"120",children:"2 hours"}),Object(fe.jsx)("option",{value:"150",children:"2.5 hours"}),Object(fe.jsx)("option",{value:"180",children:"3 hours"})]}),Object(fe.jsx)("label",{id:"meetingSpeedyLabel",className:"label",htmlFor:"meetingSpeedy",children:"End early?"}),Object(fe.jsx)("input",{className:"checkbox",type:"checkbox",id:"meetingSpeedy",name:"meetingSpeedy",onChange:this.onSpeedyChange})]}),!ye&&Object(fe.jsx)("p",{children:Object(fe.jsxs)("span",{className:"tinyText copyrightText",children:["\xa9 ",(new Date).getFullYear()," ",Object(fe.jsx)("a",{href:"https://khilnani.org",target:"_blank",rel:"noreferrer",children:"Nik Khilnani"}),Object(fe.jsx)("span",{children:" | "}),Object(fe.jsx)("div",{className:"link",role:"button",tabindex:"0",onClick:this.launchSupport,children:"Support?"})]})})]})]})}}]),n}(o.Component),ke=je,we=function(e){e&&e instanceof Function&&n.e(7).then(n.bind(null,1356)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),o(e),a(e),i(e),r(e)}))};r.a.render(Object(fe.jsx)(a.a.StrictMode,{children:Object(fe.jsx)(ke,{})}),document.getElementById("root")),we()},37:function(e,t,n){}},[[1352,1,2]]]);
//# sourceMappingURL=main.6ae6960c.chunk.js.map