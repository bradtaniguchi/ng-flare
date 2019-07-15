import { FirebaseOptions } from '@angular/fire';

export interface Config {
  /**
   * The latest git commit
   */
  revision: string;
  /**
   * The latest git tag, if there is one
   */
  tag: string;
  /**
   * The version, parsed from the tag
   */
  tagVersion: string;
  /**
   * The build environment, parsed from the tag, should be
   * provided for context. Use the environment properties instead.
   */
  tagBuildEnvironment: string;
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
