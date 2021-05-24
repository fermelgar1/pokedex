import React from 'react'
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native'
import axios from "axios"
import Poke from './Poke.jsx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from '../style/Styles.jsx'

const Index = ({ navigation }) => {
	const [pokemones, setPokemones] = React.useState([])
	const [lastPokemon, setLastPokemon] = React.useState(0)
	const [searchValues, setSearchValues] = React.useState([])
	const [searchName, setSearchName] = React.useState('')

	const openPokemonDetails = (infoPokemon) => {
		navigation.push('PokemonDetails', {
			infoPokemon: infoPokemon
		})
	}

	const obtenerPokemon = async (lastPokemon) => {
		try {
			const localRes = await AsyncStorage.getItem(`https://pokeapi.co/api/v2/pokemon?offset=${lastPokemon}&limit=50`)
			if (localRes !== null) {
				const localResJson = JSON.parse(localRes)
				setPokemones(localResJson)
				setSearchValues(localResJson)
			} else {
				const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${lastPokemon}&limit=50`)
				setSearchValues([...res.data.results])
				setPokemones([...res.data.results])
				const resString = JSON.stringify(res.data.results)
				await AsyncStorage.setItem(`https://pokeapi.co/api/v2/pokemon?offset=${lastPokemon}&limit=50`, resString)
			}
		} catch (error) {
			console.log(`error`, error)
		}
	}

	const NextPokemons = () => {
		setLastPokemon(lastPokemon + 50)
	}

	const previousPokemons = () => {
		lastPokemon >= 50 && setLastPokemon(lastPokemon - 50)
	}

	const search = async (text) => {
		const searchValue = text.toLowerCase()
		setSearchName(searchValue)
		try {
			if (isNaN(searchValue)) {
				const searchResults = searchValues.filter(pokemon => (pokemon.name.includes(searchValue)))
				setPokemones([...searchResults])
			} else if (!searchValue.trim()) {
				setPokemones([...searchValues])
			} else {
				setLastPokemon(searchValue - 1)
			}
		} catch (error) {
			console.log(`error`, error)
		}
	}

	const searchNameFuction = async () => {
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchName}/`)
		const idPokemon = res.data.id
		// console.log(`id ${idPokemon}, searchName ${searchName}`)
		setLastPokemon(idPokemon - 1)
	}


	React.useEffect(() => {
		obtenerPokemon(lastPokemon)
	}, [lastPokemon])

	return (
		<ScrollView style={styles.scrollView}>
			<TextInput
				onChangeText={(text) => search(text)}
				style={styles.input}
				onSubmitEditing={() => searchNameFuction()}
			/>
			<View style={styles.pokemonsContainer}>
				{
					pokemones.map(item => (
						<Poke key={item.name} pokemon={item} openPokemonDetails={openPokemonDetails} />
					))
				}
			</View>
			<View style={styles.footer}>
				<TouchableOpacity onPress={() => previousPokemons()}>
					<Text>Previous</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => NextPokemons()}>
					<Text>Next</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

export default Index
