'use client'

import config from '@/config/constants.json'

interface AccountInfoProps {
  user: any
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className="mt-8 p-6 bg-background-secondary rounded-lg border border-background-tertiary">
      <h3 className="font-semibold mb-2">{config.profile.accountInfoTitle}</h3>
      <div className="space-y-2 text-sm text-text-secondary">
        <p>
          <span className="font-medium">{config.profile.memberSinceLabel}</span>{' '}
          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
        </p>
        <p>
          <span className="font-medium">{config.profile.userIdLabel}</span> {user?.id}
        </p>
      </div>
    </div>
  )
}
