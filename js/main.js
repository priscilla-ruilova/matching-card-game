
let winCount = document.querySelector('.winner span');
let lossCount = document.querySelector('.loser span');

let message = document.querySelector('.message');


//we're building some pseudostates 
let cards = ['heyArnold.jpg','jimmyNeutron.jpg','oddParents.jpg','rugrats.jpg','spongeBob.jpg','heyArnold.jpg','jimmyNeutron.jpg','oddParents.jpg','rugrats.jpg','spongeBob.jpg']; //we're going to come back and store images here
let firstCard = null; 
let waiting = false; 

let wins = 0;
let losses = 0;
let matches = 0;

//we're going to build game logic! Great way to test object oriented programming play games! Fallout, Sims...

//this function will re-start the game
function dealCards(){
    let deck = cards.slice(); //here we're creating a copy of the array to use with following logic 
    firstCard = null; //we're affirming the variables above. low redundancy 
    waiting = false;
    matches = 0;
    message.textContent = '';

    //this is the basic algorithm for randomization
    document.querySelectorAll('.card').forEach((element) =>{
        const randomNumber = Math.floor(Math.random() * deck.length);
        const randomPicture = deck.splice(randomNumber, 1)[0];
        console.log(randomPicture)

        //the following restarts the game
        element.src = 'css/' + encodeURIComponent(randomPicture);
        element.alt = ''
        element.classList.add('hidden');
        element.classList.remove('picked');
    })
}

document.querySelectorAll('.flipper').forEach((playable) =>{
    playable.addEventListener('click', turnOver);
})

document.querySelector('.redo').addEventListener('click', dealCards);

function turnOver(event){
    if(waiting) return; //this is a check condtional so we don't run through the function
    const imgElement = event.currentTarget.querySelector('img');
    if(!imgElement.classList.contains('hidden'))return; //this is also a check conditional

    imgElement.classList.remove('hidden')
    imgElement.alt = ''

    if(!firstCard){
        firstCard = imgElement;
        imgElement.classList.add('picked');
        return
    }
    if(imgElement.src === firstCard.src){
        firstCard.classList.remove('picked');
        firstCard = null;
        matches += 1;
        if(matches === cards.length/2){
            wins += 1;
            winCount.textContent = wins;
            message.textContent = 'Winner!'
        }
        return
    }
    //this will reset it everytime we don't have a match
    const previousCard = firstCard;
    firstCard = null;
    waiting = true;

    //this turns the cards over if they are not a match and it makes the first card into previous card
    setTimeout(()=>{
        imgElement.classList.add('hidden');
        previousCard.classList.add('hidden');

        imgElement.alt = ''
        previousCard.alt = ''

        //the following will remove the class of picked which makes it turn over
        previousCard.classList.remove('picked');

        waiting = false;
        losses += 1;
        lossCount.textContent = losses;
    }, 700)
}
dealCards()



