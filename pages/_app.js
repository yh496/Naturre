import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import Header from '../components/header'


export default function MyApp(props) {
    const { Component, pageProps } = props;
    // serverCookie
    //let cookie = serverCookie === '' ? cookies : serverCookie;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Naturre</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                   {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Header/> 
                      <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};


MyApp.getInitialProps = async ({ Component, ctx }) => {
    // let serverCookie = (ctx.req && ctx.req.headers && ctx.req.headers.cookie) ? parseCookie(ctx.req.headers.cookie) : '';

    if(ctx.res){
        console.log('server !');
    }else{
        console.log('client !');
    }

    let pageProps = {} // This is how pages will get their own getinitialprops
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    if (!pageProps.namespacesRequired) {
        pageProps.namespacesRequired = ['common']
    }
    return { pageProps }
    // serverCookie : serverCookie

}
