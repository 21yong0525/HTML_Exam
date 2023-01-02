function call_js(){
let slideshow = document.querySelector('.slides');
let slides = document.querySelectorAll('.slides a');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let indicators = document.querySelectorAll('.indicator a');
let slideSize = 101;
let currenIndex = null;
let timer = null;
let slideCount = slides.length;

for(let i=0; i<slideCount; i++) {
  let newLeft = i * slideSize + '%';
  slides[i].style.left = newLeft;
}

function gotoSlide(index){
  currenIndex = index;
  let newLeft = index * -slideSize + '%';
  slideshow.style.left = newLeft;

  if (index == 0) {
    prev.classList.add('active');
    next.classList.remove('active');
  } else if (index == 3) {
    next.classList.add('active');
    prev.classList.remove('active');
  } else {
    next.classList.remove('active');
    prev.classList.remove('active');
  }

  indicators.forEach((obj) => obj.classList.remove('active'));

  indicators[index].classList.add('active');
}

function startTimer() {
  timer = setInterval(()=> {
    let nextIndex = (currenIndex + 1) % slideCount;
    gotoSlide(nextIndex);
  }, 3000)
}

gotoSlide(0);

startTimer();

slideshow.addEventListener('mouseenter', ()=> clearInterval(timer));

slideshow.addEventListener('mouseleave', ()=> startTimer());

// prev

prev.addEventListener('mouseenter', ()=> clearInterval(timer));

prev.addEventListener('mouseleave', ()=> startTimer());

prev.addEventListener('click', (e)=>{
  e.preventDefault();
  currenIndex--;

  if(currenIndex < 0) {
    currenIndex = 3
  }

  gotoSlide(currenIndex);
});

// next

next.addEventListener('mouseenter', ()=> clearInterval(timer));

next.addEventListener('mouseleave', ()=> startTimer());

next.addEventListener('click', (e)=>{
  e.preventDefault();
  currenIndex++;

  if(currenIndex > 3) {
    currenIndex = 0
  }

  gotoSlide(currenIndex);
});

// indicators

indicators.forEach((obj, index)=>{
  obj.addEventListener('click', (e)=>{
    e.preventDefault;
    gotoSlide(index)
  })

  obj.addEventListener('mouseenter', ()=> clearInterval(timer));

  obj.addEventListener('mouseleave', ()=> startTimer());
})

}