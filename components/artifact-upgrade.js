app.component("artifact-upgrade",{
    template: `
    <div class="containerUp">
        <demo-alert :state="alertFunc.alertState" :show="alertFunc.alertShow">{{ alertFunc.alertMsg }}</demo-alert>
        <div class="starBox">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
        </div>
        <button @click="$router.go(-1)" class="btn btn-genshin btn-back">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16">
                <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
            </svg>
            返回
        </button>
        <div class="entryBox">
            <div class="mb-3">+{{ Artifact.level }}</div>
            <div class="mb-3" style="font-size: 1.2rem"> {{ toChinese(Artifact.mainEntry,"mainEntry") }} <span class="float-end"> {{ mainEntryValue(Artifact.mainEntry,Artifact.mainEntryValue) }} </span></div>
            <div v-for="entry in Artifact.entry">
                <div class="mb-1">{{ toChinese(entry[0],"entry") }} <span class="float-end">{{ showEntryList(entry[0],entry[1]) }}</span></div>
            </div>
        </div>
        <button @click="upgrade" class="btn btn-genshin upgrade-button-lg"><span class="circleinbox"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;强化&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
    </div>
    `,
    props: ["index"],
    data(){
        return {
            ArtifactsList: [],
            Artifact: {
                level: 0,
                part: "none",
                mainEntry: "none",
                mainEntryValue: 0,
                entry: [],
                initEntry: '',
                upgradeHistory: [],
                creationDate: Date.now()
            },
            upgradeLv: -1,
            upEntry: String,
            alertFunc: {
                alertShow: false,               // 是否显示提示框
                alertMsg: String,               // 提示框内容
                alertClose: Function,           // 定时关闭提示框
                alertState: "success"           // 提示框类型
            },
        }
    },
    mounted(){
        // 初始化时列表数据保持一致
        if(this.ArtifactsList.length == 0 && ArtifactsSim.result.length != 0){
            this.ArtifactsList = [...ArtifactsSim.result];
        }
        if(!window.localStorage){
            alert("浏览器不支持localstorage");
            return false;
        }else{
            if(localStorage.localRecord == undefined){
                localStorage.localRecord = [];
            }else if(localStorage.localRecord != '' && localStorage.localRecord != "[]" && this.ArtifactsList.length == 0){
                ArtifactsSim.result = JSON.parse(localStorage.getItem("localRecord"));
                this.ArtifactsList = JSON.parse(localStorage.getItem("localRecord"));
            }
        }
        // 验证圣遗物是否存在，否则跳转回列表（防止url直接访问出错）
        if(ArtifactsSim.result.length < (parseInt(this.index) + 1)){
            this.$router.replace("/");
        }else{
            this.Artifact = ArtifactsSim.result[this.index];
        }
    },
    methods: {
        // 升级圣遗物
        upgrade(){
            let res = ArtifactsSim.upgrade(this.index,this.upEntry,this.upgradeLv);
            this.ArtifactsList = [...ArtifactsSim.result];
            this.localRecord(this.ArtifactsList);
            this.Artifact = JSON.parse(JSON.stringify(ArtifactsSim.result[this.index]));
            if(res == true){
                this.alertControl("升级成功！",1500);
            }else{
                this.alertControl("当前圣遗物已满级~",1500,"warning");
            }
        },
        // 主词条展示优化
        mainEntryValue(mainEntry,val){
            return fomatMainEntryValue(mainEntry,val);
        },
        // 词条优化
        showEntryList(entry,value){
            let percentEntry = ["critRate","critDMG","ATKPer","defPer","HPPer","energyRecharge"],
            // resEntry = this.toChinese(entry,"entry"),
            resValue = value;
            if(percentEntry.indexOf(entry) != -1){
                // resEntry = resEntry.replace("%","");
                resValue = resValue.toFixed(1) + "%";
            }else{
                resValue = resValue = value.toFixed(0);
            }
            return resValue;
        },
        // 结果保存到localstorage
        localRecord(record){
            if(!window.localStorage){
                alert("浏览器不支持localstorage");
                return false;
            }else{
                localStorage.localRecord = JSON.stringify(record);
            }
        },
        toChinese(word,type){
            if(type == "entry"){
                return entryListCh[entryList.indexOf(word)].replace("%","");
            }else if(type == "parts"){
                return partsCh[parts.indexOf(word)];
            }else if(type == "mainEntry"){
                return mainEntryListCh[mainEntryList.indexOf(word)];
            }else if(type == "score"){
                return scoreListCH[scoreList.indexOf(word)];
            }
            return "";
        },
        // 提示框
        alertControl(msg,time = 2000,state = "success"){
            this.alertFunc.alertMsg = msg;
            this.alertFunc.alertState = state;
            this.alertFunc.alertShow = true;
            clearTimeout(this.alertFunc.alertClose);
            this.alertFunc.alertClose = setTimeout(() => {
                this.alertFunc.alertShow = false;
            },time)
        },
    }
})