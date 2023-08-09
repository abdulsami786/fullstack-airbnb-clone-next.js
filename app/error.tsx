'use client'

import { FC, useEffect } from 'react'
import EmptyState from './components/EmptyState'
interface ErrorStateProps{
    error:Error
}

const error: FC<ErrorStateProps> = ({error}) => {
  useEffect(()=>{
    console.error(error)
  },[error])
    return (
    <EmptyState
    title='Oh No!'
    subtitle='Something Went wrong'
    />
  )
}

export default error