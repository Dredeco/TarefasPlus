import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    width: 100%;
    height: 76px;
    background-color: #0f0f0f;
    display: flex;
    align-items: center;
    justify-content: center;
`

const HeaderSection = styled.section`
    padding: 0 18px;
    width: 100%;
    max-width: 1024px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a{
        text-decoration: none;
        text-align: center;
    }

    h1{
        color: #fff;
        font-size: 32px;

        span{
            color: #ea3140;
            padding-left: 2px;
        }
    }
`

const HeaderNav = styled.nav`
    display: flex;
    align-items: center;

    :nth-child(2){
        background-color: #f1f1f1;
        color: #0f0f0f;
        padding: 4px 14px;
        border-radius: 4px;
        margin: 0 14px;
    }
`

const LoginButton = styled.button`
    background: transparent;
    padding: 8px 32px;
    border-radius: 24px;
    color: #fff;
    border: 1.5px solid #fff;
    cursor: pointer;
    transition: all 0.4s;
    font-weight: bold;

    &:hover{
        transform: scale(1.08);
        background-color: #fff;
        color: #0f0f0f;
    }
`

export const Header = () => {
    return (
        <HeaderContainer>
            <HeaderSection>
                
                <HeaderNav>
                    <Link href="/">
                        <h1>Tarefas<span>+</span></h1>
                    </Link>
                    <Link href="/dashboard">
                        Meu painel
                    </Link>
                </HeaderNav>

                <LoginButton>Minha conta</LoginButton>
            </HeaderSection>
        </HeaderContainer>
    )
}
