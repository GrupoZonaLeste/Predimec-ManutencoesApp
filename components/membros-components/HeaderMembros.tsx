import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'

export default function Membros() {
    return(
        <>
            <View style={styles.headerMembros}>
                <Text style={styles.titulosMembros}>Membros</Text>
                <TouchableOpacity style={styles.btnAddMembro}><Text style={{color: 'white', fontSize: 40}}>+</Text></TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerMembros: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        maxHeight: 100
    },
    titulosMembros: {
        fontSize: 50,
        fontWeight: '900'
    },
    btnAddMembro: {
        backgroundColor: 'orange',
        padding:10,
        borderRadius: 10
    }
})