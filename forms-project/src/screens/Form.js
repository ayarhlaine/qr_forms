import { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../api';

const FormScreen = ({ route, navigation  }) => {
    const { documentNo, formInputs, title, defaultValues } = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const onTextInputChange = (name, value) => {
        setData(Object.assign(data, { [name]: value }));
    }
    const onSubmit = () => {
        setLoading(true);
        api.post('/forms', {
                title, documentNo, data: Object.assign(data, defaultValues),
            })
            .then((response) => {
                if(response.status === 201) {
                    setLoading(false);
                    setData({});
                    navigation.navigate('Home')
                } else {
                    setLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }
    
    const inputs = formInputs.map((formInput) =>
        <View key={formInput.fieldName} style={styles.inputContainer}>
            <Text style={{ fontSize: 14 }}>{formInput.label} :</Text>
            {
                defaultValues[formInput.fieldName] !== undefined ?
                <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 16 }}>{defaultValues[formInput.fieldName]}</Text>   :
                <TextInput
                style={styles.input}
                onChangeText={(value) => onTextInputChange(formInput.fieldName, value)}
                value={data[formInput.fieldName]}
            />
            }
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
            <TouchableOpacity onPress={onSubmit} style={styles.button} disabled={loading}>
                <Text style={{ color: '#fff', textTransform: 'uppercase', fontWeight: 'bold' }}>Submit</Text>
                { loading && <ActivityIndicator size="large" style={{ marginLeft: 20 }}/> }
            </TouchableOpacity>
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
     backgroundColor: '#68BD47'
    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        height: 40,
        marginTop: 5,
        borderWidth: 1,
        padding: 10
    },
    scrollView: {

    },
    button: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgb(33, 150, 243)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
  });
export default FormScreen;