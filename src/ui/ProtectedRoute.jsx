import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useGetuser from "../features/authentication/useGetuser";
import Spinner from "./Spinner";
const FullPage = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function ProtectedRoute({ children }) {
    //1--load the authenticated user
    const { user, isLoading, isAuthenticated } = useGetuser();
    const navigate = useNavigate();
    //3--if there is no authenticated user redirect to login page 
    useEffect(() => {
        if (!isLoading && !isAuthenticated) navigate('login');
    }, [isLoading, isAuthenticated, navigate]);
    //2--spinner while loading 
    if (isLoading) return (
        <FullPage>
            <Spinner />
        </FullPage>
    )


    //4--if there is a user render the application 
    if (isAuthenticated) return children;
}
