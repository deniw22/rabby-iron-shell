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

  // [SURGERY] Amputated save method
  async save() {
    console.log("[SURGERY] Save attempt blocked - data kept in RAM only");
  }

  // Transaction building logic (Skeleton)
  async signTransaction(keyring: any, address: string, tx: any) {
    console.log("[SURGERY] signTransaction called - waiting for Native Bridge injection");
    // This will be connected to the Android.NativeBridge later
    return tx;
  }
}

export default new KeyringService();
