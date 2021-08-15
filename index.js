const fs = require('fs');
const app = require('express')();

var zone = process.env.ZONE
var port = process.env.PORT
if (port >= 0 && port <= 65536) { console.log("port vaild") } else {port = 8080; console.log("port invalid. set port to 8080")}
if (Number.isFinite(zone)) { console.log("zone vaild") } else {zone = 0; console.log("zone invalid. set zone to 0")}

app.listen(port, () => console.log("Started"))

app.get("/cpu/temp", (req, res) => {
    res.status(200)
    var result_raw = fs.readFileSync("/sys/class/thermal/thermal_zone" + zone + "/temp")
    var result = result_raw*0.001
    console.log("/cpu/temp Req: " + result)
    res.end(result.toString());
})


app.get("/uptime", (req, res) => {
    res.status(200)
    var result_raw0 = fs.readFileSync("/proc/uptime")
    var result_raw1 = result_raw0.toString()
    var result_raw2 = result_raw1.split(' ')
    var result_raw3 = result_raw2[0].slice(0, -3)
    var result = sec2time(result_raw3)
    console.log("/uptime Req: " + result)
    res.end(result.toString());
})
function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60)
    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}


app.get("/mem/free", (req, res) => {
    res.status(200)
    var result_raw0 = fs.readFileSync("/proc/meminfo")
    var result_raw1 = result_raw0.toString()
    var result_raw2 = result_raw1.split('\n')
    var result_raw3 = result_raw2[1].replace(/\D/g, "")
    var result_raw4 = result_raw3/1024
    var result = result_raw4.toFixed(0)
    console.log("/mem/free Req: " + result)
    res.end(result.toString());
})