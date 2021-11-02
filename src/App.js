import React, { useState } from 'react';
import { CuotasScreen } from './components/CuotasScreen';
import { calculoPrestamo, mensajeError } from './helpers/helpers';
import { useForm } from "./hooks/useForm";
import './floating-labels.css';
import { GraficoScreen } from './components/GraficoScreen';
import Swal from 'sweetalert2';

function App() {
  
  const [planDePago, setPlanDePago] = useState([]);
  const [datosGrafico, setDatosGrafico] = useState([]);
  
  const initialForm = {
    monto:"",
    cuotas:"",
    tasa:"",
    sistema:""
  }
  
  const [ values, handleInputChange] = useForm(initialForm);

  const {monto,cuotas,tasa,sistema} = values;

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(Number(monto)>100000000){
      mensajeError("EL MONTO MAXIMO ES DE $ 100.000.000");
    }else if(Number(cuotas)>120){
      mensajeError("LA CANTIDAD MAXIMA DE CUOTAS ES 120");
    }else if(Number(tasa)>100){
      mensajeError("LA TASA MAXIMA PERMITIDA ES DEL 100%");
    }else if(monto==="" || cuotas==="" || tasa===""){
      mensajeError("NO PUEDES DEJAR CAMPOS VACIOS");
    }else if(Number(monto)<1 || Number(cuotas)<1 || Number(tasa)<1){
      mensajeError("NO PUEDES LLENAR LOS CAMPOS CON CERO O NUMEROS NEGATIVOS");
    }else if(sistema===""){
      mensajeError("DEBES ELEGIR UN SISTEMA");
    }else{
      let timerInterval
      await Swal.fire({
        title: 'SE ESTA CALCULANDO EL PRESTAMO',
        html: 'FALTAN <b></b> MILISEGUNDOS.',
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })    
      const {arregloCuotas,arregloNumeros,arregloIntereses,arregloAmortizacion,arregloValorCuota} =calculoPrestamo(monto,cuotas,tasa,sistema);
      setPlanDePago(arregloCuotas);
      setDatosGrafico([arregloNumeros,arregloAmortizacion,arregloIntereses,arregloValorCuota]);
    }

  }
  
  return (
    <div className="container">
      <h1 className="display-3 text-center text-primary animate__animated animate__fadeIn animate__slow">COTIZADOR PRESTAMOS</h1>
      <h3 className="display-5 text-center animate__animated animate__backInDown animate__delay-1s">Rodrigo Solari - O.C.E. 2021</h3>
      <form
          className="form-signin animate__animated animate__fadeIn animate__slow animate__delay-2s"
          onSubmit={handleSubmit}
      >
        <div className="form-label-group">
          <input
              autoComplete="off"
              className="form-control"
              name="monto"
              type="number"
              value={monto}
              onChange={handleInputChange}
              placeholder="MONTO:"
          />
          <label htmlFor="monto">
            MONTO:
          </label>
        </div>
        <div className="form-label-group">
          <input
              autoComplete="off"
              className="form-control"
              name="cuotas"
              type="number"
              value={cuotas}
              onChange={handleInputChange}
              placeholder="CUOTAS"
          />
          <label htmlFor="cuotas">
            CUOTAS: 
          </label>
        </div>
        <div className="form-label-group">
          <input
              autoComplete="off"
              className="form-control"
              name="tasa"
              type="number"
              value={tasa}
              onChange={handleInputChange}
              placeholder="TASA NOMINAL"
          />
          <label htmlFor="tasa">
            TASA NOMINAL:
          </label>
        </div>

        <div className="">
          <select
            className="form-control" 
            name="sistema"
            onChange={handleInputChange}
          >
            <option value="" defaultValue>ELEGIR SISTEMA...</option>
            <option value="frances">FRANCES</option>
            <option value="aleman">ALEMAN</option>
            <option value="americano">AMERICANO</option>
          </select>
        </div>
          <button 
            type="submit"
            className="btn btn-lg btn-primary btn-block mt-3"
          >
            CALCULAR
          </button>
        </form>
        <div className="mb-4 animate__animated animate__fadeIn animate__slow animate__delay-3s">
         <GraficoScreen
            datosGrafico={datosGrafico}
          />
        </div>
        <div>
          <table className="table table-bordered table-hover animate__animated animate__fadeIn animate__slow animate__delay-4s">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-1 text-center">Nro</th>
                <th className="p-1 text-center">Deuda</th>
                <th className="p-1 text-center">Cuota</th>
                <th className="p-1 text-center">Interes</th>
                <th className="p-1 text-center">Amortizacion</th>
                <th className="p-1 text-center">Total Amortizado</th>
                <th className="p-1 text-center">Iva</th>
                <th className="p-1 text-center">Seguro</th>
                <th className="p-1 text-center">Total a Pagar</th>
              </tr>
            </thead>
            {planDePago.map(c => 
              <CuotasScreen
                key={c.numeroCuota}
                c={c}
              />          
            )}
          </table>         
        </div>    
    </div>
  );
}

export default App;