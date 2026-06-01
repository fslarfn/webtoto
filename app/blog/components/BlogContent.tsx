'use client'
import dynamic from 'next/dynamic'

const MDPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false })

export default function BlogContent({ content }: { content: string }) {
  return (
    <div data-color-mode="light">
      <MDPreview
        source={content}
        style={{ background: 'transparent', fontSize: '1rem', lineHeight: '1.75' }}
        wrapperElement={{ 'data-color-mode': 'light' } as React.HTMLAttributes<HTMLDivElement>}
      />
    </div>
  )
}
