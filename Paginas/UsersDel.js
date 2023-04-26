import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TextInput
} from "react-native";
import firebase from "../database/firebase";
import { getAuth} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../database/firebase';

const UsersDel = (props) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const [user, setUsers] = useState({
        id: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        edad: '',
        telefono: '',
        contraseña: '',
        confcontraseña: ''

    });

    const [loading, setloading] = useState(true)

    const getUsersById = async (id) => {
        const dbRef = firebase.db.collection("UsuariosClientes").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUsers({
            ...user,
            id: doc.id,
        });
        setloading(false);
    };

    const deleteUser = async () => {
       const dbRef = firebase.db.collection('UsuariosClientes').doc(props.route.params.userId);
       await dbRef.delete();
       props.navigation.navigate('Login');
    }

    const updateUser = async () => {


        if (user.contraseña !== user.confcontraseña){
            Alert.alert('Error Contraseña')

        }else{ 
      
            setUsers({
                id: '',
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                edad: '',
                telefono: '',
                contraseña: '',
                confcontraseña: ''
        
            });

            const dbRef = firebase.db.collection("UsuariosClientes").doc(props.route.params.userId);
            await dbRef.set({
                    nombre: user.nombre,
                    apellidoPaterno: user.apellidoPaterno,
                    apellidoMaterno: user.apellidoMaterno,
                    correoElectronico: props.route.params.userId,
                    edad: user.edad,
                    telefono: user.telefono
            })



            

           Alert.alert('Guardado')
            props.navigation.navigate('Login');
        }
    }

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar el Usuario','¿Esta Seguro?', [
            {text: 'Si', onPress: () => deleteUser()}, 
            {text: 'No', onPress: () => console.log(false)}
        ])
    }

    useEffect(() => {
        getUsersById(props.route.params.userId);
    }, []);

    const handleChangeText = (name, value) => {
        setUsers({ ...user, [name]: value});
    };

    if (loading){
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Nombre" value={user.nombre} onChangeText={(value) => handleChangeText('nombre', value)}
             
            />
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Apellido Paterno"  value={user.apellidoPaterno} onChangeText={(value) => handleChangeText('apellidoPaterno', value)}
            
            />
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Apellido Materno" value={user.apellidoMaterno} onChangeText={(value) => handleChangeText('apellidoMaterno', value)}
                
            />
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Edad" value={user.edad} onChangeText={(value) => handleChangeText('edad', value)}
                
            />
        </View>
       
        <View style={styles.inputGroup}>
            <TextInput placeholder="Numero de Telefono" value={user.telefono} onChangeText={(value) => handleChangeText('telefono', value)}
                
            />
        </View>
        
        <View style={styles.inputGroup}>
            <TextInput placeholder="Contraseña"  onChangeText={(value) => handleChangeText('contraseña', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Confirmar Contraseña" onChangeText={(value) => handleChangeText('confcontraseña', value)}/>
        </View>
        
        <View>
            <Button
                color="#19AC52" 
                title="Guardar" 
                onPress={() => updateUser()}
            />
        </View>
        <View>
           
        </View>
       </ScrollView>
    );
};

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
    },
})

export default UsersDel
