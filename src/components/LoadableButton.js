import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const LoadableButton = ({
  isLoading,
  children,
  className,
  btnCfg,
  spinCfg,
}) => {
  const renderContent = () => {
    if (isLoading) {
      console.log("isLoading changed");
      return (
        <Spinner
          className={spinCfg?.className}
          style={spinCfg?.style}
          animation="border"
        >
          {spinCfg?.text}
        </Spinner>
      );
    }

    const { type, style, text, className } = btnCfg;
    return (
      <Button className={className} type={type} style={style}>
        {text || children}
      </Button>
    );
  };
  return (
    <div className={className || ""} style={{ textAlign: "center" }}>
      {renderContent()}
    </div>
  );
};

export default LoadableButton;
