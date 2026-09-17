type ColorToken = {
  description: string
  label: string
  token: string
}

type ColorTokenGroup = {
  description: string
  title: string
  tokens: ColorToken[]
}

const colorTokenGroups: ColorTokenGroup[] = [
  {
    title: "基础表面",
    description: "构成页面层级、文本可读性与控件边界。",
    tokens: [
      { label: "页面背景", token: "background", description: "应用与文档的底层表面。" },
      { label: "主要文本", token: "foreground", description: "标题与正文。" },
      { label: "内容卡片", token: "card", description: "分组内容与悬浮容器。" },
      { label: "卡片文本", token: "card-foreground", description: "卡片中的主要内容。" },
      { label: "浮层表面", token: "popover", description: "弹出层、菜单和提示容器。" },
      { label: "浮层文本", token: "popover-foreground", description: "浮层中的主要内容。" },
      { label: "弱化表面", token: "muted", description: "低强调度区块与占位区域。" },
      { label: "次要文本", token: "muted-foreground", description: "说明、占位和辅助信息。" },
      { label: "边框", token: "border", description: "分隔与容器边界。" },
      { label: "输入边框", token: "input", description: "输入控件的默认边界。" },
      { label: "焦点环", token: "ring", description: "键盘焦点与已选强调。" },
    ],
  },
  {
    title: "操作与状态",
    description: "表达动作层级与业务状态；不要仅依赖颜色传达含义。",
    tokens: [
      { label: "主要操作", token: "primary", description: "主按钮、已选状态与焦点环。" },
      { label: "主操作文本", token: "primary-foreground", description: "主操作上的前景内容。" },
      { label: "次要操作", token: "secondary", description: "低强调度的次级操作。" },
      { label: "次操作文本", token: "secondary-foreground", description: "次要操作上的前景内容。" },
      { label: "强调表面", token: "accent", description: "悬停、选中或局部强调。" },
      { label: "强调文本", token: "accent-foreground", description: "强调表面上的前景内容。" },
      { label: "危险操作", token: "destructive", description: "删除、不可逆确认与高风险反馈。" },
      { label: "危险操作文本", token: "destructive-foreground", description: "危险操作上的前景内容。" },
      { label: "成功反馈", token: "success", description: "已完成或正向状态。" },
      { label: "成功反馈文本", token: "success-foreground", description: "成功状态上的前景内容。" },
      { label: "警告反馈", token: "warning", description: "需要关注但不阻断的状态。" },
      { label: "警告反馈文本", token: "warning-foreground", description: "警告状态上的前景内容。" },
      { label: "信息反馈", token: "info", description: "中性提示与说明。" },
      { label: "信息反馈文本", token: "info-foreground", description: "信息状态上的前景内容。" },
    ],
  },
]

export function ColorTokenGrid() {
  return (
    <div className="yb-docs-color-token-groups">
      {colorTokenGroups.map((group) => (
        <section aria-labelledby={`color-token-group-${group.title}`} className="yb-docs-color-token-group" key={group.title}>
          <div>
            <h2 id={`color-token-group-${group.title}`}>{group.title}</h2>
            <p>{group.description}</p>
          </div>
          <ul className="yb-docs-color-token-grid">
            {group.tokens.map((item) => {
              const variable = `--yb-${item.token}`

              return (
                <li className="yb-docs-color-token" key={item.token}>
                  <span
                    aria-label={`${item.label}：${variable}`}
                    className="yb-docs-color-token-swatch"
                    style={{ backgroundColor: `var(${variable})` }}
                  />
                  <div>
                    <strong>{item.label}</strong>
                    <code>{variable}</code>
                    <p>{item.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
