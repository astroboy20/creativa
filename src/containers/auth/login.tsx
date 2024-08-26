"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    email:string
    emailRequired:string
    password:string
    passwordRequired:string
}
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit:SubmitHandler<Inputs> = (data) => {
    // Handle login logic here
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECD2FC66] py-[5%] px-[4%] md:px-[6%]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">Login to Creativa</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm md:text-base lg:text-lg">Email</label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              {...register('email', { required: 'Email is required' })} 
              className="mt-1"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm md:text-base lg:text-lg">Password</label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              {...register('password', { required: 'Password is required' })} 
              className="mt-1"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="bg-[#501078] text-white py-2 px-4 rounded mt-4">Login</Button>
        </form>
      </div>
    </div>
  );
};

export  {Login};
