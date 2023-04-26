import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from 'react-native-elements';

const Descripcion = (props) => {

    const [user, setUsers] = useState({
        id: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        edad: '',
        correoElectronico: '',
        telefono: '',
        cualidades: '',
        biografia: '',
        fotoPerfil:''

    });

    const [loading, setloading] = useState(true);

    const getUsersById = async (id) => {
         const dbRef = firebase.db.collection('UsuariosServidores').doc(id)
         const doc = await dbRef.get();
         const user = doc.data();
         setUsers({
            ...user,
            id: doc.id

         });
         setloading(false)
    };

    useEffect(() => {
        getUsersById(props.route.params.userId);
    })

    if (loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#5684FA"/>
            </View>
        )
    }

    return(
        <ScrollView style={styles.container}>
       
       <Avatar source={user.fotoPerfil}  rounded size={220} />
             <ListItem.Content>
                <ListItem.Title >{user.nombre} {user.apellidoPaterno} {user.apellidoMaterno} ({user.edad} años)</ListItem.Title>
                <ListItem.Subtitle>{user.correoElectronico}</ListItem.Subtitle>
                <ListItem.Subtitle>{user.telefono}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content>
            <ListItem.Title >{user.biografia}</ListItem.Title>
            <ListItem.Subtitle>{user.cualidades}</ListItem.Subtitle>
            </ListItem.Content>


       </ScrollView>
    )
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

export default Descripcion