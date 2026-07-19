import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import './SettingsForm.css'

const settingsSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  email: z
    .string()
    .min(1, 'Enter a valid email address')
    .pipe(z.email('Enter a valid email address')),
  bio: z
    .string()
    .max(200, 'Bio must be 200 characters or less'),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>

type SettingsFormProps = {
  defaultValues: SettingsFormValues
  onSubmit: (values: SettingsFormValues) => void | Promise<void>
}

export function SettingsForm({ defaultValues, onSubmit }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<SettingsFormValues>({
    defaultValues,
    resolver: zodResolver(settingsSchema),
    mode: 'onSubmit',
  })

  return (
    <form
      className="settings-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset className="settings-form__fieldset">
        <legend className="settings-form__legend">Profile settings</legend>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            className="settings-form__input"
            aria-invalid={errors.displayName ? true : undefined}
            aria-describedby={
              errors.displayName ? 'displayName-error' : undefined
            }
            {...register('displayName')}
          />
          {errors.displayName && (
            <span
              id="displayName-error"
              className="settings-form__error"
              role="alert"
            >
              {errors.displayName.message}
            </span>
          )}
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="settings-form__input"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <span
              id="email-error"
              className="settings-form__error"
              role="alert"
            >
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            className="settings-form__textarea"
            rows={4}
            aria-invalid={errors.bio ? true : undefined}
            aria-describedby={errors.bio ? 'bio-error' : undefined}
            {...register('bio')}
          />
          {errors.bio && (
            <span id="bio-error" className="settings-form__error" role="alert">
              {errors.bio.message}
            </span>
          )}
        </div>
      </fieldset>

      <button
        type="submit"
        className="settings-form__submit"
        disabled={!isDirty || isSubmitting}
      >
        Save
      </button>
    </form>
  )
}
