import React, { HTMLProps } from 'react'
import { TextareaMain } from './styles'

export default function Textarea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
    return (
        <TextareaMain {...rest}>

        </TextareaMain>
    )
}
