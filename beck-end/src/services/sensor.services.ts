import { Request, Response } from "express";
export async function calcularPrevisao (nivel_atual: number, data_ultima_troca: Date){
    const dia_atual = new Date();

    const diferenca_dias = dia_atual.getTime() - new Date(data_ultima_troca).getTime();
    const dias_passados = diferenca_dias / (1000 * 60 * 60 * 24);
    
    if (dias_passados < 1) return 30;

    const gasto_percentual_gas = 100 - nivel_atual;

    if (gasto_percentual_gas <= 0) return 30;

    const consumo_por_dia_gas = gasto_percentual_gas / dias_passados;
    
    const dias_restantes_gas = nivel_atual / consumo_por_dia_gas;

    return Math.floor (dias_restantes_gas);

}
export async function verificarStatusNivelGas (nivel_leitura_sensor:number, tipo_gas: string){

   try {
    let gas_peso_max;
        if (tipo_gas == "P5"){
            gas_peso_max = 5000;
        }else if (tipo_gas == "P8") {
            gas_peso_max = 8000;
        }else if (tipo_gas == "P13"){
            gas_peso_max = 13000;
        }else if (tipo_gas == "P20"){
            gas_peso_max = 20000;
        }else if (tipo_gas == "45"){
            gas_peso_max = 45000;
        }else{
            throw new Error ("O Peso do gás está incorreto");
        }
        //stts: status , niv: nivel;
        const porcent_atual_stts_niv_sensor = (nivel_leitura_sensor/gas_peso_max) * 100;
        
        if (porcent_atual_stts_niv_sensor >= 70 && porcent_atual_stts_niv_sensor <= 100){
            const stts_niv_gas = "Muito Alto";
            return  stts_niv_gas;
        } else if (porcent_atual_stts_niv_sensor < 70 && porcent_atual_stts_niv_sensor >= 50){
            const stts_niv_gas = "Alto";
            return stts_niv_gas;
        }else if (porcent_atual_stts_niv_sensor < 50 && porcent_atual_stts_niv_sensor >= 30){
            const stts_niv_gas = "Médio";
            return stts_niv_gas;
        }else if (porcent_atual_stts_niv_sensor < 30 && porcent_atual_stts_niv_sensor >= 15){
            const stts_niv_gas = "Baixo";
        }else if (porcent_atual_stts_niv_sensor < 15 && porcent_atual_stts_niv_sensor >= 6){
            const stts_niv_gas = "Muito baixo";
            return stts_niv_gas;
        }else if (porcent_atual_stts_niv_sensor < 6 && porcent_atual_stts_niv_sensor >= 0){
            const stts_niv_gas = "Urgente";
            return stts_niv_gas;
        }else {
            throw new Error ("A porcentagem do nivel está incorreta");
        }
    }catch(error){
        console.error ("Algo de errado na verficação de status do gás.", error);
    }
}