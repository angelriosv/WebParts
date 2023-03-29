declare interface IUpdatePdmWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'UpdatePdmWebPartStrings' {
  const strings: IUpdatePdmWebPartStrings;
  export = strings;
}
