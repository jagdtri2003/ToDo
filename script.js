const inp=document.getElementById("input-box");
const tasks=document.getElementById("tasks");

function Add(){
    if(inp.value==='')
        return;
    let li=document.createElement("li");
    li.innerHTML=inp.value;
    tasks.appendChild(li);
    let span=document.createElement('span');
    span.innerHTML="\u00d7";
    li.appendChild(span);
    inp.value="";
    saveData();
}

tasks.addEventListener("click",function(e){
    if(e.target.tagName==='LI'){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName==='SPAN'){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",tasks.innerHTML);
}

function showData(){
    tasks.innerHTML=localStorage.getItem("data");
}

showData();
