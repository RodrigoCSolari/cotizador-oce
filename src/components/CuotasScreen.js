import React from 'react';

export const CuotasScreen = ({c}) => {

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }
    
    return (
        <tbody className="bg-white">
            <tr>
                <td className="p-1 text-center">{c.numeroCuota}</td>
                <td className="p-1 text-center">{financial(c.saldoDeuda)}</td>
                <td className="p-1 text-center">{financial(c.valorCuota)}</td>
                <td className="p-1 text-center">{financial(c.interes)}</td>
                <td className="p-1 text-center">{financial(c.cuotaAmortizacion)}</td>
                <td className="p-1 text-center">{financial(c.totalAmortizado)}</td>
                <td className="p-1 text-center">{financial(c.ivaInteres)}</td>
                <td className="p-1 text-center">{financial(c.seguro)}</td>
                <td className="p-1 text-center">{financial(c.cuotaMasIva)}</td>
            </tr>        
        </tbody>
    )
}
