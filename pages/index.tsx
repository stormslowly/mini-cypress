import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import request from 'superagent';

export default () => {
  useEffect(() => {
    request
      .get('/test')
      .query({
        relative: 'integrations/foo.js',
      })
      .type('text')
      .then((res) => {
        mocha.setup('bdd');
        mocha.checkLeaks();

        console.log(res.text);
        try {
          eval(res.text);
        } catch (e) {}
      });
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css" />
      </Head>
      <Script
        src="https://unpkg.com/chai/chai.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/mocha/mocha.js"
      ></Script>
      <div>min-cypress runs here</div>
      <div id="mocha"></div>
      <button
        onClick={() => {
          mocha.run();
        }}
      >
        run test
      </button>
    </>
  );
};
