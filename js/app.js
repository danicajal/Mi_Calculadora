
var Calculadora = (function(){
    var resultado = 0;
        nro1 = 0;
        nro2 = 0;
        nro = '0';
        puntoIngresado = "false";
        ultimaTecla =  ' ';
        op_actual = ' ';

        function teclaPresionada(boton){


          return function(){

            var opcion = boton;

            switch (opcion) {
              case "on":
                ponerNroEnCero();
                ultimaTecla = boton;
                op_actual = ' ';
                nro1 = ' ';
                nro2 = ' ';
                nro = 0;

                break;
              case "sign":
                signo();
                break;
              case "raiz":
                alert('Botón inhabilitado');
                break;

              case "punto":
                if(puntoIngresado === "false"){
                  nro = document.getElementById('display').innerHTML=nro+".";
                  puntoIngresado = "true"

                }
                break;
              case "igual":
                if((op_actual === ' ') || (ultimaTecla === 'on')){
                  alert('Operación Inválida')
                }else{
                  if(ultimaTecla === 'igual'){
                      detectarOperacion(boton);
                  }else{
                    nro2 = document.getElementById('display').innerHTML;
                    realizarCalculo(op_actual);

                    ultimaTecla = boton;
                    ImprimirResultado();

                  }
                }

                break;
              default:
                procesarTecla(boton);

                break;

            }

          }
        };

        function ponerNroEnCero(){
          document.getElementById("display").innerHTML=0;
          nro = 0
          puntoIngresado = "false"

        };

        function procesarTecla(boton){
           if (boton < 10){
             ingresarNro(boton);
           }else{
             detectarOperacion(boton);
           }

       };

       function ingresarNro(boton){
         if(ultimaTecla === 'igual'){
           ponerNroEnCero();
           ultimaTecla = ' ';
           op_actual = ' ';
           nro1 = 0;
           nro2 = 0;
           nro = 0;
         }
         ultimaTecla = boton
         nro = document.getElementById('display').innerHTML;
         if(nro.length !== 8){
             if(nro=="0"){

               nro = document.getElementById('display').innerHTML=boton;


             }else{
               nro = document.getElementById('display').innerHTML=nro+boton;
             }
         }
       };

       function signo(){

         if(nro !== 0){
           nro = nro * -1
           document.getElementById('display').innerHTML=nro;
           ultimaTecla = 'sign';
         }

       };

       function realizarCalculo(operacion){

         nro1 = Number(nro1);
         nro2 = Number(nro2);

         switch (operacion) {
           case 'mas':
             Calculadora.sumar();
             break;
           case 'menos':
             Calculadora.restar();
             break;
           case 'por':
             Calculadora.multiplicar();
             break;
           case 'dividido':
             Calculadora.dividir();
             break;
           default:

         }
       };

       function guardarNro(boton){
         if(op_actual=== ' '){
           nro1 = document.getElementById('display').innerHTML;
           op_actual = boton;
         }else{
           nro2 = document.getElementById('display').innerHTML;
           realizarCalculo(op_actual);
           nro1 = Calculadora.resultado();
           op_actual = boton;
         }
       };

       function detectarOperacion(boton){

         if(ultimaTecla !== ' ' && ultimaTecla !== 'punto'){
           if(ultimaTecla < 10 || ultimaTecla === 'sign'){

             ultimaTecla = boton;
             guardarNro(boton)
             ponerNroEnCero()
           }else{
             if(ultimaTecla === 'igual'){
               nro1 = document.getElementById('display').innerHTML;
               if(boton === 'igual'){
                   realizarCalculo(op_actual);
                   ImprimirResultado();

               }else{

                 op_actual=boton;
                 ultimaTecla = boton;
                 ponerNroEnCero();
               }


             }else{

               ultimaTecla = boton;
               op_actual = boton;

             }
           }

          }

        };
  function ImprimirResultado(){
      if (Calculadora.resultado() > 99999999){
          document.getElementById('display').innerHTML = Calculadora.resultado().toPrecision(4);
      }else{
          if (Calculadora.resultado() > 1000000){
              document.getElementById('display').innerHTML = Calculadora.resultado().toFixed(0);
          }else{
              if (Calculadora.resultado() > 100000){
                  document.getElementById('display').innerHTML = Calculadora.resultado().toFixed(1);
              }else{
                nro = Calculadora.resultado().toString();
                if (nro.length > 8){
                  nro = Number(nro);
                  document.getElementById('display').innerHTML = nro.toFixed(4);
                }else{
                  document.getElementById('display').innerHTML = nro;
                }

              }
          }
      }
  }

  function actualizarResultado(nuevoResultado){
    resultado = nuevoResultado
  }

  return {
    detectarTecla: function(){
      var tecla = document.getElementsByClassName('tecla');

      for(var i = 0; i < tecla.length; i++){
        var boton = tecla[i].id;
        document.getElementById(boton).onclick=teclaPresionada(boton);

      };
    },
    sumar: function(){
      var resultado = nro1 + nro2;
      actualizarResultado(resultado);
    },
    restar: function(){
      var resultado = nro1 - nro2;
      actualizarResultado(resultado);
    },
    multiplicar: function(){
      var resultado = nro1 * nro2;
      actualizarResultado(resultado);
    },
    dividir: function(){
      var resultado = nro1 / nro2;
      actualizarResultado(resultado);
    },
    resultado: function(){
      return resultado;
    }
  }
})();

Calculadora.detectarTecla()
