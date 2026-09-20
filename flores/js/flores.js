/* =========================================
   ELEMENTOS
========================================= */

const bienvenida =
    document.getElementById("bienvenida");

const btnFlorecer =
    document.getElementById("btnFlorecer");

const jardin =
    document.getElementById("jardin");

const florEspecial =
    document.getElementById("florEspecial");

const mensaje21 =
    document.getElementById("mensaje21");

const btnContinuar =
    document.getElementById("btnContinuar");

const cartaFinal =
    document.getElementById("cartaFinal");

const particulas =
    document.getElementById("particulas");

const petalosFinales =
    document.getElementById("petalosFinales");


let jardinListo = false;
let florEncontrada = false;


/* =========================================
   HACER FLORECER EL JARDÍN
========================================= */

btnFlorecer.addEventListener(
    "click",
    function () {

        btnFlorecer.disabled = true;

        bienvenida.style.transition =
            "opacity 1.2s ease";

        bienvenida.style.opacity = "0";


        setTimeout(
            function () {

                bienvenida.classList.add(
                    "oculto"
                );

                jardin.classList.remove(
                    "oculto"
                );

                jardin.style.opacity = "0";

                jardin.style.transition =
                    "opacity 1.5s ease";

                window.scrollTo(0, 0);


                setTimeout(
                    function () {

                        jardin.style.opacity = "1";


                        setTimeout(
                            function () {

                                /*
                                   Esta clase hace crecer:
                                   - girasoles
                                   - flores pequeñas
                                   - tulipanes
                                   - hojas
                                */

                                jardin.classList.add(
                                    "floreciendo"
                                );

                                crearParticulasIniciales();

                            },
                            400
                        );


                        /*
                           Cuando todas las flores
                           terminaron de crecer.
                        */

                        setTimeout(
                            function () {

                                jardin.classList.add(
                                    "lista"
                                );

                                jardinListo = true;

                            },
                            5400
                        );

                    },
                    60
                );

            },
            1200
        );

    }
);


/* =========================================
   PARTÍCULAS INICIALES
========================================= */

function crearParticulasIniciales() {

    const cantidad = 55;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        setTimeout(
            function () {

                crearParticula();

            },
            i * 120
        );

    }

}


/* =========================================
   CREAR PARTÍCULA
========================================= */

function crearParticula() {

    const particula =
        document.createElement(
            "span"
        );


    particula.classList.add(
        "particula"
    );


    const simbolos = [
        "✦",
        "·",
        "•"
    ];


    particula.textContent =
        simbolos[
            Math.floor(
                Math.random() *
                simbolos.length
            )
        ];


    particula.style.left =
        Math.random() *
        100 +
        "%";


    particula.style.fontSize =
        (
            4 +
            Math.random() *
            8
        )
        +
        "px";


    const duracion =
        7 +
        Math.random() *
        7;


    particula.style.animationDuration =
        duracion +
        "s";


    particulas.appendChild(
        particula
    );


    setTimeout(
        function () {

            particula.remove();

        },
        duracion *
        1000
    );

}


/* =========================================
   PARTÍCULAS CONTINUAS
========================================= */

setInterval(
    function () {

        if (
            !jardinListo ||
            jardin.classList.contains(
                "oculto"
            )
        ) {

            return;

        }


        crearParticula();

    },
    850
);


/* =========================================
   FLOR ESPECIAL
========================================= */

florEspecial.addEventListener(
    "click",
    function () {

        if (
            !jardinListo ||
            florEncontrada
        ) {

            return;

        }


        florEncontrada = true;


        /*
           Detenemos el pulso de la flor.
        */

        florEspecial.style.animation =
            "none";


        /*
           Brillo al descubrirla.
        */

        florEspecial.style.transition =
            "filter 0.8s ease";


        florEspecial.style.filter =
            "drop-shadow(0 0 45px rgba(239, 199, 82, 0.75))";


        setTimeout(
            function () {

                jardin.style.transition =
                    "opacity 1.2s ease";

                jardin.style.opacity =
                    "0";


                setTimeout(
                    function () {

                        jardin.classList.add(
                            "oculto"
                        );


                        mensaje21.classList.remove(
                            "oculto"
                        );


                        mensaje21.style.opacity =
                            "0";


                        mensaje21.style.transition =
                            "opacity 1.5s ease";


                        window.scrollTo(
                            0,
                            0
                        );


                        setTimeout(
                            function () {

                                mensaje21.style.opacity =
                                    "1";

                            },
                            60
                        );

                    },
                    1200
                );

            },
            900
        );

    }
);


/* =========================================
   CONTINUAR A LA CARTA
========================================= */

btnContinuar.addEventListener(
    "click",
    function () {

        btnContinuar.disabled = true;


        mensaje21.style.transition =
            "opacity 1.2s ease";


        mensaje21.style.opacity =
            "0";


        setTimeout(
            function () {

                mensaje21.classList.add(
                    "oculto"
                );


                cartaFinal.classList.remove(
                    "oculto"
                );


                cartaFinal.style.opacity =
                    "0";


                cartaFinal.style.transition =
                    "opacity 1.5s ease";


                window.scrollTo(
                    0,
                    0
                );


                setTimeout(
                    function () {

                        cartaFinal.style.opacity =
                            "1";


                        crearPetalosFinales();

                    },
                    60
                );

            },
            1200
        );

    }
);


/* =========================================
   PÉTALOS FINALES
========================================= */

function crearPetalosFinales() {

    const cantidad = 45;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        setTimeout(
            function () {

                crearPetalo();

            },
            i * 280
        );

    }

}


/* =========================================
   CREAR PÉTALO
========================================= */

function crearPetalo() {

    const petalo =
        document.createElement(
            "span"
        );


    petalo.classList.add(
        "petalo-caida"
    );


    petalo.textContent =
        "❧";


    petalo.style.left =
        Math.random() *
        100 +
        "%";


    petalo.style.fontSize =
        (
            10 +
            Math.random() *
            13
        )
        +
        "px";


    const duracion =
        7 +
        Math.random() *
        6;


    petalo.style.animationDuration =
        duracion +
        "s";


    petalosFinales.appendChild(
        petalo
    );


    setTimeout(
        function () {

            petalo.remove();

        },
        duracion *
        1000
    );

}


/* =========================================
   PÉTALOS CONTINUOS
========================================= */

setInterval(
    function () {

        if (
            cartaFinal.classList.contains(
                "oculto"
            )
        ) {

            return;

        }


        crearPetalo();

    },
    1400
);