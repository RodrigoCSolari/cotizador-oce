import Swal from 'sweetalert2';

export const mensajeError = mensaje=>{
    Swal.fire({
        icon: 'error',
        title: 'HUBO UN ERROR',
        text: mensaje
      })
}

export const calculoPrestamo= (monto,cuotas,tasa,sistema)=>{

    const tasaMensual = tasa/1200;
    let arregloCuotas=[];
    let arregloNumeros=[];
    let arregloIntereses=[];
    let arregloValorCuota=[];
    let arregloAmortizacion=[];

    function financial(x) {
      return Number.parseFloat(x).toFixed(2);
    }
    
    switch (sistema) {
      case "frances":
        const valorCuota=(tasaMensual*monto)/(1-Math.pow(1+tasaMensual,-cuotas));
        let saldoDeuda=Number(monto);
        let totalAmortizado=0;
        for (let i = 0; i < cuotas; i++) {
          arregloCuotas.push({
            numeroCuota: i+1,
            saldoDeuda,
            valorCuota,
            interes: saldoDeuda*tasaMensual,
            cuotaAmortizacion: valorCuota-saldoDeuda*tasaMensual,
            totalAmortizado: totalAmortizado+(valorCuota-saldoDeuda*tasaMensual),
            ivaInteres: saldoDeuda*tasaMensual*0.21,
            seguro: saldoDeuda*0.0025,
            cuotaMasIva: valorCuota + saldoDeuda*tasaMensual*0.21 + saldoDeuda*0.0025
          });
            arregloNumeros.push(i+1);
            arregloIntereses.push(financial(saldoDeuda*tasaMensual));
            arregloValorCuota.push(financial(valorCuota));
            arregloAmortizacion.push(financial(valorCuota-saldoDeuda*tasaMensual));
          totalAmortizado=totalAmortizado+(valorCuota-saldoDeuda*tasaMensual);
          saldoDeuda=saldoDeuda-(valorCuota-saldoDeuda*tasaMensual);
        }
        return {arregloCuotas,arregloNumeros,arregloIntereses,arregloAmortizacion,arregloValorCuota};
    
      case "aleman":
        const cuotaAmortizacionAle=monto/cuotas;
        let saldoDeudaAle=Number(monto);
        let totalAmortizadoAle=0;
        for (let i = 0; i < cuotas; i++) {
          arregloCuotas.push({
            numeroCuota: i+1,
            saldoDeuda:saldoDeudaAle,
            valorCuota:cuotaAmortizacionAle+saldoDeudaAle*tasaMensual,
            interes: saldoDeudaAle*tasaMensual,
            cuotaAmortizacion: cuotaAmortizacionAle,
            totalAmortizado: totalAmortizadoAle+cuotaAmortizacionAle,
            ivaInteres: saldoDeudaAle*tasaMensual*0.21,
            seguro: saldoDeudaAle*0.0025,
            cuotaMasIva: (cuotaAmortizacionAle+saldoDeudaAle*tasaMensual) + saldoDeudaAle*tasaMensual*0.21 + saldoDeudaAle*0.0025
          });
            arregloNumeros.push(i+1);
            arregloIntereses.push(financial(saldoDeudaAle*tasaMensual));
            arregloValorCuota.push(financial(cuotaAmortizacionAle+saldoDeudaAle*tasaMensual));
            arregloAmortizacion.push(financial(cuotaAmortizacionAle));
          totalAmortizadoAle=totalAmortizadoAle+cuotaAmortizacionAle;
          saldoDeudaAle=saldoDeudaAle-cuotaAmortizacionAle;
        }
        return {arregloCuotas,arregloNumeros,arregloIntereses,arregloAmortizacion,arregloValorCuota};
  
      case "americano":
        const total= Number(monto)  
        for (let i = 0; i < cuotas; i++) {
            arregloCuotas.push({
                numeroCuota: i+1,
                saldoDeuda:i===cuotas-1?0:total,
                valorCuota:i===cuotas-1?total+total*tasaMensual:total*tasaMensual,
                interes: total*tasaMensual,
                cuotaAmortizacion: i===cuotas-1?total:0,
                totalAmortizado: i===cuotas-1?total:0,
                ivaInteres: total*tasaMensual*0.21,
                seguro: total*0.0025,
                cuotaMasIva: i===cuotas-1?total+total*tasaMensual*1.21 + total*0.0025 : total*tasaMensual*1.21 + total*0.0025
            });
            arregloNumeros.push(i+1);
            arregloIntereses.push(financial(total*tasaMensual));
            arregloValorCuota.push(financial(i===cuotas-1?total+total*tasaMensual:total*tasaMensual));
            arregloAmortizacion.push(financial(i===cuotas-1?total:0));
        }
        return {arregloCuotas,arregloNumeros,arregloIntereses,arregloAmortizacion,arregloValorCuota};

      default:
        return [];
    }

}