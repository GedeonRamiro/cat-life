import { GetStaticProps } from "next"
import Header from "../components/Header"
import * as prismic from '@prismicio/client'
import { client } from '../utils/prismic-configuration';
import { RichText } from 'prismic-reactjs';
import Image from "next/image";



type AboutProps = {
    content: {
        title: string
        description: string
        cover: string
    }
} 


const Sobre = ( {content}: AboutProps ) => {

    return (
        <Header>
            <div className="my-10 md:my-20">
                <div className="container mx-auto">
                    <div className="flex flex-col-reverse md:flex-row items-center">
                        <div className="flex flex-col w-full md:w-1/2 justify-center items-start pt-12 pb-24 px-6">
                            <h1 className="font-bold text-3xl my-4">{content.title}</h1>
                            <p className="leading-normal mb-4">{content.description}</p>
                        </div>
                        <div className="md:w-1/2 md:py-6 text-center mx-6 sm:mx-0">
                            <Image 
                                className="rounded-lg" 
                                src={content.cover} 
                                alt={content.title} 
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
    )
}

export default Sobre

export const getStaticProps: GetStaticProps = async () => {

    const result = await client.query(
        prismic.Predicates.at('document.type', 'about')
    );

    const {
        title, description, cover
    } = result.results[0].data


      const content = {
        title: RichText.asText(title),
        description: RichText.asText(description),
        cover: cover.url
      }  


    return {
        props: {
            content
        },
        revalidate: 60 * 60 // A cada 1h
    }
}