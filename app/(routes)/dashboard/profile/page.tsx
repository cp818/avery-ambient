"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Card } from '@/components/ui/card'

function ProfilePage() {
  const { user } = useUser()

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl mb-6">My Profile</h2>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">Full Name</label>
            <p className="text-lg">{user?.fullName || 'N/A'}</p>
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <p className="text-lg">{user?.primaryEmailAddress?.emailAddress || 'N/A'}</p>
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-600">User ID</label>
            <p className="text-lg font-mono text-sm">{user?.id || 'N/A'}</p>
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-600">Account Created</label>
            <p className="text-lg">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProfilePage
