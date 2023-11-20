window.addEventListener('DOMContentLoaded', ()=>{

const tabs = document.querySelectorAll('.tabheader__item'),
    tabsParent = document.querySelector('.tabheader__items'),
    tabsContent = document.querySelectorAll('.tabcontent')


function hideTabContent(){
    tabsContent.forEach(item => {
        item.classList.remove('show', 'fade')
        item.classList.add('hide')

    })
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active')
    })
}

function showTabContent(i = 0){
    tabsContent[i].classList.remove('hide')
    tabsContent[i].classList.add('show', 'fade')
    tabs[i].classList.add('tabheader__item_active')
}

hideTabContent()
showTabContent()

tabsParent.addEventListener('click', (e) => {

 if(!e.target.closest('.tabheader__item')) return
 else {
    tabs.forEach((item,i) => {
        if(e.target == item){
            hideTabContent()
            showTabContent(i)  
        }
    })
 }
})





})