import React, { Suspense } from 'react'
import DashboardPage from './page'
import { BarLoader, BeatLoader } from 'react-spinners'
import { Loader } from 'lucide-react'

const DashboardLayout = () => {
    return (
        <div className='px-5'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-6xl font-bold tracking-tight gradient-title'>
                    Dashboard
                </h1>
            </div>

            <Suspense fallback={<div className="flex gap-2 items-center"><Loader className="animate-spin w-8 h-8"/>Loading...</div>}>
                <DashboardPage />

            </Suspense>
        </div>
    )
}

export default DashboardLayout