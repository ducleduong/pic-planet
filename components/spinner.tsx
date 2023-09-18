type SpinnerProps = {
    message?: string
}

const Spinner = ({message}: SpinnerProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="animate-ping inline-flex h-5 w-5 rounded-full bg-primary opacity-90"></div>
        <p className="text-lg text-center px-2 mt-2">{message}</p>
    </div>
  );
};

export default Spinner;
