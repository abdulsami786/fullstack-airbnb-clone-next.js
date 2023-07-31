'use client'

import {signIn} from 'next-auth/react'
import { FC,useState,useCallback } from 'react'
import axios from 'axios'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import{
    FieldValues,
    SubmitHandler,
    useForm
}from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub} from 'react-icons/ai'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'
import {useRouter} from 'next/navigation'

interface LoginModalProps {
  
}

const LoginModal: FC<LoginModalProps> = ({}) => {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading] = useState(false)
    
    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }= useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true)

       signIn('credentials',{
        ...data,
        redirect:false
       })
       .then((callback)=>{
        setIsLoading(false);

        if(callback?.ok){
            toast.success("Logged In");
            router.refresh();
            loginModal.onClose()
        }

        if(callback?.error){
            toast.error(callback.error)
        }
       })
    }

    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal,registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title='Welcome back to Airbnb'
            subtitle='Login to your Account'
            />
            <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
           
            <Input
            id='password'
            label='Password'
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />

        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={()=>signIn('google')}
            />
            <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={()=>signIn('github')}
            />
            <div
            className='text-neutral-500 text-center mt-4 font-light'
            >
                <div
                className='justify-center flex flex-row items-center gap-2'
                >
                    <div>
                        First time using Airbnb?
                    </div>
                    <div
                    onClick={toggle}
                    className='text-neutral-800 cursor-pointer hover:underline'
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOPen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
  )
}

export default LoginModal