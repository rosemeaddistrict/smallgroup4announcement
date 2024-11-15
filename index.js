// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '509726254247-3khrc8evl7i0g7lfvfogojda8569o6ia.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAb-CInxch9Og9IyRaXDQNTpnSDNJo5zhQ';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
//Sheet Link: https://docs.google.com/spreadsheets/d/1dcex4P4KG0O6t6zZelVTo0GDPBol3HwaqGH-XSgT8sg/edit?usp=sharing
const sheetsId = '1dcex4P4KG0O6t6zZelVTo0GDPBol3HwaqGH-XSgT8sg';


const homes = new Map();
let addr = `Paul/Tina家,Paul/Tina家, <a href="https://maps.app.goo.gl/v6BpSCsMR4bpHnuZA">5114 Doreen Ave. Temple  City 91780</a>`;
homes.set("Tina/Paul", addr);
addr = `李庆弟兄/云苹姊妹家, <a href="https://maps.app.goo.gl/8KkehPoADML4cGrJ9">4970 Loma Ave. Temple City, 91780</a>`;
homes.set("李庆弟兄/云苹姊妹家", addr);

// const img = './pics/smallgrroup.jpg'; 
// const date = `11/15/2024`;
// const home = homes.get("李庆弟兄/云苹姊妹家");
// const hymn_name = "大本詩歌588 主阿，我来就你";
// const hymn_link = "https://rosemeaddistrict.github.io/myhymns/%E8%A9%A9%E6%AD%8C/%E5%A4%A7%E6%9C%AC/588%E4%B8%BB%E9%98%BF%EF%BC%8C%E6%88%91%E6%9D%A5%E5%B0%B1%E4%BD%A0.html";
// const book_name = "牧养材料96题 第三系列 信而顺服";
// const chapter  = "第八题　叫饥饿的得饱美物";
// const chapter_link = "https://e-shepherding.org/%e7%ac%ac%e5%85%ab%e9%a2%98%e3%80%80%e5%8f%ab%e9%a5%a5%e9%a5%bf%e7%9a%84%e5%be%97%e9%a5%b1%e7%be%8e%e7%89%a9/" 

/**
* Callback after api.js is loaded.
*/
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
* Callback after the API client is loaded. Loads the
* discovery doc to initialize the API.
*/
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    await reflreshData();
}

async function reflreshData() {
    await displayItems('Form Responses 1', `title`);
}

let lastRow = 0;
async function obtainRows(page, element) {

    const dataRange = `${page}!B${2}:B`;

    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetsId,
        range: dataRange,
        });
    } catch (err) {
        document.getElementById(element).innerText = err.message;
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        document.getElementById(element).innerText = 'No values found.';
        return;
    }
    
    lastRow = range.values.length;
}

async function displayItems(page, element) {

    await obtainRows(page, element);

    let response;
    console.log(lastRow);
    
    const dataRange = `${page}!A1:I`;
    
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetsId,
        range: dataRange
        });
    } catch (err) {
        document.getElementById(element).innerText = err.message;
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        document.getElementById(element).innerText = 'No values found.';
        return;
    }
    
    let img = ''; 
    let date = '';
    let home = '';
    let hymn_name = '';
    let hymn_link = '';
    let book_name = '';
    let chapter  = '';
    let chapter_link = ''; 
    let line = 0;
    range.values.forEach((row) => {   
        if(line == lastRow)
        {
            date = row[1];
            home = homes.get(row[2]);
            img = row[3];
            hymn_name = row[4];
            hymn_link = row[5];
            book_name = row[6];
            chapter = row[7];
            chapter_link = row[8];
        }
        line++;
    });

    //經節
    document.getElementById('picture').setAttribute("src", `${img}`)
    //聚会時間
    document.getElementById('date').innerHTML = `日期： 周五(${date}) 晚上七点`;
    //聚会地点
    document.getElementById('home').innerHTML = `地点： ${home} (可以的话，每家带一道菜)`;
    //聚會詩歌
    document.getElementById('hymn').innerHTML = `诗歌：<a href=${hymn_link}>${hymn_name}</a>`;
    //進度
    document.getElementById('lesson').innerHTML = `进度: ${book_name}`;
    document.getElementById('class').innerHTML = `<a href=${chapter_link}>${chapter}</a>`;
}


