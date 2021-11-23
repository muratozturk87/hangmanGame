const word_e1 = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_e1= document.getElementById("success-massage");
const wrongLetters_e1 = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");
const correctLetters= [];
const wrongLetters = [];
let selectedWord= getRandomWord();


/* kayıtlı kelimeleri random olarak getiren method */
function getRandomWord() {
    const words = ["javascript","html","php","css","oracle","phyton"];

    return words[Math.floor(Math.random()*words.length)];
}
/***********************/

/* kelimeleri ve basılan harfleri ekranda gösteren method */
function displayWord() {
    word_e1.innerHTML=`
        ${selectedWord.split('').map(letter => `
        <div class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
        </div>`).join('')}
    `;
   const w = word_e1.innerText.replace(/\n/g,'');// alt satıra geçen karakteri siliyoruz
   if (w === selectedWord) {
       popup.style.display="flex";
       message_e1.innerText="YOU WON";
   }
}
/***********************/


/* hatalı girilen harfleri güncelleyen method */
function updateWrongLetters() {
    wrongLetters_e1.innerHTML=`
        ${wrongLetters.length > 0 ? "<h3>WRONG LETTERS</h3>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    /* hatalı harflerde çöp adamın çizilişi */
    items.forEach((item,index) => {
        const errorCount= wrongLetters.length; // hatalı girilen harflerin sayısını aldık

        if (index < errorCount) {
            item.style.display="block";
        } else {
            item.style.display="none";
        }
    });
    /***********************/

    /* yanlış harf girişi sayısı kontrolü */

    if (wrongLetters.length === items.length) {
        popup.style.display="flex";
       message_e1.innerText="YOU LOST";
    }

    /***********************/

}
/***********************/

/* uyarı mesaj kutusunun belirli bir süre sonra kaybolmasını sağlayan method */

    function displayMessage() {
        /*uyarı mesajını gösteriyoruz */
        message.classList.add("show");

        /* 2sn sonra uyarı kutusunu yok ediyoruz */
        setTimeout(function () {
            message.classList.remove("show");
        },2000)
        
    }



/***********************/


/* Oyunu yeniden başlatan event */

    playAgainBtn.addEventListener("click",function () {
        correctLetters.splice(0);//doğru girilen harfleri sıfırladık
        wrongLetters.splice(0);// yanlış girilen harfleri sıfırladık

        selectedWord = getRandomWord();// kelimeleri yeniden yüklüyoruz
        displayWord();// kelimeleri harfleri ekranda gösteriyoruz
        updateWrongLetters();// yanlış girilen harfleri güncelliyoruz

        popup.style.display="none";// açılan mesaj kutusunu kapatıyoruz

    });


/***********************/



/* klavyeden basılan tuşları alan event */
window.addEventListener("keydown",function (e) {

    if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 222 || e.keyCode == 220 || e.keyCode == 186 || e.keyCode == 219 || e.keyCode == 221 || e.keyCode == 191) {
      
        const letter = e.key;
        
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }else{
                // uyarı mesaj kutusunu gösteren method
                displayMessage();
                
            }
        }else{
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                // uyarı mesaj kutusunu gösteren method
                displayMessage();
            }
        }

    }

    
})
/***********************/

displayWord();