import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// Services (they have to be added to the providers array in ../../app.component.ts)
import { FHService } from '../../services/fh.service';

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

  constructor(public navCtrl: NavController, private fhService: FHService) {

  }

  sayHello () {
    console.log('Before calling hello endpoint');

    this.helloMessage = 'Before calling...';

    this.fhService.sayHello('hello', 'POST', this.name)
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
