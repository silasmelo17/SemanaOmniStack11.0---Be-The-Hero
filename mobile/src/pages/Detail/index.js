import React from 'react'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'

import styles from './styles'
import logoImg from '../../assets/logo.png'

function Detail () {
    const navigation = useNavigation()
    const route = useRoute()
    const incident = route.params.incident
    const value = Intl.NumberFormat( 'pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format( incident.value )

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${value}.`

    function navigateBack () {
        navigation.goBack()
    }

    function sendEmail () {
        MailComposer.composeAsync({
            subject: "Assunto do e-mail",
            recipients: [incident],
            body: message
        })
    }

    function sendWhatsApp () {
        Linking.openURL( `whatsapp://send?phone=55${incident.whatsapp}&text=${message}` )
    }   

    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity style={styles.navigateBack} onPress={ navigateBack } >
                    <Feather name='arrow-left' size={28} color='#e02041' />
                </TouchableOpacity>
            </View>
            
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]} >ONG:</Text>
                <Text style={styles.incidentValue} >
                    { incident.name } de {incident.city}/{incident.uf}
                </Text>

                <Text style={styles.incidentProperty} >CASO:</Text>
                <Text style={styles.incidentValue} >{ incident.title }</Text>

                <Text style={styles.incidentProperty} >VALOR:</Text>
                <Text style={styles.incidentValue} >{ value }</Text>
            </View>
            

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle} >Salve o dia!</Text>
                <Text style={styles.heroTitle} >Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription} >Entre em contato:</Text>

                <View style={styles.actions} >
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

export default Detail
