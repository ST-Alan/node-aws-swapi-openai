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


    const selectedVoice = voices[voice] ?? 'nova'

    // const folderPath = path.resolve(__dirname, '../../../generated/audios/') //Para correr en local
    const folderPath = '/tmp'; //AWS

    const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`)

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
