import { Routes, Route } from 'react-router'
import { Footer } from './components/footer/Footer.jsx'
import { Header } from './components/header/Header.jsx'
import { Home } from './components/home/Home.jsx'
import { AboutAuthor } from './components/about-author/AboutAuthor.jsx'
import { EditAuthorInfo } from './components/edit-author-info/EditAuthorInfo.jsx'

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<AboutAuthor />} />
                    <Route path='/about/edit' element={<EditAuthorInfo />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
