// Variables globables:
var password = "";
var output = "ㅤ";
var clicksnd = new Audio("sound/move.mp3");
var opensnd = new Audio("sound/open.mp3");
var closesnd = new Audio("sound/close.mp3");
var fanfaresnd = new Audio("sound/fanfare.mp3");
var purrsnd = new Audio("sound/purr.mp3");

function refresh()
{
    /// CREA UNA CONTRASEÑA ALEATORIA ///
    // Para saber si comienza con "L" o con "R":
    let startswith = Math.floor(Math.random() * 2);
    var currentCharacter = "";
    if (startswith == 0) currentCharacter = "L"
    else currentCharacter = "R"
    password = ""

    // Para rellenar cada dígito:
    for (let digit = 1; digit <= 4; digit++)
    {
        // Genera la cantidad de movimientos:
        let movements = Math.floor(Math.random() * 6) + 1;
        for (let movement = 1; movement <= movements; movement++)
        {
            password += currentCharacter;
        }
        
        // Cambia el caracter:
        if (currentCharacter == "L") currentCharacter = "R";
        else currentCharacter = "L";
        password += " ";
    }

    // Escribe la contraseña en la barra de texto:
    document.getElementById("password-text").innerHTML = password;   

    // Refresca la barra de output:
    document.getElementById("output-text").innerHTML = "ㅤ";

    // Cambia el svg a la caja cerrada:
    this.document.querySelector("img[name=box]").src = "img/box-closed.svg";
    closesnd.play();
}

function moveLeft()
{
    // Agrega una "L" al output y refresca en pantalla:
    output += "L";
    document.getElementById("output-text").innerHTML = output;
}
function moveRight()
{
    // Agrega una "R" al output y refresca en pantalla:
    output += "R";
    document.getElementById("output-text").innerHTML = output;
}

function reset()
{
    // Borra la barra de output:
    output = "ㅤ";
    document.getElementById("output-text").innerHTML = output;

    // Cambia el svg a la caja cerrada:
    document.querySelector("img[name=box]").src = "img/box-closed.svg";
    closesnd.play();
}


/// Está al pendiente de la presión de teclas:
window.addEventListener("keydown", function (eventkey)
{
    if (eventkey.code === "ArrowLeft" || eventkey.code === "KeyL")
    {
        var button = this.document.getElementById("left-button");
        button.classList.add("active-press");
        button.classList.add("active-left");
    }
    else if (eventkey.code === "ArrowRight" || eventkey.code === "KeyR")
    {
        var button = this.document.getElementById("right-button");
        button.classList.add("active-press");
        button.classList.add("active-right");
    }
    else if (eventkey.code === "Enter" || eventkey.code === "Space")
    {
        var button = this.document.getElementById("reset-button-id");
        button.classList.add("active-reset-press");
        window.setTimeout(function()
        {
            button.classList.remove("active-reset-press");
            
        }, 200);
    }
});
window.addEventListener("keyup", function (eventkey)
{
    if (eventkey.code === "ArrowLeft" || eventkey.code === "KeyL")
    {
        var button = this.document.getElementById("left-button");
        button.classList.remove("active-left");
        button.classList.remove("active-press");
        clicksnd.play();
        moveLeft();
    }
    else if (eventkey.code === "ArrowRight" || eventkey.code === "KeyR")
    {
        var button = this.document.getElementById("right-button");
        button.classList.remove("active-right");
        button.classList.remove("active-press");
        clicksnd.play();
        moveRight();
    }
    else if (eventkey.code === "Enter" || eventkey.code === "Space")
    {
        reset();
    }
    else if (eventkey.code == "KeyA")
    {
        open();
    }
});

function open()
{
    // Cambia el svg a la caja abierta:
    this.document.querySelector("img[name=box]").src = "img/box-opened.svg";

    // Reproduce los sonidos de victoria:
    opensnd.play();
    fanfaresnd.play();
    purrsnd.play();

    // Muestra la ventana con el gato:
    console.log(jQuery("#victory").modal("show"));
}

function closeok()
{
    // Pausa la fanfarria:
    fanfaresnd.pause();
    fanfaresnd.currentTime = 0;
}

function meow()
{
    // Selecciona aleatoriamente UN miau de CINCO para reproducir:
    let meow = Math.floor(Math.random() * 5) + 1;
    meowsnd = new Audio("sound/meow"+meow+".mp3");
    meowsnd.play();
}