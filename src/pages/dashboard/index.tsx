import Textarea from '@/components/textarea'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { FaShare, FaTrash } from 'react-icons/fa'
import { DashboardCheckBoxArea, DashboardContainer, DashboardContent, DashboardContentForm, DashboardMain, TagContainer, Task, TaskContainer, TaskContent } from './styles'
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'

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

export default function Dashboard({ user }: HomeProps) {
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
                                    <button>
                                        <FaShare 
                                            size={22}
                                            color='#3183ff'
                                        />
                                    </button>
                                </TagContainer>
                            )}

                        <TaskContent>
                            <p>{item.tarefa}</p>
                            <button>
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
        props: {
            user: {
                email: session.user.email
            }
        },
    }
}
