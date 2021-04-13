// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    endpoint: "http://localhost:4000",
  },
  spid: {
    endpoint: "http://localhost:8099",
    identityProviders: [
      {
        id: "idp_testenv2",
        name: "Test",
      },
    ],
  },
  stripe: {
    key: "pk_test_51Ic4kwGdWrrPtBPn3lXc66hQOt6lJ3SXtQzt6fW6Uwq9ggyxGQTEFSppWo3aoZPIusK0qA2wuFRotlw2tguXMOaV00HO35N4KG",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
