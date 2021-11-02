import React from 'react';
import {Line} from 'react-chartjs-2';


export const GraficoScreen = ({datosGrafico}) => {
    const [numeros,amortizacion,interes,cuota] = datosGrafico;

    let data= {
        labels: numeros,
        datasets: [{
            label: 'CUOTA INTERES',
            data: interes,
            backgroundColor: 'rgba(255, 0, 0, 1)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1,
            fill:false
        },{
            label: 'CUOTA AMORTIZACION',
            data: amortizacion,
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 1,
            fill: false
        },{
            label: 'VALOR CUOTA',
            data: cuota,
            backgroundColor: 'rgba(0, 0, 255, 1)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1,
            fill: false
        }],
        
      }

      const options ={
        title: {
            display: true,
            text: 'IMPORTES SEGUN NUMERO DE CUOTA'
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'C U O T A'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'I M P O R T E'
                }
            }]
        }
    }
    return (
        <Line
          data={data}
          options={options}
        />
    )
}
