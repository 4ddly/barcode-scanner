import { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Modal } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function Screen() {
  const [barcode, setBarcode] = useState('');
  const [open, setOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(({ status }) => {
      setHasPermission(status === 'granted');
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      {/* INPUT + ICON */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: 'black',
          width: 280,
          height: 50,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{ flex: 1, fontSize: 18 }}
          placeholder="Scan barcode"
          value={barcode}
        />

        <Pressable onPress={() => setOpen(true)}>
          <Ionicons name="barcode-outline" size={28} color="black" />
        </Pressable>
      </View>

      {/* CAMERA */}
      <Modal visible={open}>
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={({ data }) => {
            setBarcode(data);   // ← barcode goes into input
            setOpen(false);     // ← close camera
          }}
        />
      </Modal>
    </View>
  );
}
