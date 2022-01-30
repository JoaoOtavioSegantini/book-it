import { useState } from 'react'
import { toast } from 'react-toastify'

import { signIn } from 'next-auth/client'
import Link from 'next/link'
import { ButtonLoader } from '@components'

type LoginResponse = {
  /**
   * Will be different error codes,
   * depending on the type of error.
   */
  error: string | undefined
  /**
   * HTTP status code,
   * hints the kind of error that happened.
   */
  status: number
  /**
   * `true` if the signin was successful
   */
  ok: boolean
  /**
   * `null` if there was an error,
   * otherwise the url the user
   * should have been redirected to.
   */
  url: string | null
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)
    const result: LoginResponse | undefined = await signIn('credentials', {
      redirect: false,
      email,
      password
    })
    setLoading(false)
    if (result!.error) {
      toast.error(result!.error)
    } else {
      window.location.href = '/'
    }
  }
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link href="/password/forgot">
              <a className="float-right mb-4"> Forgot Password?</a>
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {loading ? <ButtonLoader /> : 'LOGIN'}
            </button>

            <Link href="/register">
              <a className="float-right mt-3"> New User?</a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
