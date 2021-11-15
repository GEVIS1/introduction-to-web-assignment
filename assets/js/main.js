console.log("Successfully loaded the JS file!")


/*
 
  ██████ ██    █████████████████    ██    ████████████████     ███████████████████████████ ██████ ███████ 
 ██    ████    ████     ██   ████  ██     ██     ██     ██     ██    ██        ██  ██    ████   ████      
 ██    ████    ███████  ██████  ████      ████████████  ██     █████ ██        ██  ██    ████████ ███████ 
 ██ ▄▄ ████    ████     ██   ██  ██            ████     ██     ██    ██        ██  ██    ████   ██     ██ 
  ██████  ██████ █████████   ██  ██       ██████████████████████████████████   ██   ██████ ██   █████████ 
     ▀▀                                                                                                   
                                                                                                          
 
*/
const splash = document.querySelector(".splash")
const splashContent = splash.querySelector(".splash-content")
const splashButtons = {
    minus: splashContent.querySelectorAll(".buttons > .minus"),
    plus: splashContent.querySelectorAll(".buttons > .plus")
}

const error = splash.querySelector(".error")
const errorButtons = {
    minus: splash.querySelectorAll(".buttons > .minus"),
    plus: splash.querySelectorAll(".buttons > .plus")
}

const body = document.querySelector("body")
const grid = document.querySelector(".grid")
const content = document.querySelectorAll(".box")
const gridEndPos = "1 / 1 / span 4 / span 5"

console.log(`splashButtons`, splashButtons)
console.log(`errorButtons`, errorButtons)
console.log(`content`, content)
//====================================================

/*
 
 ██    ██ █████ ██████ ██ █████ ██████ ██     ██████████████ 
 ██    ████   ████   ██████   ████   ████     ██     ██      
 ██    ███████████████ ███████████████ ██     █████  ███████ 
  ██  ██ ██   ████   ██████   ████   ████     ██          ██ 
   ████  ██   ████   ██████   ████████ █████████████████████ 
                                                             
                                                             
 
*/
    // Boolean flag storing if the last click was on content or the document body
    let notContent = false

    // This variable stores the element currently selected in the second layout
    // It will be null if we are not in the first layout
    let selectedElement = null;

    // This boolean is used to check what layout we are in
    let secondLayout = false;
//====================================================

// Button click eventListeners =======================
splashButtons.minus.item(0).addEventListener("click", event => {
    // Show error screen and hide splash    
})

splashButtons.plus.item(0).addEventListener("click", () => {
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

/*
 
 █████████    ████████████    ██████████    ██     ███████████████████████████    ███████████████ ███████ 
 ██     ██    ████     ████   ██   ██       ██     ████        ██   ██     ████   ████     ██   ████      
 █████  ██    ███████  ██ ██  ██   ██       ██     █████████   ██   █████  ██ ██  ███████  ██████ ███████ 
 ██      ██  ██ ██     ██  ██ ██   ██       ██     ██     ██   ██   ██     ██  ██ ████     ██   ██     ██ 
 ███████  ████  █████████   ████   ██       ████████████████   ██   █████████   █████████████   █████████ 
                                                                                                          
                                                                                                          
 
*/

/*
 
   ___          _      
  | _ ) ___  __| |_  _ 
  | _ \/ _ \/ _` | || |
  |___/\___/\__,_|\_, |
                  |__/ 
 
*/

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

    // If we clicked on the body and we are in the second layout
    if (notContent && secondLayout){
        secondLayout = false
        selectedElement = null
        console.log("This div is not content! Going back to default layout.")
        content.forEach(div => {
            // Animating the copy of the div ============
                // Make a copy of the div 
                const copy = createCopy()

                // Save the content div's location
                const start = div.getBoundingClientRect()
                
                // We are not in the default layout, so go back to it
                div.removeAttribute("style")

                // Save the content div's new location
                const end = div.getBoundingClientRect()

                // Animate it to the new location
                animate(div, copy, start, end)
            //===========================================
        })
    }
})
//=====================================================

/*
 
    ___         _           _   
   / __|___ _ _| |_ ___ _ _| |_ 
  | (__/ _ \ ' \  _/ -_) ' \  _|
   \___\___/_||_\__\___|_||_\__|
                                
 
*/
/**
 * Add an on click event listener to each div in the grid.
 */
content.forEach((div) => {
    div.addEventListener("click", event => {
        
        // Only animate if we are not in the second layout, or we are in the second layout and an un-focused div was clicked
        if (!secondLayout || event.target != selectedElement) {
            // Position all the divs
            content.forEach((div) => {

                // Create a copy of the div
                const copy = createCopy()

                // If it's not the clicked div put it in the right most column
                if (div != event.target) {

                    // Save the content div's location
                    const start = div.getBoundingClientRect()                    
                    // Move the content div
                    div.style.gridColumn = "6 / span 1"
                    div.style.gridRow = "span 1"
                    // Save the content div's new location
                    const end = div.getBoundingClientRect()
                    // Animate it to the new location
                    animate(div, copy, start, end)
                }
                // Put the clicked div on the left and animate it
                else {
                    // Store the clicked div in selectedElement
                    selectedElement = div
                    // Set the secondLayout flag to true
                    secondLayout = true
                    // Save the content div's location
                    const start = div.getBoundingClientRect()
                    // Move the content div
                    div.style.gridArea = gridEndPos;
                    // Save the content div's new location
                    const end = div.getBoundingClientRect()
                    // Animate the copy like it was the content div
                    animate(div, copy, start, end)
                }
            })
        }
    })
})
// ====================================================

/*
 
 █████████    █████    ██ ████████████████ ██████ ███    █████████ 
 ██     ██    ██████   ████        ██   ████    ██████   ████      
 █████  ██    ████ ██  ████        ██   ████    ████ ██  █████████ 
 ██     ██    ████  ██ ████        ██   ████    ████  ██ ██     ██ 
 ██      ██████ ██   ████ ██████   ██   ██ ██████ ██   ███████████ 
 
*/

/**
 * Fakes the tweened movement of div from startPos to endPos by moving a clone in its place.
 * The div will be hidden and the copy visible at the start and once the animation is over the copy is hidden,
 * the div is shown and then the copy is deleted from the DOM.
 * @param {HTMLDivElement} div 
 * @param {HTMLDivElement} copy 
 * @param {DOMRect} startPos 
 * @param {DOMRect} endPos 
 */
const animate = (div, copy, startPos, endPos) => {

    // Hide the content div before animating
    div.style.visibility = "hidden"

    let copyAnimation = copy.animate(
        {
            visibility: ["visible","visible"],
            top:    [startPos.top + "px",      endPos.top + "px"],
            left:   [startPos.left + "px",     endPos.left + "px"],
            width:  [startPos.width + "px",    endPos.width + "px"],
            height: [startPos.height + "px",   endPos.height + "px"]
        }, 300)

    copyAnimation.onfinish = () => {
        copy.style.top = endPos.top + "px"
        copy.style.left = endPos.left + "px"
        copy.style.width = endPos.width + "px"
        copy.style.height = endPos.height + "px"
        // Hide the copy once it's done its job
        copy.style.visibility = "hidden"
        // Show the moved div
        div.style.visibility = "visible"
        // Erase the copy
        grid.removeChild(copy)
    } 
}

/**
 * Find a div's current gridArea
 * @param {HTMLDivElement} div 
 * @returns gridArea
 */
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

/**
 * Make a copy of a div and append it to the grid
 * @returns A reference to the copy div element
 */
const createCopy = () => {
    const copy = document.createElement("div")
    copy.classList.add("copy")
    grid.append(copy)
    return copy
}