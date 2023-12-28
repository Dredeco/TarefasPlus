import styled from "styled-components"

export const HomeContainer = styled.div`
    background-color: #0f0f0f;
    width: 100%;
    height: calc(100vh - 76px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const HomeMain = styled.main`
    
`

export const HomeLogoContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        max-width: 480px;
        object-fit: contain;
        width: auto;
        height: auto;

        @media screen and (max-width: 580px){
            max-width: 80%;
        }
    }
`

export const HomeTitle = styled.h1`
    color: #fff;
    text-align: center;
    margin: 28px;
    line-height: 150%;

    @media screen and (max-width: 580px){
        font-size: 24px;
    }
`

export const HomeInfoContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    > section{
        background-color: #fafafa;
        padding: 14px 44px;
        border-radius: 4px;
        transition: transform 0.4s;

        &:hover{
            transform: scale(1.08);
        }

        @media screen and (max-width: 580px){
            width: 80%;
            margin-bottom: 14px;
            text-align: center;
        }
    }

    @media screen and (max-width: 580px){
        flex-direction: column;
    }
`