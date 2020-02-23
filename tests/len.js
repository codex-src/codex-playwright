import emoji from "emoji-trie"

function len(str) {
	let length = 0
	for (let index = 0; index < str.length;) {
		const substr = str.slice(index)
		const rune = emoji.atStart(substr) || [...substr][0]
		length++
		index += rune.length
	}
	return length
}

export default len
