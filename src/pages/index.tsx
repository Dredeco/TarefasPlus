import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import ImageLogo from '../../public/hero.png'

const HomeContainer = styled.div`
  background-color: #0f0f0f;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const HomeMain = styled.main`
  
`

const HomeLogoContent = styled.div`
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

const HomeTitle = styled.h1`
  color: #fff;
  text-align: center;
  margin: 28px;
  line-height: 150%;

  @media screen and (max-width: 580px){
    font-size: 24px;
  }
`

const HomeInfoContent = styled.div`
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

export default function Home() {
  return (
    <HomeContainer>
      <Head>
        <title>Tarefa+ | Organize suas tarefas de forma fácil</title>
      </Head>

      <HomeMain>
        <HomeLogoContent>
          <Image
            alt="Logo Tarefas"
            src={ImageLogo}
            priority
          />
        </HomeLogoContent>

        <HomeTitle>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </HomeTitle>

        <HomeInfoContent>
          <section>
            <span>
              +12 posts
            </span>
          </section>
          <section>
            <span>
              +90 comentários
            </span>
          </section>
        </HomeInfoContent>

      </HomeMain>
    </HomeContainer>
  )
}
