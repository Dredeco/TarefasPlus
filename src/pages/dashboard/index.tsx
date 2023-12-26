import Textarea from '@/components/textarea'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'
import { FaShare, FaTrash } from 'react-icons/fa'
import { DashboardCheckBoxArea, DashboardContainer, DashboardContent, DashboardContentForm, DashboardMain, TagContainer, Task, TaskContainer, TaskContent } from './styles'

export default function Dashboard() {
    return (
        <DashboardContainer>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>

            <DashboardMain>
                <DashboardContent>
                    <DashboardContentForm>
                        <h1>Qual sua tarefa?</h1>

                        <form>
                            <Textarea 
                                placeholder='Digite qual a sua tarefa'
                            />
                            <DashboardCheckBoxArea>
                                <input type='checkbox' />
                                <label>Deixar tarefa pública?</label>
                            </DashboardCheckBoxArea>
                        
                            <button type='submit'>
                                Registrar
                            </button>
                        </form>
                    </DashboardContentForm>
                </DashboardContent>

                <TaskContainer>
                    <h1>Minhas tarefas</h1>

                    <Task>
                        <TagContainer>
                            <label>PUBLICO</label>
                            <button>
                                <FaShare 
                                    size={22}
                                    color='#3183ff'
                                />
                            </button>
                        </TagContainer>

                        <TaskContent>
                            <p>Minha primeira tarefa de exemplo show demais!</p>
                            <button>
                                <FaTrash 
                                    size={24}
                                    color='#ea3140'
                                />
                            </button>
                        </TaskContent>
                    </Task>
                </TaskContainer>
            </DashboardMain>

        </DashboardContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if(!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {},
    }
}
