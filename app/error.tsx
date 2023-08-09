'use client'
import { FC } from 'react'
import EmptyState from './components/EmptyState'
interface ErrorStateProps{
    error:Error
}

const errorState: FC<ErrorStateProps> = () => {

    return (
    <EmptyState
    title='Oh No!'
    subtitle='Something Went wrong'
    />
  )
}

export default errorState