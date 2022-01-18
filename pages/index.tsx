import type { NextPage } from 'next'
import  Head  from 'next/head'
import Header from '../components/Header'
import Foto01 from '../public/images/foto-gato01.jpg'
import Image from 'next/image'


const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>Apaixonados por cats!</title>
    </Head>
      <Header>
        <main>
        <div className="hero min-h-screen">
          <div className="flex-col hero-content lg:flex-row-reverse">
            <Image src={Foto01} className="max-w-sm rounded-lg shadow-2xl" /> 
            <div>
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1> 
              <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p> 
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
        </main>
      </Header>
    </>
    )
}

export default Home
