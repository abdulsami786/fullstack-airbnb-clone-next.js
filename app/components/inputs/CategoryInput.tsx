'use client';

import { IconType } from "react-icons";
import { FC } from 'react'

interface CategoryInputProps {
  icon:IconType,
  label:string,
  selected?:boolean,
  onClick:(value:string)=>void
}

const CategoryInput: FC<CategoryInputProps> = ({

    icon:Icon,
    label,
    selected,
    onClick
}) => {
  console.log("I am category InpuT");
  
  return (
    <div
        onClick={()=>onClick(label)}
        className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected?'border-black':'border-neutral-200'}
        `}
    >
        <Icon size={30}/>
        <div className="font-semi-bold">
            {label}
        </div>
    </div>
  )
}

export default CategoryInput