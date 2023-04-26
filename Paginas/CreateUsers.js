import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import firebase from '../database/firebase'

import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../database/firebase';

const CreateUsers = (props) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const [state, setstate] = useState({
        nombre: '',
        apellidoPaterno:'',
        apellidoMaterno: '',
        edad: '',
        correoElectronico: '',
        telefono: '',
        contraseña: '',
        confcontraseña: ''

    })


    const saveNewUsers = () =>{
        
        if (state.contraseña !== state.confcontraseña){
            Alert.alert('Error Contraseña')
        }else{

            firebase.db.collection('UsuariosClientes').doc(state.correoElectronico).set({
                
                nombre: state.nombre,
                apellidoPaterno: state.apellidoPaterno,
                apellidoMaterno: state.apellidoMaterno,
                edad: state.edad,
                correoElectronico: state.correoElectronico,
                telefono: state.telefono
            })

            createUserWithEmailAndPassword(auth, state.correoElectronico, state.contraseña)
            .then((userCredential) => {
            })
            .catch(error => {
            Alert.alert(error.message)
            })

            Alert.alert('Usuario Creado')

            props.navigation.navigate('Login');
        }
    }

    const handleChangeText = (name, value) => {
        setstate({ ...state, [name]: value})
    }

    
    return (
       <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Nombre" onChangeText={(value) => handleChangeText('nombre', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Apellido Paterno" onChangeText={(value) => handleChangeText('apellidoPaterno', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Apellido Materno" onChangeText={(value) => handleChangeText('apellidoMaterno', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Edad" onChangeText={(value) => handleChangeText('edad', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Numero de Telefono" onChangeText={(value) => handleChangeText('telefono', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Correo Electronico" onChangeText={(value) => handleChangeText('correoElectronico', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Contraseña" onChangeText={(value) => handleChangeText('contraseña', value)} secureTextEntry={true}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Confirmar Contraseña" onChangeText={(value) => handleChangeText('confcontraseña', value)} secureTextEntry={true}/>
        </View>
    
        <View>
            <Button title="Crear" onPress={() => saveNewUsers()}/>
        </View>
       </ScrollView>
       
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default CreateUsers