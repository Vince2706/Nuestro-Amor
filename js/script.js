/* =========================================
   ELEMENTOS PRINCIPALES
========================================= */

const botonComenzar =
    document.getElementById("btnComenzar");

const portada =
    document.getElementById("portada");

const contenido =
    document.getElementById("contenido");


/* =========================================
   COMENZAR
========================================= */

botonComenzar.addEventListener(
    "click",
    function () {

        portada.style.transition =
            "opacity 1s ease";

        portada.style.opacity =
            "0";


        setTimeout(
            function () {

                portada.style.display =
                    "none";

                contenido.classList.remove(
                    "oculto"
                );

                contenido.style.opacity =
                    "0";

                contenido.style.transition =
                    "opacity 1.5s ease";

                window.scrollTo(
                    0,
                    0
                );


                setTimeout(
                    function () {

                        contenido.style.opacity =
                            "1";

                    },
                    50
                );

            },
            1000
        );

    }
);


/* =========================================
   CONTADOR
========================================= */

function actualizarContador() {

    const inicioRelacion =
        new Date(
            2025,
            3,
            20,
            0,
            0,
            0
        );


    const ahora =
        new Date();


    const diferencia =
        ahora - inicioRelacion;


    const segundosTotales =
        Math.max(
            0,
            Math.floor(
                diferencia / 1000
            )
        );


    const dias =
        Math.floor(
            segundosTotales /
            86400
        );


    const horas =
        Math.floor(
            (
                segundosTotales %
                86400
            )
            / 3600
        );


    const minutos =
        Math.floor(
            (
                segundosTotales %
                3600
            )
            / 60
        );


    const segundos =
        segundosTotales %
        60;


    document
        .getElementById("dias")
        .textContent =
        dias;


    document
        .getElementById("horas")
        .textContent =
        horas
            .toString()
            .padStart(
                2,
                "0"
            );


    document
        .getElementById("minutos")
        .textContent =
        minutos
            .toString()
            .padStart(
                2,
                "0"
            );


    document
        .getElementById("segundos")
        .textContent =
        segundos
            .toString()
            .padStart(
                2,
                "0"
            );

}


actualizarContador();


setInterval(
    actualizarContador,
    1000
);


/* =========================================
   ANIMACIONES AL HACER SCROLL
========================================= */

const elementosRevelar =
    document.querySelectorAll(
        ".revelar"
    );


const observador =
    new IntersectionObserver(

        function (entradas) {

            entradas.forEach(

                function (entrada) {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target
                            .classList
                            .add(
                                "visible"
                            );

                    }

                }

            );

        },

        {
            threshold: 0.12
        }

    );


elementosRevelar.forEach(

    function (elemento) {

        observador.observe(
            elemento
        );

    }

);


/* =========================================
   REPRODUCTOR
========================================= */

const audioCancion =
    document.getElementById(
        "audioCancion"
    );


const btnReproducir =
    document.getElementById(
        "btnReproducir"
    );


const iconoPlay =
    document.getElementById(
        "iconoPlay"
    );


const barraProgreso =
    document.getElementById(
        "barraProgreso"
    );


const progresoCancion =
    document.getElementById(
        "progresoCancion"
    );


const puntoProgreso =
    document.getElementById(
        "puntoProgreso"
    );


const tiempoActual =
    document.getElementById(
        "tiempoActual"
    );


const duracionCancion =
    document.getElementById(
        "duracionCancion"
    );


const portadaCancion =
    document.querySelector(
        ".contenedor-portada-cancion"
    );


const estadoCancion =
    document.querySelector(
        ".estado-cancion"
    );


const textoEstado =
    document.getElementById(
        "textoEstado"
    );


/* =========================================
   FORMATEAR TIEMPO
========================================= */

function formatearTiempo(
    segundos
) {

    if (
        isNaN(segundos)
    ) {

        return "0:00";

    }


    const minutos =
        Math.floor(
            segundos / 60
        );


    const segundosRestantes =
        Math.floor(
            segundos % 60
        );


    return (
        minutos +
        ":" +
        segundosRestantes
            .toString()
            .padStart(
                2,
                "0"
            )
    );

}


/* =========================================
   DURACIÓN
========================================= */

audioCancion.addEventListener(
    "loadedmetadata",
    function () {

        duracionCancion.textContent =
            formatearTiempo(
                audioCancion.duration
            );

    }
);


/* =========================================
   PLAY / PAUSA
========================================= */

