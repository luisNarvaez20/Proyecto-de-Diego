import { NextResponse } from 'next/server';
//import Cookies from 'js-cookie';

export async function middleware(req) {
    let token = req.cookies.get("token");
    if (req.url.includes("/login")) {
        if (token != undefined) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        } 
    }
    if (req.url.includes("/dashboard")) {
        if (token === undefined) {
            return NextResponse.redirect(new URL("/logi", req.url));
        } 
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};