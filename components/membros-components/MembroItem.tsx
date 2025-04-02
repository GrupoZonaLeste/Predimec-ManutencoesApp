import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

interface MembroItemProps {
    nome: string;
    dataCriacao: string;
    login: string;
    senha: string;
}

export default function MembroItem({nome , dataCriacao, login, senha} : MembroItemProps) {
    return(
        <View style={styles.containerMembroItem}>
            <Text style={styles.tituloMembroItem}>{nome}</Text>
            <View style={styles.infosContainer}>
                <Text style={styles.infosMembroItem}>{dataCriacao}</Text>
                <Text style={styles.infosMembroItem}>Login: {login}</Text>
                <Text style={styles.infosMembroItem}>Senha: {senha}</Text>
            </View>
            <View style={styles.btnsMembroItem}>
                <TouchableOpacity style={styles.btnEditar}><Text>Editar Membro</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btnExcluir}><Text>Excluir Membro</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerMembroItem: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        margin: 20
    },
    tituloMembroItem: {
        fontSize: 30,
        fontWeight: '500'
    },
    infosMembroItem: {
        fontSize: 15
    },
    btnsMembroItem: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnEditar: {
        backgroundColor: 'orange',
        padding: 10,
        width: '45%',
        alignItems: 'center',
        borderRadius: 10
    },
    btnExcluir: {
        backgroundColor: 'red',
        padding: 10,
        width: '45%',
        alignItems: 'center',
        borderRadius: 10
    },
    infosContainer: {
        margin: 10,
        marginLeft: 0
    }
})