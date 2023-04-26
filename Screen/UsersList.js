import React, {useEffect, useState} from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const UsersList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('UsuariosClientes').onSnapshot(querySnapshot => {
            const users = [];

            querySnapshot.docs.forEach(doc => {
                const {nombre, apellidoPaterno, apellidoMaterno, correoElectronico, telefono, edad} = doc.data()
                users.push({
                    id: doc.id,
                    nombre,
                    apellidoPaterno,
                    apellidoMaterno,
                    correoElectronico,
                    telefono,
                    edad
                    

                })
            });

            setUsers(users)  
        });
    }, []);
    return (
        <ScrollView>
            
            {
                users.map(users => {
                    return(
                        <ListItem key={users.id} bottomDivider onPress={() => {
                            props.navigation.navigate('UsersDel',{
                            userId: users.id
                            })
                        }}>
                            <ListItem.Chevron/>
                            <Avatar source={{url: 'gs://work-56dd4.appspot.com/Usuarios/CtB2AcBXgAQXUz2.jpg'}} rounded/>
                            <ListItem.Content>
                                <ListItem.Title>{users.nombre} {users.apellidoPaterno} {users.apellidoMaterno} ({users.edad} años)</ListItem.Title>
                                <ListItem.Subtitle>{users.correoElectronico}</ListItem.Subtitle>
                                <ListItem.Subtitle>{users.telefono}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            <Button title='Nuevo Usuario' onPress={() => props.navigation.navigate('Agregar Usuario')}/>
        </ScrollView>
    );
};

export default UsersList