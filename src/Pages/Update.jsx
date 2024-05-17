import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'


function Update() {

  const {id} = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddres] = useState("")
  const [image, setImage] = useState(null)
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn:(data) => axios.put(`http://localhost:3000/todo/${id}`, data),
    onSuccess:(data) => {
      queryClient.invalidateQueries('todo')
    }
  })

  const {data = {}} = useQuery({
    queryKey:['todo'],
    queryFn: () => axios.get(`http://localhost:3000/todo/${id}`).then(res => {
      setImage(res.data.image);
      setName(res.data.name);
      setSurname(res.data.surname);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      setAddres(res.data.address);
      return res.data
    })
  })

const updateImage = (evt) => {
  setImage(URL.createObjectURL(evt.target.files[0]))
}

const handleUpdateForm = (evt) => {
  evt.preventDefault()
  const updateData = {
    image, 
    name,
    surname,
    email,
    phone,
    address
  }
  mutate(updateData)
  toast.success("User information updated!")
  setTimeout(() => {
    navigate('/')
  }, 2000)
}
  return (
    <div className='bg-white w-[50%] rounded-md p-4 mx-auto mt-10'>
    <Toaster position="top-center" reverseOrder={false}/>
      <h2 className='text-[30px] text-slate-600 text-center font-bold leading-0 mb-5'>Update user</h2>
      <form onSubmit={handleUpdateForm}>
        <div className='flex items-start justify-between'>
        <div className='flex flex-col space-y-[10px] w-[47%]'>
        <label className='flex flex-col space-y-[7px]'>
             <span className='text-[20px] font-medium'>Enter your update name</span>
             <input value={name} onChange={(e) => setName(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105' name='user_name' type="text" placeholder='Enter your update name' required/>
        </label>
        <label className='flex flex-col space-y-[7px]'>
             <span className='text-[20px] font-medium'>Enter your update surname</span>
             <input value={surname} onChange={(e) => setSurname(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105' name='user_surname' type="text" placeholder='Enter your update surname' required/>
        </label>
        <label className='flex flex-col space-y-[7px]'>
             <span className='text-[20px] font-medium'>Enter your update email</span>
             <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105' name='user_email' type="email" placeholder='Enter your update email' required/>
        </label>
        <label className='flex flex-col space-y-[7px]'>
             <span className='text-[20px] font-medium'>Enter your update phone</span>
             <input value={phone} onChange={(e) => setPhone(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105' name='user_phone' type="tel" placeholder='Enter your update phone' required/>
        </label>
       
        </div>
        <div className='w-[47%]'>
        <label className='flex flex-col space-y-[7px] mb-5'>
             <span className='text-[20px] font-medium'>Enter your update address</span>
             <input value={address} onChange={(e) => setAddres(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105' name='user_address' type="text" placeholder='Enter your update address' required/>
        </label>
          <label className='flex flex-col '>
            <span className='text-[20px] cursor-pointer font-medium'>Choose update image</span>
            <input onChange={updateImage}  type="file" className='opacity-0 scale-0'/>
            {
              image ? <img src={image} alt="" width={"100$=%"} height={100} /> : "Update image"
            }
          </label>
        </div>
        </div>
        <div className='flex items-center gap-[10px] justify-end'>
          <button onClick={() => navigate('/')} className='w-[150px] p-2 bg-red-500 rounded-md transition-all duration-300 hover:scale-105 text-white text-[20px] font-bold'>Cancel</button>
          <button  className='w-[150px] p-2 bg-blue-500 rounded-md transition-all duration-300 hover:scale-105 text-white text-[20px] font-bold'>Update</button>
        </div>
      </form>
  </div>
  )
}

export default Update