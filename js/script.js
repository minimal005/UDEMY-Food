window.addEventListener('DOMContentLoaded', ()=>{

// Tabs-----------------------------------------------------
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

// Timer-----------------------------------------------------
const deadLine = '2024-01-01'

function getTimeRemaining(endTime){
    let days, hours, minutes, seconds
    const t = Date.parse(endTime) - new Date() // різниця в мсек
    
    if(t <= 0){
        days = 0
        hours = 0
        minutes = 0
        seconds = 0
    } else {
        days = Math.floor(t / 1000 / 60 / 60 / 24) // кількість днів до завершення
        hours = Math.floor((t / 1000 / 60 / 60) % 24)
        minutes = Math.floor((t / 1000 / 60) % 60)
        seconds = Math.floor((t / 1000) % 60)
    } 
    return {
        total: t,
        days,
        hours,
        minutes,
        seconds
    }
}

function getZero (num){
    if (num >=0 && num <10){
        return `0${num}`
    } else {
        return num
    }
}
function setClock(selector, endtime){
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000)
        updateClock()

    function updateClock(){
        const t = getTimeRemaining(endtime)

        days.innerHTML = getZero(t.days)
        hours.innerHTML = getZero(t.hours)
        minutes.innerHTML = getZero(t.minutes)
        seconds.innerHTML = getZero(t.seconds)

        if(t.total <= 0 ) clearInterval(timeInterval)
    }
}
setClock('.timer', deadLine)




})