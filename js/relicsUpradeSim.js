/**
 * relicsUpgradeSim v0.1.3
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_relicsUpgradeSim_js/graphs/contributors)
 * Licensed under MIT (https://github.com/DioMao/genshin_relicsUpgradeSim_js/blob/main/LICENSE)
 */
"use strict";
// export {relicsSim,parts,partsCh,entryList,entryListCh,mainEntryList,mainEntryListCh};

const relicsSim = new RelicsFunction();
const relicsSimVersion = "0.1.3";
// relicsSim.creatRelic("cup","fire",["ATKPer","critRate","critDMG","elementMastery"],[5.8,3.9,7.8,23]);

// 词缀条目
const entryList = ["critRate", "critDMG", "ATK", "ATKPer", "def", "defPer", "HP", "HPPer", "energyRecharge", "elementMastery"],
    entryListCh = ["暴击率%", "暴击伤害%", "攻击", "攻击%", "防御", "防御%", "生命", "生命%", "充能效率%", "元素精通"],
    entryProbability = [0.3, 0.3, 0.75, 0.5, 0.75, 0.5, 0.75, 0.5, 0.3, 0.3],
    entryValue = {
        "critRate": [2.7, 3.1, 3.5, 3.9],
        "critDMG": [5.4, 6.2, 7, 7.8],
        "ATK": [14, 16, 18, 19],
        "ATKPer": [4.1, 4.7, 5.3, 5.8],
        "def": [16, 19, 21, 23],
        "defPer": [5.1, 5.8, 6.6, 7.3],
        "HP": [209, 239, 269, 299],
        "HPPer": [4.1, 4.7, 5.3, 5.8],
        "energyRecharge": [4.5, 5.2, 5.8, 6.5],
        "elementMastery": [16, 19, 21, 23]
    }

// 部件列表
const parts = ["feather", "flower", "hourglass", "hat", "cup"],
    partsCh = ["死之羽", "生之花", "时之沙", "理之冠", "空之杯"];

// 部件主词条列表
const feather = ["ATK"],
    flower = ["HP"],
    hourglass = ["ATKPer", "defPer", "HPPer", "elementMastery", "energyRecharge"],
    hat = ["critRate", "critDMG", "ATKPer", "defPer", "HPPer", "elementMastery", "HPRes"],
    cup = ["ATKPer", "defPer", "HPPer", "elementMastery", "water", "fire", "thunder", "rock", "wind", "ice", "Physical"],
    mainEntryList = ["ATK", "HP", "critRate", "energyRecharge", "HPRes", "critDMG", "ATKPer", "defPer", "HPPer", "elementMastery", "water", "fire", "thunder", "rock", "wind", "ice", "Physical"],
    mainEntryListCh = ["攻击", "生命", "暴击率%", "充能效率%", "治疗加成", "暴击伤害%", "攻击%", "防御%", "生命%", "元素精通", "水元素伤害", "火元素伤害", "雷元素伤害", "岩元素伤害", "风元素伤害", "冰元素伤害", "物理伤害"];

const cusEntryList = {
    "feather": feather,
    "flower": flower,
    "hourglass": hourglass,
    "hat": hat,
    "cup": cup
};

// 部件主词条概率
const hourglassRate = [0.26, 0.26, 0.26, 0.1, 0.1],
    hatRate = [0.1, 0.1, 0.22, 0.22, 0.22, 0.04, 0.1],
    cupRate = [0.21, 0.21, 0.21, 0.025, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];

/**
 * 构造函数
 */
function RelicsFunction() {
    this.result = [];
    this.count = 0;
    this.history = [];
    this.backup = [];
    this.deleteHistory = [];
};

/**
 * 生成初始数据
 * @param {string} __part 指定位置，可为空
 * @param {string} __main 指定主词条，可为空
 * @param {Array} __entryArr 指定词条（3-4条），可为空
 * @param {Array} __entryRate 副词条数值（对应自选副词条），可为空
 * @returns {object} 对象newRelics
 */
