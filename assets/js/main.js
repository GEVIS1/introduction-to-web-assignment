console.log("Successfully loaded the JS file!")

// Fetch elements =========================
const splash = document.querySelector(".splash")
const splashButtons = {
    minus: splash.querySelectorAll("#minus").item(0),
    plus: splash.querySelectorAll("#plus").item(0)
}

const errorButtons = {
    minus: splash.querySelectorAll("#minus").item(1),
    plus: splash.querySelectorAll("#plus").item(1)
}

const body = document.querySelector("body")
const grid = document.querySelector(".grid")
const content = document.querySelectorAll(".box")
const copy = document.querySelector(".copy")
const endPos = "1 / 1 / span 4 / span 5"

console.log(`splashButtons`, splashButtons)
console.log(`errorButtons`, errorButtons)
console.log(`content`, content)
console.log(`copy`, copy)
//====================================================

// Variables =========================================
let notContent = false
//====================================================

// Button click eventListeners =======================
splashButtons.minus.addEventListener("click", event => {
    // Show error screen and hide splash    
})

splashButtons.plus.addEventListener("click", () => {
    // Hide splash and make it non-clickable
    splash.style.visibility = "hidden"
    console.log("Hid splash element!", splash)
    // Fade in the body
    grid.classList.add('body-fade-in')
})

// errorButtons.minus.addEventListener("click", () => {
    
// })

// errorButtons.plus.addEventListener("click", () => {
    
// })
//====================================================

// Body event listener ================================
body.addEventListener("click", event => {

    notContent = true
    
    // Make sure we did not click on content
    content.forEach( div => {
        if (div == event.target) 
        {
            console.log("This div is content!")
            notContent = false
        }
    })

    console.log('notContent', notContent)
    console.log(content)
    if (notContent){
        content.forEach(div => {
            // Break if we're in the default layout
            if (div.getAttribute("style") == null) return

            // We are not in the default layout, so go back to it
            div.removeAttribute("style")
        })
    }
})
//=====================================================

// Content div event listeners ========================
content.forEach((div) => {
    div.addEventListener("click", event => {
        console.log("You clicked on:", event.target)
        console.log("Changing column layout!")
        //const startPos = findGridPos(event.target)

        // Position all the divs
        content.forEach((div) => {
            
            // If it's not the clicked div put it in the right most column
            if (div != event.target) {
                div.style.gridColumn = "6 / span 1"
                div.style.gridRow = "span 1"
            }
            // Put the clicked div on the left
            else {
                div.style.gridArea = endPos;
            }
        })

        // animate(event.target, startPos)
    })
})
// ====================================================

// Functions ==========================================
const animate = (div, startPos) => {
    div.style.gridArea = startPos.gridArea
    
    let copyStart = 
    {
        top: div.getBoundingClientRect().top,
        left: div.getBoundingClientRect().left,
        right: div.getBoundingClientRect().right,
        bottom: div.getBoundingClientRect().bottom
    }
    
    let animation = div.animate([
    {
        gridArea: startPos.gridArea
    },
    {
        gridArea: endPos.gridArea
    }
], 300)

    animation.onfinish = () => {
        div.style.gridArea = endPos.gridArea
    }

    let copyEnd = 
    {
        top: div.getBoundingClientRect().top,
        left: div.getBoundingClientRect().left,
        right: div.getBoundingClientRect().right,
        bottom: div.getBoundingClientRect().bottom
    }
    let copyanimation = copy.animate([
        {
            top: copyStart.top + "px",
            left: copyStart.left + "px",
            height: copyStart.height + "px",
            width: copyStart.width + "px"
        },
        {
            top: copyEnd.top + "px",
            left: copyEnd.left + "px",
            height: copyEnd.height + "px",
            width: copyEnd.width + "px"
        }
    ], 300)
    
    console.log(copyStart, copyEnd)

    copyanimation()
    
}

// Function to find a div's current gridArea
const findGridPos = div => {
    const index = Array.from(content).indexOf(div)
    console.log("The index of the clicked div is:", index)
    let gridArea

    if (content[index].style.gridArea == undefined) {
        const rowStart = index < 3 ? 1 : 3
        const rowSpan = 2
        const rowItems = index < 3 ? 0 : 2
        const columnSpan = index < 3 ? 3 : 2
        const columnStart = index - rowItems
        gridArea = `${rowStart} / ${columnStart} / span ${rowSpan} / span ${columnSpan}`
    }
    else {
        gridArea = div.style.gridArea
    }
    console.log(`gridArea`, gridArea)
    return gridArea
}