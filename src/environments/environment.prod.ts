export const environment = {
  production: true,
  api: {
    endpoint: "TODO",
  },
  spid: {
    endpoint: "TODO",
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
    key: "TODO",
  },
};
