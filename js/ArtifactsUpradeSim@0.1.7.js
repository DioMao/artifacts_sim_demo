/**
 * ArtifactsUpgradeSim v0.1.7
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js/graphs/contributors)
 * Licensed under MIT (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js/blob/main/LICENSE)
 */
"use strict";

const ArtifactsSimVersion = "0.1.7";

// 常量数据
class ArtifactConst {
    constructor() {
        this.__ArtifactConstList__ = {
            // 词缀条目
            entryList: ["critRate", "critDMG", "ATK", "ATKPer", "def", "defPer", "HP", "HPPer", "energyRecharge", "elementMastery"],
            entryListCh: ["暴击率%", "暴击伤害%", "攻击力", "攻击力%", "防御力", "防御力%", "生命值", "生命值%", "充能效率%", "元素精通"],
            entryProbability: [0.3, 0.3, 0.75, 0.5, 0.75, 0.5, 0.75, 0.5, 0.3, 0.3],
            entryValue: {
                critRate: [2.7222, 3.1111, 3.5, 3.8889],
                critDMG: [5.4402, 6.2174, 7, 7.7718],
                ATK: [13.6111, 15.5556, 17.5, 19.4444],
                ATKPer: [4.0833, 4.6667, 5.25, 5.8333],
                def: [16.3333, 18.5, 21, 23.3333],
                defPer: [5.1031, 5.8321, 6.5611, 7.2901],
                HP: [209.125, 239, 268.875, 298.75],
                HPPer: [4.0833, 4.6667, 5.25, 5.8333],
                energyRecharge: [4.5325, 5.18, 5.8275, 6.475],
                elementMastery: [16.3333, 18.5, 21, 23.3333]
            },
            extraEnrtyRate: 0.3,
            // 部件列表
            parts: ["feather", "flower", "hourglass", "hat", "cup"],
            partsCh: ["死之羽", "生之花", "时之沙", "理之冠", "空之杯"],
            // 部件主词条列表
            feather: ["ATK"],
            flower: ["HP"],
            hourglass: ["ATKPer", "defPer", "HPPer", "elementMastery", "energyRecharge"],
            hat: ["critRate", "critDMG", "ATKPer", "defPer", "HPPer", "elementMastery", "HPRes"],
            cup: ["ATKPer", "defPer", "HPPer", "elementMastery", "water", "fire", "thunder", "rock", "wind", "ice", "Physical"],
            mainEntryList: ["ATK", "HP", "critRate", "energyRecharge", "HPRes", "critDMG", "ATKPer", "defPer", "HPPer", "elementMastery", "water", "fire", "thunder", "rock", "wind", "ice", "Physical"],
            mainEntryListCh: ["攻击力", "生命值", "暴击率", "元素充能效率", "治疗加成", "暴击伤害", "攻击力", "防御力", "生命值", "元素精通", "水元素伤害加成", "火元素伤害加成", "雷元素伤害加成", "岩元素伤害加成", "风元素伤害加成", "冰元素伤害加成", "物理伤害加成"],
            // 部件主词条概率
            hourglassRate: [0.26, 0.26, 0.26, 0.1, 0.1],
            hatRate: [0.1, 0.1, 0.22, 0.22, 0.22, 0.04, 0.1],
            cupRate: [0.21, 0.21, 0.21, 0.025, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
            // 圣遗物主词条属性
            mainEntryValueList: {
                ATK: [47, 100, 152, 205, 258, 311],
                HP: [717, 1530, 2342, 3156, 3967, 4780],
                critRate: [4.7, 9.9, 15.2, 20.5, 25.8, 31.1],
                energyRecharge: [7.8, 16.5, 25.4, 34.2, 43, 51.8],
                HPRes: [5.4, 11.5, 17.6, 23.7, 29.8, 35.9],
                critDMG: [9.3, 19.9, 30.5, 41, 51.6, 62.2],
                ATKPer: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
                defPer: [8.7, 18.6, 28.6, 38.5, 48.4, 58.3],
                HPPer: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
                elementMastery: [28, 60, 91, 123, 155, 187],
                water: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
                fire: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
                thunder: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
                rock: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
                wind: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
                ice: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
                Physical: [8.7, 18.6, 28.6, 38.5, 48.4, 58.3]
            },
            // 圣遗物评分选项
            scoreList: ["atk", "crit", "def", "hp", "er", "em"],
            scoreListCh: ["攻击得分", "双暴得分", "防御得分", "生命得分", "充能得分", "精通得分"]
        }
    }

    get val() {
        return this.__ArtifactConstList__;
    }
}

/**
 * ES6 version
 */
class ArtifactsFunction_class {
    constructor() {
        this.__result__ = [];
        this.count = 0;
        this.history = [];
        this.backup = [];
        this.deleteHistory = [];
    }

