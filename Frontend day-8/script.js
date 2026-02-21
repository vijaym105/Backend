let mouseFollower = document.querySelector('.mouseFollow');

let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove',(e) =>{
    mouseX= e.clientX
    mouseY= e.clientY
   
})

function ani(){
    mouseFollower.style.transform = `translate(${mouseX}px,${mouseY}px)`

    requestAnimationFrame(ani)
}

ani()