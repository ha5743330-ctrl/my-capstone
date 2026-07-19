import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SettingsForm, type SettingsFormValues } from './SettingsForm'

const defaultValues: SettingsFormValues = {
  displayName: 'Jane Doe',
  email: 'jane@example.com',
  bio: 'Product designer',
}

function renderSettingsForm(
  overrides: Partial<{
    defaultValues: SettingsFormValues
    onSubmit: (values: SettingsFormValues) => void
  }> = {},
) {
  const onSubmit = overrides.onSubmit ?? vi.fn()

  render(
    <SettingsForm
      defaultValues={overrides.defaultValues ?? defaultValues}
      onSubmit={onSubmit}
    />,
  )

  return { onSubmit }
}

afterEach(() => {
  cleanup()
})

describe('SettingsForm', () => {
  it('shows a required field error for an empty display name', async () => {
    renderSettingsForm()

    fireEvent.input(screen.getByLabelText(/display name/i), {
      target: { value: '' },
    })

    const saveButton = screen.getByRole('button', { name: 'Save' })
    await waitFor(() => expect(saveButton).toBeEnabled())
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Display name is required')).toBeInTheDocument()
    })
    expect(screen.getByLabelText(/display name/i)).toHaveAttribute(
      'aria-describedby',
      'displayName-error',
    )
  })

  it('rejects an invalid email address', async () => {
    renderSettingsForm()

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'not-an-email' },
    })

    const saveButton = screen.getByRole('button', { name: 'Save' })
    await waitFor(() => expect(saveButton).toBeEnabled())
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(
        screen.getByText('Enter a valid email address'),
      ).toBeInTheDocument()
    })
    expect(screen.getByLabelText(/email/i)).toHaveAttribute(
      'aria-describedby',
      'email-error',
    )
  })

  it('shows an email error when the field is left empty on submit', async () => {
    renderSettingsForm()

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: '' },
    })

    const saveButton = screen.getByRole('button', { name: 'Save' })
    await waitFor(() => expect(saveButton).toBeEnabled())
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(
        screen.getByText('Enter a valid email address'),
      ).toBeInTheDocument()
    })
  })

  it('submits valid data', async () => {
    const { onSubmit } = renderSettingsForm()

    fireEvent.input(screen.getByLabelText(/display name/i), {
      target: { value: 'Updated Name' },
    })
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'updated@example.com' },
    })
    fireEvent.input(screen.getByLabelText(/bio/i), {
      target: { value: 'Updated bio' },
    })

    const saveButton = screen.getByRole('button', { name: 'Save' })
    await waitFor(() => expect(saveButton).toBeEnabled())
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      displayName: 'Updated Name',
      email: 'updated@example.com',
      bio: 'Updated bio',
    })
  })

  it('keeps the save button disabled until the form is changed', async () => {
    renderSettingsForm()

    const saveButton = screen.getByRole('button', { name: 'Save' })
    expect(saveButton).toBeDisabled()

    fireEvent.input(screen.getByLabelText(/display name/i), {
      target: { value: 'Jane Doe!' },
    })

    await waitFor(() => expect(saveButton).toBeEnabled())
  })
})
