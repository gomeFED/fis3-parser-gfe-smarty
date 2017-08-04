var Smarty = require('smarty4Js');
var smarty = new Smarty({
     'left_delimiter': '{', // default
     'right_delimiter': '}', // default
});
var projectPath = fis.project.getProjectPath();
var cachePath = fis.project.getCachePath();

/**
 * 获取mock数据
 * @param  {Object} file fis 的 File 对象
 * @return {Object}      mockData
 */
function mockData(file) {
    var data = {},
        mockFilePath = file.subpathNoExt.replace('/html/', '/data/') + '.json',
        mockFile = fis.file(projectPath, mockFilePath);

    if (mockFile.exists()) {
        try {
            data = JSON.parse(mockFile.getContent());
        } catch (e) {
            fis.log.warn('mock data parse error:' + mockFilePath);
        }
    } else {
        // fis.log.warn('not found mock data file:' + mockFilePath);
    }
    return data;
}

/**
 * 解析smarty模板
 * @param  {string} content     文件内容
 * @param  {File}   file        fis 的 File 对象 [fis3/lib/file.js]
 * @param  {object} settings    插件配置属性
 * @return {string}             处理后的文件内容
 */
module.exports = function(content, file, settings) {
    var isEntryFile = (~content.indexOf('/html') || ~content.indexOf('/HTML')) && (~content.indexOf('/head') || ~content.indexOf('/HEAD')) && (~content.indexOf('/body') || ~content.indexOf('/BODY'));
    if(isEntryFile){
        try {
            smarty.setBasedir(file.dirname);
            content = smarty.render(content, mockData(file));
        } catch (e) {
            fis.log.warn('Got error: %s while parsing `%s`.%s', e.message.red, file.subpath, e.detail || '');
            fis.log.debug(e.stack);
        }
    }
    
    return content;
};