btnReproducir.addEventListener(
    "click",
    function () {

        if (
            audioCancion.paused
        ) {

            audioCancion.play();

        }

        else {

            audioCancion.pause();

        }

    }
);


/* =========================================
   REPRODUCIENDO
========================================= */

audioCancion.addEventListener(
    "play",
    function () {

        iconoPlay.textContent =
            "❚❚";


        btnReproducir.setAttribute(
            "aria-label",
            "Pausar canción"
        );


        portadaCancion.classList.add(
            "reproduciendo"
        );


        estadoCancion.classList.add(
            "activo"
        );


        textoEstado.textContent =
            "Reproduciendo nuestra canción";

    }
);


/* =========================================
   PAUSA
========================================= */

audioCancion.addEventListener(
    "pause",
    function () {

        iconoPlay.textContent =
            "▶";


        btnReproducir.setAttribute(
            "aria-label",
            "Reproducir canción"
        );


        portadaCancion.classList.remove(
            "reproduciendo"
        );


        estadoCancion.classList.remove(
            "activo"
        );


        if (
            audioCancion.currentTime > 0 &&
            audioCancion.currentTime <
            audioCancion.duration
        ) {

            textoEstado.textContent =
                "Nuestra canción está en pausa";

        }

    }
);


/* =========================================
   PROGRESO CANCIÓN
========================================= */

audioCancion.addEventListener(
    "timeupdate",
    function () {

        if (
            !audioCancion.duration
        ) {

            return;

        }


        const porcentaje =
            (
                audioCancion.currentTime /
                audioCancion.duration
            )
            * 100;


        progresoCancion.style.width =
            porcentaje + "%";


        puntoProgreso.style.left =
            porcentaje + "%";


        tiempoActual.textContent =
            formatearTiempo(
                audioCancion.currentTime
            );

    }
);


/* =========================================
   CAMBIAR POSICIÓN CANCIÓN
========================================= */

barraProgreso.addEventListener(
    "click",
    function (evento) {

        if (
            !audioCancion.duration
        ) {

            return;

        }


        const medidas =
            barraProgreso
                .getBoundingClientRect();


        let porcentaje =
            (
                evento.clientX -
                medidas.left
            )
            /
            medidas.width;


        porcentaje =
            Math.max(
                0,
                Math.min(
                    1,
                    porcentaje
                )
            );


        audioCancion.currentTime =
            porcentaje *
            audioCancion.duration;

    }
);


/* =========================================
   FINAL CANCIÓN
========================================= */

audioCancion.addEventListener(
    "ended",
    function () {

        iconoPlay.textContent =
            "▶";


        portadaCancion.classList.remove(
            "reproduciendo"
        );


        estadoCancion.classList.remove(
            "activo"
        );


        progresoCancion.style.width =
            "0%";


        puntoProgreso.style.left =
            "0%";


        tiempoActual.textContent =
            "0:00";


        textoEstado.textContent =
            "Quizás quieras escucharla otra vez ♥";

    }
);


/* =========================================
   ERROR AUDIO
========================================= */

audioCancion.addEventListener(
    "error",
    function () {

        textoEstado.textContent =
            "No se pudo cargar la canción";


        estadoCancion.classList.remove(
            "activo"
        );

    }
);


/* =========================================
   SECRETOS
========================================= */

const botonesSecretos =
    document.querySelectorAll(
        ".secreto-trigger"
    );


const progresoSecretos =
    document.getElementById(
        "progresoSecretos"
    );


const numeroSecretos =
    document.getElementById(
        "numeroSecretos"
    );


const modalSecreto =
    document.getElementById(
        "modalSecreto"
    );


const tituloSecreto =
    document.getElementById(
        "tituloSecreto"
    );


const etiquetaSecreto =
    document.getElementById(
        "etiquetaSecreto"
    );


const mensajeSecreto =
    document.getElementById(
        "mensajeSecreto"
    );


const contadorModal =
    document.getElementById(
        "contadorModal"
    );


const cerrarSecreto =
    document.getElementById(
        "cerrarSecreto"
    );


const btnContinuarSecreto =
    document.getElementById(
        "btnContinuarSecreto"
    );


const secretosEncontrados =
    new Set();


/* =========================================
   INFORMACIÓN SECRETOS
========================================= */

