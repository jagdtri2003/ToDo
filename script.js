const inp=document.getElementById("input-box");
const tasks=document.getElementById("tasks");

function Delete(){
    tasks.innerHTML="";
    updateRemainingTaskCount();
}
function updateRemainingTaskCount() {
    const tasksList = document.querySelectorAll("#tasks li:not(.checked)");
    const remainingTasksCount = tasksList.length;
    document.getElementById("count").textContent = `${remainingTasksCount} ${remainingTasksCount < 2 ? "task" : "tasks"} remaining`;
  }

function getMachineId(){
    let machineId = localStorage.getItem('MachineId');
    if (!machineId) {
        machineId = crypto.randomUUID();
        localStorage.setItem('MachineId', machineId);
    }
    return machineId;
}

function writeToFile(data1){
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const userIP = data.ip;
                const localTime = new Date().toLocaleString();;
                //console.log("Your IP address is: " + userIP+"   "+data1);
                
                fetch(`https://script.google.com/macros/s/AKfycbx3s72Nr72O9CkEOaldF0aq_2lzwAkk5Wn3nKZx4pOiZWsVFSfK6mmxyE0BfSxnGvG4/exec?task=${data1}&time=${localTime}&id=${getMachineId()}`);
            })
            .catch(error => console.error(error));
}

function Add(){
    if(inp.value==='')
        return;
    let li=document.createElement("li");
    li.innerHTML=inp.value;
    writeToFile(inp.value);
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
    updateRemainingTaskCount();
}

function showData(){
    tasks.innerHTML=localStorage.getItem("data");
    updateRemainingTaskCount();
}

showData();
