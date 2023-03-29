import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneCheckboxProps,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PedidosPdmWebPart.module.scss';
import * as strings from 'PedidosPdmWebPartStrings';

export interface IPedidosPdmWebPartProps {
  description: string;
}

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http'

export interface PedidosPDMs {
  value: PedidosPDM[];
}

export interface PedidosPDM {
  CODIGO_SOLICITUD: string;
  TIPO_DE_LA_SOLICITUD: string;
  SOLUCION: string;
  METODO: string;
  CANTIDAD: number;
  UNIDADES: string,
  AREA_RESPONSABLE: string;
  FECHA_DE_ENTREGA_PROPUESTA: string;
  FECHA_DE_ENTREGA_REAL: string;
  CONDICION_DE_LA_ENTREGA: string;
  COMENTARIOS: string;
  CANTIDAD_ENTREGADA: number;
  ANALISTA_QUE_REALIZA_EL_PEDIDO: string;
  NUMERO_WSP_DE_QUIEN_RECIBE: string;
}

export interface Areas {
  value: Area[];
}

export interface Area {
  TIPO_SOLUCION_PDM : string;
  SOLUCION_PDM : string;
  METODO_PDM : string;
  AREA_RESPONSABLE_ANGEL : string;
  CORREO_RESPONSABLE_PDM : string;
  SEGUNDO_RESPONSABLE_PDM : string;
  UNIDADES_PDM : string;
}

export default class PedidosPdmWebPart extends BaseClientSideWebPart<IPedidosPdmWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private getPedidos(): Promise<PedidosPDMs> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/pedidos_pdm/_api/web/lists/GetByTitle('BD_PEDIDOS_PDM_SOLUCIONES')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private getAreas(): Promise<Areas> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/pedidos_pdm/_api/web/lists/GetByTitle('PEDIDOS_PDM_SOLUCIONES')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private renderPedidos(items: PedidosPDM[]): void {
    let html: string = ``;
    let html2 : string = ``;
    let html3 : string = ``;

    let pedidos : string[] = [];
    let cantidad : number = 0;
    let fechas : Date[] = [];
    let condicion : string[] = [];
    let pedido_click : string[] = [];

    let fecha_pedido : Date;
    let fecha : Date;
    let cant_tot : number = 0;
    let cant_entr : number = 0;

    let filtro_pedido = (<HTMLInputElement>document.getElementById('buscar_pedido')).value;
    let check_ent = (<HTMLInputElement>document.getElementById('checkbox_ent')).checked;
    let check_pen = (<HTMLInputElement>document.getElementById('checkbox_pen')).checked;


    items.forEach((item: PedidosPDM) => {

      fecha = new Date (item.FECHA_DE_ENTREGA_PROPUESTA);

      pedidos.push(item.CODIGO_SOLICITUD);
      condicion.push(item.CONDICION_DE_LA_ENTREGA);
      fechas.push(fecha);

    });

    let pedido = pedidos.filter((item,i,ar)=>ar.indexOf(item)===i);
    
    pedidos = pedidos.reverse();
    pedido = pedido.reverse();
    condicion = condicion.reverse();
    fechas = fechas.reverse();
    
