app.component("artifact-show",{
    data(){
        return {
            mainEntryShow: ["攻击力", "生命值", "暴击率", "元素充能效率", "治疗加成", "暴击伤害", "攻击力", "防御力", "生命值", "元素精通", "水元素伤害加成", "火元素伤害加成", "雷元素伤害加成", "岩元素伤害加成", "风元素伤害加成", "冰元素伤害加成", "物理伤害加成"]
        }
    },
    props:{
        showdetail: {
            type: Object,
            default: {
                level: 0,
                part: "none",
                mainEntry: "none",
                entry: [],
                initEntry: '',
                upgradeHistory: [],
                creationDate: Date.now()
            }
        }
    },
    template:`
    <div class="ArtifactShow">
        <div class="aTitle"> There is title. </div>
        <div class="titleLine"></div>
        <div class="aHead">
            {{ toChinese(showdetail.part,"parts") }}
            <div class="mainEntry"> {{ toChinese(showdetail.mainEntry,"mainEntry") }} </div>
            <div class="levelStar">
                <span v-for="i in 5" style="margin-right: 3px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFCC32" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                </span>
            </div>
        </div>
        <div class="blurLine"></div>
        <div class="aContent">
            <span class="badge">+{{ showdetail.level }}</span>
            <ul>
                <li v-for="entry in showdetail.entry">· {{ showEntryList(entry[0],entry[1]) }}</li>
            </ul>
        </div>
    </div>
    `,
    methods:{
        toChinese(word,type){
            if(type == "entry"){
                return entryListCh[entryList.indexOf(word)]
            }else if(type == "parts"){
                return partsCh[parts.indexOf(word)];
            }else if(type == "mainEntry"){
                return this.mainEntryShow[mainEntryList.indexOf(word)];
            }else if(type == "score"){
                return scoreListCH[scoreList.indexOf(word)];
            }
            return "";
        },
        showEntryList(entry,value){
            let percentEntry = ["critRate","critDMG","ATKPer","defPer","HPPer","energyRecharge"],
            resEntry = this.toChinese(entry,"entry"),
            resValue = Number(value.toFixed(2));
            if(percentEntry.indexOf(entry) != -1){
                resEntry = resEntry.replace("%","");
                resValue += "%";
            }
            return resEntry + "+" + resValue;
        }
    }
})

/* ArtifactShow.css */
// .ArtifactShow{
//     position: relative;
//     margin: 0 auto;
//     width: 300px;
//     height: 315px;
// }
// .ArtifactShow .aTitle{
//     height: 30px;
//     color: #fff;
//     line-height: 30px;
//     padding-left: 18px;
//     background-color: #BC6832;
// }
// .ArtifactShow .titleLine{
//     position: absolute;
//     z-index: 2;
//     top: 2px;
//     right: 2px;
//     bottom: 2px;
//     left: 2px;
//     width: 296px;
//     height: 26px;
//     border: solid 2px rgba(144,82,41,0.7);
// }
// .ArtifactShow .aHead{
//     position: relative;
//     color: #fff;
//     font-size: 0.9rem;
//     font-weight: bold;
//     height: 135px;
//     padding: 9px 18px;
//     background-image: linear-gradient(to bottom right,#6A5453,#E4AB52);
// }
// .ArtifactShow .aHead .mainEntry{
//     position: absolute;
//     top: 57px;
//     left: 18px;
//     color: rgb(191,173,166);
// }
// .ArtifactShow .aHead .levelStar{
//     position: absolute;
//     left: 18px;
//     bottom: 9px;
// }
// .ArtifactShow .blurLine{
//     position: absolute;
//     top: 161px;
//     height: 4px;
//     width: 100%;
//     background-color: #000;
//     opacity: 0.2;
// }
// .ArtifactShow .aContent{
//     height: 150px;
//     font-size: 0.9rem;
//     padding: 15px 18px;
//     background-color: #ECE5D8;
// }
// .ArtifactShow .aContent .badge{
//     font-size: 0.9rem;
//     padding: 3px 6px;
//     background-color: rgb(57,68,79) !important;
// }
// .ArtifactShow .aContent ul{
//     margin-top: 15px;
//     list-style-type: none;
//     padding: 0;
// }
// .ArtifactShow .aContent ul li{
//     font-weight: bold;
//     margin-bottom: 1px;
//     color: rgb(76,86,104);
// }