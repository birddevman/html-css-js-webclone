const $prevbtn = document.querySelector('.ads-main .prev')
const $nextbtn = document.querySelector('.ads-main .next')
const $adsmain = document.querySelector('.ads-items')
const $adscount = document.querySelector('.ads-items').childElementCount
const $pagenation = document.querySelector('.pagination')


function movePage(currentpage) {
    $adsmain.style.transform = `translateX(${-1500 * currentpage}px)`
};

function createChildElements(parentElement, count, option) {
    // option<object> {element: <string>, clssName: <string>}
    let fragEl = document.createDocumentFragment()
    for (let i = 0; i < count; i++) {
        const $El = document.createElement(option.element)
        if (option.className === undefined) {
            fragEl.appendChild($El)
        } else {
            $El.classList.add(option.className)
            fragEl.appendChild($El)
        }
    }
    parentElement.appendChild(fragEl)
}
function addActive(elements, addOrder){    
    elements[addOrder].classList.add('active')
}

function removeActive(elements, removeOrder){    
    elements[removeOrder].classList.remove('active')
}


new Promise((res, err) => {
    createChildElements($pagenation, $adscount, {
        element: 'span',
        className: 'pagelist'
    }) 
    res()  
}).then(function(){
    let currentpage = 0;
    const $childEl = document.querySelectorAll('.pagelist')
    $childEl[0].classList.add('active')

    $prevbtn.addEventListener('click', function (e) {
        if (currentpage === 0) {
            e.preventDefault()
        } else {
            removeActive($childEl, currentpage) 
            currentpage -= 1;
            addActive($childEl, currentpage)
            movePage(currentpage);
        }
    })

    $nextbtn.addEventListener('click', function (e) {
        if (currentpage === ($adscount - 1)) {
            currentpage = 0;
            $adsmain.style.removeProperty('transform')
        } else { 
            removeActive($childEl, currentpage)           
            currentpage += 1
            addActive($childEl, currentpage)
            movePage(currentpage);
        }
    })
})



