// =====================
// 老板数据
// =====================

let bosses = [
    {
        name:"ㅋㅋの每日汇报",
        package:"闪暖亲妈",
        color:"purple",
        days:21
    }
];


// =====================
// 添加老板
// =====================

function addBoss(){

    let name = prompt("输入老板名称");

    if(!name){
        return;
    }


    let packageName =
    prompt("输入套餐名称");


    let bossList =
    document.getElementById("bossList");


    let div =
    document.createElement("div");


    div.className =
    "boss green";


    div.innerHTML = `

    <h3>${name}</h3>

    <p>
    套餐：
    ${packageName || "自定义"}
    </p>

    <p>
    服务周期：
    自定义
    </p>

    <div class="paybar">
    <span>
    ███████████████
    </span>
    </div>

    <p>
    剩余：
    自定义
    </p>


    <button>
    进入
    </button>

    `;


    bossList.appendChild(div);

}



// =====================
// 打开老板
// =====================

function openBoss(){

    alert(
    "进入老板详情\n\n"+
    "这里以后连接独立老板日历"
    );

}





// =====================
// 汇报检测
// =====================


function compare(){


let oldText =
document.getElementById("report1").value;


let newText =
document.getElementById("report2").value;



if(
oldText==""||
newText==""
){

document.getElementById("result").innerHTML=
"⚠ 请先输入两天汇报";


return;

}




// 提取数字

let oldNumbers =
oldText.match(/\d+/g)||[];


let newNumbers =
newText.match(/\d+/g)||[];



let result="";



let length =
Math.max(
oldNumbers.length,
newNumbers.length
);



for(
let i=0;
i<length;
i++
){

let oldNum =
Number(oldNumbers[i]||0);


let newNum =
Number(newNumbers[i]||0);



if(
oldNum===newNum
){

result +=
"⚠ 数据未变化："+oldNum+
"（可能未领取/未完成）<br>";

}


else if(
newNum>oldNum
){

result +=
"✅ 增加："+
(oldNum+" → "+newNum)
+
"<br>";

}


else{

result +=
"❗减少："+
(oldNum+" → "+newNum)
+
"<br>";

}



}




document.getElementById("result").innerHTML=
result;


}






// =====================
// 新增活动
// =====================


function addActivity(){


let name =
prompt("活动名称");


let date =
prompt("活动时间");


if(
!name
)return;



let box =
document.getElementById("activity");


let div =
document.createElement("div");


div.className=
"activity-item";


div.innerHTML=

`
<b>${name}</b>
<br>
${date||"未设置日期"}

`;



box.appendChild(div);



}






// =====================
// 每日5点刷新模拟
// =====================


function checkRefresh(){


let now =
new Date();


if(
now.getHours()===5
){

console.log(
"每日打卡刷新"
);

}



}



setInterval(
checkRefresh,
60000
);
