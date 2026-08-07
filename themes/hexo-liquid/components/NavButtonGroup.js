import LiquidGlassLink from './LiquidGlassLink'

/**
 * 首页导航大按钮组件 - 使用 LiquidGlassLink 实现真正的光学折射效果
 * @param {*} props
 * @returns
 */
const NavButtonGroup = (props) => {
  const { categoryOptions } = props
  if (!categoryOptions || categoryOptions.length === 0) {
    return null
  }

  return (
    <nav
      id='home-nav-button'
      className={
        'z-10 mt-8 flex w-full max-h-80 flex-wrap justify-center gap-4 overflow-visible px-5 py-2 md:mt-6 md:h-72 md:max-w-6xl md:gap-6 xl:mt-32'
      }
    >
      {categoryOptions?.map((category, index) => (
        <LiquidGlassLink
          key={category.name}
          index={index}
          title={category.name}
          href={`/category/${category.name}`}
        >
          {category.name}
        </LiquidGlassLink>
      ))}
    </nav>
  )
}

export default NavButtonGroup