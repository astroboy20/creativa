"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    name: string;
    email: string;
    password:string;
    confirmPassword:string
}
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit:SubmitHandler<Inputs> = (data) => {
    // Handle registration logic here
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECD2FC66] py-[5%] px-[4%] md:px-[6%]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="text-sm md:text-base lg:text-lg">Name</label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Enter your name" 
              {...register('name', { required: 'Name is required' })} 
              className="mt-1"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

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

          <div>
            <label htmlFor="confirmPassword" className="text-sm md:text-base lg:text-lg">Confirm Password</label>
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="Confirm your password" 
              {...register('confirmPassword', { required: 'Confirm password is required' })} 
              className="mt-1"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" className="bg-[#501078] text-white py-2 px-4 rounded mt-4">Register</Button>
        </form>
      </div>
    </div>
  );
};

export  {Register};
