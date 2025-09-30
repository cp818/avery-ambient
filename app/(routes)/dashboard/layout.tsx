"use client"
import React, { useEffect } from 'react';
import AppHeader from './_components/AppHeader';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

function DashboardLayout({
    children,
}:Readonly<{
    children: React.ReactNode;
}>)
{
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            // Create user in database if not exists
            createUser();
        }
    }, [user]);

    const createUser = async () => {
        try {
            await axios.post('/api/users');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
    <div>
        <AppHeader/>
        <div className='px-10 md:px-20 lg:px-40'>
           {children} 
        </div>
        
    </div>
    )
}
export default DashboardLayout;