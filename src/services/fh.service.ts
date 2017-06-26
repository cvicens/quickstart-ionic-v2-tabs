import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/Rx";

import * as $fh from 'fh-js-sdk';

const INIT_EVENT = 'fhinit';

@Injectable()
export class FHService {
  private _ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly ready: Observable<boolean> = this._ready.asObservable();

  constructor() {
    $fh.on(INIT_EVENT, (event) => {
      console.log('Service ready with url:', this.getUrl());
      if (typeof this.getUrl() === 'undefined') {
        this._ready.next(false);  
      } else {
        this._ready.next(true);
      }
    });
  }

  getUrl = () => {
    return $fh.getCloudURL();
  }


  auth = (policyId:string, appId:string, username: string, password: string) => {
    return new Promise<any>(function(resolve, reject) {
        // LDAP or Platform User Example
        $fh.auth({
          "policyId": policyId, // name of auth policy to use - see link:{ProductFeatures}#administration[Auth Policies Administration] for details on how to configure an auth policy
          "clientToken": appId, // Your App ID
          "params": { // the parameters associated with the requested auth policy - see below for full details.
            "userId": username, 
            "password": password 
          }
        }, function (res) {
          // Authentication successful - store sessionToken in variable
          var sessionToken = res.sessionToken; // The platform session identifier
          var authResponse = res.authResponse; // The authentication information returned from the authentication service.
          // This may include things such as validated email address,
          // OAuth token or other response data from the authentication service
          resolve(res);
        }, function (msg, err) {
          console.log('LOGIN ERROR: ', JSON.stringify(msg), JSON.stringify(err));
          var errorMsg = err.message;
          /* Possible errors:
            unknown_policyId - The policyId provided did not match any defined policy. Check the auth policies defined. See link:{ProductFeatures}#administration[Auth Policies Administration]
            user_not_found - The auth policy associated with the policyId provided has been set up to require that all users authenticating exist on the platform, but this user does not exists.
            user_not_approved - - The auth policy associated with the policyId provided has been set up to require that all users authenticating are in a list of approved users, but this user is not in that list.
            user_disabled - The user has been disabled from logging in.
            user_purge_data - The user has been flagged for data purge and all local data should be deleted.
            device_disabled - The device has been disabled. No user or apps can log in from the requesting device.
            device_purge_data - The device has been flagged for data purge and all local data should be deleted.
          */
          if (errorMsg === "user_purge_data" || errorMsg === "device_purge_data") {
            // User or device has been black listed from administration console and all local data should be wiped
          } else {
            //alert("Authentication failed - " + errorMsg);
          }
          reject(err);
        });
    });
  }

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