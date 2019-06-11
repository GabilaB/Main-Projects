//DOM ELEMENTS

const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');


    // options
    const showAmPm = true


    //SHOW TIME FUNC

    function showTime(){
        let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();


        //SET AM or PM
        const amPm = hour >= 12 ? 'PM':'AM';

        //12hr FORMAT

        hour = hour %12 || 12;

        // OUTPUT TIME
        time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;

        setTimeout(showTime, 1000)
    }


        // ADD ZERO

        function addZero(n){
            return(parseInt(n, 10)<10? '0': '') + n;
        }


        // SET BACKGROUND n GREETING

        function setBackGreet() {
            let today = new Date(),
            hour = today.getHours();

            if(hour < 12){
                // MORNING
                document.body.style.backgroundImage = "url('../img/morning.jpg)";
                greeting.textContent = 'Good Morning';
            }else if(hour <18){
                // AFTERNOON
                document.body.style.backgroundImage = "url('../img/afternoon.jpg)";
                greeting.textContent = 'Good Afternoon';
            } else{
                //EVENING
                document.body.style.backgroundImage = "url('../img/evening.jpg)";
                greeting.textContent = 'Good Evening';
                document.body.style.color = "white"
            }
        }

        // GET NAME FUNC

        function getName(){
            if(localStorage.getItem('name') === null){
                name.textContent = '[Enter name]';
            } else{
                name.textContent = localStorage.getItem('name')
            }
        }


        // SET NAME
        function setName(e){
            if(e.type === 'keypress'){
                // MAKE SURE 'ENTER' is pressed
                if(e.which == 13 || e.keyCode == 13){
                    localStorage.setItem('name', e.target.innerText)
                    name.blur();
                }
            } else{
                localStorage.setItem('name', e.target.innerText)
            }
        }

        // SET NAME
        function setFocus(e){
            if(e.type === 'keypress'){
                // MAKE SURE 'ENTER' is pressed
                if(e.which == 13 || e.keyCode == 13){
                    localStorage.setItem('focus', e.target.innerText)
                    focus.blur();
                }
            } else{
                localStorage.setItem('focus', e.target.innerText)
            }
        }

        // FOCUS

        function getFocus(){
            if(localStorage.getItem('focus') === null){
                focus.textContent = '[Enter Focus]';
            } else{
                focus.textContent = localStorage.getItem('focus')
            }
        }


        name.addEventListener('keypress', setName)
        name.addEventListener('blur', setName)

        focus.addEventListener('keypress', setFocus)
        focus.addEventListener('blur', setFocus)

    //RUN

    showTime()
    setBackGreet()
    getName()
    getFocus()