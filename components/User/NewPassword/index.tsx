import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from 'store/actions/userActions'
import { ButtonLoader } from '@components'

type ResetState = {
  forgotPassword: {
    error: Error
    loading: boolean
    success: boolean
  }
}

const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()

  const { error, loading, success } = useSelector(
    (state: ResetState) => state.forgotPassword
  )

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (success) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success, error])

  const submitHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    const passwords = {
      password,
      confirmPassword
    }

    dispatch(resetPassword(router.query.token!, passwords))
  }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">New Password</h1>

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

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            {loading ? <ButtonLoader /> : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewPassword
