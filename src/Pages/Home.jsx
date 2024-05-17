import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'


import More from '../assets/Images/more.svg'
import Update from '../assets/Images/pencil.svg'
import Delete from '../assets/Images/trash.svg'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'


function Home() {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
    const {data = [], isLoading, isError} = useQuery({
       queryKey:['todo'],
       queryFn:() => axios.get("http://localhost:3000/todo").then(res => res.data)
    })
// const searchList = (evt) => {
//   const searchData = data.filter(item => {

//   })
// }

    const {mutate} = useMutation({
      mutationFn:(id) => axios.delete(`http://localhost:3000/todo/${id}`),
      onSuccess:() => {
        queryClient.invalidateQueries('todo')
        toast.success("Deleted user!")
      }
    })

  if(isLoading) return <h2>Loading...</h2>
  if(isError) return <h2>Error</h2>
  
  return (
    <>
    <div className='bg-white w-[70%] p-3 rounded-lg mx-auto mt-10'>
    <Toaster position="top-center" reverseOrder={false}/>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-[30px] text-slate-700 font-bold'>Users</h2>
        <button onClick={() => navigate('/add')} className='p-2 w-[200px] transition-all duration-300 hover:scale-105 bg-blue-400 text-white text-[20px] font-bold rounded-md'>Add user</button>
      </div>
    <table className='w-full'>
      <thead>
        <tr>
          <th className='p-2 text-start bg-teal-500 text-[18px] text-white rounded-tl-md rounded-bl-md'>Image</th>
          <th className='p-2 text-start bg-teal-500 text-[18px] text-white'>User name</th>
          <th className='p-2 text-start bg-teal-500 text-[18px] text-white'>User surname</th>
          <th className='p-2 text-start bg-teal-500 text-[18px] text-white'>User email</th>
          <th className='p-2 text-start bg-teal-500 text-[18px] text-white'>User phone</th>
          <th className='p-2 text-start bg-teal-500 text-[18px] text-white'>User address</th>
          <th className='p-2 text-center bg-teal-500 text-[18px] text-white rounded-tr-md rounded-br-md'>Action</th>
        </tr>
      </thead>
      <tbody>
       {
        data.length > 0 && data.map(item => (
            <tr className="even:bg-gray-200 transition-all duration-300 hover:bg-cyan-200" key={item.id}>
              <td className='p-2 text-[16px] font-medium'>
                <img className='rounded-[50%]' src={item.image} alt="Image" width={60} height={60} />
              </td>
              <td className='p-2 text-[16px] font-medium'>{item.name}</td>
              <td className='p-2 text-[16px] font-medium'>{item.surname}</td>
              <td className='p-2 text-[16px] font-medium'>{item.email}</td>
              <td className='p-2 text-[16px] font-medium'>{item.phone}</td>
              <td className='p-2 text-[16px] font-medium'>{item.address}</td>
              <td className='p-2 text-[16px] font-medium'>
                <div className='flex items-center space-x-[7px] justify-center'>
                <button onClick={() => navigate(`/more/${item.id}`)} className='rounded-md p-2 w-[40px] transition-all duration-300 hover:scale-105 bg-blue-500 flex items-center justify-center'>
                  <img src={More} alt="More icon" />
                </button>
                <button onClick={() => navigate(`/update/${item.id}`)} className='rounded-md p-2 w-[40px] transition-all duration-300 hover:scale-105 bg-green-600 flex items-center justify-center'>
                  <img src={Update} alt="Update icon" />
                </button>
                <button onClick={() => mutate(item.id)} className='rounded-md p-2 w-[40px] transition-all duration-300 hover:scale-105 bg-red-500 flex items-center justify-center'>
                  <img src={Delete} alt="Delete icon" />
                </button>
                </div>
              </td>
            </tr>
        ))
       }
      </tbody>
        
    </table>
    </div>
    </>
  )
}

export default Home