import EventEmitter from 'events';
import { KEYRING_TYPE } from './types';

// [SURGERY] AMPOUTATED KeyringService for Stateless Mode
// This version does NOT persist any data to disk.
export class KeyringService extends EventEmitter {
  private store: any;
  private keyrings: any[] = [];

  constructor() {
    super();
    // [SURGERY] Mock store that never saves to disk
    this.store = {
      get: () => ({}),
      set: () => {
        console.log("[SURGERY] Disk write attempt blocked");
      },
    };
  }

  async init() {
    console.log("[SURGERY] KeyringService initialized in Stateless Mode");
    return [];
  }

  async save() {
    console.log("[SURGERY] Save attempt blocked - data kept in RAM only");
  }

  // [SURGERY] Sign Mode Injection
  // Redirects signing to the Android Native Bridge
  async signTransaction(keyring: any, address: string, tx: any) {
    console.log("[SURGERY] signTransaction triggered for: " + address);
    
    // @ts-ignore
    if (window.AndroidBridge && window.AndroidBridge.signTransaction) {
      console.log("[SURGERY] Redirecting to Android.NativeBridge...");
      // @ts-ignore
      const signedTx = await window.AndroidBridge.signTransaction(JSON.stringify(tx));
      return JSON.parse(signedTx);
    } else {
      console.warn("[SURGERY] Native Bridge not found. Transaction aborted.");
      throw new Error("Native Bridge Unavailable");
    }
  }
}

export default new KeyringService();
