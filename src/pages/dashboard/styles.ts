import styled from "styled-components"

export const DashboardContainer = styled.div`
    width: 100%;
`

export const DashboardMain = styled.main`
    
`

export const DashboardContent = styled.section`
    background-color: #0f0f0f;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DashboardContentForm = styled.div`
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
    }
`

export const DashboardCheckBoxArea = styled.div`
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

export const TaskContainer = styled.section`
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

export const Task = styled.article`
    margin-bottom: 14px;
    line-height: 150%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1.5px solid #909090;
    border-radius: 4px;
    padding: 14px;
`

export const TagContainer = styled.div`
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

export const TaskContent = styled.div`
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