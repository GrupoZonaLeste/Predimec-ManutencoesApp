import {View, StyleSheet} from 'react-native'
import HeaderMembro from "../components/membros-components/HeaderMembros";
import MembroItem from '../components/membros-components/MembroItem';

export default function Membros() {
    const data = {
        nome: 'TESTENOME',
        dataCriacao: '00/00/0000',
        login: '123@123',
        senha: '0123456',
    }

    return(
        <>
            <HeaderMembro/>
            <View>
                <MembroItem nome={data.nome} dataCriacao={data.dataCriacao} login={data.login} senha={data.senha}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    containerLista: {

    }
})