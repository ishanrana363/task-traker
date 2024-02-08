    import React from 'react'
import AppNavbar from './app-navbar';
import Header from './header';

    const Layout = (props) => {
    return (
        <div>
            <AppNavbar/>
            { props.children }
            <Header/>
        </div>
    )
    }

    export default Layout;
