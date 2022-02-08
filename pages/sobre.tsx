import { GetStaticProps } from "next"
import Header from "../components/Header"
import * as prismic from '@prismicio/client'
import { client } from '../utils/prismic-configuration';
import Image from "next/image";
import Head from "next/head";



type AboutProps = {
    about: {
        title: string
        description: string
        cover: { url: string }
    }
} 


const Sobre = ( {about}: AboutProps ) => {

    return (
        <>
            <Head>
                <title>Informações CAT INFO!</title>
            </Head>
            <Header>
                <div className="my-10 md:my-20">
                    <div className="container mx-auto">
                        <div className="flex flex-col-reverse md:flex-row items-center">
                            <div className="flex flex-col w-full md:w-1/2 justify-center items-start pt-12 pb-24 px-6">
                                <h1 className="font-bold text-3xl my-4">{about.title}</h1>
                                <p className="leading-normal mb-4">{about.description}</p>
                            </div>
                            <div className="md:w-1/2 md:py-6 text-center mx-6 sm:mx-0">
                                <Image 
                                    className="rounded-lg" 
                                    src={about.cover.url} 
                                    alt={about.title} 
                                    objectFit='cover'
                                    width={720} 
                                    height={410}
                                    quality={100}
                                    placeholder='blur'
                                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8fEOxHgAGnwJNrlOKngAAAABJRU5ErkJggg=='
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Header>
        </>
    )
}

export default Sobre

export const getStaticProps: GetStaticProps = async () => {

    const resultAbout = await client.query(
        prismic.Predicates.at('document.type', 'about')
    );
    
    const about = resultAbout.results.reduce((acumulador, about) => ({
        ...acumulador,
        title: about.data.title,
        description: about.data.description,
        cover: about.data.cover,

    }), {})


    return {
        props: {
            about
        },
        revalidate: 60 * 60 // A cada 1h
    }
}