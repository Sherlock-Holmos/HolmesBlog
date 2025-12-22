import { siteConfig } from '@/lib/config'

/**
 * 驱动版权
 * @returns
 */
export default function PoweredBy(props) {
  return (
    <div className={`inline text-sm font-serif ${props.className || ''}`}>
      <div
        className='underline justify-start'>
        NotionNext {siteConfig('VERSION')}
      </div>
      .
    </div>
  )
}
