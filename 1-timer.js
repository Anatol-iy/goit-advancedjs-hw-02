import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as y,i as d}from"./assets/vendor-BbbuE1sJ.js";const n=document.querySelector("[data-start]"),i=document.querySelector("#datetime-picker"),p=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),D=document.querySelector("[data-minutes]"),b=document.querySelector("[data-seconds]");let l=null,u=null;n.disabled=!0;const q={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];t<=new Date?(d.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}),n.disabled=!0):(l=t,n.disabled=!1)}};y(i,q);n.addEventListener("click",()=>{n.disabled=!0,i.disabled=!0,u=setInterval(()=>{const t=l-new Date;if(t<=0){clearInterval(u),d.success({title:"Success",message:"Time is up!"});return}const{days:r,hours:a,minutes:c,seconds:s}=E(t);p.textContent=o(r),S.textContent=o(a),D.textContent=o(c),b.textContent=o(s)},1e3)});function E(e){const s=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:s,hours:m,minutes:h,seconds:f}}function o(e){return String(e).padStart(2,"0")}
//# sourceMappingURL=1-timer.js.map
