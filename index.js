const homes = new Map();
let addr = `Paul/Tina家,Paul/Tina家, <a href="https://maps.app.goo.gl/v6BpSCsMR4bpHnuZA">5114 Doreen Ave. Temple  City 91780</a>`;
homes.set("Tina/Paul", addr);
addr = `李庆弟兄/云苹姊妹家, <a href="https://maps.app.goo.gl/8KkehPoADML4cGrJ9">4970 Loma Ave. Temple City, 91780</a>`;
homes.set("李庆弟兄/云苹姊妹家", addr);

const img = './pics/smallgrroup.jpg'; 
const date = `11/15/2024`;
const home = homes.get("李庆弟兄/云苹姊妹家");
const hymn_name = "大本詩歌588 主阿，我来就你";
const hymn_link = "https://rosemeaddistrict.github.io/myhymns/%E8%A9%A9%E6%AD%8C/%E5%A4%A7%E6%9C%AC/588%E4%B8%BB%E9%98%BF%EF%BC%8C%E6%88%91%E6%9D%A5%E5%B0%B1%E4%BD%A0.html";
const book_name = "牧养材料96题 第三系列 信而顺服";
const chapter  = "第八题　叫饥饿的得饱美物";
const chapter_link = "https://e-shepherding.org/%e7%ac%ac%e5%85%ab%e9%a2%98%e3%80%80%e5%8f%ab%e9%a5%a5%e9%a5%bf%e7%9a%84%e5%be%97%e9%a5%b1%e7%be%8e%e7%89%a9/" 

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
