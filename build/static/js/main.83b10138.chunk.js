(this.webpackJsonpclose=this.webpackJsonpclose||[]).push([[0],{308:function(e,t,n){},346:function(e,t,n){},349:function(e,t){},351:function(e,t){},395:function(e,t){},397:function(e,t){},425:function(e,t){},427:function(e,t){},428:function(e,t){},433:function(e,t){},435:function(e,t){},441:function(e,t){},443:function(e,t){},462:function(e,t){},474:function(e,t){},477:function(e,t){},547:function(e,t,n){},548:function(e,t,n){},549:function(e,t,n){},550:function(e,t,n){"use strict";n.r(t);var c,o=n(0),a=n(82),i=n.n(a),l=(n(308),n(21)),s=n(9),r=n(26),b=n.n(r),u=n(224),d=(n(40),n(60)),j=n.n(d),g=n(552),f=n(553),p=n(554),h=n(555);function m(e){var t=e.src,n=e.width,o=void 0===n?50:n,a=e.height,i=void 0===a?50:a,l=e.func,s=void 0===l?function(){}:l,r=e.lat,b=void 0===r?59.93:r,u=e.lng,d=void 0===u?30.19:u,g=e.className,f=void 0===g?"marker":g,p=e.map,h=e.arg,m=e.setInfo,O=e.name,x=e.subtitle,v=e.text,w=document.createElement("div");w.className=f,w.style.backgroundImage="url(".concat(t,")"),w.style.width="".concat(o,"px"),w.style.height="".concat(i,"px"),w.style.backgroundSize="100%",w.addEventListener("click",(function(){if(console.log("click"),"buildings"==f){var e=[p.getCenter().lng,p.getCenter().lat],n=p.getZoom();m({name:O,subtitle:x,text:v,src:t,goBack:{center:e,zoom:n},center:e})}"buildings"==f?p.flyTo({center:[d,b-.003/(812/window.innerHeight)],zoom:15}):p.flyTo({center:[d,b],zoom:15}),s&&s(h)})),"me"==f?(c&&c.remove(),console.log("me"),c=new j.a.Marker(w).setLngLat([d,b]).addTo(p)):(console.log(f),new j.a.Marker(w).setLngLat([d,b]).addTo(p))}var O=n(6);j.a.accessToken="pk.eyJ1IjoibWl0dXJza3kiLCJhIjoiY2t1Mm1rODBoMnNlejJzcW56MnJ6dmFzOSJ9.czgQtgAZPb81wq1ahUZmgQ";var x,v,w,k=function(e){e.setActivePanel,e.socket,e.theme;var t=e.setModal,n=e.map,c=e.lng,a=e.lat,i=e.zoom,r=(e.info,e.setInfo),d=e.loadGeo,x=e.error,v=(e.setError,e.setLoadGeo),w=Object(o.useState)([]),k=Object(l.a)(w,2),y=(k[0],k[1],Object(o.useState)(250)),G=Object(l.a)(y,2),S=(G[0],G[1],Object(o.useState)(null)),A=Object(l.a)(S,2),W=A[0],z=A[1],K=Object(o.useRef)(null);return Object(o.useEffect)((function(){n.current||(n.current=new j.a.Map({container:K.current,style:"mapbox://styles/mapbox/streets-v11",center:[c,a],zoom:i,maxZoom:15,minZoom:10}),m({src:"https://guideshop.ru/wp-content/uploads/2020/11/original.jpg",className:"buildings",map:n.current,func:t,arg:"info",name:"\u0414\u0432\u043e\u0440\u0435\u0446 \u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",subtitle:"\u041f\u043e\u0441\u0442\u0440\u043e\u0435\u043d \u0432 1234\u0433.",text:"\u041e\u0447\u0435\u043d\u044c \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u044e\u0449\u0438\u0439 \u0434\u0432\u043e\u0440\u0435\u0446, \u041f\u0438\u0442\u0435\u0440 \u043a\u043b\u0430\u0441\u0441\u043d\u044b\u0439 \u0433\u043e\u0440\u043e\u0434, \u0434\u043e\u0436\u0434\u0438\n      \u0432 \u043d\u0451\u043c \u043c\u0435\u043d\u044f \u0441\u043e\u0432\u0441\u0435\u043c \u043d\u0435 \u0431\u0435\u0441\u043f\u043e\u043a\u043e\u044f\u0442. \u042d\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u0440\u044b\u0431\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442. \u0420\u044b\u0431\u044b - \u043b\u0443\u0447\u0448\u0438\u0435. \n      \u041e\u0447\u0435\u043d\u044c \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u044e\u0449\u0438\u0439 \u0434\u0432\u043e\u0440\u0435\u0446, \u041f\u0438\u0442\u0435\u0440 \u043a\u043b\u0430\u0441\u0441\u043d\u044b\u0439 \u0433\u043e\u0440\u043e\u0434, \u0434\u043e\u0436\u0434\u0438\n      \u0432 \u043d\u0451\u043c \u043c\u0435\u043d\u044f \u0441\u043e\u0432\u0441\u0435\u043c \u043d\u0435 \u0431\u0435\u0441\u043f\u043e\u043a\u043e\u044f\u0442. \u042d\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u0440\u044b\u0431\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442. ",setInfo:r}),m(Object(u.a)({src:"https://sun9-20.userapi.com/t9YgK6pARK4PHv6ESD3OsUL0RIqiWe5QFM49Yg/xVdW7mK6Abs.jpg",className:"buildings",map:n.current,lng:30.33,lat:59.93,setInfo:r,func:t,arg:"info",name:"\u041f\u0430\u043c\u044f\u0442\u043d\u0438\u043a \u043a\u0443\u043b\u044c\u0442\u0443\u0440\u044b",subtitle:"\u041f\u043e\u0441\u0442\u0440\u043e\u0435\u043d \u0432 1783\u0433.",text:"\u041e\u0447\u0435\u043d\u044c \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u044e\u0449\u0438\u0439 \u043f\u0430\u043c\u044f\u0442\u043d\u0438\u043a, \u041f\u0438\u0442\u0435\u0440 \u043a\u043b\u0430\u0441\u0441\u043d\u044b\u0439 \u0433\u043e\u0440\u043e\u0434, \u0434\u043e\u0436\u0434\u0438\n      \u0432 \u043d\u0451\u043c \u043c\u0435\u043d\u044f \u0441\u043e\u0432\u0441\u0435\u043c \u043d\u0435 \u0431\u0435\u0441\u043f\u043e\u043a\u043e\u044f\u0442. \u042d\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u0440\u044b\u0431\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442. \u0420\u044b\u0431\u044b - \u043b\u0443\u0447\u0448\u0438\u0435. \n      \u041e\u0447\u0435\u043d\u044c \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u044e\u0449\u0438\u0439 \u043f\u0430\u043c\u044f\u0442\u043d\u0438\u043a, \u041f\u0438\u0442\u0435\u0440 \u043a\u043b\u0430\u0441\u0441\u043d\u044b\u0439 \u0433\u043e\u0440\u043e\u0434, \u0434\u043e\u0436\u0434\u0438\n      \u0432 \u043d\u0451\u043c \u043c\u0435\u043d\u044f \u0441\u043e\u0432\u0441\u0435\u043c \u043d\u0435 \u0431\u0435\u0441\u043f\u043e\u043a\u043e\u044f\u0442. \u042d\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u0440\u044b\u0431\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442.  \n      \u041e\u0447\u0435\u043d\u044c \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u044e\u0449\u0438\u0439 \u043f\u0430\u043c\u044f\u0442\u043d\u0438\u043a, \u041f\u0438\u0442\u0435\u0440 \u043a\u043b\u0430\u0441\u0441\u043d\u044b\u0439 \u0433\u043e\u0440\u043e\u0434, \u0434\u043e\u0436\u0434\u0438\n      \u0432 \u043d\u0451\u043c \u043c\u0435\u043d\u044f \u0441\u043e\u0432\u0441\u0435\u043c \u043d\u0435 \u0431\u0435\u0441\u043f\u043e\u043a\u043e\u044f\u0442. \u042d\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u0440\u044b\u0431\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442. \u0420\u044b\u0431\u044b - \u043b\u0443\u0447\u0448\u0438\u0435. \n      \u041e\u0447\u0435\u043d\u044c \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u044e\u0449\u0438\u0439 \u043f\u0430\u043c\u044f\u0442\u043d\u0438\u043a, \u041f\u0438\u0442\u0435\u0440 \u043a\u043b\u0430\u0441\u0441\u043d\u044b\u0439 \u0433\u043e\u0440\u043e\u0434, \u0434\u043e\u0436\u0434\u0438\n      \u0432 \u043d\u0451\u043c \u043c\u0435\u043d\u044f \u0441\u043e\u0432\u0441\u0435\u043c \u043d\u0435 \u0431\u0435\u0441\u043f\u043e\u043a\u043e\u044f\u0442. \u042d\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u0440\u044b\u0431\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442."},"setInfo",r)))})),Object(o.useEffect)((function(){b.a.subscribe((function(e){var t,n=e.detail,c=n.type,o=n.data;console.log(c),console.log(o),("VKWebAppGeodataFailed"==c||"VKWebAppGetGeodataFailed"==c||"VKWebAppGetGeodataResult"==c&&!o.available||"VKWebAppGetGeodataResult"==c&&!o.lat)&&(t="\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u0435 \u043c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0435, \u0447\u0442\u043e\u0431\u044b \u043c\u044b \u0441\u043c\u043e\u0433\u043b\u0438 \u0432\u0430\u0441 \u043d\u0430\u0439\u0442\u0438.",W||z(Object(O.jsx)(s.r,{onClose:function(){return z(null)},before:Object(O.jsx)(s.d,{size:24,children:Object(O.jsx)(g.a,{width:24,height:24})}),children:t})))}))}),[]),Object(O.jsxs)(s.p,{id:"main",children:[Object(O.jsx)("div",{ref:K,className:"map-container",style:{height:window.innerHeight+"px"}}),Object(O.jsxs)(s.h,{vertical:"bottom",children:[Object(O.jsx)(s.v,{selected:!0,before:Object(O.jsx)(f.a,{width:24,height:24}),style:{marginTop:"12px",marginLeft:"8px",position:"absolute"},children:"0/10 \u0422\u043e\u0447\u0435\u043a"}),Object(O.jsx)(s.l,{hasActive:!1,style:{backgroundColor:d?"#000000b8":"var(--accent)",marginBottom:"8px",marginLeft:window.innerWidth-56+"px"},onClick:function(){b.a.send("VKWebAppGetGeodata"),v(!0)},children:d?x?Object(O.jsx)(h.a,{fill:"white"}):Object(O.jsx)(s.s,{size:"small",style:{color:"var(--button_primary_foreground)"}}):Object(O.jsx)(p.a,{width:24,height:24,fill:"white"})})]}),W]})},y=(n(321),n(322),n(556)),G=(n(346),n(347),n(495),n(547),function(e){var t=e.modal,n=e.setModal,c=(e.socket,e.text),a=(e.setText,e.platformSign,e.info),i=e.geodata,r=e.map,b=Object(s.A)(),u=Object(o.useState)([]),d=Object(l.a)(u,2),j=(d[0],d[1],Object(o.useState)()),g=Object(l.a)(j,2),p=(g[0],g[1],Object(o.useState)({})),h=Object(l.a)(p,2),m=h[0];h[1];return window.text=c,window.user=m,Object(o.useEffect)((function(){x=function(){console.log(a),a.goBack&&r.current.flyTo({center:a.goBack.center,zoom:a.goBack.zoom})}})),Object(O.jsx)(s.o,{activeModal:t,children:Object(O.jsx)(s.m,{id:"info",onClose:function(){n(null),x()},header:Object(O.jsx)(s.n,{left:Object(O.jsx)(o.Fragment,{children:(b===s.a||b===s.y)&&Object(O.jsx)(s.q,{onClick:function(){n(null),x()},children:Object(O.jsx)(y.a,{})})}),right:Object(O.jsx)(o.Fragment,{children:b===s.k&&Object(O.jsx)(s.q,{onClick:function(){n(null),x()},children:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"})}),children:"\u0414\u0432\u043e\u0440\u0435\u0446"}),children:Object(O.jsxs)("body",{children:[Object(O.jsx)("img",{src:a.src,height:"200px",width:window.innerWidth+"px",style:{objectFit:"cover"}}),Object(O.jsx)(s.g,{children:Object(O.jsxs)(s.i,{children:[Object(O.jsx)(s.x,{level:"1",weight:"semibold",style:{marginBottom:4},children:a.name}),Object(O.jsx)(s.j,{weight:"regular",style:{marginBottom:16,color:"#6d6d6d"},children:a.subtitle}),Object(O.jsx)(s.w,{weight:"regular",style:{marginBottom:16,fontSize:"20px",lineHeight:"24px"},children:a.text})]})}),Object(O.jsx)(s.h,{vertical:"top",style:{display:"flex",height:"48px",marginTop:"60px"},children:Object(O.jsx)(s.e,{size:"l",before:Object(O.jsx)(f.a,{width:24,height:24}),style:{boxShadow:"0px 0px 10px 5px rgb(73 133 204 / 20%)",marginLeft:"8px"},onClick:function(){var e=document.createElement("a");Object.assign(e,{href:"https://www.google.com/maps/dir/?api=1&origin=".concat(i&&i.lat?i.lat+","+i.long:"","&destination=").concat(a.center[1],",").concat(a.center[0],"&zoom=20&travelmode=transit"),target:"_blank"}),e.click()},children:"\u041c\u0430\u0440\u0448\u0440\u0443\u0442"})})]})})})});n(548),n(549);function S(){var e=Object(o.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],a=Object(o.useState)(!0),i=Object(l.a)(a,2),r=i[0],u=i[1],d=Object(o.useState)("main"),j=Object(l.a)(d,2),g=j[0],f=j[1],p=Object(o.useState)("white"),h=Object(l.a)(p,2),x=h[0],y=h[1],S=Object(o.useState)({photo_200:"",name:"",id:0}),A=Object(l.a)(S,2),W=A[0],z=A[1],K=Object(o.useState)(null),V=Object(l.a)(K,2),I=V[0],C=V[1],L=Object(o.useState)(""),T=Object(l.a)(L,2),F=T[0],B=T[1],E=Object(o.useState)({lat:null,long:null}),M=Object(l.a)(E,2),R=M[0],J=M[1],_=Object(o.useState)(30.19),N=Object(l.a)(_,2),P=N[0],U=(N[1],Object(o.useState)(59.93)),Z=Object(l.a)(U,2),q=Z[0],H=(Z[1],Object(o.useState)(11)),D=Object(l.a)(H,2),Q=D[0],Y=(D[1],Object(o.useState)({})),X=Object(l.a)(Y,2),$=X[0],ee=X[1],te=Object(o.useRef)(null),ne=window.location.search.slice(1).split("platform=")[1].split("&")[0];return console.log(R,W),(null===W||void 0===W?void 0:W.first_name)&&(null===R||void 0===R?void 0:R.lat)&&m({src:W.photo_200,className:"me",map:te.current,lng:R.long,lat:R.lat}),Object(o.useEffect)((function(){w=function(e){J(e),I||te.current.flyTo({center:[e.long,e.lat]}),u(!1)}})),Object(o.useEffect)((function(){b.a.subscribe((function(e){var t=e.detail,n=t.type,o=t.data;(console.log(n),console.log(o),"VKWebAppUpdateConfig"===n)&&(document.createAttribute("scheme").value=o.scheme?o.scheme:"client_light",y(o.scheme&&"bright_light"==o.scheme?"white":"black"));"VKWebAppGeodataResult"!==n&&"VKWebAppGetGeodataResult"!==n||o.available&&o.lat&&(w(o),c(!1)),"VKWebAppGetUserInfoResult"===n&&(z(o),b.a.send("VKWebAppGetGeodata")),("VKWebAppGeodataFailed"==n||"VKWebAppGetGeodataFailed"==n||"VKWebAppGetGeodataResult"==n&&!o.available||"VKWebAppGetGeodataResult"==n&&!o.lat)&&c(!0)})),b.a.send("VKWebAppGetUserInfo")}),[]),Object(O.jsx)(s.u,{children:Object(O.jsx)(s.t,{children:Object(O.jsx)(s.z,{activePanel:g,modal:Object(O.jsx)(G,{modal:I,socket:v,setModal:C,text:F,info:$,map:te,setText:B,geodata:R,platformSign:ne}),children:Object(O.jsx)(k,{text:F,setText:B,theme:x,lng:P,lat:q,zoom:Q,info:$,setInfo:ee,socket:v,setActivePanel:f,id:"main",setModal:C,map:te,error:n,setError:c,loadGeo:r,setLoadGeo:u})})})})}b.a.send("VKWebAppInit"),console.log("production");var A=S=Object(s.B)(S,{viewWidth:!0}),W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,557)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),o(e),a(e),i(e)}))};i.a.render(Object(O.jsx)(s.f,{children:Object(O.jsx)(s.b,{children:Object(O.jsx)(s.c,{children:Object(O.jsx)(A,{})})})}),document.getElementById("root")),W()}},[[550,1,2]]]);