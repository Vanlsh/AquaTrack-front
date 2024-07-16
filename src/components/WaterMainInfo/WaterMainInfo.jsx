import { useEffect, useState, useCallback } from "react";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";

import { useModal } from "../../hooks/useModal.js";
import Modal from "../Modal/Modal.jsx";
import svgSprite from "../../assets/icons.svg";
import WaterModal from "../WaterModal/WaterModal.jsx";

const WaterMainInfo = () => {
  const [goal, setGoal] = useState(0);
  const setModal = useModal();

  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const openModal = useCallback(() => {
    setModal(<WaterModal onClose={closeModal} operationType={"add"}/>);
  }, [setModal, closeModal]);

  // useEffect(() => {
  //   const getGoal = async () => {
  //     try {
  //       const response = await fetch('');
  //       const data = await response.json();
  //       setGoal(data.goal)
  //     } catch (error) {
  //       console.error('Помилка при отриманні даних:', error);
  //     }
  //   }
  //   getGoal();
  // }, [])

  return (
      <div className={css.waterContainer}>
        <h1 className={css.waterTitle}>AquaTrack</h1>
        <div className={css.normaContainer}>
          <h2 className={css.normaL}>{goal === 0 ? 'You don’t have a goal yet!' : `${goal} L`}</h2>
          <p className={css.normaText}>My daily norma</p>
        </div>
        <WaterProgressBar />
        <button type="button" className={css.btnAdd} onClick={openModal}>
          <svg className={css.plus}>
            <use xlinkHref={svgSprite + "#icon-plus"} />
          </svg>
          <h2 className={css.btnText}>Add water</h2>
        </button>
      </div>
    
  );
};

export default WaterMainInfo;
