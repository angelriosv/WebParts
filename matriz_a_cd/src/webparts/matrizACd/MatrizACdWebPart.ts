import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MatrizACdWebPart.module.scss';
import * as strings from 'MatrizACdWebPartStrings';

export interface IMatrizACdWebPartProps {
  description: string;
}

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http'

export interface Estaciones {
  value : Estacion[];
}

export interface Estacion {
  Departamento : string;
  Estacion : string;
}

export interface Desperdicios {
  value: Desperdicio[]
}

export interface Desperdicio {
  MACROCATEGORIA : string;
  CATEGORIA  : string;
  DESPERDICIO : string;
  UNIDAD : string;
  DEFINICION_DESPERDICIO : string;
  EJEMPLO_DESPERDICIO : string;
  CAUSALIDAD : string;
}

export interface BD_Desperdicios {
  value: BD_Desperdicio[]
}

export interface BD_Desperdicio {
  MACROCATEGORIA : string;
  CATEGORIA : string;
  DESPERDICIO : string;
  DESCRIPCION : string;
  AREA_REPORTANTE : string;
  DEPARTAMENTO_DESPERDICIO : string;
  ESTACION : string;
  COLABORADOR : string;
  ESTADO : string;
  FECHA_DESPERDICIO : string;

}

export default class MatrizACdWebPart extends BaseClientSideWebPart<IMatrizACdWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private getEstaciones(): Promise<Estaciones> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/wcs_cd/_api/web/lists/GetByTitle('WCS_CD_Lista_Estaciones')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private getDesperdicios(): Promise<Desperdicios> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/wcs_cd/_api/web/lists/GetByTitle('WCS_CD_Lista_Desperdicios')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private getBDDesperdicios(): Promise<BD_Desperdicios> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/wcs_cd/_api/web/lists/GetByTitle('WCS_CD_BD_DESPERDICIOS')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  private render_ranking_estaciones(items1 : Estacion[],items: BD_Desperdicio[], items2 : Desperdicio[]) : void {

    let html : string  = ``;
    let html1 : string = ``;
    let html2 : string = ``;
    let html3 : string = `<table>`;
    let html4 : string =``;

    let desperdicios : string[] = [];
    let estacion : string[] = [];
    let desperdicio_unico : string[] = [];
    let estacion_unico : string[] = [];
    let bd_estacion : string[] = [];
    let bd_departamento : string[] = [];
    let contador_estacion : number = 0;
    let contador_bd_desperdicio : number = 0;
    let contador_desperdicio : number = 0;
    let categoria : string[] = [];
    let colores : number = 0;
    let high_impact : number = 0;
    let medium_impact : number = 0;
    let low_impact : number = 0;
    let no_impact : number = 0;

    items1.forEach((item1:Estacion) => {
      bd_estacion.push(item1.Estacion);
      bd_departamento.push(item1.Departamento);
      contador_estacion++;
    });

    html3 += `
      <tr>
        <td style="min-width:35px;"></td>
        <td style="min-width:125px;"></td>
        <td style="min-width:125px;"></td>
        <td style="min-width:125px;"></td>
        <td style="min-width:125px;"></td>
        <td style="min-width:175px;"></td>
        <td style="min-width:125px;"></td>
        <td style="min-width:125px;"></td>
        <td style="min-width:125px;"></td>`

    for (let index = 0; index < bd_departamento.length; index++) {
      html3+=`<td style="min-width:100px">${bd_departamento[index]}</td>`
    }

    html3+=`
      </tr>
      `

    html3 += `
    <tr>
      <td></td>
      <td>MACROCATEGORIA</td>
      <td>CATEGORIA</td>
      <td>DESPERDICIO</td>
      <td>UNIDAD</td>
      <td>DEFINICION</td>
      <td>CAUSAL LOSS</td>
      <td>RESULTAN LOSS</td>
      <td>C/R</td>`

    for (let index = 0; index < bd_estacion.length; index++) {
      html3+=`<td>${bd_estacion[index]}</td>`
    }

    html3+=`
    </tr>
    `

    items.forEach((item: BD_Desperdicio) => {
      desperdicios.push(`${item.DESPERDICIO}`);
      estacion.push(`${item.ESTACION}`);
      contador_bd_desperdicio++;
    });

