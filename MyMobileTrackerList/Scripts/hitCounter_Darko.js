var counter = 0;
var done = 0;
var downloadTimer = 0;
var curval = 0;
var maxval = 0;
var timer = 5
var start = 1;

$("#btnStart").click(function () {
    if (start)
    {
        console.log("Enabled");
        $("#btnHitCounter").css("display", "block");
        $("#btnHitCounter").css("background-color", "green");
        $("#btnHitCounter").attr("value", "Push");
        $("#infoMessage").css("display", "block");
        //countDown(10); 
        start = 0;
        done = 0;
        counter = 0;
        countDown(timer);
        
    }
});

$("#btnHitCounter").click(function () {
    if (!done)
    {
        counter++;
        console.log(counter);
    }
});

$("#btnRefresh").click(function () {
    console.log("Refresh!");
    $("#btnHitCounter").css("display", "block");
    $("#btnHitCounter").css("background-color", "green");
    $("#btnHitCounter").attr("value", "Push");
    $("#infoMessage").css("display", "block");
    document.getElementById("countdowntimer").textContent = timer;
    clearInterval(downloadTimer);
    counter = 0;
    start = 1;
});

function countDown(timeleft) {
    downloadTimer = setInterval(function () {
        console.log("countDown" + " " + timeleft + " " + "!");
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;
        if (timeleft <= 0) {
            sendCounter(counter);
            updateProgressBar();
            clearInterval(downloadTimer);
        }
    }, 1000);
}

function sendCounter() {
    $.ajax({
        type: "POST",
        //url: '@Url.Action("AjaxPush", "MyMobileTrackers")',
        //url: '@Url.Action("MyMobileTrackers","AjaxPush" )',
        url: "./MyMobileTrackers/AjaxPush",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ 'hitcount': counter }),
        success: function (dataCheck) {
            if (dataCheck == '-1') {
                console.log("The click hasn't been updated since it's less than the highest score.");
            }
            else {
                callSuccess()
            }
        },
        error: function () { alert('A error'); }
    });
}

function callSuccess() {
    $("#btnHitCounter").css("background-color", "grey");
    $("#btnHitCounter").attr("value", "Done");
    $("#btnHitCounter").text("Done");

    console.log("total number of clicks:" + counter);
    done = 1;
    start = 1;
    console.log("reset counter:" + counter);
}


function updateProgressBar() {
    
    $.ajax({
        type: "GET",
        url: "./MyMobileTrackers/AjaxGet",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            console.log("success!" + data)
            updateScores(data)
        },
        error: function (e) { alert('A error1'); console.log(e) }
    });    
}


function updateScores(data) {
    console.log("Update Score!" + data + " "+ counter) 
    $("#pbar")[0].max = data;
    $("#pbar")[0].value = counter;
    counter = 0;
}
