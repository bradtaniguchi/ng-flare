import { FirebaseOptions } from '@angular/fire';

export interface Config {
  /**
   * The latest git commit
   */
  revision: string;
  /**
   * The date the build was generated
   */
  date: Date | string;
  /**
   * The version of angular the app was built with
   */
  version: string;
  /**
   * The firebase configs to pass to the module
   */
  firebase: FirebaseOptions;
}
