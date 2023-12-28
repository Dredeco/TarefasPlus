import Textarea from "@/components/textarea";
import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next"
import Head from "next/head"
import styled from "styled-components"

const TaskContainer = styled.div`
    width: 100%;
    max-width: 1024px;
    margin: 40px auto 0 auto;
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin-bottom: 14px;
    }
`

const TaskMain = styled.main`
    width: 100%;
`

const TaskContent = styled.article`
    border: 1.5px solid #909090;
    padding: 14px;
    line-height: 150%;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        white-space: pre-wrap;
        width: 100%;
    }
`

const TaskCommentsContent = styled.section`
    margin: 18px 0;
    width: 100%;
    max-width: 1024px;

    h2 {
        margin: 14px 0;
    }

    button {
        margin-top: 10px;
        width: 100%;
        padding: 12px 0;
        border-radius: 4px;
        border: 0;
        color: #fff;
        background-color: #3183ff;
        font-size: 18px;
        cursor: pointer;
        transition: all .4s;

        &:hover {
            filter: brightness(0.9);
        }
    }
`

interface TaskProps {
    item: {
        tarefa: string,
        createdAt: string,
        public: boolean,
        user: string,
        taskId: string,
    }
}

export default function Task({ item }: TaskProps) {
    return (
        <>
        <Head>
            <title>Detalhes da tarefa</title>
        </Head>

        <TaskContainer>
            <TaskMain>
                <h1>Tarefa</h1>
                <TaskContent>
                    <p>{item.tarefa}</p>
                </TaskContent>
            </TaskMain>

            <TaskCommentsContent>
                <h2>Deixar comentário</h2>

                <form>
                    <Textarea 
                        placeholder="Digite o seu comentário"
                    />

                    <button>Enviar comentário</button>
                </form>
            </TaskCommentsContent>
        </TaskContainer>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;

    const docRef = doc(db, "tarefas", id)

    const snapshot = await getDoc(docRef)

    if(snapshot.data() === undefined) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    if(!snapshot.data()?.public) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const miliseconds = snapshot.data()?.createdAt?.seconds * 1000;

    const task = {
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        createdAt: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id,
    }

    return {
        props: {
            item: task,
        },
    }
}
