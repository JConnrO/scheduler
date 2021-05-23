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

// 1. Display Current Day at the top of the calendar

function displayCurrentDate() {
    var todayData = luxon.DateTime.now();
    var todaysDate = todayData.toLocaleString(luxon.DateTime.DATE_HUGE);
    $('#currentDay').text(todaysDate);
};
// 2. Time blocks for standard business hours (9-5)
//     A. Color Coded (Past, Present, Future)
//     B. OnClick - Enter an event and save, text is saved in local storage (Persists on refresh)
/*
<div class="row time-block">
    <div class="col-1 hour">9AM</div>
    <div class="col-10 description textarea">World</div>
    <div class="col-1 saveBtn">420</div>
</div> */

function renderTimeBlocks(){
    var currentHour = luxon.DateTime.now();
    currentHour = currentHour.hour;
    var timeBlocks = {9:'9 AM', 10:'10 AM', 11:'11 AM',12:'12 PM',13:'1 PM',14:'2 PM', 15:'3 PM', 16:'4 PM', 17:'5 PM'};
    
    for (const [key, value] of Object.entries(timeBlocks)) {
        var hour = `${key}`;
        var blockList = document.querySelector("#block-list");

        var timeBlockEl = document.createElement("div");
        timeBlockEl.classList = "row time-block";

        var timeEl = document.createElement("div");
        timeEl.classList = "col-1 hour";
      
        var eventEl = document.createElement("div");
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

        var saveEl = document.createElement("div");
        saveEl.classList = "col-1 .saveBtn";

        //Assemble Time Block
        timeBlockEl.appendChild(timeEl);
        timeBlockEl.appendChild(eventEl);
        timeBlockEl.appendChild(saveEl);

        blockList.appendChild(timeBlockEl);
      
    }
}
// MVP
// 1. Display Current Day on top 
displayCurrentDate();
// 2. Create 1 time Block - Function 

renderTimeBlocks();
// 3. Be able to edit the time block - function
// 4. Click Save to save the time block
// 

/*
for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repo name 
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML = "<i class= 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
        statusEl.innerHTML = "<i class= 'fas fa-check-square status-icon icon-success'></i>";
    }
    // append to container
    repoEl.appendChild(statusEl);
    //append container to the dom
    repoContainerEl.appendChild(repoEl);
}
}
*/
