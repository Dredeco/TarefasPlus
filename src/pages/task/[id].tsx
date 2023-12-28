import Textarea from "@/components/textarea";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next"
import { useSession } from "next-auth/react";
import Head from "next/head"
import { ChangeEvent, FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
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
            background-color: #3127fa;
        }

        &:disabled {
            background-color: #5f9dfa;
            cursor: not-allowed;
        }
    }
`

const CommentsContainer = styled.section`
    width: 100%;
    margin-top: 14px;

    p {
        margin-top: 14px;
        white-space: pre-wrap;
    }

    h2 {
        margin-bottom: 1rem;
    }
`

const Comment = styled.article`
    border: 1px solid #ddd;
    padding: 14px;
    border-radius: 4px;
    margin-bottom: 14px;
`

const HeadComment = styled.div`
    display: flex;
    align-items: center;

    label {
        background-color: #ccc;
        padding: 4px 8px;
        margin-right: 8px;
        border-radius: 4px;
    }

    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`

interface TaskProps {
    item: {
        tarefa: string,
        createdAt: string,
        public: boolean,
        user: string,
        taskId: string,
    },
    allComments: CommentProps[]
}

interface CommentProps {
    id: string,
    comment: string,
    taskId: string,
    user: string,
    name: string
}

export default function Task({ item, allComments }: TaskProps) {

    const [input, setInput] = useState('')
    const [comments, setComments] = useState<CommentProps[]>(allComments || [])
    const { data: session } = useSession()

    async function handleComment(event: FormEvent) {
        event.preventDefault();

        if(input === "") {
            return
        }

        if(!session?.user?.email || !session?.user?.name) {
            return
        }

        try {
            const docRef = await addDoc(collection(db, "comments"), {
                comment: input,
                createdAt: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId
            })


            const data = {
                id: docRef.id,
                comment: input,
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId
            }

            setComments((oldItems) => [...oldItems, data])
            setInput('')
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeleteComment(id: string) {
        try {
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef)

            const deleteComment = comments.filter((comment) => comment.id !== id)
            setComments(deleteComment)
        } catch (error) {
            console.log(error)
        }
    }

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

                <form onSubmit={handleComment}>
                    <Textarea 
                        value={input}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                        placeholder="Digite o seu comentário"
                    />

                    <button disabled={!session?.user}>Enviar comentário</button>
                </form>
            </TaskCommentsContent>

            <CommentsContainer>
                <h2>Comentários</h2>
                {comments.length === 0 && (
                    <span>Nenhum comentário foi encontrado...</span>
                )}

                {comments.map((item) => (
                <Comment key={item.id}>
                    <HeadComment>
                        <label>{item.name}</label>
                        {item.user === session?.user?.email && (
                            <button onClick={() => handleDeleteComment(item.id)}>
                                <FaTrash
                                    size={18}
                                    color="#EA3140"
                                />
                            </button>
                        )}
                    </HeadComment>
                    <p>{item.comment}</p>
                </Comment>
                ))}
            </CommentsContainer>
        </TaskContainer>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;

    const docRef = doc(db, "tarefas", id)

    const q = query(collection(db, "comments"), where("taskId", "==", id))
    const snapshotComments = await getDocs(q)

    let allComments: CommentProps[] = [];
    snapshotComments.forEach((doc) => {
        allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId
        })
    })

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
            allComments: allComments
        },
    }
}
