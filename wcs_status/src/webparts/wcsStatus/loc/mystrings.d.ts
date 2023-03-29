declare interface IWcsStatusWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  pillar_link_label : string;
  pillar_list_label : string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'WcsStatusWebPartStrings' {
  const strings: IWcsStatusWebPartStrings;
  export = strings;
}
