import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// Services (they have to be added to the providers array in ../../app.component.ts)
import { FHService } from '../../services/fh.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fhReady: boolean;
  name: string;
  helloMessage: string = '';

  constructor(public navCtrl: NavController, private fhService: FHService) {
    this.fhService.ready.subscribe(value => this.fhReady = value);
  }

  sayHello () {
    if (!this.fhReady) {
      console.log('FHService not ready yet!');
      this.helloMessage = 'Red Hat Map Service not ready yet, try again please ;-)';
      return;
    }

    console.log('Before calling hello endpoint');

    this.helloMessage = 'Before calling...';

    this.fhService.sayHello('hello', 'POST', this.name)
    .then( (result) => {
      console.log('result', result);
      this.helloMessage = result.msg.toUpperCase();
    })
    .catch( (err) => {
      console.log(err);
      this.helloMessage = JSON.stringify(err);
    });

  }

}