const informacionSecretos = {

    1: {

        etiqueta:
            "ENCONTRASTE ALGO QUE GUARDÉ PARA TI",

        titulo:
            "Donde comenzó nosotros",

        mensaje:
            "Hay días que cambian una vida sin hacer ruido. Para mí, aquel día en la playa fue uno de ellos. Porque ahí no solamente comenzó nuestra relación; comenzó una de las partes más bonitas de mi vida."

    },


    2: {

        etiqueta:
            "PARECE QUE ENCONTRASTE OTRO",

        titulo:
            "Entre luces y canciones",

        mensaje:
            "Entre tantas luces, canciones y personas, mi lugar favorito seguía siendo el mismo: a tu lado. Y creo que por eso esa noche terminó significando mucho más que solamente un concierto."

    },


    3: {

        etiqueta:
            "3 / 3 · ENCONTRASTE TODOS",

        titulo:
            "El último secreto",

        mensaje:
            "Llegaste hasta el último... Aunque el mejor de todos nunca estuvo escondido. Eras tú. ❤️"

    }

};


/* =========================================
   DESCUBRIR SECRETO
========================================= */

function descubrirSecreto(
    numero,
    boton
) {

    const numeroSecreto =
        Number(numero);


    if (
        secretosEncontrados.has(
            numeroSecreto
        )
    ) {

        return;

    }


    secretosEncontrados.add(
        numeroSecreto
    );


    boton.classList.add(
        "descubierto"
    );


    progresoSecretos.classList.add(
        "visible"
    );


    numeroSecretos.textContent =
        secretosEncontrados.size +
        "/3";


    const informacion =
        informacionSecretos[
            numeroSecreto
        ];


    etiquetaSecreto.textContent =
        informacion.etiqueta;


    tituloSecreto.textContent =
        informacion.titulo;


    mensajeSecreto.textContent =
        informacion.mensaje;


    contadorModal.textContent =
        secretosEncontrados.size +
        " / 3";


    if (
        secretosEncontrados.size === 3
    ) {

        progresoSecretos.classList.add(
            "completo"
        );


        btnContinuarSecreto.textContent =
            "Siempre tú ♥";

    }

    else {

        btnContinuarSecreto.textContent =
            "Guardarlo conmigo ♥";

    }


    modalSecreto.classList.add(
        "abierto"
    );


    modalSecreto.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-abierto"
    );

}


/* =========================================
   EVENTOS SECRETOS
========================================= */

botonesSecretos.forEach(

    function (boton) {

        boton.addEventListener(
            "click",
            function () {

                descubrirSecreto(
                    boton.dataset.secreto,
                    boton
                );

            }
        );

    }

);


/* =========================================
   CERRAR MODAL
========================================= */

function cerrarModalSecreto() {

    modalSecreto.classList.remove(
        "abierto"
    );


    modalSecreto.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-abierto"
    );

}


cerrarSecreto.addEventListener(
    "click",
    cerrarModalSecreto
);


btnContinuarSecreto.addEventListener(
    "click",
    cerrarModalSecreto
);


document
    .querySelector(
        ".fondo-modal-secreto"
    )
    .addEventListener(
        "click",
        cerrarModalSecreto
    );


document.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "Escape" &&
            modalSecreto.classList.contains(
                "abierto"
            )
        ) {

            cerrarModalSecreto();

        }

    }
);


/* =========================================
   REVELACIÓN FINAL
========================================= */

const btnUltimaCosa =
    document.getElementById(
        "btnUltimaCosa"
    );


const revelacionFinal =
    document.getElementById(
        "revelacionFinal"
    );


const corazonesFinales =
    document.getElementById(
        "corazonesFinales"
    );


let finalRevelado =
    false;


btnUltimaCosa.addEventListener(
    "click",
    function () {

        if (
            finalRevelado
        ) {

            revelacionFinal.scrollIntoView(
                {
                    behavior: "smooth",
                    block: "start"
                }
            );

            return;

        }


        finalRevelado =
            true;


        revelacionFinal.classList.add(
            "activa"
        );


        btnUltimaCosa.textContent =
            "Siempre te escogería ♥";


        crearCorazonesFinales();


        setTimeout(
            function () {

                revelacionFinal.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "start"
                    }
                );

            },
            450
        );

    }
);


/* =========================================
   CORAZONES FLOTANTES
========================================= */

