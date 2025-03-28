import Header from './Header';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className='container mt-5'>
                {children}
            </main>
        </>
    )
}

export default Layout;