import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const { handleLogin } = useAuth()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try{
    handleLogin(formData)
    navigate('/')
    } catch (error) {
      return <h1>Error</h1>
    }

  }

  return (
    <main className="min-h-screen bg-[#071013] px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0c191d] shadow-2xl shadow-black/30 lg:grid-cols-[1fr_0.9fr]">
          <div className="hidden flex-col justify-between bg-[#10292b] p-12 lg:flex">
            <div>
              <Link to="/login" className="text-xl font-semibold tracking-tight text-cyan-300">
                perplexity<span className="text-white">.</span>
              </Link>
              <div className="mt-24 max-w-md">
                <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Ask better questions</p>
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white">Find clarity in the noise.</h1>
                <p className="mt-6 text-lg leading-8 text-slate-300">Search, explore, and understand the world with answers that move your thinking forward.</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">Your curious side has been waiting.</p>
          </div>

          <div className="p-8 sm:p-12">
            <div className="mb-10 lg:hidden">
              <Link to="/login" className="text-xl font-semibold tracking-tight text-cyan-300">perplexity<span className="text-white">.</span></Link>
            </div>
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Welcome back</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">Sign in to Perplexity</h2>
              <p className="mt-3 text-sm text-slate-400">Continue your search journey.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                <input id="login-email" name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-[#071013] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="login-password" className="block text-sm font-medium text-slate-200">Password</label>
                  <button type="button" className="text-xs font-medium text-cyan-300 transition hover:text-cyan-200">Forgot password?</button>
                </div>
                <input id="login-password" name="password" type="password" value={formData.password} onChange={handleChange} required autoComplete="current-password" placeholder="Enter your password" className="w-full rounded-xl border border-white/10 bg-[#071013] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20" />
              </div>
              <button type="submit" className="w-full rounded-xl bg-cyan-300 px-4 py-3.5 text-sm font-semibold text-[#071013] transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#0c191d]">Sign in</button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400">New to Perplexity? <Link to="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">Create an account</Link></p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login