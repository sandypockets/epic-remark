var e={d:(r,a)=>{for(var t in a)e.o(a,t)&&!e.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:a[t]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r)},r={};function a(){return e=>{const r=e=>{e.forEach((e=>{(e=>{if("heading"===e.type){const r=e.children.map((e=>e.value)).join("").toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"");e.data=e.data||{},e.data.hProperties=e.data.hProperties||{},e.data.hProperties.id=r}})(e),e.children&&r(e.children)}))};r(e.children)}}function t(){return e=>{const r=(e,a)=>{e.forEach(((e,t)=>{e.children&&r(e.children,e),((e,r,a)=>{if("table"===e.type){const t={type:"div",data:{hName:"div",hProperties:{className:"overflow-x-auto"}},children:[e]};a.children.splice(r,1,t)}})(e,t,a)}))};r(e.children,e)}}e.d(r,{S:()=>a,j:()=>t});var o=r.S,d=r.j;export{o as remarkAddIdsToHeadings,d as remarkWrapTables};