    /**
     * 生成初始数据
     * @param {String} __part 指定位置，可为空
     * @param {String} __main 指定主词条，可为空
     * @param {Array} __entryArr 指定词条（至多四条），可为空
     * @param {Array} __entryRate 副词条数值（对应自选副词条），可为空
     * @returns {Object} 对象newArtifacts
     */
    creatArtifact(__part = "", __main = "", __entry = [], __entryRate = []) {
        let newArtifacts = {
                level: 0,
                part: "none",
                mainEntry: "none",
                mainEntryValue: 0,
                entry: [],
                initEntry: '',
                upgradeHistory: [],
                creationDate: Date.now()
            },
            ArtifactEntry = [],
            ArtifactEntryRate = [];
        // 自选或随机位置
        if (typeof (__part) == "string" && artiConst.val.parts.indexOf(__part) != -1) {
            newArtifacts.part = __part;
        } else {
            newArtifacts.part = artiConst.val.parts[Math.floor((Math.random() * artiConst.val.parts.length))];
        }
        // 自选或随机主属性
        if (typeof (__main) == "string" && artiConst.val.mainEntryList.indexOf(__main) != -1 && this.mainEntryVerify(newArtifacts.part, __main)) {
            newArtifacts.mainEntry = __main;
        } else {
            newArtifacts.mainEntry = this.randomMainEntry(newArtifacts.part);
        }
        // 主属性数值
        newArtifacts.mainEntryValue = artiConst.val.mainEntryValueList[newArtifacts.mainEntry][0];
        // 临时词条库（排除已有词条）
        for (let i = 0; i < artiConst.val.entryList.length; i++) {
            artiConst.val.entryList[i] == newArtifacts.mainEntry ? null : (ArtifactEntry.push(artiConst.val.entryList[i]), ArtifactEntryRate.push(artiConst.val.entryProbability[i]));
        }
        // 自选副词条
        if (__entry.length <= 4 && this.entryVerify(newArtifacts.mainEntry, __entry)) {
            for (let i = 0; i < __entry.length; i++) {
                let cusEntry = __entry[i],
                    cusEntryRate = __entryRate[i],
                    index = ArtifactEntry.indexOf(cusEntry);
                // 从临时词条库中移除已有词条，避免重复
                ArtifactEntry.splice(index, 1);
                ArtifactEntryRate.splice(index, 1);
                // 判断自选副词条数值是否合规
                if (__entryRate.length == 0 || typeof (cusEntryRate) != "number" || artiConst.val.entryValue[cusEntry].indexOf(cusEntryRate) == -1) {
                    cusEntryRate = this.randomEntryValue(__entry);
                }
                newArtifacts.entry.push([cusEntry, cusEntryRate]);
            }
        }
        // 随机词条/+若自选词条数量不到3条则补至3条
        while (newArtifacts.entry.length < 3) {
            //临时词条库
            let newEntry = this.randomRate(ArtifactEntry, ArtifactEntryRate),
                newEntryRate = this.randomEntryValue(newEntry),
                index = ArtifactEntry.indexOf(newEntry);
            // 从临时词条库中移除已有词条，避免重复
            ArtifactEntry.splice(index, 1);
            ArtifactEntryRate.splice(index, 1);
            newArtifacts.entry.push([newEntry, newEntryRate]);
        }
        // 是否拥有初始四词条
        if (__entry.length == 0 && Math.random() < artiConst.val.extraEnrtyRate) {
            let newEntry = this.randomRate(ArtifactEntry, ArtifactEntryRate);
            newArtifacts.entry[3] = [newEntry, this.randomEntryValue(newEntry)];
        }
        // 保存初始状态
        newArtifacts.initEntry = JSON.stringify(newArtifacts.entry);
        // 保存结果
        this.__result__.push(newArtifacts);
        this.count++;
        // console.log(newArtifacts);
        return newArtifacts;
    }

