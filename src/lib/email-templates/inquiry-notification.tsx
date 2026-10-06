import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string; phone?: string; email?: string; city?: string; company?: string
  client_type?: string; project_type?: string; message?: string; source?: string
}

const rows: [keyof Props, string][] = [
  ['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['city', 'City'],
  ['company', 'Company'], ['client_type', 'Client type'], ['project_type', 'Finish / Service'],
  ['message', 'Message'], ['source', 'Form'],
]

function InquiryNotification(p: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New inquiry from {p.name || 'website visitor'}</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Georgia, serif', color: '#1f3a2e' }}>
        <Container style={{ padding: '24px', maxWidth: '560px' }}>
          <Heading style={{ fontSize: '22px', color: '#1f3a2e' }}>New website inquiry</Heading>
          <Section>
            {rows.map(([k, label]) =>
              p[k] ? (
                <Text key={k} style={{ fontSize: '14px', margin: '0 0 10px', whiteSpace: 'pre-wrap' }}>
                  <strong style={{ color: '#a8894f' }}>{label}:</strong> {p[k]}
                </Text>
              ) : null,
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: InquiryNotification,
  subject: (d: Record<string, any>) => `New inquiry: ${d.name || 'website visitor'}`,
  displayName: 'New inquiry notification',
  to: 'info@casadarte.mk',
  previewData: { name: 'Jane Doe', phone: '+389 70 000 000', city: 'Skopje', project_type: 'Travertino', message: 'Sample message.', source: 'contact-project' },
} satisfies TemplateEntry
