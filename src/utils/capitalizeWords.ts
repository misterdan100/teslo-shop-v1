export const capitalizeWords = (word: string) => {

    const arrayWord = word.split(' ')
    const capitlizedArray = arrayWord.map(wordMap => {
        const letter = wordMap[0].toUpperCase()
        const array = wordMap.split('')
        array[0] = letter

        return array.join('')
    })
    return capitlizedArray.join(' ')
}