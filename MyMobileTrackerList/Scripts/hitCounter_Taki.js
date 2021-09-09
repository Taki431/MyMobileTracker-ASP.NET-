
    /*$( "#btnStart" ).click(function() {
        $.ajax({
            type: "POST",
            url: '@Url.Action("AjaxPush", "MyMobileTrackers")',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(100),
            success: changeButton(countdown),
            error: function () { alert('A error'); }
        });
    });
    */
    var hitcount = 0;
    var stop = 0;
    var btnStart = document.getElementById('btnStart');
    var clicks = { };

    function proc1(){
        console.log('proc1');
    if (!stop)
    {
        $("#btnStart").css("background-color", "green");
    $("#btnStart").attr("value","Push");
    $("#btnStart").text("Push");
    countdown(1);
        }
    if (stop)
    {
        $("#btnStart").css("background-color", "grey");
    $("#btnStart").attr("value","Done");
    $("#btnStart").text("Done");
            console.log(">> hitcount");
    console.log(hitcount);
    $.ajax({
        type: "POST",""
    }

    var timerid = null;

    function changeButton(){

        // clear interval        
        // set interval 

        clearInterval(timerid)
        proc1();
    timerid = setTimeout(proc1, 10000);
     
    }


    function click(e) {
     if (stop)
    return;
    var id = e.target.id;
    var hitcount = document.getElementById("hitcount");
    if (!clicks[id])
    clicks[id] = 0;
    clicks[id]++;
    e.target.textContent = clicks[id];
    hitcount.innerHTML = clicks[id];
    }

    function countdown(minutes) {
        var seconds = 10;
    var mins = minutes
    function tick() {
            //This script expects an element with an ID = "counter". You can change that to whatever you want. 
            var counter = document.getElementById("counter");

    var current_minutes = mins-1
    seconds--;

    console.log(current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds));
    counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
            if( seconds > 0 ) {
        setTimeout(tick, 1000);
            } else {
                if(mins > 1){
        countdown(mins - 1);           
                }
    stop = 1;
    console.log(clicks["btnStart"]);
            }
        }
    tick();
    }
    btnStart.addEventListener('click', click);
