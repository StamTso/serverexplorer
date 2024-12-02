interface ActionButtonProps {
    type?: HTMLButtonElement['type'],
    disabled?: boolean
    stylingClasses?: string,
    title: string
    onClick?: () => void
}

const ActionButton: React.FC<ActionButtonProps> = ({ type = 'button', disabled = false, stylingClasses = '', title, onClick }) => {
    return (
        <button type={type} className={stylingClasses} onClick={onClick} disabled={disabled}>
            {title}
        </button>
    )
}

export default ActionButton;