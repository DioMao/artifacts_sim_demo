app.component("artifact-show",{
    template:`
    <div class="ArtifactShow">
        <div class="aTitle"> {{ artifactName }} </div>
        <div class="titleLine"></div>
        <div class="aHead">
            {{ toChinese(showdetail.part,"parts") }}
            <div class="mainEntry"> {{ toChinese(showdetail.mainEntry,"mainEntry") }} </div>
            <div class="mainEntryValue">{{ mainEntryValue }}</div>
            <div class="aImg">
                <img :src="'img/A-'+showdetail.part+'.png'" :alt="showdetail.part">
            </div>
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
                <li v-for="entry in showdetail.entry">·{{ showEntryList(entry[0],entry[1]) }}</li>
            </ul>
        </div>
        <div class="aButtonBox">
            <button class="btn btn-genshin btn-sm float-start" @click="upgrade" :disable="showdetail.level>=20"> 强化 </button>
            <button class="btn btn-genshin btn-sm" @click="init" v-show="showdetail.level>0"> 重置 </button>
            <button class="btn btn-genshin btn-sm float-end del" @click="del"> 删除 </button>
        </div>
        <router-link :to="{path:'/artifact-'+index}" class="btn btn-genshin-dark mt-1 float-end">强化界面</router-link>
    </div>
    `,
    data(){
        return {
            name: {
                feather: "角斗士的归宿",
                flower: "角斗士的留恋",
                cup: "角斗士的酣醉",
                hourglass: "角斗士的希冀",
                hat: "角斗士的凯旋"
            }
        }
    },
    props:{
        showdetail: {
            type: Object,
            default: {
                level: 0,
                part: "none",
                mainEntry: "none",
                mainEntryValue: 0,
                entry: [],
                initEntry: '',
                upgradeHistory: [],
                creationDate: Date.now()
            }
        },
        index: {
            type: Number,
            default: -1
        }
    },
    computed:{
        artifactName(){
            return this.name[this.showdetail.part];
        },
        mainEntryValue(){
            return fomatMainEntryValue(this.showdetail.mainEntry, this.showdetail.mainEntryValue);
        }
    },
    methods:{
        upgrade(){
            this.$emit("upgrade",this.index);
        },
        init(){
            this.$emit("init",this.index);
        },
        del(){
            this.$emit("del",this.index);
        },
        toChinese(word,type){
            if(type == "entry"){
                return entryListCh[entryList.indexOf(word)]
            }else if(type == "parts"){
                return partsCh[parts.indexOf(word)];
            }else if(type == "mainEntry"){
                return mainEntryListCh[mainEntryList.indexOf(word)];
            }else if(type == "score"){
                return scoreListCH[scoreList.indexOf(word)];
            }
            return "";
        },
        showEntryList(entry,value){
            let percentEntry = ["critRate","critDMG","ATKPer","defPer","HPPer","energyRecharge"],
            resEntry = this.toChinese(entry,"entry"),
            resValue = value;
            if(percentEntry.indexOf(entry) != -1){
                resEntry = resEntry.replace("%","");
                resValue = resValue.toFixed(1) + "%";
            }else{
                resValue = resValue = value.toFixed(0);
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
// }
// .ArtifactShow .aTitle{
//     height: 30px;
//     color: #fff;
//     line-height: 33px;
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
//     font-size: 13px;
//     height: 135px;
//     padding: 9px 18px;
//     background-image: linear-gradient(to bottom right,#6A5453,#E4AB52);
// }
// .ArtifactShow .aHead .mainEntry{
//     position: absolute;
//     top: 55px;
//     left: 18px;
//     color: rgb(191,173,166);
// }
// .ArtifactShow .aHead .mainEntryValue{
//     position: absolute;
//     font-size: 24px;
//     top: 70px;
//     left: 18px;
// }
// .ArtifactShow .aHead .aImg{
//     position: absolute;
//     right: 18px;
//     top: 5px;
//     width: 125px;
//     height: 125px;
// }
// .ArtifactShow .aHead .aImg img{
//     width: inherit;
//     height: inherit;
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
//     font-size: 14px;
//     padding: 15px 18px;
//     background-color: #ECE5D8;
// }
// .ArtifactShow .aContent .badge{
//     font-weight: 400;
//     font-size: 14px;
//     padding: 2px 4px 1px;
//     background-color: rgb(57,68,79) !important;
// }
// .ArtifactShow .aContent ul{
//     margin-top: 10px;
//     list-style-type: none;
//     padding: 0;
// }
// .ArtifactShow .aContent ul li{
//     margin-bottom: 1px;
//     color: rgb(76,86,104);
// }
// .ArtifactShow .aButtonBox{
//     height: 40px;
//     background-color: #a87940;
//     text-align: center;
//     padding: 7px 30px;
//     overflow: hidden;
// }
// .ArtifactShow .aButtonBox button{
//     font-size: 15px;
//     line-height: 15px;
//     background-color: #dea752;
//     color: #303030;
//     width: 70px;
//     border-left: solid 1px rgb(243, 239, 225);
//     border-right: solid 1px rgb(243, 239, 225);
// }