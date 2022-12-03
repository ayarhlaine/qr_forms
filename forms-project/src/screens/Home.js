import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const HomeScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [scanned, setScanned] = useState(true);

  
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanning(true);

      try {
        const parsed = JSON.parse(data);
        fetch(`https://1fybsr.deta.dev/forms-config?documentNo=${parsed.documentNo}`)
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            setScanning(false);
            navigation.navigate('Form', {...json});
        })
        .catch((error) => {
            console.log(error);
            setScanning(false);
        });
      } catch (error) {
        console.log(error);
        setScanning(false);
      }

      setScanned(true);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
            {
                scanning ? <ActivityIndicator size="large" /> :
                !scanned ?
                    <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.barCodeReader}
                    />
                    :
                    <View style={styles.emptyBarCodeReader}>
                        <Text>Tap to scan!</Text>
                    </View>
            }
        </View>
        <View style={styles.bottomContainer}>
            <Button title={'Scan'} onPress={() => setScanned(false)} style={styles.buttonScan} disabled={scanning}/>
        </View>
      </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    barCodeReader: {
        flex: 1,
        backgroundColor: '#e3e3e3',
        padding: 5
    },
    emptyBarCodeReader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topContainer: {
        flex: 3,
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttonScan: {

    }
  });

export default HomeScreen;