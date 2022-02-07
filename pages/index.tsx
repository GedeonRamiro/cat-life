import type { GetStaticProps, NextPage } from 'next'
import  Head  from 'next/head'
import Header from '../components/Header'
import * as prismic from '@prismicio/client'
import { client } from '../utils/prismic-configuration';
import { RichText } from 'prismic-reactjs';


type TcuriositiesCats = {
  title: string,
  content: string
}

type Content = {
  subTitle: string
  title: string
  textInfo: string
  linkAction: string
  imagehero: string
  titleFooter: string
  textFooter: string
  linkActionFooter: string
  imageFooter: string
}

type Collpase = {
  id: string
  title: string
  content: string
}

type ContentPros = {
  content: Content
  collapses: Collpase[]
} 


const Home: NextPage = ( { content, collapses }: ContentPros ) => {


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
              <p className="uppercase tracking-loose">{content.subTitle}</p>
              <h1 className="font-bold text-3xl my-4">{content.title}</h1>
              <p className="leading-normal mb-4">{content.textInfo}</p>
              <a href={content.linkAction}>
                <button className="btn btn-outline hover:bg-amber-400 hover:border-amber-400">começa agora!</button> 
              </a>
            </div>
            <div className="lg:w-1/2 lg:py-6 text-center mx-6 sm:mx-0">
              <img src={content.imagehero} className=" rounded-lg shadow-2xl fill-current text-gray-900 lg:w-4/5 mx-auto" /> 
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
              <h1 className="font-bold text-3xl my-4">{content.titleFooter}</h1>
              <p className="leading-normal mb-4">{content.textFooter}</p>
              <a href={content.linkActionFooter}>
                <button className="btn btn-outline hover:bg-amber-400 hover:border-amber-400">Acessar conteúdo</button> 
              </a>
            </div>
            <div className="lg:w-1/2 lg:py-6 text-center mx-6 sm:mx-0">
              <img src={content.imageFooter} className="rounded-lg shadow-2xl fill-current text-gray-900 lg:w-4/5 mx-auto" /> 
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

  
  const result = await client.query(
    prismic.Predicates.at('document.type', 'home')
  );


  const {
    sub_title, title, text_info, link_action, image_hero,
    title_footer, text_footer, link_active_footer, image_footer
  } = result.results[0].data

  const content = {
    subTitle: RichText.asText(sub_title),
    title: RichText.asText(title),
    textInfo: RichText.asText(text_info),
    linkAction: link_action.url,
    imagehero: image_hero.url,
    titleFooter: RichText.asText(title_footer),
    textFooter: RichText.asText(text_footer),
    linkActionFooter: link_active_footer.url,
    imageFooter: image_footer.url,  
  }

  const resultCollapse = await client.query(
    prismic.Predicates.at('document.type', 'collapse')
  );

 const collapses = resultCollapse.results.map((collapse) => {
    return {
        id: collapse.id,
        title: RichText.asText(collapse.data.title),
        content: RichText.asText(collapse.data.content),
    }
  })


  return {
    props: {
      content,
      collapses,
    },
    revalidate: 60 * 2 // A cada 2min
  }

}