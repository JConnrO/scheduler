var timeBlocks = [];
function displayCurrentDate() {
    var todayData = luxon.DateTime.now();
    var todaysDate = todayData.toLocaleString(luxon.DateTime.DATE_HUGE);
    $('#currentDay').text(todaysDate);
};
function saveSchedule(){
    localStorage.setItem("Schedule", JSON.stringify(timeBlocks));
};
function getBackground(hour){
    var currentHour = luxon.DateTime.now().hour;
  
    if (hour < currentHour){
        return "col-10 past";
    }
    // Future
    else if (hour > currentHour){
        return "col-10 future";
    }
    // Present
    else if (hour == currentHour){
        return "col-10 present";
    }
}
function loadSchedule(){
    //If not local storage create local storage
    if(localStorage.getItem("Schedule") === null){
        //Set up Array
        timeBlocks.push({displayTime:"9AM", time24h:"9", description:"Enter Text",});
        timeBlocks.push({displayTime:"10AM", time24h:"10", description:"Enter Text",});
        timeBlocks.push({displayTime:"11AM", time24h:"11", description:"Enter Text",});
        timeBlocks.push({displayTime:"12PM", time24h:"12", description:"Enter Text",});
        timeBlocks.push({displayTime:"1PM", time24h:"13", description:"Enter Text",});
        timeBlocks.push({displayTime:"2PM", time24h:"14", description:"Enter Text",});
        timeBlocks.push({displayTime:"3PM", time24h:"15", description:"Enter Text",});
        timeBlocks.push({displayTime:"4PM", time24h:"16", description:"Enter Text",});
        timeBlocks.push({displayTime:"5PM", time24h:"17", description:"Enter Text",});
        saveSchedule(); 
    }
    return JSON.parse(localStorage.getItem("Schedule"));
}
function renderTimeBlock(displayTime, time24h, description){
    var timeBlockEl = document.createElement("div");
    timeBlockEl.classList = "row time-block";

    var timeEl = document.createElement("div");
    timeEl.classList = "col-1 hour";
    timeEl.innerHTML = displayTime;

    var eventEl = document.createElement("div");
    eventEl.classList = getBackground(time24h);
    var eventDescriptionEl = document.createElement("textarea");
    eventDescriptionEl.classList = "textarea";
    eventDescriptionEl.id = "description";
    eventDescriptionEl.textContent = description;

    var saveEl = document.createElement("div");
    saveEl.classList = "col-1 btn btn-primary saveBtn";
    saveEl.id = "save";
    saveEl.innerHTML = "Save";

    eventEl.appendChild(eventDescriptionEl);
    timeBlockEl.appendChild(timeEl);
    timeBlockEl.appendChild(eventEl);
    timeBlockEl.appendChild(saveEl);
    return timeBlockEl;
}
function renderTimeBlocks(){
    var blockList = document.querySelector("#block-list");
    timeBlocks = loadSchedule();

    for (var i=0; i<8; i++) {
        var block = renderTimeBlock(timeBlocks[i].displayTime, timeBlocks[i].time24h, timeBlocks[i].description);
        blockList.appendChild(block);
    }
}

displayCurrentDate();
renderTimeBlocks();

$( ".saveBtn" ).click(function() {

    var index = $(this)
    .closest(".time-block")
    .index();

    var eventDescription = $(this)
    .closest(".time-block")
    .find(".textarea")
    .val();

    console.log(index, eventDescription);
    console.log(timeBlocks.length);
    console.log(timeBlocks);
    
    timeBlocks[index].description = eventDescription;
    saveSchedule();
});



