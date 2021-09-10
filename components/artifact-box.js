app.component("artifact-box",{
    template: `
    <div class="main-container">
        <demo-alert :state="alertFunc.alertState" :show="alertFunc.alertShow">{{ alertFunc.alertMsg }}</demo-alert>
        <div class="selectBox d-flex">
            <select class="form-select" aria-label="Default select example" v-model="selected">
                <option selected value="default">显示全部</option>
                <option :value="part" v-for="part in parts">{{ toChinese(part,"parts") }}</option>
            </select>
        </div>
        <div class="container-fluid demo-container">
            <div v-for="(Artifacts,index) in ArtifactsList" :id="'artifact-'+index" :class="'ArtifactsBox card rounded '+ (index==showIndex?'shadow':'shadow-sm')" v-show="(selected=='default' || selected == Artifacts.part) && (userSetting.filterMain == 'default' || userSetting.filterMain == Artifacts.mainEntry)" @click="showIndex=index">
                <div class="card-body">
                    <div :class="'card-text fs-6 '+(ArtifactRate(index)>=userSetting.highScore?'highscore':'')">{{ toChinese(Artifacts.part,"parts") }}</div>
                    <div class="levelStar">
                        <span v-for="i in 5" style="margin-right: 2px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFCC32" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </span>
                    </div>
                    <div class="card-text" style="color:rgb(223,185,170);">{{ toChinese(Artifacts.mainEntry,"mainEntry") }} </div>
                    <div>{{ mainEntryValue(Artifacts.mainEntry,Artifacts.mainEntryValue) }} <span class="badge float-end fw-normal">+{{ Artifacts.level }}</span></div>
                    <a id="mobileShow" data-bs-toggle="offcanvas" href="#offcanArtifactShow" aria-controls="offcanArtifactShow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                        </svg>
                    </a>
                </div>
                <ul class="list-group list-group-flush" v-show="!userSetting.listBriefMode">
                    <li v-for="(entry,index2) in Artifacts.entry" class="list-group-item" @click="ArtifactUpgrade(index,entry[0])">{{ formatEntry(entry[0],entry[1]) }}
                        <span class="badge bg-primary upgradeCheat" v-show="Artifacts.level<20">+</span>
                    </li>
                    <li class="list-group-item" v-if="Artifacts.entry.length == 3">——</li>
                </ul>
                <div class="card-body" style="text-align:center;" v-show="!userSetting.listBriefMode">
                    <button id="upgrade" @click="ArtifactUpgrade(index)" class="btn btn-sm float-start" :disabled="Artifacts.level >= 20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#257ad7" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                        </svg>
                    </button>
                    <button id="initArtifact" @click="initArtifact(index)" :class="'btn btn-sm ' + (Artifacts.level==0?'hide':'')" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#037728" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                        </svg>
                    </button>
                    <button id="deleteArtifact" @click.stop="deleteArtifact(index)" class="btn btn-sm float-end">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c90000" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="ArtifactShowBox">
            <artifact-show @upgrade="ArtifactUpgrade" @init="initArtifact" @del="deleteArtifact" :showdetail="showDetail" :index="showIndex" v-if="showIndex>=0"></artifact-show>
            <div v-show="showIndex>=0">
                <div id="radarChartBox" ref="radarChartBox"></div>
            </div>
            <div style="margin: 0 15px;" v-show="showIndex>=0">副词条评分(beta)：{{ ArtifactScore }} 
                <button id="score" class="btn btn-genshin-dark btn-sm" data-bs-toggle="modal" data-bs-target="#scoreSet">评分标准</button>
            </div>
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanArtifactShow" aria-labelledby="offcanArtifactShow">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title">圣遗物详情</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <artifact-show @upgrade="ArtifactUpgrade" @init="initArtifact" @del="deleteArtifact" :showdetail="showDetail" :index="showIndex" v-if="showIndex>=0"></artifact-show>
                </div>
                <div class="mt-3" v-show="showIndex>=0">副词条评分(beta)：{{ ArtifactScore }} 
                    <button id="score-2" class="btn btn-genshin-dark btn-sm" data-bs-toggle="modal" data-bs-target="#scoreSet">评分标准</button>
                </div>
                <div v-show="showIndex>=0" class="mt-3">
                    <div id="radarChartBox2" ref="radarChartBox2"></div>
                </div>
                <button type="button" class="btn btn-genshin-dark mt-3" data-bs-dismiss="offcanvas" aria-label="Close" style="float: right;"><span class="xinbox"></span>关闭详情</button>
            </div>
        </div>   
        <footer>
            <div class="gap-2 d-md-flex justify-content-end buttonBox clearfix">
                <button id="filter" class="btn me-auto" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                    </svg>
                </button>
                <ul class="dropdown-menu filterList" aria-labelledby="filter">
                    <li><a class="dropdown-item" href="#" @click="mainEntryfilter('default')" :style="{background:(userSetting.filterMain=='default'?'rgb(85,92,107)':'inherit')}">默认</a></li>
                    <li v-for="mainEntryF in mainEntryList"><a class="dropdown-item" href="#" @click="mainEntryfilter(mainEntryF)" :style="{background:(userSetting.filterMain==mainEntryF?'#596379':'inherit')}">{{ (mainEntryF=="ATK" || mainEntryF == "HP")?"固定":"" }}{{ toChinese(mainEntryF,"mainEntry") }}</a></li>
                </ul>
                <button id="start" @click="start" class="btn btn-genshin"><span class="circleinbox"></span>随机</button>
                <button class="btn btn-genshin" data-bs-toggle="modal" data-bs-target="#cusArtifact"><span class="squareinbox"></span>自选</button>
                
                <div class="dropdown" style="display:inline-block;">
                    <a class="btn btn-genshin dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      更多
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li>
                            <a class="dropdown-item" href="#" @click="undoDel">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                                撤销删除
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click="resetAll">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                                全部重置
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click="ArtifactClear">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                                清空列表
                            </a>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#userSet">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                </svg>
                                设置
                            </a>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#about">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                </svg>
                                关于
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer> 
        <div class="modal fade" id="cusArtifact" tabindex="-1" data-bs-backdrop="static" aria-labelledby="cusArtifactLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cusArtifactLabel">自选圣遗物</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="cutArtifactPart" class="form-label">位置</label>
                        <select id="cutArtifactPart" class="form-select form-select-sm mb-3" v-model="cusPart" @change="cusEntry.length=0;cusMainEntry=''">
                            <option v-for="part in parts" :value="part">{{ toChinese(part,"parts") }}</option>
                        </select>
                        <label class="form-label" v-show="cusPart!='default'&&cusPart!=''">主属性</label>
                        <select class="form-select form-select-sm mb-3" v-if="cusPart!='default'&&cusPart!=''" v-model="cusMainEntry" @change="cusEntry.length=0">
                            <option v-for="partModal in cusEntryList[cusPart]" :value="partModal">{{ toChinese(partModal,"mainEntry") }}</option>
                        </select>
                        <label class="form-label" v-show="cusPart!='default'&&cusMainEntry!=''">副词条选择</label>
                        <div class="d-flex justify-content-between flex-wrap">
                            <div class="form-check mb-2" style="width:40%;" v-for="entry in entryList" v-show="cusPart!='default'&&cusMainEntry!=''&&cusMainEntry!=entry">
                                <input class="form-check-input" v-model="cusEntry" type="checkbox" :value="entry" :id="entry+'Check'" :disabled="cusEntry.length==4&&cusEntry.indexOf(entry)==-1">
                                <label class="form-check-label" :for="entry+'Check'">
                                {{ toChinese(entry,"entry") }}
                                </label>
                                <select class="form-select form-select-sm mt-1 mb-1 col-md-6 ms-auto" v-model="cusEntryRate[entry]" :disabled="cusEntry.length==4&&cusEntry.indexOf(entry)==-1">
                                    <option v-for="entryValueModal in entryValue[entry]" :value="entryValueModal">{{ (entry=="ATK"||entry=="def"||entry=="HP"||entry=="elementMastery")?entryValueModal.toFixed(0):entryValueModal.toFixed(1) }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="form-check form-switch me-auto">
                            <input class="form-check-input" type="checkbox" id="cusCloseSwitch" v-model="cusCloseSwitch" checked>
                            <label class="form-check-label" for="cusCloseSwitch">确认后关闭</label>
                        </div>
                        <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span class="xinbox"></span>关闭</button>
                        <button type="button" class="btn btn-genshin-dark" @click="cusCreatArtifact" :data-bs-dismiss="cusCloseSwitch?'modal':null"><span class="circleinbox"></span>确认</button>
                    </div>
                </div>
            </div>
        </div>        
        <div class="modal fade" id="userSet" tabindex="-1" data-bs-backdrop="static" aria-labelledby="userSetting" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userSetting">设置</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-check form-switch mt-3">
                            <input class="form-check-input" type="checkbox" id="listModeRadio" v-model="userSetting['listBriefMode']">
                            <label class="form-check-label" for="listModeRadio">使用简洁列表</label>
                        </div>
                        <button type="button" class="btn btn-genshin-dark btn-sm mt-3" @click="clearStorge">清除本地数据</button>
                        <br>
                        <button type="button" class="btn btn-genshin-dark btn-sm mt-3" @click="resetSetting">恢复默认设置（含评分设置）</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span class="circleinbox"></span>确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="scoreSet" tabindex="-1" aria-labelledby="scoreSetting" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="scoreSetting">评分标准选择</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <input class="form-check-input" type="radio" name="scoreMode" id="scoreMode1" value="string" v-model="userSetting.scoreConfig.mode">
                            <label class="form-check-label me-5" for="scoreMode1">
                                预设模式
                            </label>
                            <input class="form-check-input" type="radio" name="scoreMode" id="scoreMode2" value="array" v-model="userSetting.scoreConfig.mode">
                            <label class="form-check-label" for="scoreMode2">
                                自选模式
                            </label>
                        </div>
                        <div v-show="userSetting.scoreConfig.mode=='string'">
                            <select class="form-select form-select-sm" name="scoreString" id="scoreString" v-model="userSetting.scoreConfig.strRule">
                                <option value="default">默认</option>
                                <option v-for="config in scoreList" :value="config">{{ toChinese(config,"score") }}</option>
                            </select>
                        </div>
                        <div class="justify-content-between flex-wrap" style="display:flex;" v-show="userSetting.scoreConfig.mode=='array'">
                            <div class="form-check" style="width:40%;" v-for="config in scoreList">
                                <input class="form-check-input" type="checkbox" :value="config" :id="'score-'+config" v-model="userSetting.scoreConfig.arrRule">
                                <label class="form-check-label" :for="'score-'+config">
                                    {{ toChinese(config,"score") }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="about" tabindex="-1" aria-labelledby="about" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="about">关于模拟器</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>Version: {{version}} </div>
                        <div>Author: <a href="https://github.com/DioMao" target="_blank">DioMao</a></div>
                        <div>Frameworks: <br>Vue-v3.2.4 <br>vue-router-v4.0.11 <br>Bootstrap-v5.1.0 <br>Echarts-v5.1.2</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span class="circleinbox"></span>确认</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    `,
    data() {
        return {
            showIndex: -1,                  // 右侧圣遗物展示序号
            showDetail: Object,             // 右侧圣遗物展示详情
            ArtifactsList: [],           // 圣遗物列表
            parts: Array,                   // 圣遗物位置*自选
            mainEntryList: Array,           // 圣遗物主词条列表
            entryList: Array,               // 副词条列表
            selected: "default",            // 根据位置筛选结果
            cusCloseSwitch: true,           // 自选圣遗物-生成后是否关闭modal窗
            cusPart: "",                    // 自选圣遗物位置
            cusMainEntry: "",               // 自选圣遗物主词条
            cusEntry: [],                   // 自选圣遗物副词条
            cusEntryRate: Object,           // 自选圣遗物副词条数值
            cusEntryList: Object,           // 自选圣遗物副词对照表
            entryValue: Object,             // 自选圣遗物副词数值对照表
            scoreList: Array,               // 圣遗物得分选项表
            defaultSetting: {               // 默认设置
                scoreConfig:{               // 圣遗物得分设置
                    mode: "string",
                    strRule: "default",
                    arrRule: [],
                },
                highScore: 35,              // 高分圣遗物标准
                listBriefMode: true,        // 圣遗物列表模式（details/brief）
                filterMain: "default"       // 主词条筛选
            },
            userSetting: {                  // 用户设置
                scoreConfig:{
                    mode: "string",
                    strRule: "default",
                    arrRule: [],
                },
                highScore: 35,
                listBriefMode: true,
                filterMain: "default"
            },
            alertFunc: {
                alertShow: false,           // 是否显示提示框
                alertMsg: String,           // 提示框内容
                alertClose: Function,       // 定时关闭提示框
                alertState: "success"       // 提示框类型
            },
            radarChartOption: Object,       // 雷达图配置
            version: String                 // 版本信息
        }
    },
    created(){
        this.parts = artiConst.val.parts;
        this.mainEntryList = artiConst.val.mainEntryList;
        this.entryList = artiConst.val.entryList;
        this.cusEntryList = {
            feather: artiConst.val.feather,
            flower: artiConst.val.flower,
            hourglass: artiConst.val.hourglass,
            hat: artiConst.val.hat,
            cup: artiConst.val.cup
        };
        this.entryValue = artiConst.val.entryValue;
        this.scoreList = artiConst.val.scoreList;
        this.version = ArtifactsSimVersion;
        // 初始化自选副词条为最大值
        for(let i in artiConst.val.entryValue){
            this.cusEntryRate[i] = artiConst.val.entryValue[i][artiConst.val.entryValue[i].length-1];
        }
    },
    mounted(){
        var that = this;
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
            };
            if(localStorage.userSetting == undefined){
                localStorage.userSetting = JSON.stringify(this.defaultSetting);
                this.userSetting = JSON.parse(JSON.stringify(this.defaultSetting));
            }else if(localStorage.userSetting != ''){
                let settingObj = JSON.parse(localStorage.getItem("userSetting"));
                this.userSetting = JSON.parse(JSON.stringify(this.defaultSetting));
                for(let key in settingObj){
                    this.userSetting[key] = settingObj[key];
                }
            };
        }
    },
    computed:{
        ArtifactScore(){
            let mode = this.userSetting.scoreConfig.mode,
            index = this.showIndex,
            artifact = this.ArtifactsList[index];       // 监听当前圣遗物数据，更新评分视图用
            if(mode == "string"){
                return ArtifactsSim.ArtifactScore(index,this.userSetting.scoreConfig.strRule).toFixed(2);
            }else if(mode == "array"){
                return ArtifactsSim.ArtifactScore(index,this.userSetting.scoreConfig.arrRule).toFixed(2);
            }else{
                return 0;
            } 
        }
    },
    watch:{
        selected(val){
            if(this.showIndex < 0) return false;
            if(val != "default" && this.ArtifactsList[this.showIndex].part != val){
                this.showIndex = -1;
            }
        },
        showIndex(val){
            this.setRadarChart();
            if(this.showIndex >= 0) this.showDetail = JSON.parse(JSON.stringify(this.ArtifactsList[this.showIndex]));
        },
        ArtifactsList(val){
            this.setRadarChart();
            if(this.showIndex >= 0) this.showDetail = JSON.parse(JSON.stringify(this.ArtifactsList[this.showIndex]));
        },
        userSetting: {
            handler(val){
                this.changeSetting()
            },
            deep: true
        }
    },
    methods:{
        start(){
            ArtifactsSim.creatArtifact();
            this.ArtifactsList = [...ArtifactsSim.result];
            this.localRecord(this.ArtifactsList);
            this.alertControl("随机圣遗物已生成！",1500);
        },
        // 自选圣遗物
        cusCreatArtifact(){
            let cusEntryValue = [],
            cusEntry = [];
            for(let i= 0; i < this.cusEntry.length; i++){
                cusEntry.push(this.cusEntry[i]);
                cusEntryValue.push(this.cusEntryRate[cusEntry[i]]);
            }
            ArtifactsSim.creatArtifact(this.cusPart,this.cusMainEntry,cusEntry,cusEntryValue);
            this.ArtifactsList = [...ArtifactsSim.result];
            this.localRecord(this.ArtifactsList);
            this.alertControl("自选圣遗物已生成！",1500);
        },
        // 圣遗物升级
        ArtifactUpgrade(index,entry=""){
            let res = ArtifactsSim.upgrade(index,entry);
            this.ArtifactsList = [...ArtifactsSim.result];
            this.localRecord(this.ArtifactsList);
            if(res == true){
                this.alertControl("升级成功！",1500);
            }else{
                this.alertControl("当前圣遗物已满级~",1500,"warning");
            }
        },
        // 圣遗物评分
        ArtifactRate(index){
            let mode = this.userSetting.scoreConfig.mode;
            if(mode == "string"){
                return ArtifactsSim.ArtifactScore(index,this.userSetting.scoreConfig.strRule);
            }else if(mode == "array"){
                return ArtifactsSim.ArtifactScore(index,this.userSetting.scoreConfig.arrRule);
            }else{
                return 0;
            }
        },
        // 初始化圣遗物
        initArtifact(index){
            ArtifactsSim.reset(index);
            this.ArtifactsList = [...ArtifactsSim.result];
            this.localRecord(this.ArtifactsList);
            this.alertControl("重置圣遗物成功~再试试手气吧",1500);
        },
        // 清除结果列表
        ArtifactClear(){
            if(this.ArtifactsList.length == 0){
                this.alertControl("当前列表已经空了哦！",1500,"warning");
            }else if(confirm("确认要清空圣遗物吗？\n请注意，此操作不可恢复！")){
                this.showIndex = -1;
                ArtifactsSim.clearAll();
                this.ArtifactsList = [...ArtifactsSim.result];
                this.localRecord(this.ArtifactsList);
            }
        },
        // 删除圣遗物
        deleteArtifact(index){
            this.showIndex = -1;
            ArtifactsSim.deleteOne(index);
            this.ArtifactsList = [...ArtifactsSim.result];
            this.localRecord(this.ArtifactsList);
            this.alertControl("删除圣遗物成功！",1500);
        },
        // 撤销删除
        undoDel(){
            let res = ArtifactsSim.undoDel();
            this.ArtifactsList = [...ArtifactsSim.result];
            this.localRecord(this.ArtifactsList);
            if(res == true){
                this.alertControl("撤销删除成功！",1500);
            }else{
                this.alertControl("没有可以撤销的数据！",1500,"primary");
            }
        },
        // 初始化全部圣遗物
        resetAll(){
            ArtifactsSim.resetAll();
            this.ArtifactsList = [...ArtifactsSim.result];
            this.localRecord(this.ArtifactsList);
            this.alertControl("已重置全部圣遗物~",1500);
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
        // 保存设置
        changeSetting(){
            if(!window.localStorage){
                alert("浏览器不支持localstorage");
                return false;
            }else{
                localStorage.userSetting = JSON.stringify(this.userSetting);
            }
        },
        // 清除本地数据
        clearStorge(){
            if(confirm("确定要清除模拟器所有数据吗？\n执行此操作会刷新页面。")){
                localStorage.clear();
                this.ArtifactsList.length = 0;
                ArtifactsSim.result.length = 0;
                location.reload();
            }
        },
        // 恢复默认设置
        resetSetting(){
            let strSetting = JSON.stringify(this.defaultSetting);
            localStorage.removeItem("userSetting");
            localStorage.userSetting = strSetting;
            this.userSetting = JSON.parse(strSetting);
            this.alertControl("设置重置成功！",1500);
        },
        // 雷达图设置
        setRadarChart(){
            if(this.showIndex < 0) return false;
            let opArr = this.ArtifactsList[this.showIndex].entry,
            opObj = {};
            for(let i = 0; i < opArr.length; i++){
                opObj[opArr[i][0]] = opArr[i][1];
            }
            let radarChart = echarts.init(this.$refs.radarChartBox);
            let radarChart2 = echarts.init(this.$refs.radarChartBox2);
            this.radarChartOption = {
                textStyle: {
                    fontFamily: "genshin-font"
                },
                radar: {
                    splitNumber: 7,
                    indicator: [
                        { name: '攻击力', max: this.entryValue['ATKPer'][this.entryValue['ATKPer'].length-1]*6, min: -5.8, color: "#262626"},
                        { name: '暴击', max: this.entryValue['critRate'][this.entryValue['critRate'].length-1]*6, min: -3.9, color: "#262626"},
                        { name: '暴伤' , max: this.entryValue['critDMG'][this.entryValue['critDMG'].length-1]*6, min: -7.8, color: "#262626"},
                        { name: '充能效率', max: this.entryValue['energyRecharge'][this.entryValue['energyRecharge'].length-1]*6, min: -6.5, color: "#262626"},
                        { name: '元素精通', max: this.entryValue['elementMastery'][this.entryValue['elementMastery'].length-1]*6, min: -23, color: "#262626"},
                        { name: '生命值', max: this.entryValue['HPPer'][this.entryValue['HPPer'].length-1]*6, min: -5.8, color: "#262626"},
                        { name: '防御力', max: this.entryValue['defPer'][this.entryValue['defPer'].length-1]*6, min: -7.3, color: "#262626"}
                    ]
                },
                series: [{
                    name: "ArtifactRadar",
                    type: "radar",
                    areaStyle: {},
                    data: [{
                        value: [opObj["ATKPer"] || 0, opObj["critRate"] || 0, opObj["critDMG"] || 0, opObj["energyRecharge"] || 0,  opObj["elementMastery"] || 0, opObj["HPPer"] || 0, opObj["defPer"] || 0],
                    }]
                }]
            }
            this.radarChartOption && radarChart.setOption(this.radarChartOption);
            this.radarChartOption && radarChart2.setOption(this.radarChartOption);
        },
        // 操作提示-提示框
        // state值： success/primary/warning/danger
        alertControl(msg,time = 2000,state = "success"){
            this.alertFunc.alertMsg = msg;
            this.alertFunc.alertState = state;
            this.alertFunc.alertShow = true;
            clearTimeout(this.alertFunc.alertClose);
            this.alertFunc.alertClose = setTimeout(() => {
                this.alertFunc.alertShow = false;
            },time)
        },
        // 主词条属性
        mainEntryValue(mainEntry,val){
            return fomatMainEntryValue(mainEntry,val);
        },
        // 
        mainEntryfilter(val){
            this.userSetting.filterMain = val;
        },
        // 转换为中文
        toChinese(word,type){
            return ArtifactsSim.toChinese(word,type);
        },
        // 展示界面副词条文字处理
        formatEntry(entry,value){
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