RelicsFunction.prototype.creatRelic = function (__part = "", __main = "", __entry = [], __entryRate = []) {
    let newRelics = {
        level: 0,
        part: "none",
        mainEntry: "none",
        entry: [],
        initEntry: '',
        upgradeHistory: [],
        creationDate: Date.now()
    }
    // 自选或随机位置
    if (typeof (__part) == "string" && parts.indexOf(__part) != -1) {
        newRelics.part = __part;
    } else {
        newRelics.part = parts[Math.floor((Math.random() * parts.length))];
    }
    // 自选或随机主属性
    if (typeof (__main) == "string" && mainEntryList.indexOf(__main) != -1 && mainEntryVerify(newRelics.part, __main)) {
        newRelics.mainEntry = __main;
    } else {
        newRelics.mainEntry = randomMainEntry(newRelics.part);
    }
    // 自选副词条
    if (__entry.length == 3 || __entry.length == 4 && entryVerify(newRelics.mainEntry, __entry)) {
        for (let i = 0; i < __entry.length; i++) {
            let cusEntry = __entry[i],
                cusEntryRate = __entryRate[i];
            // 判断自选副词条数值是否合规
            if (__entryRate.length == 0 || typeof (cusEntryRate) != "number" || entryValue[cusEntry].indexOf(cusEntryRate) == -1) {
                cusEntryRate = randomEntryValue(__entry);
            }
            newRelics.entry.push([cusEntry, cusEntryRate]);
        }
    } else {
        let relicEntry = [],
            relicEntryRate = [];
        for (let i = 0; i < entryList.length; i++) {
            entryList[i] == newRelics.mainEntry ? null : (relicEntry.push(entryList[i]), relicEntryRate.push(entryProbability[i]));
        }
        // 随机词条
        for (let i = 0; i < 3; i++) {
            //临时词条库
            let newEntry = randomRate(relicEntry, relicEntryRate),
                newEntryRate = randomEntryValue(newEntry),
                index = relicEntry.indexOf(newEntry);
            // 从临时词条库中移除已有词条，避免重复
            relicEntry.splice(index, 1);
            relicEntryRate.splice(index, 1);
            // 写入词条数据
            newRelics.entry[i] = [newEntry, newEntryRate];
        }
        // 是否拥有初始四词条
        if (Math.random() < 0.2) {
            let newEntry = randomRate(relicEntry, relicEntryRate);
            newRelics.entry[3] = [newEntry, randomEntryValue(newEntry)];
        }
    }
    // 保存初始状态
    newRelics.initEntry = JSON.stringify(newRelics.entry);
    // 保存结果
    this.result.push(newRelics);
    this.count++;
    console.log(newRelics);
    // console.log(this.result);
    return newRelics;
}

/**
 * 升级强化
 * @param {number} __index 序号
 * @param {string} __entry 指定强化的词条（默认空值）
 * @param {number} __upLevel 强化数值的级别(0-3，3最高)
 */
