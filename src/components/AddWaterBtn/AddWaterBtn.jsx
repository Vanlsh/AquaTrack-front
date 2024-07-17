import css from '../AddWaterBtn/AddWaterBtn.module.css';
import WaterModal from '../../components/WaterModal/WaterModal';
import { useCallback } from 'react';
import { useModal } from '../../hooks/useModal';
import clsx from 'clsx';

const AddWaterBtn = () => {
	const setModal = useModal();

	const closeModal = useCallback(() => {
		setModal();
	}, [setModal]);

	const openModal = useCallback(() => {
		setModal(<WaterModal onClose={closeModal} />);
	}, [setModal, closeModal]);

	return (
		<>
			<button
				className={clsx(css.btn)}
				type='button'
				onClick={() => {
					openModal();
				}}
			>
				<svg className={clsx(css.icon)} width='16' height='16'>
					<use href='../../src/assets/icons.svg#icon-plus'></use>
				</svg>
				Add water
			</button>
		</>
	);
};

export default AddWaterBtn;
