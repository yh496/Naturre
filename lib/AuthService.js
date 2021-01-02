import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
const SECRET_KEY = process.env.JWT_KEY;

const user_ctx = {
    email: '',
    permission: '',
    isAuthenticated: false
}

const initialize = (token) => {
    if (!token) return;
    let payload = jwt.decode(token)
    set.user_ctx(payload)
}

export const redirect = (ctx) => {
    let verifyRes = get.cookies(ctx)
    if (verifyRes) {
        if (ctx && ctx.res) {
            ctx.res.writeHead(302, {
                Location:'/'
            })
            ctx.res.end()
        } else {
            Router.push('/')
          }
    } else {
        alert('failed')
        return;
    }
}

/*
	=================================> SETTER <=================================
*/
export const set = {}
set.credentials = async ({email,password}, type) => {  
    let response; 
    if (type === 'signup-request') {
        response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({email,password})
        })
    } else {
        response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({email,password})
        })
    }

    response = await response.json()
    if (response.status === 'success') {
        Cookies.set('auth', response.token);
        return response.status
    } else {
        alert(response.error)
        return response.status
    }
}

set.reset_credentials = () => {
    Cookies.remove('auth')
    user_ctx.email = ''
    user_ctx.permission = ''
    user_ctx.isAuthenticated = false;
    window.location.href='/login'
}

set.user_ctx = (payload) => {
    user_ctx.email = payload.email;
    user_ctx.permission = payload.permission;
    user_ctx.isAuthenticated = true;
}


/*
	=================================> GETTER <=================================
*/

export const get = {}
get.cookies = (ctx) => {
    let token;
    if (isCookie(ctx)) {
        if (ctx && ctx.req) {
            //Server render
            token = parseCookie(ctx.req.headers.cookie);
        } else {
            //Client render
            token = Cookies.get('auth')
        }
        return verifyToken(token) ?  token : null
    } else {
        return null
    }
}

get.user_ctx = (token) => {
    return user_ctx
}

/*
	=================================> HELPER <=================================
*/
const isCookie = (ctx) => {
    if (ctx && ctx.req) {
        return !!parseCookie(ctx.req.headers.cookie)
    } else {
        return !!Cookies.get('auth')
    }
}


const verifyToken = (jwtToken) => {
    try {
      return jwt.verify(jwtToken, SECRET_KEY);
    } catch (e) {
      console.log('e:', e);
      return null;
    }
}   

const parseCookie = (str) => {
    let acc = str.split(';').map(v => v.split('=')).reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});


    return acc.auth

};

export default {set, get, redirect, verifyToken, initialize};