//Las importaciones de node suelen ir sobre las importaciones de nest
import * as path from "path";
import * as fs from "fs";
import OpenAI from "openai";

interface Options{
    nuevaSagaEscrita: string;
    voice?: string;
}

export const texToAudioUseCase = async(openai:OpenAI,{nuevaSagaEscrita, voice}:Options) =>{


    const voices = {
        nova: 'nova',
        alloy: 'alloy',
        echo:'echo', 
        fable:'fable', 
        onyx:'onyx', 
        shimmer:'shimmer',
    }

    //Esto lo que hace es que busque entre las voices que estan disponibles, y si en voices[voice] no existen las o si devuelve null, entonces que use la voz de nova
    const selectedVoice = voices[voice] ?? 'nova'
    //El path se importa de node, se colocar el * as para que tome todo el path
    // Se puede tener una carpeta USERID para saber que usaurio genero cual archivo, o almacenar todo en la base de datos para saber que usuario guardo que cosa.
    //const folderPath = path.resolve(__dirname, '../../../generated/USERID/audios')
    //Aca es donde quiero guardar mi audio
    const folderPath = path.resolve(__dirname, '../../../generated/audios/')
    //TExto del audio propiamente:
    const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`)
    //Aca si 2 personas suben algo al mismo tiempo se puede sobreescribir, seria bueno poner el id del usuario o un uui en esta url:
    //const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`)

    //Aca nos aseguramos de que el directorio exista. Se duplica la importacion del path si se coloca fs
    // Esto hace que si no existe el directorio que vaya y los cree todos. Por la bandera recursive en true
    fs.mkdirSync( folderPath,{recursive:true})


    //Generar mp3

    const mp3 = await openai.audio.speech.create({
        model:'tts-1',
        voice:selectedVoice,
        input:nuevaSagaEscrita,
        response_format:'mp3',
    })
    const buffer = Buffer.from(await mp3.arrayBuffer());

    fs.writeFileSync(speechFile, buffer)

    return speechFile
    
}