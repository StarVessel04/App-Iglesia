import React, {useEffect, useState} from 'react'
import {ScrollView, Button, StyleSheet } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar, Image } from 'react-native-elements'

const ListaServicios = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('UsuariosServidores').onSnapshot(querySnapshot => {
            const users = [];

            querySnapshot.docs.forEach(doc => {
                const {nombre, apellidoPaterno, apellidoMaterno, servicios, telefono, edad, fotoPerfil} = doc.data()
                users.push({
                    id: doc.id,
                    nombre,
                    apellidoPaterno,
                    apellidoMaterno,
                    servicios,
                    telefono,
                    edad,
                    fotoPerfil
                })
                const uri= users.fotoPerfil
            });

            
            setUsers(users)  
            
        });
        
    }, []);



    return (
        
        <ScrollView>    

        <Button title='Configurar Usuario' key={users.id} bottomDivider onPress={() => {
                            props.navigation.navigate('Configurar Perfil',{userId: props.route.params.userId})
        }}/>

            {
                users.map(users => {
                    return(
                        <ListItem key={users.id} bottomDivider onPress={() => {
                            props.navigation.navigate('Descripcion',{
                            userId: users.id
                            })
                            }}>
                            
                            <Avatar source={users.fotoPerfil} style={[styles.image, StyleSheet.absoluteFill]} rounded/>
                           
                            <ListItem.Content>
                                <ListItem.Title>{users.nombre} {users.apellidoPaterno} {users.apellidoMaterno} </ListItem.Title>
                                <ListItem.Title>({users.edad} años)</ListItem.Title>
                                <ListItem.Subtitle>{users.servicios}</ListItem.Subtitle>
                                <ListItem.Subtitle>Tel.{users.telefono}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 100,
        resizeMode: 'cover',
        left:40
    },

})

export default ListaServicios