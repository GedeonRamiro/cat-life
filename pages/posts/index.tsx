import  Head  from 'next/head'
import Header from '../../components/Header'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import * as prismic from '@prismicio/client'
import { client } from '../../utils/prismic-configuration';
import { useState } from 'react'
import Link from 'next/link'

type Post = {
    slug: string
    title: string
    description: string | null
    cover: { url: string }
    updateAt: string
}


type ProstProps = {
    posts: Post[]
    page: string
    totalPage: string
}

const Posts = ({ posts: postsBlog, page, totalPage }: ProstProps) => {
    
    const [posts, setPosts] = useState(postsBlog || [])
    const [currentPage, setCurrentPage] = useState(Number(page))


    const reqPost = async (pageNumber: number) => {
        const response = await client.query(
            prismic.Predicates.at('document.type', 'post'),
            { 
                orderings: ['document.last_publication_date desc'],
                fetch: ['post.title, post.description, post.cover'],
                pageSize: 6,
                page: pageNumber 
            },
          );

          return response
    }

    const navigatePage = async (pageNumber: number) => {
        const response = await reqPost(pageNumber)

        if(response.results.length === 0) return

        const getPosts = response.results.map((post) => ({
        
            slug: post.uid,
            title: post.data.title,
            description: post.data.description,
            cover: post.data.cover,
            updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }))

        

        setCurrentPage(pageNumber)
        setPosts(getPosts as Post[])

    } 

    
    return (
        <>
            <Head>
                <title>Conteúdo Gatos</title>
            </Head>
            <Header>
            <div className="container mx-auto">
                <div className="grid gap-6 my-10 md:my-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {posts && posts.map(post => (
                        <div className="card text-center shadow-2xl mx-2" key={post.slug}>
                            <figure className="px-10">
                            <Image
                                className="rounded-lg" 
                                src={post.cover.url} 
                                alt={post.title}
                                width={720}
                                height={410}
                                objectFit='cover'
                                quality={100}
                                placeholder='blur'
                                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8fEOxHgAGnwJNrlOKngAAAABJRU5ErkJggg=='
                            />
                            </figure> 
                            <div className="card-body flex justify-between">
                                <div>
                                    <h2 className="card-title">{post.title}</h2> 
                                    <p>{post.description?.slice(0,100) + '...'}</p>
                                    <span className="mt-4 text-sm font-semibold">{post.updateAt}</span> 
                                </div>
                                <div className="justify-center card-actions">
                                    <Link href={`posts/${post.slug}`}>
                                        <button className="btn bg-amber-400 hover:bg-amber-500 border-none">Ver Detalhes</button> 
                                    </Link>
                                </div>
                            </div>
                        </div> 
                    ))}
                </div>
                    <div className="flex justify-between sm:mx-0 mx-6 mb-10">
                        {Number(currentPage >= 2) ?  (
                            <div className="btn-group">
                                <button onClick={ () => navigatePage(1) } className="btn mx-1">«</button> 
                                <button onClick={ () => navigatePage(Number(currentPage - 1))} className="btn">anterior</button>
                            </div>
                        ): (
                            <div className="btn-group">
                                <button onClick={ () => navigatePage(1) } className="btn mx-1 btn-disabled">«</button> 
                                <button onClick={ () => navigatePage(Number(currentPage - 1)) } className="btn btn-disabled">anterior</button>
                            </div>
                        )}
                        {Number(currentPage < Number(totalPage))  ? (
                             <div className="btn-group">
                             <button onClick={ () => navigatePage(Number(currentPage + 1)) }  className="btn mx-1">próximo</button> 
                             <button onClick={ () => navigatePage(Number(totalPage)) } className="btn">»</button>
                         </div>
                        ) : (
                            <div className="btn-group">
                            <button  onClick={ () => navigatePage(Number(currentPage + 1)) } className="btn mx-1 btn-disabled">próximo</button> 
                            <button onClick={ () => navigatePage(Number(totalPage))} className="btn btn-disabled">»</button>
                        </div>
                        )}
                        
                    </div>
            </div>
    

            </Header>
        </>
    )
}

export default Posts

export const  getServerSideProps: GetServerSideProps = async () => {
    
    const responsePosts = await client.query(
        prismic.Predicates.at('document.type', 'post'),
        { 
            orderings: ['document.last_publication_date desc'],
            fetch: ['post.title, post.description, post.cover'],
            pageSize: 6 
        },
      );

    const posts = responsePosts.results.map((post) => ({
        
        slug: post.uid,
        title: post.data.title,
        description: post.data.description,
        cover: post.data.cover,
        updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }))
    
    return {
        props: {
            posts,
            page: responsePosts.page,
            totalPage: responsePosts.total_pages  
        }
    }
}