    for (let index1 = 0; index1 < pedido.length; index1++) {

      for (let index2 = 0; index2 < pedidos.length; index2++) {
        if (pedido[index1] == pedidos[index2]) {
          fecha_pedido = fechas[index2];
          cant_tot++;
          if (condicion[index2] == 'Entregado a tiempo' || condicion[index2] == 'Entregado a destiempo') {
            cant_entr++;
          }
        }
      }

      html += `
      <option value="${pedido[index1]}"></option>
      `
      if (filtro_pedido == "") {

        if (((check_ent == true) && (check_pen == true)) || ((check_ent == false) && (check_pen == false))) {

          html2 += `
          <div class="${styles.pedido}" id="${pedido[index1]}" value="${pedido[index1]}">
          <div class="${styles.nombre_pedido}"><strong>${pedido[index1]}</strong></div>`


          if (cant_entr == cant_tot) {
          html2 +=
            `<div class="${styles.cant_entr}">
              <div class="${styles.cant_part}">${cant_tot}</div>
            </div>`
          } else {
          html2 +=
          `<div class="${styles.cant_entr}" style="grid-template-columns: ${cant_entr/cant_tot}fr ${(cant_tot-cant_entr)/cant_tot}fr;">
              <div class="${styles.cant_tot}">${cant_entr}</div>
            <div class="${styles.cant_part}">${cant_tot}</div>
          </div>`
          }

          html2 +=
          `<div class="${styles.status_base}">
            <div class="${styles.status_pedido}" style="width:${(cant_entr/cant_tot)*100}%;">|</div>
            </div>
          <div class="${styles.porcentaje}">
            <div class="${styles.porcentaje_valor}" style="width: ${(cant_entr/cant_tot)*100}%;">${((cant_entr/cant_tot)*100).toFixed(0)}%</div>
          </div>
          <div class="fecha"><strong style="color:red;">Fecha de entrega : </strong>${fecha_pedido.getDate()}-${fecha_pedido.getMonth() + 1}-${fecha_pedido.getFullYear()}</div>
          </div>
          `
          cantidad++;
          pedido_click.push(pedido[index1]);
        }

        if ((check_ent == true) && (check_pen == false) ) {
          if (cant_entr == cant_tot) {
            html2 += `
            <div class="${styles.pedido}" id="${pedido[index1]}" value="${pedido[index1]}">
            <div class="${styles.nombre_pedido}"><strong>${pedido[index1]}</strong></div>
            <div class="${styles.cant_entr}">
              <div class="${styles.cant_part}">${cant_tot}</div>
            </div>
            <div class="${styles.status_base}">
            <div class="${styles.status_pedido}" style="width:${(cant_entr/cant_tot)*100}%;">|</div>
            </div>
            <div class="${styles.porcentaje}">
            <div class="${styles.porcentaje_valor}" style="width: ${(cant_entr/cant_tot)*100}%;">${((cant_entr/cant_tot)*100).toFixed(0)}%</div>
            </div>
            <div class="fecha"><strong style="color:red;">Fecha de entrega : </strong>${fecha_pedido.getDate()}-${fecha_pedido.getMonth() + 1}-${fecha_pedido.getFullYear()}</div>
            </div>
            `
            cantidad++;
            pedido_click.push(pedido[index1]);
          } else {
            // html2 += `
            // <div class="${styles.pedido}" style="justify-content:center;align-items:center;">
            //   NOT FOUND
            // </div>
            // `
          }
        }

        if ((check_ent == false) && (check_pen == true)) {
          if (cant_entr<cant_tot) {
            html2 += `
            <div class="${styles.pedido}" id="${pedido[index1]}" value="${pedido[index1]}">
            <div class="${styles.nombre_pedido}"><strong>${pedido[index1]}</strong></div>
            <div class="${styles.cant_entr}" style="grid-template-columns: ${cant_entr/cant_tot}fr ${(cant_tot-cant_entr)/cant_tot}fr;">
              <div class="${styles.cant_tot}">${cant_entr}</div>
            <div class="${styles.cant_part}">${cant_tot}</div>
            </div>
            <div class="${styles.status_base}">
            <div class="${styles.status_pedido}" style="width:${(cant_entr/cant_tot)*100}%;">|</div>
            </div>
            <div class="${styles.porcentaje}">
            <div class="${styles.porcentaje_valor}" style="width: ${(cant_entr/cant_tot)*100}%;">${((cant_entr/cant_tot)*100).toFixed(0)}%</div>
            </div>
            <div class="fecha"><strong style="color:red;">Fecha de entrega : </strong>${fecha_pedido.getDate()}-${fecha_pedido.getMonth() + 1}-${fecha_pedido.getFullYear()}</div>
            </div>
            `
            cantidad++;
            pedido_click.push(pedido[index1]);
          } else {
            // html2 += `
            // <div class="${styles.pedido}" style="justify-content:center;align-items:center;">
            //   NOT FOUND
            // </div>
            // `
          }
        }

      } else {
        if (filtro_pedido == pedido[index1]) {
          html2 += `
          <div class="${styles.pedido}" id="${pedido[index1]}" value="${pedido[index1]}">
          <div class="${styles.nombre_pedido}"><strong>${pedido[index1]}</strong></div>`


          if (cant_entr == cant_tot) {
          html2 +=
            `<div class="${styles.cant_entr}">
              <div class="${styles.cant_part}">${cant_tot}</div>
            </div>`
          } else {
          html2 +=
          `<div class="${styles.cant_entr}" style="grid-template-columns: ${cant_entr/cant_tot}fr ${(cant_tot-cant_entr)/cant_tot}fr;">
              <div class="${styles.cant_tot}">${cant_entr}</div>
            <div class="${styles.cant_part}">${cant_tot}</div>
          </div>`
          }

          html2 +=
          `<div class="${styles.status_base}">
            <div class="${styles.status_pedido}" style="width:${(cant_entr/cant_tot)*100}%;">|</div>
            </div>
          <div class="${styles.porcentaje}">
            <div class="${styles.porcentaje_valor}" style="width: ${(cant_entr/cant_tot)*100}%;">${((cant_entr/cant_tot)*100).toFixed(0)}%</div>
          </div>
          <div class="fecha"><strong style="color:red;">Fecha de entrega : </strong>${fecha_pedido.getDate()}-${fecha_pedido.getMonth() + 1}-${fecha_pedido.getFullYear()}</div>
          </div>
          `
          cantidad++;
        } else {
          // html2 += `
          //   <div class="${styles.pedido}" style="justify-content:center;align-items:center;">
          //     NOT FOUND
          //   </div>
          //   `
        }
    
      }

      cant_tot=0;
      cant_entr=0;
    }

