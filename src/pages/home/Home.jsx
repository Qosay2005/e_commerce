import React from 'react'
import Catogories from '../../components/catogories/Catogories'
import GetProducts from '../../components/getProducts/getProducts'
import Hero from '../../components/hero_section/Hero'
import Features from '../../components/features/Features'
export default function Home() {
  return (
    <div className="space-y-8 bg-[#FFFFFF]">
      <Hero/>
      <Catogories />
      <Features/>
      <GetProducts/>
    </div>
  )
}
