/*
 * 核心数据处理方法
 * Author:Richieliu
 * QQ:76373
 * Website:http://www.iamued.com
 */
/*
 * 工具方法
 * 数组排重，不支持对象
 * @param {Object} array
 */
function uniq(array){
    var map = {};
    var re = [];
    for (var i = 0, l = array.length; i < l; i++) {
        if (typeof map[array[i]] == "undefined") {
            map[array[i]] = 1;
            re.push(array[i]);
        }
    }
    return re;
}

/*
 * 初始化数据 提取地区和项目数据
 * @param {Object} sdata
 */
function initdata(sdata, inittype){
    var newSdata = {};
    for (var i = 0; i < sdata.length; i++) {
        //console.log(sdata[i].sname);
        var stype, svalue;
        if (inittype == "area") {
            stype = sdata[i].sarea;
            svalue = sdata[i].scate;
        }
        else 
            if (inittype == "cate") {
                stype = sdata[i].scate;
                svalue = sdata[i].sarea;
            }
        var map = {};
        if (newSdata[stype] == undefined) {
            newSdata[stype] = [];
            newSdata[stype]["value"] = [];
            newSdata[stype]["value"].push(svalue);
        }
        else {
        
            newSdata[stype]["value"].push(svalue);
        }
    }
    for (x in newSdata) {
        newSdata[x]["value"] = uniq(newSdata[x]["value"]);
    }
    return newSdata;
}

/*
 * 初始化集联菜单
 * @param {Object} selectData
 * @param {Object} areaSid
 * @param {Object} cateSid
 */
function initSelect(selectData, areaSid, cateSid){
    jQuery(areaSid).get(0).options.length = 0;
    for (x in selectData) {
        jQuery(areaSid).get(0).options.add(new Option(x, x));
    }
    $(areaSid)[0].onchange = handleChange;
    
    function handleChange(){
        var areaValue = $(areaSid)[0].options[$(areaSid)[0].selectedIndex].value;
        jQuery(cateSid).get(0).options.length = 0;
        for (var i = 0; i < selectData[areaValue]["value"].length; i++) {
            jQuery(cateSid).get(0).options.add(new Option(selectData[areaValue]["value"][i], selectData[areaValue]["value"][i]));
        }
    }
    handleChange();
}

/*
 * 初始化列表 无条件将所有数据填充
 * @param {Object} sdata
 * @param {Object} listid
 */
function initList(sdata, listid){
    for (var i = 0; i <= sdata.length; i++) {
        jQuery(listid).jqGrid('addRowData', i + 1, sdata[i]);
    }
}

/*
 *绑定查询按钮事件
 * @param {Object} btnid
 * @param {Object} areaselId
 * @param {Object} cateselId
 */
function initSearch(btnid, areaselId, cateselId){
    $(btnid).bind("click", function(){
        var SearchCondition = {
            sarea: $(areaselId).val(),
            scate: $(cateselId).val()
        };
        $("#schoollist").jqGrid('clearGridData');
        for (var i = 0; i < sdata.length; i++) {
            if (SearchCondition.sarea == sdata[i].sarea && SearchCondition.scate == sdata[i].scate) {
                jQuery("#schoollist").jqGrid('addRowData', i + 1, sdata[i]);
            }
            
        }     
    })
}