    html3 += `
      <div> Cantidad : ${cantidad} </div>
      `;

    if (cantidad == 0) {
      html2 += `
        <div class="${styles.pedido}" style="justify-content:center;align-items:center;">
          NOT FOUND
        </div>
      ` 
    }

    const cantidadpedidos: Element = this.domElement.querySelector('#cantidad_pedidos');
    cantidadpedidos.innerHTML = html3;

    const searchpedidos: Element = this.domElement.querySelector('#codigo_pedidos');
    searchpedidos.innerHTML = html;

    const viewpedidos: Element = this.domElement.querySelector('#valores');
    viewpedidos.innerHTML = html2;

    const webpart : PedidosPdmWebPart = this;

    let a_element = this.domElement.querySelectorAll(`.${styles.pedido}`);

    for (let index3 = 0; index3 < a_element.length; index3++) {
      a_element[index3].addEventListener('click', () => {webpart.click_pedido(`${pedido_click[index3]}`); });
      // console.log(`se ha creado metodo de click : en ${pedido_click[index3]}`)
    }
  }

  private renderPedidosAsync() : void {
    this.getPedidos().then((response)=>{
      this.renderPedidos(response.value);
    })
  }


  private Pedido_disgregado(items: PedidosPDM[],id : string): void {
    let html: string = ``;
    let html1 : string = ``;
    let html2 : string = ``;

    let pedidos : string[] = [];
    let area_res : string[] = [];
    let solucion : string[] = [];

    let fecha : Date;

    let area_res_unicos : string[] = [];
    let solucion_unicos : string[] = [];

    items.forEach((item: PedidosPDM) => {

      pedidos.push(item.CODIGO_SOLICITUD);

      if (item.CODIGO_SOLICITUD == id) {
        area_res.push(item.AREA_RESPONSABLE);
        solucion.push(item.SOLUCION);
        
        fecha = new Date (item.FECHA_DE_ENTREGA_PROPUESTA);
      }

    });

    area_res_unicos = area_res.filter((item,i,ar)=>ar.indexOf(item)===i);
    solucion_unicos = solucion.filter((item,i,ar)=>ar.indexOf(item)===i);

    for (let index = 0; index < area_res_unicos.length; index++) {
      html += `
        <option value="${area_res_unicos[index]}"></option>
      `
    }

    for (let index1 = 0; index1 < solucion_unicos.length; index1++) {
      html += `
        <option value="${solucion_unicos[index1]}"></option>
      `
    }

    html1 += `<div id="nom_ped_dis" value="${id}">Pedido : <strong>${id}</strong></div>`;

    html2 += `<div>Fecha de Entrega : <strong>${fecha.getDate()} - ${fecha.getMonth() + 1} - ${fecha.getFullYear()}</strong></div>`;
    
    const filtroareas: Element = this.domElement.querySelector('#areas');
    filtroareas.innerHTML = html;

    const codigopedido: Element = this.domElement.querySelector('#dis_n_pedido');
    codigopedido.innerHTML = html1;

    const fechapedido: Element = this.domElement.querySelector('#fecha_pedido_ent');
    fechapedido.innerHTML = html2;
  }

  private Pedido_disgregado_Async(id : string) : void {
    this.getPedidos().then((response)=>{
      this.Pedido_disgregado(response.value,id);
    })
  }

  private soluciones(items: PedidosPDM[],id : string): void {
    let html: string = ``;
    let color_fondo : string;

    let pedidos : string[] = [];
    let condicion : string[] = [];
    let cant_tot : number[] = [];
    let area_res : string[] = [];
    let unidades : string[] = [];
    let solucion : string[] = [];
    let tipo_solucion : string[] = [];
    let metodo : string[] = [];
    let cant_ent : number[] = [];

    let fecha : Date;

    let filtro_area = (<HTMLInputElement>document.getElementById('filtrar_area')).value;
    console.log(filtro_area);


    items.forEach((item: PedidosPDM) => {

      pedidos.push(item.CODIGO_SOLICITUD);

      if (item.CODIGO_SOLICITUD == id) {

        if (filtro_area=="") {
          condicion.push(item.CONDICION_DE_LA_ENTREGA);
          cant_tot.push(item.CANTIDAD);
          area_res.push(item.AREA_RESPONSABLE);
          solucion.push(item.SOLUCION);
          unidades.push(item.UNIDADES);
          tipo_solucion.push(item.TIPO_DE_LA_SOLICITUD);
          metodo.push(item.METODO);
          cant_ent.push(item.CANTIDAD_ENTREGADA);
        } else {
          if ((item.AREA_RESPONSABLE == filtro_area) || (item.SOLUCION == filtro_area)) {
            condicion.push(item.CONDICION_DE_LA_ENTREGA);
            cant_tot.push(item.CANTIDAD);
            area_res.push(item.AREA_RESPONSABLE);
            solucion.push(item.SOLUCION);
            unidades.push(item.UNIDADES);
            tipo_solucion.push(item.TIPO_DE_LA_SOLICITUD);
            metodo.push(item.METODO);
          cant_ent.push(item.CANTIDAD_ENTREGADA);
          }
        }
        fecha = new Date (item.FECHA_DE_ENTREGA_PROPUESTA);

      }

    });

    for (let index = 0; index < solucion.length; index++) {

      switch (area_res[index]) {
        case 'GC':
          color_fondo = '#aa0000'
          break;
        case 'FISICOQUÍMICOS':
            color_fondo = '#1400aa'
            break;
        case 'AIRES':
          color_fondo = '#63aa00'
          break;
        case 'INSTRUMENTAL 1':
          color_fondo = '#6f00aa'
          break;
        case 'INSTRUMENTAL 2':
          color_fondo = '#aa6000'
          break;
        case 'METALES':
          color_fondo = '#00aa7d'
          break;
        default:
          color_fondo = '#00aa60'
          break;
      }

      html += `
      <div class=${styles.pedido_solucion}>
        <div class="${styles.solucion_derecha}">
          <div><strong>${tipo_solucion[index]}</strong></div>
          <div>${solucion[index]}</div>
          <div>${metodo[index]}</div>
          <div>${cant_tot[index]} ${unidades[index]}</div>
          <div class="${styles.areass}" style="background-color:${color_fondo};">${area_res[index]}</div>
        </div>
        <div class="${styles.solucion_izquierda}">
          <div class="${styles.porcentaje_de_entrega}">
            Cantidad Pedida : ${cant_tot[index]}
          </div>
          <div class="${styles.porcentaje_de_entrega}">
            Cantidad Entregada : ${cant_ent[index]}
          </div>
          <div class="${styles.porcentaje_de_entrega}">
            Entregado al ${(cant_ent[index]/cant_tot[index]*100).toFixed(0)}%
          </div>
          <div class="${styles.cant_sol}">
            <div class="${styles.sol_ent}" style="width:${cant_ent[index]/cant_tot[index]*100}%;"></div>
          </div>
          <div>
            <div>Quedan ${cant_tot[index]-cant_ent[index]} por entregar</div>
          </div>
        </div>
      </div>
      `
    }


    const filtroareas: Element = this.domElement.querySelector('#pedido_soluciones');
    filtroareas.innerHTML = html;
  }

  private soluciones_Async(id : string) : void {
    this.getPedidos().then((response)=>{
      this.soluciones(response.value,id);
    })
  }

  private renderAreas(items: Area[]): void { 
    let html: string = '';
    let areas : string[] = [];
    let area : string[] = [];
    let soluciones : string[] = [];


    items.forEach((item: Area) => {

      areas.push(item.AREA_RESPONSABLE_ANGEL);
      soluciones.push(item.SOLUCION_PDM);

    });

    area = areas.filter((item,i,ar)=>ar.indexOf(item)===i);
    
    for (let index = 0; index < area.length; index++) {
      html += `
      <option value="${area[index]}"></option>
      `
    }

    for (let jndex = 0; jndex < soluciones.length; jndex++) {
      html += `
      <option value="${soluciones[jndex]}"></option>
      `
    }

    const ListContainer: Element = this.domElement.querySelector('#areas');
    ListContainer.innerHTML = html;
  }

  private renderAreasAsync() : void {
    this.getAreas().then((response)=>{
      this.renderAreas(response.value);
    })
  }

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.container}">
      <div class="${styles.pedidos}">
        <div class="${styles.filtros}">
          <div class="filtroscheckbox">
            <input type="checkbox" id="checkbox_ent" value="Entregado" name="check" /> <div id="div_ent" class="${styles.atributo}">Entregado</div> <br />
            <input type="checkbox" id="checkbox_pen" value="Pendiente" name="check" /> <div id="div_pen" class="${styles.atributo}">Pendiente</div> <br />
          </div>
          <div class="buscarpedidos">
            <input id="buscar_pedido" type="search" placeholder="Buscar codigo pedido ..." list="codigo_pedidos">
          </div>
          <div id="cantidad_pedidos"></div>
        </div>
        <div id="valores" class="${styles.valores}"></div>
      </div>
      <div class="${styles.disgregado}">
        <div class="${styles.filtros2}">
          <div id="dis_n_pedido">Pedido: PDMXXXXXXXXXXXX</div>
          <div id="fecha_pedido_ent">Fecha de Entrega : xx-xx-xxxx</div>
          <div>
            <div class="${styles.areas}">Areas y Soluciones</div>
            <input type="search" id="filtrar_area" list="areas" placeholder="Filtrar area o solucion ..." disabled>
          </div>
        </div>
        <div id="pedido_soluciones" class="${styles.pedido_soluciones}">
          
        </div>
      </div>
    </div>
    <datalist id="codigo_pedidos"></datalist>
    <datalist id="areas"></datalist>
    <div id="ListContainer"></div>
    `;

    this.renderPedidosAsync();
    // this.renderAreasAsync();

    this.setButtonEventMandlers();
  }

  private setButtonEventMandlers() : void {
    const webpart : PedidosPdmWebPart = this;
    this.domElement.querySelector('#div_ent').addEventListener('click', () => {webpart.check_ent(); });
    this.domElement.querySelector('#div_pen').addEventListener('click', () => {webpart.check_pen(); });

    this.domElement.querySelector('#checkbox_ent').addEventListener('change', () => {webpart.checkbox_ent(); });
    this.domElement.querySelector('#checkbox_pen').addEventListener('change', () => {webpart.checkbox_pen(); });
    this.domElement.querySelector('#buscar_pedido').addEventListener('change', () => {webpart.buscar_pedido(); });
    this.domElement.querySelector('#filtrar_area').addEventListener('change', () => {webpart.filtrar_area(); });
  }

  private check_ent() : void {
    if ((<HTMLInputElement>document.getElementById('checkbox_ent')).checked == true) {
      (<HTMLInputElement>document.getElementById('checkbox_ent')).checked = false;
    } else {
      (<HTMLInputElement>document.getElementById('checkbox_ent')).checked = true;
    }
    this.checkbox_ent();
  }

  private check_pen() : void {
    if ((<HTMLInputElement>document.getElementById('checkbox_pen')).checked == true) {
      (<HTMLInputElement>document.getElementById('checkbox_pen')).checked = false;
    } else {
      (<HTMLInputElement>document.getElementById('checkbox_pen')).checked = true;
    }
    this.checkbox_pen();
  }

  private checkbox_ent () : void {
    this.renderPedidosAsync();
  }

  private checkbox_pen () : void {
    this.renderPedidosAsync();
  }

  private buscar_pedido () : void {
    (<HTMLInputElement>document.getElementById('checkbox_ent')).checked = false;
    (<HTMLInputElement>document.getElementById('checkbox_pen')).checked = false;
    let filtro_pedido = (<HTMLInputElement>document.getElementById('buscar_pedido')).value;
    if (filtro_pedido != "") {
      this.Pedido_disgregado_Async(filtro_pedido);
      (<HTMLInputElement>document.getElementById('filtrar_area')).disabled = false;
      this.soluciones_Async(filtro_pedido);
    }
    this.renderPedidosAsync();
  }

  
  private click_pedido(id : string) : void {

    let valor_div = (<HTMLDivElement>document.getElementById(id)).getAttribute('value');
    this.Pedido_disgregado_Async(valor_div);
    (<HTMLInputElement>document.getElementById('filtrar_area')).disabled = false;
    this.soluciones_Async(id);
    // alert(`Se ha dado click a un pedido : ${valor_div}`);
  }

  private filtrar_area() : void {
    let filtro_area = (<HTMLInputElement>document.getElementById('filtrar_area')).value;
    let valor_div = (<HTMLDivElement>document.getElementById('nom_ped_dis')).getAttribute('value');
    this.soluciones_Async(valor_div);
    // console.log(filtro_area);
    // console.log(valor_div);
    // this.Pedido_disgregado_Async();
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
