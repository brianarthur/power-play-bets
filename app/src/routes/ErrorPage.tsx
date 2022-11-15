import { useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";

const ErrorPage = () => {
    const error: any = useRouteError();

    return (
        <>
            <Navbar />

            <div className='container error-page'>
                <div className='title'>Oops!</div>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </>
    );
}

export default ErrorPage