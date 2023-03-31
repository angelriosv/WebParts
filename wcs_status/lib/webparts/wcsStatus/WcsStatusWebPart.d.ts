import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
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
export default class WcsStatusWebPart extends BaseClientSideWebPart<IWcsStatusWebPartProps> {
    private _isDarkTheme;
    private _environmentMessage;
    private get_list;
    private render_step1;
    private render_step1_async;
    private render_step2;
    private render_step2_async;
    private render_step3;
    private render_step3_async;
    private render_step4;
    private render_step4_async;
    private render_step5;
    private render_step5_async;
    private render_step6;
    private render_step6_async;
    private render_step7;
    private render_step7_async;
    render(): void;
    protected onInit(): Promise<void>;
    private _getEnvironmentMessage;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=WcsStatusWebPart.d.ts.map