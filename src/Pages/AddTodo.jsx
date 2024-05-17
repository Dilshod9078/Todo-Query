import React, { useState } from 'react'
import Arrow from '../assets/Images/arrow-left.svg'
import { useNavigate } from 'react-router-dom'
import { useMutation , useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
function AddTodo() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
 const {mutate} = useMutation({
  mutationFn:(body) => axios.post(`http://localhost:3000/todo`, body),
   onSucces:(res) => {
    console.log(res);
    queryClient.invalidateQueries('todo')
   },
   onerror:(err) => {
    console.log(err);
   }
 })

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddres] = useState("")
  const [image, setImage] = useState(null)

  const addImageChange = (evt) => {
    setImage(URL.createObjectURL(evt.target.files[0]))
  }

 const handleFormSubmit = (evt) => {
  evt.preventDefault()
  const data ={
    image,
    name,
    surname,
    email,
    phone,
    address
  }
  mutate(data)
  toast.success('Added user!')
  setTimeout(() => {
    navigate('/')
  }, 2000)
 }

  return (
    <div className='bg-white w-[50%] rounded-md p-4 mx-auto mt-10'>
      <Toaster position="top-center" reverseOrder={false}/>
      <button onClick={() => navigate('/')}>
        <img src={Arrow} alt="Arrow icon" />
      </button>
        <h2 className='text-[30px] text-slate-600 text-center font-bold leading-0 mb-5'>Add user</h2>
        <form onSubmit={handleFormSubmit}>
          <div className='flex items-start justify-between'>
          <div className='flex flex-col space-y-[10px] w-[47%]'>
          <label className='flex flex-col space-y-[7px]'>
               <span className='text-[20px] font-medium'>Enter your name</span>
               <input value={name} onChange={(e) => setName(e.target.value) } className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105'  type="text" placeholder='Enter your name' required/>
          </label>
          <label className='flex flex-col space-y-[7px]'>
               <span className='text-[20px] font-medium'>Enter your surname</span>
               <input value={surname} onChange={(e) => setSurname(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105' type="text" placeholder='Enter your surname' required/>
          </label>
          <label className='flex flex-col space-y-[7px]'>
               <span className='text-[20px] font-medium'>Enter your email</span>
               <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105'  type="email" placeholder='Enter your email' required/>
          </label>
          <label className='flex flex-col space-y-[7px]'>
               <span className='text-[20px] font-medium'>Enter your phone</span>
               <input value={phone} onChange={(e) => setPhone(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105'  type="tel" placeholder='Enter your phone' required/>
          </label>
         
          </div>
          <div className='w-[47%]'>
          <label className='flex flex-col space-y-[7px] mb-5'>
               <span className='text-[20px] font-medium'>Enter your address</span>
               <input value={address} onChange={(e) => setAddres(e.target.value)} className='p-2 border-[1px] border-solid border-gray-400 rounded-md outline-none focus:shadow-md focus:shadow-blue-500 transition-all duration-300 hover:scale-105'  type="text" placeholder='Enter your address' required/>
          </label>
            <label className='flex flex-col space-y-[10px]'>
              <span className='text-[20px] cursor-pointer font-medium'>Choose image</span>
              <input onChange={addImageChange} type="file" className='opacity-0 scale-0'/>
              {
                image ? <img src={image} alt="" width={"100%"} height={80} /> : "Not image"
              }
            </label>
          </div>
          </div>
          <div className='flex items-center justify-end'>
            <button className='w-[150px] p-2 bg-blue-500 rounded-md transition-all duration-300 hover:scale-105 text-white text-[20px] font-bold'>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default AddTodo