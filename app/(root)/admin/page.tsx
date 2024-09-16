import React from 'react'
import DealBadge from '@/components/admin/badge/DealBadge'
import CompanyProfileBadge from '@/components/admin/CompanyProfile/CompanyProfileBadge'
import InvestorProfileBadge from '@/components/admin/badge/InvestorProfileBadge'
import CompanyProfileCard from '@/components/admin/CompanyProfile/CompanyProfileCard'

const AdminPage = () => {
  return (
    <div className='text-white flex flex-col items-center mt-10'>
      <CompanyProfileCard />
    </div>
  )
}

export default AdminPage