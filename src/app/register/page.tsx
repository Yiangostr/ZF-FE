'use client'

import Link from 'next/link'
import { AuthLayout } from '@/components/auth/auth-layout'
import { PasswordInput } from '@/components/ui/password-input'
import { useRegisterForm } from '@/hooks/use-register-form'
import config from '@/config/constants.json'

export default function RegisterPage() {
  const {
    email,
    password,
    name,
    loading,
    error,
    isFormValid,
    setEmail,
    setPassword,
    setName,
    handleSubmit,
  } = useRegisterForm()

  return (
    <AuthLayout>
      <h2 className="text-white text-3xl font-semibold mb-7">{config.auth.registerTitle}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="bg-orange-500 text-white px-4 py-3 rounded text-sm">{error}</div>}

        <div>
          <input
            type="text"
            placeholder={config.auth.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-white focus:outline-none placeholder:text-zinc-400"
            disabled={loading}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder={config.auth.emailPlaceholderRegister}
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="w-full px-5 py-4 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-white focus:outline-none placeholder:text-zinc-400"
            disabled={loading}
          />
        </div>

        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder={config.auth.passwordPlaceholderRegister}
          disabled={loading}
          className="w-full px-5 py-4 pr-12 bg-zinc-700 text-white rounded border border-zinc-600 focus:border-white focus:outline-none placeholder:text-zinc-400"
        />

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? config.auth.registeringButton : config.auth.registerButton}
        </button>

        <div className="flex items-center text-sm text-zinc-400 mt-2">
          <input type="checkbox" className="mr-2" required />
          <span>{config.auth.termsAgreement}</span>
        </div>
      </form>

      <div className="mt-16 text-zinc-400 text-base">
        <span>{config.auth.alreadyHaveAccount} </span>
        <Link href="/login" className="text-white hover:underline">
          {config.auth.signInNow}
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
