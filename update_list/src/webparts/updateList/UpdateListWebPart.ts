import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './UpdateListWebPart.module.scss';
import * as strings from 'UpdateListWebPartStrings';

export interface IUpdateListWebPartProps {
  description: string;
}

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Id: number,
  Nombre: string;
  Edad: number;
}

export interface Personals {
  value : Personal[];
}

export interface Personal {
  NOMBRES_Y_APELLIDOS : string;
  CARGO : string;
  CORREO_PERSONAL : string;
  CODIGO : number;
}

export interface Pruebas {
  value : Prueba[];
}

export interface Prueba {
  CODIGO_SOLICITUD : String;
  TIPO_DE_LA_SOLICITUD : string;
  SOLUCION : string;
  METODO : string,
  CANTIDAD : number;
  UNIDADES : string;
  AREA_RESPONSABLE : string;
  FECHA_DE_ENTREGA_PROPUESTA : Date;
  FECHA_DE_ENTREGA_REAL : string;
  COMENTARIOS : string;
  CANTIDAD_ENTREGADA : string;
  ANALISTA_QUE_REALIZA_EL_PEDIDO : string;
  NUMERO_WSP_DE_QUIEN_RECIBE : string;
  COMENTARIOS_DE_LA_ENTREGA : string;
  PRIMER_RESPONSABLE_ENVI : string;
  SEGUNDO_RESPONSABLE_ENVI : string
}

