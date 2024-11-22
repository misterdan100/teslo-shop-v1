import { titleFont } from '@/config/fonts'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="">
      <h1>Mister just do it</h1>
      <h1 className={titleFont.className}>Be dicipline</h1>
    </div>
  )
}
