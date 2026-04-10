import SmartLink from '@/components/SmartLink'

/**
 * 首页导航大按钮组件
 * @param {*} props
 * @returns
 */
const NavButtonGroup = (props) => {
  const { categoryOptions } = props
  if (!categoryOptions || categoryOptions.length === 0) {
    return <></>
  }

  return (
    <nav
      id='home-nav-button'
      className={'w-full z-10 md:h-72 md:mt-6 xl:mt-32 px-5 py-2 mt-8 flex flex-wrap justify-center gap-4 md:gap-6 md:max-w-6xl max-h-80 overflow-auto'}>
      {categoryOptions?.map(category => {
        return (
          <SmartLink
            key={`${category.name}`}
            title={`${category.name}`}
            href={`/category/${category.name}`}
            passHref
            className='group relative isolate flex h-14 w-full items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/35 bg-white/10 px-6 text-center text-white shadow-[0_10px_30px_rgba(15,23,42,0.18),inset_0_1px_1px_rgba(255,255,255,0.55)] backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/55 hover:bg-white/20 hover:shadow-[0_16px_40px_rgba(15,23,42,0.28),inset_0_1px_1px_rgba(255,255,255,0.7)] sm:w-4/5 md:mx-0 md:w-40 md:h-16 lg:h-20 md:rounded-[1.85rem]'>
            <span className='absolute inset-0 bg-gradient-to-br from-white/35 via-white/10 to-cyan-100/15 opacity-80 transition-opacity duration-300 group-hover:opacity-100' />
            <span className='absolute inset-[1px] rounded-[1.55rem] border border-white/20 bg-gradient-to-b from-white/25 via-white/5 to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] md:rounded-[1.8rem]' />
            <span className='absolute -top-8 left-1/2 h-14 w-24 -translate-x-1/2 rounded-full bg-white/35 blur-2xl opacity-70 transition-transform duration-500 group-hover:-translate-y-1 group-hover:opacity-90' />
            <span className='absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-white/35 opacity-70' />
            <span className='relative z-10 text-sm font-semibold tracking-wide text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] md:text-base'>
              {category.name}
            </span>
            </SmartLink>
        )
      })}
    </nav>
  )
}
export default NavButtonGroup
