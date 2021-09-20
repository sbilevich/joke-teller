
const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

function tellMe(joke) {
    VoiceRSS.speech({
        key: '6ac8d50330484e0cb7f11002817d1be7',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
async function getJoke() {
    let joke = ''
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`
        } else {
            joke = data.joke
        }
        tellMe(joke);
        toggleButton();
    }
    catch (error) {
        console.log(error)
    }
}

function toggleButton() {
    button.disabled = !button.disabled
}

button.addEventListener('click', getJoke)
audioElement.addEventListener('ended', toggleButton)