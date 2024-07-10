import css from "./WaterForm.module.css";
import clsx from 'clsx';
import { useForm } from "react-hook-form";

const WaterForm = ({ operationType }) => {
    const FormHeader = (operationType) => {
        switch (operationType) {
        case "add":
            return <p className={css.FormHeader}>Choose a value</p>;
        case "edit":
            return <p className={css.FormHeader}>Correct entered data</p>;
        default:
            return <p className={css.FormHeader}>Add water</p>;              
        }
    };
    return (
        <form className={css.WaterForm}>
            {FormHeader(operationType)}
            <p className={css.AmountOfWater}>Amount of water</p>
            <div className={css.TapAddWaterWrapper}> 
                <button type="button" className={css.TapAddWaterMinusBtn}>
                    <svg className={css.ToMinus}>
                        <use href="src\assets\icons.svg#icon-minus"></use>
                    </svg>
                </button>
                 <p className={css.TapAddWaterValue}>50ml</p>
                <button type="button" className={css.TapAddWaterPlusBtn}>
                    <svg className={css.ToMinus}>
                        <use href="src\assets\icons.svg#icon-minus"></use>
                    </svg>
                    <svg className={css.ToPlus}>
                        <use href="src\assets\icons.svg#icon-minus"></use>
                    </svg>
                 </button>
            </div>
            
            <label className={css.RecordingTimeLabel}>Recording time:
                <input type="text" className={css.RecordingTime}/>
            </label>
            <label className={css.WaterValueLabel}>Enter the value of the water used:
                <input type="number" className={css.WaterValue}/>
            </label>
            <button type="button" className={css.SaveBtn}>Save</button>
           
            

        </form>
    )
};
export default WaterForm;