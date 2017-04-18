import { Injectable } from '@angular/core';

import * as $fh from 'fh-js-sdk';

@Injectable()
export class FHService {
    sayHello = (endpoint: string, method: string, name: string) => {
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
}