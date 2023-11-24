'use strict'
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


// Modal-----------------------------------------------------------
const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close')

function openModal (){
    modal.classList.toggle('show')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId)
}
function closeModal(){
    modal.classList.toggle('show')
    document.body.style.overflow = ''
}

modalTrigger.forEach(btn => {
    btn.addEventListener('click', ()=>{
        openModal()
})                                                                                                  
})

modalCloseBtn.addEventListener('click', closeModal)

modal.addEventListener('click', (e)=>{
    if(e.target === modal){
        closeModal()
    }
})

document.addEventListener('keydown', (e)=>{
    if(e.code === 'Escape' && modal.classList.contains('show'))
    closeModal()
})

// const modalTimerId = setTimeout(openModal, 5000)

// Модалка вмикається, коли користувач доскролив до кінця сторінки
// function showModalByScroll(){
//     if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        
//         window.removeEventListener('scroll', showModalByScroll)
//         openModal()
//     }
// }
window.addEventListener('scroll', showModalByScroll)


function sayName(surname){
    console.log(this.name + ' ' + surname);
}

const obj = {
    name: 'John'
}

sayName.call(obj, 'Smith')

function count(num){
    return this*num
}

const double = count.bind(2)
console.log(double(5));

const ob = {
    num:5,
    sayNumber(){
        const say = () => {
            console.log(this.num);
        }
        say()
    }
}
ob.sayNumber()


// Class для карток-------------------------------------------------------

class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes){
        this.src = src
        this.alt = alt
        this.title = title
        this.description = description
        this.price = price
        this.transfer = 27
        this.classes = classes
        this.parent = document.querySelector(parentSelector)
    }
    changeToUAN(){
        return this.price * this.transfer
    }
    render(){
        const element = document.createElement('div')

        if(this.classes.length === 0){
            element.classList.add('menu__item')
        } else {
            this.classes.forEach(className => element.classList.add(className))
        }
        
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.changeToUAN()}</span> грн/день</div>
            </div>`

        this.parent.append(element)
    }
}
    new MenuCard(
        "img/tabs/vegy.jpg",
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
    ).render()
    new MenuCard(
        "img/tabs/elite.jpg",
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        18,
        '.menu .container',
        'menu__item'
    ).render()
    new MenuCard(
        "img/tabs/post.jpg",
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        12,
        '.menu .container',
        'menu__item'
    ).render()

    // 111





})