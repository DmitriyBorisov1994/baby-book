"use strict";(self.webpackChunkbaby_book=self.webpackChunkbaby_book||[]).push([[917],{6917:function(e,t,n){n.r(t),n.d(t,{default:function(){return T}});var a=n(1413),r=n(9439),c=n(521),o=n(3433),i=n(7462),l=n(4942),s=n(1002),m=n(1694),u=n.n(m),d=n(2791),f=n(1929),p=n(7908),v=n(284),g=n(2832),h=n(467),y=n(7083),x=n(8295),Z=n(9752),b=n(1113),E=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},C=function(e,t){var n=e.prefixCls,a=e.children,r=e.actions,c=e.extra,o=e.className,s=e.colStyle,m=E(e,["prefixCls","children","actions","extra","className","colStyle"]),p=(0,d.useContext)(j),v=p.grid,g=p.itemLayout,h=(0,d.useContext)(f.E_).getPrefixCls,y=h("list",n),x=r&&r.length>0&&d.createElement("ul",{className:"".concat(y,"-item-action"),key:"actions"},r.map((function(e,t){return d.createElement("li",{key:"".concat(y,"-item-action-").concat(t)},e,t!==r.length-1&&d.createElement("em",{className:"".concat(y,"-item-action-split")}))}))),C=v?"div":"li",N=d.createElement(C,(0,i.Z)({},m,v?{}:{ref:t},{className:u()("".concat(y,"-item"),(0,l.Z)({},"".concat(y,"-item-no-flex"),!("vertical"===g?c:!function(){var e;return d.Children.forEach(a,(function(t){"string"===typeof t&&(e=!0)})),e&&d.Children.count(a)>1}())),o)}),"vertical"===g&&c?[d.createElement("div",{className:"".concat(y,"-item-main"),key:"content"},a,x),d.createElement("div",{className:"".concat(y,"-item-extra"),key:"extra"},c)]:[a,x,(0,b.Tm)(c,{key:"extra"})]);return v?d.createElement(Z.Z,{ref:t,flex:1,style:s},N):N},N=(0,d.forwardRef)(C);N.Meta=function(e){var t=e.prefixCls,n=e.className,a=e.avatar,r=e.title,c=e.description,o=E(e,["prefixCls","className","avatar","title","description"]),l=(0,(0,d.useContext)(f.E_).getPrefixCls)("list",t),s=u()("".concat(l,"-item-meta"),n),m=d.createElement("div",{className:"".concat(l,"-item-meta-content")},r&&d.createElement("h4",{className:"".concat(l,"-item-meta-title")},r),c&&d.createElement("div",{className:"".concat(l,"-item-meta-description")},c));return d.createElement("div",(0,i.Z)({},o,{className:s}),a&&d.createElement("div",{className:"".concat(l,"-item-meta-avatar")},a),(r||c)&&m)};var S=N,O=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},j=d.createContext({});j.Consumer;function w(e){var t,n=e.pagination,a=void 0!==n&&n,c=e.prefixCls,m=e.bordered,Z=void 0!==m&&m,b=e.split,E=void 0===b||b,C=e.className,N=e.children,S=e.itemLayout,w=e.loadMore,k=e.grid,P=e.dataSource,z=void 0===P?[]:P,I=e.size,M=e.header,L=e.footer,_=e.loading,T=void 0!==_&&_,G=e.rowKey,K=e.renderItem,R=e.locale,q=O(e,["pagination","prefixCls","bordered","split","className","children","itemLayout","loadMore","grid","dataSource","size","header","footer","loading","rowKey","renderItem","locale"]),H=a&&"object"===(0,s.Z)(a)?a:{},J=d.useState(H.defaultCurrent||1),W=(0,r.Z)(J,2),A=W[0],B=W[1],D=d.useState(H.defaultPageSize||10),F=(0,r.Z)(D,2),Q=F[0],U=F[1],V=d.useContext(f.E_),X=V.getPrefixCls,Y=V.renderEmpty,$=V.direction,ee={},te=function(e){return function(t,n){B(t),U(n),a&&a[e]&&a[e](t,n)}},ne=te("onChange"),ae=te("onShowSizeChange"),re=X("list",c),ce=T;"boolean"===typeof ce&&(ce={spinning:ce});var oe=ce&&ce.spinning,ie="";switch(I){case"large":ie="lg";break;case"small":ie="sm"}var le=u()(re,(t={},(0,l.Z)(t,"".concat(re,"-vertical"),"vertical"===S),(0,l.Z)(t,"".concat(re,"-").concat(ie),ie),(0,l.Z)(t,"".concat(re,"-split"),E),(0,l.Z)(t,"".concat(re,"-bordered"),Z),(0,l.Z)(t,"".concat(re,"-loading"),oe),(0,l.Z)(t,"".concat(re,"-grid"),!!k),(0,l.Z)(t,"".concat(re,"-something-after-last-item"),!!(w||a||L)),(0,l.Z)(t,"".concat(re,"-rtl"),"rtl"===$),t),C),se=(0,i.Z)((0,i.Z)((0,i.Z)({},{current:1,total:0}),{total:z.length,current:A,pageSize:Q}),a||{}),me=Math.ceil(se.total/se.pageSize);se.current>me&&(se.current=me);var ue=a?d.createElement("div",{className:"".concat(re,"-pagination")},d.createElement(h.Z,(0,i.Z)({},se,{onChange:ne,onShowSizeChange:ae}))):null,de=(0,o.Z)(z);a&&z.length>(se.current-1)*se.pageSize&&(de=(0,o.Z)(z).splice((se.current-1)*se.pageSize,se.pageSize));var fe=Object.keys(k||{}).some((function(e){return["xs","sm","md","lg","xl","xxl"].includes(e)})),pe=(0,g.Z)(fe),ve=d.useMemo((function(){for(var e=0;e<x.c4.length;e+=1){var t=x.c4[e];if(pe[t])return t}}),[pe]),ge=d.useMemo((function(){if(k){var e=ve&&k[ve]?k[ve]:k.column;return e?{width:"".concat(100/e,"%"),maxWidth:"".concat(100/e,"%")}:void 0}}),[null===k||void 0===k?void 0:k.column,ve]),he=oe&&d.createElement("div",{style:{minHeight:53}});if(de.length>0){var ye=de.map((function(e,t){return function(e,t){return K?((n="function"===typeof G?G(e):G?e[G]:e.key)||(n="list-item-".concat(t)),ee[t]=n,K(e,t)):null;var n}(e,t)})),xe=d.Children.map(ye,(function(e,t){return d.createElement("div",{key:ee[t],style:ge},e)}));he=k?d.createElement(v.Z,{gutter:k.gutter},xe):d.createElement("ul",{className:"".concat(re,"-items")},ye)}else N||oe||(he=function(e,t){return d.createElement("div",{className:"".concat(e,"-empty-text")},R&&R.emptyText||t("List"))}(re,Y||p.Z));var Ze=se.position||"bottom",be=d.useMemo((function(){return{grid:k,itemLayout:S}}),[JSON.stringify(k),S]);return d.createElement(j.Provider,{value:be},d.createElement("div",(0,i.Z)({className:le},q),("top"===Ze||"both"===Ze)&&ue,M&&d.createElement("div",{className:"".concat(re,"-header")},M),d.createElement(y.Z,(0,i.Z)({},ce),he,N),L&&d.createElement("div",{className:"".concat(re,"-footer")},L),w||("bottom"===Ze||"both"===Ze)&&ue))}w.Item=S;var k=w,P=n(2014),z=n(4740),I=n(6875),M=n(3329),L=c.Z.Text,_=c.Z.Paragraph,T=function(e){var t=e.noteId,n=(0,I.wR)(),c=(0,r.Z)(n,1)[0],o=(0,z.CG)((function(e){return e.auth.userId})),i=(0,z.CG)((function(e){return(0,I.qu)(e,t)}));return null!==i&&void 0!==i&&i.length?(0,M.jsx)(k,{size:"large",children:null===i||void 0===i?void 0:i.map((function(e){return(0,M.jsx)(k.Item,{className:"list-item",children:(0,M.jsxs)("div",{className:"list-content-wrapper",children:[(0,M.jsx)(L,{type:e.completed?"success":"danger",delete:!!e.completed,children:e.text}),(0,M.jsx)(P.Z,{onChange:function(){var t=(0,a.Z)((0,a.Z)({},e),{},{completed:!e.completed});c({userId:o,updatedTodo:t})},checked:e.completed})]})},e.todoId)}))}):(0,M.jsx)(_,{children:(0,M.jsx)(L,{type:"secondary",children:"\u0423 \u0432\u0430\u0441 \u043d\u0435 \u0437\u0430\u043f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u043d\u0438\u043a\u0430\u043a\u0438\u0445 \u0434\u0435\u043b"})})}}}]);
//# sourceMappingURL=917.45f778c6.chunk.js.map