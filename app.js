let bosses = JSON.parse(
    localStorage.getItem("bosses")
) || [];


let currentBoss = null;



// =======================
// 显示新增老板
// =======================

function showAddBoss(){

    document
    .getElementById("addBox")
    .classList
    .remove("hidden");

}





// =======================
// 创建老板
// =======================

function createBoss(){


let boss={

    id:Date.now(),

    name:
    document.getElementById("bossName").value,

    package:
    document.getElementById("packageName").value,


    color:
    document.getElementById("bossColor").value,


    start:
    document.getElementById("startDate").value,


    end:
    document.getElementById("endDate").value,


    checks:[],

    activities:[]

};



if(!boss.name ||
!boss.start ||
!boss.end){

alert("请填写完整");

return;

}



bosses.push(boss);


save();


renderBoss();



}



// =======================
// 保存
// =======================

function save(){

localStorage.setItem(
"bosses",
JSON.stringify(bosses)
);

}



// =======================
// 老板列表
// =======================

function renderBoss(){


let box=
document.getElementById("bossList");


box.innerHTML="";



bosses.forEach(
boss=>{


let div=
document.createElement("div");


div.className=
"boss-card";


div.style.background=
boss.color+"22";



div.innerHTML=

`

<div class="boss-title">
${boss.name}
</div>


<p>
套餐：
${boss.package}
</p>


<p>
${boss.start}
~
${boss.end}
</p>


<div class="color-bar"
style="
background:${boss.color};
">
</div>


<button onclick="openBoss(${boss.id})">
进入日历
</button>

`;



box.appendChild(div);



});


}




// =======================
// 打开老板
// =======================


function openBoss(id){


currentBoss =
bosses.find(
b=>b.id===id
);



document
.getElementById("bossDetail")
.classList
.remove("hidden");



document
.getElementById("detailTitle")
.innerHTML=
currentBoss.name+
" - "+
currentBoss.package;



createCalendar();


showChecks();


showActivities();


}





// =======================
// 自动生成付费日历
// =======================


function createCalendar(){


let box=
document.getElementById("calendar");


box.innerHTML="";


let start=
new Date(currentBoss.start);


let end=
new Date(currentBoss.end);



while(start<=end){


let day=
start.getDate();



let div=
document.createElement("div");


div.className=
"calendar-day";


div.innerHTML=

`

<div class="day-number">
${start.getMonth()+1}/${day}
</div>


<div class="pay-line"
style="
background:${currentBoss.color};
">

付费中

</div>

`;


box.appendChild(div);



start.setDate(
start.getDate()+1
);



}


}




// =======================
// 汇报比较
// =======================


function compareReport(){


let old=
document
.getElementById("yesterday")
.value;


let now=
document
.getElementById("today")
.value;



let oldNums=
old.match(/\d+/g)||[];


let newNums=
now.match(/\d+/g)||[];



let html="";



let max=
Math.max(
oldNums.length,
newNums.length
);



for(
let i=0;
i<max;
i++
){


let a=
Number(oldNums[i]||0);


let b=
Number(newNums[i]||0);



if(a===b){

html+=
`
<p class="warning">
⚠ 数值未变化：
${a}
<br>
可能：
未领取 / 未上号 / 未完成
</p>
`;

}


else if(b>a){

html+=
`
<p class="success">
✅ 增加：
${a} → ${b}
</p>
`;

}


else{

html+=
`
<p class="warning">
❗减少：
${a} → ${b}
</p>
`;

}


}



document
.getElementById("compareResult")
.innerHTML=
html;


}






// =======================
// 打卡
// =======================


function addCheck(){


let name=
prompt(
"输入打卡内容"
);



if(!name)return;



currentBoss.checks.push({

name:name,

done:false

});


save();


showChecks();


}



function showChecks(){


let box=
document.getElementById("checkList");


box.innerHTML="";


currentBoss.checks.forEach(
(item,index)=>{


box.innerHTML+=

`

<div class="check-item">

${item.name}


<input 
type="checkbox"
${item.done?"checked":""}
onchange="
toggleCheck(${index},this.checked)
">

</div>

`;

});


}



function toggleCheck(i,v){

currentBoss.checks[i].done=v;

save();

}




// =======================
// 活动
// =======================


function addActivity(){


let name=
prompt("活动名称");


let date=
prompt("活动时间");


if(!name)return;



currentBoss.activities.push({

name:name,

date:date

});


save();


showActivities();


}



function showActivities(){


let box=
document
.getElementById("activityList");


box.innerHTML="";


currentBoss.activities.forEach(
a=>{


box.innerHTML+=

`

<div class="activity-card">

<b>
${a.name}
</b>

<br>

${a.date}

</div>

`;

});


}






// 初始加载

renderBoss();