RelicsFunction.prototype.upgrade = function (__index, __entry = "", __upLevel = -1) {
    if (__index >= this.result.length || __index < 0) return false;
    let currentRelic = this.result[__index],
        currentEntry = [],
        currentEntryList = [],
        currentEntryRate = [];
    // 判断圣遗物是否满级
    if (currentRelic.level >= 20) {
        console.log("Upgrade failed,this relic is fully rated.");
        return false;
    };
    // 是否需要补充词条
    if (currentRelic.entry.length < 4) {
        for (let i = 0; i < currentRelic.entry.length; i++) {
            currentEntry.push(currentRelic.entry[i][0]);
        }
        // 挑选可用词条（避免与其余词条重复）
        for (let i = 0; i < entryList.length; i++) {
            if (currentEntry.indexOf(entryList[i]) < 0) {
                currentEntryList.push(entryList[i]);
                currentEntryRate.push(entryProbability[i]);
            }
        }
        let addEntry = randomRate(currentEntryList, currentEntryRate),
            addRate = randomEntryValue(addEntry);
        this.result[__index].entry.push([addEntry, addRate]);
        this.result[__index].upgradeHistory.push([addEntry, addRate]);
        console.log("Upgrade success,new entry is " + addEntry + " + " + addRate);
    } else {
        let upIndex = 0,
            upEntry = "",
            upRate = 0;
        // 优先升级自选词条
        if (__entry != "" && entryList.indexOf(__entry) >= 0) {
            for (let i = 0; i < currentRelic.entry.length; i++) {
                if (__entry == currentRelic.entry[i][0]) {
                    upIndex = i;
                    upEntry = currentRelic.entry[i][0];
                }
            }
        } else {
            // 升级随机词条
            upIndex = Math.floor(Math.random() * currentRelic.entry.length);
            upEntry = currentRelic.entry[upIndex][0];
        }
        if(__upLevel != -1 && typeof(__upLevel) == "number" && Math.floor(__upLevel) < entryValue[upEntry].length){
            upRate = entryValue[upEntry][Math.floor(__upLevel)];
        }else{
            upRate = randomEntryValue(upEntry);
        }
        console.log("Upgrade success," + upEntry + " + " + upRate);
        this.result[__index].entry[upIndex][1] += upRate;
        this.result[__index].upgradeHistory.push([upEntry, upRate]);
    }
    // 增加等级
    this.result[__index].level += 4;
}

/**
 * 圣遗物得分计算
 * @param {*} __index 需要计算的圣遗物序号 
 * @param {*} __rule 计算规则
 * @returns 得分
 */
RelicsFunction.prototype.relicScore = function(__index, __rule = "default"){
    // 计分标准（待完善）
    let scoreStandar = {
        "critRate": 2,
        "critDMG": 1,
        "ATK": 0.13,
        "ATKPer": 1.345,
        "def": 0.11,
        "defPer": 1.07,
        "HP": 0.0087,
        "HPPer": 1.345,
        "energyRecharge": 1.2,
        "elementMastery": 0.339
    }
    let atkScore = 0,
    defScore = 0,
    HPScore = 0,
    rechargeScore = 0,
    EMScore = 0,
    entryArr = this.result[__index].entry;
    for(let i = 0; i < entryArr.length; i++){
        let entryNow = entryArr[i][0];
        if(entryNow == "critRate" || entryNow == "critDMG" || entryNow == "ATK" || entryNow == "ATKPer"){
            atkScore += entryArr[i][1]*scoreStandar[entryNow];
        }else if(entryNow == "def" || entryNow == "defPer"){
            defScore += entryArr[i][1]*scoreStandar[entryNow];
        }else if(entryNow == "HP" || entryNow == "HPPer"){
            HPScore += entryArr[i][1]*scoreStandar[entryNow];
        }else if(entryNow == "energyRecharge"){
            rechargeScore += entryArr[i][1]*scoreStandar[entryNow];
        }else if(entryNow == "elementMastery"){
            EMScore += entryArr[i][1]*scoreStandar[entryNow];
        }
    }
    // 暂时只计算输出得分
    return atkScore;
}

/**
 * 圣遗物重置初始状态
 * @param {number} __index 序号
 */
RelicsFunction.prototype.reset = function (__index) {
    this.result[__index].entry.length = 0;
    this.result[__index].entry = JSON.parse(this.result[__index].initEntry);
    this.result[__index].upgradeHistory.length = 0;
    this.result[__index].level = 0;
}

/**
 * 重置全部圣遗物状态
 */
RelicsFunction.prototype.resetAll = function () {
    for (let i = 0; i < this.result.length; i++) {
        this.reset(i);
    }
}

/**
 * 删除指定数据
 * @param {number} __del 要删除的遗物序号
 */
RelicsFunction.prototype.deleteOne = function (__del) {
    this.deleteHistory.push(this.result.splice(__del, 1)[0]);
}

