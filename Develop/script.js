/* 

USER STORY
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively

ACCEPTANCE CRITERIA
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
*/

var timeBlocks = [
    {displayTime:"9 AM", time24h:"9", description:"",},
    {displayTime:"10 AM", time24h:"10", description:"",},
    {displayTime:"11 AM", time24h:"11", description:"",},
    {displayTime:"12 PM", time24h:"12", description:"",},
    {displayTime:"1 PM", time24h:"13", description:"",},
    {displayTime:"2 PM", time24h:"14", description:"",},
    {displayTime:"3 PM", time24h:"15", description:"",},
    {displayTime:"4 PM", time24h:"16", description:"",},
    {displayTime:"5 PM", time24h:"17", description:"",},
  ];  
function displayCurrentDate() {
    var todayData = luxon.DateTime.now();
    var todaysDate = todayData.toLocaleString(luxon.DateTime.DATE_HUGE);
    $('#currentDay').text(todaysDate);
};


function saveSchedule(){
    localStorage.setItem("Schedule", JSON.stringify(timeBlocks));
};

function renderTimeBlocks(){
    var currentHour = luxon.DateTime.now();
    currentHour = currentHour.hour;

    if (localStorage.getItem("Schedule") === null){
        localStorage.setItem("Schedule", JSON.stringify(timeBlocks));
    }
    var data = JSON.parse(localStorage.getItem("Schedule"));;

    for (var i=0; i<timeBlocks.length; i++) {

        var hour = data[i].time24h;        
        var blockList = document.querySelector("#block-list");

        var timeBlockEl = document.createElement("div");
        timeBlockEl.classList = "row time-block";
        //Time 
        var timeEl = document.createElement("div");
        timeEl.classList = "col-1 hour";
        timeEl.innerHTML = data[i].displayTime;

        //Save Button
        var saveEl = document.createElement("div");
        saveEl.classList = "col-1 btn btn-primary saveBtn";
        saveEl.id = "save";
        saveEl.innerHTML = "Save";
        
        var eventEl = document.createElement("div");
        var eventDescriptionEl = document.createElement("textarea");

        eventDescriptionEl.classList = "textarea";
        eventDescriptionEl.id = "description";
        if(data[i].description == ""){
            eventDescriptionEl.textContent = "Enter Text";
        }
        eventDescriptionEl.textContent = data[i].description;

        eventEl.appendChild(eventDescriptionEl);

        //Past
        if (hour < currentHour){
            eventEl.classList = "col-10 past";
        }
        // Future
        else if (hour > currentHour){
            eventEl.classList = "col-10 future";
        }
        // Present
        else if (hour == currentHour){
            eventEl.classList = "col-10 present";
        }
        //Assemble Time Block
        timeBlockEl.appendChild(timeEl);
        timeBlockEl.appendChild(eventEl);
        timeBlockEl.appendChild(saveEl);
        blockList.appendChild(timeBlockEl);
        
    }
}


displayCurrentDate();
renderTimeBlocks();

$( ".saveBtn" ).click(function() {

    const index = $(this)
    .closest(".time-block")
    .index();

    const eventDescription = $(this)
    .closest(".time-block")
    .find(".textarea")
    .val();

    timeBlocks[index].description = eventDescription;
    console.log(index);
    console.log(eventDescription);
    console.log(timeBlocks[index]);
    localStorage.setItem("Schedule", JSON.stringify(timeBlocks));

});



