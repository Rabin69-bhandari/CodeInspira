import { SignIn } from '@clerk/nextjs'
import NavBar from '@/app/components/navbar'

export default function Page() {
  return (
    <>
  <div className='flex justify-center items-center h-screen'>

  <SignIn afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"/>
  </div>

    </>
)
}