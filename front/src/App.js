// Este component se encargara de gestionar el resto de los demas componentes al HTML

let esPrimeraCargar = true
let $root
export default function App(){
    if(esPrimeraCargar){    
        const $root = document.getElementById('root');
        esPrimeraCargar = false;
    }
    $root.innerText = "Prueba numero uno"

    //header


    //Router para gestionar el renderizado condicional
    const $rutaActual = Router()
    $root.appendChild($rutaActual)


    //footer
}