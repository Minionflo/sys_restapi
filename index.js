const fs  = require('fs');
const app = require('express')();
const os  = require('os');

var cpu_temp_path = process.env.CPU_TEMP_PATH
var port = process.env.PORT
if (port >= 0 && port <= 65536) { console.log("port vaild") } else {port = 8080; console.log("port invalid. set port to 8080")}

app.listen(port, () => console.log("Started"))

app.get("/cpu/temp", (req, res) => {
    res.status(200)
    var result_raw = fs.readFileSync(cpu_temp_path)
    var result = result_raw*0.001
    console.log("/cpu/temp Req: " + result)
    res.end(result.toString());
})

app.get("/cpu/freq", (req, res) => {
    res.status(200)
    var result = []
    os.cpus().forEach(function(info) {result.push(info.speed)})
    result = result.join(":").toString()
    console.log("/cpu/freq Req: " + result)
    res.end(result.toString());
})

app.get("/cpu/model", (req, res) => {
    res.status(200)
    var result = os.cpus()[0].model
    console.log("/cpu/model Req: " + result)
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
function sec2time(seconds) {
    seconds = Number(seconds);
    var pad = function(num, size) { return ('000' + num).slice(size * -1); }
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    return pad(d, 3) + ':' + pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
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

app.get("/mem/available", (req, res) => {
    res.status(200)
    var result_raw0 = fs.readFileSync("/proc/meminfo")
    var result_raw1 = result_raw0.toString()
    var result_raw2 = result_raw1.split('\n')
    var result_raw3 = result_raw2[2].replace(/\D/g, "")
    var result_raw4 = result_raw3/1024
    var result = result_raw4.toFixed(0)
    console.log("/mem/available Req: " + result)
    res.end(result.toString());
})