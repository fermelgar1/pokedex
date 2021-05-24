import axios from 'axios'
import React from 'react'
import {
	Text,
	Image,
	TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from '../style/Styles.jsx'

const Poke = ({ pokemon, openPokemonDetails }) => {
	const [infoPokemon, setInfoPokemon] = React.useState()

	const obtenerPokeInfo = async () => {
		try {
			const localRes = await AsyncStorage.getItem(pokemon.url)
			if (localRes !== null) {
				const localResJson = JSON.parse(localRes)
				setInfoPokemon(localResJson)
			} else {
				const res = await axios.get(pokemon.url)
				setInfoPokemon(res.data)
				const resString = JSON.stringify(res.data)
				await AsyncStorage.setItem(pokemon.url, resString)
			}
		} catch (error) {
			console.log(`error`, error)
		}

	}

	React.useEffect(() => {
		obtenerPokeInfo()
	}, [])

	return (
		<TouchableOpacity style={styles.pokemon} onPress={() => openPokemonDetails(infoPokemon)}>
			{
				infoPokemon &&
				<Image
					style={styles.logo}
					source={{
						uri: infoPokemon.sprites.front_default,
					}} />
			}
			<Text>
				{pokemon.name}
			</Text>
		</TouchableOpacity>
	)
}

export default Poke
