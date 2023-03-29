import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './WcsStatusWebPart.module.scss';
import * as strings from 'WcsStatusWebPartStrings';

export interface IWcsStatusWebPartProps {
  description: string;
  pillar_link: string;
  pillar_list: string;
}

export interface WCS_Lists {
  value: WCS_List[];
}

export interface WCS_List {
  Pasos: string;
  Entregable: string;
  STATUS_FILE: boolean;
}

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

export default class WcsStatusWebPart extends BaseClientSideWebPart<IWcsStatusWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private get_list(): Promise<WCS_Lists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/${escape(this.properties.pillar_link)}/_api/web/lists/GetByTitle('${escape(this.properties.pillar_list)}')/Items`, SPHttpClient.configurations.v1).then((response:SPHttpClientResponse)=>{
      return response.json();
    })
  }

  private render_step1(items : WCS_List[]):void{
    let status : boolean[] = [];
    let entregable : string[] = [];
    let indicador : number = 0;
    let html : string = ``;
    let html2 : string = ``;

    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 1") {
        status.push(item.STATUS_FILE);
        entregable.push(item.Entregable);
      }
    })

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/check.svg')}" alt="check">${entregable[index]}</div>`;
      } else {
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/ex.svg')}" alt="ex">${entregable[index]}</div>`;
      }
    }

    if (indicador == status.length) {
      html += `
      <div></div>
      <div class="${styles.arrow_complete_1_1}">STEP 1</div>
      <div class="${styles.arrow_complete_2_1}"></div>`;
    } 
    else if (indicador == 0) {
      html += `
      <div></div>
      <div class="${styles.arrow_empty_1_1}">STEP 1</div>
      <div class="${styles.arrow_empty_2_1}"></div>`;
    } else {
      html += `
      <div></div>
      <div class="${styles.arrow_running_1_1}">STEP 1</div>
      <div class="${styles.arrow_running_2_1}"></div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#arrow_s1');
    listContainer.innerHTML = html;

    const entContainer: Element = this.domElement.querySelector('#entregable_s1');
    entContainer.innerHTML = html2;

  }

  private render_step1_async () : void {
    this.get_list().then((response)=>{
      this.render_step1(response.value);
    })
  }

  private render_step2(items : WCS_List[]):void{
    let status : boolean[] = [];
    let entregable : string[] = [];
    let indicador : number = 0;
    let html : string = ``;
    let html2 : string = ``;

    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 2") {
        status.push(item.STATUS_FILE);
        entregable.push(item.Entregable);
      }
    })

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/check.svg')}" alt="check">${entregable[index]}</div>`;
      } else {
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/ex.svg')}" alt="ex">${entregable[index]}</div>`;
      }
    }

    if (indicador == status.length) {
      html += `
      <div></div>
      <div class="${styles.arrow_complete_1_1}">STEP 2</div>
      <div class="${styles.arrow_complete_2_1}"></div>`;
    } 
    else if (indicador == 0) {
      html += `
      <div></div>
      <div class="${styles.arrow_empty_1_1}">STEP 2</div>
      <div class="${styles.arrow_empty_2_1}"></div>`;
    } else {
      html += `
      <div></div>
      <div class="${styles.arrow_running_1_1}">STEP 2</div>
      <div class="${styles.arrow_running_2_1}"></div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#arrow_s2');
    listContainer.innerHTML = html;

    const entContainer: Element = this.domElement.querySelector('#entregable_s2');
    entContainer.innerHTML = html2;

  }

  private render_step2_async () : void {
    this.get_list().then((response)=>{
      this.render_step2(response.value);
    })
  }

  private render_step3(items : WCS_List[]):void{
    let status : boolean[] = [];
    let entregable : string[] = [];
    let indicador : number = 0;
    let html : string = ``;
    let html2 : string = ``;

    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 3") {
        status.push(item.STATUS_FILE);
        entregable.push(item.Entregable);
      }
    })

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/check.svg')}" alt="check">${entregable[index]}</div>`;
      } else {
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/ex.svg')}" alt="ex">${entregable[index]}</div>`;
      }
    }

    if (indicador == status.length) {
      html += `
      <div></div>
      <div class="${styles.arrow_complete_1_1}">STEP 3</div>
      <div class="${styles.arrow_complete_2_1}"></div>`;
    } 
    else if (indicador == 0) {
      html += `
      <div></div>
      <div class="${styles.arrow_empty_1_1}">STEP 3</div>
      <div class="${styles.arrow_empty_2_1}"></div>`;
    } else {
      html += `
      <div></div>
      <div class="${styles.arrow_running_1_1}">STEP 3</div>
      <div class="${styles.arrow_running_2_1}"></div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#arrow_s3');
    listContainer.innerHTML = html;

    const entContainer: Element = this.domElement.querySelector('#entregable_s3');
    entContainer.innerHTML = html2;

  }

  private render_step3_async () : void {
    this.get_list().then((response)=>{
      this.render_step3(response.value);
    })
  }

  private render_step4(items : WCS_List[]):void{
    let status : boolean[] = [];
    let entregable : string[] = [];
    let indicador : number = 0;
    let html : string = ``;
    let html2 : string = ``;

    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 4") {
        status.push(item.STATUS_FILE);
        entregable.push(item.Entregable);
      }
    })

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/check.svg')}" alt="check">${entregable[index]}</div>`;
      } else {
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/ex.svg')}" alt="ex">${entregable[index]}</div>`;
      }
    }

    if (indicador == status.length) {
      html += `
      <div></div>
      <div class="${styles.arrow_complete_1}">STEP 4</div>
      <div class="${styles.arrow_complete_2}"></div>`;
    } 
    else if (indicador == 0) {
      html += `
      <div></div>
      <div class="${styles.arrow_empty_1}">STEP 4</div>
      <div class="${styles.arrow_empty_2}"></div>`;
    } else {
      html += `
      <div></div>
      <div class="${styles.arrow_running_1}">STEP 4</div>
      <div class="${styles.arrow_running_2}"></div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#arrow_s4');
    listContainer.innerHTML = html;

    const entContainer: Element = this.domElement.querySelector('#entregable_s4');
    entContainer.innerHTML = html2;

  }

  private render_step4_async () : void {
    this.get_list().then((response)=>{
      this.render_step4(response.value);
    })
  }

  private render_step5(items : WCS_List[]):void{
    let status : boolean[] = [];
    let entregable : string[] = [];
    let indicador : number = 0;
    let html : string = ``;
    let html2 : string = ``;

    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 5") {
        status.push(item.STATUS_FILE);
        entregable.push(item.Entregable);
      }
    })

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/check.svg')}" alt="check">${entregable[index]}</div>`;
      } else {
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/ex.svg')}" alt="ex">${entregable[index]}</div>`;
      }
    }

    if (indicador == status.length) {
      html += `
      <div></div>
      <div class="${styles.arrow_complete_1}">STEP 5</div>
      <div class="${styles.arrow_complete_2}"></div>`;
    } 
    else if (indicador == 0) {
      html += `
      <div></div>
      <div class="${styles.arrow_empty_1}">STEP 5</div>
      <div class="${styles.arrow_empty_2}"></div>`;
    } else {
      html += `
      <div></div>
      <div class="${styles.arrow_running_1}">STEP 5</div>
      <div class="${styles.arrow_running_2}"></div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#arrow_s5');
    listContainer.innerHTML = html;

    const entContainer: Element = this.domElement.querySelector('#entregable_s5');
    entContainer.innerHTML = html2;

  }

  private render_step5_async () : void {
    this.get_list().then((response)=>{
      this.render_step5(response.value);
    })
  }

  private render_step6(items : WCS_List[]):void{
    let status : boolean[] = [];
    let entregable : string[] = [];
    let indicador : number = 0;
    let html : string = ``;
    let html2 : string = ``;

    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 6") {
        status.push(item.STATUS_FILE);
        entregable.push(item.Entregable);
      }
    })

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/check.svg')}" alt="check">${entregable[index]}</div>`;
      } else {
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/ex.svg')}" alt="ex">${entregable[index]}</div>`;
      }
    }

    if (indicador == status.length) {
      html += `
      <div></div>
      <div class="${styles.arrow_complete_1}">STEP 6</div>
      <div class="${styles.arrow_complete_2}"></div>`;
    } 
    else if (indicador == 0) {
      html += `
      <div></div>
      <div class="${styles.arrow_empty_1}">STEP 6</div>
      <div class="${styles.arrow_empty_2}"></div>`;
    } else {
      html += `
      <div></div>
      <div class="${styles.arrow_running_1}">STEP 6</div>
      <div class="${styles.arrow_running_2}"></div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#arrow_s6');
    listContainer.innerHTML = html;

    const entContainer: Element = this.domElement.querySelector('#entregable_s6');
    entContainer.innerHTML = html2;

  }

  private render_step6_async () : void {
    this.get_list().then((response)=>{
      this.render_step6(response.value);
    })
  }

  private render_step7(items : WCS_List[]):void{
    let status : boolean[] = [];
    let entregable : string[] = [];
    let indicador : number = 0;
    let html : string = ``;
    let html2 : string = ``;

    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 7") {
        status.push(item.STATUS_FILE);
        entregable.push(item.Entregable);
      }
    })

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/check.svg')}" alt="check">${entregable[index]}</div>`;
      } else {
        html2 += `<div class="${styles.text}"><img class="${styles.image}" src="${require('./assets/ex.svg')}" alt="ex">${entregable[index]}</div>`;
      }
    }

    if (indicador == status.length) {
      html += `
      <div></div>
      <div class="${styles.arrow_complete_1}">STEP 7</div>
      <div class="${styles.arrow_complete_2}"></div>`;
    } 
    else if (indicador == 0) {
      html += `
      <div></div>
      <div class="${styles.arrow_empty_1}">STEP 7</div>
      <div class="${styles.arrow_empty_2}"></div>`;
    } else {
      html += `
      <div></div>
      <div class="${styles.arrow_running_1}">STEP 7</div>
      <div class="${styles.arrow_running_2}"></div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#arrow_s7');
    listContainer.innerHTML = html;

    const entContainer: Element = this.domElement.querySelector('#entregable_s7');
    entContainer.innerHTML = html2;

  }

  private render_step7_async () : void {
    this.get_list().then((response)=>{
      this.render_step7(response.value);
    })
  }

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.container}">
      <div class="${styles.step_1}">
        <div class="${styles.text_show_1}" id="entregable_s1"></div>
        <div class="${styles.arrow}" id="arrow_s1"></div>
      </div>
      <div class="${styles.step_2}">
        <div class="${styles.text_show_1}" id="entregable_s2"></div>
        <div class="${styles.arrow}" id="arrow_s2"></div>
      </div>
      <div class="${styles.step_3}">
        <div class="${styles.text_show_1}" id="entregable_s3"></div>
        <div class="${styles.arrow}" id="arrow_s3"></div>
      </div>
      <div class="${styles.step_4}">
        <div class="${styles.arrow}" id="arrow_s4"></div>
        <div class="${styles.text_show}" id="entregable_s4"></div>
      </div>
      <div class="${styles.step_5}">
        <div class="${styles.arrow}" id="arrow_s5"></div>
        <div class="${styles.text_show}" id="entregable_s5"></div>
      </div>
      <div class="${styles.step_6}">
        <div class="${styles.arrow}" id="arrow_s6"></div>
        <div class="${styles.text_show}" id="entregable_s6"></div>
      </div>
      <div class="${styles.step_7}">
        <div class="${styles.arrow}" id="arrow_s7"></div>
        <div class="${styles.text_show}" id="entregable_s7"></div>
      </div>
    </div>
    <div id="spListContainer"></div>`;
    this.render_step1_async();
    this.render_step2_async();
    this.render_step3_async();
    this.render_step4_async();
    this.render_step5_async();
    this.render_step6_async();
    this.render_step7_async();
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }



  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}