    /**
     * 升级强化
     * @param {Number} __index 序号
     * @param {String} __entry 指定强化的词条（默认空值）
     * @param {Number} __upLevel 强化数值的级别(0-3，3最高)
     * @returns 升级结果
     */
    upgrade(__index, __entry = "", __upLevel = -1) {
        if (__index >= this.__result__.length || __index < 0) return false;
        let currentArtifact = this.__result__[__index],
            currentEntry = [],
            currentEntryList = [],
            currentEntryRate = [];
        // 判断圣遗物是否满级
        if (currentArtifact.level >= 20) {
            // console.log("Upgrade failed,this Artifact is fully rated.");
            return false;
        };
        // 是否需要补充词条
        if (currentArtifact.entry.length < 4) {
            for (let i = 0; i < currentArtifact.entry.length; i++) {
                currentEntry.push(currentArtifact.entry[i][0]);
            }
            // 挑选可用词条（避免与其余词条重复）
            for (let i = 0; i < artiConst.val.entryList.length; i++) {
                if (currentEntry.indexOf(artiConst.val.entryList[i]) < 0) {
                    currentEntryList.push(artiConst.val.entryList[i]);
                    currentEntryRate.push(artiConst.val.entryProbability[i]);
                }
            }
            let addEntry = this.randomRate(currentEntryList, currentEntryRate),
                addRate = this.randomEntryValue(addEntry);
            currentArtifact.entry.push([addEntry, addRate]);
            currentArtifact.upgradeHistory.push([addEntry, addRate]);
            // console.log("Upgrade success,new entry is " + addEntry + " + " + addRate);
        } else {
            let upIndex = 0,
                upEntry = "",
                upRate = 0;
            // 优先升级自选词条
            if (__entry != "" && artiConst.val.entryList.indexOf(__entry) >= 0) {
                for (let i = 0; i < currentArtifact.entry.length; i++) {
                    if (__entry == currentArtifact.entry[i][0]) {
                        upIndex = i;
                        upEntry = currentArtifact.entry[i][0];
                    }
                }
            } else {
                // 升级随机词条
                upIndex = Math.floor(Math.random() * currentArtifact.entry.length);
                upEntry = currentArtifact.entry[upIndex][0];
            }
            if (__upLevel != -1 && typeof (__upLevel) == "number" && Math.floor(__upLevel) < artiConst.val.entryValue[upEntry].length) {
                upRate = artiConst.val.entryValue[upEntry][Math.floor(__upLevel)];
            } else {
                upRate = this.randomEntryValue(upEntry);
            }
            // console.log("Upgrade success," + upEntry + " + " + upRate);
            currentArtifact.entry[upIndex][1] += upRate;
            currentArtifact.upgradeHistory.push([upEntry, upRate]);
        }
        // 增加等级
        currentArtifact.level += 4;
        // 增加主属性
        currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][currentArtifact.level / 4];
        return true;
    }

    /**
     * 圣遗物得分计算
     * @param {*} __index 需要计算的圣遗物序号 
     * @param {String/Array} __rule 计算规则，可以为字符串和数组
     * @returns 得分
     */
    ArtifactScore(__index, __rule = "default") {
        if (__index >= this.__result__.length || __index < 0) {
            return 0;
        }
        // 计分标准（待完善）
        let scoreStandar = {
            critRate: 2,
            critDMG: 1,
            ATK: 0.13,
            ATKPer: 1.345,
            def: 0.11,
            defPer: 1.07,
            HP: 0.0087,
            HPPer: 1.345,
            energyRecharge: 1.2,
            elementMastery: 0.339
        }
        let atkScore = 0,
            critScore = 0,
            defScore = 0,
            HPScore = 0,
            rechargeScore = 0,
            EMScore = 0,
            totalScore = 0,
            entryArr = this.__result__[__index].entry;
        for (let i = 0; i < entryArr.length; i++) {
            let entryNow = entryArr[i][0],
                addScore = entryArr[i][1] * scoreStandar[entryNow];
            if (entryNow == "ATK" || entryNow == "ATKPer") {
                atkScore += addScore;
            } else if (entryNow == "critRate" || entryNow == "critDMG") {
                critScore += addScore;
            } else if (entryNow == "def" || entryNow == "defPer") {
                defScore += addScore;
            } else if (entryNow == "HP" || entryNow == "HPPer") {
                HPScore += addScore;
            } else if (entryNow == "energyRecharge") {
                rechargeScore += addScore;
            } else if (entryNow == "elementMastery") {
                EMScore += addScore;
            }
        }
        if (Array.isArray(__rule)) {
            for (let i = 0; i < __rule.length; i++) {
                switch (__rule[i]) {
                    case "atk":
                        totalScore += atkScore;
                        break;
                    case "crit":
                        totalScore += critScore;
                        break;
                    case "def":
                        totalScore += defScore;
                        break;
                    case "hp":
                        totalScore += HPScore;
                        break;
                    case "er":
                        totalScore += rechargeScore;
                        break;
                    case "em":
                        totalScore += EMScore;
                        break;
                    default:
                        totalScore += 0;
                        break;
                }
            }
        } else {
            __rule = __rule.toLowerCase();
            switch (__rule) {
                case "default":
                    return atkScore + critScore;
                case "atk":
                    return atkScore;
                case "crit":
                    return critScore;
                case "def":
                    return defScore;
                case "hp":
                    return HPScore;
                case "er":
                    return rechargeScore;
                case "em":
                    return EMScore;
            }
        }
        return totalScore;
        // return {"atkScore":atkScore,"critScore":critScore,"defScore":defScore,"HPScore":HPScore,"rechargeScore":rechargeScore,"EMScore":EMScore};
    }