    items2.forEach((item2: Desperdicio) => {
      categoria.push(item2.CATEGORIA);
      
      html3 += `
      <tr>
        <td>${contador_desperdicio+1}</td>
        <td>${item2.MACROCATEGORIA}</td>
        <td>${item2.CATEGORIA}</td>
        <td>${item2.DESPERDICIO}</td>
        <td>${item2.UNIDAD}</td>
        <td class="${styles.min_max_height}">${item2.DEFINICION_DESPERDICIO}</td>
      `

      if (item2.CAUSALIDAD == "C") {
        html3 += `
          <td style="background-color:skyblue;">C</td>
          <td></td>
          <td style="background-color:skyblue;">C</td>
        `
      } else if (item2.CAUSALIDAD == "R") {
        html3 += `
          <td></td>
          <td style="background-color: rgb(203, 182, 0);">R</td>
          <td style="background-color: rgb(203, 182, 0);">R</td>
        `
      } else {
        html3 += `
          <td style="background-color:skyblue;">C</td>
          <td style="background-color: rgb(203, 182, 0);">R</td>
          <td>CR</td>
        `
      }

      for (let index = 0; index < bd_estacion.length; index++) {
        for (let index1 = 0; index1 < desperdicios.length; index1++) {
          if ((desperdicios[index1]==item2.DESPERDICIO)&&(estacion[index1]==bd_estacion[index])) {
            colores++;
          }
        }
        //html3+=`<td>${colores}</td>`;
        if (colores==0) {
          no_impact++;
          html3 += `<td class="${styles.center}"><div class="${styles.circ_blanco}">${colores}</div></td>`;
        } else if (colores==1) {
          low_impact++;
          html3 += `<td class="${styles.center}"><div class="${styles.circ_verde}">${colores}</div></td>`;
        } else if (colores==2){
          medium_impact++;
          html3 += `<td class="${styles.center}"><div class="${styles.circ_amarillo}">${colores}</div></td>`;
        } else {
          high_impact++;
          html3 += `<td class="${styles.center}"><div class="${styles.circ_rojo}">${colores}</div></td>`;
        }
        colores=0;
      }

      html3 += `</tr>`;

      contador_desperdicio++;
    });

    html += `${contador_desperdicio}`;
    html1 += `${contador_estacion}`;
    html2 += `${contador_desperdicio*contador_estacion}`;
    html3 += `</table>`;

    html4 += `
    <table>
      <tr>
        <td>HIGH IMPACT</td>
        <td style="width:70px;text-align:center;">
          <div style="background-color: red; color:red; text-align:center; width:25%; border-radius:1em; border:2px solid black; margin:auto;">||</div>
        </td>
        <td style="width:45px;">${high_impact}</td>
        <td style="width:55px;">${(high_impact/(low_impact+no_impact+medium_impact+high_impact)*100).toFixed(2)}%</td>
      </tr>
      <tr>
        <td>MEDIUM IMPACT</td>
        <td style="text-align:center;">
          <div style="background-color: yellow; color:yellow; text-align:center; width:25%; border-radius:1em; border:2px solid black; margin:auto;">||</div>
        </td>
        <td>${medium_impact}</td>
        <td>${(medium_impact/(low_impact+no_impact+medium_impact+high_impact)*100).toFixed(2)}%</td>
      </tr>
      <tr>
        <td>LOW IMPACT</td>
        <td style="text-align:center;">
          <div style="background-color: green; color:green; text-align:center; width:25%; border-radius:1em; border:2px solid black; margin:auto;">||</div>
        </td>
        <td>${low_impact}</td>
        <td>${(low_impact/(low_impact+no_impact+medium_impact+high_impact)*100).toFixed(2)}%</td>
      </tr>
      <tr>
        <td>NO IMPACT</td>
        <td style="text-align:center;">
          <div style="background-color: white; color:white; text-align:center; width:25%; border-radius:1em; border:2px solid black; margin:auto;">||</div>
        </td>
        <td>${no_impact}</td>
        <td>${(no_impact/(low_impact+no_impact+medium_impact+high_impact)*100).toFixed(2)}%</td>
      </tr>    
    </table>
    `


    desperdicio_unico = desperdicios.filter((item,i,ar)=>ar.indexOf(item)===i);
    estacion_unico = estacion.filter((item,i,ar)=>ar.indexOf(item)===i);

    const nlossess: Element = this.domElement.querySelector('#n_lossess');
    nlossess.innerHTML = html;

    const nprocessess: Element = this.domElement.querySelector('#n_processess');
    nprocessess.innerHTML = html1;

    const totaltotal: Element = this.domElement.querySelector('#total');
    totaltotal.innerHTML = html2;

    const RankingDesperdicios: Element = this.domElement.querySelector('#tabla_ranking');
    RankingDesperdicios.innerHTML = html3;

    const footer : Element = this.domElement.querySelector('#footer');
    footer.innerHTML = html4;
  }

  private renderrankingestacionesAsync(): void {
    this.getEstaciones().then((response1)=>{
      this.getBDDesperdicios().then((response) => {
        this.getDesperdicios().then((response2)=> {
          this.render_ranking_estaciones(response1.value,response.value,response2.value);
        });
      });
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.container}">
      <div class="${styles.encabezado}">
        <div class="${styles.a_matrix}">A MATRIX</div>
        <div class="${styles.enc}">
          <div class="${styles.enc_izq}">n losses</div>
          <div class="${styles.enc_der}" id="n_lossess"></div>
        </div>
        <div class="${styles.enc}">
          <div class="${styles.enc_izq}">n processess</div>
          <div class="${styles.enc_der}" id="n_processess"></div>
        </div>
        <br>
        <div class="${styles.enc}">
          <div class="${styles.enc_izq}">Total</div>
          <div class="${styles.enc_der}" id="total"></div>
        </div>
      </div>

      <br>
      <br>

      <span id="tabla_ranking"></span>

      <br>
      <br>

      <div class="footer" id="footer"></div>
    </div>`;

    this.renderrankingestacionesAsync();
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
