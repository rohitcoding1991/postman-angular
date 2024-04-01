import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class SharedService {

  constructor() {

  }

  baseUrl(){
    return environment.apiUrl;
  }

}
