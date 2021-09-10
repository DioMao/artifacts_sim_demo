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
                <img src="img/genshin-symbol.png" alt="genshin-symbol">
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
        <router-link :to="{path:'/artifact-'+index}" class="btn btn-genshin-dark mt-1 float-end"><span class="circleinbox"></span>强化界面</router-link>
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
            return ArtifactsSim.toChinese(word,type);
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
//     width: 18.75rem;
//     overflow: hidden;
// }
// .ArtifactShow .aTitle{
//     height: 1.875rem;
//     color: #fff;
//     line-height: 2.0625rem;
//     padding-left: 1.125rem;
//     background-color: #BC6832;
// }
// .ArtifactShow .titleLine{
//     position: absolute;
//     z-index: 2;
//     top: .125rem;
//     right: .125rem;
//     bottom: .125rem;
//     left: .125rem;
//     width: 18.5rem;
//     height: 1.625rem;
//     border: solid .125rem rgba(144,82,41,0.7);
// }
// .ArtifactShow .aHead{
//     position: relative;
//     color: #fff;
//     font-size: .8125rem;
//     height: 8.4375rem;
//     padding: .5625rem 1.125rem;
//     background-image: linear-gradient(to bottom right,#6A5453,#E4AB52);
// }
// .ArtifactShow .aHead .mainEntry{
//     position: absolute;
//     top: 3.4375rem;
//     left: 1.125rem;
//     color: rgb(191,173,166);
// }
// .ArtifactShow .aHead .mainEntryValue{
//     position: absolute;
//     font-size: 1.5rem;
//     top: 4.375rem;
//     left: 1.125rem;
// }
// .ArtifactShow .aHead .aImg{
//     position: absolute;
//     right: 1.125rem;
//     top: .3125rem;
//     width: 7.8125rem;
//     height: 7.8125rem;
// }
// .ArtifactShow .aHead .aImg img{
//     width: inherit;
//     height: inherit;
// }
// .ArtifactShow .aHead .levelStar{
//     position: absolute;
//     left: 1.125rem;
//     bottom: .5625rem;
// }
// .ArtifactShow .blurLine{
//     position: absolute;
//     top: 10.0625rem;
//     height: .25rem;
//     width: 100%;
//     background-color: #000;
//     opacity: 0.2;
// }
// .ArtifactShow .aContent{
//     height: 9.375rem;
//     font-size: .875rem;
//     padding: .9375rem 1.125rem;
//     background-color: #ECE5D8;
// }
// .ArtifactShow .aContent .badge{
//     font-weight: 400;
//     font-size: .875rem;
//     padding: .125rem .25rem .0625rem;
//     background-color: rgb(57,68,79) !important;
// }
// .ArtifactShow .aContent ul{
//     margin-top: .625rem;
//     list-style-type: none;
//     padding: 0;
// }
// .ArtifactShow .aContent ul li{
//     margin-bottom: .0625rem;
//     color: rgb(76,86,104);
// }
// .ArtifactShow .aButtonBox{
//     height: 2.5rem;
//     background-color: #a87940;
//     text-align: center;
//     padding: .4375rem 1.875rem;
//     overflow: hidden;
// }
// .ArtifactShow .aButtonBox button{
//     font-size: .9375rem;
//     line-height: .9375rem;
//     background-color: #dea752;
//     color: #303030;
//     width: 4.375rem;
//     border-left: solid .0625rem rgb(243, 239, 225);
//     border-right: solid .0625rem rgb(243, 239, 225);
// }