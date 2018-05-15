// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:4040/api/',
  ASSETS_URL: 'http://localhost:4040/',
  firebase: {
    apiKey: 'AIzaSyB39qnA96wOBt_Rtr_Uy-ReMya2LL4gycY',
    authDomain: 'vila-monte-viso-43dac.firebaseapp.com',
    databaseURL: 'https://vila-monte-viso-43dac.firebaseio.com',
    projectId: 'vila-monte-viso-43dac',
    storageBucket: 'vila-monte-viso-43dac.appspot.com',
    messagingSenderId: '872816137215'
  }
};
