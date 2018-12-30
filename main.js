function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }

var mob = detectmob();

function ShowError(message) {
    swal({
        title: "Um erro ocorreu",
        text: message,
        icon: "error",
        button: true,
    });
}

function GetOSName() {
    var OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) OSName = "Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName = "Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName = "Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName = "Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName = "Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName = "Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
    if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
    if (OSName == "Linux" && mob)
    OSName = "Android";
    return OSName;
}

function BrowserName() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera 15+, the true version is after "OPR/" 
    if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return browserName + ' ' + majorVersion;
}

function HardwareInfo() {
    function getUnmaskedInfo(gl) {
        var unMaskedInfo = {
            renderer: '',
            vendor: ''
        };

        var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (dbgRenderInfo != null) {
            unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
            unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
        }

        return unMaskedInfo;
    }
    var result = {};

    var canvas;
    canvas = document.getElementById("glcanvas");
    var gl = canvas.getContext("experimental-webgl");

    result.GPU = getUnmaskedInfo(gl).renderer;
    result.CPU = navigator.hardwareConcurrency;

    return result;
}

function GetInfo() {
    var result = {};

    var findIP = new Promise(r => { var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }), b = () => { }; a.createDataChannel(""); a.createOffer(c => a.setLocalDescription(c, b, b), b); a.onicecandidate = c => { try { c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r) } catch (e) { } } })

    /*Usage example*/
    findIP.then(ip => result.IPv4 = ip).catch(e => ShowError(e));

    $.getJSON('https://ipapi.co/json/', function (data) {
        result.Cidade = data.city;
        result.Estado = data.region;
        result.Pais = data.country_name;
        result.Longitude = data.longitude;
        result.Latitude = data.latitude;
    });

    if (navigator.getBattery){
    navigator.getBattery().then(function (battery) {

        result["Nível de bateria"] = (battery.level * 100) + '%';

    });
    }
    else
    {
     result["Nível de bateria"] = "Indisponível neste navegador";   
    }
        

    var time = new Date();
    result.Data_e_hora = time.toString();

    result.Largura_do_monitor = screen.width;
    result.Altura_do_monitor = screen.height;

    result.Sistema_operacional = GetOSName();
    result.Tipo = "PC/Computador";
    if (mob)
    result.Tipo = "Dispositivo móvel";

    result.Navegador = BrowserName();

    var Hardware = HardwareInfo();

    result.GPU = Hardware.GPU;
    result["Núcleos da CPU"] = Hardware.CPU;

    return result;
}

const table = document.getElementById("table-bd");

function addTbItem(item, value) {
    /*
    <tr>
         <td>Item</td>
         <td>Value</td>
     </tr>
     */
    var tr = document.createElement("tr");
    table.appendChild(tr);
    tr.outerHTML = "<tr><td>" + item + "</td><td>" + value + "</td></tr>";
}

var info;
const loading = document.querySelector("#loading");

const btn = document.querySelector(".btn");
var already = false;

function StartTest() {

    if (already)return;
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-disabled");
    already = true;
    loading.classList.remove("hidden");
    info = GetInfo();
    window.setTimeout(ShowAll,2000);
}

function ShowAll()
{
    loading.classList.add("hidden");
    $("#table-cont").removeAttr("style");

    for (var key in info) {
        var item = key;
        while(item.includes('_'))
        item = item.replace('_', ' ');

        var value = info[key];
        addTbItem(item, value);
    }

    $("#text").html("<p class=\"text-center\">As informações batem com a realidade? Se sim, <b>você pode ser rastreado a qualquer momento</b>!</p>");
}