function crearCorazonesFinales() {

    const cantidad =
        28;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        setTimeout(
            function () {

                const corazon =
                    document.createElement(
                        "span"
                    );


                corazon.classList.add(
                    "corazon-flotante"
                );


                corazon.textContent =
                    "♥";


                const posicion =
                    Math.random() *
                    100;


                const tamano =
                    9 +
                    Math.random() *
                    17;


                const duracion =
                    6 +
                    Math.random() *
                    6;


                corazon.style.left =
                    posicion +
                    "%";


                corazon.style.fontSize =
                    tamano +
                    "px";


                corazon.style.animationDuration =
                    duracion +
                    "s";


                corazonesFinales.appendChild(
                    corazon
                );


                setTimeout(
                    function () {

                        corazon.remove();

                    },
                    duracion *
                    1000
                );

            },
            i * 180
        );

    }

}


/* =========================================
   ANIMACIÓN DE LA FLOR
========================================= */

const proximaSorpresa =
    document.getElementById(
        "proximaSorpresa"
    );


const escenaFlor =
    document.getElementById(
        "escenaFlor"
    );


const contenidoProxima =
    document.getElementById(
        "contenidoProxima"
    );


let florAnimada =
    false;


/*
    OBSERVAMOS LA SECCIÓN.

    CUANDO LA PERSONA LLEGA A ELLA,
    LA FLOR COMIENZA A CRECER.
*/

const observadorFlor =
    new IntersectionObserver(

        function (entradas) {

            entradas.forEach(

                function (entrada) {

                    if (
                        entrada.isIntersecting &&
                        !florAnimada
                    ) {

                        florAnimada =
                            true;


                        escenaFlor.classList.add(
                            "floreciendo"
                        );


                        /*
                            DESPUÉS DE QUE LA FLOR
                            TERMINA DE ABRIR,
                            ACTIVAMOS EL MOVIMIENTO
                            SUAVE.
                        */

                        setTimeout(
                            function () {

                                escenaFlor.classList.add(
                                    "florecida"
                                );

                            },
                            3700
                        );


                        /*
                            EL TEXTO APARECE DESPUÉS
                            DE COMENZAR A FLORECER.
                        */

                        setTimeout(
                            function () {

                                contenidoProxima
                                    .classList
                                    .add(
                                        "visible-flor"
                                    );

                            },
                            3200
                        );


                        observadorFlor.unobserve(
                            proximaSorpresa
                        );

                    }

                }

            );

        },

        {
            threshold: 0.30
        }

    );


observadorFlor.observe(
    proximaSorpresa
);


/* =========================================
   SORPRESA 21 DE SEPTIEMBRE
========================================= */

const estadoSorpresa =
    document.getElementById(
        "estadoSorpresa"
    );

const btnSorpresa =
    document.getElementById(
        "btnSorpresa"
    );

const fraseSorpresa =
    document.querySelector(
        ".frase-sorpresa"
    );

let sorpresaDesbloqueada = false;

function revisarFechaSorpresa() {

    const ahora = new Date();

    const fechaDesbloqueo =
        new Date(
            2026,
            8,
            18,
            7,
            0,
            0
        );

    sorpresaDesbloqueada =
        ahora >= fechaDesbloqueo;

    if (sorpresaDesbloqueada) {

        estadoSorpresa.textContent =
            "🌻 Llegó el momento.";

        fraseSorpresa.textContent =
            "Lo que estaba esperando finalmente floreció.";

        btnSorpresa.classList.remove(
            "bloqueado"
        );

        btnSorpresa.classList.add(
            "desbloqueado"
        );

        btnSorpresa.href =
            "flores/flores.html";

        btnSorpresa.setAttribute(
            "aria-disabled",
            "false"
        );

        escenaFlor.classList.add(
            "florecida"
        );

    }

    else {

        estadoSorpresa.textContent =
            "🔒 Todavía no es momento.";

        fraseSorpresa.textContent =
            "Algo bonito está por florecer.";

        btnSorpresa.classList.add(
            "bloqueado"
        );

        btnSorpresa.classList.remove(
            "desbloqueado"
        );

        btnSorpresa.setAttribute(
            "aria-disabled",
            "true"
        );

    }
}

btnSorpresa.addEventListener(
    "click",
    function (evento) {

        revisarFechaSorpresa();

        if (!sorpresaDesbloqueada) {
            evento.preventDefault();
        }
    }
);

revisarFechaSorpresa();

/*
   Si la página queda abierta durante el cambio
   de fecha, revisamos automáticamente cada 30 segundos.
*/
setInterval(
    revisarFechaSorpresa,
    30000
);

