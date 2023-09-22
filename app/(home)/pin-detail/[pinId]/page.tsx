import { PinDetail } from "@/components/pin/pin-detail"

const PinDetailpage = ({params} : {params: {pinId: string}}) => {
  return <PinDetail pinId={params.pinId} />;
};

export default PinDetailpage;
