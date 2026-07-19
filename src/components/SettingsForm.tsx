import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import './SettingsForm.css'

const settingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be 50 characters or less'),
  email: z.string().trim().email('Enter a valid email address'),
  theme: z.enum(['system', 'light', 'dark']),
  notifications: z.boolean(),
  bio: z
    .string()
    .max(500, 'Bio must be 500 characters or less')
    .optional(),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

const defaultValues: SettingsFormValues = {
  displayName: '',
  email: '',
  theme: 'system',
  notifications: true,
  bio: '',
}

export function SettingsForm() {
  const [savedValues, setSavedValues] = useState<SettingsFormValues | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  })

  const onSubmit = handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    setSavedValues(values)
    reset(values)
  })

  return (
    <form className="settings-form" onSubmit={onSubmit} noValidate>
      <fieldset className="settings-form__section">
        <legend>Profile</legend>

        <div className="settings-form__field">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            aria-invalid={errors.displayName ? 'true' : undefined}
            {...register('displayName')}
          />
          {errors.displayName && (
            <p className="settings-form__error" role="alert">
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div className="settings-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p className="settings-form__error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="settings-form__field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows={4}
            placeholder="Tell us a little about yourself"
            aria-invalid={errors.bio ? 'true' : undefined}
            {...register('bio')}
          />
          {errors.bio && (
            <p className="settings-form__error" role="alert">
              {errors.bio.message}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className="settings-form__section">
        <legend>Preferences</legend>

        <div className="settings-form__field">
          <label htmlFor="theme">Theme</label>
          <select id="theme" {...register('theme')}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="settings-form__field settings-form__field--checkbox">
          <input
            id="notifications"
            type="checkbox"
            {...register('notifications')}
          />
          <label htmlFor="notifications">Email notifications</label>
        </div>
      </fieldset>

      <div className="settings-form__actions">
        <button
          type="button"
          className="settings-form__button settings-form__button--secondary"
          disabled={!isDirty || isSubmitting}
          onClick={() => reset(defaultValues)}
        >
          Reset
        </button>
        <button
          type="submit"
          className="settings-form__button settings-form__button--primary"
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {savedValues && !isDirty && (
        <p className="settings-form__success" role="status">
          Settings saved for {savedValues.displayName}.
        </p>
      )}
    </form>
  )
}
