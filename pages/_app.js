import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import Header from '../components/header';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import "../styles/login.css";


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

// function App() {
//   return (<Router>
//     <div className="App">
//       <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//         <div className="container">
//           <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link className="nav-link" to={"/sign-in"}>Login</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//
//       <div className="auth-wrapper">
//         <div className="auth-inner">
//           <Switch>
//             <Route exact path='/' component={Login} />
//             <Route path="/sign-in" component={Login} />
//             <Route path="/sign-up" component={SignUp} />
//           </Switch>
//         </div>
//       </div>
//     </div>
//   </Router>
//   );
// }
