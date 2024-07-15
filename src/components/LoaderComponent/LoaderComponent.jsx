import { ColorRing } from "react-loader-spinner";

const LoaderComponent = () => {

    return (
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#9be1a0', '#f0eff4', '#ffffffea', '#87d28d', '#323f47']}
        />
    );
};

export default LoaderComponent;