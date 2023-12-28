import Textarea from '@/components/textarea'
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { FaShare, FaTrash } from 'react-icons/fa'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'
import styled from "styled-components"
import Link from 'next/link'

const DashboardContainer = styled.div`
    width: 100%;
`

const DashboardMain = styled.main`
    
`

const DashboardContent = styled.section`
    background-color: #0f0f0f;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DashboardContentForm = styled.div`
    max-width: 1024px;
    width: 100%;
    padding: 0 18px;
    padding-bottom: 28px;
    margin-top: 58px;

    h1{
        color: #fff;
        margin-bottom: 1rem;
    }

    button {
        width: 100%;
        border: 0;
        border-radius: 4px;
        color: #fff;
        background-color: #3183ff;
        padding: 12px 0;
        font-size: 18px;
        cursor: pointer;
        transition: all .4s;

        &:hover {
            background-color: #3127fa;
        }
    }
`

const DashboardCheckBoxArea = styled.div`
    margin: 14px 0;

    label {
        margin-left: 8px;
        color: #fff;
    }

    input {
        width: 18px;
        height: 18px;
    }
`

const TaskContainer = styled.section`
    margin: 34px auto 0 auto;
    padding: 0 18px;
    width: 100%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;

    a {
        text-decoration: none;
        color: #0f0f0f;
    }

    h1 {
        text-align: center;
        font-size: 32px;
        margin-bottom: 14px;
    }
`

const Task = styled.article`
    margin-bottom: 14px;
    line-height: 150%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1.5px solid #909090;
    border-radius: 4px;
    padding: 14px;
`

const TagContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;

    label {
        background-color: #3183ff;
        padding: 2px 6px;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
    }

    button {
        background: transparent;
        border: 0;
        margin: 0 8px;
        cursor: pointer;
    }
`

const TaskContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    p {
        white-space: pre-wrap;
    }

    button {
        cursor: pointer;
        background: transparent;
        border: 0;
        margin: 0 8px;
    }
`

interface HomeProps {
    user: {
        email: string
    }
}

interface TaskProps {
    id: string;
    createdAt: Date;
    public: boolean;
    tarefa: string;
    user: string;
}

const Dashboard = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [input, setInput] = useState('')
    const [publicTask, setPublicTask] = useState(false)
    const [tasks, setTasks] = useState<TaskProps[]>([])

    useEffect(() => {
        async function loadTarefas() {
            const tarefasRef = collection(db, "tarefas");
            const q = query(
                tarefasRef,
                orderBy("createdAt", "desc"),
                where("user", "==", user.email)
            )

            onSnapshot(q, (snapshot) => {
                let lista = [] as TaskProps[];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        createdAt: doc.data().createdAt,
                        user: doc.data().user,
                        public: doc.data().public
                    })
                })

                setTasks(lista)
            })
        }

        loadTarefas();
    }, [user.email])

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked)
    }

    async function handleRegisterTask(event:FormEvent) {
        event.preventDefault();

        if (input === '') return;

        try {
            await addDoc(collection(db, "tarefas"), {
                tarefa: input,
                createdAt: new Date(),
                user: user.email,
                public: publicTask
            })

            setInput('')
            setPublicTask(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleShare(id: string) {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/task/${id}`
        )

        alert("URL copiada com sucesso!")
    }

    async function handleDeleteTask(id: string) {
        const docRef = doc(db, "tarefas", id)

        await deleteDoc(docRef)
    }

    return (
        <DashboardContainer>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>

            <DashboardMain>
                <DashboardContent>
                    <DashboardContentForm>
                        <h1>Qual sua tarefa?</h1>

                        <form onSubmit={handleRegisterTask}>
                            <Textarea 
                                placeholder='Digite qual a sua tarefa'
                                value={input}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                            />
                            <DashboardCheckBoxArea>
                                <input 
                                    type='checkbox' 
                                    checked={publicTask}
                                    onChange={handleChangePublic}
                                />
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

                    {tasks.map((item) => (
                        <Task key={item.id}>
                            {item.public && (
                                <TagContainer>
                                    <label>PUBLICO</label>
                                    <button onClick={() => handleShare(item.id)}>
                                        <FaShare 
                                            size={22}
                                            color='#3183ff'
                                        />
                                    </button>
                                </TagContainer>
                            )}

                        <TaskContent>

                            {item.public ? (
                                <Link href={`/task/${item.id}`}>
                                    <p>{item.tarefa}</p>
                                </Link>
                            ) : (
                                <p>{item.tarefa}</p>
                            )}

                            <button onClick={() => handleDeleteTask(item.id)}>
                                <FaTrash 
                                    size={24}
                                    color='#ea3140'
                                />
                            </button>
                        </TaskContent>
                        </Task>
                    ))}

                    

                </TaskContainer>
            </DashboardMain>

        </DashboardContainer>
    )
}
export default Dashboard

export const getServerSideProps = (async ({req}) => {
    const session = await getSession({req})

    if(!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            user: {
                email: session.user.email
            }
        },
    }
}) satisfies GetServerSideProps
