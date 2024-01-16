import { HTMLAttributes } from 'react'
import s from './index.module.css'

export declare namespace Button {
	interface Props extends HTMLAttributes<HTMLButtonElement> {
		disabled?: boolean
	}
}

export function Button({ className, children, disabled, ...props }: Button.Props) {
	return (
		<button
			className={[s.button, className ?? '', disabled ? s.disabled : ''].join(' ')}
			{...props}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
