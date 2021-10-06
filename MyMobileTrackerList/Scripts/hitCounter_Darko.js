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
            console.log("success!")
            drawTable(data)
            updateScores(data)
        },
        error: function (e) { alert('A error1'); console.log(e) }
    });    
}


function updateScores(data) {
    //var bar = document.querySelectorAll('#orderBody');
    for (i = 0; i < data.length; i++)
    {
        pbarid = "#pbar" + i;
        $(pbarid)[0].max = data[0][1];
        $(pbarid)[0].value = data[i][1];
    }
    //$("#pbar")[0].value = 20;
    counter = 0;
}

function drawTable(data) {

    for (i = 0; i < data.length; i++)
    {
        var maxHitCount = data[0][1];
        var htmlRow="<tr>"
        var item = data[i];
        //htmlRow += '<td><p class="scoreBar" style="display: none">';
        htmlRow += '<td>';
        
        var bar = document.createElement('progress');
        bar.id = 'pbar' + i;
        htmlRow += bar.outerHTML;
        htmlRow += '</p></td>';

        htmlRow += "<td>" + data[i][1] + "</td>";
        htmlRow += "<td>" + data[i][2] + "</td>";
        htmlRow+="</tr>"

        $("#orderBody").append(htmlRow);
    }
}    
