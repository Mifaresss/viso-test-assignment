import { HTMLAttributes, MouseEvent, useEffect, useRef } from 'react'
import s from './index.module.css'

interface Props extends HTMLAttributes<HTMLDialogElement> {
	onCancel: () => void
	isShowing: boolean
}

export function Modal({ isShowing, children, onCancel, ...otherProps }: Props) {
	const ref = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		if (isShowing) {
			ref.current?.showModal()
		} else {
			ref.current?.close()
		}
	}, [isShowing])

	const closeModalHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onCancel()
		ref.current?.close()
	}

	return (
		<dialog className={s.modal} ref={ref} onCancel={onCancel} {...otherProps}>
			<div className={s.modalContent}>
				<button onClick={closeModalHandler} className={s.cancelButton2}></button>
				{children}
			</div>
		</dialog>
	)
}
