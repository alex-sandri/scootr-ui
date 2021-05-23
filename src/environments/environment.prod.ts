export const environment = {
  production: true,
  api: {
    endpoint: "https://api.scootr.it",
  },
  cie: {
    identityProviderId: "xx_servizicie",
  },
  spid: {
    endpoint: "https://spid.scootr.it",
    identityProviders: [
      {
        id: "arubaid",
        name: "Aruba ID",
      },
      {
        id: "infocertid",
        name: "Infocert ID",
      },
      {
        id: "intesaid",
        name: "Intesa ID",
      },
      {
        id: "lepidaid",
        name: "Lepida ID",
      },
      {
        id: "namirialid",
        name: "Namirial ID",
      },
      {
        id: "posteid",
        name: "Poste ID",
      },
      {
        id: "sielteid",
        name: "Sielte ID",
      },
      {
        id: "spiditalia",
        name: "SPIDItalia Register.it",
      },
      {
        id: "timid",
        name: "Tim ID",
      },
    ],
  },
  stripe: {
    key: "pk_test_51Ic4kwGdWrrPtBPn3lXc66hQOt6lJ3SXtQzt6fW6Uwq9ggyxGQTEFSppWo3aoZPIusK0qA2wuFRotlw2tguXMOaV00HO35N4KG",
  },
};
