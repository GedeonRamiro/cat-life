import { GetServerSideProps, GetStaticProps } from "next"
import { client } from "../../utils/prismic-configuration"
import { RichText } from "prismic-reactjs"
import Image from "next/image"
import Header from "../../components/Header"
import Link from "next/link"

type PostProps = {
    post: {
        slug: string,
        title: string
        description: string
        cover: { url: string }
        updateAt: Date
    }
}



export default function Post( {post}: PostProps){

  
    return (
        <Header>
            <div className="container mx-auto">
                <div className="flex items-center justify-center my-10 md:my-20">
                    <div className='flex flex-col lg:w-8/12'>
                        <div className='flex justify-between md:justify-around'>
                            <div className="max-w-2xl mx-4 md:mx-0">
                                <figure className='flex justify-center'>
                                    <Image 
                                        className="rounded-lg" 
                                        src={post.cover.url} 
                                        alt={post.title} 
                                        objectFit='cover'
                                        width={720} 
                                        height={410}
                                        quality={100}
                                        placeholder='blur'
                                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8fEOxHgAGnwJNrlOKngAAAABJRU5ErkJggg=='
                                    />
                                </figure> 
                                <h2 className="card-title mt-4">{post.title}</h2> 
                                <p>{post.description}</p>
                                <div className="flex justify-center">
                                    <Link href={'/posts'}>
                                        <button className="btn mt-4 bg-amber-400 hover:bg-amber-500 border-none">Voltar</button> 
                                    </Link>
                                </div>
                            </div>
                        </div>    
                    </div>        
                </div>
            </div>
        </Header>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    
    const { slug }: any = params

        try {
            const responsePost = await client.getByUID('post', String(slug), {})
            
            const post = {
                slug: slug,
                title: responsePost.data.title,
                description: responsePost.data.description,
                cover: responsePost.data.cover,
                updateAt: new Date(responsePost.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })
            }

            return {
                props: {
                    post
                }
              
            }
            
        } catch (error) {
            if(error) {
                return {
                  redirect: {
                    permanent: false,
                    destination: '/posts'
                  }
                }
              }
        }
        
    
    return {
        props: {
            
        }
    }
}

