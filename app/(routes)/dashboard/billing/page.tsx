"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const Billing = () => {
  return (
    <div className='px-4 md:px-10 lg:px-20 py-10'>
      <h2 className='font-bold text-3xl mb-4 text-center'>Choose Your Plan</h2>
      <p className='text-center text-gray-600 mb-10'>Unlock unlimited consultations with our Pro plan</p>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
        {/* Free Plan */}
        <Card className='relative'>
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>Perfect for trying out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='mb-4'>
              <span className='text-4xl font-bold'>$0</span>
              <span className='text-gray-600'>/month</span>
            </div>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>1 consultation session</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>Access to all AI doctors</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>Voice consultations</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>AI-generated reports</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className='w-full' disabled>
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className='relative border-2 border-violet-500'>
          <div className='absolute top-0 right-0 bg-violet-500 text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg'>
            Popular
          </div>
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>Unlimited healthcare access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='mb-4'>
              <span className='text-4xl font-bold'>$29</span>
              <span className='text-gray-600'>/month</span>
            </div>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span className='font-semibold'>Unlimited consultations</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>Access to all AI doctors</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>Priority voice support</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>Advanced AI reports</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>Session history access</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-5 w-5 text-green-500' />
                <span>24/7 availability</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className='w-full bg-violet-500 hover:bg-violet-600' 
              onClick={() => {
                alert('Stripe integration coming soon! For now, you can test with the free plan (1 session).')
              }}
            >
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className='mt-12 text-center text-sm text-gray-600'>
        <p>All plans include secure authentication, encrypted conversations, and HIPAA-compliant data storage.</p>
        <p className='mt-2'>Need enterprise features? <a href="mailto:support@averyambient.com" className='text-violet-500 hover:underline'>Contact us</a></p>
      </div>
    </div>
  )
}

export default Billing