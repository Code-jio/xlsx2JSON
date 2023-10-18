// 读取xlsx文件夹下所有的.xlsx文件,并将其转换为json格式，并输出到JSON文件夹中，文件名转化为json（后缀名：.xlxs==》.json）
// 依赖：node-xlsx
// 安装：npm install node-xlsx

// 使用方法：node xlsx2json.js

const fs = require('fs');
const xlsx = require('node-xlsx');

// 清空JSON文件夹
const JSONfiles = fs.readdirSync('./JSON');
JSONfiles.forEach((file) => {
  fs.unlinkSync(`./JSON/${file}`);
});

// 读取文件夹下所有的xlsx文件
const files = fs.readdirSync('./xlsx');

// 每条数据按对象的键值对保存
files.forEach((file) => {
  const sheets = xlsx.parse(`./xlsx/${file}`);
  const sheet = sheets[0];
  const data = sheet.data;
  const keys = data[0];
  const values = data.slice(1);
  const json = values.map((value) => {
    const obj = {};
    keys.forEach((key, index) => {
      obj[key] = value[index];
    });
    return obj;
  });

  // 将json数据写入文件
  fs.writeFileSync(
    `./JSON/${file.replace('.xlsx', '.json')}`,
    JSON.stringify(json)
  );
});