export default class UpdateListWebPart extends BaseClientSideWebPart<IUpdateListWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private lisItemEntityTypeName: string = undefined;
  private Listname: string = "CustomerDetails";

  private _getPersonal(): Promise<Personals> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/wcs_pd/_api/web/lists/GetByTitle('WCS_PD_Lista_Personal')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Lista_Test')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private _getPruebaData(): Promise<Pruebas> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/pedidos_pdm/_api/web/lists/GetByTitle('BD_PEDIDOS_PDM_SOLUCIONES')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private _renderPrueba(items: Prueba[]): void {
    let html: string = '<table border=1 width=100% style="border-collapse:collapse;">';
    let value = (<HTMLInputElement>document.getElementById("opcion")).value;


      items.forEach((item: Prueba) => {
        html += `
        <tr>
          <td>${item.CODIGO_SOLICITUD}</td>
          <td>${item.TIPO_DE_LA_SOLICITUD}</td>
        </tr>
        `
      });

    html += '</table>';

    const ListContainer: Element = this.domElement.querySelector('#prueba_list');
    ListContainer.innerHTML = html;
  }

  private _renderPruebaAsync(): void {
      this._getPruebaData().then((response) => {
        this._renderPrueba(response.value);
      });
  }


  private _renderList(items: ISPList[]): void {
    let html: string = '<table border=1 width=100% style="border-collapse:collapse;">';
    let value = (<HTMLInputElement>document.getElementById("opcion")).value;

    if (value == "Nombre") {
      items.forEach((item: ISPList) => {
        html += `
        <tr>
          <td>${item.Nombre}</td>
        </tr>
        `
      });
    } else {
      items.forEach((item: ISPList) => {
        html += `
        <tr>
          <td>${item.Edad}</td>
        </tr>
        `
      });
    }

    html += '</table>';

    const ListContainer: Element = this.domElement.querySelector('#spListContainer');
    ListContainer.innerHTML = html;
  }


  private _renderListAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData().then((response) => {
        this._renderList(response.value);
      });
    }
  }

  private _renderselect(items: ISPList[]): void {

    let html: string = '';
    let value = (<HTMLInputElement>document.getElementById("opcion")).value;

    html = `<div> Seleccion : ${value} </div>`;

    const ListContainer: Element = this.domElement.querySelector('#seleccion');
    ListContainer.innerHTML = html;
  }

  private _renderselecAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData().then((response) => {
        this._renderselect(response.value);
      });
    }
  }

  private _rendercontainer(items: ISPList[]): void {
    let html: string = '<table border=1 width=100% style="border-collapse:collapse;">';

    items.forEach((item: ISPList) => {
      html += `
      <tr>
        <td>${item.Nombre}</td>
        <td>${item.Edad}</td>
      </tr>
      `
    });

    html += '</table>';

    const ListContainer: Element = this.domElement.querySelector('#container');
    ListContainer.innerHTML = html;
  }

  private _rendercontainerAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData().then((response) => {
        this._rendercontainer(response.value);
      });
    }
  }

  private _renderselectname(items: ISPList[]): void {
    let html: string = '';

    items.forEach((item: ISPList) => {
      html += `
      <option value="${item.Id}">- ${item.Nombre} -</option>
      `
    });

    const Listselect: Element = this.domElement.querySelector('#seleccion_nombre');
    Listselect.innerHTML = html;
  }

  private _renderselectnameAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData().then((response) => {
        this._renderselectname(response.value);
      });
    }
  }

  private _renderedadselectname(items: ISPList[]): void {
    let html: string = '';

    let value = (<HTMLInputElement>document.getElementById("seleccion_nombre")).value;


    items.forEach((item: ISPList) => {

      if (`${item.Id}` == value) {
        html += `<div> Edad : ${item.Edad}</div>` 
      }

    });

    const Listselect: Element = this.domElement.querySelector('#edad_nombre_select');
    Listselect.innerHTML = html;
  }

  private _renderedadselectnameAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData().then((response) => {
        this._renderedadselectname(response.value);
      });
    }
  }

  private render_valor_search(): void {
    let html = ``;

    let value = (<HTMLInputElement>document.getElementById("busqueda")).value;

    if (value == "") {
      html = `<div>Busqueda : No Hay</div>`
    } else {
      html = `<div>Busqueda : ${value}</div>`
    }

    const valorsearch: Element = this.domElement.querySelector('#valor_search');
    valorsearch.innerHTML = html;
  }

  private _renderoptions(items: Personal[]): void {
    let html: string = '';

    items.forEach((item: Personal) => {

        html += `<option value="${item.NOMBRES_Y_APELLIDOS}">${item.CODIGO} - ${item.CORREO_PERSONAL}</option>` 

    });

    const personalist: Element = this.domElement.querySelector('#listapersonal');
    personalist.innerHTML = html;
  }

  private _renderoptionsAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getPersonal().then((response) => {
        this._renderoptions(response.value);
      });
    }
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.container}">
        <div>Hello World</div>
      </div>
      <div id="container"></div>
      <select name="opcion" class="opcion" id="opcion">
        <option value="Nombre">- Nombre -</option>
        <option value="Edad">- Edad -</option>
      </select>
      <div id="seleccion"></div>
      <div id="spListContainer"></div>
      <div class="">
        <div class="">
          <div class="">
            <div class="$">
              <span class="$">CRUD operations</span>
              <p class="">No Framework</p>

              <div>
                <div>
                  <input type="text" id="nombree"></input>
                  <input type="number" id="edadd"></input>
                </div>
              </div>

              <div>
                <div>
                  <button class="create-Button">
                    <span>Create item</span>
                  </button>
                  <button class="read-Button">
                    <span>Read Item</span>
                  </button>
                </div>
              </div>

              <div>
                <div>
                  <button class="update-Button">
                    <span>Update item</span>
                  </button>
                  <button class="delete-Button">
                    <span>Delete Item</span>
                  </button>
                </div>
              </div>

              <div>
                <div>
                  <div class="status"></div>
                  <ul class="items"></ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <select name="seleccion_nombre" id="seleccion_nombre"></select>
      <div id="edad_nombre_select"></div>

      <div id="usuario">
        <div>${this.context.pageContext.user.displayName}</div>
        <div>${this.context.pageContext.user.email}</div>
        <div>${this.context.pageContext.user.email.toLowerCase()}</div>
        <div>${this.context.pageContext.user.loginName}</div>
        <div>${this.context.pageContext.user}</div>
      </div>

      <button id="pasaste">Pasaste</button>
      <div id="sipasaste"></div>

      <input type="search" id="busqueda" name="busqueda" list="listapersonal">

      <datalist id="listapersonal"></datalist>

      <div id="valor_search"></div>

      <div id="prueba_list"></div>
      `;

    this._renderListAsync();
    this._rendercontainerAsync();
    this._renderselecAsync();

    this._renderselectnameAsync();
    this._renderedadselectnameAsync();

    this.render_valor_search();

    this._renderoptionsAsync();

    this.setButtonsEventMandlers();

    this._renderPruebaAsync();
  }

  private setButtonsEventMandlers(): void {
    const webpart: UpdateListWebPart = this;
    this.domElement.querySelector('button.create-Button').addEventListener('click', () => { webpart.createItem(); });
    this.domElement.querySelector('button.read-Button').addEventListener('click', () => { webpart.readItem(); });
    this.domElement.querySelector('button.update-Button').addEventListener('click', () => { webpart.updateItem(); });
    this.domElement.querySelector('button.delete-Button').addEventListener('click', () => { webpart.deleteItem(); });
    this.domElement.querySelector('select.opcion').addEventListener('change', () => { webpart.selectoption(); });
    this.domElement.querySelector('select#seleccion_nombre').addEventListener('change', () => { webpart.selectnameoption(); });
    this.domElement.querySelector('button#pasaste').addEventListener('click', () => { webpart.buttonpasaste(); });
    this.domElement.querySelector('input#busqueda').addEventListener('change', () => { webpart.inputbusqueda(); });
  }

  private inputbusqueda() : void {
    this.render_valor_search();
  }

  private buttonpasaste() : void {
    if ('angel.riosv@sgs.com' == this.context.pageContext.user.email.toLocaleLowerCase()) {
      let html : string = `<div>PASASTE</div>`

      const pasastebtn: Element = this.domElement.querySelector('#sipasaste');
      pasastebtn.innerHTML = html;
    } else {
      alert('No tiene permiso de acceso a esta función')
    }
    
  }

  // Event Select Option
  private selectoption() : void {
    // console.log('selection change');
    this._renderselecAsync();
    this._renderListAsync();
    // this.render();
  }

  private selectnameoption() : void {
    this._renderedadselectnameAsync();
  }

  // Return the last item ID
  private getLatestItemId(): Promise<number> {
    return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
      this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Lista_Test')/items?$orderby=Id desc&$top=1&$select=id`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ value: { Id: number }[] }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { value: { Id: number }[] }): void => {
          if (response.value.length === 0) {
            resolve(-1);
          }
          else {
            resolve(response.value[0].Id);
          }
        });
    });
  }

  // Return the last item ID
  private getSelectItemId(): Promise<number> {
    return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
      this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Lista_Test')/items?$filter=Id eq '${(<HTMLInputElement>document.getElementById("seleccion_nombre")).value}'`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ value: { Id: number }[] 
      }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { value: { Id: number }[] }): void => {
          if (response.value.length === 0) {
            resolve(-1);
          }
          else {
            resolve(response.value[0].Id);
          }
        });
    });
  }

  private createItem(): void {
    const body: string = JSON.stringify({
      'Nombre': (<HTMLInputElement>document.getElementById("nombree")).value,
      'Edad': (<HTMLInputElement>document.getElementById("edadd")).value
    });

    this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Lista_Test')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=nometadata',
          'odata-version': ''
        },
        body: body
      })
      .then((response: SPHttpClientResponse): Promise<ISPList> => {
        return response.json();
      })
      .then((item: ISPList): void => {
        this.updateStatus(`Item ID: ${item.Id}, Nombre: ${item.Nombre}, Edad: ${item.Edad}`);
        this._renderListAsync();
        this._rendercontainerAsync();
        this._renderselectnameAsync();
        this._renderedadselectnameAsync();
      }, (error: any): void => {
        this.updateStatus('Loading latest item failed with error: ' + error);
      });
  }

  private updateStatus(status: string, items: ISPList[] = []): void {
    this.domElement.querySelector('.status').innerHTML = status;
    this.updateItemsHtml(items);
  }

  private updateItemsHtml(items: ISPList[]): void {
    this.domElement.querySelector('.items').innerHTML = items.map(item => `<li>${item.Nombre} (${item.Edad})`).join("");
  }

  private readItem(): void {
    this.getSelectItemId()
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        this.updateStatus(`Loading information about item ID: ${itemId}...`);

        return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Lista_Test')/items(${itemId})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'odata-version': ''
            }
          });
      })
      .then((response: SPHttpClientResponse): Promise<ISPList> => {
        return response.json();
      })
      .then((item: ISPList): void => {
        this.updateStatus(`Item ID: ${item.Id}, Nombre: ${item.Nombre}, Edad: ${item.Edad}`);
      }, (error: any): void => {
        this.updateStatus('Loading latest item failed with error: ' + error);
      });
  }

  private updateItem(): void {
    let latestItemId: number = undefined;
    this.updateStatus('Loading latest item...');

    this.getLatestItemId()
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        latestItemId = itemId;
        this.updateStatus(`Loading information about item ID: ${itemId}...`);

        return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Lista_Test')/items(${latestItemId})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'odata-version': ''
            }
          });
      })
      .then((response: SPHttpClientResponse): Promise<ISPList> => {
        return response.json();
      })
      .then((item: ISPList): void => {
        this.updateStatus(`Item ID1: ${item.Id}, Title: Update Item`);

        const body: string = JSON.stringify({
          'Nombre': (<HTMLInputElement>document.getElementById("nombree")).value,
          'Edad': (<HTMLInputElement>document.getElementById("edadd")).value
        });

        this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Lista_Test')/items(${item.Id})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=nometadata',
              'odata-version': '',
              'IF-MATCH': '*',
              'X-HTTP-Method': 'MERGE'
            },
            body: body
          })
          .then((response: SPHttpClientResponse): void => {
            this.updateStatus(`Item with ID: ${latestItemId} successfully updated`);
            this._renderListAsync();
            this._rendercontainerAsync();
            this._renderselectnameAsync();
            this._renderedadselectnameAsync();
          }, (error: any): void => {
            this.updateStatus(`Error updating item: ${error}`);
          });
      });
  }

  private deleteItem(): void {
    if (!window.confirm('Are you sure you want to delete the latest item?')) {
      return;
    }

    this.updateStatus('Loading latest items...');
    let latestItemId: number = undefined;
    let etag: string = undefined;
    this.getLatestItemId()
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        latestItemId = itemId;
        this.updateStatus(`Loading information about item ID: ${latestItemId}...`);
        return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Lista_Test')/items(${latestItemId})?$select=Id`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'odata-version': ''
            }
          });
      })
      .then((response: SPHttpClientResponse): Promise<ISPList> => {
        etag = response.headers.get('ETag');
        return response.json();
      })
      .then((item: ISPList): Promise<SPHttpClientResponse> => {
        this.updateStatus(`Deleting item with ID: ${latestItemId}...`);
        return this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Lista_Test')/items(${item.Id})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=verbose',
              'odata-version': '',
              'IF-MATCH': etag,
              'X-HTTP-Method': 'DELETE'
            }
          });
      })
      .then((response: SPHttpClientResponse): void => {
        this.updateStatus(`Item with ID: ${latestItemId} successfully deleted`);

        this._renderListAsync();
        this._rendercontainerAsync();

        this._renderselectnameAsync();
        this._renderedadselectnameAsync();
      }, (error: any): void => {
        this.updateStatus(`Error deleting item: ${error}`);
      });
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
