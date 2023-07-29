# SonnetMuse

SonnetMuse is a React-WebApp that helps users to write Shakespearean Sonnets.

## Working

SonnetMuse has predefined set of inputs fields- 14 lines for the sonnet and one each for title and author name.

+ As the user types in the lines, the number of syllables is counted.
+ If the number of syllables is 10,then the rhyming scheme is checked.
+ If both number of syllables and rhyming scheme is correct, then the pair of lines is blue and italicised. Else the color is red.
+ As the user is writing a line, a list of suggested rhyming words is being displayed on the right side
+ There is also a option of searching meaning of words.

If the sonnet follows the rules, then there is a download button that allows for downloading of the sonnet in .pdf form.

## Link


## APIs used

+ [Datamuse API](https://www.datamuse.com/api/) for rhyming word suggestions
+ [Free Dictionary API](https://dictionaryapi.dev/) for word meanings

## Future Updates

There are plans to allow users to define their poem structures (both syllable count and rhyming schemes) as well as length of the poem. 
