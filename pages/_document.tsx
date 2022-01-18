import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
   
    render() {
      return (
        <Html>
          <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/images/favicon.ico"/>
          </Head>
          <body className='bg-gray-100'>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument