class Display {
    constructor(displayValorAnterior, displayValorActual) {
         /* Valores que se muestran en pantalla */
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        /* Intanciando variable para no volverla a crear */
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
         /* Operadores que trabajan detras de la pantalla */
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
        }
    }

    borrar() {
        /*  Se toma  la posición inicial y se retiran o eliminan letras de 
         variables*/
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }
    borrarHistorial(){
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        historial = [];
        document.getElementById('list').innerHTML = historial
        this.imprimirValores();
    }
    /* obtine los valores que ingresemos y  lo muestra, efectua.*/
    computar(tipo) {
        /* Si no se preciona igual calcula el valor para mostrar proximamente */
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
        
    }
/* Si el numero tiene un '.'se sale sin agregarlo */
    agregarNumero(numero) {
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        /* Concatenar  la varabiable y asignamos valor vacio*/
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular() {
        /* Para tratar los numeros con decimal y sin decimal */
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        /* Si es nan retorna sin hacer nada*/
        if( isNaN(valorActual)  || isNaN(valorAnterior) ) return
        /* Update */
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
        let op = ''
        switch (this.tipoOperacion) {
            case 'sumar':
                op = '+'
                break;
            case 'restar':
                op = '-'
                break;
            case 'multiplicar':
                op = 'x'
                break;
            case 'dividir':
                op = '/'
                break;
        }
        let resultado = valorAnterior+' '+ op + ' '+valorActual + ' = ' + this.valorActual
        historial.push(resultado)
        let list = ''
        historial.forEach(i => {
            list += `<li>${i}`
         })
        document.getElementById('list').innerHTML = list
        
    }
}

