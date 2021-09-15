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
        <router-link :to="{path:'/artifact-'+index}" class="btn btn-toupgrade"><span class="circleinbox"></span>强化界面</router-link>
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
            return ArtifactsSim.entryValFormat(this.showdetail.mainEntry, this.showdetail.mainEntryValue,"main")
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
            let resEntry = this.toChinese(entry,"entry"),
            resValue = ArtifactsSim.entryValFormat(entry,value);
            return resEntry + "+" + resValue;
        }
    }
})