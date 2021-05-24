import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
	logo: {
		width: 80,
		height: 70,
	},
	scrollView: {
		marginHorizontal: 20,
	},
	pokemon: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginHorizontal: 15,
		marginVertical: 10
	}, container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	top: {
		flex: 1,
		backgroundColor: 'red',
		alignItems: 'center',
	},
	titulo: {
		alignSelf: 'center'
	},
	pokemonsContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		paddingBottom: 20,
		marginBottom: 20,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "row",
		
	},
	footer:{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 10,
		marginVertical: 5
	},
})

export { styles }