(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var N0={exports:{}},Rc={},I0={exports:{}},it={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wa=Symbol.for("react.element"),l1=Symbol.for("react.portal"),c1=Symbol.for("react.fragment"),u1=Symbol.for("react.strict_mode"),h1=Symbol.for("react.profiler"),d1=Symbol.for("react.provider"),f1=Symbol.for("react.context"),p1=Symbol.for("react.forward_ref"),m1=Symbol.for("react.suspense"),g1=Symbol.for("react.memo"),_1=Symbol.for("react.lazy"),Bp=Symbol.iterator;function v1(t){return t===null||typeof t!="object"?null:(t=Bp&&t[Bp]||t["@@iterator"],typeof t=="function"?t:null)}var U0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},k0=Object.assign,F0={};function uo(t,e,n){this.props=t,this.context=e,this.refs=F0,this.updater=n||U0}uo.prototype.isReactComponent={};uo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};uo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function O0(){}O0.prototype=uo.prototype;function hf(t,e,n){this.props=t,this.context=e,this.refs=F0,this.updater=n||U0}var df=hf.prototype=new O0;df.constructor=hf;k0(df,uo.prototype);df.isPureReactComponent=!0;var zp=Array.isArray,B0=Object.prototype.hasOwnProperty,ff={current:null},z0={key:!0,ref:!0,__self:!0,__source:!0};function V0(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)B0.call(e,i)&&!z0.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:wa,type:t,key:s,ref:o,props:r,_owner:ff.current}}function x1(t,e){return{$$typeof:wa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function pf(t){return typeof t=="object"&&t!==null&&t.$$typeof===wa}function y1(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Vp=/\/+/g;function ru(t,e){return typeof t=="object"&&t!==null&&t.key!=null?y1(""+t.key):e.toString(36)}function Rl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case wa:case l1:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+ru(o,0):i,zp(r)?(n="",t!=null&&(n=t.replace(Vp,"$&/")+"/"),Rl(r,e,n,"",function(c){return c})):r!=null&&(pf(r)&&(r=x1(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Vp,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",zp(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+ru(s,a);o+=Rl(s,e,n,l,r)}else if(l=v1(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+ru(s,a++),o+=Rl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Na(t,e,n){if(t==null)return t;var i=[],r=0;return Rl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function S1(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var vn={current:null},Pl={transition:null},M1={ReactCurrentDispatcher:vn,ReactCurrentBatchConfig:Pl,ReactCurrentOwner:ff};function H0(){throw Error("act(...) is not supported in production builds of React.")}it.Children={map:Na,forEach:function(t,e,n){Na(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Na(t,function(){e++}),e},toArray:function(t){return Na(t,function(e){return e})||[]},only:function(t){if(!pf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};it.Component=uo;it.Fragment=c1;it.Profiler=h1;it.PureComponent=hf;it.StrictMode=u1;it.Suspense=m1;it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=M1;it.act=H0;it.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=k0({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=ff.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)B0.call(e,l)&&!z0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:wa,type:t.type,key:r,ref:s,props:i,_owner:o}};it.createContext=function(t){return t={$$typeof:f1,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:d1,_context:t},t.Consumer=t};it.createElement=V0;it.createFactory=function(t){var e=V0.bind(null,t);return e.type=t,e};it.createRef=function(){return{current:null}};it.forwardRef=function(t){return{$$typeof:p1,render:t}};it.isValidElement=pf;it.lazy=function(t){return{$$typeof:_1,_payload:{_status:-1,_result:t},_init:S1}};it.memo=function(t,e){return{$$typeof:g1,type:t,compare:e===void 0?null:e}};it.startTransition=function(t){var e=Pl.transition;Pl.transition={};try{t()}finally{Pl.transition=e}};it.unstable_act=H0;it.useCallback=function(t,e){return vn.current.useCallback(t,e)};it.useContext=function(t){return vn.current.useContext(t)};it.useDebugValue=function(){};it.useDeferredValue=function(t){return vn.current.useDeferredValue(t)};it.useEffect=function(t,e){return vn.current.useEffect(t,e)};it.useId=function(){return vn.current.useId()};it.useImperativeHandle=function(t,e,n){return vn.current.useImperativeHandle(t,e,n)};it.useInsertionEffect=function(t,e){return vn.current.useInsertionEffect(t,e)};it.useLayoutEffect=function(t,e){return vn.current.useLayoutEffect(t,e)};it.useMemo=function(t,e){return vn.current.useMemo(t,e)};it.useReducer=function(t,e,n){return vn.current.useReducer(t,e,n)};it.useRef=function(t){return vn.current.useRef(t)};it.useState=function(t){return vn.current.useState(t)};it.useSyncExternalStore=function(t,e,n){return vn.current.useSyncExternalStore(t,e,n)};it.useTransition=function(){return vn.current.useTransition()};it.version="18.3.1";I0.exports=it;var Ge=I0.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var w1=Ge,E1=Symbol.for("react.element"),b1=Symbol.for("react.fragment"),T1=Object.prototype.hasOwnProperty,A1=w1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C1={key:!0,ref:!0,__self:!0,__source:!0};function G0(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)T1.call(e,i)&&!C1.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:E1,type:t,key:s,ref:o,props:r,_owner:A1.current}}Rc.Fragment=b1;Rc.jsx=G0;Rc.jsxs=G0;N0.exports=Rc;var F=N0.exports,W0={exports:{}},Vn={},j0={exports:{}},X0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(I,E){var D=I.length;I.push(E);e:for(;0<D;){var J=D-1>>>1,Y=I[J];if(0<r(Y,E))I[J]=E,I[D]=Y,D=J;else break e}}function n(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var E=I[0],D=I.pop();if(D!==E){I[0]=D;e:for(var J=0,Y=I.length,ne=Y>>>1;J<ne;){var K=2*(J+1)-1,te=I[K],B=K+1,q=I[B];if(0>r(te,D))B<Y&&0>r(q,te)?(I[J]=q,I[B]=D,J=B):(I[J]=te,I[K]=D,J=K);else if(B<Y&&0>r(q,D))I[J]=q,I[B]=D,J=B;else break e}}return E}function r(I,E){var D=I.sortIndex-E.sortIndex;return D!==0?D:I.id-E.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,d=null,u=3,p=!1,_=!1,x=!1,g=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(I){for(var E=n(c);E!==null;){if(E.callback===null)i(c);else if(E.startTime<=I)i(c),E.sortIndex=E.expirationTime,e(l,E);else break;E=n(c)}}function S(I){if(x=!1,v(I),!_)if(n(l)!==null)_=!0,V(T);else{var E=n(c);E!==null&&P(S,E.startTime-I)}}function T(I,E){_=!1,x&&(x=!1,f(y),y=-1),p=!0;var D=u;try{for(v(E),d=n(l);d!==null&&(!(d.expirationTime>E)||I&&!L());){var J=d.callback;if(typeof J=="function"){d.callback=null,u=d.priorityLevel;var Y=J(d.expirationTime<=E);E=t.unstable_now(),typeof Y=="function"?d.callback=Y:d===n(l)&&i(l),v(E)}else i(l);d=n(l)}if(d!==null)var ne=!0;else{var K=n(c);K!==null&&P(S,K.startTime-E),ne=!1}return ne}finally{d=null,u=D,p=!1}}var w=!1,R=null,y=-1,C=5,U=-1;function L(){return!(t.unstable_now()-U<C)}function G(){if(R!==null){var I=t.unstable_now();U=I;var E=!0;try{E=R(!0,I)}finally{E?z():(w=!1,R=null)}}else w=!1}var z;if(typeof m=="function")z=function(){m(G)};else if(typeof MessageChannel<"u"){var j=new MessageChannel,k=j.port2;j.port1.onmessage=G,z=function(){k.postMessage(null)}}else z=function(){g(G,0)};function V(I){R=I,w||(w=!0,z())}function P(I,E){y=g(function(){I(t.unstable_now())},E)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(I){I.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,V(T))},t.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<I?Math.floor(1e3/I):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(I){switch(u){case 1:case 2:case 3:var E=3;break;default:E=u}var D=u;u=E;try{return I()}finally{u=D}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(I,E){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var D=u;u=I;try{return E()}finally{u=D}},t.unstable_scheduleCallback=function(I,E,D){var J=t.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?J+D:J):D=J,I){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5e3}return Y=D+Y,I={id:h++,callback:E,priorityLevel:I,startTime:D,expirationTime:Y,sortIndex:-1},D>J?(I.sortIndex=D,e(c,I),n(l)===null&&I===n(c)&&(x?(f(y),y=-1):x=!0,P(S,D-J))):(I.sortIndex=Y,e(l,I),_||p||(_=!0,V(T))),I},t.unstable_shouldYield=L,t.unstable_wrapCallback=function(I){var E=u;return function(){var D=u;u=E;try{return I.apply(this,arguments)}finally{u=D}}}})(X0);j0.exports=X0;var R1=j0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P1=Ge,zn=R1;function pe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var q0=new Set,Zo={};function es(t,e){Ys(t,e),Ys(t+"Capture",e)}function Ys(t,e){for(Zo[t]=e,t=0;t<e.length;t++)q0.add(e[t])}var zi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Mh=Object.prototype.hasOwnProperty,L1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Hp={},Gp={};function D1(t){return Mh.call(Gp,t)?!0:Mh.call(Hp,t)?!1:L1.test(t)?Gp[t]=!0:(Hp[t]=!0,!1)}function N1(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function I1(t,e,n,i){if(e===null||typeof e>"u"||N1(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function xn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var nn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){nn[t]=new xn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];nn[e]=new xn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){nn[t]=new xn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){nn[t]=new xn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){nn[t]=new xn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){nn[t]=new xn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){nn[t]=new xn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){nn[t]=new xn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){nn[t]=new xn(t,5,!1,t.toLowerCase(),null,!1,!1)});var mf=/[\-:]([a-z])/g;function gf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(mf,gf);nn[e]=new xn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(mf,gf);nn[e]=new xn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(mf,gf);nn[e]=new xn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){nn[t]=new xn(t,1,!1,t.toLowerCase(),null,!1,!1)});nn.xlinkHref=new xn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){nn[t]=new xn(t,1,!1,t.toLowerCase(),null,!0,!0)});function _f(t,e,n,i){var r=nn.hasOwnProperty(e)?nn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(I1(e,n,r,i)&&(n=null),i||r===null?D1(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var ji=P1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ia=Symbol.for("react.element"),Ms=Symbol.for("react.portal"),ws=Symbol.for("react.fragment"),vf=Symbol.for("react.strict_mode"),wh=Symbol.for("react.profiler"),$0=Symbol.for("react.provider"),Y0=Symbol.for("react.context"),xf=Symbol.for("react.forward_ref"),Eh=Symbol.for("react.suspense"),bh=Symbol.for("react.suspense_list"),yf=Symbol.for("react.memo"),nr=Symbol.for("react.lazy"),K0=Symbol.for("react.offscreen"),Wp=Symbol.iterator;function _o(t){return t===null||typeof t!="object"?null:(t=Wp&&t[Wp]||t["@@iterator"],typeof t=="function"?t:null)}var Pt=Object.assign,su;function Io(t){if(su===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);su=e&&e[1]||""}return`
`+su+t}var ou=!1;function au(t,e){if(!t||ou)return"";ou=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{ou=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Io(t):""}function U1(t){switch(t.tag){case 5:return Io(t.type);case 16:return Io("Lazy");case 13:return Io("Suspense");case 19:return Io("SuspenseList");case 0:case 2:case 15:return t=au(t.type,!1),t;case 11:return t=au(t.type.render,!1),t;case 1:return t=au(t.type,!0),t;default:return""}}function Th(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ws:return"Fragment";case Ms:return"Portal";case wh:return"Profiler";case vf:return"StrictMode";case Eh:return"Suspense";case bh:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Y0:return(t.displayName||"Context")+".Consumer";case $0:return(t._context.displayName||"Context")+".Provider";case xf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case yf:return e=t.displayName||null,e!==null?e:Th(t.type)||"Memo";case nr:e=t._payload,t=t._init;try{return Th(t(e))}catch{}}return null}function k1(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Th(e);case 8:return e===vf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function yr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Z0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function F1(t){var e=Z0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ua(t){t._valueTracker||(t._valueTracker=F1(t))}function Q0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Z0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Yl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ah(t,e){var n=e.checked;return Pt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function jp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=yr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function J0(t,e){e=e.checked,e!=null&&_f(t,"checked",e,!1)}function Ch(t,e){J0(t,e);var n=yr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Rh(t,e.type,n):e.hasOwnProperty("defaultValue")&&Rh(t,e.type,yr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Xp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Rh(t,e,n){(e!=="number"||Yl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Uo=Array.isArray;function ks(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+yr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Ph(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(pe(91));return Pt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function qp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(pe(92));if(Uo(n)){if(1<n.length)throw Error(pe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:yr(n)}}function e_(t,e){var n=yr(e.value),i=yr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function $p(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function t_(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Lh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?t_(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ka,n_=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ka=ka||document.createElement("div"),ka.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ka.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Qo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var zo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},O1=["Webkit","ms","Moz","O"];Object.keys(zo).forEach(function(t){O1.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),zo[e]=zo[t]})});function i_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||zo.hasOwnProperty(t)&&zo[t]?(""+e).trim():e+"px"}function r_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=i_(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var B1=Pt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Dh(t,e){if(e){if(B1[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(pe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(pe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(pe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(pe(62))}}function Nh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ih=null;function Sf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Uh=null,Fs=null,Os=null;function Yp(t){if(t=Ta(t)){if(typeof Uh!="function")throw Error(pe(280));var e=t.stateNode;e&&(e=Ic(e),Uh(t.stateNode,t.type,e))}}function s_(t){Fs?Os?Os.push(t):Os=[t]:Fs=t}function o_(){if(Fs){var t=Fs,e=Os;if(Os=Fs=null,Yp(t),e)for(t=0;t<e.length;t++)Yp(e[t])}}function a_(t,e){return t(e)}function l_(){}var lu=!1;function c_(t,e,n){if(lu)return t(e,n);lu=!0;try{return a_(t,e,n)}finally{lu=!1,(Fs!==null||Os!==null)&&(l_(),o_())}}function Jo(t,e){var n=t.stateNode;if(n===null)return null;var i=Ic(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(pe(231,e,typeof n));return n}var kh=!1;if(zi)try{var vo={};Object.defineProperty(vo,"passive",{get:function(){kh=!0}}),window.addEventListener("test",vo,vo),window.removeEventListener("test",vo,vo)}catch{kh=!1}function z1(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var Vo=!1,Kl=null,Zl=!1,Fh=null,V1={onError:function(t){Vo=!0,Kl=t}};function H1(t,e,n,i,r,s,o,a,l){Vo=!1,Kl=null,z1.apply(V1,arguments)}function G1(t,e,n,i,r,s,o,a,l){if(H1.apply(this,arguments),Vo){if(Vo){var c=Kl;Vo=!1,Kl=null}else throw Error(pe(198));Zl||(Zl=!0,Fh=c)}}function ts(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function u_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Kp(t){if(ts(t)!==t)throw Error(pe(188))}function W1(t){var e=t.alternate;if(!e){if(e=ts(t),e===null)throw Error(pe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Kp(r),t;if(s===i)return Kp(r),e;s=s.sibling}throw Error(pe(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(pe(189))}}if(n.alternate!==i)throw Error(pe(190))}if(n.tag!==3)throw Error(pe(188));return n.stateNode.current===n?t:e}function h_(t){return t=W1(t),t!==null?d_(t):null}function d_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=d_(t);if(e!==null)return e;t=t.sibling}return null}var f_=zn.unstable_scheduleCallback,Zp=zn.unstable_cancelCallback,j1=zn.unstable_shouldYield,X1=zn.unstable_requestPaint,Ft=zn.unstable_now,q1=zn.unstable_getCurrentPriorityLevel,Mf=zn.unstable_ImmediatePriority,p_=zn.unstable_UserBlockingPriority,Ql=zn.unstable_NormalPriority,$1=zn.unstable_LowPriority,m_=zn.unstable_IdlePriority,Pc=null,Si=null;function Y1(t){if(Si&&typeof Si.onCommitFiberRoot=="function")try{Si.onCommitFiberRoot(Pc,t,void 0,(t.current.flags&128)===128)}catch{}}var ai=Math.clz32?Math.clz32:Q1,K1=Math.log,Z1=Math.LN2;function Q1(t){return t>>>=0,t===0?32:31-(K1(t)/Z1|0)|0}var Fa=64,Oa=4194304;function ko(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Jl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=ko(a):(s&=o,s!==0&&(i=ko(s)))}else o=n&~r,o!==0?i=ko(o):s!==0&&(i=ko(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ai(e),r=1<<n,i|=t[n],e&=~r;return i}function J1(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ey(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-ai(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=J1(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Oh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function g_(){var t=Fa;return Fa<<=1,!(Fa&4194240)&&(Fa=64),t}function cu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ea(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ai(e),t[e]=n}function ty(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ai(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function wf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ai(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var mt=0;function __(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var v_,Ef,x_,y_,S_,Bh=!1,Ba=[],dr=null,fr=null,pr=null,ea=new Map,ta=new Map,sr=[],ny="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Qp(t,e){switch(t){case"focusin":case"focusout":dr=null;break;case"dragenter":case"dragleave":fr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":ea.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ta.delete(e.pointerId)}}function xo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Ta(e),e!==null&&Ef(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function iy(t,e,n,i,r){switch(e){case"focusin":return dr=xo(dr,t,e,n,i,r),!0;case"dragenter":return fr=xo(fr,t,e,n,i,r),!0;case"mouseover":return pr=xo(pr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return ea.set(s,xo(ea.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ta.set(s,xo(ta.get(s)||null,t,e,n,i,r)),!0}return!1}function M_(t){var e=Or(t.target);if(e!==null){var n=ts(e);if(n!==null){if(e=n.tag,e===13){if(e=u_(n),e!==null){t.blockedOn=e,S_(t.priority,function(){x_(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ll(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=zh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Ih=i,n.target.dispatchEvent(i),Ih=null}else return e=Ta(n),e!==null&&Ef(e),t.blockedOn=n,!1;e.shift()}return!0}function Jp(t,e,n){Ll(t)&&n.delete(e)}function ry(){Bh=!1,dr!==null&&Ll(dr)&&(dr=null),fr!==null&&Ll(fr)&&(fr=null),pr!==null&&Ll(pr)&&(pr=null),ea.forEach(Jp),ta.forEach(Jp)}function yo(t,e){t.blockedOn===e&&(t.blockedOn=null,Bh||(Bh=!0,zn.unstable_scheduleCallback(zn.unstable_NormalPriority,ry)))}function na(t){function e(r){return yo(r,t)}if(0<Ba.length){yo(Ba[0],t);for(var n=1;n<Ba.length;n++){var i=Ba[n];i.blockedOn===t&&(i.blockedOn=null)}}for(dr!==null&&yo(dr,t),fr!==null&&yo(fr,t),pr!==null&&yo(pr,t),ea.forEach(e),ta.forEach(e),n=0;n<sr.length;n++)i=sr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<sr.length&&(n=sr[0],n.blockedOn===null);)M_(n),n.blockedOn===null&&sr.shift()}var Bs=ji.ReactCurrentBatchConfig,ec=!0;function sy(t,e,n,i){var r=mt,s=Bs.transition;Bs.transition=null;try{mt=1,bf(t,e,n,i)}finally{mt=r,Bs.transition=s}}function oy(t,e,n,i){var r=mt,s=Bs.transition;Bs.transition=null;try{mt=4,bf(t,e,n,i)}finally{mt=r,Bs.transition=s}}function bf(t,e,n,i){if(ec){var r=zh(t,e,n,i);if(r===null)xu(t,e,i,tc,n),Qp(t,i);else if(iy(r,t,e,n,i))i.stopPropagation();else if(Qp(t,i),e&4&&-1<ny.indexOf(t)){for(;r!==null;){var s=Ta(r);if(s!==null&&v_(s),s=zh(t,e,n,i),s===null&&xu(t,e,i,tc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else xu(t,e,i,null,n)}}var tc=null;function zh(t,e,n,i){if(tc=null,t=Sf(i),t=Or(t),t!==null)if(e=ts(t),e===null)t=null;else if(n=e.tag,n===13){if(t=u_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return tc=t,null}function w_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(q1()){case Mf:return 1;case p_:return 4;case Ql:case $1:return 16;case m_:return 536870912;default:return 16}default:return 16}}var lr=null,Tf=null,Dl=null;function E_(){if(Dl)return Dl;var t,e=Tf,n=e.length,i,r="value"in lr?lr.value:lr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Dl=r.slice(t,1<i?1-i:void 0)}function Nl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function za(){return!0}function em(){return!1}function Hn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?za:em,this.isPropagationStopped=em,this}return Pt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=za)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=za)},persist:function(){},isPersistent:za}),e}var ho={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Af=Hn(ho),ba=Pt({},ho,{view:0,detail:0}),ay=Hn(ba),uu,hu,So,Lc=Pt({},ba,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==So&&(So&&t.type==="mousemove"?(uu=t.screenX-So.screenX,hu=t.screenY-So.screenY):hu=uu=0,So=t),uu)},movementY:function(t){return"movementY"in t?t.movementY:hu}}),tm=Hn(Lc),ly=Pt({},Lc,{dataTransfer:0}),cy=Hn(ly),uy=Pt({},ba,{relatedTarget:0}),du=Hn(uy),hy=Pt({},ho,{animationName:0,elapsedTime:0,pseudoElement:0}),dy=Hn(hy),fy=Pt({},ho,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),py=Hn(fy),my=Pt({},ho,{data:0}),nm=Hn(my),gy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_y={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xy(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=vy[t])?!!e[t]:!1}function Cf(){return xy}var yy=Pt({},ba,{key:function(t){if(t.key){var e=gy[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Nl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?_y[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cf,charCode:function(t){return t.type==="keypress"?Nl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Nl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Sy=Hn(yy),My=Pt({},Lc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),im=Hn(My),wy=Pt({},ba,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cf}),Ey=Hn(wy),by=Pt({},ho,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ty=Hn(by),Ay=Pt({},Lc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Cy=Hn(Ay),Ry=[9,13,27,32],Rf=zi&&"CompositionEvent"in window,Ho=null;zi&&"documentMode"in document&&(Ho=document.documentMode);var Py=zi&&"TextEvent"in window&&!Ho,b_=zi&&(!Rf||Ho&&8<Ho&&11>=Ho),rm=" ",sm=!1;function T_(t,e){switch(t){case"keyup":return Ry.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function A_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Es=!1;function Ly(t,e){switch(t){case"compositionend":return A_(e);case"keypress":return e.which!==32?null:(sm=!0,rm);case"textInput":return t=e.data,t===rm&&sm?null:t;default:return null}}function Dy(t,e){if(Es)return t==="compositionend"||!Rf&&T_(t,e)?(t=E_(),Dl=Tf=lr=null,Es=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return b_&&e.locale!=="ko"?null:e.data;default:return null}}var Ny={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function om(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Ny[t.type]:e==="textarea"}function C_(t,e,n,i){s_(i),e=nc(e,"onChange"),0<e.length&&(n=new Af("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Go=null,ia=null;function Iy(t){B_(t,0)}function Dc(t){var e=As(t);if(Q0(e))return t}function Uy(t,e){if(t==="change")return e}var R_=!1;if(zi){var fu;if(zi){var pu="oninput"in document;if(!pu){var am=document.createElement("div");am.setAttribute("oninput","return;"),pu=typeof am.oninput=="function"}fu=pu}else fu=!1;R_=fu&&(!document.documentMode||9<document.documentMode)}function lm(){Go&&(Go.detachEvent("onpropertychange",P_),ia=Go=null)}function P_(t){if(t.propertyName==="value"&&Dc(ia)){var e=[];C_(e,ia,t,Sf(t)),c_(Iy,e)}}function ky(t,e,n){t==="focusin"?(lm(),Go=e,ia=n,Go.attachEvent("onpropertychange",P_)):t==="focusout"&&lm()}function Fy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Dc(ia)}function Oy(t,e){if(t==="click")return Dc(e)}function By(t,e){if(t==="input"||t==="change")return Dc(e)}function zy(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ui=typeof Object.is=="function"?Object.is:zy;function ra(t,e){if(ui(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Mh.call(e,r)||!ui(t[r],e[r]))return!1}return!0}function cm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function um(t,e){var n=cm(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=cm(n)}}function L_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?L_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function D_(){for(var t=window,e=Yl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Yl(t.document)}return e}function Pf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Vy(t){var e=D_(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&L_(n.ownerDocument.documentElement,n)){if(i!==null&&Pf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=um(n,s);var o=um(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Hy=zi&&"documentMode"in document&&11>=document.documentMode,bs=null,Vh=null,Wo=null,Hh=!1;function hm(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Hh||bs==null||bs!==Yl(i)||(i=bs,"selectionStart"in i&&Pf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Wo&&ra(Wo,i)||(Wo=i,i=nc(Vh,"onSelect"),0<i.length&&(e=new Af("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=bs)))}function Va(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ts={animationend:Va("Animation","AnimationEnd"),animationiteration:Va("Animation","AnimationIteration"),animationstart:Va("Animation","AnimationStart"),transitionend:Va("Transition","TransitionEnd")},mu={},N_={};zi&&(N_=document.createElement("div").style,"AnimationEvent"in window||(delete Ts.animationend.animation,delete Ts.animationiteration.animation,delete Ts.animationstart.animation),"TransitionEvent"in window||delete Ts.transitionend.transition);function Nc(t){if(mu[t])return mu[t];if(!Ts[t])return t;var e=Ts[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in N_)return mu[t]=e[n];return t}var I_=Nc("animationend"),U_=Nc("animationiteration"),k_=Nc("animationstart"),F_=Nc("transitionend"),O_=new Map,dm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function br(t,e){O_.set(t,e),es(e,[t])}for(var gu=0;gu<dm.length;gu++){var _u=dm[gu],Gy=_u.toLowerCase(),Wy=_u[0].toUpperCase()+_u.slice(1);br(Gy,"on"+Wy)}br(I_,"onAnimationEnd");br(U_,"onAnimationIteration");br(k_,"onAnimationStart");br("dblclick","onDoubleClick");br("focusin","onFocus");br("focusout","onBlur");br(F_,"onTransitionEnd");Ys("onMouseEnter",["mouseout","mouseover"]);Ys("onMouseLeave",["mouseout","mouseover"]);Ys("onPointerEnter",["pointerout","pointerover"]);Ys("onPointerLeave",["pointerout","pointerover"]);es("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));es("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));es("onBeforeInput",["compositionend","keypress","textInput","paste"]);es("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));es("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));es("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fo));function fm(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,G1(i,e,void 0,t),t.currentTarget=null}function B_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;fm(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;fm(r,a,c),s=l}}}if(Zl)throw t=Fh,Zl=!1,Fh=null,t}function Et(t,e){var n=e[qh];n===void 0&&(n=e[qh]=new Set);var i=t+"__bubble";n.has(i)||(z_(e,t,2,!1),n.add(i))}function vu(t,e,n){var i=0;e&&(i|=4),z_(n,t,i,e)}var Ha="_reactListening"+Math.random().toString(36).slice(2);function sa(t){if(!t[Ha]){t[Ha]=!0,q0.forEach(function(n){n!=="selectionchange"&&(jy.has(n)||vu(n,!1,t),vu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ha]||(e[Ha]=!0,vu("selectionchange",!1,e))}}function z_(t,e,n,i){switch(w_(e)){case 1:var r=sy;break;case 4:r=oy;break;default:r=bf}n=r.bind(null,e,n,t),r=void 0,!kh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function xu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Or(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}c_(function(){var c=s,h=Sf(n),d=[];e:{var u=O_.get(t);if(u!==void 0){var p=Af,_=t;switch(t){case"keypress":if(Nl(n)===0)break e;case"keydown":case"keyup":p=Sy;break;case"focusin":_="focus",p=du;break;case"focusout":_="blur",p=du;break;case"beforeblur":case"afterblur":p=du;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=tm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=cy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Ey;break;case I_:case U_:case k_:p=dy;break;case F_:p=Ty;break;case"scroll":p=ay;break;case"wheel":p=Cy;break;case"copy":case"cut":case"paste":p=py;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=im}var x=(e&4)!==0,g=!x&&t==="scroll",f=x?u!==null?u+"Capture":null:u;x=[];for(var m=c,v;m!==null;){v=m;var S=v.stateNode;if(v.tag===5&&S!==null&&(v=S,f!==null&&(S=Jo(m,f),S!=null&&x.push(oa(m,S,v)))),g)break;m=m.return}0<x.length&&(u=new p(u,_,null,n,h),d.push({event:u,listeners:x}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",u&&n!==Ih&&(_=n.relatedTarget||n.fromElement)&&(Or(_)||_[Vi]))break e;if((p||u)&&(u=h.window===h?h:(u=h.ownerDocument)?u.defaultView||u.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?Or(_):null,_!==null&&(g=ts(_),_!==g||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(x=tm,S="onMouseLeave",f="onMouseEnter",m="mouse",(t==="pointerout"||t==="pointerover")&&(x=im,S="onPointerLeave",f="onPointerEnter",m="pointer"),g=p==null?u:As(p),v=_==null?u:As(_),u=new x(S,m+"leave",p,n,h),u.target=g,u.relatedTarget=v,S=null,Or(h)===c&&(x=new x(f,m+"enter",_,n,h),x.target=v,x.relatedTarget=g,S=x),g=S,p&&_)t:{for(x=p,f=_,m=0,v=x;v;v=rs(v))m++;for(v=0,S=f;S;S=rs(S))v++;for(;0<m-v;)x=rs(x),m--;for(;0<v-m;)f=rs(f),v--;for(;m--;){if(x===f||f!==null&&x===f.alternate)break t;x=rs(x),f=rs(f)}x=null}else x=null;p!==null&&pm(d,u,p,x,!1),_!==null&&g!==null&&pm(d,g,_,x,!0)}}e:{if(u=c?As(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var T=Uy;else if(om(u))if(R_)T=By;else{T=Fy;var w=ky}else(p=u.nodeName)&&p.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(T=Oy);if(T&&(T=T(t,c))){C_(d,T,n,h);break e}w&&w(t,u,c),t==="focusout"&&(w=u._wrapperState)&&w.controlled&&u.type==="number"&&Rh(u,"number",u.value)}switch(w=c?As(c):window,t){case"focusin":(om(w)||w.contentEditable==="true")&&(bs=w,Vh=c,Wo=null);break;case"focusout":Wo=Vh=bs=null;break;case"mousedown":Hh=!0;break;case"contextmenu":case"mouseup":case"dragend":Hh=!1,hm(d,n,h);break;case"selectionchange":if(Hy)break;case"keydown":case"keyup":hm(d,n,h)}var R;if(Rf)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Es?T_(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(b_&&n.locale!=="ko"&&(Es||y!=="onCompositionStart"?y==="onCompositionEnd"&&Es&&(R=E_()):(lr=h,Tf="value"in lr?lr.value:lr.textContent,Es=!0)),w=nc(c,y),0<w.length&&(y=new nm(y,t,null,n,h),d.push({event:y,listeners:w}),R?y.data=R:(R=A_(n),R!==null&&(y.data=R)))),(R=Py?Ly(t,n):Dy(t,n))&&(c=nc(c,"onBeforeInput"),0<c.length&&(h=new nm("onBeforeInput","beforeinput",null,n,h),d.push({event:h,listeners:c}),h.data=R))}B_(d,e)})}function oa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function nc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Jo(t,n),s!=null&&i.unshift(oa(t,s,r)),s=Jo(t,e),s!=null&&i.push(oa(t,s,r))),t=t.return}return i}function rs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function pm(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Jo(n,s),l!=null&&o.unshift(oa(n,l,a))):r||(l=Jo(n,s),l!=null&&o.push(oa(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Xy=/\r\n?/g,qy=/\u0000|\uFFFD/g;function mm(t){return(typeof t=="string"?t:""+t).replace(Xy,`
`).replace(qy,"")}function Ga(t,e,n){if(e=mm(e),mm(t)!==e&&n)throw Error(pe(425))}function ic(){}var Gh=null,Wh=null;function jh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Xh=typeof setTimeout=="function"?setTimeout:void 0,$y=typeof clearTimeout=="function"?clearTimeout:void 0,gm=typeof Promise=="function"?Promise:void 0,Yy=typeof queueMicrotask=="function"?queueMicrotask:typeof gm<"u"?function(t){return gm.resolve(null).then(t).catch(Ky)}:Xh;function Ky(t){setTimeout(function(){throw t})}function yu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),na(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);na(e)}function mr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function _m(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var fo=Math.random().toString(36).slice(2),vi="__reactFiber$"+fo,aa="__reactProps$"+fo,Vi="__reactContainer$"+fo,qh="__reactEvents$"+fo,Zy="__reactListeners$"+fo,Qy="__reactHandles$"+fo;function Or(t){var e=t[vi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Vi]||n[vi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=_m(t);t!==null;){if(n=t[vi])return n;t=_m(t)}return e}t=n,n=t.parentNode}return null}function Ta(t){return t=t[vi]||t[Vi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function As(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(pe(33))}function Ic(t){return t[aa]||null}var $h=[],Cs=-1;function Tr(t){return{current:t}}function bt(t){0>Cs||(t.current=$h[Cs],$h[Cs]=null,Cs--)}function wt(t,e){Cs++,$h[Cs]=t.current,t.current=e}var Sr={},fn=Tr(Sr),bn=Tr(!1),jr=Sr;function Ks(t,e){var n=t.type.contextTypes;if(!n)return Sr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Tn(t){return t=t.childContextTypes,t!=null}function rc(){bt(bn),bt(fn)}function vm(t,e,n){if(fn.current!==Sr)throw Error(pe(168));wt(fn,e),wt(bn,n)}function V_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(pe(108,k1(t)||"Unknown",r));return Pt({},n,i)}function sc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Sr,jr=fn.current,wt(fn,t),wt(bn,bn.current),!0}function xm(t,e,n){var i=t.stateNode;if(!i)throw Error(pe(169));n?(t=V_(t,e,jr),i.__reactInternalMemoizedMergedChildContext=t,bt(bn),bt(fn),wt(fn,t)):bt(bn),wt(bn,n)}var Ii=null,Uc=!1,Su=!1;function H_(t){Ii===null?Ii=[t]:Ii.push(t)}function Jy(t){Uc=!0,H_(t)}function Ar(){if(!Su&&Ii!==null){Su=!0;var t=0,e=mt;try{var n=Ii;for(mt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ii=null,Uc=!1}catch(r){throw Ii!==null&&(Ii=Ii.slice(t+1)),f_(Mf,Ar),r}finally{mt=e,Su=!1}}return null}var Rs=[],Ps=0,oc=null,ac=0,Xn=[],qn=0,Xr=null,Ui=1,ki="";function Ir(t,e){Rs[Ps++]=ac,Rs[Ps++]=oc,oc=t,ac=e}function G_(t,e,n){Xn[qn++]=Ui,Xn[qn++]=ki,Xn[qn++]=Xr,Xr=t;var i=Ui;t=ki;var r=32-ai(i)-1;i&=~(1<<r),n+=1;var s=32-ai(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ui=1<<32-ai(e)+r|n<<r|i,ki=s+t}else Ui=1<<s|n<<r|i,ki=t}function Lf(t){t.return!==null&&(Ir(t,1),G_(t,1,0))}function Df(t){for(;t===oc;)oc=Rs[--Ps],Rs[Ps]=null,ac=Rs[--Ps],Rs[Ps]=null;for(;t===Xr;)Xr=Xn[--qn],Xn[qn]=null,ki=Xn[--qn],Xn[qn]=null,Ui=Xn[--qn],Xn[qn]=null}var On=null,Fn=null,At=!1,si=null;function W_(t,e){var n=Yn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function ym(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,On=t,Fn=mr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,On=t,Fn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Xr!==null?{id:Ui,overflow:ki}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Yn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,On=t,Fn=null,!0):!1;default:return!1}}function Yh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Kh(t){if(At){var e=Fn;if(e){var n=e;if(!ym(t,e)){if(Yh(t))throw Error(pe(418));e=mr(n.nextSibling);var i=On;e&&ym(t,e)?W_(i,n):(t.flags=t.flags&-4097|2,At=!1,On=t)}}else{if(Yh(t))throw Error(pe(418));t.flags=t.flags&-4097|2,At=!1,On=t}}}function Sm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;On=t}function Wa(t){if(t!==On)return!1;if(!At)return Sm(t),At=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!jh(t.type,t.memoizedProps)),e&&(e=Fn)){if(Yh(t))throw j_(),Error(pe(418));for(;e;)W_(t,e),e=mr(e.nextSibling)}if(Sm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(pe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Fn=mr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Fn=null}}else Fn=On?mr(t.stateNode.nextSibling):null;return!0}function j_(){for(var t=Fn;t;)t=mr(t.nextSibling)}function Zs(){Fn=On=null,At=!1}function Nf(t){si===null?si=[t]:si.push(t)}var eS=ji.ReactCurrentBatchConfig;function Mo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(pe(309));var i=n.stateNode}if(!i)throw Error(pe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(pe(284));if(!n._owner)throw Error(pe(290,t))}return t}function ja(t,e){throw t=Object.prototype.toString.call(e),Error(pe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Mm(t){var e=t._init;return e(t._payload)}function X_(t){function e(f,m){if(t){var v=f.deletions;v===null?(f.deletions=[m],f.flags|=16):v.push(m)}}function n(f,m){if(!t)return null;for(;m!==null;)e(f,m),m=m.sibling;return null}function i(f,m){for(f=new Map;m!==null;)m.key!==null?f.set(m.key,m):f.set(m.index,m),m=m.sibling;return f}function r(f,m){return f=xr(f,m),f.index=0,f.sibling=null,f}function s(f,m,v){return f.index=v,t?(v=f.alternate,v!==null?(v=v.index,v<m?(f.flags|=2,m):v):(f.flags|=2,m)):(f.flags|=1048576,m)}function o(f){return t&&f.alternate===null&&(f.flags|=2),f}function a(f,m,v,S){return m===null||m.tag!==6?(m=Cu(v,f.mode,S),m.return=f,m):(m=r(m,v),m.return=f,m)}function l(f,m,v,S){var T=v.type;return T===ws?h(f,m,v.props.children,S,v.key):m!==null&&(m.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===nr&&Mm(T)===m.type)?(S=r(m,v.props),S.ref=Mo(f,m,v),S.return=f,S):(S=zl(v.type,v.key,v.props,null,f.mode,S),S.ref=Mo(f,m,v),S.return=f,S)}function c(f,m,v,S){return m===null||m.tag!==4||m.stateNode.containerInfo!==v.containerInfo||m.stateNode.implementation!==v.implementation?(m=Ru(v,f.mode,S),m.return=f,m):(m=r(m,v.children||[]),m.return=f,m)}function h(f,m,v,S,T){return m===null||m.tag!==7?(m=Wr(v,f.mode,S,T),m.return=f,m):(m=r(m,v),m.return=f,m)}function d(f,m,v){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Cu(""+m,f.mode,v),m.return=f,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Ia:return v=zl(m.type,m.key,m.props,null,f.mode,v),v.ref=Mo(f,null,m),v.return=f,v;case Ms:return m=Ru(m,f.mode,v),m.return=f,m;case nr:var S=m._init;return d(f,S(m._payload),v)}if(Uo(m)||_o(m))return m=Wr(m,f.mode,v,null),m.return=f,m;ja(f,m)}return null}function u(f,m,v,S){var T=m!==null?m.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return T!==null?null:a(f,m,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ia:return v.key===T?l(f,m,v,S):null;case Ms:return v.key===T?c(f,m,v,S):null;case nr:return T=v._init,u(f,m,T(v._payload),S)}if(Uo(v)||_o(v))return T!==null?null:h(f,m,v,S,null);ja(f,v)}return null}function p(f,m,v,S,T){if(typeof S=="string"&&S!==""||typeof S=="number")return f=f.get(v)||null,a(m,f,""+S,T);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Ia:return f=f.get(S.key===null?v:S.key)||null,l(m,f,S,T);case Ms:return f=f.get(S.key===null?v:S.key)||null,c(m,f,S,T);case nr:var w=S._init;return p(f,m,v,w(S._payload),T)}if(Uo(S)||_o(S))return f=f.get(v)||null,h(m,f,S,T,null);ja(m,S)}return null}function _(f,m,v,S){for(var T=null,w=null,R=m,y=m=0,C=null;R!==null&&y<v.length;y++){R.index>y?(C=R,R=null):C=R.sibling;var U=u(f,R,v[y],S);if(U===null){R===null&&(R=C);break}t&&R&&U.alternate===null&&e(f,R),m=s(U,m,y),w===null?T=U:w.sibling=U,w=U,R=C}if(y===v.length)return n(f,R),At&&Ir(f,y),T;if(R===null){for(;y<v.length;y++)R=d(f,v[y],S),R!==null&&(m=s(R,m,y),w===null?T=R:w.sibling=R,w=R);return At&&Ir(f,y),T}for(R=i(f,R);y<v.length;y++)C=p(R,f,y,v[y],S),C!==null&&(t&&C.alternate!==null&&R.delete(C.key===null?y:C.key),m=s(C,m,y),w===null?T=C:w.sibling=C,w=C);return t&&R.forEach(function(L){return e(f,L)}),At&&Ir(f,y),T}function x(f,m,v,S){var T=_o(v);if(typeof T!="function")throw Error(pe(150));if(v=T.call(v),v==null)throw Error(pe(151));for(var w=T=null,R=m,y=m=0,C=null,U=v.next();R!==null&&!U.done;y++,U=v.next()){R.index>y?(C=R,R=null):C=R.sibling;var L=u(f,R,U.value,S);if(L===null){R===null&&(R=C);break}t&&R&&L.alternate===null&&e(f,R),m=s(L,m,y),w===null?T=L:w.sibling=L,w=L,R=C}if(U.done)return n(f,R),At&&Ir(f,y),T;if(R===null){for(;!U.done;y++,U=v.next())U=d(f,U.value,S),U!==null&&(m=s(U,m,y),w===null?T=U:w.sibling=U,w=U);return At&&Ir(f,y),T}for(R=i(f,R);!U.done;y++,U=v.next())U=p(R,f,y,U.value,S),U!==null&&(t&&U.alternate!==null&&R.delete(U.key===null?y:U.key),m=s(U,m,y),w===null?T=U:w.sibling=U,w=U);return t&&R.forEach(function(G){return e(f,G)}),At&&Ir(f,y),T}function g(f,m,v,S){if(typeof v=="object"&&v!==null&&v.type===ws&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Ia:e:{for(var T=v.key,w=m;w!==null;){if(w.key===T){if(T=v.type,T===ws){if(w.tag===7){n(f,w.sibling),m=r(w,v.props.children),m.return=f,f=m;break e}}else if(w.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===nr&&Mm(T)===w.type){n(f,w.sibling),m=r(w,v.props),m.ref=Mo(f,w,v),m.return=f,f=m;break e}n(f,w);break}else e(f,w);w=w.sibling}v.type===ws?(m=Wr(v.props.children,f.mode,S,v.key),m.return=f,f=m):(S=zl(v.type,v.key,v.props,null,f.mode,S),S.ref=Mo(f,m,v),S.return=f,f=S)}return o(f);case Ms:e:{for(w=v.key;m!==null;){if(m.key===w)if(m.tag===4&&m.stateNode.containerInfo===v.containerInfo&&m.stateNode.implementation===v.implementation){n(f,m.sibling),m=r(m,v.children||[]),m.return=f,f=m;break e}else{n(f,m);break}else e(f,m);m=m.sibling}m=Ru(v,f.mode,S),m.return=f,f=m}return o(f);case nr:return w=v._init,g(f,m,w(v._payload),S)}if(Uo(v))return _(f,m,v,S);if(_o(v))return x(f,m,v,S);ja(f,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,m!==null&&m.tag===6?(n(f,m.sibling),m=r(m,v),m.return=f,f=m):(n(f,m),m=Cu(v,f.mode,S),m.return=f,f=m),o(f)):n(f,m)}return g}var Qs=X_(!0),q_=X_(!1),lc=Tr(null),cc=null,Ls=null,If=null;function Uf(){If=Ls=cc=null}function kf(t){var e=lc.current;bt(lc),t._currentValue=e}function Zh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function zs(t,e){cc=t,If=Ls=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(En=!0),t.firstContext=null)}function Zn(t){var e=t._currentValue;if(If!==t)if(t={context:t,memoizedValue:e,next:null},Ls===null){if(cc===null)throw Error(pe(308));Ls=t,cc.dependencies={lanes:0,firstContext:t}}else Ls=Ls.next=t;return e}var Br=null;function Ff(t){Br===null?Br=[t]:Br.push(t)}function $_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Ff(e)):(n.next=r.next,r.next=n),e.interleaved=n,Hi(t,i)}function Hi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var ir=!1;function Of(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Y_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Oi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function gr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,ht&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Hi(t,n)}return r=i.interleaved,r===null?(e.next=e,Ff(i)):(e.next=r.next,r.next=e),i.interleaved=e,Hi(t,n)}function Il(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,wf(t,n)}}function wm(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function uc(t,e,n,i){var r=t.updateQueue;ir=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=t.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,h=c=l=null,a=s;do{var u=a.lane,p=a.eventTime;if((i&u)===u){h!==null&&(h=h.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=t,x=a;switch(u=e,p=n,x.tag){case 1:if(_=x.payload,typeof _=="function"){d=_.call(p,d,u);break e}d=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=x.payload,u=typeof _=="function"?_.call(p,d,u):_,u==null)break e;d=Pt({},d,u);break e;case 2:ir=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,u=r.effects,u===null?r.effects=[a]:u.push(a))}else p={eventTime:p,lane:u,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=p,l=d):h=h.next=p,o|=u;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;u=a,a=u.next,u.next=null,r.lastBaseUpdate=u,r.shared.pending=null}}while(!0);if(h===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=h,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);$r|=o,t.lanes=o,t.memoizedState=d}}function Em(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(pe(191,r));r.call(i)}}}var Aa={},Mi=Tr(Aa),la=Tr(Aa),ca=Tr(Aa);function zr(t){if(t===Aa)throw Error(pe(174));return t}function Bf(t,e){switch(wt(ca,e),wt(la,t),wt(Mi,Aa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Lh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Lh(e,t)}bt(Mi),wt(Mi,e)}function Js(){bt(Mi),bt(la),bt(ca)}function K_(t){zr(ca.current);var e=zr(Mi.current),n=Lh(e,t.type);e!==n&&(wt(la,t),wt(Mi,n))}function zf(t){la.current===t&&(bt(Mi),bt(la))}var Ct=Tr(0);function hc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Mu=[];function Vf(){for(var t=0;t<Mu.length;t++)Mu[t]._workInProgressVersionPrimary=null;Mu.length=0}var Ul=ji.ReactCurrentDispatcher,wu=ji.ReactCurrentBatchConfig,qr=0,Rt=null,Vt=null,qt=null,dc=!1,jo=!1,ua=0,tS=0;function sn(){throw Error(pe(321))}function Hf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ui(t[n],e[n]))return!1;return!0}function Gf(t,e,n,i,r,s){if(qr=s,Rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ul.current=t===null||t.memoizedState===null?sS:oS,t=n(i,r),jo){s=0;do{if(jo=!1,ua=0,25<=s)throw Error(pe(301));s+=1,qt=Vt=null,e.updateQueue=null,Ul.current=aS,t=n(i,r)}while(jo)}if(Ul.current=fc,e=Vt!==null&&Vt.next!==null,qr=0,qt=Vt=Rt=null,dc=!1,e)throw Error(pe(300));return t}function Wf(){var t=ua!==0;return ua=0,t}function gi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qt===null?Rt.memoizedState=qt=t:qt=qt.next=t,qt}function Qn(){if(Vt===null){var t=Rt.alternate;t=t!==null?t.memoizedState:null}else t=Vt.next;var e=qt===null?Rt.memoizedState:qt.next;if(e!==null)qt=e,Vt=t;else{if(t===null)throw Error(pe(310));Vt=t,t={memoizedState:Vt.memoizedState,baseState:Vt.baseState,baseQueue:Vt.baseQueue,queue:Vt.queue,next:null},qt===null?Rt.memoizedState=qt=t:qt=qt.next=t}return qt}function ha(t,e){return typeof e=="function"?e(t):e}function Eu(t){var e=Qn(),n=e.queue;if(n===null)throw Error(pe(311));n.lastRenderedReducer=t;var i=Vt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((qr&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,Rt.lanes|=h,$r|=h}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,ui(i,e.memoizedState)||(En=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Rt.lanes|=s,$r|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function bu(t){var e=Qn(),n=e.queue;if(n===null)throw Error(pe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);ui(s,e.memoizedState)||(En=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Z_(){}function Q_(t,e){var n=Rt,i=Qn(),r=e(),s=!ui(i.memoizedState,r);if(s&&(i.memoizedState=r,En=!0),i=i.queue,jf(tv.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||qt!==null&&qt.memoizedState.tag&1){if(n.flags|=2048,da(9,ev.bind(null,n,i,r,e),void 0,null),Kt===null)throw Error(pe(349));qr&30||J_(n,e,r)}return r}function J_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Rt.updateQueue,e===null?(e={lastEffect:null,stores:null},Rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function ev(t,e,n,i){e.value=n,e.getSnapshot=i,nv(e)&&iv(t)}function tv(t,e,n){return n(function(){nv(e)&&iv(t)})}function nv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ui(t,n)}catch{return!0}}function iv(t){var e=Hi(t,1);e!==null&&li(e,t,1,-1)}function bm(t){var e=gi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:t},e.queue=t,t=t.dispatch=rS.bind(null,Rt,t),[e.memoizedState,t]}function da(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Rt.updateQueue,e===null?(e={lastEffect:null,stores:null},Rt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function rv(){return Qn().memoizedState}function kl(t,e,n,i){var r=gi();Rt.flags|=t,r.memoizedState=da(1|e,n,void 0,i===void 0?null:i)}function kc(t,e,n,i){var r=Qn();i=i===void 0?null:i;var s=void 0;if(Vt!==null){var o=Vt.memoizedState;if(s=o.destroy,i!==null&&Hf(i,o.deps)){r.memoizedState=da(e,n,s,i);return}}Rt.flags|=t,r.memoizedState=da(1|e,n,s,i)}function Tm(t,e){return kl(8390656,8,t,e)}function jf(t,e){return kc(2048,8,t,e)}function sv(t,e){return kc(4,2,t,e)}function ov(t,e){return kc(4,4,t,e)}function av(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function lv(t,e,n){return n=n!=null?n.concat([t]):null,kc(4,4,av.bind(null,e,t),n)}function Xf(){}function cv(t,e){var n=Qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Hf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function uv(t,e){var n=Qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Hf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function hv(t,e,n){return qr&21?(ui(n,e)||(n=g_(),Rt.lanes|=n,$r|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,En=!0),t.memoizedState=n)}function nS(t,e){var n=mt;mt=n!==0&&4>n?n:4,t(!0);var i=wu.transition;wu.transition={};try{t(!1),e()}finally{mt=n,wu.transition=i}}function dv(){return Qn().memoizedState}function iS(t,e,n){var i=vr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},fv(t))pv(e,n);else if(n=$_(t,e,n,i),n!==null){var r=_n();li(n,t,i,r),mv(n,e,i)}}function rS(t,e,n){var i=vr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(fv(t))pv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,ui(a,o)){var l=e.interleaved;l===null?(r.next=r,Ff(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=$_(t,e,r,i),n!==null&&(r=_n(),li(n,t,i,r),mv(n,e,i))}}function fv(t){var e=t.alternate;return t===Rt||e!==null&&e===Rt}function pv(t,e){jo=dc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function mv(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,wf(t,n)}}var fc={readContext:Zn,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useInsertionEffect:sn,useLayoutEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useMutableSource:sn,useSyncExternalStore:sn,useId:sn,unstable_isNewReconciler:!1},sS={readContext:Zn,useCallback:function(t,e){return gi().memoizedState=[t,e===void 0?null:e],t},useContext:Zn,useEffect:Tm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,kl(4194308,4,av.bind(null,e,t),n)},useLayoutEffect:function(t,e){return kl(4194308,4,t,e)},useInsertionEffect:function(t,e){return kl(4,2,t,e)},useMemo:function(t,e){var n=gi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=gi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=iS.bind(null,Rt,t),[i.memoizedState,t]},useRef:function(t){var e=gi();return t={current:t},e.memoizedState=t},useState:bm,useDebugValue:Xf,useDeferredValue:function(t){return gi().memoizedState=t},useTransition:function(){var t=bm(!1),e=t[0];return t=nS.bind(null,t[1]),gi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Rt,r=gi();if(At){if(n===void 0)throw Error(pe(407));n=n()}else{if(n=e(),Kt===null)throw Error(pe(349));qr&30||J_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Tm(tv.bind(null,i,s,t),[t]),i.flags|=2048,da(9,ev.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=gi(),e=Kt.identifierPrefix;if(At){var n=ki,i=Ui;n=(i&~(1<<32-ai(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ua++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=tS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},oS={readContext:Zn,useCallback:cv,useContext:Zn,useEffect:jf,useImperativeHandle:lv,useInsertionEffect:sv,useLayoutEffect:ov,useMemo:uv,useReducer:Eu,useRef:rv,useState:function(){return Eu(ha)},useDebugValue:Xf,useDeferredValue:function(t){var e=Qn();return hv(e,Vt.memoizedState,t)},useTransition:function(){var t=Eu(ha)[0],e=Qn().memoizedState;return[t,e]},useMutableSource:Z_,useSyncExternalStore:Q_,useId:dv,unstable_isNewReconciler:!1},aS={readContext:Zn,useCallback:cv,useContext:Zn,useEffect:jf,useImperativeHandle:lv,useInsertionEffect:sv,useLayoutEffect:ov,useMemo:uv,useReducer:bu,useRef:rv,useState:function(){return bu(ha)},useDebugValue:Xf,useDeferredValue:function(t){var e=Qn();return Vt===null?e.memoizedState=t:hv(e,Vt.memoizedState,t)},useTransition:function(){var t=bu(ha)[0],e=Qn().memoizedState;return[t,e]},useMutableSource:Z_,useSyncExternalStore:Q_,useId:dv,unstable_isNewReconciler:!1};function ii(t,e){if(t&&t.defaultProps){e=Pt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Qh(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Pt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Fc={isMounted:function(t){return(t=t._reactInternals)?ts(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=_n(),r=vr(t),s=Oi(i,r);s.payload=e,n!=null&&(s.callback=n),e=gr(t,s,r),e!==null&&(li(e,t,r,i),Il(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=_n(),r=vr(t),s=Oi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=gr(t,s,r),e!==null&&(li(e,t,r,i),Il(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=_n(),i=vr(t),r=Oi(n,i);r.tag=2,e!=null&&(r.callback=e),e=gr(t,r,i),e!==null&&(li(e,t,i,n),Il(e,t,i))}};function Am(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!ra(n,i)||!ra(r,s):!0}function gv(t,e,n){var i=!1,r=Sr,s=e.contextType;return typeof s=="object"&&s!==null?s=Zn(s):(r=Tn(e)?jr:fn.current,i=e.contextTypes,s=(i=i!=null)?Ks(t,r):Sr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Fc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Cm(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Fc.enqueueReplaceState(e,e.state,null)}function Jh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Of(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Zn(s):(s=Tn(e)?jr:fn.current,r.context=Ks(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Qh(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Fc.enqueueReplaceState(r,r.state,null),uc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function eo(t,e){try{var n="",i=e;do n+=U1(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Tu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function ed(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var lS=typeof WeakMap=="function"?WeakMap:Map;function _v(t,e,n){n=Oi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){mc||(mc=!0,ud=i),ed(t,e)},n}function vv(t,e,n){n=Oi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){ed(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){ed(t,e),typeof i!="function"&&(_r===null?_r=new Set([this]):_r.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Rm(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new lS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=MS.bind(null,t,e,n),e.then(t,t))}function Pm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Lm(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Oi(-1,1),e.tag=2,gr(n,e,1))),n.lanes|=1),t)}var cS=ji.ReactCurrentOwner,En=!1;function gn(t,e,n,i){e.child=t===null?q_(e,null,n,i):Qs(e,t.child,n,i)}function Dm(t,e,n,i,r){n=n.render;var s=e.ref;return zs(e,r),i=Gf(t,e,n,i,s,r),n=Wf(),t!==null&&!En?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Gi(t,e,r)):(At&&n&&Lf(e),e.flags|=1,gn(t,e,i,r),e.child)}function Nm(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!ep(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,xv(t,e,s,i,r)):(t=zl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:ra,n(o,i)&&t.ref===e.ref)return Gi(t,e,r)}return e.flags|=1,t=xr(s,i),t.ref=e.ref,t.return=e,e.child=t}function xv(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(ra(s,i)&&t.ref===e.ref)if(En=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(En=!0);else return e.lanes=t.lanes,Gi(t,e,r)}return td(t,e,n,i,r)}function yv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},wt(Ns,Nn),Nn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,wt(Ns,Nn),Nn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,wt(Ns,Nn),Nn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,wt(Ns,Nn),Nn|=i;return gn(t,e,r,n),e.child}function Sv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function td(t,e,n,i,r){var s=Tn(n)?jr:fn.current;return s=Ks(e,s),zs(e,r),n=Gf(t,e,n,i,s,r),i=Wf(),t!==null&&!En?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Gi(t,e,r)):(At&&i&&Lf(e),e.flags|=1,gn(t,e,n,r),e.child)}function Im(t,e,n,i,r){if(Tn(n)){var s=!0;sc(e)}else s=!1;if(zs(e,r),e.stateNode===null)Fl(t,e),gv(e,n,i),Jh(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Zn(c):(c=Tn(n)?jr:fn.current,c=Ks(e,c));var h=n.getDerivedStateFromProps,d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&Cm(e,o,i,c),ir=!1;var u=e.memoizedState;o.state=u,uc(e,i,o,r),l=e.memoizedState,a!==i||u!==l||bn.current||ir?(typeof h=="function"&&(Qh(e,n,h,i),l=e.memoizedState),(a=ir||Am(e,n,a,i,u,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Y_(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:ii(e.type,a),o.props=c,d=e.pendingProps,u=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Zn(l):(l=Tn(n)?jr:fn.current,l=Ks(e,l));var p=n.getDerivedStateFromProps;(h=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||u!==l)&&Cm(e,o,i,l),ir=!1,u=e.memoizedState,o.state=u,uc(e,i,o,r);var _=e.memoizedState;a!==d||u!==_||bn.current||ir?(typeof p=="function"&&(Qh(e,n,p,i),_=e.memoizedState),(c=ir||Am(e,n,c,i,u,_,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return nd(t,e,n,i,s,r)}function nd(t,e,n,i,r,s){Sv(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&xm(e,n,!1),Gi(t,e,s);i=e.stateNode,cS.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Qs(e,t.child,null,s),e.child=Qs(e,null,a,s)):gn(t,e,a,s),e.memoizedState=i.state,r&&xm(e,n,!0),e.child}function Mv(t){var e=t.stateNode;e.pendingContext?vm(t,e.pendingContext,e.pendingContext!==e.context):e.context&&vm(t,e.context,!1),Bf(t,e.containerInfo)}function Um(t,e,n,i,r){return Zs(),Nf(r),e.flags|=256,gn(t,e,n,i),e.child}var id={dehydrated:null,treeContext:null,retryLane:0};function rd(t){return{baseLanes:t,cachePool:null,transitions:null}}function wv(t,e,n){var i=e.pendingProps,r=Ct.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),wt(Ct,r&1),t===null)return Kh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=zc(o,i,0,null),t=Wr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=rd(n),e.memoizedState=id,t):qf(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return uS(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=xr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=xr(a,s):(s=Wr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?rd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=id,i}return s=t.child,t=s.sibling,i=xr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function qf(t,e){return e=zc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Xa(t,e,n,i){return i!==null&&Nf(i),Qs(e,t.child,null,n),t=qf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function uS(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Tu(Error(pe(422))),Xa(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=zc({mode:"visible",children:i.children},r,0,null),s=Wr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Qs(e,t.child,null,o),e.child.memoizedState=rd(o),e.memoizedState=id,s);if(!(e.mode&1))return Xa(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(pe(419)),i=Tu(s,i,void 0),Xa(t,e,o,i)}if(a=(o&t.childLanes)!==0,En||a){if(i=Kt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Hi(t,r),li(i,t,r,-1))}return Jf(),i=Tu(Error(pe(421))),Xa(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=wS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Fn=mr(r.nextSibling),On=e,At=!0,si=null,t!==null&&(Xn[qn++]=Ui,Xn[qn++]=ki,Xn[qn++]=Xr,Ui=t.id,ki=t.overflow,Xr=e),e=qf(e,i.children),e.flags|=4096,e)}function km(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Zh(t.return,e,n)}function Au(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Ev(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(gn(t,e,i.children,n),i=Ct.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&km(t,n,e);else if(t.tag===19)km(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(wt(Ct,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&hc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Au(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&hc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Au(e,!0,n,null,s);break;case"together":Au(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Fl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Gi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),$r|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(pe(153));if(e.child!==null){for(t=e.child,n=xr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=xr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function hS(t,e,n){switch(e.tag){case 3:Mv(e),Zs();break;case 5:K_(e);break;case 1:Tn(e.type)&&sc(e);break;case 4:Bf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;wt(lc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(wt(Ct,Ct.current&1),e.flags|=128,null):n&e.child.childLanes?wv(t,e,n):(wt(Ct,Ct.current&1),t=Gi(t,e,n),t!==null?t.sibling:null);wt(Ct,Ct.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Ev(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),wt(Ct,Ct.current),i)break;return null;case 22:case 23:return e.lanes=0,yv(t,e,n)}return Gi(t,e,n)}var bv,sd,Tv,Av;bv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};sd=function(){};Tv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,zr(Mi.current);var s=null;switch(n){case"input":r=Ah(t,r),i=Ah(t,i),s=[];break;case"select":r=Pt({},r,{value:void 0}),i=Pt({},i,{value:void 0}),s=[];break;case"textarea":r=Ph(t,r),i=Ph(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=ic)}Dh(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Zo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Zo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Et("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Av=function(t,e,n,i){n!==i&&(e.flags|=4)};function wo(t,e){if(!At)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function on(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function dS(t,e,n){var i=e.pendingProps;switch(Df(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return on(e),null;case 1:return Tn(e.type)&&rc(),on(e),null;case 3:return i=e.stateNode,Js(),bt(bn),bt(fn),Vf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Wa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,si!==null&&(fd(si),si=null))),sd(t,e),on(e),null;case 5:zf(e);var r=zr(ca.current);if(n=e.type,t!==null&&e.stateNode!=null)Tv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(pe(166));return on(e),null}if(t=zr(Mi.current),Wa(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[vi]=e,i[aa]=s,t=(e.mode&1)!==0,n){case"dialog":Et("cancel",i),Et("close",i);break;case"iframe":case"object":case"embed":Et("load",i);break;case"video":case"audio":for(r=0;r<Fo.length;r++)Et(Fo[r],i);break;case"source":Et("error",i);break;case"img":case"image":case"link":Et("error",i),Et("load",i);break;case"details":Et("toggle",i);break;case"input":jp(i,s),Et("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},Et("invalid",i);break;case"textarea":qp(i,s),Et("invalid",i)}Dh(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Ga(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Ga(i.textContent,a,t),r=["children",""+a]):Zo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Et("scroll",i)}switch(n){case"input":Ua(i),Xp(i,s,!0);break;case"textarea":Ua(i),$p(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=ic)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=t_(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[vi]=e,t[aa]=i,bv(t,e,!1,!1),e.stateNode=t;e:{switch(o=Nh(n,i),n){case"dialog":Et("cancel",t),Et("close",t),r=i;break;case"iframe":case"object":case"embed":Et("load",t),r=i;break;case"video":case"audio":for(r=0;r<Fo.length;r++)Et(Fo[r],t);r=i;break;case"source":Et("error",t),r=i;break;case"img":case"image":case"link":Et("error",t),Et("load",t),r=i;break;case"details":Et("toggle",t),r=i;break;case"input":jp(t,i),r=Ah(t,i),Et("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Pt({},i,{value:void 0}),Et("invalid",t);break;case"textarea":qp(t,i),r=Ph(t,i),Et("invalid",t);break;default:r=i}Dh(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?r_(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&n_(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Qo(t,l):typeof l=="number"&&Qo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Zo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Et("scroll",t):l!=null&&_f(t,s,l,o))}switch(n){case"input":Ua(t),Xp(t,i,!1);break;case"textarea":Ua(t),$p(t);break;case"option":i.value!=null&&t.setAttribute("value",""+yr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ks(t,!!i.multiple,s,!1):i.defaultValue!=null&&ks(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=ic)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return on(e),null;case 6:if(t&&e.stateNode!=null)Av(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(pe(166));if(n=zr(ca.current),zr(Mi.current),Wa(e)){if(i=e.stateNode,n=e.memoizedProps,i[vi]=e,(s=i.nodeValue!==n)&&(t=On,t!==null))switch(t.tag){case 3:Ga(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ga(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[vi]=e,e.stateNode=i}return on(e),null;case 13:if(bt(Ct),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(At&&Fn!==null&&e.mode&1&&!(e.flags&128))j_(),Zs(),e.flags|=98560,s=!1;else if(s=Wa(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(pe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(pe(317));s[vi]=e}else Zs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;on(e),s=!1}else si!==null&&(fd(si),si=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Ct.current&1?Gt===0&&(Gt=3):Jf())),e.updateQueue!==null&&(e.flags|=4),on(e),null);case 4:return Js(),sd(t,e),t===null&&sa(e.stateNode.containerInfo),on(e),null;case 10:return kf(e.type._context),on(e),null;case 17:return Tn(e.type)&&rc(),on(e),null;case 19:if(bt(Ct),s=e.memoizedState,s===null)return on(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)wo(s,!1);else{if(Gt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=hc(t),o!==null){for(e.flags|=128,wo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return wt(Ct,Ct.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ft()>to&&(e.flags|=128,i=!0,wo(s,!1),e.lanes=4194304)}else{if(!i)if(t=hc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),wo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!At)return on(e),null}else 2*Ft()-s.renderingStartTime>to&&n!==1073741824&&(e.flags|=128,i=!0,wo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ft(),e.sibling=null,n=Ct.current,wt(Ct,i?n&1|2:n&1),e):(on(e),null);case 22:case 23:return Qf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Nn&1073741824&&(on(e),e.subtreeFlags&6&&(e.flags|=8192)):on(e),null;case 24:return null;case 25:return null}throw Error(pe(156,e.tag))}function fS(t,e){switch(Df(e),e.tag){case 1:return Tn(e.type)&&rc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Js(),bt(bn),bt(fn),Vf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return zf(e),null;case 13:if(bt(Ct),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(pe(340));Zs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return bt(Ct),null;case 4:return Js(),null;case 10:return kf(e.type._context),null;case 22:case 23:return Qf(),null;case 24:return null;default:return null}}var qa=!1,hn=!1,pS=typeof WeakSet=="function"?WeakSet:Set,De=null;function Ds(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Dt(t,e,i)}else n.current=null}function od(t,e,n){try{n()}catch(i){Dt(t,e,i)}}var Fm=!1;function mS(t,e){if(Gh=ec,t=D_(),Pf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,h=0,d=t,u=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)u=d,d=p;for(;;){if(d===t)break t;if(u===n&&++c===r&&(a=o),u===s&&++h===i&&(l=o),(p=d.nextSibling)!==null)break;d=u,u=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Wh={focusedElem:t,selectionRange:n},ec=!1,De=e;De!==null;)if(e=De,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,De=t;else for(;De!==null;){e=De;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var x=_.memoizedProps,g=_.memoizedState,f=e.stateNode,m=f.getSnapshotBeforeUpdate(e.elementType===e.type?x:ii(e.type,x),g);f.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(pe(163))}}catch(S){Dt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,De=t;break}De=e.return}return _=Fm,Fm=!1,_}function Xo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&od(e,n,s)}r=r.next}while(r!==i)}}function Oc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function ad(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Cv(t){var e=t.alternate;e!==null&&(t.alternate=null,Cv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[vi],delete e[aa],delete e[qh],delete e[Zy],delete e[Qy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Rv(t){return t.tag===5||t.tag===3||t.tag===4}function Om(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Rv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ld(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ic));else if(i!==4&&(t=t.child,t!==null))for(ld(t,e,n),t=t.sibling;t!==null;)ld(t,e,n),t=t.sibling}function cd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(cd(t,e,n),t=t.sibling;t!==null;)cd(t,e,n),t=t.sibling}var Jt=null,ri=!1;function Yi(t,e,n){for(n=n.child;n!==null;)Pv(t,e,n),n=n.sibling}function Pv(t,e,n){if(Si&&typeof Si.onCommitFiberUnmount=="function")try{Si.onCommitFiberUnmount(Pc,n)}catch{}switch(n.tag){case 5:hn||Ds(n,e);case 6:var i=Jt,r=ri;Jt=null,Yi(t,e,n),Jt=i,ri=r,Jt!==null&&(ri?(t=Jt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Jt.removeChild(n.stateNode));break;case 18:Jt!==null&&(ri?(t=Jt,n=n.stateNode,t.nodeType===8?yu(t.parentNode,n):t.nodeType===1&&yu(t,n),na(t)):yu(Jt,n.stateNode));break;case 4:i=Jt,r=ri,Jt=n.stateNode.containerInfo,ri=!0,Yi(t,e,n),Jt=i,ri=r;break;case 0:case 11:case 14:case 15:if(!hn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&od(n,e,o),r=r.next}while(r!==i)}Yi(t,e,n);break;case 1:if(!hn&&(Ds(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Dt(n,e,a)}Yi(t,e,n);break;case 21:Yi(t,e,n);break;case 22:n.mode&1?(hn=(i=hn)||n.memoizedState!==null,Yi(t,e,n),hn=i):Yi(t,e,n);break;default:Yi(t,e,n)}}function Bm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new pS),e.forEach(function(i){var r=ES.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Jn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Jt=a.stateNode,ri=!1;break e;case 3:Jt=a.stateNode.containerInfo,ri=!0;break e;case 4:Jt=a.stateNode.containerInfo,ri=!0;break e}a=a.return}if(Jt===null)throw Error(pe(160));Pv(s,o,r),Jt=null,ri=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Dt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Lv(e,t),e=e.sibling}function Lv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Jn(e,t),fi(t),i&4){try{Xo(3,t,t.return),Oc(3,t)}catch(x){Dt(t,t.return,x)}try{Xo(5,t,t.return)}catch(x){Dt(t,t.return,x)}}break;case 1:Jn(e,t),fi(t),i&512&&n!==null&&Ds(n,n.return);break;case 5:if(Jn(e,t),fi(t),i&512&&n!==null&&Ds(n,n.return),t.flags&32){var r=t.stateNode;try{Qo(r,"")}catch(x){Dt(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&J0(r,s),Nh(a,o);var c=Nh(a,s);for(o=0;o<l.length;o+=2){var h=l[o],d=l[o+1];h==="style"?r_(r,d):h==="dangerouslySetInnerHTML"?n_(r,d):h==="children"?Qo(r,d):_f(r,h,d,c)}switch(a){case"input":Ch(r,s);break;case"textarea":e_(r,s);break;case"select":var u=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ks(r,!!s.multiple,p,!1):u!==!!s.multiple&&(s.defaultValue!=null?ks(r,!!s.multiple,s.defaultValue,!0):ks(r,!!s.multiple,s.multiple?[]:"",!1))}r[aa]=s}catch(x){Dt(t,t.return,x)}}break;case 6:if(Jn(e,t),fi(t),i&4){if(t.stateNode===null)throw Error(pe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){Dt(t,t.return,x)}}break;case 3:if(Jn(e,t),fi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{na(e.containerInfo)}catch(x){Dt(t,t.return,x)}break;case 4:Jn(e,t),fi(t);break;case 13:Jn(e,t),fi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Kf=Ft())),i&4&&Bm(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(hn=(c=hn)||h,Jn(e,t),hn=c):Jn(e,t),fi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(De=t,h=t.child;h!==null;){for(d=De=h;De!==null;){switch(u=De,p=u.child,u.tag){case 0:case 11:case 14:case 15:Xo(4,u,u.return);break;case 1:Ds(u,u.return);var _=u.stateNode;if(typeof _.componentWillUnmount=="function"){i=u,n=u.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(x){Dt(i,n,x)}}break;case 5:Ds(u,u.return);break;case 22:if(u.memoizedState!==null){Vm(d);continue}}p!==null?(p.return=u,De=p):Vm(d)}h=h.sibling}e:for(h=null,d=t;;){if(d.tag===5){if(h===null){h=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=i_("display",o))}catch(x){Dt(t,t.return,x)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(x){Dt(t,t.return,x)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Jn(e,t),fi(t),i&4&&Bm(t);break;case 21:break;default:Jn(e,t),fi(t)}}function fi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Rv(n)){var i=n;break e}n=n.return}throw Error(pe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Qo(r,""),i.flags&=-33);var s=Om(t);cd(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Om(t);ld(t,a,o);break;default:throw Error(pe(161))}}catch(l){Dt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function gS(t,e,n){De=t,Dv(t)}function Dv(t,e,n){for(var i=(t.mode&1)!==0;De!==null;){var r=De,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||qa;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||hn;a=qa;var c=hn;if(qa=o,(hn=l)&&!c)for(De=r;De!==null;)o=De,l=o.child,o.tag===22&&o.memoizedState!==null?Hm(r):l!==null?(l.return=o,De=l):Hm(r);for(;s!==null;)De=s,Dv(s),s=s.sibling;De=r,qa=a,hn=c}zm(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,De=s):zm(t)}}function zm(t){for(;De!==null;){var e=De;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:hn||Oc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!hn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ii(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Em(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Em(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&na(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(pe(163))}hn||e.flags&512&&ad(e)}catch(u){Dt(e,e.return,u)}}if(e===t){De=null;break}if(n=e.sibling,n!==null){n.return=e.return,De=n;break}De=e.return}}function Vm(t){for(;De!==null;){var e=De;if(e===t){De=null;break}var n=e.sibling;if(n!==null){n.return=e.return,De=n;break}De=e.return}}function Hm(t){for(;De!==null;){var e=De;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Oc(4,e)}catch(l){Dt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Dt(e,r,l)}}var s=e.return;try{ad(e)}catch(l){Dt(e,s,l)}break;case 5:var o=e.return;try{ad(e)}catch(l){Dt(e,o,l)}}}catch(l){Dt(e,e.return,l)}if(e===t){De=null;break}var a=e.sibling;if(a!==null){a.return=e.return,De=a;break}De=e.return}}var _S=Math.ceil,pc=ji.ReactCurrentDispatcher,$f=ji.ReactCurrentOwner,Kn=ji.ReactCurrentBatchConfig,ht=0,Kt=null,Bt=null,tn=0,Nn=0,Ns=Tr(0),Gt=0,fa=null,$r=0,Bc=0,Yf=0,qo=null,Mn=null,Kf=0,to=1/0,Ni=null,mc=!1,ud=null,_r=null,$a=!1,cr=null,gc=0,$o=0,hd=null,Ol=-1,Bl=0;function _n(){return ht&6?Ft():Ol!==-1?Ol:Ol=Ft()}function vr(t){return t.mode&1?ht&2&&tn!==0?tn&-tn:eS.transition!==null?(Bl===0&&(Bl=g_()),Bl):(t=mt,t!==0||(t=window.event,t=t===void 0?16:w_(t.type)),t):1}function li(t,e,n,i){if(50<$o)throw $o=0,hd=null,Error(pe(185));Ea(t,n,i),(!(ht&2)||t!==Kt)&&(t===Kt&&(!(ht&2)&&(Bc|=n),Gt===4&&or(t,tn)),An(t,i),n===1&&ht===0&&!(e.mode&1)&&(to=Ft()+500,Uc&&Ar()))}function An(t,e){var n=t.callbackNode;ey(t,e);var i=Jl(t,t===Kt?tn:0);if(i===0)n!==null&&Zp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Zp(n),e===1)t.tag===0?Jy(Gm.bind(null,t)):H_(Gm.bind(null,t)),Yy(function(){!(ht&6)&&Ar()}),n=null;else{switch(__(i)){case 1:n=Mf;break;case 4:n=p_;break;case 16:n=Ql;break;case 536870912:n=m_;break;default:n=Ql}n=zv(n,Nv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Nv(t,e){if(Ol=-1,Bl=0,ht&6)throw Error(pe(327));var n=t.callbackNode;if(Vs()&&t.callbackNode!==n)return null;var i=Jl(t,t===Kt?tn:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=_c(t,i);else{e=i;var r=ht;ht|=2;var s=Uv();(Kt!==t||tn!==e)&&(Ni=null,to=Ft()+500,Gr(t,e));do try{yS();break}catch(a){Iv(t,a)}while(!0);Uf(),pc.current=s,ht=r,Bt!==null?e=0:(Kt=null,tn=0,e=Gt)}if(e!==0){if(e===2&&(r=Oh(t),r!==0&&(i=r,e=dd(t,r))),e===1)throw n=fa,Gr(t,0),or(t,i),An(t,Ft()),n;if(e===6)or(t,i);else{if(r=t.current.alternate,!(i&30)&&!vS(r)&&(e=_c(t,i),e===2&&(s=Oh(t),s!==0&&(i=s,e=dd(t,s))),e===1))throw n=fa,Gr(t,0),or(t,i),An(t,Ft()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(pe(345));case 2:Ur(t,Mn,Ni);break;case 3:if(or(t,i),(i&130023424)===i&&(e=Kf+500-Ft(),10<e)){if(Jl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){_n(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Xh(Ur.bind(null,t,Mn,Ni),e);break}Ur(t,Mn,Ni);break;case 4:if(or(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-ai(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Ft()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*_S(i/1960))-i,10<i){t.timeoutHandle=Xh(Ur.bind(null,t,Mn,Ni),i);break}Ur(t,Mn,Ni);break;case 5:Ur(t,Mn,Ni);break;default:throw Error(pe(329))}}}return An(t,Ft()),t.callbackNode===n?Nv.bind(null,t):null}function dd(t,e){var n=qo;return t.current.memoizedState.isDehydrated&&(Gr(t,e).flags|=256),t=_c(t,e),t!==2&&(e=Mn,Mn=n,e!==null&&fd(e)),t}function fd(t){Mn===null?Mn=t:Mn.push.apply(Mn,t)}function vS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ui(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function or(t,e){for(e&=~Yf,e&=~Bc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ai(e),i=1<<n;t[n]=-1,e&=~i}}function Gm(t){if(ht&6)throw Error(pe(327));Vs();var e=Jl(t,0);if(!(e&1))return An(t,Ft()),null;var n=_c(t,e);if(t.tag!==0&&n===2){var i=Oh(t);i!==0&&(e=i,n=dd(t,i))}if(n===1)throw n=fa,Gr(t,0),or(t,e),An(t,Ft()),n;if(n===6)throw Error(pe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ur(t,Mn,Ni),An(t,Ft()),null}function Zf(t,e){var n=ht;ht|=1;try{return t(e)}finally{ht=n,ht===0&&(to=Ft()+500,Uc&&Ar())}}function Yr(t){cr!==null&&cr.tag===0&&!(ht&6)&&Vs();var e=ht;ht|=1;var n=Kn.transition,i=mt;try{if(Kn.transition=null,mt=1,t)return t()}finally{mt=i,Kn.transition=n,ht=e,!(ht&6)&&Ar()}}function Qf(){Nn=Ns.current,bt(Ns)}function Gr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,$y(n)),Bt!==null)for(n=Bt.return;n!==null;){var i=n;switch(Df(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&rc();break;case 3:Js(),bt(bn),bt(fn),Vf();break;case 5:zf(i);break;case 4:Js();break;case 13:bt(Ct);break;case 19:bt(Ct);break;case 10:kf(i.type._context);break;case 22:case 23:Qf()}n=n.return}if(Kt=t,Bt=t=xr(t.current,null),tn=Nn=e,Gt=0,fa=null,Yf=Bc=$r=0,Mn=qo=null,Br!==null){for(e=0;e<Br.length;e++)if(n=Br[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Br=null}return t}function Iv(t,e){do{var n=Bt;try{if(Uf(),Ul.current=fc,dc){for(var i=Rt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}dc=!1}if(qr=0,qt=Vt=Rt=null,jo=!1,ua=0,$f.current=null,n===null||n.return===null){Gt=1,fa=e,Bt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=tn,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var u=h.alternate;u?(h.updateQueue=u.updateQueue,h.memoizedState=u.memoizedState,h.lanes=u.lanes):(h.updateQueue=null,h.memoizedState=null)}var p=Pm(o);if(p!==null){p.flags&=-257,Lm(p,o,a,s,e),p.mode&1&&Rm(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var x=new Set;x.add(l),e.updateQueue=x}else _.add(l);break e}else{if(!(e&1)){Rm(s,c,e),Jf();break e}l=Error(pe(426))}}else if(At&&a.mode&1){var g=Pm(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Lm(g,o,a,s,e),Nf(eo(l,a));break e}}s=l=eo(l,a),Gt!==4&&(Gt=2),qo===null?qo=[s]:qo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var f=_v(s,l,e);wm(s,f);break e;case 1:a=l;var m=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof m.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(_r===null||!_r.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=vv(s,a,e);wm(s,S);break e}}s=s.return}while(s!==null)}Fv(n)}catch(T){e=T,Bt===n&&n!==null&&(Bt=n=n.return);continue}break}while(!0)}function Uv(){var t=pc.current;return pc.current=fc,t===null?fc:t}function Jf(){(Gt===0||Gt===3||Gt===2)&&(Gt=4),Kt===null||!($r&268435455)&&!(Bc&268435455)||or(Kt,tn)}function _c(t,e){var n=ht;ht|=2;var i=Uv();(Kt!==t||tn!==e)&&(Ni=null,Gr(t,e));do try{xS();break}catch(r){Iv(t,r)}while(!0);if(Uf(),ht=n,pc.current=i,Bt!==null)throw Error(pe(261));return Kt=null,tn=0,Gt}function xS(){for(;Bt!==null;)kv(Bt)}function yS(){for(;Bt!==null&&!j1();)kv(Bt)}function kv(t){var e=Bv(t.alternate,t,Nn);t.memoizedProps=t.pendingProps,e===null?Fv(t):Bt=e,$f.current=null}function Fv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=fS(n,e),n!==null){n.flags&=32767,Bt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Gt=6,Bt=null;return}}else if(n=dS(n,e,Nn),n!==null){Bt=n;return}if(e=e.sibling,e!==null){Bt=e;return}Bt=e=t}while(e!==null);Gt===0&&(Gt=5)}function Ur(t,e,n){var i=mt,r=Kn.transition;try{Kn.transition=null,mt=1,SS(t,e,n,i)}finally{Kn.transition=r,mt=i}return null}function SS(t,e,n,i){do Vs();while(cr!==null);if(ht&6)throw Error(pe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(pe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(ty(t,s),t===Kt&&(Bt=Kt=null,tn=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||$a||($a=!0,zv(Ql,function(){return Vs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Kn.transition,Kn.transition=null;var o=mt;mt=1;var a=ht;ht|=4,$f.current=null,mS(t,n),Lv(n,t),Vy(Wh),ec=!!Gh,Wh=Gh=null,t.current=n,gS(n),X1(),ht=a,mt=o,Kn.transition=s}else t.current=n;if($a&&($a=!1,cr=t,gc=r),s=t.pendingLanes,s===0&&(_r=null),Y1(n.stateNode),An(t,Ft()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(mc)throw mc=!1,t=ud,ud=null,t;return gc&1&&t.tag!==0&&Vs(),s=t.pendingLanes,s&1?t===hd?$o++:($o=0,hd=t):$o=0,Ar(),null}function Vs(){if(cr!==null){var t=__(gc),e=Kn.transition,n=mt;try{if(Kn.transition=null,mt=16>t?16:t,cr===null)var i=!1;else{if(t=cr,cr=null,gc=0,ht&6)throw Error(pe(331));var r=ht;for(ht|=4,De=t.current;De!==null;){var s=De,o=s.child;if(De.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(De=c;De!==null;){var h=De;switch(h.tag){case 0:case 11:case 15:Xo(8,h,s)}var d=h.child;if(d!==null)d.return=h,De=d;else for(;De!==null;){h=De;var u=h.sibling,p=h.return;if(Cv(h),h===c){De=null;break}if(u!==null){u.return=p,De=u;break}De=p}}}var _=s.alternate;if(_!==null){var x=_.child;if(x!==null){_.child=null;do{var g=x.sibling;x.sibling=null,x=g}while(x!==null)}}De=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,De=o;else e:for(;De!==null;){if(s=De,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Xo(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,De=f;break e}De=s.return}}var m=t.current;for(De=m;De!==null;){o=De;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,De=v;else e:for(o=m;De!==null;){if(a=De,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Oc(9,a)}}catch(T){Dt(a,a.return,T)}if(a===o){De=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,De=S;break e}De=a.return}}if(ht=r,Ar(),Si&&typeof Si.onPostCommitFiberRoot=="function")try{Si.onPostCommitFiberRoot(Pc,t)}catch{}i=!0}return i}finally{mt=n,Kn.transition=e}}return!1}function Wm(t,e,n){e=eo(n,e),e=_v(t,e,1),t=gr(t,e,1),e=_n(),t!==null&&(Ea(t,1,e),An(t,e))}function Dt(t,e,n){if(t.tag===3)Wm(t,t,n);else for(;e!==null;){if(e.tag===3){Wm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(_r===null||!_r.has(i))){t=eo(n,t),t=vv(e,t,1),e=gr(e,t,1),t=_n(),e!==null&&(Ea(e,1,t),An(e,t));break}}e=e.return}}function MS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=_n(),t.pingedLanes|=t.suspendedLanes&n,Kt===t&&(tn&n)===n&&(Gt===4||Gt===3&&(tn&130023424)===tn&&500>Ft()-Kf?Gr(t,0):Yf|=n),An(t,e)}function Ov(t,e){e===0&&(t.mode&1?(e=Oa,Oa<<=1,!(Oa&130023424)&&(Oa=4194304)):e=1);var n=_n();t=Hi(t,e),t!==null&&(Ea(t,e,n),An(t,n))}function wS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Ov(t,n)}function ES(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(pe(314))}i!==null&&i.delete(e),Ov(t,n)}var Bv;Bv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||bn.current)En=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return En=!1,hS(t,e,n);En=!!(t.flags&131072)}else En=!1,At&&e.flags&1048576&&G_(e,ac,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Fl(t,e),t=e.pendingProps;var r=Ks(e,fn.current);zs(e,n),r=Gf(null,e,i,t,r,n);var s=Wf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Tn(i)?(s=!0,sc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Of(e),r.updater=Fc,e.stateNode=r,r._reactInternals=e,Jh(e,i,t,n),e=nd(null,e,i,!0,s,n)):(e.tag=0,At&&s&&Lf(e),gn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Fl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=TS(i),t=ii(i,t),r){case 0:e=td(null,e,i,t,n);break e;case 1:e=Im(null,e,i,t,n);break e;case 11:e=Dm(null,e,i,t,n);break e;case 14:e=Nm(null,e,i,ii(i.type,t),n);break e}throw Error(pe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),td(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),Im(t,e,i,r,n);case 3:e:{if(Mv(e),t===null)throw Error(pe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Y_(t,e),uc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=eo(Error(pe(423)),e),e=Um(t,e,i,n,r);break e}else if(i!==r){r=eo(Error(pe(424)),e),e=Um(t,e,i,n,r);break e}else for(Fn=mr(e.stateNode.containerInfo.firstChild),On=e,At=!0,si=null,n=q_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Zs(),i===r){e=Gi(t,e,n);break e}gn(t,e,i,n)}e=e.child}return e;case 5:return K_(e),t===null&&Kh(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,jh(i,r)?o=null:s!==null&&jh(i,s)&&(e.flags|=32),Sv(t,e),gn(t,e,o,n),e.child;case 6:return t===null&&Kh(e),null;case 13:return wv(t,e,n);case 4:return Bf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Qs(e,null,i,n):gn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),Dm(t,e,i,r,n);case 7:return gn(t,e,e.pendingProps,n),e.child;case 8:return gn(t,e,e.pendingProps.children,n),e.child;case 12:return gn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,wt(lc,i._currentValue),i._currentValue=o,s!==null)if(ui(s.value,o)){if(s.children===r.children&&!bn.current){e=Gi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Oi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Zh(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(pe(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Zh(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}gn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,zs(e,n),r=Zn(r),i=i(r),e.flags|=1,gn(t,e,i,n),e.child;case 14:return i=e.type,r=ii(i,e.pendingProps),r=ii(i.type,r),Nm(t,e,i,r,n);case 15:return xv(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),Fl(t,e),e.tag=1,Tn(i)?(t=!0,sc(e)):t=!1,zs(e,n),gv(e,i,r),Jh(e,i,r,n),nd(null,e,i,!0,t,n);case 19:return Ev(t,e,n);case 22:return yv(t,e,n)}throw Error(pe(156,e.tag))};function zv(t,e){return f_(t,e)}function bS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,e,n,i){return new bS(t,e,n,i)}function ep(t){return t=t.prototype,!(!t||!t.isReactComponent)}function TS(t){if(typeof t=="function")return ep(t)?1:0;if(t!=null){if(t=t.$$typeof,t===xf)return 11;if(t===yf)return 14}return 2}function xr(t,e){var n=t.alternate;return n===null?(n=Yn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function zl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")ep(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ws:return Wr(n.children,r,s,e);case vf:o=8,r|=8;break;case wh:return t=Yn(12,n,e,r|2),t.elementType=wh,t.lanes=s,t;case Eh:return t=Yn(13,n,e,r),t.elementType=Eh,t.lanes=s,t;case bh:return t=Yn(19,n,e,r),t.elementType=bh,t.lanes=s,t;case K0:return zc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case $0:o=10;break e;case Y0:o=9;break e;case xf:o=11;break e;case yf:o=14;break e;case nr:o=16,i=null;break e}throw Error(pe(130,t==null?t:typeof t,""))}return e=Yn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Wr(t,e,n,i){return t=Yn(7,t,i,e),t.lanes=n,t}function zc(t,e,n,i){return t=Yn(22,t,i,e),t.elementType=K0,t.lanes=n,t.stateNode={isHidden:!1},t}function Cu(t,e,n){return t=Yn(6,t,null,e),t.lanes=n,t}function Ru(t,e,n){return e=Yn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function AS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=cu(0),this.expirationTimes=cu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=cu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function tp(t,e,n,i,r,s,o,a,l){return t=new AS(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Yn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Of(s),t}function CS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ms,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Vv(t){if(!t)return Sr;t=t._reactInternals;e:{if(ts(t)!==t||t.tag!==1)throw Error(pe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Tn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(pe(171))}if(t.tag===1){var n=t.type;if(Tn(n))return V_(t,n,e)}return e}function Hv(t,e,n,i,r,s,o,a,l){return t=tp(n,i,!0,t,r,s,o,a,l),t.context=Vv(null),n=t.current,i=_n(),r=vr(n),s=Oi(i,r),s.callback=e??null,gr(n,s,r),t.current.lanes=r,Ea(t,r,i),An(t,i),t}function Vc(t,e,n,i){var r=e.current,s=_n(),o=vr(r);return n=Vv(n),e.context===null?e.context=n:e.pendingContext=n,e=Oi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=gr(r,e,o),t!==null&&(li(t,r,o,s),Il(t,r,o)),o}function vc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function jm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function np(t,e){jm(t,e),(t=t.alternate)&&jm(t,e)}function RS(){return null}var Gv=typeof reportError=="function"?reportError:function(t){console.error(t)};function ip(t){this._internalRoot=t}Hc.prototype.render=ip.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(pe(409));Vc(t,e,null,null)};Hc.prototype.unmount=ip.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Yr(function(){Vc(null,t,null,null)}),e[Vi]=null}};function Hc(t){this._internalRoot=t}Hc.prototype.unstable_scheduleHydration=function(t){if(t){var e=y_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<sr.length&&e!==0&&e<sr[n].priority;n++);sr.splice(n,0,t),n===0&&M_(t)}};function rp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Gc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Xm(){}function PS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=vc(o);s.call(c)}}var o=Hv(e,i,t,0,null,!1,!1,"",Xm);return t._reactRootContainer=o,t[Vi]=o.current,sa(t.nodeType===8?t.parentNode:t),Yr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=vc(l);a.call(c)}}var l=tp(t,0,!1,null,null,!1,!1,"",Xm);return t._reactRootContainer=l,t[Vi]=l.current,sa(t.nodeType===8?t.parentNode:t),Yr(function(){Vc(e,l,n,i)}),l}function Wc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=vc(o);a.call(l)}}Vc(e,o,t,r)}else o=PS(n,e,t,r,i);return vc(o)}v_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ko(e.pendingLanes);n!==0&&(wf(e,n|1),An(e,Ft()),!(ht&6)&&(to=Ft()+500,Ar()))}break;case 13:Yr(function(){var i=Hi(t,1);if(i!==null){var r=_n();li(i,t,1,r)}}),np(t,1)}};Ef=function(t){if(t.tag===13){var e=Hi(t,134217728);if(e!==null){var n=_n();li(e,t,134217728,n)}np(t,134217728)}};x_=function(t){if(t.tag===13){var e=vr(t),n=Hi(t,e);if(n!==null){var i=_n();li(n,t,e,i)}np(t,e)}};y_=function(){return mt};S_=function(t,e){var n=mt;try{return mt=t,e()}finally{mt=n}};Uh=function(t,e,n){switch(e){case"input":if(Ch(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Ic(i);if(!r)throw Error(pe(90));Q0(i),Ch(i,r)}}}break;case"textarea":e_(t,n);break;case"select":e=n.value,e!=null&&ks(t,!!n.multiple,e,!1)}};a_=Zf;l_=Yr;var LS={usingClientEntryPoint:!1,Events:[Ta,As,Ic,s_,o_,Zf]},Eo={findFiberByHostInstance:Or,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},DS={bundleType:Eo.bundleType,version:Eo.version,rendererPackageName:Eo.rendererPackageName,rendererConfig:Eo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ji.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=h_(t),t===null?null:t.stateNode},findFiberByHostInstance:Eo.findFiberByHostInstance||RS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ya=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ya.isDisabled&&Ya.supportsFiber)try{Pc=Ya.inject(DS),Si=Ya}catch{}}Vn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=LS;Vn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!rp(e))throw Error(pe(200));return CS(t,e,null,n)};Vn.createRoot=function(t,e){if(!rp(t))throw Error(pe(299));var n=!1,i="",r=Gv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=tp(t,1,!1,null,null,n,!1,i,r),t[Vi]=e.current,sa(t.nodeType===8?t.parentNode:t),new ip(e)};Vn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(pe(188)):(t=Object.keys(t).join(","),Error(pe(268,t)));return t=h_(e),t=t===null?null:t.stateNode,t};Vn.flushSync=function(t){return Yr(t)};Vn.hydrate=function(t,e,n){if(!Gc(e))throw Error(pe(200));return Wc(null,t,e,!0,n)};Vn.hydrateRoot=function(t,e,n){if(!rp(t))throw Error(pe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=Gv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Hv(e,null,t,1,n??null,r,!1,s,o),t[Vi]=e.current,sa(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Hc(e)};Vn.render=function(t,e,n){if(!Gc(e))throw Error(pe(200));return Wc(null,t,e,!1,n)};Vn.unmountComponentAtNode=function(t){if(!Gc(t))throw Error(pe(40));return t._reactRootContainer?(Yr(function(){Wc(null,null,t,!1,function(){t._reactRootContainer=null,t[Vi]=null})}),!0):!1};Vn.unstable_batchedUpdates=Zf;Vn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Gc(n))throw Error(pe(200));if(t==null||t._reactInternals===void 0)throw Error(pe(38));return Wc(t,e,n,!1,i)};Vn.version="18.3.1-next-f1338f8080-20240426";function Wv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Wv)}catch(t){console.error(t)}}Wv(),W0.exports=Vn;var NS=W0.exports,jv,qm=NS;jv=qm.createRoot,qm.hydrateRoot;let Vl="/";function IS(t){Vl=t}function cn(t){const e=t.replace(/^\/+/,"");return Vl.endsWith("/")?Vl+e:Vl+"/"+e}async function US(t){const e=new Uint8Array(t);return e.length>=2&&e[0]===31&&e[1]===139?$m(e,"gzip"):e.length>=2&&e[0]===120?$m(e,"deflate"):e}async function $m(t,e){const i=new ReadableStream({start(s){s.enqueue(t),s.close()}}).pipeThrough(new DecompressionStream(e)),r=await new Response(i).arrayBuffer();return new Uint8Array(r)}const kS=0,Ym=10,FS=new TextDecoder("utf-8");class OS{constructor(e){this.off=0,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength)}u8(){const e=this.view.getUint8(this.off);return this.off+=1,e}i8(){const e=this.view.getInt8(this.off);return this.off+=1,e}i16(){const e=this.view.getInt16(this.off);return this.off+=2,e}i32(){const e=this.view.getInt32(this.off);return this.off+=4,e}i64(){const e=this.view.getBigInt64(this.off);return this.off+=8,e}f32(){const e=this.view.getFloat32(this.off);return this.off+=4,e}f64(){const e=this.view.getFloat64(this.off);return this.off+=8,e}str(){const e=this.view.getUint16(this.off);this.off+=2;const n=new Uint8Array(this.view.buffer,this.view.byteOffset+this.off,e);return this.off+=e,FS.decode(n)}payload(e){switch(e){case 1:return this.i8();case 2:return this.i16();case 3:return this.i32();case 4:return this.i64();case 5:return this.f32();case 6:return this.f64();case 7:{const n=this.i32(),i=new Int8Array(this.view.buffer,this.view.byteOffset+this.off,n).slice();return this.off+=n,i}case 8:return this.str();case 9:{const n=this.u8(),i=this.i32(),r=[];for(let s=0;s<i;s++)r.push(this.payload(n));return r}case 10:{const n={};for(;;){const i=this.u8();if(i===kS)break;const r=this.str();n[r]=this.payload(i)}return n}case 11:{const n=this.i32(),i=new Int32Array(n);for(let r=0;r<n;r++)i[r]=this.i32();return i}case 12:{const n=this.i32(),i=new BigInt64Array(n);for(let r=0;r<n;r++)i[r]=this.i64();return i}default:throw new Error(`NBT: tipo de tag desconocido (${e})`)}}readRoot(){const e=this.u8();if(e!==Ym)throw new Error(`NBT: la raíz no es un compound (tipo ${e})`);return this.str(),this.payload(Ym)}}function BS(t){return new OS(t).readRoot()}const zS=6e6,Xv=96e6,VS=200*1024*1024;function HS(t){return t.totalBlocks>zS||t.width*t.height*t.length>Xv}class sp extends Error{constructor(e=0,n=0,i=0){super("SCHEMATIC_TOO_LARGE"),this.name="SchematicTooLargeError",this.width=e,this.height=n,this.length=i}}function qv(t,e,n){return t*e*n>Xv}const Km="minecraft:",Je=(t,e)=>e&&Object.keys(e).length?{name:Km+t,properties:e}:{name:Km+t},GS={stone:"stone",granite:"granite",smooth_granite:"polished_granite",diorite:"diorite",smooth_diorite:"polished_diorite",andesite:"andesite",smooth_andesite:"polished_andesite"},WS={dirt:"dirt",coarse_dirt:"coarse_dirt",podzol:"podzol"},jS={default:"sandstone",chiseled_sandstone:"chiseled_sandstone",smooth_sandstone:"cut_sandstone"},XS={default:"red_sandstone",chiseled_red_sandstone:"chiseled_red_sandstone",smooth_red_sandstone:"cut_red_sandstone"},qS={stonebrick:"stone_bricks",mossy_stonebrick:"mossy_stone_bricks",cracked_stonebrick:"cracked_stone_bricks",chiseled_stonebrick:"chiseled_stone_bricks"},$S={prismarine:"prismarine",prismarine_bricks:"prismarine_bricks",dark_prismarine:"dark_prismarine"},YS={poppy:"poppy",blue_orchid:"blue_orchid",allium:"allium",houstonia:"azure_bluet",red_tulip:"red_tulip",orange_tulip:"orange_tulip",white_tulip:"white_tulip",pink_tulip:"pink_tulip",oxeye_daisy:"oxeye_daisy"},KS={sunflower:"sunflower",syringa:"lilac",double_grass:"tall_grass",double_fern:"large_fern",double_rose:"rose_bush",paeonia:"peony"},ZS={grass:"short_grass",fern:"fern",dead_bush:"dead_bush"},Zm={stone:"smooth_stone",sandstone:"sandstone",wood_old:"petrified_oak",cobblestone:"cobblestone",brick:"brick",smooth_brick:"stone_brick",nether_brick:"nether_brick",quartz:"quartz"},Ka=new Set(["oak","spruce","birch","jungle","acacia","dark_oak"]),Pu=(t,e)=>e?"double":t.half==="top"?"top":"bottom";function xc(t){const e=t.name.replace(/^minecraft:/,""),n=t.properties??{},i=n.facing,r=!!i&&i!=="up",s=n.variant;switch(e){case"unpowered_repeater":return Je("repeater",{...n,powered:"false"});case"powered_repeater":return Je("repeater",{...n,powered:"true"});case"unpowered_comparator":return Je("comparator",{...n,powered:"false"});case"powered_comparator":return Je("comparator",{...n,powered:"true"});case"torch":return r?Je("wall_torch",{facing:i}):t;case"redstone_torch":return r?Je("redstone_wall_torch",{facing:i,lit:"true"}):Je("redstone_torch",{lit:"true"});case"unlit_redstone_torch":return r?Je("redstone_wall_torch",{facing:i,lit:"false"}):Je("redstone_torch",{lit:"false"});case"stone":return Je(GS[s]??"stone");case"dirt":return Je(WS[s]??"dirt",s==="podzol"?{snowy:n.snowy??"false"}:void 0);case"sand":return Je(s==="red_sand"?"red_sand":"sand");case"planks":return Je(Ka.has(s)?`${s}_planks`:"oak_planks");case"sapling":return Je(Ka.has(s)?`${s}_sapling`:"oak_sapling",n.stage?{stage:n.stage}:void 0);case"sandstone":return Je(jS[s]??"sandstone");case"red_sandstone":return Je(XS[s]??"red_sandstone");case"stonebrick":return Je(qS[s]??"stone_bricks");case"prismarine":return Je($S[s]??"prismarine");case"sponge":return Je(n.wet==="true"?"wet_sponge":"sponge");case"quartz_block":return s==="chiseled"?Je("chiseled_quartz_block"):s==="lines"?Je("quartz_pillar",{axis:n.axis??"y"}):Je("quartz_block");case"log":case"log2":{const o=s||"oak";return n.axis==="none"?Je(`${o}_wood`):Je(`${o}_log`,{axis:n.axis??"y"})}case"leaves":case"leaves2":return Je(`${s||"oak"}_leaves`);case"wool":return Je(`${n.color??"white"}_wool`);case"carpet":return Je(`${n.color??"white"}_carpet`);case"stained_glass":return Je(`${n.color??"white"}_stained_glass`);case"stained_hardened_clay":return Je(`${n.color??"white"}_terracotta`);case"stained_glass_pane":{const{color:o,...a}=n;return Je(`${o??"white"}_stained_glass_pane`,a)}case"red_flower":return Je(YS[s]??"poppy");case"yellow_flower":return Je("dandelion");case"tallgrass":return Je(ZS[n.type??s]??"short_grass");case"double_plant":{const o=KS[s]??"sunflower";return Je(o,{half:n.half==="upper"?"upper":"lower"})}case"stone_slab":return s?Je(`${Zm[s]??"smooth_stone"}_slab`,{type:Pu(n,!1)}):t;case"double_stone_slab":return Je(`${Zm[s]??"smooth_stone"}_slab`,{type:"double"});case"stone_slab2":return Je("red_sandstone_slab",{type:Pu(n,!1)});case"double_stone_slab2":return Je("red_sandstone_slab",{type:"double"});case"wooden_slab":return Je(`${Ka.has(s)?s:"oak"}_slab`,{type:Pu(n,!1)});case"double_wooden_slab":return Je(`${Ka.has(s)?s:"oak"}_slab`,{type:"double"});default:return t}}function pd(t){if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean")return String(t);if(Array.isArray(t))return t.map(pd).join("");if(t&&typeof t=="object"){const e=t;let n=typeof e.text=="string"?e.text:"";return Array.isArray(e.extra)&&(n+=e.extra.map(pd).join("")),n}return""}function $v(t){const e=t.trim();if(!e||e==='""')return"";if(e[0]==="{"||e[0]==="["||e[0]==='"')try{return pd(JSON.parse(e))}catch{}return e}function Qm(t){if(!t||typeof t!="object"||Array.isArray(t)||ArrayBuffer.isView(t))return[];const e=t.messages;return Array.isArray(e)?e.map(n=>typeof n=="string"?$v(n):""):[]}function Jm(t){for(;t.length&&t[t.length-1]==="";)t.pop();return t}function Yv(t){let e=Qm(t.front_text);const n=Jm(Qm(t.back_text));if(e.length===0){const i=[t.Text1,t.Text2,t.Text3,t.Text4].map(r=>typeof r=="string"?$v(r):"");i.some(r=>r!=="")&&(e=i)}return e=Jm(e),e.length===0&&n.length===0?null:{front:e,back:n}}function QS(t){return t?ArrayBuffer.isView(t)?Array.from(t):Array.isArray(t)?t.filter(e=>typeof e=="number"):[]:[]}function Kv(t){const e=t.Items,n=[];let i=0;if(Array.isArray(e))for(const s of e){if(!s||typeof s!="object"||Array.isArray(s)||ArrayBuffer.isView(s))continue;const o=s,a=Number(o.Count??o.count??0),l=typeof o.id=="string"?o.id:"";a<=0||!l||(n.push({slot:Number(o.Slot??o.slot??n.length),id:l,count:a}),i+=a)}const r=QS(t.disabled_slots);return n.length===0&&r.length===0?null:{items:n,total:i,slots:n.length,disabled:r.length?r:void 0}}function Zv(t){const e=t.blockState??t.block_state;if(!e||typeof e!="object"||Array.isArray(e)||ArrayBuffer.isView(e))return null;const n=e,i=n.Name;if(typeof i!="string"||!i)return null;const r={},s=n.Properties;if(s&&typeof s=="object"&&!Array.isArray(s)&&!ArrayBuffer.isView(s))for(const[o,a]of Object.entries(s))r[o]=String(a);return{name:i,properties:Object.keys(r).length?r:void 0}}function bo(t){return t&&typeof t=="object"&&!Array.isArray(t)&&!ArrayBuffer.isView(t)?t:null}function Qv(t){const e=eM(t);if(!e)return null;let n;try{n=atob(e)}catch{return null}const i=n.match(/textures\.minecraft\.net\/texture\/([0-9a-fA-F]+)/);return i?i[1].toLowerCase():null}function JS(t){const e=t.includes(":")?t.slice(t.indexOf(":")+1):t;return e==="player_head"||e==="player_wall_head"}function Jv(t,e,n){if(!t.size)return;const i=new Map,r=new Map,s=new Map;for(const[o,a]of t){const l=e[o],c=n[l];if(!c||!JS(c.name))continue;let h=r.get(a);h||(h=`skull/custom_${r.size}`,r.set(a,h),i.set(h,a));const d=l+"#"+h;let u=s.get(d);u===void 0&&(u=n.length,n.push({...c,skin:h}),s.set(d,u)),e[o]=u}return i.size?i:void 0}function eM(t){const e=bo(t.profile);if(e&&Array.isArray(e.properties))for(const r of e.properties){const s=bo(r);if(s&&s.name==="textures"&&typeof s.value=="string")return s.value}const n=bo(t.SkullOwner),i=n&&bo(n.Properties);if(i&&Array.isArray(i.textures)){const r=bo(i.textures[0]);if(r&&typeof r.Value=="string")return r.Value}return null}function ex(t){if(String(t.id??t.Id??"").replace("minecraft:","")!=="armor_stand")return null;const n=t.Rotation;let i=0;return Array.isArray(n)&&n.length>=1?i=Number(n[0]):ArrayBuffer.isView(n)&&n.length>=1&&(i=n[0]),{yaw:Number.isFinite(i)?i:0}}const eg={minecart:null,hopper_minecart:"hopper",chest_minecart:"chest",furnace_minecart:"furnace",tnt_minecart:"tnt",command_block_minecart:"command_block",spawner_minecart:"spawner"};function tx(t){const e=String(t.id??t.Id??"").replace("minecraft:","");if(!(e in eg))return null;const n=t.Rotation;let i=0;return Array.isArray(n)&&n.length>=1?i=Number(n[0]):ArrayBuffer.isView(n)&&n.length>=1&&(i=n[0]),{content:eg[e],yaw:Number.isFinite(i)?i:0}}const tM=new Set(["oak","spruce","birch","jungle","acacia","dark_oak","mangrove","cherry","pale_oak"]);function nx(t){const e=String(t.id??t.Id??"").replace("minecraft:","");let n=null,i=!1;if(e==="boat"||e==="chest_boat")i=e==="chest_boat",n=typeof t.Type=="string"?t.Type.replace("minecraft:",""):"oak";else{const o=e.match(/^(.+)_chest_boat$/),a=e.match(/^(.+)_boat$/);o?(n=o[1],i=!0):a&&(n=a[1])}if(!n||!tM.has(n))return null;const r=t.Rotation;let s=0;return Array.isArray(r)&&r.length>=1?s=Number(r[0]):ArrayBuffer.isView(r)&&r.length>=1&&(s=r[0]),{variant:n,chest:i,yaw:Number.isFinite(s)?s:0}}const nM={zombie:{model:"biped",tex:"zombie"},husk:{model:"biped",tex:"husk"},drowned:{model:"biped",tex:"drowned"},zombie_villager:{model:"villager",tex:"zombie_villager"},skeleton:{model:"skeleton",tex:"skeleton"},stray:{model:"skeleton",tex:"stray"},wither_skeleton:{model:"skeleton",tex:"wither_skeleton"},bogged:{model:"skeleton",tex:"bogged"},piglin:{model:"piglin",tex:"piglin"},piglin_brute:{model:"piglin",tex:"piglin_brute"},zombified_piglin:{model:"piglin",tex:"zombified_piglin"},pillager:{model:"illager",tex:"pillager"},vindicator:{model:"illager",tex:"vindicator"},evoker:{model:"illager",tex:"evoker"},illusioner:{model:"illager",tex:"illusioner"},villager:{model:"villager",tex:"villager"},wandering_trader:{model:"villager",tex:"wandering_trader"},witch:{model:"witch",tex:"witch"},creeper:{model:"creeper",tex:"creeper"},spider:{model:"spider",tex:"spider"},cave_spider:{model:"spider",tex:"cave_spider"},enderman:{model:"enderman",tex:"enderman"},slime:{model:"slime",tex:"slime"},magma_cube:{model:"magma_cube",tex:"magma_cube"},blaze:{model:"blaze",tex:"blaze"},ghast:{model:"ghast",tex:"ghast"},guardian:{model:"guardian",tex:"guardian"},elder_guardian:{model:"guardian",tex:"elder_guardian"},silverfish:{model:"silverfish",tex:"silverfish"},endermite:{model:"endermite",tex:"endermite"},vex:{model:"vex",tex:"vex"},phantom:{model:"phantom",tex:"phantom"},ravager:{model:"ravager",tex:"ravager"},hoglin:{model:"hoglin",tex:"hoglin"},zoglin:{model:"hoglin",tex:"zoglin"},warden:{model:"warden",tex:"warden"},breeze:{model:"breeze",tex:"breeze"},creaking:{model:"creaking",tex:"creaking"},shulker:{model:"shulker",tex:"shulker"},wither:{model:"wither",tex:"wither"},iron_golem:{model:"iron_golem",tex:"iron_golem"},snow_golem:{model:"snow_golem",tex:"snow_golem"},cow:{model:"cow",tex:"cow"},mooshroom:{model:"mooshroom",tex:"mooshroom"},pig:{model:"pig",tex:"pig"},sheep:{model:"sheep",tex:"sheep",tex2:"sheep_wool"},chicken:{model:"chicken",tex:"chicken"},rabbit:{model:"rabbit",tex:"rabbit"},goat:{model:"goat",tex:"goat"},horse:{model:"horse",tex:"horse"},donkey:{model:"horse",tex:"donkey"},mule:{model:"horse",tex:"mule"},skeleton_horse:{model:"horse",tex:"skeleton_horse"},zombie_horse:{model:"horse",tex:"zombie_horse"},llama:{model:"llama",tex:"llama"},trader_llama:{model:"llama",tex:"llama"},camel:{model:"camel",tex:"camel"},sniffer:{model:"sniffer",tex:"sniffer"},wolf:{model:"wolf",tex:"wolf"},cat:{model:"cat",tex:"cat"},ocelot:{model:"ocelot",tex:"ocelot"},fox:{model:"fox",tex:"fox"},panda:{model:"panda",tex:"panda"},polar_bear:{model:"polar_bear",tex:"polar_bear"},armadillo:{model:"armadillo",tex:"armadillo"},strider:{model:"strider",tex:"strider"},turtle:{model:"turtle",tex:"turtle"},frog:{model:"frog",tex:"frog"},tadpole:{model:"tadpole",tex:"tadpole"},bee:{model:"bee",tex:"bee"},parrot:{model:"parrot",tex:"parrot"},bat:{model:"bat",tex:"bat"},allay:{model:"allay",tex:"allay"},axolotl:{model:"axolotl",tex:"axolotl"},squid:{model:"squid",tex:"squid"},glow_squid:{model:"squid",tex:"glow_squid"},dolphin:{model:"dolphin",tex:"dolphin"},cod:{model:"cod",tex:"cod"},salmon:{model:"salmon",tex:"salmon"},pufferfish:{model:"pufferfish",tex:"pufferfish"},tropical_fish:{model:"tropical_fish",tex:"tropical_fish"}};function ix(t){const e=String(t.id??t.Id??"").replace("minecraft:",""),n=nM[e];if(!n)return null;const i=t.Rotation;let r=0;return Array.isArray(i)&&i.length>=1?r=Number(i[0]):ArrayBuffer.isView(i)&&i.length>=1&&(r=i[0]),{model:n.model,texs:n.tex2?[n.tex,n.tex2]:[n.tex],yaw:Number.isFinite(r)?r:0}}function rx(t){const e=String(t.id??t.Id??"").replace("minecraft:","");if(e!=="item_frame"&&e!=="glow_item_frame")return null;const n=t.Item,i=n?String(n.id??n.Id??""):"",r=i?i.replace("minecraft:",""):null;return{facing:Number(t.Facing??0),rotation:Number(t.ItemRotation??0),item:r,glow:e==="glow_item_frame"}}function no(t,e,n,i,r){return(i*e+r)*t+n}const iM=new Set(["minecraft:air","minecraft:cave_air","minecraft:void_air","air","cave_air","void_air"]);function Kr(t){return iM.has(t)}function tg(t){const e=t.Regions;if(!e||typeof e!="object")throw new Error("No es un .litematic válido (falta Regions)");const n=t.Metadata??{},i=typeof n.Name=="string"?n.Name:"Schematic",r=typeof n.Author=="string"?n.Author:void 0,s=[];for(const z of Object.keys(e)){const j=e[z],k=j.Position,V=j.Size,P=j.BlockStatePalette,I=j.BlockStates;if(!k||!V||!P||!I)continue;const E=Number(V.x),D=Number(V.y),J=Number(V.z),Y=Number(k.x),ne=Number(k.y),K=Number(k.z),te=Math.abs(E),B=Math.abs(D),q=Math.abs(J);s.push({posX:Y,posY:ne,posZ:K,sizeX:E,sizeY:D,sizeZ:J,absX:te,absY:B,absZ:q,minX:E>=0?Y:Y+E+1,minY:D>=0?ne:ne+D+1,minZ:J>=0?K:K+J+1,palette:P.map(rM),states:I,tileEntities:j.TileEntities,entities:j.Entities})}if(s.length===0)throw new Error("El .litematic no tiene regiones con bloques");let o=1/0,a=1/0,l=1/0,c=-1/0,h=-1/0,d=-1/0;for(const z of s)o=Math.min(o,z.minX),c=Math.max(c,z.minX+z.absX),a=Math.min(a,z.minY),h=Math.max(h,z.minY+z.absY),l=Math.min(l,z.minZ),d=Math.max(d,z.minZ+z.absZ);const u=c-o,p=h-a,_=d-l;if(qv(u,p,_))throw new sp(u,p,_);const x=[{name:"minecraft:air"}],g=new Map([["minecraft:air",0]]),f=new Uint16Array(u*p*_),m=new Map,v=new Map,S=[],T=[],w=[],R=[],y=[],C=new Map,U=new Map;for(const z of s){const j=new Int32Array(z.palette.length);for(let ne=0;ne<z.palette.length;ne++){const K=z.palette[ne];if(Kr(K.name)){j[ne]=0;continue}const te=ng(K);let B=g.get(te);B===void 0&&(B=x.length,x.push(K),g.set(te,B)),j[ne]=B}const k=Math.max(2,sM(z.palette.length)),V=oM(z.states,k),P=z.minX-o,I=z.minY-a,E=z.minZ-l,{absX:D,absY:J,absZ:Y}=z;for(let ne=0;ne<J;ne++)for(let K=0;K<Y;K++)for(let te=0;te<D;te++){const B=(ne*Y+K)*D+te,q=V(B);if(q<=0||q>=z.palette.length)continue;const $=j[q];$!==0&&(f[no(u,_,P+te,I+ne,E+K)]=$)}if(z.tileEntities)for(const ne of z.tileEntities){if(!ne||typeof ne!="object"||Array.isArray(ne)||ArrayBuffer.isView(ne))continue;const K=ne,te=P+Number(K.x),B=I+Number(K.y),q=E+Number(K.z);if(te<0||te>=u||B<0||B>=p||q<0||q>=_)continue;const $=no(u,_,te,B,q),le=Kv(K);le&&m.set($,le);const fe=Yv(K);fe&&v.set($,fe);const de=Zv(K);de&&C.set($,de);const Ce=Qv(K);Ce&&U.set($,Ce)}if(z.entities)for(const ne of z.entities){if(!ne||typeof ne!="object"||Array.isArray(ne)||ArrayBuffer.isView(ne))continue;const K=ne,te=rx(K),B=te?null:tx(K),q=te||B?null:ex(K),$=te||B||q?null:nx(K),le=te||B||q||$?null:ix(K);if(!te&&!B&&!q&&!$&&!le)continue;const fe=K.Pos;let de,Ce,Oe;if(Array.isArray(fe)&&fe.length>=3)de=Number(fe[0]),Ce=Number(fe[1]),Oe=Number(fe[2]);else if(ArrayBuffer.isView(fe)&&fe.length>=3){const N=fe;de=N[0],Ce=N[1],Oe=N[2]}else if(K.TileX!==void 0)de=Number(K.TileX),Ce=Number(K.TileY),Oe=Number(K.TileZ);else continue;const He=z.posX+de-o,Ve=z.posY+Ce-a,Ne=z.posZ+Oe-l,ie=Math.floor(He),he=Math.floor(Ve),Ee=Math.floor(Ne);ie<0||ie>=u||he<0||he>=p||Ee<0||Ee>=_||(te?S.push({x:ie,y:he,z:Ee,...te}):B?T.push({x:He,y:Ve,z:Ne,...B}):q?w.push({x:He,y:Ve,z:Ne,...q}):$?R.push({x:He,y:Ve,z:Ne,...$}):le&&y.push({x:He,y:Ve,z:Ne,...le}))}}for(const[z,j]of C){if(Kr(j.name)){f[z]=0;continue}const k=ng(j);let V=g.get(k);V===void 0&&(V=x.length,x.push(j),g.set(k,V)),f[z]=V}const L=Jv(U,f,x);let G=0;for(let z=0;z<f.length;z++)f[z]!==0&&G++;return{name:i,author:r,width:u,height:p,length:_,palette:x,blocks:f,totalBlocks:G,source:"litematic",containers:m,signs:v,itemFrames:S,minecarts:T,armorStands:w,boats:R,mobs:y,skins:L}}function rM(t){const e=String(t.Name),n=t.Properties;if(!n)return xc({name:e});const i={};for(const r of Object.keys(n))i[r]=String(n[r]);return xc({name:e,properties:i})}function ng(t){if(!t.properties)return t.name;const e=Object.keys(t.properties).sort();return t.name+"["+e.map(n=>`${n}=${t.properties[n]}`).join(",")+"]"}function sM(t){let e=0,n=t-1;for(;n>0;)e++,n>>=1;return e}function oM(t,e){const i=(1n<<BigInt(e))-1n,r=t.length,s=o=>o>=0&&o<r?BigInt.asUintN(64,t[o]):0n;return o=>{const a=o*e,l=Math.floor(a/64),c=a%64,h=Math.floor((a+e-1)/64),d=BigInt(c);let u;if(l===h)u=s(l)>>d&i;else{const p=s(l)>>d,_=s(h)<<64n-d;u=(p|_)&i}return Number(u)}}function ig(t){let e=t;const n=e.Schematic;n&&typeof n=="object"&&!Array.isArray(n)&&!ArrayBuffer.isView(n)&&(e=n);const i=Number(e.Width),r=Number(e.Height),s=Number(e.Length);if(!i||!r||!s)throw new Error("No es un .schem válido (faltan dimensiones)");if(qv(i,r,s))throw new sp(i,r,s);let o,a;const l=e.Blocks;if(l&&(l.Palette||l.Data)?(o=l.Palette,a=l.Data):(o=e.Palette,a=e.BlockData),!o||!a)throw new Error(".schem sin Palette/BlockData");let c=0;for(const P of Object.keys(o))c=Math.max(c,Number(o[P]));const h=new Array(c+1);for(const P of Object.keys(o))h[Number(o[P])]=aM(P);for(let P=0;P<h.length;P++)h[P]||(h[P]={name:"minecraft:air"});const d=i*r*s,u=new Uint16Array(d),p=a;let _=0,x=0;for(;x<d&&_<p.length;){let P=0,I=0,E;do E=p[_++]&255,P|=(E&127)<<I,I+=7;while(E&128&&_<p.length);u[x++]=P<h.length?P:0}let g=0;for(let P=0;P<d;P++)Kr(h[u[P]].name)||g++;const f=new Map,m=new Map,v=new Map,S=P=>P.name+(P.properties?"|"+Object.entries(P.properties).sort().map(([I,E])=>`${I}=${E}`).join(","):""),T=new Map;for(let P=0;P<h.length;P++)T.set(S(h[P]),P);const w=(l==null?void 0:l.BlockEntities)??e.BlockEntities??e.TileEntities;if(Array.isArray(w))for(const P of w){if(!P||typeof P!="object"||Array.isArray(P)||ArrayBuffer.isView(P))continue;const I=P,E=I.Pos;let D,J,Y;if(ArrayBuffer.isView(E)&&E.length>=3){const $=E;D=$[0],J=$[1],Y=$[2]}else D=Number(I.x),J=Number(I.y),Y=Number(I.z);if(!Number.isFinite(D)||D<0||D>=i||J<0||J>=r||Y<0||Y>=s)continue;const ne=no(i,s,D,J,Y),K=Kv(I);K&&f.set(ne,K);const te=Yv(I);te&&m.set(ne,te);const B=Qv(I);B&&v.set(ne,B);const q=Zv(I);if(q)if(Kr(q.name))u[ne]=0;else{const $=S(q);let le=T.get($);le===void 0&&(le=h.length,h.push(q),T.set($,le)),u[ne]=le}}const R=[],y=[],C=[],U=[],L=[],G=(l==null?void 0:l.Entities)??e.Entities;if(Array.isArray(G))for(const P of G){if(!P||typeof P!="object"||Array.isArray(P)||ArrayBuffer.isView(P))continue;const I=P,E=rx(I),D=E?null:tx(I),J=E||D?null:ex(I),Y=E||D||J?null:nx(I),ne=E||D||J||Y?null:ix(I);if(!E&&!D&&!J&&!Y&&!ne)continue;const K=I.Pos;let te,B,q;if(Array.isArray(K)&&K.length>=3)te=Number(K[0]),B=Number(K[1]),q=Number(K[2]);else if(ArrayBuffer.isView(K)&&K.length>=3){const de=K;te=de[0],B=de[1],q=de[2]}else continue;const $=Math.floor(te),le=Math.floor(B),fe=Math.floor(q);$<0||$>=i||le<0||le>=r||fe<0||fe>=s||(E?R.push({x:$,y:le,z:fe,...E}):D?y.push({x:te,y:B,z:q,...D}):J?C.push({x:te,y:B,z:q,...J}):Y?U.push({x:te,y:B,z:q,...Y}):ne&&L.push({x:te,y:B,z:q,...ne}))}const z=Jv(v,u,h),j=e.Metadata,k=j&&typeof j.Name=="string"?j.Name:"Schematic",V=j&&typeof j.Author=="string"?j.Author:void 0;return{name:k,author:V,width:i,height:r,length:s,palette:h,blocks:u,totalBlocks:g,source:"schem",containers:f,signs:m,itemFrames:R,minecarts:y,armorStands:C,boats:U,mobs:L,skins:z}}function aM(t){const e=t.indexOf("[");if(e===-1)return xc({name:t});const n=t.slice(0,e),i=t.endsWith("]")?t.slice(e+1,-1):t.slice(e+1),r={};for(const s of i.split(",")){const o=s.indexOf("=");o>0&&(r[s.slice(0,o)]=s.slice(o+1))}return xc({name:n,properties:r})}async function lM(t,e){const n=await US(t);if(n.length>VS)throw new sp;const i=BS(n),r=e.toLowerCase();if(r.endsWith(".litematic"))return tg(i);if(r.endsWith(".schem"))return ig(i);if(To(i,"Regions"))return tg(i);if(To(i,"Width")||To(i,"Palette")||To(i,"Schematic")||To(i,"Blocks"))return ig(i);throw new Error("Formato no reconocido (se esperaba .litematic o .schem)")}function To(t,e){return Object.prototype.hasOwnProperty.call(t,e)}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const op="184",Hs={ROTATE:0,DOLLY:1,PAN:2},Is={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cM=0,rg=1,uM=2,Hl=1,sx=2,Oo=3,Mr=0,Cn=1,un=2,wi=0,Gs=1,md=2,sg=3,og=4,hM=5,kr=100,dM=101,fM=102,pM=103,mM=104,gM=200,_M=201,vM=202,xM=203,gd=204,_d=205,yM=206,SM=207,MM=208,wM=209,EM=210,bM=211,TM=212,AM=213,CM=214,vd=0,xd=1,yd=2,io=3,Sd=4,Md=5,wd=6,Ed=7,ap=0,RM=1,PM=2,Ei=0,ox=1,ax=2,lx=3,cx=4,ux=5,hx=6,dx=7,fx=300,Zr=301,ro=302,Lu=303,Du=304,jc=306,bd=1e3,Fi=1001,Td=1002,Mt=1003,LM=1004,Za=1005,Yt=1006,Nu=1007,ur=1008,Un=1009,px=1010,mx=1011,pa=1012,lp=1013,bi=1014,xi=1015,Bn=1016,cp=1017,up=1018,ma=1020,gx=35902,_x=35899,vx=1021,xx=1022,oi=1023,Wi=1026,Vr=1027,yx=1028,hp=1029,Qr=1030,dp=1031,fp=1033,Gl=33776,Wl=33777,jl=33778,Xl=33779,Ad=35840,Cd=35841,Rd=35842,Pd=35843,Ld=36196,Dd=37492,Nd=37496,Id=37488,Ud=37489,yc=37490,kd=37491,Fd=37808,Od=37809,Bd=37810,zd=37811,Vd=37812,Hd=37813,Gd=37814,Wd=37815,jd=37816,Xd=37817,qd=37818,$d=37819,Yd=37820,Kd=37821,Zd=36492,Qd=36494,Jd=36495,ef=36283,tf=36284,Sc=36285,nf=36286,DM=3200,rf=0,NM=1,ar="",jn="srgb",so="srgb-linear",Mc="linear",pt="srgb",ss=7680,ag=519,IM=512,UM=513,kM=514,pp=515,FM=516,OM=517,mp=518,BM=519,lg=35044,cg="300 es",yi=2e3,ga=2001;function zM(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function _a(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function VM(){const t=_a("canvas");return t.style.display="block",t}const ug={};function hg(...t){const e="THREE."+t.shift();console.log(e,...t)}function Sx(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function We(...t){t=Sx(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function lt(...t){t=Sx(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function sf(...t){const e=t.join(" ");e in ug||(ug[e]=!0,We(...t))}function HM(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const GM={[vd]:xd,[yd]:wd,[Sd]:Ed,[io]:Md,[xd]:vd,[wd]:yd,[Ed]:Sd,[Md]:io};class Cr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let dg=1234567;const Ws=Math.PI/180,va=180/Math.PI;function po(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[t&255]+an[t>>8&255]+an[t>>16&255]+an[t>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[n&63|128]+an[n>>8&255]+"-"+an[n>>16&255]+an[n>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function nt(t,e,n){return Math.max(e,Math.min(n,t))}function gp(t,e){return(t%e+e)%e}function WM(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function jM(t,e,n){return t!==e?(n-t)/(e-t):0}function Yo(t,e,n){return(1-n)*t+n*e}function XM(t,e,n,i){return Yo(t,e,1-Math.exp(-n*i))}function qM(t,e=1){return e-Math.abs(gp(t,e*2)-e)}function $M(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function YM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function KM(t,e){return t+Math.floor(Math.random()*(e-t+1))}function ZM(t,e){return t+Math.random()*(e-t)}function QM(t){return t*(.5-Math.random())}function JM(t){t!==void 0&&(dg=t);let e=dg+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ew(t){return t*Ws}function tw(t){return t*va}function nw(t){return(t&t-1)===0&&t!==0}function iw(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function rw(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function sw(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),h=o((e+i)/2),d=s((e-i)/2),u=o((e-i)/2),p=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(a*h,l*d,l*u,a*c);break;case"YZY":t.set(l*u,a*h,l*d,a*c);break;case"ZXZ":t.set(l*d,l*u,a*h,a*c);break;case"XZX":t.set(a*h,l*_,l*p,a*c);break;case"YXY":t.set(l*p,a*h,l*_,a*c);break;case"ZYZ":t.set(l*_,l*p,a*h,a*c);break;default:We("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ss(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function pn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Mx={DEG2RAD:Ws,RAD2DEG:va,generateUUID:po,clamp:nt,euclideanModulo:gp,mapLinear:WM,inverseLerp:jM,lerp:Yo,damp:XM,pingpong:qM,smoothstep:$M,smootherstep:YM,randInt:KM,randFloat:ZM,randFloatSpread:QM,seededRandom:JM,degToRad:ew,radToDeg:tw,isPowerOfTwo:nw,ceilPowerOfTwo:iw,floorPowerOfTwo:rw,setQuaternionFromProperEuler:sw,normalize:pn,denormalize:Ss},Tp=class Tp{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=nt(this.x,e.x,n.x),this.y=nt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=nt(this.x,e,n),this.y=nt(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Tp.prototype.isVector2=!0;let ze=Tp;class wr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],d=i[r+3],u=s[o+0],p=s[o+1],_=s[o+2],x=s[o+3];if(d!==x||l!==u||c!==p||h!==_){let g=l*u+c*p+h*_+d*x;g<0&&(u=-u,p=-p,_=-_,x=-x,g=-g);let f=1-a;if(g<.9995){const m=Math.acos(g),v=Math.sin(m);f=Math.sin(f*m)/v,a=Math.sin(a*m)/v,l=l*f+u*a,c=c*f+p*a,h=h*f+_*a,d=d*f+x*a}else{l=l*f+u*a,c=c*f+p*a,h=h*f+_*a,d=d*f+x*a;const m=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=m,c*=m,h*=m,d*=m}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],d=s[o],u=s[o+1],p=s[o+2],_=s[o+3];return e[n]=a*_+h*d+l*p-c*u,e[n+1]=l*_+h*u+c*d-a*p,e[n+2]=c*_+h*p+a*u-l*d,e[n+3]=h*_-a*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),d=a(s/2),u=l(i/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=u*h*d+c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d-u*p*_;break;case"YXZ":this._x=u*h*d+c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d+u*p*_;break;case"ZXY":this._x=u*h*d-c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d-u*p*_;break;case"ZYX":this._x=u*h*d-c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d+u*p*_;break;case"YZX":this._x=u*h*d+c*p*_,this._y=c*p*d+u*h*_,this._z=c*h*_-u*p*d,this._w=c*h*d-u*p*_;break;case"XZY":this._x=u*h*d-c*p*_,this._y=c*p*d-u*h*_,this._z=c*h*_+u*p*d,this._w=c*h*d+u*p*_;break;default:We("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],h=n[6],d=n[10],u=i+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-n;if(a<.9995){const c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Ap=class Ap{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(fg.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(fg.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*h,this.y=i+l*h+a*c-s*d,this.z=r+l*d+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=nt(this.x,e.x,n.x),this.y=nt(this.y,e.y,n.y),this.z=nt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=nt(this.x,e,n),this.y=nt(this.y,e,n),this.z=nt(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Iu.copy(this).projectOnVector(e),this.sub(Iu)}reflect(e){return this.sub(Iu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ap.prototype.isVector3=!0;let O=Ap;const Iu=new O,fg=new wr,Cp=class Cp{constructor(e,n,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],p=i[5],_=i[8],x=r[0],g=r[3],f=r[6],m=r[1],v=r[4],S=r[7],T=r[2],w=r[5],R=r[8];return s[0]=o*x+a*m+l*T,s[3]=o*g+a*v+l*w,s[6]=o*f+a*S+l*R,s[1]=c*x+h*m+d*T,s[4]=c*g+h*v+d*w,s[7]=c*f+h*S+d*R,s[2]=u*x+p*m+_*T,s[5]=u*g+p*v+_*w,s[8]=u*f+p*S+_*R,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return n*o*h-n*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*s,p=c*s-o*l,_=n*d+i*u+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=d*x,e[1]=(r*c-h*i)*x,e[2]=(a*i-r*o)*x,e[3]=u*x,e[4]=(h*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=p*x,e[7]=(i*l-c*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Uu.makeScale(e,n)),this}rotate(e){return this.premultiply(Uu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Uu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Cp.prototype.isMatrix3=!0;let $e=Cp;const Uu=new $e,pg=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mg=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ow(){const t={enabled:!0,workingColorSpace:so,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===pt&&(r.r=Bi(r.r),r.g=Bi(r.g),r.b=Bi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pt&&(r.r=js(r.r),r.g=js(r.g),r.b=js(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ar?Mc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return sf("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return sf("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[so]:{primaries:e,whitePoint:i,transfer:Mc,toXYZ:pg,fromXYZ:mg,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:jn},outputColorSpaceConfig:{drawingBufferColorSpace:jn}},[jn]:{primaries:e,whitePoint:i,transfer:pt,toXYZ:pg,fromXYZ:mg,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:jn}}}),t}const rt=ow();function Bi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function js(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let os;class aw{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{os===void 0&&(os=_a("canvas")),os.width=e.width,os.height=e.height;const r=os.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=os}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=_a("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Bi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Bi(n[i]/255)*255):n[i]=Bi(n[i]);return{data:n,width:e.width,height:e.height}}else return We("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lw=0;class _p{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lw++}),this.uuid=po(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ku(r[o].image)):s.push(ku(r[o]))}else s=ku(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function ku(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?aw.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(We("Texture: Unable to serialize Texture."),{})}let cw=0;const Fu=new O;class Zt extends Cr{constructor(e=Zt.DEFAULT_IMAGE,n=Zt.DEFAULT_MAPPING,i=Fi,r=Fi,s=Yt,o=ur,a=oi,l=Un,c=Zt.DEFAULT_ANISOTROPY,h=ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cw++}),this.uuid=po(),this.name="",this.source=new _p(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fu).x}get height(){return this.source.getSize(Fu).y}get depth(){return this.source.getSize(Fu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){We(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){We(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bd:e.x=e.x-Math.floor(e.x);break;case Fi:e.x=e.x<0?0:1;break;case Td:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bd:e.y=e.y-Math.floor(e.y);break;case Fi:e.y=e.y<0?0:1;break;case Td:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=fx;Zt.DEFAULT_ANISOTROPY=1;const Rp=class Rp{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],_=l[9],x=l[2],g=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(_-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(_+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,S=(p+1)/2,T=(f+1)/2,w=(h+u)/4,R=(d+x)/4,y=(_+g)/4;return v>S&&v>T?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=w/i,s=R/i):S>T?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=w/r,s=y/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=R/s,r=y/s),this.set(i,r,s,n),this}let m=Math.sqrt((g-_)*(g-_)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(m)<.001&&(m=1),this.x=(g-_)/m,this.y=(d-x)/m,this.z=(u-h)/m,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=nt(this.x,e.x,n.x),this.y=nt(this.y,e.y,n.y),this.z=nt(this.z,e.z,n.z),this.w=nt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=nt(this.x,e,n),this.y=nt(this.y,e,n),this.z=nt(this.z,e,n),this.w=nt(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Rp.prototype.isVector4=!0;let Nt=Rp;class uw extends Cr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Nt(0,0,e,n),this.scissorTest=!1,this.viewport=new Nt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new Zt(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new _p(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rn extends uw{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class wx extends Zt{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class hw extends Zt{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cc=class Cc{constructor(e,n,i,r,s,o,a,l,c,h,d,u,p,_,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,h,d,u,p,_,x,g)}set(e,n,i,r,s,o,a,l,c,h,d,u,p,_,x,g){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=_,f[11]=x,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Cc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,r=1/as.setFromMatrixColumn(e,0).length(),s=1/as.setFromMatrixColumn(e,1).length(),o=1/as.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=o*h,p=o*d,_=a*h,x=a*d;n[0]=l*h,n[4]=-l*d,n[8]=c,n[1]=p+_*c,n[5]=u-x*c,n[9]=-a*l,n[2]=x-u*c,n[6]=_+p*c,n[10]=o*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,_=c*h,x=c*d;n[0]=u+x*a,n[4]=_*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*h,n[9]=-a,n[2]=p*a-_,n[6]=x+u*a,n[10]=o*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,_=c*h,x=c*d;n[0]=u-x*a,n[4]=-o*d,n[8]=_+p*a,n[1]=p+_*a,n[5]=o*h,n[9]=x-u*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const u=o*h,p=o*d,_=a*h,x=a*d;n[0]=l*h,n[4]=_*c-p,n[8]=u*c+x,n[1]=l*d,n[5]=x*c+u,n[9]=p*c-_,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,_=a*l,x=a*c;n[0]=l*h,n[4]=x-u*d,n[8]=_*d+p,n[1]=d,n[5]=o*h,n[9]=-a*h,n[2]=-c*h,n[6]=p*d+_,n[10]=u-x*d}else if(e.order==="XZY"){const u=o*l,p=o*c,_=a*l,x=a*c;n[0]=l*h,n[4]=-d,n[8]=c*h,n[1]=u*d+x,n[5]=o*h,n[9]=p*d-_,n[2]=_*d-p,n[6]=a*h,n[10]=x*d+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dw,e,fw)}lookAt(e,n,i){const r=this.elements;return Ln.subVectors(e,n),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Ki.crossVectors(i,Ln),Ki.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Ki.crossVectors(i,Ln)),Ki.normalize(),Qa.crossVectors(Ln,Ki),r[0]=Ki.x,r[4]=Qa.x,r[8]=Ln.x,r[1]=Ki.y,r[5]=Qa.y,r[9]=Ln.y,r[2]=Ki.z,r[6]=Qa.z,r[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],p=i[13],_=i[2],x=i[6],g=i[10],f=i[14],m=i[3],v=i[7],S=i[11],T=i[15],w=r[0],R=r[4],y=r[8],C=r[12],U=r[1],L=r[5],G=r[9],z=r[13],j=r[2],k=r[6],V=r[10],P=r[14],I=r[3],E=r[7],D=r[11],J=r[15];return s[0]=o*w+a*U+l*j+c*I,s[4]=o*R+a*L+l*k+c*E,s[8]=o*y+a*G+l*V+c*D,s[12]=o*C+a*z+l*P+c*J,s[1]=h*w+d*U+u*j+p*I,s[5]=h*R+d*L+u*k+p*E,s[9]=h*y+d*G+u*V+p*D,s[13]=h*C+d*z+u*P+p*J,s[2]=_*w+x*U+g*j+f*I,s[6]=_*R+x*L+g*k+f*E,s[10]=_*y+x*G+g*V+f*D,s[14]=_*C+x*z+g*P+f*J,s[3]=m*w+v*U+S*j+T*I,s[7]=m*R+v*L+S*k+T*E,s[11]=m*y+v*G+S*V+T*D,s[15]=m*C+v*z+S*P+T*J,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],_=e[3],x=e[7],g=e[11],f=e[15],m=l*p-c*u,v=a*p-c*d,S=a*u-l*d,T=o*p-c*h,w=o*u-l*h,R=o*d-a*h;return n*(x*m-g*v+f*S)-i*(_*m-g*T+f*w)+r*(_*v-x*T+f*R)-s*(_*S-x*w+g*R)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],_=e[12],x=e[13],g=e[14],f=e[15],m=n*a-i*o,v=n*l-r*o,S=n*c-s*o,T=i*l-r*a,w=i*c-s*a,R=r*c-s*l,y=h*x-d*_,C=h*g-u*_,U=h*f-p*_,L=d*g-u*x,G=d*f-p*x,z=u*f-p*g,j=m*z-v*G+S*L+T*U-w*C+R*y;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/j;return e[0]=(a*z-l*G+c*L)*k,e[1]=(r*G-i*z-s*L)*k,e[2]=(x*R-g*w+f*T)*k,e[3]=(u*w-d*R-p*T)*k,e[4]=(l*U-o*z-c*C)*k,e[5]=(n*z-r*U+s*C)*k,e[6]=(g*S-_*R-f*v)*k,e[7]=(h*R-u*S+p*v)*k,e[8]=(o*G-a*U+c*y)*k,e[9]=(i*U-n*G-s*y)*k,e[10]=(_*w-x*S+f*m)*k,e[11]=(d*S-h*w-p*m)*k,e[12]=(a*C-o*L-l*y)*k,e[13]=(n*L-i*C+r*y)*k,e[14]=(x*v-_*T-g*m)*k,e[15]=(h*T-d*v+u*m)*k,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,h=o+o,d=a+a,u=s*c,p=s*h,_=s*d,x=o*h,g=o*d,f=a*d,m=l*c,v=l*h,S=l*d,T=i.x,w=i.y,R=i.z;return r[0]=(1-(x+f))*T,r[1]=(p+S)*T,r[2]=(_-v)*T,r[3]=0,r[4]=(p-S)*w,r[5]=(1-(u+f))*w,r[6]=(g+m)*w,r[7]=0,r[8]=(_+v)*R,r[9]=(g-m)*R,r[10]=(1-(u+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let o=as.set(r[0],r[1],r[2]).length();const a=as.set(r[4],r[5],r[6]).length(),l=as.set(r[8],r[9],r[10]).length();s<0&&(o=-o),ei.copy(this);const c=1/o,h=1/a,d=1/l;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=d,ei.elements[9]*=d,ei.elements[10]*=d,n.setFromRotationMatrix(ei),i.x=o,i.y=a,i.z=l,this}makePerspective(e,n,i,r,s,o,a=yi,l=!1){const c=this.elements,h=2*s/(n-e),d=2*s/(i-r),u=(n+e)/(n-e),p=(i+r)/(i-r);let _,x;if(l)_=s/(o-s),x=o*s/(o-s);else if(a===yi)_=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===ga)_=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=yi,l=!1){const c=this.elements,h=2/(n-e),d=2/(i-r),u=-(n+e)/(n-e),p=-(i+r)/(i-r);let _,x;if(l)_=1/(o-s),x=o/(o-s);else if(a===yi)_=-2/(o-s),x=-(o+s)/(o-s);else if(a===ga)_=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};Cc.prototype.isMatrix4=!0;let Be=Cc;const as=new O,ei=new Be,dw=new O(0,0,0),fw=new O(1,1,1),Ki=new O,Qa=new O,Ln=new O,gg=new Be,_g=new wr;class Er{constructor(e=0,n=0,i=0,r=Er.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:We("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return gg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gg,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return _g.setFromEuler(this),this.setFromQuaternion(_g,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Er.DEFAULT_ORDER="XYZ";class vp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let pw=0;const vg=new O,ls=new wr,Ai=new Be,Ja=new O,Ao=new O,mw=new O,gw=new wr,xg=new O(1,0,0),yg=new O(0,1,0),Sg=new O(0,0,1),Mg={type:"added"},_w={type:"removed"},cs={type:"childadded",child:null},Ou={type:"childremoved",child:null};class Qt extends Cr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pw++}),this.uuid=po(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qt.DEFAULT_UP.clone();const e=new O,n=new Er,i=new wr,r=new O(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Be},normalMatrix:{value:new $e}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=Qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ls.setFromAxisAngle(e,n),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,n){return ls.setFromAxisAngle(e,n),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(xg,e)}rotateY(e){return this.rotateOnAxis(yg,e)}rotateZ(e){return this.rotateOnAxis(Sg,e)}translateOnAxis(e,n){return vg.copy(e).applyQuaternion(this.quaternion),this.position.add(vg.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(xg,e)}translateY(e){return this.translateOnAxis(yg,e)}translateZ(e){return this.translateOnAxis(Sg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ja.copy(e):Ja.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ao.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(Ao,Ja,this.up):Ai.lookAt(Ja,Ao,this.up),this.quaternion.setFromRotationMatrix(Ai),r&&(Ai.extractRotation(r.matrixWorld),ls.setFromRotationMatrix(Ai),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Mg),cs.child=e,this.dispatchEvent(cs),cs.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(_w),Ou.child=e,this.dispatchEvent(Ou),Ou.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Mg),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,e,mw),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,gw,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Qt.DEFAULT_UP=new O(0,1,0);Qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Hr extends Qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vw={type:"move"};class Bu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const g=n.getJointPose(x,i),f=this._getHandJoint(c,x);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&u>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vw)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Hr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Ex={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},el={h:0,s:0,l:0};function zu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=jn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=rt.workingColorSpace){return this.r=e,this.g=n,this.b=i,rt.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=rt.workingColorSpace){if(e=gp(e,1),n=nt(n,0,1),i=nt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=zu(o,s,e+1/3),this.g=zu(o,s,e),this.b=zu(o,s,e-1/3)}return rt.colorSpaceToWorking(this,r),this}setStyle(e,n=jn){function i(s){s!==void 0&&parseFloat(s)<1&&We("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:We("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);We("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=jn){const i=Ex[e.toLowerCase()];return i!==void 0?this.setHex(i,n):We("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jn){return rt.workingToColorSpace(ln.copy(this),e),Math.round(nt(ln.r*255,0,255))*65536+Math.round(nt(ln.g*255,0,255))*256+Math.round(nt(ln.b*255,0,255))}getHexString(e=jn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=rt.workingColorSpace){rt.workingToColorSpace(ln.copy(this),n);const i=ln.r,r=ln.g,s=ln.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=rt.workingColorSpace){return rt.workingToColorSpace(ln.copy(this),n),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=jn){rt.workingToColorSpace(ln.copy(this),e);const n=ln.r,i=ln.g,r=ln.b;return e!==jn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+n,Zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Zi),e.getHSL(el);const i=Yo(Zi.h,el.h,n),r=Yo(Zi.s,el.s,n),s=Yo(Zi.l,el.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ln=new Qe;Qe.NAMES=Ex;class xw extends Qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Er,this.environmentIntensity=1,this.environmentRotation=new Er,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ti=new O,Ci=new O,Vu=new O,Ri=new O,us=new O,hs=new O,wg=new O,Hu=new O,Gu=new O,Wu=new O,ju=new Nt,Xu=new Nt,qu=new Nt;class $n{constructor(e=new O,n=new O,i=new O){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ti.subVectors(e,n),r.cross(ti);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ti.subVectors(r,n),Ci.subVectors(i,n),Vu.subVectors(e,n);const o=ti.dot(ti),a=ti.dot(Ci),l=ti.dot(Vu),c=Ci.dot(Ci),h=Ci.dot(Vu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,_=(o*h-a*l)*u;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ri.x),l.addScaledVector(o,Ri.y),l.addScaledVector(a,Ri.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return ju.setScalar(0),Xu.setScalar(0),qu.setScalar(0),ju.fromBufferAttribute(e,n),Xu.fromBufferAttribute(e,i),qu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ju,s.x),o.addScaledVector(Xu,s.y),o.addScaledVector(qu,s.z),o}static isFrontFacing(e,n,i,r){return ti.subVectors(i,n),Ci.subVectors(e,n),ti.cross(Ci).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),ti.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return $n.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return $n.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;us.subVectors(r,i),hs.subVectors(s,i),Hu.subVectors(e,i);const l=us.dot(Hu),c=hs.dot(Hu);if(l<=0&&c<=0)return n.copy(i);Gu.subVectors(e,r);const h=us.dot(Gu),d=hs.dot(Gu);if(h>=0&&d<=h)return n.copy(r);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),n.copy(i).addScaledVector(us,o);Wu.subVectors(e,s);const p=us.dot(Wu),_=hs.dot(Wu);if(_>=0&&p<=_)return n.copy(s);const x=p*c-l*_;if(x<=0&&c>=0&&_<=0)return a=c/(c-_),n.copy(i).addScaledVector(hs,a);const g=h*_-p*d;if(g<=0&&d-h>=0&&p-_>=0)return wg.subVectors(s,r),a=(d-h)/(d-h+(p-_)),n.copy(r).addScaledVector(wg,a);const f=1/(g+x+u);return o=x*f,a=u*f,n.copy(i).addScaledVector(us,o).addScaledVector(hs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ca{constructor(e=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ni.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ni.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ni.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ni):ni.fromBufferAttribute(s,o),ni.applyMatrix4(e.matrixWorld),this.expandByPoint(ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),tl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),tl.copy(i.boundingBox)),tl.applyMatrix4(e.matrixWorld),this.union(tl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ni),ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Co),nl.subVectors(this.max,Co),ds.subVectors(e.a,Co),fs.subVectors(e.b,Co),ps.subVectors(e.c,Co),Qi.subVectors(fs,ds),Ji.subVectors(ps,fs),Pr.subVectors(ds,ps);let n=[0,-Qi.z,Qi.y,0,-Ji.z,Ji.y,0,-Pr.z,Pr.y,Qi.z,0,-Qi.x,Ji.z,0,-Ji.x,Pr.z,0,-Pr.x,-Qi.y,Qi.x,0,-Ji.y,Ji.x,0,-Pr.y,Pr.x,0];return!$u(n,ds,fs,ps,nl)||(n=[1,0,0,0,1,0,0,0,1],!$u(n,ds,fs,ps,nl))?!1:(il.crossVectors(Qi,Ji),n=[il.x,il.y,il.z],$u(n,ds,fs,ps,nl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pi=[new O,new O,new O,new O,new O,new O,new O,new O],ni=new O,tl=new Ca,ds=new O,fs=new O,ps=new O,Qi=new O,Ji=new O,Pr=new O,Co=new O,nl=new O,il=new O,Lr=new O;function $u(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Lr.fromArray(t,s);const a=r.x*Math.abs(Lr.x)+r.y*Math.abs(Lr.y)+r.z*Math.abs(Lr.z),l=e.dot(Lr),c=n.dot(Lr),h=i.dot(Lr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Ot=new O,rl=new ze;let yw=0;class ci extends Cr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yw++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=lg,this.updateRanges=[],this.gpuType=xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)rl.fromBufferAttribute(this,n),rl.applyMatrix3(e),this.setXY(n,rl.x,rl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix3(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix4(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyNormalMatrix(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.transformDirection(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Ss(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=pn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Ss(n,this.array)),n}setX(e,n){return this.normalized&&(n=pn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Ss(n,this.array)),n}setY(e,n){return this.normalized&&(n=pn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Ss(n,this.array)),n}setZ(e,n){return this.normalized&&(n=pn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Ss(n,this.array)),n}setW(e,n){return this.normalized&&(n=pn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=pn(n,this.array),i=pn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=pn(n,this.array),i=pn(i,this.array),r=pn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=pn(n,this.array),i=pn(i,this.array),r=pn(r,this.array),s=pn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==lg&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class bx extends ci{constructor(e,n,i){super(new Uint8Array(e),n,i)}}class Xc extends ci{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class qc extends ci{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class ft extends ci{constructor(e,n,i){super(new Float32Array(e),n,i)}}const Sw=new Ca,Ro=new O,Yu=new O;class $c{constructor(e=new O,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Sw.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ro.subVectors(e,this.center);const n=Ro.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ro,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ro.copy(e.center).add(Yu)),this.expandByPoint(Ro.copy(e.center).sub(Yu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Mw=0;const Wn=new Be,Ku=new Qt,ms=new O,Dn=new Ca,Po=new Ca,Xt=new O;class Ht extends Cr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mw++}),this.uuid=po(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zM(e)?qc:Xc)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new $e().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wn.makeRotationFromQuaternion(e),this.applyMatrix4(Wn),this}rotateX(e){return Wn.makeRotationX(e),this.applyMatrix4(Wn),this}rotateY(e){return Wn.makeRotationY(e),this.applyMatrix4(Wn),this}rotateZ(e){return Wn.makeRotationZ(e),this.applyMatrix4(Wn),this}translate(e,n,i){return Wn.makeTranslation(e,n,i),this.applyMatrix4(Wn),this}scale(e,n,i){return Wn.makeScale(e,n,i),this.applyMatrix4(Wn),this}lookAt(e){return Ku.lookAt(e),Ku.updateMatrix(),this.applyMatrix4(Ku.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ft(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&We("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ca);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $c);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Po.setFromBufferAttribute(a),this.morphTargetsRelative?(Xt.addVectors(Dn.min,Po.min),Dn.expandByPoint(Xt),Xt.addVectors(Dn.max,Po.max),Dn.expandByPoint(Xt)):(Dn.expandByPoint(Po.min),Dn.expandByPoint(Po.max))}Dn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Xt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Xt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Xt.fromBufferAttribute(a,c),l&&(ms.fromBufferAttribute(e,c),Xt.add(ms)),r=Math.max(r,i.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ci(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let y=0;y<i.count;y++)a[y]=new O,l[y]=new O;const c=new O,h=new O,d=new O,u=new ze,p=new ze,_=new ze,x=new O,g=new O;function f(y,C,U){c.fromBufferAttribute(i,y),h.fromBufferAttribute(i,C),d.fromBufferAttribute(i,U),u.fromBufferAttribute(s,y),p.fromBufferAttribute(s,C),_.fromBufferAttribute(s,U),h.sub(c),d.sub(c),p.sub(u),_.sub(u);const L=1/(p.x*_.y-_.x*p.y);isFinite(L)&&(x.copy(h).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(L),g.copy(d).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(L),a[y].add(x),a[C].add(x),a[U].add(x),l[y].add(g),l[C].add(g),l[U].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:e.count}]);for(let y=0,C=m.length;y<C;++y){const U=m[y],L=U.start,G=U.count;for(let z=L,j=L+G;z<j;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const v=new O,S=new O,T=new O,w=new O;function R(y){T.fromBufferAttribute(r,y),w.copy(T);const C=a[y];v.copy(C),v.sub(T.multiplyScalar(T.dot(C))).normalize(),S.crossVectors(w,C);const L=S.dot(l[y])<0?-1:1;o.setXYZW(y,v.x,v.y,v.z,L)}for(let y=0,C=m.length;y<C;++y){const U=m[y],L=U.start,G=U.count;for(let z=L,j=L+G;z<j;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ci(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const r=new O,s=new O,o=new O,a=new O,l=new O,c=new O,h=new O,d=new O;if(e)for(let u=0,p=e.count;u<p;u+=3){const _=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,g),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),a.add(h),l.add(h),c.add(h),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)r.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),o.fromBufferAttribute(n,u+2),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Xt.fromBufferAttribute(e,n),Xt.normalize(),e.setXYZ(n,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,_=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let f=0;f<h;f++)u[_++]=c[p++]}return new ci(u,h,d)}if(this.index===null)return We("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ht,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let ww=0;class mo extends Cr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ww++}),this.uuid=po(),this.name="",this.type="Material",this.blending=Gs,this.side=Mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gd,this.blendDst=_d,this.blendEquation=kr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=io,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ag,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){We(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){We(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(i.blending=this.blending),this.side!==Mr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gd&&(i.blendSrc=this.blendSrc),this.blendDst!==_d&&(i.blendDst=this.blendDst),this.blendEquation!==kr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==io&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ag&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Li=new O,Zu=new O,sl=new O,er=new O,Qu=new O,ol=new O,Ju=new O;class Yc{constructor(e=new O,n=new O(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Li.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,n),Li.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Zu.copy(e).add(n).multiplyScalar(.5),sl.copy(n).sub(e).normalize(),er.copy(this.origin).sub(Zu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(sl),a=er.dot(this.direction),l=-er.dot(sl),c=er.lengthSq(),h=Math.abs(1-o*o);let d,u,p,_;if(h>0)if(d=o*l-a,u=o*a-l,_=s*h,d>=0)if(u>=-_)if(u<=_){const x=1/h;d*=x,u*=x,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-_?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c):u<=_?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Zu).addScaledVector(sl,u),p}intersectSphere(e,n){Li.subVectors(e.center,this.origin);const i=Li.dot(this.direction),r=Li.dot(Li)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,n,i,r,s){Qu.subVectors(n,e),ol.subVectors(i,e),Ju.crossVectors(Qu,ol);let o=this.direction.dot(Ju),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;er.subVectors(this.origin,e);const l=a*this.direction.dot(ol.crossVectors(er,ol));if(l<0)return null;const c=a*this.direction.dot(Qu.cross(er));if(c<0||l+c>o)return null;const h=-a*er.dot(Ju);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Sn extends mo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Er,this.combine=ap,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Eg=new Be,Dr=new Yc,al=new $c,bg=new O,ll=new O,cl=new O,ul=new O,eh=new O,hl=new O,Tg=new O,dl=new O;class en extends Qt{constructor(e=new Ht,n=new Sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){hl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(eh.fromBufferAttribute(d,e),o?hl.addScaledVector(eh,h):hl.addScaledVector(eh.sub(n),h))}n.add(hl)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),al.copy(i.boundingSphere),al.applyMatrix4(s),Dr.copy(e.ray).recast(e.near),!(al.containsPoint(Dr.origin)===!1&&(Dr.intersectSphere(al,bg)===null||Dr.origin.distanceToSquared(bg)>(e.far-e.near)**2))&&(Eg.copy(s).invert(),Dr.copy(e.ray).applyMatrix4(Eg),!(i.boundingBox!==null&&Dr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Dr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=u.length;_<x;_++){const g=u[_],f=o[g.materialIndex],m=Math.max(g.start,p.start),v=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let S=m,T=v;S<T;S+=3){const w=a.getX(S),R=a.getX(S+1),y=a.getX(S+2);r=fl(this,f,e,i,c,h,d,w,R,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=_,f=x;g<f;g+=3){const m=a.getX(g),v=a.getX(g+1),S=a.getX(g+2);r=fl(this,o,e,i,c,h,d,m,v,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,x=u.length;_<x;_++){const g=u[_],f=o[g.materialIndex],m=Math.max(g.start,p.start),v=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let S=m,T=v;S<T;S+=3){const w=S,R=S+1,y=S+2;r=fl(this,f,e,i,c,h,d,w,R,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=_,f=x;g<f;g+=3){const m=g,v=g+1,S=g+2;r=fl(this,o,e,i,c,h,d,m,v,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function Ew(t,e,n,i,r,s,o,a){let l;if(e.side===Cn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Mr,a),l===null)return null;dl.copy(a),dl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(dl);return c<n.near||c>n.far?null:{distance:c,point:dl.clone(),object:t}}function fl(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,ll),t.getVertexPosition(l,cl),t.getVertexPosition(c,ul);const h=Ew(t,e,n,i,ll,cl,ul,Tg);if(h){const d=new O;$n.getBarycoord(Tg,ll,cl,ul,d),r&&(h.uv=$n.getInterpolatedAttribute(r,a,l,c,d,new ze)),s&&(h.uv1=$n.getInterpolatedAttribute(s,a,l,c,d,new ze)),o&&(h.normal=$n.getInterpolatedAttribute(o,a,l,c,d,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new O,materialIndex:0};$n.getNormal(ll,cl,ul,u.normal),h.face=u,h.barycoord=d}return h}class bw extends Zt{constructor(e=null,n=1,i=1,r,s,o,a,l,c=Mt,h=Mt,d,u){super(null,o,a,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const th=new O,Tw=new O,Aw=new $e;class wn{constructor(e=new O(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=th.subVectors(i,n).cross(Tw.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(th),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||Aw.getNormalMatrix(e),r=this.coplanarPoint(th).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nr=new $c,Cw=new ze(.5,.5),pl=new O;class xp{constructor(e=new wn,n=new wn,i=new wn,r=new wn,s=new wn,o=new wn){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=yi,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],p=s[7],_=s[8],x=s[9],g=s[10],f=s[11],m=s[12],v=s[13],S=s[14],T=s[15];if(r[0].setComponents(c-o,p-h,f-_,T-m).normalize(),r[1].setComponents(c+o,p+h,f+_,T+m).normalize(),r[2].setComponents(c+a,p+d,f+x,T+v).normalize(),r[3].setComponents(c-a,p-d,f-x,T-v).normalize(),i)r[4].setComponents(l,u,g,S).normalize(),r[5].setComponents(c-l,p-u,f-g,T-S).normalize();else if(r[4].setComponents(c-l,p-u,f-g,T-S).normalize(),n===yi)r[5].setComponents(c+l,p+u,f+g,T+S).normalize();else if(n===ga)r[5].setComponents(l,u,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nr)}intersectsSprite(e){Nr.center.set(0,0,0);const n=Cw.distanceTo(e.center);return Nr.radius=.7071067811865476+n,Nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(pl.x=r.normal.x>0?e.max.x:e.min.x,pl.y=r.normal.y>0?e.max.y:e.min.y,pl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(pl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Tx extends mo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const wc=new O,Ec=new O,Ag=new Be,Lo=new Yc,ml=new $c,nh=new O,Cg=new O;class Rw extends Qt{constructor(e=new Ht,n=new Tx){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)wc.fromBufferAttribute(n,r-1),Ec.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=wc.distanceTo(Ec);e.setAttribute("lineDistance",new ft(i,1))}else We("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ml.copy(i.boundingSphere),ml.applyMatrix4(r),ml.radius+=s,e.ray.intersectsSphere(ml)===!1)return;Ag.copy(r).invert(),Lo.copy(e.ray).applyMatrix4(Ag);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const p=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let x=p,g=_-1;x<g;x+=c){const f=h.getX(x),m=h.getX(x+1),v=gl(this,e,Lo,l,f,m,x);v&&n.push(v)}if(this.isLineLoop){const x=h.getX(_-1),g=h.getX(p),f=gl(this,e,Lo,l,x,g,_-1);f&&n.push(f)}}else{const p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let x=p,g=_-1;x<g;x+=c){const f=gl(this,e,Lo,l,x,x+1,x);f&&n.push(f)}if(this.isLineLoop){const x=gl(this,e,Lo,l,_-1,p,_-1);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function gl(t,e,n,i,r,s,o){const a=t.geometry.attributes.position;if(wc.fromBufferAttribute(a,r),Ec.fromBufferAttribute(a,s),n.distanceSqToSegment(wc,Ec,nh,Cg)>i)return;nh.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(nh);if(!(c<e.near||c>e.far))return{distance:c,point:Cg.clone().applyMatrix4(t.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:t}}const Rg=new O,Pg=new O;class Lg extends Rw{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Rg.fromBufferAttribute(n,r),Pg.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Rg.distanceTo(Pg);e.setAttribute("lineDistance",new ft(i,1))}else We("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ax extends Zt{constructor(e=[],n=Zr,i,r,s,o,a,l,c,h){super(e,n,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ih extends Zt{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class oo extends Zt{constructor(e,n,i=bi,r,s,o,a=Mt,l=Mt,c,h=Wi,d=1){if(h!==Wi&&h!==Vr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:d};super(u,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _p(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Pw extends oo{constructor(e,n=bi,i=Zr,r,s,o=Mt,a=Mt,l,c=Wi){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,n,i,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Cx extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Jr extends Ht{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(h,3)),this.setAttribute("uv",new ft(d,2));function _(x,g,f,m,v,S,T,w,R,y,C){const U=S/R,L=T/y,G=S/2,z=T/2,j=w/2,k=R+1,V=y+1;let P=0,I=0;const E=new O;for(let D=0;D<V;D++){const J=D*L-z;for(let Y=0;Y<k;Y++){const ne=Y*U-G;E[x]=ne*m,E[g]=J*v,E[f]=j,c.push(E.x,E.y,E.z),E[x]=0,E[g]=0,E[f]=w>0?1:-1,h.push(E.x,E.y,E.z),d.push(Y/R),d.push(1-D/y),P+=1}}for(let D=0;D<y;D++)for(let J=0;J<R;J++){const Y=u+J+k*D,ne=u+J+k*(D+1),K=u+(J+1)+k*(D+1),te=u+(J+1)+k*D;l.push(Y,ne,te),l.push(ne,K,te),I+=6}a.addGroup(p,I,C),p+=I,u+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const _l=new O,vl=new O,rh=new O,xl=new $n;class Dg extends Ht{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(Ws*n),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},p=[];for(let _=0;_<l;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:x,b:g,c:f}=xl;if(x.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),xl.getNormal(rh),d[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,d[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,d[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let m=0;m<3;m++){const v=(m+1)%3,S=d[m],T=d[v],w=xl[h[m]],R=xl[h[v]],y=`${S}_${T}`,C=`${T}_${S}`;C in u&&u[C]?(rh.dot(u[C].normal)<=s&&(p.push(w.x,w.y,w.z),p.push(R.x,R.y,R.z)),u[C]=null):y in u||(u[y]={index0:c[m],index1:c[v],normal:rh.clone()})}}for(const _ in u)if(u[_]){const{index0:x,index1:g}=u[_];_l.fromBufferAttribute(a,x),vl.fromBufferAttribute(a,g),p.push(_l.x,_l.y,_l.z),p.push(vl.x,vl.y,vl.z)}this.setAttribute("position",new ft(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Ra extends Ht{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,d=e/a,u=n/l,p=[],_=[],x=[],g=[];for(let f=0;f<h;f++){const m=f*u-o;for(let v=0;v<c;v++){const S=v*d-s;_.push(S,-m,0),x.push(0,0,1),g.push(v/a),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let m=0;m<a;m++){const v=m+c*f,S=m+c*(f+1),T=m+1+c*(f+1),w=m+1+c*f;p.push(v,S,w),p.push(S,T,w)}this.setIndex(p),this.setAttribute("position",new ft(_,3)),this.setAttribute("normal",new ft(x,3)),this.setAttribute("uv",new ft(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ra(e.width,e.height,e.widthSegments,e.heightSegments)}}function ao(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Ng(r))r.isRenderTargetTexture?(We("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Ng(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function mn(t){const e={};for(let n=0;n<t.length;n++){const i=ao(t[n]);for(const r in i)e[r]=i[r]}return e}function Ng(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function Lw(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Rx(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const bc={clone:ao,merge:mn};var Dw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends mo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dw,this.fragmentShader=Nw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ao(e.uniforms),this.uniformsGroups=Lw(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Iw extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class sh extends mo{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rf,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Er,this.combine=ap,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Uw extends mo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=DM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class kw extends mo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const oh={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(Ig(t)||(this.files[t]=e))},get:function(t){if(this.enabled!==!1&&!Ig(t))return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};function Ig(t){try{const e=t.slice(t.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Fw{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const p=c[d],_=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ow=new Fw;class yp{constructor(e){this.manager=e!==void 0?e:Ow,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}yp.DEFAULT_MATERIAL_NAME="__DEFAULT";const gs=new WeakMap;class Bw extends yp{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=oh.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0);else{let d=gs.get(o);d===void 0&&(d=[],gs.set(o,d)),d.push({onLoad:n,onError:r})}return o}const a=_a("img");function l(){h(),n&&n(this);const d=gs.get(this)||[];for(let u=0;u<d.length;u++){const p=d[u];p.onLoad&&p.onLoad(this)}gs.delete(this),s.manager.itemEnd(e)}function c(d){h(),r&&r(d),oh.remove(`image:${e}`);const u=gs.get(this)||[];for(let p=0;p<u.length;p++){const _=u[p];_.onError&&_.onError(d)}gs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),oh.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class ah extends yp{constructor(e){super(e)}load(e,n,i,r){const s=new Zt,o=new Bw(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class Kc extends Qt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class zw extends Kc{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Qt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}toJSON(e){const n=super.toJSON(e);return n.object.groundColor=this.groundColor.getHex(),n}}const lh=new Be,Ug=new O,kg=new O;class Px{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=Un,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xp,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Ug.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ug),kg.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(kg),n.updateMatrixWorld(),lh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lh,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===ga||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(lh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const yl=new O,Sl=new wr,pi=new O;class Lx extends Qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(yl,Sl,pi),pi.x===1&&pi.y===1&&pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yl,Sl,pi.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(yl,Sl,pi),pi.x===1&&pi.y===1&&pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yl,Sl,pi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const tr=new O,Fg=new ze,Og=new ze;class In extends Lx{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=va*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return va*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){tr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(tr.x,tr.y).multiplyScalar(-e/tr.z),tr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(tr.x,tr.y).multiplyScalar(-e/tr.z)}getViewSize(e,n){return this.getViewBounds(e,Fg,Og),n.subVectors(Og,Fg)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Ws*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Vw extends Px{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0}}class Hw extends Kc{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Vw}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class lo extends Lx{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class Gw extends Px{constructor(){super(new lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Bg extends Kc{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qt.DEFAULT_UP),this.updateMatrix(),this.target=new Qt,this.shadow=new Gw}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class Ww extends Kc{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const _s=-90,vs=1;class jw extends Qt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new In(_s,vs,e,n);r.layers=this.layers,this.add(r);const s=new In(_s,vs,e,n);s.layers=this.layers,this.add(s);const o=new In(_s,vs,e,n);o.layers=this.layers,this.add(o);const a=new In(_s,vs,e,n);a.layers=this.layers,this.add(a);const l=new In(_s,vs,e,n);l.layers=this.layers,this.add(l);const c=new In(_s,vs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===yi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ga)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(d,u,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Xw extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class qw{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=$w.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function $w(){this._document.hidden===!1&&this.reset()}const zg=new Be;class Yw{constructor(e,n,i=0,r=1/0){this.ray=new Yc(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new vp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):lt("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return zg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zg),this}intersectObject(e,n=!0,i=[]){return of(e,this,i,n),i.sort(Vg),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)of(e[r],this,i,n);return i.sort(Vg),i}}function Vg(t,e){return t.distance-e.distance}function of(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)of(s[o],e,n,!0)}}class Hg{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(nt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Pp=class Pp{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Pp.prototype.isMatrix2=!0;let Gg=Pp;class Kw extends Cr{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){We("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Wg(t,e,n,i){const r=Zw(i);switch(n){case vx:return t*e;case yx:return t*e/r.components*r.byteLength;case hp:return t*e/r.components*r.byteLength;case Qr:return t*e*2/r.components*r.byteLength;case dp:return t*e*2/r.components*r.byteLength;case xx:return t*e*3/r.components*r.byteLength;case oi:return t*e*4/r.components*r.byteLength;case fp:return t*e*4/r.components*r.byteLength;case Gl:case Wl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case jl:case Xl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Cd:case Pd:return Math.max(t,16)*Math.max(e,8)/4;case Ad:case Rd:return Math.max(t,8)*Math.max(e,8)/2;case Ld:case Dd:case Id:case Ud:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Nd:case yc:case kd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Fd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Od:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Bd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case zd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Vd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Hd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Gd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Wd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case jd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Xd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case qd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case $d:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Yd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Kd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Zd:case Qd:case Jd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case ef:case tf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Sc:case nf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Zw(t){switch(t){case Un:case px:return{byteLength:1,components:1};case pa:case mx:case Bn:return{byteLength:2,components:1};case cp:case up:return{byteLength:2,components:4};case bi:case lp:case xi:return{byteLength:4,components:1};case gx:case _x:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:op}}));typeof window<"u"&&(window.__THREE__?We("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=op);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Dx(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Qw(t){const e=new WeakMap;function n(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const h=l.array,d=l.updateRanges;if(t.bindBuffer(c,a),d.length===0)t.bufferSubData(c,0,h);else{d.sort((p,_)=>p.start-_.start);let u=0;for(let p=1;p<d.length;p++){const _=d[u],x=d[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,_=d.length;p<_;p++){const x=d[p];t.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Jw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eE=`#ifdef USE_ALPHAHASH
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
#endif`,tE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sE=`#ifdef USE_AOMAP
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
#endif`,oE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,aE=`#ifdef USE_BATCHING
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
#endif`,lE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dE=`#ifdef USE_IRIDESCENCE
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
#endif`,fE=`#ifdef USE_BUMPMAP
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
#endif`,pE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_E=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,SE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ME=`#define PI 3.141592653589793
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
} // validated`,wE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,EE=`vec3 transformedNormal = objectNormal;
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
#endif`,bE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,TE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,AE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,CE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,RE="gl_FragColor = linearToOutputTexel( gl_FragColor );",PE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,LE=`#ifdef USE_ENVMAP
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
#endif`,DE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,NE=`#ifdef USE_ENVMAP
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
#endif`,IE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,UE=`#ifdef USE_ENVMAP
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
#endif`,kE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,FE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,OE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,BE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zE=`#ifdef USE_GRADIENTMAP
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
}`,VE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,HE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,GE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,WE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,jE=`#ifdef USE_ENVMAP
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
#endif`,XE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$E=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,YE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,KE=`PhysicalMaterial material;
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
#endif`,ZE=`uniform sampler2D dfgLUT;
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
}`,QE=`
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
#endif`,JE=`#if defined( RE_IndirectDiffuse )
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
#endif`,eb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,nb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ib=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ob=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ab=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cb=`#if defined( USE_POINTS_UV )
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
#endif`,ub=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,db=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mb=`#ifdef USE_MORPHTARGETS
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
#endif`,gb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_b=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Mb=`#ifdef USE_NORMALMAP
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
#endif`,wb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Eb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ab=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Rb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Db=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ib=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ub=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ob=`float getShadowMask() {
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
}`,Bb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zb=`#ifdef USE_SKINNING
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
#endif`,Vb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hb=`#ifdef USE_SKINNING
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
#endif`,Gb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qb=`#ifdef USE_TRANSMISSION
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
#endif`,$b=`#ifdef USE_TRANSMISSION
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
#endif`,Yb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,eT=`uniform sampler2D t2D;
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
}`,tT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,iT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sT=`#include <common>
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
}`,oT=`#if DEPTH_PACKING == 3200
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
}`,aT=`#define DISTANCE
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
}`,lT=`#define DISTANCE
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
}`,cT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hT=`uniform float scale;
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
}`,dT=`uniform vec3 diffuse;
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
}`,fT=`#include <common>
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
}`,pT=`uniform vec3 diffuse;
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
}`,mT=`#define LAMBERT
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
}`,gT=`#define LAMBERT
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
}`,_T=`#define MATCAP
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
}`,vT=`#define MATCAP
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
}`,xT=`#define NORMAL
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
}`,yT=`#define NORMAL
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
}`,ST=`#define PHONG
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
}`,MT=`#define PHONG
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
}`,wT=`#define STANDARD
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
}`,ET=`#define STANDARD
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
}`,bT=`#define TOON
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
}`,TT=`#define TOON
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
}`,AT=`uniform float size;
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
}`,CT=`uniform vec3 diffuse;
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
}`,RT=`#include <common>
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
}`,PT=`uniform vec3 color;
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
}`,LT=`uniform float rotation;
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
}`,DT=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:Jw,alphahash_pars_fragment:eE,alphamap_fragment:tE,alphamap_pars_fragment:nE,alphatest_fragment:iE,alphatest_pars_fragment:rE,aomap_fragment:sE,aomap_pars_fragment:oE,batching_pars_vertex:aE,batching_vertex:lE,begin_vertex:cE,beginnormal_vertex:uE,bsdfs:hE,iridescence_fragment:dE,bumpmap_pars_fragment:fE,clipping_planes_fragment:pE,clipping_planes_pars_fragment:mE,clipping_planes_pars_vertex:gE,clipping_planes_vertex:_E,color_fragment:vE,color_pars_fragment:xE,color_pars_vertex:yE,color_vertex:SE,common:ME,cube_uv_reflection_fragment:wE,defaultnormal_vertex:EE,displacementmap_pars_vertex:bE,displacementmap_vertex:TE,emissivemap_fragment:AE,emissivemap_pars_fragment:CE,colorspace_fragment:RE,colorspace_pars_fragment:PE,envmap_fragment:LE,envmap_common_pars_fragment:DE,envmap_pars_fragment:NE,envmap_pars_vertex:IE,envmap_physical_pars_fragment:jE,envmap_vertex:UE,fog_vertex:kE,fog_pars_vertex:FE,fog_fragment:OE,fog_pars_fragment:BE,gradientmap_pars_fragment:zE,lightmap_pars_fragment:VE,lights_lambert_fragment:HE,lights_lambert_pars_fragment:GE,lights_pars_begin:WE,lights_toon_fragment:XE,lights_toon_pars_fragment:qE,lights_phong_fragment:$E,lights_phong_pars_fragment:YE,lights_physical_fragment:KE,lights_physical_pars_fragment:ZE,lights_fragment_begin:QE,lights_fragment_maps:JE,lights_fragment_end:eb,lightprobes_pars_fragment:tb,logdepthbuf_fragment:nb,logdepthbuf_pars_fragment:ib,logdepthbuf_pars_vertex:rb,logdepthbuf_vertex:sb,map_fragment:ob,map_pars_fragment:ab,map_particle_fragment:lb,map_particle_pars_fragment:cb,metalnessmap_fragment:ub,metalnessmap_pars_fragment:hb,morphinstance_vertex:db,morphcolor_vertex:fb,morphnormal_vertex:pb,morphtarget_pars_vertex:mb,morphtarget_vertex:gb,normal_fragment_begin:_b,normal_fragment_maps:vb,normal_pars_fragment:xb,normal_pars_vertex:yb,normal_vertex:Sb,normalmap_pars_fragment:Mb,clearcoat_normal_fragment_begin:wb,clearcoat_normal_fragment_maps:Eb,clearcoat_pars_fragment:bb,iridescence_pars_fragment:Tb,opaque_fragment:Ab,packing:Cb,premultiplied_alpha_fragment:Rb,project_vertex:Pb,dithering_fragment:Lb,dithering_pars_fragment:Db,roughnessmap_fragment:Nb,roughnessmap_pars_fragment:Ib,shadowmap_pars_fragment:Ub,shadowmap_pars_vertex:kb,shadowmap_vertex:Fb,shadowmask_pars_fragment:Ob,skinbase_vertex:Bb,skinning_pars_vertex:zb,skinning_vertex:Vb,skinnormal_vertex:Hb,specularmap_fragment:Gb,specularmap_pars_fragment:Wb,tonemapping_fragment:jb,tonemapping_pars_fragment:Xb,transmission_fragment:qb,transmission_pars_fragment:$b,uv_pars_fragment:Yb,uv_pars_vertex:Kb,uv_vertex:Zb,worldpos_vertex:Qb,background_vert:Jb,background_frag:eT,backgroundCube_vert:tT,backgroundCube_frag:nT,cube_vert:iT,cube_frag:rT,depth_vert:sT,depth_frag:oT,distance_vert:aT,distance_frag:lT,equirect_vert:cT,equirect_frag:uT,linedashed_vert:hT,linedashed_frag:dT,meshbasic_vert:fT,meshbasic_frag:pT,meshlambert_vert:mT,meshlambert_frag:gT,meshmatcap_vert:_T,meshmatcap_frag:vT,meshnormal_vert:xT,meshnormal_frag:yT,meshphong_vert:ST,meshphong_frag:MT,meshphysical_vert:wT,meshphysical_frag:ET,meshtoon_vert:bT,meshtoon_frag:TT,points_vert:AT,points_frag:CT,shadow_vert:RT,shadow_frag:PT,sprite_vert:LT,sprite_frag:DT},Me={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},_i={basic:{uniforms:mn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:mn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:mn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:mn([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:mn([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Qe(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:mn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:mn([Me.points,Me.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:mn([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:mn([Me.common,Me.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:mn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:mn([Me.sprite,Me.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:mn([Me.common,Me.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:mn([Me.lights,Me.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};_i.physical={uniforms:mn([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Ml={r:0,b:0,g:0},NT=new Be,Nx=new $e;Nx.set(-1,0,0,0,1,0,0,0,1);function IT(t,e,n,i,r,s){const o=new Qe(0);let a=r===!0?0:1,l,c,h=null,d=0,u=null;function p(m){let v=m.isScene===!0?m.background:null;if(v&&v.isTexture){const S=m.backgroundBlurriness>0;v=e.get(v,S)}return v}function _(m){let v=!1;const S=p(m);S===null?g(o,a):S&&S.isColor&&(g(S,1),v=!0);const T=t.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function x(m,v){const S=p(v);S&&(S.isCubeTexture||S.mapping===jc)?(c===void 0&&(c=new en(new Jr(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:ao(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(NT.makeRotationFromEuler(v.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Nx),c.material.toneMapped=rt.getTransfer(S.colorSpace)!==pt,(h!==S||d!==S.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,h=S,d=S.version,u=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new en(new Ra(2,2),new dn({name:"BackgroundMaterial",uniforms:ao(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:Mr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=rt.getTransfer(S.colorSpace)!==pt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,u=t.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,v){m.getRGB(Ml,Rx(t)),n.buffers.color.setClear(Ml.r,Ml.g,Ml.b,v,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(m,v=1){o.set(m),a=v,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(m){a=m,g(o,a)},render:_,addToRenderList:x,dispose:f}}function UT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,o=!1;function a(L,G,z,j,k){let V=!1;const P=d(L,j,z,G);s!==P&&(s=P,c(s.object)),V=p(L,j,z,k),V&&_(L,j,z,k),k!==null&&e.update(k,t.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,S(L,G,z,j),k!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return t.createVertexArray()}function c(L){return t.bindVertexArray(L)}function h(L){return t.deleteVertexArray(L)}function d(L,G,z,j){const k=j.wireframe===!0;let V=i[G.id];V===void 0&&(V={},i[G.id]=V);const P=L.isInstancedMesh===!0?L.id:0;let I=V[P];I===void 0&&(I={},V[P]=I);let E=I[z.id];E===void 0&&(E={},I[z.id]=E);let D=E[k];return D===void 0&&(D=u(l()),E[k]=D),D}function u(L){const G=[],z=[],j=[];for(let k=0;k<n;k++)G[k]=0,z[k]=0,j[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:z,attributeDivisors:j,object:L,attributes:{},index:null}}function p(L,G,z,j){const k=s.attributes,V=G.attributes;let P=0;const I=z.getAttributes();for(const E in I)if(I[E].location>=0){const J=k[E];let Y=V[E];if(Y===void 0&&(E==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),E==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor)),J===void 0||J.attribute!==Y||Y&&J.data!==Y.data)return!0;P++}return s.attributesNum!==P||s.index!==j}function _(L,G,z,j){const k={},V=G.attributes;let P=0;const I=z.getAttributes();for(const E in I)if(I[E].location>=0){let J=V[E];J===void 0&&(E==="instanceMatrix"&&L.instanceMatrix&&(J=L.instanceMatrix),E==="instanceColor"&&L.instanceColor&&(J=L.instanceColor));const Y={};Y.attribute=J,J&&J.data&&(Y.data=J.data),k[E]=Y,P++}s.attributes=k,s.attributesNum=P,s.index=j}function x(){const L=s.newAttributes;for(let G=0,z=L.length;G<z;G++)L[G]=0}function g(L){f(L,0)}function f(L,G){const z=s.newAttributes,j=s.enabledAttributes,k=s.attributeDivisors;z[L]=1,j[L]===0&&(t.enableVertexAttribArray(L),j[L]=1),k[L]!==G&&(t.vertexAttribDivisor(L,G),k[L]=G)}function m(){const L=s.newAttributes,G=s.enabledAttributes;for(let z=0,j=G.length;z<j;z++)G[z]!==L[z]&&(t.disableVertexAttribArray(z),G[z]=0)}function v(L,G,z,j,k,V,P){P===!0?t.vertexAttribIPointer(L,G,z,k,V):t.vertexAttribPointer(L,G,z,j,k,V)}function S(L,G,z,j){x();const k=j.attributes,V=z.getAttributes(),P=G.defaultAttributeValues;for(const I in V){const E=V[I];if(E.location>=0){let D=k[I];if(D===void 0&&(I==="instanceMatrix"&&L.instanceMatrix&&(D=L.instanceMatrix),I==="instanceColor"&&L.instanceColor&&(D=L.instanceColor)),D!==void 0){const J=D.normalized,Y=D.itemSize,ne=e.get(D);if(ne===void 0)continue;const K=ne.buffer,te=ne.type,B=ne.bytesPerElement,q=te===t.INT||te===t.UNSIGNED_INT||D.gpuType===lp;if(D.isInterleavedBufferAttribute){const $=D.data,le=$.stride,fe=D.offset;if($.isInstancedInterleavedBuffer){for(let de=0;de<E.locationSize;de++)f(E.location+de,$.meshPerAttribute);L.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let de=0;de<E.locationSize;de++)g(E.location+de);t.bindBuffer(t.ARRAY_BUFFER,K);for(let de=0;de<E.locationSize;de++)v(E.location+de,Y/E.locationSize,te,J,le*B,(fe+Y/E.locationSize*de)*B,q)}else{if(D.isInstancedBufferAttribute){for(let $=0;$<E.locationSize;$++)f(E.location+$,D.meshPerAttribute);L.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let $=0;$<E.locationSize;$++)g(E.location+$);t.bindBuffer(t.ARRAY_BUFFER,K);for(let $=0;$<E.locationSize;$++)v(E.location+$,Y/E.locationSize,te,J,Y*B,Y/E.locationSize*$*B,q)}}else if(P!==void 0){const J=P[I];if(J!==void 0)switch(J.length){case 2:t.vertexAttrib2fv(E.location,J);break;case 3:t.vertexAttrib3fv(E.location,J);break;case 4:t.vertexAttrib4fv(E.location,J);break;default:t.vertexAttrib1fv(E.location,J)}}}}m()}function T(){C();for(const L in i){const G=i[L];for(const z in G){const j=G[z];for(const k in j){const V=j[k];for(const P in V)h(V[P].object),delete V[P];delete j[k]}}delete i[L]}}function w(L){if(i[L.id]===void 0)return;const G=i[L.id];for(const z in G){const j=G[z];for(const k in j){const V=j[k];for(const P in V)h(V[P].object),delete V[P];delete j[k]}}delete i[L.id]}function R(L){for(const G in i){const z=i[G];for(const j in z){const k=z[j];if(k[L.id]===void 0)continue;const V=k[L.id];for(const P in V)h(V[P].object),delete V[P];delete k[L.id]}}}function y(L){for(const G in i){const z=i[G],j=L.isInstancedMesh===!0?L.id:0,k=z[j];if(k!==void 0){for(const V in k){const P=k[V];for(const I in P)h(P[I].object),delete P[I];delete k[V]}delete z[j],Object.keys(z).length===0&&delete i[G]}}}function C(){U(),o=!0,s!==r&&(s=r,c(s.object))}function U(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:U,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:g,disableUnusedAttributes:m}}function kT(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function o(l,c,h){h!==0&&(t.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];n.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function FT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==oi&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const y=R===Bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Un&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==xi&&!y)}function l(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(We("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&We("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),f=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:m,maxVaryings:v,maxFragmentUniforms:S,maxSamples:T,samples:w}}function OT(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new wn,a=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||r;return r=u,i=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){n=h(d,u,0)},this.setState=function(d,u,p){const _=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,f=t.get(d);if(!r||_===null||_.length===0||s&&!g)s?h(null):c();else{const m=s?0:i,v=m*4;let S=f.clippingState||null;l.value=S,S=h(_,u,v,p);for(let T=0;T!==v;++T)S[T]=n[T];f.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,_){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=l.value,_!==!0||g===null){const f=p+x*4,m=u.matrixWorldInverse;a.getNormalMatrix(m),(g===null||g.length<f)&&(g=new Float32Array(f));for(let v=0,S=p;v!==x;++v,S+=4)o.copy(d[v]).applyMatrix4(m,a),o.normal.toArray(g,S),g[S+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const hr=4,jg=[.125,.215,.35,.446,.526,.582],Fr=20,BT=256,Do=new lo,Xg=new Qe;let ch=null,uh=0,hh=0,dh=!1;const zT=new O;class qg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=zT}=s;ch=this._renderer.getRenderTarget(),uh=this._renderer.getActiveCubeFace(),hh=this._renderer.getActiveMipmapLevel(),dh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ch,uh,hh),this._renderer.xr.enabled=dh,e.scissorTest=!1,xs(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Zr||e.mapping===ro?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ch=this._renderer.getRenderTarget(),uh=this._renderer.getActiveCubeFace(),hh=this._renderer.getActiveMipmapLevel(),dh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:Bn,format:oi,colorSpace:so,depthBuffer:!1},r=$g(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$g(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=VT(s)),this._blurMaterial=GT(s,e,n),this._ggxMaterial=HT(s,e,n)}return r}_compileMaterial(e){const n=new en(new Ht,e);this._renderer.compile(n,Do)}_sceneToCubeUV(e,n,i,r,s){const l=new In(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Xg),d.toneMapping=Ei,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new en(new Jr,new Sn({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let f=!1;const m=e.background;m?m.isColor&&(g.color.copy(m),e.background=null,f=!0):(g.color.copy(Xg),f=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[v],s.y,s.z)):S===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[v]));const T=this._cubeSize;xs(r,S*T,v>2?T:0,T,T),d.setRenderTarget(r),f&&d.render(x,l),d.render(e,l)}d.toneMapping=p,d.autoClear=u,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Zr||e.mapping===ro;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;xs(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Do)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,p=d*u,{_lodMax:_}=this,x=this._sizeLods[i],g=3*x*(i>_-hr?i-_+hr:0),f=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-n,xs(s,g,f,3*x,2*x),r.setRenderTarget(s),r.render(a,Do),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,xs(e,g,f,3*x,2*x),r.setRenderTarget(e),r.render(a,Do)}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&lt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[r];d.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Fr-1),x=s/_,g=isFinite(s)?1+Math.floor(h*x):Fr;g>Fr&&We(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fr}`);const f=[];let m=0;for(let R=0;R<Fr;++R){const y=R/x,C=Math.exp(-y*y/2);f.push(C),R===0?m+=C:R<g&&(m+=2*C)}for(let R=0;R<f.length;R++)f[R]=f[R]/m;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:v}=this;u.dTheta.value=_,u.mipInt.value=v-i;const S=this._sizeLods[r],T=3*S*(r>v-hr?r-v+hr:0),w=4*(this._cubeSize-S);xs(n,T,w,3*S,2*S),l.setRenderTarget(n),l.render(d,Do)}}function VT(t){const e=[],n=[],i=[];let r=t;const s=t-hr+1+jg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>t-hr?l=jg[o-t+hr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,_=6,x=3,g=2,f=1,m=new Float32Array(x*_*p),v=new Float32Array(g*_*p),S=new Float32Array(f*_*p);for(let w=0;w<p;w++){const R=w%3*2/3-1,y=w>2?0:-1,C=[R,y,0,R+2/3,y,0,R+2/3,y+1,0,R,y,0,R+2/3,y+1,0,R,y+1,0];m.set(C,x*_*w),v.set(u,g*_*w);const U=[w,w,w,w,w,w];S.set(U,f*_*w)}const T=new Ht;T.setAttribute("position",new ci(m,x)),T.setAttribute("uv",new ci(v,g)),T.setAttribute("faceIndex",new ci(S,f)),i.push(new en(T,null)),r>hr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function $g(t,e,n){const i=new Rn(t,e,n);return i.texture.mapping=jc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xs(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function HT(t,e,n){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:BT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Zc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function GT(t,e,n){const i=new Float32Array(Fr),r=new O(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Fr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Yg(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Kg(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Zc(){return`

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
	`}class Ix extends Rn{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ax(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Jr(5,5,5),s=new dn({name:"CubemapFromEquirect",uniforms:ao(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Cn,blending:wi});s.uniforms.tEquirect.value=n;const o=new en(r,s),a=n.minFilter;return n.minFilter===ur&&(n.minFilter=Yt),new jw(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}function WT(t){let e=new WeakMap,n=new WeakMap,i=null;function r(u,p=!1){return u==null?null:p?o(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===Lu||p===Du)if(e.has(u)){const _=e.get(u).texture;return a(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const x=new Ix(_.height);return x.fromEquirectangularTexture(t,u),e.set(u,x),u.addEventListener("dispose",c),a(x.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const p=u.mapping,_=p===Lu||p===Du,x=p===Zr||p===ro;if(_||x){let g=n.get(u);const f=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new qg(t)),g=_?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),g.texture;if(g!==void 0)return g.texture;{const m=u.image;return _&&m&&m.height>0||x&&m&&l(m)?(i===null&&(i=new qg(t)),g=_?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,p){return p===Lu?u.mapping=Zr:p===Du&&(u.mapping=ro),u}function l(u){let p=0;const _=6;for(let x=0;x<_;x++)u[x]!==void 0&&p++;return p===_}function c(u){const p=u.target;p.removeEventListener("dispose",c);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const _=n.get(p);_!==void 0&&(n.delete(p),_.dispose())}function d(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function jT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&sf("WebGLRenderer: "+i+" extension not supported."),r}}}function XT(t,e,n,i){const r={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",o),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function a(d,u){return r[u.id]===!0||(u.addEventListener("dispose",o),r[u.id]=!0,n.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)e.update(u[p],t.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,_=d.attributes.position;let x=0;if(_===void 0)return;if(p!==null){const m=p.array;x=p.version;for(let v=0,S=m.length;v<S;v+=3){const T=m[v+0],w=m[v+1],R=m[v+2];u.push(T,w,w,R,R,T)}}else{const m=_.array;x=_.version;for(let v=0,S=m.length/3-1;v<S;v+=3){const T=v+0,w=v+1,R=v+2;u.push(T,w,w,R,R,T)}}const g=new(_.count>=65535?qc:Xc)(u,1);g.version=x;const f=s.get(d);f&&e.remove(f),s.set(d,g)}function h(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function qT(t,e,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,u){t.drawElements(i,u,s,d*o),n.update(u,i,1)}function c(d,u,p){p!==0&&(t.drawElementsInstanced(i,u,s,d*o,p),n.update(u,i,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,d,0,p);let x=0;for(let g=0;g<p;g++)x+=u[g];n.update(x,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function $T(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:lt("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function YT(t,e,n){const i=new WeakMap,r=new Nt;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(a);if(u===void 0||u.count!==d){let C=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",C)};u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],m=a.morphAttributes.color||[];let v=0;p===!0&&(v=1),_===!0&&(v=2),x===!0&&(v=3);let S=a.attributes.position.count*v,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const w=new Float32Array(S*T*4*d),R=new wx(w,S,T,d);R.type=xi,R.needsUpdate=!0;const y=v*4;for(let U=0;U<d;U++){const L=g[U],G=f[U],z=m[U],j=S*T*4*U;for(let k=0;k<L.count;k++){const V=k*y;p===!0&&(r.fromBufferAttribute(L,k),w[j+V+0]=r.x,w[j+V+1]=r.y,w[j+V+2]=r.z,w[j+V+3]=0),_===!0&&(r.fromBufferAttribute(G,k),w[j+V+4]=r.x,w[j+V+5]=r.y,w[j+V+6]=r.z,w[j+V+7]=0),x===!0&&(r.fromBufferAttribute(z,k),w[j+V+8]=r.x,w[j+V+9]=r.y,w[j+V+10]=r.z,w[j+V+11]=z.itemSize===4?r.w:1)}}u={count:d,texture:R,size:new ze(S,T)},i.set(a,u),a.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];const _=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function KT(t,e,n,i,r){let s=new WeakMap;function o(c){const h=r.render.frame,d=c.geometry,u=e.get(c,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function a(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:o,dispose:a}}const ZT={[ox]:"LINEAR_TONE_MAPPING",[ax]:"REINHARD_TONE_MAPPING",[lx]:"CINEON_TONE_MAPPING",[cx]:"ACES_FILMIC_TONE_MAPPING",[hx]:"AGX_TONE_MAPPING",[dx]:"NEUTRAL_TONE_MAPPING",[ux]:"CUSTOM_TONE_MAPPING"};function QT(t,e,n,i,r){const s=new Rn(e,n,{type:t,depthBuffer:i,stencilBuffer:r,depthTexture:i?new oo(e,n):void 0}),o=new Rn(e,n,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),a=new Ht;a.setAttribute("position",new ft([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new ft([0,2,0,0,2,0],2));const l=new Iw({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new en(a,l),h=new lo(-1,1,1,-1,0,1);let d=null,u=null,p=!1,_,x=null,g=[],f=!1;this.setSize=function(m,v){s.setSize(m,v),o.setSize(m,v);for(let S=0;S<g.length;S++){const T=g[S];T.setSize&&T.setSize(m,v)}},this.setEffects=function(m){g=m,f=g.length>0&&g[0].isRenderPass===!0;const v=s.width,S=s.height;for(let T=0;T<g.length;T++){const w=g[T];w.setSize&&w.setSize(v,S)}},this.begin=function(m,v){if(p||m.toneMapping===Ei&&g.length===0)return!1;if(x=v,v!==null){const S=v.width,T=v.height;(s.width!==S||s.height!==T)&&this.setSize(S,T)}return f===!1&&m.setRenderTarget(s),_=m.toneMapping,m.toneMapping=Ei,!0},this.hasRenderPass=function(){return f},this.end=function(m,v){m.toneMapping=_,p=!0;let S=s,T=o;for(let w=0;w<g.length;w++){const R=g[w];if(R.enabled!==!1&&(R.render(m,T,S,v),R.needsSwap!==!1)){const y=S;S=T,T=y}}if(d!==m.outputColorSpace||u!==m.toneMapping){d=m.outputColorSpace,u=m.toneMapping,l.defines={},rt.getTransfer(d)===pt&&(l.defines.SRGB_TRANSFER="");const w=ZT[u];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,m.setRenderTarget(x),m.render(c,h),x=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const Ux=new Zt,af=new oo(1,1),kx=new wx,Fx=new hw,Ox=new Ax,Zg=[],Qg=[],Jg=new Float32Array(16),e0=new Float32Array(9),t0=new Float32Array(4);function go(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Zg[r];if(s===void 0&&(s=new Float32Array(r),Zg[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Wt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function jt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Qc(t,e){let n=Qg[e];n===void 0&&(n=new Int32Array(e),Qg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function JT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function eA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2fv(this.addr,e),jt(n,e)}}function tA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Wt(n,e))return;t.uniform3fv(this.addr,e),jt(n,e)}}function nA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4fv(this.addr,e),jt(n,e)}}function iA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),jt(n,e)}else{if(Wt(n,i))return;t0.set(i),t.uniformMatrix2fv(this.addr,!1,t0),jt(n,i)}}function rA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),jt(n,e)}else{if(Wt(n,i))return;e0.set(i),t.uniformMatrix3fv(this.addr,!1,e0),jt(n,i)}}function sA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),jt(n,e)}else{if(Wt(n,i))return;Jg.set(i),t.uniformMatrix4fv(this.addr,!1,Jg),jt(n,i)}}function oA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function aA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2iv(this.addr,e),jt(n,e)}}function lA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Wt(n,e))return;t.uniform3iv(this.addr,e),jt(n,e)}}function cA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4iv(this.addr,e),jt(n,e)}}function uA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function hA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2uiv(this.addr,e),jt(n,e)}}function dA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Wt(n,e))return;t.uniform3uiv(this.addr,e),jt(n,e)}}function fA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4uiv(this.addr,e),jt(n,e)}}function pA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(af.compareFunction=n.isReversedDepthBuffer()?mp:pp,s=af):s=Ux,n.setTexture2D(e||s,r)}function mA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Fx,r)}function gA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Ox,r)}function _A(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||kx,r)}function vA(t){switch(t){case 5126:return JT;case 35664:return eA;case 35665:return tA;case 35666:return nA;case 35674:return iA;case 35675:return rA;case 35676:return sA;case 5124:case 35670:return oA;case 35667:case 35671:return aA;case 35668:case 35672:return lA;case 35669:case 35673:return cA;case 5125:return uA;case 36294:return hA;case 36295:return dA;case 36296:return fA;case 35678:case 36198:case 36298:case 36306:case 35682:return pA;case 35679:case 36299:case 36307:return mA;case 35680:case 36300:case 36308:case 36293:return gA;case 36289:case 36303:case 36311:case 36292:return _A}}function xA(t,e){t.uniform1fv(this.addr,e)}function yA(t,e){const n=go(e,this.size,2);t.uniform2fv(this.addr,n)}function SA(t,e){const n=go(e,this.size,3);t.uniform3fv(this.addr,n)}function MA(t,e){const n=go(e,this.size,4);t.uniform4fv(this.addr,n)}function wA(t,e){const n=go(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function EA(t,e){const n=go(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function bA(t,e){const n=go(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function TA(t,e){t.uniform1iv(this.addr,e)}function AA(t,e){t.uniform2iv(this.addr,e)}function CA(t,e){t.uniform3iv(this.addr,e)}function RA(t,e){t.uniform4iv(this.addr,e)}function PA(t,e){t.uniform1uiv(this.addr,e)}function LA(t,e){t.uniform2uiv(this.addr,e)}function DA(t,e){t.uniform3uiv(this.addr,e)}function NA(t,e){t.uniform4uiv(this.addr,e)}function IA(t,e,n){const i=this.cache,r=e.length,s=Qc(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),jt(i,s));let o;this.type===t.SAMPLER_2D_SHADOW?o=af:o=Ux;for(let a=0;a!==r;++a)n.setTexture2D(e[a]||o,s[a])}function UA(t,e,n){const i=this.cache,r=e.length,s=Qc(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Fx,s[o])}function kA(t,e,n){const i=this.cache,r=e.length,s=Qc(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Ox,s[o])}function FA(t,e,n){const i=this.cache,r=e.length,s=Qc(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||kx,s[o])}function OA(t){switch(t){case 5126:return xA;case 35664:return yA;case 35665:return SA;case 35666:return MA;case 35674:return wA;case 35675:return EA;case 35676:return bA;case 5124:case 35670:return TA;case 35667:case 35671:return AA;case 35668:case 35672:return CA;case 35669:case 35673:return RA;case 5125:return PA;case 36294:return LA;case 36295:return DA;case 36296:return NA;case 35678:case 36198:case 36298:case 36306:case 35682:return IA;case 35679:case 36299:case 36307:return UA;case 35680:case 36300:case 36308:case 36293:return kA;case 36289:case 36303:case 36311:case 36292:return FA}}class BA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=vA(n.type)}}class zA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=OA(n.type)}}class VA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const fh=/(\w+)(\])?(\[|\.)?/g;function n0(t,e){t.seq.push(e),t.map[e.id]=e}function HA(t,e,n){const i=t.name,r=i.length;for(fh.lastIndex=0;;){const s=fh.exec(i),o=fh.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){n0(n,c===void 0?new BA(a,t,e):new zA(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new VA(a),n0(n,d)),n=d}}}class ql{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(n,o),l=e.getUniformLocation(n,a.name);HA(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function i0(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const GA=37297;let WA=0;function jA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const r0=new $e;function XA(t){rt._getMatrix(r0,rt.workingColorSpace,t);const e=`mat3( ${r0.elements.map(n=>n.toFixed(4))} )`;switch(rt.getTransfer(t)){case Mc:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function s0(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return n.toUpperCase()+`

`+s+`

`+jA(t.getShaderSource(e),a)}else return s}function qA(t,e){const n=XA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const $A={[ox]:"Linear",[ax]:"Reinhard",[lx]:"Cineon",[cx]:"ACESFilmic",[hx]:"AgX",[dx]:"Neutral",[ux]:"Custom"};function YA(t,e){const n=$A[e];return n===void 0?(We("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const wl=new O;function KA(){rt.getLuminanceCoefficients(wl);const t=wl.x.toFixed(4),e=wl.y.toFixed(4),n=wl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ZA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bo).join(`
`)}function QA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function JA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Bo(t){return t!==""}function o0(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function a0(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const e2=/^[ \t]*#include +<([\w\d./]+)>/gm;function lf(t){return t.replace(e2,n2)}const t2=new Map;function n2(t,e){let n=et[e];if(n===void 0){const i=t2.get(e);if(i!==void 0)n=et[i],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return lf(n)}const i2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function l0(t){return t.replace(i2,r2)}function r2(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function c0(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const s2={[Hl]:"SHADOWMAP_TYPE_PCF",[Oo]:"SHADOWMAP_TYPE_VSM"};function o2(t){return s2[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const a2={[Zr]:"ENVMAP_TYPE_CUBE",[ro]:"ENVMAP_TYPE_CUBE",[jc]:"ENVMAP_TYPE_CUBE_UV"};function l2(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":a2[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const c2={[ro]:"ENVMAP_MODE_REFRACTION"};function u2(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":c2[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const h2={[ap]:"ENVMAP_BLENDING_MULTIPLY",[RM]:"ENVMAP_BLENDING_MIX",[PM]:"ENVMAP_BLENDING_ADD"};function d2(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":h2[t.combine]||"ENVMAP_BLENDING_NONE"}function f2(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function p2(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=o2(n),c=l2(n),h=u2(n),d=d2(n),u=f2(n),p=ZA(n),_=QA(s),x=r.createProgram();let g,f,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Bo).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Bo).join(`
`),f.length>0&&(f+=`
`)):(g=[c0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bo).join(`
`),f=[c0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ei?"#define TONE_MAPPING":"",n.toneMapping!==Ei?et.tonemapping_pars_fragment:"",n.toneMapping!==Ei?YA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,qA("linearToOutputTexel",n.outputColorSpace),KA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Bo).join(`
`)),o=lf(o),o=o0(o,n),o=a0(o,n),a=lf(a),a=o0(a,n),a=a0(a,n),o=l0(o),a=l0(a),n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",n.glslVersion===cg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===cg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=m+g+o,S=m+f+a,T=i0(r,r.VERTEX_SHADER,v),w=i0(r,r.FRAGMENT_SHADER,S);r.attachShader(x,T),r.attachShader(x,w),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function R(L){if(t.debug.checkShaderErrors){const G=r.getProgramInfoLog(x)||"",z=r.getShaderInfoLog(T)||"",j=r.getShaderInfoLog(w)||"",k=G.trim(),V=z.trim(),P=j.trim();let I=!0,E=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(I=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,T,w);else{const D=s0(r,T,"vertex"),J=s0(r,w,"fragment");lt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+D+`
`+J)}else k!==""?We("WebGLProgram: Program Info Log:",k):(V===""||P==="")&&(E=!1);E&&(L.diagnostics={runnable:I,programLog:k,vertexShader:{log:V,prefix:g},fragmentShader:{log:P,prefix:f}})}r.deleteShader(T),r.deleteShader(w),y=new ql(r,x),C=JA(r,x)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let U=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=r.getProgramParameter(x,GA)),U},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=WA++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=w,this}let m2=0;class g2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new _2(e),n.set(e,i)),i}}class _2{constructor(e){this.id=m2++,this.code=e,this.usedTimes=0}}function v2(t){return t===Qr||t===yc||t===Sc}function x2(t,e,n,i,r,s){const o=new vp,a=new g2,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function x(y,C,U,L,G,z){const j=L.fog,k=G.geometry,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?L.environment:null,P=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,I=e.get(y.envMap||V,P),E=I&&I.mapping===jc?I.image.height:null,D=p[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&We("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const J=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Y=J!==void 0?J.length:0;let ne=0;k.morphAttributes.position!==void 0&&(ne=1),k.morphAttributes.normal!==void 0&&(ne=2),k.morphAttributes.color!==void 0&&(ne=3);let K,te,B,q;if(D){const Ye=_i[D];K=Ye.vertexShader,te=Ye.fragmentShader}else K=y.vertexShader,te=y.fragmentShader,a.update(y),B=a.getVertexShaderID(y),q=a.getFragmentShaderID(y);const $=t.getRenderTarget(),le=t.state.buffers.depth.getReversed(),fe=G.isInstancedMesh===!0,de=G.isBatchedMesh===!0,Ce=!!y.map,Oe=!!y.matcap,He=!!I,Ve=!!y.aoMap,Ne=!!y.lightMap,ie=!!y.bumpMap,he=!!y.normalMap,Ee=!!y.displacementMap,N=!!y.emissiveMap,Xe=!!y.metalnessMap,je=!!y.roughnessMap,st=y.anisotropy>0,ge=y.clearcoat>0,ot=y.dispersion>0,A=y.iridescence>0,M=y.sheen>0,X=y.transmission>0,oe=st&&!!y.anisotropyMap,ce=ge&&!!y.clearcoatMap,me=ge&&!!y.clearcoatNormalMap,Se=ge&&!!y.clearcoatRoughnessMap,re=A&&!!y.iridescenceMap,ae=A&&!!y.iridescenceThicknessMap,Te=M&&!!y.sheenColorMap,Pe=M&&!!y.sheenRoughnessMap,xe=!!y.specularMap,_e=!!y.specularColorMap,qe=!!y.specularIntensityMap,Ze=X&&!!y.transmissionMap,dt=X&&!!y.thicknessMap,H=!!y.gradientMap,ve=!!y.alphaMap,se=y.alphaTest>0,Ae=!!y.alphaHash,ye=!!y.extensions;let ue=Ei;y.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(ue=t.toneMapping);const Ue={shaderID:D,shaderType:y.type,shaderName:y.name,vertexShader:K,fragmentShader:te,defines:y.defines,customVertexShaderID:B,customFragmentShaderID:q,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:de,batchingColor:de&&G._colorsTexture!==null,instancing:fe,instancingColor:fe&&G.instanceColor!==null,instancingMorph:fe&&G.morphTexture!==null,outputColorSpace:$===null?t.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ce,matcap:Oe,envMap:He,envMapMode:He&&I.mapping,envMapCubeUVHeight:E,aoMap:Ve,lightMap:Ne,bumpMap:ie,normalMap:he,displacementMap:Ee,emissiveMap:N,normalMapObjectSpace:he&&y.normalMapType===NM,normalMapTangentSpace:he&&y.normalMapType===rf,packedNormalMap:he&&y.normalMapType===rf&&v2(y.normalMap.format),metalnessMap:Xe,roughnessMap:je,anisotropy:st,anisotropyMap:oe,clearcoat:ge,clearcoatMap:ce,clearcoatNormalMap:me,clearcoatRoughnessMap:Se,dispersion:ot,iridescence:A,iridescenceMap:re,iridescenceThicknessMap:ae,sheen:M,sheenColorMap:Te,sheenRoughnessMap:Pe,specularMap:xe,specularColorMap:_e,specularIntensityMap:qe,transmission:X,transmissionMap:Ze,thicknessMap:dt,gradientMap:H,opaque:y.transparent===!1&&y.blending===Gs&&y.alphaToCoverage===!1,alphaMap:ve,alphaTest:se,alphaHash:Ae,combine:y.combine,mapUv:Ce&&_(y.map.channel),aoMapUv:Ve&&_(y.aoMap.channel),lightMapUv:Ne&&_(y.lightMap.channel),bumpMapUv:ie&&_(y.bumpMap.channel),normalMapUv:he&&_(y.normalMap.channel),displacementMapUv:Ee&&_(y.displacementMap.channel),emissiveMapUv:N&&_(y.emissiveMap.channel),metalnessMapUv:Xe&&_(y.metalnessMap.channel),roughnessMapUv:je&&_(y.roughnessMap.channel),anisotropyMapUv:oe&&_(y.anisotropyMap.channel),clearcoatMapUv:ce&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:me&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&_(y.sheenRoughnessMap.channel),specularMapUv:xe&&_(y.specularMap.channel),specularColorMapUv:_e&&_(y.specularColorMap.channel),specularIntensityMapUv:qe&&_(y.specularIntensityMap.channel),transmissionMapUv:Ze&&_(y.transmissionMap.channel),thicknessMapUv:dt&&_(y.thicknessMap.channel),alphaMapUv:ve&&_(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(he||st),vertexNormals:!!k.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!k.attributes.uv&&(Ce||ve),fog:!!j,useFog:y.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||k.attributes.normal===void 0&&he===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:le,skinning:G.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:ne,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&U.length>0,shadowMapType:t.shadowMap.type,toneMapping:ue,decodeVideoTexture:Ce&&y.map.isVideoTexture===!0&&rt.getTransfer(y.map.colorSpace)===pt,decodeVideoTextureEmissive:N&&y.emissiveMap.isVideoTexture===!0&&rt.getTransfer(y.emissiveMap.colorSpace)===pt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===un,flipSided:y.side===Cn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ye&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&y.extensions.multiDraw===!0||de)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function g(y){const C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(const U in y.defines)C.push(U),C.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(f(C,y),m(C,y),C.push(t.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function f(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function m(y,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),y.push(o.mask)}function v(y){const C=p[y.type];let U;if(C){const L=_i[C];U=bc.clone(L.uniforms)}else U=y.uniforms;return U}function S(y,C){let U=h.get(C);return U!==void 0?++U.usedTimes:(U=new p2(t,C,y,r),c.push(U),h.set(C,U)),U}function T(y){if(--y.usedTimes===0){const C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function w(y){a.remove(y)}function R(){a.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:v,acquireProgram:S,releaseProgram:T,releaseShaderCache:w,programs:c,dispose:R}}function y2(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function S2(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function u0(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function h0(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function a(u,p,_,x,g,f){let m=t[e];return m===void 0?(m={id:u.id,object:u,geometry:p,material:_,materialVariant:o(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:f},t[e]=m):(m.id=u.id,m.object=u,m.geometry=p,m.material=_,m.materialVariant=o(u),m.groupOrder=x,m.renderOrder=u.renderOrder,m.z=g,m.group=f),e++,m}function l(u,p,_,x,g,f){const m=a(u,p,_,x,g,f);_.transmission>0?i.push(m):_.transparent===!0?r.push(m):n.push(m)}function c(u,p,_,x,g,f){const m=a(u,p,_,x,g,f);_.transmission>0?i.unshift(m):_.transparent===!0?r.unshift(m):n.unshift(m)}function h(u,p){n.length>1&&n.sort(u||S2),i.length>1&&i.sort(p||u0),r.length>1&&r.sort(p||u0)}function d(){for(let u=e,p=t.length;u<p;u++){const _=t[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:h}}function M2(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new h0,t.set(i,[o])):r>=s.length?(o=new h0,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function w2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new O,color:new Qe};break;case"SpotLight":n={position:new O,direction:new O,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":n={color:new Qe,position:new O,halfWidth:new O,halfHeight:new O};break}return t[e.id]=n,n}}}function E2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let b2=0;function T2(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function A2(t){const e=new w2,n=E2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,s=new Be,o=new Be;function a(c){let h=0,d=0,u=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,_=0,x=0,g=0,f=0,m=0,v=0,S=0,T=0,w=0,R=0;c.sort(T2);for(let C=0,U=c.length;C<U;C++){const L=c[C],G=L.color,z=L.intensity,j=L.distance;let k=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Qr?k=L.shadow.map.texture:k=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=G.r*z,d+=G.g*z,u+=G.b*z;else if(L.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(L.sh.coefficients[V],z);R++}else if(L.isDirectionalLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const P=L.shadow,I=n.get(L);I.shadowIntensity=P.intensity,I.shadowBias=P.bias,I.shadowNormalBias=P.normalBias,I.shadowRadius=P.radius,I.shadowMapSize=P.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=k,i.directionalShadowMatrix[p]=L.shadow.matrix,m++}i.directional[p]=V,p++}else if(L.isSpotLight){const V=e.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(G).multiplyScalar(z),V.distance=j,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,i.spot[x]=V;const P=L.shadow;if(L.map&&(i.spotLightMap[T]=L.map,T++,P.updateMatrices(L),L.castShadow&&w++),i.spotLightMatrix[x]=P.matrix,L.castShadow){const I=n.get(L);I.shadowIntensity=P.intensity,I.shadowBias=P.bias,I.shadowNormalBias=P.normalBias,I.shadowRadius=P.radius,I.shadowMapSize=P.mapSize,i.spotShadow[x]=I,i.spotShadowMap[x]=k,S++}x++}else if(L.isRectAreaLight){const V=e.get(L);V.color.copy(G).multiplyScalar(z),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),i.rectArea[g]=V,g++}else if(L.isPointLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){const P=L.shadow,I=n.get(L);I.shadowIntensity=P.intensity,I.shadowBias=P.bias,I.shadowNormalBias=P.normalBias,I.shadowRadius=P.radius,I.shadowMapSize=P.mapSize,I.shadowCameraNear=P.camera.near,I.shadowCameraFar=P.camera.far,i.pointShadow[_]=I,i.pointShadowMap[_]=k,i.pointShadowMatrix[_]=L.shadow.matrix,v++}i.point[_]=V,_++}else if(L.isHemisphereLight){const V=e.get(L);V.skyColor.copy(L.color).multiplyScalar(z),V.groundColor.copy(L.groundColor).multiplyScalar(z),i.hemi[f]=V,f++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const y=i.hash;(y.directionalLength!==p||y.pointLength!==_||y.spotLength!==x||y.rectAreaLength!==g||y.hemiLength!==f||y.numDirectionalShadows!==m||y.numPointShadows!==v||y.numSpotShadows!==S||y.numSpotMaps!==T||y.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=g,i.point.length=_,i.hemi.length=f,i.directionalShadow.length=m,i.directionalShadowMap.length=m,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=m,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+T-w,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,y.directionalLength=p,y.pointLength=_,y.spotLength=x,y.rectAreaLength=g,y.hemiLength=f,y.numDirectionalShadows=m,y.numPointShadows=v,y.numSpotShadows=S,y.numSpotMaps=T,y.numLightProbes=R,i.version=b2++)}function l(c,h){let d=0,u=0,p=0,_=0,x=0;const g=h.matrixWorldInverse;for(let f=0,m=c.length;f<m;f++){const v=c[f];if(v.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),d++}else if(v.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),p++}else if(v.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),o.identity(),s.copy(v.matrixWorld),s.premultiply(g),o.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),u++}else if(v.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:i}}function d0(t){const e=new A2(t),n=[],i=[],r=[];function s(u){d.camera=u,n.length=0,i.length=0,r.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(n)}function h(u){e.setupView(n,u)}const d={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function C2(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new d0(t),e.set(r,[a])):s>=o.length?(a=new d0(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const R2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P2=`uniform sampler2D shadow_pass;
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
}`,L2=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],D2=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],f0=new Be,No=new O,ph=new O;function N2(t,e,n){let i=new xp;const r=new ze,s=new ze,o=new Nt,a=new Uw,l=new kw,c={},h=n.maxTextureSize,d={[Mr]:Cn,[Cn]:Mr,[un]:un},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:R2,fragmentShader:P2}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new Ht;_.setAttribute("position",new ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new en(_,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hl;let f=this.type;this.render=function(w,R,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===sx&&(We("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Hl);const C=t.getRenderTarget(),U=t.getActiveCubeFace(),L=t.getActiveMipmapLevel(),G=t.state;G.setBlending(wi),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const z=f!==this.type;z&&R.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(k=>k.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,k=w.length;j<k;j++){const V=w[j],P=V.shadow;if(P===void 0){We("WebGLShadowMap:",V,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;r.copy(P.mapSize);const I=P.getFrameExtents();r.multiply(I),s.copy(P.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/I.x),r.x=s.x*I.x,P.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/I.y),r.y=s.y*I.y,P.mapSize.y=s.y));const E=t.state.buffers.depth.getReversed();if(P.camera._reversedDepth=E,P.map===null||z===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===Oo){if(V.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new Rn(r.x,r.y,{format:Qr,type:Bn,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),P.map.texture.name=V.name+".shadowMap",P.map.depthTexture=new oo(r.x,r.y,xi),P.map.depthTexture.name=V.name+".shadowMapDepth",P.map.depthTexture.format=Wi,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Mt,P.map.depthTexture.magFilter=Mt}else V.isPointLight?(P.map=new Ix(r.x),P.map.depthTexture=new Pw(r.x,bi)):(P.map=new Rn(r.x,r.y),P.map.depthTexture=new oo(r.x,r.y,bi)),P.map.depthTexture.name=V.name+".shadowMap",P.map.depthTexture.format=Wi,this.type===Hl?(P.map.depthTexture.compareFunction=E?mp:pp,P.map.depthTexture.minFilter=Yt,P.map.depthTexture.magFilter=Yt):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Mt,P.map.depthTexture.magFilter=Mt);P.camera.updateProjectionMatrix()}const D=P.map.isWebGLCubeRenderTarget?6:1;for(let J=0;J<D;J++){if(P.map.isWebGLCubeRenderTarget)t.setRenderTarget(P.map,J),t.clear();else{J===0&&(t.setRenderTarget(P.map),t.clear());const Y=P.getViewport(J);o.set(s.x*Y.x,s.y*Y.y,s.x*Y.z,s.y*Y.w),G.viewport(o)}if(V.isPointLight){const Y=P.camera,ne=P.matrix,K=V.distance||Y.far;K!==Y.far&&(Y.far=K,Y.updateProjectionMatrix()),No.setFromMatrixPosition(V.matrixWorld),Y.position.copy(No),ph.copy(Y.position),ph.add(L2[J]),Y.up.copy(D2[J]),Y.lookAt(ph),Y.updateMatrixWorld(),ne.makeTranslation(-No.x,-No.y,-No.z),f0.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),P._frustum.setFromProjectionMatrix(f0,Y.coordinateSystem,Y.reversedDepth)}else P.updateMatrices(V);i=P.getFrustum(),S(R,y,P.camera,V,this.type)}P.isPointLightShadow!==!0&&this.type===Oo&&m(P,y),P.needsUpdate=!1}f=this.type,g.needsUpdate=!1,t.setRenderTarget(C,U,L)};function m(w,R){const y=e.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Rn(r.x,r.y,{format:Qr,type:Bn})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(R,null,y,u,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(R,null,y,p,x,null)}function v(w,R,y,C){let U=null;const L=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)U=L;else if(U=y.isPointLight===!0?l:a,t.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const G=U.uuid,z=R.uuid;let j=c[G];j===void 0&&(j={},c[G]=j);let k=j[z];k===void 0&&(k=U.clone(),j[z]=k,R.addEventListener("dispose",T)),U=k}if(U.visible=R.visible,U.wireframe=R.wireframe,C===Oo?U.side=R.shadowSide!==null?R.shadowSide:R.side:U.side=R.shadowSide!==null?R.shadowSide:d[R.side],U.alphaMap=R.alphaMap,U.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,U.map=R.map,U.clipShadows=R.clipShadows,U.clippingPlanes=R.clippingPlanes,U.clipIntersection=R.clipIntersection,U.displacementMap=R.displacementMap,U.displacementScale=R.displacementScale,U.displacementBias=R.displacementBias,U.wireframeLinewidth=R.wireframeLinewidth,U.linewidth=R.linewidth,y.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const G=t.properties.get(U);G.light=y}return U}function S(w,R,y,C,U){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&U===Oo)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const z=e.update(w),j=w.material;if(Array.isArray(j)){const k=z.groups;for(let V=0,P=k.length;V<P;V++){const I=k[V],E=j[I.materialIndex];if(E&&E.visible){const D=v(w,E,C,U);w.onBeforeShadow(t,w,R,y,z,D,I),t.renderBufferDirect(y,null,z,D,w,I),w.onAfterShadow(t,w,R,y,z,D,I)}}}else if(j.visible){const k=v(w,j,C,U);w.onBeforeShadow(t,w,R,y,z,k,null),t.renderBufferDirect(y,null,z,k,w,null),w.onAfterShadow(t,w,R,y,z,k,null)}}const G=w.children;for(let z=0,j=G.length;z<j;z++)S(G[z],R,y,C,U)}function T(w){w.target.removeEventListener("dispose",T);for(const y in c){const C=c[y],U=w.target.uuid;U in C&&(C[U].dispose(),delete C[U])}}}function I2(t,e){function n(){let H=!1;const ve=new Nt;let se=null;const Ae=new Nt(0,0,0,0);return{setMask:function(ye){se!==ye&&!H&&(t.colorMask(ye,ye,ye,ye),se=ye)},setLocked:function(ye){H=ye},setClear:function(ye,ue,Ue,Ye,It){It===!0&&(ye*=Ye,ue*=Ye,Ue*=Ye),ve.set(ye,ue,Ue,Ye),Ae.equals(ve)===!1&&(t.clearColor(ye,ue,Ue,Ye),Ae.copy(ve))},reset:function(){H=!1,se=null,Ae.set(-1,0,0,0)}}}function i(){let H=!1,ve=!1,se=null,Ae=null,ye=null;return{setReversed:function(ue){if(ve!==ue){const Ue=e.get("EXT_clip_control");ue?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ve=ue;const Ye=ye;ye=null,this.setClear(Ye)}},getReversed:function(){return ve},setTest:function(ue){ue?$(t.DEPTH_TEST):le(t.DEPTH_TEST)},setMask:function(ue){se!==ue&&!H&&(t.depthMask(ue),se=ue)},setFunc:function(ue){if(ve&&(ue=GM[ue]),Ae!==ue){switch(ue){case vd:t.depthFunc(t.NEVER);break;case xd:t.depthFunc(t.ALWAYS);break;case yd:t.depthFunc(t.LESS);break;case io:t.depthFunc(t.LEQUAL);break;case Sd:t.depthFunc(t.EQUAL);break;case Md:t.depthFunc(t.GEQUAL);break;case wd:t.depthFunc(t.GREATER);break;case Ed:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Ae=ue}},setLocked:function(ue){H=ue},setClear:function(ue){ye!==ue&&(ye=ue,ve&&(ue=1-ue),t.clearDepth(ue))},reset:function(){H=!1,se=null,Ae=null,ye=null,ve=!1}}}function r(){let H=!1,ve=null,se=null,Ae=null,ye=null,ue=null,Ue=null,Ye=null,It=null;return{setTest:function(gt){H||(gt?$(t.STENCIL_TEST):le(t.STENCIL_TEST))},setMask:function(gt){ve!==gt&&!H&&(t.stencilMask(gt),ve=gt)},setFunc:function(gt,Ti,hi){(se!==gt||Ae!==Ti||ye!==hi)&&(t.stencilFunc(gt,Ti,hi),se=gt,Ae=Ti,ye=hi)},setOp:function(gt,Ti,hi){(ue!==gt||Ue!==Ti||Ye!==hi)&&(t.stencilOp(gt,Ti,hi),ue=gt,Ue=Ti,Ye=hi)},setLocked:function(gt){H=gt},setClear:function(gt){It!==gt&&(t.clearStencil(gt),It=gt)},reset:function(){H=!1,ve=null,se=null,Ae=null,ye=null,ue=null,Ue=null,Ye=null,It=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},d={},u={},p=new WeakMap,_=[],x=null,g=!1,f=null,m=null,v=null,S=null,T=null,w=null,R=null,y=new Qe(0,0,0),C=0,U=!1,L=null,G=null,z=null,j=null,k=null;const V=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,I=0;const E=t.getParameter(t.VERSION);E.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(E)[1]),P=I>=1):E.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(E)[1]),P=I>=2);let D=null,J={};const Y=t.getParameter(t.SCISSOR_BOX),ne=t.getParameter(t.VIEWPORT),K=new Nt().fromArray(Y),te=new Nt().fromArray(ne);function B(H,ve,se,Ae){const ye=new Uint8Array(4),ue=t.createTexture();t.bindTexture(H,ue),t.texParameteri(H,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(H,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ue=0;Ue<se;Ue++)H===t.TEXTURE_3D||H===t.TEXTURE_2D_ARRAY?t.texImage3D(ve,0,t.RGBA,1,1,Ae,0,t.RGBA,t.UNSIGNED_BYTE,ye):t.texImage2D(ve+Ue,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ye);return ue}const q={};q[t.TEXTURE_2D]=B(t.TEXTURE_2D,t.TEXTURE_2D,1),q[t.TEXTURE_CUBE_MAP]=B(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[t.TEXTURE_2D_ARRAY]=B(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),q[t.TEXTURE_3D]=B(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),$(t.DEPTH_TEST),o.setFunc(io),ie(!1),he(rg),$(t.CULL_FACE),Ve(wi);function $(H){h[H]!==!0&&(t.enable(H),h[H]=!0)}function le(H){h[H]!==!1&&(t.disable(H),h[H]=!1)}function fe(H,ve){return u[H]!==ve?(t.bindFramebuffer(H,ve),u[H]=ve,H===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=ve),H===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=ve),!0):!1}function de(H,ve){let se=_,Ae=!1;if(H){se=p.get(ve),se===void 0&&(se=[],p.set(ve,se));const ye=H.textures;if(se.length!==ye.length||se[0]!==t.COLOR_ATTACHMENT0){for(let ue=0,Ue=ye.length;ue<Ue;ue++)se[ue]=t.COLOR_ATTACHMENT0+ue;se.length=ye.length,Ae=!0}}else se[0]!==t.BACK&&(se[0]=t.BACK,Ae=!0);Ae&&t.drawBuffers(se)}function Ce(H){return x!==H?(t.useProgram(H),x=H,!0):!1}const Oe={[kr]:t.FUNC_ADD,[dM]:t.FUNC_SUBTRACT,[fM]:t.FUNC_REVERSE_SUBTRACT};Oe[pM]=t.MIN,Oe[mM]=t.MAX;const He={[gM]:t.ZERO,[_M]:t.ONE,[vM]:t.SRC_COLOR,[gd]:t.SRC_ALPHA,[EM]:t.SRC_ALPHA_SATURATE,[MM]:t.DST_COLOR,[yM]:t.DST_ALPHA,[xM]:t.ONE_MINUS_SRC_COLOR,[_d]:t.ONE_MINUS_SRC_ALPHA,[wM]:t.ONE_MINUS_DST_COLOR,[SM]:t.ONE_MINUS_DST_ALPHA,[bM]:t.CONSTANT_COLOR,[TM]:t.ONE_MINUS_CONSTANT_COLOR,[AM]:t.CONSTANT_ALPHA,[CM]:t.ONE_MINUS_CONSTANT_ALPHA};function Ve(H,ve,se,Ae,ye,ue,Ue,Ye,It,gt){if(H===wi){g===!0&&(le(t.BLEND),g=!1);return}if(g===!1&&($(t.BLEND),g=!0),H!==hM){if(H!==f||gt!==U){if((m!==kr||T!==kr)&&(t.blendEquation(t.FUNC_ADD),m=kr,T=kr),gt)switch(H){case Gs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case md:t.blendFunc(t.ONE,t.ONE);break;case sg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case og:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:lt("WebGLState: Invalid blending: ",H);break}else switch(H){case Gs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case md:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case sg:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case og:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",H);break}v=null,S=null,w=null,R=null,y.set(0,0,0),C=0,f=H,U=gt}return}ye=ye||ve,ue=ue||se,Ue=Ue||Ae,(ve!==m||ye!==T)&&(t.blendEquationSeparate(Oe[ve],Oe[ye]),m=ve,T=ye),(se!==v||Ae!==S||ue!==w||Ue!==R)&&(t.blendFuncSeparate(He[se],He[Ae],He[ue],He[Ue]),v=se,S=Ae,w=ue,R=Ue),(Ye.equals(y)===!1||It!==C)&&(t.blendColor(Ye.r,Ye.g,Ye.b,It),y.copy(Ye),C=It),f=H,U=!1}function Ne(H,ve){H.side===un?le(t.CULL_FACE):$(t.CULL_FACE);let se=H.side===Cn;ve&&(se=!se),ie(se),H.blending===Gs&&H.transparent===!1?Ve(wi):Ve(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),s.setMask(H.colorWrite);const Ae=H.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),N(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?$(t.SAMPLE_ALPHA_TO_COVERAGE):le(t.SAMPLE_ALPHA_TO_COVERAGE)}function ie(H){L!==H&&(H?t.frontFace(t.CW):t.frontFace(t.CCW),L=H)}function he(H){H!==cM?($(t.CULL_FACE),H!==G&&(H===rg?t.cullFace(t.BACK):H===uM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):le(t.CULL_FACE),G=H}function Ee(H){H!==z&&(P&&t.lineWidth(H),z=H)}function N(H,ve,se){H?($(t.POLYGON_OFFSET_FILL),(j!==ve||k!==se)&&(j=ve,k=se,o.getReversed()&&(ve=-ve),t.polygonOffset(ve,se))):le(t.POLYGON_OFFSET_FILL)}function Xe(H){H?$(t.SCISSOR_TEST):le(t.SCISSOR_TEST)}function je(H){H===void 0&&(H=t.TEXTURE0+V-1),D!==H&&(t.activeTexture(H),D=H)}function st(H,ve,se){se===void 0&&(D===null?se=t.TEXTURE0+V-1:se=D);let Ae=J[se];Ae===void 0&&(Ae={type:void 0,texture:void 0},J[se]=Ae),(Ae.type!==H||Ae.texture!==ve)&&(D!==se&&(t.activeTexture(se),D=se),t.bindTexture(H,ve||q[H]),Ae.type=H,Ae.texture=ve)}function ge(){const H=J[D];H!==void 0&&H.type!==void 0&&(t.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ot(){try{t.compressedTexImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function A(){try{t.compressedTexImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function M(){try{t.texSubImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function X(){try{t.texSubImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function oe(){try{t.compressedTexSubImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function ce(){try{t.compressedTexSubImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function me(){try{t.texStorage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function Se(){try{t.texStorage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function re(){try{t.texImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function ae(){try{t.texImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function Te(H){return d[H]!==void 0?d[H]:t.getParameter(H)}function Pe(H,ve){d[H]!==ve&&(t.pixelStorei(H,ve),d[H]=ve)}function xe(H){K.equals(H)===!1&&(t.scissor(H.x,H.y,H.z,H.w),K.copy(H))}function _e(H){te.equals(H)===!1&&(t.viewport(H.x,H.y,H.z,H.w),te.copy(H))}function qe(H,ve){let se=c.get(ve);se===void 0&&(se=new WeakMap,c.set(ve,se));let Ae=se.get(H);Ae===void 0&&(Ae=t.getUniformBlockIndex(ve,H.name),se.set(H,Ae))}function Ze(H,ve){const Ae=c.get(ve).get(H);l.get(ve)!==Ae&&(t.uniformBlockBinding(ve,Ae,H.__bindingPointIndex),l.set(ve,Ae))}function dt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),h={},d={},D=null,J={},u={},p=new WeakMap,_=[],x=null,g=!1,f=null,m=null,v=null,S=null,T=null,w=null,R=null,y=new Qe(0,0,0),C=0,U=!1,L=null,G=null,z=null,j=null,k=null,K.set(0,0,t.canvas.width,t.canvas.height),te.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:$,disable:le,bindFramebuffer:fe,drawBuffers:de,useProgram:Ce,setBlending:Ve,setMaterial:Ne,setFlipSided:ie,setCullFace:he,setLineWidth:Ee,setPolygonOffset:N,setScissorTest:Xe,activeTexture:je,bindTexture:st,unbindTexture:ge,compressedTexImage2D:ot,compressedTexImage3D:A,texImage2D:re,texImage3D:ae,pixelStorei:Pe,getParameter:Te,updateUBOMapping:qe,uniformBlockBinding:Ze,texStorage2D:me,texStorage3D:Se,texSubImage2D:M,texSubImage3D:X,compressedTexSubImage2D:oe,compressedTexSubImage3D:ce,scissor:xe,viewport:_e,reset:dt}}function U2(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,M){return _?new OffscreenCanvas(A,M):_a("canvas")}function g(A,M,X){let oe=1;const ce=ot(A);if((ce.width>X||ce.height>X)&&(oe=X/Math.max(ce.width,ce.height)),oe<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const me=Math.floor(oe*ce.width),Se=Math.floor(oe*ce.height);u===void 0&&(u=x(me,Se));const re=M?x(me,Se):u;return re.width=me,re.height=Se,re.getContext("2d").drawImage(A,0,0,me,Se),We("WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+me+"x"+Se+")."),re}else return"data"in A&&We("WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),A;return A}function f(A){return A.generateMipmaps}function m(A){t.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?t.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(A,M,X,oe,ce,me=!1){if(A!==null){if(t[A]!==void 0)return t[A];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Se;oe&&(Se=e.get("EXT_texture_norm16"),Se||We("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=M;if(M===t.RED&&(X===t.FLOAT&&(re=t.R32F),X===t.HALF_FLOAT&&(re=t.R16F),X===t.UNSIGNED_BYTE&&(re=t.R8),X===t.UNSIGNED_SHORT&&Se&&(re=Se.R16_EXT),X===t.SHORT&&Se&&(re=Se.R16_SNORM_EXT)),M===t.RED_INTEGER&&(X===t.UNSIGNED_BYTE&&(re=t.R8UI),X===t.UNSIGNED_SHORT&&(re=t.R16UI),X===t.UNSIGNED_INT&&(re=t.R32UI),X===t.BYTE&&(re=t.R8I),X===t.SHORT&&(re=t.R16I),X===t.INT&&(re=t.R32I)),M===t.RG&&(X===t.FLOAT&&(re=t.RG32F),X===t.HALF_FLOAT&&(re=t.RG16F),X===t.UNSIGNED_BYTE&&(re=t.RG8),X===t.UNSIGNED_SHORT&&Se&&(re=Se.RG16_EXT),X===t.SHORT&&Se&&(re=Se.RG16_SNORM_EXT)),M===t.RG_INTEGER&&(X===t.UNSIGNED_BYTE&&(re=t.RG8UI),X===t.UNSIGNED_SHORT&&(re=t.RG16UI),X===t.UNSIGNED_INT&&(re=t.RG32UI),X===t.BYTE&&(re=t.RG8I),X===t.SHORT&&(re=t.RG16I),X===t.INT&&(re=t.RG32I)),M===t.RGB_INTEGER&&(X===t.UNSIGNED_BYTE&&(re=t.RGB8UI),X===t.UNSIGNED_SHORT&&(re=t.RGB16UI),X===t.UNSIGNED_INT&&(re=t.RGB32UI),X===t.BYTE&&(re=t.RGB8I),X===t.SHORT&&(re=t.RGB16I),X===t.INT&&(re=t.RGB32I)),M===t.RGBA_INTEGER&&(X===t.UNSIGNED_BYTE&&(re=t.RGBA8UI),X===t.UNSIGNED_SHORT&&(re=t.RGBA16UI),X===t.UNSIGNED_INT&&(re=t.RGBA32UI),X===t.BYTE&&(re=t.RGBA8I),X===t.SHORT&&(re=t.RGBA16I),X===t.INT&&(re=t.RGBA32I)),M===t.RGB&&(X===t.UNSIGNED_SHORT&&Se&&(re=Se.RGB16_EXT),X===t.SHORT&&Se&&(re=Se.RGB16_SNORM_EXT),X===t.UNSIGNED_INT_5_9_9_9_REV&&(re=t.RGB9_E5),X===t.UNSIGNED_INT_10F_11F_11F_REV&&(re=t.R11F_G11F_B10F)),M===t.RGBA){const ae=me?Mc:rt.getTransfer(ce);X===t.FLOAT&&(re=t.RGBA32F),X===t.HALF_FLOAT&&(re=t.RGBA16F),X===t.UNSIGNED_BYTE&&(re=ae===pt?t.SRGB8_ALPHA8:t.RGBA8),X===t.UNSIGNED_SHORT&&Se&&(re=Se.RGBA16_EXT),X===t.SHORT&&Se&&(re=Se.RGBA16_SNORM_EXT),X===t.UNSIGNED_SHORT_4_4_4_4&&(re=t.RGBA4),X===t.UNSIGNED_SHORT_5_5_5_1&&(re=t.RGB5_A1)}return(re===t.R16F||re===t.R32F||re===t.RG16F||re===t.RG32F||re===t.RGBA16F||re===t.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function T(A,M){let X;return A?M===null||M===bi||M===ma?X=t.DEPTH24_STENCIL8:M===xi?X=t.DEPTH32F_STENCIL8:M===pa&&(X=t.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===bi||M===ma?X=t.DEPTH_COMPONENT24:M===xi?X=t.DEPTH_COMPONENT32F:M===pa&&(X=t.DEPTH_COMPONENT16),X}function w(A,M){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==Mt&&A.minFilter!==Yt?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function R(A){const M=A.target;M.removeEventListener("dispose",R),C(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&d.delete(M)}function y(A){const M=A.target;M.removeEventListener("dispose",y),L(M)}function C(A){const M=i.get(A);if(M.__webglInit===void 0)return;const X=A.source,oe=p.get(X);if(oe){const ce=oe[M.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&U(A),Object.keys(oe).length===0&&p.delete(X)}i.remove(A)}function U(A){const M=i.get(A);t.deleteTexture(M.__webglTexture);const X=A.source,oe=p.get(X);delete oe[M.__cacheKey],o.memory.textures--}function L(A){const M=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(M.__webglFramebuffer[oe]))for(let ce=0;ce<M.__webglFramebuffer[oe].length;ce++)t.deleteFramebuffer(M.__webglFramebuffer[oe][ce]);else t.deleteFramebuffer(M.__webglFramebuffer[oe]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[oe])}else{if(Array.isArray(M.__webglFramebuffer))for(let oe=0;oe<M.__webglFramebuffer.length;oe++)t.deleteFramebuffer(M.__webglFramebuffer[oe]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let oe=0;oe<M.__webglColorRenderbuffer.length;oe++)M.__webglColorRenderbuffer[oe]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[oe]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const X=A.textures;for(let oe=0,ce=X.length;oe<ce;oe++){const me=i.get(X[oe]);me.__webglTexture&&(t.deleteTexture(me.__webglTexture),o.memory.textures--),i.remove(X[oe])}i.remove(A)}let G=0;function z(){G=0}function j(){return G}function k(A){G=A}function V(){const A=G;return A>=r.maxTextures&&We("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),G+=1,A}function P(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function I(A,M){const X=i.get(A);if(A.isVideoTexture&&st(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&X.__version!==A.version){const oe=A.image;if(oe===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{le(X,A,M);return}}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,X.__webglTexture,t.TEXTURE0+M)}function E(A,M){const X=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version){le(X,A,M);return}else A.isExternalTexture&&(X.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,X.__webglTexture,t.TEXTURE0+M)}function D(A,M){const X=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&X.__version!==A.version){le(X,A,M);return}n.bindTexture(t.TEXTURE_3D,X.__webglTexture,t.TEXTURE0+M)}function J(A,M){const X=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&X.__version!==A.version){fe(X,A,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,X.__webglTexture,t.TEXTURE0+M)}const Y={[bd]:t.REPEAT,[Fi]:t.CLAMP_TO_EDGE,[Td]:t.MIRRORED_REPEAT},ne={[Mt]:t.NEAREST,[LM]:t.NEAREST_MIPMAP_NEAREST,[Za]:t.NEAREST_MIPMAP_LINEAR,[Yt]:t.LINEAR,[Nu]:t.LINEAR_MIPMAP_NEAREST,[ur]:t.LINEAR_MIPMAP_LINEAR},K={[IM]:t.NEVER,[BM]:t.ALWAYS,[UM]:t.LESS,[pp]:t.LEQUAL,[kM]:t.EQUAL,[mp]:t.GEQUAL,[FM]:t.GREATER,[OM]:t.NOTEQUAL};function te(A,M){if(M.type===xi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Yt||M.magFilter===Nu||M.magFilter===Za||M.magFilter===ur||M.minFilter===Yt||M.minFilter===Nu||M.minFilter===Za||M.minFilter===ur)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(A,t.TEXTURE_WRAP_S,Y[M.wrapS]),t.texParameteri(A,t.TEXTURE_WRAP_T,Y[M.wrapT]),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,Y[M.wrapR]),t.texParameteri(A,t.TEXTURE_MAG_FILTER,ne[M.magFilter]),t.texParameteri(A,t.TEXTURE_MIN_FILTER,ne[M.minFilter]),M.compareFunction&&(t.texParameteri(A,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(A,t.TEXTURE_COMPARE_FUNC,K[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Mt||M.minFilter!==Za&&M.minFilter!==ur||M.type===xi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");t.texParameterf(A,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function B(A,M){let X=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",R));const oe=M.source;let ce=p.get(oe);ce===void 0&&(ce={},p.set(oe,ce));const me=P(M);if(me!==A.__cacheKey){ce[me]===void 0&&(ce[me]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ce[me].usedTimes++;const Se=ce[A.__cacheKey];Se!==void 0&&(ce[A.__cacheKey].usedTimes--,Se.usedTimes===0&&U(M)),A.__cacheKey=me,A.__webglTexture=ce[me].texture}return X}function q(A,M,X){return Math.floor(Math.floor(A/X)/M)}function $(A,M,X,oe){const me=A.updateRanges;if(me.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,M.width,M.height,X,oe,M.data);else{me.sort((Pe,xe)=>Pe.start-xe.start);let Se=0;for(let Pe=1;Pe<me.length;Pe++){const xe=me[Se],_e=me[Pe],qe=xe.start+xe.count,Ze=q(_e.start,M.width,4),dt=q(xe.start,M.width,4);_e.start<=qe+1&&Ze===dt&&q(_e.start+_e.count-1,M.width,4)===Ze?xe.count=Math.max(xe.count,_e.start+_e.count-xe.start):(++Se,me[Se]=_e)}me.length=Se+1;const re=n.getParameter(t.UNPACK_ROW_LENGTH),ae=n.getParameter(t.UNPACK_SKIP_PIXELS),Te=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,M.width);for(let Pe=0,xe=me.length;Pe<xe;Pe++){const _e=me[Pe],qe=Math.floor(_e.start/4),Ze=Math.ceil(_e.count/4),dt=qe%M.width,H=Math.floor(qe/M.width),ve=Ze,se=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,dt),n.pixelStorei(t.UNPACK_SKIP_ROWS,H),n.texSubImage2D(t.TEXTURE_2D,0,dt,H,ve,se,X,oe,M.data)}A.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,re),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ae),n.pixelStorei(t.UNPACK_SKIP_ROWS,Te)}}function le(A,M,X){let oe=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(oe=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(oe=t.TEXTURE_3D);const ce=B(A,M),me=M.source;n.bindTexture(oe,A.__webglTexture,t.TEXTURE0+X);const Se=i.get(me);if(me.version!==Se.__version||ce===!0){if(n.activeTexture(t.TEXTURE0+X),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const se=rt.getPrimaries(rt.workingColorSpace),Ae=M.colorSpace===ar?null:rt.getPrimaries(M.colorSpace),ye=M.colorSpace===ar||se===Ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}n.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment);let ae=g(M.image,!1,r.maxTextureSize);ae=ge(M,ae);const Te=s.convert(M.format,M.colorSpace),Pe=s.convert(M.type);let xe=S(M.internalFormat,Te,Pe,M.normalized,M.colorSpace,M.isVideoTexture);te(oe,M);let _e;const qe=M.mipmaps,Ze=M.isVideoTexture!==!0,dt=Se.__version===void 0||ce===!0,H=me.dataReady,ve=w(M,ae);if(M.isDepthTexture)xe=T(M.format===Vr,M.type),dt&&(Ze?n.texStorage2D(t.TEXTURE_2D,1,xe,ae.width,ae.height):n.texImage2D(t.TEXTURE_2D,0,xe,ae.width,ae.height,0,Te,Pe,null));else if(M.isDataTexture)if(qe.length>0){Ze&&dt&&n.texStorage2D(t.TEXTURE_2D,ve,xe,qe[0].width,qe[0].height);for(let se=0,Ae=qe.length;se<Ae;se++)_e=qe[se],Ze?H&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,_e.width,_e.height,Te,Pe,_e.data):n.texImage2D(t.TEXTURE_2D,se,xe,_e.width,_e.height,0,Te,Pe,_e.data);M.generateMipmaps=!1}else Ze?(dt&&n.texStorage2D(t.TEXTURE_2D,ve,xe,ae.width,ae.height),H&&$(M,ae,Te,Pe)):n.texImage2D(t.TEXTURE_2D,0,xe,ae.width,ae.height,0,Te,Pe,ae.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ze&&dt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ve,xe,qe[0].width,qe[0].height,ae.depth);for(let se=0,Ae=qe.length;se<Ae;se++)if(_e=qe[se],M.format!==oi)if(Te!==null)if(Ze){if(H)if(M.layerUpdates.size>0){const ye=Wg(_e.width,_e.height,M.format,M.type);for(const ue of M.layerUpdates){const Ue=_e.data.subarray(ue*ye/_e.data.BYTES_PER_ELEMENT,(ue+1)*ye/_e.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,ue,_e.width,_e.height,1,Te,Ue)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,0,_e.width,_e.height,ae.depth,Te,_e.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,se,xe,_e.width,_e.height,ae.depth,0,_e.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ze?H&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,0,_e.width,_e.height,ae.depth,Te,Pe,_e.data):n.texImage3D(t.TEXTURE_2D_ARRAY,se,xe,_e.width,_e.height,ae.depth,0,Te,Pe,_e.data)}else{Ze&&dt&&n.texStorage2D(t.TEXTURE_2D,ve,xe,qe[0].width,qe[0].height);for(let se=0,Ae=qe.length;se<Ae;se++)_e=qe[se],M.format!==oi?Te!==null?Ze?H&&n.compressedTexSubImage2D(t.TEXTURE_2D,se,0,0,_e.width,_e.height,Te,_e.data):n.compressedTexImage2D(t.TEXTURE_2D,se,xe,_e.width,_e.height,0,_e.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?H&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,_e.width,_e.height,Te,Pe,_e.data):n.texImage2D(t.TEXTURE_2D,se,xe,_e.width,_e.height,0,Te,Pe,_e.data)}else if(M.isDataArrayTexture)if(Ze){if(dt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ve,xe,ae.width,ae.height,ae.depth),H)if(M.layerUpdates.size>0){const se=Wg(ae.width,ae.height,M.format,M.type);for(const Ae of M.layerUpdates){const ye=ae.data.subarray(Ae*se/ae.data.BYTES_PER_ELEMENT,(Ae+1)*se/ae.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Ae,ae.width,ae.height,1,Te,Pe,ye)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Te,Pe,ae.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,xe,ae.width,ae.height,ae.depth,0,Te,Pe,ae.data);else if(M.isData3DTexture)Ze?(dt&&n.texStorage3D(t.TEXTURE_3D,ve,xe,ae.width,ae.height,ae.depth),H&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Te,Pe,ae.data)):n.texImage3D(t.TEXTURE_3D,0,xe,ae.width,ae.height,ae.depth,0,Te,Pe,ae.data);else if(M.isFramebufferTexture){if(dt)if(Ze)n.texStorage2D(t.TEXTURE_2D,ve,xe,ae.width,ae.height);else{let se=ae.width,Ae=ae.height;for(let ye=0;ye<ve;ye++)n.texImage2D(t.TEXTURE_2D,ye,xe,se,Ae,0,Te,Pe,null),se>>=1,Ae>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in t){const se=t.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),ae.parentNode!==se){se.appendChild(ae),d.add(M),se.onpaint=Ye=>{const It=Ye.changedElements;for(const gt of d)It.includes(gt.image)&&(gt.needsUpdate=!0)},se.requestPaint();return}const Ae=0,ye=t.RGBA,ue=t.RGBA,Ue=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,Ae,ye,ue,Ue,ae),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(qe.length>0){if(Ze&&dt){const se=ot(qe[0]);n.texStorage2D(t.TEXTURE_2D,ve,xe,se.width,se.height)}for(let se=0,Ae=qe.length;se<Ae;se++)_e=qe[se],Ze?H&&n.texSubImage2D(t.TEXTURE_2D,se,0,0,Te,Pe,_e):n.texImage2D(t.TEXTURE_2D,se,xe,Te,Pe,_e);M.generateMipmaps=!1}else if(Ze){if(dt){const se=ot(ae);n.texStorage2D(t.TEXTURE_2D,ve,xe,se.width,se.height)}H&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Te,Pe,ae)}else n.texImage2D(t.TEXTURE_2D,0,xe,Te,Pe,ae);f(M)&&m(oe),Se.__version=me.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function fe(A,M,X){if(M.image.length!==6)return;const oe=B(A,M),ce=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,A.__webglTexture,t.TEXTURE0+X);const me=i.get(ce);if(ce.version!==me.__version||oe===!0){n.activeTexture(t.TEXTURE0+X);const Se=rt.getPrimaries(rt.workingColorSpace),re=M.colorSpace===ar?null:rt.getPrimaries(M.colorSpace),ae=M.colorSpace===ar||Se===re?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);const Te=M.isCompressedTexture||M.image[0].isCompressedTexture,Pe=M.image[0]&&M.image[0].isDataTexture,xe=[];for(let ue=0;ue<6;ue++)!Te&&!Pe?xe[ue]=g(M.image[ue],!0,r.maxCubemapSize):xe[ue]=Pe?M.image[ue].image:M.image[ue],xe[ue]=ge(M,xe[ue]);const _e=xe[0],qe=s.convert(M.format,M.colorSpace),Ze=s.convert(M.type),dt=S(M.internalFormat,qe,Ze,M.normalized,M.colorSpace),H=M.isVideoTexture!==!0,ve=me.__version===void 0||oe===!0,se=ce.dataReady;let Ae=w(M,_e);te(t.TEXTURE_CUBE_MAP,M);let ye;if(Te){H&&ve&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ae,dt,_e.width,_e.height);for(let ue=0;ue<6;ue++){ye=xe[ue].mipmaps;for(let Ue=0;Ue<ye.length;Ue++){const Ye=ye[Ue];M.format!==oi?qe!==null?H?se&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ue,0,0,Ye.width,Ye.height,qe,Ye.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ue,dt,Ye.width,Ye.height,0,Ye.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ue,0,0,Ye.width,Ye.height,qe,Ze,Ye.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ue,dt,Ye.width,Ye.height,0,qe,Ze,Ye.data)}}}else{if(ye=M.mipmaps,H&&ve){ye.length>0&&Ae++;const ue=ot(xe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Ae,dt,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(Pe){H?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,xe[ue].width,xe[ue].height,qe,Ze,xe[ue].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,dt,xe[ue].width,xe[ue].height,0,qe,Ze,xe[ue].data);for(let Ue=0;Ue<ye.length;Ue++){const It=ye[Ue].image[ue].image;H?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ue+1,0,0,It.width,It.height,qe,Ze,It.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ue+1,dt,It.width,It.height,0,qe,Ze,It.data)}}else{H?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,qe,Ze,xe[ue]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,dt,qe,Ze,xe[ue]);for(let Ue=0;Ue<ye.length;Ue++){const Ye=ye[Ue];H?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ue+1,0,0,qe,Ze,Ye.image[ue]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ue+1,dt,qe,Ze,Ye.image[ue])}}}f(M)&&m(t.TEXTURE_CUBE_MAP),me.__version=ce.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function de(A,M,X,oe,ce,me){const Se=s.convert(X.format,X.colorSpace),re=s.convert(X.type),ae=S(X.internalFormat,Se,re,X.normalized,X.colorSpace),Te=i.get(M),Pe=i.get(X);if(Pe.__renderTarget=M,!Te.__hasExternalTextures){const xe=Math.max(1,M.width>>me),_e=Math.max(1,M.height>>me);ce===t.TEXTURE_3D||ce===t.TEXTURE_2D_ARRAY?n.texImage3D(ce,me,ae,xe,_e,M.depth,0,Se,re,null):n.texImage2D(ce,me,ae,xe,_e,0,Se,re,null)}n.bindFramebuffer(t.FRAMEBUFFER,A),je(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,oe,ce,Pe.__webglTexture,0,Xe(M)):(ce===t.TEXTURE_2D||ce>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,oe,ce,Pe.__webglTexture,me),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ce(A,M,X){if(t.bindRenderbuffer(t.RENDERBUFFER,A),M.depthBuffer){const oe=M.depthTexture,ce=oe&&oe.isDepthTexture?oe.type:null,me=T(M.stencilBuffer,ce),Se=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;je(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Xe(M),me,M.width,M.height):X?t.renderbufferStorageMultisample(t.RENDERBUFFER,Xe(M),me,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,me,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,A)}else{const oe=M.textures;for(let ce=0;ce<oe.length;ce++){const me=oe[ce],Se=s.convert(me.format,me.colorSpace),re=s.convert(me.type),ae=S(me.internalFormat,Se,re,me.normalized,me.colorSpace);je(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Xe(M),ae,M.width,M.height):X?t.renderbufferStorageMultisample(t.RENDERBUFFER,Xe(M),ae,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,ae,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Oe(A,M,X){const oe=M.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ce=i.get(M.depthTexture);if(ce.__renderTarget=M,(!ce.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),oe){if(ce.__webglInit===void 0&&(ce.__webglInit=!0,M.depthTexture.addEventListener("dispose",R)),ce.__webglTexture===void 0){ce.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,ce.__webglTexture),te(t.TEXTURE_CUBE_MAP,M.depthTexture);const Te=s.convert(M.depthTexture.format),Pe=s.convert(M.depthTexture.type);let xe;M.depthTexture.format===Wi?xe=t.DEPTH_COMPONENT24:M.depthTexture.format===Vr&&(xe=t.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,xe,M.width,M.height,0,Te,Pe,null)}}else I(M.depthTexture,0);const me=ce.__webglTexture,Se=Xe(M),re=oe?t.TEXTURE_CUBE_MAP_POSITIVE_X+X:t.TEXTURE_2D,ae=M.depthTexture.format===Vr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(M.depthTexture.format===Wi)je(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ae,re,me,0,Se):t.framebufferTexture2D(t.FRAMEBUFFER,ae,re,me,0);else if(M.depthTexture.format===Vr)je(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ae,re,me,0,Se):t.framebufferTexture2D(t.FRAMEBUFFER,ae,re,me,0);else throw new Error("Unknown depthTexture format")}function He(A){const M=i.get(A),X=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const oe=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),oe){const ce=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,oe.removeEventListener("dispose",ce)};oe.addEventListener("dispose",ce),M.__depthDisposeCallback=ce}M.__boundDepthTexture=oe}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(X)for(let oe=0;oe<6;oe++)Oe(M.__webglFramebuffer[oe],A,oe);else{const oe=A.texture.mipmaps;oe&&oe.length>0?Oe(M.__webglFramebuffer[0],A,0):Oe(M.__webglFramebuffer,A,0)}else if(X){M.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[oe]),M.__webglDepthbuffer[oe]===void 0)M.__webglDepthbuffer[oe]=t.createRenderbuffer(),Ce(M.__webglDepthbuffer[oe],A,!1);else{const ce=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=M.__webglDepthbuffer[oe];t.bindRenderbuffer(t.RENDERBUFFER,me),t.framebufferRenderbuffer(t.FRAMEBUFFER,ce,t.RENDERBUFFER,me)}}else{const oe=A.texture.mipmaps;if(oe&&oe.length>0?n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),Ce(M.__webglDepthbuffer,A,!1);else{const ce=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,me),t.framebufferRenderbuffer(t.FRAMEBUFFER,ce,t.RENDERBUFFER,me)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ve(A,M,X){const oe=i.get(A);M!==void 0&&de(oe.__webglFramebuffer,A,A.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),X!==void 0&&He(A)}function Ne(A){const M=A.texture,X=i.get(A),oe=i.get(M);A.addEventListener("dispose",y);const ce=A.textures,me=A.isWebGLCubeRenderTarget===!0,Se=ce.length>1;if(Se||(oe.__webglTexture===void 0&&(oe.__webglTexture=t.createTexture()),oe.__version=M.version,o.memory.textures++),me){X.__webglFramebuffer=[];for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer[re]=[];for(let ae=0;ae<M.mipmaps.length;ae++)X.__webglFramebuffer[re][ae]=t.createFramebuffer()}else X.__webglFramebuffer[re]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer=[];for(let re=0;re<M.mipmaps.length;re++)X.__webglFramebuffer[re]=t.createFramebuffer()}else X.__webglFramebuffer=t.createFramebuffer();if(Se)for(let re=0,ae=ce.length;re<ae;re++){const Te=i.get(ce[re]);Te.__webglTexture===void 0&&(Te.__webglTexture=t.createTexture(),o.memory.textures++)}if(A.samples>0&&je(A)===!1){X.__webglMultisampledFramebuffer=t.createFramebuffer(),X.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let re=0;re<ce.length;re++){const ae=ce[re];X.__webglColorRenderbuffer[re]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,X.__webglColorRenderbuffer[re]);const Te=s.convert(ae.format,ae.colorSpace),Pe=s.convert(ae.type),xe=S(ae.internalFormat,Te,Pe,ae.normalized,ae.colorSpace,A.isXRRenderTarget===!0),_e=Xe(A);t.renderbufferStorageMultisample(t.RENDERBUFFER,_e,xe,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.RENDERBUFFER,X.__webglColorRenderbuffer[re])}t.bindRenderbuffer(t.RENDERBUFFER,null),A.depthBuffer&&(X.__webglDepthRenderbuffer=t.createRenderbuffer(),Ce(X.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(me){n.bindTexture(t.TEXTURE_CUBE_MAP,oe.__webglTexture),te(t.TEXTURE_CUBE_MAP,M);for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0)for(let ae=0;ae<M.mipmaps.length;ae++)de(X.__webglFramebuffer[re][ae],A,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ae);else de(X.__webglFramebuffer[re],A,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);f(M)&&m(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){for(let re=0,ae=ce.length;re<ae;re++){const Te=ce[re],Pe=i.get(Te);let xe=t.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(xe,Pe.__webglTexture),te(xe,Te),de(X.__webglFramebuffer,A,Te,t.COLOR_ATTACHMENT0+re,xe,0),f(Te)&&m(xe)}n.unbindTexture()}else{let re=t.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(re=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(re,oe.__webglTexture),te(re,M),M.mipmaps&&M.mipmaps.length>0)for(let ae=0;ae<M.mipmaps.length;ae++)de(X.__webglFramebuffer[ae],A,M,t.COLOR_ATTACHMENT0,re,ae);else de(X.__webglFramebuffer,A,M,t.COLOR_ATTACHMENT0,re,0);f(M)&&m(re),n.unbindTexture()}A.depthBuffer&&He(A)}function ie(A){const M=A.textures;for(let X=0,oe=M.length;X<oe;X++){const ce=M[X];if(f(ce)){const me=v(A),Se=i.get(ce).__webglTexture;n.bindTexture(me,Se),m(me),n.unbindTexture()}}}const he=[],Ee=[];function N(A){if(A.samples>0){if(je(A)===!1){const M=A.textures,X=A.width,oe=A.height;let ce=t.COLOR_BUFFER_BIT;const me=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(A),re=M.length>1;if(re)for(let Te=0;Te<M.length;Te++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const ae=A.texture.mipmaps;ae&&ae.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Te=0;Te<M.length;Te++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ce|=t.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ce|=t.STENCIL_BUFFER_BIT)),re){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[Te]);const Pe=i.get(M[Te]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Pe,0)}t.blitFramebuffer(0,0,X,oe,0,0,X,oe,ce,t.NEAREST),l===!0&&(he.length=0,Ee.length=0,he.push(t.COLOR_ATTACHMENT0+Te),A.depthBuffer&&A.resolveDepthBuffer===!1&&(he.push(me),Ee.push(me),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ee)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,he))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),re)for(let Te=0;Te<M.length;Te++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.RENDERBUFFER,Se.__webglColorRenderbuffer[Te]);const Pe=i.get(M[Te]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.TEXTURE_2D,Pe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function Xe(A){return Math.min(r.maxSamples,A.samples)}function je(A){const M=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function st(A){const M=o.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function ge(A,M){const X=A.colorSpace,oe=A.format,ce=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||X!==so&&X!==ar&&(rt.getTransfer(X)===pt?(oe!==oi||ce!==Un)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",X)),M}function ot(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=z,this.getTextureUnits=j,this.setTextureUnits=k,this.setTexture2D=I,this.setTexture2DArray=E,this.setTexture3D=D,this.setTextureCube=J,this.rebindTextures=Ve,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=de,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function k2(t,e){function n(i,r=ar){let s;const o=rt.getTransfer(r);if(i===Un)return t.UNSIGNED_BYTE;if(i===cp)return t.UNSIGNED_SHORT_4_4_4_4;if(i===up)return t.UNSIGNED_SHORT_5_5_5_1;if(i===gx)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===_x)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===px)return t.BYTE;if(i===mx)return t.SHORT;if(i===pa)return t.UNSIGNED_SHORT;if(i===lp)return t.INT;if(i===bi)return t.UNSIGNED_INT;if(i===xi)return t.FLOAT;if(i===Bn)return t.HALF_FLOAT;if(i===vx)return t.ALPHA;if(i===xx)return t.RGB;if(i===oi)return t.RGBA;if(i===Wi)return t.DEPTH_COMPONENT;if(i===Vr)return t.DEPTH_STENCIL;if(i===yx)return t.RED;if(i===hp)return t.RED_INTEGER;if(i===Qr)return t.RG;if(i===dp)return t.RG_INTEGER;if(i===fp)return t.RGBA_INTEGER;if(i===Gl||i===Wl||i===jl||i===Xl)if(o===pt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Gl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===jl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Gl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Wl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===jl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ad||i===Cd||i===Rd||i===Pd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ad)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Cd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ld||i===Dd||i===Nd||i===Id||i===Ud||i===yc||i===kd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ld||i===Dd)return o===pt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Nd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Id)return s.COMPRESSED_R11_EAC;if(i===Ud)return s.COMPRESSED_SIGNED_R11_EAC;if(i===yc)return s.COMPRESSED_RG11_EAC;if(i===kd)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Fd||i===Od||i===Bd||i===zd||i===Vd||i===Hd||i===Gd||i===Wd||i===jd||i===Xd||i===qd||i===$d||i===Yd||i===Kd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Fd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Od)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===zd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Vd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Hd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Gd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Wd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===jd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Xd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===qd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$d)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Yd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Kd)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Zd||i===Qd||i===Jd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Zd)return o===pt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ef||i===tf||i===Sc||i===nf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ef)return s.COMPRESSED_RED_RGTC1_EXT;if(i===tf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Sc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===nf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ma?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const F2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O2=`
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

}`;class B2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Cx(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new dn({vertexShader:F2,fragmentShader:O2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new en(new Ra(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class z2 extends Cr{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,_=null;const x=typeof XRWebGLBinding<"u",g=new B2,f={},m=n.getContextAttributes();let v=null,S=null;const T=[],w=[],R=new ze;let y=null;const C=new In;C.viewport=new Nt;const U=new In;U.viewport=new Nt;const L=[C,U],G=new Xw;let z=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let q=T[B];return q===void 0&&(q=new Bu,T[B]=q),q.getTargetRaySpace()},this.getControllerGrip=function(B){let q=T[B];return q===void 0&&(q=new Bu,T[B]=q),q.getGripSpace()},this.getHand=function(B){let q=T[B];return q===void 0&&(q=new Bu,T[B]=q),q.getHandSpace()};function k(B){const q=w.indexOf(B.inputSource);if(q===-1)return;const $=T[q];$!==void 0&&($.update(B.inputSource,B.frame,c||o),$.dispatchEvent({type:B.type,data:B.inputSource}))}function V(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",P);for(let B=0;B<T.length;B++){const q=w[B];q!==null&&(w[B]=null,T[B].disconnect(q))}z=null,j=null,g.reset();for(const B in f)delete f[B];e.setRenderTarget(v),p=null,u=null,d=null,r=null,S=null,te.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){s=B,i.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){a=B,i.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,n)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(B){if(r=B,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",V),r.addEventListener("inputsourceschange",P),m.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let $=null,le=null,fe=null;m.depth&&(fe=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,$=m.stencil?Vr:Wi,le=m.stencil?ma:bi);const de={colorFormat:n.RGBA8,depthFormat:fe,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(de),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new Rn(u.textureWidth,u.textureHeight,{format:oi,type:Un,depthTexture:new oo(u.textureWidth,u.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const $={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,$),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Rn(p.framebufferWidth,p.framebufferHeight,{format:oi,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),te.setContext(r),te.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function P(B){for(let q=0;q<B.removed.length;q++){const $=B.removed[q],le=w.indexOf($);le>=0&&(w[le]=null,T[le].disconnect($))}for(let q=0;q<B.added.length;q++){const $=B.added[q];let le=w.indexOf($);if(le===-1){for(let de=0;de<T.length;de++)if(de>=w.length){w.push($),le=de;break}else if(w[de]===null){w[de]=$,le=de;break}if(le===-1)break}const fe=T[le];fe&&fe.connect($)}}const I=new O,E=new O;function D(B,q,$){I.setFromMatrixPosition(q.matrixWorld),E.setFromMatrixPosition($.matrixWorld);const le=I.distanceTo(E),fe=q.projectionMatrix.elements,de=$.projectionMatrix.elements,Ce=fe[14]/(fe[10]-1),Oe=fe[14]/(fe[10]+1),He=(fe[9]+1)/fe[5],Ve=(fe[9]-1)/fe[5],Ne=(fe[8]-1)/fe[0],ie=(de[8]+1)/de[0],he=Ce*Ne,Ee=Ce*ie,N=le/(-Ne+ie),Xe=N*-Ne;if(q.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(Xe),B.translateZ(N),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),fe[10]===-1)B.projectionMatrix.copy(q.projectionMatrix),B.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const je=Ce+N,st=Oe+N,ge=he-Xe,ot=Ee+(le-Xe),A=He*Oe/st*je,M=Ve*Oe/st*je;B.projectionMatrix.makePerspective(ge,ot,A,M,je,st),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function J(B,q){q===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(q.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(r===null)return;let q=B.near,$=B.far;g.texture!==null&&(g.depthNear>0&&(q=g.depthNear),g.depthFar>0&&($=g.depthFar)),G.near=U.near=C.near=q,G.far=U.far=C.far=$,(z!==G.near||j!==G.far)&&(r.updateRenderState({depthNear:G.near,depthFar:G.far}),z=G.near,j=G.far),G.layers.mask=B.layers.mask|6,C.layers.mask=G.layers.mask&-5,U.layers.mask=G.layers.mask&-3;const le=B.parent,fe=G.cameras;J(G,le);for(let de=0;de<fe.length;de++)J(fe[de],le);fe.length===2?D(G,C,U):G.projectionMatrix.copy(C.projectionMatrix),Y(B,G,le)};function Y(B,q,$){$===null?B.matrix.copy(q.matrixWorld):(B.matrix.copy($.matrixWorld),B.matrix.invert(),B.matrix.multiply(q.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(q.projectionMatrix),B.projectionMatrixInverse.copy(q.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=va*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(B){l=B,u!==null&&(u.fixedFoveation=B),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=B)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(G)},this.getCameraTexture=function(B){return f[B]};let ne=null;function K(B,q){if(h=q.getViewerPose(c||o),_=q,h!==null){const $=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let le=!1;$.length!==G.cameras.length&&(G.cameras.length=0,le=!0);for(let Oe=0;Oe<$.length;Oe++){const He=$[Oe];let Ve=null;if(p!==null)Ve=p.getViewport(He);else{const ie=d.getViewSubImage(u,He);Ve=ie.viewport,Oe===0&&(e.setRenderTargetTextures(S,ie.colorTexture,ie.depthStencilTexture),e.setRenderTarget(S))}let Ne=L[Oe];Ne===void 0&&(Ne=new In,Ne.layers.enable(Oe),Ne.viewport=new Nt,L[Oe]=Ne),Ne.matrix.fromArray(He.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(He.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),Oe===0&&(G.matrix.copy(Ne.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),le===!0&&G.cameras.push(Ne)}const fe=r.enabledFeatures;if(fe&&fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const Oe=d.getDepthInformation($[0]);Oe&&Oe.isValid&&Oe.texture&&g.init(Oe,r.renderState)}if(fe&&fe.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Oe=0;Oe<$.length;Oe++){const He=$[Oe].camera;if(He){let Ve=f[He];Ve||(Ve=new Cx,f[He]=Ve);const Ne=d.getCameraImage(He);Ve.sourceTexture=Ne}}}}for(let $=0;$<T.length;$++){const le=w[$],fe=T[$];le!==null&&fe!==void 0&&fe.update(le,q,c||o)}ne&&ne(B,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),_=null}const te=new Dx;te.setAnimationLoop(K),this.setAnimationLoop=function(B){ne=B},this.dispose=function(){}}}const V2=new Be,Bx=new $e;Bx.set(-1,0,0,0,1,0,0,0,1);function H2(t,e){function n(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,Rx(t)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function r(g,f,m,v,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(g,f):f.isMeshLambertMaterial?(s(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(g,f),d(g,f)):f.isMeshPhongMaterial?(s(g,f),h(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(g,f),u(g,f),f.isMeshPhysicalMaterial&&p(g,f,S)):f.isMeshMatcapMaterial?(s(g,f),_(g,f)):f.isMeshDepthMaterial?s(g,f):f.isMeshDistanceMaterial?(s(g,f),x(g,f)):f.isMeshNormalMaterial?s(g,f):f.isLineBasicMaterial?(o(g,f),f.isLineDashedMaterial&&a(g,f)):f.isPointsMaterial?l(g,f,m,v):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,n(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,n(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===Cn&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,n(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===Cn&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,n(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,n(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const m=e.get(f),v=m.envMap,S=m.envMapRotation;v&&(g.envMap.value=v,g.envMapRotation.value.setFromMatrix4(V2.makeRotationFromEuler(S)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Bx),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,g.aoMapTransform))}function o(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,n(f.map,g.mapTransform))}function a(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,m,v){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*m,g.scale.value=v*.5,f.map&&(g.map.value=f.map,n(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,n(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function h(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function d(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,m){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Cn&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,f){f.matcap&&(g.matcap.value=f.matcap)}function x(g,f){const m=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function G2(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,v){const S=v.program;i.uniformBlockBinding(m,S)}function c(m,v){let S=r[m.id];S===void 0&&(_(m),S=h(m),r[m.id]=S,m.addEventListener("dispose",g));const T=v.program;i.updateUBOMapping(m,T);const w=e.render.frame;s[m.id]!==w&&(u(m),s[m.id]=w)}function h(m){const v=d();m.__bindingPointIndex=v;const S=t.createBuffer(),T=m.__size,w=m.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,T,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,S),S}function d(){for(let m=0;m<a;m++)if(o.indexOf(m)===-1)return o.push(m),m;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){const v=r[m.id],S=m.uniforms,T=m.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let w=0,R=S.length;w<R;w++){const y=Array.isArray(S[w])?S[w]:[S[w]];for(let C=0,U=y.length;C<U;C++){const L=y[C];if(p(L,w,C,T)===!0){const G=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let j=0;for(let k=0;k<z.length;k++){const V=z[k],P=x(V);typeof V=="number"||typeof V=="boolean"?(L.__data[0]=V,t.bufferSubData(t.UNIFORM_BUFFER,G+j,L.__data)):V.isMatrix3?(L.__data[0]=V.elements[0],L.__data[1]=V.elements[1],L.__data[2]=V.elements[2],L.__data[3]=0,L.__data[4]=V.elements[3],L.__data[5]=V.elements[4],L.__data[6]=V.elements[5],L.__data[7]=0,L.__data[8]=V.elements[6],L.__data[9]=V.elements[7],L.__data[10]=V.elements[8],L.__data[11]=0):ArrayBuffer.isView(V)?L.__data.set(new V.constructor(V.buffer,V.byteOffset,L.__data.length)):(V.toArray(L.__data,j),j+=P.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,G,L.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(m,v,S,T){const w=m.value,R=v+"_"+S;if(T[R]===void 0)return typeof w=="number"||typeof w=="boolean"?T[R]=w:ArrayBuffer.isView(w)?T[R]=w.slice():T[R]=w.clone(),!0;{const y=T[R];if(typeof w=="number"||typeof w=="boolean"){if(y!==w)return T[R]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(y.equals(w)===!1)return y.copy(w),!0}}return!1}function _(m){const v=m.uniforms;let S=0;const T=16;for(let R=0,y=v.length;R<y;R++){const C=Array.isArray(v[R])?v[R]:[v[R]];for(let U=0,L=C.length;U<L;U++){const G=C[U],z=Array.isArray(G.value)?G.value:[G.value];for(let j=0,k=z.length;j<k;j++){const V=z[j],P=x(V),I=S%T,E=I%P.boundary,D=I+E;S+=E,D!==0&&T-D<P.storage&&(S+=T-D),G.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=P.storage}}}const w=S%T;return w>0&&(S+=T-w),m.__size=S,m.__cache={},this}function x(m){const v={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(v.boundary=4,v.storage=4):m.isVector2?(v.boundary=8,v.storage=8):m.isVector3||m.isColor?(v.boundary=16,v.storage=12):m.isVector4?(v.boundary=16,v.storage=16):m.isMatrix3?(v.boundary=48,v.storage=48):m.isMatrix4?(v.boundary=64,v.storage=64):m.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(m)?(v.boundary=16,v.storage=m.byteLength):We("WebGLRenderer: Unsupported uniform value type.",m),v}function g(m){const v=m.target;v.removeEventListener("dispose",g);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function f(){for(const m in r)t.deleteBuffer(r[m]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}const W2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let mi=null;function j2(){return mi===null&&(mi=new bw(W2,16,16,Qr,Bn),mi.name="DFG_LUT",mi.minFilter=Yt,mi.magFilter=Yt,mi.wrapS=Fi,mi.wrapT=Fi,mi.generateMipmaps=!1,mi.needsUpdate=!0),mi}class p0{constructor(e={}){const{canvas:n=VM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Un}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;const x=p,g=new Set([fp,dp,hp]),f=new Set([Un,bi,pa,ma,cp,up]),m=new Uint32Array(4),v=new Int32Array(4),S=new O;let T=null,w=null;const R=[],y=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let L=!1,G=null;this._outputColorSpace=jn;let z=0,j=0,k=null,V=-1,P=null;const I=new Nt,E=new Nt;let D=null;const J=new Qe(0);let Y=0,ne=n.width,K=n.height,te=1,B=null,q=null;const $=new Nt(0,0,ne,K),le=new Nt(0,0,ne,K);let fe=!1;const de=new xp;let Ce=!1,Oe=!1;const He=new Be,Ve=new O,Ne=new Nt,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function Ee(){return k===null?te:1}let N=i;function Xe(b,W){return n.getContext(b,W)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${op}`),n.addEventListener("webglcontextlost",ue,!1),n.addEventListener("webglcontextrestored",Ue,!1),n.addEventListener("webglcontextcreationerror",Ye,!1),N===null){const W="webgl2";if(N=Xe(W,b),N===null)throw Xe(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw lt("WebGLRenderer: "+b.message),b}let je,st,ge,ot,A,M,X,oe,ce,me,Se,re,ae,Te,Pe,xe,_e,qe,Ze,dt,H,ve,se;function Ae(){je=new jT(N),je.init(),H=new k2(N,je),st=new FT(N,je,e,H),ge=new I2(N,je),st.reversedDepthBuffer&&u&&ge.buffers.depth.setReversed(!0),ot=new $T(N),A=new y2,M=new U2(N,je,ge,A,st,H,ot),X=new WT(U),oe=new Qw(N),ve=new UT(N,oe),ce=new XT(N,oe,ot,ve),me=new KT(N,ce,oe,ve,ot),qe=new YT(N,st,M),Pe=new OT(A),Se=new x2(U,X,je,st,ve,Pe),re=new H2(U,A),ae=new M2,Te=new C2(je),_e=new IT(U,X,ge,me,_,l),xe=new N2(U,me,st),se=new G2(N,ot,st,ge),Ze=new kT(N,je,ot),dt=new qT(N,je,ot),ot.programs=Se.programs,U.capabilities=st,U.extensions=je,U.properties=A,U.renderLists=ae,U.shadowMap=xe,U.state=ge,U.info=ot}Ae(),x!==Un&&(C=new QT(x,n.width,n.height,r,s));const ye=new z2(U,N);this.xr=ye,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const b=je.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=je.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(b){b!==void 0&&(te=b,this.setSize(ne,K,!1))},this.getSize=function(b){return b.set(ne,K)},this.setSize=function(b,W,ee=!0){if(ye.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}ne=b,K=W,n.width=Math.floor(b*te),n.height=Math.floor(W*te),ee===!0&&(n.style.width=b+"px",n.style.height=W+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,b,W)},this.getDrawingBufferSize=function(b){return b.set(ne*te,K*te).floor()},this.setDrawingBufferSize=function(b,W,ee){ne=b,K=W,te=ee,n.width=Math.floor(b*ee),n.height=Math.floor(W*ee),this.setViewport(0,0,b,W)},this.setEffects=function(b){if(x===Un){lt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let W=0;W<b.length;W++)if(b[W].isOutputPass===!0){We("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy($)},this.setViewport=function(b,W,ee,Z){b.isVector4?$.set(b.x,b.y,b.z,b.w):$.set(b,W,ee,Z),ge.viewport(I.copy($).multiplyScalar(te).round())},this.getScissor=function(b){return b.copy(le)},this.setScissor=function(b,W,ee,Z){b.isVector4?le.set(b.x,b.y,b.z,b.w):le.set(b,W,ee,Z),ge.scissor(E.copy(le).multiplyScalar(te).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(b){ge.setScissorTest(fe=b)},this.setOpaqueSort=function(b){B=b},this.setTransparentSort=function(b){q=b},this.getClearColor=function(b){return b.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor(...arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha(...arguments)},this.clear=function(b=!0,W=!0,ee=!0){let Z=0;if(b){let Q=!1;if(k!==null){const be=k.texture.format;Q=g.has(be)}if(Q){const be=k.texture.type,Le=f.has(be),we=_e.getClearColor(),Ie=_e.getClearAlpha(),ke=we.r,Ke=we.g,tt=we.b;Le?(m[0]=ke,m[1]=Ke,m[2]=tt,m[3]=Ie,N.clearBufferuiv(N.COLOR,0,m)):(v[0]=ke,v[1]=Ke,v[2]=tt,v[3]=Ie,N.clearBufferiv(N.COLOR,0,v))}else Z|=N.COLOR_BUFFER_BIT}W&&(Z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&(Z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&N.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),G=b},this.dispose=function(){n.removeEventListener("webglcontextlost",ue,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",Ye,!1),_e.dispose(),ae.dispose(),Te.dispose(),A.dispose(),X.dispose(),me.dispose(),ve.dispose(),se.dispose(),Se.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",Lp),ye.removeEventListener("sessionend",Dp),Rr.stop()};function ue(b){b.preventDefault(),hg("WebGLRenderer: Context Lost."),L=!0}function Ue(){hg("WebGLRenderer: Context Restored."),L=!1;const b=ot.autoReset,W=xe.enabled,ee=xe.autoUpdate,Z=xe.needsUpdate,Q=xe.type;Ae(),ot.autoReset=b,xe.enabled=W,xe.autoUpdate=ee,xe.needsUpdate=Z,xe.type=Q}function Ye(b){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function It(b){const W=b.target;W.removeEventListener("dispose",It),gt(W)}function gt(b){Ti(b),A.remove(b)}function Ti(b){const W=A.get(b).programs;W!==void 0&&(W.forEach(function(ee){Se.releaseProgram(ee)}),b.isShaderMaterial&&Se.releaseShaderCache(b))}this.renderBufferDirect=function(b,W,ee,Z,Q,be){W===null&&(W=ie);const Le=Q.isMesh&&Q.matrixWorld.determinant()<0,we=n1(b,W,ee,Z,Q);ge.setMaterial(Z,Le);let Ie=ee.index,ke=1;if(Z.wireframe===!0){if(Ie=ce.getWireframeAttribute(ee),Ie===void 0)return;ke=2}const Ke=ee.drawRange,tt=ee.attributes.position;let Fe=Ke.start*ke,_t=(Ke.start+Ke.count)*ke;be!==null&&(Fe=Math.max(Fe,be.start*ke),_t=Math.min(_t,(be.start+be.count)*ke)),Ie!==null?(Fe=Math.max(Fe,0),_t=Math.min(_t,Ie.count)):tt!=null&&(Fe=Math.max(Fe,0),_t=Math.min(_t,tt.count));const Ut=_t-Fe;if(Ut<0||Ut===1/0)return;ve.setup(Q,Z,we,ee,Ie);let Lt,xt=Ze;if(Ie!==null&&(Lt=oe.get(Ie),xt=dt,xt.setIndex(Lt)),Q.isMesh)Z.wireframe===!0?(ge.setLineWidth(Z.wireframeLinewidth*Ee()),xt.setMode(N.LINES)):xt.setMode(N.TRIANGLES);else if(Q.isLine){let rn=Z.linewidth;rn===void 0&&(rn=1),ge.setLineWidth(rn*Ee()),Q.isLineSegments?xt.setMode(N.LINES):Q.isLineLoop?xt.setMode(N.LINE_LOOP):xt.setMode(N.LINE_STRIP)}else Q.isPoints?xt.setMode(N.POINTS):Q.isSprite&&xt.setMode(N.TRIANGLES);if(Q.isBatchedMesh)if(je.get("WEBGL_multi_draw"))xt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const rn=Q._multiDrawStarts,Re=Q._multiDrawCounts,Pn=Q._multiDrawCount,ct=Ie?oe.get(Ie).bytesPerElement:1,Gn=A.get(Z).currentProgram.getUniforms();for(let di=0;di<Pn;di++)Gn.setValue(N,"_gl_DrawID",di),xt.render(rn[di]/ct,Re[di])}else if(Q.isInstancedMesh)xt.renderInstances(Fe,Ut,Q.count);else if(ee.isInstancedBufferGeometry){const rn=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Re=Math.min(ee.instanceCount,rn);xt.renderInstances(Fe,Ut,Re)}else xt.render(Fe,Ut)};function hi(b,W,ee){b.transparent===!0&&b.side===un&&b.forceSinglePass===!1?(b.side=Cn,b.needsUpdate=!0,Da(b,W,ee),b.side=Mr,b.needsUpdate=!0,Da(b,W,ee),b.side=un):Da(b,W,ee)}this.compile=function(b,W,ee=null){ee===null&&(ee=b),w=Te.get(ee),w.init(W),y.push(w),ee.traverseVisible(function(Q){Q.isLight&&Q.layers.test(W.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),b!==ee&&b.traverseVisible(function(Q){Q.isLight&&Q.layers.test(W.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),w.setupLights();const Z=new Set;return b.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const be=Q.material;if(be)if(Array.isArray(be))for(let Le=0;Le<be.length;Le++){const we=be[Le];hi(we,ee,Q),Z.add(we)}else hi(be,ee,Q),Z.add(be)}),w=y.pop(),Z},this.compileAsync=function(b,W,ee=null){const Z=this.compile(b,W,ee);return new Promise(Q=>{function be(){if(Z.forEach(function(Le){A.get(Le).currentProgram.isReady()&&Z.delete(Le)}),Z.size===0){Q(b);return}setTimeout(be,10)}je.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let nu=null;function e1(b){nu&&nu(b)}function Lp(){Rr.stop()}function Dp(){Rr.start()}const Rr=new Dx;Rr.setAnimationLoop(e1),typeof self<"u"&&Rr.setContext(self),this.setAnimationLoop=function(b){nu=b,ye.setAnimationLoop(b),b===null?Rr.stop():Rr.start()},ye.addEventListener("sessionstart",Lp),ye.addEventListener("sessionend",Dp),this.render=function(b,W){if(W!==void 0&&W.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;G!==null&&G.renderStart(b,W);const ee=ye.enabled===!0&&ye.isPresenting===!0,Z=C!==null&&(k===null||ee)&&C.begin(U,k);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(W),W=ye.getCamera()),b.isScene===!0&&b.onBeforeRender(U,b,W,k),w=Te.get(b,y.length),w.init(W),w.state.textureUnits=M.getTextureUnits(),y.push(w),He.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),de.setFromProjectionMatrix(He,yi,W.reversedDepth),Oe=this.localClippingEnabled,Ce=Pe.init(this.clippingPlanes,Oe),T=ae.get(b,R.length),T.init(),R.push(T),ye.enabled===!0&&ye.isPresenting===!0){const Le=U.xr.getDepthSensingMesh();Le!==null&&iu(Le,W,-1/0,U.sortObjects)}iu(b,W,0,U.sortObjects),T.finish(),U.sortObjects===!0&&T.sort(B,q),he=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,he&&_e.addToRenderList(T,b),this.info.render.frame++,Ce===!0&&Pe.beginShadows();const Q=w.state.shadowsArray;if(xe.render(Q,b,W),Ce===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Z&&C.hasRenderPass())===!1){const Le=T.opaque,we=T.transmissive;if(w.setupLights(),W.isArrayCamera){const Ie=W.cameras;if(we.length>0)for(let ke=0,Ke=Ie.length;ke<Ke;ke++){const tt=Ie[ke];Ip(Le,we,b,tt)}he&&_e.render(b);for(let ke=0,Ke=Ie.length;ke<Ke;ke++){const tt=Ie[ke];Np(T,b,tt,tt.viewport)}}else we.length>0&&Ip(Le,we,b,W),he&&_e.render(b),Np(T,b,W)}k!==null&&j===0&&(M.updateMultisampleRenderTarget(k),M.updateRenderTargetMipmap(k)),Z&&C.end(U),b.isScene===!0&&b.onAfterRender(U,b,W),ve.resetDefaultState(),V=-1,P=null,y.pop(),y.length>0?(w=y[y.length-1],M.setTextureUnits(w.state.textureUnits),Ce===!0&&Pe.setGlobalState(U.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,G!==null&&G.renderEnd()};function iu(b,W,ee,Z){if(b.visible===!1)return;if(b.layers.test(W.layers)){if(b.isGroup)ee=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(W);else if(b.isLightProbeGrid)w.pushLightProbeGrid(b);else if(b.isLight)w.pushLight(b),b.castShadow&&w.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||de.intersectsSprite(b)){Z&&Ne.setFromMatrixPosition(b.matrixWorld).applyMatrix4(He);const Le=me.update(b),we=b.material;we.visible&&T.push(b,Le,we,ee,Ne.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||de.intersectsObject(b))){const Le=me.update(b),we=b.material;if(Z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ne.copy(b.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Ne.copy(Le.boundingSphere.center)),Ne.applyMatrix4(b.matrixWorld).applyMatrix4(He)),Array.isArray(we)){const Ie=Le.groups;for(let ke=0,Ke=Ie.length;ke<Ke;ke++){const tt=Ie[ke],Fe=we[tt.materialIndex];Fe&&Fe.visible&&T.push(b,Le,Fe,ee,Ne.z,tt)}}else we.visible&&T.push(b,Le,we,ee,Ne.z,null)}}const be=b.children;for(let Le=0,we=be.length;Le<we;Le++)iu(be[Le],W,ee,Z)}function Np(b,W,ee,Z){const{opaque:Q,transmissive:be,transparent:Le}=b;w.setupLightsView(ee),Ce===!0&&Pe.setGlobalState(U.clippingPlanes,ee),Z&&ge.viewport(I.copy(Z)),Q.length>0&&La(Q,W,ee),be.length>0&&La(be,W,ee),Le.length>0&&La(Le,W,ee),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Ip(b,W,ee,Z){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[Z.id]===void 0){const Fe=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[Z.id]=new Rn(1,1,{generateMipmaps:!0,type:Fe?Bn:Un,minFilter:ur,samples:Math.max(4,st.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace})}const be=w.state.transmissionRenderTarget[Z.id],Le=Z.viewport||I;be.setSize(Le.z*U.transmissionResolutionScale,Le.w*U.transmissionResolutionScale);const we=U.getRenderTarget(),Ie=U.getActiveCubeFace(),ke=U.getActiveMipmapLevel();U.setRenderTarget(be),U.getClearColor(J),Y=U.getClearAlpha(),Y<1&&U.setClearColor(16777215,.5),U.clear(),he&&_e.render(ee);const Ke=U.toneMapping;U.toneMapping=Ei;const tt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),w.setupLightsView(Z),Ce===!0&&Pe.setGlobalState(U.clippingPlanes,Z),La(b,ee,Z),M.updateMultisampleRenderTarget(be),M.updateRenderTargetMipmap(be),je.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let _t=0,Ut=W.length;_t<Ut;_t++){const Lt=W[_t],{object:xt,geometry:rn,material:Re,group:Pn}=Lt;if(Re.side===un&&xt.layers.test(Z.layers)){const ct=Re.side;Re.side=Cn,Re.needsUpdate=!0,Up(xt,ee,Z,rn,Re,Pn),Re.side=ct,Re.needsUpdate=!0,Fe=!0}}Fe===!0&&(M.updateMultisampleRenderTarget(be),M.updateRenderTargetMipmap(be))}U.setRenderTarget(we,Ie,ke),U.setClearColor(J,Y),tt!==void 0&&(Z.viewport=tt),U.toneMapping=Ke}function La(b,W,ee){const Z=W.isScene===!0?W.overrideMaterial:null;for(let Q=0,be=b.length;Q<be;Q++){const Le=b[Q],{object:we,geometry:Ie,group:ke}=Le;let Ke=Le.material;Ke.allowOverride===!0&&Z!==null&&(Ke=Z),we.layers.test(ee.layers)&&Up(we,W,ee,Ie,Ke,ke)}}function Up(b,W,ee,Z,Q,be){b.onBeforeRender(U,W,ee,Z,Q,be),b.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Q.onBeforeRender(U,W,ee,Z,b,be),Q.transparent===!0&&Q.side===un&&Q.forceSinglePass===!1?(Q.side=Cn,Q.needsUpdate=!0,U.renderBufferDirect(ee,W,Z,Q,b,be),Q.side=Mr,Q.needsUpdate=!0,U.renderBufferDirect(ee,W,Z,Q,b,be),Q.side=un):U.renderBufferDirect(ee,W,Z,Q,b,be),b.onAfterRender(U,W,ee,Z,Q,be)}function Da(b,W,ee){W.isScene!==!0&&(W=ie);const Z=A.get(b),Q=w.state.lights,be=w.state.shadowsArray,Le=Q.state.version,we=Se.getParameters(b,Q.state,be,W,ee,w.state.lightProbeGridArray),Ie=Se.getProgramCacheKey(we);let ke=Z.programs;Z.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?W.environment:null,Z.fog=W.fog;const Ke=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;Z.envMap=X.get(b.envMap||Z.environment,Ke),Z.envMapRotation=Z.environment!==null&&b.envMap===null?W.environmentRotation:b.envMapRotation,ke===void 0&&(b.addEventListener("dispose",It),ke=new Map,Z.programs=ke);let tt=ke.get(Ie);if(tt!==void 0){if(Z.currentProgram===tt&&Z.lightsStateVersion===Le)return Fp(b,we),tt}else we.uniforms=Se.getUniforms(b),G!==null&&b.isNodeMaterial&&G.build(b,ee,we),b.onBeforeCompile(we,U),tt=Se.acquireProgram(we,Ie),ke.set(Ie,tt),Z.uniforms=we.uniforms;const Fe=Z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Fe.clippingPlanes=Pe.uniform),Fp(b,we),Z.needsLights=r1(b),Z.lightsStateVersion=Le,Z.needsLights&&(Fe.ambientLightColor.value=Q.state.ambient,Fe.lightProbe.value=Q.state.probe,Fe.directionalLights.value=Q.state.directional,Fe.directionalLightShadows.value=Q.state.directionalShadow,Fe.spotLights.value=Q.state.spot,Fe.spotLightShadows.value=Q.state.spotShadow,Fe.rectAreaLights.value=Q.state.rectArea,Fe.ltc_1.value=Q.state.rectAreaLTC1,Fe.ltc_2.value=Q.state.rectAreaLTC2,Fe.pointLights.value=Q.state.point,Fe.pointLightShadows.value=Q.state.pointShadow,Fe.hemisphereLights.value=Q.state.hemi,Fe.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Fe.spotLightMatrix.value=Q.state.spotLightMatrix,Fe.spotLightMap.value=Q.state.spotLightMap,Fe.pointShadowMatrix.value=Q.state.pointShadowMatrix),Z.lightProbeGrid=w.state.lightProbeGridArray.length>0,Z.currentProgram=tt,Z.uniformsList=null,tt}function kp(b){if(b.uniformsList===null){const W=b.currentProgram.getUniforms();b.uniformsList=ql.seqWithValue(W.seq,b.uniforms)}return b.uniformsList}function Fp(b,W){const ee=A.get(b);ee.outputColorSpace=W.outputColorSpace,ee.batching=W.batching,ee.batchingColor=W.batchingColor,ee.instancing=W.instancing,ee.instancingColor=W.instancingColor,ee.instancingMorph=W.instancingMorph,ee.skinning=W.skinning,ee.morphTargets=W.morphTargets,ee.morphNormals=W.morphNormals,ee.morphColors=W.morphColors,ee.morphTargetsCount=W.morphTargetsCount,ee.numClippingPlanes=W.numClippingPlanes,ee.numIntersection=W.numClipIntersection,ee.vertexAlphas=W.vertexAlphas,ee.vertexTangents=W.vertexTangents,ee.toneMapping=W.toneMapping}function t1(b,W){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;S.setFromMatrixPosition(W.matrixWorld);for(let ee=0,Z=b.length;ee<Z;ee++){const Q=b[ee];if(Q.texture!==null&&Q.boundingBox.containsPoint(S))return Q}return null}function n1(b,W,ee,Z,Q){W.isScene!==!0&&(W=ie),M.resetTextureUnits();const be=W.fog,Le=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?W.environment:null,we=k===null?U.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:rt.workingColorSpace,Ie=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,ke=X.get(Z.envMap||Le,Ie),Ke=Z.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,tt=!!ee.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Fe=!!ee.morphAttributes.position,_t=!!ee.morphAttributes.normal,Ut=!!ee.morphAttributes.color;let Lt=Ei;Z.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Lt=U.toneMapping);const xt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,rn=xt!==void 0?xt.length:0,Re=A.get(Z),Pn=w.state.lights;if(Ce===!0&&(Oe===!0||b!==P)){const St=b===P&&Z.id===V;Pe.setState(Z,b,St)}let ct=!1;Z.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==Pn.state.version||Re.outputColorSpace!==we||Q.isBatchedMesh&&Re.batching===!1||!Q.isBatchedMesh&&Re.batching===!0||Q.isBatchedMesh&&Re.batchingColor===!0&&Q.colorTexture===null||Q.isBatchedMesh&&Re.batchingColor===!1&&Q.colorTexture!==null||Q.isInstancedMesh&&Re.instancing===!1||!Q.isInstancedMesh&&Re.instancing===!0||Q.isSkinnedMesh&&Re.skinning===!1||!Q.isSkinnedMesh&&Re.skinning===!0||Q.isInstancedMesh&&Re.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Re.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Re.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Re.instancingMorph===!1&&Q.morphTexture!==null||Re.envMap!==ke||Z.fog===!0&&Re.fog!==be||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==Pe.numPlanes||Re.numIntersection!==Pe.numIntersection)||Re.vertexAlphas!==Ke||Re.vertexTangents!==tt||Re.morphTargets!==Fe||Re.morphNormals!==_t||Re.morphColors!==Ut||Re.toneMapping!==Lt||Re.morphTargetsCount!==rn||!!Re.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ct=!0):(ct=!0,Re.__version=Z.version);let Gn=Re.currentProgram;ct===!0&&(Gn=Da(Z,W,Q),G&&Z.isNodeMaterial&&G.onUpdateProgram(Z,Gn,Re));let di=!1,Xi=!1,ns=!1;const yt=Gn.getUniforms(),kt=Re.uniforms;if(ge.useProgram(Gn.program)&&(di=!0,Xi=!0,ns=!0),Z.id!==V&&(V=Z.id,Xi=!0),Re.needsLights){const St=t1(w.state.lightProbeGridArray,Q);Re.lightProbeGrid!==St&&(Re.lightProbeGrid=St,Xi=!0)}if(di||P!==b){ge.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),yt.setValue(N,"projectionMatrix",b.projectionMatrix),yt.setValue(N,"viewMatrix",b.matrixWorldInverse);const $i=yt.map.cameraPosition;$i!==void 0&&$i.setValue(N,Ve.setFromMatrixPosition(b.matrixWorld)),st.logarithmicDepthBuffer&&yt.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&yt.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),P!==b&&(P=b,Xi=!0,ns=!0)}if(Re.needsLights&&(Pn.state.directionalShadowMap.length>0&&yt.setValue(N,"directionalShadowMap",Pn.state.directionalShadowMap,M),Pn.state.spotShadowMap.length>0&&yt.setValue(N,"spotShadowMap",Pn.state.spotShadowMap,M),Pn.state.pointShadowMap.length>0&&yt.setValue(N,"pointShadowMap",Pn.state.pointShadowMap,M)),Q.isSkinnedMesh){yt.setOptional(N,Q,"bindMatrix"),yt.setOptional(N,Q,"bindMatrixInverse");const St=Q.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),yt.setValue(N,"boneTexture",St.boneTexture,M))}Q.isBatchedMesh&&(yt.setOptional(N,Q,"batchingTexture"),yt.setValue(N,"batchingTexture",Q._matricesTexture,M),yt.setOptional(N,Q,"batchingIdTexture"),yt.setValue(N,"batchingIdTexture",Q._indirectTexture,M),yt.setOptional(N,Q,"batchingColorTexture"),Q._colorsTexture!==null&&yt.setValue(N,"batchingColorTexture",Q._colorsTexture,M));const qi=ee.morphAttributes;if((qi.position!==void 0||qi.normal!==void 0||qi.color!==void 0)&&qe.update(Q,ee,Gn),(Xi||Re.receiveShadow!==Q.receiveShadow)&&(Re.receiveShadow=Q.receiveShadow,yt.setValue(N,"receiveShadow",Q.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&W.environment!==null&&(kt.envMapIntensity.value=W.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=j2()),Xi){if(yt.setValue(N,"toneMappingExposure",U.toneMappingExposure),Re.needsLights&&i1(kt,ns),be&&Z.fog===!0&&re.refreshFogUniforms(kt,be),re.refreshMaterialUniforms(kt,Z,te,K,w.state.transmissionRenderTarget[b.id]),Re.needsLights&&Re.lightProbeGrid){const St=Re.lightProbeGrid;kt.probesSH.value=St.texture,kt.probesMin.value.copy(St.boundingBox.min),kt.probesMax.value.copy(St.boundingBox.max),kt.probesResolution.value.copy(St.resolution)}ql.upload(N,kp(Re),kt,M)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ql.upload(N,kp(Re),kt,M),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&yt.setValue(N,"center",Q.center),yt.setValue(N,"modelViewMatrix",Q.modelViewMatrix),yt.setValue(N,"normalMatrix",Q.normalMatrix),yt.setValue(N,"modelMatrix",Q.matrixWorld),Z.uniformsGroups!==void 0){const St=Z.uniformsGroups;for(let $i=0,is=St.length;$i<is;$i++){const Op=St[$i];se.update(Op,Gn),se.bind(Op,Gn)}}return Gn}function i1(b,W){b.ambientLightColor.needsUpdate=W,b.lightProbe.needsUpdate=W,b.directionalLights.needsUpdate=W,b.directionalLightShadows.needsUpdate=W,b.pointLights.needsUpdate=W,b.pointLightShadows.needsUpdate=W,b.spotLights.needsUpdate=W,b.spotLightShadows.needsUpdate=W,b.rectAreaLights.needsUpdate=W,b.hemisphereLights.needsUpdate=W}function r1(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(b,W,ee){const Z=A.get(b);Z.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),A.get(b.texture).__webglTexture=W,A.get(b.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:ee,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,W){const ee=A.get(b);ee.__webglFramebuffer=W,ee.__useDefaultFramebuffer=W===void 0};const s1=N.createFramebuffer();this.setRenderTarget=function(b,W=0,ee=0){k=b,z=W,j=ee;let Z=null,Q=!1,be=!1;if(b){const we=A.get(b);if(we.__useDefaultFramebuffer!==void 0){ge.bindFramebuffer(N.FRAMEBUFFER,we.__webglFramebuffer),I.copy(b.viewport),E.copy(b.scissor),D=b.scissorTest,ge.viewport(I),ge.scissor(E),ge.setScissorTest(D),V=-1;return}else if(we.__webglFramebuffer===void 0)M.setupRenderTarget(b);else if(we.__hasExternalTextures)M.rebindTextures(b,A.get(b.texture).__webglTexture,A.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ke=b.depthTexture;if(we.__boundDepthTexture!==Ke){if(Ke!==null&&A.has(Ke)&&(b.width!==Ke.image.width||b.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(b)}}const Ie=b.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(be=!0);const ke=A.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ke[W])?Z=ke[W][ee]:Z=ke[W],Q=!0):b.samples>0&&M.useMultisampledRTT(b)===!1?Z=A.get(b).__webglMultisampledFramebuffer:Array.isArray(ke)?Z=ke[ee]:Z=ke,I.copy(b.viewport),E.copy(b.scissor),D=b.scissorTest}else I.copy($).multiplyScalar(te).floor(),E.copy(le).multiplyScalar(te).floor(),D=fe;if(ee!==0&&(Z=s1),ge.bindFramebuffer(N.FRAMEBUFFER,Z)&&ge.drawBuffers(b,Z),ge.viewport(I),ge.scissor(E),ge.setScissorTest(D),Q){const we=A.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+W,we.__webglTexture,ee)}else if(be){const we=W;for(let Ie=0;Ie<b.textures.length;Ie++){const ke=A.get(b.textures[Ie]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ie,ke.__webglTexture,ee,we)}}else if(b!==null&&ee!==0){const we=A.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,we.__webglTexture,ee)}V=-1},this.readRenderTargetPixels=function(b,W,ee,Z,Q,be,Le,we=0){if(!(b&&b.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=A.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Le!==void 0&&(Ie=Ie[Le]),Ie){ge.bindFramebuffer(N.FRAMEBUFFER,Ie);try{const ke=b.textures[we],Ke=ke.format,tt=ke.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+we),!st.textureFormatReadable(Ke)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!st.textureTypeReadable(tt)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=b.width-Z&&ee>=0&&ee<=b.height-Q&&N.readPixels(W,ee,Z,Q,H.convert(Ke),H.convert(tt),be)}finally{const ke=k!==null?A.get(k).__webglFramebuffer:null;ge.bindFramebuffer(N.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(b,W,ee,Z,Q,be,Le,we=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=A.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Le!==void 0&&(Ie=Ie[Le]),Ie)if(W>=0&&W<=b.width-Z&&ee>=0&&ee<=b.height-Q){ge.bindFramebuffer(N.FRAMEBUFFER,Ie);const ke=b.textures[we],Ke=ke.format,tt=ke.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+we),!st.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!st.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Fe),N.bufferData(N.PIXEL_PACK_BUFFER,be.byteLength,N.STREAM_READ),N.readPixels(W,ee,Z,Q,H.convert(Ke),H.convert(tt),0);const _t=k!==null?A.get(k).__webglFramebuffer:null;ge.bindFramebuffer(N.FRAMEBUFFER,_t);const Ut=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await HM(N,Ut,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Fe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,be),N.deleteBuffer(Fe),N.deleteSync(Ut),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,W=null,ee=0){const Z=Math.pow(2,-ee),Q=Math.floor(b.image.width*Z),be=Math.floor(b.image.height*Z),Le=W!==null?W.x:0,we=W!==null?W.y:0;M.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,ee,0,0,Le,we,Q,be),ge.unbindTexture()};const o1=N.createFramebuffer(),a1=N.createFramebuffer();this.copyTextureToTexture=function(b,W,ee=null,Z=null,Q=0,be=0){let Le,we,Ie,ke,Ke,tt,Fe,_t,Ut;const Lt=b.isCompressedTexture?b.mipmaps[be]:b.image;if(ee!==null)Le=ee.max.x-ee.min.x,we=ee.max.y-ee.min.y,Ie=ee.isBox3?ee.max.z-ee.min.z:1,ke=ee.min.x,Ke=ee.min.y,tt=ee.isBox3?ee.min.z:0;else{const kt=Math.pow(2,-Q);Le=Math.floor(Lt.width*kt),we=Math.floor(Lt.height*kt),b.isDataArrayTexture?Ie=Lt.depth:b.isData3DTexture?Ie=Math.floor(Lt.depth*kt):Ie=1,ke=0,Ke=0,tt=0}Z!==null?(Fe=Z.x,_t=Z.y,Ut=Z.z):(Fe=0,_t=0,Ut=0);const xt=H.convert(W.format),rn=H.convert(W.type);let Re;W.isData3DTexture?(M.setTexture3D(W,0),Re=N.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(M.setTexture2DArray(W,0),Re=N.TEXTURE_2D_ARRAY):(M.setTexture2D(W,0),Re=N.TEXTURE_2D),ge.activeTexture(N.TEXTURE0),ge.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,W.flipY),ge.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),ge.pixelStorei(N.UNPACK_ALIGNMENT,W.unpackAlignment);const Pn=ge.getParameter(N.UNPACK_ROW_LENGTH),ct=ge.getParameter(N.UNPACK_IMAGE_HEIGHT),Gn=ge.getParameter(N.UNPACK_SKIP_PIXELS),di=ge.getParameter(N.UNPACK_SKIP_ROWS),Xi=ge.getParameter(N.UNPACK_SKIP_IMAGES);ge.pixelStorei(N.UNPACK_ROW_LENGTH,Lt.width),ge.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Lt.height),ge.pixelStorei(N.UNPACK_SKIP_PIXELS,ke),ge.pixelStorei(N.UNPACK_SKIP_ROWS,Ke),ge.pixelStorei(N.UNPACK_SKIP_IMAGES,tt);const ns=b.isDataArrayTexture||b.isData3DTexture,yt=W.isDataArrayTexture||W.isData3DTexture;if(b.isDepthTexture){const kt=A.get(b),qi=A.get(W),St=A.get(kt.__renderTarget),$i=A.get(qi.__renderTarget);ge.bindFramebuffer(N.READ_FRAMEBUFFER,St.__webglFramebuffer),ge.bindFramebuffer(N.DRAW_FRAMEBUFFER,$i.__webglFramebuffer);for(let is=0;is<Ie;is++)ns&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,A.get(b).__webglTexture,Q,tt+is),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,A.get(W).__webglTexture,be,Ut+is)),N.blitFramebuffer(ke,Ke,Le,we,Fe,_t,Le,we,N.DEPTH_BUFFER_BIT,N.NEAREST);ge.bindFramebuffer(N.READ_FRAMEBUFFER,null),ge.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(Q!==0||b.isRenderTargetTexture||A.has(b)){const kt=A.get(b),qi=A.get(W);ge.bindFramebuffer(N.READ_FRAMEBUFFER,o1),ge.bindFramebuffer(N.DRAW_FRAMEBUFFER,a1);for(let St=0;St<Ie;St++)ns?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,kt.__webglTexture,Q,tt+St):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,kt.__webglTexture,Q),yt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,qi.__webglTexture,be,Ut+St):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,qi.__webglTexture,be),Q!==0?N.blitFramebuffer(ke,Ke,Le,we,Fe,_t,Le,we,N.COLOR_BUFFER_BIT,N.NEAREST):yt?N.copyTexSubImage3D(Re,be,Fe,_t,Ut+St,ke,Ke,Le,we):N.copyTexSubImage2D(Re,be,Fe,_t,ke,Ke,Le,we);ge.bindFramebuffer(N.READ_FRAMEBUFFER,null),ge.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else yt?b.isDataTexture||b.isData3DTexture?N.texSubImage3D(Re,be,Fe,_t,Ut,Le,we,Ie,xt,rn,Lt.data):W.isCompressedArrayTexture?N.compressedTexSubImage3D(Re,be,Fe,_t,Ut,Le,we,Ie,xt,Lt.data):N.texSubImage3D(Re,be,Fe,_t,Ut,Le,we,Ie,xt,rn,Lt):b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,be,Fe,_t,Le,we,xt,rn,Lt.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,be,Fe,_t,Lt.width,Lt.height,xt,Lt.data):N.texSubImage2D(N.TEXTURE_2D,be,Fe,_t,Le,we,xt,rn,Lt);ge.pixelStorei(N.UNPACK_ROW_LENGTH,Pn),ge.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ct),ge.pixelStorei(N.UNPACK_SKIP_PIXELS,Gn),ge.pixelStorei(N.UNPACK_SKIP_ROWS,di),ge.pixelStorei(N.UNPACK_SKIP_IMAGES,Xi),be===0&&W.generateMipmaps&&N.generateMipmap(Re),ge.unbindTexture()},this.initRenderTarget=function(b){A.get(b).__webglFramebuffer===void 0&&M.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?M.setTextureCube(b,0):b.isData3DTexture?M.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?M.setTexture2DArray(b,0):M.setTexture2D(b,0),ge.unbindTexture()},this.resetState=function(){z=0,j=0,k=null,ge.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),n.unpackColorSpace=rt._getUnpackColorSpace()}}const mh=t=>t.cell+2*t.pad;function X2(t,e){const n=document.createElement("canvas");n.width=t.width,n.height=t.height,n.getContext("2d").drawImage(t,0,0);const i=[n];let r=n;for(let s=0;s<e;s++){const o=r.width,a=r.height,l=o>>1,c=a>>1;if(l<1||c<1)break;const h=r.getContext("2d").getImageData(0,0,o,a).data,d=document.createElement("canvas");d.width=l,d.height=c;const u=d.getContext("2d"),p=u.createImageData(l,c),_=p.data;for(let x=0;x<c;x++)for(let g=0;g<l;g++){const f=g*2,v=(x*2*o+f)*4,S=v+4,T=v+o*4,w=T+4,R=(x*l+g)*4;for(let y=0;y<4;y++)_[R+y]=h[v+y]+h[S+y]+h[T+y]+h[w+y]>>2}u.putImageData(p,0,0),i.push(d),r=d}return i}class Jc{constructor(e,n,i){this.texture=e,this.data=n,this.pngUrl=i}static async load(e=cn("atlas.png"),n=cn("atlas.json")){const i=await(await fetch(n)).json(),r={...i,pad:i.pad??0,mipLevels:i.mipLevels??1},s=await new Promise((l,c)=>{const h=new Image;h.crossOrigin="anonymous",h.onload=()=>l(h),h.onerror=c,h.src=e}),o=X2(s,Math.max(0,r.mipLevels-1)),a=new Zt(o[0]);return a.mipmaps=o,a.magFilter=Mt,a.minFilter=ur,a.generateMipmaps=!1,a.flipY=!1,a.anisotropy=8,a.needsUpdate=!0,new Jc(a,r,e)}cssBackground(e,n){const i=this.data.tiles[e];if(i===void 0)return null;const{cell:r,cols:s,pad:o,size:a}=this.data,l=mh(this.data),c=i%s,h=Math.floor(i/s),d=n/r;return{backgroundImage:`url(${this.pngUrl})`,backgroundSize:`${a.w*d}px ${a.h*d}px`,backgroundPosition:`-${(c*l+o)*d}px -${(h*l+o)*d}px`,imageRendering:"pixelated"}}cssCrop(e,n,i,r,s,o,a){const l=this.data.tiles[e];if(l===void 0)return null;const{cell:c,cols:h,pad:d,size:u}=this.data,p=mh(this.data),_=l%h,x=Math.floor(l/h),g=Math.min(n,r),f=Math.min(i,s),m=Math.abs(r-n)||16,v=Math.abs(s-i)||16,S=_*p+d+g/16*c,T=x*p+d+f/16*c,w=o/(m/16*c),R=a/(v/16*c);return{backgroundImage:`url(${this.pngUrl})`,backgroundSize:`${u.w*w}px ${u.h*R}px`,backgroundPosition:`-${S*w}px -${T*R}px`,backgroundRepeat:"no-repeat",imageRendering:"pixelated"}}get whiteIndex(){return this.data.white}getRawData(){return this.data}tileIndex(e){return this.data.tiles[e]}uv(e){const{cols:n,cell:i,pad:r,size:s}=this.data,o=mh(this.data),a=e%n,l=Math.floor(e/n),c=a*o+r,h=l*o+r;return[c/s.w,h/s.h,(c+i)/s.w,(h+i)/s.h]}}function Tt(t){let e=t;const n=e.indexOf(":");n!==-1&&(e=e.slice(n+1));const i=e.indexOf("[");return i!==-1&&(e=e.slice(0,i)),e}const Sp={white:[233,236,236],orange:[240,118,19],magenta:[199,78,189],light_blue:[58,175,217],yellow:[248,198,39],lime:[112,185,25],pink:[237,141,172],gray:[62,68,71],light_gray:[142,142,134],cyan:[21,119,136],purple:[121,42,172],blue:[53,57,157],brown:[114,71,40],green:[84,109,27],red:[160,39,34],black:[25,26,31]},q2=Object.keys(Sp),$2=[152,94,67],zx={oak:[162,130,78],spruce:[114,84,48],birch:[196,179,123],jungle:[160,115,80],acacia:[168,90,50],dark_oak:[66,43,20],mangrove:[117,54,48],cherry:[226,167,168],bamboo:[193,171,76],crimson:[124,55,84],warped:[43,104,99]},Y2=Object.keys(zx),K2={stone:[125,125,125],granite:[149,103,85],polished_granite:[154,108,90],diorite:[188,188,190],polished_diorite:[193,193,196],andesite:[136,138,138],polished_andesite:[148,150,149],cobblestone:[122,121,122],mossy_cobblestone:[110,118,95],stone_bricks:[122,121,122],mossy_stone_bricks:[114,119,100],cracked_stone_bricks:[118,117,116],chiseled_stone_bricks:[120,119,118],smooth_stone:[158,158,158],bricks:[150,97,83],deepslate:[80,80,84],cobbled_deepslate:[77,77,81],polished_deepslate:[72,72,76],deepslate_bricks:[70,70,74],deepslate_tiles:[60,60,64],chiseled_deepslate:[66,66,70],tuff:[108,109,102],calcite:[223,224,220],dripstone_block:[134,105,90],bedrock:[85,85,85],obsidian:[20,16,32],crying_obsidian:[37,13,60],netherite_block:[66,61,63],smooth_basalt:[73,74,80],dirt:[134,96,67],coarse_dirt:[119,85,59],rooted_dirt:[144,103,78],grass_block:[110,150,70],podzol:[91,64,33],mycelium:[111,99,100],dirt_path:[148,122,65],farmland:[97,64,36],mud:[60,56,60],packed_mud:[142,105,78],mud_bricks:[137,105,80],clay:[159,164,177],gravel:[131,127,126],sand:[219,207,163],red_sand:[190,102,33],sandstone:[216,203,157],smooth_sandstone:[219,206,160],cut_sandstone:[217,204,158],chiseled_sandstone:[215,202,156],red_sandstone:[186,99,29],moss_block:[89,109,45],coal_ore:[115,115,115],deepslate_coal_ore:[74,74,78],iron_ore:[136,130,122],deepslate_iron_ore:[98,96,95],copper_ore:[125,128,116],deepslate_copper_ore:[92,96,91],gold_ore:[145,137,103],deepslate_gold_ore:[104,99,78],redstone_ore:[133,107,107],deepslate_redstone_ore:[94,78,78],emerald_ore:[109,145,117],deepslate_emerald_ore:[82,110,90],lapis_ore:[107,118,140],deepslate_lapis_ore:[79,91,110],diamond_ore:[114,137,137],deepslate_diamond_ore:[86,104,105],nether_gold_ore:[123,58,47],nether_quartz_ore:[120,76,70],ancient_debris:[94,67,56],raw_iron_block:[166,134,105],raw_copper_block:[154,105,75],raw_gold_block:[180,147,53],coal_block:[16,16,16],iron_block:[220,220,220],copper_block:[192,107,79],exposed_copper:[161,125,104],weathered_copper:[108,153,122],oxidized_copper:[82,162,132],gold_block:[246,208,61],redstone_block:[175,24,5],emerald_block:[42,203,87],lapis_block:[38,67,137],diamond_block:[108,224,217],netherite_scrap:[110,80,70],quartz_block:[235,229,222],smooth_quartz:[236,230,224],quartz_bricks:[233,227,219],chiseled_quartz_block:[231,225,217],quartz_pillar:[234,228,221],amethyst_block:[134,97,197],budding_amethyst:[125,90,185],redstone_wire:[175,24,5],redstone_torch:[205,60,40],redstone_lamp:[124,78,44],repeater:[160,154,150],comparator:[165,159,155],observer:[98,98,98],piston:[140,124,98],sticky_piston:[120,134,88],piston_head:[150,130,95],dropper:[108,108,108],dispenser:[108,108,108],hopper:[70,70,74],lever:[120,110,95],target:[225,205,195],slime_block:[110,187,95],honey_block:[230,165,56],tnt:[180,60,50],note_block:[98,64,42],jukebox:[101,70,54],daylight_detector:[130,116,92],lectern:[156,124,71],rail:[140,124,96],powered_rail:[160,130,80],detector_rail:[150,120,95],activator_rail:[150,120,95],lightning_rod:[160,100,75],sculk_sensor:[29,72,81],calibrated_sculk_sensor:[33,78,88],sculk:[13,28,33],sculk_catalyst:[30,40,44],sculk_shrieker:[60,70,55],chest:[162,124,64],trapped_chest:[162,124,64],barrel:[124,96,55],crafting_table:[124,86,52],furnace:[104,104,104],blast_furnace:[92,92,96],smoker:[92,80,72],ender_chest:[42,60,60],bookshelf:[121,93,56],composter:[104,76,43],cauldron:[70,70,74],anvil:[73,73,73],grindstone:[120,120,122],smithing_table:[62,62,72],stonecutter:[108,104,100],loom:[148,121,78],cartography_table:[110,86,60],fletching_table:[180,162,110],beacon:[120,222,217],conduit:[148,130,100],bell:[216,174,60],lodestone:[110,110,116],respawn_anchor:[62,22,110],spawner:[44,56,66],snow:[243,250,250],snow_block:[243,250,250],powder_snow:[240,246,248],ice:[145,183,246],packed_ice:[141,180,246],blue_ice:[116,168,252],frosted_ice:[140,178,240],water:[60,110,220],lava:[222,110,30],netherrack:[97,38,38],nether_bricks:[44,22,26],red_nether_bricks:[69,9,11],nether_wart_block:[114,7,8],warped_wart_block:[22,119,120],soul_sand:[85,65,53],soul_soil:[92,71,57],magma_block:[142,65,35],glowstone:[171,131,84],shroomlight:[240,146,70],basalt:[73,73,80],polished_basalt:[86,86,92],blackstone:[42,36,41],polished_blackstone:[53,49,58],polished_blackstone_bricks:[48,44,52],gilded_blackstone:[73,53,44],end_stone:[219,222,158],end_stone_bricks:[218,224,162],purpur_block:[169,125,169],purpur_pillar:[171,128,171],end_rod:[225,222,210],chorus_plant:[90,62,90],chorus_flower:[151,118,151],dragon_egg:[22,12,28],torch:[240,200,90],soul_torch:[80,200,215],lantern:[205,150,75],soul_lantern:[90,190,205],sea_lantern:[200,225,215],froglight:[220,215,160],ochre_froglight:[240,222,150],verdant_froglight:[190,220,150],pearlescent_froglight:[235,205,220],pumpkin:[197,120,28],carved_pumpkin:[197,120,28],jack_o_lantern:[214,145,40],melon:[110,160,40],hay_block:[165,139,12],dried_kelp_block:[50,56,44],sponge:[197,192,75],wet_sponge:[150,158,70],cactus:[85,127,44],bamboo_block:[148,160,60],sugar_cane:[148,192,101],vine:[60,100,35],lily_pad:[42,95,38],short_grass:[108,152,64],tall_grass:[108,152,64],fern:[104,148,62],large_fern:[104,148,62],dead_bush:[129,95,41],cobweb:[220,224,228],glass:[202,226,237],glass_pane:[202,226,237],tinted_glass:[42,36,48]},Z2=new Set(["slime_block","honey_block","ice","packed_ice","blue_ice","frosted_ice","water","bubble_column","nether_portal","cobweb","spawner"]);function Q2(t){return t.includes("glass")||Z2.has(t)}const m0={concrete:t=>`${t}_concrete`,concrete_powder:t=>`${t}_concrete_powder`,wool:t=>`${t}_wool`,carpet:t=>`${t}_carpet`,stained_glass:t=>`${t}_stained_glass`,stained_glass_pane:t=>`${t}_stained_glass_pane`,stained_hardened_clay:t=>`${t}_terracotta`};function Vx(t,e){const n=e==null?void 0:e.color;return n&&Sp[n]&&m0[t]?m0[t](n):t==="hardened_clay"?"terracotta":t}const g0=new Map;function eu(t,e){const n=Vx(Tt(t),e),i=g0.get(n);if(i)return i;const r=J2(n),s={r:r[0],g:r[1],b:r[2],transparent:Q2(n)};return g0.set(n,s),s}function J2(t){const e=K2[t];if(e)return e;if(t.includes("copper"))return eC(t);for(const i of q2)if(t===i||t.startsWith(i+"_"))return tC(i,t.slice(i.length+1));const n=t.startsWith("stripped_")?t.slice(9):t;for(const i of Y2)if(n===i||n.startsWith(i+"_"))return nC(i,n.slice(i.length+1));return sC(t)}function eC(t){return t.includes("oxidized")?[82,162,132]:t.includes("weathered")?[108,153,122]:t.includes("exposed")?[161,125,104]:[192,107,79]}function tC(t,e){const n=Sp[t];return e.includes("terracotta")?Mp(n,$2,.55):e.includes("concrete_powder")?_0(n,.18):e.includes("glass")?_0(n,.1):n}function nC(t,e){const n=zx[t];return e.includes("leaves")?iC(t):e.includes("log")||e.includes("wood")||e.includes("stem")||e.includes("hyphae")?rC(n,.2):n}function iC(t){return t==="cherry"?[231,169,197]:t==="birch"?[128,167,85]:t==="spruce"?[78,105,78]:[60,105,40]}function Xs(t){return t<0?0:t>255?255:Math.round(t)}function Mp(t,e,n){return[Xs(t[0]*(1-n)+e[0]*n),Xs(t[1]*(1-n)+e[1]*n),Xs(t[2]*(1-n)+e[2]*n)]}function _0(t,e){return Mp(t,[255,255,255],e)}function rC(t,e){return Mp(t,[0,0,0],e)}function sC(t){let e=0;for(let i=0;i<t.length;i++)e=e*31+t.charCodeAt(i)|0;const n=(e>>>0)%360;return oC(n/360,.45,.6)}function oC(t,e,n){const i=n+e-n*e,r=2*n-i;return[Xs(gh(r,i,t+1/3)*255),Xs(gh(r,i,t)*255),Xs(gh(r,i,t-1/3)*255)]}function gh(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function Hx(t){const e=n=>n.toString(16).padStart(2,"0");return`#${e(t.r)}${e(t.g)}${e(t.b)}`}const v0={chain:"iron_chain",grass_path:"dirt_path",grass:"grass_block",golden_rail:"powered_rail",stonebrick:"stone_bricks",fence:"oak_fence",fence_gate:"oak_fence_gate",wooden_door:"oak_door",wooden_button:"oak_button",wooden_pressure_plate:"oak_pressure_plate",trapdoor:"oak_trapdoor",sign:"oak_sign",wall_sign:"oak_wall_sign",unpowered_repeater:"repeater",powered_repeater:"repeater",unpowered_comparator:"comparator",powered_comparator:"comparator",unlit_redstone_torch:"redstone_torch",lit_furnace:"furnace",lit_redstone_lamp:"redstone_lamp",lit_pumpkin:"jack_o_lantern",web:"cobweb",snow_layer:"snow",slime:"slime_block",noteblock:"note_block",magma:"magma_block",quartz_ore:"nether_quartz_ore",mob_spawner:"spawner",lit_redstone_ore:"redstone_ore",reeds:"sugar_cane",melon_block:"melon",waterlily:"lily_pad",brick_block:"bricks",hardened_clay:"terracotta"};function Gx(t,e){for(const n in t)if(!String(t[n]).split("|").includes(e[n]))return!1;return!0}function cf(t,e){const n=t;return Array.isArray(n.OR)?n.OR.some(i=>cf(i,e)):Array.isArray(n.AND)?n.AND.every(i=>cf(i,e)):Gx(t,e)}class xa{constructor(e){this.data=e}static fromRaw(e){return new xa(e)}getRawData(){return this.data}static async load(e=cn("models.json")){const n=await fetch(e);if(!n.ok)throw new Error(`No se pudo cargar ${e} (${n.status})`);return new xa(await n.json())}resolve(e,n){const i=Tt(e),r=!this.data.blocks[i]&&!!v0[i],s=this.data.blocks[i]??this.data.blocks[v0[i]];if(!s)return null;const o=r&&(!n||n.axis===void 0)?{...n??{},axis:"y"}:n??{},a=[];if(s.variants){const l=s.variants.find(c=>Gx(c.when,o));if(!l)return null;for(const c of l.apply)a.push({model:this.data.models[c.model],x:c.x,y:c.y,uvlock:c.uvlock})}else if(s.multipart){let l=o;i.endsWith("_wall")&&o.up!=="true"&&o.north!=="low"&&o.north!=="tall"&&o.east!=="low"&&o.east!=="tall"&&o.south!=="low"&&o.south!=="tall"&&o.west!=="low"&&o.west!=="tall"&&(l={...o,up:"true"});for(const c of s.multipart)if(!(c.when&&!cf(c.when,l)))for(const h of c.apply)a.push({model:this.data.models[h.model],x:h.x,y:h.y,uvlock:h.uvlock})}return a}}const x0={type:"change"},wp={type:"start"},Wx={type:"end"},El=new Yc,y0=new wn,aC=Math.cos(70*Mx.DEG2RAD),zt=new O,yn=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_h=1e-6;class lC extends Kw{constructor(e,n=null){super(e,n),this.state=vt.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hs.ROTATE,MIDDLE:Hs.DOLLY,RIGHT:Hs.PAN},this.touches={ONE:Is.ROTATE,TWO:Is.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new wr,this._lastTargetPosition=new O,this._quat=new wr().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hg,this._sphericalDelta=new Hg,this._scale=1,this._panOffset=new O,this._rotateStart=new ze,this._rotateEnd=new ze,this._rotateDelta=new ze,this._panStart=new ze,this._panEnd=new ze,this._panDelta=new ze,this._dollyStart=new ze,this._dollyEnd=new ze,this._dollyDelta=new ze,this._dollyDirection=new O,this._mouse=new ze,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=uC.bind(this),this._onPointerDown=cC.bind(this),this._onPointerUp=hC.bind(this),this._onContextMenu=vC.bind(this),this._onMouseWheel=pC.bind(this),this._onKeyDown=mC.bind(this),this._onTouchStart=gC.bind(this),this._onTouchMove=_C.bind(this),this._onMouseDown=dC.bind(this),this._onMouseMove=fC.bind(this),this._interceptControlDown=xC.bind(this),this._interceptControlUp=yC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(x0),this.update(),this.state=vt.NONE}pan(e,n){this._pan(e,n),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const n=this.object.position;zt.copy(n).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=yn:i>Math.PI&&(i-=yn),r<-Math.PI?r+=yn:r>Math.PI&&(r-=yn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),n.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=zt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(El.origin.copy(this.object.position),El.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(El.direction))<aC?this.object.lookAt(this.target):(y0.setFromNormalAndCoplanarPoint(this.object.up,this.target),El.intersectPlane(y0,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>_h||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_h||this._lastTargetPosition.distanceToSquared(this.target)>_h?(this.dispatchEvent(x0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?yn/60*this.autoRotateSpeed*e:yn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){zt.setFromMatrixColumn(n,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,n){this.screenSpacePanning===!0?zt.setFromMatrixColumn(n,1):(zt.setFromMatrixColumn(n,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;zt.copy(r).sub(this.target);let s=zt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/n.clientHeight),this._rotateUp(yn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/n.clientHeight),this._rotateUp(yn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new ze,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function cC(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function uC(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function hC(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Wx),this.state=vt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function dC(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Hs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=vt.DOLLY;break;case Hs.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=vt.ROTATE}break;case Hs.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(wp)}function fC(t){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function pC(t){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(t.preventDefault(),this.dispatchEvent(wp),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Wx))}function mC(t){this.enabled!==!1&&this._handleKeyDown(t)}function gC(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Is.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=vt.TOUCH_ROTATE;break;case Is.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case Is.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=vt.TOUCH_DOLLY_PAN;break;case Is.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(wp)}function _C(t){switch(this._trackPointer(t),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=vt.NONE}}function vC(t){this.enabled!==!1&&t.preventDefault()}function xC(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yC(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const SC=[145/255,189/255,89/255],MC=[89/255,174/255,48/255],S0=[63/255,118/255,228/255],wC=new Set(["white","orange","magenta","light_blue","yellow","lime","pink","gray","light_gray","cyan","purple","blue","brown","green","red","black"]),EC=new Set(["oak","spruce","birch","jungle","acacia","dark_oak","mangrove","cherry"]),ut=(t,e={})=>({top:t,bottom:t,side:t,...e}),rr=(t,e,n={})=>({top:e,bottom:e,side:t,column:!0,...n}),at=(t,e,n,i={})=>({top:t,bottom:e,side:n,...i}),bC={grass_block:at("grass_block_top","dirt","grass_block_side",{tintTop:SC}),podzol:at("podzol_top","dirt","podzol_side"),mycelium:at("mycelium_top","dirt","mycelium_side"),dirt_path:at("dirt_path_top","dirt","dirt_path_side"),farmland:at("farmland","dirt","dirt"),sandstone:at("sandstone_top","sandstone_bottom","sandstone"),cut_sandstone:at("sandstone_top","sandstone_bottom","cut_sandstone"),chiseled_sandstone:at("sandstone_top","sandstone_bottom","chiseled_sandstone"),smooth_sandstone:ut("sandstone_top"),red_sandstone:at("red_sandstone_top","red_sandstone_bottom","red_sandstone"),cut_red_sandstone:at("red_sandstone_top","red_sandstone_bottom","cut_red_sandstone"),chiseled_red_sandstone:at("red_sandstone_top","red_sandstone_bottom","chiseled_red_sandstone"),smooth_red_sandstone:ut("red_sandstone_top"),quartz_block:at("quartz_block_top","quartz_block_bottom","quartz_block_side"),smooth_quartz:ut("quartz_block_bottom"),quartz_pillar:rr("quartz_block_side","quartz_block_top"),purpur_pillar:ut("purpur_block"),basalt:rr("basalt_side","basalt_top"),polished_basalt:rr("polished_basalt_side","polished_basalt_top"),bone_block:rr("bone_block_side","bone_block_top"),hay_block:rr("hay_block_side","hay_block_top"),deepslate:rr("deepslate","deepslate_top"),ancient_debris:at("ancient_debris_top","ancient_debris_top","ancient_debris_side"),magma_block:ut("magma"),dried_kelp_block:at("dried_kelp_top","dried_kelp_bottom","dried_kelp_side"),honey_block:at("honey_block_top","honey_block_bottom","honey_block_side",{transparent:!0}),slime_block:ut("slime_block",{transparent:!0}),melon:at("melon_top","melon_top","melon_side"),pumpkin:at("pumpkin_top","pumpkin_top","pumpkin_side"),carved_pumpkin:at("pumpkin_top","pumpkin_top","carved_pumpkin"),jack_o_lantern:at("pumpkin_top","pumpkin_top","jack_o_lantern"),tnt:at("tnt_top","tnt_bottom","tnt_side"),target:at("target_top","target_top","target_side"),note_block:ut("note_block"),decorated_pot:ut("terracotta"),jukebox:at("jukebox_top","jukebox_side","jukebox_side"),bookshelf:at("oak_planks","oak_planks","bookshelf"),crafting_table:at("crafting_table_top","oak_planks","crafting_table_side"),furnace:at("furnace_top","furnace_top","furnace_side"),lodestone:at("lodestone_top","lodestone_top","lodestone_side"),redstone_lamp:ut("redstone_lamp"),hopper:at("hopper_top","hopper_outside","hopper_outside"),piston:at("piston_top","piston_bottom","piston_side"),sticky_piston:at("piston_top_sticky","piston_bottom","piston_side"),moving_piston:at("piston_top","piston_bottom","piston_side"),observer:at("observer_top","observer_top","observer_side"),dropper:at("furnace_top","furnace_top","dropper_front"),dispenser:at("furnace_top","furnace_top","dispenser_front"),repeater:at("repeater","smooth_stone","smooth_stone"),comparator:at("comparator","smooth_stone","smooth_stone"),redstone_torch:ut("redstone_torch"),redstone_wall_torch:ut("redstone_torch"),glass:ut("glass",{transparent:!0}),tinted_glass:ut("tinted_glass",{transparent:!0}),ice:ut("ice",{transparent:!0}),packed_ice:ut("packed_ice"),blue_ice:ut("blue_ice"),water:ut("water_still",{tintAll:S0,transparent:!0}),bubble_column:ut("water_still",{tintAll:S0,transparent:!0}),lava:ut("lava_still")};function TC(t){const e=bC[t];if(e)return e;const n=t.startsWith("stripped_"),i=n?t.slice(9):t;for(const r of EC)if(i===r||i.startsWith(r+"_")){const s=i.slice(r.length+1),o=n?`stripped_${r}_log`:`${r}_log`,a=n?`stripped_${r}_log_top`:`${r}_log_top`;return s==="log"?rr(o,a):s==="wood"?ut(o):s==="leaves"?ut(`${r}_leaves`,{tintAll:MC}):ut(`${r}_planks`)}for(const r of["crimson","warped"]){const s=n?t.slice(9):t;if(s===r||s.startsWith(r+"_")){const o=s.slice(r.length+1),a=n?`stripped_${r}_stem`:`${r}_stem`,l=n?`stripped_${r}_stem_top`:`${r}_stem_top`;return o==="stem"?rr(a,l):ut(o==="hyphae"?a:`${r}_planks`)}}if(t==="bamboo_planks"||t.startsWith("bamboo_"))return ut("bamboo_planks");for(const r of wC)if(t.startsWith(r+"_")){const s=t.slice(r.length+1);if(s.includes("stained_glass"))return ut(`${r}_stained_glass`,{transparent:!0});if(s.includes("glazed_terracotta"))return ut(`${r}_glazed_terracotta`);if(s.includes("concrete_powder"))return ut(`${r}_concrete_powder`);if(s.includes("concrete"))return ut(`${r}_concrete`);if(s.includes("terracotta"))return ut(`${r}_terracotta`);if(s==="wool"||s==="carpet")return ut(`${r}_wool`)}return ut(t==="terracotta"?"terracotta":t)}function qs(t,e){const n=TC(Vx(Tt(t),e)),i=(e==null?void 0:e.axis)??"y";let r;if(n.column){const o=n.top,a=n.side;i==="x"?r=[o,o,a,a,a,a]:i==="z"?r=[a,a,a,a,o,o]:r=[a,a,o,o,a,a]}else r=[n.side,n.side,n.top,n.bottom,n.side,n.side];const s=[null,null,null,null,null,null];return n.tintAll&&s.fill(n.tintAll),n.tintTop&&(s[2]=n.tintTop),{tiles:r,tints:s,transparent:!!n.transparent}}function bl(t){const[e,n]=t.size;return{has:i=>i in t.tex,size:i=>{const r=t.tex[i];return r?[r.w,r.h]:[64,64]},norm:(i,r,s)=>{const o=t.tex[i];return o?[(o.x+r)/e,(o.y+s)/n]:[0,0]}}}const AC={east:[1,0,0],west:[-1,0,0],up:[0,1,0],down:[0,-1,0],south:[0,0,1],north:[0,0,-1]};function CC(t,e,n){const[i,r,s]=e,[o,a,l]=n;switch(t){case"south":return[i,r,l,o,r,l,o,a,l,i,a,l];case"north":return[o,r,s,i,r,s,i,a,s,o,a,s];case"east":return[o,r,l,o,r,s,o,a,s,o,a,l];case"west":return[i,r,s,i,r,l,i,a,l,i,a,s];case"up":return[i,a,l,o,a,l,o,a,s,i,a,s];default:return[i,r,s,o,r,s,o,r,l,i,r,l]}}function RC(t,e,n){const i=Math.abs(t),r=Math.abs(e),s=Math.abs(n);return r>=i&&r>=s?e>=0?1:.5:s>=i?n>=0?.8:.7:.62}function PC(t,e){const n=new Be().makeTranslation(8,8,8);return e&&n.multiply(new Be().makeRotationY(-e*Math.PI/180)),n.multiply(new Be().makeTranslation(-8,-8,-8))}function kn(t,e,n,i,r,s,o,a){const l=new Be().extractRotation(o),c=new O,h=new O;for(const d in s){const u=s[d],p=CC(d,i,r),_=[];for(let y=0;y<4;y++)c.set(p[y*3],p[y*3+1],p[y*3+2]).applyMatrix4(o).multiplyScalar(1/16),_.push(c.x,c.y,c.z);const x=AC[d]??[0,1,0];h.set(x[0],x[1],x[2]).applyMatrix4(l).normalize();const g=RC(h.x,h.y,h.z);let f=u.uv[0],m=u.uv[2];const v=u.uv[1],S=u.uv[3];if(a!=null&&a.has(d)){const y=f;f=m,m=y}let T=[[f,S],[m,S],[m,v],[f,v]];const w=((u.rot??0)/90|0)%4;w&&(T=T.map((y,C)=>T[(C+w)%4]));const R=[];for(const[y,C]of T){const[U,L]=n.norm(e,y,C);R.push(U,L)}t.push({pos:_,uv:R,r:g,g,b:g,cull:-1})}}function LC(t,e,n,i,r,s){const o=(h,d,u,p)=>[h,d,h+u,d+p],a=o(t,e+r,r,i),l=o(t+r+n,e+r,r,i),c={up:{uv:o(t+r,e,n,r)},down:{uv:o(t+r+n,e,n,r)},east:{uv:s?a:l},west:{uv:s?l:a},south:{uv:o(t+r,e+r,n,i)},north:{uv:o(t+r+n+r,e+r,n,i)}};if(n<=0||i<=0||r<=0)for(const[h,d]of Object.entries(c))(d.uv[2]-d.uv[0]<=0||d.uv[3]-d.uv[1]<=0)&&delete c[h];return c}function $t(t,e,n,i,r,s,o=[]){const a=(c,h,d,u)=>[c,h,c+d,h+u],l={down:{uv:a(t+r,e,n,r),rot:0},up:{uv:a(t+r+n,e,n,r),rot:0},east:{uv:a(t+r+n,e+r,r,i),rot:s},south:{uv:a(t+r,e+r,n,i),rot:s},west:{uv:a(t,e+r,r,i),rot:s},north:{uv:a(t+r+n+r,e+r,n,i),rot:s}};for(const c of o)delete l[c];return l}const jx=new Set(["minecraft:chest","minecraft:trapped_chest","minecraft:ender_chest"]),DC={north:0,east:90,south:180,west:270};function NC(t){return t==="minecraft:trapped_chest"?"trapped":t==="minecraft:ender_chest"?"ender":"normal"}function M0(t,e){const n=NC(t);return n==="ender"?"chest/ender":e==="left"?`chest/${n}_left`:e==="right"?`chest/${n}_right`:`chest/${n}`}const w0={north:{uv:[1,1,3,5],rot:180},east:{uv:[0,1,1,5],rot:180},south:{uv:[4,1,6,5],rot:180},west:{uv:[3,1,4,5],rot:180},up:{uv:[1,0,3,1],rot:180},down:{uv:[3,0,5,1],rot:180}};function IC(t){return t==="left"?[{from:[0,0,1],to:[15,10,15],faces:$t(0,19,15,10,14,180,["up","west"])},{from:[0,10,1],to:[15,14,15],faces:$t(0,0,15,5,14,180,["down","west"])},{from:[-1,7,0],to:[1,11,2],faces:w0,lock:!0}]:t==="right"?[{from:[1,0,1],to:[16,10,15],faces:$t(0,19,15,10,14,180,["up","east"])},{from:[1,10,1],to:[16,14,15],faces:$t(0,0,15,5,14,180,["down","east"])}]:[{from:[1,0,1],to:[15,10,15],faces:$t(0,19,14,10,14,180,["up"])},{from:[1,10,1],to:[15,14,15],faces:$t(0,0,14,5,14,180,["down"])},{from:[7,7,0],to:[9,11,2],faces:w0,lock:!0}]}const UC=new Set(["north","south"]);function kC(t,e){var h,d;const n=DC[((h=t.properties)==null?void 0:h.facing)??"north"]??0,i=((d=t.properties)==null?void 0:d.type)??"single",r=i==="left"?"right":i==="right"?"left":"single",s=M0(t.name,r),o=M0(t.name,"single"),a=r==="left"||r==="right",l=PC(0,n),c=[];for(const u of IC(r)){const p=a&&!u.lock?UC:void 0;kn(c,u.lock?o:s,e,u.from,u.to,u.faces,l,p)}return c}const FC=new Set(["white","orange","magenta","light_blue","yellow","lime","pink","gray","light_gray","cyan","purple","blue","brown","green","red","black"]),OC={up:null,down:[new O(1,0,0),180],north:[new O(1,0,0),-90],south:[new O(1,0,0),90],east:[new O(0,0,1),-90],west:[new O(0,0,1),90]};function ya(t,e){return new Be().makeTranslation(8,8,8).multiply(new Be().makeRotationAxis(t,e*Math.PI/180)).multiply(new Be().makeTranslation(-8,-8,-8))}function Xx(t){const n=Tt(t).replace(/_?shulker_box$/,"").replace(/_$/,"");return n&&FC.has(n)?`shulker/${n}`:"shulker/default"}function BC(t,e){var h;const n=Xx(t.name),i=OC[((h=t.properties)==null?void 0:h.facing)??"up"],r=i?ya(i[0],i[1]):new Be,s=[],o=$t(0,0,16,12,16,0),a={up:o.down,north:o.north,south:o.south,east:o.east,west:o.west},l=$t(0,28,16,8,16,0),c={down:l.up,north:l.north,south:l.south,east:l.east,west:l.west};return kn(s,n,e,[0,0,0],[16,8,16],c,r),kn(s,n,e,[0,4,0],[16,16,16],a,r),s}const zC={skeleton_skull:"skeleton",skeleton_wall_skull:"skeleton",wither_skeleton_skull:"wither_skeleton",wither_skeleton_wall_skull:"wither_skeleton",zombie_head:"zombie",zombie_wall_head:"zombie",creeper_head:"creeper",creeper_wall_head:"creeper",piglin_head:"piglin",piglin_wall_head:"piglin",player_head:"player",player_wall_head:"player"};function Sa(t){const e=zC[Tt(t)];return e?`skull/${e}`:null}const VC={south:0,north:180,east:90,west:-90};function HC(t,e){var o,a;const n=t.skin&&e.has(t.skin)?t.skin:Sa(t.name);if(!n||!e.has(n))return null;const i=[],r=$t(0,0,8,8,8,0),s={up:r.down,down:r.up,north:r.north,south:r.south,east:r.east,west:r.west};if(Tt(t.name).includes("wall")){const l=VC[((o=t.properties)==null?void 0:o.facing)??"south"]??0;kn(i,n,e,[4,4,0],[12,12,8],s,ya(new O(0,1,0),l))}else{const l=(parseInt(((a=t.properties)==null?void 0:a.rotation)??"0",10)||0)*22.5;kn(i,n,e,[4,0,4],[12,8,12],s,ya(new O(0,1,0),-l))}return i}const ys="minecart/minecart",GC=[2,2,18,10],WC=[2,12,22,28];function jC(t,e){if(!e.has(ys))return[];const n=t?ya(new O(0,1,0),-t):new Be,i=[],r=()=>({uv:GC}),s=()=>({uv:WC});return kn(i,ys,e,[0,3,0],[16,5,16],{up:s(),down:s()},n),kn(i,ys,e,[0,3,0],[16,11,2],{north:r(),south:r(),up:r()},n),kn(i,ys,e,[0,3,14],[16,11,16],{north:r(),south:r(),up:r()},n),kn(i,ys,e,[0,3,2],[2,11,14],{west:r(),east:r(),up:r()},n),kn(i,ys,e,[14,3,2],[16,11,14],{west:r(),east:r(),up:r()},n),i}const E0="armor_stand/wood";function XC(){return[{from:[3,0,3],to:[13,2,13],faces:$t(0,32,12,1,12,0)},{from:[5,2,7],to:[7,12,9],faces:$t(8,0,2,11,2,0)},{from:[9,2,7],to:[11,12,9],faces:$t(40,0,2,11,2,0)},{from:[4,12,6],to:[12,15,10],faces:$t(0,26,12,3,3,0)},{from:[7,15,7],to:[9,20,9],faces:$t(8,0,2,11,2,0)},{from:[3,20,7],to:[13,23,9],faces:$t(0,26,12,3,3,0)},{from:[7,23,7],to:[9,25,9],faces:$t(8,0,2,11,2,0)},{from:[6,25,6],to:[10,30,10],faces:$t(0,0,2,7,2,0)}]}function qC(t,e){if(!e.has(E0))return[];const n=t?ya(new O(0,1,0),-t):new Be,i=[];for(const r of XC())kn(i,E0,e,r.from,r.to,r.faces,n);return i}const $C=[{tu:0,tv:0,box:[-14,-9,-3,28,16,3],pose:[0,3,1],rot:[Math.PI/2,0,0]},{tu:0,tv:19,box:[-13,-7,-1,18,6,2],pose:[-15,4,4],rot:[0,Math.PI*1.5,0]},{tu:0,tv:27,box:[-8,-7,-1,16,6,2],pose:[15,4,0],rot:[0,Math.PI/2,0]},{tu:0,tv:35,box:[-14,-7,-1,28,6,2],pose:[0,4,9],rot:[0,Math.PI,0]},{tu:0,tv:43,box:[-14,-7,-1,28,6,2],pose:[0,4,-9],rot:[0,0,0]},{tu:62,tv:0,box:[-1,0,-5,2,2,18],pose:[3,-3,9],rot:[0,0,0]},{tu:62,tv:20,box:[-1,0,-5,2,2,18],pose:[3,-3,-9],rot:[0,Math.PI,0]}],YC=new Be().set(0,0,-1,0,0,-1,0,0,-1,0,0,0,0,0,0,1);function KC(t,e,n,i){const r=e?`chest_boat/${t}`:`boat/${t}`;if(!i.has(r))return[];const s=[],o=new Be().makeRotationY(-n*Math.PI/180),a=new Be().multiplyMatrices(o,YC);for(const l of $C){const[c,h,d,u,p,_]=l.box,x=new Be().makeTranslation(l.pose[0],l.pose[1],l.pose[2]);l.rot[2]&&x.multiply(new Be().makeRotationZ(l.rot[2])),l.rot[1]&&x.multiply(new Be().makeRotationY(l.rot[1])),l.rot[0]&&x.multiply(new Be().makeRotationX(l.rot[0]));const g=new Be().multiplyMatrices(a,x);kn(s,r,i,[c,h,d],[c+u,h+p,d+_],$t(l.tu,l.tv,u,p,_,0),g)}return s}const ZC=new Set(["down","up","east","south","west","north"]);function QC(t,e,n,i){if(!t||!e.length||!i.has(e[0]))return[];const r=new Be().makeRotationY(-n*Math.PI/180);if(t.escala&&t.escala!==1){const o=t.escala;r.multiply(new Be().makeScale(o,o,o))}r.multiply(new Be().makeTranslation(-8,t.offsetY??0,-8));const s=[];for(const o of t.boxes){const a=e[o.t??0]??e[0];if(!i.has(a))continue;const[l,c]=i.size(a),h=t.tex[0]?l/t.tex[0]:1,d=t.tex[1]?c/t.tex[1]:1,u=h===d&&h>1&&Number.isInteger(h)?h:1,p=o.inflate??0,[_,x,g]=o.at,[f,m,v]=o.size,S=[_-p,x-p,g-p],T=[_+f+p,x+m+p,g+v+p];let w=o.faces?Object.fromEntries(Object.entries(o.faces).map(([y,C])=>[y,{uv:C}])):LC(o.uv[0],o.uv[1],f,m,v,!!o.mirror);u!==1&&(w=Object.fromEntries(Object.entries(w).map(([y,C])=>[y,{...C,uv:C.uv.map(U=>U*u)}])));const R=o.m?r.clone().multiply(new Be().fromArray(o.m)):r;kn(s,a,i,S,T,w,R,o.mirror?ZC:void 0)}return s}function JC(t){return!!(jx.has(t)||t.endsWith("shulker_box")||Sa(t))}function eR(t,e){return jx.has(t.name)?kC(t,e):t.name.endsWith("shulker_box")?BC(t,e):Sa(t.name)?HC(t,e):null}const tR=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],nR=[145/255,189/255,89/255],iR=[89/255,174/255,48/255],qx=[63/255,118/255,228/255],rR=[1,1,1];function sR(t){const e=Math.max(0,Math.min(15,t))/15,n=e*.6+(e>0?.4:.3),i=Math.max(0,Math.min(1,e*e*.7-.5)),r=Math.max(0,Math.min(1,e*e*.6-.7));return[n,i,r]}const oR=new Set(["water","ice","slime_block","honey_block","nether_portal","bubble_column"]);function aR(t){const e=Tt(t);return e.includes("glass")||oR.has(e)}function lR(t,e){const n=Tt(t);return n==="water"||n.endsWith("_cauldron")?qx:n==="redstone_wire"?sR(parseInt((e==null?void 0:e.power)??"0",10)||0):n==="grass_block"||n==="short_grass"||n==="tall_grass"||n==="fern"||n==="large_fern"||n==="sugar_cane"?nR:n==="cherry_leaves"?rR:iR}const cR={beacon:15,conduit:15,glowstone:15,jack_o_lantern:15,lava:15,sea_lantern:15,shroomlight:15,lava_cauldron:15,ochre_froglight:15,verdant_froglight:15,pearlescent_froglight:15,fire:15,lantern:14,end_rod:14,torch:14,wall_torch:14,cave_vines_plant:14,soul_torch:10,soul_wall_torch:10,soul_lantern:10,soul_fire:10,crying_obsidian:10,glow_lichen:7,ender_chest:7,redstone_ore:9,deepslate_redstone_ore:9,sea_pickle:6,sculk_catalyst:6,magma_block:3,smoker:13,blast_furnace:13,furnace:13,brewing_stand:1,brown_mushroom:1,amethyst_cluster:5,large_amethyst_bud:4,medium_amethyst_bud:2,small_amethyst_bud:1,glow_item_frame:0,redstone_block:4,end_portal:15,end_gateway:15};function uR(t,e){const n=Tt(t);return n==="redstone_lamp"?(e==null?void 0:e.lit)==="true"?15:0:n==="furnace"||n==="smoker"||n==="blast_furnace"?(e==null?void 0:e.lit)==="true"?13:0:n==="campfire"?(e==null?void 0:e.lit)==="false"?0:15:n==="soul_campfire"?(e==null?void 0:e.lit)==="false"?0:10:n==="redstone_torch"||n==="redstone_wall_torch"?(e==null?void 0:e.lit)==="false"?0:7:n==="repeater"||n==="comparator"?(e==null?void 0:e.powered)==="true"?3:0:n==="redstone_ore"||n==="deepslate_redstone_ore"?(e==null?void 0:e.lit)==="true"?9:0:n==="respawn_anchor"?(parseInt((e==null?void 0:e.charges)??"0",10)||0)>0?15:0:n==="candle"||n.endsWith("_candle")?(e==null?void 0:e.lit)==="true"?Math.min(12,3*(parseInt((e==null?void 0:e.candles)??"1",10)||1)):0:n==="cave_vines"||n==="cave_vines_plant"?(e==null?void 0:e.berries)==="true"?14:0:n==="copper_bulb"||n.endsWith("_copper_bulb")?(e==null?void 0:e.lit)==="true"?15:0:cR[n]??0}function b0(t){const e=Tt(t);return e.startsWith("soul_")?{r:.45,g:.78,b:1}:e==="redstone_torch"||e==="redstone_wall_torch"||e==="redstone_lamp"||e==="redstone_ore"||e==="deepslate_redstone_ore"||e==="redstone_block"||e==="repeater"||e==="comparator"?{r:1,g:.22,b:.12}:e==="lava"||e==="magma_block"||e==="fire"||e==="campfire"||e==="lava_cauldron"?{r:1,g:.55,b:.2}:e==="torch"||e==="wall_torch"||e==="lantern"||e==="jack_o_lantern"||e==="candle"||e.endsWith("_candle")?{r:1,g:.78,b:.45}:e==="end_portal"||e==="end_gateway"?{r:.35,g:.6,b:.95}:{r:1,g:.95,b:.82}}function Ep(t,e,n){const i=Math.abs(t),r=Math.abs(e),s=Math.abs(n);return r>=i&&r>=s?e>=0?1:.5:s>=i?n>=0?.8:.7:.62}function bp(t,e,n,i){const[r,s,o]=e,[a,l,c]=n,[h,d,u,p]=i;switch(t){case"south":return{pos:[r,s,c,a,s,c,a,l,c,r,l,c],uv:[h,p,u,p,u,d,h,d]};case"north":return{pos:[a,s,o,r,s,o,r,l,o,a,l,o],uv:[h,p,u,p,u,d,h,d]};case"east":return{pos:[a,s,c,a,s,o,a,l,o,a,l,c],uv:[h,p,u,p,u,d,h,d]};case"west":return{pos:[r,s,o,r,s,c,r,l,c,r,l,o],uv:[h,p,u,p,u,d,h,d]};case"up":return{pos:[r,l,c,a,l,c,a,l,o,r,l,o],uv:[h,p,u,p,u,d,h,d]};default:return{pos:[r,s,o,a,s,o,a,s,c,r,s,c],uv:[h,p,u,p,u,d,h,d]}}}const Us={east:[1,0,0],west:[-1,0,0],up:[0,1,0],down:[0,-1,0],south:[0,0,1],north:[0,0,-1]};function hR(t){const e=Math.abs(t.x),n=Math.abs(t.y),i=Math.abs(t.z);return e>=n&&e>=i?t.x>=0?0:1:n>=i?t.y>=0?2:3:t.z>=0?4:5}function dR(t){return t==="water"||t==="flowing_water"||t==="bubble_column"?"water":t==="lava"||t==="flowing_lava"?"lava":null}function fR(t){return t>=8?16:(8-t)/9*16}function pR(t){if(!t.rotation)return new Be;const{origin:e,axis:n,angle:i,rescale:r}=t.rotation,s=i*Math.PI/180,o=new Be().makeTranslation(e[0],e[1],e[2]);if(r&&i!==0){const l=1/Math.cos(Math.abs(s)),c=n==="x"?[1,l,l]:n==="y"?[l,1,l]:[l,l,1];o.multiply(new Be().makeScale(c[0],c[1],c[2]))}const a=n==="x"?new O(1,0,0):n==="y"?new O(0,1,0):new O(0,0,1);return o.multiply(new Be().makeRotationAxis(a,s)),o.multiply(new Be().makeTranslation(-e[0],-e[1],-e[2])),o}function mR(t,e){const n=new Be().makeTranslation(8,8,8);return e&&n.multiply(new Be().makeRotationY(-e*Math.PI/180)),t&&n.multiply(new Be().makeRotationX(-t*Math.PI/180)),n.multiply(new Be().makeTranslation(-8,-8,-8))}function gR(t,e){const n=(e/90|0)%4;if(!n)return t;const i=[[t[0],t[1]],[t[2],t[3]],[t[4],t[5]],[t[6],t[7]]],r=[];for(let s=0;s<4;s++){const o=i[(s+n)%4];r.push(o[0],o[1])}return r}function _R(t,e,n,i,r){const{width:s,height:o,length:a,blocks:l,palette:c}=t,h=c.map(P=>xR(P,e,n,!0,r??null)),d=new Al,u=new Al,p=new Al,_=new Al,x=s/2,g=o/2,f=a/2,m=(P,I,E)=>l[(I*a+E)*s+P],v=Math.max(4,Math.round(Math.max(s,o,a)/30)),S=new Map,T=(i==null?void 0:i.x[0])??0,w=(i==null?void 0:i.x[1])??s-1,R=(i==null?void 0:i.y[0])??0,y=(i==null?void 0:i.y[1])??o-1,C=(i==null?void 0:i.z[0])??0,U=(i==null?void 0:i.z[1])??a-1;for(let P=R;P<=y;P++)for(let I=C;I<=U;I++)for(let E=T;E<=w;E++){const D=h[m(E,P,I)];if(D.air)continue;const J=E-x,Y=P-g,ne=I-f;if(D.light){const K=((E/v|0)*1024+(P/v|0))*1024+(I/v|0);let te=S.get(K);te||(te={sx:0,sy:0,sz:0,n:0,lvl:0,r:0,g:0,b:0},S.set(K,te)),te.sx+=E,te.sy+=P,te.sz+=I,te.n++,D.light.level>te.lvl&&(te.lvl=D.light.level),te.r+=D.light.r,te.g+=D.light.g,te.b+=D.light.b}if(D.fluid){G(D.fluid,E,P,I,J,Y,ne);continue}j(D.solid,d,E,P,I,J,Y,ne),j(D.trans,u,E,P,I,J,Y,ne),D.entity&&j(D.entity,p,E,P,I,J,Y,ne),D.emis&&j(D.emis,_,E,P,I,J,Y,ne)}function L(P,I,E){return P<0||P>=s||I<0||I>=o||E<0||E>=a||i&&!(P>=i.x[0]&&P<=i.x[1]&&I>=i.y[0]&&I<=i.y[1]&&E>=i.z[0]&&E<=i.z[1])?null:h[m(P,I,E)]}function G(P,I,E,D,J,Y,ne){if(!e)return;const K=P.family==="lava"?_:P.translucent?u:d,te=e.uv(P.tileIdx),B=P.tint?P.tint[0]:1,q=P.tint?P.tint[1]:1,$=P.tint?P.tint[2]:1,le=(()=>{const he=L(I,E+1,D);return!!(he!=null&&he.fluid)&&he.fluid.family===P.family})(),fe=(he,Ee)=>le?16:z(I,E,D,he,Ee,P),de=fe(-1,-1),Ce=fe(1,-1),Oe=fe(-1,1),He=fe(1,1),Ve=(he,Ee,N)=>{const Xe=Us[N],je=Ep(Xe[0],Xe[1],Xe[2]),st=[];for(const ot of he)st.push(ot[0]/16,ot[1]/16,ot[2]/16);const ge=[];for(const ot of Ee)ge.push(ot[0],ot[1]);K.add({pos:st,uv:tu(ge,te),r:B*je,g:q*je,b:$*je,cull:-1},J,Y,ne)},Ne=(he,Ee,N)=>{var Xe;return(Xe=L(he,Ee,N))==null?void 0:Xe.occluder},ie=(he,Ee,N)=>{const Xe=L(he,Ee,N);return!!(Xe!=null&&Xe.fluid)&&Xe.fluid.family===P.family};!le&&!Ne(I,E+1,D)&&Ve([[0,Oe,16],[16,He,16],[16,Ce,0],[0,de,0]],[[0,16],[16,16],[16,0],[0,0]],"up"),!Ne(I,E-1,D)&&!ie(I,E-1,D)&&Ve([[0,0,0],[16,0,0],[16,0,16],[0,0,16]],[[0,0],[16,0],[16,16],[0,16]],"down"),!Ne(I+1,E,D)&&!ie(I+1,E,D)&&Ve([[16,0,16],[16,0,0],[16,Ce,0],[16,He,16]],[[0,16],[16,16],[16,16-Ce],[0,16-He]],"east"),!Ne(I-1,E,D)&&!ie(I-1,E,D)&&Ve([[0,0,0],[0,0,16],[0,Oe,16],[0,de,0]],[[0,16],[16,16],[16,16-Oe],[0,16-de]],"west"),!Ne(I,E,D+1)&&!ie(I,E,D+1)&&Ve([[0,0,16],[16,0,16],[16,He,16],[0,Oe,16]],[[0,16],[16,16],[16,16-He],[0,16-Oe]],"south"),!Ne(I,E,D-1)&&!ie(I,E,D-1)&&Ve([[16,0,0],[0,0,0],[0,de,0],[16,Ce,0]],[[0,16],[16,16],[16,16-de],[0,16-Ce]],"north")}function z(P,I,E,D,J,Y){let ne=0,K=0;for(const[te,B]of[[0,0],[D,0],[0,J],[D,J]]){const q=L(P+te,I,E+B);if(!(q!=null&&q.fluid)||q.fluid.family!==Y.family)continue;const $=L(P+te,I+1,E+B);if($!=null&&$.fluid&&$.fluid.family===Y.family)return 16;const le=q.fluid.heightPx;le>=14?(ne+=le*10,K+=10):(ne+=le,K+=1)}return K===0?Y.heightPx:ne/K}function j(P,I,E,D,J,Y,ne,K){for(const te of P){if(te.cull>=0){const B=tR[te.cull],q=E+B[0],$=D+B[1],le=J+B[2];if(q>=0&&q<s&&$>=0&&$<o&&le>=0&&le<a&&(!i||q>=i.x[0]&&q<=i.x[1]&&$>=i.y[0]&&$<=i.y[1]&&le>=i.z[0]&&le<=i.z[1])&&h[m(q,$,le)].occluder)continue}I.add(te,Y,ne,K)}}const k=48,V=[];for(const P of S.values())V.push({x:P.sx/P.n-x+.5,y:P.sy/P.n-g+.5,z:P.sz/P.n-f+.5,r:P.r/P.n,g:P.g/P.n,b:P.b/P.n,level:P.lvl,count:P.n});return V.sort((P,I)=>I.count*I.level-P.count*P.level),{opaque:d.raw(),transparent:u.raw(),entity:p.raw(),emissive:_.raw(),lights:V.slice(0,k),truncated:d.truncated||u.truncated||p.truncated||_.truncated}}function vR(t,e,n,i,r){const s=_R(t,e,n,i,r);return{opaque:Tl(s.opaque),transparent:Tl(s.transparent),entity:Tl(s.entity),emissive:Tl(s.emissive),lights:s.lights}}function Tl(t){if(!t)return null;const e=new Ht;e.setAttribute("position",new ft(t.pos,3)),e.setAttribute("uv",new ft(t.uv,2)),e.setAttribute("color",new bx(t.col,3,!0));const n=t.pos.length/3;return e.setIndex(n>65535?new qc(t.idx,1):new Xc(t.idx,1)),e}function xR(t,e,n,i,r){var u,p,_;if(Kr(t.name))return{air:!0,occluder:!1,solid:[],trans:[]};if(Tt(t.name)==="light"){const x=parseInt(((u=t.properties)==null?void 0:u.level)??"15",10)||0;return{air:!1,occluder:!1,solid:[],trans:[],light:x>0?{level:x,r:1,g:.97,b:.88}:void 0}}if(r&&JC(t.name)){const x=eR(t,r);if(x)return{air:!1,occluder:!1,solid:[],trans:[],entity:x}}const s=e?dR(Tt(t.name)):null;if(e&&s){const x=e.tileIndex(s==="lava"?"lava_still":"water_still");if(x!==void 0){const f=Tt(t.name)==="bubble_column"?8:parseInt(((p=t.properties)==null?void 0:p.level)??"0",10)||0;return{air:!1,occluder:!1,solid:[],trans:[],fluid:{family:s,tileIdx:x,tint:s==="water"?qx:null,translucent:s==="water",heightPx:fR(f)},light:s==="lava"?{level:15,...b0("lava")}:void 0}}}const o=uR(t.name,t.properties),a=o>0,l=a?{level:o,...b0(t.name)}:void 0,c=Tt(t.name),h=a&&(c==="repeater"||c==="comparator")?"redstone_torch":void 0;if(e&&(c==="end_portal"||c==="end_gateway")){const x=MR(c,e,a);if(x)return x.light=l,x}if(n&&e)try{const x=n.resolve(t.name,t.properties);if(x&&x.length){const g=yR(t,x,e,a,h);if(g.solid.length||g.trans.length||(_=g.emis)!=null&&_.length)return g.light=l,g}}catch{}const d=SR(t,e,i,a);return d.light=l,d}function yR(t,e,n,i=!1,r){const s=aR(t.name),o=lR(t.name,t.properties),a=[],l=[],c=[];let h=!1;const d=new O,u=new O;for(const p of e){const _=mR(p.x,p.y);for(const x of p.model.elements){x.from[0]===0&&x.from[1]===0&&x.from[2]===0&&x.to[0]===16&&x.to[1]===16&&x.to[2]===16&&(h=!0);const g=_.clone().multiply(pR(x)),f=new Be().extractRotation(g);for(const m in x.faces){const v=x.faces[m],S=n.tileIndex(v.tile),T=eu(t.name,t.properties),w=S!==void 0?n.uv(S):n.uv(n.whiteIndex),R=S!==void 0?v.tint?o[0]:1:T.r/255,y=S!==void 0?v.tint?o[1]:1:T.g/255,C=S!==void 0?v.tint?o[2]:1:T.b/255,U=bp(m,x.from,x.to,v.uv),L=[];for(let I=0;I<4;I++)u.set(U.pos[I*3],U.pos[I*3+1],U.pos[I*3+2]).applyMatrix4(g).multiplyScalar(1/16),L.push(u.x,u.y,u.z);const G=Us[m]??[0,1,0];d.set(G[0],G[1],G[2]).applyMatrix4(f).normalize();const z=x.shade?Ep(d.x,d.y,d.z):1,j=v.cull?hR(d.clone().set(Us[v.cull][0],Us[v.cull][1],Us[v.cull][2]).applyMatrix4(f)):-1,k=tu(gR(U.uv,v.rot),w),V={pos:L,uv:k,r:R*z,g:y*z,b:C*z,cull:j};((r?v.tile.endsWith(r):i)?c:s?l:a).push(V)}}}return{air:!1,occluder:h&&!s,solid:a,trans:l,emis:c.length?c:void 0}}function SR(t,e,n,i=!1){const r=eu(t.name,t.properties),s=r.r/255,o=r.g/255,a=r.b/255,l=qs(t.name,t.properties),c=r.transparent||((l==null?void 0:l.transparent)??!1),h=["east","west","up","down","south","north"],d=[];return h.forEach((u,p)=>{let _=s,x=o,g=a,f=e?e.uv(e.whiteIndex):[0,0,0,0];if(l&&e){const T=e.tileIndex(l.tiles[p]);if(T!==void 0){f=e.uv(T);const w=l.tints[p];_=w?w[0]:1,x=w?w[1]:1,g=w?w[2]:1}}const m=bp(u,[0,0,0],[16,16,16],[0,0,16,16]),v=Us[u],S=Ep(v[0],v[1],v[2]);d.push({pos:m.pos.map(T=>T/16),uv:tu(m.uv,f),r:_*S,g:x*S,b:g*S,cull:p})}),i?{air:!1,occluder:!c,solid:[],trans:[],emis:d}:{air:!1,occluder:!c,solid:c?[]:d,trans:c?d:[]}}function MR(t,e,n){const i=e.tileIndex("end_portal");if(i===void 0)return null;const r=e.uv(i),s=[],o=(a,l,c)=>{const h=bp(a,l,c,[0,0,16,16]);s.push({pos:h.pos.map(d=>d/16),uv:tu(h.uv,r),r:1,g:1,b:1,cull:-1})};if(t==="end_portal")o("up",[0,12,0],[16,12,16]),o("down",[0,12,0],[16,12,16]);else for(const a of["east","west","up","down","south","north"])o(a,[0,0,0],[16,16,16]);return n?{air:!1,occluder:!1,solid:[],trans:[],emis:s}:{air:!1,occluder:!1,solid:s,trans:[]}}function tu(t,e){const[n,i,r,s]=e,o=[];for(let a=0;a<4;a++)o.push(n+t[a*2]/16*(r-n),i+t[a*2+1]/16*(s-i));return o}const wR=8e6;function vh(t){return t<=0?0:t>=1?255:t*255+.5|0}class Al{constructor(e=65536){this.vc=0,this.qc=0,this.truncated=!1,this.cap=e,this.posBuf=new Float32Array(e*12),this.uvBuf=new Float32Array(e*8),this.colBuf=new Uint8Array(e*12),this.idxBuf=new Uint32Array(e*6)}grow(){const e=this.cap*2,n=new Float32Array(e*12);n.set(this.posBuf),this.posBuf=n;const i=new Float32Array(e*8);i.set(this.uvBuf),this.uvBuf=i;const r=new Uint8Array(e*12);r.set(this.colBuf),this.colBuf=r;const s=new Uint32Array(e*6);s.set(this.idxBuf),this.idxBuf=s,this.cap=e}add(e,n,i,r){if(this.truncated)return;if(this.qc>=wR){this.truncated=!0;return}this.qc>=this.cap&&this.grow();const s=this.vc,o=this.qc*12,a=this.qc*8,l=this.qc*12,c=this.qc*6,h=vh(e.r),d=vh(e.g),u=vh(e.b);for(let p=0;p<4;p++)this.posBuf[o+p*3]=e.pos[p*3]+n,this.posBuf[o+p*3+1]=e.pos[p*3+1]+i,this.posBuf[o+p*3+2]=e.pos[p*3+2]+r,this.uvBuf[a+p*2]=e.uv[p*2],this.uvBuf[a+p*2+1]=e.uv[p*2+1],this.colBuf[l+p*3]=h,this.colBuf[l+p*3+1]=d,this.colBuf[l+p*3+2]=u;this.idxBuf[c]=s,this.idxBuf[c+1]=s+1,this.idxBuf[c+2]=s+2,this.idxBuf[c+3]=s,this.idxBuf[c+4]=s+2,this.idxBuf[c+5]=s+3,this.vc+=4,this.qc++}raw(){return this.qc===0?null:{pos:this.posBuf.slice(0,this.qc*12),uv:this.uvBuf.slice(0,this.qc*8),col:this.colBuf.slice(0,this.qc*12),idx:this.vc>65535?this.idxBuf.slice(0,this.qc*6):new Uint16Array(this.idxBuf.subarray(0,this.qc*6))}}}const $l={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Pa{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ER=new lo(-1,1,1,-1,0,1);class bR extends Ht{constructor(){super(),this.setAttribute("position",new ft([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ft([0,2,0,0,2,0],2))}}const TR=new bR;class $x{constructor(e){this._mesh=new en(TR,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ER)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class AR extends Pa{constructor(e,n="tDiffuse"){super(),this.textureID=n,this.uniforms=null,this.material=null,e instanceof dn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=bc.clone(e.uniforms),this.material=new dn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new $x(this.material)}render(e,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class T0 extends Pa{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class CR extends Pa{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class RR{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const i=e.getSize(new ze);this._width=i.width,this._height=i.height,n=new Rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Bn}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new AR($l),this.copyPass.material.blending=wi,this.timer=new qw}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const n=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}T0!==void 0&&(o instanceof T0?i=!0:o instanceof CR&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new ze);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class PR extends Pa{constructor(e,n,i=null,r=null,s=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Qe}render(e,n,i){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const LR={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Qe(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class co extends Pa{constructor(e,n=1,i,r){super(),this.strength=n,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new ze(e.x,e.y):new ze(256,256),this.clearColor=new Qe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Rn(s,o,{type:Bn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new Rn(s,o,{type:Bn});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new Rn(s,o,{type:Bn});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),o=Math.round(o/2)}const a=LR;this.highPassUniforms=bc.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new dn({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ze(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=bc.clone($l.uniforms),this.blendMaterial=new dn({uniforms:this.copyUniforms,vertexShader:$l.vertexShader,fragmentShader:$l.fragmentShader,premultipliedAlpha:!0,blending:md,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Qe,this._oldClearAlpha=1,this._basic=new Sn,this._fsQuad=new $x(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,n){let i=Math.round(e/2),r=Math.round(n/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new ze(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,n,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=co.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=co.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const n=[],i=e/3;for(let r=0;r<e;r++)n.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new dn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ze(.5,.5)},direction:{value:new ze(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new dn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}co.BlurDirectionX=new ze(1,0);co.BlurDirectionY=new ze(0,1);const $s=Math.atan(1/Math.SQRT2),DR=1842207,NR=2,IR=1,xh=1.6,Di=new O(0,1,0),UR=.09,A0={north:[0,-1],south:[0,1],east:[1,0],west:[-1,0]},kR={iso:{dir:[Math.cos($s)*Math.cos(Math.PI/4),Math.sin($s),Math.cos($s)*Math.sin(Math.PI/4)],up:[0,1,0]},top:{dir:[0,1,0],up:[0,0,-1]},bottom:{dir:[0,-1,0],up:[0,0,1]},north:{dir:[0,0,-1],up:[0,1,0]},south:{dir:[0,0,1],up:[0,1,0]},east:{dir:[1,0,0],up:[0,1,0]},west:{dir:[-1,0,0],up:[0,1,0]}};class FR{constructor(e){this.opaqueMesh=null,this.transMesh=null,this.entityMesh=null,this.emissiveMesh=null,this.model=null,this.atlas=null,this.db=null,this.entityManifest=null,this.entityAtlas=null,this.baseEntityManifest=null,this.baseEntityTex=null,this.customEntityTex=null,this.skinToken=0,this.mobTex=null,this.mobAtlas=null,this.mobModels=null,this.mobLoadP=null,this.mobMat=null,this.entityTexReady=!1,this.entityManifestReady=!1,this.entityReadyResolve=null,this.entityReadyP=new Promise(i=>{this.entityReadyResolve=i}),this.view="free",this.boundingRadius=10,this.orthoDist=40,this.viewHalfHeight=10,this.orthoDir=new O(1,1,1).normalize(),this.orthoUp=new O(0,1,0),this.slice={x:[0,0],y:[0,0],z:[0,0]},this.worker=null,this.workerSeq=0,this.workerBusy=!1,this.pendingRebuild=!1,this.endPortalMesh=null,this.endPortalTex=null,this.endPortalCtx=null,this.endPortalLayers=[],this.framesGroup=null,this.framesTex=null,this.minecartsGroup=null,this.itemAtlasTex=null,this.itemAtlasData=null,this.itemAtlasLoading=!1,this.truncated=!1,this.rafId=0,this.tween=null,this._needsRender=!1,this.showcase=!1,this.opaqueLit=null,this.transLit=null,this.entityLit=null,this.lights=[],this.sun=null,this.composer=null,this.bloomPass=null,this.lightSamples=[],this.emitterLights=[],this.keys=new Set,this.hovering=!1,this.flyEnabled=!1,this.lastFlyT=0,this.flySpeedMul=1,this._flyVel=new O,this._flyDesired=new O,this._flyMove=new O,this.lookMode="none",this.lookPX=0,this.lookPY=0,this.lookMoveT=0,this.orbitVel={yaw:0,pitch:0},this.lookVel={yaw:0,pitch:0},this.raycaster=new Yw,this.pickNdc=new ze,this.highlight=null,this.highlightPair=null,this.signGroup=null,this.tmpV=new O,this.onLookDown=i=>{if(this.view==="free"){if(i.button===0)this.lookMode="fps";else if(i.button===2)this.lookMode="orbit";else return;this.orbitVel.yaw=0,this.orbitVel.pitch=0,this.lookVel.yaw=0,this.lookVel.pitch=0,this.lookPX=i.clientX,this.lookPY=i.clientY;try{this.canvas.setPointerCapture(i.pointerId)}catch{}}},this.onLookMove=i=>{if(this.lookMode==="none"||this.view!=="free")return;const r=i.clientX-this.lookPX,s=i.clientY-this.lookPY;this.lookPX=i.clientX,this.lookPY=i.clientY,!(!r&&!s)&&(this.lookMode==="fps"?this.lookBy(r,s):this.orbitBy(r,s))},this.onLookUp=i=>{if(this.lookMode!=="none"){performance.now()-this.lookMoveT>80&&(this.lookMode==="orbit"&&(this.orbitVel.yaw=0,this.orbitVel.pitch=0),this.lookMode==="fps"&&(this.lookVel.yaw=0,this.lookVel.pitch=0)),this.lookMode="none";try{this.canvas.releasePointerCapture(i.pointerId)}catch{}this.scheduleRender()}},this.onKeyDown=i=>{const r=document.activeElement;if(r&&/^(INPUT|TEXTAREA|SELECT)$/.test(r.tagName)||(this.hovering&&(i.key===" "||i.key.startsWith("Arrow"))&&i.preventDefault(),!this.flyEnabled||this.view!=="free"))return;const s=this.flyKey(i);s&&((s==="w"||s==="a"||s==="s"||s==="d"||s==="up")&&i.preventDefault(),this.keys.size===0&&(this.lastFlyT=performance.now()),this.keys.add(s),this.scheduleRender())},this.onKeyUp=i=>{const r=this.flyKey(i);r&&this.keys.delete(r)},this.onWindowBlur=()=>{this.keys.clear()},this.onWorkerMessage=i=>{var d;const{id:r,opaque:s,transparent:o,entity:a,emissive:l,lights:c,truncated:h}=i.data;this.workerBusy=!1,r===this.workerSeq&&(this.truncated=!!h,this.lightSamples=c??[],this.setGeometries({opaque:s?this.rawToGeo(s):null,transparent:o?this.rawToGeo(o):null,entity:a?this.rawToGeo(a):null,emissive:l?this.rawToGeo(l):null,lights:this.lightSamples}),this.showcase&&this.refreshEmitterLights(),this.scheduleRender(),(d=this.onRebuild)==null||d.call(this,this.truncated)),this.pendingRebuild&&(this.pendingRebuild=!1,this.rebuild())},this.animate=()=>{if(this._needsRender=!1,this.tween){const i=Math.min(1,(performance.now()-this.tween.start)/this.tween.dur),s=(i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2)*(Math.PI/2),o=this.tween.dir.clone().applyAxisAngle(Di,s),a=this.tween.up.clone().applyAxisAngle(Di,s);this.positionOrtho(o,a),i>=1?(this.orthoDir.copy(o),this.orthoUp.copy(a),this.tween=null):this.scheduleRender()}this.updateFly()&&this.scheduleRender(),this.coastOrbit()&&this.scheduleRender(),this.coastLook()&&this.scheduleRender(),this.controls.update()&&this.scheduleRender(),this.updateNearFar(),this.endPortalMesh&&this.drawEndPortal(performance.now()),this.showcase&&this.composer?this.composer.render():this.renderer.render(this.scene,this.activeCam),this.endPortalMesh&&this.scheduleRender(),this.showcase&&this.controls.autoRotate&&this.scheduleRender()},rt.enabled=!1,this.canvas=e,this.renderer=new p0({canvas:e,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=so,this.renderer.localClippingEnabled=!0,this.renderer.setClearColor(0,0),this.scene=new xw,this.scene.background=new Qe(DR);const n=this.aspect();this.perspCam=new In(55,n,.05,8e3),this.orthoCam=new lo(-10*n,10*n,10,-10,.05,8e3),this.activeCam=this.perspCam,this.clipPlanes=[new wn(new O(1,0,0)),new wn(new O(-1,0,0)),new wn(new O(0,1,0)),new wn(new O(0,-1,0)),new wn(new O(0,0,1)),new wn(new O(0,0,-1))],this.opaqueMat=new Sn({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes}),this.transMat=new Sn({vertexColors:!0,transparent:!0,opacity:.8,depthWrite:!1,clippingPlanes:this.clipPlanes}),this.entityMat=new Sn({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes}),this.emissiveMat=new Sn({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes,color:new Qe(xh,xh,xh),polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),this.highlightMat=new Tx({color:16023839,depthTest:!1,transparent:!0,clippingPlanes:this.clipPlanes}),this.loadEntityAtlas(),this.controls=this.makeControls(),this.resize(),this.scheduleRender(),this.setupFlyControls(),typeof Worker<"u"&&(this.worker=new Worker(new URL(""+new URL("meshWorker-DcbbmkhK.js",import.meta.url).href,import.meta.url)),this.worker.addEventListener("message",this.onWorkerMessage))}markEntityReady(e){e==="tex"?this.entityTexReady=!0:this.entityManifestReady=!0,this.entityTexReady&&this.entityManifestReady&&this.entityReadyResolve&&(this.entityReadyResolve(),this.entityReadyResolve=null)}whenEntityReady(){return this.entityReadyP}load(e){var n;this.model=e,this.boundingRadius=.5*Math.hypot(e.width,e.height,e.length),this.slice={x:[0,e.width-1],y:[0,e.height-1],z:[0,e.length-1]},this.updateClip(),this.rebuild(),this.buildSignText(),this.setView(this.view),this.scheduleRender(),(n=e.mobs)!=null&&n.length&&this.ensureMobAssets(),this.applySkins(e)}setAtlas(e){this.atlas=e,this.opaqueMat.map=e.texture,this.transMat.map=e.texture,this.emissiveMat.map=e.texture,this.opaqueMat.needsUpdate=!0,this.transMat.needsUpdate=!0,this.emissiveMat.needsUpdate=!0,this.syncLitMaps(),this.rebuild()}loadEntityAtlas(){new ah().load(cn("entity-atlas.png"),e=>{var n,i,r,s,o,a,l,c;e.magFilter=Mt,e.minFilter=Mt,e.generateMipmaps=!1,e.flipY=!1,this.baseEntityTex=e,this.customEntityTex||(this.entityMat.map=e),this.entityMat.needsUpdate=!0,this.syncLitMaps(),((i=(n=this.model)==null?void 0:n.minecarts)!=null&&i.length||(s=(r=this.model)==null?void 0:r.armorStands)!=null&&s.length||(a=(o=this.model)==null?void 0:o.boats)!=null&&a.length||(c=(l=this.model)==null?void 0:l.mobs)!=null&&c.length)&&this.buildMinecarts(),this.scheduleRender(),this.markEntityReady("tex")},void 0,()=>this.markEntityReady("tex")),fetch(cn("entity-atlas.json")).then(e=>e.json()).then(e=>{this.baseEntityManifest=e,this.customEntityTex||(this.entityManifest=e,this.entityAtlas=bl(e)),this.model&&this.rebuild()}).catch(()=>{}).finally(()=>this.markEntityReady("manifest"))}ensureMobAssets(){if(this.mobLoadP)return this.mobLoadP;const e={cache:"no-cache"},n=i=>new Promise(r=>{new ah().load(cn("mob-atlas.png")+(i?`?v=${i}`:""),s=>{s.magFilter=Mt,s.minFilter=Mt,s.generateMipmaps=!1,s.flipY=!1,this.mobTex=s,r()},void 0,()=>r())});return this.mobLoadP=Promise.all([fetch(cn("mob-atlas.json"),e).then(i=>i.json()).then(i=>(this.mobAtlas=bl(i),n(i.v??""))),fetch(cn("mob-models.json"),e).then(i=>i.json()).then(i=>{this.mobModels=i})]).catch(()=>{}).then(()=>{var i,r;(r=(i=this.model)==null?void 0:i.mobs)!=null&&r.length&&(this.buildMinecarts(),this.scheduleRender())}),this.mobLoadP}loadImage(e){return new Promise((n,i)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>n(r),r.onerror=i,r.src=e})}async applySkins(e){var g;const n=++this.skinToken,i=e.skins;if(!i||!i.size){this.customEntityTex&&(this.customEntityTex.dispose(),this.customEntityTex=null,this.baseEntityTex&&(this.entityMat.map=this.baseEntityTex),this.entityMat.needsUpdate=!0,this.syncLitMaps(),this.baseEntityManifest&&(this.entityManifest=this.baseEntityManifest,this.entityAtlas=bl(this.baseEntityManifest)),this.rebuild());return}await this.entityReadyP;const r=this.baseEntityManifest;if(!r||n!==this.skinToken||this.model!==e)return;const s=[...i];let o;try{o=await this.loadImage(cn("entity-atlas.png"))}catch{return}const a=await Promise.all(s.map(([,f])=>this.loadImage(`/api/skin/${f}`).catch(()=>null)));if(n!==this.skinToken||this.model!==e)return;const[l,c]=r.size,h=64,d=document.createElement("canvas");d.width=Math.max(l,h),d.height=c+s.length*h;const u=d.getContext("2d");u.imageSmoothingEnabled=!1,u.drawImage(o,0,0);const p={...r.tex};s.forEach(([f],m)=>{const v=a[m];if(!v)return;const S=c+m*h;u.drawImage(v,0,S),p[f]={x:0,y:S,w:h,h}});const _=new ih(d);_.magFilter=Mt,_.minFilter=Mt,_.generateMipmaps=!1,_.flipY=!1,_.needsUpdate=!0,(g=this.customEntityTex)==null||g.dispose(),this.customEntityTex=_,this.entityMat.map=_,this.entityMat.needsUpdate=!0,this.syncLitMaps();const x={size:[d.width,d.height],tex:p};this.entityManifest=x,this.entityAtlas=bl(x),this.rebuild()}setModelDB(e){this.db=e,this.rebuild()}setResources(e,n){this.atlas=e,this.opaqueMat.map=e.texture,this.transMat.map=e.texture,this.emissiveMat.map=e.texture,this.opaqueMat.needsUpdate=!0,this.transMat.needsUpdate=!0,this.emissiveMat.needsUpdate=!0,this.syncLitMaps(),this.db=n,this.rebuild()}setView(e){if(this.view=e,this.tween=null,this.activeCam=e==="free"?this.perspCam:this.orthoCam,this.controls.dispose(),this.controls=this.makeControls(),e==="free")this.frameFree();else{const n=kR[e];this.orthoDir.set(n.dir[0],n.dir[1],n.dir[2]).normalize(),this.orthoUp.set(n.up[0],n.up[1],n.up[2]),this.frameOrtho()}this.scheduleRender()}rotate90(){this.view!=="free"&&(this.tween={dir:this.orthoDir.clone(),up:this.orthoUp.clone(),start:performance.now(),dur:300},this.scheduleRender())}setShowcase(e){e!==this.showcase&&(e?(this.ensureShowcase(),this.showcase=!0,this.setView("free"),this.ensureNormals(this.opaqueMesh),this.ensureNormals(this.entityMesh),this.ensureNormals(this.transMesh),this.swapShowcaseMaterials(!0),this.applyShadowFlags(!0),this.refreshEmitterLights(),this.requestShadowUpdate(),this.controls.autoRotate=!0,this.controls.autoRotateSpeed=1.1):(this.showcase=!1,this.controls.autoRotate=!1,this.swapShowcaseMaterials(!1),this.applyShadowFlags(!1),this.clearEmitterLights()),this.scheduleRender())}refreshEmitterLights(){if(this.clearEmitterLights(),!!this.showcase)for(const e of this.lightSamples){const n=Math.max(6,e.level*.8+5),i=Math.min(1.6,1+.25*Math.log2(e.count+1)),r=NR*(.45+.55*(e.level/15))*i,s=new Hw(new Qe(e.r,e.g,e.b),r,n,IR);s.position.set(e.x,e.y,e.z),s.castShadow=!1,this.scene.add(s),this.emitterLights.push(s)}}clearEmitterLights(){for(const e of this.emitterLights)this.scene.remove(e);this.emitterLights.length=0}requestShadowUpdate(){this.sun&&(this.sun.shadow.needsUpdate=!0)}applyShadowFlags(e){this.opaqueMesh&&(this.opaqueMesh.castShadow=e,this.opaqueMesh.receiveShadow=e),this.entityMesh&&(this.entityMesh.castShadow=e,this.entityMesh.receiveShadow=e),this.transMesh&&(this.transMesh.castShadow=!1,this.transMesh.receiveShadow=e),this.emissiveMesh&&(this.emissiveMesh.castShadow=e,this.emissiveMesh.receiveShadow=!1)}get isShowcase(){return this.showcase}setShowcaseRotation(e){this.showcase&&(this.controls.autoRotate=e,this.scheduleRender())}setFlySpeed(e){this.flySpeedMul=Math.max(.05,e)}setFlyEnabled(e){this.flyEnabled=e,e||this.keys.clear(),this.scheduleRender()}get flySpeed(){return this.flySpeedMul}async capturePhoto(e){const n=this.renderer.domElement.width,i=this.renderer.domElement.height;if(!n||!i)return null;this.sun&&(this.sun.shadow.needsUpdate=!0);const r=this.scene.background;this.scene.background=null;const s=this.renderer.getContext(),o=new Uint8Array(n*i*4),a=this.showcase&&!!this.composer;if(a){this.composer.render(),s.readPixels(0,0,n,i,s.RGBA,s.UNSIGNED_BYTE,o),this.renderer.render(this.scene,this.activeCam);const f=new Uint8Array(n*i*4);s.readPixels(0,0,n,i,s.RGBA,s.UNSIGNED_BYTE,f);for(let m=3;m<o.length;m+=4)o[m]=f[m]}else this.renderer.render(this.scene,this.activeCam),s.readPixels(0,0,n,i,s.RGBA,s.UNSIGNED_BYTE,o);this.scene.background=r;const l=document.createElement("canvas");l.width=n,l.height=i;const c=l.getContext("2d"),h=c.createImageData(n,i),d=h.data,u=n*4;for(let f=0;f<i;f++){const m=(i-1-f)*u,v=f*u;for(let S=0;S<u;S+=4){const T=o[m+S+3];if(a||T===0||T===255)d[v+S]=o[m+S],d[v+S+1]=o[m+S+1],d[v+S+2]=o[m+S+2],d[v+S+3]=T;else{const w=255/T;d[v+S]=Math.min(255,o[m+S]*w),d[v+S+1]=Math.min(255,o[m+S+1]*w),d[v+S+2]=Math.min(255,o[m+S+2]*w),d[v+S+3]=T}}}if(c.putImageData(h,0,0),!!!(e&&(e.imagen||e.color))){const f=await new Promise(m=>l.toBlob(v=>m(v),"image/png"));return this.scheduleRender(),f}const _=document.createElement("canvas");_.width=n,_.height=i;const x=_.getContext("2d");if(e.color&&(x.fillStyle=e.color,x.fillRect(0,0,n,i)),e.imagen)try{const f=await new Promise((T,w)=>{const R=new Image;R.crossOrigin="anonymous",R.onload=()=>T(R),R.onerror=w,R.src=e.imagen}),m=Math.max(n/f.width,i/f.height),v=f.width*m,S=f.height*m;x.drawImage(f,(n-v)/2,(i-S)/2,v,S)}catch{}x.drawImage(l,0,0);const g=await new Promise(f=>_.toBlob(m=>f(m),"image/jpeg",.92));return this.scheduleRender(),g}swapShowcaseMaterials(e){this.opaqueMesh&&(this.opaqueMesh.material=e?this.opaqueLit:this.opaqueMat),this.transMesh&&(this.transMesh.material=e?this.transLit:this.transMat),this.entityMesh&&(this.entityMesh.material=e?this.entityLit:this.entityMat),this.emissiveMesh&&(this.emissiveMesh.material=e?this.emissiveMat:this.opaqueMat)}syncLitMaps(){this.opaqueLit&&(this.opaqueLit.map=this.opaqueMat.map,this.opaqueLit.needsUpdate=!0,this.transLit.map=this.transMat.map,this.transLit.needsUpdate=!0,this.entityLit.map=this.entityMat.map,this.entityLit.needsUpdate=!0)}ensureShowcase(){if(this.opaqueLit){this.syncLitMaps();return}this.opaqueLit=new sh({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes}),this.entityLit=new sh({vertexColors:!0,alphaTest:.5,clippingPlanes:this.clipPlanes}),this.transLit=new sh({vertexColors:!0,transparent:!0,opacity:.8,depthWrite:!1,clippingPlanes:this.clipPlanes}),this.syncLitMaps();const e=new Ww(16777215,.85),n=new zw(13820159,3816756,.75),i=new Bg(16774112,1.35),r=new Bg(10469631,.22);r.position.set(-.5,.4,-.6);for(const l of[e,n,i,r])this.scene.add(l),this.lights.push(l);this.sun=i;const s=Math.max(8,this.boundingRadius);i.position.set(.55,1,.4).normalize().multiplyScalar(s*2.2),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),i.shadow.camera.left=-s*1.3,i.shadow.camera.right=s*1.3,i.shadow.camera.top=s*1.3,i.shadow.camera.bottom=-s*1.3,i.shadow.camera.near=.5,i.shadow.camera.far=s*5,i.shadow.bias=-8e-4,i.shadow.normalBias=Math.min(.3,Math.max(.05,s*.004)),i.shadow.autoUpdate=!1,i.shadow.camera.updateProjectionMatrix(),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=sx;const o=this.canvas.clientWidth||1,a=this.canvas.clientHeight||1;this.composer=new RR(this.renderer),this.composer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.composer.setSize(o,a),this.composer.addPass(new PR(this.scene,this.perspCam)),this.bloomPass=new co(new ze(o,a),.18,.35,.9),this.composer.addPass(this.bloomPass)}setSlice(e,n,i){this.slice[e]=[Math.min(n,i),Math.max(n,i)],this.updateClip(),this.scheduleRender(),this.rebuild()}setBackground(e){this.renderer.domElement.style.backgroundImage="",this.scene.background=new Qe(e),this.scheduleRender()}setBackgroundImage(e){e&&(this.scene.background=null),this.scheduleRender()}resetView(){this.view==="free"?this.frameFree():this.frameOrtho(),this.scheduleRender()}pick(e,n){if(!this.model)return null;const i=this.canvas.getBoundingClientRect();if(i.width===0||i.height===0)return null;this.pickNdc.set((e-i.left)/i.width*2-1,-((n-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.pickNdc,this.activeCam);const{width:r,height:s,length:o,blocks:a,palette:l}=this.model,c=this.raycaster.ray,h=[c.origin.x+r/2,c.origin.y+s/2,c.origin.z+o/2],d=[c.direction.x,c.direction.y,c.direction.z],u=[r,s,o];let p=0,_=1/0;for(let k=0;k<3;k++)if(Math.abs(d[k])<1e-9){if(h[k]<0||h[k]>u[k])return null}else{let V=(0-h[k])/d[k],P=(u[k]-h[k])/d[k];if(V>P){const I=V;V=P,P=I}V>p&&(p=V),P<_&&(_=P)}if(p>_)return null;const x=p+1e-4;let g=Math.min(r-1,Math.max(0,Math.floor(h[0]+d[0]*x))),f=Math.min(s-1,Math.max(0,Math.floor(h[1]+d[1]*x))),m=Math.min(o-1,Math.max(0,Math.floor(h[2]+d[2]*x)));const v=d[0]>=0?1:-1,S=d[1]>=0?1:-1,T=d[2]>=0?1:-1,w=d[0]!==0?Math.abs(1/d[0]):1/0,R=d[1]!==0?Math.abs(1/d[1]):1/0,y=d[2]!==0?Math.abs(1/d[2]):1/0;let C=d[0]!==0?((v>0?g+1:g)-h[0])/d[0]:1/0,U=d[1]!==0?((S>0?f+1:f)-h[1])/d[1]:1/0,L=d[2]!==0?((T>0?m+1:m)-h[2])/d[2]:1/0;const G=this.slice.x,z=this.slice.y,j=this.slice.z;for(let k=0;k<=r+s+o;k++){if(g>=G[0]&&g<=G[1]&&f>=z[0]&&f<=z[1]&&m>=j[0]&&m<=j[1]){const V=l[a[(f*o+m)*r+g]];if(V&&!Kr(V.name))return{x:g,y:f,z:m,state:V}}if(C<U&&C<L){if(g+=v,g<0||g>=r)break;C+=w}else if(U<L){if(f+=S,f<0||f>=s)break;U+=R}else{if(m+=T,m<0||m>=o)break;L+=y}}return null}makeSignTexture(e){const r=document.createElement("canvas");r.width=256,r.height=144;const s=r.getContext("2d");s.fillStyle="#1a1a1a",s.textAlign="center",s.textBaseline="middle";const o=144/4;for(let l=0;l<Math.min(e.length,4);l++){const c=e[l];if(!c)continue;s.font="bold 30px sans-serif";const h=s.measureText(c).width,d=238,u=h>d?d/h:1;s.save(),s.translate(256/2,o*(l+.5)),s.scale(u,1),s.fillText(c,0,0),s.restore()}const a=new ih(r);return a.anisotropy=4,a}disposeSignGroup(){var e;if(this.signGroup){for(const n of this.signGroup.children){const i=n;i.geometry.dispose();const r=i.material;(e=r.map)==null||e.dispose(),r.dispose()}this.scene.remove(this.signGroup),this.signGroup=null}}buildSignText(){var c,h,d,u;this.disposeSignGroup();const e=this.model;if(!e||!e.signs||e.signs.size===0)return;const n=e.width,i=e.length,r=n/2,s=e.height/2,o=i/2,a=new Hr,l=(p,_,x,g,f,m)=>{if(!p.some(T=>T))return;const v=new Sn({map:this.makeSignTexture(p),transparent:!0,depthWrite:!1,side:un,clippingPlanes:this.clipPlanes,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),S=new en(new Ra(.82,.46),v);S.position.set(_,x,g),S.rotation.y=Math.atan2(f,m),S.renderOrder=5,S.frustumCulled=!1,a.add(S)};for(const[p,_]of e.signs){const x=e.palette[e.blocks[p]];if(!x)continue;const g=p%n,f=Math.floor(p/n)%i,m=Math.floor(p/(n*i)),v=x.name.includes("hanging"),S=x.name.includes("wall")&&!v;let T,w,R,y;if(v){if(x.name.includes("wall")){const z=A0[((c=x.properties)==null?void 0:c.facing)??"south"]??[0,1];T=z[0],w=z[1]}else{const z=(parseInt(((h=x.properties)==null?void 0:h.rotation)??"0",10)||0)*22.5*Math.PI/180;T=-Math.sin(z),w=Math.cos(z)}R=5,y=1.1}else if(S){const z=A0[((d=x.properties)==null?void 0:d.facing)??"south"]??[0,1];T=z[0],w=z[1],R=8.5,y=-5.7}else{const z=(parseInt(((u=x.properties)==null?void 0:u.rotation)??"0",10)||0)*22.5*Math.PI/180;T=-Math.sin(z),w=Math.cos(z),R=13.5,y=1.2}const C=(z,j)=>[g-r+z/16,m-s+R/16,f-o+j/16],[U,L,G]=C(8+T*y,8+w*y);if(l(_.front,U,L,G,T,w),!S&&_.back.length){const[z,j,k]=C(8-T*y,8-w*y);l(_.back,z,j,k,-T,-w)}}this.scene.add(a),this.signGroup=a,this.scheduleRender()}setHighlight(e){if(!e||!this.model){this.highlight&&(this.highlight.visible=!1),this.scheduleRender();return}if(!this.highlight){const s=new Jr(1.001,1.001,1.001),o=new Dg(s);s.dispose(),this.highlight=new Lg(o,this.highlightMat),this.highlight.renderOrder=999,this.highlight.frustumCulled=!1,this.scene.add(this.highlight)}const{width:n,height:i,length:r}=this.model;this.highlight.position.set(e.x-n/2+.5,e.y-i/2+.5,e.z-r/2+.5),this.highlight.visible=!0,this.scheduleRender()}setHighlightPair(e){if(!e||!this.model){this.highlightPair&&(this.highlightPair.visible=!1),this.scheduleRender();return}if(!this.highlightPair){const s=new Jr(1.001,1.001,1.001),o=new Dg(s);s.dispose(),this.highlightPair=new Lg(o,this.highlightMat),this.highlightPair.renderOrder=999,this.highlightPair.frustumCulled=!1,this.scene.add(this.highlightPair)}const{width:n,height:i,length:r}=this.model;this.highlightPair.position.set(e.x-n/2+.5,e.y-i/2+.5,e.z-r/2+.5),this.highlightPair.visible=!0,this.scheduleRender()}async waitForIdle(){this.mobLoadP&&await this.mobLoadP,!(!this.workerBusy&&!this.pendingRebuild)&&await new Promise(e=>{const n=setInterval(()=>{!this.workerBusy&&!this.pendingRebuild&&(clearInterval(n),e())},16)})}getEntityManifest(){return this.entityManifest}get isOrtho(){return this.view!=="free"}get layerCount(){return this.model?this.model.height:0}get modelSize(){return this.model?{width:this.model.width,height:this.model.height,length:this.model.length}:{width:0,height:0,length:0}}renderNow(){this.renderer.render(this.scene,this.activeCam)}async captureIso(e=1024,n=0){if(!this.model)return null;const i=e*2,r=document.createElement("canvas");r.width=i,r.height=i;const s=new p0({canvas:r,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setPixelRatio(1),s.setSize(i,i,!1),s.outputColorSpace=so,s.localClippingEnabled=!0;const o=this.scene.background;this.scene.background=null;const a=new lo(-e/2,e/2,e/2,-e/2,.05,8e3),l=new O(Math.cos($s)*Math.cos(Math.PI/4),Math.sin($s),Math.cos($s)*Math.sin(Math.PI/4)).normalize(),c=new O(0,1,0);if(n%4!==0){const g=n%4*(Math.PI/2);l.applyAxisAngle(Di,g)}const h=this.boundingRadius,d=h*4,u=h*1.05;a.top=u,a.bottom=-u,a.left=-u,a.right=u,a.near=.05,a.far=d+h*6,a.position.copy(new O(0,0,0)).addScaledVector(l,d),a.up.copy(c),a.lookAt(0,0,0),a.zoom=1,a.updateProjectionMatrix(),s.render(this.scene,a);const p=document.createElement("canvas");p.width=e,p.height=e;const _=p.getContext("2d");_.imageSmoothingEnabled=!0,_.imageSmoothingQuality="high",_.drawImage(r,0,0,i,i,0,0,e,e);const x=await new Promise(g=>p.toBlob(f=>g(f),"image/webp",.88));return this.scene.background=o,s.dispose(),this.scheduleRender(),x}get vertexCount(){var n,i,r,s,o,a,l,c;let e=0;return(n=this.opaqueMesh)!=null&&n.visible&&(e+=((i=this.opaqueMesh.geometry.getAttribute("position"))==null?void 0:i.count)??0),(r=this.entityMesh)!=null&&r.visible&&(e+=((s=this.entityMesh.geometry.getAttribute("position"))==null?void 0:s.count)??0),(o=this.emissiveMesh)!=null&&o.visible&&(e+=((a=this.emissiveMesh.geometry.getAttribute("position"))==null?void 0:a.count)??0),(l=this.transMesh)!=null&&l.visible&&(e+=((c=this.transMesh.geometry.getAttribute("position"))==null?void 0:c.count)??0),e}resize(){var i;const e=this.canvas.clientWidth,n=this.canvas.clientHeight;e===0||n===0||(this.renderer.setSize(e,n,!1),this.perspCam.aspect=e/n,this.perspCam.updateProjectionMatrix(),this.updateOrtho(),this.composer&&(this.composer.setSize(e,n),(i=this.bloomPass)==null||i.setSize(e,n)),this.scheduleRender())}dispose(){var e,n,i,r,s,o,a,l,c;cancelAnimationFrame(this.rafId),this.disposeEndPortal(),this.disposeItemFrames(),this.disposeMinecarts(),(e=this.itemAtlasTex)==null||e.dispose(),(n=this.customEntityTex)==null||n.dispose(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onWindowBlur),this.canvas.removeEventListener("pointerdown",this.onLookDown),this.canvas.removeEventListener("pointermove",this.onLookMove),this.canvas.removeEventListener("pointerup",this.onLookUp),this.controls.dispose(),(i=this.worker)==null||i.terminate(),this.worker=null,this.clearEmitterLights(),this.disposeMesh(this.opaqueMesh),this.disposeMesh(this.transMesh),this.disposeMesh(this.entityMesh),this.disposeMesh(this.emissiveMesh),this.highlight&&(this.highlight.geometry.dispose(),this.scene.remove(this.highlight)),this.highlightPair&&(this.highlightPair.geometry.dispose(),this.scene.remove(this.highlightPair)),this.highlightMat.dispose(),this.disposeSignGroup(),this.opaqueMat.dispose(),this.transMat.dispose(),this.emissiveMat.dispose(),(r=this.entityMat.map)==null||r.dispose(),this.entityMat.dispose(),(s=this.composer)==null||s.dispose(),(o=this.bloomPass)==null||o.dispose(),(a=this.opaqueLit)==null||a.dispose(),(l=this.transLit)==null||l.dispose(),(c=this.entityLit)==null||c.dispose(),this.renderer.dispose()}updateClip(){if(!this.model)return;const{width:e,height:n,length:i}=this.model,r=this.slice,s=.002;this.clipPlanes[0].set(new O(1,0,0),-(r.x[0]-e/2)+s),this.clipPlanes[1].set(new O(-1,0,0),r.x[1]+1-e/2+s),this.clipPlanes[2].set(new O(0,1,0),-(r.y[0]-n/2)+s),this.clipPlanes[3].set(new O(0,-1,0),r.y[1]+1-n/2+s),this.clipPlanes[4].set(new O(0,0,1),-(r.z[0]-i/2)+s),this.clipPlanes[5].set(new O(0,0,-1),r.z[1]+1-i/2+s)}makeControls(){const e=new lC(this.activeCam,this.canvas);return e.enableDamping=!0,e.dampingFactor=.08,e.zoomToCursor=!0,e.enablePan=this.view!=="free",e.enableZoom=!0,e.enableRotate=!1,e.minDistance=.01,e.maxDistance=this.boundingRadius*12,e.target.set(0,0,0),e.addEventListener("change",()=>this.scheduleRender()),e.addEventListener("start",()=>this.scheduleRender()),e}setupFlyControls(){this.canvas.addEventListener("pointerenter",()=>{this.hovering=!0}),this.canvas.addEventListener("pointerleave",()=>{this.hovering=!1}),this.canvas.addEventListener("pointerdown",this.onLookDown),this.canvas.addEventListener("pointermove",this.onLookMove),this.canvas.addEventListener("pointerup",this.onLookUp),this.canvas.addEventListener("contextmenu",e=>e.preventDefault()),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onWindowBlur)}lookBy(e,n){const r=-e*.0024,s=-n*.0024;this.applyLook(r,s),this.lookVel.yaw=r,this.lookVel.pitch=s,this.lookMoveT=performance.now(),this.scheduleRender()}applyLook(e,n){const i=this.perspCam,r=new O().subVectors(this.controls.target,i.position),s=r.length()||1;r.normalize(),r.applyAxisAngle(Di,e);const o=new O().crossVectors(r,Di).normalize(),a=r.clone().applyAxisAngle(o,n);Math.abs(a.y)<.995&&r.copy(a),r.normalize(),this.controls.target.copy(i.position).addScaledVector(r,s)}coastLook(){if(this.lookMode==="fps")return!1;const e=this.lookVel;return Math.abs(e.yaw)<1e-4&&Math.abs(e.pitch)<1e-4?(e.yaw=0,e.pitch=0,!1):(this.applyLook(e.yaw,e.pitch),e.yaw*=.9,e.pitch*=.9,!0)}orbitBy(e,n){const r=-e*.005,s=-n*.005;this.applyOrbit(r,s),this.orbitVel.yaw=r,this.orbitVel.pitch=s,this.lookMoveT=performance.now(),this.scheduleRender()}applyOrbit(e,n){const i=this.perspCam,r=i.position.clone();r.applyAxisAngle(Di,e);const s=new O().crossVectors(Di,r).normalize(),o=r.clone().applyAxisAngle(s,n);i.position.copy(Math.abs(o.clone().normalize().y)<.995?o:r),this.controls.target.set(0,0,0)}coastOrbit(){if(this.lookMode==="orbit")return!1;const e=this.orbitVel;return Math.abs(e.yaw)<1e-4&&Math.abs(e.pitch)<1e-4?(e.yaw=0,e.pitch=0,!1):(this.applyOrbit(e.yaw,e.pitch),e.yaw*=.92,e.pitch*=.92,!0)}flyKey(e){if(e.key===" ")return"up";if(e.key==="Shift")return"down";switch(e.key.toLowerCase()){case"w":return"w";case"a":return"a";case"s":return"s";case"d":return"d";default:return null}}updateFly(){if(this.view!=="free")return this.keys.size&&this.keys.clear(),this._flyVel.set(0,0,0),!1;const e=performance.now();let n=(e-this.lastFlyT)/1e3;if(this.lastFlyT=e,n>.1&&(n=.1),n<=0)return this._flyVel.lengthSq()>0;const i=this.perspCam,r=this.tmpV.subVectors(this.controls.target,i.position).normalize(),s=new O().crossVectors(r,i.up).normalize();this._flyDesired.set(0,0,0),this.keys.has("w")&&this._flyDesired.add(r),this.keys.has("s")&&this._flyDesired.addScaledVector(r,-1),this.keys.has("d")&&this._flyDesired.add(s),this.keys.has("a")&&this._flyDesired.addScaledVector(s,-1),this.keys.has("up")&&this._flyDesired.add(Di),this.keys.has("down")&&this._flyDesired.addScaledVector(Di,-1),this._flyDesired.lengthSq()>0&&this._flyDesired.normalize().multiplyScalar(this.boundingRadius*.9*this.flySpeedMul);const o=1-Math.exp(-n/UR);this._flyVel.lerp(this._flyDesired,o);const a=(this.boundingRadius*.001)**2;return this._flyVel.lengthSq()<a&&this._flyDesired.lengthSq()===0?(this._flyVel.set(0,0,0),!1):(this._flyMove.copy(this._flyVel).multiplyScalar(n),i.position.add(this._flyMove),this.controls.target.add(this._flyMove),!0)}scheduleRender(){this._needsRender||(this._needsRender=!0,this.rafId=requestAnimationFrame(this.animate))}frameFree(){const e=this.boundingRadius,n=Mx.degToRad(this.perspCam.fov),i=e/Math.sin(n/2)*1.1;this.controls.target.set(0,0,0),this.perspCam.position.copy(new O(1,.7,1).normalize().multiplyScalar(i)),this.perspCam.near=.05,this.perspCam.far=e*12,this.perspCam.updateProjectionMatrix(),this.controls.update()}frameOrtho(){const e=this.boundingRadius;this.orthoDist=e*4,this.viewHalfHeight=e*1.05,this.orthoCam.near=.05,this.orthoCam.far=this.orthoDist+e*6,this.orthoCam.zoom=1,this.controls.target.set(0,0,0),this.updateOrtho(),this.positionOrtho(this.orthoDir,this.orthoUp),this.controls.update()}positionOrtho(e,n){this.orthoCam.position.copy(this.controls.target).addScaledVector(e,this.orthoDist),this.orthoCam.up.copy(n),this.orthoCam.lookAt(this.controls.target)}updateOrtho(){const e=this.aspect(),n=this.viewHalfHeight;this.orthoCam.top=n,this.orthoCam.bottom=-n,this.orthoCam.left=-n*e,this.orthoCam.right=n*e,this.orthoCam.updateProjectionMatrix()}aspect(){const e=this.canvas.clientWidth,n=this.canvas.clientHeight;return e>0&&n>0?e/n:1}rawToGeo(e){const n=new Ht;n.setAttribute("position",new ft(e.pos,3)),n.setAttribute("uv",new ft(e.uv,2)),n.setAttribute("color",new bx(e.col,3,!0));const i=e.pos.length/3;return n.setIndex(i>65535?new qc(e.idx,1):new Xc(e.idx,1)),n}rebuild(){var n,i;if(!this.model)return;if(this.buildEndPortal(),this.buildItemFrames(),this.buildMinecarts(),this.worker){if(this.workerBusy){this.pendingRebuild=!0;return}this.workerBusy=!0;const r=++this.workerSeq,s=((n=this.atlas)==null?void 0:n.getRawData())??null,o=((i=this.db)==null?void 0:i.getRawData())??null,a=this.model.blocks.slice();this.worker.postMessage({id:r,modelRaw:{width:this.model.width,height:this.model.height,length:this.model.length,blocks:a,palette:this.model.palette},atlasRaw:s,entityManifest:this.entityManifest,dbRaw:o,slice:this.slice},[a.buffer]);return}const e=vR(this.model,this.atlas,this.db,this.slice,this.entityAtlas);this.lightSamples=e.lights,this.setGeometries(e),this.showcase&&this.refreshEmitterLights()}disposeEndPortal(){var e;this.endPortalMesh&&(this.scene.remove(this.endPortalMesh),this.endPortalMesh.geometry.dispose(),this.endPortalMesh.material.dispose(),this.endPortalMesh=null),(e=this.endPortalTex)==null||e.dispose(),this.endPortalTex=null,this.endPortalCtx=null}buildEndPortal(){this.disposeEndPortal();const e=this.model;if(!e)return;const{width:n,height:i,length:r,blocks:s,palette:o}=e,a=this.slice.x,l=this.slice.y,c=this.slice.z,h=[],d=[],u=(S,T,w,R)=>{h.push(...S,...T,...w,...S,...w,...R),d.push(0,0,1,0,1,1,0,0,1,1,0,1)};let p=!1;for(let S=l[0];S<=l[1];S++)for(let T=c[0];T<=c[1];T++)for(let w=a[0];w<=a[1];w++){const R=o[s[(S*r+T)*n+w]];if(!R)continue;const y=Tt(R.name);if(y!=="end_portal"&&y!=="end_gateway")continue;p=!0;const C=w-n/2,U=S-i/2,L=T-r/2;if(y==="end_portal"){const G=U+.75;u([C,G,L],[C+1,G,L],[C+1,G,L+1],[C,G,L+1])}else{const G=C,z=C+1,j=U,k=U+1,V=L,P=L+1;u([G,k,P],[z,k,P],[z,k,V],[G,k,V]),u([G,j,V],[z,j,V],[z,j,P],[G,j,P]),u([G,j,P],[z,j,P],[z,k,P],[G,k,P]),u([z,j,V],[G,j,V],[G,k,V],[z,k,V]),u([z,j,P],[z,j,V],[z,k,V],[z,k,P]),u([G,j,V],[G,j,P],[G,k,P],[G,k,V])}}if(!p)return;const _=new Ht;_.setAttribute("position",new ft(h,3)),_.setAttribute("uv",new ft(d,2));const x=128,g=document.createElement("canvas");g.width=g.height=x,this.endPortalCtx=g.getContext("2d"),this.endPortalTex=new ih(g),this.endPortalTex.minFilter=Yt,this.endPortalTex.magFilter=Yt;const f=[[44,196,196],[60,210,215],[150,90,185],[120,70,170],[210,225,255],[90,150,220]],m=(S,T)=>Array.from({length:S},()=>{const w=f[Math.random()*f.length|0];return{x:Math.random(),y:Math.random(),r:w[0],g:w[1],b:w[2],ph:Math.random()*Math.PI*2,sz:1+Math.random()*T}});this.endPortalLayers=[m(70,1.5),m(50,2.5),m(30,3.5)];const v=new Sn({map:this.endPortalTex,side:un,clippingPlanes:this.clipPlanes,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});this.endPortalMesh=new en(_,v),this.endPortalMesh.renderOrder=3,this.scene.add(this.endPortalMesh),this.drawEndPortal(performance.now())}drawEndPortal(e){const n=this.endPortalCtx;if(!n)return;const i=n.canvas.width,r=e/1e3;n.globalCompositeOperation="source-over",n.fillStyle="#080b1a",n.fillRect(0,0,i,i),n.globalCompositeOperation="lighter";const s=[.012,.025,.045];this.endPortalLayers.forEach((o,a)=>{const l=r*s[a]%1;for(const c of o){const h=(c.x+l)%1*i,d=(c.y+l*.6)%1*i,u=.4+.6*(.5+.5*Math.sin(r*2+c.ph));n.fillStyle=`rgba(${c.r},${c.g},${c.b},${u.toFixed(3)})`,n.fillRect(h,d,c.sz,c.sz)}}),n.globalCompositeOperation="source-over",this.endPortalTex&&(this.endPortalTex.needsUpdate=!0)}disposeItemFrames(){var e;if(this.framesGroup){for(const n of this.framesGroup.children){const i=n;i.geometry.dispose(),i.material.dispose()}this.scene.remove(this.framesGroup),this.framesGroup=null,(e=this.framesTex)==null||e.dispose(),this.framesTex=null}}ensureItemAtlas3D(){this.itemAtlasData||this.itemAtlasLoading||(this.itemAtlasLoading=!0,Promise.all([fetch(cn("item-atlas.json")).then(e=>e.json()),new Promise((e,n)=>new ah().load(cn("item-atlas.png"),i=>{i.magFilter=Mt,i.minFilter=Mt,i.generateMipmaps=!1,i.flipY=!1,e(i)},void 0,n))]).then(([e,n])=>{this.itemAtlasData=e,this.itemAtlasTex=n,this.buildItemFrames(),this.scheduleRender()}).catch(()=>{}))}buildItemFrames(){this.disposeItemFrames();const e=this.model;if(!e||!e.itemFrames||e.itemFrames.length===0)return;this.ensureItemAtlas3D();const{width:n,height:i,length:r}=e,s=this.slice.x,o=this.slice.y,a=this.slice.z,l=[[0,-1,0],[0,1,0],[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]],c=[],h=[],d=[],u=[],p=this.itemAtlasData,_=(E,D,J,Y,ne)=>E.push(D[0],D[1],D[2],J[0],J[1],J[2],Y[0],Y[1],Y[2],D[0],D[1],D[2],Y[0],Y[1],Y[2],ne[0],ne[1],ne[2]),x=(E,D)=>E.push(D[0],D[3],D[2],D[3],D[2],D[1],D[0],D[3],D[2],D[1],D[0],D[1]),g=E=>this.atlas.uv(E),f=(E,D,J,Y,ne)=>{var le;const K=(le=this.atlas)==null?void 0:le.tileIndex(E);if(K===void 0)return null;const[te,B,q,$]=g(K);return[te+D/16*(q-te),B+J/16*($-B),te+Y/16*(q-te),B+ne/16*($-B)]},m=E=>{if(!p||p.tiles[E]===void 0)return null;const D=p.tiles[E],J=D%p.cols,Y=Math.floor(D/p.cols);return[J*p.cell/p.size.w,Y*p.cell/p.size.h,(J+1)*p.cell/p.size.w,(Y+1)*p.cell/p.size.h]},v=new O,S=new O,T=new O,w=new O;let R=0,y=0,C=0;const U=-.5+.02,L=(E,D,J)=>{const Y=(E-8)/16,ne=(D-8)/16,K=U+(J-15)/16;return[R+T.x*Y+w.x*ne+v.x*K,y+T.y*Y+w.y*ne+v.y*K,C+T.z*Y+w.z*ne+v.z*K]},G={south:(E,D)=>[L(E[0],E[1],D[2]),L(D[0],E[1],D[2]),L(D[0],D[1],D[2]),L(E[0],D[1],D[2])],north:(E,D)=>[L(D[0],E[1],E[2]),L(E[0],E[1],E[2]),L(E[0],D[1],E[2]),L(D[0],D[1],E[2])],east:(E,D)=>[L(D[0],E[1],D[2]),L(D[0],E[1],E[2]),L(D[0],D[1],E[2]),L(D[0],D[1],D[2])],west:(E,D)=>[L(E[0],E[1],E[2]),L(E[0],E[1],D[2]),L(E[0],D[1],D[2]),L(E[0],D[1],E[2])],up:(E,D)=>[L(E[0],D[1],D[2]),L(D[0],D[1],D[2]),L(D[0],D[1],E[2]),L(E[0],D[1],E[2])],down:(E,D)=>[L(E[0],E[1],E[2]),L(D[0],E[1],E[2]),L(D[0],E[1],D[2]),L(E[0],E[1],D[2])]},z=(E,D,J,Y,ne)=>{const K=f(Y,ne[0],ne[1],ne[2],ne[3]);if(!K)return;const te=G[J](E,D);_(c,te[0],te[1],te[2],te[3]),x(h,K)},j=[{f:[3,3,15.5],t:[13,13,16],faces:[["south","back",[3,3,13,13]],["north","back",[3,3,13,13]]]},{f:[2,2,15],t:[14,3,16],faces:[["down","wood",[2,0,14,1]],["up","wood",[2,15,14,16]],["south","wood",[2,13,14,14]],["west","wood",[15,13,16,14]],["east","wood",[0,13,1,14]]]},{f:[2,13,15],t:[14,14,16],faces:[["down","wood",[2,0,14,1]],["up","wood",[2,15,14,16]],["south","wood",[2,2,14,3]],["west","wood",[15,2,16,3]],["east","wood",[0,2,1,3]]]},{f:[2,3,15],t:[3,13,16],faces:[["south","wood",[2,3,3,13]],["west","wood",[15,3,16,13]],["east","wood",[0,3,1,13]]]},{f:[13,3,15],t:[14,13,16],faces:[["south","wood",[13,3,14,13]],["west","wood",[15,3,16,13]],["east","wood",[0,3,1,13]]]}],k=(E,D,J,Y,ne)=>{var B;const K=(q,$,le)=>[E+q*Y,D+$*Y,J+le*Y],te=[{t:ne[0],q:[K(1,-1,1),K(1,-1,-1),K(1,1,-1),K(1,1,1)]},{t:ne[1],q:[K(-1,-1,-1),K(-1,-1,1),K(-1,1,1),K(-1,1,-1)]},{t:ne[2],q:[K(-1,1,1),K(1,1,1),K(1,1,-1),K(-1,1,-1)]},{t:ne[3],q:[K(-1,-1,-1),K(1,-1,-1),K(1,-1,1),K(-1,-1,1)]},{t:ne[4],q:[K(-1,-1,1),K(1,-1,1),K(1,1,1),K(-1,1,1)]},{t:ne[5],q:[K(1,-1,-1),K(-1,-1,-1),K(-1,1,-1),K(1,1,-1)]}];for(const q of te){const $=(B=this.atlas)==null?void 0:B.tileIndex(q.t);$!==void 0&&(_(c,q.q[0],q.q[1],q.q[2],q.q[3]),x(h,g($)))}};for(const E of e.itemFrames){if(E.x<s[0]||E.x>s[1]||E.y<o[0]||E.y>o[1]||E.z<a[0]||E.z>a[1])continue;const D=l[E.facing]??l[3];v.set(D[0],D[1],D[2]),S.set(0,1,0),Math.abs(v.y)>.9&&S.set(0,0,1),T.crossVectors(S,v).normalize(),w.crossVectors(v,T).normalize(),R=E.x+.5-n/2,y=E.y+.5-i/2,C=E.z+.5-r/2;const J=E.glow?"glow_item_frame":"item_frame";for(const Y of j)for(const[ne,K,te]of Y.faces)z(Y.f,Y.t,ne,K==="back"?J:"birch_planks",te);if(E.item){const Y=U+.0625,ne=m(E.item);if(ne){const K=Y+.02,te=.2,B=E.rotation%8*(Math.PI/4),q=Math.cos(B),$=Math.sin(B),le=T.x*q+w.x*$,fe=T.y*q+w.y*$,de=T.z*q+w.z*$,Ce=-T.x*$+w.x*q,Oe=-T.y*$+w.y*q,He=-T.z*$+w.z*q,Ve=(Ne,ie)=>[R+v.x*K+le*Ne*te+Ce*ie*te,y+v.y*K+fe*Ne*te+Oe*ie*te,C+v.z*K+de*Ne*te+He*ie*te];_(d,Ve(-1,-1),Ve(1,-1),Ve(1,1),Ve(-1,1)),x(u,ne)}else{const K=qs(E.item);if(this.atlas&&(this.atlas.tileIndex(K.tiles[4])!==void 0||this.atlas.tileIndex(K.tiles[0])!==void 0)){const B=U+.14-.014;k(R+v.x*B,y+v.y*B,C+v.z*B,.14,K.tiles)}}}}const V=new Hr,P=this.clipPlanes,I=(E,D,J)=>{if(!E.length)return;const Y=new Ht;Y.setAttribute("position",new ft(E,3)),Y.setAttribute("uv",new ft(D,2)),V.add(new en(Y,J))};this.atlas&&I(c,h,new Sn({map:this.atlas.texture,side:un,alphaTest:.5,clippingPlanes:P})),this.itemAtlasTex&&I(d,u,new Sn({map:this.itemAtlasTex,side:un,alphaTest:.5,clippingPlanes:P,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),this.framesGroup=V,this.scene.add(V)}disposeMinecarts(){if(this.minecartsGroup){for(const e of this.minecartsGroup.children)e.geometry.dispose();this.scene.remove(this.minecartsGroup),this.minecartsGroup=null}}buildMinecarts(){var z,j,k,V,P,I;this.disposeMinecarts();const e=this.model,n=!!((z=e==null?void 0:e.minecarts)!=null&&z.length),i=!!((j=e==null?void 0:e.armorStands)!=null&&j.length),r=!!((k=e==null?void 0:e.boats)!=null&&k.length),s=!!((V=e==null?void 0:e.mobs)!=null&&V.length);if(!e||!n&&!i&&!r&&!s||!this.entityAtlas)return;const{width:o,height:a,length:l}=e,c=this.slice.x,h=this.slice.y,d=this.slice.z,u=o/2,p=a/2,_=l/2,x=[],g=[],f=[],m=[],v=[],S=[],T=[],w=[],R=E=>this.atlas.uv(E),y=(E,D,J,Y)=>{const ne=B=>x.push(E.pos[B*3]+D,E.pos[B*3+1]+J,E.pos[B*3+2]+Y),K=B=>g.push(E.uv[B*2],E.uv[B*2+1]),te=()=>f.push(E.r,E.g,E.b);for(const B of[0,1,2,0,2,3])ne(B),K(B),te()},C=(E,D,J,Y)=>{const ne=B=>S.push(E.pos[B*3]+D,E.pos[B*3+1]+J,E.pos[B*3+2]+Y),K=B=>T.push(E.uv[B*2],E.uv[B*2+1]),te=()=>w.push(E.r,E.g,E.b);for(const B of[0,1,2,0,2,3])ne(B),K(B),te()};for(const E of e.minecarts??[]){const D=Math.floor(E.x),J=Math.floor(E.y),Y=Math.floor(E.z);if(D<c[0]||D>c[1]||J<h[0]||J>h[1]||Y<d[0]||Y>d[1])continue;const ne=E.x-u-.5,K=E.y-p-3/16,te=E.z-_-.5;for(const B of jC(E.yaw,this.entityAtlas))y(B,ne,K,te);if(E.content&&this.atlas){const B=qs(E.content),q=3/16+ne,$=13/16+ne,le=5/16+K,fe=13/16+K,de=3/16+te,Ce=13/16+te,Oe=[{tile:B.tiles[0],q:[$,le,Ce,$,le,de,$,fe,de,$,fe,Ce]},{tile:B.tiles[1],q:[q,le,de,q,le,Ce,q,fe,Ce,q,fe,de]},{tile:B.tiles[2],q:[q,fe,Ce,$,fe,Ce,$,fe,de,q,fe,de]},{tile:B.tiles[3],q:[q,le,de,$,le,de,$,le,Ce,q,le,Ce]},{tile:B.tiles[4],q:[q,le,Ce,$,le,Ce,$,fe,Ce,q,fe,Ce]},{tile:B.tiles[5],q:[$,le,de,q,le,de,q,fe,de,$,fe,de]}];for(const He of Oe){const Ve=(P=this.atlas)==null?void 0:P.tileIndex(He.tile);if(Ve===void 0)continue;const[Ne,ie,he,Ee]=R(Ve),N=He.q;m.push(N[0],N[1],N[2],N[3],N[4],N[5],N[6],N[7],N[8],N[0],N[1],N[2],N[6],N[7],N[8],N[9],N[10],N[11]),v.push(Ne,Ee,he,Ee,he,ie,Ne,Ee,he,ie,Ne,ie)}}}for(const E of e.armorStands??[]){const D=Math.floor(E.x),J=Math.floor(E.y),Y=Math.floor(E.z);if(D<c[0]||D>c[1]||J<h[0]||J>h[1]||Y<d[0]||Y>d[1])continue;const ne=E.x-u-.5,K=E.y-p,te=E.z-_-.5;for(const B of qC(E.yaw,this.entityAtlas))y(B,ne,K,te)}const U=.375;for(const E of e.boats??[]){const D=Math.floor(E.x),J=Math.floor(E.y),Y=Math.floor(E.z);if(D<c[0]||D>c[1]||J<h[0]||J>h[1]||Y<d[0]||Y>d[1])continue;const ne=E.x-u,K=E.y-p+U,te=E.z-_;for(const B of KC(E.variant,E.chest,E.yaw,this.entityAtlas))y(B,ne,K,te);if(E.chest&&this.atlas){const B=qs("chest"),q=ne-.3,$=ne+.3,le=K-.2,fe=K+.36,de=te-.3,Ce=te+.3,Oe=[{tile:B.tiles[0],q:[$,le,Ce,$,le,de,$,fe,de,$,fe,Ce]},{tile:B.tiles[1],q:[q,le,de,q,le,Ce,q,fe,Ce,q,fe,de]},{tile:B.tiles[2],q:[q,fe,Ce,$,fe,Ce,$,fe,de,q,fe,de]},{tile:B.tiles[3],q:[q,le,de,$,le,de,$,le,Ce,q,le,Ce]},{tile:B.tiles[4],q:[q,le,Ce,$,le,Ce,$,fe,Ce,q,fe,Ce]},{tile:B.tiles[5],q:[$,le,de,q,le,de,q,fe,de,$,fe,de]}];for(const He of Oe){const Ve=(I=this.atlas)==null?void 0:I.tileIndex(He.tile);if(Ve===void 0)continue;const[Ne,ie,he,Ee]=R(Ve),N=He.q;m.push(N[0],N[1],N[2],N[3],N[4],N[5],N[6],N[7],N[8],N[0],N[1],N[2],N[6],N[7],N[8],N[9],N[10],N[11]),v.push(Ne,Ee,he,Ee,he,ie,Ne,Ee,he,ie,Ne,ie)}}}if(this.mobAtlas&&this.mobModels)for(const E of e.mobs??[]){const D=Math.floor(E.x),J=Math.floor(E.y),Y=Math.floor(E.z);if(D<c[0]||D>c[1]||J<h[0]||J>h[1]||Y<d[0]||Y>d[1])continue;const ne=E.x-u,K=E.y-p,te=E.z-_;for(const B of QC(this.mobModels[E.model],E.texs,E.yaw,this.mobAtlas))C(B,ne,K,te)}const L=new Hr,G=this.clipPlanes;if(x.length&&this.entityMat.map){const E=new Ht;E.setAttribute("position",new ft(x,3)),E.setAttribute("uv",new ft(g,2)),E.setAttribute("color",new ft(f,3)),L.add(new en(E,new Sn({map:this.entityMat.map,vertexColors:!0,side:un,alphaTest:.5,clippingPlanes:G})))}if(m.length&&this.atlas){const E=new Ht;E.setAttribute("position",new ft(m,3)),E.setAttribute("uv",new ft(v,2)),L.add(new en(E,new Sn({map:this.atlas.texture,side:un,alphaTest:.5,clippingPlanes:G})))}if(S.length&&this.mobTex){const E=new Ht;E.setAttribute("position",new ft(S,3)),E.setAttribute("uv",new ft(T,2)),E.setAttribute("color",new ft(w,3)),this.mobMat??(this.mobMat=new Sn({map:this.mobTex,vertexColors:!0,side:un,alphaTest:.5,clippingPlanes:G})),L.add(new en(E,this.mobMat))}this.minecartsGroup=L,this.scene.add(L)}setGeometries(e){this.opaqueMesh=this.applyGeometry(this.opaqueMesh,e.opaque,this.matFor("opaque"),0),this.entityMesh=this.applyGeometry(this.entityMesh,e.entity,this.matFor("entity"),0),this.emissiveMesh=this.applyGeometry(this.emissiveMesh,e.emissive,this.showcase?this.emissiveMat:this.opaqueMat,0),this.transMesh=this.applyGeometry(this.transMesh,e.transparent,this.matFor("trans"),1),this.showcase&&(this.ensureNormals(this.opaqueMesh),this.ensureNormals(this.entityMesh),this.ensureNormals(this.transMesh),this.applyShadowFlags(!0),this.requestShadowUpdate())}matFor(e){return this.showcase?e==="opaque"?this.opaqueLit:e==="trans"?this.transLit:this.entityLit:e==="opaque"?this.opaqueMat:e==="trans"?this.transMat:this.entityMat}ensureNormals(e){e&&!e.geometry.getAttribute("normal")&&e.geometry.computeVertexNormals()}applyGeometry(e,n,i,r){return n?(e?(e.geometry.dispose(),e.geometry=n,e.visible=!0):(e=new en(n,i),e.renderOrder=r,e.frustumCulled=!1,this.scene.add(e)),e):(e&&(e.visible=!1),e)}disposeMesh(e){e&&(e.geometry.dispose(),this.scene.remove(e))}updateNearFar(){const e=this.activeCam,n=this.boundingRadius,i=this.tmpV.subVectors(this.controls.target,e.position).normalize(),r=-e.position.dot(i);e.near=Math.max(.005,r-n*1.4),e.far=Math.max(e.near+.1,r+n*1.4),e.updateProjectionMatrix()}}const Yx={white:"blanco",orange:"naranja",magenta:"magenta",light_blue:"azul claro",yellow:"amarillo",lime:"lima",pink:"rosa",gray:"gris",light_gray:"gris claro",cyan:"cian",purple:"morado",blue:"azul",brown:"marrón",green:"verde",red:"rojo",black:"negro"},OR=Object.keys(Yx),BR=[["concrete_powder","Hormigón en polvo"],["concrete","Hormigón"],["glazed_terracotta","Terracota vidriada"],["terracotta","Terracota"],["stained_glass_pane","Panel de vidrio tintado"],["stained_glass","Vidrio tintado"],["shulker_box","Caja shulker"],["wool","Lana"],["carpet","Alfombra"],["bed","Cama"],["banner","Estandarte"],["candle","Vela"]],Kx={oak:"roble",spruce:"abeto",birch:"abedul",jungle:"jungla",acacia:"acacia",dark_oak:"roble oscuro",mangrove:"mangle",cherry:"cerezo",bamboo:"bambú",crimson:"carmesí",warped:"distorsionado"},zR=Object.keys(Kx),VR=[["pressure_plate","Placa de presión"],["fence_gate","Puerta de valla"],["trapdoor","Trampilla"],["planks","Tablones"],["stairs","Escaleras"],["slab","Losa"],["fence","Valla"],["door","Puerta"],["button","Botón"],["sign","Cartel"],["leaves","Hojas"],["sapling","Brote"],["log","Tronco"],["wood","Madera"],["stem","Tallo"],["hyphae","Hifa"],["fungus","Hongo"]],HR={air:"Aire",stone:"Piedra",granite:"Granito",diorite:"Diorita",andesite:"Andesita",polished_granite:"Granito pulido",polished_diorite:"Diorita pulida",polished_andesite:"Andesita pulida",cobblestone:"Adoquín",mossy_cobblestone:"Adoquín musgoso",stone_bricks:"Ladrillos de piedra",mossy_stone_bricks:"Ladrillos de piedra musgosos",cracked_stone_bricks:"Ladrillos de piedra agrietados",chiseled_stone_bricks:"Ladrillos de piedra cincelados",smooth_stone:"Piedra lisa",bricks:"Ladrillos",deepslate:"Pizarra profunda",cobbled_deepslate:"Pizarra profunda adoquinada",polished_deepslate:"Pizarra profunda pulida",deepslate_bricks:"Ladrillos de pizarra profunda",deepslate_tiles:"Baldosas de pizarra profunda",tuff:"Toba",calcite:"Calcita",dripstone_block:"Bloque de espeleotema",bedrock:"Roca madre",obsidian:"Obsidiana",crying_obsidian:"Obsidiana llorona",smooth_basalt:"Basalto liso",dirt:"Tierra",coarse_dirt:"Tierra estéril",rooted_dirt:"Tierra con raíces",grass_block:"Bloque de hierba",podzol:"Podzol",mycelium:"Micelio",dirt_path:"Camino de tierra",farmland:"Tierra de cultivo",mud:"Barro",packed_mud:"Barro compacto",mud_bricks:"Ladrillos de barro",clay:"Arcilla",gravel:"Grava",sand:"Arena",red_sand:"Arena roja",sandstone:"Arenisca",smooth_sandstone:"Arenisca lisa",cut_sandstone:"Arenisca cortada",chiseled_sandstone:"Arenisca cincelada",red_sandstone:"Arenisca roja",moss_block:"Bloque de musgo",coal_ore:"Mena de carbón",deepslate_coal_ore:"Mena de carbón (pizarra)",iron_ore:"Mena de hierro",deepslate_iron_ore:"Mena de hierro (pizarra)",copper_ore:"Mena de cobre",deepslate_copper_ore:"Mena de cobre (pizarra)",gold_ore:"Mena de oro",deepslate_gold_ore:"Mena de oro (pizarra)",redstone_ore:"Mena de redstone",deepslate_redstone_ore:"Mena de redstone (pizarra)",emerald_ore:"Mena de esmeralda",deepslate_emerald_ore:"Mena de esmeralda (pizarra)",lapis_ore:"Mena de lapislázuli",deepslate_lapis_ore:"Mena de lapislázuli (pizarra)",diamond_ore:"Mena de diamante",deepslate_diamond_ore:"Mena de diamante (pizarra)",ancient_debris:"Restos antiguos",nether_quartz_ore:"Mena de cuarzo del Nether",nether_gold_ore:"Mena de oro del Nether",raw_iron_block:"Bloque de hierro en bruto",raw_copper_block:"Bloque de cobre en bruto",raw_gold_block:"Bloque de oro en bruto",coal_block:"Bloque de carbón",iron_block:"Bloque de hierro",copper_block:"Bloque de cobre",gold_block:"Bloque de oro",redstone_block:"Bloque de redstone",emerald_block:"Bloque de esmeralda",lapis_block:"Bloque de lapislázuli",diamond_block:"Bloque de diamante",netherite_block:"Bloque de netherita",quartz_block:"Bloque de cuarzo",smooth_quartz:"Cuarzo liso",quartz_bricks:"Ladrillos de cuarzo",chiseled_quartz_block:"Bloque de cuarzo cincelado",quartz_pillar:"Columna de cuarzo",amethyst_block:"Bloque de amatista",budding_amethyst:"Amatista en gemación",redstone:"Polvo de redstone",redstone_wire:"Polvo de redstone",redstone_torch:"Antorcha de redstone",redstone_lamp:"Lámpara de redstone",repeater:"Repetidor",comparator:"Comparador",observer:"Observador",piston:"Pistón",sticky_piston:"Pistón pegajoso",dropper:"Soltador",dispenser:"Dispensador",hopper:"Tolva",lever:"Palanca",target:"Diana",tnt:"TNT",slime_block:"Bloque de slime",honey_block:"Bloque de miel",note_block:"Bloque musical",observer_block:"Observador",daylight_detector:"Sensor de luz solar",lectern:"Atril",rail:"Raíl",powered_rail:"Raíl propulsor",detector_rail:"Raíl detector",activator_rail:"Raíl activador",lightning_rod:"Pararrayos",sculk_sensor:"Sensor de sculk",sculk:"Sculk",sculk_catalyst:"Catalizador de sculk",sculk_shrieker:"Chillón de sculk",chest:"Cofre",trapped_chest:"Cofre trampa",barrel:"Barril",crafting_table:"Mesa de trabajo",furnace:"Horno",blast_furnace:"Alto horno",smoker:"Ahumador",ender_chest:"Cofre de Ender",bookshelf:"Estantería",composter:"Compostador",cauldron:"Caldero",anvil:"Yunque",grindstone:"Piedra de afilar",smithing_table:"Mesa de herrería",stonecutter:"Cortador de piedra",loom:"Telar",cartography_table:"Mesa de cartografía",fletching_table:"Mesa de flechería",beacon:"Baliza",conduit:"Conducto",bell:"Campana",lodestone:"Magnetita",respawn_anchor:"Ancla de reaparición",snow:"Nieve",snow_block:"Bloque de nieve",powder_snow:"Nieve polvo",ice:"Hielo",packed_ice:"Hielo compacto",blue_ice:"Hielo azul",water:"Agua",lava:"Lava",netherrack:"Roca del Nether",nether_bricks:"Ladrillos del Nether",red_nether_bricks:"Ladrillos rojos del Nether",nether_wart_block:"Bloque de verruga del Nether",warped_wart_block:"Bloque de verruga distorsionada",soul_sand:"Arena de almas",soul_soil:"Tierra de almas",magma_block:"Bloque de magma",glowstone:"Piedra luminosa",shroomlight:"Champihongo",basalt:"Basalto",polished_basalt:"Basalto pulido",blackstone:"Piedra negra",polished_blackstone:"Piedra negra pulida",polished_blackstone_bricks:"Ladrillos de piedra negra pulida",gilded_blackstone:"Piedra negra dorada",end_stone:"Piedra del End",end_stone_bricks:"Ladrillos de piedra del End",purpur_block:"Bloque de púrpura",purpur_pillar:"Columna de púrpura",chorus_plant:"Planta de chorus",chorus_flower:"Flor de chorus",torch:"Antorcha",soul_torch:"Antorcha de almas",lantern:"Farol",soul_lantern:"Farol de almas",sea_lantern:"Lámpara marina",glass:"Vidrio",glass_pane:"Panel de vidrio",tinted_glass:"Vidrio polarizado",pumpkin:"Calabaza",carved_pumpkin:"Calabaza tallada",jack_o_lantern:"Calabaza iluminada",melon:"Sandía",hay_block:"Bloque de heno",dried_kelp_block:"Bloque de algas secas",sponge:"Esponja",wet_sponge:"Esponja húmeda",cactus:"Cactus",sugar_cane:"Caña de azúcar",vine:"Enredadera",lily_pad:"Nenúfar",short_grass:"Hierba",tall_grass:"Hierba alta",fern:"Helecho",large_fern:"Helecho grande",dead_bush:"Arbusto seco",cobweb:"Telaraña",scaffolding:"Andamio",spawner:"Generador de monstruos"};function Ma(t){const e=Tt(t),n=HR[e];if(n)return n;for(const s of OR)if(e===s||e.startsWith(s+"_")){const o=e.slice(s.length+1);for(const[a,l]of BR)if(o.includes(a))return`${l} · ${Yx[s]}`}const i=e.startsWith("stripped_"),r=i?e.slice(9):e;for(const s of zR)if(r===s||r.startsWith(s+"_")){const o=r.slice(s.length+1);for(const[a,l]of VR)if(o.includes(a))return`${i&&(a==="log"||a==="wood")?`${l} pelado`:l} de ${Kx[s]}`}return GR(e)}function GR(t){const e=t.replace(/_/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}const WR={redstone_wire:"redstone",wall_torch:"torch",redstone_wall_torch:"redstone_torch",soul_wall_torch:"soul_torch"};function jR(t){const e=Tt(t);return WR[e]??e}const XR=new Set(["piston_head","moving_piston"]),qR=new Set(["lava","water"]);function $R(t){const e=t.palette.map(s=>{var a;if(Kr(s.name)||XR.has(Tt(s.name)))return null;const o=Tt(s.name);return qR.has(o)&&((a=s.properties)==null?void 0:a.level)!=="0"?null:jR(s.name)}),n=new Map,i=t.blocks;for(let s=0;s<i.length;s++){const o=e[i[s]];o&&n.set(o,(n.get(o)??0)+1)}const r=[];for(const[s,o]of n)r.push({key:s,count:o,name:Ma(s),hex:Hx(eu(s)),iconTile:qs(s).tiles[2]});return r.sort((s,o)=>o.count-s.count),r}function YR(t,e){const n=[t.name||"Schematic",`Dimensiones: ${t.width} x ${t.height} x ${t.length}`,`Total: ${t.totalBlocks.toLocaleString("es-ES")} bloques · ${e.length} tipos`,""];for(const i of e){const r=Zx(i.count);n.push(`${String(i.count).padStart(8)}  ${i.name}${r?`  (${r})`:""}`)}return n.join(`\r
`)}function Zx(t){if(t<64)return"";const e=Math.floor(t/64),n=t%64;if(e<27)return n?`${e} st + ${n}`:`${e} st`;const i=Math.floor(e/27),r=e%27,s=[`${i} cajas`];return r&&s.push(`${r} st`),n&&s.push(`${n}`),s.join(" + ")}let Ko=null,C0=null;const uf=new Set;function KR(){Ko||C0||(C0=fetch(cn("item-atlas.json")).then(t=>t.json()).then(t=>{Ko=t,uf.forEach(e=>e())}).catch(()=>{}))}function ZR(t){return uf.add(t),()=>{uf.delete(t)}}function QR(t,e){if(!Ko)return null;const n=t.replace(/^minecraft:/,"").replace(/\[.*$/,""),i=Ko.tiles[n];if(i===void 0)return null;const{cell:r,cols:s,size:o}=Ko,a=i%s,l=Math.floor(i/s),c=e/r;return{backgroundImage:`url(${cn("item-atlas.png")})`,backgroundSize:`${o.w*c}px ${o.h*c}px`,backgroundPosition:`-${a*r*c}px -${l*r*c}px`,backgroundRepeat:"no-repeat",imageRendering:"pixelated"}}const Cl=["top","north","east","south","west","bottom"],yh={top:"Arriba",north:"Norte",east:"Este",south:"Sur",west:"Oeste",bottom:"Abajo"},Tc=t=>t.toLocaleString("es-ES");function Qx(t){return`lv:checklist:${t.name}|${t.width}x${t.height}x${t.length}|${t.totalBlocks}`}function JR(t){try{return new Set(JSON.parse(localStorage.getItem(Qx(t))??"[]"))}catch{return new Set}}function R0(t,e){try{localStorage.setItem(Qx(t),JSON.stringify([...e]))}catch{}}function P0({value:t,min:e,max:n,accent:i,onCommit:r}){const[s,o]=Ge.useState(String(t));Ge.useEffect(()=>{o(String(t))},[t]);function a(){let l=parseInt(s,10);isNaN(l)&&(l=t),l=Math.max(e,Math.min(n,l)),r(l),o(String(l))}return F.jsx("input",{value:s,inputMode:"numeric","aria-label":"límite de corte",onChange:l=>o(l.target.value.replace(/[^0-9]/g,"").slice(0,4)),onFocus:l=>{l.currentTarget.style.borderColor=i,l.currentTarget.select()},onBlur:l=>{a(),l.currentTarget.style.borderColor="#2A2A2E"},onKeyDown:l=>{l.key==="Enter"?l.target.blur():l.key==="ArrowUp"?(l.preventDefault(),r(Math.min(n,t+1))):l.key==="ArrowDown"&&(l.preventDefault(),r(Math.max(e,t-1)))},className:"w-9 text-center text-[12px] tabular-nums rounded-md py-0.5 outline-none transition-colors",style:{background:"#0F0F11",border:"1px solid #2A2A2E",color:"#F5F5F0"}})}function e3({letter:t,name:e,color:n,axisMax:i,minV:r,maxV:s,onChange:o}){const a=Ge.useRef(null),l=u=>i<=0?0:u/i*100;function c(u){const p=a.current.getBoundingClientRect();return Math.max(0,Math.min(i,Math.round((u-p.left)/p.width*i)))}function h(u){return p=>{p.preventDefault();const _=p.currentTarget;_.setPointerCapture(p.pointerId);const x=f=>{const m=c(f.clientX);u?o(r,Math.max(r,m)):o(Math.min(s,m),s)},g=()=>{_.releasePointerCapture(p.pointerId),_.removeEventListener("pointermove",x),_.removeEventListener("pointerup",g)};_.addEventListener("pointermove",x),_.addEventListener("pointerup",g)}}const d=r!==0||s!==i;return F.jsxs("div",{className:"flex flex-col gap-2",children:[F.jsxs("div",{className:"flex items-center justify-between",children:[F.jsxs("div",{className:"flex items-center gap-1.5",children:[F.jsx("span",{className:"flex items-center justify-center w-[18px] h-[18px] rounded-md text-[11px] font-bold",style:{color:n,background:n+"22"},children:t}),F.jsx("span",{className:"text-[11px] text-[#71717A]",children:e})]}),F.jsxs("div",{className:"flex items-center gap-1",children:[F.jsx(P0,{value:r,min:0,max:s,accent:n,onCommit:u=>o(u,s)}),F.jsx("span",{className:"text-[#52525A] text-[11px]",children:"–"}),F.jsx(P0,{value:s,min:r,max:i,accent:n,onCommit:u=>o(r,u)})]})]}),F.jsxs("div",{ref:a,className:"relative h-1.5 rounded-full",style:{background:"#2A2A2E"},children:[F.jsx("div",{className:"absolute h-full rounded-full",style:{left:`${l(r)}%`,right:`${100-l(s)}%`,background:d?n:"#3F3F46"}}),F.jsx("div",{className:"absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab border-2",style:{left:`${l(r)}%`,background:"#0D0D0F",borderColor:n,touchAction:"none"},onPointerDown:h(!1)}),F.jsx("div",{className:"absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab",style:{left:`${l(s)}%`,background:n,touchAction:"none"},onPointerDown:h(!0)})]})]})}function t3({value:t,min:e,max:n,color:i="#F4811F",onChange:r}){const s=Ge.useRef(null),o=n>e?(t-e)/(n-e)*100:0;function a(c){const h=s.current.getBoundingClientRect(),d=Math.max(0,Math.min(1,(c-h.left)/h.width));return e+d*(n-e)}function l(c){c.preventDefault();const h=s.current;h.setPointerCapture(c.pointerId),r(a(c.clientX));const d=p=>r(a(p.clientX)),u=()=>{h.releasePointerCapture(c.pointerId),h.removeEventListener("pointermove",d),h.removeEventListener("pointerup",u)};h.addEventListener("pointermove",d),h.addEventListener("pointerup",u)}return F.jsxs("div",{ref:s,className:"relative h-1.5 rounded-full cursor-pointer",style:{background:"#2A2A2E",touchAction:"none"},onPointerDown:l,children:[F.jsx("div",{className:"absolute h-full rounded-full",style:{left:0,width:`${o}%`,background:i}}),F.jsx("div",{className:"absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab",style:{left:`${o}%`,background:i,touchAction:"none"}})]})}const n3=[{axis:"y",letter:"Y",name:"Alto",color:"#F4811F"},{axis:"x",letter:"X",name:"Ancho",color:"#F4811F"},{axis:"z",letter:"Z",name:"Largo",color:"#F4811F"}];function i3({model:t,viewer:e}){const n={x:t.width-1,y:t.height-1,z:t.length-1},[i,r]=Ge.useState([0,n.x]),[s,o]=Ge.useState([0,n.y]),[a,l]=Ge.useState([0,n.z]),c={x:i,y:s,z:a},h={x:r,y:o,z:l};function d(g){return(f,m)=>{h[g]([f,m]),e==null||e.setSlice(g,f,m)}}function u(){["x","y","z"].forEach(g=>{h[g]([0,n[g]]),e==null||e.setSlice(g,0,n[g])})}const p=["x","y","z"].some(g=>c[g][0]!==0||c[g][1]!==n[g]),[_,x]=Ge.useState(()=>typeof window<"u"&&window.innerWidth<640);return F.jsxs("div",{className:"absolute z-10 flex flex-col gap-3.5 p-4",style:{left:14,top:"50%",transform:"translateY(-50%)",width:"min(86vw, 236px)",background:"rgba(22,22,24,.94)",backdropFilter:"blur(8px)",border:"1px solid #2a2a2e",borderRadius:16,boxShadow:"0 10px 34px rgba(0,0,0,.4)"},children:[F.jsxs("div",{className:"flex items-center justify-between gap-2",children:[F.jsx("span",{className:"text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]",children:"Cortes"}),F.jsxs("div",{className:"flex items-center gap-2",children:[F.jsxs("span",{className:"text-[10px] tabular-nums text-[#52525A]",children:[t.width,"×",t.height,"×",t.length]}),F.jsx("button",{onClick:()=>x(g=>!g),className:"flex items-center justify-center w-5 h-5 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors",title:_?"Expandir":"Minimizar",children:F.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:F.jsx("path",{d:_?"M2 4l4 4 4-4":"M2 8l4-4 4 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]}),!_&&F.jsxs(F.Fragment,{children:[F.jsx("div",{className:"flex flex-col gap-3.5",children:n3.map(({axis:g,letter:f,name:m,color:v})=>F.jsx(e3,{letter:f,name:m,color:v,axisMax:n[g],minV:c[g][0],maxV:c[g][1],onChange:d(g)},g))}),F.jsx("button",{onClick:u,disabled:!p,className:"text-xs rounded-lg py-1.5 border transition-colors",style:p?{color:"#F5F5F0",background:"#1C1C1F",borderColor:"#2A2A2E",cursor:"pointer"}:{color:"#52525A",background:"transparent",borderColor:"#232327",cursor:"default"},children:"Restablecer"})]})]})}function r3({model:t,atlas:e,db:n,entityManifest:i}){const r=Ge.useMemo(()=>$R(t),[t]),[s,o]=Ge.useState(()=>JR(t)),[a,l]=Ge.useState(!0);Jx();function c(u){o(p=>{const _=new Set(p);return _.has(u)?_.delete(u):_.add(u),R0(t,_),_})}function h(){o(new Set),R0(t,new Set)}function d(){const u=YR(t,r),p=new Blob([u],{type:"text/plain;charset=utf-8"}),_=URL.createObjectURL(p),x=document.createElement("a");x.href=_,x.download=`${(t.name||"materiales").replace(/[^\w-]+/g,"_")}.txt`,document.body.appendChild(x),x.click(),x.remove(),URL.revokeObjectURL(_)}return F.jsxs("div",{className:"absolute z-10 flex flex-col overflow-hidden",style:{top:60,right:12,width:"min(86vw, 300px)",maxHeight:"calc(100% - 76px)",background:"#161618",border:"1px solid #2a2a2e",borderRadius:14},children:[F.jsxs("div",{className:"p-3.5 shrink-0",style:{borderBottom:a?"none":"1px solid #2A2A2E"},children:[F.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[F.jsx("span",{className:"text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]",children:"Materiales"}),F.jsxs("div",{className:"flex items-center gap-1.5",children:[!a&&F.jsx("button",{onClick:d,className:"text-[11px] font-semibold text-[#F4811F] px-2 py-0.5 rounded-md border border-[#2A2A2E] bg-[#1C1C1F] hover:border-[#F4811F] transition-colors",children:".txt"}),F.jsx("button",{onClick:()=>l(u=>!u),className:"flex items-center justify-center w-5 h-5 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors",title:a?"Expandir":"Minimizar",children:F.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:F.jsx("path",{d:a?"M2 4l4 4 4-4":"M2 8l4-4 4 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]}),F.jsxs("div",{className:"text-lg font-bold tabular-nums text-[#F5F5F0]",children:[t.width," × ",t.height," × ",t.length]}),F.jsxs("div",{className:"text-xs text-[#A1A1AA] mt-0.5",children:[Tc(t.totalBlocks)," bloques · ",r.length," tipos"]}),!a&&F.jsxs("div",{className:"flex items-center justify-between mt-2 text-xs text-[#A1A1AA]",children:[F.jsxs("span",{children:[s.size," / ",r.length," preparados"]}),F.jsx("button",{onClick:h,className:"px-2 py-0.5 rounded-md border border-[#2A2A2E] bg-[#1C1C1F] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",children:"limpiar"})]})]}),!a&&F.jsx("div",{className:"overflow-y-auto p-1.5",style:{scrollbarWidth:"thin",scrollbarColor:"#2a2a2e transparent"},children:r.map(u=>{const p=s.has(u.key),_=Zx(u.count);return F.jsxs("div",{onClick:()=>c(u.key),className:`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer select-none transition-opacity ${p?"opacity-50":""} hover:bg-[#1C1C1F]`,children:[F.jsx("div",{className:`w-[18px] h-[18px] shrink-0 rounded-[5px] border flex items-center justify-center transition-colors ${p?"bg-[#F4811F] border-[#F4811F]":"border-[#2A2A2E]"}`,children:p&&F.jsx("svg",{viewBox:"0 0 12 12",fill:"none",stroke:"#0d0d0f",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-2.5 h-2.5",children:F.jsx("path",{d:"M2 6.5 5 9.5 10 3"})})}),F.jsx(Ac,{atlas:e,db:n,entityManifest:i,name:`minecraft:${u.key}`,px:20}),F.jsx("span",{className:`flex-1 text-[13px] truncate ${p?"line-through":"text-[#F5F5F0]"}`,children:u.name}),F.jsxs("div",{className:"flex flex-col items-end leading-tight",children:[F.jsx("span",{className:"text-[13px] font-semibold tabular-nums text-[#F5F5F0]",children:Tc(u.count)}),_&&F.jsx("span",{className:"text-[11px] text-[#52525A]",children:_})]})]},u.key)})})]})}const s3={north:[0,-1],south:[0,1],west:[-1,0],east:[1,0]},o3={north:"east",east:"south",south:"west",west:"north"},a3={north:"west",west:"south",south:"east",east:"north"};function l3(t,e,n,i){var r;return e<0||n<0||i<0||e>=t.width||n>=t.height||i>=t.length?null:((r=t.palette[t.blocks[no(t.width,t.length,e,n,i)]])==null?void 0:r.name)??null}function c3(t,e,n,i,r,s){const o=Tt(r);if(o!=="chest"&&o!=="trapped_chest")return null;const a=s==null?void 0:s.type;if(a!=="left"&&a!=="right")return null;const l=a==="left"?o3[(s==null?void 0:s.facing)??"north"]:a3[(s==null?void 0:s.facing)??"north"],c=s3[l];if(!c)return null;const h=e+c[0],d=i+c[1];return Tt(l3(t,h,n,d)??"")!==o?null:{x:h,y:n,z:d}}function u3(t,e,n){const i=t==="left"?e:n,r=t==="left"?n:e,s=[];let o=0;for(const a of(i==null?void 0:i.items)??[])s.push(a),o+=a.count;for(const a of(r==null?void 0:r.items)??[])s.push({...a,slot:a.slot+27}),o+=a.count;return{items:s,total:o,slots:s.length}}const h3=t=>t==="true"?"#7BD88F":t==="false"?"#8A8A90":"#F5F5F0",L0={composter:"composter_side",repeater:"repeater",comparator:"comparator",tnt:"tnt_side",piston:"piston_top",sticky_piston:"piston_top_sticky",bamboo:"bamboo_stalk"},d3={hopper_minecart:"hopper",chest_minecart:"chest",furnace_minecart:"furnace",tnt_minecart:"tnt",command_block_minecart:"command_block"};function f3(t,e,n,i){let r,s;if(t.endsWith("shulker_box"))r=Xx(e),s=[{sx:16,sy:44,w:16,h:8,dx:0,dy:8,rot:0},{sx:16,sy:16,w:16,h:12,dx:0,dy:0,rot:0}];else if(t==="chest"||t==="trapped_chest"||t==="ender_chest")r=`chest/${t==="ender_chest"?"ender":t==="trapped_chest"?"trapped":"normal"}`,s=[{sx:42,sy:33,w:14,h:10,dx:1,dy:5,rot:180},{sx:42,sy:14,w:14,h:5,dx:1,dy:1,rot:180},{sx:1,sy:1,w:2,h:4,dx:7,dy:4,rot:180}];else if(Sa(e))r=Sa(e),s=[{sx:8,sy:8,w:8,h:8,dx:4,dy:4,rot:0}];else return null;const o=n.tex[r];if(!o)return null;const[a,l]=n.size,c=i/16;return F.jsx("div",{style:{position:"relative",width:i,height:i},children:s.map((h,d)=>F.jsx("div",{style:{position:"absolute",left:h.dx*c,top:h.dy*c,width:h.w*c,height:h.h*c,transform:h.rot?`rotate(${h.rot}deg)`:void 0,backgroundImage:"url(/entity-atlas.png)",backgroundSize:`${a*c}px ${l*c}px`,backgroundPosition:`-${(o.x+h.sx)*c}px -${(o.y+h.sy)*c}px`,backgroundRepeat:"no-repeat",imageRendering:"pixelated"}},d))})}function p3(t){const e=Math.max(0,Math.min(15,t))/15,n=Math.round((e*.6+(e>0?.4:.3))*255),i=Math.round(Math.max(0,Math.min(1,e*e*.7-.5))*255),r=Math.round(Math.max(0,Math.min(1,e*e*.6-.7))*255);return`rgb(${n},${i},${r})`}function Jx(){const[,t]=Ge.useState(0);Ge.useEffect(()=>(KR(),ZR(()=>t(e=>e+1))),[])}function m3(t,e,n,i,r){const s=Tt(n),o="inset 0 0 0 1px rgba(255,255,255,.12)";if(s==="redstone_wire"||s==="redstone"){const h=s==="redstone"?9:parseInt((i==null?void 0:i.power)??"0",10)||0,d=p3(h),u=t.cssBackground("redstone_dust_dot",r);return u?{background:d,WebkitMaskImage:u.backgroundImage,maskImage:u.backgroundImage,WebkitMaskSize:u.backgroundSize,maskSize:u.backgroundSize,WebkitMaskPosition:u.backgroundPosition,maskPosition:u.backgroundPosition,WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat"}:{background:d,boxShadow:o}}const a=[];L0[s]&&a.push(L0[s]);const l=e==null?void 0:e.resolve(n,i);if(l){const h=[];for(const d of l)for(const u of d.model.elements){const p=u.faces.up;p&&h.push({y:u.to[1],tile:p.tile})}h.sort((d,u)=>u.y-d.y);for(const d of h)a.push(d.tile)}a.push(qs(n,i).tiles[2],`${s}_top`,s,`${s}_side`);for(const h of a){const d=t.cssBackground(h,r);if(d)return d}const c=QR(n,r);return c||{background:Hx(eu(n,i)),boxShadow:o}}function g3(t,e,n,i,r){const s=e==null?void 0:e.resolve(n,i);if(!s)return null;const o=r/16,a=[];for(const l of s)for(const c of l.model.elements){const h=c.faces.up;h&&a.push({y:c.to[1],tile:h.tile,uv:h.uv,fx:c.from[0],fz:c.from[2],w:c.to[0]-c.from[0],h:c.to[2]-c.from[2]})}return a.length===0?null:(a.sort((l,c)=>l.y-c.y),F.jsx("div",{style:{position:"relative",width:r,height:r},children:a.map((l,c)=>{const h=t.cssCrop(l.tile,l.uv[0],l.uv[1],l.uv[2],l.uv[3],l.w*o,l.h*o);return h?F.jsx("div",{style:{position:"absolute",left:l.fx*o,top:l.fz*o,width:l.w*o,height:l.h*o,...h}},c):null})}))}function _3(t,e,n,i,r){const s=e==null?void 0:e.resolve(n,i);if(!s)return null;const o=r/16,a=[];for(const l of s)for(const c of l.model.elements){const h=c.faces.south??c.faces.north??c.faces.east??c.faces.west;h&&a.push({z:c.to[2],tile:h.tile,uv:h.uv,fx:c.from[0],fy:c.from[1],w:c.to[0]-c.from[0],h:c.to[1]-c.from[1]})}return a.length===0?null:(a.sort((l,c)=>l.z-c.z),F.jsx("div",{style:{position:"relative",width:r,height:r},children:a.map((l,c)=>{const h=t.cssCrop(l.tile,l.uv[0],l.uv[1],l.uv[2],l.uv[3],l.w*o,l.h*o);if(!h)return null;const d=(16-(l.fy+l.h))*o;return F.jsx("div",{style:{position:"absolute",left:l.fx*o,top:d,width:l.w*o,height:l.h*o,...h}},c)})}))}function Ac({atlas:t,db:e,entityManifest:n,name:i,properties:r,px:s=44}){const o=d3[Tt(i)],a=o?`minecraft:${o}`:i,l=Tt(a);let c=n?f3(l,a,n,s):null;return!c&&(l==="repeater"||l==="comparator")&&(c=g3(t,e,a,r,s)),!c&&l.endsWith("stairs")&&(c=_3(t,e,a,r,s)),F.jsx("div",{className:"shrink-0 overflow-hidden",style:{width:s,height:s,borderRadius:Math.max(3,Math.round(s*.18)),...c?{}:m3(t,e,a,r,s)},children:c})}const v3={hopper:{cols:5,size:5},brewing_stand:{cols:5,size:5},dropper:{cols:3,size:9},dispenser:{cols:3,size:9},crafter:{cols:3,size:9},furnace:{cols:3,size:3},blast_furnace:{cols:3,size:3},smoker:{cols:3,size:3},chest:{cols:9,size:27},trapped_chest:{cols:9,size:27},barrel:{cols:9,size:27}};function x3(t,e){if(t.endsWith("shulker_box"))return{cols:9,size:27};const n=v3[t];if(n)return n;const i=Math.max(1,e.reduce((r,s)=>Math.max(r,s.slot+1),0));return{cols:Math.min(9,i),size:i}}function y3({name:t,content:e,atlas:n,db:i,entityManifest:r,forceSize:s,onClose:o}){var _;Jx();const a=Tt(t),l=x3(a,e.items),c=l.cols,h=s??l.size,d=Math.max(h,e.items.reduce((x,g)=>Math.max(x,g.slot+1),0)),u=new Map(e.items.map(x=>[x.slot,x])),p=new Set(e.disabled??[]);return F.jsxs("div",{className:"absolute z-20 flex flex-col gap-3 p-4",style:{left:14,top:56,maxWidth:"min(92vw, 460px)",maxHeight:"calc(100% - 72px)",overflowY:"auto",background:"rgba(22,22,24,.98)",border:"1px solid #2a2a2e",borderRadius:16,boxShadow:"0 20px 60px rgba(0,0,0,.5)"},children:[F.jsxs("div",{className:"flex items-center gap-2.5",children:[F.jsx(Ac,{atlas:n,db:i,entityManifest:r,name:t,px:28}),F.jsxs("div",{className:"flex flex-col leading-tight",children:[F.jsx("span",{className:"text-[14px] font-semibold text-[#F5F5F0]",children:Ma(t)}),F.jsxs("span",{className:"text-[11px] text-[#A1A1AA]",children:[Tc(e.total)," ítems · ",e.slots," ",e.slots===1?"hueco":"huecos",(_=e.disabled)!=null&&_.length?` · ${e.disabled.length} bloqueados`:""]})]}),F.jsx("div",{className:"flex-1"}),F.jsx("button",{onClick:o,"aria-label":"Cerrar",className:"flex items-center justify-center w-6 h-6 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors",children:F.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:F.jsx("path",{d:"M2 2l8 8M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})})]}),F.jsx("div",{className:"grid gap-1",style:{gridTemplateColumns:`repeat(${c}, 40px)`},children:Array.from({length:d},(x,g)=>{const f=u.get(g),m=p.has(g);return F.jsxs("div",{className:"relative flex items-center justify-center",style:{width:40,height:40,borderRadius:6,background:m?"#241719":"#0F0F11",border:`1px solid ${m?"#5A2E2E":"#2A2A2E"}`},title:m?"Bloqueado":f?`${Ma(f.id)} ×${f.count}`:void 0,children:[f&&F.jsxs(F.Fragment,{children:[F.jsx(Ac,{atlas:n,db:i,entityManifest:r,name:f.id,px:32}),f.count>1&&F.jsx("span",{className:"absolute",style:{right:2,bottom:0,fontSize:11,fontWeight:600,color:"#fff",textShadow:"1px 1px 0 #000"},children:f.count})]}),m&&F.jsx("svg",{className:"absolute",width:"40",height:"40",viewBox:"0 0 40 40",fill:"none","aria-hidden":"true",children:F.jsx("path",{d:"M12 12 28 28M28 12 12 28",stroke:"#C0584F",strokeWidth:"3",strokeLinecap:"round"})})]},g)})})]})}function D0({lines:t}){return F.jsx("div",{className:"rounded-lg px-2.5 py-2 flex flex-col items-center gap-0.5",style:{background:"#0F0F11",border:"1px solid #2A2A2E"},children:t.length?t.map((e,n)=>F.jsx("span",{className:"text-[12px] text-center text-[#F5F5F0]",style:{minHeight:14,lineHeight:"14px"},children:e||" "},n)):F.jsx("span",{className:"text-[12px] italic text-[#52525A]",children:"(vacío)"})})}function S3({picked:t,atlas:e,db:n,entityManifest:i,onOpenInventory:r,onClose:s}){const o=t.properties?Object.entries(t.properties):[];return F.jsxs("div",{className:"absolute z-10 flex flex-col gap-3 p-4",style:{left:14,top:56,minWidth:210,maxWidth:360,background:"rgba(22,22,24,.94)",backdropFilter:"blur(8px)",border:"1px solid #2a2a2e",borderRadius:16,boxShadow:"0 10px 34px rgba(0,0,0,.4)"},children:[F.jsx("button",{onClick:s,"aria-label":"Cerrar",className:"absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded text-[#71717A] hover:text-[#F5F5F0] transition-colors",children:F.jsx("svg",{width:"11",height:"11",viewBox:"0 0 12 12",fill:"none",children:F.jsx("path",{d:"M2 2l8 8M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}),F.jsxs("div",{className:"flex items-center gap-3 pr-5",children:[F.jsx(Ac,{atlas:e,db:n,entityManifest:i,name:t.name,properties:t.properties}),F.jsxs("div",{className:"flex flex-col gap-0.5 min-w-0",children:[F.jsx("span",{className:"text-[15px] font-semibold text-[#F5F5F0] leading-tight truncate",title:Ma(t.name),children:Ma(t.name)}),F.jsx("span",{className:"text-[11px] text-[#52525A] font-mono leading-tight truncate",title:t.name,children:t.name})]})]}),t.content&&F.jsxs("button",{onClick:r,className:"flex items-center gap-1.5 self-start text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors hover:brightness-125",style:{background:"#F4811F1A",border:"1px solid #F4811F40",color:"#F4811F"},children:[F.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 14 14",fill:"none","aria-hidden":"true",children:[F.jsx("rect",{x:"1.5",y:"3",width:"11",height:"9",rx:"1",stroke:"currentColor",strokeWidth:"1.3"}),F.jsx("path",{d:"M1.5 6.5h11M7 6.5v5.5",stroke:"currentColor",strokeWidth:"1.3"})]}),"Inventario · ",Tc(t.content.total)," ítems"]}),t.sign&&F.jsxs("div",{className:"flex flex-col gap-1.5 pt-3",style:{borderTop:"1px solid #232327"},children:[t.sign.back.length>0&&F.jsx("span",{className:"text-[10px] uppercase tracking-wide text-[#71717A]",children:"Frente"}),F.jsx(D0,{lines:t.sign.front}),t.sign.back.length>0&&F.jsxs(F.Fragment,{children:[F.jsx("span",{className:"text-[10px] uppercase tracking-wide text-[#71717A] mt-1",children:"Detrás"}),F.jsx(D0,{lines:t.sign.back})]})]}),o.length>0&&F.jsx("div",{className:"flex flex-col gap-2 pt-3",style:{borderTop:"1px solid #232327"},children:o.map(([a,l])=>F.jsxs("div",{className:"flex items-center justify-between gap-4 text-[12px]",children:[F.jsx("span",{className:"text-[#71717A] truncate",children:a}),F.jsx("span",{className:"font-medium tabular-nums whitespace-nowrap",style:{color:h3(l)},children:l})]},a))})]})}function M3({cargado:t,viewerRef:e,onReady:n,onRebuild:i,className:r,style:s}){const o=Ge.useRef(null),a=Ge.useRef(null);return Ge.useEffect(()=>{const l=o.current;if(!l)return;const c=new FR(l);return e.current=c,i&&(c.onRebuild=i),c.setAtlas(t.atlas),c.setModelDB(t.db),c.load(t.model),n==null||n(),()=>{c.dispose(),e.current===c&&(e.current=null)}},[t]),Ge.useEffect(()=>{const l=a.current;if(!l)return;const c=new ResizeObserver(()=>{var h;return(h=e.current)==null?void 0:h.resize()});return c.observe(l),()=>c.disconnect()},[]),F.jsx("div",{ref:a,className:r,style:s,children:F.jsx("canvas",{ref:o,style:{display:"block",width:"100%",height:"100%"}})})}const Sh="#1c1c1f";function w3({cargado:t,title:e,onClose:n}){var He,Ve,Ne;const i=!!n,r=Ge.useRef(null),[s,o]=Ge.useState(!1),[a,l]=Ge.useState("free"),[c,h]=Ge.useState(0),[d,u]=Ge.useState(!1),[p,_]=Ge.useState(Sh),[x,g]=Ge.useState(!1),[f,m]=Ge.useState(null),v=Ge.useRef(null),S=Ge.useRef({}),[T,w]=Ge.useState(null),[R,y]=Ge.useState(!1),[C,U]=Ge.useState(!1),[L,G]=Ge.useState(!1),[z,j]=Ge.useState(!1),[k,V]=Ge.useState(1),[P,I]=Ge.useState(!1),[E,D]=Ge.useState(!1),J=Ge.useRef(null),Y=Ge.useRef(null);function ne(){var he,Ee;const ie=J.current;ie&&(document.fullscreenElement?(he=document.exitFullscreen)==null||he.call(document):(Ee=ie.requestFullscreen)==null||Ee.call(ie))}Ge.useEffect(()=>{const ie=()=>D(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",ie),()=>document.removeEventListener("fullscreenchange",ie)},[]);function K(){var he;const ie=!C;U(ie),G(!1),ie&&(l("free"),w(null),y(!1)),(he=r.current)==null||he.setShowcase(ie)}function te(){var he;const ie=!L;G(ie),(he=r.current)==null||he.setShowcaseRotation(!ie)}async function B(){var ie;if(!z){j(!0);try{const he=p.toLowerCase()!==Sh,Ee=f||he?{color:p,imagen:f}:null,N=await((ie=r.current)==null?void 0:ie.capturePhoto(Ee));if(N){const Xe=(e||"schematic").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"schematic",je=N.type==="image/jpeg"?"jpg":"png",st=URL.createObjectURL(N),ge=document.createElement("a");ge.href=st,ge.download=`${Xe}.${je}`,ge.click(),URL.revokeObjectURL(st)}}finally{j(!1)}}}function q(ie){var N,Xe;const he=(N=ie.target.files)==null?void 0:N[0];if(!he)return;const Ee=URL.createObjectURL(he);m(Ee),(Xe=r.current)==null||Xe.setBackgroundImage(Ee)}function $(){var ie;m(null),(ie=r.current)==null||ie.setBackground(p)}async function le(){var N;const ie=!x;g(ie);const he=ie?"rt":"van";let Ee=S.current[he];if(!Ee){if(ie){const[Xe,je]=await Promise.all([Jc.load(cn("atlas-rt.png"),cn("atlas-rt.json")),xa.load(cn("models-rt.json"))]);Ee={atlas:Xe,db:je}}else Ee={atlas:t.atlas,db:t.db};S.current[he]=Ee}(N=r.current)==null||N.setResources(Ee.atlas,Ee.db)}Ge.useEffect(()=>{if(!n)return;const ie=he=>{he.key==="Escape"&&(R?y(!1):n())};return window.addEventListener("keydown",ie),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",ie),document.body.style.overflow=""}},[n,R]),Ge.useEffect(()=>{var ie,he;(ie=r.current)==null||ie.setHighlight(T?{x:T.x,y:T.y,z:T.z}:null),(he=r.current)==null||he.setHighlightPair((T==null?void 0:T.pair)??null)},[T]);function fe(ie){if(ie.target.tagName!=="CANVAS"){Y.current=null;return}Y.current={x:ie.clientX,y:ie.clientY,t:performance.now()}}function de(ie){var A,M,X,oe,ce;const he=Y.current;if(Y.current=null,ie.button!==0&&ie.pointerType!=="touch"||!he||ie.target.tagName!=="CANVAS"||Math.hypot(ie.clientX-he.x,ie.clientY-he.y)>6||performance.now()-he.t>400)return;const Ee=(A=r.current)==null?void 0:A.pick(ie.clientX,ie.clientY);if(y(!1),!Ee){w(null);return}const N=t.model,Xe=no(N.width,N.length,Ee.x,Ee.y,Ee.z);let je=(M=N.containers)==null?void 0:M.get(Xe),st,ge;const ot=c3(N,Ee.x,Ee.y,Ee.z,Ee.state.name,Ee.state.properties);if(ot){st=ot,ge=54;const me=(X=N.containers)==null?void 0:X.get(no(N.width,N.length,ot.x,ot.y,ot.z));je=u3(((oe=Ee.state.properties)==null?void 0:oe.type)??"left",je,me)}w({x:Ee.x,y:Ee.y,z:Ee.z,name:Ee.state.name,properties:Ee.state.properties,content:je,sign:(ce=N.signs)==null?void 0:ce.get(Xe),pair:st,doubleSlots:ge})}function Ce(ie,he){var Ee,N,Xe;ie==="free"?(Ee=r.current)==null||Ee.setView("free"):ie==="iso"?(N=r.current)==null||N.setView("iso"):(Xe=r.current)==null||Xe.setView(Cl[he])}function Oe(ie){var Ee;C&&(U(!1),(Ee=r.current)==null||Ee.setShowcase(!1));let he=c;ie==="orto"&&a==="orto"?(he=(c+1)%Cl.length,h(he)):ie==="orto"&&(he=0,h(0)),l(ie),Ce(ie,he)}return F.jsxs("div",{ref:J,className:i?"fixed inset-0 z-50":"relative w-full h-full",style:{background:p},onPointerDown:fe,onPointerUp:de,onContextMenu:ie=>ie.preventDefault(),children:["   ",f&&F.jsx("div",{className:"absolute inset-0",style:{backgroundImage:`url("${f}")`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}),HS(t.model)?F.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3",children:[F.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",className:"text-[#F4811F]","aria-hidden":"true",children:[F.jsx("path",{d:"M12 2 2 7v10l10 5 10-5V7L12 2Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"}),F.jsx("path",{d:"M2 7l10 5 10-5M12 12v10",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})]}),F.jsx("p",{className:"text-[#F5F5F0] font-semibold",children:"Build demasiado grande para previsualizar en 3D"}),F.jsxs("p",{className:"text-sm text-[#A1A1AA] max-w-sm",children:[t.model.totalBlocks.toLocaleString("es-ES")," bloques ·"," ",t.model.width,"×",t.model.height,"×",t.model.length,". El navegador no puede renderizarla entera; descárgala para verla en Minecraft."]})]}):F.jsx(M3,{cargado:t,viewerRef:r,onReady:()=>o(!0),className:"absolute inset-0",style:{width:"100%",height:"100%"}}),F.jsxs("div",{className:"absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-2.5",style:{background:"linear-gradient(180deg, rgba(13,13,15,.92) 0%, rgba(13,13,15,0) 100%)"},children:[F.jsx("span",{className:"hidden sm:block text-sm font-semibold text-[#F5F5F0] whitespace-nowrap",children:e}),F.jsx("div",{className:"hidden sm:block sm:flex-1 sm:min-w-[12px]"}),F.jsx("div",{className:"flex rounded-xl overflow-hidden border border-[#2A2A2E]",style:{background:"#161618"},children:["free","iso","orto"].map((ie,he)=>F.jsx("button",{onClick:()=>Oe(ie),className:`px-3 py-1.5 text-[13px] font-medium transition-colors ${he>0?"border-l border-[#2A2A2E]":""}`,style:a===ie?{background:"#F4811F",color:"#0d0d0f"}:{color:"#A1A1AA"},children:ie==="free"?"Libre":ie==="iso"?"Iso":a==="orto"?yh[Cl[c]]:"Orto"},ie))}),F.jsxs("div",{onClick:()=>u(!1),className:`sm:contents ${d?"absolute right-2 top-full mt-1.5 z-20 flex flex-col items-stretch gap-1.5 p-2 rounded-xl border border-[#2A2A2E] bg-[#161618] shadow-[0_12px_40px_rgba(0,0,0,.6)]":"hidden"}`,children:[a==="orto"?F.jsx("div",{className:"flex rounded-lg overflow-hidden border border-[#2A2A2E]",style:{background:"#161618"},children:Cl.map((ie,he)=>F.jsx("button",{onClick:()=>{var Ee;h(he),(Ee=r.current)==null||Ee.setView(ie)},className:`px-2 py-1.5 text-[12px] font-medium transition-colors ${he>0?"border-l border-[#2A2A2E]":""}`,style:c===he?{background:"#F4811F",color:"#0d0d0f"}:{color:"#A1A1AA"},title:yh[ie],children:yh[ie].slice(0,1)},ie))}):a==="iso"?F.jsx("button",{onClick:()=>{var ie;return(ie=r.current)==null?void 0:ie.rotate90()},className:"flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",style:{background:"#161618"},title:"Rotar 90°",children:F.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:F.jsx("path",{d:"M2 7a5 5 0 0 1 9-3M12 1v3H9",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})})}):F.jsx("button",{onClick:()=>{var ie;return(ie=r.current)==null?void 0:ie.resetView()},className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] text-[13px] font-medium transition-colors",style:{background:"#161618"},title:"Restablecer cámara",children:"Reajustar"}),a==="free"&&F.jsxs("button",{onClick:()=>{var he;const ie=!P;I(ie),(he=r.current)==null||he.setFlyEnabled(ie)},title:P?"Desactivar vuelo libre (WASD)":"Activar vuelo libre con WASD para moverte por la build",className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors",style:P?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:[F.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[F.jsx("rect",{x:"2.5",y:"6.5",width:"19",height:"11",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),F.jsx("path",{d:"M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M8 13.5h8",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),"Vuelo WASD"]}),F.jsxs("button",{onClick:K,title:"Showcase — rotación automática e iluminación cinemática",className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors",style:C?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:[F.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:F.jsx("path",{d:"M12 3l1.9 4.7L19 9.5l-4.1 2.7L16 17l-4-2.6L8 17l1.1-4.8L5 9.5l5.1-1.8L12 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})}),"Showcase"]}),C&&F.jsx("button",{onClick:te,title:L?"Reanudar rotación":"Pausar rotación",className:"flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",style:{background:"#161618"},children:L?F.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"currentColor",children:F.jsx("path",{d:"M3 2l9 5-9 5V2z"})}):F.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"currentColor",children:[F.jsx("rect",{x:"3",y:"2",width:"3",height:"10",rx:"1"}),F.jsx("rect",{x:"8",y:"2",width:"3",height:"10",rx:"1"})]})}),F.jsxs("button",{onClick:B,disabled:z,title:f||p.toLowerCase()!==Sh?"Hacer foto (JPG con el fondo que has puesto) y descargar":"Hacer foto (PNG con fondo transparente) y descargar",className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#F5F5F0] hover:border-[#3A3A3F] text-[13px] font-medium transition-colors disabled:opacity-50",style:{background:"#161618"},children:[F.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",children:[F.jsx("path",{d:"M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),F.jsx("circle",{cx:"12",cy:"13",r:"3.2",stroke:"currentColor",strokeWidth:"1.6"})]}),z?"Guardando…":"Foto"]}),F.jsx("button",{onClick:le,title:"Redstone Tweaks — texturas técnicas (by RexxStone)",className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors",style:x?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:"Redstone Tweaks"}),F.jsxs("label",{title:"Color de fondo",className:"flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] cursor-pointer hover:border-[#3A3A3F] transition-colors overflow-hidden relative",style:{background:"#161618"},children:[F.jsx("div",{className:"w-4 h-4 rounded-sm border border-white/20",style:{background:p}}),F.jsx("input",{type:"color",value:p,onChange:ie=>{var he;_(ie.target.value),m(null),(he=r.current)==null||he.setBackground(ie.target.value)},className:"absolute inset-0 opacity-0 cursor-pointer w-full h-full"})]}),F.jsx("button",{onClick:()=>{var ie;return f?$():(ie=v.current)==null?void 0:ie.click()},title:f?"Quitar imagen de fondo":"Imagen de fondo",className:"flex items-center justify-center w-8 h-8 rounded-lg border transition-colors",style:f?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:F.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",children:[F.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),F.jsx("circle",{cx:"8.5",cy:"9.5",r:"1.5",fill:"currentColor"}),F.jsx("path",{d:"M21 16l-5-5L5 20",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})]})}),F.jsx("input",{ref:v,type:"file",accept:"image/*",className:"hidden",onChange:q})]}),F.jsx("button",{onClick:()=>u(ie=>!ie),title:"Más opciones",className:"sm:hidden flex items-center justify-center w-8 h-8 rounded-lg border transition-colors",style:d?{background:"#F4811F",color:"#0d0d0f",borderColor:"#F4811F"}:{background:"#161618",color:"#A1A1AA",borderColor:"#2A2A2E"},children:F.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:[F.jsx("circle",{cx:"3",cy:"8",r:"1.4"}),F.jsx("circle",{cx:"8",cy:"8",r:"1.4"}),F.jsx("circle",{cx:"13",cy:"8",r:"1.4"})]})}),F.jsx("button",{onClick:ne,title:E?"Salir de pantalla completa":"Pantalla completa",className:"flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",style:{background:"#161618"},children:E?F.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:F.jsx("path",{d:"M9 3v3a3 3 0 0 1-3 3H3M21 9h-3a3 3 0 0 1-3-3V3M3 15h3a3 3 0 0 1 3 3v3M15 21v-3a3 3 0 0 1 3-3h3",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})}):F.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:F.jsx("path",{d:"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}),n&&F.jsxs("button",{onClick:n,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] text-sm transition-colors",style:{background:"#161618"},children:[F.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:F.jsx("path",{d:"M2 2l8 8M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),F.jsx("span",{className:"hidden sm:inline",children:"Cerrar"})]})]}),s&&F.jsx(i3,{model:t.model,viewer:r.current}),s&&F.jsx(r3,{model:t.model,atlas:t.atlas,db:t.db,entityManifest:((He=r.current)==null?void 0:He.getEntityManifest())??null}),s&&T&&!R&&F.jsx(S3,{picked:T,atlas:t.atlas,db:t.db,entityManifest:((Ve=r.current)==null?void 0:Ve.getEntityManifest())??null,onOpenInventory:()=>y(!0),onClose:()=>{w(null),y(!1)}}),s&&R&&(T==null?void 0:T.content)&&F.jsx(y3,{name:T.name,content:T.content,atlas:t.atlas,db:t.db,entityManifest:((Ne=r.current)==null?void 0:Ne.getEntityManifest())??null,forceSize:T.doubleSlots,onClose:()=>y(!1)}),s&&a==="free"&&P&&F.jsxs("div",{className:"absolute bottom-20 left-3 z-10 select-none text-[11px] text-[#A1A1AA] flex flex-col gap-2",style:{maxWidth:280},children:[F.jsxs("div",{className:"flex flex-col gap-2 pointer-events-auto",style:{width:230,background:"rgba(13,13,15,.6)",padding:"8px 10px",borderRadius:8,backdropFilter:"blur(4px)"},children:[F.jsxs("div",{className:"flex items-center justify-between gap-3",children:[F.jsx("span",{className:"text-[#F5F5F0] font-semibold whitespace-nowrap",children:"Velocidad de free cam"}),F.jsxs("span",{className:"tabular-nums text-[#F4811F]",children:[k.toFixed(2),"×"]})]}),F.jsx(t3,{value:k,min:.1,max:5,onChange:ie=>{var he;V(ie),(he=r.current)==null||he.setFlySpeed(ie)}})]}),F.jsxs("div",{className:"pointer-events-none",style:{background:"rgba(13,13,15,.6)",padding:"4px 8px",borderRadius:8,backdropFilter:"blur(4px)"},children:[F.jsx("span",{className:"text-[#F5F5F0] font-semibold",children:"WASD"})," moverte · ",F.jsx("span",{className:"text-[#F5F5F0] font-semibold",children:"Espacio/Shift"})," subir/bajar"]})]})]})}function E3({onFile:t}){const[e,n]=Ge.useState(!1),i=Ge.useRef(null),r=Ge.useCallback(s=>{s.preventDefault(),n(!1);const o=s.dataTransfer.files[0];o&&t(o)},[t]);return F.jsxs("div",{onDragOver:s=>{s.preventDefault(),n(!0)},onDragLeave:()=>n(!1),onDrop:r,onClick:()=>{var s;return(s=i.current)==null?void 0:s.click()},className:`w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-16 px-8 ${e?"border-[#F4811F] bg-[#F4811F]/5":"border-[#2A2A2E] hover:border-[#3A3A3F] bg-[#161618] hover:bg-[#1A1A1D]"}`,children:[F.jsx("input",{ref:i,type:"file",accept:".litematic,.schem",className:"hidden",onChange:s=>{var a;const o=(a=s.target.files)==null?void 0:a[0];o&&t(o)}}),F.jsx("div",{className:"w-16 h-16 rounded-2xl bg-[#1C1C1F] border border-[#2A2A2E] flex items-center justify-center",children:F.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",className:"text-[#F4811F]",children:[F.jsx("path",{d:"M21 7l-9-5-9 5v10l9 5 9-5V7z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"}),F.jsx("path",{d:"M12 2v20M3 7l9 5 9-5",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})]})}),F.jsxs("div",{className:"text-center",children:[F.jsx("p",{className:"font-semibold text-[#F5F5F0]",children:"Arrastra tu schematic aquí"}),F.jsx("p",{className:"mt-1 text-sm text-[#71717A]",children:"o haz click para seleccionar"}),F.jsxs("p",{className:"mt-3 text-xs text-[#52525A]",children:["Soporta ",F.jsx("span",{className:"text-[#A1A1AA]",children:".litematic"})," y ",F.jsx("span",{className:"text-[#A1A1AA]",children:".schem"})," ","— el archivo nunca sale de tu navegador"]})]})]})}function b3(){const[t,e]=Ge.useState("idle"),[n,i]=Ge.useState(""),[r,s]=Ge.useState(null),[o,a]=Ge.useState(""),l=Ge.useCallback(async h=>{e("loading"),i(""),s(null),a(h.name);try{const d=await h.arrayBuffer(),u=await lM(d,h.name),[p,_]=await Promise.all([Jc.load(),xa.load()]);s({model:u,atlas:p,db:_}),e("loaded")}catch(d){i(d instanceof Error&&d.message==="SCHEMATIC_TOO_LARGE"?"Build demasiado grande para previsualizar en 3D. Descárgala para verla en Minecraft.":d instanceof Error?d.message:"Error desconocido"),e("error")}},[]),c=o.replace(/\.(litematic|schem)$/i,"");return F.jsxs("main",{className:"min-h-screen bg-[#0D0D0F]",children:[F.jsxs("div",{className:"w-full px-4 sm:px-8 py-4 border-b border-[#1E1E21] flex items-center gap-2 text-sm",children:[F.jsx("span",{className:"text-[#F5F5F0] font-medium",children:"Lite Viewer"}),o&&F.jsxs(F.Fragment,{children:[F.jsx("span",{className:"text-[#3A3A3F]",children:"/"}),F.jsx("span",{className:"text-[#A1A1AA] truncate max-w-xs",children:c})]}),t==="loaded"&&F.jsxs("button",{onClick:()=>{e("idle"),s(null),a("")},className:"ml-auto flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#F5F5F0] transition-colors",children:[F.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:F.jsx("path",{d:"M2 2l8 8M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),"Cargar otro"]})]}),t==="idle"&&F.jsxs("div",{className:"flex flex-col items-center justify-center py-24 px-4",children:[F.jsxs("div",{className:"mb-8 text-center",children:[F.jsx("h1",{className:"text-2xl font-bold text-[#F5F5F0]",children:"Lite Viewer"}),F.jsx("p",{className:"mt-2 text-sm text-[#71717A]",children:"Visualiza tus schematics en 3D sin subirlos a ningún servidor"})]}),F.jsx(E3,{onFile:l})]}),t==="loading"&&F.jsxs("div",{className:"flex flex-col items-center justify-center py-32 gap-4",children:[F.jsx("div",{className:"w-10 h-10 rounded-full border-2 border-[#F4811F] border-t-transparent animate-spin"}),F.jsx("p",{className:"text-sm text-[#A1A1AA]",children:"Procesando schematic…"}),F.jsx("p",{className:"text-xs text-[#52525A]",children:o})]}),t==="error"&&F.jsxs("div",{className:"flex flex-col items-center justify-center py-32 gap-4",children:[F.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",className:"text-[#71717A]",children:[F.jsx("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor",strokeWidth:"1.5"}),F.jsx("path",{d:"M12 8v4M12 16h.01",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),F.jsx("p",{className:"text-sm text-[#71717A]",children:"No se pudo procesar el archivo"}),n&&F.jsx("p",{className:"text-xs text-[#52525A] max-w-sm text-center",children:n}),F.jsx("button",{onClick:()=>e("idle"),className:"mt-2 px-4 py-2 rounded-lg bg-[#161618] border border-[#2A2A2E] text-sm text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors",children:"Intentar con otro archivo"})]}),t==="loaded"&&r&&F.jsx("div",{className:"relative w-full",style:{height:"calc(100vh - 57px)"},children:F.jsx(w3,{cargado:r,title:c})})]})}IS("./");jv(document.getElementById("root")).render(F.jsx(Ge.StrictMode,{children:F.jsx(b3,{})}));
