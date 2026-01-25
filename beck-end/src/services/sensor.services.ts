import { error } from "node:console";

export async function calcularPrevisao (peso_atual: number, data_ultima_troca: Date, tipo_gas: string){
    const hoje = new Date();
    const diff_ms = hoje.getTime() - new Date(data_ultima_troca).getTime();
    const dias_passados = diff_ms / (1000 * 60 * 60 * 24);

    
    if (dias_passados < 1) {
        return 30; 
    }

    const config = await pesoMaxBotijaoGas(tipo_gas);

    let peso_gas_atual = peso_atual - config.pesoTara;

    if (peso_gas_atual < 0) peso_gas_atual = 0;
    if (peso_gas_atual > config.pesoMaxFluido) {
        peso_gas_atual = config.pesoMaxFluido;
    }

    const gas_consumido = config.pesoMaxFluido - peso_gas_atual;

    if (gas_consumido <= 0) {
        return 30;
    }

    const consumo_diario = gas_consumido / dias_passados;

    if (consumo_diario <= 0) {
        return 30;
    }

    const dias_restantes = peso_gas_atual / consumo_diario;

    return Math.max(0, Math.floor(dias_restantes));
}



// export async function verificarStatusNivelGas (tipo_gas: string, nivel_leitura_sensor:number): Promise<{ stts_niv_gas: string }>{
//    try {
//         //stts: status , niv: nivel; 
//         let porcent_atual_stts_niv_sensor: number;
//         let stts_niv_gas: string;
//         const pesoMax = await pesoMaxBotijaoGas (tipo_gas);
//             porcent_atual_stts_niv_sensor = (nivel_leitura_sensor/(pesoMax.pesoMaxFluido)) * 100;
//             if (porcent_atual_stts_niv_sensor >= 70 && porcent_atual_stts_niv_sensor <= 100){
//                 stts_niv_gas = "Muito Alto";
//             } else if (porcent_atual_stts_niv_sensor < 70 && porcent_atual_stts_niv_sensor >= 50){
//                 stts_niv_gas = "Alto";
//             }else if (porcent_atual_stts_niv_sensor < 50 && porcent_atual_stts_niv_sensor >= 30){
//                 stts_niv_gas = "Médio";
//             }else if (porcent_atual_stts_niv_sensor < 30 && porcent_atual_stts_niv_sensor >= 15){
//                 stts_niv_gas = "Baixo";
//             }else if (porcent_atual_stts_niv_sensor < 15 && porcent_atual_stts_niv_sensor >= 6){
//                 stts_niv_gas = "Muito baixo";
//             }else if (porcent_atual_stts_niv_sensor < 6 && porcent_atual_stts_niv_sensor >= 0){
//                 stts_niv_gas = "Urgente";
//             }else {
//                 throw new Error ("A porcentagem do nivel está incorreta");
//             }
//              return {stts_niv_gas,};
//         }
//         catch(error){
//         console.error("Algo deu errado, ", error);
//         throw error;
//     }
// }


type PesoBotijao = {
    pesoMaxFluido: number;
    pesoTara: number;
    pesoBruto: number;
};
export async function pesoMaxBotijaoGas (tipo_gas: string): Promise<PesoBotijao>{
    try {
        let peso_max_fluido: number, peso_tara: number, peso_bruto: number;
        if (tipo_gas == "P8"){
            peso_max_fluido = 8000;
            peso_tara= 7000;
            peso_bruto = peso_max_fluido + peso_tara;
        }else if (tipo_gas == "P13") {
            peso_tara= 14500;
            peso_max_fluido = 13000;
            peso_bruto = peso_max_fluido + peso_tara;
        }else if (tipo_gas == "P20"){
            peso_tara= 19000
            peso_max_fluido = 20000;
            peso_bruto = peso_max_fluido + peso_tara;
        }else if (tipo_gas == "P45"){
            peso_tara= 38000
            peso_max_fluido = 45000;
            peso_bruto = peso_max_fluido + peso_tara;
        }else{
            throw new Error ("O Peso do gás está incorreto");
        }
        return {
        pesoMaxFluido: peso_max_fluido ,
        pesoTara: peso_tara,
        pesoBruto: peso_bruto
        };
    }catch (error){
        console.error("Algo deu errado, ", error);
        throw error;
    }
}

//Essa função calcula a porcentagem do nivel atual em que foi feita a leitura
//Como parametro é passado o tipo do gas (para acessarmos o peso do fluido e apenas do butijão) e o nivel atual da leitura;
//Dentro da função corrigimos a diferença Peso Total-Peso botijão que nos dá a quantidade de fluido;
export async function porcentagemPesoGas (tipo_gas: string, peso_atual: number){
    const peso_config = await pesoMaxBotijaoGas( tipo_gas);

    let peso_apenas_fluido = peso_atual;
    if (peso_atual > peso_config.pesoMaxFluido){
        peso_apenas_fluido = peso_atual - peso_config.pesoTara
    }

    if (peso_apenas_fluido < 0 ) peso_apenas_fluido = 0;
    const porcentagem_peso_gas = (peso_apenas_fluido / (peso_config.pesoMaxFluido)) * 100;

    return porcentagem_peso_gas
    
}

export function verificarTipoGas(tipo_gas: string): boolean {
    return ["P8", "P13", "P20", "P45"].includes(tipo_gas);
}
