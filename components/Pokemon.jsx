import React from 'react'
import {
	Text,
	View,
	Image
} from 'react-native'
import { styles } from '../style/Styles.jsx'

const Pokemon = ({ route, navigation }) => {
	const { infoPokemon } = route.params
	
	return (
		<View style={{
			display: 'flex',
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			{infoPokemon ?
				<View>
					<View style={styles.container}>
						<Image
							style={styles.logo}
							source={{
								uri: infoPokemon.sprites.front_default,
							}}
						/>
						<View>
							<Text>
								#
								{infoPokemon.id < 10 && `00${infoPokemon.id}`}
								{infoPokemon.id < 100 && infoPokemon.id >= 10 && `0${infoPokemon.id}`}
								{infoPokemon.id >= 100 && `${infoPokemon.id}`}
							</Text>
							<Text>
								{infoPokemon.name}
							</Text>
						</View>
					</View>
					<View>
						<Text> type: </Text>
						{infoPokemon.types.map(item => (
							<Text key={item.slot}>{item.type.name}</Text>
						))}
					</View>
				</View>
				:
				<Text>
					this Pokemon it's not in your device and you do not have internet conection
				</Text>
			}
		</View>
	)
}

export default Pokemon