var counter = 0;
var done = 0;
var downloadTimer = 0;

$("#btnStart").click(function () {
    console.log("Enabled");
    $("#btnHitCounter").css("display", "block");
    $("#btnHitCounter").css("background-color", "green");
    $("#btnHitCounter").attr("value", "Push");
    $("#infoMessage").css("display", "block");
    countDown(10);

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
    done = 1;
});

function countDown(timeleft) {
        downloadTimer = setInterval(function () {
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
    counter = 0;
    done = 1;
    console.log("reset counter:" + counter);
}


