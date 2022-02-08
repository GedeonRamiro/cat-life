import type { GetStaticProps, NextPage } from 'next'
import  Head  from 'next/head'
import Header from '../components/Header'
import * as prismic from '@prismicio/client'
import { client } from '../utils/prismic-configuration';
import { RichText } from 'prismic-reactjs';


type Home = {
  subTitle: string
  title: string
  textInfo: string
  linkAction: { url: string }
  imagehero: { url: string }
  titleFooter: string
  textFooter: string
  linkActionFooter: { url: string }
  imageFooter: { url: string }
}

type Collpase = {
  id: string
  title: string
  content: string
}

type ContentPros = {
  home: Home
  collapses: Collpase[]
} 


const Home: NextPage<ContentPros> = ( { home, collapses } ) => {

  return (
    <>
    <Head>
      <title>Apaixonados por cats!</title>
    </Head>
      <Header>
        <main className="container mx-auto">
        <section className="Hero">
          <div className="flex flex-col-reverse md:flex-row items-center my-12 md:my-24">
            <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
              <p className="uppercase tracking-loose">{home.subTitle}</p>
              <h1 className="font-bold text-3xl my-4">{home.title}</h1>
              <p className="leading-normal mb-4">{home.textInfo}</p>
              <a href={home.linkAction.url}>
                <button className="btn btn-outline hover:bg-amber-400 hover:border-amber-400">começa agora!</button> 
              </a>
            </div>
            <div className="lg:w-1/2 lg:py-6 text-center mx-6 sm:mx-0">
              <img src={home.imagehero.url} className=" rounded-lg shadow-2xl fill-current text-gray-900 lg:w-4/5 mx-auto" /> 
            </div>
          </div>
        </section>

        <div className="divider font-semibold text-gray-700 text-xl  sm:text-2xl uppercase text-center mb-6">Curiosidades sobre gatos</div> 
        <section className="Perguntas e Respotas mx-6">
          {collapses.map((collapse) => (
            <div tabIndex={0} key={collapse.id} className="collapse w-full border rounded-box bg-amber-300 collapse-arrow my-2"> 
                <div className="collapse-title sm:text-lg font-medium">
                  {collapse.title}
                </div> 
                <div className="collapse-content"> 
                  <p className="text-sm sm:text-base">{collapse.content}</p>
                </div>
            </div> 
          ))}
        </section>

        <div className="divider font-semibold text-gray-700 text-xl sm:text-2xl uppercase text-center mt-32">Curiosidades sobre gatos</div> 
        <section className="footer">
        <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
              <h1 className="font-bold text-3xl my-4">{home.titleFooter}</h1>
              <p className="leading-normal mb-4">{home.textFooter}</p>
              <a href={home.linkActionFooter.url}>
                <button className="btn btn-outline hover:bg-amber-400 hover:border-amber-400">Acessar conteúdo</button> 
              </a>
            </div>
            <div className="lg:w-1/2 lg:py-6 text-center mx-6 sm:mx-0">
              <img src={home.imageFooter.url} className="rounded-lg shadow-2xl fill-current text-gray-900 lg:w-4/5 mx-auto" /> 
            </div>
          </div>
        </section>    
        </main>
      </Header>
    </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {

  
  const resultHome = await client.query(
    prismic.Predicates.at('document.type', 'home')
  );

 const home = resultHome.results.reduce((acumulador, home) => ({
        ...acumulador,
        subTitle: home.data.sub_title,
        title: home.data.title,
        textInfo: home.data.text_info,
        linkAction: home.data.link_action,
        imagehero: home.data.image_hero,
        titleFooter:home.data.title_footer,
        textFooter: home.data.text_footer,
        linkActionFooter: home.data.link_active_footer,
        imageFooter: home.data.image_footer,
  }), {})


  const resultCollapse = await client.query(
    prismic.Predicates.at('document.type', 'collapse')
  );

 const collapses = resultCollapse.results.map((collapse) => ({
        id: collapse.id,
        title: collapse.data.title,
        content: collapse.data.content
    }
 ))

 console.log(collapses)


  return {
    props: {
      home,
      collapses,
    },
    revalidate: 60 * 2 // A cada 2min
  }

}