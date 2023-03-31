var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './WcsStatusWebPart.module.scss';
import * as strings from 'WcsStatusWebPartStrings';
import { SPHttpClient } from '@microsoft/sp-http';
var WcsStatusWebPart = /** @class */ (function (_super) {
    __extends(WcsStatusWebPart, _super);
    function WcsStatusWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = '';
        return _this;
    }
    WcsStatusWebPart.prototype.get_list = function () {
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/".concat(escape(this.properties.pillar_link), "/_api/web/lists/GetByTitle('").concat(escape(this.properties.pillar_list), "')/Items"), SPHttpClient.configurations.v1).then(function (response) {
            return response.json();
        });
    };
    WcsStatusWebPart.prototype.render_step1 = function (items) {
        var status = [];
        var entregable = [];
        var indicador = 0;
        var html = "";
        var html2 = "";
        items.forEach(function (item) {
            if (item.Pasos == "Step 1") {
                status.push(item.STATUS_FILE);
                entregable.push(item.Entregable);
            }
        });
        for (var index = 0; index < status.length; index++) {
            if (status[index]) {
                indicador++;
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/check.svg'), "\" alt=\"check\">").concat(entregable[index], "</div>");
            }
            else {
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/ex.svg'), "\" alt=\"ex\">").concat(entregable[index], "</div>");
            }
        }
        if (indicador == status.length) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_complete_1_1, "\">STEP 1</div>\n      <div class=\"").concat(styles.arrow_complete_2_1, "\"></div>");
        }
        else if (indicador == 0) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_empty_1_1, "\">STEP 1</div>\n      <div class=\"").concat(styles.arrow_empty_2_1, "\"></div>");
        }
        else {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_running_1_1, "\">STEP 1</div>\n      <div class=\"").concat(styles.arrow_running_2_1, "\"></div>");
        }
        var listContainer = this.domElement.querySelector('#arrow_s1');
        listContainer.innerHTML = html;
        var entContainer = this.domElement.querySelector('#entregable_s1');
        entContainer.innerHTML = html2;
    };
    WcsStatusWebPart.prototype.render_step1_async = function () {
        var _this = this;
        this.get_list().then(function (response) {
            _this.render_step1(response.value);
        });
    };
    WcsStatusWebPart.prototype.render_step2 = function (items) {
        var status = [];
        var entregable = [];
        var indicador = 0;
        var html = "";
        var html2 = "";
        items.forEach(function (item) {
            if (item.Pasos == "Step 2") {
                status.push(item.STATUS_FILE);
                entregable.push(item.Entregable);
            }
        });
        for (var index = 0; index < status.length; index++) {
            if (status[index]) {
                indicador++;
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/check.svg'), "\" alt=\"check\">").concat(entregable[index], "</div>");
            }
            else {
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/ex.svg'), "\" alt=\"ex\">").concat(entregable[index], "</div>");
            }
        }
        if (indicador == status.length) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_complete_1_1, "\">STEP 2</div>\n      <div class=\"").concat(styles.arrow_complete_2_1, "\"></div>");
        }
        else if (indicador == 0) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_empty_1_1, "\">STEP 2</div>\n      <div class=\"").concat(styles.arrow_empty_2_1, "\"></div>");
        }
        else {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_running_1_1, "\">STEP 2</div>\n      <div class=\"").concat(styles.arrow_running_2_1, "\"></div>");
        }
        var listContainer = this.domElement.querySelector('#arrow_s2');
        listContainer.innerHTML = html;
        var entContainer = this.domElement.querySelector('#entregable_s2');
        entContainer.innerHTML = html2;
    };
    WcsStatusWebPart.prototype.render_step2_async = function () {
        var _this = this;
        this.get_list().then(function (response) {
            _this.render_step2(response.value);
        });
    };
    WcsStatusWebPart.prototype.render_step3 = function (items) {
        var status = [];
        var entregable = [];
        var indicador = 0;
        var html = "";
        var html2 = "";
        items.forEach(function (item) {
            if (item.Pasos == "Step 3") {
                status.push(item.STATUS_FILE);
                entregable.push(item.Entregable);
            }
        });
        for (var index = 0; index < status.length; index++) {
            if (status[index]) {
                indicador++;
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/check.svg'), "\" alt=\"check\">").concat(entregable[index], "</div>");
            }
            else {
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/ex.svg'), "\" alt=\"ex\">").concat(entregable[index], "</div>");
            }
        }
        if (indicador == status.length) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_complete_1_1, "\">STEP 3</div>\n      <div class=\"").concat(styles.arrow_complete_2_1, "\"></div>");
        }
        else if (indicador == 0) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_empty_1_1, "\">STEP 3</div>\n      <div class=\"").concat(styles.arrow_empty_2_1, "\"></div>");
        }
        else {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_running_1_1, "\">STEP 3</div>\n      <div class=\"").concat(styles.arrow_running_2_1, "\"></div>");
        }
        var listContainer = this.domElement.querySelector('#arrow_s3');
        listContainer.innerHTML = html;
        var entContainer = this.domElement.querySelector('#entregable_s3');
        entContainer.innerHTML = html2;
    };
    WcsStatusWebPart.prototype.render_step3_async = function () {
        var _this = this;
        this.get_list().then(function (response) {
            _this.render_step3(response.value);
        });
    };
    WcsStatusWebPart.prototype.render_step4 = function (items) {
        var status = [];
        var entregable = [];
        var indicador = 0;
        var html = "";
        var html2 = "";
        items.forEach(function (item) {
            if (item.Pasos == "Step 4") {
                status.push(item.STATUS_FILE);
                entregable.push(item.Entregable);
            }
        });
        for (var index = 0; index < status.length; index++) {
            if (status[index]) {
                indicador++;
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/check.svg'), "\" alt=\"check\">").concat(entregable[index], "</div>");
            }
            else {
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/ex.svg'), "\" alt=\"ex\">").concat(entregable[index], "</div>");
            }
        }
        if (indicador == status.length) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_complete_1, "\">STEP 4</div>\n      <div class=\"").concat(styles.arrow_complete_2, "\"></div>");
        }
        else if (indicador == 0) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_empty_1, "\">STEP 4</div>\n      <div class=\"").concat(styles.arrow_empty_2, "\"></div>");
        }
        else {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_running_1, "\">STEP 4</div>\n      <div class=\"").concat(styles.arrow_running_2, "\"></div>");
        }
        var listContainer = this.domElement.querySelector('#arrow_s4');
        listContainer.innerHTML = html;
        var entContainer = this.domElement.querySelector('#entregable_s4');
        entContainer.innerHTML = html2;
    };
    WcsStatusWebPart.prototype.render_step4_async = function () {
        var _this = this;
        this.get_list().then(function (response) {
            _this.render_step4(response.value);
        });
    };
    WcsStatusWebPart.prototype.render_step5 = function (items) {
        var status = [];
        var entregable = [];
        var indicador = 0;
        var html = "";
        var html2 = "";
        items.forEach(function (item) {
            if (item.Pasos == "Step 5") {
                status.push(item.STATUS_FILE);
                entregable.push(item.Entregable);
            }
        });
        for (var index = 0; index < status.length; index++) {
            if (status[index]) {
                indicador++;
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/check.svg'), "\" alt=\"check\">").concat(entregable[index], "</div>");
            }
            else {
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/ex.svg'), "\" alt=\"ex\">").concat(entregable[index], "</div>");
            }
        }
        if (indicador == status.length) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_complete_1, "\">STEP 5</div>\n      <div class=\"").concat(styles.arrow_complete_2, "\"></div>");
        }
        else if (indicador == 0) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_empty_1, "\">STEP 5</div>\n      <div class=\"").concat(styles.arrow_empty_2, "\"></div>");
        }
        else {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_running_1, "\">STEP 5</div>\n      <div class=\"").concat(styles.arrow_running_2, "\"></div>");
        }
        var listContainer = this.domElement.querySelector('#arrow_s5');
        listContainer.innerHTML = html;
        var entContainer = this.domElement.querySelector('#entregable_s5');
        entContainer.innerHTML = html2;
    };
    WcsStatusWebPart.prototype.render_step5_async = function () {
        var _this = this;
        this.get_list().then(function (response) {
            _this.render_step5(response.value);
        });
    };
    WcsStatusWebPart.prototype.render_step6 = function (items) {
        var status = [];
        var entregable = [];
        var indicador = 0;
        var html = "";
        var html2 = "";
        items.forEach(function (item) {
            if (item.Pasos == "Step 6") {
                status.push(item.STATUS_FILE);
                entregable.push(item.Entregable);
            }
        });
        for (var index = 0; index < status.length; index++) {
            if (status[index]) {
                indicador++;
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/check.svg'), "\" alt=\"check\">").concat(entregable[index], "</div>");
            }
            else {
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/ex.svg'), "\" alt=\"ex\">").concat(entregable[index], "</div>");
            }
        }
        if (indicador == status.length) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_complete_1, "\">STEP 6</div>\n      <div class=\"").concat(styles.arrow_complete_2, "\"></div>");
        }
        else if (indicador == 0) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_empty_1, "\">STEP 6</div>\n      <div class=\"").concat(styles.arrow_empty_2, "\"></div>");
        }
        else {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_running_1, "\">STEP 6</div>\n      <div class=\"").concat(styles.arrow_running_2, "\"></div>");
        }
        var listContainer = this.domElement.querySelector('#arrow_s6');
        listContainer.innerHTML = html;
        var entContainer = this.domElement.querySelector('#entregable_s6');
        entContainer.innerHTML = html2;
    };
    WcsStatusWebPart.prototype.render_step6_async = function () {
        var _this = this;
        this.get_list().then(function (response) {
            _this.render_step6(response.value);
        });
    };
    WcsStatusWebPart.prototype.render_step7 = function (items) {
        var status = [];
        var entregable = [];
        var indicador = 0;
        var html = "";
        var html2 = "";
        items.forEach(function (item) {
            if (item.Pasos == "Step 7") {
                status.push(item.STATUS_FILE);
                entregable.push(item.Entregable);
            }
        });
        for (var index = 0; index < status.length; index++) {
            if (status[index]) {
                indicador++;
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/check.svg'), "\" alt=\"check\">").concat(entregable[index], "</div>");
            }
            else {
                html2 += "<div class=\"".concat(styles.text, "\"><img class=\"").concat(styles.image, "\" src=\"").concat(require('./assets/ex.svg'), "\" alt=\"ex\">").concat(entregable[index], "</div>");
            }
        }
        if (indicador == status.length) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_complete_1, "\">STEP 7</div>\n      <div class=\"").concat(styles.arrow_complete_2, "\"></div>");
        }
        else if (indicador == 0) {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_empty_1, "\">STEP 7</div>\n      <div class=\"").concat(styles.arrow_empty_2, "\"></div>");
        }
        else {
            html += "\n      <div></div>\n      <div class=\"".concat(styles.arrow_running_1, "\">STEP 7</div>\n      <div class=\"").concat(styles.arrow_running_2, "\"></div>");
        }
        var listContainer = this.domElement.querySelector('#arrow_s7');
        listContainer.innerHTML = html;
        var entContainer = this.domElement.querySelector('#entregable_s7');
        entContainer.innerHTML = html2;
    };
    WcsStatusWebPart.prototype.render_step7_async = function () {
        var _this = this;
        this.get_list().then(function (response) {
            _this.render_step7(response.value);
        });
    };
    WcsStatusWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n    <div class=\"".concat(styles.container, "\">\n      <div class=\"").concat(styles.step_1, "\">\n        <div class=\"").concat(styles.text_show_1, "\" id=\"entregable_s1\"></div>\n        <div class=\"").concat(styles.arrow, "\" id=\"arrow_s1\"></div>\n      </div>\n      <div class=\"").concat(styles.step_2, "\">\n        <div class=\"").concat(styles.text_show_1, "\" id=\"entregable_s2\"></div>\n        <div class=\"").concat(styles.arrow, "\" id=\"arrow_s2\"></div>\n      </div>\n      <div class=\"").concat(styles.step_3, "\">\n        <div class=\"").concat(styles.text_show_1, "\" id=\"entregable_s3\"></div>\n        <div class=\"").concat(styles.arrow, "\" id=\"arrow_s3\"></div>\n      </div>\n      <div class=\"").concat(styles.step_4, "\">\n        <div class=\"").concat(styles.arrow, "\" id=\"arrow_s4\"></div>\n        <div class=\"").concat(styles.text_show, "\" id=\"entregable_s4\"></div>\n      </div>\n      <div class=\"").concat(styles.step_5, "\">\n        <div class=\"").concat(styles.arrow, "\" id=\"arrow_s5\"></div>\n        <div class=\"").concat(styles.text_show, "\" id=\"entregable_s5\"></div>\n      </div>\n      <div class=\"").concat(styles.step_6, "\">\n        <div class=\"").concat(styles.arrow, "\" id=\"arrow_s6\"></div>\n        <div class=\"").concat(styles.text_show, "\" id=\"entregable_s6\"></div>\n      </div>\n      <div class=\"").concat(styles.step_7, "\">\n        <div class=\"").concat(styles.arrow, "\" id=\"arrow_s7\"></div>\n        <div class=\"").concat(styles.text_show, "\" id=\"entregable_s7\"></div>\n      </div>\n    </div>\n    <div id=\"spListContainer\"></div>");
        this.render_step1_async();
        this.render_step2_async();
        this.render_step3_async();
        this.render_step4_async();
        this.render_step5_async();
        this.render_step6_async();
        this.render_step7_async();
    };
    WcsStatusWebPart.prototype.onInit = function () {
        this._environmentMessage = this._getEnvironmentMessage();
        return _super.prototype.onInit.call(this);
    };
    WcsStatusWebPart.prototype._getEnvironmentMessage = function () {
        if (!!this.context.sdks.microsoftTeams) { // running in Teams
            return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
        }
        return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
    };
    WcsStatusWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }
    };
    Object.defineProperty(WcsStatusWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    WcsStatusWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('pillar_link', {
                                    label: strings.pillar_link_label,
                                }),
                                PropertyPaneTextField('pillar_list', {
                                    label: strings.pillar_list_label,
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return WcsStatusWebPart;
}(BaseClientSideWebPart));
export default WcsStatusWebPart;
//# sourceMappingURL=WcsStatusWebPart.js.map