function updateCountdown() {

    const now = new Date();

    let target = new Date();

    const hour = now.getHours();

    if(hour < 9){

        target.setHours(9,0,0,0);

    }else if(hour < 14){

        target.setHours(14,0,0,0);

    }else if(hour < 18){

        target.setHours(18,0,0,0);

    }else{

        target.setDate(target.getDate()+1);
        target.setHours(9,0,0,0);

    }

    const diff = target-now;

    const h = Math.floor(diff/1000/60/60);
    const m = Math.floor(diff/1000/60)%60;
    const s = Math.floor(diff/1000)%60;

    document.getElementById("countdown").textContent =
        `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

}

setInterval(updateCountdown,1000);

updateCountdown();
