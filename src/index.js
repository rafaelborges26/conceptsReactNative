import React, {useEffect, useState} from 'react'
import { FlatList ,SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native' //ScrollView n utilizar em listas

import api from './services/api'


export default function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data)
            setProjects(response.data)
        })
    }, [])

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Rafael Borges'
        })

        const project = response.data

        setProjects([...projects, project])
    }

    return ( 
        <>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF"/>

        <SafeAreaView style={styles.container}>
            <FlatList 
                data={projects}
                keyExtractor={project => project.id }
                renderItem={({ item: project }) => (
                    <Text style={styles.project} > {project.title}</Text>
                )}
            />
            <TouchableOpacity 
                activeOpacity={0.6}
                style={styles.button}
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText} >Adicionar Projeto</Text>
            </TouchableOpacity>
        </SafeAreaView>
            </>
           )
}
            

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        //justifyContent: "center",
        //alignItems: "center"
    },
    project: {
        color: '#FFF',
        fontSize: 24
    },
    button: {
        margin: 20,
        backgroundColor: '#FFF',
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,

    }

})