import {useState} from 'react'
import './App.css'
import {HeaderComponent} from "./components/header.component.tsx";
import {Home} from "./pages/home.tsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MobileMenus} from "./components/mobileMenus.tsx";
import {FooterComponent} from "./components/footer.component.tsx";
import {PaginationComponent} from "./components/pagination.component.tsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className={""}>
            <MobileMenus />
            <ToastContainer/>
            <HeaderComponent/>
            <Home/>
            <FooterComponent />
        </div>
    )
}

export default App
