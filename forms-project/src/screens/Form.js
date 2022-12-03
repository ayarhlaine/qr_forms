import { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native';

const FormScreen = ({ route, navigation  }) => {
    const { documentNo, formInputs, title } = route.params;
    const [data, setData] = useState({});
    const onTextInputChange = (name, value) => {
        setData(Object.assign(data, { [name]: value }));
    }
    const onSubmit = () => {
        alert(JSON.stringify(data));
        fetch(
        "https://1fybsr.deta.dev/forms", 
        {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, documentNo, data
            })
        })
        .then((response) => {

        })
        .catch(error => {
            console.log(error);
        })
    }
    const inputs = formInputs.map((formInput) =>
        <View key={formInput.fieldName} style={styles.inputContainer}>
            <Text style={{ fontSize: 14 }}>{formInput.label} :</Text>
            <TextInput
                style={styles.input}
                onChangeText={(value) => onTextInputChange(formInput.fieldName, value)}
                value={data[formInput.fieldName]}
            />
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.documentNoContainer}>
                <Text style={{ flex: 1, fontSize: 16 }}>Document No :</Text>
                <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 16 }}>{documentNo}</Text>
            </View>
            <View style={styles.line}></View>
            <ScrollView style={styles.scrollView}>
                {
                    inputs
                }
            </ScrollView>
            <View style={styles.line}></View>
            <Button title='Submit' onPress={onSubmit}/>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    documentNoContainer: {
        display: 'flex',
        flexDirection: 'row'
    },  
    line: {
     height: 3,
     marginTop: 10,
     marginBottom: 10,
     backgroundColor: '#000'
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        height: 40,
        marginTop: 5,
        borderWidth: 1,
        padding: 10
    },
    scrollView: {

    }
  });
export default FormScreen;