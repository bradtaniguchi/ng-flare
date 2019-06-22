import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WindowInjectorService {
  constructor(private firestore: AngularFirestore) {}

  /**
   * Injects some properties to the window property so they are available
   * globally. This is mainly needed for testing.
   */
  public init() {
    (window as any).firestore = this.firestore.firestore;
  }
}
