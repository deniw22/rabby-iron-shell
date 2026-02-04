import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

// [SURGERY] App Entry Point for the Ghost (Iron Shell Injection)
const App = () => {
  useEffect(() => {
    const initSight = async () => {
      // @ts-ignore
      if (window.AndroidBridge) {
        // @ts-ignore
        const publicAddress = await window.AndroidBridge.getPublicAddress();
        if (publicAddress) {
          console.log("[SURGERY] Ghost Sight: " + publicAddress);
          // Redirect to Main with this address
        }
      }
    };
    initSight();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <Text style={{ color: '#fff', fontSize: 18 }}>GHOST TERMINAL</Text>
      <Text style={{ color: '#666', marginTop: 10 }}>Initializing Sight...</Text>
    </View>
  );
};

export default App;
