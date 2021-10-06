console.log("Successfully loaded the JS file!")

// Fetch the splash screen buttons =========================
const splash = document.querySelector(".splash")
const splashButtons = {
    minus: splash.querySelectorAll("#minus").item(0),
    plus: splash.querySelectorAll("#plus").item(0)
}

const errorButtons = {
    minus: splash.querySelectorAll("#minus").item(1),
    plus: splash.querySelectorAll("#plus").item(1)
}

console.log(`splashButtons`, splashButtons)
console.log(`errorButtons`, errorButtons)
//====================================================

// Fetch the content divs ============================

const content = document.querySelectorAll(".box")

//====================================================

// Button click eventListeners
splashButtons.minus.addEventListener("click", event => {
    // Show error screen and hide splash    
})

splashButtons.plus.addEventListener("click", () => {
    // Hide splash and make it non-clickable
    splash.style.visibility = "hidden"
    console.log("Hid splash element!", splash)
    
})

// errorButtons.minus.addEventListener("click", () => {
    
// })

// errorButtons.plus.addEventListener("click", () => {
    
// })

// Content div event listeners ========================
content.forEach((div,key) => {
    div.addEventListener("click", () => {
        
        

    })
})
// ====================================================
