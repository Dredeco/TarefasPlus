import Link from 'next/link'
import React from 'react'
import { HeaderContainer, HeaderNav, HeaderSection, LoginButton } from './styles'
import { signIn, signOut, useSession } from 'next-auth/react'


export const Header = () => {
    const {data: session, status} = useSession()

    return (
        <HeaderContainer>
            <HeaderSection>
                
                <HeaderNav>
                    <Link href="/">
                        <h1>Tarefas<span>+</span></h1>
                    </Link>
                    {session?.user && (
                    <Link href="/dashboard">
                        Meu painel
                    </Link>
                    )}
                </HeaderNav>

                {status === 'loading' ? (
                    <></>
                ) : session ? (
                    <LoginButton onClick={() => signOut()}>Olá, {session.user?.name}</LoginButton>
                ) : (
                    <LoginButton onClick={() => signIn('google')}>Acessar</LoginButton>
                )}

                
            </HeaderSection>
        </HeaderContainer>
    )
}