/**
 * 批量删除指定数据
 * @param {Array} __delArr 要删除的遗物序号（数组）
 */
RelicsFunction.prototype.batchDelete = function (__delArr) {
    __delArr.sort((a, b) => a - b);
    for (let i = __delArr.length - 1; i >= 0; i--) {
        this.deleteHistory.push(this.result.splice(__delArr[i], 1)[0]);
    }
}

/**
 * 清空数据
 */
RelicsFunction.prototype.clearAll = function () {
    // 备份原数据
    if (this.backup.length != 0) this.backup.length = 0;
    this.backup = JSON.parse(JSON.stringify(this.result));
    this.result.length = 0;
}

/**
 * 撤销删除（对deleteOne删除的数据生效）
 */
RelicsFunction.prototype.undoDel = function () {
    if (this.deleteHistory.length == 0) {
        console.log("Undo false, history not found.");
        return false;
    }
    this.result.push(this.deleteHistory.pop());
}

/** 辅助函数 **/

/**
 * 模拟器版本检查
 * @returns 检查结果
 */
function versionCheck(){
    let storage = window.localStorage;
    if(!storage){
        alert("浏览器不支持localstorage");
        return false;
    }else{
        if(storage.relicsSimVersion == undefined){
            storage.relicsSimVersion = relicsSimVersion;
            return true;
        }else if(storage.relicsSimVersion != relicsSimVersion){
            alert("模拟器版本更新，如果遇到错误，请尝试清除浏览器缓存!");
            storage.relicsSimVersion = relicsSimVersion;
            return false;
        }
    }
    return true;
}
versionCheck();

/**
 * 根据数组随机概率
 * @param {Array} __arr1  随机列表
 * @param {Array} __arr2  随机概率（对应arr1）
 */
function randomRate(__arr1, __arr2) {
    if (__arr1.length != __arr2.length) {
        console.log("Warning!Array length different!");
    }
    let __rand = Math.random(),
        __rate = 0,
        __totalRate = 0;
    for (let __i = 0; __i < __arr2.length; __i++) {
        __totalRate += __arr2[__i];
    }
    __rand *= __totalRate;
    for (let __i = 0; __i < __arr2.length; __i++) {
        __rate += __arr2[__i];
        if (__rand <= __rate) {
            return __arr1[__i];
        }
    }
    return __arr1[__arr1.length - 1];
}

/**
 * 主词条合规验证
 * @param {string} __part 位置
 * @param {string} __main 主词条
 * @returns {boolean} true/false
 */
function mainEntryVerify(__part, __main) {
    if (typeof (__part) != "string" || typeof (__main) != "string") return false;
    if (parts.indexOf(__part) != -1 && mainEntryList.indexOf(__main) != -1) {
        if(cusEntryList[__part].indexOf(__main) != -1){
            return true;
        }
        return false;
    }
    return false;
}

/**
 * 随机主词条
 * @param {string} __part 位置
 */
function randomMainEntry(__part) {
    switch (__part) {
        case "feather":
            return "ATK";
        case "flower":
            return "HP";
        case "hourglass":
            return randomRate(hourglass, hourglassRate);
        case "hat":
            return randomRate(hat, hatRate);
        case "cup":
            return randomRate(cup, cupRate);
        default:
            console.log("Error! -randomMainEntry-");
    }
}

/**
 * 自选副词条合规验证
 * @param {string} __mainEntry 主词条
 * @param {Array} __entryArr 副词条数组
 * @returns 
 */
function entryVerify(__mainEntry, __entryArr) {
    for (let i = 0; i < __entryArr.length; i++) {
        if (__mainEntry == __entryArr[i] || entryList.indexOf(__entryArr[i]) == -1) {
            return false;
        }
    }
    return true;
}

/** 
 * 随机副词条数值
 * @param {string} __entry 词条名称
 */
function randomEntryValue(__entry) {
    return entryValue[__entry][Math.floor(Math.random() * entryValue[__entry].length)];
}