(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var L0={exports:{}},Cc={},D0={exports:{}},it={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wa=Symbol.for("react.element"),s1=Symbol.for("react.portal"),o1=Symbol.for("react.fragment"),a1=Symbol.for("react.strict_mode"),l1=Symbol.for("react.profiler"),c1=Symbol.for("react.provider"),u1=Symbol.for("react.context"),h1=Symbol.for("react.forward_ref"),d1=Symbol.for("react.suspense"),f1=Symbol.for("react.memo"),p1=Symbol.for("react.lazy"),kp=Symbol.iterator;function m1(t){return t===null||typeof t!="object"?null:(t=kp&&t[kp]||t["@@iterator"],typeof t=="function"?t:null)}var N0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},I0=Object.assign,U0={};function uo(t,e,n){this.props=t,this.context=e,this.refs=U0,this.updater=n||N0}uo.prototype.isReactComponent={};uo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};uo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function F0(){}F0.prototype=uo.prototype;function cf(t,e,n){this.props=t,this.context=e,this.refs=U0,this.updater=n||N0}var uf=cf.prototype=new F0;uf.constructor=cf;I0(uf,uo.prototype);uf.isPureReactComponent=!0;var Op=Array.isArray,k0=Object.prototype.hasOwnProperty,hf={current:null},O0={key:!0,ref:!0,__self:!0,__source:!0};function B0(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)k0.call(e,i)&&!O0.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:wa,type:t,key:s,ref:o,props:r,_owner:hf.current}}function g1(t,e){return{$$typeof:wa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function df(t){return typeof t=="object"&&t!==null&&t.$$typeof===wa}function _1(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Bp=/\/+/g;function iu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?_1(""+t.key):e.toString(36)}function Cl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case wa:case s1:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+iu(o,0):i,Op(r)?(n="",t!=null&&(n=t.replace(Bp,"$&/")+"/"),Cl(r,e,n,"",function(c){return c})):r!=null&&(df(r)&&(r=g1(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Bp,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Op(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+iu(s,a);o+=Cl(s,e,n,l,r)}else if(l=m1(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+iu(s,a++),o+=Cl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Na(t,e,n){if(t==null)return t;var i=[],r=0;return Cl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function v1(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var _n={current:null},Rl={transition:null},x1={ReactCurrentDispatcher:_n,ReactCurrentBatchConfig:Rl,ReactCurrentOwner:hf};function z0(){throw Error("act(...) is not supported in production builds of React.")}it.Children={map:Na,forEach:function(t,e,n){Na(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Na(t,function(){e++}),e},toArray:function(t){return Na(t,function(e){return e})||[]},only:function(t){if(!df(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};it.Component=uo;it.Fragment=o1;it.Profiler=l1;it.PureComponent=cf;it.StrictMode=a1;it.Suspense=d1;it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=x1;it.act=z0;it.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=I0({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=hf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)k0.call(e,l)&&!O0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:wa,type:t.type,key:r,ref:s,props:i,_owner:o}};it.createContext=function(t){return t={$$typeof:u1,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:c1,_context:t},t.Consumer=t};it.createElement=B0;it.createFactory=function(t){var e=B0.bind(null,t);return e.type=t,e};it.createRef=function(){return{current:null}};it.forwardRef=function(t){return{$$typeof:h1,render:t}};it.isValidElement=df;it.lazy=function(t){return{$$typeof:p1,_payload:{_status:-1,_result:t},_init:v1}};it.memo=function(t,e){return{$$typeof:f1,type:t,compare:e===void 0?null:e}};it.startTransition=function(t){var e=Rl.transition;Rl.transition={};try{t()}finally{Rl.transition=e}};it.unstable_act=z0;it.useCallback=function(t,e){return _n.current.useCallback(t,e)};it.useContext=function(t){return _n.current.useContext(t)};it.useDebugValue=function(){};it.useDeferredValue=function(t){return _n.current.useDeferredValue(t)};it.useEffect=function(t,e){return _n.current.useEffect(t,e)};it.useId=function(){return _n.current.useId()};it.useImperativeHandle=function(t,e,n){return _n.current.useImperativeHandle(t,e,n)};it.useInsertionEffect=function(t,e){return _n.current.useInsertionEffect(t,e)};it.useLayoutEffect=function(t,e){return _n.current.useLayoutEffect(t,e)};it.useMemo=function(t,e){return _n.current.useMemo(t,e)};it.useReducer=function(t,e,n){return _n.current.useReducer(t,e,n)};it.useRef=function(t){return _n.current.useRef(t)};it.useState=function(t){return _n.current.useState(t)};it.useSyncExternalStore=function(t,e,n){return _n.current.useSyncExternalStore(t,e,n)};it.useTransition=function(){return _n.current.useTransition()};it.version="18.3.1";D0.exports=it;var ze=D0.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y1=ze,S1=Symbol.for("react.element"),M1=Symbol.for("react.fragment"),w1=Object.prototype.hasOwnProperty,E1=y1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b1={key:!0,ref:!0,__self:!0,__source:!0};function V0(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)w1.call(e,i)&&!b1.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:S1,type:t,key:s,ref:o,props:r,_owner:E1.current}}Cc.Fragment=M1;Cc.jsx=V0;Cc.jsxs=V0;L0.exports=Cc;var k=L0.exports,H0={exports:{}},zn={},G0={exports:{}},W0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(L,V){var j=L.length;L.push(V);e:for(;0<j;){var H=j-1>>>1,I=L[H];if(0<r(I,V))L[H]=V,L[j]=I,j=H;else break e}}function n(L){return L.length===0?null:L[0]}function i(L){if(L.length===0)return null;var V=L[0],j=L.pop();if(j!==V){L[0]=j;e:for(var H=0,I=L.length,ne=I>>>1;H<ne;){var te=2*(H+1)-1,J=L[te],O=te+1,Y=L[O];if(0>r(J,j))O<I&&0>r(Y,J)?(L[H]=Y,L[O]=j,H=O):(L[H]=J,L[te]=j,H=te);else if(O<I&&0>r(Y,j))L[H]=Y,L[O]=j,H=O;else break e}}return V}function r(L,V){var j=L.sortIndex-V.sortIndex;return j!==0?j:L.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,d=null,u=3,p=!1,_=!1,v=!1,m=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(L){for(var V=n(c);V!==null;){if(V.callback===null)i(c);else if(V.startTime<=L)i(c),V.sortIndex=V.expirationTime,e(l,V);else break;V=n(c)}}function M(L){if(v=!1,x(L),!_)if(n(l)!==null)_=!0,U(b);else{var V=n(c);V!==null&&P(M,V.startTime-L)}}function b(L,V){_=!1,v&&(v=!1,f(y),y=-1),p=!0;var j=u;try{for(x(V),d=n(l);d!==null&&(!(d.expirationTime>V)||L&&!N());){var H=d.callback;if(typeof H=="function"){d.callback=null,u=d.priorityLevel;var I=H(d.expirationTime<=V);V=t.unstable_now(),typeof I=="function"?d.callback=I:d===n(l)&&i(l),x(V)}else i(l);d=n(l)}if(d!==null)var ne=!0;else{var te=n(c);te!==null&&P(M,te.startTime-V),ne=!1}return ne}finally{d=null,u=j,p=!1}}var w=!1,C=null,y=-1,A=5,F=-1;function N(){return!(t.unstable_now()-F<A)}function D(){if(C!==null){var L=t.unstable_now();F=L;var V=!0;try{V=C(!0,L)}finally{V?W():(w=!1,C=null)}}else w=!1}var W;if(typeof g=="function")W=function(){g(D)};else if(typeof MessageChannel<"u"){var q=new MessageChannel,R=q.port2;q.port1.onmessage=D,W=function(){R.postMessage(null)}}else W=function(){m(D,0)};function U(L){C=L,w||(w=!0,W())}function P(L,V){y=m(function(){L(t.unstable_now())},V)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(L){L.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,U(b))},t.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<L?Math.floor(1e3/L):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(L){switch(u){case 1:case 2:case 3:var V=3;break;default:V=u}var j=u;u=V;try{return L()}finally{u=j}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(L,V){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var j=u;u=L;try{return V()}finally{u=j}},t.unstable_scheduleCallback=function(L,V,j){var H=t.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?H+j:H):j=H,L){case 1:var I=-1;break;case 2:I=250;break;case 5:I=1073741823;break;case 4:I=1e4;break;default:I=5e3}return I=j+I,L={id:h++,callback:V,priorityLevel:L,startTime:j,expirationTime:I,sortIndex:-1},j>H?(L.sortIndex=j,e(c,L),n(l)===null&&L===n(c)&&(v?(f(y),y=-1):v=!0,P(M,j-H))):(L.sortIndex=I,e(l,L),_||p||(_=!0,U(b))),L},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(L){var V=u;return function(){var j=u;u=V;try{return L.apply(this,arguments)}finally{u=j}}}})(W0);G0.exports=W0;var T1=G0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var A1=ze,Bn=T1;function de(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var j0=new Set,Zo={};function es(t,e){Ys(t,e),Ys(t+"Capture",e)}function Ys(t,e){for(Zo[t]=e,t=0;t<e.length;t++)j0.add(e[t])}var zi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xh=Object.prototype.hasOwnProperty,C1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zp={},Vp={};function R1(t){return xh.call(Vp,t)?!0:xh.call(zp,t)?!1:C1.test(t)?Vp[t]=!0:(zp[t]=!0,!1)}function P1(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function L1(t,e,n,i){if(e===null||typeof e>"u"||P1(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function vn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var tn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tn[t]=new vn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tn[e]=new vn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tn[t]=new vn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tn[t]=new vn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tn[t]=new vn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tn[t]=new vn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tn[t]=new vn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tn[t]=new vn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tn[t]=new vn(t,5,!1,t.toLowerCase(),null,!1,!1)});var ff=/[\-:]([a-z])/g;function pf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ff,pf);tn[e]=new vn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ff,pf);tn[e]=new vn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ff,pf);tn[e]=new vn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tn[t]=new vn(t,1,!1,t.toLowerCase(),null,!1,!1)});tn.xlinkHref=new vn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tn[t]=new vn(t,1,!1,t.toLowerCase(),null,!0,!0)});function mf(t,e,n,i){var r=tn.hasOwnProperty(e)?tn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(L1(e,n,r,i)&&(n=null),i||r===null?R1(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var ji=A1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ia=Symbol.for("react.element"),Ms=Symbol.for("react.portal"),ws=Symbol.for("react.fragment"),gf=Symbol.for("react.strict_mode"),yh=Symbol.for("react.profiler"),X0=Symbol.for("react.provider"),q0=Symbol.for("react.context"),_f=Symbol.for("react.forward_ref"),Sh=Symbol.for("react.suspense"),Mh=Symbol.for("react.suspense_list"),vf=Symbol.for("react.memo"),nr=Symbol.for("react.lazy"),$0=Symbol.for("react.offscreen"),Hp=Symbol.iterator;function _o(t){return t===null||typeof t!="object"?null:(t=Hp&&t[Hp]||t["@@iterator"],typeof t=="function"?t:null)}var Pt=Object.assign,ru;function Io(t){if(ru===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);ru=e&&e[1]||""}return`
`+ru+t}var su=!1;function ou(t,e){if(!t||su)return"";su=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{su=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Io(t):""}function D1(t){switch(t.tag){case 5:return Io(t.type);case 16:return Io("Lazy");case 13:return Io("Suspense");case 19:return Io("SuspenseList");case 0:case 2:case 15:return t=ou(t.type,!1),t;case 11:return t=ou(t.type.render,!1),t;case 1:return t=ou(t.type,!0),t;default:return""}}function wh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ws:return"Fragment";case Ms:return"Portal";case yh:return"Profiler";case gf:return"StrictMode";case Sh:return"Suspense";case Mh:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case q0:return(t.displayName||"Context")+".Consumer";case X0:return(t._context.displayName||"Context")+".Provider";case _f:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case vf:return e=t.displayName||null,e!==null?e:wh(t.type)||"Memo";case nr:e=t._payload,t=t._init;try{return wh(t(e))}catch{}}return null}function N1(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return wh(e);case 8:return e===gf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function xr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Y0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function I1(t){var e=Y0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ua(t){t._valueTracker||(t._valueTracker=I1(t))}function K0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Y0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function $l(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Eh(t,e){var n=e.checked;return Pt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Gp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=xr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Z0(t,e){e=e.checked,e!=null&&mf(t,"checked",e,!1)}function bh(t,e){Z0(t,e);var n=xr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Th(t,e.type,n):e.hasOwnProperty("defaultValue")&&Th(t,e.type,xr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Wp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Th(t,e,n){(e!=="number"||$l(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Uo=Array.isArray;function Fs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+xr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Ah(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(de(91));return Pt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function jp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(de(92));if(Uo(n)){if(1<n.length)throw Error(de(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:xr(n)}}function Q0(t,e){var n=xr(e.value),i=xr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Xp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function J0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ch(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?J0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Fa,e_=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Fa=Fa||document.createElement("div"),Fa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Fa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Qo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var zo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},U1=["Webkit","ms","Moz","O"];Object.keys(zo).forEach(function(t){U1.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),zo[e]=zo[t]})});function t_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||zo.hasOwnProperty(t)&&zo[t]?(""+e).trim():e+"px"}function n_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=t_(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var F1=Pt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Rh(t,e){if(e){if(F1[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(de(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(de(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(de(61))}if(e.style!=null&&typeof e.style!="object")throw Error(de(62))}}function Ph(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Lh=null;function xf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Dh=null,ks=null,Os=null;function qp(t){if(t=Ta(t)){if(typeof Dh!="function")throw Error(de(280));var e=t.stateNode;e&&(e=Nc(e),Dh(t.stateNode,t.type,e))}}function i_(t){ks?Os?Os.push(t):Os=[t]:ks=t}function r_(){if(ks){var t=ks,e=Os;if(Os=ks=null,qp(t),e)for(t=0;t<e.length;t++)qp(e[t])}}function s_(t,e){return t(e)}function o_(){}var au=!1;function a_(t,e,n){if(au)return t(e,n);au=!0;try{return s_(t,e,n)}finally{au=!1,(ks!==null||Os!==null)&&(o_(),r_())}}function Jo(t,e){var n=t.stateNode;if(n===null)return null;var i=Nc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(de(231,e,typeof n));return n}var Nh=!1;if(zi)try{var vo={};Object.defineProperty(vo,"passive",{get:function(){Nh=!0}}),window.addEventListener("test",vo,vo),window.removeEventListener("test",vo,vo)}catch{Nh=!1}function k1(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var Vo=!1,Yl=null,Kl=!1,Ih=null,O1={onError:function(t){Vo=!0,Yl=t}};function B1(t,e,n,i,r,s,o,a,l){Vo=!1,Yl=null,k1.apply(O1,arguments)}function z1(t,e,n,i,r,s,o,a,l){if(B1.apply(this,arguments),Vo){if(Vo){var c=Yl;Vo=!1,Yl=null}else throw Error(de(198));Kl||(Kl=!0,Ih=c)}}function ts(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function l_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function $p(t){if(ts(t)!==t)throw Error(de(188))}function V1(t){var e=t.alternate;if(!e){if(e=ts(t),e===null)throw Error(de(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return $p(r),t;if(s===i)return $p(r),e;s=s.sibling}throw Error(de(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(de(189))}}if(n.alternate!==i)throw Error(de(190))}if(n.tag!==3)throw Error(de(188));return n.stateNode.current===n?t:e}function c_(t){return t=V1(t),t!==null?u_(t):null}function u_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=u_(t);if(e!==null)return e;t=t.sibling}return null}var h_=Bn.unstable_scheduleCallback,Yp=Bn.unstable_cancelCallback,H1=Bn.unstable_shouldYield,G1=Bn.unstable_requestPaint,kt=Bn.unstable_now,W1=Bn.unstable_getCurrentPriorityLevel,yf=Bn.unstable_ImmediatePriority,d_=Bn.unstable_UserBlockingPriority,Zl=Bn.unstable_NormalPriority,j1=Bn.unstable_LowPriority,f_=Bn.unstable_IdlePriority,Rc=null,Si=null;function X1(t){if(Si&&typeof Si.onCommitFiberRoot=="function")try{Si.onCommitFiberRoot(Rc,t,void 0,(t.current.flags&128)===128)}catch{}}var ai=Math.clz32?Math.clz32:Y1,q1=Math.log,$1=Math.LN2;function Y1(t){return t>>>=0,t===0?32:31-(q1(t)/$1|0)|0}var ka=64,Oa=4194304;function Fo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ql(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Fo(a):(s&=o,s!==0&&(i=Fo(s)))}else o=n&~r,o!==0?i=Fo(o):s!==0&&(i=Fo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ai(e),r=1<<n,i|=t[n],e&=~r;return i}function K1(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Z1(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-ai(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=K1(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Uh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function p_(){var t=ka;return ka<<=1,!(ka&4194240)&&(ka=64),t}function lu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ea(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ai(e),t[e]=n}function Q1(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ai(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Sf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ai(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var pt=0;function m_(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var g_,Mf,__,v_,x_,Fh=!1,Ba=[],hr=null,dr=null,fr=null,ea=new Map,ta=new Map,sr=[],J1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Kp(t,e){switch(t){case"focusin":case"focusout":hr=null;break;case"dragenter":case"dragleave":dr=null;break;case"mouseover":case"mouseout":fr=null;break;case"pointerover":case"pointerout":ea.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ta.delete(e.pointerId)}}function xo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Ta(e),e!==null&&Mf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function ey(t,e,n,i,r){switch(e){case"focusin":return hr=xo(hr,t,e,n,i,r),!0;case"dragenter":return dr=xo(dr,t,e,n,i,r),!0;case"mouseover":return fr=xo(fr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return ea.set(s,xo(ea.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ta.set(s,xo(ta.get(s)||null,t,e,n,i,r)),!0}return!1}function y_(t){var e=kr(t.target);if(e!==null){var n=ts(e);if(n!==null){if(e=n.tag,e===13){if(e=l_(n),e!==null){t.blockedOn=e,x_(t.priority,function(){__(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Pl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=kh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Lh=i,n.target.dispatchEvent(i),Lh=null}else return e=Ta(n),e!==null&&Mf(e),t.blockedOn=n,!1;e.shift()}return!0}function Zp(t,e,n){Pl(t)&&n.delete(e)}function ty(){Fh=!1,hr!==null&&Pl(hr)&&(hr=null),dr!==null&&Pl(dr)&&(dr=null),fr!==null&&Pl(fr)&&(fr=null),ea.forEach(Zp),ta.forEach(Zp)}function yo(t,e){t.blockedOn===e&&(t.blockedOn=null,Fh||(Fh=!0,Bn.unstable_scheduleCallback(Bn.unstable_NormalPriority,ty)))}function na(t){function e(r){return yo(r,t)}if(0<Ba.length){yo(Ba[0],t);for(var n=1;n<Ba.length;n++){var i=Ba[n];i.blockedOn===t&&(i.blockedOn=null)}}for(hr!==null&&yo(hr,t),dr!==null&&yo(dr,t),fr!==null&&yo(fr,t),ea.forEach(e),ta.forEach(e),n=0;n<sr.length;n++)i=sr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<sr.length&&(n=sr[0],n.blockedOn===null);)y_(n),n.blockedOn===null&&sr.shift()}var Bs=ji.ReactCurrentBatchConfig,Jl=!0;function ny(t,e,n,i){var r=pt,s=Bs.transition;Bs.transition=null;try{pt=1,wf(t,e,n,i)}finally{pt=r,Bs.transition=s}}function iy(t,e,n,i){var r=pt,s=Bs.transition;Bs.transition=null;try{pt=4,wf(t,e,n,i)}finally{pt=r,Bs.transition=s}}function wf(t,e,n,i){if(Jl){var r=kh(t,e,n,i);if(r===null)vu(t,e,i,ec,n),Kp(t,i);else if(ey(r,t,e,n,i))i.stopPropagation();else if(Kp(t,i),e&4&&-1<J1.indexOf(t)){for(;r!==null;){var s=Ta(r);if(s!==null&&g_(s),s=kh(t,e,n,i),s===null&&vu(t,e,i,ec,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else vu(t,e,i,null,n)}}var ec=null;function kh(t,e,n,i){if(ec=null,t=xf(i),t=kr(t),t!==null)if(e=ts(t),e===null)t=null;else if(n=e.tag,n===13){if(t=l_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ec=t,null}function S_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(W1()){case yf:return 1;case d_:return 4;case Zl:case j1:return 16;case f_:return 536870912;default:return 16}default:return 16}}var lr=null,Ef=null,Ll=null;function M_(){if(Ll)return Ll;var t,e=Ef,n=e.length,i,r="value"in lr?lr.value:lr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Ll=r.slice(t,1<i?1-i:void 0)}function Dl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function za(){return!0}function Qp(){return!1}function Vn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?za:Qp,this.isPropagationStopped=Qp,this}return Pt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=za)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=za)},persist:function(){},isPersistent:za}),e}var ho={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bf=Vn(ho),ba=Pt({},ho,{view:0,detail:0}),ry=Vn(ba),cu,uu,So,Pc=Pt({},ba,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==So&&(So&&t.type==="mousemove"?(cu=t.screenX-So.screenX,uu=t.screenY-So.screenY):uu=cu=0,So=t),cu)},movementY:function(t){return"movementY"in t?t.movementY:uu}}),Jp=Vn(Pc),sy=Pt({},Pc,{dataTransfer:0}),oy=Vn(sy),ay=Pt({},ba,{relatedTarget:0}),hu=Vn(ay),ly=Pt({},ho,{animationName:0,elapsedTime:0,pseudoElement:0}),cy=Vn(ly),uy=Pt({},ho,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),hy=Vn(uy),dy=Pt({},ho,{data:0}),em=Vn(dy),fy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},py={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},my={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gy(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=my[t])?!!e[t]:!1}function Tf(){return gy}var _y=Pt({},ba,{key:function(t){if(t.key){var e=fy[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Dl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?py[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tf,charCode:function(t){return t.type==="keypress"?Dl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Dl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),vy=Vn(_y),xy=Pt({},Pc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tm=Vn(xy),yy=Pt({},ba,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tf}),Sy=Vn(yy),My=Pt({},ho,{propertyName:0,elapsedTime:0,pseudoElement:0}),wy=Vn(My),Ey=Pt({},Pc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),by=Vn(Ey),Ty=[9,13,27,32],Af=zi&&"CompositionEvent"in window,Ho=null;zi&&"documentMode"in document&&(Ho=document.documentMode);var Ay=zi&&"TextEvent"in window&&!Ho,w_=zi&&(!Af||Ho&&8<Ho&&11>=Ho),nm=" ",im=!1;function E_(t,e){switch(t){case"keyup":return Ty.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function b_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Es=!1;function Cy(t,e){switch(t){case"compositionend":return b_(e);case"keypress":return e.which!==32?null:(im=!0,nm);case"textInput":return t=e.data,t===nm&&im?null:t;default:return null}}function Ry(t,e){if(Es)return t==="compositionend"||!Af&&E_(t,e)?(t=M_(),Ll=Ef=lr=null,Es=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return w_&&e.locale!=="ko"?null:e.data;default:return null}}var Py={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Py[t.type]:e==="textarea"}function T_(t,e,n,i){i_(i),e=tc(e,"onChange"),0<e.length&&(n=new bf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Go=null,ia=null;function Ly(t){k_(t,0)}function Lc(t){var e=As(t);if(K0(e))return t}function Dy(t,e){if(t==="change")return e}var A_=!1;if(zi){var du;if(zi){var fu="oninput"in document;if(!fu){var sm=document.createElement("div");sm.setAttribute("oninput","return;"),fu=typeof sm.oninput=="function"}du=fu}else du=!1;A_=du&&(!document.documentMode||9<document.documentMode)}function om(){Go&&(Go.detachEvent("onpropertychange",C_),ia=Go=null)}function C_(t){if(t.propertyName==="value"&&Lc(ia)){var e=[];T_(e,ia,t,xf(t)),a_(Ly,e)}}function Ny(t,e,n){t==="focusin"?(om(),Go=e,ia=n,Go.attachEvent("onpropertychange",C_)):t==="focusout"&&om()}function Iy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Lc(ia)}function Uy(t,e){if(t==="click")return Lc(e)}function Fy(t,e){if(t==="input"||t==="change")return Lc(e)}function ky(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ui=typeof Object.is=="function"?Object.is:ky;function ra(t,e){if(ui(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!xh.call(e,r)||!ui(t[r],e[r]))return!1}return!0}function am(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function lm(t,e){var n=am(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=am(n)}}function R_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?R_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function P_(){for(var t=window,e=$l();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=$l(t.document)}return e}function Cf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Oy(t){var e=P_(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&R_(n.ownerDocument.documentElement,n)){if(i!==null&&Cf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=lm(n,s);var o=lm(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var By=zi&&"documentMode"in document&&11>=document.documentMode,bs=null,Oh=null,Wo=null,Bh=!1;function cm(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Bh||bs==null||bs!==$l(i)||(i=bs,"selectionStart"in i&&Cf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Wo&&ra(Wo,i)||(Wo=i,i=tc(Oh,"onSelect"),0<i.length&&(e=new bf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=bs)))}function Va(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ts={animationend:Va("Animation","AnimationEnd"),animationiteration:Va("Animation","AnimationIteration"),animationstart:Va("Animation","AnimationStart"),transitionend:Va("Transition","TransitionEnd")},pu={},L_={};zi&&(L_=document.createElement("div").style,"AnimationEvent"in window||(delete Ts.animationend.animation,delete Ts.animationiteration.animation,delete Ts.animationstart.animation),"TransitionEvent"in window||delete Ts.transitionend.transition);function Dc(t){if(pu[t])return pu[t];if(!Ts[t])return t;var e=Ts[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in L_)return pu[t]=e[n];return t}var D_=Dc("animationend"),N_=Dc("animationiteration"),I_=Dc("animationstart"),U_=Dc("transitionend"),F_=new Map,um="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Er(t,e){F_.set(t,e),es(e,[t])}for(var mu=0;mu<um.length;mu++){var gu=um[mu],zy=gu.toLowerCase(),Vy=gu[0].toUpperCase()+gu.slice(1);Er(zy,"on"+Vy)}Er(D_,"onAnimationEnd");Er(N_,"onAnimationIteration");Er(I_,"onAnimationStart");Er("dblclick","onDoubleClick");Er("focusin","onFocus");Er("focusout","onBlur");Er(U_,"onTransitionEnd");Ys("onMouseEnter",["mouseout","mouseover"]);Ys("onMouseLeave",["mouseout","mouseover"]);Ys("onPointerEnter",["pointerout","pointerover"]);Ys("onPointerLeave",["pointerout","pointerover"]);es("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));es("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));es("onBeforeInput",["compositionend","keypress","textInput","paste"]);es("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));es("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));es("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ko="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hy=new Set("cancel close invalid load scroll toggle".split(" ").concat(ko));function hm(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,z1(i,e,void 0,t),t.currentTarget=null}function k_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;hm(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;hm(r,a,c),s=l}}}if(Kl)throw t=Ih,Kl=!1,Ih=null,t}function wt(t,e){var n=e[Wh];n===void 0&&(n=e[Wh]=new Set);var i=t+"__bubble";n.has(i)||(O_(e,t,2,!1),n.add(i))}function _u(t,e,n){var i=0;e&&(i|=4),O_(n,t,i,e)}var Ha="_reactListening"+Math.random().toString(36).slice(2);function sa(t){if(!t[Ha]){t[Ha]=!0,j0.forEach(function(n){n!=="selectionchange"&&(Hy.has(n)||_u(n,!1,t),_u(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ha]||(e[Ha]=!0,_u("selectionchange",!1,e))}}function O_(t,e,n,i){switch(S_(e)){case 1:var r=ny;break;case 4:r=iy;break;default:r=wf}n=r.bind(null,e,n,t),r=void 0,!Nh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function vu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=kr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}a_(function(){var c=s,h=xf(n),d=[];e:{var u=F_.get(t);if(u!==void 0){var p=bf,_=t;switch(t){case"keypress":if(Dl(n)===0)break e;case"keydown":case"keyup":p=vy;break;case"focusin":_="focus",p=hu;break;case"focusout":_="blur",p=hu;break;case"beforeblur":case"afterblur":p=hu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Jp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=oy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Sy;break;case D_:case N_:case I_:p=cy;break;case U_:p=wy;break;case"scroll":p=ry;break;case"wheel":p=by;break;case"copy":case"cut":case"paste":p=hy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=tm}var v=(e&4)!==0,m=!v&&t==="scroll",f=v?u!==null?u+"Capture":null:u;v=[];for(var g=c,x;g!==null;){x=g;var M=x.stateNode;if(x.tag===5&&M!==null&&(x=M,f!==null&&(M=Jo(g,f),M!=null&&v.push(oa(g,M,x)))),m)break;g=g.return}0<v.length&&(u=new p(u,_,null,n,h),d.push({event:u,listeners:v}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",u&&n!==Lh&&(_=n.relatedTarget||n.fromElement)&&(kr(_)||_[Vi]))break e;if((p||u)&&(u=h.window===h?h:(u=h.ownerDocument)?u.defaultView||u.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?kr(_):null,_!==null&&(m=ts(_),_!==m||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(v=Jp,M="onMouseLeave",f="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(v=tm,M="onPointerLeave",f="onPointerEnter",g="pointer"),m=p==null?u:As(p),x=_==null?u:As(_),u=new v(M,g+"leave",p,n,h),u.target=m,u.relatedTarget=x,M=null,kr(h)===c&&(v=new v(f,g+"enter",_,n,h),v.target=x,v.relatedTarget=m,M=v),m=M,p&&_)t:{for(v=p,f=_,g=0,x=v;x;x=rs(x))g++;for(x=0,M=f;M;M=rs(M))x++;for(;0<g-x;)v=rs(v),g--;for(;0<x-g;)f=rs(f),x--;for(;g--;){if(v===f||f!==null&&v===f.alternate)break t;v=rs(v),f=rs(f)}v=null}else v=null;p!==null&&dm(d,u,p,v,!1),_!==null&&m!==null&&dm(d,m,_,v,!0)}}e:{if(u=c?As(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var b=Dy;else if(rm(u))if(A_)b=Fy;else{b=Iy;var w=Ny}else(p=u.nodeName)&&p.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(b=Uy);if(b&&(b=b(t,c))){T_(d,b,n,h);break e}w&&w(t,u,c),t==="focusout"&&(w=u._wrapperState)&&w.controlled&&u.type==="number"&&Th(u,"number",u.value)}switch(w=c?As(c):window,t){case"focusin":(rm(w)||w.contentEditable==="true")&&(bs=w,Oh=c,Wo=null);break;case"focusout":Wo=Oh=bs=null;break;case"mousedown":Bh=!0;break;case"contextmenu":case"mouseup":case"dragend":Bh=!1,cm(d,n,h);break;case"selectionchange":if(By)break;case"keydown":case"keyup":cm(d,n,h)}var C;if(Af)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Es?E_(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(w_&&n.locale!=="ko"&&(Es||y!=="onCompositionStart"?y==="onCompositionEnd"&&Es&&(C=M_()):(lr=h,Ef="value"in lr?lr.value:lr.textContent,Es=!0)),w=tc(c,y),0<w.length&&(y=new em(y,t,null,n,h),d.push({event:y,listeners:w}),C?y.data=C:(C=b_(n),C!==null&&(y.data=C)))),(C=Ay?Cy(t,n):Ry(t,n))&&(c=tc(c,"onBeforeInput"),0<c.length&&(h=new em("onBeforeInput","beforeinput",null,n,h),d.push({event:h,listeners:c}),h.data=C))}k_(d,e)})}function oa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function tc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Jo(t,n),s!=null&&i.unshift(oa(t,s,r)),s=Jo(t,e),s!=null&&i.push(oa(t,s,r))),t=t.return}return i}function rs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function dm(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Jo(n,s),l!=null&&o.unshift(oa(n,l,a))):r||(l=Jo(n,s),l!=null&&o.push(oa(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Gy=/\r\n?/g,Wy=/\u0000|\uFFFD/g;function fm(t){return(typeof t=="string"?t:""+t).replace(Gy,`
`).replace(Wy,"")}function Ga(t,e,n){if(e=fm(e),fm(t)!==e&&n)throw Error(de(425))}function nc(){}var zh=null,Vh=null;function Hh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Gh=typeof setTimeout=="function"?setTimeout:void 0,jy=typeof clearTimeout=="function"?clearTimeout:void 0,pm=typeof Promise=="function"?Promise:void 0,Xy=typeof queueMicrotask=="function"?queueMicrotask:typeof pm<"u"?function(t){return pm.resolve(null).then(t).catch(qy)}:Gh;function qy(t){setTimeout(function(){throw t})}function xu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),na(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);na(e)}function pr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function mm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var fo=Math.random().toString(36).slice(2),vi="__reactFiber$"+fo,aa="__reactProps$"+fo,Vi="__reactContainer$"+fo,Wh="__reactEvents$"+fo,$y="__reactListeners$"+fo,Yy="__reactHandles$"+fo;function kr(t){var e=t[vi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Vi]||n[vi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=mm(t);t!==null;){if(n=t[vi])return n;t=mm(t)}return e}t=n,n=t.parentNode}return null}function Ta(t){return t=t[vi]||t[Vi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function As(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(de(33))}function Nc(t){return t[aa]||null}var jh=[],Cs=-1;function br(t){return{current:t}}function bt(t){0>Cs||(t.current=jh[Cs],jh[Cs]=null,Cs--)}function Mt(t,e){Cs++,jh[Cs]=t.current,t.current=e}var yr={},hn=br(yr),wn=br(!1),jr=yr;function Ks(t,e){var n=t.type.contextTypes;if(!n)return yr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function En(t){return t=t.childContextTypes,t!=null}function ic(){bt(wn),bt(hn)}function gm(t,e,n){if(hn.current!==yr)throw Error(de(168));Mt(hn,e),Mt(wn,n)}function B_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(de(108,N1(t)||"Unknown",r));return Pt({},n,i)}function rc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||yr,jr=hn.current,Mt(hn,t),Mt(wn,wn.current),!0}function _m(t,e,n){var i=t.stateNode;if(!i)throw Error(de(169));n?(t=B_(t,e,jr),i.__reactInternalMemoizedMergedChildContext=t,bt(wn),bt(hn),Mt(hn,t)):bt(wn),Mt(wn,n)}var Ii=null,Ic=!1,yu=!1;function z_(t){Ii===null?Ii=[t]:Ii.push(t)}function Ky(t){Ic=!0,z_(t)}function Tr(){if(!yu&&Ii!==null){yu=!0;var t=0,e=pt;try{var n=Ii;for(pt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ii=null,Ic=!1}catch(r){throw Ii!==null&&(Ii=Ii.slice(t+1)),h_(yf,Tr),r}finally{pt=e,yu=!1}}return null}var Rs=[],Ps=0,sc=null,oc=0,jn=[],Xn=0,Xr=null,Ui=1,Fi="";function Nr(t,e){Rs[Ps++]=oc,Rs[Ps++]=sc,sc=t,oc=e}function V_(t,e,n){jn[Xn++]=Ui,jn[Xn++]=Fi,jn[Xn++]=Xr,Xr=t;var i=Ui;t=Fi;var r=32-ai(i)-1;i&=~(1<<r),n+=1;var s=32-ai(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ui=1<<32-ai(e)+r|n<<r|i,Fi=s+t}else Ui=1<<s|n<<r|i,Fi=t}function Rf(t){t.return!==null&&(Nr(t,1),V_(t,1,0))}function Pf(t){for(;t===sc;)sc=Rs[--Ps],Rs[Ps]=null,oc=Rs[--Ps],Rs[Ps]=null;for(;t===Xr;)Xr=jn[--Xn],jn[Xn]=null,Fi=jn[--Xn],jn[Xn]=null,Ui=jn[--Xn],jn[Xn]=null}var kn=null,Fn=null,At=!1,si=null;function H_(t,e){var n=Yn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function vm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,kn=t,Fn=pr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,kn=t,Fn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Xr!==null?{id:Ui,overflow:Fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Yn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,kn=t,Fn=null,!0):!1;default:return!1}}function Xh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function qh(t){if(At){var e=Fn;if(e){var n=e;if(!vm(t,e)){if(Xh(t))throw Error(de(418));e=pr(n.nextSibling);var i=kn;e&&vm(t,e)?H_(i,n):(t.flags=t.flags&-4097|2,At=!1,kn=t)}}else{if(Xh(t))throw Error(de(418));t.flags=t.flags&-4097|2,At=!1,kn=t}}}function xm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;kn=t}function Wa(t){if(t!==kn)return!1;if(!At)return xm(t),At=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Hh(t.type,t.memoizedProps)),e&&(e=Fn)){if(Xh(t))throw G_(),Error(de(418));for(;e;)H_(t,e),e=pr(e.nextSibling)}if(xm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(de(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Fn=pr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Fn=null}}else Fn=kn?pr(t.stateNode.nextSibling):null;return!0}function G_(){for(var t=Fn;t;)t=pr(t.nextSibling)}function Zs(){Fn=kn=null,At=!1}function Lf(t){si===null?si=[t]:si.push(t)}var Zy=ji.ReactCurrentBatchConfig;function Mo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(de(309));var i=n.stateNode}if(!i)throw Error(de(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(de(284));if(!n._owner)throw Error(de(290,t))}return t}function ja(t,e){throw t=Object.prototype.toString.call(e),Error(de(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function ym(t){var e=t._init;return e(t._payload)}function W_(t){function e(f,g){if(t){var x=f.deletions;x===null?(f.deletions=[g],f.flags|=16):x.push(g)}}function n(f,g){if(!t)return null;for(;g!==null;)e(f,g),g=g.sibling;return null}function i(f,g){for(f=new Map;g!==null;)g.key!==null?f.set(g.key,g):f.set(g.index,g),g=g.sibling;return f}function r(f,g){return f=vr(f,g),f.index=0,f.sibling=null,f}function s(f,g,x){return f.index=x,t?(x=f.alternate,x!==null?(x=x.index,x<g?(f.flags|=2,g):x):(f.flags|=2,g)):(f.flags|=1048576,g)}function o(f){return t&&f.alternate===null&&(f.flags|=2),f}function a(f,g,x,M){return g===null||g.tag!==6?(g=Au(x,f.mode,M),g.return=f,g):(g=r(g,x),g.return=f,g)}function l(f,g,x,M){var b=x.type;return b===ws?h(f,g,x.props.children,M,x.key):g!==null&&(g.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===nr&&ym(b)===g.type)?(M=r(g,x.props),M.ref=Mo(f,g,x),M.return=f,M):(M=Bl(x.type,x.key,x.props,null,f.mode,M),M.ref=Mo(f,g,x),M.return=f,M)}function c(f,g,x,M){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=Cu(x,f.mode,M),g.return=f,g):(g=r(g,x.children||[]),g.return=f,g)}function h(f,g,x,M,b){return g===null||g.tag!==7?(g=Wr(x,f.mode,M,b),g.return=f,g):(g=r(g,x),g.return=f,g)}function d(f,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Au(""+g,f.mode,x),g.return=f,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ia:return x=Bl(g.type,g.key,g.props,null,f.mode,x),x.ref=Mo(f,null,g),x.return=f,x;case Ms:return g=Cu(g,f.mode,x),g.return=f,g;case nr:var M=g._init;return d(f,M(g._payload),x)}if(Uo(g)||_o(g))return g=Wr(g,f.mode,x,null),g.return=f,g;ja(f,g)}return null}function u(f,g,x,M){var b=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return b!==null?null:a(f,g,""+x,M);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ia:return x.key===b?l(f,g,x,M):null;case Ms:return x.key===b?c(f,g,x,M):null;case nr:return b=x._init,u(f,g,b(x._payload),M)}if(Uo(x)||_o(x))return b!==null?null:h(f,g,x,M,null);ja(f,x)}return null}function p(f,g,x,M,b){if(typeof M=="string"&&M!==""||typeof M=="number")return f=f.get(x)||null,a(g,f,""+M,b);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Ia:return f=f.get(M.key===null?x:M.key)||null,l(g,f,M,b);case Ms:return f=f.get(M.key===null?x:M.key)||null,c(g,f,M,b);case nr:var w=M._init;return p(f,g,x,w(M._payload),b)}if(Uo(M)||_o(M))return f=f.get(x)||null,h(g,f,M,b,null);ja(g,M)}return null}function _(f,g,x,M){for(var b=null,w=null,C=g,y=g=0,A=null;C!==null&&y<x.length;y++){C.index>y?(A=C,C=null):A=C.sibling;var F=u(f,C,x[y],M);if(F===null){C===null&&(C=A);break}t&&C&&F.alternate===null&&e(f,C),g=s(F,g,y),w===null?b=F:w.sibling=F,w=F,C=A}if(y===x.length)return n(f,C),At&&Nr(f,y),b;if(C===null){for(;y<x.length;y++)C=d(f,x[y],M),C!==null&&(g=s(C,g,y),w===null?b=C:w.sibling=C,w=C);return At&&Nr(f,y),b}for(C=i(f,C);y<x.length;y++)A=p(C,f,y,x[y],M),A!==null&&(t&&A.alternate!==null&&C.delete(A.key===null?y:A.key),g=s(A,g,y),w===null?b=A:w.sibling=A,w=A);return t&&C.forEach(function(N){return e(f,N)}),At&&Nr(f,y),b}function v(f,g,x,M){var b=_o(x);if(typeof b!="function")throw Error(de(150));if(x=b.call(x),x==null)throw Error(de(151));for(var w=b=null,C=g,y=g=0,A=null,F=x.next();C!==null&&!F.done;y++,F=x.next()){C.index>y?(A=C,C=null):A=C.sibling;var N=u(f,C,F.value,M);if(N===null){C===null&&(C=A);break}t&&C&&N.alternate===null&&e(f,C),g=s(N,g,y),w===null?b=N:w.sibling=N,w=N,C=A}if(F.done)return n(f,C),At&&Nr(f,y),b;if(C===null){for(;!F.done;y++,F=x.next())F=d(f,F.value,M),F!==null&&(g=s(F,g,y),w===null?b=F:w.sibling=F,w=F);return At&&Nr(f,y),b}for(C=i(f,C);!F.done;y++,F=x.next())F=p(C,f,y,F.value,M),F!==null&&(t&&F.alternate!==null&&C.delete(F.key===null?y:F.key),g=s(F,g,y),w===null?b=F:w.sibling=F,w=F);return t&&C.forEach(function(D){return e(f,D)}),At&&Nr(f,y),b}function m(f,g,x,M){if(typeof x=="object"&&x!==null&&x.type===ws&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ia:e:{for(var b=x.key,w=g;w!==null;){if(w.key===b){if(b=x.type,b===ws){if(w.tag===7){n(f,w.sibling),g=r(w,x.props.children),g.return=f,f=g;break e}}else if(w.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===nr&&ym(b)===w.type){n(f,w.sibling),g=r(w,x.props),g.ref=Mo(f,w,x),g.return=f,f=g;break e}n(f,w);break}else e(f,w);w=w.sibling}x.type===ws?(g=Wr(x.props.children,f.mode,M,x.key),g.return=f,f=g):(M=Bl(x.type,x.key,x.props,null,f.mode,M),M.ref=Mo(f,g,x),M.return=f,f=M)}return o(f);case Ms:e:{for(w=x.key;g!==null;){if(g.key===w)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){n(f,g.sibling),g=r(g,x.children||[]),g.return=f,f=g;break e}else{n(f,g);break}else e(f,g);g=g.sibling}g=Cu(x,f.mode,M),g.return=f,f=g}return o(f);case nr:return w=x._init,m(f,g,w(x._payload),M)}if(Uo(x))return _(f,g,x,M);if(_o(x))return v(f,g,x,M);ja(f,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,g!==null&&g.tag===6?(n(f,g.sibling),g=r(g,x),g.return=f,f=g):(n(f,g),g=Au(x,f.mode,M),g.return=f,f=g),o(f)):n(f,g)}return m}var Qs=W_(!0),j_=W_(!1),ac=br(null),lc=null,Ls=null,Df=null;function Nf(){Df=Ls=lc=null}function If(t){var e=ac.current;bt(ac),t._currentValue=e}function $h(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function zs(t,e){lc=t,Df=Ls=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Mn=!0),t.firstContext=null)}function Zn(t){var e=t._currentValue;if(Df!==t)if(t={context:t,memoizedValue:e,next:null},Ls===null){if(lc===null)throw Error(de(308));Ls=t,lc.dependencies={lanes:0,firstContext:t}}else Ls=Ls.next=t;return e}var Or=null;function Uf(t){Or===null?Or=[t]:Or.push(t)}function X_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Uf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Hi(t,i)}function Hi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var ir=!1;function Ff(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function q_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Oi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function mr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,ut&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Hi(t,n)}return r=i.interleaved,r===null?(e.next=e,Uf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Hi(t,n)}function Nl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Sf(t,n)}}function Sm(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function cc(t,e,n,i){var r=t.updateQueue;ir=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=t.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,h=c=l=null,a=s;do{var u=a.lane,p=a.eventTime;if((i&u)===u){h!==null&&(h=h.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=t,v=a;switch(u=e,p=n,v.tag){case 1:if(_=v.payload,typeof _=="function"){d=_.call(p,d,u);break e}d=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=v.payload,u=typeof _=="function"?_.call(p,d,u):_,u==null)break e;d=Pt({},d,u);break e;case 2:ir=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,u=r.effects,u===null?r.effects=[a]:u.push(a))}else p={eventTime:p,lane:u,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=p,l=d):h=h.next=p,o|=u;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;u=a,a=u.next,u.next=null,r.lastBaseUpdate=u,r.shared.pending=null}}while(!0);if(h===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=h,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);$r|=o,t.lanes=o,t.memoizedState=d}}function Mm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(de(191,r));r.call(i)}}}var Aa={},Mi=br(Aa),la=br(Aa),ca=br(Aa);function Br(t){if(t===Aa)throw Error(de(174));return t}function kf(t,e){switch(Mt(ca,e),Mt(la,t),Mt(Mi,Aa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ch(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ch(e,t)}bt(Mi),Mt(Mi,e)}function Js(){bt(Mi),bt(la),bt(ca)}function $_(t){Br(ca.current);var e=Br(Mi.current),n=Ch(e,t.type);e!==n&&(Mt(la,t),Mt(Mi,n))}function Of(t){la.current===t&&(bt(Mi),bt(la))}var Ct=br(0);function uc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Su=[];function Bf(){for(var t=0;t<Su.length;t++)Su[t]._workInProgressVersionPrimary=null;Su.length=0}var Il=ji.ReactCurrentDispatcher,Mu=ji.ReactCurrentBatchConfig,qr=0,Rt=null,Vt=null,Xt=null,hc=!1,jo=!1,ua=0,Qy=0;function rn(){throw Error(de(321))}function zf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ui(t[n],e[n]))return!1;return!0}function Vf(t,e,n,i,r,s){if(qr=s,Rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Il.current=t===null||t.memoizedState===null?nS:iS,t=n(i,r),jo){s=0;do{if(jo=!1,ua=0,25<=s)throw Error(de(301));s+=1,Xt=Vt=null,e.updateQueue=null,Il.current=rS,t=n(i,r)}while(jo)}if(Il.current=dc,e=Vt!==null&&Vt.next!==null,qr=0,Xt=Vt=Rt=null,hc=!1,e)throw Error(de(300));return t}function Hf(){var t=ua!==0;return ua=0,t}function gi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xt===null?Rt.memoizedState=Xt=t:Xt=Xt.next=t,Xt}function Qn(){if(Vt===null){var t=Rt.alternate;t=t!==null?t.memoizedState:null}else t=Vt.next;var e=Xt===null?Rt.memoizedState:Xt.next;if(e!==null)Xt=e,Vt=t;else{if(t===null)throw Error(de(310));Vt=t,t={memoizedState:Vt.memoizedState,baseState:Vt.baseState,baseQueue:Vt.baseQueue,queue:Vt.queue,next:null},Xt===null?Rt.memoizedState=Xt=t:Xt=Xt.next=t}return Xt}function ha(t,e){return typeof e=="function"?e(t):e}function wu(t){var e=Qn(),n=e.queue;if(n===null)throw Error(de(311));n.lastRenderedReducer=t;var i=Vt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((qr&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,Rt.lanes|=h,$r|=h}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,ui(i,e.memoizedState)||(Mn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Rt.lanes|=s,$r|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Eu(t){var e=Qn(),n=e.queue;if(n===null)throw Error(de(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);ui(s,e.memoizedState)||(Mn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Y_(){}function K_(t,e){var n=Rt,i=Qn(),r=e(),s=!ui(i.memoizedState,r);if(s&&(i.memoizedState=r,Mn=!0),i=i.queue,Gf(J_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Xt!==null&&Xt.memoizedState.tag&1){if(n.flags|=2048,da(9,Q_.bind(null,n,i,r,e),void 0,null),Kt===null)throw Error(de(349));qr&30||Z_(n,e,r)}return r}function Z_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Rt.updateQueue,e===null?(e={lastEffect:null,stores:null},Rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Q_(t,e,n,i){e.value=n,e.getSnapshot=i,ev(e)&&tv(t)}function J_(t,e,n){return n(function(){ev(e)&&tv(t)})}function ev(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ui(t,n)}catch{return!0}}function tv(t){var e=Hi(t,1);e!==null&&li(e,t,1,-1)}function wm(t){var e=gi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:t},e.queue=t,t=t.dispatch=tS.bind(null,Rt,t),[e.memoizedState,t]}function da(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Rt.updateQueue,e===null?(e={lastEffect:null,stores:null},Rt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function nv(){return Qn().memoizedState}function Ul(t,e,n,i){var r=gi();Rt.flags|=t,r.memoizedState=da(1|e,n,void 0,i===void 0?null:i)}function Uc(t,e,n,i){var r=Qn();i=i===void 0?null:i;var s=void 0;if(Vt!==null){var o=Vt.memoizedState;if(s=o.destroy,i!==null&&zf(i,o.deps)){r.memoizedState=da(e,n,s,i);return}}Rt.flags|=t,r.memoizedState=da(1|e,n,s,i)}function Em(t,e){return Ul(8390656,8,t,e)}function Gf(t,e){return Uc(2048,8,t,e)}function iv(t,e){return Uc(4,2,t,e)}function rv(t,e){return Uc(4,4,t,e)}function sv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function ov(t,e,n){return n=n!=null?n.concat([t]):null,Uc(4,4,sv.bind(null,e,t),n)}function Wf(){}function av(t,e){var n=Qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&zf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function lv(t,e){var n=Qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&zf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function cv(t,e,n){return qr&21?(ui(n,e)||(n=p_(),Rt.lanes|=n,$r|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Mn=!0),t.memoizedState=n)}function Jy(t,e){var n=pt;pt=n!==0&&4>n?n:4,t(!0);var i=Mu.transition;Mu.transition={};try{t(!1),e()}finally{pt=n,Mu.transition=i}}function uv(){return Qn().memoizedState}function eS(t,e,n){var i=_r(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},hv(t))dv(e,n);else if(n=X_(t,e,n,i),n!==null){var r=gn();li(n,t,i,r),fv(n,e,i)}}function tS(t,e,n){var i=_r(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(hv(t))dv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,ui(a,o)){var l=e.interleaved;l===null?(r.next=r,Uf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=X_(t,e,r,i),n!==null&&(r=gn(),li(n,t,i,r),fv(n,e,i))}}function hv(t){var e=t.alternate;return t===Rt||e!==null&&e===Rt}function dv(t,e){jo=hc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function fv(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Sf(t,n)}}var dc={readContext:Zn,useCallback:rn,useContext:rn,useEffect:rn,useImperativeHandle:rn,useInsertionEffect:rn,useLayoutEffect:rn,useMemo:rn,useReducer:rn,useRef:rn,useState:rn,useDebugValue:rn,useDeferredValue:rn,useTransition:rn,useMutableSource:rn,useSyncExternalStore:rn,useId:rn,unstable_isNewReconciler:!1},nS={readContext:Zn,useCallback:function(t,e){return gi().memoizedState=[t,e===void 0?null:e],t},useContext:Zn,useEffect:Em,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ul(4194308,4,sv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ul(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ul(4,2,t,e)},useMemo:function(t,e){var n=gi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=gi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=eS.bind(null,Rt,t),[i.memoizedState,t]},useRef:function(t){var e=gi();return t={current:t},e.memoizedState=t},useState:wm,useDebugValue:Wf,useDeferredValue:function(t){return gi().memoizedState=t},useTransition:function(){var t=wm(!1),e=t[0];return t=Jy.bind(null,t[1]),gi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Rt,r=gi();if(At){if(n===void 0)throw Error(de(407));n=n()}else{if(n=e(),Kt===null)throw Error(de(349));qr&30||Z_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Em(J_.bind(null,i,s,t),[t]),i.flags|=2048,da(9,Q_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=gi(),e=Kt.identifierPrefix;if(At){var n=Fi,i=Ui;n=(i&~(1<<32-ai(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ua++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Qy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},iS={readContext:Zn,useCallback:av,useContext:Zn,useEffect:Gf,useImperativeHandle:ov,useInsertionEffect:iv,useLayoutEffect:rv,useMemo:lv,useReducer:wu,useRef:nv,useState:function(){return wu(ha)},useDebugValue:Wf,useDeferredValue:function(t){var e=Qn();return cv(e,Vt.memoizedState,t)},useTransition:function(){var t=wu(ha)[0],e=Qn().memoizedState;return[t,e]},useMutableSource:Y_,useSyncExternalStore:K_,useId:uv,unstable_isNewReconciler:!1},rS={readContext:Zn,useCallback:av,useContext:Zn,useEffect:Gf,useImperativeHandle:ov,useInsertionEffect:iv,useLayoutEffect:rv,useMemo:lv,useReducer:Eu,useRef:nv,useState:function(){return Eu(ha)},useDebugValue:Wf,useDeferredValue:function(t){var e=Qn();return Vt===null?e.memoizedState=t:cv(e,Vt.memoizedState,t)},useTransition:function(){var t=Eu(ha)[0],e=Qn().memoizedState;return[t,e]},useMutableSource:Y_,useSyncExternalStore:K_,useId:uv,unstable_isNewReconciler:!1};function ii(t,e){if(t&&t.defaultProps){e=Pt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Yh(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Pt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Fc={isMounted:function(t){return(t=t._reactInternals)?ts(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=gn(),r=_r(t),s=Oi(i,r);s.payload=e,n!=null&&(s.callback=n),e=mr(t,s,r),e!==null&&(li(e,t,r,i),Nl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=gn(),r=_r(t),s=Oi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=mr(t,s,r),e!==null&&(li(e,t,r,i),Nl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=gn(),i=_r(t),r=Oi(n,i);r.tag=2,e!=null&&(r.callback=e),e=mr(t,r,i),e!==null&&(li(e,t,i,n),Nl(e,t,i))}};function bm(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!ra(n,i)||!ra(r,s):!0}function pv(t,e,n){var i=!1,r=yr,s=e.contextType;return typeof s=="object"&&s!==null?s=Zn(s):(r=En(e)?jr:hn.current,i=e.contextTypes,s=(i=i!=null)?Ks(t,r):yr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Fc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Tm(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Fc.enqueueReplaceState(e,e.state,null)}function Kh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Ff(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Zn(s):(s=En(e)?jr:hn.current,r.context=Ks(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Yh(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Fc.enqueueReplaceState(r,r.state,null),cc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function eo(t,e){try{var n="",i=e;do n+=D1(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function bu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Zh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var sS=typeof WeakMap=="function"?WeakMap:Map;function mv(t,e,n){n=Oi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){pc||(pc=!0,ad=i),Zh(t,e)},n}function gv(t,e,n){n=Oi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Zh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Zh(t,e),typeof i!="function"&&(gr===null?gr=new Set([this]):gr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Am(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new sS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=xS.bind(null,t,e,n),e.then(t,t))}function Cm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Rm(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Oi(-1,1),e.tag=2,mr(n,e,1))),n.lanes|=1),t)}var oS=ji.ReactCurrentOwner,Mn=!1;function pn(t,e,n,i){e.child=t===null?j_(e,null,n,i):Qs(e,t.child,n,i)}function Pm(t,e,n,i,r){n=n.render;var s=e.ref;return zs(e,r),i=Vf(t,e,n,i,s,r),n=Hf(),t!==null&&!Mn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Gi(t,e,r)):(At&&n&&Rf(e),e.flags|=1,pn(t,e,i,r),e.child)}function Lm(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Qf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,_v(t,e,s,i,r)):(t=Bl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:ra,n(o,i)&&t.ref===e.ref)return Gi(t,e,r)}return e.flags|=1,t=vr(s,i),t.ref=e.ref,t.return=e,e.child=t}function _v(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(ra(s,i)&&t.ref===e.ref)if(Mn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Mn=!0);else return e.lanes=t.lanes,Gi(t,e,r)}return Qh(t,e,n,i,r)}function vv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Mt(Ns,Dn),Dn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Mt(Ns,Dn),Dn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,Mt(Ns,Dn),Dn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,Mt(Ns,Dn),Dn|=i;return pn(t,e,r,n),e.child}function xv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Qh(t,e,n,i,r){var s=En(n)?jr:hn.current;return s=Ks(e,s),zs(e,r),n=Vf(t,e,n,i,s,r),i=Hf(),t!==null&&!Mn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Gi(t,e,r)):(At&&i&&Rf(e),e.flags|=1,pn(t,e,n,r),e.child)}function Dm(t,e,n,i,r){if(En(n)){var s=!0;rc(e)}else s=!1;if(zs(e,r),e.stateNode===null)Fl(t,e),pv(e,n,i),Kh(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Zn(c):(c=En(n)?jr:hn.current,c=Ks(e,c));var h=n.getDerivedStateFromProps,d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&Tm(e,o,i,c),ir=!1;var u=e.memoizedState;o.state=u,cc(e,i,o,r),l=e.memoizedState,a!==i||u!==l||wn.current||ir?(typeof h=="function"&&(Yh(e,n,h,i),l=e.memoizedState),(a=ir||bm(e,n,a,i,u,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,q_(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:ii(e.type,a),o.props=c,d=e.pendingProps,u=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Zn(l):(l=En(n)?jr:hn.current,l=Ks(e,l));var p=n.getDerivedStateFromProps;(h=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||u!==l)&&Tm(e,o,i,l),ir=!1,u=e.memoizedState,o.state=u,cc(e,i,o,r);var _=e.memoizedState;a!==d||u!==_||wn.current||ir?(typeof p=="function"&&(Yh(e,n,p,i),_=e.memoizedState),(c=ir||bm(e,n,c,i,u,_,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return Jh(t,e,n,i,s,r)}function Jh(t,e,n,i,r,s){xv(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&_m(e,n,!1),Gi(t,e,s);i=e.stateNode,oS.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Qs(e,t.child,null,s),e.child=Qs(e,null,a,s)):pn(t,e,a,s),e.memoizedState=i.state,r&&_m(e,n,!0),e.child}function yv(t){var e=t.stateNode;e.pendingContext?gm(t,e.pendingContext,e.pendingContext!==e.context):e.context&&gm(t,e.context,!1),kf(t,e.containerInfo)}function Nm(t,e,n,i,r){return Zs(),Lf(r),e.flags|=256,pn(t,e,n,i),e.child}var ed={dehydrated:null,treeContext:null,retryLane:0};function td(t){return{baseLanes:t,cachePool:null,transitions:null}}function Sv(t,e,n){var i=e.pendingProps,r=Ct.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),Mt(Ct,r&1),t===null)return qh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Bc(o,i,0,null),t=Wr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=td(n),e.memoizedState=ed,t):jf(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return aS(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=vr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=vr(a,s):(s=Wr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?td(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=ed,i}return s=t.child,t=s.sibling,i=vr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function jf(t,e){return e=Bc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Xa(t,e,n,i){return i!==null&&Lf(i),Qs(e,t.child,null,n),t=jf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function aS(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=bu(Error(de(422))),Xa(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Bc({mode:"visible",children:i.children},r,0,null),s=Wr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Qs(e,t.child,null,o),e.child.memoizedState=td(o),e.memoizedState=ed,s);if(!(e.mode&1))return Xa(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(de(419)),i=bu(s,i,void 0),Xa(t,e,o,i)}if(a=(o&t.childLanes)!==0,Mn||a){if(i=Kt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Hi(t,r),li(i,t,r,-1))}return Zf(),i=bu(Error(de(421))),Xa(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=yS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Fn=pr(r.nextSibling),kn=e,At=!0,si=null,t!==null&&(jn[Xn++]=Ui,jn[Xn++]=Fi,jn[Xn++]=Xr,Ui=t.id,Fi=t.overflow,Xr=e),e=jf(e,i.children),e.flags|=4096,e)}function Im(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),$h(t.return,e,n)}function Tu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Mv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(pn(t,e,i.children,n),i=Ct.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Im(t,n,e);else if(t.tag===19)Im(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(Mt(Ct,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&uc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Tu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&uc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Tu(e,!0,n,null,s);break;case"together":Tu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Fl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Gi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),$r|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(de(153));if(e.child!==null){for(t=e.child,n=vr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=vr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function lS(t,e,n){switch(e.tag){case 3:yv(e),Zs();break;case 5:$_(e);break;case 1:En(e.type)&&rc(e);break;case 4:kf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;Mt(ac,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(Mt(Ct,Ct.current&1),e.flags|=128,null):n&e.child.childLanes?Sv(t,e,n):(Mt(Ct,Ct.current&1),t=Gi(t,e,n),t!==null?t.sibling:null);Mt(Ct,Ct.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Mv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Mt(Ct,Ct.current),i)break;return null;case 22:case 23:return e.lanes=0,vv(t,e,n)}return Gi(t,e,n)}var wv,nd,Ev,bv;wv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};nd=function(){};Ev=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Br(Mi.current);var s=null;switch(n){case"input":r=Eh(t,r),i=Eh(t,i),s=[];break;case"select":r=Pt({},r,{value:void 0}),i=Pt({},i,{value:void 0}),s=[];break;case"textarea":r=Ah(t,r),i=Ah(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=nc)}Rh(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Zo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Zo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&wt("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};bv=function(t,e,n,i){n!==i&&(e.flags|=4)};function wo(t,e){if(!At)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function sn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function cS(t,e,n){var i=e.pendingProps;switch(Pf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return sn(e),null;case 1:return En(e.type)&&ic(),sn(e),null;case 3:return i=e.stateNode,Js(),bt(wn),bt(hn),Bf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Wa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,si!==null&&(ud(si),si=null))),nd(t,e),sn(e),null;case 5:Of(e);var r=Br(ca.current);if(n=e.type,t!==null&&e.stateNode!=null)Ev(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(de(166));return sn(e),null}if(t=Br(Mi.current),Wa(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[vi]=e,i[aa]=s,t=(e.mode&1)!==0,n){case"dialog":wt("cancel",i),wt("close",i);break;case"iframe":case"object":case"embed":wt("load",i);break;case"video":case"audio":for(r=0;r<ko.length;r++)wt(ko[r],i);break;case"source":wt("error",i);break;case"img":case"image":case"link":wt("error",i),wt("load",i);break;case"details":wt("toggle",i);break;case"input":Gp(i,s),wt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},wt("invalid",i);break;case"textarea":jp(i,s),wt("invalid",i)}Rh(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Ga(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Ga(i.textContent,a,t),r=["children",""+a]):Zo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&wt("scroll",i)}switch(n){case"input":Ua(i),Wp(i,s,!0);break;case"textarea":Ua(i),Xp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=nc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=J0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[vi]=e,t[aa]=i,wv(t,e,!1,!1),e.stateNode=t;e:{switch(o=Ph(n,i),n){case"dialog":wt("cancel",t),wt("close",t),r=i;break;case"iframe":case"object":case"embed":wt("load",t),r=i;break;case"video":case"audio":for(r=0;r<ko.length;r++)wt(ko[r],t);r=i;break;case"source":wt("error",t),r=i;break;case"img":case"image":case"link":wt("error",t),wt("load",t),r=i;break;case"details":wt("toggle",t),r=i;break;case"input":Gp(t,i),r=Eh(t,i),wt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Pt({},i,{value:void 0}),wt("invalid",t);break;case"textarea":jp(t,i),r=Ah(t,i),wt("invalid",t);break;default:r=i}Rh(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?n_(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&e_(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Qo(t,l):typeof l=="number"&&Qo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Zo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&wt("scroll",t):l!=null&&mf(t,s,l,o))}switch(n){case"input":Ua(t),Wp(t,i,!1);break;case"textarea":Ua(t),Xp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+xr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Fs(t,!!i.multiple,s,!1):i.defaultValue!=null&&Fs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=nc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return sn(e),null;case 6:if(t&&e.stateNode!=null)bv(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(de(166));if(n=Br(ca.current),Br(Mi.current),Wa(e)){if(i=e.stateNode,n=e.memoizedProps,i[vi]=e,(s=i.nodeValue!==n)&&(t=kn,t!==null))switch(t.tag){case 3:Ga(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ga(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[vi]=e,e.stateNode=i}return sn(e),null;case 13:if(bt(Ct),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(At&&Fn!==null&&e.mode&1&&!(e.flags&128))G_(),Zs(),e.flags|=98560,s=!1;else if(s=Wa(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(de(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(de(317));s[vi]=e}else Zs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;sn(e),s=!1}else si!==null&&(ud(si),si=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Ct.current&1?Ht===0&&(Ht=3):Zf())),e.updateQueue!==null&&(e.flags|=4),sn(e),null);case 4:return Js(),nd(t,e),t===null&&sa(e.stateNode.containerInfo),sn(e),null;case 10:return If(e.type._context),sn(e),null;case 17:return En(e.type)&&ic(),sn(e),null;case 19:if(bt(Ct),s=e.memoizedState,s===null)return sn(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)wo(s,!1);else{if(Ht!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=uc(t),o!==null){for(e.flags|=128,wo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return Mt(Ct,Ct.current&1|2),e.child}t=t.sibling}s.tail!==null&&kt()>to&&(e.flags|=128,i=!0,wo(s,!1),e.lanes=4194304)}else{if(!i)if(t=uc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),wo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!At)return sn(e),null}else 2*kt()-s.renderingStartTime>to&&n!==1073741824&&(e.flags|=128,i=!0,wo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=kt(),e.sibling=null,n=Ct.current,Mt(Ct,i?n&1|2:n&1),e):(sn(e),null);case 22:case 23:return Kf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Dn&1073741824&&(sn(e),e.subtreeFlags&6&&(e.flags|=8192)):sn(e),null;case 24:return null;case 25:return null}throw Error(de(156,e.tag))}function uS(t,e){switch(Pf(e),e.tag){case 1:return En(e.type)&&ic(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Js(),bt(wn),bt(hn),Bf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Of(e),null;case 13:if(bt(Ct),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(de(340));Zs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return bt(Ct),null;case 4:return Js(),null;case 10:return If(e.type._context),null;case 22:case 23:return Kf(),null;case 24:return null;default:return null}}var qa=!1,ln=!1,hS=typeof WeakSet=="function"?WeakSet:Set,Le=null;function Ds(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Dt(t,e,i)}else n.current=null}function id(t,e,n){try{n()}catch(i){Dt(t,e,i)}}var Um=!1;function dS(t,e){if(zh=Jl,t=P_(),Cf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,h=0,d=t,u=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)u=d,d=p;for(;;){if(d===t)break t;if(u===n&&++c===r&&(a=o),u===s&&++h===i&&(l=o),(p=d.nextSibling)!==null)break;d=u,u=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Vh={focusedElem:t,selectionRange:n},Jl=!1,Le=e;Le!==null;)if(e=Le,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Le=t;else for(;Le!==null;){e=Le;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var v=_.memoizedProps,m=_.memoizedState,f=e.stateNode,g=f.getSnapshotBeforeUpdate(e.elementType===e.type?v:ii(e.type,v),m);f.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(de(163))}}catch(M){Dt(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,Le=t;break}Le=e.return}return _=Um,Um=!1,_}function Xo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&id(e,n,s)}r=r.next}while(r!==i)}}function kc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function rd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Tv(t){var e=t.alternate;e!==null&&(t.alternate=null,Tv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[vi],delete e[aa],delete e[Wh],delete e[$y],delete e[Yy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Av(t){return t.tag===5||t.tag===3||t.tag===4}function Fm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Av(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function sd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=nc));else if(i!==4&&(t=t.child,t!==null))for(sd(t,e,n),t=t.sibling;t!==null;)sd(t,e,n),t=t.sibling}function od(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(od(t,e,n),t=t.sibling;t!==null;)od(t,e,n),t=t.sibling}var Qt=null,ri=!1;function Yi(t,e,n){for(n=n.child;n!==null;)Cv(t,e,n),n=n.sibling}function Cv(t,e,n){if(Si&&typeof Si.onCommitFiberUnmount=="function")try{Si.onCommitFiberUnmount(Rc,n)}catch{}switch(n.tag){case 5:ln||Ds(n,e);case 6:var i=Qt,r=ri;Qt=null,Yi(t,e,n),Qt=i,ri=r,Qt!==null&&(ri?(t=Qt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Qt.removeChild(n.stateNode));break;case 18:Qt!==null&&(ri?(t=Qt,n=n.stateNode,t.nodeType===8?xu(t.parentNode,n):t.nodeType===1&&xu(t,n),na(t)):xu(Qt,n.stateNode));break;case 4:i=Qt,r=ri,Qt=n.stateNode.containerInfo,ri=!0,Yi(t,e,n),Qt=i,ri=r;break;case 0:case 11:case 14:case 15:if(!ln&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&id(n,e,o),r=r.next}while(r!==i)}Yi(t,e,n);break;case 1:if(!ln&&(Ds(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Dt(n,e,a)}Yi(t,e,n);break;case 21:Yi(t,e,n);break;case 22:n.mode&1?(ln=(i=ln)||n.memoizedState!==null,Yi(t,e,n),ln=i):Yi(t,e,n);break;default:Yi(t,e,n)}}function km(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new hS),e.forEach(function(i){var r=SS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Jn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Qt=a.stateNode,ri=!1;break e;case 3:Qt=a.stateNode.containerInfo,ri=!0;break e;case 4:Qt=a.stateNode.containerInfo,ri=!0;break e}a=a.return}if(Qt===null)throw Error(de(160));Cv(s,o,r),Qt=null,ri=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Dt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Rv(e,t),e=e.sibling}function Rv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Jn(e,t),fi(t),i&4){try{Xo(3,t,t.return),kc(3,t)}catch(v){Dt(t,t.return,v)}try{Xo(5,t,t.return)}catch(v){Dt(t,t.return,v)}}break;case 1:Jn(e,t),fi(t),i&512&&n!==null&&Ds(n,n.return);break;case 5:if(Jn(e,t),fi(t),i&512&&n!==null&&Ds(n,n.return),t.flags&32){var r=t.stateNode;try{Qo(r,"")}catch(v){Dt(t,t.return,v)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Z0(r,s),Ph(a,o);var c=Ph(a,s);for(o=0;o<l.length;o+=2){var h=l[o],d=l[o+1];h==="style"?n_(r,d):h==="dangerouslySetInnerHTML"?e_(r,d):h==="children"?Qo(r,d):mf(r,h,d,c)}switch(a){case"input":bh(r,s);break;case"textarea":Q0(r,s);break;case"select":var u=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Fs(r,!!s.multiple,p,!1):u!==!!s.multiple&&(s.defaultValue!=null?Fs(r,!!s.multiple,s.defaultValue,!0):Fs(r,!!s.multiple,s.multiple?[]:"",!1))}r[aa]=s}catch(v){Dt(t,t.return,v)}}break;case 6:if(Jn(e,t),fi(t),i&4){if(t.stateNode===null)throw Error(de(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(v){Dt(t,t.return,v)}}break;case 3:if(Jn(e,t),fi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{na(e.containerInfo)}catch(v){Dt(t,t.return,v)}break;case 4:Jn(e,t),fi(t);break;case 13:Jn(e,t),fi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||($f=kt())),i&4&&km(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(ln=(c=ln)||h,Jn(e,t),ln=c):Jn(e,t),fi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(Le=t,h=t.child;h!==null;){for(d=Le=h;Le!==null;){switch(u=Le,p=u.child,u.tag){case 0:case 11:case 14:case 15:Xo(4,u,u.return);break;case 1:Ds(u,u.return);var _=u.stateNode;if(typeof _.componentWillUnmount=="function"){i=u,n=u.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(v){Dt(i,n,v)}}break;case 5:Ds(u,u.return);break;case 22:if(u.memoizedState!==null){Bm(d);continue}}p!==null?(p.return=u,Le=p):Bm(d)}h=h.sibling}e:for(h=null,d=t;;){if(d.tag===5){if(h===null){h=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=t_("display",o))}catch(v){Dt(t,t.return,v)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(v){Dt(t,t.return,v)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Jn(e,t),fi(t),i&4&&km(t);break;case 21:break;default:Jn(e,t),fi(t)}}function fi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Av(n)){var i=n;break e}n=n.return}throw Error(de(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Qo(r,""),i.flags&=-33);var s=Fm(t);od(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Fm(t);sd(t,a,o);break;default:throw Error(de(161))}}catch(l){Dt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function fS(t,e,n){Le=t,Pv(t)}function Pv(t,e,n){for(var i=(t.mode&1)!==0;Le!==null;){var r=Le,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||qa;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||ln;a=qa;var c=ln;if(qa=o,(ln=l)&&!c)for(Le=r;Le!==null;)o=Le,l=o.child,o.tag===22&&o.memoizedState!==null?zm(r):l!==null?(l.return=o,Le=l):zm(r);for(;s!==null;)Le=s,Pv(s),s=s.sibling;Le=r,qa=a,ln=c}Om(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Le=s):Om(t)}}function Om(t){for(;Le!==null;){var e=Le;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ln||kc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!ln)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ii(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Mm(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Mm(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&na(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(de(163))}ln||e.flags&512&&rd(e)}catch(u){Dt(e,e.return,u)}}if(e===t){Le=null;break}if(n=e.sibling,n!==null){n.return=e.return,Le=n;break}Le=e.return}}function Bm(t){for(;Le!==null;){var e=Le;if(e===t){Le=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Le=n;break}Le=e.return}}function zm(t){for(;Le!==null;){var e=Le;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{kc(4,e)}catch(l){Dt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Dt(e,r,l)}}var s=e.return;try{rd(e)}catch(l){Dt(e,s,l)}break;case 5:var o=e.return;try{rd(e)}catch(l){Dt(e,o,l)}}}catch(l){Dt(e,e.return,l)}if(e===t){Le=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Le=a;break}Le=e.return}}var pS=Math.ceil,fc=ji.ReactCurrentDispatcher,Xf=ji.ReactCurrentOwner,Kn=ji.ReactCurrentBatchConfig,ut=0,Kt=null,Bt=null,Jt=0,Dn=0,Ns=br(0),Ht=0,fa=null,$r=0,Oc=0,qf=0,qo=null,yn=null,$f=0,to=1/0,Ni=null,pc=!1,ad=null,gr=null,$a=!1,cr=null,mc=0,$o=0,ld=null,kl=-1,Ol=0;function gn(){return ut&6?kt():kl!==-1?kl:kl=kt()}function _r(t){return t.mode&1?ut&2&&Jt!==0?Jt&-Jt:Zy.transition!==null?(Ol===0&&(Ol=p_()),Ol):(t=pt,t!==0||(t=window.event,t=t===void 0?16:S_(t.type)),t):1}function li(t,e,n,i){if(50<$o)throw $o=0,ld=null,Error(de(185));Ea(t,n,i),(!(ut&2)||t!==Kt)&&(t===Kt&&(!(ut&2)&&(Oc|=n),Ht===4&&or(t,Jt)),bn(t,i),n===1&&ut===0&&!(e.mode&1)&&(to=kt()+500,Ic&&Tr()))}function bn(t,e){var n=t.callbackNode;Z1(t,e);var i=Ql(t,t===Kt?Jt:0);if(i===0)n!==null&&Yp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Yp(n),e===1)t.tag===0?Ky(Vm.bind(null,t)):z_(Vm.bind(null,t)),Xy(function(){!(ut&6)&&Tr()}),n=null;else{switch(m_(i)){case 1:n=yf;break;case 4:n=d_;break;case 16:n=Zl;break;case 536870912:n=f_;break;default:n=Zl}n=Ov(n,Lv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Lv(t,e){if(kl=-1,Ol=0,ut&6)throw Error(de(327));var n=t.callbackNode;if(Vs()&&t.callbackNode!==n)return null;var i=Ql(t,t===Kt?Jt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=gc(t,i);else{e=i;var r=ut;ut|=2;var s=Nv();(Kt!==t||Jt!==e)&&(Ni=null,to=kt()+500,Gr(t,e));do try{_S();break}catch(a){Dv(t,a)}while(!0);Nf(),fc.current=s,ut=r,Bt!==null?e=0:(Kt=null,Jt=0,e=Ht)}if(e!==0){if(e===2&&(r=Uh(t),r!==0&&(i=r,e=cd(t,r))),e===1)throw n=fa,Gr(t,0),or(t,i),bn(t,kt()),n;if(e===6)or(t,i);else{if(r=t.current.alternate,!(i&30)&&!mS(r)&&(e=gc(t,i),e===2&&(s=Uh(t),s!==0&&(i=s,e=cd(t,s))),e===1))throw n=fa,Gr(t,0),or(t,i),bn(t,kt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(de(345));case 2:Ir(t,yn,Ni);break;case 3:if(or(t,i),(i&130023424)===i&&(e=$f+500-kt(),10<e)){if(Ql(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){gn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Gh(Ir.bind(null,t,yn,Ni),e);break}Ir(t,yn,Ni);break;case 4:if(or(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-ai(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=kt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*pS(i/1960))-i,10<i){t.timeoutHandle=Gh(Ir.bind(null,t,yn,Ni),i);break}Ir(t,yn,Ni);break;case 5:Ir(t,yn,Ni);break;default:throw Error(de(329))}}}return bn(t,kt()),t.callbackNode===n?Lv.bind(null,t):null}function cd(t,e){var n=qo;return t.current.memoizedState.isDehydrated&&(Gr(t,e).flags|=256),t=gc(t,e),t!==2&&(e=yn,yn=n,e!==null&&ud(e)),t}function ud(t){yn===null?yn=t:yn.push.apply(yn,t)}function mS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ui(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function or(t,e){for(e&=~qf,e&=~Oc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ai(e),i=1<<n;t[n]=-1,e&=~i}}function Vm(t){if(ut&6)throw Error(de(327));Vs();var e=Ql(t,0);if(!(e&1))return bn(t,kt()),null;var n=gc(t,e);if(t.tag!==0&&n===2){var i=Uh(t);i!==0&&(e=i,n=cd(t,i))}if(n===1)throw n=fa,Gr(t,0),or(t,e),bn(t,kt()),n;if(n===6)throw Error(de(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ir(t,yn,Ni),bn(t,kt()),null}function Yf(t,e){var n=ut;ut|=1;try{return t(e)}finally{ut=n,ut===0&&(to=kt()+500,Ic&&Tr())}}function Yr(t){cr!==null&&cr.tag===0&&!(ut&6)&&Vs();var e=ut;ut|=1;var n=Kn.transition,i=pt;try{if(Kn.transition=null,pt=1,t)return t()}finally{pt=i,Kn.transition=n,ut=e,!(ut&6)&&Tr()}}function Kf(){Dn=Ns.current,bt(Ns)}function Gr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,jy(n)),Bt!==null)for(n=Bt.return;n!==null;){var i=n;switch(Pf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&ic();break;case 3:Js(),bt(wn),bt(hn),Bf();break;case 5:Of(i);break;case 4:Js();break;case 13:bt(Ct);break;case 19:bt(Ct);break;case 10:If(i.type._context);break;case 22:case 23:Kf()}n=n.return}if(Kt=t,Bt=t=vr(t.current,null),Jt=Dn=e,Ht=0,fa=null,qf=Oc=$r=0,yn=qo=null,Or!==null){for(e=0;e<Or.length;e++)if(n=Or[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Or=null}return t}function Dv(t,e){do{var n=Bt;try{if(Nf(),Il.current=dc,hc){for(var i=Rt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}hc=!1}if(qr=0,Xt=Vt=Rt=null,jo=!1,ua=0,Xf.current=null,n===null||n.return===null){Ht=1,fa=e,Bt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Jt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var u=h.alternate;u?(h.updateQueue=u.updateQueue,h.memoizedState=u.memoizedState,h.lanes=u.lanes):(h.updateQueue=null,h.memoizedState=null)}var p=Cm(o);if(p!==null){p.flags&=-257,Rm(p,o,a,s,e),p.mode&1&&Am(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var v=new Set;v.add(l),e.updateQueue=v}else _.add(l);break e}else{if(!(e&1)){Am(s,c,e),Zf();break e}l=Error(de(426))}}else if(At&&a.mode&1){var m=Cm(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Rm(m,o,a,s,e),Lf(eo(l,a));break e}}s=l=eo(l,a),Ht!==4&&(Ht=2),qo===null?qo=[s]:qo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var f=mv(s,l,e);Sm(s,f);break e;case 1:a=l;var g=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(gr===null||!gr.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=gv(s,a,e);Sm(s,M);break e}}s=s.return}while(s!==null)}Uv(n)}catch(b){e=b,Bt===n&&n!==null&&(Bt=n=n.return);continue}break}while(!0)}function Nv(){var t=fc.current;return fc.current=dc,t===null?dc:t}function Zf(){(Ht===0||Ht===3||Ht===2)&&(Ht=4),Kt===null||!($r&268435455)&&!(Oc&268435455)||or(Kt,Jt)}function gc(t,e){var n=ut;ut|=2;var i=Nv();(Kt!==t||Jt!==e)&&(Ni=null,Gr(t,e));do try{gS();break}catch(r){Dv(t,r)}while(!0);if(Nf(),ut=n,fc.current=i,Bt!==null)throw Error(de(261));return Kt=null,Jt=0,Ht}function gS(){for(;Bt!==null;)Iv(Bt)}function _S(){for(;Bt!==null&&!H1();)Iv(Bt)}function Iv(t){var e=kv(t.alternate,t,Dn);t.memoizedProps=t.pendingProps,e===null?Uv(t):Bt=e,Xf.current=null}function Uv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=uS(n,e),n!==null){n.flags&=32767,Bt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ht=6,Bt=null;return}}else if(n=cS(n,e,Dn),n!==null){Bt=n;return}if(e=e.sibling,e!==null){Bt=e;return}Bt=e=t}while(e!==null);Ht===0&&(Ht=5)}function Ir(t,e,n){var i=pt,r=Kn.transition;try{Kn.transition=null,pt=1,vS(t,e,n,i)}finally{Kn.transition=r,pt=i}return null}function vS(t,e,n,i){do Vs();while(cr!==null);if(ut&6)throw Error(de(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(de(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Q1(t,s),t===Kt&&(Bt=Kt=null,Jt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||$a||($a=!0,Ov(Zl,function(){return Vs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Kn.transition,Kn.transition=null;var o=pt;pt=1;var a=ut;ut|=4,Xf.current=null,dS(t,n),Rv(n,t),Oy(Vh),Jl=!!zh,Vh=zh=null,t.current=n,fS(n),G1(),ut=a,pt=o,Kn.transition=s}else t.current=n;if($a&&($a=!1,cr=t,mc=r),s=t.pendingLanes,s===0&&(gr=null),X1(n.stateNode),bn(t,kt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(pc)throw pc=!1,t=ad,ad=null,t;return mc&1&&t.tag!==0&&Vs(),s=t.pendingLanes,s&1?t===ld?$o++:($o=0,ld=t):$o=0,Tr(),null}function Vs(){if(cr!==null){var t=m_(mc),e=Kn.transition,n=pt;try{if(Kn.transition=null,pt=16>t?16:t,cr===null)var i=!1;else{if(t=cr,cr=null,mc=0,ut&6)throw Error(de(331));var r=ut;for(ut|=4,Le=t.current;Le!==null;){var s=Le,o=s.child;if(Le.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Le=c;Le!==null;){var h=Le;switch(h.tag){case 0:case 11:case 15:Xo(8,h,s)}var d=h.child;if(d!==null)d.return=h,Le=d;else for(;Le!==null;){h=Le;var u=h.sibling,p=h.return;if(Tv(h),h===c){Le=null;break}if(u!==null){u.return=p,Le=u;break}Le=p}}}var _=s.alternate;if(_!==null){var v=_.child;if(v!==null){_.child=null;do{var m=v.sibling;v.sibling=null,v=m}while(v!==null)}}Le=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Le=o;else e:for(;Le!==null;){if(s=Le,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Xo(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,Le=f;break e}Le=s.return}}var g=t.current;for(Le=g;Le!==null;){o=Le;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,Le=x;else e:for(o=g;Le!==null;){if(a=Le,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:kc(9,a)}}catch(b){Dt(a,a.return,b)}if(a===o){Le=null;break e}var M=a.sibling;if(M!==null){M.return=a.return,Le=M;break e}Le=a.return}}if(ut=r,Tr(),Si&&typeof Si.onPostCommitFiberRoot=="function")try{Si.onPostCommitFiberRoot(Rc,t)}catch{}i=!0}return i}finally{pt=n,Kn.transition=e}}return!1}function Hm(t,e,n){e=eo(n,e),e=mv(t,e,1),t=mr(t,e,1),e=gn(),t!==null&&(Ea(t,1,e),bn(t,e))}function Dt(t,e,n){if(t.tag===3)Hm(t,t,n);else for(;e!==null;){if(e.tag===3){Hm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(gr===null||!gr.has(i))){t=eo(n,t),t=gv(e,t,1),e=mr(e,t,1),t=gn(),e!==null&&(Ea(e,1,t),bn(e,t));break}}e=e.return}}function xS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=gn(),t.pingedLanes|=t.suspendedLanes&n,Kt===t&&(Jt&n)===n&&(Ht===4||Ht===3&&(Jt&130023424)===Jt&&500>kt()-$f?Gr(t,0):qf|=n),bn(t,e)}function Fv(t,e){e===0&&(t.mode&1?(e=Oa,Oa<<=1,!(Oa&130023424)&&(Oa=4194304)):e=1);var n=gn();t=Hi(t,e),t!==null&&(Ea(t,e,n),bn(t,n))}function yS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Fv(t,n)}function SS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(de(314))}i!==null&&i.delete(e),Fv(t,n)}var kv;kv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||wn.current)Mn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Mn=!1,lS(t,e,n);Mn=!!(t.flags&131072)}else Mn=!1,At&&e.flags&1048576&&V_(e,oc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Fl(t,e),t=e.pendingProps;var r=Ks(e,hn.current);zs(e,n),r=Vf(null,e,i,t,r,n);var s=Hf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,En(i)?(s=!0,rc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Ff(e),r.updater=Fc,e.stateNode=r,r._reactInternals=e,Kh(e,i,t,n),e=Jh(null,e,i,!0,s,n)):(e.tag=0,At&&s&&Rf(e),pn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Fl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=wS(i),t=ii(i,t),r){case 0:e=Qh(null,e,i,t,n);break e;case 1:e=Dm(null,e,i,t,n);break e;case 11:e=Pm(null,e,i,t,n);break e;case 14:e=Lm(null,e,i,ii(i.type,t),n);break e}throw Error(de(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),Qh(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),Dm(t,e,i,r,n);case 3:e:{if(yv(e),t===null)throw Error(de(387));i=e.pendingProps,s=e.memoizedState,r=s.element,q_(t,e),cc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=eo(Error(de(423)),e),e=Nm(t,e,i,n,r);break e}else if(i!==r){r=eo(Error(de(424)),e),e=Nm(t,e,i,n,r);break e}else for(Fn=pr(e.stateNode.containerInfo.firstChild),kn=e,At=!0,si=null,n=j_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Zs(),i===r){e=Gi(t,e,n);break e}pn(t,e,i,n)}e=e.child}return e;case 5:return $_(e),t===null&&qh(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Hh(i,r)?o=null:s!==null&&Hh(i,s)&&(e.flags|=32),xv(t,e),pn(t,e,o,n),e.child;case 6:return t===null&&qh(e),null;case 13:return Sv(t,e,n);case 4:return kf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Qs(e,null,i,n):pn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),Pm(t,e,i,r,n);case 7:return pn(t,e,e.pendingProps,n),e.child;case 8:return pn(t,e,e.pendingProps.children,n),e.child;case 12:return pn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,Mt(ac,i._currentValue),i._currentValue=o,s!==null)if(ui(s.value,o)){if(s.children===r.children&&!wn.current){e=Gi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Oi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),$h(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(de(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),$h(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}pn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,zs(e,n),r=Zn(r),i=i(r),e.flags|=1,pn(t,e,i,n),e.child;case 14:return i=e.type,r=ii(i,e.pendingProps),r=ii(i.type,r),Lm(t,e,i,r,n);case 15:return _v(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),Fl(t,e),e.tag=1,En(i)?(t=!0,rc(e)):t=!1,zs(e,n),pv(e,i,r),Kh(e,i,r,n),Jh(null,e,i,!0,t,n);case 19:return Mv(t,e,n);case 22:return vv(t,e,n)}throw Error(de(156,e.tag))};function Ov(t,e){return h_(t,e)}function MS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,e,n,i){return new MS(t,e,n,i)}function Qf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function wS(t){if(typeof t=="function")return Qf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===_f)return 11;if(t===vf)return 14}return 2}function vr(t,e){var n=t.alternate;return n===null?(n=Yn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Bl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Qf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ws:return Wr(n.children,r,s,e);case gf:o=8,r|=8;break;case yh:return t=Yn(12,n,e,r|2),t.elementType=yh,t.lanes=s,t;case Sh:return t=Yn(13,n,e,r),t.elementType=Sh,t.lanes=s,t;case Mh:return t=Yn(19,n,e,r),t.elementType=Mh,t.lanes=s,t;case $0:return Bc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case X0:o=10;break e;case q0:o=9;break e;case _f:o=11;break e;case vf:o=14;break e;case nr:o=16,i=null;break e}throw Error(de(130,t==null?t:typeof t,""))}return e=Yn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Wr(t,e,n,i){return t=Yn(7,t,i,e),t.lanes=n,t}function Bc(t,e,n,i){return t=Yn(22,t,i,e),t.elementType=$0,t.lanes=n,t.stateNode={isHidden:!1},t}function Au(t,e,n){return t=Yn(6,t,null,e),t.lanes=n,t}function Cu(t,e,n){return e=Yn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function ES(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=lu(0),this.expirationTimes=lu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=lu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Jf(t,e,n,i,r,s,o,a,l){return t=new ES(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Yn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ff(s),t}function bS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ms,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Bv(t){if(!t)return yr;t=t._reactInternals;e:{if(ts(t)!==t||t.tag!==1)throw Error(de(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(En(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(de(171))}if(t.tag===1){var n=t.type;if(En(n))return B_(t,n,e)}return e}function zv(t,e,n,i,r,s,o,a,l){return t=Jf(n,i,!0,t,r,s,o,a,l),t.context=Bv(null),n=t.current,i=gn(),r=_r(n),s=Oi(i,r),s.callback=e??null,mr(n,s,r),t.current.lanes=r,Ea(t,r,i),bn(t,i),t}function zc(t,e,n,i){var r=e.current,s=gn(),o=_r(r);return n=Bv(n),e.context===null?e.context=n:e.pendingContext=n,e=Oi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=mr(r,e,o),t!==null&&(li(t,r,o,s),Nl(t,r,o)),o}function _c(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Gm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ep(t,e){Gm(t,e),(t=t.alternate)&&Gm(t,e)}function TS(){return null}var Vv=typeof reportError=="function"?reportError:function(t){console.error(t)};function tp(t){this._internalRoot=t}Vc.prototype.render=tp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(de(409));zc(t,e,null,null)};Vc.prototype.unmount=tp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Yr(function(){zc(null,t,null,null)}),e[Vi]=null}};function Vc(t){this._internalRoot=t}Vc.prototype.unstable_scheduleHydration=function(t){if(t){var e=v_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<sr.length&&e!==0&&e<sr[n].priority;n++);sr.splice(n,0,t),n===0&&y_(t)}};function np(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Hc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Wm(){}function AS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=_c(o);s.call(c)}}var o=zv(e,i,t,0,null,!1,!1,"",Wm);return t._reactRootContainer=o,t[Vi]=o.current,sa(t.nodeType===8?t.parentNode:t),Yr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=_c(l);a.call(c)}}var l=Jf(t,0,!1,null,null,!1,!1,"",Wm);return t._reactRootContainer=l,t[Vi]=l.current,sa(t.nodeType===8?t.parentNode:t),Yr(function(){zc(e,l,n,i)}),l}function Gc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=_c(o);a.call(l)}}zc(e,o,t,r)}else o=AS(n,e,t,r,i);return _c(o)}g_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Fo(e.pendingLanes);n!==0&&(Sf(e,n|1),bn(e,kt()),!(ut&6)&&(to=kt()+500,Tr()))}break;case 13:Yr(function(){var i=Hi(t,1);if(i!==null){var r=gn();li(i,t,1,r)}}),ep(t,1)}};Mf=function(t){if(t.tag===13){var e=Hi(t,134217728);if(e!==null){var n=gn();li(e,t,134217728,n)}ep(t,134217728)}};__=function(t){if(t.tag===13){var e=_r(t),n=Hi(t,e);if(n!==null){var i=gn();li(n,t,e,i)}ep(t,e)}};v_=function(){return pt};x_=function(t,e){var n=pt;try{return pt=t,e()}finally{pt=n}};Dh=function(t,e,n){switch(e){case"input":if(bh(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Nc(i);if(!r)throw Error(de(90));K0(i),bh(i,r)}}}break;case"textarea":Q0(t,n);break;case"select":e=n.value,e!=null&&Fs(t,!!n.multiple,e,!1)}};s_=Yf;o_=Yr;var CS={usingClientEntryPoint:!1,Events:[Ta,As,Nc,i_,r_,Yf]},Eo={findFiberByHostInstance:kr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},RS={bundleType:Eo.bundleType,version:Eo.version,rendererPackageName:Eo.rendererPackageName,rendererConfig:Eo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ji.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=c_(t),t===null?null:t.stateNode},findFiberByHostInstance:Eo.findFiberByHostInstance||TS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ya=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ya.isDisabled&&Ya.supportsFiber)try{Rc=Ya.inject(RS),Si=Ya}catch{}}zn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=CS;zn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!np(e))throw Error(de(200));return bS(t,e,null,n)};zn.createRoot=function(t,e){if(!np(t))throw Error(de(299));var n=!1,i="",r=Vv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Jf(t,1,!1,null,null,n,!1,i,r),t[Vi]=e.current,sa(t.nodeType===8?t.parentNode:t),new tp(e)};zn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(de(188)):(t=Object.keys(t).join(","),Error(de(268,t)));return t=c_(e),t=t===null?null:t.stateNode,t};zn.flushSync=function(t){return Yr(t)};zn.hydrate=function(t,e,n){if(!Hc(e))throw Error(de(200));return Gc(null,t,e,!0,n)};zn.hydrateRoot=function(t,e,n){if(!np(t))throw Error(de(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=Vv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=zv(e,null,t,1,n??null,r,!1,s,o),t[Vi]=e.current,sa(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Vc(e)};zn.render=function(t,e,n){if(!Hc(e))throw Error(de(200));return Gc(null,t,e,!1,n)};zn.unmountComponentAtNode=function(t){if(!Hc(t))throw Error(de(40));return t._reactRootContainer?(Yr(function(){Gc(null,null,t,!1,function(){t._reactRootContainer=null,t[Vi]=null})}),!0):!1};zn.unstable_batchedUpdates=Yf;zn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Hc(n))throw Error(de(200));if(t==null||t._reactInternals===void 0)throw Error(de(38));return Gc(t,e,n,!1,i)};zn.version="18.3.1-next-f1338f8080-20240426";function Hv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Hv)}catch(t){console.error(t)}}Hv(),H0.exports=zn;var PS=H0.exports,Gv,jm=PS;Gv=jm.createRoot,jm.hydrateRoot;let zl="/";function LS(t){zl=t}function In(t){const e=t.replace(/^\/+/,"");return zl.endsWith("/")?zl+e:zl+"/"+e}async function DS(t){const e=new Uint8Array(t);return e.length>=2&&e[0]===31&&e[1]===139?Xm(e,"gzip"):e.length>=2&&e[0]===120?Xm(e,"deflate"):e}async function Xm(t,e){const i=new ReadableStream({start(s){s.enqueue(t),s.close()}}).pipeThrough(new DecompressionStream(e)),r=await new Response(i).arrayBuffer();return new Uint8Array(r)}const NS=0,qm=10,IS=new TextDecoder("utf-8");class US{constructor(e){this.off=0,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength)}u8(){const e=this.view.getUint8(this.off);return this.off+=1,e}i8(){const e=this.view.getInt8(this.off);return this.off+=1,e}i16(){const e=this.view.getInt16(this.off);return this.off+=2,e}i32(){const e=this.view.getInt32(this.off);return this.off+=4,e}i64(){const e=this.view.getBigInt64(this.off);return this.off+=8,e}f32(){const e=this.view.getFloat32(this.off);return this.off+=4,e}f64(){const e=this.view.getFloat64(this.off);return this.off+=8,e}str(){const e=this.view.getUint16(this.off);this.off+=2;const n=new Uint8Array(this.view.buffer,this.view.byteOffset+this.off,e);return this.off+=e,IS.decode(n)}payload(e){switch(e){case 1:return this.i8();case 2:return this.i16();case 3:return this.i32();case 4:return this.i64();case 5:return this.f32();case 6:return this.f64();case 7:{const n=this.i32(),i=new Int8Array(this.view.buffer,this.view.byteOffset+this.off,n).slice();return this.off+=n,i}case 8:return this.str();case 9:{const n=this.u8(),i=this.i32(),r=[];for(let s=0;s<i;s++)r.push(this.payload(n));return r}case 10:{const n={};for(;;){const i=this.u8();if(i===NS)break;const r=this.str();n[r]=this.payload(i)}return n}case 11:{const n=this.i32(),i=new Int32Array(n);for(let r=0;r<n;r++)i[r]=this.i32();return i}case 12:{const n=this.i32(),i=new BigInt64Array(n);for(let r=0;r<n;r++)i[r]=this.i64();return i}default:throw new Error(`NBT: tipo de tag desconocido (${e})`)}}readRoot(){const e=this.u8();if(e!==qm)throw new Error(`NBT: la raíz no es un compound (tipo ${e})`);return this.str(),this.payload(qm)}}function FS(t){return new US(t).readRoot()}const kS=6e6,Wv=96e6,OS=200*1024*1024;function BS(t){return t.totalBlocks>kS||t.width*t.height*t.length>Wv}class ip extends Error{constructor(e=0,n=0,i=0){super("SCHEMATIC_TOO_LARGE"),this.name="SchematicTooLargeError",this.width=e,this.height=n,this.length=i}}function jv(t,e,n){return t*e*n>Wv}const $m="minecraft:",Je=(t,e)=>e&&Object.keys(e).length?{name:$m+t,properties:e}:{name:$m+t},zS={stone:"stone",granite:"granite",smooth_granite:"polished_granite",diorite:"diorite",smooth_diorite:"polished_diorite",andesite:"andesite",smooth_andesite:"polished_andesite"},VS={dirt:"dirt",coarse_dirt:"coarse_dirt",podzol:"podzol"},HS={default:"sandstone",chiseled_sandstone:"chiseled_sandstone",smooth_sandstone:"cut_sandstone"},GS={default:"red_sandstone",chiseled_red_sandstone:"chiseled_red_sandstone",smooth_red_sandstone:"cut_red_sandstone"},WS={stonebrick:"stone_bricks",mossy_stonebrick:"mossy_stone_bricks",cracked_stonebrick:"cracked_stone_bricks",chiseled_stonebrick:"chiseled_stone_bricks"},jS={prismarine:"prismarine",prismarine_bricks:"prismarine_bricks",dark_prismarine:"dark_prismarine"},XS={poppy:"poppy",blue_orchid:"blue_orchid",allium:"allium",houstonia:"azure_bluet",red_tulip:"red_tulip",orange_tulip:"orange_tulip",white_tulip:"white_tulip",pink_tulip:"pink_tulip",oxeye_daisy:"oxeye_daisy"},qS={sunflower:"sunflower",syringa:"lilac",double_grass:"tall_grass",double_fern:"large_fern",double_rose:"rose_bush",paeonia:"peony"},$S={grass:"short_grass",fern:"fern",dead_bush:"dead_bush"},Ym={stone:"smooth_stone",sandstone:"sandstone",wood_old:"petrified_oak",cobblestone:"cobblestone",brick:"brick",smooth_brick:"stone_brick",nether_brick:"nether_brick",quartz:"quartz"},Ka=new Set(["oak","spruce","birch","jungle","acacia","dark_oak"]),Ru=(t,e)=>e?"double":t.half==="top"?"top":"bottom";function vc(t){const e=t.name.replace(/^minecraft:/,""),n=t.properties??{},i=n.facing,r=!!i&&i!=="up",s=n.variant;switch(e){case"unpowered_repeater":return Je("repeater",{...n,powered:"false"});case"powered_repeater":return Je("repeater",{...n,powered:"true"});case"unpowered_comparator":return Je("comparator",{...n,powered:"false"});case"powered_comparator":return Je("comparator",{...n,powered:"true"});case"torch":return r?Je("wall_torch",{facing:i}):t;case"redstone_torch":return r?Je("redstone_wall_torch",{facing:i,lit:"true"}):Je("redstone_torch",{lit:"true"});case"unlit_redstone_torch":return r?Je("redstone_wall_torch",{facing:i,lit:"false"}):Je("redstone_torch",{lit:"false"});case"stone":return Je(zS[s]??"stone");case"dirt":return Je(VS[s]??"dirt",s==="podzol"?{snowy:n.snowy??"false"}:void 0);case"sand":return Je(s==="red_sand"?"red_sand":"sand");case"planks":return Je(Ka.has(s)?`${s}_planks`:"oak_planks");case"sapling":return Je(Ka.has(s)?`${s}_sapling`:"oak_sapling",n.stage?{stage:n.stage}:void 0);case"sandstone":return Je(HS[s]??"sandstone");case"red_sandstone":return Je(GS[s]??"red_sandstone");case"stonebrick":return Je(WS[s]??"stone_bricks");case"prismarine":return Je(jS[s]??"prismarine");case"sponge":return Je(n.wet==="true"?"wet_sponge":"sponge");case"quartz_block":return s==="chiseled"?Je("chiseled_quartz_block"):s==="lines"?Je("quartz_pillar",{axis:n.axis??"y"}):Je("quartz_block");case"log":case"log2":{const o=s||"oak";return n.axis==="none"?Je(`${o}_wood`):Je(`${o}_log`,{axis:n.axis??"y"})}case"leaves":case"leaves2":return Je(`${s||"oak"}_leaves`);case"wool":return Je(`${n.color??"white"}_wool`);case"carpet":return Je(`${n.color??"white"}_carpet`);case"stained_glass":return Je(`${n.color??"white"}_stained_glass`);case"stained_hardened_clay":return Je(`${n.color??"white"}_terracotta`);case"stained_glass_pane":{const{color:o,...a}=n;return Je(`${o??"white"}_stained_glass_pane`,a)}case"red_flower":return Je(XS[s]??"poppy");case"yellow_flower":return Je("dandelion");case"tallgrass":return Je($S[n.type??s]??"short_grass");case"double_plant":{const o=qS[s]??"sunflower";return Je(o,{half:n.half==="upper"?"upper":"lower"})}case"stone_slab":return s?Je(`${Ym[s]??"smooth_stone"}_slab`,{type:Ru(n,!1)}):t;case"double_stone_slab":return Je(`${Ym[s]??"smooth_stone"}_slab`,{type:"double"});case"stone_slab2":return Je("red_sandstone_slab",{type:Ru(n,!1)});case"double_stone_slab2":return Je("red_sandstone_slab",{type:"double"});case"wooden_slab":return Je(`${Ka.has(s)?s:"oak"}_slab`,{type:Ru(n,!1)});case"double_wooden_slab":return Je(`${Ka.has(s)?s:"oak"}_slab`,{type:"double"});default:return t}}function hd(t){if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean")return String(t);if(Array.isArray(t))return t.map(hd).join("");if(t&&typeof t=="object"){const e=t;let n=typeof e.text=="string"?e.text:"";return Array.isArray(e.extra)&&(n+=e.extra.map(hd).join("")),n}return""}function Xv(t){const e=t.trim();if(!e||e==='""')return"";if(e[0]==="{"||e[0]==="["||e[0]==='"')try{return hd(JSON.parse(e))}catch{}return e}function Km(t){if(!t||typeof t!="object"||Array.isArray(t)||ArrayBuffer.isView(t))return[];const e=t.messages;return Array.isArray(e)?e.map(n=>typeof n=="string"?Xv(n):""):[]}function Zm(t){for(;t.length&&t[t.length-1]==="";)t.pop();return t}function qv(t){let e=Km(t.front_text);const n=Zm(Km(t.back_text));if(e.length===0){const i=[t.Text1,t.Text2,t.Text3,t.Text4].map(r=>typeof r=="string"?Xv(r):"");i.some(r=>r!=="")&&(e=i)}return e=Zm(e),e.length===0&&n.length===0?null:{front:e,back:n}}function YS(t){return t?ArrayBuffer.isView(t)?Array.from(t):Array.isArray(t)?t.filter(e=>typeof e=="number"):[]:[]}function $v(t){const e=t.Items,n=[];let i=0;if(Array.isArray(e))for(const s of e){if(!s||typeof s!="object"||Array.isArray(s)||ArrayBuffer.isView(s))continue;const o=s,a=Number(o.Count??o.count??0),l=typeof o.id=="string"?o.id:"";a<=0||!l||(n.push({slot:Number(o.Slot??o.slot??n.length),id:l,count:a}),i+=a)}const r=YS(t.disabled_slots);return n.length===0&&r.length===0?null:{items:n,total:i,slots:n.length,disabled:r.length?r:void 0}}function Yv(t){const e=t.blockState??t.block_state;if(!e||typeof e!="object"||Array.isArray(e)||ArrayBuffer.isView(e))return null;const n=e,i=n.Name;if(typeof i!="string"||!i)return null;const r={},s=n.Properties;if(s&&typeof s=="object"&&!Array.isArray(s)&&!ArrayBuffer.isView(s))for(const[o,a]of Object.entries(s))r[o]=String(a);return{name:i,properties:Object.keys(r).length?r:void 0}}function bo(t){return t&&typeof t=="object"&&!Array.isArray(t)&&!ArrayBuffer.isView(t)?t:null}function Kv(t){const e=ZS(t);if(!e)return null;let n;try{n=atob(e)}catch{return null}const i=n.match(/textures\.minecraft\.net\/texture\/([0-9a-fA-F]+)/);return i?i[1].toLowerCase():null}function KS(t){const e=t.includes(":")?t.slice(t.indexOf(":")+1):t;return e==="player_head"||e==="player_wall_head"}function Zv(t,e,n){if(!t.size)return;const i=new Map,r=new Map,s=new Map;for(const[o,a]of t){const l=e[o],c=n[l];if(!c||!KS(c.name))continue;let h=r.get(a);h||(h=`skull/custom_${r.size}`,r.set(a,h),i.set(h,a));const d=l+"#"+h;let u=s.get(d);u===void 0&&(u=n.length,n.push({...c,skin:h}),s.set(d,u)),e[o]=u}return i.size?i:void 0}function ZS(t){const e=bo(t.profile);if(e&&Array.isArray(e.properties))for(const r of e.properties){const s=bo(r);if(s&&s.name==="textures"&&typeof s.value=="string")return s.value}const n=bo(t.SkullOwner),i=n&&bo(n.Properties);if(i&&Array.isArray(i.textures)){const r=bo(i.textures[0]);if(r&&typeof r.Value=="string")return r.Value}return null}function Qv(t){if(String(t.id??t.Id??"").replace("minecraft:","")!=="armor_stand")return null;const n=t.Rotation;let i=0;return Array.isArray(n)&&n.length>=1?i=Number(n[0]):ArrayBuffer.isView(n)&&n.length>=1&&(i=n[0]),{yaw:Number.isFinite(i)?i:0}}const Qm={minecart:null,hopper_minecart:"hopper",chest_minecart:"chest",furnace_minecart:"furnace",tnt_minecart:"tnt",command_block_minecart:"command_block",spawner_minecart:"spawner"};function Jv(t){const e=String(t.id??t.Id??"").replace("minecraft:","");if(!(e in Qm))return null;const n=t.Rotation;let i=0;return Array.isArray(n)&&n.length>=1?i=Number(n[0]):ArrayBuffer.isView(n)&&n.length>=1&&(i=n[0]),{content:Qm[e],yaw:Number.isFinite(i)?i:0}}const QS=new Set(["oak","spruce","birch","jungle","acacia","dark_oak","mangrove","cherry","pale_oak"]);function ex(t){const e=String(t.id??t.Id??"").replace("minecraft:","");let n=null,i=!1;if(e==="boat"||e==="chest_boat")i=e==="chest_boat",n=typeof t.Type=="string"?t.Type.replace("minecraft:",""):"oak";else{const o=e.match(/^(.+)_chest_boat$/),a=e.match(/^(.+)_boat$/);o?(n=o[1],i=!0):a&&(n=a[1])}if(!n||!QS.has(n))return null;const r=t.Rotation;let s=0;return Array.isArray(r)&&r.length>=1?s=Number(r[0]):ArrayBuffer.isView(r)&&r.length>=1&&(s=r[0]),{variant:n,chest:i,yaw:Number.isFinite(s)?s:0}}function tx(t){const e=String(t.id??t.Id??"").replace("minecraft:","");if(e!=="item_frame"&&e!=="glow_item_frame")return null;const n=t.Item,i=n?String(n.id??n.Id??""):"",r=i?i.replace("minecraft:",""):null;return{facing:Number(t.Facing??0),rotation:Number(t.ItemRotation??0),item:r,glow:e==="glow_item_frame"}}function no(t,e,n,i,r){return(i*e+r)*t+n}const JS=new Set(["minecraft:air","minecraft:cave_air","minecraft:void_air","air","cave_air","void_air"]);function Kr(t){return JS.has(t)}function Jm(t){const e=t.Regions;if(!e||typeof e!="object")throw new Error("No es un .litematic válido (falta Regions)");const n=t.Metadata??{},i=typeof n.Name=="string"?n.Name:"Schematic",r=typeof n.Author=="string"?n.Author:void 0,s=[];for(const D of Object.keys(e)){const W=e[D],q=W.Position,R=W.Size,U=W.BlockStatePalette,P=W.BlockStates;if(!q||!R||!U||!P)continue;const L=Number(R.x),V=Number(R.y),j=Number(R.z),H=Number(q.x),I=Number(q.y),ne=Number(q.z),te=Math.abs(L),J=Math.abs(V),O=Math.abs(j);s.push({posX:H,posY:I,posZ:ne,sizeX:L,sizeY:V,sizeZ:j,absX:te,absY:J,absZ:O,minX:L>=0?H:H+L+1,minY:V>=0?I:I+V+1,minZ:j>=0?ne:ne+j+1,palette:U.map(eM),states:P,tileEntities:W.TileEntities,entities:W.Entities})}if(s.length===0)throw new Error("El .litematic no tiene regiones con bloques");let o=1/0,a=1/0,l=1/0,c=-1/0,h=-1/0,d=-1/0;for(const D of s)o=Math.min(o,D.minX),c=Math.max(c,D.minX+D.absX),a=Math.min(a,D.minY),h=Math.max(h,D.minY+D.absY),l=Math.min(l,D.minZ),d=Math.max(d,D.minZ+D.absZ);const u=c-o,p=h-a,_=d-l;if(jv(u,p,_))throw new ip(u,p,_);const v=[{name:"minecraft:air"}],m=new Map([["minecraft:air",0]]),f=new Uint16Array(u*p*_),g=new Map,x=new Map,M=[],b=[],w=[],C=[],y=new Map,A=new Map;for(const D of s){const W=new Int32Array(D.palette.length);for(let I=0;I<D.palette.length;I++){const ne=D.palette[I];if(Kr(ne.name)){W[I]=0;continue}const te=eg(ne);let J=m.get(te);J===void 0&&(J=v.length,v.push(ne),m.set(te,J)),W[I]=J}const q=Math.max(2,tM(D.palette.length)),R=nM(D.states,q),U=D.minX-o,P=D.minY-a,L=D.minZ-l,{absX:V,absY:j,absZ:H}=D;for(let I=0;I<j;I++)for(let ne=0;ne<H;ne++)for(let te=0;te<V;te++){const J=(I*H+ne)*V+te,O=R(J);if(O<=0||O>=D.palette.length)continue;const Y=W[O];Y!==0&&(f[no(u,_,U+te,P+I,L+ne)]=Y)}if(D.tileEntities)for(const I of D.tileEntities){if(!I||typeof I!="object"||Array.isArray(I)||ArrayBuffer.isView(I))continue;const ne=I,te=U+Number(ne.x),J=P+Number(ne.y),O=L+Number(ne.z);if(te<0||te>=u||J<0||J>=p||O<0||O>=_)continue;const Y=no(u,_,te,J,O),K=$v(ne);K&&g.set(Y,K);const ue=qv(ne);ue&&x.set(Y,ue);const Se=Yv(ne);Se&&y.set(Y,Se);const Me=Kv(ne);Me&&A.set(Y,Me)}if(D.entities)for(const I of D.entities){if(!I||typeof I!="object"||Array.isArray(I)||ArrayBuffer.isView(I))continue;const ne=I,te=tx(ne),J=te?null:Jv(ne),O=te||J?null:Qv(ne),Y=te||J||O?null:ex(ne);if(!te&&!J&&!O&&!Y)continue;const K=ne.Pos;let ue,Se,Me;if(Array.isArray(K)&&K.length>=3)ue=Number(K[0]),Se=Number(K[1]),Me=Number(K[2]);else if(ArrayBuffer.isView(K)&&K.length>=3){const he=K;ue=he[0],Se=he[1],Me=he[2]}else if(ne.TileX!==void 0)ue=Number(ne.TileX),Se=Number(ne.TileY),Me=Number(ne.TileZ);else continue;const We=D.posX+ue-o,Ie=D.posY+Se-a,Be=D.posZ+Me-l,Ge=Math.floor(We),fe=Math.floor(Ie),re=Math.floor(Be);Ge<0||Ge>=u||fe<0||fe>=p||re<0||re>=_||(te?M.push({x:Ge,y:fe,z:re,...te}):J?b.push({x:We,y:Ie,z:Be,...J}):O?w.push({x:We,y:Ie,z:Be,...O}):Y&&C.push({x:We,y:Ie,z:Be,...Y}))}}for(const[D,W]of y){if(Kr(W.name)){f[D]=0;continue}const q=eg(W);let R=m.get(q);R===void 0&&(R=v.length,v.push(W),m.set(q,R)),f[D]=R}const F=Zv(A,f,v);let N=0;for(let D=0;D<f.length;D++)f[D]!==0&&N++;return{name:i,author:r,width:u,height:p,length:_,palette:v,blocks:f,totalBlocks:N,source:"litematic",containers:g,signs:x,itemFrames:M,minecarts:b,armorStands:w,boats:C,skins:F}}function eM(t){const e=String(t.Name),n=t.Properties;if(!n)return vc({name:e});const i={};for(const r of Object.keys(n))i[r]=String(n[r]);return vc({name:e,properties:i})}function eg(t){if(!t.properties)return t.name;const e=Object.keys(t.properties).sort();return t.name+"["+e.map(n=>`${n}=${t.properties[n]}`).join(",")+"]"}function tM(t){let e=0,n=t-1;for(;n>0;)e++,n>>=1;return e}function nM(t,e){const i=(1n<<BigInt(e))-1n,r=t.length,s=o=>o>=0&&o<r?BigInt.asUintN(64,t[o]):0n;return o=>{const a=o*e,l=Math.floor(a/64),c=a%64,h=Math.floor((a+e-1)/64),d=BigInt(c);let u;if(l===h)u=s(l)>>d&i;else{const p=s(l)>>d,_=s(h)<<64n-d;u=(p|_)&i}return Number(u)}}function tg(t){let e=t;const n=e.Schematic;n&&typeof n=="object"&&!Array.isArray(n)&&!ArrayBuffer.isView(n)&&(e=n);const i=Number(e.Width),r=Number(e.Height),s=Number(e.Length);if(!i||!r||!s)throw new Error("No es un .schem válido (faltan dimensiones)");if(jv(i,r,s))throw new ip(i,r,s);let o,a;const l=e.Blocks;if(l&&(l.Palette||l.Data)?(o=l.Palette,a=l.Data):(o=e.Palette,a=e.BlockData),!o||!a)throw new Error(".schem sin Palette/BlockData");let c=0;for(const U of Object.keys(o))c=Math.max(c,Number(o[U]));const h=new Array(c+1);for(const U of Object.keys(o))h[Number(o[U])]=iM(U);for(let U=0;U<h.length;U++)h[U]||(h[U]={name:"minecraft:air"});const d=i*r*s,u=new Uint16Array(d),p=a;let _=0,v=0;for(;v<d&&_<p.length;){let U=0,P=0,L;do L=p[_++]&255,U|=(L&127)<<P,P+=7;while(L&128&&_<p.length);u[v++]=U<h.length?U:0}let m=0;for(let U=0;U<d;U++)Kr(h[u[U]].name)||m++;const f=new Map,g=new Map,x=new Map,M=U=>U.name+(U.properties?"|"+Object.entries(U.properties).sort().map(([P,L])=>`${P}=${L}`).join(","):""),b=new Map;for(let U=0;U<h.length;U++)b.set(M(h[U]),U);const w=(l==null?void 0:l.BlockEntities)??e.BlockEntities??e.TileEntities;if(Array.isArray(w))for(const U of w){if(!U||typeof U!="object"||Array.isArray(U)||ArrayBuffer.isView(U))continue;const P=U,L=P.Pos;let V,j,H;if(ArrayBuffer.isView(L)&&L.length>=3){const Y=L;V=Y[0],j=Y[1],H=Y[2]}else V=Number(P.x),j=Number(P.y),H=Number(P.z);if(!Number.isFinite(V)||V<0||V>=i||j<0||j>=r||H<0||H>=s)continue;const I=no(i,s,V,j,H),ne=$v(P);ne&&f.set(I,ne);const te=qv(P);te&&g.set(I,te);const J=Kv(P);J&&x.set(I,J);const O=Yv(P);if(O)if(Kr(O.name))u[I]=0;else{const Y=M(O);let K=b.get(Y);K===void 0&&(K=h.length,h.push(O),b.set(Y,K)),u[I]=K}}const C=[],y=[],A=[],F=[],N=(l==null?void 0:l.Entities)??e.Entities;if(Array.isArray(N))for(const U of N){if(!U||typeof U!="object"||Array.isArray(U)||ArrayBuffer.isView(U))continue;const P=U,L=tx(P),V=L?null:Jv(P),j=L||V?null:Qv(P),H=L||V||j?null:ex(P);if(!L&&!V&&!j&&!H)continue;const I=P.Pos;let ne,te,J;if(Array.isArray(I)&&I.length>=3)ne=Number(I[0]),te=Number(I[1]),J=Number(I[2]);else if(ArrayBuffer.isView(I)&&I.length>=3){const ue=I;ne=ue[0],te=ue[1],J=ue[2]}else continue;const O=Math.floor(ne),Y=Math.floor(te),K=Math.floor(J);O<0||O>=i||Y<0||Y>=r||K<0||K>=s||(L?C.push({x:O,y:Y,z:K,...L}):V?y.push({x:ne,y:te,z:J,...V}):j?A.push({x:ne,y:te,z:J,...j}):H&&F.push({x:ne,y:te,z:J,...H}))}const D=Zv(x,u,h),W=e.Metadata,q=W&&typeof W.Name=="string"?W.Name:"Schematic",R=W&&typeof W.Author=="string"?W.Author:void 0;return{name:q,author:R,width:i,height:r,length:s,palette:h,blocks:u,totalBlocks:m,source:"schem",containers:f,signs:g,itemFrames:C,minecarts:y,armorStands:A,boats:F,skins:D}}function iM(t){const e=t.indexOf("[");if(e===-1)return vc({name:t});const n=t.slice(0,e),i=t.endsWith("]")?t.slice(e+1,-1):t.slice(e+1),r={};for(const s of i.split(",")){const o=s.indexOf("=");o>0&&(r[s.slice(0,o)]=s.slice(o+1))}return vc({name:n,properties:r})}async function rM(t,e){const n=await DS(t);if(n.length>OS)throw new ip;const i=FS(n),r=e.toLowerCase();if(r.endsWith(".litematic"))return Jm(i);if(r.endsWith(".schem"))return tg(i);if(To(i,"Regions"))return Jm(i);if(To(i,"Width")||To(i,"Palette")||To(i,"Schematic")||To(i,"Blocks"))return tg(i);throw new Error("Formato no reconocido (se esperaba .litematic o .schem)")}function To(t,e){return Object.prototype.hasOwnProperty.call(t,e)}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rp="184",Hs={ROTATE:0,DOLLY:1,PAN:2},Is={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},sM=0,ng=1,oM=2,Vl=1,nx=2,Oo=3,Sr=0,Tn=1,mn=2,wi=0,Gs=1,dd=2,ig=3,rg=4,aM=5,Ur=100,lM=101,cM=102,uM=103,hM=104,dM=200,fM=201,pM=202,mM=203,fd=204,pd=205,gM=206,_M=207,vM=208,xM=209,yM=210,SM=211,MM=212,wM=213,EM=214,md=0,gd=1,_d=2,io=3,vd=4,xd=5,yd=6,Sd=7,sp=0,bM=1,TM=2,Ei=0,ix=1,rx=2,sx=3,ox=4,ax=5,lx=6,cx=7,ux=300,Zr=301,ro=302,Pu=303,Lu=304,Wc=306,Md=1e3,ki=1001,wd=1002,Et=1003,AM=1004,Za=1005,Yt=1006,Du=1007,zr=1008,Un=1009,hx=1010,dx=1011,pa=1012,op=1013,bi=1014,xi=1015,On=1016,ap=1017,lp=1018,ma=1020,fx=35902,px=35899,mx=1021,gx=1022,oi=1023,Wi=1026,Vr=1027,_x=1028,cp=1029,Qr=1030,up=1031,hp=1033,Hl=33776,Gl=33777,Wl=33778,jl=33779,Ed=35840,bd=35841,Td=35842,Ad=35843,Cd=36196,Rd=37492,Pd=37496,Ld=37488,Dd=37489,xc=37490,Nd=37491,Id=37808,Ud=37809,Fd=37810,kd=37811,Od=37812,Bd=37813,zd=37814,Vd=37815,Hd=37816,Gd=37817,Wd=37818,jd=37819,Xd=37820,qd=37821,$d=36492,Yd=36494,Kd=36495,Zd=36283,Qd=36284,yc=36285,Jd=36286,CM=3200,ef=0,RM=1,ar="",Wn="srgb",so="srgb-linear",Sc="linear",ft="srgb",ss=7680,sg=519,PM=512,LM=513,DM=514,dp=515,NM=516,IM=517,fp=518,UM=519,og=35044,ag="300 es",yi=2e3,ga=2001;function FM(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function _a(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function kM(){const t=_a("canvas");return t.style.display="block",t}const lg={};function cg(...t){const e="THREE."+t.shift();console.log(e,...t)}function vx(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ve(...t){t=vx(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function at(...t){t=vx(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function tf(...t){const e=t.join(" ");e in lg||(lg[e]=!0,Ve(...t))}function OM(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const BM={[md]:gd,[_d]:yd,[vd]:Sd,[io]:xd,[gd]:md,[yd]:_d,[Sd]:vd,[xd]:io};class Ar{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ug=1234567;const Ws=Math.PI/180,va=180/Math.PI;function po(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(on[t&255]+on[t>>8&255]+on[t>>16&255]+on[t>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[n&63|128]+on[n>>8&255]+"-"+on[n>>16&255]+on[n>>24&255]+on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]).toLowerCase()}function nt(t,e,n){return Math.max(e,Math.min(n,t))}function pp(t,e){return(t%e+e)%e}function zM(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function VM(t,e,n){return t!==e?(n-t)/(e-t):0}function Yo(t,e,n){return(1-n)*t+n*e}function HM(t,e,n,i){return Yo(t,e,1-Math.exp(-n*i))}function GM(t,e=1){return e-Math.abs(pp(t,e*2)-e)}function WM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function jM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function XM(t,e){return t+Math.floor(Math.random()*(e-t+1))}function qM(t,e){return t+Math.random()*(e-t)}function $M(t){return t*(.5-Math.random())}function YM(t){t!==void 0&&(ug=t);let e=ug+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function KM(t){return t*Ws}function ZM(t){return t*va}function QM(t){return(t&t-1)===0&&t!==0}function JM(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function ew(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function tw(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),h=o((e+i)/2),d=s((e-i)/2),u=o((e-i)/2),p=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(a*h,l*d,l*u,a*c);break;case"YZY":t.set(l*u,a*h,l*d,a*c);break;case"ZXZ":t.set(l*d,l*u,a*h,a*c);break;case"XZX":t.set(a*h,l*_,l*p,a*c);break;case"YXY":t.set(l*p,a*h,l*_,a*c);break;case"ZYZ":t.set(l*_,l*p,a*h,a*c);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ss(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function dn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const xx={DEG2RAD:Ws,RAD2DEG:va,generateUUID:po,clamp:nt,euclideanModulo:pp,mapLinear:zM,inverseLerp:VM,lerp:Yo,damp:HM,pingpong:GM,smoothstep:WM,smootherstep:jM,randInt:XM,randFloat:qM,randFloatSpread:$M,seededRandom:YM,degToRad:KM,radToDeg:ZM,isPowerOfTwo:QM,ceilPowerOfTwo:JM,floorPowerOfTwo:ew,setQuaternionFromProperEuler:tw,normalize:dn,denormalize:Ss},Ep=class Ep{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=nt(this.x,e.x,n.x),this.y=nt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=nt(this.x,e,n),this.y=nt(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ep.prototype.isVector2=!0;let Oe=Ep;class Mr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],d=i[r+3],u=s[o+0],p=s[o+1],_=s[o+2],v=s[o+3];if(d!==v||l!==u||c!==p||h!==_){let m=l*u+c*p+h*_+d*v;m<0&&(u=-u,p=-p,_=-_,v=-v,m=-m);let f=1-a;if(m<.9995){const g=Math.acos(m),x=Math.sin(g);f=Math.sin(f*g)/x,a=Math.sin(a*g)/x,l=l*f+u*a,c=c*f+p*a,h=h*f+_*a,d=d*f+v*a}else{l=l*f+u*a,c=c*f+p*a,h=h*f+_*a,d=d*f+v*a;const g=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=g,c*=g,h*=g,d*=g}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],d=s[o],u=s[o+1],p=s[o+2],_=s[o+3];return e[n]=a*_+h*d+l*p-c*u,e[n+1]=l*_+h*u+c*d-a*p,e[n+2]=c*_+h*p+a*u-l*d,e[n+3]=h*_-a*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),d=a(s/2),u=l(i/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=u*h*d+c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d-u*p*_;break;case"YXZ":this._x=u*h*d+c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d+u*p*_;break;case"ZXY":this._x=u*h*d-c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d-u*p*_;break;case"ZYX":this._x=u*h*d-c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d+u*p*_;break;case"YZX":this._x=u*h*d+c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d-u*p*_;break;case"XZY":this._x=u*h*d-c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d+u*p*_;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],h=n[6],d=n[10],u=i+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-n;if(a<.9995){const c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const bp=class bp{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(hg.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(hg.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*h,this.y=i+l*h+a*c-s*d,this.z=r+l*d+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=nt(this.x,e.x,n.x),this.y=nt(this.y,e.y,n.y),this.z=nt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=nt(this.x,e,n),this.y=nt(this.y,e,n),this.z=nt(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Nu.copy(this).projectOnVector(e),this.sub(Nu)}reflect(e){return this.sub(Nu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};bp.prototype.isVector3=!0;let B=bp;const Nu=new B,hg=new Mr,Tp=class Tp{constructor(e,n,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],p=i[5],_=i[8],v=r[0],m=r[3],f=r[6],g=r[1],x=r[4],M=r[7],b=r[2],w=r[5],C=r[8];return s[0]=o*v+a*g+l*b,s[3]=o*m+a*x+l*w,s[6]=o*f+a*M+l*C,s[1]=c*v+h*g+d*b,s[4]=c*m+h*x+d*w,s[7]=c*f+h*M+d*C,s[2]=u*v+p*g+_*b,s[5]=u*m+p*x+_*w,s[8]=u*f+p*M+_*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return n*o*h-n*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*s,p=c*s-o*l,_=n*d+i*u+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=d*v,e[1]=(r*c-h*i)*v,e[2]=(a*i-r*o)*v,e[3]=u*v,e[4]=(h*n-r*l)*v,e[5]=(r*s-a*n)*v,e[6]=p*v,e[7]=(i*l-c*n)*v,e[8]=(o*n-i*s)*v,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Iu.makeScale(e,n)),this}rotate(e){return this.premultiply(Iu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Iu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Tp.prototype.isMatrix3=!0;let $e=Tp;const Iu=new $e,dg=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fg=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nw(){const t={enabled:!0,workingColorSpace:so,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ft&&(r.r=Bi(r.r),r.g=Bi(r.g),r.b=Bi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ft&&(r.r=js(r.r),r.g=js(r.g),r.b=js(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ar?Sc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return tf("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return tf("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[so]:{primaries:e,whitePoint:i,transfer:Sc,toXYZ:dg,fromXYZ:fg,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Wn},outputColorSpaceConfig:{drawingBufferColorSpace:Wn}},[Wn]:{primaries:e,whitePoint:i,transfer:ft,toXYZ:dg,fromXYZ:fg,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Wn}}}),t}const rt=nw();function Bi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function js(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let os;class iw{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{os===void 0&&(os=_a("canvas")),os.width=e.width,os.height=e.height;const r=os.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=os}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=_a("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Bi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Bi(n[i]/255)*255):n[i]=Bi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rw=0;class mp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rw++}),this.uuid=po(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Uu(r[o].image)):s.push(Uu(r[o]))}else s=Uu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Uu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?iw.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let sw=0;const Fu=new B;class en extends Ar{constructor(e=en.DEFAULT_IMAGE,n=en.DEFAULT_MAPPING,i=ki,r=ki,s=Yt,o=zr,a=oi,l=Un,c=en.DEFAULT_ANISOTROPY,h=ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sw++}),this.uuid=po(),this.name="",this.source=new mp(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fu).x}get height(){return this.source.getSize(Fu).y}get depth(){return this.source.getSize(Fu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ve(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ve(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ux)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Md:e.x=e.x-Math.floor(e.x);break;case ki:e.x=e.x<0?0:1;break;case wd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Md:e.y=e.y-Math.floor(e.y);break;case ki:e.y=e.y<0?0:1;break;case wd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=ux;en.DEFAULT_ANISOTROPY=1;const Ap=class Ap{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],_=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(c+1)/2,M=(p+1)/2,b=(f+1)/2,w=(h+u)/4,C=(d+v)/4,y=(_+m)/4;return x>M&&x>b?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=w/i,s=C/i):M>b?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=w/r,s=y/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=C/s,r=y/s),this.set(i,r,s,n),this}let g=Math.sqrt((m-_)*(m-_)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(g)<.001&&(g=1),this.x=(m-_)/g,this.y=(d-v)/g,this.z=(u-h)/g,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=nt(this.x,e.x,n.x),this.y=nt(this.y,e.y,n.y),this.z=nt(this.z,e.z,n.z),this.w=nt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=nt(this.x,e,n),this.y=nt(this.y,e,n),this.z=nt(this.z,e,n),this.w=nt(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ap.prototype.isVector4=!0;let Nt=Ap;class ow extends Ar{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Nt(0,0,e,n),this.scissorTest=!1,this.viewport=new Nt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new en(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new mp(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class An extends ow{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class yx extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Et,this.minFilter=Et,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class aw extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Et,this.minFilter=Et,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ac=class Ac{constructor(e,n,i,r,s,o,a,l,c,h,d,u,p,_,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,h,d,u,p,_,v,m)}set(e,n,i,r,s,o,a,l,c,h,d,u,p,_,v,m){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=_,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ac().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,r=1/as.setFromMatrixColumn(e,0).length(),s=1/as.setFromMatrixColumn(e,1).length(),o=1/as.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=o*h,p=o*d,_=a*h,v=a*d;n[0]=l*h,n[4]=-l*d,n[8]=c,n[1]=p+_*c,n[5]=u-v*c,n[9]=-a*l,n[2]=v-u*c,n[6]=_+p*c,n[10]=o*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,_=c*h,v=c*d;n[0]=u+v*a,n[4]=_*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*h,n[9]=-a,n[2]=p*a-_,n[6]=v+u*a,n[10]=o*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,_=c*h,v=c*d;n[0]=u-v*a,n[4]=-o*d,n[8]=_+p*a,n[1]=p+_*a,n[5]=o*h,n[9]=v-u*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const u=o*h,p=o*d,_=a*h,v=a*d;n[0]=l*h,n[4]=_*c-p,n[8]=u*c+v,n[1]=l*d,n[5]=v*c+u,n[9]=p*c-_,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,_=a*l,v=a*c;n[0]=l*h,n[4]=v-u*d,n[8]=_*d+p,n[1]=d,n[5]=o*h,n[9]=-a*h,n[2]=-c*h,n[6]=p*d+_,n[10]=u-v*d}else if(e.order==="XZY"){const u=o*l,p=o*c,_=a*l,v=a*c;n[0]=l*h,n[4]=-d,n[8]=c*h,n[1]=u*d+v,n[5]=o*h,n[9]=p*d-_,n[2]=_*d-p,n[6]=a*h,n[10]=v*d+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lw,e,cw)}lookAt(e,n,i){const r=this.elements;return Rn.subVectors(e,n),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),Ki.crossVectors(i,Rn),Ki.lengthSq()===0&&(Math.abs(i.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),Ki.crossVectors(i,Rn)),Ki.normalize(),Qa.crossVectors(Rn,Ki),r[0]=Ki.x,r[4]=Qa.x,r[8]=Rn.x,r[1]=Ki.y,r[5]=Qa.y,r[9]=Rn.y,r[2]=Ki.z,r[6]=Qa.z,r[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],p=i[13],_=i[2],v=i[6],m=i[10],f=i[14],g=i[3],x=i[7],M=i[11],b=i[15],w=r[0],C=r[4],y=r[8],A=r[12],F=r[1],N=r[5],D=r[9],W=r[13],q=r[2],R=r[6],U=r[10],P=r[14],L=r[3],V=r[7],j=r[11],H=r[15];return s[0]=o*w+a*F+l*q+c*L,s[4]=o*C+a*N+l*R+c*V,s[8]=o*y+a*D+l*U+c*j,s[12]=o*A+a*W+l*P+c*H,s[1]=h*w+d*F+u*q+p*L,s[5]=h*C+d*N+u*R+p*V,s[9]=h*y+d*D+u*U+p*j,s[13]=h*A+d*W+u*P+p*H,s[2]=_*w+v*F+m*q+f*L,s[6]=_*C+v*N+m*R+f*V,s[10]=_*y+v*D+m*U+f*j,s[14]=_*A+v*W+m*P+f*H,s[3]=g*w+x*F+M*q+b*L,s[7]=g*C+x*N+M*R+b*V,s[11]=g*y+x*D+M*U+b*j,s[15]=g*A+x*W+M*P+b*H,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],_=e[3],v=e[7],m=e[11],f=e[15],g=l*p-c*u,x=a*p-c*d,M=a*u-l*d,b=o*p-c*h,w=o*u-l*h,C=o*d-a*h;return n*(v*g-m*x+f*M)-i*(_*g-m*b+f*w)+r*(_*x-v*b+f*C)-s*(_*M-v*w+m*C)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],_=e[12],v=e[13],m=e[14],f=e[15],g=n*a-i*o,x=n*l-r*o,M=n*c-s*o,b=i*l-r*a,w=i*c-s*a,C=r*c-s*l,y=h*v-d*_,A=h*m-u*_,F=h*f-p*_,N=d*m-u*v,D=d*f-p*v,W=u*f-p*m,q=g*W-x*D+M*N+b*F-w*A+C*y;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/q;return e[0]=(a*W-l*D+c*N)*R,e[1]=(r*D-i*W-s*N)*R,e[2]=(v*C-m*w+f*b)*R,e[3]=(u*w-d*C-p*b)*R,e[4]=(l*F-o*W-c*A)*R,e[5]=(n*W-r*F+s*A)*R,e[6]=(m*M-_*C-f*x)*R,e[7]=(h*C-u*M+p*x)*R,e[8]=(o*D-a*F+c*y)*R,e[9]=(i*F-n*D-s*y)*R,e[10]=(_*w-v*M+f*g)*R,e[11]=(d*M-h*w-p*g)*R,e[12]=(a*A-o*N-l*y)*R,e[13]=(n*N-i*A+r*y)*R,e[14]=(v*x-_*b-m*g)*R,e[15]=(h*b-d*x+u*g)*R,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,h=o+o,d=a+a,u=s*c,p=s*h,_=s*d,v=o*h,m=o*d,f=a*d,g=l*c,x=l*h,M=l*d,b=i.x,w=i.y,C=i.z;return r[0]=(1-(v+f))*b,r[1]=(p+M)*b,r[2]=(_-x)*b,r[3]=0,r[4]=(p-M)*w,r[5]=(1-(u+f))*w,r[6]=(m+g)*w,r[7]=0,r[8]=(_+x)*C,r[9]=(m-g)*C,r[10]=(1-(u+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let o=as.set(r[0],r[1],r[2]).length();const a=as.set(r[4],r[5],r[6]).length(),l=as.set(r[8],r[9],r[10]).length();s<0&&(o=-o),ei.copy(this);const c=1/o,h=1/a,d=1/l;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=d,ei.elements[9]*=d,ei.elements[10]*=d,n.setFromRotationMatrix(ei),i.x=o,i.y=a,i.z=l,this}makePerspective(e,n,i,r,s,o,a=yi,l=!1){const c=this.elements,h=2*s/(n-e),d=2*s/(i-r),u=(n+e)/(n-e),p=(i+r)/(i-r);let _,v;if(l)_=s/(o-s),v=o*s/(o-s);else if(a===yi)_=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===ga)_=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=yi,l=!1){const c=this.elements,h=2/(n-e),d=2/(i-r),u=-(n+e)/(n-e),p=-(i+r)/(i-r);let _,v;if(l)_=1/(o-s),v=o/(o-s);else if(a===yi)_=-2/(o-s),v=-(o+s)/(o-s);else if(a===ga)_=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};Ac.prototype.isMatrix4=!0;let He=Ac;const as=new B,ei=new He,lw=new B(0,0,0),cw=new B(1,1,1),Ki=new B,Qa=new B,Rn=new B,pg=new He,mg=new Mr;class wr{constructor(e=0,n=0,i=0,r=wr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return pg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pg,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return mg.setFromEuler(this),this.setFromQuaternion(mg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wr.DEFAULT_ORDER="XYZ";class gp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uw=0;const gg=new B,ls=new Mr,Ai=new He,Ja=new B,Ao=new B,hw=new B,dw=new Mr,_g=new B(1,0,0),vg=new B(0,1,0),xg=new B(0,0,1),yg={type:"added"},fw={type:"removed"},cs={type:"childadded",child:null},ku={type:"childremoved",child:null};class Zt extends Ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uw++}),this.uuid=po(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zt.DEFAULT_UP.clone();const e=new B,n=new wr,i=new Mr,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new He},normalMatrix:{value:new $e}}),this.matrix=new He,this.matrixWorld=new He,this.matrixAutoUpdate=Zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ls.setFromAxisAngle(e,n),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,n){return ls.setFromAxisAngle(e,n),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(_g,e)}rotateY(e){return this.rotateOnAxis(vg,e)}rotateZ(e){return this.rotateOnAxis(xg,e)}translateOnAxis(e,n){return gg.copy(e).applyQuaternion(this.quaternion),this.position.add(gg.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(_g,e)}translateY(e){return this.translateOnAxis(vg,e)}translateZ(e){return this.translateOnAxis(xg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ja.copy(e):Ja.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ao.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(Ao,Ja,this.up):Ai.lookAt(Ja,Ao,this.up),this.quaternion.setFromRotationMatrix(Ai),r&&(Ai.extractRotation(r.matrixWorld),ls.setFromRotationMatrix(Ai),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yg),cs.child=e,this.dispatchEvent(cs),cs.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(fw),ku.child=e,this.dispatchEvent(ku),ku.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yg),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,e,hw),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,dw,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Zt.DEFAULT_UP=new B(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Hr extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pw={type:"move"};class Ou{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=n.getJointPose(v,i),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&u>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(pw)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Hr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Sx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},el={h:0,s:0,l:0};function Bu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=rt.workingColorSpace){return this.r=e,this.g=n,this.b=i,rt.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=rt.workingColorSpace){if(e=pp(e,1),n=nt(n,0,1),i=nt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Bu(o,s,e+1/3),this.g=Bu(o,s,e),this.b=Bu(o,s,e-1/3)}return rt.colorSpaceToWorking(this,r),this}setStyle(e,n=Wn){function i(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Wn){const i=Sx[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wn){return rt.workingToColorSpace(an.copy(this),e),Math.round(nt(an.r*255,0,255))*65536+Math.round(nt(an.g*255,0,255))*256+Math.round(nt(an.b*255,0,255))}getHexString(e=Wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=rt.workingColorSpace){rt.workingToColorSpace(an.copy(this),n);const i=an.r,r=an.g,s=an.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=rt.workingColorSpace){return rt.workingToColorSpace(an.copy(this),n),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Wn){rt.workingToColorSpace(an.copy(this),e);const n=an.r,i=an.g,r=an.b;return e!==Wn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+n,Zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Zi),e.getHSL(el);const i=Yo(Zi.h,el.h,n),r=Yo(Zi.s,el.s,n),s=Yo(Zi.l,el.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new Qe;Qe.NAMES=Sx;class mw extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wr,this.environmentIntensity=1,this.environmentRotation=new wr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ti=new B,Ci=new B,zu=new B,Ri=new B,us=new B,hs=new B,Sg=new B,Vu=new B,Hu=new B,Gu=new B,Wu=new Nt,ju=new Nt,Xu=new Nt;class qn{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ti.subVectors(e,n),r.cross(ti);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ti.subVectors(r,n),Ci.subVectors(i,n),zu.subVectors(e,n);const o=ti.dot(ti),a=ti.dot(Ci),l=ti.dot(zu),c=Ci.dot(Ci),h=Ci.dot(zu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,_=(o*h-a*l)*u;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ri.x),l.addScaledVector(o,Ri.y),l.addScaledVector(a,Ri.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return Wu.setScalar(0),ju.setScalar(0),Xu.setScalar(0),Wu.fromBufferAttribute(e,n),ju.fromBufferAttribute(e,i),Xu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Wu,s.x),o.addScaledVector(ju,s.y),o.addScaledVector(Xu,s.z),o}static isFrontFacing(e,n,i,r){return ti.subVectors(i,n),Ci.subVectors(e,n),ti.cross(Ci).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),ti.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return qn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return qn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;us.subVectors(r,i),hs.subVectors(s,i),Vu.subVectors(e,i);const l=us.dot(Vu),c=hs.dot(Vu);if(l<=0&&c<=0)return n.copy(i);Hu.subVectors(e,r);const h=us.dot(Hu),d=hs.dot(Hu);if(h>=0&&d<=h)return n.copy(r);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),n.copy(i).addScaledVector(us,o);Gu.subVectors(e,s);const p=us.dot(Gu),_=hs.dot(Gu);if(_>=0&&p<=_)return n.copy(s);const v=p*c-l*_;if(v<=0&&c>=0&&_<=0)return a=c/(c-_),n.copy(i).addScaledVector(hs,a);const m=h*_-p*d;if(m<=0&&d-h>=0&&p-_>=0)return Sg.subVectors(s,r),a=(d-h)/(d-h+(p-_)),n.copy(r).addScaledVector(Sg,a);const f=1/(m+v+u);return o=v*f,a=u*f,n.copy(i).addScaledVector(us,o).addScaledVector(hs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ca{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ni.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ni.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ni.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ni):ni.fromBufferAttribute(s,o),ni.applyMatrix4(e.matrixWorld),this.expandByPoint(ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),tl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),tl.copy(i.boundingBox)),tl.applyMatrix4(e.matrixWorld),this.union(tl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ni),ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Co),nl.subVectors(this.max,Co),ds.subVectors(e.a,Co),fs.subVectors(e.b,Co),ps.subVectors(e.c,Co),Qi.subVectors(fs,ds),Ji.subVectors(ps,fs),Rr.subVectors(ds,ps);let n=[0,-Qi.z,Qi.y,0,-Ji.z,Ji.y,0,-Rr.z,Rr.y,Qi.z,0,-Qi.x,Ji.z,0,-Ji.x,Rr.z,0,-Rr.x,-Qi.y,Qi.x,0,-Ji.y,Ji.x,0,-Rr.y,Rr.x,0];return!qu(n,ds,fs,ps,nl)||(n=[1,0,0,0,1,0,0,0,1],!qu(n,ds,fs,ps,nl))?!1:(il.crossVectors(Qi,Ji),n=[il.x,il.y,il.z],qu(n,ds,fs,ps,nl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pi=[new B,new B,new B,new B,new B,new B,new B,new B],ni=new B,tl=new Ca,ds=new B,fs=new B,ps=new B,Qi=new B,Ji=new B,Rr=new B,Co=new B,nl=new B,il=new B,Pr=new B;function qu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Pr.fromArray(t,s);const a=r.x*Math.abs(Pr.x)+r.y*Math.abs(Pr.y)+r.z*Math.abs(Pr.z),l=e.dot(Pr),c=n.dot(Pr),h=i.dot(Pr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Ot=new B,rl=new Oe;let gw=0;class ci extends Ar{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gw++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=og,this.updateRanges=[],this.gpuType=xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)rl.fromBufferAttribute(this,n),rl.applyMatrix3(e),this.setXY(n,rl.x,rl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix3(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix4(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyNormalMatrix(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.transformDirection(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Ss(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Ss(n,this.array)),n}setX(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Ss(n,this.array)),n}setY(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Ss(n,this.array)),n}setZ(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Ss(n,this.array)),n}setW(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==og&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Mx extends ci{constructor(e,n,i){super(new Uint8Array(e),n,i)}}class jc extends ci{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Xc extends ci{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class yt extends ci{constructor(e,n,i){super(new Float32Array(e),n,i)}}const _w=new Ca,Ro=new B,$u=new B;class qc{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):_w.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ro.subVectors(e,this.center);const n=Ro.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ro,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($u.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ro.copy(e.center).add($u)),this.expandByPoint(Ro.copy(e.center).sub($u))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let vw=0;const Gn=new He,Yu=new Zt,ms=new B,Pn=new Ca,Po=new Ca,jt=new B;class $t extends Ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vw++}),this.uuid=po(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(FM(e)?Xc:jc)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new $e().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,n,i){return Gn.makeTranslation(e,n,i),this.applyMatrix4(Gn),this}scale(e,n,i){return Gn.makeScale(e,n,i),this.applyMatrix4(Gn),this}lookAt(e){return Yu.lookAt(e),Yu.updateMatrix(),this.applyMatrix4(Yu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new yt(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ca);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Pn.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Pn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Po.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(Pn.min,Po.min),Pn.expandByPoint(jt),jt.addVectors(Pn.max,Po.max),Pn.expandByPoint(jt)):(Pn.expandByPoint(Po.min),Pn.expandByPoint(Po.max))}Pn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)jt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(jt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)jt.fromBufferAttribute(a,c),l&&(ms.fromBufferAttribute(e,c),jt.add(ms)),r=Math.max(r,i.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ci(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let y=0;y<i.count;y++)a[y]=new B,l[y]=new B;const c=new B,h=new B,d=new B,u=new Oe,p=new Oe,_=new Oe,v=new B,m=new B;function f(y,A,F){c.fromBufferAttribute(i,y),h.fromBufferAttribute(i,A),d.fromBufferAttribute(i,F),u.fromBufferAttribute(s,y),p.fromBufferAttribute(s,A),_.fromBufferAttribute(s,F),h.sub(c),d.sub(c),p.sub(u),_.sub(u);const N=1/(p.x*_.y-_.x*p.y);isFinite(N)&&(v.copy(h).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(N),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(N),a[y].add(v),a[A].add(v),a[F].add(v),l[y].add(m),l[A].add(m),l[F].add(m))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let y=0,A=g.length;y<A;++y){const F=g[y],N=F.start,D=F.count;for(let W=N,q=N+D;W<q;W+=3)f(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const x=new B,M=new B,b=new B,w=new B;function C(y){b.fromBufferAttribute(r,y),w.copy(b);const A=a[y];x.copy(A),x.sub(b.multiplyScalar(b.dot(A))).normalize(),M.crossVectors(w,A);const N=M.dot(l[y])<0?-1:1;o.setXYZW(y,x.x,x.y,x.z,N)}for(let y=0,A=g.length;y<A;++y){const F=g[y],N=F.start,D=F.count;for(let W=N,q=N+D;W<q;W+=3)C(e.getX(W+0)),C(e.getX(W+1)),C(e.getX(W+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ci(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const r=new B,s=new B,o=new B,a=new B,l=new B,c=new B,h=new B,d=new B;if(e)for(let u=0,p=e.count;u<p;u+=3){const _=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,v),o.fromBufferAttribute(n,m),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)r.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),o.fromBufferAttribute(n,u+2),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)jt.fromBufferAttribute(e,n),jt.normalize(),e.setXYZ(n,jt.x,jt.y,jt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,_=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*h;for(let f=0;f<h;f++)u[_++]=c[p++]}return new ci(u,h,d)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new $t,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let xw=0;class mo extends Ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xw++}),this.uuid=po(),this.name="",this.type="Material",this.blending=Gs,this.side=Sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fd,this.blendDst=pd,this.blendEquation=Ur,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=io,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ve(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ve(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(i.blending=this.blending),this.side!==Sr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==fd&&(i.blendSrc=this.blendSrc),this.blendDst!==pd&&(i.blendDst=this.blendDst),this.blendEquation!==Ur&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==io&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Li=new B,Ku=new B,sl=new B,er=new B,Zu=new B,ol=new B,Qu=new B;class $c{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Li.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,n),Li.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Ku.copy(e).add(n).multiplyScalar(.5),sl.copy(n).sub(e).normalize(),er.copy(this.origin).sub(Ku);const s=e.distanceTo(n)*.5,o=-this.direction.dot(sl),a=er.dot(this.direction),l=-er.dot(sl),c=er.lengthSq(),h=Math.abs(1-o*o);let d,u,p,_;if(h>0)if(d=o*l-a,u=o*a-l,_=s*h,d>=0)if(u>=-_)if(u<=_){const v=1/h;d*=v,u*=v,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-_?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c):u<=_?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ku).addScaledVector(sl,u),p}intersectSphere(e,n){Li.subVectors(e.center,this.origin);const i=Li.dot(this.direction),r=Li.dot(Li)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,n,i,r,s){Zu.subVectors(n,e),ol.subVectors(i,e),Qu.crossVectors(Zu,ol);let o=this.direction.dot(Qu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;er.subVectors(this.origin,e);const l=a*this.direction.dot(ol.crossVectors(er,ol));if(l<0)return null;const c=a*this.direction.dot(Zu.cross(er));if(c<0||l+c>o)return null;const h=-a*er.dot(Qu);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ln extends mo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wr,this.combine=sp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mg=new He,Lr=new $c,al=new qc,wg=new B,ll=new B,cl=new B,ul=new B,Ju=new B,hl=new B,Eg=new B,dl=new B;class cn extends Zt{constructor(e=new $t,n=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){hl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(Ju.fromBufferAttribute(d,e),o?hl.addScaledVector(Ju,h):hl.addScaledVector(Ju.sub(n),h))}n.add(hl)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),al.copy(i.boundingSphere),al.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!(al.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(al,wg)===null||Lr.origin.distanceToSquared(wg)>(e.far-e.near)**2))&&(Mg.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(Mg),!(i.boundingBox!==null&&Lr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Lr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,v=u.length;_<v;_++){const m=u[_],f=o[m.materialIndex],g=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=g,b=x;M<b;M+=3){const w=a.getX(M),C=a.getX(M+1),y=a.getX(M+2);r=fl(this,f,e,i,c,h,d,w,C,y),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=_,f=v;m<f;m+=3){const g=a.getX(m),x=a.getX(m+1),M=a.getX(m+2);r=fl(this,o,e,i,c,h,d,g,x,M),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,v=u.length;_<v;_++){const m=u[_],f=o[m.materialIndex],g=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=g,b=x;M<b;M+=3){const w=M,C=M+1,y=M+2;r=fl(this,f,e,i,c,h,d,w,C,y),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=_,f=v;m<f;m+=3){const g=m,x=m+1,M=m+2;r=fl(this,o,e,i,c,h,d,g,x,M),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function yw(t,e,n,i,r,s,o,a){let l;if(e.side===Tn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Sr,a),l===null)return null;dl.copy(a),dl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(dl);return c<n.near||c>n.far?null:{distance:c,point:dl.clone(),object:t}}function fl(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,ll),t.getVertexPosition(l,cl),t.getVertexPosition(c,ul);const h=yw(t,e,n,i,ll,cl,ul,Eg);if(h){const d=new B;qn.getBarycoord(Eg,ll,cl,ul,d),r&&(h.uv=qn.getInterpolatedAttribute(r,a,l,c,d,new Oe)),s&&(h.uv1=qn.getInterpolatedAttribute(s,a,l,c,d,new Oe)),o&&(h.normal=qn.getInterpolatedAttribute(o,a,l,c,d,new B),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new B,materialIndex:0};qn.getNormal(ll,cl,ul,u.normal),h.face=u,h.barycoord=d}return h}class Sw extends en{constructor(e=null,n=1,i=1,r,s,o,a,l,c=Et,h=Et,d,u){super(null,o,a,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const eh=new B,Mw=new B,ww=new $e;class Sn{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=eh.subVectors(i,n).cross(Mw.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(eh),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||ww.getNormalMatrix(e),r=this.coplanarPoint(eh).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dr=new qc,Ew=new Oe(.5,.5),pl=new B;class _p{constructor(e=new Sn,n=new Sn,i=new Sn,r=new Sn,s=new Sn,o=new Sn){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=yi,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],p=s[7],_=s[8],v=s[9],m=s[10],f=s[11],g=s[12],x=s[13],M=s[14],b=s[15];if(r[0].setComponents(c-o,p-h,f-_,b-g).normalize(),r[1].setComponents(c+o,p+h,f+_,b+g).normalize(),r[2].setComponents(c+a,p+d,f+v,b+x).normalize(),r[3].setComponents(c-a,p-d,f-v,b-x).normalize(),i)r[4].setComponents(l,u,m,M).normalize(),r[5].setComponents(c-l,p-u,f-m,b-M).normalize();else if(r[4].setComponents(c-l,p-u,f-m,b-M).normalize(),n===yi)r[5].setComponents(c+l,p+u,f+m,b+M).normalize();else if(n===ga)r[5].setComponents(l,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dr)}intersectsSprite(e){Dr.center.set(0,0,0);const n=Ew.distanceTo(e.center);return Dr.radius=.7071067811865476+n,Dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(pl.x=r.normal.x>0?e.max.x:e.min.x,pl.y=r.normal.y>0?e.max.y:e.min.y,pl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(pl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class wx extends mo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mc=new B,wc=new B,bg=new He,Lo=new $c,ml=new qc,th=new B,Tg=new B;class bw extends Zt{constructor(e=new $t,n=new wx){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Mc.fromBufferAttribute(n,r-1),wc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Mc.distanceTo(wc);e.setAttribute("lineDistance",new yt(i,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ml.copy(i.boundingSphere),ml.applyMatrix4(r),ml.radius+=s,e.ray.intersectsSphere(ml)===!1)return;bg.copy(r).invert(),Lo.copy(e.ray).applyMatrix4(bg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const p=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let v=p,m=_-1;v<m;v+=c){const f=h.getX(v),g=h.getX(v+1),x=gl(this,e,Lo,l,f,g,v);x&&n.push(x)}if(this.isLineLoop){const v=h.getX(_-1),m=h.getX(p),f=gl(this,e,Lo,l,v,m,_-1);f&&n.push(f)}}else{const p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let v=p,m=_-1;v<m;v+=c){const f=gl(this,e,Lo,l,v,v+1,v);f&&n.push(f)}if(this.isLineLoop){const v=gl(this,e,Lo,l,_-1,p,_-1);v&&n.push(v)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function gl(t,e,n,i,r,s,o){const a=t.geometry.attributes.position;if(Mc.fromBufferAttribute(a,r),wc.fromBufferAttribute(a,s),n.distanceSqToSegment(Mc,wc,th,Tg)>i)return;th.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(th);if(!(c<e.near||c>e.far))return{distance:c,point:Tg.clone().applyMatrix4(t.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:t}}const Ag=new B,Cg=new B;class Rg extends bw{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Ag.fromBufferAttribute(n,r),Cg.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Ag.distanceTo(Cg);e.setAttribute("lineDistance",new yt(i,1))}else Ve("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ex extends en{constructor(e=[],n=Zr,i,r,s,o,a,l,c,h){super(e,n,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nh extends en{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class oo extends en{constructor(e,n,i=bi,r,s,o,a=Et,l=Et,c,h=Wi,d=1){if(h!==Wi&&h!==Vr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:d};super(u,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Tw extends oo{constructor(e,n=bi,i=Zr,r,s,o=Et,a=Et,l,c=Wi){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,n,i,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class bx extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Jr extends $t{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(d,2));function _(v,m,f,g,x,M,b,w,C,y,A){const F=M/C,N=b/y,D=M/2,W=b/2,q=w/2,R=C+1,U=y+1;let P=0,L=0;const V=new B;for(let j=0;j<U;j++){const H=j*N-W;for(let I=0;I<R;I++){const ne=I*F-D;V[v]=ne*g,V[m]=H*x,V[f]=q,c.push(V.x,V.y,V.z),V[v]=0,V[m]=0,V[f]=w>0?1:-1,h.push(V.x,V.y,V.z),d.push(I/C),d.push(1-j/y),P+=1}}for(let j=0;j<y;j++)for(let H=0;H<C;H++){const I=u+H+R*j,ne=u+H+R*(j+1),te=u+(H+1)+R*(j+1),J=u+(H+1)+R*j;l.push(I,ne,J),l.push(ne,te,J),L+=6}a.addGroup(p,L,A),p+=L,u+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const _l=new B,vl=new B,ih=new B,xl=new qn;class Pg extends $t{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(Ws*n),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},p=[];for(let _=0;_<l;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:v,b:m,c:f}=xl;if(v.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),xl.getNormal(ih),d[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,d[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,d[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let g=0;g<3;g++){const x=(g+1)%3,M=d[g],b=d[x],w=xl[h[g]],C=xl[h[x]],y=`${M}_${b}`,A=`${b}_${M}`;A in u&&u[A]?(ih.dot(u[A].normal)<=s&&(p.push(w.x,w.y,w.z),p.push(C.x,C.y,C.z)),u[A]=null):y in u||(u[y]={index0:c[g],index1:c[x],normal:ih.clone()})}}for(const _ in u)if(u[_]){const{index0:v,index1:m}=u[_];_l.fromBufferAttribute(a,v),vl.fromBufferAttribute(a,m),p.push(_l.x,_l.y,_l.z),p.push(vl.x,vl.y,vl.z)}this.setAttribute("position",new yt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Ra extends $t{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,d=e/a,u=n/l,p=[],_=[],v=[],m=[];for(let f=0;f<h;f++){const g=f*u-o;for(let x=0;x<c;x++){const M=x*d-s;_.push(M,-g,0),v.push(0,0,1),m.push(x/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let g=0;g<a;g++){const x=g+c*f,M=g+c*(f+1),b=g+1+c*(f+1),w=g+1+c*f;p.push(x,M,w),p.push(M,b,w)}this.setIndex(p),this.setAttribute("position",new yt(_,3)),this.setAttribute("normal",new yt(v,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ra(e.width,e.height,e.widthSegments,e.heightSegments)}}function ao(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Lg(r))r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Lg(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function fn(t){const e={};for(let n=0;n<t.length;n++){const i=ao(t[n]);for(const r in i)e[r]=i[r]}return e}function Lg(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function Aw(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Tx(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const Ec={clone:ao,merge:fn};var Cw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class un extends mo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cw,this.fragmentShader=Rw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ao(e.uniforms),this.uniformsGroups=Aw(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Pw extends un{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rh extends mo{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ef,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wr,this.combine=sp,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Lw extends mo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=CM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Dw extends mo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const sh={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(Dg(t)||(this.files[t]=e))},get:function(t){if(this.enabled!==!1&&!Dg(t))return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};function Dg(t){try{const e=t.slice(t.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Nw{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const p=c[d],_=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Iw=new Nw;class vp{constructor(e){this.manager=e!==void 0?e:Iw,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}vp.DEFAULT_MATERIAL_NAME="__DEFAULT";const gs=new WeakMap;class Uw extends vp{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=sh.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0);else{let d=gs.get(o);d===void 0&&(d=[],gs.set(o,d)),d.push({onLoad:n,onError:r})}return o}const a=_a("img");function l(){h(),n&&n(this);const d=gs.get(this)||[];for(let u=0;u<d.length;u++){const p=d[u];p.onLoad&&p.onLoad(this)}gs.delete(this),s.manager.itemEnd(e)}function c(d){h(),r&&r(d),sh.remove(`image:${e}`);const u=gs.get(this)||[];for(let p=0;p<u.length;p++){const _=u[p];_.onError&&_.onError(d)}gs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),sh.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class nf extends vp{constructor(e){super(e)}load(e,n,i,r){const s=new en,o=new Uw(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class Yc extends Zt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class Fw extends Yc{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}toJSON(e){const n=super.toJSON(e);return n.object.groundColor=this.groundColor.getHex(),n}}const oh=new He,Ng=new B,Ig=new B;class Ax{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=Un,this.map=null,this.mapPass=null,this.matrix=new He,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _p,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Ng.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ng),Ig.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Ig),n.updateMatrixWorld(),oh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oh,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===ga||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(oh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const yl=new B,Sl=new Mr,pi=new B;class Cx extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new He,this.projectionMatrix=new He,this.projectionMatrixInverse=new He,this.coordinateSystem=yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(yl,Sl,pi),pi.x===1&&pi.y===1&&pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yl,Sl,pi.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(yl,Sl,pi),pi.x===1&&pi.y===1&&pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yl,Sl,pi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const tr=new B,Ug=new Oe,Fg=new Oe;class Nn extends Cx{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=va*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return va*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){tr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(tr.x,tr.y).multiplyScalar(-e/tr.z),tr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(tr.x,tr.y).multiplyScalar(-e/tr.z)}getViewSize(e,n){return this.getViewBounds(e,Ug,Fg),n.subVectors(Fg,Ug)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Ws*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class kw extends Ax{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0}}class Ow extends Yc{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new kw}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class lo extends Cx{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class Bw extends Ax{constructor(){super(new lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kg extends Yc{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.target=new Zt,this.shadow=new Bw}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class zw extends Yc{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const _s=-90,vs=1;class Vw extends Zt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nn(_s,vs,e,n);r.layers=this.layers,this.add(r);const s=new Nn(_s,vs,e,n);s.layers=this.layers,this.add(s);const o=new Nn(_s,vs,e,n);o.layers=this.layers,this.add(o);const a=new Nn(_s,vs,e,n);a.layers=this.layers,this.add(a);const l=new Nn(_s,vs,e,n);l.layers=this.layers,this.add(l);const c=new Nn(_s,vs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===yi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ga)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(d,u,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Hw extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Gw{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Ww.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Ww(){this._document.hidden===!1&&this.reset()}const Og=new He;class jw{constructor(e,n,i=0,r=1/0){this.ray=new $c(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new gp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):at("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return Og.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Og),this}intersectObject(e,n=!0,i=[]){return rf(e,this,i,n),i.sort(Bg),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)rf(e[r],this,i,n);return i.sort(Bg),i}}function Bg(t,e){return t.distance-e.distance}function rf(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)rf(s[o],e,n,!0)}}class zg{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(nt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Cp=class Cp{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Cp.prototype.isMatrix2=!0;let Vg=Cp;class Xw extends Ar{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ve("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Hg(t,e,n,i){const r=qw(i);switch(n){case mx:return t*e;case _x:return t*e/r.components*r.byteLength;case cp:return t*e/r.components*r.byteLength;case Qr:return t*e*2/r.components*r.byteLength;case up:return t*e*2/r.components*r.byteLength;case gx:return t*e*3/r.components*r.byteLength;case oi:return t*e*4/r.components*r.byteLength;case hp:return t*e*4/r.components*r.byteLength;case Hl:case Gl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Wl:case jl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case bd:case Ad:return Math.max(t,16)*Math.max(e,8)/4;case Ed:case Td:return Math.max(t,8)*Math.max(e,8)/2;case Cd:case Rd:case Ld:case Dd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Pd:case xc:case Nd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Id:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ud:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Fd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case kd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Od:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case zd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Vd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Hd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Gd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Wd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case jd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Xd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case qd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case $d:case Yd:case Kd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Zd:case Qd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case yc:case Jd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function qw(t){switch(t){case Un:case hx:return{byteLength:1,components:1};case pa:case dx:case On:return{byteLength:2,components:1};case ap:case lp:return{byteLength:2,components:4};case bi:case op:case xi:return{byteLength:4,components:1};case fx:case px:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rp}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Rx(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function $w(t){const e=new WeakMap;function n(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const h=l.array,d=l.updateRanges;if(t.bindBuffer(c,a),d.length===0)t.bufferSubData(c,0,h);else{d.sort((p,_)=>p.start-_.start);let u=0;for(let p=1;p<d.length;p++){const _=d[u],v=d[p];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++u,d[u]=v)}d.length=u+1;for(let p=0,_=d.length;p<_;p++){const v=d[p];t.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Yw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kw=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Zw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jw=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,eE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,rE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,oE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,aE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_E=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,vE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,SE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ME=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,EE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bE="gl_FragColor = linearToOutputTexel( gl_FragColor );",TE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,AE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,CE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,RE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,PE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,LE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,DE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,NE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,IE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,UE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,FE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,kE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,OE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,BE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,VE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,HE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,GE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,WE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,XE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$E=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,YE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,KE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ZE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,QE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,JE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ib=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ob=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ab=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ub=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,db=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_b=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Eb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,bb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ab=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Db=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Nb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ib=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ub=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ob=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$b=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,nT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,iT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,rT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,sT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,oT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,uT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_T=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,yT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ST=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ET=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,AT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:Yw,alphahash_pars_fragment:Kw,alphamap_fragment:Zw,alphamap_pars_fragment:Qw,alphatest_fragment:Jw,alphatest_pars_fragment:eE,aomap_fragment:tE,aomap_pars_fragment:nE,batching_pars_vertex:iE,batching_vertex:rE,begin_vertex:sE,beginnormal_vertex:oE,bsdfs:aE,iridescence_fragment:lE,bumpmap_pars_fragment:cE,clipping_planes_fragment:uE,clipping_planes_pars_fragment:hE,clipping_planes_pars_vertex:dE,clipping_planes_vertex:fE,color_fragment:pE,color_pars_fragment:mE,color_pars_vertex:gE,color_vertex:_E,common:vE,cube_uv_reflection_fragment:xE,defaultnormal_vertex:yE,displacementmap_pars_vertex:SE,displacementmap_vertex:ME,emissivemap_fragment:wE,emissivemap_pars_fragment:EE,colorspace_fragment:bE,colorspace_pars_fragment:TE,envmap_fragment:AE,envmap_common_pars_fragment:CE,envmap_pars_fragment:RE,envmap_pars_vertex:PE,envmap_physical_pars_fragment:VE,envmap_vertex:LE,fog_vertex:DE,fog_pars_vertex:NE,fog_fragment:IE,fog_pars_fragment:UE,gradientmap_pars_fragment:FE,lightmap_pars_fragment:kE,lights_lambert_fragment:OE,lights_lambert_pars_fragment:BE,lights_pars_begin:zE,lights_toon_fragment:HE,lights_toon_pars_fragment:GE,lights_phong_fragment:WE,lights_phong_pars_fragment:jE,lights_physical_fragment:XE,lights_physical_pars_fragment:qE,lights_fragment_begin:$E,lights_fragment_maps:YE,lights_fragment_end:KE,lightprobes_pars_fragment:ZE,logdepthbuf_fragment:QE,logdepthbuf_pars_fragment:JE,logdepthbuf_pars_vertex:eb,logdepthbuf_vertex:tb,map_fragment:nb,map_pars_fragment:ib,map_particle_fragment:rb,map_particle_pars_fragment:sb,metalnessmap_fragment:ob,metalnessmap_pars_fragment:ab,morphinstance_vertex:lb,morphcolor_vertex:cb,morphnormal_vertex:ub,morphtarget_pars_vertex:hb,morphtarget_vertex:db,normal_fragment_begin:fb,normal_fragment_maps:pb,normal_pars_fragment:mb,normal_pars_vertex:gb,normal_vertex:_b,normalmap_pars_fragment:vb,clearcoat_normal_fragment_begin:xb,clearcoat_normal_fragment_maps:yb,clearcoat_pars_fragment:Sb,iridescence_pars_fragment:Mb,opaque_fragment:wb,packing:Eb,premultiplied_alpha_fragment:bb,project_vertex:Tb,dithering_fragment:Ab,dithering_pars_fragment:Cb,roughnessmap_fragment:Rb,roughnessmap_pars_fragment:Pb,shadowmap_pars_fragment:Lb,shadowmap_pars_vertex:Db,shadowmap_vertex:Nb,shadowmask_pars_fragment:Ib,skinbase_vertex:Ub,skinning_pars_vertex:Fb,skinning_vertex:kb,skinnormal_vertex:Ob,specularmap_fragment:Bb,specularmap_pars_fragment:zb,tonemapping_fragment:Vb,tonemapping_pars_fragment:Hb,transmission_fragment:Gb,transmission_pars_fragment:Wb,uv_pars_fragment:jb,uv_pars_vertex:Xb,uv_vertex:qb,worldpos_vertex:$b,background_vert:Yb,background_frag:Kb,backgroundCube_vert:Zb,backgroundCube_frag:Qb,cube_vert:Jb,cube_frag:eT,depth_vert:tT,depth_frag:nT,distance_vert:iT,distance_frag:rT,equirect_vert:sT,equirect_frag:oT,linedashed_vert:aT,linedashed_frag:lT,meshbasic_vert:cT,meshbasic_frag:uT,meshlambert_vert:hT,meshlambert_frag:dT,meshmatcap_vert:fT,meshmatcap_frag:pT,meshnormal_vert:mT,meshnormal_frag:gT,meshphong_vert:_T,meshphong_frag:vT,meshphysical_vert:xT,meshphysical_frag:yT,meshtoon_vert:ST,meshtoon_frag:MT,points_vert:wT,points_frag:ET,shadow_vert:bT,shadow_frag:TT,sprite_vert:AT,sprite_frag:CT},we={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},_i={basic:{uniforms:fn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:fn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:fn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:fn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:fn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Qe(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:fn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:fn([we.points,we.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:fn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:fn([we.common,we.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:fn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:fn([we.sprite,we.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:fn([we.common,we.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:fn([we.lights,we.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};_i.physical={uniforms:fn([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Ml={r:0,b:0,g:0},RT=new He,Px=new $e;Px.set(-1,0,0,0,1,0,0,0,1);function PT(t,e,n,i,r,s){const o=new Qe(0);let a=r===!0?0:1,l,c,h=null,d=0,u=null;function p(g){let x=g.isScene===!0?g.background:null;if(x&&x.isTexture){const M=g.backgroundBlurriness>0;x=e.get(x,M)}return x}function _(g){let x=!1;const M=p(g);M===null?m(o,a):M&&M.isColor&&(m(M,1),x=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function v(g,x){const M=p(x);M&&(M.isCubeTexture||M.mapping===Wc)?(c===void 0&&(c=new cn(new Jr(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:ao(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(RT.makeRotationFromEuler(x.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Px),c.material.toneMapped=rt.getTransfer(M.colorSpace)!==ft,(h!==M||d!==M.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=t.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new cn(new Ra(2,2),new un({name:"BackgroundMaterial",uniforms:ao(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:Sr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=rt.getTransfer(M.colorSpace)!==ft,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=t.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}function m(g,x){g.getRGB(Ml,Tx(t)),n.buffers.color.setClear(Ml.r,Ml.g,Ml.b,x,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(g,x=1){o.set(g),a=x,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(g){a=g,m(o,a)},render:_,addToRenderList:v,dispose:f}}function LT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,o=!1;function a(N,D,W,q,R){let U=!1;const P=d(N,q,W,D);s!==P&&(s=P,c(s.object)),U=p(N,q,W,R),U&&_(N,q,W,R),R!==null&&e.update(R,t.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,M(N,D,W,q),R!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(R).buffer))}function l(){return t.createVertexArray()}function c(N){return t.bindVertexArray(N)}function h(N){return t.deleteVertexArray(N)}function d(N,D,W,q){const R=q.wireframe===!0;let U=i[D.id];U===void 0&&(U={},i[D.id]=U);const P=N.isInstancedMesh===!0?N.id:0;let L=U[P];L===void 0&&(L={},U[P]=L);let V=L[W.id];V===void 0&&(V={},L[W.id]=V);let j=V[R];return j===void 0&&(j=u(l()),V[R]=j),j}function u(N){const D=[],W=[],q=[];for(let R=0;R<n;R++)D[R]=0,W[R]=0,q[R]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:W,attributeDivisors:q,object:N,attributes:{},index:null}}function p(N,D,W,q){const R=s.attributes,U=D.attributes;let P=0;const L=W.getAttributes();for(const V in L)if(L[V].location>=0){const H=R[V];let I=U[V];if(I===void 0&&(V==="instanceMatrix"&&N.instanceMatrix&&(I=N.instanceMatrix),V==="instanceColor"&&N.instanceColor&&(I=N.instanceColor)),H===void 0||H.attribute!==I||I&&H.data!==I.data)return!0;P++}return s.attributesNum!==P||s.index!==q}function _(N,D,W,q){const R={},U=D.attributes;let P=0;const L=W.getAttributes();for(const V in L)if(L[V].location>=0){let H=U[V];H===void 0&&(V==="instanceMatrix"&&N.instanceMatrix&&(H=N.instanceMatrix),V==="instanceColor"&&N.instanceColor&&(H=N.instanceColor));const I={};I.attribute=H,H&&H.data&&(I.data=H.data),R[V]=I,P++}s.attributes=R,s.attributesNum=P,s.index=q}function v(){const N=s.newAttributes;for(let D=0,W=N.length;D<W;D++)N[D]=0}function m(N){f(N,0)}function f(N,D){const W=s.newAttributes,q=s.enabledAttributes,R=s.attributeDivisors;W[N]=1,q[N]===0&&(t.enableVertexAttribArray(N),q[N]=1),R[N]!==D&&(t.vertexAttribDivisor(N,D),R[N]=D)}function g(){const N=s.newAttributes,D=s.enabledAttributes;for(let W=0,q=D.length;W<q;W++)D[W]!==N[W]&&(t.disableVertexAttribArray(W),D[W]=0)}function x(N,D,W,q,R,U,P){P===!0?t.vertexAttribIPointer(N,D,W,R,U):t.vertexAttribPointer(N,D,W,q,R,U)}function M(N,D,W,q){v();const R=q.attributes,U=W.getAttributes(),P=D.defaultAttributeValues;for(const L in U){const V=U[L];if(V.location>=0){let j=R[L];if(j===void 0&&(L==="instanceMatrix"&&N.instanceMatrix&&(j=N.instanceMatrix),L==="instanceColor"&&N.instanceColor&&(j=N.instanceColor)),j!==void 0){const H=j.normalized,I=j.itemSize,ne=e.get(j);if(ne===void 0)continue;const te=ne.buffer,J=ne.type,O=ne.bytesPerElement,Y=J===t.INT||J===t.UNSIGNED_INT||j.gpuType===op;if(j.isInterleavedBufferAttribute){const K=j.data,ue=K.stride,Se=j.offset;if(K.isInstancedInterleavedBuffer){for(let Me=0;Me<V.locationSize;Me++)f(V.location+Me,K.meshPerAttribute);N.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Me=0;Me<V.locationSize;Me++)m(V.location+Me);t.bindBuffer(t.ARRAY_BUFFER,te);for(let Me=0;Me<V.locationSize;Me++)x(V.location+Me,I/V.locationSize,J,H,ue*O,(Se+I/V.locationSize*Me)*O,Y)}else{if(j.isInstancedBufferAttribute){for(let K=0;K<V.locationSize;K++)f(V.location+K,j.meshPerAttribute);N.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let K=0;K<V.locationSize;K++)m(V.location+K);t.bindBuffer(t.ARRAY_BUFFER,te);for(let K=0;K<V.locationSize;K++)x(V.location+K,I/V.locationSize,J,H,I*O,I/V.locationSize*K*O,Y)}}else if(P!==void 0){const H=P[L];if(H!==void 0)switch(H.length){case 2:t.vertexAttrib2fv(V.location,H);break;case 3:t.vertexAttrib3fv(V.location,H);break;case 4:t.vertexAttrib4fv(V.location,H);break;default:t.vertexAttrib1fv(V.location,H)}}}}g()}function b(){A();for(const N in i){const D=i[N];for(const W in D){const q=D[W];for(const R in q){const U=q[R];for(const P in U)h(U[P].object),delete U[P];delete q[R]}}delete i[N]}}function w(N){if(i[N.id]===void 0)return;const D=i[N.id];for(const W in D){const q=D[W];for(const R in q){const U=q[R];for(const P in U)h(U[P].object),delete U[P];delete q[R]}}delete i[N.id]}function C(N){for(const D in i){const W=i[D];for(const q in W){const R=W[q];if(R[N.id]===void 0)continue;const U=R[N.id];for(const P in U)h(U[P].object),delete U[P];delete R[N.id]}}}function y(N){for(const D in i){const W=i[D],q=N.isInstancedMesh===!0?N.id:0,R=W[q];if(R!==void 0){for(const U in R){const P=R[U];for(const L in P)h(P[L].object),delete P[L];delete R[U]}delete W[q],Object.keys(W).length===0&&delete i[D]}}}function A(){F(),o=!0,s!==r&&(s=r,c(s.object))}function F(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:A,resetDefaultState:F,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:g}}function DT(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function o(l,c,h){h!==0&&(t.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];n.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function NT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==oi&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const y=C===On&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Un&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==xi&&!y)}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(Ve("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),f=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),b=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:g,maxVaryings:x,maxFragmentUniforms:M,maxSamples:b,samples:w}}function IT(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Sn,a=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||r;return r=u,i=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){n=h(d,u,0)},this.setState=function(d,u,p){const _=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=t.get(d);if(!r||_===null||_.length===0||s&&!m)s?h(null):c();else{const g=s?0:i,x=g*4;let M=f.clippingState||null;l.value=M,M=h(_,u,x,p);for(let b=0;b!==x;++b)M[b]=n[b];f.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,_){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const f=p+v*4,g=u.matrixWorldInverse;a.getNormalMatrix(g),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,M=p;x!==v;++x,M+=4)o.copy(d[x]).applyMatrix4(g,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const ur=4,Gg=[.125,.215,.35,.446,.526,.582],Fr=20,UT=256,Do=new lo,Wg=new Qe;let ah=null,lh=0,ch=0,uh=!1;const FT=new B;class jg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=FT}=s;ah=this._renderer.getRenderTarget(),lh=this._renderer.getActiveCubeFace(),ch=this._renderer.getActiveMipmapLevel(),uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$g(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ah,lh,ch),this._renderer.xr.enabled=uh,e.scissorTest=!1,xs(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Zr||e.mapping===ro?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ah=this._renderer.getRenderTarget(),lh=this._renderer.getActiveCubeFace(),ch=this._renderer.getActiveMipmapLevel(),uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:On,format:oi,colorSpace:so,depthBuffer:!1},r=Xg(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xg(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=kT(s)),this._blurMaterial=BT(s,e,n),this._ggxMaterial=OT(s,e,n)}return r}_compileMaterial(e){const n=new cn(new $t,e);this._renderer.compile(n,Do)}_sceneToCubeUV(e,n,i,r,s){const l=new Nn(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Wg),d.toneMapping=Ei,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new cn(new Jr,new Ln({name:"PMREM.Background",side:Tn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let f=!1;const g=e.background;g?g.isColor&&(m.color.copy(g),e.background=null,f=!0):(m.color.copy(Wg),f=!0);for(let x=0;x<6;x++){const M=x%3;M===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[x],s.y,s.z)):M===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[x]));const b=this._cubeSize;xs(r,M*b,x>2?b:0,b,b),d.setRenderTarget(r),f&&d.render(v,l),d.render(e,l)}d.toneMapping=p,d.autoClear=u,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Zr||e.mapping===ro;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$g()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;xs(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Do)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,p=d*u,{_lodMax:_}=this,v=this._sizeLods[i],m=3*v*(i>_-ur?i-_+ur:0),f=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-n,xs(s,m,f,3*v,2*v),r.setRenderTarget(s),r.render(a,Do),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,xs(e,m,f,3*v,2*v),r.setRenderTarget(e),r.render(a,Do)}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&at("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[r];d.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Fr-1),v=s/_,m=isFinite(s)?1+Math.floor(h*v):Fr;m>Fr&&Ve(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Fr}`);const f=[];let g=0;for(let C=0;C<Fr;++C){const y=C/v,A=Math.exp(-y*y/2);f.push(A),C===0?g+=A:C<m&&(g+=2*A)}for(let C=0;C<f.length;C++)f[C]=f[C]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=_,u.mipInt.value=x-i;const M=this._sizeLods[r],b=3*M*(r>x-ur?r-x+ur:0),w=4*(this._cubeSize-M);xs(n,b,w,3*M,2*M),l.setRenderTarget(n),l.render(d,Do)}}function kT(t){const e=[],n=[],i=[];let r=t;const s=t-ur+1+Gg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>t-ur?l=Gg[o-t+ur-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,_=6,v=3,m=2,f=1,g=new Float32Array(v*_*p),x=new Float32Array(m*_*p),M=new Float32Array(f*_*p);for(let w=0;w<p;w++){const C=w%3*2/3-1,y=w>2?0:-1,A=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];g.set(A,v*_*w),x.set(u,m*_*w);const F=[w,w,w,w,w,w];M.set(F,f*_*w)}const b=new $t;b.setAttribute("position",new ci(g,v)),b.setAttribute("uv",new ci(x,m)),b.setAttribute("faceIndex",new ci(M,f)),i.push(new cn(b,null)),r>ur&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Xg(t,e,n){const i=new An(t,e,n);return i.texture.mapping=Wc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xs(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function OT(t,e,n){return new un({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:UT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Kc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function BT(t,e,n){const i=new Float32Array(Fr),r=new B(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:Fr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Kc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function qg(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function $g(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Kc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Lx extends An{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ex(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Jr(5,5,5),s=new un({name:"CubemapFromEquirect",uniforms:ao(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Tn,blending:wi});s.uniforms.tEquirect.value=n;const o=new cn(r,s),a=n.minFilter;return n.minFilter===zr&&(n.minFilter=Yt),new Vw(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}function zT(t){let e=new WeakMap,n=new WeakMap,i=null;function r(u,p=!1){return u==null?null:p?o(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===Pu||p===Lu)if(e.has(u)){const _=e.get(u).texture;return a(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const v=new Lx(_.height);return v.fromEquirectangularTexture(t,u),e.set(u,v),u.addEventListener("dispose",c),a(v.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const p=u.mapping,_=p===Pu||p===Lu,v=p===Zr||p===ro;if(_||v){let m=n.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new jg(t)),m=_?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{const g=u.image;return _&&g&&g.height>0||v&&g&&l(g)?(i===null&&(i=new jg(t)),m=_?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,p){return p===Pu?u.mapping=Zr:p===Lu&&(u.mapping=ro),u}function l(u){let p=0;const _=6;for(let v=0;v<_;v++)u[v]!==void 0&&p++;return p===_}function c(u){const p=u.target;p.removeEventListener("dispose",c);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const _=n.get(p);_!==void 0&&(n.delete(p),_.dispose())}function d(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function VT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&tf("WebGLRenderer: "+i+" extension not supported."),r}}}function HT(t,e,n,i){const r={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",o),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function a(d,u){return r[u.id]===!0||(u.addEventListener("dispose",o),r[u.id]=!0,n.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)e.update(u[p],t.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,_=d.attributes.position;let v=0;if(_===void 0)return;if(p!==null){const g=p.array;v=p.version;for(let x=0,M=g.length;x<M;x+=3){const b=g[x+0],w=g[x+1],C=g[x+2];u.push(b,w,w,C,C,b)}}else{const g=_.array;v=_.version;for(let x=0,M=g.length/3-1;x<M;x+=3){const b=x+0,w=x+1,C=x+2;u.push(b,w,w,C,C,b)}}const m=new(_.count>=65535?Xc:jc)(u,1);m.version=v;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function h(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function GT(t,e,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,u){t.drawElements(i,u,s,d*o),n.update(u,i,1)}function c(d,u,p){p!==0&&(t.drawElementsInstanced(i,u,s,d*o,p),n.update(u,i,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,d,0,p);let v=0;for(let m=0;m<p;m++)v+=u[m];n.update(v,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function WT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:at("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function jT(t,e,n){const i=new WeakMap,r=new Nt;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(a);if(u===void 0||u.count!==d){let A=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[];let x=0;p===!0&&(x=1),_===!0&&(x=2),v===!0&&(x=3);let M=a.attributes.position.count*x,b=1;M>e.maxTextureSize&&(b=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const w=new Float32Array(M*b*4*d),C=new yx(w,M,b,d);C.type=xi,C.needsUpdate=!0;const y=x*4;for(let F=0;F<d;F++){const N=m[F],D=f[F],W=g[F],q=M*b*4*F;for(let R=0;R<N.count;R++){const U=R*y;p===!0&&(r.fromBufferAttribute(N,R),w[q+U+0]=r.x,w[q+U+1]=r.y,w[q+U+2]=r.z,w[q+U+3]=0),_===!0&&(r.fromBufferAttribute(D,R),w[q+U+4]=r.x,w[q+U+5]=r.y,w[q+U+6]=r.z,w[q+U+7]=0),v===!0&&(r.fromBufferAttribute(W,R),w[q+U+8]=r.x,w[q+U+9]=r.y,w[q+U+10]=r.z,w[q+U+11]=W.itemSize===4?r.w:1)}}u={count:d,texture:C,size:new Oe(M,b)},i.set(a,u),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const _=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function XT(t,e,n,i,r){let s=new WeakMap;function o(c){const h=r.render.frame,d=c.geometry,u=e.get(c,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function a(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:o,dispose:a}}const qT={[ix]:"LINEAR_TONE_MAPPING",[rx]:"REINHARD_TONE_MAPPING",[sx]:"CINEON_TONE_MAPPING",[ox]:"ACES_FILMIC_TONE_MAPPING",[lx]:"AGX_TONE_MAPPING",[cx]:"NEUTRAL_TONE_MAPPING",[ax]:"CUSTOM_TONE_MAPPING"};function $T(t,e,n,i,r){const s=new An(e,n,{type:t,depthBuffer:i,stencilBuffer:r,depthTexture:i?new oo(e,n):void 0}),o=new An(e,n,{type:On,depthBuffer:!1,stencilBuffer:!1}),a=new $t;a.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new yt([0,2,0,0,2,0],2));const l=new Pw({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new cn(a,l),h=new lo(-1,1,1,-1,0,1);let d=null,u=null,p=!1,_,v=null,m=[],f=!1;this.setSize=function(g,x){s.setSize(g,x),o.setSize(g,x);for(let M=0;M<m.length;M++){const b=m[M];b.setSize&&b.setSize(g,x)}},this.setEffects=function(g){m=g,f=m.length>0&&m[0].isRenderPass===!0;const x=s.width,M=s.height;for(let b=0;b<m.length;b++){const w=m[b];w.setSize&&w.setSize(x,M)}},this.begin=function(g,x){if(p||g.toneMapping===Ei&&m.length===0)return!1;if(v=x,x!==null){const M=x.width,b=x.height;(s.width!==M||s.height!==b)&&this.setSize(M,b)}return f===!1&&g.setRenderTarget(s),_=g.toneMapping,g.toneMapping=Ei,!0},this.hasRenderPass=function(){return f},this.end=function(g,x){g.toneMapping=_,p=!0;let M=s,b=o;for(let w=0;w<m.length;w++){const C=m[w];if(C.enabled!==!1&&(C.render(g,b,M,x),C.needsSwap!==!1)){const y=M;M=b,b=y}}if(d!==g.outputColorSpace||u!==g.toneMapping){d=g.outputColorSpace,u=g.toneMapping,l.defines={},rt.getTransfer(d)===ft&&(l.defines.SRGB_TRANSFER="");const w=qT[u];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,g.setRenderTarget(v),g.render(c,h),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const Dx=new en,sf=new oo(1,1),Nx=new yx,Ix=new aw,Ux=new Ex,Yg=[],Kg=[],Zg=new Float32Array(16),Qg=new Float32Array(9),Jg=new Float32Array(4);function go(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Yg[r];if(s===void 0&&(s=new Float32Array(r),Yg[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Gt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Wt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Zc(t,e){let n=Kg[e];n===void 0&&(n=new Int32Array(e),Kg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function YT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function KT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2fv(this.addr,e),Wt(n,e)}}function ZT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Gt(n,e))return;t.uniform3fv(this.addr,e),Wt(n,e)}}function QT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4fv(this.addr,e),Wt(n,e)}}function JT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;Jg.set(i),t.uniformMatrix2fv(this.addr,!1,Jg),Wt(n,i)}}function eA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;Qg.set(i),t.uniformMatrix3fv(this.addr,!1,Qg),Wt(n,i)}}function tA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;Zg.set(i),t.uniformMatrix4fv(this.addr,!1,Zg),Wt(n,i)}}function nA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function iA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2iv(this.addr,e),Wt(n,e)}}function rA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Gt(n,e))return;t.uniform3iv(this.addr,e),Wt(n,e)}}function sA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4iv(this.addr,e),Wt(n,e)}}function oA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function aA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2uiv(this.addr,e),Wt(n,e)}}function lA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Gt(n,e))return;t.uniform3uiv(this.addr,e),Wt(n,e)}}function cA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4uiv(this.addr,e),Wt(n,e)}}function uA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(sf.compareFunction=n.isReversedDepthBuffer()?fp:dp,s=sf):s=Dx,n.setTexture2D(e||s,r)}function hA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Ix,r)}function dA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Ux,r)}function fA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Nx,r)}function pA(t){switch(t){case 5126:return YT;case 35664:return KT;case 35665:return ZT;case 35666:return QT;case 35674:return JT;case 35675:return eA;case 35676:return tA;case 5124:case 35670:return nA;case 35667:case 35671:return iA;case 35668:case 35672:return rA;case 35669:case 35673:return sA;case 5125:return oA;case 36294:return aA;case 36295:return lA;case 36296:return cA;case 35678:case 36198:case 36298:case 36306:case 35682:return uA;case 35679:case 36299:case 36307:return hA;case 35680:case 36300:case 36308:case 36293:return dA;case 36289:case 36303:case 36311:case 36292:return fA}}function mA(t,e){t.uniform1fv(this.addr,e)}function gA(t,e){const n=go(e,this.size,2);t.uniform2fv(this.addr,n)}function _A(t,e){const n=go(e,this.size,3);t.uniform3fv(this.addr,n)}function vA(t,e){const n=go(e,this.size,4);t.uniform4fv(this.addr,n)}function xA(t,e){const n=go(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function yA(t,e){const n=go(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function SA(t,e){const n=go(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function MA(t,e){t.uniform1iv(this.addr,e)}function wA(t,e){t.uniform2iv(this.addr,e)}function EA(t,e){t.uniform3iv(this.addr,e)}function bA(t,e){t.uniform4iv(this.addr,e)}function TA(t,e){t.uniform1uiv(this.addr,e)}function AA(t,e){t.uniform2uiv(this.addr,e)}function CA(t,e){t.uniform3uiv(this.addr,e)}function RA(t,e){t.uniform4uiv(this.addr,e)}function PA(t,e,n){const i=this.cache,r=e.length,s=Zc(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));let o;this.type===t.SAMPLER_2D_SHADOW?o=sf:o=Dx;for(let a=0;a!==r;++a)n.setTexture2D(e[a]||o,s[a])}function LA(t,e,n){const i=this.cache,r=e.length,s=Zc(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Ix,s[o])}function DA(t,e,n){const i=this.cache,r=e.length,s=Zc(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Ux,s[o])}function NA(t,e,n){const i=this.cache,r=e.length,s=Zc(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Nx,s[o])}function IA(t){switch(t){case 5126:return mA;case 35664:return gA;case 35665:return _A;case 35666:return vA;case 35674:return xA;case 35675:return yA;case 35676:return SA;case 5124:case 35670:return MA;case 35667:case 35671:return wA;case 35668:case 35672:return EA;case 35669:case 35673:return bA;case 5125:return TA;case 36294:return AA;case 36295:return CA;case 36296:return RA;case 35678:case 36198:case 36298:case 36306:case 35682:return PA;case 35679:case 36299:case 36307:return LA;case 35680:case 36300:case 36308:case 36293:return DA;case 36289:case 36303:case 36311:case 36292:return NA}}class UA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=pA(n.type)}}class FA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=IA(n.type)}}class kA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const hh=/(\w+)(\])?(\[|\.)?/g;function e0(t,e){t.seq.push(e),t.map[e.id]=e}function OA(t,e,n){const i=t.name,r=i.length;for(hh.lastIndex=0;;){const s=hh.exec(i),o=hh.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){e0(n,c===void 0?new UA(a,t,e):new FA(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new kA(a),e0(n,d)),n=d}}}class Xl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(n,o),l=e.getUniformLocation(n,a.name);OA(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function t0(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const BA=37297;let zA=0;function VA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const n0=new $e;function HA(t){rt._getMatrix(n0,rt.workingColorSpace,t);const e=`mat3( ${n0.elements.map(n=>n.toFixed(4))} )`;switch(rt.getTransfer(t)){case Sc:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function i0(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return n.toUpperCase()+`

`+s+`

`+VA(t.getShaderSource(e),a)}else return s}function GA(t,e){const n=HA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const WA={[ix]:"Linear",[rx]:"Reinhard",[sx]:"Cineon",[ox]:"ACESFilmic",[lx]:"AgX",[cx]:"Neutral",[ax]:"Custom"};function jA(t,e){const n=WA[e];return n===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const wl=new B;function XA(){rt.getLuminanceCoefficients(wl);const t=wl.x.toFixed(4),e=wl.y.toFixed(4),n=wl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bo).join(`
`)}function $A(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function YA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Bo(t){return t!==""}function r0(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function s0(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const KA=/^[ \t]*#include +<([\w\d./]+)>/gm;function of(t){return t.replace(KA,QA)}const ZA=new Map;function QA(t,e){let n=et[e];if(n===void 0){const i=ZA.get(e);if(i!==void 0)n=et[i],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return of(n)}const JA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function o0(t){return t.replace(JA,e2)}function e2(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function a0(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const t2={[Vl]:"SHADOWMAP_TYPE_PCF",[Oo]:"SHADOWMAP_TYPE_VSM"};function n2(t){return t2[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const i2={[Zr]:"ENVMAP_TYPE_CUBE",[ro]:"ENVMAP_TYPE_CUBE",[Wc]:"ENVMAP_TYPE_CUBE_UV"};function r2(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":i2[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const s2={[ro]:"ENVMAP_MODE_REFRACTION"};function o2(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":s2[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const a2={[sp]:"ENVMAP_BLENDING_MULTIPLY",[bM]:"ENVMAP_BLENDING_MIX",[TM]:"ENVMAP_BLENDING_ADD"};function l2(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":a2[t.combine]||"ENVMAP_BLENDING_NONE"}function c2(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function u2(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=n2(n),c=r2(n),h=o2(n),d=l2(n),u=c2(n),p=qA(n),_=$A(s),v=r.createProgram();let m,f,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Bo).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Bo).join(`
`),f.length>0&&(f+=`
`)):(m=[a0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bo).join(`
`),f=[a0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ei?"#define TONE_MAPPING":"",n.toneMapping!==Ei?et.tonemapping_pars_fragment:"",n.toneMapping!==Ei?jA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,GA("linearToOutputTexel",n.outputColorSpace),XA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Bo).join(`
`)),o=of(o),o=r0(o,n),o=s0(o,n),a=of(a),a=r0(a,n),a=s0(a,n),o=o0(o),a=o0(a),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===ag?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===ag?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=g+m+o,M=g+f+a,b=t0(r,r.VERTEX_SHADER,x),w=t0(r,r.FRAGMENT_SHADER,M);r.attachShader(v,b),r.attachShader(v,w),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(N){if(t.debug.checkShaderErrors){const D=r.getProgramInfoLog(v)||"",W=r.getShaderInfoLog(b)||"",q=r.getShaderInfoLog(w)||"",R=D.trim(),U=W.trim(),P=q.trim();let L=!0,V=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(L=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,v,b,w);else{const j=i0(r,b,"vertex"),H=i0(r,w,"fragment");at("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+R+`
`+j+`
`+H)}else R!==""?Ve("WebGLProgram: Program Info Log:",R):(U===""||P==="")&&(V=!1);V&&(N.diagnostics={runnable:L,programLog:R,vertexShader:{log:U,prefix:m},fragmentShader:{log:P,prefix:f}})}r.deleteShader(b),r.deleteShader(w),y=new Xl(r,v),A=YA(r,v)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let F=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(v,BA)),F},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=zA++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=w,this}let h2=0;class d2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new f2(e),n.set(e,i)),i}}class f2{constructor(e){this.id=h2++,this.code=e,this.usedTimes=0}}function p2(t){return t===Qr||t===xc||t===yc}function m2(t,e,n,i,r,s){const o=new gp,a=new d2,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,A,F,N,D,W){const q=N.fog,R=D.geometry,U=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?N.environment:null,P=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,L=e.get(y.envMap||U,P),V=L&&L.mapping===Wc?L.image.height:null,j=p[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&Ve("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const H=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,I=H!==void 0?H.length:0;let ne=0;R.morphAttributes.position!==void 0&&(ne=1),R.morphAttributes.normal!==void 0&&(ne=2),R.morphAttributes.color!==void 0&&(ne=3);let te,J,O,Y;if(j){const Ye=_i[j];te=Ye.vertexShader,J=Ye.fragmentShader}else te=y.vertexShader,J=y.fragmentShader,a.update(y),O=a.getVertexShaderID(y),Y=a.getFragmentShaderID(y);const K=t.getRenderTarget(),ue=t.state.buffers.depth.getReversed(),Se=D.isInstancedMesh===!0,Me=D.isBatchedMesh===!0,We=!!y.map,Ie=!!y.matcap,Be=!!L,Ge=!!y.aoMap,fe=!!y.lightMap,re=!!y.bumpMap,he=!!y.normalMap,De=!!y.displacementMap,z=!!y.emissiveMap,je=!!y.metalnessMap,Xe=!!y.roughnessMap,ht=y.anisotropy>0,xe=y.clearcoat>0,st=y.dispersion>0,T=y.iridescence>0,S=y.sheen>0,$=y.transmission>0,oe=ht&&!!y.anisotropyMap,le=xe&&!!y.clearcoatMap,pe=xe&&!!y.clearcoatNormalMap,ye=xe&&!!y.clearcoatRoughnessMap,ie=T&&!!y.iridescenceMap,ae=T&&!!y.iridescenceThicknessMap,Te=S&&!!y.sheenColorMap,Re=S&&!!y.sheenRoughnessMap,_e=!!y.specularMap,me=!!y.specularColorMap,qe=!!y.specularIntensityMap,Ze=$&&!!y.transmissionMap,dt=$&&!!y.thicknessMap,G=!!y.gradientMap,ge=!!y.alphaMap,se=y.alphaTest>0,Ae=!!y.alphaHash,ve=!!y.extensions;let ce=Ei;y.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ce=t.toneMapping);const Ue={shaderID:j,shaderType:y.type,shaderName:y.name,vertexShader:te,fragmentShader:J,defines:y.defines,customVertexShaderID:O,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Me,batchingColor:Me&&D._colorsTexture!==null,instancing:Se,instancingColor:Se&&D.instanceColor!==null,instancingMorph:Se&&D.morphTexture!==null,outputColorSpace:K===null?t.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:We,matcap:Ie,envMap:Be,envMapMode:Be&&L.mapping,envMapCubeUVHeight:V,aoMap:Ge,lightMap:fe,bumpMap:re,normalMap:he,displacementMap:De,emissiveMap:z,normalMapObjectSpace:he&&y.normalMapType===RM,normalMapTangentSpace:he&&y.normalMapType===ef,packedNormalMap:he&&y.normalMapType===ef&&p2(y.normalMap.format),metalnessMap:je,roughnessMap:Xe,anisotropy:ht,anisotropyMap:oe,clearcoat:xe,clearcoatMap:le,clearcoatNormalMap:pe,clearcoatRoughnessMap:ye,dispersion:st,iridescence:T,iridescenceMap:ie,iridescenceThicknessMap:ae,sheen:S,sheenColorMap:Te,sheenRoughnessMap:Re,specularMap:_e,specularColorMap:me,specularIntensityMap:qe,transmission:$,transmissionMap:Ze,thicknessMap:dt,gradientMap:G,opaque:y.transparent===!1&&y.blending===Gs&&y.alphaToCoverage===!1,alphaMap:ge,alphaTest:se,alphaHash:Ae,combine:y.combine,mapUv:We&&_(y.map.channel),aoMapUv:Ge&&_(y.aoMap.channel),lightMapUv:fe&&_(y.lightMap.channel),bumpMapUv:re&&_(y.bumpMap.channel),normalMapUv:he&&_(y.normalMap.channel),displacementMapUv:De&&_(y.displacementMap.channel),emissiveMapUv:z&&_(y.emissiveMap.channel),metalnessMapUv:je&&_(y.metalnessMap.channel),roughnessMapUv:Xe&&_(y.roughnessMap.channel),anisotropyMapUv:oe&&_(y.anisotropyMap.channel),clearcoatMapUv:le&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:pe&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(y.sheenRoughnessMap.channel),specularMapUv:_e&&_(y.specularMap.channel),specularColorMapUv:me&&_(y.specularColorMap.channel),specularIntensityMapUv:qe&&_(y.specularIntensityMap.channel),transmissionMapUv:Ze&&_(y.transmissionMap.channel),thicknessMapUv:dt&&_(y.thicknessMap.channel),alphaMapUv:ge&&_(y.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(he||ht),vertexNormals:!!R.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!R.attributes.uv&&(We||ge),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||R.attributes.normal===void 0&&he===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ue,skinning:D.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:I,morphTextureStride:ne,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&F.length>0,shadowMapType:t.shadowMap.type,toneMapping:ce,decodeVideoTexture:We&&y.map.isVideoTexture===!0&&rt.getTransfer(y.map.colorSpace)===ft,decodeVideoTextureEmissive:z&&y.emissiveMap.isVideoTexture===!0&&rt.getTransfer(y.emissiveMap.colorSpace)===ft,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===mn,flipSided:y.side===Tn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ve&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&y.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function m(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const F in y.defines)A.push(F),A.push(y.defines[F]);return y.isRawShaderMaterial===!1&&(f(A,y),g(A,y),A.push(t.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function f(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function g(y,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),y.push(o.mask)}function x(y){const A=p[y.type];let F;if(A){const N=_i[A];F=Ec.clone(N.uniforms)}else F=y.uniforms;return F}function M(y,A){let F=h.get(A);return F!==void 0?++F.usedTimes:(F=new u2(t,A,y,r),c.push(F),h.set(A,F)),F}function b(y){if(--y.usedTimes===0){const A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function w(y){a.remove(y)}function C(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:x,acquireProgram:M,releaseProgram:b,releaseShaderCache:w,programs:c,dispose:C}}function g2(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function _2(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function l0(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function c0(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function a(u,p,_,v,m,f){let g=t[e];return g===void 0?(g={id:u.id,object:u,geometry:p,material:_,materialVariant:o(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:f},t[e]=g):(g.id=u.id,g.object=u,g.geometry=p,g.material=_,g.materialVariant=o(u),g.groupOrder=v,g.renderOrder=u.renderOrder,g.z=m,g.group=f),e++,g}function l(u,p,_,v,m,f){const g=a(u,p,_,v,m,f);_.transmission>0?i.push(g):_.transparent===!0?r.push(g):n.push(g)}function c(u,p,_,v,m,f){const g=a(u,p,_,v,m,f);_.transmission>0?i.unshift(g):_.transparent===!0?r.unshift(g):n.unshift(g)}function h(u,p){n.length>1&&n.sort(u||_2),i.length>1&&i.sort(p||l0),r.length>1&&r.sort(p||l0)}function d(){for(let u=e,p=t.length;u<p;u++){const _=t[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:h}}function v2(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new c0,t.set(i,[o])):r>=s.length?(o=new c0,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function x2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new Qe};break;case"SpotLight":n={position:new B,direction:new B,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":n={color:new Qe,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function y2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let S2=0;function M2(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function w2(t){const e=new x2,n=y2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const r=new B,s=new He,o=new He;function a(c){let h=0,d=0,u=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let p=0,_=0,v=0,m=0,f=0,g=0,x=0,M=0,b=0,w=0,C=0;c.sort(M2);for(let A=0,F=c.length;A<F;A++){const N=c[A],D=N.color,W=N.intensity,q=N.distance;let R=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Qr?R=N.shadow.map.texture:R=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=D.r*W,d+=D.g*W,u+=D.b*W;else if(N.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(N.sh.coefficients[U],W);C++}else if(N.isDirectionalLight){const U=e.get(N);if(U.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const P=N.shadow,L=n.get(N);L.shadowIntensity=P.intensity,L.shadowBias=P.bias,L.shadowNormalBias=P.normalBias,L.shadowRadius=P.radius,L.shadowMapSize=P.mapSize,i.directionalShadow[p]=L,i.directionalShadowMap[p]=R,i.directionalShadowMatrix[p]=N.shadow.matrix,g++}i.directional[p]=U,p++}else if(N.isSpotLight){const U=e.get(N);U.position.setFromMatrixPosition(N.matrixWorld),U.color.copy(D).multiplyScalar(W),U.distance=q,U.coneCos=Math.cos(N.angle),U.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),U.decay=N.decay,i.spot[v]=U;const P=N.shadow;if(N.map&&(i.spotLightMap[b]=N.map,b++,P.updateMatrices(N),N.castShadow&&w++),i.spotLightMatrix[v]=P.matrix,N.castShadow){const L=n.get(N);L.shadowIntensity=P.intensity,L.shadowBias=P.bias,L.shadowNormalBias=P.normalBias,L.shadowRadius=P.radius,L.shadowMapSize=P.mapSize,i.spotShadow[v]=L,i.spotShadowMap[v]=R,M++}v++}else if(N.isRectAreaLight){const U=e.get(N);U.color.copy(D).multiplyScalar(W),U.halfWidth.set(N.width*.5,0,0),U.halfHeight.set(0,N.height*.5,0),i.rectArea[m]=U,m++}else if(N.isPointLight){const U=e.get(N);if(U.color.copy(N.color).multiplyScalar(N.intensity),U.distance=N.distance,U.decay=N.decay,N.castShadow){const P=N.shadow,L=n.get(N);L.shadowIntensity=P.intensity,L.shadowBias=P.bias,L.shadowNormalBias=P.normalBias,L.shadowRadius=P.radius,L.shadowMapSize=P.mapSize,L.shadowCameraNear=P.camera.near,L.shadowCameraFar=P.camera.far,i.pointShadow[_]=L,i.pointShadowMap[_]=R,i.pointShadowMatrix[_]=N.shadow.matrix,x++}i.point[_]=U,_++}else if(N.isHemisphereLight){const U=e.get(N);U.skyColor.copy(N.color).multiplyScalar(W),U.groundColor.copy(N.groundColor).multiplyScalar(W),i.hemi[f]=U,f++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const y=i.hash;(y.directionalLength!==p||y.pointLength!==_||y.spotLength!==v||y.rectAreaLength!==m||y.hemiLength!==f||y.numDirectionalShadows!==g||y.numPointShadows!==x||y.numSpotShadows!==M||y.numSpotMaps!==b||y.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=_,i.hemi.length=f,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=M+b-w,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,y.directionalLength=p,y.pointLength=_,y.spotLength=v,y.rectAreaLength=m,y.hemiLength=f,y.numDirectionalShadows=g,y.numPointShadows=x,y.numSpotShadows=M,y.numSpotMaps=b,y.numLightProbes=C,i.version=S2++)}function l(c,h){let d=0,u=0,p=0,_=0,v=0;const m=h.matrixWorldInverse;for(let f=0,g=c.length;f<g;f++){const x=c[f];if(x.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),d++}else if(x.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const M=i.point[u];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),u++}else if(x.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function u0(t){const e=new w2(t),n=[],i=[],r=[];function s(u){d.camera=u,n.length=0,i.length=0,r.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(n)}function h(u){e.setupView(n,u)}const d={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function E2(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new u0(t),e.set(r,[a])):s>=o.length?(a=new u0(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const b2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,A2=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],C2=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],h0=new He,No=new B,dh=new B;function R2(t,e,n){let i=new _p;const r=new Oe,s=new Oe,o=new Nt,a=new Lw,l=new Dw,c={},h=n.maxTextureSize,d={[Sr]:Tn,[Tn]:Sr,[mn]:mn},u=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:b2,fragmentShader:T2}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new $t;_.setAttribute("position",new ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new cn(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vl;let f=this.type;this.render=function(w,C,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===nx&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Vl);const A=t.getRenderTarget(),F=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),D=t.state;D.setBlending(wi),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const W=f!==this.type;W&&C.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(R=>R.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,R=w.length;q<R;q++){const U=w[q],P=U.shadow;if(P===void 0){Ve("WebGLShadowMap:",U,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;r.copy(P.mapSize);const L=P.getFrameExtents();r.multiply(L),s.copy(P.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/L.x),r.x=s.x*L.x,P.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/L.y),r.y=s.y*L.y,P.mapSize.y=s.y));const V=t.state.buffers.depth.getReversed();if(P.camera._reversedDepth=V,P.map===null||W===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===Oo){if(U.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new An(r.x,r.y,{format:Qr,type:On,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),P.map.texture.name=U.name+".shadowMap",P.map.depthTexture=new oo(r.x,r.y,xi),P.map.depthTexture.name=U.name+".shadowMapDepth",P.map.depthTexture.format=Wi,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Et,P.map.depthTexture.magFilter=Et}else U.isPointLight?(P.map=new Lx(r.x),P.map.depthTexture=new Tw(r.x,bi)):(P.map=new An(r.x,r.y),P.map.depthTexture=new oo(r.x,r.y,bi)),P.map.depthTexture.name=U.name+".shadowMap",P.map.depthTexture.format=Wi,this.type===Vl?(P.map.depthTexture.compareFunction=V?fp:dp,P.map.depthTexture.minFilter=Yt,P.map.depthTexture.magFilter=Yt):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Et,P.map.depthTexture.magFilter=Et);P.camera.updateProjectionMatrix()}const j=P.map.isWebGLCubeRenderTarget?6:1;for(let H=0;H<j;H++){if(P.map.isWebGLCubeRenderTarget)t.setRenderTarget(P.map,H),t.clear();else{H===0&&(t.setRenderTarget(P.map),t.clear());const I=P.getViewport(H);o.set(s.x*I.x,s.y*I.y,s.x*I.z,s.y*I.w),D.viewport(o)}if(U.isPointLight){const I=P.camera,ne=P.matrix,te=U.distance||I.far;te!==I.far&&(I.far=te,I.updateProjectionMatrix()),No.setFromMatrixPosition(U.matrixWorld),I.position.copy(No),dh.copy(I.position),dh.add(A2[H]),I.up.copy(C2[H]),I.lookAt(dh),I.updateMatrixWorld(),ne.makeTranslation(-No.x,-No.y,-No.z),h0.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),P._frustum.setFromProjectionMatrix(h0,I.coordinateSystem,I.reversedDepth)}else P.updateMatrices(U);i=P.getFrustum(),M(C,y,P.camera,U,this.type)}P.isPointLightShadow!==!0&&this.type===Oo&&g(P,y),P.needsUpdate=!1}f=this.type,m.needsUpdate=!1,t.setRenderTarget(A,F,N)};function g(w,C){const y=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new An(r.x,r.y,{format:Qr,type:On})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(C,null,y,u,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(C,null,y,p,v,null)}function x(w,C,y,A){let F=null;const N=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)F=N;else if(F=y.isPointLight===!0?l:a,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const D=F.uuid,W=C.uuid;let q=c[D];q===void 0&&(q={},c[D]=q);let R=q[W];R===void 0&&(R=F.clone(),q[W]=R,C.addEventListener("dispose",b)),F=R}if(F.visible=C.visible,F.wireframe=C.wireframe,A===Oo?F.side=C.shadowSide!==null?C.shadowSide:C.side:F.side=C.shadowSide!==null?C.shadowSide:d[C.side],F.alphaMap=C.alphaMap,F.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,F.map=C.map,F.clipShadows=C.clipShadows,F.clippingPlanes=C.clippingPlanes,F.clipIntersection=C.clipIntersection,F.displacementMap=C.displacementMap,F.displacementScale=C.displacementScale,F.displacementBias=C.displacementBias,F.wireframeLinewidth=C.wireframeLinewidth,F.linewidth=C.linewidth,y.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const D=t.properties.get(F);D.light=y}return F}function M(w,C,y,A,F){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&F===Oo)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const W=e.update(w),q=w.material;if(Array.isArray(q)){const R=W.groups;for(let U=0,P=R.length;U<P;U++){const L=R[U],V=q[L.materialIndex];if(V&&V.visible){const j=x(w,V,A,F);w.onBeforeShadow(t,w,C,y,W,j,L),t.renderBufferDirect(y,null,W,j,w,L),w.onAfterShadow(t,w,C,y,W,j,L)}}}else if(q.visible){const R=x(w,q,A,F);w.onBeforeShadow(t,w,C,y,W,R,null),t.renderBufferDirect(y,null,W,R,w,null),w.onAfterShadow(t,w,C,y,W,R,null)}}const D=w.children;for(let W=0,q=D.length;W<q;W++)M(D[W],C,y,A,F)}function b(w){w.target.removeEventListener("dispose",b);for(const y in c){const A=c[y],F=w.target.uuid;F in A&&(A[F].dispose(),delete A[F])}}}function P2(t,e){function n(){let G=!1;const ge=new Nt;let se=null;const Ae=new Nt(0,0,0,0);return{setMask:function(ve){se!==ve&&!G&&(t.colorMask(ve,ve,ve,ve),se=ve)},setLocked:function(ve){G=ve},setClear:function(ve,ce,Ue,Ye,It){It===!0&&(ve*=Ye,ce*=Ye,Ue*=Ye),ge.set(ve,ce,Ue,Ye),Ae.equals(ge)===!1&&(t.clearColor(ve,ce,Ue,Ye),Ae.copy(ge))},reset:function(){G=!1,se=null,Ae.set(-1,0,0,0)}}}function i(){let G=!1,ge=!1,se=null,Ae=null,ve=null;return{setReversed:function(ce){if(ge!==ce){const Ue=e.get("EXT_clip_control");ce?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ge=ce;const Ye=ve;ve=null,this.setClear(Ye)}},getReversed:function(){return ge},setTest:function(ce){ce?K(t.DEPTH_TEST):ue(t.DEPTH_TEST)},setMask:function(ce){se!==ce&&!G&&(t.depthMask(ce),se=ce)},setFunc:function(ce){if(ge&&(ce=BM[ce]),Ae!==ce){switch(ce){case md:t.depthFunc(t.NEVER);break;case gd:t.depthFunc(t.ALWAYS);break;case _d:t.depthFunc(t.LESS);break;case io:t.depthFunc(t.LEQUAL);break;case vd:t.depthFunc(t.EQUAL);break;case xd:t.depthFunc(t.GEQUAL);break;case yd:t.depthFunc(t.GREATER);break;case Sd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Ae=ce}},setLocked:function(ce){G=ce},setClear:function(ce){ve!==ce&&(ve=ce,ge&&(ce=1-ce),t.clearDepth(ce))},reset:function(){G=!1,se=null,Ae=null,ve=null,ge=!1}}}function r(){let G=!1,ge=null,se=null,Ae=null,ve=null,ce=null,Ue=null,Ye=null,It=null;return{setTest:function(mt){G||(mt?K(t.STENCIL_TEST):ue(t.STENCIL_TEST))},setMask:function(mt){ge!==mt&&!G&&(t.stencilMask(mt),ge=mt)},setFunc:function(mt,Ti,hi){(se!==mt||Ae!==Ti||ve!==hi)&&(t.stencilFunc(mt,Ti,hi),se=mt,Ae=Ti,ve=hi)},setOp:function(mt,Ti,hi){(ce!==mt||Ue!==Ti||Ye!==hi)&&(t.stencilOp(mt,Ti,hi),ce=mt,Ue=Ti,Ye=hi)},setLocked:function(mt){G=mt},setClear:function(mt){It!==mt&&(t.clearStencil(mt),It=mt)},reset:function(){G=!1,ge=null,se=null,Ae=null,ve=null,ce=null,Ue=null,Ye=null,It=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},d={},u={},p=new WeakMap,_=[],v=null,m=!1,f=null,g=null,x=null,M=null,b=null,w=null,C=null,y=new Qe(0,0,0),A=0,F=!1,N=null,D=null,W=null,q=null,R=null;const U=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,L=0;const V=t.getParameter(t.VERSION);V.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(V)[1]),P=L>=1):V.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),P=L>=2);let j=null,H={};const I=t.getParameter(t.SCISSOR_BOX),ne=t.getParameter(t.VIEWPORT),te=new Nt().fromArray(I),J=new Nt().fromArray(ne);function O(G,ge,se,Ae){const ve=new Uint8Array(4),ce=t.createTexture();t.bindTexture(G,ce),t.texParameteri(G,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(G,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ue=0;Ue<se;Ue++)G===t.TEXTURE_3D||G===t.TEXTURE_2D_ARRAY?t.texImage3D(ge,0,t.RGBA,1,1,Ae,0,t.RGBA,t.UNSIGNED_BYTE,ve):t.texImage2D(ge+Ue,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ve);return ce}const Y={};Y[t.TEXTURE_2D]=O(t.TEXTURE_2D,t.TEXTURE_2D,1),Y[t.TEXTURE_CUBE_MAP]=O(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[t.TEXTURE_2D_ARRAY]=O(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Y[t.TEXTURE_3D]=O(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(t.DEPTH_TEST),o.setFunc(io),re(!1),he(ng),K(t.CULL_FACE),Ge(wi);function K(G){h[G]!==!0&&(t.enable(G),h[G]=!0)}function ue(G){h[G]!==!1&&(t.disable(G),h[G]=!1)}function Se(G,ge){return u[G]!==ge?(t.bindFramebuffer(G,ge),u[G]=ge,G===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=ge),G===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=ge),!0):!1}function Me(G,ge){let se=_,Ae=!1;if(G){se=p.get(ge),se===void 0&&(se=[],p.set(ge,se));const ve=G.textures;if(se.length!==ve.length||se[0]!==t.COLOR_ATTACHMENT0){for(let ce=0,Ue=ve.length;ce<Ue;ce++)se[ce]=t.COLOR_ATTACHMENT0+ce;se.length=ve.length,Ae=!0}}else se[0]!==t.BACK&&(se[0]=t.BACK,Ae=!0);Ae&&t.drawBuffers(se)}function We(G){return v!==G?(t.useProgram(G),v=G,!0):!1}const Ie={[Ur]:t.FUNC_ADD,[lM]:t.FUNC_SUBTRACT,[cM]:t.FUNC_REVERSE_SUBTRACT};Ie[uM]=t.MIN,Ie[hM]=t.MAX;const Be={[dM]:t.ZERO,[fM]:t.ONE,[pM]:t.SRC_COLOR,[fd]:t.SRC_ALPHA,[yM]:t.SRC_ALPHA_SATURATE,[vM]:t.DST_COLOR,[gM]:t.DST_ALPHA,[mM]:t.ONE_MINUS_SRC_COLOR,[pd]:t.ONE_MINUS_SRC_ALPHA,[xM]:t.ONE_MINUS_DST_COLOR,[_M]:t.ONE_MINUS_DST_ALPHA,[SM]:t.CONSTANT_COLOR,[MM]:t.ONE_MINUS_CONSTANT_COLOR,[wM]:t.CONSTANT_ALPHA,[EM]:t.ONE_MINUS_CONSTANT_ALPHA};function Ge(G,ge,se,Ae,ve,ce,Ue,Ye,It,mt){if(G===wi){m===!0&&(ue(t.BLEND),m=!1);return}if(m===!1&&(K(t.BLEND),m=!0),G!==aM){if(G!==f||mt!==F){if((g!==Ur||b!==Ur)&&(t.blendEquation(t.FUNC_ADD),g=Ur,b=Ur),mt)switch(G){case Gs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case dd:t.blendFunc(t.ONE,t.ONE);break;case ig:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case rg:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:at("WebGLState: Invalid blending: ",G);break}else switch(G){case Gs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case dd:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case ig:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rg:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",G);break}x=null,M=null,w=null,C=null,y.set(0,0,0),A=0,f=G,F=mt}return}ve=ve||ge,ce=ce||se,Ue=Ue||Ae,(ge!==g||ve!==b)&&(t.blendEquationSeparate(Ie[ge],Ie[ve]),g=ge,b=ve),(se!==x||Ae!==M||ce!==w||Ue!==C)&&(t.blendFuncSeparate(Be[se],Be[Ae],Be[ce],Be[Ue]),x=se,M=Ae,w=ce,C=Ue),(Ye.equals(y)===!1||It!==A)&&(t.blendColor(Ye.r,Ye.g,Ye.b,It),y.copy(Ye),A=It),f=G,F=!1}function fe(G,ge){G.side===mn?ue(t.CULL_FACE):K(t.CULL_FACE);let se=G.side===Tn;ge&&(se=!se),re(se),G.blending===Gs&&G.transparent===!1?Ge(wi):Ge(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),s.setMask(G.colorWrite);const Ae=G.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),z(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?K(t.SAMPLE_ALPHA_TO_COVERAGE):ue(t.SAMPLE_ALPHA_TO_COVERAGE)}function re(G){N!==G&&(G?t.frontFace(t.CW):t.frontFace(t.CCW),N=G)}function he(G){G!==sM?(K(t.CULL_FACE),G!==D&&(G===ng?t.cullFace(t.BACK):G===oM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ue(t.CULL_FACE),D=G}function De(G){G!==W&&(P&&t.lineWidth(G),W=G)}function z(G,ge,se){G?(K(t.POLYGON_OFFSET_FILL),(q!==ge||R!==se)&&(q=ge,R=se,o.getReversed()&&(ge=-ge),t.polygonOffset(ge,se))):ue(t.POLYGON_OFFSET_FILL)}function je(G){G?K(t.SCISSOR_TEST):ue(t.SCISSOR_TEST)}function Xe(G){G===void 0&&(G=t.TEXTURE0+U-1),j!==G&&(t.activeTexture(G),j=G)}function ht(G,ge,se){se===void 0&&(j===null?se=t.TEXTURE0+U-1:se=j);let Ae=H[se];Ae===void 0&&(Ae={type:void 0,texture:void 0},H[se]=Ae),(Ae.type!==G||Ae.texture!==ge)&&(j!==se&&(t.activeTexture(se),j=se),t.bindTexture(G,ge||Y[G]),Ae.type=G,Ae.texture=ge)}function xe(){const G=H[j];G!==void 0&&G.type!==void 0&&(t.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function st(){try{t.compressedTexImage2D(...arguments)}catch(G){at("WebGLState:",G)}}function T(){try{t.compressedTexImage3D(...arguments)}catch(G){at("WebGLState:",G)}}function S(){try{t.texSubImage2D(...arguments)}catch(G){at("WebGLState:",G)}}function $(){try{t.texSubImage3D(...arguments)}catch(G){at("WebGLState:",G)}}function oe(){try{t.compressedTexSubImage2D(...arguments)}catch(G){at("WebGLState:",G)}}function le(){try{t.compressedTexSubImage3D(...arguments)}catch(G){at("WebGLState:",G)}}function pe(){try{t.texStorage2D(...arguments)}catch(G){at("WebGLState:",G)}}function ye(){try{t.texStorage3D(...arguments)}catch(G){at("WebGLState:",G)}}function ie(){try{t.texImage2D(...arguments)}catch(G){at("WebGLState:",G)}}function ae(){try{t.texImage3D(...arguments)}catch(G){at("WebGLState:",G)}}function Te(G){return d[G]!==void 0?d[G]:t.getParameter(G)}function Re(G,ge){d[G]!==ge&&(t.pixelStorei(G,ge),d[G]=ge)}function _e(G){te.equals(G)===!1&&(t.scissor(G.x,G.y,G.z,G.w),te.copy(G))}function me(G){J.equals(G)===!1&&(t.viewport(G.x,G.y,G.z,G.w),J.copy(G))}function qe(G,ge){let se=c.get(ge);se===void 0&&(se=new WeakMap,c.set(ge,se));let Ae=se.get(G);Ae===void 0&&(Ae=t.getUniformBlockIndex(ge,G.name),se.set(G,Ae))}function Ze(G,ge){const Ae=c.get(ge).get(G);l.get(ge)!==Ae&&(t.uniformBlockBinding(ge,Ae,G.__bindingPointIndex),l.set(ge,Ae))}function dt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,H={},u={},p=new WeakMap,_=[],v=null,m=!1,f=null,g=null,x=null,M=null,b=null,w=null,C=null,y=new Qe(0,0,0),A=0,F=!1,N=null,D=null,W=null,q=null,R=null,te.set(0,0,t.canvas.width,t.canvas.height),J.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:K,disable:ue,bindFramebuffer:Se,drawBuffers:Me,useProgram:We,setBlending:Ge,setMaterial:fe,setFlipSided:re,setCullFace:he,setLineWidth:De,setPolygonOffset:z,setScissorTest:je,activeTexture:Xe,bindTexture:ht,unbindTexture:xe,compressedTexImage2D:st,compressedTexImage3D:T,texImage2D:ie,texImage3D:ae,pixelStorei:Re,getParameter:Te,updateUBOMapping:qe,uniformBlockBinding:Ze,texStorage2D:pe,texStorage3D:ye,texSubImage2D:S,texSubImage3D:$,compressedTexSubImage2D:oe,compressedTexSubImage3D:le,scissor:_e,viewport:me,reset:dt}}function L2(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,S){return _?new OffscreenCanvas(T,S):_a("canvas")}function m(T,S,$){let oe=1;const le=st(T);if((le.width>$||le.height>$)&&(oe=$/Math.max(le.width,le.height)),oe<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const pe=Math.floor(oe*le.width),ye=Math.floor(oe*le.height);u===void 0&&(u=v(pe,ye));const ie=S?v(pe,ye):u;return ie.width=pe,ie.height=ye,ie.getContext("2d").drawImage(T,0,0,pe,ye),Ve("WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+pe+"x"+ye+")."),ie}else return"data"in T&&Ve("WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),T;return T}function f(T){return T.generateMipmaps}function g(T){t.generateMipmap(T)}function x(T){return T.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?t.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function M(T,S,$,oe,le,pe=!1){if(T!==null){if(t[T]!==void 0)return t[T];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ye;oe&&(ye=e.get("EXT_texture_norm16"),ye||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=S;if(S===t.RED&&($===t.FLOAT&&(ie=t.R32F),$===t.HALF_FLOAT&&(ie=t.R16F),$===t.UNSIGNED_BYTE&&(ie=t.R8),$===t.UNSIGNED_SHORT&&ye&&(ie=ye.R16_EXT),$===t.SHORT&&ye&&(ie=ye.R16_SNORM_EXT)),S===t.RED_INTEGER&&($===t.UNSIGNED_BYTE&&(ie=t.R8UI),$===t.UNSIGNED_SHORT&&(ie=t.R16UI),$===t.UNSIGNED_INT&&(ie=t.R32UI),$===t.BYTE&&(ie=t.R8I),$===t.SHORT&&(ie=t.R16I),$===t.INT&&(ie=t.R32I)),S===t.RG&&($===t.FLOAT&&(ie=t.RG32F),$===t.HALF_FLOAT&&(ie=t.RG16F),$===t.UNSIGNED_BYTE&&(ie=t.RG8),$===t.UNSIGNED_SHORT&&ye&&(ie=ye.RG16_EXT),$===t.SHORT&&ye&&(ie=ye.RG16_SNORM_EXT)),S===t.RG_INTEGER&&($===t.UNSIGNED_BYTE&&(ie=t.RG8UI),$===t.UNSIGNED_SHORT&&(ie=t.RG16UI),$===t.UNSIGNED_INT&&(ie=t.RG32UI),$===t.BYTE&&(ie=t.RG8I),$===t.SHORT&&(ie=t.RG16I),$===t.INT&&(ie=t.RG32I)),S===t.RGB_INTEGER&&($===t.UNSIGNED_BYTE&&(ie=t.RGB8UI),$===t.UNSIGNED_SHORT&&(ie=t.RGB16UI),$===t.UNSIGNED_INT&&(ie=t.RGB32UI),$===t.BYTE&&(ie=t.RGB8I),$===t.SHORT&&(ie=t.RGB16I),$===t.INT&&(ie=t.RGB32I)),S===t.RGBA_INTEGER&&($===t.UNSIGNED_BYTE&&(ie=t.RGBA8UI),$===t.UNSIGNED_SHORT&&(ie=t.RGBA16UI),$===t.UNSIGNED_INT&&(ie=t.RGBA32UI),$===t.BYTE&&(ie=t.RGBA8I),$===t.SHORT&&(ie=t.RGBA16I),$===t.INT&&(ie=t.RGBA32I)),S===t.RGB&&($===t.UNSIGNED_SHORT&&ye&&(ie=ye.RGB16_EXT),$===t.SHORT&&ye&&(ie=ye.RGB16_SNORM_EXT),$===t.UNSIGNED_INT_5_9_9_9_REV&&(ie=t.RGB9_E5),$===t.UNSIGNED_INT_10F_11F_11F_REV&&(ie=t.R11F_G11F_B10F)),S===t.RGBA){const ae=pe?Sc:rt.getTransfer(le);$===t.FLOAT&&(ie=t.RGBA32F),$===t.HALF_FLOAT&&(ie=t.RGBA16F),$===t.UNSIGNED_BYTE&&(ie=ae===ft?t.SRGB8_ALPHA8:t.RGBA8),$===t.UNSIGNED_SHORT&&ye&&(ie=ye.RGBA16_EXT),$===t.SHORT&&ye&&(ie=ye.RGBA16_SNORM_EXT),$===t.UNSIGNED_SHORT_4_4_4_4&&(ie=t.RGBA4),$===t.UNSIGNED_SHORT_5_5_5_1&&(ie=t.RGB5_A1)}return(ie===t.R16F||ie===t.R32F||ie===t.RG16F||ie===t.RG32F||ie===t.RGBA16F||ie===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function b(T,S){let $;return T?S===null||S===bi||S===ma?$=t.DEPTH24_STENCIL8:S===xi?$=t.DEPTH32F_STENCIL8:S===pa&&($=t.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===bi||S===ma?$=t.DEPTH_COMPONENT24:S===xi?$=t.DEPTH_COMPONENT32F:S===pa&&($=t.DEPTH_COMPONENT16),$}function w(T,S){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==Et&&T.minFilter!==Yt?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function C(T){const S=T.target;S.removeEventListener("dispose",C),A(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&d.delete(S)}function y(T){const S=T.target;S.removeEventListener("dispose",y),N(S)}function A(T){const S=i.get(T);if(S.__webglInit===void 0)return;const $=T.source,oe=p.get($);if(oe){const le=oe[S.__cacheKey];le.usedTimes--,le.usedTimes===0&&F(T),Object.keys(oe).length===0&&p.delete($)}i.remove(T)}function F(T){const S=i.get(T);t.deleteTexture(S.__webglTexture);const $=T.source,oe=p.get($);delete oe[S.__cacheKey],o.memory.textures--}function N(T){const S=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(S.__webglFramebuffer[oe]))for(let le=0;le<S.__webglFramebuffer[oe].length;le++)t.deleteFramebuffer(S.__webglFramebuffer[oe][le]);else t.deleteFramebuffer(S.__webglFramebuffer[oe]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[oe])}else{if(Array.isArray(S.__webglFramebuffer))for(let oe=0;oe<S.__webglFramebuffer.length;oe++)t.deleteFramebuffer(S.__webglFramebuffer[oe]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let oe=0;oe<S.__webglColorRenderbuffer.length;oe++)S.__webglColorRenderbuffer[oe]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[oe]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const $=T.textures;for(let oe=0,le=$.length;oe<le;oe++){const pe=i.get($[oe]);pe.__webglTexture&&(t.deleteTexture(pe.__webglTexture),o.memory.textures--),i.remove($[oe])}i.remove(T)}let D=0;function W(){D=0}function q(){return D}function R(T){D=T}function U(){const T=D;return T>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),D+=1,T}function P(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function L(T,S){const $=i.get(T);if(T.isVideoTexture&&ht(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&$.__version!==T.version){const oe=T.image;if(oe===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{ue($,T,S);return}}else T.isExternalTexture&&($.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,$.__webglTexture,t.TEXTURE0+S)}function V(T,S){const $=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&$.__version!==T.version){ue($,T,S);return}else T.isExternalTexture&&($.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,$.__webglTexture,t.TEXTURE0+S)}function j(T,S){const $=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&$.__version!==T.version){ue($,T,S);return}n.bindTexture(t.TEXTURE_3D,$.__webglTexture,t.TEXTURE0+S)}function H(T,S){const $=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&$.__version!==T.version){Se($,T,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture,t.TEXTURE0+S)}const I={[Md]:t.REPEAT,[ki]:t.CLAMP_TO_EDGE,[wd]:t.MIRRORED_REPEAT},ne={[Et]:t.NEAREST,[AM]:t.NEAREST_MIPMAP_NEAREST,[Za]:t.NEAREST_MIPMAP_LINEAR,[Yt]:t.LINEAR,[Du]:t.LINEAR_MIPMAP_NEAREST,[zr]:t.LINEAR_MIPMAP_LINEAR},te={[PM]:t.NEVER,[UM]:t.ALWAYS,[LM]:t.LESS,[dp]:t.LEQUAL,[DM]:t.EQUAL,[fp]:t.GEQUAL,[NM]:t.GREATER,[IM]:t.NOTEQUAL};function J(T,S){if(S.type===xi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Yt||S.magFilter===Du||S.magFilter===Za||S.magFilter===zr||S.minFilter===Yt||S.minFilter===Du||S.minFilter===Za||S.minFilter===zr)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(T,t.TEXTURE_WRAP_S,I[S.wrapS]),t.texParameteri(T,t.TEXTURE_WRAP_T,I[S.wrapT]),(T===t.TEXTURE_3D||T===t.TEXTURE_2D_ARRAY)&&t.texParameteri(T,t.TEXTURE_WRAP_R,I[S.wrapR]),t.texParameteri(T,t.TEXTURE_MAG_FILTER,ne[S.magFilter]),t.texParameteri(T,t.TEXTURE_MIN_FILTER,ne[S.minFilter]),S.compareFunction&&(t.texParameteri(T,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(T,t.TEXTURE_COMPARE_FUNC,te[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Et||S.minFilter!==Za&&S.minFilter!==zr||S.type===xi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");t.texParameterf(T,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function O(T,S){let $=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",C));const oe=S.source;let le=p.get(oe);le===void 0&&(le={},p.set(oe,le));const pe=P(S);if(pe!==T.__cacheKey){le[pe]===void 0&&(le[pe]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,$=!0),le[pe].usedTimes++;const ye=le[T.__cacheKey];ye!==void 0&&(le[T.__cacheKey].usedTimes--,ye.usedTimes===0&&F(S)),T.__cacheKey=pe,T.__webglTexture=le[pe].texture}return $}function Y(T,S,$){return Math.floor(Math.floor(T/$)/S)}function K(T,S,$,oe){const pe=T.updateRanges;if(pe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,$,oe,S.data);else{pe.sort((Re,_e)=>Re.start-_e.start);let ye=0;for(let Re=1;Re<pe.length;Re++){const _e=pe[ye],me=pe[Re],qe=_e.start+_e.count,Ze=Y(me.start,S.width,4),dt=Y(_e.start,S.width,4);me.start<=qe+1&&Ze===dt&&Y(me.start+me.count-1,S.width,4)===Ze?_e.count=Math.max(_e.count,me.start+me.count-_e.start):(++ye,pe[ye]=me)}pe.length=ye+1;const ie=n.getParameter(t.UNPACK_ROW_LENGTH),ae=n.getParameter(t.UNPACK_SKIP_PIXELS),Te=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let Re=0,_e=pe.length;Re<_e;Re++){const me=pe[Re],qe=Math.floor(me.start/4),Ze=Math.ceil(me.count/4),dt=qe%S.width,G=Math.floor(qe/S.width),ge=Ze,se=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,dt),n.pixelStorei(t.UNPACK_SKIP_ROWS,G),n.texSubImage2D(t.TEXTURE_2D,0,dt,G,ge,se,$,oe,S.data)}T.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,ie),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ae),n.pixelStorei(t.UNPACK_SKIP_ROWS,Te)}}function ue(T,S,$){let oe=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(oe=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(oe=t.TEXTURE_3D);const le=O(T,S),pe=S.source;n.bindTexture(oe,T.__webglTexture,t.TEXTURE0+$);const ye=i.get(pe);if(pe.version!==ye.__version||le===!0){if(n.activeTexture(t.TEXTURE0+$),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const se=rt.getPrimaries(rt.workingColorSpace),Ae=S.colorSpace===ar?null:rt.getPrimaries(S.colorSpace),ve=S.colorSpace===ar||se===Ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment);let ae=m(S.image,!1,r.maxTextureSize);ae=xe(S,ae);const Te=s.convert(S.format,S.colorSpace),Re=s.convert(S.type);let _e=M(S.internalFormat,Te,Re,S.normalized,S.colorSpace,S.isVideoTexture);J(oe,S);let me;const qe=S.mipmaps,Ze=S.isVideoTexture!==!0,dt=ye.__version===void 0||le===!0,G=pe.dataReady,ge=w(S,ae);if(S.isDepthTexture)_e=b(S.format===Vr,S.type),dt&&(Ze?n.texStorage2D(t.TEXTURE_2D,1,_e,ae.width,ae.height):n.texImage2D(t.TEXTURE_2D,0,_e,ae.width,ae.height,0,Te,Re,null));else if(S.isDataTexture)if(qe.length>0){Ze&&dt&&n.texStorage2D(t.TEXTURE_2D,ge,_e,qe[0].width,qe[0].height);for(let se=0,Ae=qe.length;se<Ae;se++)me=qe[se],Ze?G&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,me.width,me.height,Te,Re,me.data):n.texImage2D(t.TEXTURE_2D,se,_e,me.width,me.height,0,Te,Re,me.data);S.generateMipmaps=!1}else Ze?(dt&&n.texStorage2D(t.TEXTURE_2D,ge,_e,ae.width,ae.height),G&&K(S,ae,Te,Re)):n.texImage2D(t.TEXTURE_2D,0,_e,ae.width,ae.height,0,Te,Re,ae.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ze&&dt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,_e,qe[0].width,qe[0].height,ae.depth);for(let se=0,Ae=qe.length;se<Ae;se++)if(me=qe[se],S.format!==oi)if(Te!==null)if(Ze){if(G)if(S.layerUpdates.size>0){const ve=Hg(me.width,me.height,S.format,S.type);for(const ce of S.layerUpdates){const Ue=me.data.subarray(ce*ve/me.data.BYTES_PER_ELEMENT,(ce+1)*ve/me.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,ce,me.width,me.height,1,Te,Ue)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,0,me.width,me.height,ae.depth,Te,me.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,se,_e,me.width,me.height,ae.depth,0,me.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ze?G&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,0,me.width,me.height,ae.depth,Te,Re,me.data):n.texImage3D(t.TEXTURE_2D_ARRAY,se,_e,me.width,me.height,ae.depth,0,Te,Re,me.data)}else{Ze&&dt&&n.texStorage2D(t.TEXTURE_2D,ge,_e,qe[0].width,qe[0].height);for(let se=0,Ae=qe.length;se<Ae;se++)me=qe[se],S.format!==oi?Te!==null?Ze?G&&n.compressedTexSubImage2D(t.TEXTURE_2D,se,0,0,me.width,me.height,Te,me.data):n.compressedTexImage2D(t.TEXTURE_2D,se,_e,me.width,me.height,0,me.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?G&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,me.width,me.height,Te,Re,me.data):n.texImage2D(t.TEXTURE_2D,se,_e,me.width,me.height,0,Te,Re,me.data)}else if(S.isDataArrayTexture)if(Ze){if(dt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,_e,ae.width,ae.height,ae.depth),G)if(S.layerUpdates.size>0){const se=Hg(ae.width,ae.height,S.format,S.type);for(const Ae of S.layerUpdates){const ve=ae.data.subarray(Ae*se/ae.data.BYTES_PER_ELEMENT,(Ae+1)*se/ae.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Ae,ae.width,ae.height,1,Te,Re,ve)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Te,Re,ae.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,_e,ae.width,ae.height,ae.depth,0,Te,Re,ae.data);else if(S.isData3DTexture)Ze?(dt&&n.texStorage3D(t.TEXTURE_3D,ge,_e,ae.width,ae.height,ae.depth),G&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Te,Re,ae.data)):n.texImage3D(t.TEXTURE_3D,0,_e,ae.width,ae.height,ae.depth,0,Te,Re,ae.data);else if(S.isFramebufferTexture){if(dt)if(Ze)n.texStorage2D(t.TEXTURE_2D,ge,_e,ae.width,ae.height);else{let se=ae.width,Ae=ae.height;for(let ve=0;ve<ge;ve++)n.texImage2D(t.TEXTURE_2D,ve,_e,se,Ae,0,Te,Re,null),se>>=1,Ae>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in t){const se=t.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),ae.parentNode!==se){se.appendChild(ae),d.add(S),se.onpaint=Ye=>{const It=Ye.changedElements;for(const mt of d)It.includes(mt.image)&&(mt.needsUpdate=!0)},se.requestPaint();return}const Ae=0,ve=t.RGBA,ce=t.RGBA,Ue=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,Ae,ve,ce,Ue,ae),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(qe.length>0){if(Ze&&dt){const se=st(qe[0]);n.texStorage2D(t.TEXTURE_2D,ge,_e,se.width,se.height)}for(let se=0,Ae=qe.length;se<Ae;se++)me=qe[se],Ze?G&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,Te,Re,me):n.texImage2D(t.TEXTURE_2D,se,_e,Te,Re,me);S.generateMipmaps=!1}else if(Ze){if(dt){const se=st(ae);n.texStorage2D(t.TEXTURE_2D,ge,_e,se.width,se.height)}G&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Te,Re,ae)}else n.texImage2D(t.TEXTURE_2D,0,_e,Te,Re,ae);f(S)&&g(oe),ye.__version=pe.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function Se(T,S,$){if(S.image.length!==6)return;const oe=O(T,S),le=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,T.__webglTexture,t.TEXTURE0+$);const pe=i.get(le);if(le.version!==pe.__version||oe===!0){n.activeTexture(t.TEXTURE0+$);const ye=rt.getPrimaries(rt.workingColorSpace),ie=S.colorSpace===ar?null:rt.getPrimaries(S.colorSpace),ae=S.colorSpace===ar||ye===ie?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);const Te=S.isCompressedTexture||S.image[0].isCompressedTexture,Re=S.image[0]&&S.image[0].isDataTexture,_e=[];for(let ce=0;ce<6;ce++)!Te&&!Re?_e[ce]=m(S.image[ce],!0,r.maxCubemapSize):_e[ce]=Re?S.image[ce].image:S.image[ce],_e[ce]=xe(S,_e[ce]);const me=_e[0],qe=s.convert(S.format,S.colorSpace),Ze=s.convert(S.type),dt=M(S.internalFormat,qe,Ze,S.normalized,S.colorSpace),G=S.isVideoTexture!==!0,ge=pe.__version===void 0||oe===!0,se=le.dataReady;let Ae=w(S,me);J(t.TEXTURE_CUBE_MAP,S);let ve;if(Te){G&&ge&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ae,dt,me.width,me.height);for(let ce=0;ce<6;ce++){ve=_e[ce].mipmaps;for(let Ue=0;Ue<ve.length;Ue++){const Ye=ve[Ue];S.format!==oi?qe!==null?G?se&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue,0,0,Ye.width,Ye.height,qe,Ye.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue,dt,Ye.width,Ye.height,0,Ye.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue,0,0,Ye.width,Ye.height,qe,Ze,Ye.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue,dt,Ye.width,Ye.height,0,qe,Ze,Ye.data)}}}else{if(ve=S.mipmaps,G&&ge){ve.length>0&&Ae++;const ce=st(_e[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Ae,dt,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(Re){G?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,_e[ce].width,_e[ce].height,qe,Ze,_e[ce].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,dt,_e[ce].width,_e[ce].height,0,qe,Ze,_e[ce].data);for(let Ue=0;Ue<ve.length;Ue++){const It=ve[Ue].image[ce].image;G?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue+1,0,0,It.width,It.height,qe,Ze,It.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue+1,dt,It.width,It.height,0,qe,Ze,It.data)}}else{G?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,qe,Ze,_e[ce]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,dt,qe,Ze,_e[ce]);for(let Ue=0;Ue<ve.length;Ue++){const Ye=ve[Ue];G?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue+1,0,0,qe,Ze,Ye.image[ce]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue+1,dt,qe,Ze,Ye.image[ce])}}}f(S)&&g(t.TEXTURE_CUBE_MAP),pe.__version=le.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function Me(T,S,$,oe,le,pe){const ye=s.convert($.format,$.colorSpace),ie=s.convert($.type),ae=M($.internalFormat,ye,ie,$.normalized,$.colorSpace),Te=i.get(S),Re=i.get($);if(Re.__renderTarget=S,!Te.__hasExternalTextures){const _e=Math.max(1,S.width>>pe),me=Math.max(1,S.height>>pe);le===t.TEXTURE_3D||le===t.TEXTURE_2D_ARRAY?n.texImage3D(le,pe,ae,_e,me,S.depth,0,ye,ie,null):n.texImage2D(le,pe,ae,_e,me,0,ye,ie,null)}n.bindFramebuffer(t.FRAMEBUFFER,T),Xe(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,oe,le,Re.__webglTexture,0,je(S)):(le===t.TEXTURE_2D||le>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,oe,le,Re.__webglTexture,pe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function We(T,S,$){if(t.bindRenderbuffer(t.RENDERBUFFER,T),S.depthBuffer){const oe=S.depthTexture,le=oe&&oe.isDepthTexture?oe.type:null,pe=b(S.stencilBuffer,le),ye=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Xe(S)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,je(S),pe,S.width,S.height):$?t.renderbufferStorageMultisample(t.RENDERBUFFER,je(S),pe,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,pe,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ye,t.RENDERBUFFER,T)}else{const oe=S.textures;for(let le=0;le<oe.length;le++){const pe=oe[le],ye=s.convert(pe.format,pe.colorSpace),ie=s.convert(pe.type),ae=M(pe.internalFormat,ye,ie,pe.normalized,pe.colorSpace);Xe(S)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,je(S),ae,S.width,S.height):$?t.renderbufferStorageMultisample(t.RENDERBUFFER,je(S),ae,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,ae,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ie(T,S,$){const oe=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const le=i.get(S.depthTexture);if(le.__renderTarget=S,(!le.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),oe){if(le.__webglInit===void 0&&(le.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),le.__webglTexture===void 0){le.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,le.__webglTexture),J(t.TEXTURE_CUBE_MAP,S.depthTexture);const Te=s.convert(S.depthTexture.format),Re=s.convert(S.depthTexture.type);let _e;S.depthTexture.format===Wi?_e=t.DEPTH_COMPONENT24:S.depthTexture.format===Vr&&(_e=t.DEPTH24_STENCIL8);for(let me=0;me<6;me++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,_e,S.width,S.height,0,Te,Re,null)}}else L(S.depthTexture,0);const pe=le.__webglTexture,ye=je(S),ie=oe?t.TEXTURE_CUBE_MAP_POSITIVE_X+$:t.TEXTURE_2D,ae=S.depthTexture.format===Vr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(S.depthTexture.format===Wi)Xe(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ae,ie,pe,0,ye):t.framebufferTexture2D(t.FRAMEBUFFER,ae,ie,pe,0);else if(S.depthTexture.format===Vr)Xe(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ae,ie,pe,0,ye):t.framebufferTexture2D(t.FRAMEBUFFER,ae,ie,pe,0);else throw new Error("Unknown depthTexture format")}function Be(T){const S=i.get(T),$=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){const oe=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),oe){const le=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,oe.removeEventListener("dispose",le)};oe.addEventListener("dispose",le),S.__depthDisposeCallback=le}S.__boundDepthTexture=oe}if(T.depthTexture&&!S.__autoAllocateDepthBuffer)if($)for(let oe=0;oe<6;oe++)Ie(S.__webglFramebuffer[oe],T,oe);else{const oe=T.texture.mipmaps;oe&&oe.length>0?Ie(S.__webglFramebuffer[0],T,0):Ie(S.__webglFramebuffer,T,0)}else if($){S.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[oe]),S.__webglDepthbuffer[oe]===void 0)S.__webglDepthbuffer[oe]=t.createRenderbuffer(),We(S.__webglDepthbuffer[oe],T,!1);else{const le=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=S.__webglDepthbuffer[oe];t.bindRenderbuffer(t.RENDERBUFFER,pe),t.framebufferRenderbuffer(t.FRAMEBUFFER,le,t.RENDERBUFFER,pe)}}else{const oe=T.texture.mipmaps;if(oe&&oe.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),We(S.__webglDepthbuffer,T,!1);else{const le=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,pe),t.framebufferRenderbuffer(t.FRAMEBUFFER,le,t.RENDERBUFFER,pe)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ge(T,S,$){const oe=i.get(T);S!==void 0&&Me(oe.__webglFramebuffer,T,T.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),$!==void 0&&Be(T)}function fe(T){const S=T.texture,$=i.get(T),oe=i.get(S);T.addEventListener("dispose",y);const le=T.textures,pe=T.isWebGLCubeRenderTarget===!0,ye=le.length>1;if(ye||(oe.__webglTexture===void 0&&(oe.__webglTexture=t.createTexture()),oe.__version=S.version,o.memory.textures++),pe){$.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer[ie]=[];for(let ae=0;ae<S.mipmaps.length;ae++)$.__webglFramebuffer[ie][ae]=t.createFramebuffer()}else $.__webglFramebuffer[ie]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer=[];for(let ie=0;ie<S.mipmaps.length;ie++)$.__webglFramebuffer[ie]=t.createFramebuffer()}else $.__webglFramebuffer=t.createFramebuffer();if(ye)for(let ie=0,ae=le.length;ie<ae;ie++){const Te=i.get(le[ie]);Te.__webglTexture===void 0&&(Te.__webglTexture=t.createTexture(),o.memory.textures++)}if(T.samples>0&&Xe(T)===!1){$.__webglMultisampledFramebuffer=t.createFramebuffer(),$.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ie=0;ie<le.length;ie++){const ae=le[ie];$.__webglColorRenderbuffer[ie]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,$.__webglColorRenderbuffer[ie]);const Te=s.convert(ae.format,ae.colorSpace),Re=s.convert(ae.type),_e=M(ae.internalFormat,Te,Re,ae.normalized,ae.colorSpace,T.isXRRenderTarget===!0),me=je(T);t.renderbufferStorageMultisample(t.RENDERBUFFER,me,_e,T.width,T.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,$.__webglColorRenderbuffer[ie])}t.bindRenderbuffer(t.RENDERBUFFER,null),T.depthBuffer&&($.__webglDepthRenderbuffer=t.createRenderbuffer(),We($.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(pe){n.bindTexture(t.TEXTURE_CUBE_MAP,oe.__webglTexture),J(t.TEXTURE_CUBE_MAP,S);for(let ie=0;ie<6;ie++)if(S.mipmaps&&S.mipmaps.length>0)for(let ae=0;ae<S.mipmaps.length;ae++)Me($.__webglFramebuffer[ie][ae],T,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ae);else Me($.__webglFramebuffer[ie],T,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);f(S)&&g(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ye){for(let ie=0,ae=le.length;ie<ae;ie++){const Te=le[ie],Re=i.get(Te);let _e=t.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(_e=T.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(_e,Re.__webglTexture),J(_e,Te),Me($.__webglFramebuffer,T,Te,t.COLOR_ATTACHMENT0+ie,_e,0),f(Te)&&g(_e)}n.unbindTexture()}else{let ie=t.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ie=T.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ie,oe.__webglTexture),J(ie,S),S.mipmaps&&S.mipmaps.length>0)for(let ae=0;ae<S.mipmaps.length;ae++)Me($.__webglFramebuffer[ae],T,S,t.COLOR_ATTACHMENT0,ie,ae);else Me($.__webglFramebuffer,T,S,t.COLOR_ATTACHMENT0,ie,0);f(S)&&g(ie),n.unbindTexture()}T.depthBuffer&&Be(T)}function re(T){const S=T.textures;for(let $=0,oe=S.length;$<oe;$++){const le=S[$];if(f(le)){const pe=x(T),ye=i.get(le).__webglTexture;n.bindTexture(pe,ye),g(pe),n.unbindTexture()}}}const he=[],De=[];function z(T){if(T.samples>0){if(Xe(T)===!1){const S=T.textures,$=T.width,oe=T.height;let le=t.COLOR_BUFFER_BIT;const pe=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ye=i.get(T),ie=S.length>1;if(ie)for(let Te=0;Te<S.length;Te++)n.bindFramebuffer(t.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ye.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const ae=T.texture.mipmaps;ae&&ae.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Te=0;Te<S.length;Te++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(le|=t.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(le|=t.STENCIL_BUFFER_BIT)),ie){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ye.__webglColorRenderbuffer[Te]);const Re=i.get(S[Te]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Re,0)}t.blitFramebuffer(0,0,$,oe,0,0,$,oe,le,t.NEAREST),l===!0&&(he.length=0,De.length=0,he.push(t.COLOR_ATTACHMENT0+Te),T.depthBuffer&&T.resolveDepthBuffer===!1&&(he.push(pe),De.push(pe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,De)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,he))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ie)for(let Te=0;Te<S.length;Te++){n.bindFramebuffer(t.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.RENDERBUFFER,ye.__webglColorRenderbuffer[Te]);const Re=i.get(S[Te]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ye.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.TEXTURE_2D,Re,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const S=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function je(T){return Math.min(r.maxSamples,T.samples)}function Xe(T){const S=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ht(T){const S=o.render.frame;h.get(T)!==S&&(h.set(T,S),T.update())}function xe(T,S){const $=T.colorSpace,oe=T.format,le=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||$!==so&&$!==ar&&(rt.getTransfer($)===ft?(oe!==oi||le!==Un)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",$)),S}function st(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=W,this.getTextureUnits=q,this.setTextureUnits=R,this.setTexture2D=L,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=H,this.rebindTextures=Ge,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=z,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=Xe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function D2(t,e){function n(i,r=ar){let s;const o=rt.getTransfer(r);if(i===Un)return t.UNSIGNED_BYTE;if(i===ap)return t.UNSIGNED_SHORT_4_4_4_4;if(i===lp)return t.UNSIGNED_SHORT_5_5_5_1;if(i===fx)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===px)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===hx)return t.BYTE;if(i===dx)return t.SHORT;if(i===pa)return t.UNSIGNED_SHORT;if(i===op)return t.INT;if(i===bi)return t.UNSIGNED_INT;if(i===xi)return t.FLOAT;if(i===On)return t.HALF_FLOAT;if(i===mx)return t.ALPHA;if(i===gx)return t.RGB;if(i===oi)return t.RGBA;if(i===Wi)return t.DEPTH_COMPONENT;if(i===Vr)return t.DEPTH_STENCIL;if(i===_x)return t.RED;if(i===cp)return t.RED_INTEGER;if(i===Qr)return t.RG;if(i===up)return t.RG_INTEGER;if(i===hp)return t.RGBA_INTEGER;if(i===Hl||i===Gl||i===Wl||i===jl)if(o===ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Hl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Gl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===jl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Hl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Gl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===jl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ed||i===bd||i===Td||i===Ad)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ed)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Td)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ad)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Cd||i===Rd||i===Pd||i===Ld||i===Dd||i===xc||i===Nd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Cd||i===Rd)return o===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Pd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ld)return s.COMPRESSED_R11_EAC;if(i===Dd)return s.COMPRESSED_SIGNED_R11_EAC;if(i===xc)return s.COMPRESSED_RG11_EAC;if(i===Nd)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Id||i===Ud||i===Fd||i===kd||i===Od||i===Bd||i===zd||i===Vd||i===Hd||i===Gd||i===Wd||i===jd||i===Xd||i===qd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Id)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ud)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===kd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Od)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Hd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Gd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===jd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===$d||i===Yd||i===Kd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===$d)return o===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Kd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zd||i===Qd||i===yc||i===Jd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Zd)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Qd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Jd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ma?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const N2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,I2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class U2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new bx(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new un({vertexShader:N2,fragmentShader:I2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new cn(new Ra(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F2 extends Ar{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,_=null;const v=typeof XRWebGLBinding<"u",m=new U2,f={},g=n.getContextAttributes();let x=null,M=null;const b=[],w=[],C=new Oe;let y=null;const A=new Nn;A.viewport=new Nt;const F=new Nn;F.viewport=new Nt;const N=[A,F],D=new Hw;let W=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let Y=b[O];return Y===void 0&&(Y=new Ou,b[O]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(O){let Y=b[O];return Y===void 0&&(Y=new Ou,b[O]=Y),Y.getGripSpace()},this.getHand=function(O){let Y=b[O];return Y===void 0&&(Y=new Ou,b[O]=Y),Y.getHandSpace()};function R(O){const Y=w.indexOf(O.inputSource);if(Y===-1)return;const K=b[Y];K!==void 0&&(K.update(O.inputSource,O.frame,c||o),K.dispatchEvent({type:O.type,data:O.inputSource}))}function U(){r.removeEventListener("select",R),r.removeEventListener("selectstart",R),r.removeEventListener("selectend",R),r.removeEventListener("squeeze",R),r.removeEventListener("squeezestart",R),r.removeEventListener("squeezeend",R),r.removeEventListener("end",U),r.removeEventListener("inputsourceschange",P);for(let O=0;O<b.length;O++){const Y=w[O];Y!==null&&(w[O]=null,b[O].disconnect(Y))}W=null,q=null,m.reset();for(const O in f)delete f[O];e.setRenderTarget(x),p=null,u=null,d=null,r=null,M=null,J.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,n)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(O){if(r=O,r!==null){if(x=e.getRenderTarget(),r.addEventListener("select",R),r.addEventListener("selectstart",R),r.addEventListener("selectend",R),r.addEventListener("squeeze",R),r.addEventListener("squeezestart",R),r.addEventListener("squeezeend",R),r.addEventListener("end",U),r.addEventListener("inputsourceschange",P),g.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,ue=null,Se=null;g.depth&&(Se=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,K=g.stencil?Vr:Wi,ue=g.stencil?ma:bi);const Me={colorFormat:n.RGBA8,depthFormat:Se,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Me),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new An(u.textureWidth,u.textureHeight,{format:oi,type:Un,depthTexture:new oo(u.textureWidth,u.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const K={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,K),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new An(p.framebufferWidth,p.framebufferHeight,{format:oi,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),J.setContext(r),J.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function P(O){for(let Y=0;Y<O.removed.length;Y++){const K=O.removed[Y],ue=w.indexOf(K);ue>=0&&(w[ue]=null,b[ue].disconnect(K))}for(let Y=0;Y<O.added.length;Y++){const K=O.added[Y];let ue=w.indexOf(K);if(ue===-1){for(let Me=0;Me<b.length;Me++)if(Me>=w.length){w.push(K),ue=Me;break}else if(w[Me]===null){w[Me]=K,ue=Me;break}if(ue===-1)break}const Se=b[ue];Se&&Se.connect(K)}}const L=new B,V=new B;function j(O,Y,K){L.setFromMatrixPosition(Y.matrixWorld),V.setFromMatrixPosition(K.matrixWorld);const ue=L.distanceTo(V),Se=Y.projectionMatrix.elements,Me=K.projectionMatrix.elements,We=Se[14]/(Se[10]-1),Ie=Se[14]/(Se[10]+1),Be=(Se[9]+1)/Se[5],Ge=(Se[9]-1)/Se[5],fe=(Se[8]-1)/Se[0],re=(Me[8]+1)/Me[0],he=We*fe,De=We*re,z=ue/(-fe+re),je=z*-fe;if(Y.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(je),O.translateZ(z),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),Se[10]===-1)O.projectionMatrix.copy(Y.projectionMatrix),O.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Xe=We+z,ht=Ie+z,xe=he-je,st=De+(ue-je),T=Be*Ie/ht*Xe,S=Ge*Ie/ht*Xe;O.projectionMatrix.makePerspective(xe,st,T,S,Xe,ht),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function H(O,Y){Y===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(Y.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(r===null)return;let Y=O.near,K=O.far;m.texture!==null&&(m.depthNear>0&&(Y=m.depthNear),m.depthFar>0&&(K=m.depthFar)),D.near=F.near=A.near=Y,D.far=F.far=A.far=K,(W!==D.near||q!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),W=D.near,q=D.far),D.layers.mask=O.layers.mask|6,A.layers.mask=D.layers.mask&-5,F.layers.mask=D.layers.mask&-3;const ue=O.parent,Se=D.cameras;H(D,ue);for(let Me=0;Me<Se.length;Me++)H(Se[Me],ue);Se.length===2?j(D,A,F):D.projectionMatrix.copy(A.projectionMatrix),I(O,D,ue)};function I(O,Y,K){K===null?O.matrix.copy(Y.matrixWorld):(O.matrix.copy(K.matrixWorld),O.matrix.invert(),O.matrix.multiply(Y.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(Y.projectionMatrix),O.projectionMatrixInverse.copy(Y.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=va*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(O){l=O,u!==null&&(u.fixedFoveation=O),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=O)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(O){return f[O]};let ne=null;function te(O,Y){if(h=Y.getViewerPose(c||o),_=Y,h!==null){const K=h.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let ue=!1;K.length!==D.cameras.length&&(D.cameras.length=0,ue=!0);for(let Ie=0;Ie<K.length;Ie++){const Be=K[Ie];let Ge=null;if(p!==null)Ge=p.getViewport(Be);else{const re=d.getViewSubImage(u,Be);Ge=re.viewport,Ie===0&&(e.setRenderTargetTextures(M,re.colorTexture,re.depthStencilTexture),e.setRenderTarget(M))}let fe=N[Ie];fe===void 0&&(fe=new Nn,fe.layers.enable(Ie),fe.viewport=new Nt,N[Ie]=fe),fe.matrix.fromArray(Be.transform.matrix),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.projectionMatrix.fromArray(Be.projectionMatrix),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert(),fe.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),Ie===0&&(D.matrix.copy(fe.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),ue===!0&&D.cameras.push(fe)}const Se=r.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const Ie=d.getDepthInformation(K[0]);Ie&&Ie.isValid&&Ie.texture&&m.init(Ie,r.renderState)}if(Se&&Se.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let Ie=0;Ie<K.length;Ie++){const Be=K[Ie].camera;if(Be){let Ge=f[Be];Ge||(Ge=new bx,f[Be]=Ge);const fe=d.getCameraImage(Be);Ge.sourceTexture=fe}}}}for(let K=0;K<b.length;K++){const ue=w[K],Se=b[K];ue!==null&&Se!==void 0&&Se.update(ue,Y,c||o)}ne&&ne(O,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),_=null}const J=new Rx;J.setAnimationLoop(te),this.setAnimationLoop=function(O){ne=O},this.dispose=function(){}}}const k2=new He,Fx=new $e;Fx.set(-1,0,0,0,1,0,0,0,1);function O2(t,e){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Tx(t)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,g,x,M){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(s(m,f),_(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),v(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,g,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Tn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Tn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const g=e.get(f),x=g.envMap,M=g.envMapRotation;x&&(m.envMap.value=x,m.envMapRotation.value.setFromMatrix4(k2.makeRotationFromEuler(M)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Fx),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,g,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*g,m.scale.value=x*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,g){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Tn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const g=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(g.matrixWorld),m.nearDistance.value=g.shadow.camera.near,m.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function B2(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,x){const M=x.program;i.uniformBlockBinding(g,M)}function c(g,x){let M=r[g.id];M===void 0&&(_(g),M=h(g),r[g.id]=M,g.addEventListener("dispose",m));const b=x.program;i.updateUBOMapping(g,b);const w=e.render.frame;s[g.id]!==w&&(u(g),s[g.id]=w)}function h(g){const x=d();g.__bindingPointIndex=x;const M=t.createBuffer(),b=g.__size,w=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,b,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,M),M}function d(){for(let g=0;g<a;g++)if(o.indexOf(g)===-1)return o.push(g),g;return at("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(g){const x=r[g.id],M=g.uniforms,b=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let w=0,C=M.length;w<C;w++){const y=Array.isArray(M[w])?M[w]:[M[w]];for(let A=0,F=y.length;A<F;A++){const N=y[A];if(p(N,w,A,b)===!0){const D=N.__offset,W=Array.isArray(N.value)?N.value:[N.value];let q=0;for(let R=0;R<W.length;R++){const U=W[R],P=v(U);typeof U=="number"||typeof U=="boolean"?(N.__data[0]=U,t.bufferSubData(t.UNIFORM_BUFFER,D+q,N.__data)):U.isMatrix3?(N.__data[0]=U.elements[0],N.__data[1]=U.elements[1],N.__data[2]=U.elements[2],N.__data[3]=0,N.__data[4]=U.elements[3],N.__data[5]=U.elements[4],N.__data[6]=U.elements[5],N.__data[7]=0,N.__data[8]=U.elements[6],N.__data[9]=U.elements[7],N.__data[10]=U.elements[8],N.__data[11]=0):ArrayBuffer.isView(U)?N.__data.set(new U.constructor(U.buffer,U.byteOffset,N.__data.length)):(U.toArray(N.__data,q),q+=P.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,D,N.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(g,x,M,b){const w=g.value,C=x+"_"+M;if(b[C]===void 0)return typeof w=="number"||typeof w=="boolean"?b[C]=w:ArrayBuffer.isView(w)?b[C]=w.slice():b[C]=w.clone(),!0;{const y=b[C];if(typeof w=="number"||typeof w=="boolean"){if(y!==w)return b[C]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(y.equals(w)===!1)return y.copy(w),!0}}return!1}function _(g){const x=g.uniforms;let M=0;const b=16;for(let C=0,y=x.length;C<y;C++){const A=Array.isArray(x[C])?x[C]:[x[C]];for(let F=0,N=A.length;F<N;F++){const D=A[F],W=Array.isArray(D.value)?D.value:[D.value];for(let q=0,R=W.length;q<R;q++){const U=W[q],P=v(U),L=M%b,V=L%P.boundary,j=L+V;M+=V,j!==0&&b-j<P.storage&&(M+=b-j),D.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=M,M+=P.storage}}}const w=M%b;return w>0&&(M+=b-w),g.__size=M,g.__cache={},this}function v(g){const x={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(x.boundary=4,x.storage=4):g.isVector2?(x.boundary=8,x.storage=8):g.isVector3||g.isColor?(x.boundary=16,x.storage=12):g.isVector4?(x.boundary=16,x.storage=16):g.isMatrix3?(x.boundary=48,x.storage=48):g.isMatrix4?(x.boundary=64,x.storage=64):g.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(g)?(x.boundary=16,x.storage=g.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",g),x}function m(g){const x=g.target;x.removeEventListener("dispose",m);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function f(){for(const g in r)t.deleteBuffer(r[g]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}const z2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let mi=null;function V2(){return mi===null&&(mi=new Sw(z2,16,16,Qr,On),mi.name="DFG_LUT",mi.minFilter=Yt,mi.magFilter=Yt,mi.wrapS=ki,mi.wrapT=ki,mi.generateMipmaps=!1,mi.needsUpdate=!0),mi}class d0{constructor(e={}){const{canvas:n=kM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Un}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;const v=p,m=new Set([hp,up,cp]),f=new Set([Un,bi,pa,ma,ap,lp]),g=new Uint32Array(4),x=new Int32Array(4),M=new B;let b=null,w=null;const C=[],y=[];let A=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let N=!1,D=null;this._outputColorSpace=Wn;let W=0,q=0,R=null,U=-1,P=null;const L=new Nt,V=new Nt;let j=null;const H=new Qe(0);let I=0,ne=n.width,te=n.height,J=1,O=null,Y=null;const K=new Nt(0,0,ne,te),ue=new Nt(0,0,ne,te);let Se=!1;const Me=new _p;let We=!1,Ie=!1;const Be=new He,Ge=new B,fe=new Nt,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function De(){return R===null?J:1}let z=i;function je(E,X){return n.getContext(E,X)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${rp}`),n.addEventListener("webglcontextlost",ce,!1),n.addEventListener("webglcontextrestored",Ue,!1),n.addEventListener("webglcontextcreationerror",Ye,!1),z===null){const X="webgl2";if(z=je(X,E),z===null)throw je(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw at("WebGLRenderer: "+E.message),E}let Xe,ht,xe,st,T,S,$,oe,le,pe,ye,ie,ae,Te,Re,_e,me,qe,Ze,dt,G,ge,se;function Ae(){Xe=new VT(z),Xe.init(),G=new D2(z,Xe),ht=new NT(z,Xe,e,G),xe=new P2(z,Xe),ht.reversedDepthBuffer&&u&&xe.buffers.depth.setReversed(!0),st=new WT(z),T=new g2,S=new L2(z,Xe,xe,T,ht,G,st),$=new zT(F),oe=new $w(z),ge=new LT(z,oe),le=new HT(z,oe,st,ge),pe=new XT(z,le,oe,ge,st),qe=new jT(z,ht,S),Re=new IT(T),ye=new m2(F,$,Xe,ht,ge,Re),ie=new O2(F,T),ae=new v2,Te=new E2(Xe),me=new PT(F,$,xe,pe,_,l),_e=new R2(F,pe,ht),se=new B2(z,st,ht,xe),Ze=new DT(z,Xe,st),dt=new GT(z,Xe,st),st.programs=ye.programs,F.capabilities=ht,F.extensions=Xe,F.properties=T,F.renderLists=ae,F.shadowMap=_e,F.state=xe,F.info=st}Ae(),v!==Un&&(A=new $T(v,n.width,n.height,r,s));const ve=new F2(F,z);this.xr=ve,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const E=Xe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Xe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(E){E!==void 0&&(J=E,this.setSize(ne,te,!1))},this.getSize=function(E){return E.set(ne,te)},this.setSize=function(E,X,ee=!0){if(ve.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}ne=E,te=X,n.width=Math.floor(E*J),n.height=Math.floor(X*J),ee===!0&&(n.style.width=E+"px",n.style.height=X+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,E,X)},this.getDrawingBufferSize=function(E){return E.set(ne*J,te*J).floor()},this.setDrawingBufferSize=function(E,X,ee){ne=E,te=X,J=ee,n.width=Math.floor(E*ee),n.height=Math.floor(X*ee),this.setViewport(0,0,E,X)},this.setEffects=function(E){if(v===Un){at("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let X=0;X<E.length;X++)if(E[X].isOutputPass===!0){Ve("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(L)},this.getViewport=function(E){return E.copy(K)},this.setViewport=function(E,X,ee,Z){E.isVector4?K.set(E.x,E.y,E.z,E.w):K.set(E,X,ee,Z),xe.viewport(L.copy(K).multiplyScalar(J).round())},this.getScissor=function(E){return E.copy(ue)},this.setScissor=function(E,X,ee,Z){E.isVector4?ue.set(E.x,E.y,E.z,E.w):ue.set(E,X,ee,Z),xe.scissor(V.copy(ue).multiplyScalar(J).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(E){xe.setScissorTest(Se=E)},this.setOpaqueSort=function(E){O=E},this.setTransparentSort=function(E){Y=E},this.getClearColor=function(E){return E.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(E=!0,X=!0,ee=!0){let Z=0;if(E){let Q=!1;if(R!==null){const be=R.texture.format;Q=m.has(be)}if(Q){const be=R.texture.type,Pe=f.has(be),Ee=me.getClearColor(),Ne=me.getClearAlpha(),Fe=Ee.r,Ke=Ee.g,tt=Ee.b;Pe?(g[0]=Fe,g[1]=Ke,g[2]=tt,g[3]=Ne,z.clearBufferuiv(z.COLOR,0,g)):(x[0]=Fe,x[1]=Ke,x[2]=tt,x[3]=Ne,z.clearBufferiv(z.COLOR,0,x))}else Z|=z.COLOR_BUFFER_BIT}X&&(Z|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&(Z|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&z.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),D=E},this.dispose=function(){n.removeEventListener("webglcontextlost",ce,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",Ye,!1),me.dispose(),ae.dispose(),Te.dispose(),T.dispose(),$.dispose(),pe.dispose(),ge.dispose(),se.dispose(),ye.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",Rp),ve.removeEventListener("sessionend",Pp),Cr.stop()};function ce(E){E.preventDefault(),cg("WebGLRenderer: Context Lost."),N=!0}function Ue(){cg("WebGLRenderer: Context Restored."),N=!1;const E=st.autoReset,X=_e.enabled,ee=_e.autoUpdate,Z=_e.needsUpdate,Q=_e.type;Ae(),st.autoReset=E,_e.enabled=X,_e.autoUpdate=ee,_e.needsUpdate=Z,_e.type=Q}function Ye(E){at("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function It(E){const X=E.target;X.removeEventListener("dispose",It),mt(X)}function mt(E){Ti(E),T.remove(E)}function Ti(E){const X=T.get(E).programs;X!==void 0&&(X.forEach(function(ee){ye.releaseProgram(ee)}),E.isShaderMaterial&&ye.releaseShaderCache(E))}this.renderBufferDirect=function(E,X,ee,Z,Q,be){X===null&&(X=re);const Pe=Q.isMesh&&Q.matrixWorld.determinant()<0,Ee=Jx(E,X,ee,Z,Q);xe.setMaterial(Z,Pe);let Ne=ee.index,Fe=1;if(Z.wireframe===!0){if(Ne=le.getWireframeAttribute(ee),Ne===void 0)return;Fe=2}const Ke=ee.drawRange,tt=ee.attributes.position;let ke=Ke.start*Fe,gt=(Ke.start+Ke.count)*Fe;be!==null&&(ke=Math.max(ke,be.start*Fe),gt=Math.min(gt,(be.start+be.count)*Fe)),Ne!==null?(ke=Math.max(ke,0),gt=Math.min(gt,Ne.count)):tt!=null&&(ke=Math.max(ke,0),gt=Math.min(gt,tt.count));const Ut=gt-ke;if(Ut<0||Ut===1/0)return;ge.setup(Q,Z,Ee,ee,Ne);let Lt,vt=Ze;if(Ne!==null&&(Lt=oe.get(Ne),vt=dt,vt.setIndex(Lt)),Q.isMesh)Z.wireframe===!0?(xe.setLineWidth(Z.wireframeLinewidth*De()),vt.setMode(z.LINES)):vt.setMode(z.TRIANGLES);else if(Q.isLine){let nn=Z.linewidth;nn===void 0&&(nn=1),xe.setLineWidth(nn*De()),Q.isLineSegments?vt.setMode(z.LINES):Q.isLineLoop?vt.setMode(z.LINE_LOOP):vt.setMode(z.LINE_STRIP)}else Q.isPoints?vt.setMode(z.POINTS):Q.isSprite&&vt.setMode(z.TRIANGLES);if(Q.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))vt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const nn=Q._multiDrawStarts,Ce=Q._multiDrawCounts,Cn=Q._multiDrawCount,lt=Ne?oe.get(Ne).bytesPerElement:1,Hn=T.get(Z).currentProgram.getUniforms();for(let di=0;di<Cn;di++)Hn.setValue(z,"_gl_DrawID",di),vt.render(nn[di]/lt,Ce[di])}else if(Q.isInstancedMesh)vt.renderInstances(ke,Ut,Q.count);else if(ee.isInstancedBufferGeometry){const nn=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Ce=Math.min(ee.instanceCount,nn);vt.renderInstances(ke,Ut,Ce)}else vt.render(ke,Ut)};function hi(E,X,ee){E.transparent===!0&&E.side===mn&&E.forceSinglePass===!1?(E.side=Tn,E.needsUpdate=!0,Da(E,X,ee),E.side=Sr,E.needsUpdate=!0,Da(E,X,ee),E.side=mn):Da(E,X,ee)}this.compile=function(E,X,ee=null){ee===null&&(ee=E),w=Te.get(ee),w.init(X),y.push(w),ee.traverseVisible(function(Q){Q.isLight&&Q.layers.test(X.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),E!==ee&&E.traverseVisible(function(Q){Q.isLight&&Q.layers.test(X.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),w.setupLights();const Z=new Set;return E.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const be=Q.material;if(be)if(Array.isArray(be))for(let Pe=0;Pe<be.length;Pe++){const Ee=be[Pe];hi(Ee,ee,Q),Z.add(Ee)}else hi(be,ee,Q),Z.add(be)}),w=y.pop(),Z},this.compileAsync=function(E,X,ee=null){const Z=this.compile(E,X,ee);return new Promise(Q=>{function be(){if(Z.forEach(function(Pe){T.get(Pe).currentProgram.isReady()&&Z.delete(Pe)}),Z.size===0){Q(E);return}setTimeout(be,10)}Xe.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let tu=null;function Zx(E){tu&&tu(E)}function Rp(){Cr.stop()}function Pp(){Cr.start()}const Cr=new Rx;Cr.setAnimationLoop(Zx),typeof self<"u"&&Cr.setContext(self),this.setAnimationLoop=function(E){tu=E,ve.setAnimationLoop(E),E===null?Cr.stop():Cr.start()},ve.addEventListener("sessionstart",Rp),ve.addEventListener("sessionend",Pp),this.render=function(E,X){if(X!==void 0&&X.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;D!==null&&D.renderStart(E,X);const ee=ve.enabled===!0&&ve.isPresenting===!0,Z=A!==null&&(R===null||ee)&&A.begin(F,R);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(X),X=ve.getCamera()),E.isScene===!0&&E.onBeforeRender(F,E,X,R),w=Te.get(E,y.length),w.init(X),w.state.textureUnits=S.getTextureUnits(),y.push(w),Be.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Me.setFromProjectionMatrix(Be,yi,X.reversedDepth),Ie=this.localClippingEnabled,We=Re.init(this.clippingPlanes,Ie),b=ae.get(E,C.length),b.init(),C.push(b),ve.enabled===!0&&ve.isPresenting===!0){const Pe=F.xr.getDepthSensingMesh();Pe!==null&&nu(Pe,X,-1/0,F.sortObjects)}nu(E,X,0,F.sortObjects),b.finish(),F.sortObjects===!0&&b.sort(O,Y),he=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,he&&me.addToRenderList(b,E),this.info.render.frame++,We===!0&&Re.beginShadows();const Q=w.state.shadowsArray;if(_e.render(Q,E,X),We===!0&&Re.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Z&&A.hasRenderPass())===!1){const Pe=b.opaque,Ee=b.transmissive;if(w.setupLights(),X.isArrayCamera){const Ne=X.cameras;if(Ee.length>0)for(let Fe=0,Ke=Ne.length;Fe<Ke;Fe++){const tt=Ne[Fe];Dp(Pe,Ee,E,tt)}he&&me.render(E);for(let Fe=0,Ke=Ne.length;Fe<Ke;Fe++){const tt=Ne[Fe];Lp(b,E,tt,tt.viewport)}}else Ee.length>0&&Dp(Pe,Ee,E,X),he&&me.render(E),Lp(b,E,X)}R!==null&&q===0&&(S.updateMultisampleRenderTarget(R),S.updateRenderTargetMipmap(R)),Z&&A.end(F),E.isScene===!0&&E.onAfterRender(F,E,X),ge.resetDefaultState(),U=-1,P=null,y.pop(),y.length>0?(w=y[y.length-1],S.setTextureUnits(w.state.textureUnits),We===!0&&Re.setGlobalState(F.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?b=C[C.length-1]:b=null,D!==null&&D.renderEnd()};function nu(E,X,ee,Z){if(E.visible===!1)return;if(E.layers.test(X.layers)){if(E.isGroup)ee=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(X);else if(E.isLightProbeGrid)w.pushLightProbeGrid(E);else if(E.isLight)w.pushLight(E),E.castShadow&&w.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Me.intersectsSprite(E)){Z&&fe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Be);const Pe=pe.update(E),Ee=E.material;Ee.visible&&b.push(E,Pe,Ee,ee,fe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Me.intersectsObject(E))){const Pe=pe.update(E),Ee=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),fe.copy(E.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),fe.copy(Pe.boundingSphere.center)),fe.applyMatrix4(E.matrixWorld).applyMatrix4(Be)),Array.isArray(Ee)){const Ne=Pe.groups;for(let Fe=0,Ke=Ne.length;Fe<Ke;Fe++){const tt=Ne[Fe],ke=Ee[tt.materialIndex];ke&&ke.visible&&b.push(E,Pe,ke,ee,fe.z,tt)}}else Ee.visible&&b.push(E,Pe,Ee,ee,fe.z,null)}}const be=E.children;for(let Pe=0,Ee=be.length;Pe<Ee;Pe++)nu(be[Pe],X,ee,Z)}function Lp(E,X,ee,Z){const{opaque:Q,transmissive:be,transparent:Pe}=E;w.setupLightsView(ee),We===!0&&Re.setGlobalState(F.clippingPlanes,ee),Z&&xe.viewport(L.copy(Z)),Q.length>0&&La(Q,X,ee),be.length>0&&La(be,X,ee),Pe.length>0&&La(Pe,X,ee),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Dp(E,X,ee,Z){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[Z.id]===void 0){const ke=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[Z.id]=new An(1,1,{generateMipmaps:!0,type:ke?On:Un,minFilter:zr,samples:Math.max(4,ht.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace})}const be=w.state.transmissionRenderTarget[Z.id],Pe=Z.viewport||L;be.setSize(Pe.z*F.transmissionResolutionScale,Pe.w*F.transmissionResolutionScale);const Ee=F.getRenderTarget(),Ne=F.getActiveCubeFace(),Fe=F.getActiveMipmapLevel();F.setRenderTarget(be),F.getClearColor(H),I=F.getClearAlpha(),I<1&&F.setClearColor(16777215,.5),F.clear(),he&&me.render(ee);const Ke=F.toneMapping;F.toneMapping=Ei;const tt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),w.setupLightsView(Z),We===!0&&Re.setGlobalState(F.clippingPlanes,Z),La(E,ee,Z),S.updateMultisampleRenderTarget(be),S.updateRenderTargetMipmap(be),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let gt=0,Ut=X.length;gt<Ut;gt++){const Lt=X[gt],{object:vt,geometry:nn,material:Ce,group:Cn}=Lt;if(Ce.side===mn&&vt.layers.test(Z.layers)){const lt=Ce.side;Ce.side=Tn,Ce.needsUpdate=!0,Np(vt,ee,Z,nn,Ce,Cn),Ce.side=lt,Ce.needsUpdate=!0,ke=!0}}ke===!0&&(S.updateMultisampleRenderTarget(be),S.updateRenderTargetMipmap(be))}F.setRenderTarget(Ee,Ne,Fe),F.setClearColor(H,I),tt!==void 0&&(Z.viewport=tt),F.toneMapping=Ke}function La(E,X,ee){const Z=X.isScene===!0?X.overrideMaterial:null;for(let Q=0,be=E.length;Q<be;Q++){const Pe=E[Q],{object:Ee,geometry:Ne,group:Fe}=Pe;let Ke=Pe.material;Ke.allowOverride===!0&&Z!==null&&(Ke=Z),Ee.layers.test(ee.layers)&&Np(Ee,X,ee,Ne,Ke,Fe)}}function Np(E,X,ee,Z,Q,be){E.onBeforeRender(F,X,ee,Z,Q,be),E.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Q.onBeforeRender(F,X,ee,Z,E,be),Q.transparent===!0&&Q.side===mn&&Q.forceSinglePass===!1?(Q.side=Tn,Q.needsUpdate=!0,F.renderBufferDirect(ee,X,Z,Q,E,be),Q.side=Sr,Q.needsUpdate=!0,F.renderBufferDirect(ee,X,Z,Q,E,be),Q.side=mn):F.renderBufferDirect(ee,X,Z,Q,E,be),E.onAfterRender(F,X,ee,Z,Q,be)}function Da(E,X,ee){X.isScene!==!0&&(X=re);const Z=T.get(E),Q=w.state.lights,be=w.state.shadowsArray,Pe=Q.state.version,Ee=ye.getParameters(E,Q.state,be,X,ee,w.state.lightProbeGridArray),Ne=ye.getProgramCacheKey(Ee);let Fe=Z.programs;Z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?X.environment:null,Z.fog=X.fog;const Ke=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Z.envMap=$.get(E.envMap||Z.environment,Ke),Z.envMapRotation=Z.environment!==null&&E.envMap===null?X.environmentRotation:E.envMapRotation,Fe===void 0&&(E.addEventListener("dispose",It),Fe=new Map,Z.programs=Fe);let tt=Fe.get(Ne);if(tt!==void 0){if(Z.currentProgram===tt&&Z.lightsStateVersion===Pe)return Up(E,Ee),tt}else Ee.uniforms=ye.getUniforms(E),D!==null&&E.isNodeMaterial&&D.build(E,ee,Ee),E.onBeforeCompile(Ee,F),tt=ye.acquireProgram(Ee,Ne),Fe.set(Ne,tt),Z.uniforms=Ee.uniforms;const ke=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ke.clippingPlanes=Re.uniform),Up(E,Ee),Z.needsLights=t1(E),Z.lightsStateVersion=Pe,Z.needsLights&&(ke.ambientLightColor.value=Q.state.ambient,ke.lightProbe.value=Q.state.probe,ke.directionalLights.value=Q.state.directional,ke.directionalLightShadows.value=Q.state.directionalShadow,ke.spotLights.value=Q.state.spot,ke.spotLightShadows.value=Q.state.spotShadow,ke.rectAreaLights.value=Q.state.rectArea,ke.ltc_1.value=Q.state.rectAreaLTC1,ke.ltc_2.value=Q.state.rectAreaLTC2,ke.pointLights.value=Q.state.point,ke.pointLightShadows.value=Q.state.pointShadow,ke.hemisphereLights.value=Q.state.hemi,ke.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,ke.spotLightMatrix.value=Q.state.spotLightMatrix,ke.spotLightMap.value=Q.state.spotLightMap,ke.pointShadowMatrix.value=Q.state.pointShadowMatrix),Z.lightProbeGrid=w.state.lightProbeGridArray.length>0,Z.currentProgram=tt,Z.uniformsList=null,tt}function Ip(E){if(E.uniformsList===null){const X=E.currentProgram.getUniforms();E.uniformsList=Xl.seqWithValue(X.seq,E.uniforms)}return E.uniformsList}function Up(E,X){const ee=T.get(E);ee.outputColorSpace=X.outputColorSpace,ee.batching=X.batching,ee.batchingColor=X.batchingColor,ee.instancing=X.instancing,ee.instancingColor=X.instancingColor,ee.instancingMorph=X.instancingMorph,ee.skinning=X.skinning,ee.morphTargets=X.morphTargets,ee.morphNormals=X.morphNormals,ee.morphColors=X.morphColors,ee.morphTargetsCount=X.morphTargetsCount,ee.numClippingPlanes=X.numClippingPlanes,ee.numIntersection=X.numClipIntersection,ee.vertexAlphas=X.vertexAlphas,ee.vertexTangents=X.vertexTangents,ee.toneMapping=X.toneMapping}function Qx(E,X){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;M.setFromMatrixPosition(X.matrixWorld);for(let ee=0,Z=E.length;ee<Z;ee++){const Q=E[ee];if(Q.texture!==null&&Q.boundingBox.containsPoint(M))return Q}return null}function Jx(E,X,ee,Z,Q){X.isScene!==!0&&(X=re),S.resetTextureUnits();const be=X.fog,Pe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?X.environment:null,Ee=R===null?F.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:rt.workingColorSpace,Ne=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Fe=$.get(Z.envMap||Pe,Ne),Ke=Z.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,tt=!!ee.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),ke=!!ee.morphAttributes.position,gt=!!ee.morphAttributes.normal,Ut=!!ee.morphAttributes.color;let Lt=Ei;Z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Lt=F.toneMapping);const vt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,nn=vt!==void 0?vt.length:0,Ce=T.get(Z),Cn=w.state.lights;if(We===!0&&(Ie===!0||E!==P)){const St=E===P&&Z.id===U;Re.setState(Z,E,St)}let lt=!1;Z.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Cn.state.version||Ce.outputColorSpace!==Ee||Q.isBatchedMesh&&Ce.batching===!1||!Q.isBatchedMesh&&Ce.batching===!0||Q.isBatchedMesh&&Ce.batchingColor===!0&&Q.colorTexture===null||Q.isBatchedMesh&&Ce.batchingColor===!1&&Q.colorTexture!==null||Q.isInstancedMesh&&Ce.instancing===!1||!Q.isInstancedMesh&&Ce.instancing===!0||Q.isSkinnedMesh&&Ce.skinning===!1||!Q.isSkinnedMesh&&Ce.skinning===!0||Q.isInstancedMesh&&Ce.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Ce.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Ce.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Ce.instancingMorph===!1&&Q.morphTexture!==null||Ce.envMap!==Fe||Z.fog===!0&&Ce.fog!==be||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==Re.numPlanes||Ce.numIntersection!==Re.numIntersection)||Ce.vertexAlphas!==Ke||Ce.vertexTangents!==tt||Ce.morphTargets!==ke||Ce.morphNormals!==gt||Ce.morphColors!==Ut||Ce.toneMapping!==Lt||Ce.morphTargetsCount!==nn||!!Ce.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,Ce.__version=Z.version);let Hn=Ce.currentProgram;lt===!0&&(Hn=Da(Z,X,Q),D&&Z.isNodeMaterial&&D.onUpdateProgram(Z,Hn,Ce));let di=!1,Xi=!1,ns=!1;const xt=Hn.getUniforms(),Ft=Ce.uniforms;if(xe.useProgram(Hn.program)&&(di=!0,Xi=!0,ns=!0),Z.id!==U&&(U=Z.id,Xi=!0),Ce.needsLights){const St=Qx(w.state.lightProbeGridArray,Q);Ce.lightProbeGrid!==St&&(Ce.lightProbeGrid=St,Xi=!0)}if(di||P!==E){xe.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),xt.setValue(z,"projectionMatrix",E.projectionMatrix),xt.setValue(z,"viewMatrix",E.matrixWorldInverse);const $i=xt.map.cameraPosition;$i!==void 0&&$i.setValue(z,Ge.setFromMatrixPosition(E.matrixWorld)),ht.logarithmicDepthBuffer&&xt.setValue(z,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&xt.setValue(z,"isOrthographic",E.isOrthographicCamera===!0),P!==E&&(P=E,Xi=!0,ns=!0)}if(Ce.needsLights&&(Cn.state.directionalShadowMap.length>0&&xt.setValue(z,"directionalShadowMap",Cn.state.directionalShadowMap,S),Cn.state.spotShadowMap.length>0&&xt.setValue(z,"spotShadowMap",Cn.state.spotShadowMap,S),Cn.state.pointShadowMap.length>0&&xt.setValue(z,"pointShadowMap",Cn.state.pointShadowMap,S)),Q.isSkinnedMesh){xt.setOptional(z,Q,"bindMatrix"),xt.setOptional(z,Q,"bindMatrixInverse");const St=Q.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),xt.setValue(z,"boneTexture",St.boneTexture,S))}Q.isBatchedMesh&&(xt.setOptional(z,Q,"batchingTexture"),xt.setValue(z,"batchingTexture",Q._matricesTexture,S),xt.setOptional(z,Q,"batchingIdTexture"),xt.setValue(z,"batchingIdTexture",Q._indirectTexture,S),xt.setOptional(z,Q,"batchingColorTexture"),Q._colorsTexture!==null&&xt.setValue(z,"batchingColorTexture",Q._colorsTexture,S));const qi=ee.morphAttributes;if((qi.position!==void 0||qi.normal!==void 0||qi.color!==void 0)&&qe.update(Q,ee,Hn),(Xi||Ce.receiveShadow!==Q.receiveShadow)&&(Ce.receiveShadow=Q.receiveShadow,xt.setValue(z,"receiveShadow",Q.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&X.environment!==null&&(Ft.envMapIntensity.value=X.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=V2()),Xi){if(xt.setValue(z,"toneMappingExposure",F.toneMappingExposure),Ce.needsLights&&e1(Ft,ns),be&&Z.fog===!0&&ie.refreshFogUniforms(Ft,be),ie.refreshMaterialUniforms(Ft,Z,J,te,w.state.transmissionRenderTarget[E.id]),Ce.needsLights&&Ce.lightProbeGrid){const St=Ce.lightProbeGrid;Ft.probesSH.value=St.texture,Ft.probesMin.value.copy(St.boundingBox.min),Ft.probesMax.value.copy(St.boundingBox.max),Ft.probesResolution.value.copy(St.resolution)}Xl.upload(z,Ip(Ce),Ft,S)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Xl.upload(z,Ip(Ce),Ft,S),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&xt.setValue(z,"center",Q.center),xt.setValue(z,"modelViewMatrix",Q.modelViewMatrix),xt.setValue(z,"normalMatrix",Q.normalMatrix),xt.setValue(z,"modelMatrix",Q.matrixWorld),Z.uniformsGroups!==void 0){const St=Z.uniformsGroups;for(let $i=0,is=St.length;$i<is;$i++){const Fp=St[$i];se.update(Fp,Hn),se.bind(Fp,Hn)}}return Hn}function e1(E,X){E.ambientLightColor.needsUpdate=X,E.lightProbe.needsUpdate=X,E.directionalLights.needsUpdate=X,E.directionalLightShadows.needsUpdate=X,E.pointLights.needsUpdate=X,E.pointLightShadows.needsUpdate=X,E.spotLights.needsUpdate=X,E.spotLightShadows.needsUpdate=X,E.rectAreaLights.needsUpdate=X,E.hemisphereLights.needsUpdate=X}function t1(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,X,ee){const Z=T.get(E);Z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),T.get(E.texture).__webglTexture=X,T.get(E.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:ee,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,X){const ee=T.get(E);ee.__webglFramebuffer=X,ee.__useDefaultFramebuffer=X===void 0};const n1=z.createFramebuffer();this.setRenderTarget=function(E,X=0,ee=0){R=E,W=X,q=ee;let Z=null,Q=!1,be=!1;if(E){const Ee=T.get(E);if(Ee.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(z.FRAMEBUFFER,Ee.__webglFramebuffer),L.copy(E.viewport),V.copy(E.scissor),j=E.scissorTest,xe.viewport(L),xe.scissor(V),xe.setScissorTest(j),U=-1;return}else if(Ee.__webglFramebuffer===void 0)S.setupRenderTarget(E);else if(Ee.__hasExternalTextures)S.rebindTextures(E,T.get(E.texture).__webglTexture,T.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ke=E.depthTexture;if(Ee.__boundDepthTexture!==Ke){if(Ke!==null&&T.has(Ke)&&(E.width!==Ke.image.width||E.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");S.setupDepthRenderbuffer(E)}}const Ne=E.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(be=!0);const Fe=T.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Fe[X])?Z=Fe[X][ee]:Z=Fe[X],Q=!0):E.samples>0&&S.useMultisampledRTT(E)===!1?Z=T.get(E).__webglMultisampledFramebuffer:Array.isArray(Fe)?Z=Fe[ee]:Z=Fe,L.copy(E.viewport),V.copy(E.scissor),j=E.scissorTest}else L.copy(K).multiplyScalar(J).floor(),V.copy(ue).multiplyScalar(J).floor(),j=Se;if(ee!==0&&(Z=n1),xe.bindFramebuffer(z.FRAMEBUFFER,Z)&&xe.drawBuffers(E,Z),xe.viewport(L),xe.scissor(V),xe.setScissorTest(j),Q){const Ee=T.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ee.__webglTexture,ee)}else if(be){const Ee=X;for(let Ne=0;Ne<E.textures.length;Ne++){const Fe=T.get(E.textures[Ne]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ne,Fe.__webglTexture,ee,Ee)}}else if(E!==null&&ee!==0){const Ee=T.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ee.__webglTexture,ee)}U=-1},this.readRenderTargetPixels=function(E,X,ee,Z,Q,be,Pe,Ee=0){if(!(E&&E.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=T.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ne=Ne[Pe]),Ne){xe.bindFramebuffer(z.FRAMEBUFFER,Ne);try{const Fe=E.textures[Ee],Ke=Fe.format,tt=Fe.type;if(E.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ee),!ht.textureFormatReadable(Ke)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(tt)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=E.width-Z&&ee>=0&&ee<=E.height-Q&&z.readPixels(X,ee,Z,Q,G.convert(Ke),G.convert(tt),be)}finally{const Fe=R!==null?T.get(R).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(E,X,ee,Z,Q,be,Pe,Ee=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=T.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ne=Ne[Pe]),Ne)if(X>=0&&X<=E.width-Z&&ee>=0&&ee<=E.height-Q){xe.bindFramebuffer(z.FRAMEBUFFER,Ne);const Fe=E.textures[Ee],Ke=Fe.format,tt=Fe.type;if(E.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ee),!ht.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ke=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,ke),z.bufferData(z.PIXEL_PACK_BUFFER,be.byteLength,z.STREAM_READ),z.readPixels(X,ee,Z,Q,G.convert(Ke),G.convert(tt),0);const gt=R!==null?T.get(R).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,gt);const Ut=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await OM(z,Ut,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,ke),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,be),z.deleteBuffer(ke),z.deleteSync(Ut),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,X=null,ee=0){const Z=Math.pow(2,-ee),Q=Math.floor(E.image.width*Z),be=Math.floor(E.image.height*Z),Pe=X!==null?X.x:0,Ee=X!==null?X.y:0;S.setTexture2D(E,0),z.copyTexSubImage2D(z.TEXTURE_2D,ee,0,0,Pe,Ee,Q,be),xe.unbindTexture()};const i1=z.createFramebuffer(),r1=z.createFramebuffer();this.copyTextureToTexture=function(E,X,ee=null,Z=null,Q=0,be=0){let Pe,Ee,Ne,Fe,Ke,tt,ke,gt,Ut;const Lt=E.isCompressedTexture?E.mipmaps[be]:E.image;if(ee!==null)Pe=ee.max.x-ee.min.x,Ee=ee.max.y-ee.min.y,Ne=ee.isBox3?ee.max.z-ee.min.z:1,Fe=ee.min.x,Ke=ee.min.y,tt=ee.isBox3?ee.min.z:0;else{const Ft=Math.pow(2,-Q);Pe=Math.floor(Lt.width*Ft),Ee=Math.floor(Lt.height*Ft),E.isDataArrayTexture?Ne=Lt.depth:E.isData3DTexture?Ne=Math.floor(Lt.depth*Ft):Ne=1,Fe=0,Ke=0,tt=0}Z!==null?(ke=Z.x,gt=Z.y,Ut=Z.z):(ke=0,gt=0,Ut=0);const vt=G.convert(X.format),nn=G.convert(X.type);let Ce;X.isData3DTexture?(S.setTexture3D(X,0),Ce=z.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(S.setTexture2DArray(X,0),Ce=z.TEXTURE_2D_ARRAY):(S.setTexture2D(X,0),Ce=z.TEXTURE_2D),xe.activeTexture(z.TEXTURE0),xe.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,X.flipY),xe.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),xe.pixelStorei(z.UNPACK_ALIGNMENT,X.unpackAlignment);const Cn=xe.getParameter(z.UNPACK_ROW_LENGTH),lt=xe.getParameter(z.UNPACK_IMAGE_HEIGHT),Hn=xe.getParameter(z.UNPACK_SKIP_PIXELS),di=xe.getParameter(z.UNPACK_SKIP_ROWS),Xi=xe.getParameter(z.UNPACK_SKIP_IMAGES);xe.pixelStorei(z.UNPACK_ROW_LENGTH,Lt.width),xe.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Lt.height),xe.pixelStorei(z.UNPACK_SKIP_PIXELS,Fe),xe.pixelStorei(z.UNPACK_SKIP_ROWS,Ke),xe.pixelStorei(z.UNPACK_SKIP_IMAGES,tt);const ns=E.isDataArrayTexture||E.isData3DTexture,xt=X.isDataArrayTexture||X.isData3DTexture;if(E.isDepthTexture){const Ft=T.get(E),qi=T.get(X),St=T.get(Ft.__renderTarget),$i=T.get(qi.__renderTarget);xe.bindFramebuffer(z.READ_FRAMEBUFFER,St.__webglFramebuffer),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,$i.__webglFramebuffer);for(let is=0;is<Ne;is++)ns&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,T.get(E).__webglTexture,Q,tt+is),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,T.get(X).__webglTexture,be,Ut+is)),z.blitFramebuffer(Fe,Ke,Pe,Ee,ke,gt,Pe,Ee,z.DEPTH_BUFFER_BIT,z.NEAREST);xe.bindFramebuffer(z.READ_FRAMEBUFFER,null),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Q!==0||E.isRenderTargetTexture||T.has(E)){const Ft=T.get(E),qi=T.get(X);xe.bindFramebuffer(z.READ_FRAMEBUFFER,i1),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,r1);for(let St=0;St<Ne;St++)ns?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ft.__webglTexture,Q,tt+St):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ft.__webglTexture,Q),xt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,qi.__webglTexture,be,Ut+St):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,qi.__webglTexture,be),Q!==0?z.blitFramebuffer(Fe,Ke,Pe,Ee,ke,gt,Pe,Ee,z.COLOR_BUFFER_BIT,z.NEAREST):xt?z.copyTexSubImage3D(Ce,be,ke,gt,Ut+St,Fe,Ke,Pe,Ee):z.copyTexSubImage2D(Ce,be,ke,gt,Fe,Ke,Pe,Ee);xe.bindFramebuffer(z.READ_FRAMEBUFFER,null),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else xt?E.isDataTexture||E.isData3DTexture?z.texSubImage3D(Ce,be,ke,gt,Ut,Pe,Ee,Ne,vt,nn,Lt.data):X.isCompressedArrayTexture?z.compressedTexSubImage3D(Ce,be,ke,gt,Ut,Pe,Ee,Ne,vt,Lt.data):z.texSubImage3D(Ce,be,ke,gt,Ut,Pe,Ee,Ne,vt,nn,Lt):E.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,be,ke,gt,Pe,Ee,vt,nn,Lt.data):E.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,be,ke,gt,Lt.width,Lt.height,vt,Lt.data):z.texSubImage2D(z.TEXTURE_2D,be,ke,gt,Pe,Ee,vt,nn,Lt);xe.pixelStorei(z.UNPACK_ROW_LENGTH,Cn),xe.pixelStorei(z.UNPACK_IMAGE_HEIGHT,lt),xe.pixelStorei(z.UNPACK_SKIP_PIXELS,Hn),xe.pixelStorei(z.UNPACK_SKIP_ROWS,di),xe.pixelStorei(z.UNPACK_SKIP_IMAGES,Xi),be===0&&X.generateMipmaps&&z.generateMipmap(Ce),xe.unbindTexture()},this.initRenderTarget=function(E){T.get(E).__webglFramebuffer===void 0&&S.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?S.setTextureCube(E,0):E.isData3DTexture?S.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?S.setTexture2DArray(E,0):S.setTexture2D(E,0),xe.unbindTexture()},this.resetState=function(){W=0,q=0,R=null,xe.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),n.unpackColorSpace=rt._getUnpackColorSpace()}}class Qc{constructor(e,n,i){this.texture=e,this.data=n,this.pngUrl=i}static async load(e=In("atlas.png"),n=In("atlas.json")){const i=await(await fetch(n)).json(),r=await new Promise((s,o)=>{new nf().load(e,a=>{a.magFilter=Et,a.minFilter=Et,a.generateMipmaps=!1,a.flipY=!1,s(a)},void 0,o)});return new Qc(r,i,e)}cssBackground(e,n){const i=this.data.tiles[e];if(i===void 0)return null;const{cell:r,cols:s,size:o}=this.data,a=i%s,l=Math.floor(i/s),c=n/r;return{backgroundImage:`url(${this.pngUrl})`,backgroundSize:`${o.w*c}px ${o.h*c}px`,backgroundPosition:`-${a*r*c}px -${l*r*c}px`,imageRendering:"pixelated"}}cssCrop(e,n,i,r,s,o,a){const l=this.data.tiles[e];if(l===void 0)return null;const{cell:c,cols:h,size:d}=this.data,u=l%h,p=Math.floor(l/h),_=Math.min(n,r),v=Math.min(i,s),m=Math.abs(r-n)||16,f=Math.abs(s-i)||16,g=u*c+_/16*c,x=p*c+v/16*c,M=o/(m/16*c),b=a/(f/16*c);return{backgroundImage:`url(${this.pngUrl})`,backgroundSize:`${d.w*M}px ${d.h*b}px`,backgroundPosition:`-${g*M}px -${x*b}px`,backgroundRepeat:"no-repeat",imageRendering:"pixelated"}}get whiteIndex(){return this.data.white}getRawData(){return this.data}tileIndex(e){return this.data.tiles[e]}uv(e){const{cell:n,cols:i,size:r}=this.data,s=e%i,o=Math.floor(e/i),a=.01;return[(s*n+a)/r.w,(o*n+a)/r.h,((s+1)*n-a)/r.w,((o+1)*n-a)/r.h]}}function Tt(t){let e=t;const n=e.indexOf(":");n!==-1&&(e=e.slice(n+1));const i=e.indexOf("[");return i!==-1&&(e=e.slice(0,i)),e}const xp={white:[233,236,236],orange:[240,118,19],magenta:[199,78,189],light_blue:[58,175,217],yellow:[248,198,39],lime:[112,185,25],pink:[237,141,172],gray:[62,68,71],light_gray:[142,142,134],cyan:[21,119,136],purple:[121,42,172],blue:[53,57,157],brown:[114,71,40],green:[84,109,27],red:[160,39,34],black:[25,26,31]},H2=Object.keys(xp),G2=[152,94,67],kx={oak:[162,130,78],spruce:[114,84,48],birch:[196,179,123],jungle:[160,115,80],acacia:[168,90,50],dark_oak:[66,43,20],mangrove:[117,54,48],cherry:[226,167,168],bamboo:[193,171,76],crimson:[124,55,84],warped:[43,104,99]},W2=Object.keys(kx),j2={stone:[125,125,125],granite:[149,103,85],polished_granite:[154,108,90],diorite:[188,188,190],polished_diorite:[193,193,196],andesite:[136,138,138],polished_andesite:[148,150,149],cobblestone:[122,121,122],mossy_cobblestone:[110,118,95],stone_bricks:[122,121,122],mossy_stone_bricks:[114,119,100],cracked_stone_bricks:[118,117,116],chiseled_stone_bricks:[120,119,118],smooth_stone:[158,158,158],bricks:[150,97,83],deepslate:[80,80,84],cobbled_deepslate:[77,77,81],polished_deepslate:[72,72,76],deepslate_bricks:[70,70,74],deepslate_tiles:[60,60,64],chiseled_deepslate:[66,66,70],tuff:[108,109,102],calcite:[223,224,220],dripstone_block:[134,105,90],bedrock:[85,85,85],obsidian:[20,16,32],crying_obsidian:[37,13,60],netherite_block:[66,61,63],smooth_basalt:[73,74,80],dirt:[134,96,67],coarse_dirt:[119,85,59],rooted_dirt:[144,103,78],grass_block:[110,150,70],podzol:[91,64,33],mycelium:[111,99,100],dirt_path:[148,122,65],farmland:[97,64,36],mud:[60,56,60],packed_mud:[142,105,78],mud_bricks:[137,105,80],clay:[159,164,177],gravel:[131,127,126],sand:[219,207,163],red_sand:[190,102,33],sandstone:[216,203,157],smooth_sandstone:[219,206,160],cut_sandstone:[217,204,158],chiseled_sandstone:[215,202,156],red_sandstone:[186,99,29],moss_block:[89,109,45],coal_ore:[115,115,115],deepslate_coal_ore:[74,74,78],iron_ore:[136,130,122],deepslate_iron_ore:[98,96,95],copper_ore:[125,128,116],deepslate_copper_ore:[92,96,91],gold_ore:[145,137,103],deepslate_gold_ore:[104,99,78],redstone_ore:[133,107,107],deepslate_redstone_ore:[94,78,78],emerald_ore:[109,145,117],deepslate_emerald_ore:[82,110,90],lapis_ore:[107,118,140],deepslate_lapis_ore:[79,91,110],diamond_ore:[114,137,137],deepslate_diamond_ore:[86,104,105],nether_gold_ore:[123,58,47],nether_quartz_ore:[120,76,70],ancient_debris:[94,67,56],raw_iron_block:[166,134,105],raw_copper_block:[154,105,75],raw_gold_block:[180,147,53],coal_block:[16,16,16],iron_block:[220,220,220],copper_block:[192,107,79],exposed_copper:[161,125,104],weathered_copper:[108,153,122],oxidized_copper:[82,162,132],gold_block:[246,208,61],redstone_block:[175,24,5],emerald_block:[42,203,87],lapis_block:[38,67,137],diamond_block:[108,224,217],netherite_scrap:[110,80,70],quartz_block:[235,229,222],smooth_quartz:[236,230,224],quartz_bricks:[233,227,219],chiseled_quartz_block:[231,225,217],quartz_pillar:[234,228,221],amethyst_block:[134,97,197],budding_amethyst:[125,90,185],redstone_wire:[175,24,5],redstone_torch:[205,60,40],redstone_lamp:[124,78,44],repeater:[160,154,150],comparator:[165,159,155],observer:[98,98,98],piston:[140,124,98],sticky_piston:[120,134,88],piston_head:[150,130,95],dropper:[108,108,108],dispenser:[108,108,108],hopper:[70,70,74],lever:[120,110,95],target:[225,205,195],slime_block:[110,187,95],honey_block:[230,165,56],tnt:[180,60,50],note_block:[98,64,42],jukebox:[101,70,54],daylight_detector:[130,116,92],lectern:[156,124,71],rail:[140,124,96],powered_rail:[160,130,80],detector_rail:[150,120,95],activator_rail:[150,120,95],lightning_rod:[160,100,75],sculk_sensor:[29,72,81],calibrated_sculk_sensor:[33,78,88],sculk:[13,28,33],sculk_catalyst:[30,40,44],sculk_shrieker:[60,70,55],chest:[162,124,64],trapped_chest:[162,124,64],barrel:[124,96,55],crafting_table:[124,86,52],furnace:[104,104,104],blast_furnace:[92,92,96],smoker:[92,80,72],ender_chest:[42,60,60],bookshelf:[121,93,56],composter:[104,76,43],cauldron:[70,70,74],anvil:[73,73,73],grindstone:[120,120,122],smithing_table:[62,62,72],stonecutter:[108,104,100],loom:[148,121,78],cartography_table:[110,86,60],fletching_table:[180,162,110],beacon:[120,222,217],conduit:[148,130,100],bell:[216,174,60],lodestone:[110,110,116],respawn_anchor:[62,22,110],spawner:[44,56,66],snow:[243,250,250],snow_block:[243,250,250],powder_snow:[240,246,248],ice:[145,183,246],packed_ice:[141,180,246],blue_ice:[116,168,252],frosted_ice:[140,178,240],water:[60,110,220],lava:[222,110,30],netherrack:[97,38,38],nether_bricks:[44,22,26],red_nether_bricks:[69,9,11],nether_wart_block:[114,7,8],warped_wart_block:[22,119,120],soul_sand:[85,65,53],soul_soil:[92,71,57],magma_block:[142,65,35],glowstone:[171,131,84],shroomlight:[240,146,70],basalt:[73,73,80],polished_basalt:[86,86,92],blackstone:[42,36,41],polished_blackstone:[53,49,58],polished_blackstone_bricks:[48,44,52],gilded_blackstone:[73,53,44],end_stone:[219,222,158],end_stone_bricks:[218,224,162],purpur_block:[169,125,169],purpur_pillar:[171,128,171],end_rod:[225,222,210],chorus_plant:[90,62,90],chorus_flower:[151,118,151],dragon_egg:[22,12,28],torch:[240,200,90],soul_torch:[80,200,215],lantern:[205,150,75],soul_lantern:[90,190,205],sea_lantern:[200,225,215],froglight:[220,215,160],ochre_froglight:[240,222,150],verdant_froglight:[190,220,150],pearlescent_froglight:[235,205,220],pumpkin:[197,120,28],carved_pumpkin:[197,120,28],jack_o_lantern:[214,145,40],melon:[110,160,40],hay_block:[165,139,12],dried_kelp_block:[50,56,44],sponge:[197,192,75],wet_sponge:[150,158,70],cactus:[85,127,44],bamboo_block:[148,160,60],sugar_cane:[148,192,101],vine:[60,100,35],lily_pad:[42,95,38],short_grass:[108,152,64],tall_grass:[108,152,64],fern:[104,148,62],large_fern:[104,148,62],dead_bush:[129,95,41],cobweb:[220,224,228],glass:[202,226,237],glass_pane:[202,226,237],tinted_glass:[42,36,48]},X2=new Set(["slime_block","honey_block","ice","packed_ice","blue_ice","frosted_ice","water","bubble_column","nether_portal","cobweb","spawner"]);function q2(t){return t.includes("glass")||X2.has(t)}const f0={concrete:t=>`${t}_concrete`,concrete_powder:t=>`${t}_concrete_powder`,wool:t=>`${t}_wool`,carpet:t=>`${t}_carpet`,stained_glass:t=>`${t}_stained_glass`,stained_glass_pane:t=>`${t}_stained_glass_pane`,stained_hardened_clay:t=>`${t}_terracotta`};function Ox(t,e){const n=e==null?void 0:e.color;return n&&xp[n]&&f0[t]?f0[t](n):t==="hardened_clay"?"terracotta":t}const p0=new Map;function Jc(t,e){const n=Ox(Tt(t),e),i=p0.get(n);if(i)return i;const r=$2(n),s={r:r[0],g:r[1],b:r[2],transparent:q2(n)};return p0.set(n,s),s}function $2(t){const e=j2[t];if(e)return e;if(t.includes("copper"))return Y2(t);for(const i of H2)if(t===i||t.startsWith(i+"_"))return K2(i,t.slice(i.length+1));const n=t.startsWith("stripped_")?t.slice(9):t;for(const i of W2)if(n===i||n.startsWith(i+"_"))return Z2(i,n.slice(i.length+1));return eC(t)}function Y2(t){return t.includes("oxidized")?[82,162,132]:t.includes("weathered")?[108,153,122]:t.includes("exposed")?[161,125,104]:[192,107,79]}function K2(t,e){const n=xp[t];return e.includes("terracotta")?yp(n,G2,.55):e.includes("concrete_powder")?m0(n,.18):e.includes("glass")?m0(n,.1):n}function Z2(t,e){const n=kx[t];return e.includes("leaves")?Q2(t):e.includes("log")||e.includes("wood")||e.includes("stem")||e.includes("hyphae")?J2(n,.2):n}function Q2(t){return t==="cherry"?[231,169,197]:t==="birch"?[128,167,85]:t==="spruce"?[78,105,78]:[60,105,40]}function Xs(t){return t<0?0:t>255?255:Math.round(t)}function yp(t,e,n){return[Xs(t[0]*(1-n)+e[0]*n),Xs(t[1]*(1-n)+e[1]*n),Xs(t[2]*(1-n)+e[2]*n)]}function m0(t,e){return yp(t,[255,255,255],e)}function J2(t,e){return yp(t,[0,0,0],e)}function eC(t){let e=0;for(let i=0;i<t.length;i++)e=e*31+t.charCodeAt(i)|0;const n=(e>>>0)%360;return tC(n/360,.45,.6)}function tC(t,e,n){const i=n+e-n*e,r=2*n-i;return[Xs(fh(r,i,t+1/3)*255),Xs(fh(r,i,t)*255),Xs(fh(r,i,t-1/3)*255)]}function fh(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function Bx(t){const e=n=>n.toString(16).padStart(2,"0");return`#${e(t.r)}${e(t.g)}${e(t.b)}`}const g0={chain:"iron_chain",grass_path:"dirt_path",grass:"grass_block",golden_rail:"powered_rail",stonebrick:"stone_bricks",fence:"oak_fence",fence_gate:"oak_fence_gate",wooden_door:"oak_door",wooden_button:"oak_button",wooden_pressure_plate:"oak_pressure_plate",trapdoor:"oak_trapdoor",sign:"oak_sign",wall_sign:"oak_wall_sign",unpowered_repeater:"repeater",powered_repeater:"repeater",unpowered_comparator:"comparator",powered_comparator:"comparator",unlit_redstone_torch:"redstone_torch",lit_furnace:"furnace",lit_redstone_lamp:"redstone_lamp",lit_pumpkin:"jack_o_lantern",web:"cobweb",snow_layer:"snow",slime:"slime_block",noteblock:"note_block",magma:"magma_block",quartz_ore:"nether_quartz_ore",mob_spawner:"spawner",lit_redstone_ore:"redstone_ore",reeds:"sugar_cane",melon_block:"melon",waterlily:"lily_pad",brick_block:"bricks",hardened_clay:"terracotta"};function zx(t,e){for(const n in t)if(!String(t[n]).split("|").includes(e[n]))return!1;return!0}function af(t,e){const n=t;return Array.isArray(n.OR)?n.OR.some(i=>af(i,e)):Array.isArray(n.AND)?n.AND.every(i=>af(i,e)):zx(t,e)}class xa{constructor(e){this.data=e}static fromRaw(e){return new xa(e)}getRawData(){return this.data}static async load(e=In("models.json")){const n=await fetch(e);if(!n.ok)throw new Error(`No se pudo cargar ${e} (${n.status})`);return new xa(await n.json())}resolve(e,n){const i=Tt(e),r=!this.data.blocks[i]&&!!g0[i],s=this.data.blocks[i]??this.data.blocks[g0[i]];if(!s)return null;const o=r&&(!n||n.axis===void 0)?{...n??{},axis:"y"}:n??{},a=[];if(s.variants){const l=s.variants.find(c=>zx(c.when,o));if(!l)return null;for(const c of l.apply)a.push({model:this.data.models[c.model],x:c.x,y:c.y,uvlock:c.uvlock})}else if(s.multipart){let l=o;i.endsWith("_wall")&&o.up!=="true"&&o.north!=="low"&&o.north!=="tall"&&o.east!=="low"&&o.east!=="tall"&&o.south!=="low"&&o.south!=="tall"&&o.west!=="low"&&o.west!=="tall"&&(l={...o,up:"true"});for(const c of s.multipart)if(!(c.when&&!af(c.when,l)))for(const h of c.apply)a.push({model:this.data.models[h.model],x:h.x,y:h.y,uvlock:h.uvlock})}return a}}const _0={type:"change"},Sp={type:"start"},Vx={type:"end"},El=new $c,v0=new Sn,nC=Math.cos(70*xx.DEG2RAD),zt=new B,xn=2*Math.PI,_t={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ph=1e-6;class iC extends Xw{constructor(e,n=null){super(e,n),this.state=_t.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hs.ROTATE,MIDDLE:Hs.DOLLY,RIGHT:Hs.PAN},this.touches={ONE:Is.ROTATE,TWO:Is.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new Mr,this._lastTargetPosition=new B,this._quat=new Mr().setFromUnitVectors(e.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new zg,this._sphericalDelta=new zg,this._scale=1,this._panOffset=new B,this._rotateStart=new Oe,this._rotateEnd=new Oe,this._rotateDelta=new Oe,this._panStart=new Oe,this._panEnd=new Oe,this._panDelta=new Oe,this._dollyStart=new Oe,this._dollyEnd=new Oe,this._dollyDelta=new Oe,this._dollyDirection=new B,this._mouse=new Oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=sC.bind(this),this._onPointerDown=rC.bind(this),this._onPointerUp=oC.bind(this),this._onContextMenu=fC.bind(this),this._onMouseWheel=cC.bind(this),this._onKeyDown=uC.bind(this),this._onTouchStart=hC.bind(this),this._onTouchMove=dC.bind(this),this._onMouseDown=aC.bind(this),this._onMouseMove=lC.bind(this),this._interceptControlDown=pC.bind(this),this._interceptControlUp=mC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_0),this.update(),this.state=_t.NONE}pan(e,n){this._pan(e,n),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const n=this.object.position;zt.copy(n).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===_t.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=xn:i>Math.PI&&(i-=xn),r<-Math.PI?r+=xn:r>Math.PI&&(r-=xn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),n.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=zt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new B(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(El.origin.copy(this.object.position),El.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(El.direction))<nC?this.object.lookAt(this.target):(v0.setFromNormalAndCoplanarPoint(this.object.up,this.target),El.intersectPlane(v0,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>ph||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ph||this._lastTargetPosition.distanceToSquared(this.target)>ph?(this.dispatchEvent(_0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?xn/60*this.autoRotateSpeed*e:xn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){zt.setFromMatrixColumn(n,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,n){this.screenSpacePanning===!0?zt.setFromMatrixColumn(n,1):(zt.setFromMatrixColumn(n,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;zt.copy(r).sub(this.target);let s=zt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/n.clientHeight),this._rotateUp(xn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/n.clientHeight),this._rotateUp(xn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new Oe,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function rC(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function sC(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function oC(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Vx),this.state=_t.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function aC(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Hs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=_t.DOLLY;break;case Hs.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=_t.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=_t.ROTATE}break;case Hs.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=_t.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=_t.PAN}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(Sp)}function lC(t){switch(this.state){case _t.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case _t.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case _t.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function cC(t){this.enabled===!1||this.enableZoom===!1||this.state!==_t.NONE||(t.preventDefault(),this.dispatchEvent(Sp),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Vx))}function uC(t){this.enabled!==!1&&this._handleKeyDown(t)}function hC(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Is.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=_t.TOUCH_ROTATE;break;case Is.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=_t.TOUCH_PAN;break;default:this.state=_t.NONE}break;case 2:switch(this.touches.TWO){case Is.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=_t.TOUCH_DOLLY_PAN;break;case Is.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=_t.TOUCH_DOLLY_ROTATE;break;default:this.state=_t.NONE}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(Sp)}function dC(t){switch(this._trackPointer(t),this.state){case _t.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case _t.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case _t.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case _t.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=_t.NONE}}function fC(t){this.enabled!==!1&&t.preventDefault()}function pC(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function mC(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const gC=[145/255,189/255,89/255],_C=[89/255,174/255,48/255],x0=[63/255,118/255,228/255],vC=new Set(["white","orange","magenta","light_blue","yellow","lime","pink","gray","light_gray","cyan","purple","blue","brown","green","red","black"]),xC=new Set(["oak","spruce","birch","jungle","acacia","dark_oak","mangrove","cherry"]),ct=(t,e={})=>({top:t,bottom:t,side:t,...e}),rr=(t,e,n={})=>({top:e,bottom:e,side:t,column:!0,...n}),ot=(t,e,n,i={})=>({top:t,bottom:e,side:n,...i}),yC={grass_block:ot("grass_block_top","dirt","grass_block_side",{tintTop:gC}),podzol:ot("podzol_top","dirt","podzol_side"),mycelium:ot("mycelium_top","dirt","mycelium_side"),dirt_path:ot("dirt_path_top","dirt","dirt_path_side"),farmland:ot("farmland","dirt","dirt"),sandstone:ot("sandstone_top","sandstone_bottom","sandstone"),cut_sandstone:ot("sandstone_top","sandstone_bottom","cut_sandstone"),chiseled_sandstone:ot("sandstone_top","sandstone_bottom","chiseled_sandstone"),smooth_sandstone:ct("sandstone_top"),red_sandstone:ot("red_sandstone_top","red_sandstone_bottom","red_sandstone"),cut_red_sandstone:ot("red_sandstone_top","red_sandstone_bottom","cut_red_sandstone"),chiseled_red_sandstone:ot("red_sandstone_top","red_sandstone_bottom","chiseled_red_sandstone"),smooth_red_sandstone:ct("red_sandstone_top"),quartz_block:ot("quartz_block_top","quartz_block_bottom","quartz_block_side"),smooth_quartz:ct("quartz_block_bottom"),quartz_pillar:rr("quartz_block_side","quartz_block_top"),purpur_pillar:ct("purpur_block"),basalt:rr("basalt_side","basalt_top"),polished_basalt:rr("polished_basalt_side","polished_basalt_top"),bone_block:rr("bone_block_side","bone_block_top"),hay_block:rr("hay_block_side","hay_block_top"),deepslate:rr("deepslate","deepslate_top"),ancient_debris:ot("ancient_debris_top","ancient_debris_top","ancient_debris_side"),magma_block:ct("magma"),dried_kelp_block:ot("dried_kelp_top","dried_kelp_bottom","dried_kelp_side"),honey_block:ot("honey_block_top","honey_block_bottom","honey_block_side",{transparent:!0}),slime_block:ct("slime_block",{transparent:!0}),melon:ot("melon_top","melon_top","melon_side"),pumpkin:ot("pumpkin_top","pumpkin_top","pumpkin_side"),carved_pumpkin:ot("pumpkin_top","pumpkin_top","carved_pumpkin"),jack_o_lantern:ot("pumpkin_top","pumpkin_top","jack_o_lantern"),tnt:ot("tnt_top","tnt_bottom","tnt_side"),target:ot("target_top","target_top","target_side"),note_block:ct("note_block"),decorated_pot:ct("terracotta"),jukebox:ot("jukebox_top","jukebox_side","jukebox_side"),bookshelf:ot("oak_planks","oak_planks","bookshelf"),crafting_table:ot("crafting_table_top","oak_planks","crafting_table_side"),furnace:ot("furnace_top","furnace_top","furnace_side"),lodestone:ot("lodestone_top","lodestone_top","lodestone_side"),redstone_lamp:ct("redstone_lamp"),hopper:ot("hopper_top","hopper_outside","hopper_outside"),piston:ot("piston_top","piston_bottom","piston_side"),sticky_piston:ot("piston_top_sticky","piston_bottom","piston_side"),moving_piston:ot("piston_top","piston_bottom","piston_side"),observer:ot("observer_top","observer_top","observer_side"),dropper:ot("furnace_top","furnace_top","dropper_front"),dispenser:ot("furnace_top","furnace_top","dispenser_front"),repeater:ot("repeater","smooth_stone","smooth_stone"),comparator:ot("comparator","smooth_stone","smooth_stone"),redstone_torch:ct("redstone_torch"),redstone_wall_torch:ct("redstone_torch"),glass:ct("glass",{transparent:!0}),tinted_glass:ct("tinted_glass",{transparent:!0}),ice:ct("ice",{transparent:!0}),packed_ice:ct("packed_ice"),blue_ice:ct("blue_ice"),water:ct("water_still",{tintAll:x0,transparent:!0}),bubble_column:ct("water_still",{tintAll:x0,transparent:!0}),lava:ct("lava_still")};function SC(t){const e=yC[t];if(e)return e;const n=t.startsWith("stripped_"),i=n?t.slice(9):t;for(const r of xC)if(i===r||i.startsWith(r+"_")){const s=i.slice(r.length+1),o=n?`stripped_${r}_log`:`${r}_log`,a=n?`stripped_${r}_log_top`:`${r}_log_top`;return s==="log"?rr(o,a):s==="wood"?ct(o):s==="leaves"?ct(`${r}_leaves`,{tintAll:_C}):ct(`${r}_planks`)}for(const r of["crimson","warped"]){const s=n?t.slice(9):t;if(s===r||s.startsWith(r+"_")){const o=s.slice(r.length+1),a=n?`stripped_${r}_stem`:`${r}_stem`,l=n?`stripped_${r}_stem_top`:`${r}_stem_top`;return o==="stem"?rr(a,l):ct(o==="hyphae"?a:`${r}_planks`)}}if(t==="bamboo_planks"||t.startsWith("bamboo_"))return ct("bamboo_planks");for(const r of vC)if(t.startsWith(r+"_")){const s=t.slice(r.length+1);if(s.includes("stained_glass"))return ct(`${r}_stained_glass`,{transparent:!0});if(s.includes("glazed_terracotta"))return ct(`${r}_glazed_terracotta`);if(s.includes("concrete_powder"))return ct(`${r}_concrete_powder`);if(s.includes("concrete"))return ct(`${r}_concrete`);if(s.includes("terracotta"))return ct(`${r}_terracotta`);if(s==="wool"||s==="carpet")return ct(`${r}_wool`)}return ct(t==="terracotta"?"terracotta":t)}function qs(t,e){const n=SC(Ox(Tt(t),e)),i=(e==null?void 0:e.axis)??"y";let r;if(n.column){const o=n.top,a=n.side;i==="x"?r=[o,o,a,a,a,a]:i==="z"?r=[a,a,a,a,o,o]:r=[a,a,o,o,a,a]}else r=[n.side,n.side,n.top,n.bottom,n.side,n.side];const s=[null,null,null,null,null,null];return n.tintAll&&s.fill(n.tintAll),n.tintTop&&(s[2]=n.tintTop),{tiles:r,tints:s,transparent:!!n.transparent}}function mh(t){const[e,n]=t.size;return{has:i=>i in t.tex,size:i=>{const r=t.tex[i];return r?[r.w,r.h]:[64,64]},norm:(i,r,s)=>{const o=t.tex[i];return o?[(o.x+r)/e,(o.y+s)/n]:[0,0]}}}const MC={east:[1,0,0],west:[-1,0,0],up:[0,1,0],down:[0,-1,0],south:[0,0,1],north:[0,0,-1]};function wC(t,e,n){const[i,r,s]=e,[o,a,l]=n;switch(t){case"south":return[i,r,l,o,r,l,o,a,l,i,a,l];case"north":return[o,r,s,i,r,s,i,a,s,o,a,s];case"east":return[o,r,l,o,r,s,o,a,s,o,a,l];case"west":return[i,r,s,i,r,l,i,a,l,i,a,s];case"up":return[i,a,l,o,a,l,o,a,s,i,a,s];default:return[i,r,s,o,r,s,o,r,l,i,r,l]}}function EC(t,e,n){const i=Math.abs(t),r=Math.abs(e),s=Math.abs(n);return r>=i&&r>=s?e>=0?1:.5:s>=i?n>=0?.8:.7:.62}function bC(t,e){const n=new He().makeTranslation(8,8,8);return e&&n.multiply(new He().makeRotationY(-e*Math.PI/180)),n.multiply(new He().makeTranslation(-8,-8,-8))}function $n(t,e,n,i,r,s,o,a){const l=new He().extractRotation(o),c=new B,h=new B;for(const d in s){const u=s[d],p=wC(d,i,r),_=[];for(let y=0;y<4;y++)c.set(p[y*3],p[y*3+1],p[y*3+2]).applyMatrix4(o).multiplyScalar(1/16),_.push(c.x,c.y,c.z);const v=MC[d]??[0,1,0];h.set(v[0],v[1],v[2]).applyMatrix4(l).normalize();const m=EC(h.x,h.y,h.z);let f=u.uv[0],g=u.uv[2];const x=u.uv[1],M=u.uv[3];if(a!=null&&a.has(d)){const y=f;f=g,g=y}let b=[[f,M],[g,M],[g,x],[f,x]];const w=((u.rot??0)/90|0)%4;w&&(b=b.map((y,A)=>b[(A+w)%4]));const C=[];for(const[y,A]of b){const[F,N]=n.norm(e,y,A);C.push(F,N)}t.push({pos:_,uv:C,r:m,g:m,b:m,cull:-1})}}function qt(t,e,n,i,r,s,o=[]){const a=(c,h,d,u)=>[c,h,c+d,h+u],l={down:{uv:a(t+r,e,n,r),rot:0},up:{uv:a(t+r+n,e,n,r),rot:0},east:{uv:a(t+r+n,e+r,r,i),rot:s},south:{uv:a(t+r,e+r,n,i),rot:s},west:{uv:a(t,e+r,r,i),rot:s},north:{uv:a(t+r+n+r,e+r,n,i),rot:s}};for(const c of o)delete l[c];return l}const Hx=new Set(["minecraft:chest","minecraft:trapped_chest","minecraft:ender_chest"]),TC={north:0,east:90,south:180,west:270};function AC(t){return t==="minecraft:trapped_chest"?"trapped":t==="minecraft:ender_chest"?"ender":"normal"}function y0(t,e){const n=AC(t);return n==="ender"?"chest/ender":e==="left"?`chest/${n}_left`:e==="right"?`chest/${n}_right`:`chest/${n}`}const S0={north:{uv:[1,1,3,5],rot:180},east:{uv:[0,1,1,5],rot:180},south:{uv:[4,1,6,5],rot:180},west:{uv:[3,1,4,5],rot:180},up:{uv:[1,0,3,1],rot:180},down:{uv:[3,0,5,1],rot:180}};function CC(t){return t==="left"?[{from:[0,0,1],to:[15,10,15],faces:qt(0,19,15,10,14,180,["up","west"])},{from:[0,10,1],to:[15,14,15],faces:qt(0,0,15,5,14,180,["down","west"])},{from:[-1,7,0],to:[1,11,2],faces:S0,lock:!0}]:t==="right"?[{from:[1,0,1],to:[16,10,15],faces:qt(0,19,15,10,14,180,["up","east"])},{from:[1,10,1],to:[16,14,15],faces:qt(0,0,15,5,14,180,["down","east"])}]:[{from:[1,0,1],to:[15,10,15],faces:qt(0,19,14,10,14,180,["up"])},{from:[1,10,1],to:[15,14,15],faces:qt(0,0,14,5,14,180,["down"])},{from:[7,7,0],to:[9,11,2],faces:S0,lock:!0}]}const RC=new Set(["north","south"]);function PC(t,e){var h,d;const n=TC[((h=t.properties)==null?void 0:h.facing)??"north"]??0,i=((d=t.properties)==null?void 0:d.type)??"single",r=i==="left"?"right":i==="right"?"left":"single",s=y0(t.name,r),o=y0(t.name,"single"),a=r==="left"||r==="right",l=bC(0,n),c=[];for(const u of CC(r)){const p=a&&!u.lock?RC:void 0;$n(c,u.lock?o:s,e,u.from,u.to,u.faces,l,p)}return c}const LC=new Set(["white","orange","magenta","light_blue","yellow","lime","pink","gray","light_gray","cyan","purple","blue","brown","green","red","black"]),DC={up:null,down:[new B(1,0,0),180],north:[new B(1,0,0),-90],south:[new B(1,0,0),90],east:[new B(0,0,1),-90],west:[new B(0,0,1),90]};function ya(t,e){return new He().makeTranslation(8,8,8).multiply(new He().makeRotationAxis(t,e*Math.PI/180)).multiply(new He().makeTranslation(-8,-8,-8))}function Gx(t){const n=Tt(t).replace(/_?shulker_box$/,"").replace(/_$/,"");return n&&LC.has(n)?`shulker/${n}`:"shulker/default"}function NC(t,e){var h;const n=Gx(t.name),i=DC[((h=t.properties)==null?void 0:h.facing)??"up"],r=i?ya(i[0],i[1]):new He,s=[],o=qt(0,0,16,12,16,0),a={up:o.down,north:o.north,south:o.south,east:o.east,west:o.west},l=qt(0,28,16,8,16,0),c={down:l.up,north:l.north,south:l.south,east:l.east,west:l.west};return $n(s,n,e,[0,0,0],[16,8,16],c,r),$n(s,n,e,[0,4,0],[16,16,16],a,r),s}const IC={skeleton_skull:"skeleton",skeleton_wall_skull:"skeleton",wither_skeleton_skull:"wither_skeleton",wither_skeleton_wall_skull:"wither_skeleton",zombie_head:"zombie",zombie_wall_head:"zombie",creeper_head:"creeper",creeper_wall_head:"creeper",piglin_head:"piglin",piglin_wall_head:"piglin",player_head:"player",player_wall_head:"player"};function Sa(t){const e=IC[Tt(t)];return e?`skull/${e}`:null}const UC={south:0,north:180,east:90,west:-90};function FC(t,e){var o,a;const n=t.skin&&e.has(t.skin)?t.skin:Sa(t.name);if(!n||!e.has(n))return null;const i=[],r=qt(0,0,8,8,8,0),s={up:r.down,down:r.up,north:r.north,south:r.south,east:r.east,west:r.west};if(Tt(t.name).includes("wall")){const l=UC[((o=t.properties)==null?void 0:o.facing)??"south"]??0;$n(i,n,e,[4,4,0],[12,12,8],s,ya(new B(0,1,0),l))}else{const l=(parseInt(((a=t.properties)==null?void 0:a.rotation)??"0",10)||0)*22.5;$n(i,n,e,[4,0,4],[12,8,12],s,ya(new B(0,1,0),-l))}return i}const ys="minecart/minecart",kC=[2,2,18,10],OC=[2,12,22,28];function BC(t,e){if(!e.has(ys))return[];const n=t?ya(new B(0,1,0),-t):new He,i=[],r=()=>({uv:kC}),s=()=>({uv:OC});return $n(i,ys,e,[0,3,0],[16,5,16],{up:s(),down:s()},n),$n(i,ys,e,[0,3,0],[16,11,2],{north:r(),south:r(),up:r()},n),$n(i,ys,e,[0,3,14],[16,11,16],{north:r(),south:r(),up:r()},n),$n(i,ys,e,[0,3,2],[2,11,14],{west:r(),east:r(),up:r()},n),$n(i,ys,e,[14,3,2],[16,11,14],{west:r(),east:r(),up:r()},n),i}const M0="armor_stand/wood";function zC(){return[{from:[3,0,3],to:[13,2,13],faces:qt(0,32,12,1,12,0)},{from:[5,2,7],to:[7,12,9],faces:qt(8,0,2,11,2,0)},{from:[9,2,7],to:[11,12,9],faces:qt(40,0,2,11,2,0)},{from:[4,12,6],to:[12,15,10],faces:qt(0,26,12,3,3,0)},{from:[7,15,7],to:[9,20,9],faces:qt(8,0,2,11,2,0)},{from:[3,20,7],to:[13,23,9],faces:qt(0,26,12,3,3,0)},{from:[7,23,7],to:[9,25,9],faces:qt(8,0,2,11,2,0)},{from:[6,25,6],to:[10,30,10],faces:qt(0,0,2,7,2,0)}]}function VC(t,e){if(!e.has(M0))return[];const n=t?ya(new B(0,1,0),-t):new He,i=[];for(const r of zC())$n(i,M0,e,r.from,r.to,r.faces,n);return i}const HC=[{tu:0,tv:0,box:[-14,-9,-3,28,16,3],pose:[0,3,1],rot:[Math.PI/2,0,0]},{tu:0,tv:19,box:[-13,-7,-1,18,6,2],pose:[-15,4,4],rot:[0,Math.PI*1.5,0]},{tu:0,tv:27,box:[-8,-7,-1,16,6,2],pose:[15,4,0],rot:[0,Math.PI/2,0]},{tu:0,tv:35,box:[-14,-7,-1,28,6,2],pose:[0,4,9],rot:[0,Math.PI,0]},{tu:0,tv:43,box:[-14,-7,-1,28,6,2],pose:[0,4,-9],rot:[0,0,0]},{tu:62,tv:0,box:[-1,0,-5,2,2,18],pose:[3,-3,9],rot:[0,0,0]},{tu:62,tv:20,box:[-1,0,-5,2,2,18],pose:[3,-3,-9],rot:[0,Math.PI,0]}],GC=new He().set(0,0,-1,0,0,-1,0,0,-1,0,0,0,0,0,0,1);function WC(t,e,n,i){const r=e?`chest_boat/${t}`:`boat/${t}`;if(!i.has(r))return[];const s=[],o=new He().makeRotationY(-n*Math.PI/180),a=new He().multiplyMatrices(o,GC);for(const l of HC){const[c,h,d,u,p,_]=l.box,v=new He().makeTranslation(l.pose[0],l.pose[1],l.pose[2]);l.rot[2]&&v.multiply(new He().makeRotationZ(l.rot[2])),l.rot[1]&&v.multiply(new He().makeRotationY(l.rot[1])),l.rot[0]&&v.multiply(new He().makeRotationX(l.rot[0]));const m=new He().multiplyMatrices(a,v);$n(s,r,i,[c,h,d],[c+u,h+p,d+_],qt(l.tu,l.tv,u,p,_,0),m)}return s}function jC(t){return!!(Hx.has(t)||t.endsWith("shulker_box")||Sa(t))}function XC(t,e){return Hx.has(t.name)?PC(t,e):t.name.endsWith("shulker_box")?NC(t,e):Sa(t.name)?FC(t,e):null}const qC=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],$C=[145/255,189/255,89/255],YC=[89/255,174/255,48/255],Wx=[63/255,118/255,228/255],KC=[1,1,1];function ZC(t){const e=Math.max(0,Math.min(15,t))/15,n=e*.6+(e>0?.4:.3),i=Math.max(0,Math.min(1,e*e*.7-.5)),r=Math.max(0,Math.min(1,e*e*.6-.7));return[n,i,r]}const QC=new Set(["water","ice","slime_block","honey_block","nether_portal","bubble_column"]);function JC(t){const e=Tt(t);return e.includes("glass")||QC.has(e)}function eR(t,e){const n=Tt(t);return n==="water"||n.endsWith("_cauldron")?Wx:n==="redstone_wire"?ZC(parseInt((e==null?void 0:e.power)??"0",10)||0):n==="grass_block"||n==="short_grass"||n==="tall_grass"||n==="fern"||n==="large_fern"||n==="sugar_cane"?$C:n==="cherry_leaves"?KC:YC}const tR={beacon:15,conduit:15,glowstone:15,jack_o_lantern:15,lava:15,sea_lantern:15,shroomlight:15,lava_cauldron:15,ochre_froglight:15,verdant_froglight:15,pearlescent_froglight:15,fire:15,lantern:14,end_rod:14,torch:14,wall_torch:14,cave_vines_plant:14,soul_torch:10,soul_wall_torch:10,soul_lantern:10,soul_fire:10,crying_obsidian:10,glow_lichen:7,ender_chest:7,redstone_ore:9,deepslate_redstone_ore:9,sea_pickle:6,sculk_catalyst:6,magma_block:3,smoker:13,blast_furnace:13,furnace:13,brewing_stand:1,brown_mushroom:1,amethyst_cluster:5,large_amethyst_bud:4,medium_amethyst_bud:2,small_amethyst_bud:1,glow_item_frame:0,redstone_block:4,end_portal:15,end_gateway:15};function nR(t,e){const n=Tt(t);return n==="redstone_lamp"?(e==null?void 0:e.lit)==="true"?15:0:n==="furnace"||n==="smoker"||n==="blast_furnace"?(e==null?void 0:e.lit)==="true"?13:0:n==="campfire"?(e==null?void 0:e.lit)==="false"?0:15:n==="soul_campfire"?(e==null?void 0:e.lit)==="false"?0:10:n==="redstone_torch"||n==="redstone_wall_torch"?(e==null?void 0:e.lit)==="false"?0:7:n==="repeater"||n==="comparator"?(e==null?void 0:e.powered)==="true"?3:0:n==="redstone_ore"||n==="deepslate_redstone_ore"?(e==null?void 0:e.lit)==="true"?9:0:n==="respawn_anchor"?(parseInt((e==null?void 0:e.charges)??"0",10)||0)>0?15:0:n==="candle"||n.endsWith("_candle")?(e==null?void 0:e.lit)==="true"?Math.min(12,3*(parseInt((e==null?void 0:e.candles)??"1",10)||1)):0:n==="cave_vines"||n==="cave_vines_plant"?(e==null?void 0:e.berries)==="true"?14:0:n==="copper_bulb"||n.endsWith("_copper_bulb")?(e==null?void 0:e.lit)==="true"?15:0:tR[n]??0}function w0(t){const e=Tt(t);return e.startsWith("soul_")?{r:.45,g:.78,b:1}:e==="redstone_torch"||e==="redstone_wall_torch"||e==="redstone_lamp"||e==="redstone_ore"||e==="deepslate_redstone_ore"||e==="redstone_block"||e==="repeater"||e==="comparator"?{r:1,g:.22,b:.12}:e==="lava"||e==="magma_block"||e==="fire"||e==="campfire"||e==="lava_cauldron"?{r:1,g:.55,b:.2}:e==="torch"||e==="wall_torch"||e==="lantern"||e==="jack_o_lantern"||e==="candle"||e.endsWith("_candle")?{r:1,g:.78,b:.45}:e==="end_portal"||e==="end_gateway"?{r:.35,g:.6,b:.95}:{r:1,g:.95,b:.82}}function Mp(t,e,n){const i=Math.abs(t),r=Math.abs(e),s=Math.abs(n);return r>=i&&r>=s?e>=0?1:.5:s>=i?n>=0?.8:.7:.62}function wp(t,e,n,i){const[r,s,o]=e,[a,l,c]=n,[h,d,u,p]=i;switch(t){case"south":return{pos:[r,s,c,a,s,c,a,l,c,r,l,c],uv:[h,p,u,p,u,d,h,d]};case"north":return{pos:[a,s,o,r,s,o,r,l,o,a,l,o],uv:[h,p,u,p,u,d,h,d]};case"east":return{pos:[a,s,c,a,s,o,a,l,o,a,l,c],uv:[h,p,u,p,u,d,h,d]};case"west":return{pos:[r,s,o,r,s,c,r,l,c,r,l,o],uv:[h,p,u,p,u,d,h,d]};case"up":return{pos:[r,l,c,a,l,c,a,l,o,r,l,o],uv:[h,p,u,p,u,d,h,d]};default:return{pos:[r,s,o,a,s,o,a,s,c,r,s,c],uv:[h,p,u,p,u,d,h,d]}}}const Us={east:[1,0,0],west:[-1,0,0],up:[0,1,0],down:[0,-1,0],south:[0,0,1],north:[0,0,-1]};function iR(t){const e=Math.abs(t.x),n=Math.abs(t.y),i=Math.abs(t.z);return e>=n&&e>=i?t.x>=0?0:1:n>=i?t.y>=0?2:3:t.z>=0?4:5}function rR(t){return t==="water"||t==="flowing_water"||t==="bubble_column"?"water":t==="lava"||t==="flowing_lava"?"lava":null}function sR(t){return t>=8?16:(8-t)/9*16}function oR(t){if(!t.rotation)return new He;const{origin:e,axis:n,angle:i,rescale:r}=t.rotation,s=i*Math.PI/180,o=new He().makeTranslation(e[0],e[1],e[2]);if(r&&i!==0){const l=1/Math.cos(Math.abs(s)),c=n==="x"?[1,l,l]:n==="y"?[l,1,l]:[l,l,1];o.multiply(new He().makeScale(c[0],c[1],c[2]))}const a=n==="x"?new B(1,0,0):n==="y"?new B(0,1,0):new B(0,0,1);return o.multiply(new He().makeRotationAxis(a,s)),o.multiply(new He().makeTranslation(-e[0],-e[1],-e[2])),o}function aR(t,e){const n=new He().makeTranslation(8,8,8);return e&&n.multiply(new He().makeRotationY(-e*Math.PI/180)),t&&n.multiply(new He().makeRotationX(-t*Math.PI/180)),n.multiply(new He().makeTranslation(-8,-8,-8))}function lR(t,e){const n=(e/90|0)%4;if(!n)return t;const i=[[t[0],t[1]],[t[2],t[3]],[t[4],t[5]],[t[6],t[7]]],r=[];for(let s=0;s<4;s++){const o=i[(s+n)%4];r.push(o[0],o[1])}return r}function cR(t,e,n,i,r){const{width:s,height:o,length:a,blocks:l,palette:c}=t,h=c.map(P=>hR(P,e,n,!0,r??null)),d=new Tl,u=new Tl,p=new Tl,_=new Tl,v=s/2,m=o/2,f=a/2,g=(P,L,V)=>l[(L*a+V)*s+P],x=Math.max(4,Math.round(Math.max(s,o,a)/30)),M=new Map,b=(i==null?void 0:i.x[0])??0,w=(i==null?void 0:i.x[1])??s-1,C=(i==null?void 0:i.y[0])??0,y=(i==null?void 0:i.y[1])??o-1,A=(i==null?void 0:i.z[0])??0,F=(i==null?void 0:i.z[1])??a-1;for(let P=C;P<=y;P++)for(let L=A;L<=F;L++)for(let V=b;V<=w;V++){const j=h[g(V,P,L)];if(j.air)continue;const H=V-v,I=P-m,ne=L-f;if(j.light){const te=((V/x|0)*1024+(P/x|0))*1024+(L/x|0);let J=M.get(te);J||(J={sx:0,sy:0,sz:0,n:0,lvl:0,r:0,g:0,b:0},M.set(te,J)),J.sx+=V,J.sy+=P,J.sz+=L,J.n++,j.light.level>J.lvl&&(J.lvl=j.light.level),J.r+=j.light.r,J.g+=j.light.g,J.b+=j.light.b}if(j.fluid){D(j.fluid,V,P,L,H,I,ne);continue}q(j.solid,d,V,P,L,H,I,ne),q(j.trans,u,V,P,L,H,I,ne),j.entity&&q(j.entity,p,V,P,L,H,I,ne),j.emis&&q(j.emis,_,V,P,L,H,I,ne)}function N(P,L,V){return P<0||P>=s||L<0||L>=o||V<0||V>=a||i&&!(P>=i.x[0]&&P<=i.x[1]&&L>=i.y[0]&&L<=i.y[1]&&V>=i.z[0]&&V<=i.z[1])?null:h[g(P,L,V)]}function D(P,L,V,j,H,I,ne){if(!e)return;const te=P.family==="lava"?_:P.translucent?u:d,J=e.uv(P.tileIdx),O=P.tint?P.tint[0]:1,Y=P.tint?P.tint[1]:1,K=P.tint?P.tint[2]:1,ue=(()=>{const he=N(L,V+1,j);return!!(he!=null&&he.fluid)&&he.fluid.family===P.family})(),Se=(he,De)=>ue?16:W(L,V,j,he,De,P),Me=Se(-1,-1),We=Se(1,-1),Ie=Se(-1,1),Be=Se(1,1),Ge=(he,De,z)=>{const je=Us[z],Xe=Mp(je[0],je[1],je[2]),ht=[];for(const st of he)ht.push(st[0]/16,st[1]/16,st[2]/16);const xe=[];for(const st of De)xe.push(st[0],st[1]);te.add({pos:ht,uv:eu(xe,J),r:O*Xe,g:Y*Xe,b:K*Xe,cull:-1},H,I,ne)},fe=(he,De,z)=>{var je;return(je=N(he,De,z))==null?void 0:je.occluder},re=(he,De,z)=>{const je=N(he,De,z);return!!(je!=null&&je.fluid)&&je.fluid.family===P.family};!ue&&!fe(L,V+1,j)&&Ge([[0,Ie,16],[16,Be,16],[16,We,0],[0,Me,0]],[[0,16],[16,16],[16,0],[0,0]],"up"),!fe(L,V-1,j)&&!re(L,V-1,j)&&Ge([[0,0,0],[16,0,0],[16,0,16],[0,0,16]],[[0,0],[16,0],[16,16],[0,16]],"down"),!fe(L+1,V,j)&&!re(L+1,V,j)&&Ge([[16,0,16],[16,0,0],[16,We,0],[16,Be,16]],[[0,16],[16,16],[16,16-We],[0,16-Be]],"east"),!fe(L-1,V,j)&&!re(L-1,V,j)&&Ge([[0,0,0],[0,0,16],[0,Ie,16],[0,Me,0]],[[0,16],[16,16],[16,16-Ie],[0,16-Me]],"west"),!fe(L,V,j+1)&&!re(L,V,j+1)&&Ge([[0,0,16],[16,0,16],[16,Be,16],[0,Ie,16]],[[0,16],[16,16],[16,16-Be],[0,16-Ie]],"south"),!fe(L,V,j-1)&&!re(L,V,j-1)&&Ge([[16,0,0],[0,0,0],[0,Me,0],[16,We,0]],[[0,16],[16,16],[16,16-Me],[0,16-We]],"north")}function W(P,L,V,j,H,I){let ne=0,te=0;for(const[J,O]of[[0,0],[j,0],[0,H],[j,H]]){const Y=N(P+J,L,V+O);if(!(Y!=null&&Y.fluid)||Y.fluid.family!==I.family)continue;const K=N(P+J,L+1,V+O);if(K!=null&&K.fluid&&K.fluid.family===I.family)return 16;const ue=Y.fluid.heightPx;ue>=14?(ne+=ue*10,te+=10):(ne+=ue,te+=1)}return te===0?I.heightPx:ne/te}function q(P,L,V,j,H,I,ne,te){for(const J of P){if(J.cull>=0){const O=qC[J.cull],Y=V+O[0],K=j+O[1],ue=H+O[2];if(Y>=0&&Y<s&&K>=0&&K<o&&ue>=0&&ue<a&&(!i||Y>=i.x[0]&&Y<=i.x[1]&&K>=i.y[0]&&K<=i.y[1]&&ue>=i.z[0]&&ue<=i.z[1])&&h[g(Y,K,ue)].occluder)continue}L.add(J,I,ne,te)}}const R=48,U=[];for(const P of M.values())U.push({x:P.sx/P.n-v+.5,y:P.sy/P.n-m+.5,z:P.sz/P.n-f+.5,r:P.r/P.n,g:P.g/P.n,b:P.b/P.n,level:P.lvl,count:P.n});return U.sort((P,L)=>L.count*L.level-P.count*P.level),{opaque:d.raw(),transparent:u.raw(),entity:p.raw(),emissive:_.raw(),lights:U.slice(0,R),truncated:d.truncated||u.truncated||p.truncated||_.truncated}}function uR(t,e,n,i,r){const s=cR(t,e,n,i,r);return{opaque:bl(s.opaque),transparent:bl(s.transparent),entity:bl(s.entity),emissive:bl(s.emissive),lights:s.lights}}function bl(t){if(!t)return null;const e=new $t;e.setAttribute("position",new yt(t.pos,3)),e.setAttribute("uv",new yt(t.uv,2)),e.setAttribute("color",new Mx(t.col,3,!0));const n=t.pos.length/3;return e.setIndex(n>65535?new Xc(t.idx,1):new jc(t.idx,1)),e}function hR(t,e,n,i,r){var u,p,_;if(Kr(t.name))return{air:!0,occluder:!1,solid:[],trans:[]};if(Tt(t.name)==="light"){const v=parseInt(((u=t.properties)==null?void 0:u.level)??"15",10)||0;return{air:!1,occluder:!1,solid:[],trans:[],light:v>0?{level:v,r:1,g:.97,b:.88}:void 0}}if(r&&jC(t.name)){const v=XC(t,r);if(v)return{air:!1,occluder:!1,solid:[],trans:[],entity:v}}const s=e?rR(Tt(t.name)):null;if(e&&s){const v=e.tileIndex(s==="lava"?"lava_still":"water_still");if(v!==void 0){const f=Tt(t.name)==="bubble_column"?8:parseInt(((p=t.properties)==null?void 0:p.level)??"0",10)||0;return{air:!1,occluder:!1,solid:[],trans:[],fluid:{family:s,tileIdx:v,tint:s==="water"?Wx:null,translucent:s==="water",heightPx:sR(f)},light:s==="lava"?{level:15,...w0("lava")}:void 0}}}const o=nR(t.name,t.properties),a=o>0,l=a?{level:o,...w0(t.name)}:void 0,c=Tt(t.name),h=a&&(c==="repeater"||c==="comparator")?"redstone_torch":void 0;if(e&&(c==="end_portal"||c==="end_gateway")){const v=pR(c,e,a);if(v)return v.light=l,v}if(n&&e)try{const v=n.resolve(t.name,t.properties);if(v&&v.length){const m=dR(t,v,e,a,h);if(m.solid.length||m.trans.length||(_=m.emis)!=null&&_.length)return m.light=l,m}}catch{}const d=fR(t,e,i,a);return d.light=l,d}function dR(t,e,n,i=!1,r){const s=JC(t.name),o=eR(t.name,t.properties),a=[],l=[],c=[];let h=!1;const d=new B,u=new B;for(const p of e){const _=aR(p.x,p.y);for(const v of p.model.elements){v.from[0]===0&&v.from[1]===0&&v.from[2]===0&&v.to[0]===16&&v.to[1]===16&&v.to[2]===16&&(h=!0);const m=_.clone().multiply(oR(v)),f=new He().extractRotation(m);for(const g in v.faces){const x=v.faces[g],M=n.tileIndex(x.tile),b=Jc(t.name,t.properties),w=M!==void 0?n.uv(M):n.uv(n.whiteIndex),C=M!==void 0?x.tint?o[0]:1:b.r/255,y=M!==void 0?x.tint?o[1]:1:b.g/255,A=M!==void 0?x.tint?o[2]:1:b.b/255,F=wp(g,v.from,v.to,x.uv),N=[];for(let L=0;L<4;L++)u.set(F.pos[L*3],F.pos[L*3+1],F.pos[L*3+2]).applyMatrix4(m).multiplyScalar(1/16),N.push(u.x,u.y,u.z);const D=Us[g]??[0,1,0];d.set(D[0],D[1],D[2]).applyMatrix4(f).normalize();const W=v.shade?Mp(d.x,d.y,d.z):1,q=x.cull?iR(d.clone().set(Us[x.cull][0],Us[x.cull][1],Us[x.cull][2]).applyMatrix4(f)):-1,R=eu(lR(F.uv,x.rot),w),U={pos:N,uv:R,r:C*W,g:y*W,b:A*W,cull:q};((r?x.tile.endsWith(r):i)?c:s?l:a).push(U)}}}return{air:!1,occluder:h&&!s,solid:a,trans:l,emis:c.length?c:void 0}}function fR(t,e,n,i=!1){const r=Jc(t.name,t.properties),s=r.r/255,o=r.g/255,a=r.b/255,l=qs(t.name,t.properties),c=r.transparent||((l==null?void 0:l.transparent)??!1),h=["east","west","up","down","south","north"],d=[];return h.forEach((u,p)=>{let _=s,v=o,m=a,f=e?e.uv(e.whiteIndex):[0,0,0,0];if(l&&e){const b=e.tileIndex(l.tiles[p]);if(b!==void 0){f=e.uv(b);const w=l.tints[p];_=w?w[0]:1,v=w?w[1]:1,m=w?w[2]:1}}const g=wp(u,[0,0,0],[16,16,16],[0,0,16,16]),x=Us[u],M=Mp(x[0],x[1],x[2]);d.push({pos:g.pos.map(b=>b/16),uv:eu(g.uv,f),r:_*M,g:v*M,b:m*M,cull:p})}),i?{air:!1,occluder:!c,solid:[],trans:[],emis:d}:{air:!1,occluder:!c,solid:c?[]:d,trans:c?d:[]}}function pR(t,e,n){const i=e.tileIndex("end_portal");if(i===void 0)return null;const r=e.uv(i),s=[],o=(a,l,c)=>{const h=wp(a,l,c,[0,0,16,16]);s.push({pos:h.pos.map(d=>d/16),uv:eu(h.uv,r),r:1,g:1,b:1,cull:-1})};if(t==="end_portal")o("up",[0,12,0],[16,12,16]),o("down",[0,12,0],[16,12,16]);else for(const a of["east","west","up","down","south","north"])o(a,[0,0,0],[16,16,16]);return n?{air:!1,occluder:!1,solid:[],trans:[],emis:s}:{air:!1,occluder:!1,solid:s,trans:[]}}function eu(t,e){const[n,i,r,s]=e,o=[];for(let a=0;a<4;a++)o.push(n+t[a*2]/16*(r-n),i+t[a*2+1]/16*(s-i));return o}const mR=8e6;function gh(t){return t<=0?0:t>=1?255:t*255+.5|0}class Tl{constructor(e=65536){this.vc=0,this.qc=0,this.truncated=!1,this.cap=e,this.posBuf=new Float32Array(e*12),this.uvBuf=new Float32Array(e*8),this.colBuf=new Uint8Array(e*12),this.idxBuf=new Uint32Array(e*6)}grow(){const e=this.cap*2,n=new Float32Array(e*12);n.set(this.posBuf),this.posBuf=n;const i=new Float32Array(e*8);i.set(this.uvBuf),this.uvBuf=i;const r=new Uint8Array(e*12);r.set(this.colBuf),this.colBuf=r;const s=new Uint32Array(e*6);s.set(this.idxBuf),this.idxBuf=s,this.cap=e}add(e,n,i,r){if(this.truncated)return;if(this.qc>=mR){this.truncated=!0;return}this.qc>=this.cap&&this.grow();const s=this.vc,o=this.qc*12,a=this.qc*8,l=this.qc*12,c=this.qc*6,h=gh(e.r),d=gh(e.g),u=gh(e.b);for(let p=0;p<4;p++)this.posBuf[o+p*3]=e.pos[p*3]+n,this.posBuf[o+p*3+1]=e.pos[p*3+1]+i,this.posBuf[o+p*3+2]=e.pos[p*3+2]+r,this.uvBuf[a+p*2]=e.uv[p*2],this.uvBuf[a+p*2+1]=e.uv[p*2+1],this.colBuf[l+p*3]=h,this.colBuf[l+p*3+1]=d,this.colBuf[l+p*3+2]=u;this.idxBuf[c]=s,this.idxBuf[c+1]=s+1,this.idxBuf[c+2]=s+2,this.idxBuf[c+3]=s,this.idxBuf[c+4]=s+2,this.idxBuf[c+5]=s+3,this.vc+=4,this.qc++}raw(){return this.qc===0?null:{pos:this.posBuf.slice(0,this.qc*12),uv:this.uvBuf.slice(0,this.qc*8),col:this.colBuf.slice(0,this.qc*12),idx:this.vc>65535?this.idxBuf.slice(0,this.qc*6):new Uint16Array(this.idxBuf.subarray(0,this.qc*6))}}}const ql={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Pa{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const gR=new lo(-1,1,1,-1,0,1);class _R extends $t{constructor(){super(),this.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new yt([0,2,0,0,2,0],2))}}const vR=new _R;class jx{constructor(e){this._mesh=new cn(vR,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,gR)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class xR extends Pa{constructor(e,n="tDiffuse"){super(),this.textureID=n,this.uniforms=null,this.material=null,e instanceof un?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ec.clone(e.uniforms),this.material=new un({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new jx(this.material)}render(e,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class E0 extends Pa{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class yR extends Pa{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class SR{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const i=e.getSize(new Oe);this._width=i.width,this._height=i.height,n=new An(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:On}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new xR(ql),this.copyPass.material.blending=wi,this.timer=new Gw}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const n=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}E0!==void 0&&(o instanceof E0?i=!0:o instanceof yR&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new Oe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class MR extends Pa{constructor(e,n,i=null,r=null,s=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Qe}render(e,n,i){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const wR={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Qe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class co extends Pa{constructor(e,n=1,i,r){super(),this.strength=n,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Oe(e.x,e.y):new Oe(256,256),this.clearColor=new Qe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new An(s,o,{type:On}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new An(s,o,{type:On});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new An(s,o,{type:On});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),o=Math.round(o/2)}const a=wR;this.highPassUniforms=Ec.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new un({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Oe(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ec.clone(ql.uniforms),this.blendMaterial=new un({uniforms:this.copyUniforms,vertexShader:ql.vertexShader,fragmentShader:ql.fragmentShader,premultipliedAlpha:!0,blending:dd,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Qe,this._oldClearAlpha=1,this._basic=new Ln,this._fsQuad=new jx(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,n){let i=Math.round(e/2),r=Math.round(n/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Oe(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,n,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=co.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=co.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const n=[],i=e/3;for(let r=0;r<e;r++)n.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new un({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Oe(.5,.5)},direction:{value:new Oe(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new un({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}co.BlurDirectionX=new Oe(1,0);co.BlurDirectionY=new Oe(0,1);const $s=Math.atan(1/Math.SQRT2),ER=1842207,bR=2,TR=1,_h=1.6,Di=new B(0,1,0),AR=.09,b0={north:[0,-1],south:[0,1],east:[1,0],west:[-1,0]},CR={iso:{dir:[Math.cos($s)*Math.cos(Math.PI/4),Math.sin($s),Math.cos($s)*Math.sin(Math.PI/4)],up:[0,1,0]},top:{dir:[0,1,0],up:[0,0,-1]},bottom:{dir:[0,-1,0],up:[0,0,1]},north:{dir:[0,0,-1],up:[0,1,0]},south:{dir:[0,0,1],up:[0,1,0]},east:{dir:[1,0,0],up:[0,1,0]},west:{dir:[-1,0,0],up:[0,1,0]}};class RR{constructor(e){this.opaqueMesh=null,this.transMesh=null,this.entityMesh=null,this.emissiveMesh=null,this.model=null,this.atlas=null,this.db=null,this.entityManifest=null,this.entityAtlas=null,this.baseEntityManifest=null,this.baseEntityTex=null,this.customEntityTex=null,this.skinToken=0,this.entityTexReady=!1,this.entityManifestReady=!1,this.entityReadyResolve=null,this.entityReadyP=new Promise(i=>{this.entityReadyResolve=i}),this.view="free",this.boundingRadius=10,this.orthoDist=40,this.viewHalfHeight=10,this.orthoDir=new B(1,1,1).normalize(),this.orthoUp=new B(0,1,0),this.slice={x:[0,0],y:[0,0],z:[0,0]},this.worker=null,this.workerSeq=0,this.workerBusy=!1,this.pendingRebuild=!1,this.endPortalMesh=null,this.endPortalTex=null,this.endPortalCtx=null,this.endPortalLayers=[],this.framesGroup=null,this.framesTex=null,this.minecartsGroup=null,this.itemAtlasTex=null,this.itemAtlasData=null,this.itemAtlasLoading=!1,this.truncated=!1,this.rafId=0,this.tween=null,this._needsRender=!1,this.showcase=!1,this.opaqueLit=null,this.transLit=null,this.entityLit=null,this.lights=[],this.sun=null,this.composer=null,this.bloomPass=null,this.lightSamples=[],this.emitterLights=[],this.keys=new Set,this.hovering=!1,this.flyEnabled=!1,this.lastFlyT=0,this.flySpeedMul=1,this._flyVel=new B,this._flyDesired=new B,this._flyMove=new B,this.lookMode="none",this.lookPX=0,this.lookPY=0,this.lookMoveT=0,this.orbitVel={yaw:0,pitch:0},this.lookVel={yaw:0,pitch:0},this.raycaster=new jw,this.pickNdc=new Oe,this.highlight=null,this.highlightPair=null,this.signGroup=null,this.tmpV=new B,this.onLookDown=i=>{if(this.view==="free"){if(i.button===0)this.lookMode="fps";else if(i.button===2)this.lookMode="orbit";else return;this.orbitVel.yaw=0,this.orbitVel.pitch=0,this.lookVel.yaw=0,this.lookVel.pitch=0,this.lookPX=i.clientX,this.lookPY=i.clientY;try{this.canvas.setPointerCapture(i.pointerId)}catch{}}},this.onLookMove=i=>{if(this.lookMode==="none"||this.view!=="free")return;const r=i.clientX-this.lookPX,s=i.clientY-this.lookPY;this.lookPX=i.clientX,this.lookPY=i.clientY,!(!r&&!s)&&(this.lookMode==="fps"?this.lookBy(r,s):this.orbitBy(r,s))},this.onLookUp=i=>{if(this.lookMode!=="none"){performance.now()-this.lookMoveT>80&&(this.lookMode==="orbit"&&(this.orbitVel.yaw=0,this.orbitVel.pitch=0),this.lookMode==="fps"&&(this.lookVel.yaw=0,this.lookVel.pitch=0)),this.lookMode="none";try{this.canvas.releasePointerCapture(i.pointerId)}catch{}this.scheduleRender()}},this.onKeyDown=i=>{const r=document.activeElement;if(r&&/^(INPUT|TEXTAREA|SELECT)$/.test(r.tagName)||(this.hovering&&(i.key===" "||i.key.startsWith("Arrow"))&&i.preventDefault(),!this.flyEnabled||this.view!=="free"))return;const s=this.flyKey(i);s&&((s==="w"||s==="a"||s==="s"||s==="d"||s==="up")&&i.preventDefault(),this.keys.size===0&&(this.lastFlyT=performance.now()),this.keys.add(s),this.scheduleRender())},this.onKeyUp=i=>{const r=this.flyKey(i);r&&this.keys.delete(r)},this.onWindowBlur=()=>{this.keys.clear()},this.onWorkerMessage=i=>{var d;const{id:r,opaque:s,transparent:o,entity:a,emissive:l,lights:c,truncated:h}=i.data;this.workerBusy=!1,r===this.workerSeq&&(this.truncated=!!h,this.lightSamples=c??[],this.setGeometries({opaque:s?this.rawToGeo(s):null,transparent:o?this.rawToGeo(o):null,entity:a?this.rawToGeo(a):null,emissive:l?this.rawToGeo(l):null,lights:this.lightSamples}),this.showcase&&this.refreshEmitterLights(),this.scheduleRender(),(d=this.onRebuild)==null||d.call(this,this.truncated)),this.pendingRebuild&&(this.pendingRebuild=!1,this.rebuild())},this.animate=()=>{if(this._needsRender=!1,this.tween){const i=Math.min(1,(performance.now()-this.tween.start)/this.tween.dur),s=(i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2)*(Math.PI/2),o=this.tween.dir.clone().applyAxisAngle(Di,s),a=this.tween.up.clone().applyAxisAngle(Di,s);this.positionOrtho(o,a),i>=1?(this.orthoDir.copy(o),this.orthoUp.copy(a),this.tween=null):this.scheduleRender()}this.updateFly()&&this.scheduleRender(),this.coastOrbit()&&this.scheduleRender(),this.coastLook()&&this.scheduleRender(),this.controls.update()&&this.scheduleRender(),this.updateNearFar(),this.endPortalMesh&&this.drawEndPortal(performance.now()),this.showcase&&this.composer?this.composer.render():this.renderer.render(this.scene,this.activeCam),this.endPortalMesh&&this.scheduleRender(),this.showcase&&this.controls.autoRotate&&this.scheduleRender()},rt.enabled=!1,this.canvas=e,this.renderer=new d0({canvas:e,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=so,this.renderer.localClippingEnabled=!0,this.renderer.setClearColor(0,0),this.scene=new mw,this.scene.background=new Qe(ER);const n=this.aspect();this.perspCam=new Nn(55,n,.05,8e3),this.orthoCam=new lo(-10*n,10*n,10,-10,.05,8e3),this.activeCam=this.perspCam,this.clipPlanes=[new Sn(new B(1,0,0)),new Sn(new B(-1,0,0)),new Sn(new B(0,1,0)),new Sn(new B(0,-1,0)),new Sn(new B(0,0,1)),new Sn(new B(0,0,-1))],this.opaqueMat=new Ln({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes}),this.transMat=new Ln({vertexColors:!0,transparent:!0,opacity:.8,depthWrite:!1,clippingPlanes:this.clipPlanes}),this.entityMat=new Ln({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes}),this.emissiveMat=new Ln({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes,color:new Qe(_h,_h,_h),polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),this.highlightMat=new wx({color:16023839,depthTest:!1,transparent:!0,clippingPlanes:this.clipPlanes}),this.loadEntityAtlas(),this.controls=this.makeControls(),this.resize(),this.scheduleRender(),this.setupFlyControls(),typeof Worker<"u"&&(this.worker=new Worker(new URL(""+new URL("meshWorker-B1ohMahh.js",import.meta.url).href,import.meta.url)),this.worker.addEventListener("message",this.onWorkerMessage))}markEntityReady(e){e==="tex"?this.entityTexReady=!0:this.entityManifestReady=!0,this.entityTexReady&&this.entityManifestReady&&this.entityReadyResolve&&(this.entityReadyResolve(),this.entityReadyResolve=null)}whenEntityReady(){return this.entityReadyP}load(e){this.model=e,this.boundingRadius=.5*Math.hypot(e.width,e.height,e.length),this.slice={x:[0,e.width-1],y:[0,e.height-1],z:[0,e.length-1]},this.updateClip(),this.rebuild(),this.buildSignText(),this.setView(this.view),this.scheduleRender(),this.applySkins(e)}setAtlas(e){this.atlas=e,this.opaqueMat.map=e.texture,this.transMat.map=e.texture,this.emissiveMat.map=e.texture,this.opaqueMat.needsUpdate=!0,this.transMat.needsUpdate=!0,this.emissiveMat.needsUpdate=!0,this.syncLitMaps(),this.rebuild()}loadEntityAtlas(){new nf().load(In("entity-atlas.png"),e=>{var n,i,r,s,o,a;e.magFilter=Et,e.minFilter=Et,e.generateMipmaps=!1,e.flipY=!1,this.baseEntityTex=e,this.customEntityTex||(this.entityMat.map=e),this.entityMat.needsUpdate=!0,this.syncLitMaps(),((i=(n=this.model)==null?void 0:n.minecarts)!=null&&i.length||(s=(r=this.model)==null?void 0:r.armorStands)!=null&&s.length||(a=(o=this.model)==null?void 0:o.boats)!=null&&a.length)&&this.buildMinecarts(),this.scheduleRender(),this.markEntityReady("tex")},void 0,()=>this.markEntityReady("tex")),fetch(In("entity-atlas.json")).then(e=>e.json()).then(e=>{this.baseEntityManifest=e,this.customEntityTex||(this.entityManifest=e,this.entityAtlas=mh(e)),this.model&&this.rebuild()}).catch(()=>{}).finally(()=>this.markEntityReady("manifest"))}loadImage(e){return new Promise((n,i)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>n(r),r.onerror=i,r.src=e})}async applySkins(e){var m;const n=++this.skinToken,i=e.skins;if(!i||!i.size){this.customEntityTex&&(this.customEntityTex.dispose(),this.customEntityTex=null,this.baseEntityTex&&(this.entityMat.map=this.baseEntityTex),this.entityMat.needsUpdate=!0,this.syncLitMaps(),this.baseEntityManifest&&(this.entityManifest=this.baseEntityManifest,this.entityAtlas=mh(this.baseEntityManifest)),this.rebuild());return}await this.entityReadyP;const r=this.baseEntityManifest;if(!r||n!==this.skinToken||this.model!==e)return;const s=[...i];let o;try{o=await this.loadImage(In("entity-atlas.png"))}catch{return}const a=await Promise.all(s.map(([,f])=>this.loadImage(`/api/skin/${f}`).catch(()=>null)));if(n!==this.skinToken||this.model!==e)return;const[l,c]=r.size,h=64,d=document.createElement("canvas");d.width=Math.max(l,h),d.height=c+s.length*h;const u=d.getContext("2d");u.imageSmoothingEnabled=!1,u.drawImage(o,0,0);const p={...r.tex};s.forEach(([f],g)=>{const x=a[g];if(!x)return;const M=c+g*h;u.drawImage(x,0,M),p[f]={x:0,y:M,w:h,h}});const _=new nh(d);_.magFilter=Et,_.minFilter=Et,_.generateMipmaps=!1,_.flipY=!1,_.needsUpdate=!0,(m=this.customEntityTex)==null||m.dispose(),this.customEntityTex=_,this.entityMat.map=_,this.entityMat.needsUpdate=!0,this.syncLitMaps();const v={size:[d.width,d.height],tex:p};this.entityManifest=v,this.entityAtlas=mh(v),this.rebuild()}setModelDB(e){this.db=e,this.rebuild()}setResources(e,n){this.atlas=e,this.opaqueMat.map=e.texture,this.transMat.map=e.texture,this.emissiveMat.map=e.texture,this.opaqueMat.needsUpdate=!0,this.transMat.needsUpdate=!0,this.emissiveMat.needsUpdate=!0,this.syncLitMaps(),this.db=n,this.rebuild()}setView(e){if(this.view=e,this.tween=null,this.activeCam=e==="free"?this.perspCam:this.orthoCam,this.controls.dispose(),this.controls=this.makeControls(),e==="free")this.frameFree();else{const n=CR[e];this.orthoDir.set(n.dir[0],n.dir[1],n.dir[2]).normalize(),this.orthoUp.set(n.up[0],n.up[1],n.up[2]),this.frameOrtho()}this.scheduleRender()}rotate90(){this.view!=="free"&&(this.tween={dir:this.orthoDir.clone(),up:this.orthoUp.clone(),start:performance.now(),dur:300},this.scheduleRender())}setShowcase(e){e!==this.showcase&&(e?(this.ensureShowcase(),this.showcase=!0,this.setView("free"),this.ensureNormals(this.opaqueMesh),this.ensureNormals(this.entityMesh),this.ensureNormals(this.transMesh),this.swapShowcaseMaterials(!0),this.applyShadowFlags(!0),this.refreshEmitterLights(),this.requestShadowUpdate(),this.controls.autoRotate=!0,this.controls.autoRotateSpeed=1.1):(this.showcase=!1,this.controls.autoRotate=!1,this.swapShowcaseMaterials(!1),this.applyShadowFlags(!1),this.clearEmitterLights()),this.scheduleRender())}refreshEmitterLights(){if(this.clearEmitterLights(),!!this.showcase)for(const e of this.lightSamples){const n=Math.max(6,e.level*.8+5),i=Math.min(1.6,1+.25*Math.log2(e.count+1)),r=bR*(.45+.55*(e.level/15))*i,s=new Ow(new Qe(e.r,e.g,e.b),r,n,TR);s.position.set(e.x,e.y,e.z),s.castShadow=!1,this.scene.add(s),this.emitterLights.push(s)}}clearEmitterLights(){for(const e of this.emitterLights)this.scene.remove(e);this.emitterLights.length=0}requestShadowUpdate(){this.sun&&(this.sun.shadow.needsUpdate=!0)}applyShadowFlags(e){this.opaqueMesh&&(this.opaqueMesh.castShadow=e,this.opaqueMesh.receiveShadow=e),this.entityMesh&&(this.entityMesh.castShadow=e,this.entityMesh.receiveShadow=e),this.transMesh&&(this.transMesh.castShadow=!1,this.transMesh.receiveShadow=e),this.emissiveMesh&&(this.emissiveMesh.castShadow=e,this.emissiveMesh.receiveShadow=!1)}get isShowcase(){return this.showcase}setShowcaseRotation(e){this.showcase&&(this.controls.autoRotate=e,this.scheduleRender())}setFlySpeed(e){this.flySpeedMul=Math.max(.05,e)}setFlyEnabled(e){this.flyEnabled=e,e||this.keys.clear(),this.scheduleRender()}get flySpeed(){return this.flySpeedMul}async capturePhoto(){const e=this.renderer.domElement.width,n=this.renderer.domElement.height;if(!e||!n)return null;this.sun&&(this.sun.shadow.needsUpdate=!0);const i=this.scene.background;this.scene.background=null;const r=this.renderer.getContext(),s=new Uint8Array(e*n*4),o=this.showcase&&!!this.composer;if(o){this.composer.render(),r.readPixels(0,0,e,n,r.RGBA,r.UNSIGNED_BYTE,s),this.renderer.render(this.scene,this.activeCam);const p=new Uint8Array(e*n*4);r.readPixels(0,0,e,n,r.RGBA,r.UNSIGNED_BYTE,p);for(let _=3;_<s.length;_+=4)s[_]=p[_]}else this.renderer.render(this.scene,this.activeCam),r.readPixels(0,0,e,n,r.RGBA,r.UNSIGNED_BYTE,s);this.scene.background=i;const a=document.createElement("canvas");a.width=e,a.height=n;const l=a.getContext("2d"),c=l.createImageData(e,n),h=c.data,d=e*4;for(let p=0;p<n;p++){const _=(n-1-p)*d,v=p*d;for(let m=0;m<d;m+=4){const f=s[_+m+3];if(o||f===0||f===255)h[v+m]=s[_+m],h[v+m+1]=s[_+m+1],h[v+m+2]=s[_+m+2],h[v+m+3]=f;else{const g=255/f;h[v+m]=Math.min(255,s[_+m]*g),h[v+m+1]=Math.min(255,s[_+m+1]*g),h[v+m+2]=Math.min(255,s[_+m+2]*g),h[v+m+3]=f}}}l.putImageData(c,0,0);const u=await new Promise(p=>a.toBlob(_=>p(_),"image/png"));return this.scheduleRender(),u}swapShowcaseMaterials(e){this.opaqueMesh&&(this.opaqueMesh.material=e?this.opaqueLit:this.opaqueMat),this.transMesh&&(this.transMesh.material=e?this.transLit:this.transMat),this.entityMesh&&(this.entityMesh.material=e?this.entityLit:this.entityMat),this.emissiveMesh&&(this.emissiveMesh.material=e?this.emissiveMat:this.opaqueMat)}syncLitMaps(){this.opaqueLit&&(this.opaqueLit.map=this.opaqueMat.map,this.opaqueLit.needsUpdate=!0,this.transLit.map=this.transMat.map,this.transLit.needsUpdate=!0,this.entityLit.map=this.entityMat.map,this.entityLit.needsUpdate=!0)}ensureShowcase(){if(this.opaqueLit){this.syncLitMaps();return}this.opaqueLit=new rh({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes}),this.entityLit=new rh({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes}),this.transLit=new rh({vertexColors:!0,transparent:!0,opacity:.8,depthWrite:!1,clippingPlanes:this.clipPlanes}),this.syncLitMaps();const e=new zw(16777215,.85),n=new Fw(13820159,3816756,.75),i=new kg(16774112,1.35),r=new kg(10469631,.22);r.position.set(-.5,.4,-.6);for(const l of[e,n,i,r])this.scene.add(l),this.lights.push(l);this.sun=i;const s=Math.max(8,this.boundingRadius);i.position.set(.55,1,.4).normalize().multiplyScalar(s*2.2),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),i.shadow.camera.left=-s*1.3,i.shadow.camera.right=s*1.3,i.shadow.camera.top=s*1.3,i.shadow.camera.bottom=-s*1.3,i.shadow.camera.near=.5,i.shadow.camera.far=s*5,i.shadow.bias=-8e-4,i.shadow.normalBias=Math.min(.3,Math.max(.05,s*.004)),i.shadow.autoUpdate=!1,i.shadow.camera.updateProjectionMatrix(),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=nx;const o=this.canvas.clientWidth||1,a=this.canvas.clientHeight||1;this.composer=new SR(this.renderer),this.composer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.composer.setSize(o,a),this.composer.addPass(new MR(this.scene,this.perspCam)),this.bloomPass=new co(new Oe(o,a),.18,.35,.9),this.composer.addPass(this.bloomPass)}setSlice(e,n,i){this.slice[e]=[Math.min(n,i),Math.max(n,i)],this.updateClip(),this.scheduleRender(),this.rebuild()}setBackground(e){this.renderer.domElement.style.backgroundImage="",this.scene.background=new Qe(e),this.scheduleRender()}setBackgroundImage(e){e&&(this.scene.background=null),this.scheduleRender()}resetView(){this.view==="free"?this.frameFree():this.frameOrtho(),this.scheduleRender()}pick(e,n){if(!this.model)return null;const i=this.canvas.getBoundingClientRect();if(i.width===0||i.height===0)return null;this.pickNdc.set((e-i.left)/i.width*2-1,-((n-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.pickNdc,this.activeCam);const{width:r,height:s,length:o,blocks:a,palette:l}=this.model,c=this.raycaster.ray,h=[c.origin.x+r/2,c.origin.y+s/2,c.origin.z+o/2],d=[c.direction.x,c.direction.y,c.direction.z],u=[r,s,o];let p=0,_=1/0;for(let R=0;R<3;R++)if(Math.abs(d[R])<1e-9){if(h[R]<0||h[R]>u[R])return null}else{let U=(0-h[R])/d[R],P=(u[R]-h[R])/d[R];if(U>P){const L=U;U=P,P=L}U>p&&(p=U),P<_&&(_=P)}if(p>_)return null;const v=p+1e-4;let m=Math.min(r-1,Math.max(0,Math.floor(h[0]+d[0]*v))),f=Math.min(s-1,Math.max(0,Math.floor(h[1]+d[1]*v))),g=Math.min(o-1,Math.max(0,Math.floor(h[2]+d[2]*v)));const x=d[0]>=0?1:-1,M=d[1]>=0?1:-1,b=d[2]>=0?1:-1,w=d[0]!==0?Math.abs(1/d[0]):1/0,C=d[1]!==0?Math.abs(1/d[1]):1/0,y=d[2]!==0?Math.abs(1/d[2]):1/0;let A=d[0]!==0?((x>0?m+1:m)-h[0])/d[0]:1/0,F=d[1]!==0?((M>0?f+1:f)-h[1])/d[1]:1/0,N=d[2]!==0?((b>0?g+1:g)-h[2])/d[2]:1/0;const D=this.slice.x,W=this.slice.y,q=this.slice.z;for(let R=0;R<=r+s+o;R++){if(m>=D[0]&&m<=D[1]&&f>=W[0]&&f<=W[1]&&g>=q[0]&&g<=q[1]){const U=l[a[(f*o+g)*r+m]];if(U&&!Kr(U.name))return{x:m,y:f,z:g,state:U}}if(A<F&&A<N){if(m+=x,m<0||m>=r)break;A+=w}else if(F<N){if(f+=M,f<0||f>=s)break;F+=C}else{if(g+=b,g<0||g>=o)break;N+=y}}return null}makeSignTexture(e){const r=document.createElement("canvas");r.width=256,r.height=144;const s=r.getContext("2d");s.fillStyle="#1a1a1a",s.textAlign="center",s.textBaseline="middle";const o=144/4;for(let l=0;l<Math.min(e.length,4);l++){const c=e[l];if(!c)continue;s.font="bold 30px sans-serif";const h=s.measureText(c).width,d=238,u=h>d?d/h:1;s.save(),s.translate(256/2,o*(l+.5)),s.scale(u,1),s.fillText(c,0,0),s.restore()}const a=new nh(r);return a.anisotropy=4,a}disposeSignGroup(){var e;if(this.signGroup){for(const n of this.signGroup.children){const i=n;i.geometry.dispose();const r=i.material;(e=r.map)==null||e.dispose(),r.dispose()}this.scene.remove(this.signGroup),this.signGroup=null}}buildSignText(){var c,h,d,u;this.disposeSignGroup();const e=this.model;if(!e||!e.signs||e.signs.size===0)return;const n=e.width,i=e.length,r=n/2,s=e.height/2,o=i/2,a=new Hr,l=(p,_,v,m,f,g)=>{if(!p.some(b=>b))return;const x=new Ln({map:this.makeSignTexture(p),transparent:!0,depthWrite:!1,side:mn,clippingPlanes:this.clipPlanes,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),M=new cn(new Ra(.82,.46),x);M.position.set(_,v,m),M.rotation.y=Math.atan2(f,g),M.renderOrder=5,M.frustumCulled=!1,a.add(M)};for(const[p,_]of e.signs){const v=e.palette[e.blocks[p]];if(!v)continue;const m=p%n,f=Math.floor(p/n)%i,g=Math.floor(p/(n*i)),x=v.name.includes("hanging"),M=v.name.includes("wall")&&!x;let b,w,C,y;if(x){if(v.name.includes("wall")){const W=b0[((c=v.properties)==null?void 0:c.facing)??"south"]??[0,1];b=W[0],w=W[1]}else{const W=(parseInt(((h=v.properties)==null?void 0:h.rotation)??"0",10)||0)*22.5*Math.PI/180;b=-Math.sin(W),w=Math.cos(W)}C=5,y=1.1}else if(M){const W=b0[((d=v.properties)==null?void 0:d.facing)??"south"]??[0,1];b=W[0],w=W[1],C=8.5,y=-5.7}else{const W=(parseInt(((u=v.properties)==null?void 0:u.rotation)??"0",10)||0)*22.5*Math.PI/180;b=-Math.sin(W),w=Math.cos(W),C=13.5,y=1.2}const A=(W,q)=>[m-r+W/16,g-s+C/16,f-o+q/16],[F,N,D]=A(8+b*y,8+w*y);if(l(_.front,F,N,D,b,w),!M&&_.back.length){const[W,q,R]=A(8-b*y,8-w*y);l(_.back,W,q,R,-b,-w)}}this.scene.add(a),this.signGroup=a,this.scheduleRender()}setHighlight(e){if(!e||!this.model){this.highlight&&(this.highlight.visible=!1),this.scheduleRender();return}if(!this.highlight){const s=new Jr(1.001,1.001,1.001),o=new Pg(s);s.dispose(),this.highlight=new Rg(o,this.highlightMat),this.highlight.renderOrder=999,this.highlight.frustumCulled=!1,this.scene.add(this.highlight)}const{width:n,height:i,length:r}=this.model;this.highlight.position.set(e.x-n/2+.5,e.y-i/2+.5,e.z-r/2+.5),this.highlight.visible=!0,this.scheduleRender()}setHighlightPair(e){if(!e||!this.model){this.highlightPair&&(this.highlightPair.visible=!1),this.scheduleRender();return}if(!this.highlightPair){const s=new Jr(1.001,1.001,1.001),o=new Pg(s);s.dispose(),this.highlightPair=new Rg(o,this.highlightMat),this.highlightPair.renderOrder=999,this.highlightPair.frustumCulled=!1,this.scene.add(this.highlightPair)}const{width:n,height:i,length:r}=this.model;this.highlightPair.position.set(e.x-n/2+.5,e.y-i/2+.5,e.z-r/2+.5),this.highlightPair.visible=!0,this.scheduleRender()}waitForIdle(){return!this.workerBusy&&!this.pendingRebuild?Promise.resolve():new Promise(e=>{const n=setInterval(()=>{!this.workerBusy&&!this.pendingRebuild&&(clearInterval(n),e())},16)})}getEntityManifest(){return this.entityManifest}get isOrtho(){return this.view!=="free"}get layerCount(){return this.model?this.model.height:0}get modelSize(){return this.model?{width:this.model.width,height:this.model.height,length:this.model.length}:{width:0,height:0,length:0}}renderNow(){this.renderer.render(this.scene,this.activeCam)}async captureIso(e=1024,n=0){if(!this.model)return null;const i=e*2,r=document.createElement("canvas");r.width=i,r.height=i;const s=new d0({canvas:r,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setPixelRatio(1),s.setSize(i,i,!1),s.outputColorSpace=so,s.localClippingEnabled=!0;const o=this.scene.background;this.scene.background=null;const a=new lo(-e/2,e/2,e/2,-e/2,.05,8e3),l=new B(Math.cos($s)*Math.cos(Math.PI/4),Math.sin($s),Math.cos($s)*Math.sin(Math.PI/4)).normalize(),c=new B(0,1,0);if(n%4!==0){const m=n%4*(Math.PI/2);l.applyAxisAngle(Di,m)}const h=this.boundingRadius,d=h*4,u=h*1.05;a.top=u,a.bottom=-u,a.left=-u,a.right=u,a.near=.05,a.far=d+h*6,a.position.copy(new B(0,0,0)).addScaledVector(l,d),a.up.copy(c),a.lookAt(0,0,0),a.zoom=1,a.updateProjectionMatrix(),s.render(this.scene,a);const p=document.createElement("canvas");p.width=e,p.height=e;const _=p.getContext("2d");_.imageSmoothingEnabled=!0,_.imageSmoothingQuality="high",_.drawImage(r,0,0,i,i,0,0,e,e);const v=await new Promise(m=>p.toBlob(f=>m(f),"image/webp",.88));return this.scene.background=o,s.dispose(),this.scheduleRender(),v}get vertexCount(){var n,i,r,s,o,a,l,c;let e=0;return(n=this.opaqueMesh)!=null&&n.visible&&(e+=((i=this.opaqueMesh.geometry.getAttribute("position"))==null?void 0:i.count)??0),(r=this.entityMesh)!=null&&r.visible&&(e+=((s=this.entityMesh.geometry.getAttribute("position"))==null?void 0:s.count)??0),(o=this.emissiveMesh)!=null&&o.visible&&(e+=((a=this.emissiveMesh.geometry.getAttribute("position"))==null?void 0:a.count)??0),(l=this.transMesh)!=null&&l.visible&&(e+=((c=this.transMesh.geometry.getAttribute("position"))==null?void 0:c.count)??0),e}resize(){var i;const e=this.canvas.clientWidth,n=this.canvas.clientHeight;e===0||n===0||(this.renderer.setSize(e,n,!1),this.perspCam.aspect=e/n,this.perspCam.updateProjectionMatrix(),this.updateOrtho(),this.composer&&(this.composer.setSize(e,n),(i=this.bloomPass)==null||i.setSize(e,n)),this.scheduleRender())}dispose(){var e,n,i,r,s,o,a,l,c;cancelAnimationFrame(this.rafId),this.disposeEndPortal(),this.disposeItemFrames(),this.disposeMinecarts(),(e=this.itemAtlasTex)==null||e.dispose(),(n=this.customEntityTex)==null||n.dispose(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onWindowBlur),this.canvas.removeEventListener("pointerdown",this.onLookDown),this.canvas.removeEventListener("pointermove",this.onLookMove),this.canvas.removeEventListener("pointerup",this.onLookUp),this.controls.dispose(),(i=this.worker)==null||i.terminate(),this.worker=null,this.clearEmitterLights(),this.disposeMesh(this.opaqueMesh),this.disposeMesh(this.transMesh),this.disposeMesh(this.entityMesh),this.disposeMesh(this.emissiveMesh),this.highlight&&(this.highlight.geometry.dispose(),this.scene.remove(this.highlight)),this.highlightPair&&(this.highlightPair.geometry.dispose(),this.scene.remove(this.highlightPair)),this.highlightMat.dispose(),this.disposeSignGroup(),this.opaqueMat.dispose(),this.transMat.dispose(),this.emissiveMat.dispose(),(r=this.entityMat.map)==null||r.dispose(),this.entityMat.dispose(),(s=this.composer)==null||s.dispose(),(o=this.bloomPass)==null||o.dispose(),(a=this.opaqueLit)==null||a.dispose(),(l=this.transLit)==null||l.dispose(),(c=this.entityLit)==null||c.dispose(),this.renderer.dispose()}updateClip(){if(!this.model)return;const{width:e,height:n,length:i}=this.model,r=this.slice,s=.002;this.clipPlanes[0].set(new B(1,0,0),-(r.x[0]-e/2)+s),this.clipPlanes[1].set(new B(-1,0,0),r.x[1]+1-e/2+s),this.clipPlanes[2].set(new B(0,1,0),-(r.y[0]-n/2)+s),this.clipPlanes[3].set(new B(0,-1,0),r.y[1]+1-n/2+s),this.clipPlanes[4].set(new B(0,0,1),-(r.z[0]-i/2)+s),this.clipPlanes[5].set(new B(0,0,-1),r.z[1]+1-i/2+s)}makeControls(){const e=new iC(this.activeCam,this.canvas);return e.enableDamping=!0,e.dampingFactor=.08,e.zoomToCursor=!0,e.enablePan=this.view!=="free",e.enableZoom=!0,e.enableRotate=!1,e.minDistance=.01,e.maxDistance=this.boundingRadius*12,e.target.set(0,0,0),e.addEventListener("change",()=>this.scheduleRender()),e.addEventListener("start",()=>this.scheduleRender()),e}setupFlyControls(){this.canvas.addEventListener("pointerenter",()=>{this.hovering=!0}),this.canvas.addEventListener("pointerleave",()=>{this.hovering=!1}),this.canvas.addEventListener("pointerdown",this.onLookDown),this.canvas.addEventListener("pointermove",this.onLookMove),this.canvas.addEventListener("pointerup",this.onLookUp),this.canvas.addEventListener("contextmenu",e=>e.preventDefault()),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onWindowBlur)}lookBy(e,n){const r=-e*.0024,s=-n*.0024;this.applyLook(r,s),this.lookVel.yaw=r,this.lookVel.pitch=s,this.lookMoveT=performance.now(),this.scheduleRender()}applyLook(e,n){const i=this.perspCam,r=new B().subVectors(this.controls.target,i.position),s=r.length()||1;r.normalize(),r.applyAxisAngle(Di,e);const o=new B().crossVectors(r,Di).normalize(),a=r.clone().applyAxisAngle(o,n);Math.abs(a.y)<.995&&r.copy(a),r.normalize(),this.controls.target.copy(i.position).addScaledVector(r,s)}coastLook(){if(this.lookMode==="fps")return!1;const e=this.lookVel;return Math.abs(e.yaw)<1e-4&&Math.abs(e.pitch)<1e-4?(e.yaw=0,e.pitch=0,!1):(this.applyLook(e.yaw,e.pitch),e.yaw*=.9,e.pitch*=.9,!0)}orbitBy(e,n){const r=-e*.005,s=-n*.005;this.applyOrbit(r,s),this.orbitVel.yaw=r,this.orbitVel.pitch=s,this.lookMoveT=performance.now(),this.scheduleRender()}applyOrbit(e,n){const i=this.perspCam,r=i.position.clone();r.applyAxisAngle(Di,e);const s=new B().crossVectors(Di,r).normalize(),o=r.clone().applyAxisAngle(s,n);i.position.copy(Math.abs(o.clone().normalize().y)<.995?o:r),this.controls.target.set(0,0,0)}coastOrbit(){if(this.lookMode==="orbit")return!1;const e=this.orbitVel;return Math.abs(e.yaw)<1e-4&&Math.abs(e.pitch)<1e-4?(e.yaw=0,e.pitch=0,!1):(this.applyOrbit(e.yaw,e.pitch),e.yaw*=.92,e.pitch*=.92,!0)}flyKey(e){if(e.key===" ")return"up";if(e.key==="Shift")return"down";switch(e.key.toLowerCase()){case"w":return"w";case"a":return"a";case"s":return"s";case"d":return"d";default:return null}}updateFly(){if(this.view!=="free")return this.keys.size&&this.keys.clear(),this._flyVel.set(0,0,0),!1;const e=performance.now();let n=(e-this.lastFlyT)/1e3;if(this.lastFlyT=e,n>.1&&(n=.1),n<=0)return this._flyVel.lengthSq()>0;const i=this.perspCam,r=this.tmpV.subVectors(this.controls.target,i.position).normalize(),s=new B().crossVectors(r,i.up).normalize();this._flyDesired.set(0,0,0),this.keys.has("w")&&this._flyDesired.add(r),this.keys.has("s")&&this._flyDesired.addScaledVector(r,-1),this.keys.has("d")&&this._flyDesired.add(s),this.keys.has("a")&&this._flyDesired.addScaledVector(s,-1),this.keys.has("up")&&this._flyDesired.add(Di),this.keys.has("down")&&this._flyDesired.addScaledVector(Di,-1),this._flyDesired.lengthSq()>0&&this._flyDesired.normalize().multiplyScalar(this.boundingRadius*.9*this.flySpeedMul);const o=1-Math.exp(-n/AR);this._flyVel.lerp(this._flyDesired,o);const a=(this.boundingRadius*.001)**2;return this._flyVel.lengthSq()<a&&this._flyDesired.lengthSq()===0?(this._flyVel.set(0,0,0),!1):(this._flyMove.copy(this._flyVel).multiplyScalar(n),i.position.add(this._flyMove),this.controls.target.add(this._flyMove),!0)}scheduleRender(){this._needsRender||(this._needsRender=!0,this.rafId=requestAnimationFrame(this.animate))}frameFree(){const e=this.boundingRadius,n=xx.degToRad(this.perspCam.fov),i=e/Math.sin(n/2)*1.1;this.controls.target.set(0,0,0),this.perspCam.position.copy(new B(1,.7,1).normalize().multiplyScalar(i)),this.perspCam.near=.05,this.perspCam.far=e*12,this.perspCam.updateProjectionMatrix(),this.controls.update()}frameOrtho(){const e=this.boundingRadius;this.orthoDist=e*4,this.viewHalfHeight=e*1.05,this.orthoCam.near=.05,this.orthoCam.far=this.orthoDist+e*6,this.orthoCam.zoom=1,this.controls.target.set(0,0,0),this.updateOrtho(),this.positionOrtho(this.orthoDir,this.orthoUp),this.controls.update()}positionOrtho(e,n){this.orthoCam.position.copy(this.controls.target).addScaledVector(e,this.orthoDist),this.orthoCam.up.copy(n),this.orthoCam.lookAt(this.controls.target)}updateOrtho(){const e=this.aspect(),n=this.viewHalfHeight;this.orthoCam.top=n,this.orthoCam.bottom=-n,this.orthoCam.left=-n*e,this.orthoCam.right=n*e,this.orthoCam.updateProjectionMatrix()}aspect(){const e=this.canvas.clientWidth,n=this.canvas.clientHeight;return e>0&&n>0?e/n:1}rawToGeo(e){const n=new $t;n.setAttribute("position",new yt(e.pos,3)),n.setAttribute("uv",new yt(e.uv,2)),n.setAttribute("color",new Mx(e.col,3,!0));const i=e.pos.length/3;return n.setIndex(i>65535?new Xc(e.idx,1):new jc(e.idx,1)),n}rebuild(){var n,i;if(!this.model)return;if(this.buildEndPortal(),this.buildItemFrames(),this.buildMinecarts(),this.worker){if(this.workerBusy){this.pendingRebuild=!0;return}this.workerBusy=!0;const r=++this.workerSeq,s=((n=this.atlas)==null?void 0:n.getRawData())??null,o=((i=this.db)==null?void 0:i.getRawData())??null,a=this.model.blocks.slice();this.worker.postMessage({id:r,modelRaw:{width:this.model.width,height:this.model.height,length:this.model.length,blocks:a,palette:this.model.palette},atlasRaw:s,entityManifest:this.entityManifest,dbRaw:o,slice:this.slice},[a.buffer]);return}const e=uR(this.model,this.atlas,this.db,this.slice,this.entityAtlas);this.lightSamples=e.lights,this.setGeometries(e),this.showcase&&this.refreshEmitterLights()}disposeEndPortal(){var e;this.endPortalMesh&&(this.scene.remove(this.endPortalMesh),this.endPortalMesh.geometry.dispose(),this.endPortalMesh.material.dispose(),this.endPortalMesh=null),(e=this.endPortalTex)==null||e.dispose(),this.endPortalTex=null,this.endPortalCtx=null}buildEndPortal(){this.disposeEndPortal();const e=this.model;if(!e)return;const{width:n,height:i,length:r,blocks:s,palette:o}=e,a=this.slice.x,l=this.slice.y,c=this.slice.z,h=[],d=[],u=(M,b,w,C)=>{h.push(...M,...b,...w,...M,...w,...C),d.push(0,0,1,0,1,1,0,0,1,1,0,1)};let p=!1;for(let M=l[0];M<=l[1];M++)for(let b=c[0];b<=c[1];b++)for(let w=a[0];w<=a[1];w++){const C=o[s[(M*r+b)*n+w]];if(!C)continue;const y=Tt(C.name);if(y!=="end_portal"&&y!=="end_gateway")continue;p=!0;const A=w-n/2,F=M-i/2,N=b-r/2;if(y==="end_portal"){const D=F+.75;u([A,D,N],[A+1,D,N],[A+1,D,N+1],[A,D,N+1])}else{const D=A,W=A+1,q=F,R=F+1,U=N,P=N+1;u([D,R,P],[W,R,P],[W,R,U],[D,R,U]),u([D,q,U],[W,q,U],[W,q,P],[D,q,P]),u([D,q,P],[W,q,P],[W,R,P],[D,R,P]),u([W,q,U],[D,q,U],[D,R,U],[W,R,U]),u([W,q,P],[W,q,U],[W,R,U],[W,R,P]),u([D,q,U],[D,q,P],[D,R,P],[D,R,U])}}if(!p)return;const _=new $t;_.setAttribute("position",new yt(h,3)),_.setAttribute("uv",new yt(d,2));const v=128,m=document.createElement("canvas");m.width=m.height=v,this.endPortalCtx=m.getContext("2d"),this.endPortalTex=new nh(m),this.endPortalTex.minFilter=Yt,this.endPortalTex.magFilter=Yt;const f=[[44,196,196],[60,210,215],[150,90,185],[120,70,170],[210,225,255],[90,150,220]],g=(M,b)=>Array.from({length:M},()=>{const w=f[Math.random()*f.length|0];return{x:Math.random(),y:Math.random(),r:w[0],g:w[1],b:w[2],ph:Math.random()*Math.PI*2,sz:1+Math.random()*b}});this.endPortalLayers=[g(70,1.5),g(50,2.5),g(30,3.5)];const x=new Ln({map:this.endPortalTex,side:mn,clippingPlanes:this.clipPlanes,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});this.endPortalMesh=new cn(_,x),this.endPortalMesh.renderOrder=3,this.scene.add(this.endPortalMesh),this.drawEndPortal(performance.now())}drawEndPortal(e){const n=this.endPortalCtx;if(!n)return;const i=n.canvas.width,r=e/1e3;n.globalCompositeOperation="source-over",n.fillStyle="#080b1a",n.fillRect(0,0,i,i),n.globalCompositeOperation="lighter";const s=[.012,.025,.045];this.endPortalLayers.forEach((o,a)=>{const l=r*s[a]%1;for(const c of o){const h=(c.x+l)%1*i,d=(c.y+l*.6)%1*i,u=.4+.6*(.5+.5*Math.sin(r*2+c.ph));n.fillStyle=`rgba(${c.r},${c.g},${c.b},${u.toFixed(3)})`,n.fillRect(h,d,c.sz,c.sz)}}),n.globalCompositeOperation="source-over",this.endPortalTex&&(this.endPortalTex.needsUpdate=!0)}disposeItemFrames(){var e;if(this.framesGroup){for(const n of this.framesGroup.children){const i=n;i.geometry.dispose(),i.material.dispose()}this.scene.remove(this.framesGroup),this.framesGroup=null,(e=this.framesTex)==null||e.dispose(),this.framesTex=null}}ensureItemAtlas3D(){this.itemAtlasData||this.itemAtlasLoading||(this.itemAtlasLoading=!0,Promise.all([fetch(In("item-atlas.json")).then(e=>e.json()),new Promise((e,n)=>new nf().load(In("item-atlas.png"),i=>{i.magFilter=Et,i.minFilter=Et,i.generateMipmaps=!1,i.flipY=!1,e(i)},void 0,n))]).then(([e,n])=>{this.itemAtlasData=e,this.itemAtlasTex=n,this.buildItemFrames(),this.scheduleRender()}).catch(()=>{}))}buildItemFrames(){var j;this.disposeItemFrames();const e=this.model;if(!e||!e.itemFrames||e.itemFrames.length===0)return;this.ensureItemAtlas3D();const{width:n,height:i,length:r}=e,s=this.slice.x,o=this.slice.y,a=this.slice.z,l=[[0,-1,0],[0,1,0],[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]],c=[],h=[],d=[],u=[],p=this.itemAtlasData,_=(H,I,ne,te,J)=>H.push(I[0],I[1],I[2],ne[0],ne[1],ne[2],te[0],te[1],te[2],I[0],I[1],I[2],te[0],te[1],te[2],J[0],J[1],J[2]),v=(H,I)=>H.push(I[0],I[3],I[2],I[3],I[2],I[1],I[0],I[3],I[2],I[1],I[0],I[1]),m=(j=this.atlas)==null?void 0:j.getRawData(),f=H=>{const I=H%m.cols,ne=Math.floor(H/m.cols),te=m.cell;return[I*te/m.size.w,ne*te/m.size.h,(I+1)*te/m.size.w,(ne+1)*te/m.size.h]},g=(H,I,ne,te,J)=>{var Me;const O=(Me=this.atlas)==null?void 0:Me.tileIndex(H);if(O===void 0)return null;const[Y,K,ue,Se]=f(O);return[Y+I/16*(ue-Y),K+ne/16*(Se-K),Y+te/16*(ue-Y),K+J/16*(Se-K)]},x=H=>{if(!p||p.tiles[H]===void 0)return null;const I=p.tiles[H],ne=I%p.cols,te=Math.floor(I/p.cols);return[ne*p.cell/p.size.w,te*p.cell/p.size.h,(ne+1)*p.cell/p.size.w,(te+1)*p.cell/p.size.h]},M=new B,b=new B,w=new B,C=new B;let y=0,A=0,F=0;const N=-.5+.02,D=(H,I,ne)=>{const te=(H-8)/16,J=(I-8)/16,O=N+(ne-15)/16;return[y+w.x*te+C.x*J+M.x*O,A+w.y*te+C.y*J+M.y*O,F+w.z*te+C.z*J+M.z*O]},W={south:(H,I)=>[D(H[0],H[1],I[2]),D(I[0],H[1],I[2]),D(I[0],I[1],I[2]),D(H[0],I[1],I[2])],north:(H,I)=>[D(I[0],H[1],H[2]),D(H[0],H[1],H[2]),D(H[0],I[1],H[2]),D(I[0],I[1],H[2])],east:(H,I)=>[D(I[0],H[1],I[2]),D(I[0],H[1],H[2]),D(I[0],I[1],H[2]),D(I[0],I[1],I[2])],west:(H,I)=>[D(H[0],H[1],H[2]),D(H[0],H[1],I[2]),D(H[0],I[1],I[2]),D(H[0],I[1],H[2])],up:(H,I)=>[D(H[0],I[1],I[2]),D(I[0],I[1],I[2]),D(I[0],I[1],H[2]),D(H[0],I[1],H[2])],down:(H,I)=>[D(H[0],H[1],H[2]),D(I[0],H[1],H[2]),D(I[0],H[1],I[2]),D(H[0],H[1],I[2])]},q=(H,I,ne,te,J)=>{const O=g(te,J[0],J[1],J[2],J[3]);if(!O)return;const Y=W[ne](H,I);_(c,Y[0],Y[1],Y[2],Y[3]),v(h,O)},R=[{f:[3,3,15.5],t:[13,13,16],faces:[["south","back",[3,3,13,13]],["north","back",[3,3,13,13]]]},{f:[2,2,15],t:[14,3,16],faces:[["down","wood",[2,0,14,1]],["up","wood",[2,15,14,16]],["south","wood",[2,13,14,14]],["west","wood",[15,13,16,14]],["east","wood",[0,13,1,14]]]},{f:[2,13,15],t:[14,14,16],faces:[["down","wood",[2,0,14,1]],["up","wood",[2,15,14,16]],["south","wood",[2,2,14,3]],["west","wood",[15,2,16,3]],["east","wood",[0,2,1,3]]]},{f:[2,3,15],t:[3,13,16],faces:[["south","wood",[2,3,3,13]],["west","wood",[15,3,16,13]],["east","wood",[0,3,1,13]]]},{f:[13,3,15],t:[14,13,16],faces:[["south","wood",[13,3,14,13]],["west","wood",[15,3,16,13]],["east","wood",[0,3,1,13]]]}],U=(H,I,ne,te,J)=>{var K;const O=(ue,Se,Me)=>[H+ue*te,I+Se*te,ne+Me*te],Y=[{t:J[0],q:[O(1,-1,1),O(1,-1,-1),O(1,1,-1),O(1,1,1)]},{t:J[1],q:[O(-1,-1,-1),O(-1,-1,1),O(-1,1,1),O(-1,1,-1)]},{t:J[2],q:[O(-1,1,1),O(1,1,1),O(1,1,-1),O(-1,1,-1)]},{t:J[3],q:[O(-1,-1,-1),O(1,-1,-1),O(1,-1,1),O(-1,-1,1)]},{t:J[4],q:[O(-1,-1,1),O(1,-1,1),O(1,1,1),O(-1,1,1)]},{t:J[5],q:[O(1,-1,-1),O(-1,-1,-1),O(-1,1,-1),O(1,1,-1)]}];for(const ue of Y){const Se=(K=this.atlas)==null?void 0:K.tileIndex(ue.t);Se!==void 0&&(_(c,ue.q[0],ue.q[1],ue.q[2],ue.q[3]),v(h,f(Se)))}};for(const H of e.itemFrames){if(H.x<s[0]||H.x>s[1]||H.y<o[0]||H.y>o[1]||H.z<a[0]||H.z>a[1])continue;const I=l[H.facing]??l[3];M.set(I[0],I[1],I[2]),b.set(0,1,0),Math.abs(M.y)>.9&&b.set(0,0,1),w.crossVectors(b,M).normalize(),C.crossVectors(M,w).normalize(),y=H.x+.5-n/2,A=H.y+.5-i/2,F=H.z+.5-r/2;const ne=H.glow?"glow_item_frame":"item_frame";for(const te of R)for(const[J,O,Y]of te.faces)q(te.f,te.t,J,O==="back"?ne:"birch_planks",Y);if(H.item){const te=N+.0625,J=x(H.item);if(J){const O=te+.02,Y=.2,K=H.rotation%8*(Math.PI/4),ue=Math.cos(K),Se=Math.sin(K),Me=w.x*ue+C.x*Se,We=w.y*ue+C.y*Se,Ie=w.z*ue+C.z*Se,Be=-w.x*Se+C.x*ue,Ge=-w.y*Se+C.y*ue,fe=-w.z*Se+C.z*ue,re=(he,De)=>[y+M.x*O+Me*he*Y+Be*De*Y,A+M.y*O+We*he*Y+Ge*De*Y,F+M.z*O+Ie*he*Y+fe*De*Y];_(d,re(-1,-1),re(1,-1),re(1,1),re(-1,1)),v(u,J)}else{const O=qs(H.item);if(this.atlas&&(this.atlas.tileIndex(O.tiles[4])!==void 0||this.atlas.tileIndex(O.tiles[0])!==void 0)){const K=N+.14-.014;U(y+M.x*K,A+M.y*K,F+M.z*K,.14,O.tiles)}}}}const P=new Hr,L=this.clipPlanes,V=(H,I,ne)=>{if(!H.length)return;const te=new $t;te.setAttribute("position",new yt(H,3)),te.setAttribute("uv",new yt(I,2)),P.add(new cn(te,ne))};this.atlas&&V(c,h,new Ln({map:this.atlas.texture,side:mn,alphaTest:.5,clippingPlanes:L})),this.itemAtlasTex&&V(d,u,new Ln({map:this.itemAtlasTex,side:mn,alphaTest:.5,clippingPlanes:L,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),this.framesGroup=P,this.scene.add(P)}disposeMinecarts(){if(this.minecartsGroup){for(const e of this.minecartsGroup.children)e.geometry.dispose();this.scene.remove(this.minecartsGroup),this.minecartsGroup=null}}buildMinecarts(){var A,F,N,D,W,q;this.disposeMinecarts();const e=this.model,n=!!((A=e==null?void 0:e.minecarts)!=null&&A.length),i=!!((F=e==null?void 0:e.armorStands)!=null&&F.length),r=!!((N=e==null?void 0:e.boats)!=null&&N.length);if(!e||!n&&!i&&!r||!this.entityAtlas)return;const{width:s,height:o,length:a}=e,l=this.slice.x,c=this.slice.y,h=this.slice.z,d=s/2,u=o/2,p=a/2,_=[],v=[],m=[],f=[],g=[],x=(D=this.atlas)==null?void 0:D.getRawData(),M=R=>{const U=R%x.cols,P=Math.floor(R/x.cols),L=x.cell;return[U*L/x.size.w,P*L/x.size.h,(U+1)*L/x.size.w,(P+1)*L/x.size.h]},b=(R,U,P,L)=>{const V=I=>_.push(R.pos[I*3]+U,R.pos[I*3+1]+P,R.pos[I*3+2]+L),j=I=>v.push(R.uv[I*2],R.uv[I*2+1]),H=()=>m.push(R.r,R.g,R.b);for(const I of[0,1,2,0,2,3])V(I),j(I),H()};for(const R of e.minecarts??[]){const U=Math.floor(R.x),P=Math.floor(R.y),L=Math.floor(R.z);if(U<l[0]||U>l[1]||P<c[0]||P>c[1]||L<h[0]||L>h[1])continue;const V=R.x-d-.5,j=R.y-u-3/16,H=R.z-p-.5;for(const I of BC(R.yaw,this.entityAtlas))b(I,V,j,H);if(R.content&&x){const I=qs(R.content),ne=3/16+V,te=13/16+V,J=5/16+j,O=13/16+j,Y=3/16+H,K=13/16+H,ue=[{tile:I.tiles[0],q:[te,J,K,te,J,Y,te,O,Y,te,O,K]},{tile:I.tiles[1],q:[ne,J,Y,ne,J,K,ne,O,K,ne,O,Y]},{tile:I.tiles[2],q:[ne,O,K,te,O,K,te,O,Y,ne,O,Y]},{tile:I.tiles[3],q:[ne,J,Y,te,J,Y,te,J,K,ne,J,K]},{tile:I.tiles[4],q:[ne,J,K,te,J,K,te,O,K,ne,O,K]},{tile:I.tiles[5],q:[te,J,Y,ne,J,Y,ne,O,Y,te,O,Y]}];for(const Se of ue){const Me=(W=this.atlas)==null?void 0:W.tileIndex(Se.tile);if(Me===void 0)continue;const[We,Ie,Be,Ge]=M(Me),fe=Se.q;f.push(fe[0],fe[1],fe[2],fe[3],fe[4],fe[5],fe[6],fe[7],fe[8],fe[0],fe[1],fe[2],fe[6],fe[7],fe[8],fe[9],fe[10],fe[11]),g.push(We,Ge,Be,Ge,Be,Ie,We,Ge,Be,Ie,We,Ie)}}}for(const R of e.armorStands??[]){const U=Math.floor(R.x),P=Math.floor(R.y),L=Math.floor(R.z);if(U<l[0]||U>l[1]||P<c[0]||P>c[1]||L<h[0]||L>h[1])continue;const V=R.x-d-.5,j=R.y-u,H=R.z-p-.5;for(const I of VC(R.yaw,this.entityAtlas))b(I,V,j,H)}const w=.375;for(const R of e.boats??[]){const U=Math.floor(R.x),P=Math.floor(R.y),L=Math.floor(R.z);if(U<l[0]||U>l[1]||P<c[0]||P>c[1]||L<h[0]||L>h[1])continue;const V=R.x-d,j=R.y-u+w,H=R.z-p;for(const I of WC(R.variant,R.chest,R.yaw,this.entityAtlas))b(I,V,j,H);if(R.chest&&x){const I=qs("chest"),ne=V-.3,te=V+.3,J=j-.2,O=j+.36,Y=H-.3,K=H+.3,ue=[{tile:I.tiles[0],q:[te,J,K,te,J,Y,te,O,Y,te,O,K]},{tile:I.tiles[1],q:[ne,J,Y,ne,J,K,ne,O,K,ne,O,Y]},{tile:I.tiles[2],q:[ne,O,K,te,O,K,te,O,Y,ne,O,Y]},{tile:I.tiles[3],q:[ne,J,Y,te,J,Y,te,J,K,ne,J,K]},{tile:I.tiles[4],q:[ne,J,K,te,J,K,te,O,K,ne,O,K]},{tile:I.tiles[5],q:[te,J,Y,ne,J,Y,ne,O,Y,te,O,Y]}];for(const Se of ue){const Me=(q=this.atlas)==null?void 0:q.tileIndex(Se.tile);if(Me===void 0)continue;const[We,Ie,Be,Ge]=M(Me),fe=Se.q;f.push(fe[0],fe[1],fe[2],fe[3],fe[4],fe[5],fe[6],fe[7],fe[8],fe[0],fe[1],fe[2],fe[6],fe[7],fe[8],fe[9],fe[10],fe[11]),g.push(We,Ge,Be,Ge,Be,Ie,We,Ge,Be,Ie,We,Ie)}}}const C=new Hr,y=this.clipPlanes;if(_.length&&this.entityMat.map){const R=new $t;R.setAttribute("position",new yt(_,3)),R.setAttribute("uv",new yt(v,2)),R.setAttribute("color",new yt(m,3)),C.add(new cn(R,new Ln({map:this.entityMat.map,vertexColors:!0,side:mn,alphaTest:.5,clippingPlanes:y})))}if(f.length&&this.atlas){const R=new $t;R.setAttribute("position",new yt(f,3)),R.setAttribute("uv",new yt(g,2)),C.add(new cn(R,new Ln({map:this.atlas.texture,side:mn,alphaTest:.5,clippingPlanes:y})))}this.minecartsGroup=C,this.scene.add(C)}setGeometries(e){this.opaqueMesh=this.applyGeometry(this.opaqueMesh,e.opaque,this.matFor("opaque"),0),this.entityMesh=this.applyGeometry(this.entityMesh,e.entity,this.matFor("entity"),0),this.emissiveMesh=this.applyGeometry(this.emissiveMesh,e.emissive,this.showcase?this.emissiveMat:this.opaqueMat,0),this.transMesh=this.applyGeometry(this.transMesh,e.transparent,this.matFor("trans"),1),this.showcase&&(this.ensureNormals(this.opaqueMesh),this.ensureNormals(this.entityMesh),this.ensureNormals(this.transMesh),this.applyShadowFlags(!0),this.requestShadowUpdate())}matFor(e){return this.showcase?e==="opaque"?this.opaqueLit:e==="trans"?this.transLit:this.entityLit:e==="opaque"?this.opaqueMat:e==="trans"?this.transMat:this.entityMat}ensureNormals(e){e&&!e.geometry.getAttribute("normal")&&e.geometry.computeVertexNormals()}applyGeometry(e,n,i,r){return n?(e?(e.geometry.dispose(),e.geometry=n,e.visible=!0):(e=new cn(n,i),e.renderOrder=r,e.frustumCulled=!1,this.scene.add(e)),e):(e&&(e.visible=!1),e)}disposeMesh(e){e&&(e.geometry.dispose(),this.scene.remove(e))}updateNearFar(){const e=this.activeCam,n=this.boundingRadius,i=this.tmpV.subVectors(this.controls.target,e.position).normalize(),r=-e.position.dot(i);e.near=Math.max(.005,r-n*1.4),e.far=Math.max(e.near+.1,r+n*1.4),e.updateProjectionMatrix()}}const Xx={white:"blanco",orange:"naranja",magenta:"magenta",light_blue:"azul claro",yellow:"amarillo",lime:"lima",pink:"rosa",gray:"gris",light_gray:"gris claro",cyan:"cian",purple:"morado",blue:"azul",brown:"marrón",green:"verde",red:"rojo",black:"negro"},PR=Object.keys(Xx),LR=[["concrete_powder","Hormigón en polvo"],["concrete","Hormigón"],["glazed_terracotta","Terracota vidriada"],["terracotta","Terracota"],["stained_glass_pane","Panel de vidrio tintado"],["stained_glass","Vidrio tintado"],["shulker_box","Caja shulker"],["wool","Lana"],["carpet","Alfombra"],["bed","Cama"],["banner","Estandarte"],["candle","Vela"]],qx={oak:"roble",spruce:"abeto",birch:"abedul",jungle:"jungla",acacia:"acacia",dark_oak:"roble oscuro",mangrove:"mangle",cherry:"cerezo",bamboo:"bambú",crimson:"carmesí",warped:"distorsionado"},DR=Object.keys(qx),NR=[["pressure_plate","Placa de presión"],["fence_gate","Puerta de valla"],["trapdoor","Trampilla"],["planks","Tablones"],["stairs","Escaleras"],["slab","Losa"],["fence","Valla"],["door","Puerta"],["button","Botón"],["sign","Cartel"],["leaves","Hojas"],["sapling","Brote"],["log","Tronco"],["wood","Madera"],["stem","Tallo"],["hyphae","Hifa"],["fungus","Hongo"]],IR={air:"Aire",stone:"Piedra",granite:"Granito",diorite:"Diorita",andesite:"Andesita",polished_granite:"Granito pulido",polished_diorite:"Diorita pulida",polished_andesite:"Andesita pulida",cobblestone:"Adoquín",mossy_cobblestone:"Adoquín musgoso",stone_bricks:"Ladrillos de piedra",mossy_stone_bricks:"Ladrillos de piedra musgosos",cracked_stone_bricks:"Ladrillos de piedra agrietados",chiseled_stone_bricks:"Ladrillos de piedra cincelados",smooth_stone:"Piedra lisa",bricks:"Ladrillos",deepslate:"Pizarra profunda",cobbled_deepslate:"Pizarra profunda adoquinada",polished_deepslate:"Pizarra profunda pulida",deepslate_bricks:"Ladrillos de pizarra profunda",deepslate_tiles:"Baldosas de pizarra profunda",tuff:"Toba",calcite:"Calcita",dripstone_block:"Bloque de espeleotema",bedrock:"Roca madre",obsidian:"Obsidiana",crying_obsidian:"Obsidiana llorona",smooth_basalt:"Basalto liso",dirt:"Tierra",coarse_dirt:"Tierra estéril",rooted_dirt:"Tierra con raíces",grass_block:"Bloque de hierba",podzol:"Podzol",mycelium:"Micelio",dirt_path:"Camino de tierra",farmland:"Tierra de cultivo",mud:"Barro",packed_mud:"Barro compacto",mud_bricks:"Ladrillos de barro",clay:"Arcilla",gravel:"Grava",sand:"Arena",red_sand:"Arena roja",sandstone:"Arenisca",smooth_sandstone:"Arenisca lisa",cut_sandstone:"Arenisca cortada",chiseled_sandstone:"Arenisca cincelada",red_sandstone:"Arenisca roja",moss_block:"Bloque de musgo",coal_ore:"Mena de carbón",deepslate_coal_ore:"Mena de carbón (pizarra)",iron_ore:"Mena de hierro",deepslate_iron_ore:"Mena de hierro (pizarra)",copper_ore:"Mena de cobre",deepslate_copper_ore:"Mena de cobre (pizarra)",gold_ore:"Mena de oro",deepslate_gold_ore:"Mena de oro (pizarra)",redstone_ore:"Mena de redstone",deepslate_redstone_ore:"Mena de redstone (pizarra)",emerald_ore:"Mena de esmeralda",deepslate_emerald_ore:"Mena de esmeralda (pizarra)",lapis_ore:"Mena de lapislázuli",deepslate_lapis_ore:"Mena de lapislázuli (pizarra)",diamond_ore:"Mena de diamante",deepslate_diamond_ore:"Mena de diamante (pizarra)",ancient_debris:"Restos antiguos",nether_quartz_ore:"Mena de cuarzo del Nether",nether_gold_ore:"Mena de oro del Nether",raw_iron_block:"Bloque de hierro en bruto",raw_copper_block:"Bloque de cobre en bruto",raw_gold_block:"Bloque de oro en bruto",coal_block:"Bloque de carbón",iron_block:"Bloque de hierro",copper_block:"Bloque de cobre",gold_block:"Bloque de oro",redstone_block:"Bloque de redstone",emerald_block:"Bloque de esmeralda",lapis_block:"Bloque de lapislázuli",diamond_block:"Bloque de diamante",netherite_block:"Bloque de netherita",quartz_block:"Bloque de cuarzo",smooth_quartz:"Cuarzo liso",quartz_bricks:"Ladrillos de cuarzo",chiseled_quartz_block:"Bloque de cuarzo cincelado",quartz_pillar:"Columna de cuarzo",amethyst_block:"Bloque de amatista",budding_amethyst:"Amatista en gemación",redstone:"Polvo de redstone",redstone_wire:"Polvo de redstone",redstone_torch:"Antorcha de redstone",redstone_lamp:"Lámpara de redstone",repeater:"Repetidor",comparator:"Comparador",observer:"Observador",piston:"Pistón",sticky_piston:"Pistón pegajoso",dropper:"Soltador",dispenser:"Dispensador",hopper:"Tolva",lever:"Palanca",target:"Diana",tnt:"TNT",slime_block:"Bloque de slime",honey_block:"Bloque de miel",note_block:"Bloque musical",observer_block:"Observador",daylight_detector:"Sensor de luz solar",lectern:"Atril",rail:"Raíl",powered_rail:"Raíl propulsor",detector_rail:"Raíl detector",activator_rail:"Raíl activador",lightning_rod:"Pararrayos",sculk_sensor:"Sensor de sculk",sculk:"Sculk",sculk_catalyst:"Catalizador de sculk",sculk_shrieker:"Chillón de sculk",chest:"Cofre",trapped_chest:"Cofre trampa",barrel:"Barril",crafting_table:"Mesa de trabajo",furnace:"Horno",blast_furnace:"Alto horno",smoker:"Ahumador",ender_chest:"Cofre de Ender",bookshelf:"Estantería",composter:"Compostador",cauldron:"Caldero",anvil:"Yunque",grindstone:"Piedra de afilar",smithing_table:"Mesa de herrería",stonecutter:"Cortador de piedra",loom:"Telar",cartography_table:"Mesa de cartografía",fletching_table:"Mesa de flechería",beacon:"Baliza",conduit:"Conducto",bell:"Campana",lodestone:"Magnetita",respawn_anchor:"Ancla de reaparición",snow:"Nieve",snow_block:"Bloque de nieve",powder_snow:"Nieve polvo",ice:"Hielo",packed_ice:"Hielo compacto",blue_ice:"Hielo azul",water:"Agua",lava:"Lava",netherrack:"Roca del Nether",nether_bricks:"Ladrillos del Nether",red_nether_bricks:"Ladrillos rojos del Nether",nether_wart_block:"Bloque de verruga del Nether",warped_wart_block:"Bloque de verruga distorsionada",soul_sand:"Arena de almas",soul_soil:"Tierra de almas",magma_block:"Bloque de magma",glowstone:"Piedra luminosa",shroomlight:"Champihongo",basalt:"Basalto",polished_basalt:"Basalto pulido",blackstone:"Piedra negra",polished_blackstone:"Piedra negra pulida",polished_blackstone_bricks:"Ladrillos de piedra negra pulida",gilded_blackstone:"Piedra negra dorada",end_stone:"Piedra del End",end_stone_bricks:"Ladrillos de piedra del End",purpur_block:"Bloque de púrpura",purpur_pillar:"Columna de púrpura",chorus_plant:"Planta de chorus",chorus_flower:"Flor de chorus",torch:"Antorcha",soul_torch:"Antorcha de almas",lantern:"Farol",soul_lantern:"Farol de almas",sea_lantern:"Lámpara marina",glass:"Vidrio",glass_pane:"Panel de vidrio",tinted_glass:"Vidrio polarizado",pumpkin:"Calabaza",carved_pumpkin:"Calabaza tallada",jack_o_lantern:"Calabaza iluminada",melon:"Sandía",hay_block:"Bloque de heno",dried_kelp_block:"Bloque de algas secas",sponge:"Esponja",wet_sponge:"Esponja húmeda",cactus:"Cactus",sugar_cane:"Caña de azúcar",vine:"Enredadera",lily_pad:"Nenúfar",short_grass:"Hierba",tall_grass:"Hierba alta",fern:"Helecho",large_fern:"Helecho grande",dead_bush:"Arbusto seco",cobweb:"Telaraña",scaffolding:"Andamio",spawner:"Generador de monstruos"};function Ma(t){const e=Tt(t),n=IR[e];if(n)return n;for(const s of PR)if(e===s||e.startsWith(s+"_")){const o=e.slice(s.length+1);for(const[a,l]of LR)if(o.includes(a))return`${l} · ${Xx[s]}`}const i=e.startsWith("stripped_"),r=i?e.slice(9):e;for(const s of DR)if(r===s||r.startsWith(s+"_")){const o=r.slice(s.length+1);for(const[a,l]of NR)if(o.includes(a))return`${i&&(a==="log"||a==="wood")?`${l} pelado`:l} de ${qx[s]}`}return UR(e)}function UR(t){const e=t.replace(/_/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}const FR={redstone_wire:"redstone",wall_torch:"torch",redstone_wall_torch:"redstone_torch",soul_wall_torch:"soul_torch"};function kR(t){const e=Tt(t);return FR[e]??e}const OR=new Set(["piston_head","moving_piston"]),BR=new Set(["lava","water"]);function zR(t){const e=t.palette.map(s=>{var a;if(Kr(s.name)||OR.has(Tt(s.name)))return null;const o=Tt(s.name);return BR.has(o)&&((a=s.properties)==null?void 0:a.level)!=="0"?null:kR(s.name)}),n=new Map,i=t.blocks;for(let s=0;s<i.length;s++){const o=e[i[s]];o&&n.set(o,(n.get(o)??0)+1)}const r=[];for(const[s,o]of n)r.push({key:s,count:o,name:Ma(s),hex:Bx(Jc(s)),iconTile:qs(s).tiles[2]});return r.sort((s,o)=>o.count-s.count),r}function VR(t,e){const n=[t.name||"Schematic",`Dimensiones: ${t.width} x ${t.height} x ${t.length}`,`Total: ${t.totalBlocks.toLocaleString("es-ES")} bloques · ${e.length} tipos`,""];for(const i of e){const r=$x(i.count);n.push(`${String(i.count).padStart(8)}  ${i.name}${r?`  (${r})`:""}`)}return n.join(`\r
`)}function $x(t){if(t<64)return"";const e=Math.floor(t/64),n=t%64;if(e<27)return n?`${e} st + ${n}`:`${e} st`;const i=Math.floor(e/27),r=e%27,s=[`${i} cajas`];return r&&s.push(`${r} st`),n&&s.push(`${n}`),s.join(" + ")}let Ko=null,T0=null;const lf=new Set;function HR(){Ko||T0||(T0=fetch(In("item-atlas.json")).then(t=>t.json()).then(t=>{Ko=t,lf.forEach(e=>e())}).catch(()=>{}))}function GR(t){return lf.add(t),()=>{lf.delete(t)}}function WR(t,e){if(!Ko)return null;const n=t.replace(/^minecraft:/,"").replace(/\[.*$/,""),i=Ko.tiles[n];if(i===void 0)return null;const{cell:r,cols:s,size:o}=Ko,a=i%s,l=Math.floor(i/s),c=e/r;return{backgroundImage:`url(${In("item-atlas.png")})`,backgroundSize:`${o.w*c}px ${o.h*c}px`,backgroundPosition:`-${a*r*c}px -${l*r*c}px`,backgroundRepeat:"no-repeat",imageRendering:"pixelated"}}const Al=["top","north","east","south","west","bottom"],vh={top:"Arriba",north:"Norte",east:"Este",south:"Sur",west:"Oeste",bottom:"Abajo"},bc=t=>t.toLocaleString("es-ES");function Yx(t){return`lv:checklist:${t.name}|${t.width}x${t.height}x${t.length}|${t.totalBlocks}`}function jR(t){try{return new Set(JSON.parse(localStorage.getItem(Yx(t))??"[]"))}catch{return new Set}}function A0(t,e){try{localStorage.setItem(Yx(t),JSON.stringify([...e]))}catch{}}function C0({value:t,min:e,max:n,accent:i,onCommit:r}){const[s,o]=ze.useState(String(t));ze.useEffect(()=>{o(String(t))},[t]);function a(){let l=parseInt(s,10);isNaN(l)&&(l=t),l=Math.max(e,Math.min(n,l)),r(l),o(String(l))}return k.jsx("input",{value:s,inputMode:"numeric","aria-label":"límite de corte",onChange:l=>o(l.target.value.replace(/[^0-9]/g,"").slice(0,4)),onFocus:l=>{l.currentTarget.style.borderColor=i,l.currentTarget.select()},onBlur:l=>{a(),l.currentTarget.style.borderColor="#2A2A2E"},onKeyDown:l=>{l.key==="Enter"?l.target.blur():l.key==="ArrowUp"?(l.preventDefault(),r(Math.min(n,t+1))):l.key==="ArrowDown"&&(l.preventDefault(),r(Math.max(e,t-1)))},className:"w-9 text-center text-[12px] tabular-nums rounded-md py-0.5 outline-none transition-colors",style:{background:"#0F0F11",border:"1px solid #2A2A2E",color:"#F5F5F0"}})}function XR({letter:t,name:e,color:n,axisMax:i,minV:r,maxV:s,onChange:o}){const a=ze.useRef(null),l=u=>i<=0?0:u/i*100;function c(u){const p=a.current.getBoundingClientRect();return Math.max(0,Math.min(i,Math.round((u-p.left)/p.width*i)))}function h(u){return p=>{p.preventDefault();const _=p.currentTarget;_.setPointerCapture(p.pointerId);const v=f=>{const g=c(f.clientX);u?o(r,Math.max(r,g)):o(Math.min(s,g),s)},m=()=>{_.releasePointerCapture(p.pointerId),_.removeEventListener("pointermove",v),_.removeEventListener("pointerup",m)};_.addEventListener("pointermove",v),_.addEventListener("pointerup",m)}}const d=r!==0||s!==i;return k.jsxs("div",{className:"flex flex-col gap-2",children:[k.jsxs("div",{className:"flex items-center justify-between",children:[k.jsxs("div",{className:"flex items-center gap-1.5",children:[k.jsx("span",{className:"flex items-center justify-center w-[18px] h-[18px] rounded-md text-[11px] font-bold",style:{color:n,background:n+"22"},children:t}),k.jsx("span",{className:"text-[11px] text-[#71717A]",children:e})]}),k.jsxs("div",{className:"flex items-center gap-1",children:[k.jsx(C0,{value:r,min:0,max:s,accent:n,onCommit:u=>o(u,s)}),k.jsx("span",{className:"text-[#52525A] text-[11px]",children:"–"}),k.jsx(C0,{value:s,min:r,max:i,accent:n,onCommit:u=>o(r,u)})]})]}),k.jsxs("div",{ref:a,className:"relative h-1.5 rounded-full",style:{background:"#2A2A2E"},children:[k.jsx("div",{className:"absolute h-full rounded-full",style:{left:`${l(r)}%`,right:`${100-l(s)}%`,background:d?n:"#3F3F46"}}),k.jsx("div",{className:"absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab border-2",style:{left:`${l(r)}%`,background:"#0D0D0F",borderColor:n,touchAction:"none"},onPointerDown:h(!1)}),k.jsx("div",{className:"absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab",style:{left:`${l(s)}%`,background:n,touchAction:"none"},onPointerDown:h(!0)})]})]})}function qR({value:t,min:e,max:n,color:i="#F4811F",onChange:r}){const s=ze.useRef(null),o=n>e?(t-e)/(n-e)*100:0;function a(c){const h=s.current.getBoundingClientRect(),d=Math.max(0,Math.min(1,(c-h.left)/h.width));return e+d*(n-e)}function l(c){c.preventDefault();const h=s.current;h.setPointerCapture(c.pointerId),r(a(c.clientX));const d=p=>r(a(p.clientX)),u=()=>{h.releasePointerCapture(c.pointerId),h.removeEventListener("pointermove",d),h.removeEventListener("pointerup",u)};h.addEventListener("pointermove",d),h.addEventListener("pointerup",u)}return k.jsxs("div",{ref:s,className:"relative h-1.5 rounded-full cursor-pointer",style:{background:"#2A2A2E",touchAction:"none"},onPointerDown:l,children:[k.jsx("div",{className:"absolute h-full rounded-full",style:{left:0,width:`${o}%`,background:i}}),k.jsx("div",{className:"absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab",style:{left:`${o}%`,background:i,touchAction:"none"}})]})}const $R=[{axis:"y",letter:"Y",name:"Alto",color:"#F4811F"},{axis:"x",letter:"X",name:"Ancho",color:"#F4811F"},{axis:"z",letter:"Z",name:"Largo",color:"#F4811F"}];function YR({model:t,viewer:e}){const n={x:t.width-1,y:t.height-1,z:t.length-1},[i,r]=ze.useState([0,n.x]),[s,o]=ze.useState([0,n.y]),[a,l]=ze.useState([0,n.z]),c={x:i,y:s,z:a},h={x:r,y:o,z:l};function d(m){return(f,g)=>{h[m]([f,g]),e==null||e.setSlice(m,f,g)}}function u(){["x","y","z"].forEach(m=>{h[m]([0,n[m]]),e==null||e.setSlice(m,0,n[m])})}const p=["x","y","z"].some(m=>c[m][0]!==0||c[m][1]!==n[m]),[_,v]=ze.useState(()=>typeof window<"u"&&window.innerWidth<640);return k.jsxs("div",{className:"absolute z-10 flex flex-col gap-3.5 p-4",style:{left:14,top:"50%",transform:"translateY(-50%)",width:"min(86vw, 236px)",background:"rgba(22,22,24,.94)",backdropFilter:"blur(8px)",border:"1px solid #2a2a2e",borderRadius:16,boxShadow:"0 10px 34px rgba(0,0,0,.4)"},children:[k.jsxs("div",{className:"flex items-center justify-between gap-2",children:[k.jsx("span",{className:"text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]",children:"Cortes"}),k.jsxs("div",{className:"flex items-center gap-2",children:[k.jsxs("span",{className:"text-[10px] tabular-nums text-[#52525A]",children:[t.width,"×",t.height,"×",t.length]}),k.jsx("button",{onClick:()=>v(m=>!m),className:"flex items-center justify-center w-5 h-5 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors",title:_?"Expandir":"Minimizar",children:k.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:k.jsx("path",{d:_?"M2 4l4 4 4-4":"M2 8l4-4 4 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]}),!_&&k.jsxs(k.Fragment,{children:[k.jsx("div",{className:"flex flex-col gap-3.5",children:$R.map(({axis:m,letter:f,name:g,color:x})=>k.jsx(XR,{letter:f,name:g,color:x,axisMax:n[m],minV:c[m][0],maxV:c[m][1],onChange:d(m)},m))}),k.jsx("button",{onClick:u,disabled:!p,className:"text-xs rounded-lg py-1.5 border transition-colors",style:p?{color:"#F5F5F0",background:"#1C1C1F",borderColor:"#2A2A2E",cursor:"pointer"}:{color:"#52525A",background:"transparent",borderColor:"#232327",cursor:"default"},children:"Restablecer"})]})]})}function KR({model:t,atlas:e,db:n,entityManifest:i}){const r=ze.useMemo(()=>zR(t),[t]),[s,o]=ze.useState(()=>jR(t)),[a,l]=ze.useState(!0);Kx();function c(u){o(p=>{const _=new Set(p);return _.has(u)?_.delete(u):_.add(u),A0(t,_),_})}function h(){o(new Set),A0(t,new Set)}function d(){const u=VR(t,r),p=new Blob([u],{type:"text/plain;charset=utf-8"}),_=URL.createObjectURL(p),v=document.createElement("a");v.href=_,v.download=`${(t.name||"materiales").replace(/[^\w-]+/g,"_")}.txt`,document.body.appendChild(v),v.click(),v.remove(),URL.revokeObjectURL(_)}return k.jsxs("div",{className:"absolute z-10 flex flex-col overflow-hidden",style:{top:60,right:12,width:"min(86vw, 300px)",maxHeight:"calc(100% - 76px)",background:"#161618",border:"1px solid #2a2a2e",borderRadius:14},children:[k.jsxs("div",{className:"p-3.5 shrink-0",style:{borderBottom:a?"none":"1px solid #2A2A2E"},children:[k.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[k.jsx("span",{className:"text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]",children:"Materiales"}),k.jsxs("div",{className:"flex items-center gap-1.5",children:[!a&&k.jsx("button",{onClick:d,className:"text-[11px] font-semibold text-[#F4811F] px-2 py-0.5 rounded-md border border-[#2A2A2E] bg-[#1C1C1F] hover:border-[#F4811F] transition-colors",children:".txt"}),k.jsx("button",{onClick:()=>l(u=>!u),className:"flex items-center justify-center w-5 h-5 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors",title:a?"Expandir":"Minimizar",children:k.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:k.jsx("path",{d:a?"M2 4l4 4 4-4":"M2 8l4-4 4 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]}),k.jsxs("div",{className:"text-lg font-bold tabular-nums text-[#F5F5F0]",children:[t.width," × ",t.height," × ",t.length]}),k.jsxs("div",{className:"text-xs text-[#A1A1AA] mt-0.5",children:[bc(t.totalBlocks)," bloques · ",r.length," tipos"]}),!a&&k.jsxs("div",{className:"flex items-center justify-between mt-2 text-xs text-[#A1A1AA]",children:[k.jsxs("span",{children:[s.size," / ",r.length," preparados"]}),k.jsx("button",{onClick:h,className:"px-2 py-0.5 rounded-md border border-[#2A2A2E] bg-[#1C1C1F] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",children:"limpiar"})]})]}),!a&&k.jsx("div",{className:"overflow-y-auto p-1.5",style:{scrollbarWidth:"thin",scrollbarColor:"#2a2a2e transparent"},children:r.map(u=>{const p=s.has(u.key),_=$x(u.count);return k.jsxs("div",{onClick:()=>c(u.key),className:`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer select-none transition-opacity ${p?"opacity-50":""} hover:bg-[#1C1C1F]`,children:[k.jsx("div",{className:`w-[18px] h-[18px] shrink-0 rounded-[5px] border flex items-center justify-center transition-colors ${p?"bg-[#F4811F] border-[#F4811F]":"border-[#2A2A2E]"}`,children:p&&k.jsx("svg",{viewBox:"0 0 12 12",fill:"none",stroke:"#0d0d0f",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-2.5 h-2.5",children:k.jsx("path",{d:"M2 6.5 5 9.5 10 3"})})}),k.jsx(Tc,{atlas:e,db:n,entityManifest:i,name:`minecraft:${u.key}`,px:20}),k.jsx("span",{className:`flex-1 text-[13px] truncate ${p?"line-through":"text-[#F5F5F0]"}`,children:u.name}),k.jsxs("div",{className:"flex flex-col items-end leading-tight",children:[k.jsx("span",{className:"text-[13px] font-semibold tabular-nums text-[#F5F5F0]",children:bc(u.count)}),_&&k.jsx("span",{className:"text-[11px] text-[#52525A]",children:_})]})]},u.key)})})]})}const ZR={north:[0,-1],south:[0,1],west:[-1,0],east:[1,0]},QR={north:"east",east:"south",south:"west",west:"north"},JR={north:"west",west:"south",south:"east",east:"north"};function e3(t,e,n,i){var r;return e<0||n<0||i<0||e>=t.width||n>=t.height||i>=t.length?null:((r=t.palette[t.blocks[no(t.width,t.length,e,n,i)]])==null?void 0:r.name)??null}function t3(t,e,n,i,r,s){const o=Tt(r);if(o!=="chest"&&o!=="trapped_chest")return null;const a=s==null?void 0:s.type;if(a!=="left"&&a!=="right")return null;const l=a==="left"?QR[(s==null?void 0:s.facing)??"north"]:JR[(s==null?void 0:s.facing)??"north"],c=ZR[l];if(!c)return null;const h=e+c[0],d=i+c[1];return Tt(e3(t,h,n,d)??"")!==o?null:{x:h,y:n,z:d}}function n3(t,e,n){const i=t==="left"?e:n,r=t==="left"?n:e,s=[];let o=0;for(const a of(i==null?void 0:i.items)??[])s.push(a),o+=a.count;for(const a of(r==null?void 0:r.items)??[])s.push({...a,slot:a.slot+27}),o+=a.count;return{items:s,total:o,slots:s.length}}const i3=t=>t==="true"?"#7BD88F":t==="false"?"#8A8A90":"#F5F5F0",R0={composter:"composter_side",repeater:"repeater",comparator:"comparator",tnt:"tnt_side",piston:"piston_top",sticky_piston:"piston_top_sticky",bamboo:"bamboo_stalk"},r3={hopper_minecart:"hopper",chest_minecart:"chest",furnace_minecart:"furnace",tnt_minecart:"tnt",command_block_minecart:"command_block"};function s3(t,e,n,i){let r,s;if(t.endsWith("shulker_box"))r=Gx(e),s=[{sx:16,sy:44,w:16,h:8,dx:0,dy:8,rot:0},{sx:16,sy:16,w:16,h:12,dx:0,dy:0,rot:0}];else if(t==="chest"||t==="trapped_chest"||t==="ender_chest")r=`chest/${t==="ender_chest"?"ender":t==="trapped_chest"?"trapped":"normal"}`,s=[{sx:42,sy:33,w:14,h:10,dx:1,dy:5,rot:180},{sx:42,sy:14,w:14,h:5,dx:1,dy:1,rot:180},{sx:1,sy:1,w:2,h:4,dx:7,dy:4,rot:180}];else if(Sa(e))r=Sa(e),s=[{sx:8,sy:8,w:8,h:8,dx:4,dy:4,rot:0}];else return null;const o=n.tex[r];if(!o)return null;const[a,l]=n.size,c=i/16;return k.jsx("div",{style:{position:"relative",width:i,height:i},children:s.map((h,d)=>k.jsx("div",{style:{position:"absolute",left:h.dx*c,top:h.dy*c,width:h.w*c,height:h.h*c,transform:h.rot?`rotate(${h.rot}deg)`:void 0,backgroundImage:"url(/entity-atlas.png)",backgroundSize:`${a*c}px ${l*c}px`,backgroundPosition:`-${(o.x+h.sx)*c}px -${(o.y+h.sy)*c}px`,backgroundRepeat:"no-repeat",imageRendering:"pixelated"}},d))})}function o3(t){const e=Math.max(0,Math.min(15,t))/15,n=Math.round((e*.6+(e>0?.4:.3))*255),i=Math.round(Math.max(0,Math.min(1,e*e*.7-.5))*255),r=Math.round(Math.max(0,Math.min(1,e*e*.6-.7))*255);return`rgb(${n},${i},${r})`}function Kx(){const[,t]=ze.useState(0);ze.useEffect(()=>(HR(),GR(()=>t(e=>e+1))),[])}function a3(t,e,n,i,r){const s=Tt(n),o="inset 0 0 0 1px rgba(255,255,255,.12)";if(s==="redstone_wire"||s==="redstone"){const h=s==="redstone"?9:parseInt((i==null?void 0:i.power)??"0",10)||0,d=o3(h),u=t.cssBackground("redstone_dust_dot",r);return u?{background:d,WebkitMaskImage:u.backgroundImage,maskImage:u.backgroundImage,WebkitMaskSize:u.backgroundSize,maskSize:u.backgroundSize,WebkitMaskPosition:u.backgroundPosition,maskPosition:u.backgroundPosition,WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat"}:{background:d,boxShadow:o}}const a=[];R0[s]&&a.push(R0[s]);const l=e==null?void 0:e.resolve(n,i);if(l){const h=[];for(const d of l)for(const u of d.model.elements){const p=u.faces.up;p&&h.push({y:u.to[1],tile:p.tile})}h.sort((d,u)=>u.y-d.y);for(const d of h)a.push(d.tile)}a.push(qs(n,i).tiles[2],`${s}_top`,s,`${s}_side`);for(const h of a){const d=t.cssBackground(h,r);if(d)return d}const c=WR(n,r);return c||{background:Bx(Jc(n,i)),boxShadow:o}}function l3(t,e,n,i,r){const s=e==null?void 0:e.resolve(n,i);if(!s)return null;const o=r/16,a=[];for(const l of s)for(const c of l.model.elements){const h=c.faces.up;h&&a.push({y:c.to[1],tile:h.tile,uv:h.uv,fx:c.from[0],fz:c.from[2],w:c.to[0]-c.from[0],h:c.to[2]-c.from[2]})}return a.length===0?null:(a.sort((l,c)=>l.y-c.y),k.jsx("div",{style:{position:"relative",width:r,height:r},children:a.map((l,c)=>{const h=t.cssCrop(l.tile,l.uv[0],l.uv[1],l.uv[2],l.uv[3],l.w*o,l.h*o);return h?k.jsx("div",{style:{position:"absolute",left:l.fx*o,top:l.fz*o,width:l.w*o,height:l.h*o,...h}},c):null})}))}function c3(t,e,n,i,r){const s=e==null?void 0:e.resolve(n,i);if(!s)return null;const o=r/16,a=[];for(const l of s)for(const c of l.model.elements){const h=c.faces.south??c.faces.north??c.faces.east??c.faces.west;h&&a.push({z:c.to[2],tile:h.tile,uv:h.uv,fx:c.from[0],fy:c.from[1],w:c.to[0]-c.from[0],h:c.to[1]-c.from[1]})}return a.length===0?null:(a.sort((l,c)=>l.z-c.z),k.jsx("div",{style:{position:"relative",width:r,height:r},children:a.map((l,c)=>{const h=t.cssCrop(l.tile,l.uv[0],l.uv[1],l.uv[2],l.uv[3],l.w*o,l.h*o);if(!h)return null;const d=(16-(l.fy+l.h))*o;return k.jsx("div",{style:{position:"absolute",left:l.fx*o,top:d,width:l.w*o,height:l.h*o,...h}},c)})}))}function Tc({atlas:t,db:e,entityManifest:n,name:i,properties:r,px:s=44}){const o=r3[Tt(i)],a=o?`minecraft:${o}`:i,l=Tt(a);let c=n?s3(l,a,n,s):null;return!c&&(l==="repeater"||l==="comparator")&&(c=l3(t,e,a,r,s)),!c&&l.endsWith("stairs")&&(c=c3(t,e,a,r,s)),k.jsx("div",{className:"shrink-0 overflow-hidden",style:{width:s,height:s,borderRadius:Math.max(3,Math.round(s*.18)),...c?{}:a3(t,e,a,r,s)},children:c})}const u3={hopper:{cols:5,size:5},brewing_stand:{cols:5,size:5},dropper:{cols:3,size:9},dispenser:{cols:3,size:9},crafter:{cols:3,size:9},furnace:{cols:3,size:3},blast_furnace:{cols:3,size:3},smoker:{cols:3,size:3},chest:{cols:9,size:27},trapped_chest:{cols:9,size:27},barrel:{cols:9,size:27}};function h3(t,e){if(t.endsWith("shulker_box"))return{cols:9,size:27};const n=u3[t];if(n)return n;const i=Math.max(1,e.reduce((r,s)=>Math.max(r,s.slot+1),0));return{cols:Math.min(9,i),size:i}}function d3({name:t,content:e,atlas:n,db:i,entityManifest:r,forceSize:s,onClose:o}){var _;Kx();const a=Tt(t),l=h3(a,e.items),c=l.cols,h=s??l.size,d=Math.max(h,e.items.reduce((v,m)=>Math.max(v,m.slot+1),0)),u=new Map(e.items.map(v=>[v.slot,v])),p=new Set(e.disabled??[]);return k.jsxs("div",{className:"absolute z-20 flex flex-col gap-3 p-4",style:{left:14,top:56,maxWidth:"min(92vw, 460px)",maxHeight:"calc(100% - 72px)",overflowY:"auto",background:"rgba(22,22,24,.98)",border:"1px solid #2a2a2e",borderRadius:16,boxShadow:"0 20px 60px rgba(0,0,0,.5)"},children:[k.jsxs("div",{className:"flex items-center gap-2.5",children:[k.jsx(Tc,{atlas:n,db:i,entityManifest:r,name:t,px:28}),k.jsxs("div",{className:"flex flex-col leading-tight",children:[k.jsx("span",{className:"text-[14px] font-semibold text-[#F5F5F0]",children:Ma(t)}),k.jsxs("span",{className:"text-[11px] text-[#A1A1AA]",children:[bc(e.total)," ítems · ",e.slots," ",e.slots===1?"hueco":"huecos",(_=e.disabled)!=null&&_.length?` · ${e.disabled.length} bloqueados`:""]})]}),k.jsx("div",{className:"flex-1"}),k.jsx("button",{onClick:o,"aria-label":"Cerrar",className:"flex items-center justify-center w-6 h-6 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors",children:k.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:k.jsx("path",{d:"M2 2l8 8M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]}),k.jsx("div",{className:"grid gap-1",style:{gridTemplateColumns:`repeat(${c}, 40px)`},children:Array.from({length:d},(v,m)=>{const f=u.get(m),g=p.has(m);return k.jsxs("div",{className:"relative flex items-center justify-center",style:{width:40,height:40,borderRadius:6,background:g?"#241719":"#0F0F11",border:`1px solid ${g?"#5A2E2E":"#2A2A2E"}`},title:g?"Bloqueado":f?`${Ma(f.id)} ×${f.count}`:void 0,children:[f&&k.jsxs(k.Fragment,{children:[k.jsx(Tc,{atlas:n,db:i,entityManifest:r,name:f.id,px:32}),f.count>1&&k.jsx("span",{className:"absolute",style:{right:2,bottom:0,fontSize:11,fontWeight:600,color:"#fff",textShadow:"1px 1px 0 #000"},children:f.count})]}),g&&k.jsx("svg",{className:"absolute",width:"40",height:"40",viewBox:"0 0 40 40",fill:"none","aria-hidden":"true",children:k.jsx("path",{d:"M12 12 28 28M28 12 12 28",stroke:"#C0584F",strokeWidth:"3",strokeLinecap:"round"})})]},m)})})]})}function P0({lines:t}){return k.jsx("div",{className:"rounded-lg px-2.5 py-2 flex flex-col items-center gap-0.5",style:{background:"#0F0F11",border:"1px solid #2A2A2E"},children:t.length?t.map((e,n)=>k.jsx("span",{className:"text-[12px] text-center text-[#F5F5F0]",style:{minHeight:14,lineHeight:"14px"},children:e||" "},n)):k.jsx("span",{className:"text-[12px] italic text-[#52525A]",children:"(vacío)"})})}function f3({picked:t,atlas:e,db:n,entityManifest:i,onOpenInventory:r,onClose:s}){const o=t.properties?Object.entries(t.properties):[];return k.jsxs("div",{className:"absolute z-10 flex flex-col gap-3 p-4",style:{left:14,top:56,minWidth:210,maxWidth:360,background:"rgba(22,22,24,.94)",backdropFilter:"blur(8px)",border:"1px solid #2a2a2e",borderRadius:16,boxShadow:"0 10px 34px rgba(0,0,0,.4)"},children:[k.jsx("button",{onClick:s,"aria-label":"Cerrar",className:"absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded text-[#71717A] hover:text-[#F5F5F0] transition-colors",children:k.jsx("svg",{width:"11",height:"11",viewBox:"0 0 12 12",fill:"none",children:k.jsx("path",{d:"M2 2l8 8M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),k.jsxs("div",{className:"flex items-center gap-3 pr-5",children:[k.jsx(Tc,{atlas:e,db:n,entityManifest:i,name:t.name,properties:t.properties}),k.jsxs("div",{className:"flex flex-col gap-0.5 min-w-0",children:[k.jsx("span",{className:"text-[15px] font-semibold text-[#F5F5F0] leading-tight truncate",title:Ma(t.name),children:Ma(t.name)}),k.jsx("span",{className:"text-[11px] text-[#52525A] font-mono leading-tight truncate",title:t.name,children:t.name})]})]}),t.content&&k.jsxs("button",{onClick:r,className:"flex items-center gap-1.5 self-start text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors hover:brightness-125",style:{background:"#F4811F1A",border:"1px solid #F4811F40",color:"#F4811F"},children:[k.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 14 14",fill:"none","aria-hidden":"true",children:[k.jsx("rect",{x:"1.5",y:"3",width:"11",height:"9",rx:"1",stroke:"currentColor",strokeWidth:"1.3"}),k.jsx("path",{d:"M1.5 6.5h11M7 6.5v5.5",stroke:"currentColor",strokeWidth:"1.3"})]}),"Inventario · ",bc(t.content.total)," ítems"]}),t.sign&&k.jsxs("div",{className:"flex flex-col gap-1.5 pt-3",style:{borderTop:"1px solid #232327"},children:[t.sign.back.length>0&&k.jsx("span",{className:"text-[10px] uppercase tracking-wide text-[#71717A]",children:"Frente"}),k.jsx(P0,{lines:t.sign.front}),t.sign.back.length>0&&k.jsxs(k.Fragment,{children:[k.jsx("span",{className:"text-[10px] uppercase tracking-wide text-[#71717A] mt-1",children:"Detrás"}),k.jsx(P0,{lines:t.sign.back})]})]}),o.length>0&&k.jsx("div",{className:"flex flex-col gap-2 pt-3",style:{borderTop:"1px solid #232327"},children:o.map(([a,l])=>k.jsxs("div",{className:"flex items-center justify-between gap-4 text-[12px]",children:[k.jsx("span",{className:"text-[#71717A] truncate",children:a}),k.jsx("span",{className:"font-medium tabular-nums whitespace-nowrap",style:{color:i3(l)},children:l})]},a))})]})}function p3({cargado:t,viewerRef:e,onReady:n,onRebuild:i,className:r,style:s}){const o=ze.useRef(null),a=ze.useRef(null);return ze.useEffect(()=>{const l=o.current;if(!l)return;const c=new RR(l);return e.current=c,i&&(c.onRebuild=i),c.setAtlas(t.atlas),c.setModelDB(t.db),c.load(t.model),n==null||n(),()=>{c.dispose(),e.current===c&&(e.current=null)}},[t]),ze.useEffect(()=>{const l=a.current;if(!l)return;const c=new ResizeObserver(()=>{var h;return(h=e.current)==null?void 0:h.resize()});return c.observe(l),()=>c.disconnect()},[]),k.jsx("div",{ref:a,className:r,style:s,children:k.jsx("canvas",{ref:o,style:{display:"block",width:"100%",height:"100%"}})})}function m3({cargado:t,title:e,onClose:n}){var Be,Ge,fe;const i=!!n,r=ze.useRef(null),[s,o]=ze.useState(!1),[a,l]=ze.useState("free"),[c,h]=ze.useState(0),[d,u]=ze.useState(!1),[p,_]=ze.useState("#1c1c1f"),[v,m]=ze.useState(!1),[f,g]=ze.useState(null),x=ze.useRef(null),M=ze.useRef({}),[b,w]=ze.useState(null),[C,y]=ze.useState(!1),[A,F]=ze.useState(!1),[N,D]=ze.useState(!1),[W,q]=ze.useState(!1),[R,U]=ze.useState(1),[P,L]=ze.useState(!1),[V,j]=ze.useState(!1),H=ze.useRef(null),I=ze.useRef(null);function ne(){var he,De;const re=H.current;re&&(document.fullscreenElement?(he=document.exitFullscreen)==null||he.call(document):(De=re.requestFullscreen)==null||De.call(re))}ze.useEffect(()=>{const re=()=>j(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",re),()=>document.removeEventListener("fullscreenchange",re)},[]);function te(){var he;const re=!A;F(re),D(!1),re&&(l("free"),w(null),y(!1)),(he=r.current)==null||he.setShowcase(re)}function J(){var he;const re=!N;D(re),(he=r.current)==null||he.setShowcaseRotation(!re)}async function O(){var re;if(!W){q(!0);try{const he=await((re=r.current)==null?void 0:re.capturePhoto());if(he){const De=(e||"schematic").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"schematic",z=URL.createObjectURL(he),je=document.createElement("a");je.href=z,je.download=`${De}.png`,je.click(),URL.revokeObjectURL(z)}}finally{q(!1)}}}function Y(re){var z,je;const he=(z=re.target.files)==null?void 0:z[0];if(!he)return;const De=URL.createObjectURL(he);g(De),(je=r.current)==null||je.setBackgroundImage(De)}function K(){var re;g(null),(re=r.current)==null||re.setBackground(p)}async function ue(){var z;const re=!v;m(re);const he=re?"rt":"van";let De=M.current[he];if(!De){if(re){const[je,Xe]=await Promise.all([Qc.load(In("atlas-rt.png"),In("atlas-rt.json")),xa.load(In("models-rt.json"))]);De={atlas:je,db:Xe}}else De={atlas:t.atlas,db:t.db};M.current[he]=De}(z=r.current)==null||z.setResources(De.atlas,De.db)}ze.useEffect(()=>{if(!n)return;const re=he=>{he.key==="Escape"&&(C?y(!1):n())};return window.addEventListener("keydown",re),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",re),document.body.style.overflow=""}},[n,C]),ze.useEffect(()=>{var re,he;(re=r.current)==null||re.setHighlight(b?{x:b.x,y:b.y,z:b.z}:null),(he=r.current)==null||he.setHighlightPair((b==null?void 0:b.pair)??null)},[b]);function Se(re){if(re.target.tagName!=="CANVAS"){I.current=null;return}I.current={x:re.clientX,y:re.clientY,t:performance.now()}}function Me(re){var T,S,$,oe,le;const he=I.current;if(I.current=null,re.button!==0&&re.pointerType!=="touch"||!he||re.target.tagName!=="CANVAS"||Math.hypot(re.clientX-he.x,re.clientY-he.y)>6||performance.now()-he.t>400)return;const De=(T=r.current)==null?void 0:T.pick(re.clientX,re.clientY);if(y(!1),!De){w(null);return}const z=t.model,je=no(z.width,z.length,De.x,De.y,De.z);let Xe=(S=z.containers)==null?void 0:S.get(je),ht,xe;const st=t3(z,De.x,De.y,De.z,De.state.name,De.state.properties);if(st){ht=st,xe=54;const pe=($=z.containers)==null?void 0:$.get(no(z.width,z.length,st.x,st.y,st.z));Xe=n3(((oe=De.state.properties)==null?void 0:oe.type)??"left",Xe,pe)}w({x:De.x,y:De.y,z:De.z,name:De.state.name,properties:De.state.properties,content:Xe,sign:(le=z.signs)==null?void 0:le.get(je),pair:ht,doubleSlots:xe})}function We(re,he){var De,z,je;re==="free"?(De=r.current)==null||De.setView("free"):re==="iso"?(z=r.current)==null||z.setView("iso"):(je=r.current)==null||je.setView(Al[he])}function Ie(re){var De;A&&(F(!1),(De=r.current)==null||De.setShowcase(!1));let he=c;re==="orto"&&a==="orto"?(he=(c+1)%Al.length,h(he)):re==="orto"&&(he=0,h(0)),l(re),We(re,he)}return k.jsxs("div",{ref:H,className:i?"fixed inset-0 z-50":"relative w-full h-full",style:{background:p},onPointerDown:Se,onPointerUp:Me,onContextMenu:re=>re.preventDefault(),children:["   ",f&&k.jsx("div",{className:"absolute inset-0",style:{backgroundImage:`url("${f}")`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}),BS(t.model)?k.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3",children:[k.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",className:"text-[#F4811F]","aria-hidden":"true",children:[k.jsx("path",{d:"M12 2 2 7v10l10 5 10-5V7L12 2Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"}),k.jsx("path",{d:"M2 7l10 5 10-5M12 12v10",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})]}),k.jsx("p",{className:"text-[#F5F5F0] font-semibold",children:"Build demasiado grande para previsualizar en 3D"}),k.jsxs("p",{className:"text-sm text-[#A1A1AA] max-w-sm",children:[t.model.totalBlocks.toLocaleString("es-ES")," bloques ·"," ",t.model.width,"×",t.model.height,"×",t.model.length,". El navegador no puede renderizarla entera; descárgala para verla en Minecraft."]})]}):k.jsx(p3,{cargado:t,viewerRef:r,onReady:()=>o(!0),className:"absolute inset-0",style:{width:"100%",height:"100%"}}),k.jsxs("div",{className:"absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-2.5",style:{background:"linear-gradient(180deg, rgba(13,13,15,.92) 0%, rgba(13,13,15,0) 100%)"},children:[k.jsx("span",{className:"hidden sm:block text-sm font-semibold text-[#F5F5F0] whitespace-nowrap",children:e}),k.jsx("div",{className:"hidden sm:block sm:flex-1 sm:min-w-[12px]"}),k.jsx("div",{className:"flex rounded-xl overflow-hidden border border-[#2A2A2E]",style:{background:"#161618"},children:["free","iso","orto"].map((re,he)=>k.jsx("button",{onClick:()=>Ie(re),className:`px-3 py-1.5 text-[13px] font-medium transition-colors ${he>0?"border-l border-[#2A2A2E]":""}`,style:a===re?{background:"#F4811F",color:"#0d0d0f"}:{color:"#A1A1AA"},children:re==="free"?"Libre":re==="iso"?"Iso":a==="orto"?vh[Al[c]]:"Orto"},re))}),k.jsxs("div",{onClick:()=>u(!1),className:`sm:contents ${d?"absolute right-2 top-full mt-1.5 z-20 flex flex-col items-stretch gap-1.5 p-2 rounded-xl border border-[#2A2A2E] bg-[#161618] shadow-[0_12px_40px_rgba(0,0,0,.6)]":"hidden"}`,children:[a==="orto"?k.jsx("div",{className:"flex rounded-lg overflow-hidden border border-[#2A2A2E]",style:{background:"#161618"},children:Al.map((re,he)=>k.jsx("button",{onClick:()=>{var De;h(he),(De=r.current)==null||De.setView(re)},className:`px-2 py-1.5 text-[12px] font-medium transition-colors ${he>0?"border-l border-[#2A2A2E]":""}`,style:c===he?{background:"#F4811F",color:"#0d0d0f"}:{color:"#A1A1AA"},title:vh[re],children:vh[re].slice(0,1)},re))}):a==="iso"?k.jsx("button",{onClick:()=>{var re;return(re=r.current)==null?void 0:re.rotate90()},className:"flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",style:{background:"#161618"},title:"Rotar 90°",children:k.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:k.jsx("path",{d:"M2 7a5 5 0 0 1 9-3M12 1v3H9",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})})}):k.jsx("button",{onClick:()=>{var re;return(re=r.current)==null?void 0:re.resetView()},className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] text-[13px] font-medium transition-colors",style:{background:"#161618"},title:"Restablecer cámara",children:"Reajustar"}),a==="free"&&k.jsxs("button",{onClick:()=>{var he;const re=!P;L(re),(he=r.current)==null||he.setFlyEnabled(re)},title:P?"Desactivar vuelo libre (WASD)":"Activar vuelo libre con WASD para moverte por la build",className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors",style:P?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:[k.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[k.jsx("rect",{x:"2.5",y:"6.5",width:"19",height:"11",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),k.jsx("path",{d:"M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M8 13.5h8",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),"Vuelo WASD"]}),k.jsxs("button",{onClick:te,title:"Showcase — rotación automática e iluminación cinemática",className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors",style:A?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:[k.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:k.jsx("path",{d:"M12 3l1.9 4.7L19 9.5l-4.1 2.7L16 17l-4-2.6L8 17l1.1-4.8L5 9.5l5.1-1.8L12 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})}),"Showcase"]}),A&&k.jsx("button",{onClick:J,title:N?"Reanudar rotación":"Pausar rotación",className:"flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",style:{background:"#161618"},children:N?k.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"currentColor",children:k.jsx("path",{d:"M3 2l9 5-9 5V2z"})}):k.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"currentColor",children:[k.jsx("rect",{x:"3",y:"2",width:"3",height:"10",rx:"1"}),k.jsx("rect",{x:"8",y:"2",width:"3",height:"10",rx:"1"})]})}),k.jsxs("button",{onClick:O,disabled:W,title:"Hacer foto (PNG con fondo transparente) y descargar",className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#F5F5F0] hover:border-[#3A3A3F] text-[13px] font-medium transition-colors disabled:opacity-50",style:{background:"#161618"},children:[k.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",children:[k.jsx("path",{d:"M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),k.jsx("circle",{cx:"12",cy:"13",r:"3.2",stroke:"currentColor",strokeWidth:"1.6"})]}),W?"Guardando…":"Foto"]}),k.jsx("button",{onClick:ue,title:"Redstone Tweaks — texturas técnicas (by RexxStone)",className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors",style:v?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:"Redstone Tweaks"}),k.jsxs("label",{title:"Color de fondo",className:"flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] cursor-pointer hover:border-[#3A3A3F] transition-colors overflow-hidden relative",style:{background:"#161618"},children:[k.jsx("div",{className:"w-4 h-4 rounded-sm border border-white/20",style:{background:p}}),k.jsx("input",{type:"color",value:p,onChange:re=>{var he;_(re.target.value),g(null),(he=r.current)==null||he.setBackground(re.target.value)},className:"absolute inset-0 opacity-0 cursor-pointer w-full h-full"})]}),k.jsx("button",{onClick:()=>{var re;return f?K():(re=x.current)==null?void 0:re.click()},title:f?"Quitar imagen de fondo":"Imagen de fondo",className:"flex items-center justify-center w-8 h-8 rounded-lg border transition-colors",style:f?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:k.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",children:[k.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),k.jsx("circle",{cx:"8.5",cy:"9.5",r:"1.5",fill:"currentColor"}),k.jsx("path",{d:"M21 16l-5-5L5 20",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})]})}),k.jsx("input",{ref:x,type:"file",accept:"image/*",className:"hidden",onChange:Y})]}),k.jsx("button",{onClick:()=>u(re=>!re),title:"Más opciones",className:"sm:hidden flex items-center justify-center w-8 h-8 rounded-lg border transition-colors",style:d?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:k.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:[k.jsx("circle",{cx:"3",cy:"8",r:"1.4"}),k.jsx("circle",{cx:"8",cy:"8",r:"1.4"}),k.jsx("circle",{cx:"13",cy:"8",r:"1.4"})]})}),k.jsx("button",{onClick:ne,title:V?"Salir de pantalla completa":"Pantalla completa",className:"flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",style:{background:"#161618"},children:V?k.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:k.jsx("path",{d:"M9 3v3a3 3 0 0 1-3 3H3M21 9h-3a3 3 0 0 1-3-3V3M3 15h3a3 3 0 0 1 3 3v3M15 21v-3a3 3 0 0 1 3-3h3",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})}):k.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:k.jsx("path",{d:"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}),n&&k.jsxs("button",{onClick:n,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] text-sm transition-colors",style:{background:"#161618"},children:[k.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:k.jsx("path",{d:"M2 2l8 8M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),k.jsx("span",{className:"hidden sm:inline",children:"Cerrar"})]})]}),s&&k.jsx(YR,{model:t.model,viewer:r.current}),s&&k.jsx(KR,{model:t.model,atlas:t.atlas,db:t.db,entityManifest:((Be=r.current)==null?void 0:Be.getEntityManifest())??null}),s&&b&&!C&&k.jsx(f3,{picked:b,atlas:t.atlas,db:t.db,entityManifest:((Ge=r.current)==null?void 0:Ge.getEntityManifest())??null,onOpenInventory:()=>y(!0),onClose:()=>{w(null),y(!1)}}),s&&C&&(b==null?void 0:b.content)&&k.jsx(d3,{name:b.name,content:b.content,atlas:t.atlas,db:t.db,entityManifest:((fe=r.current)==null?void 0:fe.getEntityManifest())??null,forceSize:b.doubleSlots,onClose:()=>y(!1)}),s&&a==="free"&&P&&k.jsxs("div",{className:"absolute bottom-20 left-3 z-10 select-none text-[11px] text-[#A1A1AA] flex flex-col gap-2",style:{maxWidth:280},children:[k.jsxs("div",{className:"flex flex-col gap-2 pointer-events-auto",style:{width:230,background:"rgba(13,13,15,.6)",padding:"8px 10px",borderRadius:8,backdropFilter:"blur(4px)"},children:[k.jsxs("div",{className:"flex items-center justify-between gap-3",children:[k.jsx("span",{className:"text-[#F5F5F0] font-semibold whitespace-nowrap",children:"Velocidad de free cam"}),k.jsxs("span",{className:"tabular-nums text-[#F4811F]",children:[R.toFixed(2),"×"]})]}),k.jsx(qR,{value:R,min:.1,max:5,onChange:re=>{var he;U(re),(he=r.current)==null||he.setFlySpeed(re)}})]}),k.jsxs("div",{className:"pointer-events-none",style:{background:"rgba(13,13,15,.6)",padding:"4px 8px",borderRadius:8,backdropFilter:"blur(4px)"},children:[k.jsx("span",{className:"text-[#F5F5F0] font-semibold",children:"WASD"})," moverte · ",k.jsx("span",{className:"text-[#F5F5F0] font-semibold",children:"Espacio/Shift"})," subir/bajar"]})]})]})}function g3({onFile:t}){const[e,n]=ze.useState(!1),i=ze.useRef(null),r=ze.useCallback(s=>{s.preventDefault(),n(!1);const o=s.dataTransfer.files[0];o&&t(o)},[t]);return k.jsxs("div",{onDragOver:s=>{s.preventDefault(),n(!0)},onDragLeave:()=>n(!1),onDrop:r,onClick:()=>{var s;return(s=i.current)==null?void 0:s.click()},className:`w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-16 px-8 ${e?"border-[#F4811F] bg-[#F4811F]/5":"border-[#2A2A2E] hover:border-[#3A3A3F] bg-[#161618] hover:bg-[#1A1A1D]"}`,children:[k.jsx("input",{ref:i,type:"file",accept:".litematic,.schem",className:"hidden",onChange:s=>{var a;const o=(a=s.target.files)==null?void 0:a[0];o&&t(o)}}),k.jsx("div",{className:"w-16 h-16 rounded-2xl bg-[#1C1C1F] border border-[#2A2A2E] flex items-center justify-center",children:k.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",className:"text-[#F4811F]",children:[k.jsx("path",{d:"M21 7l-9-5-9 5v10l9 5 9-5V7z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"}),k.jsx("path",{d:"M12 2v20M3 7l9 5 9-5",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})]})}),k.jsxs("div",{className:"text-center",children:[k.jsx("p",{className:"font-semibold text-[#F5F5F0]",children:"Arrastra tu schematic aquí"}),k.jsx("p",{className:"mt-1 text-sm text-[#71717A]",children:"o haz click para seleccionar"}),k.jsxs("p",{className:"mt-3 text-xs text-[#52525A]",children:["Soporta ",k.jsx("span",{className:"text-[#A1A1AA]",children:".litematic"})," y ",k.jsx("span",{className:"text-[#A1A1AA]",children:".schem"})," ","— el archivo nunca sale de tu navegador"]})]})]})}function _3(){const[t,e]=ze.useState("idle"),[n,i]=ze.useState(""),[r,s]=ze.useState(null),[o,a]=ze.useState(""),l=ze.useCallback(async h=>{e("loading"),i(""),s(null),a(h.name);try{const d=await h.arrayBuffer(),u=await rM(d,h.name),[p,_]=await Promise.all([Qc.load(),xa.load()]);s({model:u,atlas:p,db:_}),e("loaded")}catch(d){i(d instanceof Error&&d.message==="SCHEMATIC_TOO_LARGE"?"Build demasiado grande para previsualizar en 3D. Descárgala para verla en Minecraft.":d instanceof Error?d.message:"Error desconocido"),e("error")}},[]),c=o.replace(/\.(litematic|schem)$/i,"");return k.jsxs("main",{className:"min-h-screen bg-[#0D0D0F]",children:[k.jsxs("div",{className:"w-full px-4 sm:px-8 py-4 border-b border-[#1E1E21] flex items-center gap-2 text-sm",children:[k.jsx("span",{className:"text-[#F5F5F0] font-medium",children:"Lite Viewer"}),o&&k.jsxs(k.Fragment,{children:[k.jsx("span",{className:"text-[#3A3A3F]",children:"/"}),k.jsx("span",{className:"text-[#A1A1AA] truncate max-w-xs",children:c})]}),t==="loaded"&&k.jsxs("button",{onClick:()=>{e("idle"),s(null),a("")},className:"ml-auto flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#F5F5F0] transition-colors",children:[k.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:k.jsx("path",{d:"M2 2l8 8M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),"Cargar otro"]})]}),t==="idle"&&k.jsxs("div",{className:"flex flex-col items-center justify-center py-24 px-4",children:[k.jsxs("div",{className:"mb-8 text-center",children:[k.jsx("h1",{className:"text-2xl font-bold text-[#F5F5F0]",children:"Lite Viewer"}),k.jsx("p",{className:"mt-2 text-sm text-[#71717A]",children:"Visualiza tus schematics en 3D sin subirlos a ningún servidor"})]}),k.jsx(g3,{onFile:l})]}),t==="loading"&&k.jsxs("div",{className:"flex flex-col items-center justify-center py-32 gap-4",children:[k.jsx("div",{className:"w-10 h-10 rounded-full border-2 border-[#F4811F] border-t-transparent animate-spin"}),k.jsx("p",{className:"text-sm text-[#A1A1AA]",children:"Procesando schematic…"}),k.jsx("p",{className:"text-xs text-[#52525A]",children:o})]}),t==="error"&&k.jsxs("div",{className:"flex flex-col items-center justify-center py-32 gap-4",children:[k.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",className:"text-[#71717A]",children:[k.jsx("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor",strokeWidth:"1.5"}),k.jsx("path",{d:"M12 8v4M12 16h.01",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),k.jsx("p",{className:"text-sm text-[#71717A]",children:"No se pudo procesar el archivo"}),n&&k.jsx("p",{className:"text-xs text-[#52525A] max-w-sm text-center",children:n}),k.jsx("button",{onClick:()=>e("idle"),className:"mt-2 px-4 py-2 rounded-lg bg-[#161618] border border-[#2A2A2E] text-sm text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",children:"Intentar con otro archivo"})]}),t==="loaded"&&r&&k.jsx("div",{className:"relative w-full",style:{height:"calc(100vh - 57px)"},children:k.jsx(m3,{cargado:r,title:c})})]})}LS("./");Gv(document.getElementById("root")).render(k.jsx(ze.StrictMode,{children:k.jsx(_3,{})}));
