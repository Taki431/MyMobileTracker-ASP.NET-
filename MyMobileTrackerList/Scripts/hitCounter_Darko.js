var counter = 0;

$("#btnStart").click(function () {
    console.log("Enabled");
    $("#btnHitCounter").css("display", "block");
    $("#btnHitCounter").css("background-color", "green");
    $("#btnHitCounter").attr("value", "Push");
    $("#infoMessage").css("display", "block");

    var timeleft = 10;
    var downloadTimer = setInterval(function () {
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;
        if (timeleft <= 0) {
            sendCounter(counter);
            clearInterval(downloadTimer);
        }
    }, 1000);
});

$("#btnHitCounter").click(function () {
    counter++;
    console.log(counter);
});

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
    console.log("reset counter:" + counter);
}


