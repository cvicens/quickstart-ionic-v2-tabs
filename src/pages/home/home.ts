import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as $fh from 'fh-js-sdk';

let IMAGES = {
    'HELLO CARLOS': 'card-amsterdam',
    'HELLO PEDRO': 'card-madison',
    'HELLO PAOLO': 'card-saopaolo',
    DEFAULT: 'card-sf'
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: string;
  helloMessage: string = '';
  cardImage: string = 'assets/images/' + IMAGES['DEFAULT'] + '.png';

  constructor(public navCtrl: NavController) {

  }

  delay(ms: number) {
    return new Promise<void>(function(resolve) {
        setTimeout(resolve, ms);
    });
  }

  hello = (endpoint: string, method: string, name: string) => {
    return new Promise<any>(function(resolve, reject) {

      var params = {
          path: endpoint,
          method: method,
          contentType: "application/json",
          data: { hello: name },
          timeout: 15000
        };

        $fh.cloud(
          params, 
          function(data) {
            resolve(data);
          }, 
          function(msg, err) {
            // An error occurred during the cloud call. Alert some debugging information
            console.log('Cloud call failed with error message:' + msg + '. Error properties:' + JSON.stringify(err));
            reject({msg: msg, err: err});
          });
    });
  }

  sayHi () {
    console.log('Before calling hello endpoint');

    this.helloMessage = 'Before calling...';

    this.hello('hello', 'POST', this.name)
    .then( (result) => {
      console.log('result', result);
      this.helloMessage = result.msg.toUpperCase();
      if (result && result.msg && IMAGES[result.msg.toUpperCase()]) {
        this.cardImage = 'assets/images/' + IMAGES[result.msg.toUpperCase()] + '.png';
      } else {
        this.cardImage = 'assets/images/' + IMAGES['DEFAULT'] + '.png';
      }
    })
    .catch( (err) => {
      console.log(err);
      this.helloMessage = JSON.stringify(err);
    });

  }

}
