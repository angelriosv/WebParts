import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './WcsStatus5WebPart.module.scss';
import * as strings from 'WcsStatus5WebPartStrings';

export interface IWcsStatus5WebPartProps {
  first_pillar: string;
  second_pillar: string;
  third_pillar: string;
  fourth_pillar: string;
  fifth_pillar: string;
  first_link: string;
  second_link: string;
  third_link: string;
  fourth_link: string;
  fifth_link: string;
  first_weblist: string;
  first_list: string;
  second_weblist: string;
  second_list: string;
  third_weblist: string;
  third_list: string;
  fourth_weblist: string;
  fourth_list: string;
  fifth_weblist: string;
  fifth_list: string;
}

//Importar librerías importantes
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

// Definir modelo de Lista 
export interface WCS_Lists {
  value: WCS_List[];
}

// Hacer fijo este campo según 
export interface WCS_List {
  Pasos : string;
  Entregable : string;
  STATUS_FILE : boolean;
}

export default class WcsStatus5WebPart extends BaseClientSideWebPart<IWcsStatus5WebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  // Metodo para recuperar lista del primer Pilar
  private _getListData_p1(): Promise<WCS_Lists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/${escape(this.properties.first_weblist)}/_api/web/lists/GetByTitle('${escape(this.properties.first_list)}')/Items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  // Metodo para recuperar lista del segundo Pilar
  private _getListData_p2(): Promise<WCS_Lists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/${escape(this.properties.second_weblist)}/_api/web/lists/GetByTitle('${escape(this.properties.second_list)}')/Items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  // Metodo para recuperar lista del tercer Pilar
  private _getListData_p3(): Promise<WCS_Lists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/${escape(this.properties.third_weblist)}/_api/web/lists/GetByTitle('${escape(this.properties.third_list)}')/Items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  // Metodo para recuperar lista del cuarto Pilar
  private _getListData_p4(): Promise<WCS_Lists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/${escape(this.properties.fourth_weblist)}/_api/web/lists/GetByTitle('${escape(this.properties.fourth_list)}')/Items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  // Metodo para recuperar lista del quinto Pilar
  private _getListData_p5(): Promise<WCS_Lists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/${escape(this.properties.fifth_weblist)}/_api/web/lists/GetByTitle('${escape(this.properties.fifth_list)}')/Items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  // Metodos para renderizar cada step

  private render_s1_p1(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 1") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 1 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 1 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 1 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s1_p1');
    listContainer.innerHTML = html;
  }

  private render_s1_p1_async () : void {
    this._getListData_p1().then((response)=>{
      this.render_s1_p1(response.value);
    })
  }

  private render_s1_p2(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 1") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 1 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 1 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 1 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s1_p2');
    listContainer.innerHTML = html;
  }

  private render_s1_p2_async(): void {
    this._getListData_p2().then((response)=>{
      this.render_s1_p2(response.value);
    })
  }

  private render_s1_p3(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 1") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 1 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 1 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 1 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s1_p3');
    listContainer.innerHTML = html;
  }

  private render_s1_p3_async(): void {
    this._getListData_p3().then((response)=>{
      this.render_s1_p3(response.value);
    })
  }

  private render_s1_p4(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 1") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 1 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 1 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 1 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s1_p4');
    listContainer.innerHTML = html;
  }

  private render_s1_p4_async(): void {
    this._getListData_p4().then((response)=>{
      this.render_s1_p4(response.value);
    })
  }

  private render_s1_p5(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 1") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 1 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 1 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 1 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s1_p5');
    listContainer.innerHTML = html;
  }

  private render_s1_p5_async(): void {
    this._getListData_p5().then((response)=>{
      this.render_s1_p5(response.value);
    })
  }

  private render_s2_p1(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 2") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 2 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 2 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 2 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s2_p1');
    listContainer.innerHTML = html;
  }

  private render_s2_p1_async(): void {
    this._getListData_p1().then((response)=>{
      this.render_s2_p1(response.value);
    })
  }

  private render_s2_p2(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 2") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 2 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 2 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 2 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s2_p2');
    listContainer.innerHTML = html;
  }

  private render_s2_p2_async(): void {
    this._getListData_p2().then((response)=>{
      this.render_s2_p2(response.value);
    })
  }

  private render_s2_p3(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 2") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 2 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 2 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 2 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s2_p3');
    listContainer.innerHTML = html;
  }

  private render_s2_p3_async(): void {
    this._getListData_p3().then((response)=>{
      this.render_s2_p3(response.value);
    })
  }

  
  private render_s2_p4(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 2") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 2 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 2 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 2 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s2_p4');
    listContainer.innerHTML = html;
  }

  private render_s2_p4_async(): void {
    this._getListData_p4().then((response)=>{
      this.render_s2_p4(response.value);
    })
  }

  private render_s2_p5(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 2") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 2 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 2 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 2 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s2_p5');
    listContainer.innerHTML = html;
  }

  private render_s2_p5_async(): void {
    this._getListData_p5().then((response)=>{
      this.render_s2_p5(response.value);
    })
  }

  private render_s3_p1(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 3") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 3 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 3 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 3 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s3_p1');
    listContainer.innerHTML = html;
  }

  private render_s3_p1_async(): void {
    this._getListData_p1().then((response)=>{
      this.render_s3_p1(response.value);
    })
  }

  private render_s3_p2(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 3") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 3 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 3 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 3 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s3_p2');
    listContainer.innerHTML = html;
  }

  private render_s3_p2_async(): void {
    this._getListData_p2().then((response)=>{
      this.render_s3_p2(response.value);
    })
  }

  private render_s3_p3(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 3") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 3 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 3 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 3 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s3_p3');
    listContainer.innerHTML = html;
  }

  private render_s3_p3_async(): void {
    this._getListData_p3().then((response)=>{
      this.render_s3_p3(response.value);
    })
  }

  private render_s3_p4(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 3") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 3 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 3 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 3 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s3_p4');
    listContainer.innerHTML = html;
  }

  private render_s3_p4_async(): void {
    this._getListData_p4().then((response)=>{
      this.render_s3_p4(response.value);
    })
  }

  private render_s3_p5(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 3") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 3 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 3 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 3 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s3_p5');
    listContainer.innerHTML = html;
  }

  private render_s3_p5_async(): void {
    this._getListData_p5().then((response)=>{
      this.render_s3_p5(response.value);
    })
  }
  
  private render_s4_p1(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 4") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 4 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 4 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 4 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s4_p1');
    listContainer.innerHTML = html;
  }

  private render_s4_p1_async(): void {
    this._getListData_p1().then((response)=>{
      this.render_s4_p1(response.value);
    })
  }

  private render_s4_p2(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 4") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 4 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 4 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 4 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s4_p2');
    listContainer.innerHTML = html;
  }

  private render_s4_p2_async(): void {
    this._getListData_p2().then((response)=>{
      this.render_s4_p2(response.value);
    })
  }

  private render_s4_p3(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 4") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 4 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 4 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 4 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s4_p3');
    listContainer.innerHTML = html;
  }

  private render_s4_p3_async(): void {
    this._getListData_p3().then((response)=>{
      this.render_s4_p3(response.value);
    })
  }

  private render_s4_p4(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 4") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 4 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 4 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 4 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s4_p4');
    listContainer.innerHTML = html;
  }

  private render_s4_p4_async(): void {
    this._getListData_p4().then((response)=>{
      this.render_s4_p4(response.value);
    })
  }

  private render_s4_p5(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 4") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 4 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 4 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 4 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s4_p5');
    listContainer.innerHTML = html;
  }

  private render_s4_p5_async(): void {
    this._getListData_p5().then((response)=>{
      this.render_s4_p5(response.value);
    })
  }

  private render_s5_p1(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 5") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 5 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 5 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 5 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s5_p1');
    listContainer.innerHTML = html;
  }


  private render_s5_p1_async(): void {
    this._getListData_p1().then((response)=>{
      this.render_s5_p1(response.value);
    })
  }

  private render_s5_p2(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 5") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 5 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 5 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 5 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s5_p2');
    listContainer.innerHTML = html;
  }

  private render_s5_p2_async(): void {
    this._getListData_p2().then((response)=>{
      this.render_s5_p2(response.value);
    })
  }

  private render_s5_p3(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 5") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 5 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 5 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 5 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s5_p3');
    listContainer.innerHTML = html;
  }

  private render_s5_p3_async(): void {
    this._getListData_p3().then((response)=>{
      this.render_s5_p3(response.value);
    })
  }

  private render_s5_p4(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 5") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 5 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 5 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 5 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s5_p4');
    listContainer.innerHTML = html;
  }

  private render_s5_p4_async(): void {
    this._getListData_p4().then((response)=>{
      this.render_s5_p4(response.value);
    })
  }

  private render_s5_p5(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 5") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 5 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 5 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 5 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s5_p5');
    listContainer.innerHTML = html;
  }

  private render_s5_p5_async(): void {
    this._getListData_p5().then((response)=>{
      this.render_s5_p5(response.value);
    })
  }

  private render_s6_p1(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 6") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 6 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 6 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 6 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s6_p1');
    listContainer.innerHTML = html;
  }


  private render_s6_p1_async(): void {
    this._getListData_p1().then((response)=>{
      this.render_s6_p1(response.value);
    })
  }

  private render_s6_p2(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 6") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 6 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 6 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 6 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s6_p2');
    listContainer.innerHTML = html;
  }

  private render_s6_p2_async(): void {
    this._getListData_p2().then((response)=>{
      this.render_s6_p2(response.value);
    })
  }

  private render_s6_p3(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 6") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 6 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 6 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 6 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s6_p3');
    listContainer.innerHTML = html;
  }

  private render_s6_p3_async(): void {
    this._getListData_p3().then((response)=>{
      this.render_s6_p3(response.value);
    })
  }

  private render_s6_p4(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 6") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 6 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 6 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 6 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s6_p4');
    listContainer.innerHTML = html;
  }

  private render_s6_p4_async(): void {
    this._getListData_p4().then((response)=>{
      this.render_s6_p4(response.value);
    })
  }

  private render_s6_p5(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 6") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 6 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 6 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 6 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s6_p5');
    listContainer.innerHTML = html;
  }

  private render_s6_p5_async(): void {
    this._getListData_p5().then((response)=>{
      this.render_s6_p5(response.value);
    })
  }

  private render_s7_p1(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 7") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 7 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 7 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 7 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s7_p1');
    listContainer.innerHTML = html;
  }

  private render_s7_p1_async(): void {
    this._getListData_p1().then((response)=>{
      this.render_s7_p1(response.value);
    })
  }

  private render_s7_p2(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 7") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 7 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 7 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 7 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s7_p2');
    listContainer.innerHTML = html;
  }

  private render_s7_p2_async(): void {
    this._getListData_p2().then((response)=>{
      this.render_s7_p2(response.value);
    })
  }

  private render_s7_p3(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 7") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 7 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 7 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 7 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s7_p3');
    listContainer.innerHTML = html;
  }

  private render_s7_p3_async(): void {
    this._getListData_p3().then((response)=>{
      this.render_s7_p3(response.value);
    })
  }

  private render_s7_p4(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 7") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 7 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 7 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 7 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s7_p4');
    listContainer.innerHTML = html;
  }

  private render_s7_p4_async(): void {
    this._getListData_p4().then((response)=>{
      this.render_s7_p4(response.value);
    })
  }

  private render_s7_p5(items : WCS_List[]): void {
    let status : boolean[] = [];
    let indicador : number = 0;
    let html : string = ``;
    items.forEach((item: WCS_List) => {
      if (item.Pasos == "Step 7") {
        status.push(item.STATUS_FILE);
      }
    });

    for (let index = 0; index < status.length; index++) {
      if (status[index]) {
        indicador++;
      }
    }
    
    if (indicador == status.length) {
      html += `<div class="${styles.complete_container}"> STEP 7 </div>`;
    } 
    else if (indicador == 0) {
      html += `<div class="${styles.empty_container}"> STEP 7 </div>`;
    } else {
      html += `<div class="${styles.running_container}"> STEP 7 </div>`;
    }

    const listContainer: Element = this.domElement.querySelector('#s7_p5');
    listContainer.innerHTML = html;
  }

  private render_s7_p5_async(): void {
    this._getListData_p5().then((response)=>{
      this.render_s7_p5(response.value);
    })
  }

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.container}">
      <div id="s7_p1" class="${styles.generic_cc}"></div>
      <div id="s7_p2" class="${styles.generic_cc}"></div>
      <div id="s7_p3" class="${styles.generic_cc}"></div>
      <div id="s7_p4" class="${styles.generic_cc}"></div>
      <div id="s7_p5" class="${styles.generic_cc}"></div>
      <div id="s6_p1" class="${styles.generic_cc}"></div>
      <div id="s6_p2" class="${styles.generic_cc}"></div>
      <div id="s6_p3" class="${styles.generic_cc}"></div>
      <div id="s6_p4" class="${styles.generic_cc}"></div>
      <div id="s6_p5" class="${styles.generic_cc}"></div>
      <div id="s5_p1" class="${styles.generic_cc}"></div>
      <div id="s5_p2" class="${styles.generic_cc}"></div>
      <div id="s5_p3" class="${styles.generic_cc}"></div>
      <div id="s5_p4" class="${styles.generic_cc}"></div>
      <div id="s5_p5" class="${styles.generic_cc}"></div>
      <div id="s4_p1" class="${styles.generic_cc}"></div>
      <div id="s4_p2" class="${styles.generic_cc}"></div>
      <div id="s4_p3" class="${styles.generic_cc}"></div>
      <div id="s4_p4" class="${styles.generic_cc}"></div>
      <div id="s4_p5" class="${styles.generic_cc}"></div>
      <div id="s3_p1" class="${styles.generic_cc}"></div>
      <div id="s3_p2" class="${styles.generic_cc}"></div>
      <div id="s3_p3" class="${styles.generic_cc}"></div>
      <div id="s3_p4" class="${styles.generic_cc}"></div>
      <div id="s3_p5" class="${styles.generic_cc}"></div>
      <div id="s2_p1" class="${styles.generic_cc}"></div>
      <div id="s2_p2" class="${styles.generic_cc}"></div>
      <div id="s2_p3" class="${styles.generic_cc}"></div>
      <div id="s2_p4" class="${styles.generic_cc}"></div>
      <div id="s2_p5" class="${styles.generic_cc}"></div>
      <div id="s1_p1" class="${styles.generic_cc}"></div>
      <div id="s1_p2" class="${styles.generic_cc}"></div>
      <div id="s1_p3" class="${styles.generic_cc}"></div>
      <div id="s1_p4" class="${styles.generic_cc}"></div>
      <div id="s1_p5" class="${styles.generic_cc}"></div>
      <div class="${styles.text_c1}">
            <a class="${styles.btn_wcs_p}" href="${escape(this.properties.first_link)}">${escape(this.properties.first_pillar)}</a>
        </div>
        <div class="${styles.text_c2}">
            <a class="${styles.btn_wcs_p}" href="${escape(this.properties.second_link)}">${escape(this.properties.second_pillar)}</a>
        </div>
        <div class="${styles.text_c3}">
            <a class="${styles.btn_wcs_p}" href="${escape(this.properties.third_link)}">${escape(this.properties.third_pillar)}</a>
        </div>
        <div class="${styles.text_c4}">
            <a class="${styles.btn_wcs_p}" href="${escape(this.properties.fourth_link)}">${escape(this.properties.fourth_pillar)}</a>
        </div>
        <div class="${styles.text_c5}">
            <a class="${styles.btn_wcs_p}" href="${escape(this.properties.fifth_link)}">${escape(this.properties.fifth_pillar)}</a>
        </div>
    </div>
        `;
    this.render_s1_p1_async();
    this.render_s1_p2_async();
    this.render_s1_p3_async();
    this.render_s1_p4_async();
    this.render_s1_p5_async();
    this.render_s2_p1_async();
    this.render_s2_p2_async();
    this.render_s2_p3_async();
    this.render_s2_p4_async();
    this.render_s2_p5_async();
    this.render_s3_p1_async();
    this.render_s3_p2_async();
    this.render_s3_p3_async();
    this.render_s3_p4_async();
    this.render_s3_p5_async();
    this.render_s4_p1_async();
    this.render_s4_p2_async();
    this.render_s4_p3_async();
    this.render_s4_p4_async();
    this.render_s4_p5_async();
    this.render_s5_p1_async();
    this.render_s5_p2_async();
    this.render_s5_p3_async();
    this.render_s5_p4_async();
    this.render_s5_p5_async();
    this.render_s6_p1_async();
    this.render_s6_p2_async();
    this.render_s6_p3_async();
    this.render_s6_p4_async();
    this.render_s6_p5_async();
    this.render_s7_p1_async();
    this.render_s7_p2_async();
    this.render_s7_p3_async();
    this.render_s7_p4_async();
    this.render_s7_p5_async();
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
                PropertyPaneTextField('first_pillar', {
                  label: strings.first_pillarFieldLabel,
                }),
                PropertyPaneTextField('second_pillar', {
                  label: strings.second_pillarFieldLabel,
                }),
                PropertyPaneTextField('third_pillar', {
                  label: strings.third_pillarFieldLabel,
                }),
                PropertyPaneTextField('fourth_pillar', {
                  label: strings.fourth_pillarFieldLabel,
                }),
                PropertyPaneTextField('fifth_pillar', {
                  label: strings.fifth_pillarFieldLabel,
                }),
                PropertyPaneTextField('first_link', {
                  label: strings.first_linkFieldLabel,
                }),
                PropertyPaneTextField('second_link', {
                  label: strings.second_linkFieldLabel,
                }),
                PropertyPaneTextField('third_link', {
                  label: strings.third_linkFieldLabel,
                }),
                PropertyPaneTextField('fourth_link', {
                  label: strings.fourth_linkFieldLabel,
                }),
                PropertyPaneTextField('fifth_link', {
                  label: strings.fifth_linkFieldLabel,
                }),
                PropertyPaneTextField('first_weblist', {
                  label: strings.first_weblistFieldLabel,
                }),
                PropertyPaneTextField('first_list', {
                  label: strings.first_listFieldLabel,
                }),
                PropertyPaneTextField('second_weblist', {
                  label: strings.second_weblistFieldLabel,
                }),
                PropertyPaneTextField('second_list', {
                  label: strings.second_listFieldLabel,
                }),
                PropertyPaneTextField('third_weblist', {
                  label: strings.first_weblistFieldLabel,
                }),
                PropertyPaneTextField('third_list', {
                  label: strings.first_listFieldLabel,
                }),
                PropertyPaneTextField('fourth_weblist', {
                  label: strings.first_weblistFieldLabel,
                }),
                PropertyPaneTextField('fourth_list', {
                  label: strings.first_listFieldLabel,
                }),
                PropertyPaneTextField('fifth_weblist', {
                  label: strings.first_weblistFieldLabel,
                }),
                PropertyPaneTextField('fifth_list', {
                  label: strings.first_listFieldLabel,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
