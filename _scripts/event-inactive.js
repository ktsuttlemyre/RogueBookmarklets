/*formats accepted
YY:MM:WW:DD:HH:MM:SS:MS
1Y:2M:3W:4D:1h:1m:1s:300ms
10Y:2M:3W:4D:1h:1:1.342
(\d|\.)+(Y|M|W|D|h|ms|s|m|:|)
*/
timeout={} ,command, events


function toTime(input,output){
    input=input.split(":")
    input.indexOf('Y')

}



//stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript-elegantly
var inactivityTime = function (timeOut,command,events) {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logout() {
        RogueBM.run(command)
        //location.href = 'logout.html'
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, timeOut) 
        // 1000 milliseconds = 1 second
    }
    
    events.forEach(function(name) {
     document.addEventListener(name, resetTimer, true); 
    });


};

var to=0
if(timeOut=='object'){
   to+=(timeOut.ms||timeOut.milliseconds||timeOut.millisecond||0);
   to+=(timeOut.sec||timeOut.seconds||timeOut.second||0)*1000;
   to+=(timeOut.min||timeOut.minutes||timeOut.minute||0)*60000;
   to+=(timeOut.hr||timeOut.hours||timeOut.hour||0)*60*60000;
}
if(!to){
    throw 'No time out set'
    return
}
if(!command){
    throw 'No command set'
    return
}
events = events || ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart','click','keydown','scroll'];
//window.onload = function() {
  inactivityTime(to,command,events); 
//}

