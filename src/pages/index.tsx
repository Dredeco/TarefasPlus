import Head from 'next/head'
import Image from 'next/image'
import ImageLogo from '../../public/hero.png'
import { HomeContainer, HomeInfoContent, HomeLogoContent, HomeMain, HomeTitle } from '@/styles/Home'

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
