import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './UpdatePdmWebPart.module.scss';
import * as strings from 'UpdatePdmWebPartStrings';

export interface IUpdatePdmWebPartProps {
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

export default class UpdatePdmWebPart extends BaseClientSideWebPart<IUpdatePdmWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private getPedidos(): Promise<PedidosPDMs> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/pedidos_pdm/_api/web/lists/GetByTitle('BD_PEDIDOS_PDM_SOLUCIONES')/items", SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      return response.json();
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
    <div class="container">
      <div>CÓDIGO DE LA SOLICITUD</div>
      <input type="text" disbled value="CODIGO PRUEBA"></input>
      <div>TIPO DE SOLUCIÓN</div>
      <input type="text" disbled value="TIPO DE SOLUCION"></input>
      <div>SOLUCIÓN</div>
      <input type="text" disbled value="SOLUCION"></input>
      <div>MÉTODO</div>
      <input type="text" disbled value="METODO"></input>
      <div>CANTIDAD</div>
      <input type="text" disbled value="1.5"></input>
      <div>UNIDADES</div>
      <input type="text" disbled value="UNIDADES"></input>
      <div>SOLUCIÓN</div>
      <input type="text" disbled value="SOLUCION"></input>
    </div>`;
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
