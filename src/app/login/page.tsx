'use client'

import Link from 'next/link'
import { AuthLayout } from '@/components/auth/auth-layout'
import { PasswordInput } from '@/components/ui/password-input'
import { useLoginForm } from '@/hooks/use-login-form'
import config from '@/config/constants.json'

export default function LoginPage() {
  const { email, password, loading, error, isFormValid, setEmail, setPassword, handleSubmit } =
    useLoginForm()

  return (
    <AuthLayout>
      <h2 className="text-white text-3xl font-semibold mb-7">{config.auth.loginTitle}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="bg-orange-500 text-white px-4 py-3 rounded text-sm">{error}</div>}

        <div>
          <input
            type="email"
            placeholder={config.auth.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full px-5 py-4 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-white focus:outline-none placeholder:text-zinc-400"
            disabled={loading}
          />
        </div>

        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder={config.auth.passwordPlaceholder}
          disabled={loading}
          className="w-full px-5 py-4 pr-12 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-white focus:outline-none placeholder:text-zinc-400"
        />

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? config.auth.loggingInButton : config.auth.loginButton}
        </button>

        <div className="flex items-center justify-between text-sm text-zinc-400">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="mr-2" />
            {config.auth.rememberMeLabel}
          </label>
          <a href="#" className="hover:underline">
            {config.auth.needHelpLabel}
          </a>
        </div>
      </form>

      <div className="mt-16 text-zinc-400 text-base">
        <span>{config.auth.newToZenflix} </span>
        <Link href="/register" className="text-white hover:underline">
          {config.auth.signUpNow}
        </Link>
        .
      </div>

      <div className="mt-3 text-xs text-zinc-500">
        {config.auth.recaptchaNotice}{' '}
        <a href="#" className="text-blue-500 hover:underline">
          {config.auth.learnMore}
        </a>
        .
      </div>
    </AuthLayout>
  )
}