    /**
     * 圣遗物重置初始状态
     * @param {Number} __index 序号
     */
    reset(__index) {
        let currentArtifact = this.__result__[__index];
        currentArtifact.entry.length = 0;
        currentArtifact.entry = JSON.parse(currentArtifact.initEntry);
        currentArtifact.upgradeHistory.length = 0;
        currentArtifact.level = 0;
        currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][0];
    }

    /**
     * 重置全部圣遗物状态
     */
    resetAll() {
        for (let i = 0; i < this.__result__.length; i++) {
            this.reset(i);
        }
    }

    /**
     * 删除指定数据
     * @param {number} __del 要删除的遗物序号
     */
    deleteOne(__del) {
        this.deleteHistory.push(this.__result__.splice(__del, 1)[0]);
        this.count--;
    }

    /**
     * 批量删除指定数据
     * @param {Array} __delArr 要删除的遗物序号（数组）
     */
    batchDelete(__delArr) {
        __delArr.sort((a, b) => a - b);
        for (let i = __delArr.length - 1; i >= 0; i--) {
            this.deleteHistory.push(this.__result__.splice(__delArr[i], 1)[0]);
        }
    }

    /**
     * 清空数据
     */
    clearAll() {
        // 备份原数据
        if (this.backup.length != 0) this.backup.length = 0;
        this.backup = JSON.parse(JSON.stringify(this.__result__));
        this.__result__.length = 0;
        this.count = 0;
    }

    /**
     * 撤销删除（对deleteOne删除的数据生效）
     * @returns 结果
     */
    undoDel() {
        if (this.deleteHistory.length == 0) {
            console.log("Undo false, history not found.");
            return false;
        }
        this.__result__.push(this.deleteHistory.pop());
        return true;
    }

    /** 其他函数 **/
    
    /**
     * 词条汉化-可调用
     * @param {String} word 需要翻译成中文的词条
     * @param {String} type 词条的类型
     * @returns 翻译结果
     */
    toChinese(word, type) {
        if (type == "entry") {
            if (artiConst.val.entryList.indexOf(word) != -1) {
                return artiConst.val.entryListCh[artiConst.val.entryList.indexOf(word)].replace("%", "");
            }
            return false;
        } else if (type == "parts") {
            if (artiConst.val.parts.indexOf(word) != -1) {
                return artiConst.val.partsCh[artiConst.val.parts.indexOf(word)];
            }
            return false;
        } else if (type == "mainEntry") {
            if (artiConst.val.mainEntryList.indexOf(word) != -1) {
                return artiConst.val.mainEntryListCh[artiConst.val.mainEntryList.indexOf(word)];
            }
            return false;
        } else if (type == "score") {
            if (artiConst.val.scoreList.indexOf(word) != -1) {
                return artiConst.val.scoreListCh[artiConst.val.scoreList.indexOf(word)];
            }
            return false;
        }
        return false;
    }

    /**
     * 根据数组随机概率
     * @param {Array} __arr1  随机列表
     * @param {Array} __arr2  随机概率（对应arr1）
     */
    randomRate(__arr1, __arr2) {
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
     * 随机主词条
     * @param {String} __part 位置
     */
    randomMainEntry(__part) {
        switch (__part) {
            case "feather":
                return "ATK";
            case "flower":
                return "HP";
            case "hourglass":
                return this.randomRate(artiConst.val.hourglass, artiConst.val.hourglassRate);
            case "hat":
                return this.randomRate(artiConst.val.hat, artiConst.val.hatRate);
            case "cup":
                return this.randomRate(artiConst.val.cup, artiConst.val.cupRate);
            default:
                console.log("Error! -randomMainEntry-");
        }
    }

    /** 
     * 随机副词条数值
     * @param {String} __entry 词条名称
     */
    randomEntryValue(__entry) {
        return artiConst.val.entryValue[__entry][Math.floor(Math.random() * artiConst.val.entryValue[__entry].length)];
    }

    /**
     * 主词条合规验证
     * @param {String} __part 位置
     * @param {String} __main 主词条
     * @returns {Boolean} true/false
     */
    mainEntryVerify(__part, __main) {
        if (typeof (__part) != "string" || typeof (__main) != "string") return false;
        if (artiConst.val.parts.indexOf(__part) != -1 && artiConst.val.mainEntryList.indexOf(__main) != -1) {
            if (artiConst.val[__part].indexOf(__main) != -1) {
                return true;
            }
            return false;
        }
        return false;
    }

    /**
     * 自选副词条合规验证
     * @param {String} __mainEntry 主词条
     * @param {Array} __entryArr 副词条数组
     * @returns 
     */
    entryVerify(__mainEntry, __entryArr) {
        for (let i = 0; i < __entryArr.length; i++) {
            if (__mainEntry == __entryArr[i] || artiConst.val.entryList.indexOf(__entryArr[i]) == -1) {
                return false;
            }
        }
        return true;
    }

    /**
     * 数字千位分割（加逗号）
     * @param {Number | String} val 待转化的数字
     * @returns 转换结果（字符串）
     */
    toThousands(val) {
        return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }

    get result() {
        return this.__result__;
    }

    set result(val) {
        if (Array.isArray(val)) {
            this.__result__.length = 0;
            this.__result__ = val;
            console.log("Set new Artifacts list success.");
        }
    }
}

/** --------------------------------辅助函数-------------------------------- **/

/**
 * 模拟器版本检查
 * @returns 检查结果
 */
function versionCheck() {
    let storage = window.localStorage;
    if (!storage) {
        alert("浏览器不支持localstorage");
        return false;
    } else {
        if (storage.ArtifactsSimVersion == undefined) {
            storage.ArtifactsSimVersion = ArtifactsSimVersion;
            return true;
        } else if (storage.ArtifactsSimVersion != ArtifactsSimVersion) {
            alert("模拟器版本更新，如果遇到错误，请尝试清除浏览器缓存!");
            storage.ArtifactsSimVersion = ArtifactsSimVersion;
            return false;
        }
    }
    return true;
}
versionCheck();

/**
 * 格式化主词条数值（用于展示）
 * @param {String} mainEntry 主词条名称
 * @param {Number} value 主词条数值
 * @returns 展示用数值
 */
function fomatMainEntryValue(mainEntry = "", value = 0) {
    if (mainEntry == "ATK" || mainEntry == "HP" || mainEntry == "elementMastery") {
        value = ArtifactsSim.toThousands(value);
    } else {
        value = value.toFixed(1) + "%";
    }
    return value;
}

/**
 * 副词条展示优化
 * 将词条展示为 攻击力+5.8% 这样的形式
 * @param {String} entry 副词条名称
 * @param {Number} value 副词条数值
 * @returns 结果（字符串）
 */
function formatEntry(entry, value, language = "en") {
    // 带百分号的词条
    let percentEntry = ["critRate", "critDMG", "ATKPer", "defPer", "HPPer", "energyRecharge"],
        resEntry = entry,
        resValue = Number(value.toFixed(2));
    if (language == "ch") resEntry = toChinese(entry, "entry");
    if (percentEntry.indexOf(entry) != -1) {
        // resEntry = resEntry.replace("%", "");
        resValue += "%";
    }
    return resEntry + "+" + resValue;
}

const artiConst = new ArtifactConst();
const ArtifactsSim = new ArtifactsFunction_class();
console.log("%cArtifactsUpgradeSim is running.Learn more: https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js", "color:rgb(144,82,41)");