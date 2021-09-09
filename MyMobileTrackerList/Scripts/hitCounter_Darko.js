var counter = 0;
var done = 0;
var downloadTimer = 0;
var curval = 0;
var maxval = 0;

$("#btnStart").click(function () {
    console.log("Enabled");
    $("#btnHitCounter").css("display", "block");
    $("#btnHitCounter").css("background-color", "green");
    $("#btnHitCounter").attr("value", "Push");
    $("#infoMessage").css("display", "block");
    //countDown(10); 
    countDown(3);

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
    document.getElementById("countdowntimer").textContent = 10;
    clearInterval(downloadTimer);
    counter = 0;
    done = 0;
});

function countDown(timeleft) {
    downloadTimer = setInterval(function () {
        console.log("countDown Start!");
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;
        if (timeleft <= 0) {
            sendCounter(counter);
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
        success: callSuccess(),
        error: function () { alert('A error'); }
    });
}

function callSuccess() {
    $("#btnHitCounter").css("background-color", "grey");
    $("#btnHitCounter").attr("value", "Done");
    $("#btnHitCounter").text("Done");
    console.log("total number of clicks:" + counter);
    updateProgressBar();
    done = 1;
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
    console.log("Update Score!" + data + counter) 
    $("#pbar")[0].max = data;
    $("#pbar")[0].value = counter;
    counter = 0;
}
