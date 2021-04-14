//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //Cuando agregas un curso presionando click "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el arreglo
        limpiarHTML(); //Eliminamos el HTML
    });
}

//Funciones 
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado);
    }

}

//Elimina un curso del carrito
function eliminarCurso(e) {

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo por el data id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //Iteramos el carrito de nuevo 
    }
}

//Vaciar carrito de compras
function vaciarCarrito() {




}


//Lee el contenido del HTML al que le dimos click y extrae la informacion
function leerDatosCurso(curso) {
    //Muestra la pag

    //Creamos un objeto con el contenido del curso actual
    const infoCurso = {
        Imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si existe elemento en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) { //Actualizamos cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito - [...cursos];
    } else { // Agregamos elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //Agrega elementos al arreglo de carrito
    //articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito en HTML

function carritoHTML() {

    //Limpiar el HTML

    limpiarHTML();

    console.log("carritohtml  ",articulosCarrito);


    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        console.log(curso);
        const { Imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img scr="${Imagen}" with='100%'></img></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}" > X </a> 
        </td>
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    })
}

//Elimina los cursos del tbody 

function limpiarHTML() {
    //contenedorCarrito.innerHTML = ''; --- METODO LIMPIAR HTML

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}