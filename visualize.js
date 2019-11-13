console.log(responseBody)
let htmldata = "";
htmldata += '<style type="text/css"> .tftable {font-size:14px;color:#333333;width:100%;border-width: 1px;border-color: #87ceeb;border-collapse: collapse;} .tftable th {font-size:16px;background-color:#87ceeb;border-width: 1px;padding: 8px;border-style: solid;border-color: #87ceeb;text-align:left;} .tftable tr {background-color:#ffffff;} .tftable td {font-size:14px;border-width: 1px;padding: 8px;border-style: solid;border-color: #87ceeb;} .tftable tr:hover {background-color:#e0ffff;}</style>'
htmldata += ("<table class='tftable' border='2'>");


function buildHeaders(jsondata) {
    let formatted = "";
    if (Array.isArray(jsondata)){
        Object.keys(jsondata[0]).forEach(function (value) {
            formatted += ("<th>");
            formatted += (value);
            formatted += ("</th>")
        })
    }
    return formatted;
}

function getFields(field) {
    let formatted = "";
    if (Array.isArray(field)){
        field.forEach(function(node){
            formatted+=getFields(node);
        })
    }else if (typeof field === 'object'){
        formatted+="<table class='tftable' border='2'>";
        formatted+="<tr>";
        for (const key in field){
            formatted+="<th>";
            formatted+=key;
            formatted+="</th>";
        }
        formatted+="</tr>";
        formatted+="<tr>";
        for (const key in field){
            formatted+="<td>";
            formatted+=getFields(field[key]);
            formatted+="</td>";
        }
        formatted+="</tr>";
        formatted+="</table>";
    }else{
        formatted+=field;
    }
    return formatted;
}

function getFirstLevel(obj){
    let formatted = "";
    for (const key in obj){
        formatted+="<td>";
        formatted+=getFields(obj[key]);
        formatted+="</td>";
    }
    return formatted;
}

function buildData(jsondata){
    let formatted = "";
        jsondata.forEach(function (field) {
            formatted+=("<tr>");
            formatted += (getFirstLevel(field));
            formatted += ("</tr>");
        });
    return formatted;
}

htmldata += ("<tr>");
let response = "No Results"
if (responseBody){
    response = JSON.parse(responseBody).body;
}
htmldata += buildHeaders(response);

htmldata += ("</tr>");
htmldata += buildData(response);
htmldata += ("</table>");

// Proper visualization, see https://github.com/softvar/json2html/blob/master/json2html/jsonconv.py

pm.visualizer.set(htmldata);