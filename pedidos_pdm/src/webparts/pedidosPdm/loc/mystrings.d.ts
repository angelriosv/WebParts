declare interface IPedidosPdmWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'PedidosPdmWebPartStrings' {
  const strings: IPedidosPdmWebPartStrings;
  export = strings;
}
