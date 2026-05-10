const s=[];
export default function h(q,r){
r.setHeader("Access-Control-Allow-Origin","*");
r.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS");
r.setHeader("Access-Control-Allow-Headers","Content-Type");
if(q.method==="OPTIONS")return r.status(200).end();
if(q.method==="POST"){
const b=q.body||{};
s.push({id:Date.now(),...b,ts:new Date().toISOString()});
if(s.length>500)s.shift();
const t=s.filter(x=>x.resultado).length;
const w=s.filter(x=>x.resultado==="WIN").length;
return r.status(200).json({ok:true,acerto:t>0?Math.round(w/t*100)+"%":"0%"});
}
const t=s.filter(x=>x.resultado).length;
const w=s.filter(x=>x.resultado==="WIN").length;
return r.status(200).json({total:s.length,wins:w,acerto:t>0?Math.round(w/t*100)+"%":"0%",ultimos:s.slice(-5).reverse()});
}
