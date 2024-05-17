import React, { useState } from 'react'
import Arrow from '../assets/Images/arrow-left.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function SingleTodo() {

  const {id} = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState([])

  const {data} = useQuery({
    queryKey:["todo"],
    queryFn:() => axios.get(`http://localhost:3000/todo/${id}`).then(res => {
      setState(res.data);
    }),
    onSuccess:() => {
      console.log("Success data");
    }
  })


  return (
    <div className='bg-white w-[50%] p-4 rounded-lg mx-auto mt-10'>
      <button onClick={() => navigate('/')}>
        <img src={Arrow} alt="Arrow icon" />
      </button>
        <h2 className='text-[30px] text-center font-bold text-slate-600 mb-3'>{state.name}</h2>
      <div className='flex items-center justify-between'>
         <div>
         <p className='text-[20px] font-bold'>Surname: <span className='font-medium text-[18px] text-slate-400'>{state.surname}</span></p>
         <p className='text-[20px] font-bold'>email: <span className='font-medium text-[18px] text-slate-400'>{state.email}</span></p>
          <p className='text-[20px] font-bold'>Phone: <span className='font-medium text-[18px] text-slate-400'>{state.phone}</span></p>
          <p className='text-[20px] font-bold'>Address: <span className='font-medium text-[18px] text-slate-400'>{state.address}</span></p>
         </div>
         <img className='rounded-md' src={state.image} alt="" width={"50%"} height={"150px"}/>
      </div>
    </div>
  )
}

export default SingleTodo